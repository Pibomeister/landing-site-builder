import { type ReactNode } from 'react';

export interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: ReactNode;
  className?: string;
}

export function Container({ size = 'lg', children, className = '' }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return <div className={`mx-auto px-4 ${sizeClasses[size]} ${className}`}>{children}</div>;
}
