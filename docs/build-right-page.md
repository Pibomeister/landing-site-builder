# Build Right Page Guide

This guide teaches you how to compose effective landing pages using the section registry and visitor jobs framework.

**Who is this for?** Product managers, technical marketers, and developers who want to build conversion-focused landing pages.

**What you'll learn:**
- How to compose pages from JSON configs
- The visitor jobs framework (orient, trust, value, convert)
- How to choose the right sections
- Section categories and when to use them
- Advanced composition patterns

---

## Understanding Landing Page Composition

Landing Site Builder uses a **jobs-to-be-done** framework. Every section serves a specific visitor job:

| Job Category | What it does | When to use |
|-------------|--------------|-------------|
| **Orient** | Help visitors understand what this is | First sections, above fold |
| **Trust** | Build credibility and reduce anxiety | After orient, before convert |
| **Value** | Communicate benefits and differentiators | Middle of page, support conversion |
| **Convert** | Drive action (signup, purchase, download) | Throughout page, especially end |

**The fundamental principle:** Choose sections based on *what job the visitor needs done* at each stage of the page, not just what looks nice.

---

## Page Configuration Basics

Pages are defined as JSON-like configurations with an array of sections:

```tsx
// apps/demo/app/page.tsx
const pageConfig = {
  sections: [
    {
      type: 'hero',
      variant: 'split',
      heading: {
        title: 'Your headline',
        body: 'Your description',
      },
      actions: {
        primary: { type: 'link', label: 'Get Started', href: '/signup' },
      },
      media: {
        kind: 'image',
        src: 'https://example.com/image.jpg',
        alt: 'Hero image',
      },
    },
    // More sections...
  ],
}
```

### Section Structure

Every section has:
- **`type`**: The section category (hero, feature, testimonial, etc.)
- **`variant`**: The layout variant (split, centered, grid, etc.)
- **Configuration props**: Specific to each section type

### Common Configuration Props

Most sections support these props:

```typescript
{
  type: 'hero',
  variant: 'split',

  // Container size (affects max-width)
  container?: 'sm' | 'md' | 'lg' | 'xl' | 'full',

  // Heading configuration
  heading: {
    eyebrow?: string,    // Small text above title
    title: string,        // Main headline
    body?: string,        // Supporting text
    align?: 'left' | 'center' | 'right',
  },

  // Actions/CTAs
  actions?: {
    primary: {
      type: 'link',
      label: string,
      href: string,
      target?: '_self' | '_blank',
    },
    secondary?: {
      type: 'link',
      label: string,
      href: string,
    },
  },

  // Media (images, video)
  media?: {
    kind: 'image' | 'video',
    src: string,
    alt: string,
  },
}
```

---

## Section Categories and Variants

### Orient Sections

**Job:** Help visitors understand what this is and whether they're in the right place.

**When to use:** First sections, above the fold

**Available sections:**

