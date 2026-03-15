# Component Registry

This is the catalog of all registered landing page sections. Each section is designed to serve a specific visitor job (orient, trust, value, convert).

**Navigation:**
- [Hero Sections](#hero-sections) - Orient visitors
- [Feature Sections](#feature-sections) - Communicate value (Coming Soon)
- [Testimonial Sections](#testimonial-sections) - Build trust (Coming Soon)
- [CTA Sections](#cta-sections) - Drive conversion (Coming Soon)

---

## Section Categories

Sections are organized by the visitor job they serve:

| Category | Job | When to Use |
|----------|-----|-------------|
| **Orient** | Help visitors understand what this is | First sections, above fold |
| **Trust** | Build credibility and reduce anxiety | After orient, before convert |
| **Value** | Communicate benefits and differentiators | Middle of page, support conversion |
| **Convert** | Drive specific actions (signup, purchase) | Throughout page, especially end |

---

## Hero Sections

**Category:** Orient
**Purpose:** Help visitors quickly understand what the product/service is and whether they're in the right place.

### Hero Split

**Variant:** `hero:split`

50/50 split layout with text on left, media on right. Best for products with strong visual identity.

**Metadata:**
- **Bundle Impact:** Light (< 10KB)
- **Render Mode:** Server
- **Dependencies:** `@landing-builder/core/primitives`
- **Tags:** hero, split, image, cta

**When to Use:**
- Product has compelling visuals (screenshot, dashboard, diagram)
- Desktop-first audience
- Need to establish visual identity immediately

**When NOT to Use:**
- Mobile-first audience (image stacks below text on mobile)
- Product is conceptual/abstract with no good visual
- Text-heavy value proposition needs more space

#### Basic Example

```json
{
  "type": "hero",
  "variant": "split",
  "heading": {
    "title": "Build beautiful landing pages",
    "body": "Create stunning, conversion-optimized landing pages with our visual builder."
  },
  "media": {
    "kind": "image",
    "src": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    "alt": "Dashboard preview"
  },
  "actions": {
    "primary": {
      "type": "link",
      "label": "Get Started",
      "href": "/signup"
    }
  }
}
```

**Renders:**
- Heading with title and body text (left column)
- Primary CTA button
- Hero image (right column)
- Responsive: stacks vertically on mobile

#### Advanced Example

```json
{
  "type": "hero",
  "variant": "split",
  "container": "xl",
  "heading": {
    "eyebrow": "Introducing v2.0",
    "title": "Build beautiful landing pages",
    "body": "Create stunning, conversion-optimized landing pages with our visual builder. No code required.",
    "align": "left"
  },
  "media": {
    "kind": "image",
    "src": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    "alt": "Dashboard preview"
  },
  "actions": {
    "primary": {
      "type": "link",
      "label": "Get Started",
      "href": "/signup",
      "target": "_self"
    },
    "secondary": {
      "type": "link",
      "label": "Learn More",
      "href": "/docs",
      "target": "_self"
    }
  }
}
```

**Adds:**
- Eyebrow text above title
- Wider container (`xl`)
- Secondary CTA button
- Explicit text alignment
- Target attributes for links

#### Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `type` | `'hero'` | Yes | - | Section type |
| `variant` | `'split'` | Yes | - | Section variant |
| `container` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | No | `'lg'` | Max-width container size |
| `heading.eyebrow` | `string` | No | - | Small text above title |
| `heading.title` | `string` | Yes | - | Main headline |
| `heading.body` | `string` | No | - | Supporting description text |
| `heading.align` | `'left' \| 'center' \| 'right'` | No | `'left'` | Text alignment |
| `media.kind` | `'image'` | Yes | - | Media type (only image supported) |
| `media.src` | `string` | Yes | - | Image URL |
| `media.alt` | `string` | Yes | - | Alt text for accessibility |
| `actions.primary` | `Action` | Yes | - | Primary CTA button |
| `actions.secondary` | `Action` | No | - | Optional secondary CTA |

**Action Type:**
```typescript
{
  type: 'link'
  label: string
  href: string
  target?: '_self' | '_blank'
}
```

#### Implementation Reference

- **Component:** `packages/core/src/components/landing/sections/hero/hero-split.tsx`
- **Schema:** `packages/core/src/registry/schemas/hero.schema.ts`
- **Registration:** `packages/core/src/registry/sections/hero.registry.ts`
- **Tests:** `packages/core/src/components/landing/sections/hero/__tests__/hero-split.spec.tsx`

#### Design Notes

**Layout:**
- Desktop: 50/50 split with text on left, image on right
- Tablet: 50/50 maintained
- Mobile: Stacks vertically (text above, image below)

**Spacing:**
- Section padding: `py-12 md:py-24` (48px mobile, 96px desktop)
- Grid gap: `gap-8 lg:gap-12` (32px tablet, 48px desktop)
- Heading spacing: `space-y-6` (24px between elements)
- Button gap: `gap-4` (16px between CTAs)

**Typography:**
- Uses `Heading` primitive for consistent sizing
- CTA buttons use `text-sm font-medium`

**Colors:**
- Primary button: `bg-primary text-primary-foreground`
- Secondary button: `border-border bg-background`
- Hover states: `hover:bg-primary/90`, `hover:bg-muted`

#### Accessibility

- Images require `alt` text
- Semantic HTML: `<section>`, `<a>`, `<h1>` (from Heading primitive)
- Keyboard navigable (links are focusable)
- ARIA labels inherited from primitives

#### Performance

- **Bundle Impact:** Light
- Server-rendered (no client JavaScript)
- Images should be optimized externally
- Use Next.js Image component for automatic optimization (future enhancement)

#### Browser Support

- Modern browsers (CSS Grid required)
- IE11: Not supported (uses CSS Grid and custom properties)
- Safari: Full support (9+)
- Chrome/Firefox/Edge: Full support

#### Known Limitations

- Only image media supported (no video variant yet)
- Actions must be links (no form submission support yet)
- Image not optimized automatically (use external CDN)
- No built-in lazy loading (relies on browser native lazy loading)

---

## Feature Sections

**Coming Soon**

Sections to communicate product value and benefits.

**Planned variants:**
- `feature:grid` - Grid layout with icons
- `feature:alternating` - Alternating image/text rows
- `feature:list` - Vertical list with details

---

## Testimonial Sections

**Coming Soon**

Sections to build trust through social proof.

**Planned variants:**
- `testimonial:carousel` - Scrolling testimonial cards
- `testimonial:grid` - Grid of customer quotes
- `social-proof:logo-cloud` - Customer/partner logos

---

## CTA Sections

**Coming Soon**

Sections to drive specific conversion actions.

**Planned variants:**
- `cta:simple` - Single focused call-to-action
- `cta:split` - CTA with supporting image
- `form:lead-capture` - Email or lead capture form

---

## Using Sections in Your Page

Import and use sections in your Next.js page:

```tsx
// app/page.tsx
import { HeroSplit } from '@landing-builder/core/sections'

export default function LandingPage() {
  const heroConfig = {
    type: 'hero' as const,
    variant: 'split' as const,
    heading: {
      title: 'Your headline',
      body: 'Your description',
    },
    media: {
      kind: 'image' as const,
      src: '/hero-image.jpg',
      alt: 'Hero image',
    },
    actions: {
      primary: {
        type: 'link' as const,
        label: 'Get Started',
        href: '/signup',
      },
    },
  }

  return (
    <main>
      <HeroSplit {...heroConfig} />
      {/* Add more sections */}
    </main>
  )
}
```

**Note:** Use `as const` for literal types to satisfy TypeScript's strict type checking.

---

## Bundle Impact Reference

Understanding bundle sizes helps you optimize page performance.

| Impact Level | Size | Characteristics | Examples |
|--------------|------|-----------------|----------|
| **Light** | < 10KB | Server-rendered, no client JS, simple layouts | Hero sections, text blocks |
| **Moderate** | 10-50KB | Some interactivity, small dependencies | Accordions, tabs, simple forms |
| **Heavy** | > 50KB | Complex interactions, third-party libs | Carousels, video players, maps |

**Recommendation:** Keep total page bundle < 100KB for optimal performance.

---

## Section Composition Patterns

### Pattern: SaaS Homepage

```json
{
  "sections": [
    { "type": "hero", "variant": "split" },          // Orient: What is this?
    { "type": "social-proof", "variant": "logos" },  // Trust: Who uses it?
    { "type": "feature", "variant": "grid" },        // Value: What can I do?
    { "type": "testimonial", "variant": "carousel" }, // Trust: Does it work?
    { "type": "cta", "variant": "simple" }           // Convert: Sign up now
  ]
}
```

**Jobs flow:** Orient → Trust → Value → Trust → Convert

### Pattern: Lead Magnet (eBook/Guide)

```json
{
  "sections": [
    { "type": "hero", "variant": "centered" },       // Orient: What's the offer?
    { "type": "social-proof", "variant": "logos" },  // Trust: Who endorses this?
    { "type": "form", "variant": "lead-capture" }    // Convert: Get it now
  ]
}
```

**Jobs flow:** Orient → Trust → Convert (short, focused)

### Pattern: Event/Webinar Registration

```json
{
  "sections": [
    { "type": "hero", "variant": "split" },          // Orient: What's the event?
    { "type": "feature", "variant": "list" },        // Value: What will I learn?
    { "type": "testimonial", "variant": "grid" },    // Trust: Past attendee feedback
    { "type": "form", "variant": "lead-capture" }    // Convert: Register now
  ]
}
```

**Jobs flow:** Orient → Value → Trust → Convert

---

## Searching Sections

### By Category

- **Orient sections:** `type: 'hero'`
- **Trust sections:** `type: 'testimonial' | 'social-proof'`
- **Value sections:** `type: 'feature' | 'comparison'`
- **Convert sections:** `type: 'cta' | 'pricing' | 'form'`

### By Tag

Search sections by tag in the metadata:

- **Image-heavy:** `tags: ['image']`
- **Video support:** `tags: ['video']`
- **CTA included:** `tags: ['cta']`
- **Form elements:** `tags: ['form']`

### By Bundle Impact

Filter by performance requirements:

- **Light sections:** `bundleImpact: 'light'`
- **Moderate sections:** `bundleImpact: 'moderate'`
- **Heavy sections:** `bundleImpact: 'heavy'`

---

## Adding New Sections

Want to add a new section? See the [Extend Platform Guide](./extend-platform.md) for detailed instructions.

**Quick overview:**
1. Write schema tests
2. Create Zod schema
3. Write component tests
4. Implement component
5. Register section
6. Add documentation here

---

## FAQ

**Q: Can I customize a section's styling?**
A: Yes, all sections accept a `className` prop for custom Tailwind classes. For deeper customization, create a new variant.

**Q: How do I know which variant to use?**
A: Check the "When to Use" guidance for each variant. Consider your audience (mobile vs desktop), content type (visual vs text-heavy), and conversion goal.

**Q: Can I use multiple instances of the same section?**
A: Yes! Use the same section type multiple times on a page if needed.

**Q: Why are some sections server-rendered and others client-rendered?**
A: Server-rendered sections ship no JavaScript to the browser, improving performance. Client-rendered sections add interactivity but increase bundle size.

**Q: How do I report a bug or request a feature for a section?**
A: Open an issue on GitHub with the section name, current behavior, and expected behavior.

---

## Contributing

Help us expand the component registry:

1. **Propose new sections** via GitHub issues
2. **Submit implementations** following the [Extend Platform Guide](./extend-platform.md)
3. **Improve documentation** by submitting PRs for this page
4. **Share usage examples** from your real-world projects

---

**Browse, compose, and ship beautiful landing pages with the component registry.**
