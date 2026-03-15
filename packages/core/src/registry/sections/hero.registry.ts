import { registerSection } from '../section-registry'
import { HeroSplit } from '@/components/landing/sections/hero/hero-split'
import { heroSplitSchema } from '../schemas/hero.schema'
import type { HeroSplitSection } from '../schemas/hero.schema'

/**
 * Register Hero Split section
 */
registerSection<HeroSplitSection>({
  type: 'hero',
  variant: 'split',
  component: HeroSplit,
  schema: heroSplitSchema,
  metadata: {
    name: 'Hero Split',
    category: 'orient',
    description: '50/50 split layout with text on left, media on right',
    preview: '/previews/hero-split.png',
    tags: ['hero', 'split', 'image', 'cta'],
    renderMode: 'server',
    dependencies: [
      '@landing-builder/core/primitives',
      '@landing-builder/core/ui/button',
    ],
    bundleImpact: 'light',
  },
  examples: {
    basic: {
      type: 'hero',
      variant: 'split',
      heading: {
        title: 'Build beautiful landing pages',
        body: 'Create stunning, conversion-optimized landing pages with our visual builder.',
      },
      media: {
        kind: 'image',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        alt: 'Dashboard preview',
      },
      actions: {
        primary: {
          type: 'link',
          label: 'Get Started',
          href: '/signup',
        },
      },
    },
    advanced: {
      type: 'hero',
      variant: 'split',
      container: 'xl',
      heading: {
        eyebrow: 'Introducing v2.0',
        title: 'Build beautiful landing pages',
        body: 'Create stunning, conversion-optimized landing pages with our visual builder. No code required.',
        align: 'left',
      },
      media: {
        kind: 'image',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        alt: 'Dashboard preview',
      },
      actions: {
        primary: {
          type: 'link',
          label: 'Get Started',
          href: '/signup',
          target: '_self',
        },
        secondary: {
          type: 'link',
          label: 'Learn More',
          href: '/docs',
          target: '_self',
        },
      },
    },
  },
})
