import { z } from 'zod';

export const mediaAssetSchema = z.object({
  kind: z.enum(['image', 'video', 'embed', 'lottie', 'code']),
  src: z.string(),
  alt: z.string().optional(),
  poster: z.string().optional(),
  aspectRatio: z.enum(['16:9', '4:3', '1:1', '9:16', 'auto']).optional(),
  quality: z.number().min(1).max(100).optional(),
});

export type MediaAsset = z.infer<typeof mediaAssetSchema>;
