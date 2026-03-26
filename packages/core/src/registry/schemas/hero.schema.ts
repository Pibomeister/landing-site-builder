import { z } from 'zod';
import { sectionBaseSchema } from './section-base.schema';
import { sectionHeadingSchema } from './heading.schema';
import { mediaAssetSchema } from './media.schema';
import { sectionActionSchema } from './action.schema';

export const heroSplitSchema = sectionBaseSchema.extend({
  type: z.literal('hero'),
  variant: z.literal('split'),
  heading: sectionHeadingSchema,
  media: mediaAssetSchema,
  actions: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('buttons'),
      primary: sectionActionSchema,
      secondary: sectionActionSchema.optional(),
    }),
    z.object({
      type: z.literal('form'),
      formType: z.literal('waitlist'),
    }),
  ]),
});

export type HeroSplitSection = z.infer<typeof heroSplitSchema>;