#### `hero:split`
50/50 split layout with text on left, media on right. Best for products with strong visual identity.

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
    "src": "https://example.com/dashboard.png",
    "alt": "Dashboard preview"
  },
  "actions": {
    "primary": {
      "type": "link",
      "label": "Get Started Free",
      "href": "/signup"
    }
  }
}
```

**When to use:**
- Product has compelling visuals (screenshot, demo, diagram)
- Desktop-first audience
- Need to establish visual identity immediately

**When NOT to use:**
- Mobile-first audience (image stacks below text on mobile)
- Product is conceptual/abstract (no good visual)
- Text-heavy value proposition needs more space

#### `hero:centered` (Coming soon)
Centered text with optional background media. Best for broad appeal messages.

#### `hero:video` (Coming soon)
Full-width video background with overlay text. High impact, high bundle cost.

### Trust Sections (Coming soon)

**Job:** Build credibility and reduce purchase anxiety

**Sections:**
- `testimonial:carousel` - Customer quotes with photos
- `social-proof:logo-cloud` - Customer/partner logos
- `case-study:featured` - Detailed success story

### Value Sections (Coming soon)

**Job:** Communicate benefits and differentiation

**Sections:**
- `feature:grid` - Feature list in grid layout
- `feature:alternating` - Features with alternating image/text
- `comparison:table` - Compare plans or vs competitors

### Convert Sections (Coming soon)

**Job:** Drive specific actions

**Sections:**
- `cta:simple` - Single focused CTA
- `pricing:table` - Pricing tiers with features
- `form:lead-capture` - Email signup or contact form

---

## Choosing the Right Sections

Use this decision framework:

### 1. Start with Visitor Jobs

Ask: "What does the visitor need to do at this stage?"

**Example journey:**
1. Orient: "What is this product?"
2. Trust: "Can I trust this company?"
3. Value: "Why is this better than alternatives?"
4. Convert: "What's my next step?"

### 2. Match Section to Job

**Orient job** → Choose from hero variants
**Trust job** → Choose from testimonial, social proof, case study
**Value job** → Choose from feature, comparison, benefits
**Convert job** → Choose from CTA, pricing, form

### 3. Consider Bundle Impact

Every section has a bundle impact score:
- **Light**: < 10KB, server-rendered, no client JS
- **Moderate**: 10-50KB, some interactivity
- **Heavy**: > 50KB, complex interactions, third-party libs

**Rule of thumb:** Use mostly light sections, sprinkle moderate sections for key interactions, use heavy sections sparingly.

### 4. Validate with Examples

Check the section's `examples` in the registry:
- Does the `basic` example fit your use case?
- Does the `advanced` example show the features you need?

See [Component Registry](./components.md) for all examples.

---

## Common Page Patterns

### Pattern 1: SaaS Product Launch

**Goal:** Sign up free trial users

```json
{
  "sections": [
    {
      "type": "hero",
      "variant": "split",
      "heading": {
        "eyebrow": "New Release",
        "title": "Ship features faster",
        "body": "Our platform helps teams ship 10x faster with built-in CI/CD and instant previews."
      },
      "actions": {
        "primary": { "label": "Start Free Trial", "href": "/signup" },
        "secondary": { "label": "Watch Demo", "href": "/demo" }
      }
    }
    // Add: feature grid, testimonials, pricing, CTA
  ]
}
```

**Jobs sequence:** Orient → Value → Trust → Convert

### Pattern 2: eBook Download

**Goal:** Capture email for lead magnet

```json
{
  "sections": [
    {
      "type": "hero",
      "variant": "centered",
      "heading": {
        "title": "The Complete Guide to SEO in 2024",
        "body": "Download our 50-page playbook used by 10,000+ marketers."
      }
    }
    // Add: social proof (logos), form (email capture), testimonials
  ]
}
```

**Jobs sequence:** Orient → Trust → Convert (short page, fast conversion)

### Pattern 3: Webinar Registration

**Goal:** Drive registrations for an event

```json
{
  "sections": [
    {
      "type": "hero",
      "variant": "split",
      "heading": {
        "eyebrow": "Live Webinar - March 20",
        "title": "How to 10x Your Conversion Rate",
        "body": "Join 500+ marketers for a live workshop with conversion experts."
      },
      "media": {
        "kind": "image",
        "src": "/speaker-headshot.jpg"
      }
    }
    // Add: speaker bios (trust), agenda (value), form (convert)
  ]
}
```

**Jobs sequence:** Orient → Trust → Value → Convert

---

## Advanced Composition Techniques

### Container Sizing Strategy

Use container sizes to create visual hierarchy:

```json
{
  "sections": [
    { "type": "hero", "variant": "split", "container": "xl" },      // Wide hero for impact
    { "type": "feature", "variant": "grid", "container": "lg" },    // Standard width for readability
    { "type": "testimonial", "variant": "carousel", "container": "md" }, // Narrow for focus
    { "type": "cta", "variant": "simple", "container": "sm" }       // Very narrow for urgency
  ]
}
```

**Effect:** Creates a rhythmic narrowing that guides eye movement toward conversion.

### Eyebrow Text for Context

Use eyebrows to add context without cluttering headlines:

```json
{
  "heading": {
    "eyebrow": "Trusted by 50,000+ teams",  // Social proof
    "title": "The fastest way to ship code",
    "body": "Deploy in seconds, not hours."
  }
}
```

**Use cases:**
- Social proof ("Trusted by...", "Used by...")
- Announcements ("New Release", "Limited Time")
- Categories ("For Developers", "Enterprise Solution")

### CTA Hierarchy

Primary vs secondary actions create decision scaffolding:

```json
{
  "actions": {
    "primary": {
      "label": "Start Free Trial",    // High commitment, high value
      "href": "/signup"
    },
    "secondary": {
      "label": "See How It Works",    // Low commitment, education
      "href": "/demo"
    }
  }
}
```

**Pattern:** Primary = conversion action, Secondary = learning action

---

## Validation and Type Safety

All section configs are validated with Zod schemas. Invalid configs will fail at build time:

**Example error:**
```
Error: Invalid section configuration at sections[0]
Expected: { type: 'hero', variant: 'split', heading: { title: string } }
Received: { type: 'hero', variant: 'split', heading: { title: 123 } }
         Invalid type: Expected string, received number at heading.title
