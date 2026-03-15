import { z } from 'zod';
import type { ComponentType } from 'react';

export interface SectionDefinition<T = unknown> {
  type: string;
  variant: string;
  component: ComponentType<T>;
  schema: z.ZodSchema<T>;
  metadata: {
    name: string;
    category: string;
    description: string;
    preview: string;
    tags: string[];
    renderMode: 'server' | 'client' | 'hybrid';
    dependencies: string[];
    bundleImpact: 'light' | 'moderate' | 'heavy';
    upstreamSource?: string;
    upstreamLicense?: string;
    lastSynced?: string;
    knownLimitations?: string[];
    browserSupport?: string;
  };
  examples: {
    basic: T;
    advanced?: T;
  };
}

export function createSectionDefinition<T>(definition: SectionDefinition<T>): SectionDefinition<T> {
  return definition;
}
