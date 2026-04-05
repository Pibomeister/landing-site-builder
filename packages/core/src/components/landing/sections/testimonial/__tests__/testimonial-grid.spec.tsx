import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestimonialGrid } from '../testimonial-grid';
import type { TestimonialGridSection } from '@/registry/schemas/testimonial.schema';

describe('TestimonialGrid', () => {
  const mockData: TestimonialGridSection = {
    type: 'testimonial',
    variant: 'grid',
    testimonials: [
      {
        quote: 'This product changed everything for us.',
        author: {
          name: 'Alice Johnson',
          title: 'CEO',
          company: 'Acme Corp',
        },
        rating: 5,
      },
      {
        quote: 'Incredibly easy to use and powerful at the same time.',
        author: {
          name: 'Bob Smith',
          title: 'CTO',
          company: 'TechCo',
          avatar: '/avatars/bob.jpg',
        },
        rating: 4,
      },
      {
        quote: 'We saw results from day one. Highly recommend.',
        author: {
          name: 'Carol White',
          title: 'Head of Product',
        },
      },
    ],
    columns: 3,
  };

  it('renders all testimonials', () => {
    render(<TestimonialGrid {...mockData} />);
    expect(screen.getByText('This product changed everything for us.')).toBeInTheDocument();
    expect(
      screen.getByText('Incredibly easy to use and powerful at the same time.')
    ).toBeInTheDocument();
    expect(screen.getByText('We saw results from day one. Highly recommend.')).toBeInTheDocument();
  });

  it('renders star rating when rating is provided', () => {
    render(<TestimonialGrid {...mockData} />);
    expect(screen.getByLabelText('5 out of 5 stars')).toBeInTheDocument();
    expect(screen.getByLabelText('4 out of 5 stars')).toBeInTheDocument();
  });

  it('does not render star rating when rating is not provided', () => {
    render(<TestimonialGrid {...mockData} />);
    // Carol White has no rating — only 2 rating elements should exist
    const ratingElements = screen.queryAllByLabelText(/out of 5 stars/);
    expect(ratingElements).toHaveLength(2);
  });

  it('renders author name and title for all testimonials', () => {
    render(<TestimonialGrid {...mockData} />);
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('Carol White')).toBeInTheDocument();
  });

  it('renders author title and company when both are provided', () => {
    render(<TestimonialGrid {...mockData} />);
    expect(screen.getByText('CEO, Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('CTO, TechCo')).toBeInTheDocument();
  });

  it('renders author title without company when company is not provided', () => {
    render(<TestimonialGrid {...mockData} />);
    expect(screen.getByText('Head of Product')).toBeInTheDocument();
  });

  it('renders avatar image when avatar URL is provided', () => {
    render(<TestimonialGrid {...mockData} />);
    const avatar = screen.getByAltText('Bob Smith');
    expect(avatar).toBeInTheDocument();
    expect(avatar.getAttribute('src')).toContain('bob.jpg');
  });

  it('does not render avatar when avatar URL is not provided', () => {
    render(<TestimonialGrid {...mockData} />);
    expect(screen.queryByAltText('Alice Johnson')).not.toBeInTheDocument();
  });

  it('renders heading when provided', () => {
    const dataWithHeading: TestimonialGridSection = {
      ...mockData,
      heading: {
        eyebrow: 'Testimonials',
        title: 'What our customers say',
        body: 'Trusted by thousands of teams.',
        align: 'center',
      },
    };
    render(<TestimonialGrid {...dataWithHeading} />);
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('What our customers say')).toBeInTheDocument();
    expect(screen.getByText('Trusted by thousands of teams.')).toBeInTheDocument();
  });

  it('does not render heading section when heading is not provided', () => {
    render(<TestimonialGrid {...mockData} />);
    expect(screen.queryByText('Testimonials')).not.toBeInTheDocument();
  });
});
