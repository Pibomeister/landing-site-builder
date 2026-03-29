# UI/UX Pro Max Audit Report
**Project:** landing-site-builder (saas-template + @landing-builder/core)
**Audit Date:** 2026-03-29
**Auditor:** Senior Design Systems Engineer

---

## 1. Executive Summary

### Overall Grade: **B-**

The base UI component library (shadcn-style, Base UI primitives) is well-structured with consistent CVA usage, semantic tokens, and solid accessibility fundamentals. However, the landing-section layer — the public-facing page-building components in `packages/core` — has significant quality divergence from the base layer, introducing hardcoded values, broken design system contracts, and missing component reuse. A split personality exists between the polish of the `/ui` primitives and the roughness of the landing primitives.

### Top 3 Wins

1. **Semantic Token System** — `globals.css` correctly defines all design tokens as HSL CSS variables with a coherent SaaS trust blue palette. The tailwind config maps all tokens correctly and adds `success`, `warning`, `info` semantic colors beyond the standard set.
2. **CVA + cn() Discipline in /ui Components** — The base UI components use `class-variance-authority` consistently, pass `className` through `cn()`, and use `data-slot` attributes for context-aware compound component targeting. This is professional-grade composability.
3. **Accessibility Fundamentals** — Skip-to-content link in layout, `aria-invalid`, `aria-live`, `aria-busy`, `role="alert"`, `role="status"`, and focus-visible ring patterns are implemented across form elements. Reduced-motion media query is honored globally.

### Top 3 Critical Issues

1. **[P0] WaitlistForm uses raw `<input>` and `<button>` instead of design system components** — The form at `packages/core/src/components/landing/chrome/waitlist-form.tsx` hardcodes styling classes that diverge from the `Input` and `Button` primitives. The loading spinner is a hand-rolled CSS border trick instead of the `Spinner` component. This breaks the entire design system contract for the public-facing form — the entry point of the product.
2. **[P0] HeroSplit CTA buttons are hardcoded, not using the Button component** — `packages/core/src/components/landing/sections/hero/hero-split.tsx` renders `<a>` tags with manually duplicated button styles (`px-8 py-4 rounded-lg bg-primary text-primary-foreground`), bypassing the `Button` component entirely. Any button style change in the design system will not propagate here.
3. **[P0] SectionError in PageRenderer uses hardcoded Tailwind color classes** — `apps/saas-template/src/components/page-renderer.tsx` line 25-26 uses `border-red-300 bg-red-50 text-red-800 text-red-600` — raw Tailwind palette colors, not semantic tokens (`destructive`, `destructive-foreground`). This breaks dark mode and token-driven theming.

---

## 2. Component-by-Component Audit

### 2.1 Button (`apps/saas-template/src/components/ui/button.tsx`)
**Score: 9/10**

**Wins:**
- Comprehensive variant set: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`, `success`
- Full icon size variants: `icon`, `icon-xs`, `icon-sm`, `icon-lg`
- `active:scale-[0.98]` micro-interaction for tactile feedback
- Focus ring using `ring-3 ring-ring/50` — consistent with all form controls
- `aria-invalid` state properly styled

**Issues:**
- Line 13: `[a]:hover:bg-primary/80` — this selector syntax (`[a]:`) is an atypical Base UI-specific selector. It makes the default variant hover only apply inside `<a>` tags. The `default` variant has no hover state for `<button>` elements. A standard `hover:bg-primary/90` should be added as a fallback.
- Line 23: `success` variant references `bg-success text-success-foreground` — good. But `success` is defined in tailwind.config.ts but the `destructive` variant diverges — it uses `bg-destructive/10 text-destructive` (tinted, not solid). No `success` tinted variant exists. Asymmetry in semantic color treatment.
- `size: 'default'` sets `h-8` (32px). `size: 'lg'` sets `h-12` (48px). There is no `md` size between 32px and 48px. A `h-10` (40px) mid-size is a common need for landing page CTAs.

**Recommended Fixes:**
```tsx
// Line 13 — add explicit hover for button elements
default: 'bg-primary text-primary-foreground hover:bg-primary/90 [a]:hover:bg-primary/80',
```

---

### 2.2 Input (`apps/saas-template/src/components/ui/input.tsx`)
**Score: 8/10**

**Wins:**
- Full error state via `aria-invalid`
- Disabled state properly handled
- Dark mode coverage

**Issues:**
- Line 12: `text-base` on desktop, `md:text-sm` — this is correct iOS zoom-prevention technique but inconsistent with the `text-sm` used by most other form controls at all breakpoints.
- No `py-1` symmetry note: `px-2.5 py-1` gives vertical rhythm of 4px top+bottom within h-8. This is fine but undocumented.
- Missing `type="search"` specific clear button styling.
- No `InputPrimitive` import matters verified — uses `@base-ui/react/input` correctly.

---

### 2.3 Textarea (`apps/saas-template/src/components/ui/textarea.tsx`)
**Score: 7/10**

**Issues:**
- Line 10: `field-sizing-content` — this CSS property is not universally supported (Chrome 123+, no Firefox as of audit date). `min-h-16` is a reasonable fallback but users on Firefox will see a fixed-height textarea with no auto-grow.
- Same `text-base md:text-sm` inconsistency as Input.
- No `resize` prop control — consumers cannot lock resize to vertical-only without className override.
- No max-height variant or class — unconstrained auto-growth can break layouts.

---

### 2.4 Card (`apps/saas-template/src/components/ui/card.tsx`)
**Score: 8/10**

**Wins:**
- Compound component pattern well executed: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`
- `size="sm"` data-attribute propagation through group context
- `ring-1 ring-foreground/10` border approach is clean (no explicit border color token needed)

