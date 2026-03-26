import { z } from 'zod';

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
