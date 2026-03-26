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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
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
                  <a
                    href={actions.primary.href}
                    target={actions.primary.target || '_self'}
                    className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-4 text-base font-semibold hover:bg-primary/90 transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-[0.98]"
                  >
                    {actions.primary.label}
                  </a>
                )}

                {actions.secondary && actions.secondary.type === 'link' && (
                  <a
                    href={actions.secondary.href}
                    target={actions.secondary.target || '_self'}
                    className="inline-flex items-center justify-center rounded-lg border-2 border-border bg-background px-8 py-4 text-base font-semibold hover:bg-muted transition-all duration-200"
                  >
                    {actions.secondary.label}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right column - Media */}
          <div className="relative lg:h-[600px]">
            {media.kind === 'image' && (
              <img
                src={media.src}
                alt={media.alt || ''}
                className="w-full h-full object-cover rounded-xl"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
