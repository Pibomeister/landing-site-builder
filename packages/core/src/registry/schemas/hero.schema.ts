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
  actions: z.object({
    primary: sectionActionSchema,
    secondary: sectionActionSchema.optional(),
  }),
});

export type HeroSplitSection = z.infer<typeof heroSplitSchema>;
