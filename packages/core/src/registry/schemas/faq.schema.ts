import { z } from 'zod';
import { sectionBaseSchema } from './section-base.schema';
import { sectionHeadingSchema } from './heading.schema';

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const faqAccordionSchema = sectionBaseSchema.extend({
  type: z.literal('faq'),
  variant: z.literal('accordion'),
  heading: sectionHeadingSchema.optional(),
  items: z.array(faqItemSchema).min(3).max(15),
  columns: z
    .union([z.literal(1), z.literal(2)])
    .optional()
    .default(1),
});

export type FaqAccordionSection = z.infer<typeof faqAccordionSchema>;
