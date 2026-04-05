import { z } from 'zod';
import { registerSection } from '../section-registry';
import { TestimonialGrid } from '../../components/landing/sections/testimonial/testimonial-grid';
import { testimonialGridSchema } from '../schemas/testimonial.schema';
import type { TestimonialGridSection } from '../schemas/testimonial.schema';

/**
 * Register Testimonial Grid section
 */
registerSection<TestimonialGridSection>({
  type: 'testimonial',
  variant: 'grid',
  component: TestimonialGrid,
  schema: testimonialGridSchema as z.ZodSchema<TestimonialGridSection>,
  metadata: {
    name: 'Testimonial Grid',
    category: 'trust',
    description: 'Grid of customer testimonials with optional star ratings and author avatars',
    preview: '/previews/testimonial-grid.png',
    tags: ['testimonial', 'social-proof', 'grid', 'trust'],
    renderMode: 'server',
    dependencies: ['@landing-builder/core/primitives'],
    bundleImpact: 'light',
  },
  examples: {
    basic: {
      type: 'testimonial',
      variant: 'grid',
      heading: {
        eyebrow: 'Customer Stories',
        title: 'Loved by teams everywhere',
        body: 'See what our customers have to say about their experience.',
        align: 'center',
      },
      testimonials: [
        {
          quote:
            'This platform completely transformed how we build and ship landing pages. What used to take days now takes hours.',
          author: {
            name: 'Sarah Chen',
            title: 'Head of Growth',
            company: 'Flowpath',
          },
          rating: 5,
        },
        {
          quote:
            'The component system is incredibly intuitive. Our whole team was productive on day one without any training.',
          author: {
            name: 'Marcus Ortega',
            title: 'Lead Engineer',
            company: 'Stackwise',
          },
          rating: 5,
        },
        {
          quote:
            "We've tried every page builder out there. This is the first one that doesn't get in the way of our design vision.",
          author: {
            name: 'Priya Nair',
            title: 'Product Designer',
            company: 'Luminar Labs',
          },
          rating: 4,
        },
      ],
      columns: 3,
    },
    advanced: {
      type: 'testimonial',
      variant: 'grid',
      container: 'xl',
      heading: {
        eyebrow: 'Testimonials',
        title: 'Real results from real teams',
        align: 'center',
      },
      testimonials: [
        {
          quote:
            'Conversion rates on our campaign pages jumped 34% in the first month. The A/B testing workflow alone is worth it.',
          author: {
            name: 'Jordan Mills',
            title: 'VP Marketing',
            company: 'Convex HQ',
            avatar: 'https://i.pravatar.cc/80?img=11',
          },
          rating: 5,
        },
        {
          quote:
            'Finally, a builder that engineers and marketers can both love. No more back-and-forth handoffs.',
          author: {
            name: 'Aiko Tanaka',
            title: 'Engineering Manager',
            company: 'Orbit SaaS',
            avatar: 'https://i.pravatar.cc/80?img=47',
          },
          rating: 5,
        },
        {
          quote:
            'The schema-driven approach means our brand stays consistent across every page without extra governance overhead.',
          author: {
            name: 'Lena Bauer',
            title: 'Brand Lead',
            company: 'Fentive',
            avatar: 'https://i.pravatar.cc/80?img=32',
          },
          rating: 5,
        },
        {
          quote: 'Setup took under an hour. We had our first campaign live the same afternoon.',
          author: {
            name: 'Chris Adeyemi',
            title: 'Founder',
            company: 'Launchpad.io',
          },
          rating: 4,
        },
        {
          quote:
            'Support is genuinely excellent. Every question gets a thoughtful answer within the hour.',
          author: {
            name: 'Mia Svensson',
            title: 'Customer Success Manager',
            company: 'Relayfi',
          },
          rating: 5,
        },
        {
          quote:
            'The developer experience is top-notch. TypeScript types throughout, great docs, and zero magic.',
          author: {
            name: 'Rafi Goldstein',
            title: 'Senior Frontend Engineer',
            company: 'Datastream',
          },
          rating: 5,
        },
      ],
      columns: 3,
    },
  },
});
