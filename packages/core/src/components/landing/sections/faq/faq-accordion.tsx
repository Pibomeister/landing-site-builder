'use client';

import { useState } from 'react';
import type { FaqAccordionSection } from '../../../../registry/schemas/faq.schema';
import { Container } from '../../primitives/layouts/container';
import { Heading } from '../../primitives/content/heading';

export interface FaqAccordionProps extends FaqAccordionSection {
  className?: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function FaqAccordion({
  heading,
  items,
  columns = 1,
  container,
  className = '',
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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

        <div
          className={
            columns === 2 ? 'grid grid-cols-1 md:grid-cols-2 gap-x-12' : 'max-w-2xl mx-auto'
          }
        >
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full justify-between items-center py-4 cursor-pointer hover:text-primary transition-colors font-medium text-left"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && (
                  <p className="text-sm text-muted-foreground pb-4 leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