**Issues:**
- Line 15: `gap-4` in Card root, `data-[size=sm]:gap-3` — but `gap-3` is 12px, not on the 8px grid. Should be `gap-2` (8px) or `gap-4` (16px).
- `CardTitle` (line 37) renders as `<div>`, not `<h3>` or `<h2>`. Semantic heading level is lost. Screen readers cannot navigate to card titles as headings. This is an accessibility gap.
- `CardDescription` (line 50) is also a `<div>`, not `<p>`. Minor but semantically incorrect.
- No `loading` state or skeleton variant built into the Card compound.

**Recommended Fix (P1):**
```tsx
// Line 37 — change CardTitle from div to h3 with configurable level
function CardTitle({ className, as: Tag = 'h3', ...props }: React.ComponentProps<'h3'> & { as?: 'h2' | 'h3' | 'h4' }) {
```

---

### 2.5 Badge (`apps/saas-template/src/components/ui/badge.tsx`)
**Score: 7/10**

**Issues:**
- Line 8: `rounded-4xl` — this is a custom/non-standard value. Tailwind v3 uses `rounded-full` for pill shapes. `rounded-4xl` only exists if extended in the tailwind config — it is NOT extended in `tailwind.config.ts`. This class will silently no-op in production.
- Line 8: `h-5` (20px) fixed height with `py-0.5` padding — the height will be overridden by line-height on text content taller than 12px. No `leading-none` is applied, making the 20px height unreliable.
- `ghost` variant (line 17) has hover state but no active state.
- `link` variant (line 18) has no `cursor-pointer` set.

**Recommended P0 Fix:**
```tsx
// Line 8 — replace rounded-4xl (undefined) with rounded-full (pill shape)
'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs leading-none font-medium ...'
```

---

### 2.6 Alert (`apps/saas-template/src/components/ui/alert.tsx`)
**Score: 7/10**

**Issues:**
- Only 2 variants: `default` and `destructive`. Missing `success`, `warning`, `info` — despite these semantic colors being defined in the design system tokens. Any usage of an info/success state requires manual className overrides that bypass CVA.
- Line 11: `default` variant uses `bg-card text-card-foreground` — this means the alert blends into a card background rather than having its own distinct background. On a page background, the alert is invisible without the border.
- Line 7: `pr-18` is a non-standard Tailwind spacing value. Tailwind v3's default scale goes up to `pr-16` (64px) then jumps to `pr-20` (80px). `pr-18` = 72px likely doesn't exist unless configured.
- `AlertTitle` renders as `<div>` — should be a semantic `<strong>` or `<p role="heading">`.

**Recommended Fix:**
```tsx
// Add missing semantic variants to alertVariants
success: 'bg-success/10 text-success border-success/20',
warning: 'bg-warning/10 text-warning border-warning/20',
info: 'bg-info/10 text-info border-info/20',
```

---

### 2.7 Accordion (`apps/saas-template/src/components/ui/accordion.tsx`)
**Score: 8/10**

**Wins:**
- Uses two separate icons (ChevronDown/ChevronUp) with conditional visibility via `group-aria-expanded` — cleaner than CSS rotation trick

