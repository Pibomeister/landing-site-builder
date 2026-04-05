'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { TestimonialCarouselSection } from '../../../../registry/schemas/testimonial.schema';
import { Container } from '../../primitives/layouts/container';
import { Heading } from '../../primitives/content/heading';

export interface TestimonialCarouselProps extends TestimonialCarouselSection {
  className?: string;
}

export function TestimonialCarousel({
  heading,
  testimonials,
  autoPlay = true,
  interval = 5000,
  container,
  className = '',
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = (index: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setVisible(true);
    }, 300);
  };

  const prev = () => {
    goTo((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    goTo((currentIndex + 1) % testimonials.length);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % testimonials.length);
        setVisible(true);
      }, 300);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  const testimonial = testimonials[currentIndex];

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

        <div className="relative flex items-center">
          {/* Prev button */}
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={prev}
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Testimonial content */}
          <div
            className={`flex-1 flex flex-col items-center text-center transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Star rating */}
            {testimonial.rating !== undefined && (
              <div
                className="flex gap-0.5 mb-6"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < testimonial.rating!
                        ? 'text-amber-400 text-xl'
                        : 'text-muted-foreground/30 text-xl'
                    }
                    aria-hidden="true"
                  >
                    ★
                  </span>
                ))}
              </div>
            )}

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl font-medium text-center max-w-2xl mx-auto leading-relaxed text-foreground mb-8">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center gap-3">
              {testimonial.author.avatar && (
                <Image
                  src={testimonial.author.avatar}
                  alt={testimonial.author.name}
                  width={64}
                  height={64}
                  className="rounded-full w-16 h-16 object-cover"
                />
              )}
              <div className="text-center">
                <p className="font-semibold text-foreground">{testimonial.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.author.title}
                  {testimonial.author.company && `, ${testimonial.author.company}`}
                </p>
              </div>
            </div>
          </div>

          {/* Next button */}
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={next}
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ml-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8" aria-label="Testimonial navigation">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
              onClick={() => goTo(index)}
              className={`w-2 h-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                index === currentIndex
                  ? 'bg-primary'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
