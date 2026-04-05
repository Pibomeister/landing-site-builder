import { z } from 'zod';
import { sectionBaseSchema } from './section-base.schema';
import { sectionActionSchema } from './action.schema';

export const ctaSimpleSchema = sectionBaseSchema.extend({
  type: z.literal('cta'),
  variant: z.literal('simple'),
  title: z.string(),
  body: z.string().optional(),
  primary: sectionActionSchema,
  secondary: sectionActionSchema.optional(),
  background: z.enum(['default', 'brand', 'dark', 'muted']).optional().default('brand'),
});

export type CtaSimpleSection = z.infer<typeof ctaSimpleSchema>;

import { mediaAssetSchema } from './media.schema';

export const ctaSplitSchema = sectionBaseSchema.extend({
  type: z.literal('cta'),
  variant: z.literal('split'),
  title: z.string(),
  body: z.string().optional(),
  primary: sectionActionSchema,
  secondary: sectionActionSchema.optional(),
  benefits: z.array(z.string()).max(4).optional(), // bullet points e.g. ["No credit card", "Free 14-day trial"]
  media: mediaAssetSchema.optional(),
});
export type CtaSplitSection = z.infer<typeof ctaSplitSchema>;
