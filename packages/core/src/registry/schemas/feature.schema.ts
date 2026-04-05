import { z } from 'zod';
import { sectionBaseSchema } from './section-base.schema';
import { sectionHeadingSchema } from './heading.schema';

const featureItemSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

export const featureGridSchema = sectionBaseSchema.extend({
  type: z.literal('feature'),
  variant: z.literal('grid'),
  heading: sectionHeadingSchema.optional(),
  features: z.array(featureItemSchema).min(3).max(9),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
});

export type FeatureGridSection = z.infer<typeof featureGridSchema>;
