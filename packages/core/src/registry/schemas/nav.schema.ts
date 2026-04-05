import { z } from 'zod';
import { sectionBaseSchema } from './section-base.schema';
import { sectionActionSchema } from './action.schema';

const navLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const navTopSchema = sectionBaseSchema.extend({
  type: z.literal('nav'),
  variant: z.literal('top'),
  logo: z.object({
    text: z.string(), // brand name text fallback
    src: z.string().optional(), // logo image URL
    href: z.string().default('/'),
  }),
  links: z.array(navLinkSchema).max(8).optional(),
  cta: sectionActionSchema.optional(),
  sticky: z.boolean().default(true),
  transparent: z.boolean().default(false),
});
export type NavTopSection = z.infer<typeof navTopSchema>;
