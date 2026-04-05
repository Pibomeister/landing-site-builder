import { z } from 'zod';
import { sectionBaseSchema } from './section-base.schema';
import { sectionHeadingSchema } from './heading.schema';

const pricingPlanSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.object({
    monthly: z.string(), // e.g. "$29"
    annual: z.string(), // e.g. "$19"
  }),
  period: z.string().default('/mo'),
  features: z.array(z.string()).min(1).max(12),
  cta: z.object({ label: z.string(), href: z.string() }),
  highlighted: z.boolean().default(false),
  badge: z.string().optional(), // e.g. "Most Popular"
});

export const pricingCardsSchema = sectionBaseSchema.extend({
  type: z.literal('pricing'),
  variant: z.literal('cards'),
  heading: sectionHeadingSchema.optional(),
  plans: z.array(pricingPlanSchema).min(2).max(4),
  showToggle: z.boolean().default(true),
});

export type PricingCardsSection = z.infer<typeof pricingCardsSchema>;
