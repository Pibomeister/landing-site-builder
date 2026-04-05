import { z } from 'zod';
import { registerSection } from '../section-registry';
import { FeatureAlternating } from '../../components/landing/sections/feature/feature-alternating';
import { featureAlternatingSchema } from '../schemas/feature-alternating.schema';
import type { FeatureAlternatingSection } from '../schemas/feature-alternating.schema';

/**
 * Register Feature Alternating section
 */
registerSection<FeatureAlternatingSection>({
  type: 'feature',
  variant: 'alternating',
  component: FeatureAlternating,
  schema: featureAlternatingSchema as z.ZodSchema<FeatureAlternatingSection>,
  metadata: {
    name: 'Feature Alternating',
    category: 'value',
    description:
      'Notion/Loom-style alternating rows with image and text, image side flips each row',
    preview: '/previews/feature-alternating.png',
    tags: ['feature', 'alternating', 'image', 'value-prop'],
    renderMode: 'server',
    dependencies: ['@landing-builder/core/primitives'],
    bundleImpact: 'light',
  },
  examples: {
    basic: {
      type: 'feature',
      variant: 'alternating',
      rows: [
        {
          eyebrow: 'Design',
          title: 'Build pages visually',
          body: 'Drag and drop components to craft pixel-perfect landing pages without writing a single line of code.',
          media: {
            kind: 'image',
            src: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800',
            alt: 'Visual page builder interface',
          },
          cta: {
            label: 'See how it works',
            href: '/features/builder',
          },
        },
        {
          eyebrow: 'Analytics',
          title: 'Understand what converts',
          body: 'Get real-time insights into visitor behavior, A/B test variations, and optimise every element for maximum conversions.',
          media: {
            kind: 'image',
            src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
            alt: 'Analytics dashboard showing conversion data',
          },
          cta: {
            label: 'Explore analytics',
            href: '/features/analytics',
          },
        },
      ],
    },
    advanced: {
      type: 'feature',
      variant: 'alternating',
      container: 'xl',
      heading: {
        eyebrow: 'Features',
        title: 'Everything you need to launch faster',
        body: 'A complete toolkit for building, testing, and optimising landing pages that drive results.',
        align: 'center',
      },
      rows: [
        {
          eyebrow: 'Design',
          title: 'Build pages visually',
          body: 'Drag and drop components to craft pixel-perfect landing pages without writing a single line of code.',
          media: {
            kind: 'image',
            src: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800',
            alt: 'Visual page builder interface',
          },
          cta: {
            label: 'See how it works',
            href: '/features/builder',
          },
        },
        {
          eyebrow: 'Analytics',
          title: 'Understand what converts',
          body: 'Get real-time insights into visitor behavior, A/B test variations, and optimise every element for maximum conversions.',
          media: {
            kind: 'image',
            src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
            alt: 'Analytics dashboard showing conversion data',
          },
          cta: {
            label: 'Explore analytics',
            href: '/features/analytics',
          },
        },
        {
          eyebrow: 'Integrations',
          title: 'Connect your favourite tools',
          body: 'Seamlessly integrate with your existing marketing stack — CRMs, email platforms, payment processors, and more.',
          media: {
            kind: 'image',
            src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
            alt: 'Integration ecosystem overview',
          },
        },
      ],
    },
  },
});
