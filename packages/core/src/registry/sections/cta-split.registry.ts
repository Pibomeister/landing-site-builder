import { z } from 'zod';
import { registerSection } from '../section-registry';
import { CtaSplit } from '../../components/landing/sections/cta/cta-split';
import { ctaSplitSchema } from '../schemas/cta.schema';
import type { CtaSplitSection } from '../schemas/cta.schema';

/**
 * Register CTA Split section
 */
registerSection<CtaSplitSection>({
  type: 'cta',
  variant: 'split',
  component: CtaSplit,
  schema: ctaSplitSchema as z.ZodSchema<CtaSplitSection>,
  metadata: {
    name: 'CTA Split',
    category: 'convert',
    description: 'Two-column split CTA with text left and media or product mockup right',
    preview: '/previews/cta-split.png',
    tags: ['cta', 'split', 'convert', 'media'],
    renderMode: 'server',
    dependencies: ['@landing-builder/core/primitives'],
    bundleImpact: 'light',
  },
  examples: {
    basic: {
      type: 'cta',
      variant: 'split',
      title: 'Start building for free',
      body: 'Join thousands of teams already using our platform to ship faster.',
      primary: {
        type: 'link',
        label: 'Get Started Free',
        href: '/signup',
      },
    },
    advanced: {
      type: 'cta',
      variant: 'split',
      container: 'xl',
      title: 'Ready to grow your business?',
      body: 'Everything you need to launch, optimize, and scale your landing pages — no developer required.',
      benefits: [
        'No credit card required',
        'Free 14-day trial',
        'Cancel anytime',
        'Unlimited pages',
      ],
      primary: {
        type: 'link',
        label: 'Start Free Trial',
        href: '/signup',
        target: '_self',
      },
      secondary: {
        type: 'link',
        label: 'See a demo',
        href: '/demo',
        target: '_self',
      },
      media: {
        kind: 'image',
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        alt: 'Product dashboard preview',
      },
    },
  },
});
