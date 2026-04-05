import { z } from 'zod';
import { registerSection } from '../section-registry';
import { FeatureGrid } from '../../components/landing/sections/feature/feature-grid';
import { featureGridSchema } from '../schemas/feature.schema';
import type { FeatureGridSection } from '../schemas/feature.schema';

/**
 * Register Feature Grid section
 */
registerSection<FeatureGridSection>({
  type: 'feature',
  variant: 'grid',
  component: FeatureGrid,
  schema: featureGridSchema as z.ZodSchema<FeatureGridSection>,
  metadata: {
    name: 'Feature Grid',
    category: 'value',
    description: 'Responsive grid of feature cards with icon, title, and description',
    preview: '/previews/feature-grid.png',
    tags: ['feature', 'grid', 'cards', 'icons'],
    renderMode: 'server',
    dependencies: ['@landing-builder/core/primitives'],
    bundleImpact: 'light',
  },
  examples: {
    basic: {
      type: 'feature',
      variant: 'grid',
      columns: 3,
      features: [
        {
          icon: '⚡',
          title: 'Lightning Fast',
          description: 'Optimized for performance out of the box with zero configuration required.',
        },
        {
          icon: '🔒',
          title: 'Secure by Default',
          description: 'Enterprise-grade security baked in so you can ship with confidence.',
        },
        {
          icon: '📈',
          title: 'Built to Scale',
          description: 'Handles millions of users without breaking a sweat.',
        },
      ],
    },
    advanced: {
      type: 'feature',
      variant: 'grid',
      container: 'xl',
      columns: 3,
      heading: {
        eyebrow: 'Everything you need',
        title: 'Features that move the needle',
        body: 'A complete toolkit designed to help you build, launch, and grow faster than ever before.',
        align: 'center',
      },
      features: [
        {
          icon: '⚡',
          title: 'Lightning Fast',
          description: 'Optimized for performance out of the box with zero configuration required.',
        },
        {
          icon: '🔒',
          title: 'Secure by Default',
          description: 'Enterprise-grade security baked in so you can ship with confidence.',
        },
        {
          icon: '📈',
          title: 'Built to Scale',
          description: 'Handles millions of users without breaking a sweat.',
        },
        {
          icon: '🎨',
          title: 'Fully Customizable',
          description: 'Every pixel is yours to own. Tailor the look and feel to match your brand.',
        },
        {
          icon: '🔌',
          title: 'Integrates Anywhere',
          description:
            'Connect with your existing tools via our extensive library of integrations.',
        },
        {
          icon: '💬',
          title: '24/7 Support',
          description: 'Our team is always available to help you succeed at every stage.',
        },
      ],
    },
  },
});
