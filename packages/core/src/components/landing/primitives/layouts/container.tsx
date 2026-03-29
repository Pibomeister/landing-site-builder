import { type ReactNode } from 'react';

export interface ContainerProps {
  as?: 'div' | 'section' | 'article' | 'main' | 'aside';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: ReactNode;
  className?: string;
}

export function Container({ as, size = 'lg', children, className = '' }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  const Tag = as ?? 'div';
  const classes = ['mx-auto px-6 sm:px-8 lg:px-12', sizeClasses[size], className]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
}
