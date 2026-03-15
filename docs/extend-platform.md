# Extend Platform Guide

This guide teaches you how to create new sections and extend the landing-site-builder platform using a test-driven development workflow.

**Who is this for?** Senior developers and open-source contributors who want to add new sections or enhance the platform.

**What you'll learn:**
- Section Definition contract and architecture
- TDD workflow for creating sections
- Schema design with Zod
- Testing requirements and best practices
- Component registration process
- Contributing guidelines

---

## Architecture Overview

The platform follows a **registry pattern**:

1. **Section components** live in `packages/core/src/components/landing/sections/`
2. **Schemas** (Zod) define the section's configuration shape in `packages/core/src/registry/schemas/`
3. **Registrations** connect components to schemas in `packages/core/src/registry/sections/`
4. **The registry** (`section-registry.ts`) manages all registered sections

```
Component (TSX) + Schema (Zod) → Registration → Registry → Available to users
```

### Key Files

```
packages/core/src/
├── components/landing/
│   ├── primitives/          # Shared UI components (Heading, Container, etc)
│   └── sections/
│       └── hero/
│           ├── hero-split.tsx              # Component implementation
│           └── __tests__/
│               └── hero-split.spec.tsx     # Component tests
├── registry/
│   ├── section-definition.ts               # TypeScript interface for sections
│   ├── section-registry.ts                 # Global registry
│   ├── schemas/
│   │   ├── hero.schema.ts                  # Zod schemas for hero sections
│   │   └── section-base.schema.ts          # Base schema for all sections
│   ├── sections/
│   │   └── hero.registry.ts                # Registration logic
│   └── __tests__/
│       └── hero-registration.spec.ts       # Registry tests
```

---

## Section Definition Contract

Every section must implement the `SectionDefinition<T>` interface:

```typescript
// packages/core/src/registry/section-definition.ts
export interface SectionDefinition<T = any> {
  type: string                              // Section category (hero, feature, etc)
  variant: string                           // Layout variant (split, centered, etc)
  component: ComponentType<T>               // React component
  schema: z.ZodSchema<T>                    // Zod schema for validation
  metadata: {
    name: string                            // Human-readable name
    category: string                        // Visitor job (orient, trust, value, convert)
    description: string                     // One-line description
    preview: string                         // Path to preview image
    tags: string[]                          // Searchable tags
    renderMode: 'server' | 'client' | 'hybrid'
    dependencies: string[]                  // Package dependencies
    bundleImpact: 'light' | 'moderate' | 'heavy'
    upstreamSource?: string                 // Original source (if adapted)
    upstreamLicense?: string                // Original license
    lastSynced?: string                     // Last sync date
    knownLimitations?: string[]             // Known issues
    browserSupport?: string                 // Browser requirements
  }
  examples: {
    basic: T                                // Basic usage example
    advanced?: T                            // Advanced usage example
  }
}
```

This contract ensures:
- Type safety across the platform
- Consistent metadata for documentation
- Automatic validation of user configs
- Clear examples for every section

---

## TDD Workflow for Creating Sections

We follow **test-driven development** (TDD). Write tests first, then implement.

### Example: Creating a new `FeatureGrid` section

We'll walk through creating a feature grid section step-by-step.

---

### Step 1: Write the Schema Test

**File:** `packages/core/src/registry/__tests__/feature-grid.schema.spec.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { featureGridSchema } from '../schemas/feature.schema'

describe('featureGridSchema', () => {
  it('validates a valid basic config', () => {
    const config = {
      type: 'feature',
      variant: 'grid',
      heading: {
        title: 'Our Features',
        body: 'Everything you need to succeed',
      },
      features: [
        {
          icon: 'zap',
          title: 'Fast',
          description: 'Lightning-fast performance',
        },
        {
          icon: 'shield',
          title: 'Secure',
          description: 'Enterprise-grade security',
        },
      ],
    }

    expect(() => featureGridSchema.parse(config)).not.toThrow()
  })

  it('requires at least 2 features', () => {
    const config = {
      type: 'feature',
      variant: 'grid',
      heading: { title: 'Features' },
      features: [{ icon: 'zap', title: 'Fast', description: 'Fast' }],
    }

    expect(() => featureGridSchema.parse(config)).toThrow('at least 2 features')
  })

  it('validates optional container prop', () => {
    const config = {
      type: 'feature',
      variant: 'grid',
      container: 'xl',
      heading: { title: 'Features' },
      features: [
        { icon: 'zap', title: 'Fast', description: 'Fast' },
        { icon: 'shield', title: 'Secure', description: 'Secure' },
      ],
    }

    const result = featureGridSchema.parse(config)
    expect(result.container).toBe('xl')
  })
})
```

