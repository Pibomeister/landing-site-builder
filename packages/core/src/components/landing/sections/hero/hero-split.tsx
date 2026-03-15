import type { HeroSplitSection } from '../../../../registry/schemas/hero.schema';
import { Container } from '../../primitives/layouts/container';
import { Heading } from '../../primitives/content/heading';

export interface HeroSplitProps extends HeroSplitSection {
  className?: string;
}

export function HeroSplit({ heading, media, actions, container, className = '' }: HeroSplitProps) {
  return (
    <section className={`py-12 md:py-24 ${className}`}>
      <Container size={container || 'lg'}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-6">
            <Heading
              eyebrow={heading.eyebrow}
              title={heading.title}
              body={heading.body}
              align={heading.align || 'left'}
            />

            {/* Actions */}
            <div className="flex gap-4 items-center">
              {actions.primary.type === 'link' && (
                <a
                  href={actions.primary.href}
                  target={actions.primary.target || '_self'}
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  {actions.primary.label}
                </a>
              )}

              {actions.secondary && actions.secondary.type === 'link' && (
                <a
                  href={actions.secondary.href}
                  target={actions.secondary.target || '_self'}
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
                >
                  {actions.secondary.label}
                </a>
              )}
            </div>
          </div>

          {/* Right column - Media */}
          <div className="relative">
            {media.kind === 'image' && (
              <img
                src={media.src}
                alt={media.alt || ''}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
