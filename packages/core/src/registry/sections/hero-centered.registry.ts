import { z } from 'zod';
import { registerSection } from '../section-registry';
import { HeroCentered } from '../../components/landing/sections/hero/hero-centered';
import { heroCenteredSchema } from '../schemas/hero.schema';
import type { HeroCenteredSection } from '../schemas/hero.schema';

/**
 * Register Hero Centered section
 */
registerSection<HeroCenteredSection>({
  type: 'hero',
  variant: 'centered',
  component: HeroCentered,
  schema: heroCenteredSchema as z.ZodSchema<HeroCenteredSection>,
  metadata: {
    name: 'Hero Centered',
    category: 'orient',
    description: 'Centered typography-first hero with optional badge and social proof',
    preview: '/previews/hero-centered.png',
    tags: ['hero', 'centered', 'cta', 'social-proof'],
    renderMode: 'server',
    dependencies: ['@landing-builder/core/primitives', '@landing-builder/core/ui/button'],
    bundleImpact: 'light',
  },
  examples: {
    basic: {
      type: 'hero',
      variant: 'centered',
      heading: {
        title: 'Ship landing pages in minutes',
        body: 'The visual builder that makes it easy to create beautiful, conversion-optimized landing pages.',
      },
      actions: {
        primary: {
          type: 'link',
          label: 'Get Started for Free',
          href: '/signup',
        },
      },
    },
    advanced: {
      type: 'hero',
      variant: 'centered',
      container: 'xl',
      badge: 'Now in Beta',
      heading: {
        eyebrow: 'Introducing v2.0',
        title: 'Build beautiful landing pages, faster',
        body: 'Create stunning, conversion-optimized landing pages with our visual builder. No code required.',
        align: 'center',
      },
      actions: {
        primary: {
          type: 'link',
          label: 'Start Building',
          href: '/signup',
          target: '_self',
        },
        secondary: {
          type: 'link',
          label: 'View Examples',
          href: '/examples',
          target: '_self',
        },
      },
      socialProof: {
        avatars: [
          'https://i.pravatar.cc/64?img=1',
          'https://i.pravatar.cc/64?img=2',
          'https://i.pravatar.cc/64?img=3',
          'https://i.pravatar.cc/64?img=4',
        ],
        label: 'Join 2,000+ builders',
      },
    },
  },
});
