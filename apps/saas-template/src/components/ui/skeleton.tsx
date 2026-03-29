import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const skeletonVariants = cva('rounded-md bg-muted', {
  variants: {
    variant: {
      default: 'animate-pulse',
      shimmer:
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent overflow-hidden relative',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function Skeleton({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      data-slot="skeleton"
      role="status"
      aria-label="Loading..."
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Skeleton };
