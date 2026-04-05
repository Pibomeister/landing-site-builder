import Image from 'next/image';
import type { CtaSplitSection } from '../../../../registry/schemas/cta.schema';
import { Container } from '../../primitives/layouts/container';

export interface CtaSplitProps extends CtaSplitSection {
  className?: string;
}

export function CtaSplit({
  title,
  body,
  primary,
  secondary,
  benefits,
  media,
  container,
  className = '',
}: CtaSplitProps) {
  return (
    <section className={`bg-muted py-16 md:py-24 ${className}`}>
      <Container size={container || 'lg'}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center">
          {/* Left column - Text content */}
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>

            {body && <p className="text-muted-foreground mt-4">{body}</p>}

            {benefits && benefits.length > 0 && (
              <ul className="mt-6 space-y-2">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <span className="text-primary font-medium">✓</span>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {primary.type === 'link' && (
                <a
                  href={primary.href}
                  target={primary.target || '_self'}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-primary bg-clip-padding px-7 text-sm font-medium text-primary-foreground whitespace-nowrap transition-[color,background-color,border-color,transform] outline-none select-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98]"
                >
                  {primary.label}
                </a>
              )}

              {secondary && secondary.type === 'link' && (
                <a
                  href={secondary.href}
                  target={secondary.target || '_self'}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background bg-clip-padding px-7 text-sm font-medium text-foreground whitespace-nowrap transition-[color,background-color,border-color,transform] outline-none select-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
                >
                  {secondary.label}
                </a>
              )}
            </div>
          </div>

          {/* Right column - Media or placeholder card */}
          <div>
            {media ? (
              <div className="rounded-xl overflow-hidden shadow-lg">
                {media.kind === 'image' && (
                  <Image
                    src={media.src}
                    alt={media.alt || ''}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ) : (
              <div className="bg-muted rounded-xl p-8 shadow-lg border border-border">
                <div className="space-y-3">
                  <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                  <div className="h-4 bg-muted-foreground/20 rounded w-1/2" />
                  <div className="h-32 bg-muted-foreground/10 rounded-lg mt-4" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-8 bg-primary/20 rounded flex-1" />
                    <div className="h-8 bg-muted-foreground/10 rounded flex-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
