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

export const heroCenteredSchema = sectionBaseSchema.extend({
  type: z.literal('hero'),
  variant: z.literal('centered'),
  badge: z.string().optional(), // small pill above headline e.g. "Now in Beta"
  heading: sectionHeadingSchema,
  actions: z.object({
    primary: sectionActionSchema,
    secondary: sectionActionSchema.optional(),
  }),
  socialProof: z
    .object({
      avatars: z.array(z.string()).max(5).optional(), // avatar URLs
      label: z.string().optional(), // "Join 2,000+ users"
    })
    .optional(),
});

export type HeroCenteredSection = z.infer<typeof heroCenteredSchema>;
