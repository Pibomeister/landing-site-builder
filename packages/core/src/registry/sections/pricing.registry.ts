import { z } from 'zod';
import { registerSection } from '../section-registry';
import { PricingCards } from '../../components/landing/sections/pricing/pricing-cards';
import { pricingCardsSchema } from '../schemas/pricing.schema';
import type { PricingCardsSection } from '../schemas/pricing.schema';

/**
 * Register Pricing Cards section
 */
registerSection<PricingCardsSection>({
  type: 'pricing',
  variant: 'cards',
  component: PricingCards,
  schema: pricingCardsSchema as z.ZodSchema<PricingCardsSection>,
  metadata: {
    name: 'Pricing Cards',
    category: 'convert',
    description: 'Linear/Vercel-style 3-tier pricing cards with monthly/annual billing toggle',
    preview: '/previews/pricing-cards.png',
    tags: ['pricing', 'cards', 'billing', 'plans', 'cta'],
    renderMode: 'client',
    dependencies: ['@landing-builder/core/primitives'],
    bundleImpact: 'moderate',
  },
  examples: {
    basic: {
      type: 'pricing',
      variant: 'cards',
      showToggle: true,
      plans: [
        {
          name: 'Starter',
          description: 'Perfect for individuals and small projects.',
          price: { monthly: '$9', annual: '$7' },
          period: '/mo',
          features: ['5 projects', '10 GB storage', 'Basic analytics', 'Email support'],
          cta: { label: 'Get started', href: '/signup?plan=starter' },
          highlighted: false,
        },
        {
          name: 'Pro',
          description: 'For growing teams that need more power.',
          price: { monthly: '$29', annual: '$23' },
          period: '/mo',
          features: [
            'Unlimited projects',
            '100 GB storage',
            'Advanced analytics',
            'Priority support',
            'Custom domains',
          ],
          cta: { label: 'Get started', href: '/signup?plan=pro' },
          highlighted: true,
          badge: 'Most Popular',
        },
        {
          name: 'Enterprise',
          description: 'For large organizations with advanced needs.',
          price: { monthly: '$99', annual: '$79' },
          period: '/mo',
          features: [
            'Unlimited projects',
            '1 TB storage',
            'Advanced analytics',
            'Dedicated support',
            'Custom domains',
            'SSO & SAML',
            'SLA guarantee',
          ],
          cta: { label: 'Contact sales', href: '/contact' },
          highlighted: false,
        },
      ],
    },
    advanced: {
      type: 'pricing',
      variant: 'cards',
      container: 'xl',
      heading: {
        eyebrow: 'Pricing',
        title: 'Simple, transparent pricing',
        body: 'Choose the plan that fits your needs. Upgrade or downgrade at any time.',
        align: 'center',
      },
      showToggle: true,
      plans: [
        {
          name: 'Starter',
          description: 'Perfect for individuals and small projects.',
          price: { monthly: '$9', annual: '$7' },
          period: '/mo',
          features: ['5 projects', '10 GB storage', 'Basic analytics', 'Email support'],
          cta: { label: 'Get started', href: '/signup?plan=starter' },
          highlighted: false,
        },
        {
          name: 'Pro',
          description: 'For growing teams that need more power.',
          price: { monthly: '$29', annual: '$23' },
          period: '/mo',
          features: [
            'Unlimited projects',
            '100 GB storage',
            'Advanced analytics',
            'Priority support',
            'Custom domains',
          ],
          cta: { label: 'Get started', href: '/signup?plan=pro' },
          highlighted: true,
          badge: 'Most Popular',
        },
        {
          name: 'Enterprise',
          description: 'For large organizations with advanced needs.',
          price: { monthly: '$99', annual: '$79' },
          period: '/mo',
          features: [
            'Unlimited projects',
            '1 TB storage',
            'Advanced analytics',
            'Dedicated support',
            'Custom domains',
            'SSO & SAML',
            'SLA guarantee',
          ],
          cta: { label: 'Contact sales', href: '/contact' },
          highlighted: false,
        },
      ],
    },
  },
});
