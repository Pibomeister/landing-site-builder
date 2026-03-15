import { z } from 'zod';

export const sectionBaseSchema = z.object({
  id: z.string().optional(),
  anchor: z.string().optional(),
  theme: z.enum(['default', 'muted', 'brand', 'inverse', 'dark']).optional(),
  container: z.enum(['sm', 'md', 'lg', 'xl', 'full']).optional(),
  spacing: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
  background: z
    .object({
      style: z.enum(['solid', 'gradient', 'grid', 'image', 'dots', 'noise']).optional(),
      imageSrc: z.string().optional(),
      gradient: z
        .object({
          from: z.string(),
          to: z.string(),
          direction: z.enum(['to-r', 'to-br', 'to-b']).optional(),
        })
        .optional(),
    })
    .optional(),
  visibility: z
    .object({
      mobile: z.boolean().optional(),
      tablet: z.boolean().optional(),
      desktop: z.boolean().optional(),
    })
    .optional(),
  analyticsId: z.string().optional(),
});

export type SectionBase = z.infer<typeof sectionBaseSchema>;
