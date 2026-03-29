import type { SectionHeading } from '../../../../registry/schemas';

export interface HeadingProps extends SectionHeading {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}

export function Heading({
  eyebrow,
  title,
  body,
  align = 'left',
  as,
  className = '',
}: HeadingProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const Tag = as ?? 'h2';

  return (
    <div className={`space-y-4 ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-mono font-medium text-primary uppercase tracking-[0.15em] mb-2">
          {eyebrow}
        </p>
      )}
      <Tag className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-display font-normal tracking-tight leading-[1.1]">
        {title}
      </Tag>
      {body && (
        <p
          className={`mt-4 text-lg leading-8 text-muted-foreground max-w-2xl${align === 'center' ? ' mx-auto' : ''}`}
        >
          {body}
        </p>
      )}
    </div>
  );
}
