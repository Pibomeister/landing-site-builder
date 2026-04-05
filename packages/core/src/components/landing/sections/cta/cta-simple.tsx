import type { CtaSimpleSection } from '../../../../registry/schemas/cta.schema';
import { Container } from '../../primitives/layouts/container';

export interface CtaSimpleProps extends CtaSimpleSection {
  className?: string;
}

export function CtaSimple({
  title,
  body,
  primary,
  secondary,
  background = 'brand',
  className = '',
}: CtaSimpleProps) {
  const backgroundClasses: Record<string, string> = {
    brand: 'bg-primary text-primary-foreground',
    dark: 'bg-foreground text-background',
    muted: 'bg-muted text-foreground',
    default: 'bg-background text-foreground border-y border-border',
  };

  const isInverted = background === 'brand' || background === 'dark';

  const primaryButtonClasses = isInverted
    ? 'group/button inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-background bg-clip-padding px-8 text-base font-medium text-foreground whitespace-nowrap transition-[color,background-color,border-color,transform] outline-none select-none hover:bg-background/90 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98]'
    : 'group/button inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-primary bg-clip-padding px-8 text-base font-medium text-primary-foreground whitespace-nowrap transition-[color,background-color,border-color,transform] outline-none select-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98]';

  const secondaryButtonClasses = isInverted
    ? 'group/button inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-current bg-transparent bg-clip-padding px-8 text-base font-medium whitespace-nowrap transition-[color,background-color,border-color,transform] outline-none select-none hover:bg-white/10 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98]'
    : 'group/button inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background bg-clip-padding px-8 text-base font-medium text-foreground whitespace-nowrap transition-[color,background-color,border-color,transform] outline-none select-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] dark:border-input dark:bg-input/30 dark:hover:bg-input/50';

  return (
    <section
      className={`py-16 md:py-24 ${backgroundClasses[background] ?? backgroundClasses.brand} ${className}`}
    >
      <Container size="md">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>

          {body && <p className="text-lg opacity-80 mt-4 max-w-2xl mx-auto">{body}</p>}

          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            {primary.type === 'link' && (
              <a
                href={primary.href}
                target={primary.target || '_self'}
                className={primaryButtonClasses}
              >
                {primary.label}
              </a>
            )}

            {secondary && secondary.type === 'link' && (
              <a
                href={secondary.href}
                target={secondary.target || '_self'}
                className={secondaryButtonClasses}
              >
                {secondary.label}
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
