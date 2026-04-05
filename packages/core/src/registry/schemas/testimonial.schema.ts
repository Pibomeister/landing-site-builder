import { z } from 'zod';
import { sectionBaseSchema } from './section-base.schema';
import { sectionHeadingSchema } from './heading.schema';

const testimonialItemSchema = z.object({
  quote: z.string(),
  author: z.object({
    name: z.string(),
    title: z.string(),
    company: z.string().optional(),
    avatar: z.string().optional(), // URL
  }),
  rating: z.number().min(1).max(5).optional(),
});

export const testimonialGridSchema = sectionBaseSchema.extend({
  type: z.literal('testimonial'),
  variant: z.literal('grid'),
  heading: sectionHeadingSchema.optional(),
  testimonials: z.array(testimonialItemSchema).min(3).max(9),
  columns: z.union([z.literal(2), z.literal(3)]).default(3),
});

export type TestimonialGridSection = z.infer<typeof testimonialGridSchema>;

export const testimonialCarouselSchema = sectionBaseSchema.extend({
  type: z.literal('testimonial'),
  variant: z.literal('carousel'),
  heading: sectionHeadingSchema.optional(),
  testimonials: z.array(testimonialItemSchema).min(3).max(12),
  autoPlay: z.boolean().default(true),
  interval: z.number().default(5000),
});

export type TestimonialCarouselSection = z.infer<typeof testimonialCarouselSchema>;
