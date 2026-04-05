import { z } from 'zod';
import { sectionBaseSchema } from './section-base.schema';

export const socialProofStatsSchema = z.object({
  stats: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        icon: z.string().optional(),
      })
    )
    .min(3)
    .max(4),
});

export type SocialProofStats = z.infer<typeof socialProofStatsSchema>;

const logoItemSchema = z.object({
  name: z.string(),
  src: z.string(),
  href: z.string().optional(),
});

export const socialProofLogoCloudSchema = sectionBaseSchema.extend({
  type: z.literal('social-proof'),
  variant: z.literal('logo-cloud'),
  label: z.string().optional(), // e.g. "Trusted by 1,000+ companies"
  logos: z.array(logoItemSchema).min(3).max(12),
  marquee: z.boolean().default(false), // scroll animation
});
export type SocialProofLogoCloudSection = z.infer<typeof socialProofLogoCloudSchema>;
