import Image from 'next/image';
import type { HeroCenteredSection } from '../../../../registry/schemas/hero.schema';
import { Container } from '../../primitives/layouts/container';
import { Heading } from '../../primitives/content/heading';

export interface HeroCenteredProps extends HeroCenteredSection {
  className?: string;
}

export function HeroCentered({
  badge,
  heading,
  actions,
  socialProof,
  container,
  className = '',
}: HeroCenteredProps) {
  return (
    <section
      className={`relative py-24 md:py-32 lg:py-40 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)] ${className}`}
    >
      <Container size={container || 'lg'}>
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          {badge && (
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {badge}
              </span>
            </div>
          )}

          {/* Heading */}
          <Heading
            eyebrow={heading.eyebrow}
            title={heading.title}
            body={heading.body}
            align="center"
            as="h1"
            className="[&_h1]:text-5xl [&_h1]:md:text-6xl [&_h1]:lg:text-7xl"
          />

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
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

          {/* Social proof */}
          {socialProof && (
            <div className="mt-6 flex items-center justify-center gap-3">
              {socialProof.avatars && socialProof.avatars.length > 0 && (
                <div className="flex -space-x-2">
                  {socialProof.avatars.map((src, i) => (
                    <div
                      key={i}
                      className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-background"
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="32px" />
                    </div>
                  ))}
                </div>
              )}
              {socialProof.label && (
                <p className="text-sm text-muted-foreground">{socialProof.label}</p>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