**Issues:**
- Line 34: `hover:underline` on the trigger — underline is a text decoration convention for links, not interactive disclosure controls. Buttons should use background change on hover, not underline.
- No `size` variant — a `sm` and `lg` size would be useful for different density needs.
- `AccordionContent` panel height animation uses CSS custom property `h-(--accordion-panel-height)` — relies on Base UI setting this variable. If Base UI changes this API, animation breaks silently.

---

### 2.8 Tabs (`apps/saas-template/src/components/ui/tabs.tsx`)
**Score: 8/10**

**Wins:**
- Two variants: `default` (pill) and `line`
- Vertical orientation support via `orientation` prop
- Animated underline indicator for `line` variant

**Issues:**
- `TabsTrigger` has an excessively long className string (line 54-58) with 5 distinct `cn()` arguments. This makes the component hard to read and maintain. Some of the logic (especially the dark mode overrides for line variant) could be moved into the CVA structure.
- `text-foreground/60` for inactive tabs — 60% opacity of foreground. Exact contrast ratio is context-dependent but may fail WCAG AA (4.5:1) against the muted background in some themes.

---

### 2.9 Select (`apps/saas-template/src/components/ui/select.tsx`)
**Score: 8/10**

**Wins:**
- Positioner pattern correctly abstracts positioning logic
- Scroll buttons for long lists
- `alignItemWithTrigger` prop for item alignment

