import { z } from 'zod';
import { registerSection } from '../section-registry';
import { SocialProofLogoCloud } from '../../components/landing/sections/social-proof/social-proof-logo-cloud';
import { socialProofLogoCloudSchema } from '../schemas/social-proof.schema';
import type { SocialProofLogoCloudSection } from '../schemas/social-proof.schema';

/**
 * Register Social Proof Logo Cloud section
 */
registerSection<SocialProofLogoCloudSection>({
  type: 'social-proof',
  variant: 'logo-cloud',
  component: SocialProofLogoCloud,
  schema: socialProofLogoCloudSchema as z.ZodSchema<SocialProofLogoCloudSection>,
  metadata: {
    name: 'Logo Cloud',
    category: 'trust',
    description: 'Display a row of company logos to build social proof and trust',
    preview: '/previews/social-proof-logo-cloud.png',
    tags: ['social-proof', 'logos', 'trust', 'brands'],
    renderMode: 'server',
    dependencies: ['@landing-builder/core/primitives'],
    bundleImpact: 'light',
  },
  examples: {
    basic: {
      type: 'social-proof',
      variant: 'logo-cloud',
      label: 'Trusted by 1,000+ companies',
      logos: [
        { name: 'Stripe', src: 'https://logo.clearbit.com/stripe.com', href: 'https://stripe.com' },
        { name: 'Vercel', src: 'https://logo.clearbit.com/vercel.com', href: 'https://vercel.com' },
        { name: 'Notion', src: 'https://logo.clearbit.com/notion.so', href: 'https://notion.so' },
        { name: 'Linear', src: 'https://logo.clearbit.com/linear.app', href: 'https://linear.app' },
        { name: 'Figma', src: 'https://logo.clearbit.com/figma.com', href: 'https://figma.com' },
        { name: 'GitHub', src: 'https://logo.clearbit.com/github.com', href: 'https://github.com' },
      ],
      marquee: false,
    },
    advanced: {
      type: 'social-proof',
      variant: 'logo-cloud',
      label: 'Trusted by teams at',
      logos: [
        { name: 'Stripe', src: 'https://logo.clearbit.com/stripe.com' },
        { name: 'Vercel', src: 'https://logo.clearbit.com/vercel.com' },
        { name: 'Notion', src: 'https://logo.clearbit.com/notion.so' },
        { name: 'Linear', src: 'https://logo.clearbit.com/linear.app' },
        { name: 'Figma', src: 'https://logo.clearbit.com/figma.com' },
        { name: 'GitHub', src: 'https://logo.clearbit.com/github.com' },
      ],
      marquee: true,
    },
  },
});
