import { z } from 'zod';
import { registerSection } from '../section-registry';
import { TestimonialCarousel } from '../../components/landing/sections/testimonial/testimonial-carousel';
import { testimonialCarouselSchema } from '../schemas/testimonial.schema';
import type { TestimonialCarouselSection } from '../schemas/testimonial.schema';

/**
 * Register Testimonial Carousel section
 */
registerSection<TestimonialCarouselSection>({
  type: 'testimonial',
  variant: 'carousel',
  component: TestimonialCarousel,
  schema: testimonialCarouselSchema as z.ZodSchema<TestimonialCarouselSection>,
  metadata: {
    name: 'Testimonial Carousel',
    category: 'trust',
    description: 'Auto-playing testimonial carousel with prev/next navigation and dot indicators',
    preview: '/previews/testimonial-carousel.png',
    tags: ['testimonial', 'carousel', 'social proof', 'trust'],
    renderMode: 'client',
    dependencies: ['@landing-builder/core/primitives', 'react'],
    bundleImpact: 'moderate',
  },
  examples: {
    basic: {
      type: 'testimonial',
      variant: 'carousel',
      autoPlay: true,
      interval: 5000,
      testimonials: [
        {
          quote:
            'This platform completely transformed how we build marketing pages. Ship in hours, not weeks.',
          author: {
            name: 'Sarah Chen',
            title: 'VP of Marketing',
            company: 'Streamline Inc',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128',
          },
          rating: 5,
        },
        {
          quote:
            'The component library is incredible. Our conversion rates improved by 40% after switching.',
          author: {
            name: 'Marcus Rivera',
            title: 'Head of Growth',
            company: 'Launchpad HQ',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128',
          },
          rating: 5,
        },
        {
          quote:
            'Finally a builder that respects developer workflows. The schema-first approach is a game changer.',
          author: {
            name: 'Priya Patel',
            title: 'Senior Engineer',
            company: 'DevCraft',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128',
          },
          rating: 5,
        },
        {
          quote:
            'We replaced three tools with this one. Our team velocity doubled in the first month.',
          author: {
            name: 'Tom Brennan',
            title: 'CTO',
            company: 'Velocity Labs',
          },
          rating: 4,
        },
      ],
    },
    advanced: {
      type: 'testimonial',
      variant: 'carousel',
      container: 'md',
      autoPlay: true,
      interval: 6000,
      heading: {
        eyebrow: 'Customer Stories',
        title: 'Trusted by high-growth teams',
        body: 'See what our customers have to say about building with us.',
        align: 'center',
      },
      testimonials: [
        {
          quote:
            'This platform completely transformed how we build marketing pages. Ship in hours, not weeks.',
          author: {
            name: 'Sarah Chen',
            title: 'VP of Marketing',
            company: 'Streamline Inc',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128',
          },
          rating: 5,
        },
        {
          quote:
            'The component library is incredible. Our conversion rates improved by 40% after switching.',
          author: {
            name: 'Marcus Rivera',
            title: 'Head of Growth',
            company: 'Launchpad HQ',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128',
          },
          rating: 5,
        },
        {
          quote:
            'Finally a builder that respects developer workflows. The schema-first approach is a game changer.',
          author: {
            name: 'Priya Patel',
            title: 'Senior Engineer',
            company: 'DevCraft',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128',
          },
          rating: 5,
        },
        {
          quote:
            'We replaced three tools with this one. Our team velocity doubled in the first month.',
          author: {
            name: 'Tom Brennan',
            title: 'CTO',
            company: 'Velocity Labs',
          },
          rating: 4,
        },
      ],
    },
  },
});
