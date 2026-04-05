import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FaqAccordion } from '../faq-accordion';
import type { FaqAccordionSection } from '@/registry/schemas/faq.schema';

describe('FaqAccordion', () => {
  const mockData: FaqAccordionSection = {
    type: 'faq',
    variant: 'accordion',
    items: [
      {
        question: 'How does the free trial work?',
        answer: 'You can try our platform free for 14 days with full access to all features.',
      },
      {
        question: 'Can I change my plan later?',
        answer: 'Absolutely. You can upgrade or downgrade your plan at any time.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and bank transfers.',
      },
    ],
  };

  it('renders all questions', () => {
    render(<FaqAccordion {...mockData} />);
    expect(screen.getByText('How does the free trial work?')).toBeInTheDocument();
    expect(screen.getByText('Can I change my plan later?')).toBeInTheDocument();
    expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
  });

  it('renders heading when provided', () => {
    const dataWithHeading: FaqAccordionSection = {
      ...mockData,
      heading: {
        eyebrow: 'FAQ',
        title: 'Frequently Asked Questions',
        body: 'Everything you need to know.',
        align: 'center',
      },
    };
    render(<FaqAccordion {...dataWithHeading} />);
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('Everything you need to know.')).toBeInTheDocument();
  });

  it('does not render heading section when heading is not provided', () => {
    render(<FaqAccordion {...mockData} />);
    expect(screen.queryByText('Frequently Asked Questions')).not.toBeInTheDocument();
  });

  it('question is initially collapsed (answer not visible)', () => {
    render(<FaqAccordion {...mockData} />);
    expect(
      screen.queryByText(
        'You can try our platform free for 14 days with full access to all features.'
      )
    ).not.toBeInTheDocument();
  });
});