**Issues:**
- `SelectTrigger` line 44: `w-fit` by default — this makes the select collapse to content width. In form contexts, `w-full` is almost always desired. The default should be `w-full` with an opt-in `w-fit` size variant.
- `SelectItem` line 114: `focus:bg-accent` — uses `accent` token for focus, but accent is defined as orange (#EA580C) in this design system. Orange focus state on menu items is jarring. Should use `focus:bg-muted`.

**Recommended Fix (P1):**
```tsx
// SelectItem line 114 — replace accent focus with muted
'relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-muted focus:text-foreground ...'
```

---

### 2.10 Dialog (`apps/saas-template/src/components/ui/dialog.tsx`)
**Score: 8/10**

**Wins:**
- `showCloseButton` prop for opt-in/opt-out
- Animated overlay and popup
- `DialogFooter` with optional close button

**Issues:**
- Overlay (line 31): `bg-black/10` — 10% opacity on black. In light mode this is barely visible (very slight gray wash). Industry standard is `bg-black/50` for modal overlays. The low opacity makes modals feel unanchored and reduces focus on the dialog content.
- `DialogContent` max width: `sm:max-w-sm` = 384px. No size prop exists. `AlertDialogContent` has a `size` prop but `DialogContent` does not. Inconsistency in the compound pair.

---

### 2.11 Field System (`apps/saas-template/src/components/ui/field.tsx`)
**Score: 9/10**

**Wins:**
- Excellent compound system: `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, `FieldContent`, `FieldTitle`, `FieldSeparator`
- `FieldError` handles multiple errors with deduplication logic
- CVA orientation variants: `vertical`, `horizontal`, `responsive`
- Container query (`@md/field-group`) for responsive layout

**Issues:**
- `FieldTitle` (line 109) sets `data-slot="field-label"` — same slot as `FieldLabel` (line 98). Duplicate slot name will cause selector conflicts in compound components that target `data-slot=field-label`. This is a silent bug.
- `FieldError` uses `==` (line 186) instead of `===` for strict equality. Minor code quality issue but violates TypeScript best practices.

---

### 2.12 Skeleton (`apps/saas-template/src/components/ui/skeleton.tsx`)
**Score: 6/10**

**Issues:**
- `animate-pulse` is the only animation. No shimmer/wave variant which is the current industry standard for perceived performance.
- No size or shape variants — every use case requires manual className. A `Skeleton` component without variants is just a thin wrapper around a div.
- No `aria-busy` or `aria-label="Loading..."` — screen readers get no information about loading states.
- `rounded-md` is hardcoded — should follow the component's shape context (some skeletons should be `rounded-full` for avatar shapes, etc.)

---

### 2.13 Spinner (`apps/saas-template/src/components/ui/spinner.tsx`)
**Score: 7/10**

**Wins:**
- `role="status"` and `aria-label="Loading"` for accessibility

**Issues:**
- `size-4` (16px) is the only size. No variant for different contexts (inline, button, page-level).
- `aria-label="Loading"` is hardcoded — should be customizable via prop so screen readers can say "Saving..." or "Submitting..." in context.

---

### 2.14 Heading (`packages/core/src/components/landing/primitives/content/heading.tsx`)
**Score: 5/10**

**Issues:**
- Line 18: `tracking-[0.15em]` — hardcoded arbitrary value. Should use Tailwind's `tracking-widest` or a design token.
- Line 21: `font-display font-normal` — the Calistoga font is loaded at weight 400 only (in `layout.tsx`). `font-normal` is redundant. But also, using the display font at `font-normal` for all heading sizes is fine aesthetically. However there is no responsive font scale — it jumps from `text-4xl` → `text-5xl` → `text-6xl` without intermediate steps, using `sm:` and `lg:` breakpoints. `md:` is skipped.
- Line 24: `mt-6` on the body paragraph inside a `space-y-4` container. The `space-y-4` applies 16px margin to all children, but then `mt-6` (24px) overrides it for the body text. This creates an inconsistent rhythm: eyebrow→title gap is 16px, title→body gap is 24px. Should be uniform or intentionally documented.
- `align` prop creates three alignment classes, but the body text `max-w-2xl` is not conditionally applied based on align — for center-aligned headings, `max-w-2xl` without `mx-auto` means the body text will be left-aligned inside a center-aligned container.
- No HTML heading level control — always renders `<h2>`. If used in a hero section, this may be incorrect (should be `<h1>`).

---

### 2.15 Container (`packages/core/src/components/landing/primitives/layouts/container.tsx`)
**Score: 6/10**

**Issues:**
- Line 19: Template literal string concatenation for classes — should use `cn()` utility from `@/lib/utils`. The current approach will produce double-space strings when `className` is empty, which is harmless but unprofessional.
- `px-6 sm:px-8 lg:px-12` — padding increases with breakpoint. At `lg` (1024px+), horizontal padding is 48px (3rem). For a `max-w-6xl` (72rem) container, this leaves enough room, but the values don't follow the 8px grid strictly: `px-6`=24px, `px-8`=32px, `px-12`=48px — these are all multiples of 8, so grid-compliant. But the jump from 24→32→48 is uneven. Convention is 16→24→32 or 24→40→80.
- `sizeClasses` object uses plain string concatenation with className, not `cn()`. If className is undefined (TypeScript allows `className?: string`), this concatenates `"undefined"` — but the default value `''` prevents this. Still fragile.
- No `as` prop — Container always renders as `<div>`. Sometimes `<section>` or `<article>` is semantically correct.

---

### 2.16 HeroSplit (`packages/core/src/components/landing/sections/hero/hero-split.tsx`)
**Score: 4/10**

**Critical Issues:**
- Lines 35-38: Primary CTA button uses raw `<a>` with manually duplicated button styles: `inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-4 text-base font-semibold hover:bg-primary/90 transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.98]`. This is a full copy-paste of the Button component styles — completely bypasses the design system.
- Lines 41-49: Secondary CTA button also uses raw `<a>` with different styling: `border-2 border-border bg-background` — note `border-2` where the design system uses `ring-1` for borders. Creates visual inconsistency.
- Line 14: `gap-8 md:gap-12 lg:gap-16` — grid gap is fine but these are not on the 8px grid in a consistent manner (32px, 48px, 64px — all multiples of 8, acceptable).
- Line 55: `lg:h-[500px] xl:h-[600px]` — hardcoded pixel heights. The image container has no height at mobile/tablet, meaning the image has no explicit height at `md` breakpoint and will display at natural aspect ratio.
- Line 57-63: `<img>` tag used directly instead of Next.js `<Image>` component. No width/height intrinsic sizing, no `srcset`, no optimization. This is a performance P0 for a landing page hero image.
- Line 58: `alt={media.alt || ''}` — empty string alt on a decorative image is acceptable per WCAG if purely decorative, but the schema allows a user-provided alt. If the image is meaningful (it is — it shows a dashboard/team), an empty alt fails WCAG 1.1.1.
- The entire `actions.type === 'buttons'` branch uses the Button-bypassing implementation.

---

### 2.17 SocialProofStats (`packages/core/src/components/landing/sections/social-proof/social-proof-stats.tsx`)
**Score: 5/10**

**Issues:**
- Line 8: `grid-cols-3 md:grid-cols-4` — at mobile, always 3 columns. If `stats` array has 4 items (allowed by schema: `.max(4)`), 4 items in 3 columns means one item wraps. This breaks the layout. Should be `grid-cols-2 sm:grid-cols-3 md:grid-cols-4` or handle the dynamic column count.
- Line 11: `font-display` — uses the Calistoga display font for stat values. This creates a serif/display font for numbers, which is unusual and may look inconsistent depending on the numbers rendered.
- Line 11: `text-primary mb-2` — `mb-2` (8px) is hardcoded margin, fine on 8px grid.
- No `icon` support despite the schema defining `icon: z.string().optional()` on each stat. The `icon` prop is completely ignored in the render.
- Using `index` as `key` prop (line 9) — acceptable when list is static (no reordering), but the schema doesn't guarantee stability.

---

### 2.18 WaitlistForm (`packages/core/src/components/landing/chrome/waitlist-form.tsx`)
**Score: 4/10**

**Critical Issues:**
- Line 63-72: Raw `<input>` with fully custom className. Does not use the `Input` component from the UI library. If the Input design changes, this form is left behind.
- Line 80-96: Raw `<button>` with fully custom className. Does not use the `Button` component. The `text-base font-semibold` weight (600) differs from Button's `font-medium` (500). Size is `h-12` hardcoded vs Button's size system.
- Lines 87-92: Loading spinner is a hand-rolled CSS hack: `inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent`. The `Spinner` component exists in the UI library and should be used.
- Line 71: Input height `h-12 md:h-10` — inconsistent with the `Input` component's `h-8`. The form input is 1.5x taller than the component library defines.
- Line 84: Button height `h-12 md:h-10` — same height inconsistency. The Button component's `lg` size is `h-12` but is not used here.
- Line 56: `space-y-4 ${className}` — string concatenation instead of `cn()`.
- Lines 99-106: Success state uses `bg-success/10 text-success border border-success/20` inline — this is the correct semantic token usage but could use the `Alert` component with a success variant.
- Lines 108-114: Error state should use the `Alert` component.
- The `label` is `sr-only` — the input has no visible label. Visually there is only a placeholder. While `sr-only` provides accessibility, a visible label is better UX practice for the main form interaction.

---

### 2.19 PageRenderer (`apps/saas-template/src/components/page-renderer.tsx`)
**Score: 6/10**

**Issues:**
- Lines 25-31: `SectionError` uses hardcoded Tailwind palette colors: `border-red-300 bg-red-50 text-red-800 text-red-600`. These break in dark mode (dark theme has no `red-50` etc.). Should use `border-destructive/30 bg-destructive/10 text-destructive`.
- No skeleton/loading state for async section resolution.
- `SectionConfig.props` typed as `Record<string, unknown>` — no generic typing means consumers get no autocomplete on individual section props.

---

## 3. Design System Gaps

### 3.1 Token Inconsistencies

| Issue | Location | Severity |
|-------|----------|----------|
| `rounded-4xl` used but not defined in tailwind.config | `badge.tsx:8` | P0 |
| `pr-18` used but not in Tailwind scale | `alert.tsx:7` | P1 |
| `gap-3` (12px) used in Card — not on 8px grid | `card.tsx:15` | P2 |
| `tracking-[0.15em]` arbitrary value, not a token | `heading.tsx:18` | P2 |

### 3.2 Missing Semantic Color Variants

The design system defines `success`, `warning`, `info` tokens but the `Alert` component only exposes `default` and `destructive`. All feedback variants should be available consistently.

### 3.3 Heading Semantic Level Gap

`Heading` (core/landing) always renders `<h2>`. `CardTitle` renders as `<div>`. Neither component exposes heading level control. Screen readers and SEO suffer.

### 3.4 Cross-Package Design Contract Violation

The `packages/core` landing components do not import from the UI library (`apps/saas-template/src/components/ui/`). They cannot — different package. But they don't have a shared UI library to import from either. This means they reinvent styling ad-hoc. The fix is to either: (a) move shared UI components to a shared package, or (b) ensure core landing components accept pre-styled component overrides as props. Currently neither is done.

### 3.5 Button Size Gap

No `md` size (40px / h-10) between `default` (32px) and `lg` (48px). Landing page CTAs typically use 40-44px height.

### 3.6 Font Inconsistency

`Calistoga` (display) is only loaded at `weight: '400'`. If any component attempts `font-display font-bold`, the browser will fake-bold the font with a synthetic bold. `heading.tsx` uses `font-display font-normal` (explicit 400) which is correct. But `social-proof-stats.tsx` uses `font-display font-bold` — this will render as a synthetic bold Calistoga, which looks bad.

---

## 4. Priority Fix List

### P0 — Critical / Blocking

| ID | Component | Issue | File:Line |
|----|-----------|-------|-----------|
| P0-1 | Badge | `rounded-4xl` is undefined — badge has square corners in production | `badge.tsx:8` |
| P0-2 | WaitlistForm | Uses raw `<input>` instead of `Input` component | `waitlist-form.tsx:63` |
| P0-3 | WaitlistForm | Uses raw `<button>` instead of `Button` component | `waitlist-form.tsx:80` |
| P0-4 | WaitlistForm | Hand-rolled spinner instead of `Spinner` component | `waitlist-form.tsx:87-92` |
| P0-5 | HeroSplit | Primary CTA `<a>` with hardcoded button styles instead of `Button` | `hero-split.tsx:35-38` |
| P0-6 | HeroSplit | Secondary CTA `<a>` with hardcoded button styles instead of `Button` | `hero-split.tsx:41-49` |
| P0-7 | PageRenderer | `SectionError` uses hardcoded `red-*` colors, breaks dark mode | `page-renderer.tsx:25-31` |
| P0-8 | FieldTitle | Duplicate `data-slot="field-label"` conflicts with `FieldLabel` | `field.tsx:112` |
| P0-9 | SocialProofStats | `font-display font-bold` = synthetic bold on Calistoga (400-only font) | `social-proof-stats.tsx:11` |
| P0-10 | SocialProofStats | `grid-cols-3` breaks layout when 4 stats are provided | `social-proof-stats.tsx:8` |

### P1 — Important

| ID | Component | Issue | File:Line |
|----|-----------|-------|-----------|
| P1-1 | Alert | Missing `success`, `warning`, `info` variants despite token existence | `alert.tsx:9-19` |
| P1-2 | Button | `default` variant has no hover state for `<button>` elements | `button.tsx:13` |
| P1-3 | Button | Missing `md` size (h-10) for landing page CTAs | `button.tsx:25-37` |
| P1-4 | Select | `SelectItem` uses `focus:bg-accent` (orange) — visually jarring | `select.tsx:114` |
| P1-5 | Heading | Always renders `<h2>` — no heading level prop | `heading.tsx:21` |
| P1-6 | Card | `CardTitle` renders as `<div>` — not semantic heading | `card.tsx:37` |
| P1-7 | Card | `CardDescription` renders as `<div>` not `<p>` | `card.tsx:50` |
| P1-8 | Container | Uses string concatenation instead of `cn()` | `container.tsx:19` |
| P1-9 | Heading | Body text `max-w-2xl` not centered when `align="center"` | `heading.tsx:24` |
| P1-10 | Dialog | Overlay opacity `bg-black/10` is too transparent | `dialog.tsx:31` |
| P1-11 | HeroSplit | `<img>` instead of Next.js `<Image>` — no optimization | `hero-split.tsx:57` |
| P1-12 | SocialProofStats | `icon` field in schema is ignored in render | `social-proof-stats.tsx` |
| P1-13 | AccordionTrigger | `hover:underline` is wrong affordance for disclosure buttons | `accordion.tsx:34` |

### P2 — Nice to Have

| ID | Component | Issue | File:Line |
|----|-----------|-------|-----------|
| P2-1 | Skeleton | No `aria-busy` / `aria-label` for screen readers | `skeleton.tsx` |
| P2-2 | Skeleton | No shimmer animation variant | `skeleton.tsx` |
| P2-3 | Spinner | No size variants, hardcoded `aria-label` | `spinner.tsx` |
| P2-4 | Textarea | `field-sizing-content` not supported in Firefox | `textarea.tsx:10` |
| P2-5 | Card | `gap-3` (12px) is not strictly on 8px grid | `card.tsx:15` |
| P2-6 | Badge | No `active` state on `ghost` variant | `badge.tsx:17` |
| P2-7 | Badge | `link` variant missing `cursor-pointer` | `badge.tsx:18` |
| P2-8 | Heading | `mt-6` inside `space-y-4` creates uneven rhythm | `heading.tsx:24` |
| P2-9 | Heading | Missing `md:` breakpoint in font scale (`sm:` jumps to `lg:`) | `heading.tsx:21` |
| P2-10 | Container | No `as` prop for semantic HTML elements | `container.tsx` |
| P2-11 | FieldError | `==` instead of `===` strict equality | `field.tsx:186` |
| P2-12 | Alert | `AlertTitle` renders as `<div>` not semantic element | `alert.tsx:38` |
| P2-13 | Tabs | `text-foreground/60` inactive tab may fail WCAG AA contrast | `tabs.tsx:54` |
| P2-14 | WaitlistForm | Visible label missing (only `sr-only`) | `waitlist-form.tsx:60-62` |

---

*End of Audit Report*
