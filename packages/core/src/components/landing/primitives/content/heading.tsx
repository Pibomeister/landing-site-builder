import type { SectionHeading } from '../../../../registry/schemas';

export interface HeadingProps extends SectionHeading {
  className?: string;
}

export function Heading({ eyebrow, title, body, align = 'left', className = '' }: HeadingProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`space-y-4 ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">{eyebrow}</p>
      )}
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h2>
      {body && <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">{body}</p>}
    </div>
  );
}