**Run test:** `pnpm --filter @landing-builder/core test`
**Expected:** All tests fail (schema doesn't exist yet)

---

### Step 2: Create the Schema

**File:** `packages/core/src/registry/schemas/feature.schema.ts`

```typescript
import { z } from 'zod'
import { sectionBaseSchema } from './section-base.schema'
import { headingSchema } from './heading.schema'

const featureItemSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
})

export const featureGridSchema = sectionBaseSchema.extend({
  type: z.literal('feature'),
  variant: z.literal('grid'),
  heading: headingSchema,
  features: z.array(featureItemSchema).min(2, 'at least 2 features required'),
})

export type FeatureGridSection = z.infer<typeof featureGridSchema>
```

**Export from index:**
```typescript
// packages/core/src/registry/schemas/index.ts
export * from './feature.schema'
```

**Run test:** `pnpm --filter @landing-builder/core test`
**Expected:** Schema tests now pass ✓

---

### Step 3: Write the Component Test

**File:** `packages/core/src/components/landing/sections/feature/__tests__/feature-grid.spec.tsx`

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeatureGrid } from '../feature-grid'
import type { FeatureGridSection } from '../../../../../registry/schemas/feature.schema'

describe('FeatureGrid', () => {
  const mockConfig: FeatureGridSection = {
    type: 'feature',
    variant: 'grid',
    heading: {
      title: 'Our Features',
      body: 'Everything you need',
    },
    features: [
      { icon: 'zap', title: 'Fast', description: 'Lightning-fast performance' },
      { icon: 'shield', title: 'Secure', description: 'Enterprise security' },
    ],
  }

  it('renders heading', () => {
    render(<FeatureGrid {...mockConfig} />)
    expect(screen.getByText('Our Features')).toBeInTheDocument()
    expect(screen.getByText('Everything you need')).toBeInTheDocument()
  })

  it('renders all features', () => {
    render(<FeatureGrid {...mockConfig} />)
    expect(screen.getByText('Fast')).toBeInTheDocument()
    expect(screen.getByText('Lightning-fast performance')).toBeInTheDocument()
    expect(screen.getByText('Secure')).toBeInTheDocument()
    expect(screen.getByText('Enterprise security')).toBeInTheDocument()
  })

  it('renders in a grid layout', () => {
    const { container } = render(<FeatureGrid {...mockConfig} />)
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
  })

  it('respects container size prop', () => {
    const config = { ...mockConfig, container: 'sm' as const }
    render(<FeatureGrid {...config} />)
    // Container component should receive 'sm' size
  })
})
```

**Run test:** `pnpm --filter @landing-builder/core test`
**Expected:** Component tests fail (component doesn't exist yet)

---

### Step 4: Implement the Component

**File:** `packages/core/src/components/landing/sections/feature/feature-grid.tsx`

```typescript
import type { FeatureGridSection } from '../../../../registry/schemas/feature.schema'
import { Container } from '../../primitives/layouts/container'
import { Heading } from '../../primitives/content/heading'

export interface FeatureGridProps extends FeatureGridSection {
  className?: string
}

