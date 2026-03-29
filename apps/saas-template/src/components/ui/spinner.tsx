import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'size-3',
      md: 'size-4',
      lg: 'size-6',
      xl: 'size-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

function Spinner({
  className,
  size = 'md',
  'aria-label': ariaLabel = 'Loading',
  ...props
}: React.ComponentProps<'svg'> & VariantProps<typeof spinnerVariants> & { 'aria-label'?: string }) {
  return (
    <Loader2Icon
      role="status"
      aria-label={ariaLabel}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
}

export { Spinner };
