import { z } from 'zod';
import { registerSection } from '../section-registry';
import { CtaSimple } from '../../components/landing/sections/cta/cta-simple';
import { ctaSimpleSchema } from '../schemas/cta.schema';
import type { CtaSimpleSection } from '../schemas/cta.schema';

/**
 * Register CTA Simple section
 */
registerSection<CtaSimpleSection>({
  type: 'cta',
  variant: 'simple',
  component: CtaSimple,
  schema: ctaSimpleSchema as z.ZodSchema<CtaSimpleSection>,
  metadata: {
    name: 'CTA Simple',
    category: 'convert',
    description:
      'Full-width call-to-action section with centered title, optional body, and action buttons',
    preview: '/previews/cta-simple.png',
    tags: ['cta', 'convert', 'bottom', 'action'],
    renderMode: 'server',
    dependencies: ['@landing-builder/core/primitives'],
    bundleImpact: 'light',
  },
  examples: {
    basic: {
      type: 'cta',
      variant: 'simple',
      title: 'Start building today',
      background: 'brand',
      primary: {
        type: 'link',
        label: 'Get Started',
        href: '/signup',
      },
    },
    advanced: {
      type: 'cta',
      variant: 'simple',
      title: 'Start building today',
      body: 'Join thousands of teams already using our platform to ship faster.',
      background: 'brand',
      primary: {
        type: 'link',
        label: 'Get Started',
        href: '/signup',
      },
      secondary: {
        type: 'link',
        label: 'View Docs',
        href: '/docs',
        target: '_blank',
      },
    },
  },
});