```

**Common validation errors:**

1. **Missing required fields**
   ```
   Error: heading.title is required
   ```
   Fix: Add the required field

2. **Invalid variant**
   ```
   Error: variant must be one of: split, centered
   ```
   Fix: Use a valid variant from the registry

3. **Invalid action type**
   ```
   Error: actions.primary.type must be 'link'
   ```
   Fix: Currently only 'link' type is supported

See schema definitions in `packages/core/src/registry/schemas/`

---

## Performance Considerations

### Bundle Impact

Check bundle impact in the [Component Registry](./components.md):

- **Page with 5 light sections:** ~20KB total
- **Page with 3 light + 2 moderate:** ~50KB total
- **Page with 1 heavy section:** Can add 100KB+

**Recommendation:** Keep total bundle < 100KB for optimal performance.

### Server vs Client Rendering

Most sections are server-rendered by default (`renderMode: 'server'`). They ship zero JavaScript to the client.

**Client-rendered sections** (e.g., carousels, forms with validation) add interactivity but increase bundle size.

**Strategy:** Use server-rendered sections for static content, client-rendered for interactive features.

### Image Optimization

Always use Next.js Image component for automatic optimization:
- Lazy loading
- Responsive sizes
- Modern formats (WebP, AVIF)

```json
{
  "media": {
    "kind": "image",
    "src": "/hero-image.jpg",  // Will be auto-optimized by Next.js
    "alt": "Product dashboard"
  }
}
```

---

## Testing Your Page

### Visual Testing Checklist

Test on multiple viewports:
- [ ] Mobile (375px) - Stacked layouts work well
- [ ] Tablet (768px) - Transition breakpoints are clean
- [ ] Desktop (1440px) - Content doesn't feel too wide

### Content Testing Checklist

- [ ] Headline passes 5-second test (visitor knows what this is)
- [ ] CTA is clear and action-oriented
- [ ] Images have descriptive alt text
- [ ] All links work and go to correct destinations

### Performance Testing

```bash
# Run Lighthouse audit
pnpm build
pnpm start
# Open Chrome DevTools > Lighthouse > Run audit
```

**Targets:**
- Performance: > 90
- Accessibility: > 95
- SEO: > 90

---

## Next Steps

- **Browse the registry**: [Component Registry](./components.md)
- **Extend the platform**: [Extend Platform Guide](./extend-platform.md)
- **See examples**: Check `packages/core/src/registry/sections/` for real configs

---

## FAQ

**Q: Can I use custom HTML in section configs?**
A: No, configs are strictly typed JSON. To add custom content, create a new section.

**Q: How do I reorder sections?**
A: Reorder the objects in the `sections` array. The order in the array is the render order.

**Q: Can sections share state (e.g., form data across multiple sections)?**
A: Not yet. Sections are currently isolated. Use a single form section for multi-step flows.

**Q: How do I A/B test different section variants?**
A: Create multiple page configs and use feature flags or URL parameters to switch between them.

**Q: Can I use the same section type multiple times on one page?**
A: Yes! Repeat any section type as many times as needed.

---

**Now you're ready to build effective, conversion-focused landing pages.** Start by choosing your first section based on the visitor's primary job to be done.
