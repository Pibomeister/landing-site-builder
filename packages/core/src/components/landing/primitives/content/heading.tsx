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
        <p className="text-xs font-mono font-medium text-primary uppercase tracking-[0.15em] mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal tracking-tight leading-[1.1]">
        {title}
      </h2>
      {body && <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">{body}</p>}
    </div>
  );
}
