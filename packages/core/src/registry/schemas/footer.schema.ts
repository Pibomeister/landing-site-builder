import { z } from 'zod';
import { sectionBaseSchema } from './section-base.schema';

const footerLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const footerColumnSchema = z.object({
  title: z.string(),
  links: z.array(footerLinkSchema),
});

const socialLinkSchema = z.object({
  platform: z.enum(['twitter', 'github', 'linkedin', 'youtube', 'instagram', 'discord']),
  href: z.string(),
});

export const footerStandardSchema = sectionBaseSchema.extend({
  type: z.literal('footer'),
  variant: z.literal('standard'),
  logo: z.object({
    text: z.string(),
    src: z.string().optional(),
    href: z.string().optional().default('/'),
  }),
  tagline: z.string().optional(),
  columns: z.array(footerColumnSchema).min(1).max(5),
  social: z.array(socialLinkSchema).optional(),
  copyright: z.string(),
  bottomLinks: z.array(footerLinkSchema).optional(),
});

export type FooterStandardSection = z.infer<typeof footerStandardSchema>;
