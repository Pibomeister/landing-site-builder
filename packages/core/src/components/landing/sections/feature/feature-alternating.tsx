import Image from 'next/image';
import type { FeatureAlternatingSection } from '../../../../registry/schemas/feature-alternating.schema';
import { Container } from '../../primitives/layouts/container';
import { Heading } from '../../primitives/content/heading';

export interface FeatureAlternatingProps extends FeatureAlternatingSection {
  className?: string;
}

export function FeatureAlternating({
  heading,
  rows,
  container,
  className = '',
}: FeatureAlternatingProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container size={container || 'lg'}>
        {heading && (
          <div className="mb-16 text-center">
            <Heading
              eyebrow={heading.eyebrow}
              title={heading.title}
              body={heading.body}
              align={heading.align || 'center'}
            />
          </div>
        )}

        <div>
          {rows.map((row, index) => (
            <div key={index}>
              {index > 0 && <div className="border-t border-border" />}
              <div
                className={`flex flex-col gap-12 py-12 md:py-16 md:flex-row md:items-center ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Media side */}
                <div className="md:w-1/2">
                  {row.media.kind === 'image' && (
                    <Image
                      src={row.media.src}
                      alt={row.media.alt || ''}
                      width={800}
                      height={450}
                      className="w-full rounded-xl object-cover aspect-video"
                    />
                  )}
                </div>

                {/* Text side */}
                <div className="space-y-4 md:w-1/2">
                  {row.eyebrow && (
                    <p className="text-xs font-mono font-medium text-primary uppercase tracking-widest">
                      {row.eyebrow}
                    </p>
                  )}
                  <h3 className="text-2xl font-semibold">{row.title}</h3>
                  <p className="text-muted-foreground">{row.body}</p>
                  {row.cta && (
                    <a
                      href={row.cta.href}
                      className="inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {row.cta.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
