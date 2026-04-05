import { z } from 'zod';
import { sectionBaseSchema } from './section-base.schema';
import { sectionHeadingSchema } from './heading.schema';
import { mediaAssetSchema } from './media.schema';

const featureRowSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  body: z.string(),
  media: mediaAssetSchema,
  cta: z.object({ label: z.string(), href: z.string() }).optional(),
});

export const featureAlternatingSchema = sectionBaseSchema.extend({
  type: z.literal('feature'),
  variant: z.literal('alternating'),
  heading: sectionHeadingSchema.optional(),
  rows: z.array(featureRowSchema).min(2).max(5),
});

export type FeatureRow = z.infer<typeof featureRowSchema>;
export type FeatureAlternatingSection = z.infer<typeof featureAlternatingSchema>;
