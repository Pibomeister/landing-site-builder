import { z } from 'zod';

export const sectionHeadingSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  body: z.string().optional(),
  align: z.enum(['left', 'center', 'right']).optional(),
});

export type SectionHeading = z.infer<typeof sectionHeadingSchema>;
