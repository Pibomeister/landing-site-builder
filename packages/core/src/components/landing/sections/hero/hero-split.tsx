import type { HeroSplitSection } from '../../../../registry/schemas/hero.schema';
import { Container } from '../../primitives/layouts/container';
import { Heading } from '../../primitives/content/heading';
import { WaitlistForm } from '../../chrome/waitlist-form';

export interface HeroSplitProps extends HeroSplitSection {
  className?: string;
}

export function HeroSplit({ heading, media, actions, container, className = '' }: HeroSplitProps) {
  return (
    <section className={`py-16 md:py-24 lg:py-32 ${className}`}>
      <Container size={container || 'lg'}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            <Heading
              eyebrow={heading.eyebrow}
              title={heading.title}
              body={heading.body}
              align={heading.align || 'left'}
            />

            {/* Actions or Form */}
            {actions.type === 'form' ? (
              <div className="max-w-md">
                <WaitlistForm className="mt-8" />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                {actions.primary.type === 'link' && (
                  /* Primary CTA: styled to match Button variant="default" size="lg" */
                  <a
                    href={actions.primary.href}
                    target={actions.primary.target || '_self'}
                    className="group/button inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-primary bg-clip-padding px-8 text-base font-medium text-primary-foreground whitespace-nowrap transition-[color,background-color,border-color,transform] outline-none select-none hover:bg-primary/90 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98]"
                  >
                    {actions.primary.label}
                  </a>
                )}

                {actions.secondary && actions.secondary.type === 'link' && (
                  /* Secondary CTA: styled to match Button variant="outline" size="lg" */
                  <a
                    href={actions.secondary.href}
                    target={actions.secondary.target || '_self'}
                    className="group/button inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background bg-clip-padding px-8 text-base font-medium text-foreground whitespace-nowrap transition-[color,background-color,border-color,transform] outline-none select-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] dark:border-input dark:bg-input/30 dark:hover:bg-input/50"
                  >
                    {actions.secondary.label}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right column - Media */}
          <div className="relative lg:h-[500px] xl:h-[600px]">
            {media.kind === 'image' && (
              <img
                src={media.src}
                alt={media.alt || ''}
                loading="lazy"
                className="w-full h-full object-cover rounded-xl"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
