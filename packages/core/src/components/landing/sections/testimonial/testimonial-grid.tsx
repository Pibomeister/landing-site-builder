import Image from 'next/image';
import type { TestimonialGridSection } from '../../../../registry/schemas/testimonial.schema';
import { Container } from '../../primitives/layouts/container';
import { Heading } from '../../primitives/content/heading';

export interface TestimonialGridProps extends TestimonialGridSection {
  className?: string;
}

export function TestimonialGrid({
  heading,
  testimonials,
  columns = 3,
  container,
  className = '',
}: TestimonialGridProps) {
  const columnClasses = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container size={container || 'lg'}>
        {heading && (
          <div className="mb-12">
            <Heading
              eyebrow={heading.eyebrow}
              title={heading.title}
              body={heading.body}
              align={heading.align || 'center'}
            />
          </div>
        )}

        <div className={`grid grid-cols-1 gap-6 ${columnClasses[columns ?? 3]}`}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 space-y-4">
              {/* Star rating */}
              {testimonial.rating !== undefined && (
                <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < testimonial.rating! ? 'text-amber-400' : 'text-muted-foreground/30'
                      }
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              {/* Quote */}
              <div>
                <span
                  className="text-primary text-4xl font-serif leading-none mb-2 block"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="text-sm leading-relaxed text-foreground">{testimonial.quote}</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2">
                {testimonial.author.avatar && (
                  <Image
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover shrink-0"
                  />
                )}
                <div>
                  <p className="font-semibold text-sm">{testimonial.author.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.author.title}
                    {testimonial.author.company && `, ${testimonial.author.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
