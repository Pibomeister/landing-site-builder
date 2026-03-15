import { z } from 'zod';

export const actionVariantSchema = z.enum(['primary', 'secondary', 'ghost']);

export const linkActionSchema = z.object({
  type: z.literal('link'),
  label: z.string(),
  href: z.string(),
  target: z.enum(['_self', '_blank']).optional(),
  variant: actionVariantSchema.optional(),
});

export const scrollActionSchema = z.object({
  type: z.literal('scroll'),
  label: z.string(),
  targetId: z.string(),
  variant: actionVariantSchema.optional(),
});

export const modalActionSchema = z.object({
  type: z.literal('modal'),
  label: z.string(),
  modalId: z.string(),
  variant: actionVariantSchema.optional(),
});

export const submitActionSchema = z.object({
  type: z.literal('submit'),
  label: z.string(),
  formId: z.string(),
  variant: actionVariantSchema.optional(),
});

export const sectionActionSchema = z.discriminatedUnion('type', [
  linkActionSchema,
  scrollActionSchema,
  modalActionSchema,
  submitActionSchema,
]);

export type SectionAction = z.infer<typeof sectionActionSchema>;