export function FeatureGrid({
  heading,
  features,
  container,
  className = '',
}: FeatureGridProps) {
  return (
    <section className={`py-12 md:py-24 ${className}`}>
      <Container size={container || 'lg'}>
        <div className="space-y-12">
          {/* Heading */}
          <Heading
            title={heading.title}
            body={heading.body}
            align="center"
          />

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="space-y-3">
                <div className="text-primary text-2xl">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
```

**Export from index:**
```typescript
// packages/core/src/components/landing/sections/feature/index.ts
export * from './feature-grid'
```

**Run test:** `pnpm --filter @landing-builder/core test`
**Expected:** Component tests now pass ✓

---

### Step 5: Write the Registration Test

**File:** `packages/core/src/registry/__tests__/feature-registration.spec.ts`

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { getSection, clearRegistry } from '../section-registry'

describe('Feature section registration', () => {
  beforeEach(() => {
    clearRegistry()
    // Import to trigger registration
    import('../sections/feature.registry')
  })

  it('registers feature:grid section', async () => {
    const section = getSection('feature', 'grid')
    expect(section).toBeDefined()
    expect(section?.metadata.name).toBe('Feature Grid')
  })

  it('includes required metadata', async () => {
    const section = getSection('feature', 'grid')
    expect(section?.metadata.category).toBe('value')
    expect(section?.metadata.bundleImpact).toBe('light')
    expect(section?.metadata.renderMode).toBe('server')
  })

  it('includes basic example', async () => {
    const section = getSection('feature', 'grid')
    expect(section?.examples.basic).toBeDefined()
    expect(section?.examples.basic.features).toHaveLength(3)
  })

  it('validates example against schema', async () => {
    const section = getSection('feature', 'grid')
    expect(() => section?.schema.parse(section?.examples.basic)).not.toThrow()
  })
})
```

**Run test:** `pnpm --filter @landing-builder/core test`
**Expected:** Registration tests fail (registration doesn't exist yet)

---

### Step 6: Register the Section

**File:** `packages/core/src/registry/sections/feature.registry.ts`

```typescript
import { registerSection } from '../section-registry'
import { FeatureGrid } from '../../components/landing/sections/feature/feature-grid'
import { featureGridSchema } from '../schemas/feature.schema'
import type { FeatureGridSection } from '../schemas/feature.schema'

/**
 * Register Feature Grid section
 */
registerSection<FeatureGridSection>({
  type: 'feature',
  variant: 'grid',
  component: FeatureGrid,
  schema: featureGridSchema,
  metadata: {
    name: 'Feature Grid',
    category: 'value',
    description: 'Grid layout showcasing 3-6 features with icons',
    preview: '/previews/feature-grid.png',
    tags: ['feature', 'grid', 'value', 'benefits'],
    renderMode: 'server',
    dependencies: ['@landing-builder/core/primitives'],
    bundleImpact: 'light',
  },
  examples: {
    basic: {
      type: 'feature',
      variant: 'grid',
      heading: {
        title: 'Everything you need',
        body: 'All the tools to grow your business',
      },
      features: [
        {
          icon: 'zap',
          title: 'Lightning Fast',
          description: 'Optimized for speed and performance',
        },
        {
          icon: 'shield',
          title: 'Secure by Default',
          description: 'Enterprise-grade security built-in',
        },
        {
          icon: 'chart',
          title: 'Analytics Included',
          description: 'Track every metric that matters',
        },
      ],
    },
    advanced: {
      type: 'feature',
      variant: 'grid',
      container: 'xl',
      heading: {
        eyebrow: 'Features',
        title: 'Everything you need to succeed',
        body: 'Built for teams of all sizes with powerful features',
        align: 'center',
      },
      features: [
        {
          icon: 'zap',
          title: 'Lightning Fast',
          description: 'Optimized for speed with edge caching',
        },
        {
          icon: 'shield',
          title: 'Secure by Default',
          description: 'SOC 2 Type II certified infrastructure',
        },
        {
          icon: 'chart',
          title: 'Advanced Analytics',
          description: 'Real-time dashboards and custom reports',
        },
        {
          icon: 'users',
          title: 'Team Collaboration',
          description: 'Work together with unlimited team members',
        },
        {
          icon: 'integration',
          title: '100+ Integrations',
          description: 'Connect with your favorite tools',
        },
        {
          icon: 'support',
          title: '24/7 Support',
          description: 'Get help whenever you need it',
        },
      ],
    },
  },
})
```

**Import in registry index:**
```typescript
// packages/core/src/registry/index.ts
import './sections/hero.registry'
import './sections/feature.registry'  // Add this line
```

**Run test:** `pnpm --filter @landing-builder/core test`
**Expected:** All tests pass ✓

---

### Step 7: Type Check

```bash
pnpm --filter @landing-builder/core typecheck
```

**Expected:** No type errors ✓

---

### Step 8: Manual Testing

Create a test page in the demo app:

```tsx
// apps/demo/app/test-feature/page.tsx
import { FeatureGrid } from '@landing-builder/core/sections'

export default function TestPage() {
  const config = {
    type: 'feature' as const,
    variant: 'grid' as const,
    heading: {
      title: 'Test Feature Grid',
      body: 'Testing the new section',
    },
    features: [
      { icon: '⚡', title: 'Fast', description: 'Very fast' },
      { icon: '🛡️', title: 'Secure', description: 'Very secure' },
      { icon: '📊', title: 'Analytics', description: 'Great analytics' },
    ],
  }

  return <FeatureGrid {...config} />
}
```

**Run:** `pnpm dev`
**Check:** Visit http://localhost:3000/test-feature

---

## Schema Design Best Practices

### Use Zod for Runtime Validation

Zod provides:
- Runtime type checking
- Clear error messages
- Type inference for TypeScript
- Composable schemas

```typescript
// Good: Specific error messages
const schema = z.object({
  features: z.array(featureSchema).min(2, 'At least 2 features required'),
  container: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
})

// Bad: Generic validation
const schema = z.object({
  features: z.array(featureSchema),
  container: z.string().optional(),
})
```

### Extend Base Schemas

Always extend `sectionBaseSchema` for common props:

```typescript
import { sectionBaseSchema } from './section-base.schema'

export const mySchema = sectionBaseSchema.extend({
  type: z.literal('mytype'),
  variant: z.literal('myvariant'),
  // ... specific props
})
```

### Use Shared Schemas

Reuse common schemas:

```typescript
import { headingSchema } from './heading.schema'
import { mediaSchema } from './media.schema'
import { actionSchema } from './action.schema'

export const heroSchema = sectionBaseSchema.extend({
  heading: headingSchema,
  media: mediaSchema.optional(),
  actions: z.object({
    primary: actionSchema,
    secondary: actionSchema.optional(),
  }),
})
```

### Provide Defaults Wisely

Use `.default()` for optional props with sensible defaults:

```typescript
const schema = z.object({
  container: z.enum(['sm', 'md', 'lg', 'xl']).default('lg'),
  align: z.enum(['left', 'center', 'right']).default('center'),
})
```

---

## Component Best Practices

### Use Primitives

Leverage shared primitives for consistency:

```typescript
import { Container } from '../../primitives/layouts/container'
import { Heading } from '../../primitives/content/heading'

// Good: Reuse primitives
export function MySection({ heading, container }) {
  return (
    <Container size={container}>
      <Heading {...heading} />
    </Container>
  )
}

// Bad: Duplicate layout logic
export function MySection({ heading }) {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2>{heading.title}</h2>
    </div>
  )
}
```

### Follow Tailwind Conventions

- Use responsive classes: `md:`, `lg:`
- Use semantic spacing: `space-y-6`, `gap-8`
- Use design tokens: `text-primary`, `bg-muted`

```typescript
// Good: Responsive, semantic
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// Bad: Fixed, arbitrary
<div className="flex flex-wrap" style={{ gap: '32px' }}>
```

### Server Components by Default

Prefer server components (no 'use client'):

```typescript
// Good: Server component (default)
export function MySection({ config }) {
  return <section>...</section>
}

// Only use client when needed
'use client'
export function InteractiveSection({ config }) {
  const [state, setState] = useState()
  return <section onClick={...}>...</section>
}
```

---

## Testing Requirements

Every section must have:

### 1. Schema Tests
- Valid config passes
- Invalid config throws
- Optional props work
- Defaults are applied

### 2. Component Tests
- Renders required content
- Handles optional props
- Respects layout props (container, alignment)
- Accessibility (ARIA labels, semantic HTML)

### 3. Registration Tests
- Section is registered
- Metadata is complete
- Examples validate against schema

### 4. Snapshot Tests (Optional)
```typescript
it('matches snapshot', () => {
  const { container } = render(<FeatureGrid {...config} />)
  expect(container.firstChild).toMatchSnapshot()
})
```

---

## Bundle Impact Guidelines

Classify your section's bundle impact:

### Light (< 10KB)
- Server-rendered only
- No client JavaScript
- No external dependencies
- Simple layouts and text

**Examples:** Hero sections, text blocks, simple grids

### Moderate (10-50KB)
- Some client interactivity
- Small dependencies (e.g., React hooks)
- Conditional rendering

**Examples:** Accordions, tabs, simple forms

### Heavy (> 50KB)
- Complex interactions
- Third-party libraries (video players, maps)
- Large dependencies

**Examples:** Carousels, video embeds, interactive demos

**Check bundle size:**
```bash
pnpm build
# Check .next/server/chunks for component size
```

---

## Metadata Guidelines

### Category (Visitor Job)

Choose the primary job:
- **orient**: Help visitor understand what this is
- **trust**: Build credibility and reduce anxiety
- **value**: Communicate benefits and differentiation
- **convert**: Drive specific actions

### Tags

Use searchable, lowercase tags:
```typescript
tags: ['hero', 'split', 'image', 'cta']  // Good
tags: ['Hero Section', 'WITH IMAGE']      // Bad
```

### Dependencies

List all package dependencies:
```typescript
dependencies: [
  '@landing-builder/core/primitives',
  '@landing-builder/core/ui/button',
  'framer-motion',  // External dep
]
```

### Browser Support

Note any browser limitations:
```typescript
browserSupport: 'Modern browsers (CSS Grid required)'
```

---

## Contributing Guidelines

### Before You Start

1. **Check existing sections**: Avoid duplicates
2. **Open an issue**: Discuss the new section idea
3. **Review design**: Get design approval if applicable

### Development Process

1. **Create feature branch**: `git checkout -b feature/section-name`
2. **Follow TDD workflow**: Tests first, then implementation
3. **Run all checks**:
   ```bash
   pnpm typecheck
   pnpm test
   pnpm lint
   ```
4. **Update documentation**: Add to [Component Registry](./components.md)

### Pull Request Checklist

- [ ] All tests pass
- [ ] Type checking passes
- [ ] Examples validate against schema
- [ ] Component uses primitives where applicable
- [ ] Metadata is complete
- [ ] Bundle impact is measured and documented
- [ ] README updated (if adding new patterns)
- [ ] Component registry updated

### Commit Message Format

```
type(scope): description

Examples:
feat(sections): add feature grid section
fix(hero): correct mobile layout for split variant
docs(components): add feature grid to registry
test(feature): add snapshot tests for grid layout
```

---

## Common Patterns

### Pattern: Section with Media Options

Support multiple media types:

```typescript
const mediaSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('image'), src: z.string(), alt: z.string() }),
  z.object({ kind: z.literal('video'), src: z.string(), poster: z.string() }),
])

// Component
{media.kind === 'image' && <img src={media.src} alt={media.alt} />}
{media.kind === 'video' && <video src={media.src} poster={media.poster} />}
```

### Pattern: Conditional Actions

Support optional primary/secondary actions:

```typescript
const actionsSchema = z.object({
  primary: actionSchema,
  secondary: actionSchema.optional(),
})

// Component
{actions.primary && <Button {...actions.primary} />}
{actions.secondary && <Button variant="outline" {...actions.secondary} />}
```

### Pattern: Responsive Layouts

Use mobile-first responsive design:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

---

## Debugging

### Schema Validation Errors

```bash
# Run schema tests in watch mode
pnpm --filter @landing-builder/core test feature.schema.spec.ts --watch
```

Add debug logging:
```typescript
const result = schema.safeParse(config)
if (!result.success) {
  console.log('Validation errors:', result.error.format())
}
```

### Component Rendering Issues

```bash
# Run component tests in watch mode
pnpm --filter @landing-builder/core test feature-grid.spec.tsx --watch
```

Use React DevTools to inspect props and state.

### Type Errors

```bash
# Run type checking
pnpm --filter @landing-builder/core typecheck
```

Check inferred types:
```typescript
import type { z } from 'zod'
type Inferred = z.infer<typeof mySchema>
// Hover over Inferred in VS Code to see the type
```

---

## Advanced Topics

### Custom Validation Logic

Add custom Zod refinements:

```typescript
const schema = z.object({
  features: z.array(featureSchema),
}).refine(
  (data) => data.features.length % 3 === 0,
  { message: 'Features must be divisible by 3 for grid layout' }
)
```

### Async Components (Server Components)

Fetch data in server components:

```typescript
export async function DataDrivenSection({ config }) {
  const data = await fetchData(config.dataSource)
  return <section>{data.map(...)}</section>
}
```

### Variants with Shared Logic

Extract shared logic for multiple variants:

```typescript
// Base component
function FeatureBase({ features, layout }) {
  return (
    <div className={layout === 'grid' ? 'grid' : 'flex'}>
      {features.map(...)}
    </div>
  )
}

// Variant wrappers
export function FeatureGrid(props) {
  return <FeatureBase {...props} layout="grid" />
}

export function FeatureList(props) {
  return <FeatureBase {...props} layout="list" />
}
```

---

## Next Steps

- **Review existing sections**: `packages/core/src/components/landing/sections/`
- **Study the registry**: `packages/core/src/registry/`
- **Check tests**: `packages/core/src/__tests__/`
- **Join discussions**: Open an issue to propose new sections

---

**You're now ready to extend the platform with new sections.** Start with the TDD workflow and follow the section definition contract for consistency.
