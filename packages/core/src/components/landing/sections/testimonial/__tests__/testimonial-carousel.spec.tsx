import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { TestimonialCarousel } from '../testimonial-carousel';
import type { TestimonialCarouselSection } from '@/registry/schemas/testimonial.schema';

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}));

describe('TestimonialCarousel', () => {
  const mockData: TestimonialCarouselSection = {
    type: 'testimonial',
    variant: 'carousel',
    autoPlay: false,
    testimonials: [
      {
        quote: 'First testimonial quote.',
        author: {
          name: 'Alice Johnson',
          title: 'CEO',
          company: 'Acme Corp',
          avatar: '/avatars/alice.jpg',
        },
        rating: 5,
      },
      {
        quote: 'Second testimonial quote.',
        author: {
          name: 'Bob Smith',
          title: 'CTO',
          company: 'TechCo',
        },
        rating: 4,
      },
      {
        quote: 'Third testimonial quote.',
        author: {
          name: 'Carol White',
          title: 'Head of Product',
        },
      },
    ],
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the first testimonial on mount', () => {
    render(<TestimonialCarousel {...mockData} />);
    expect(screen.getByText(/First testimonial quote/)).toBeInTheDocument();
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('CEO, Acme Corp')).toBeInTheDocument();
  });

  it('renders navigation dots for each testimonial', () => {
    render(<TestimonialCarousel {...mockData} />);
    const dots = screen.getAllByRole('button', { name: /Go to testimonial/ });
    expect(dots).toHaveLength(mockData.testimonials.length);
  });

  it('renders prev and next arrow buttons', () => {
    render(<TestimonialCarousel {...mockData} />);
    expect(screen.getByRole('button', { name: 'Previous testimonial' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next testimonial' })).toBeInTheDocument();
  });

  it('marks the first dot as current on mount', () => {
    render(<TestimonialCarousel {...mockData} />);
    const firstDot = screen.getByRole('button', { name: 'Go to testimonial 1' });
    expect(firstDot).toHaveAttribute('aria-current', 'true');
  });

  it('navigates to the next testimonial when next button is clicked', () => {
    render(<TestimonialCarousel {...mockData} />);

    const nextButton = screen.getByRole('button', { name: 'Next testimonial' });
    act(() => {
      nextButton.click();
    });

    // Advance the opacity fade timer (300ms)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText(/Second testimonial quote/)).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });

  it('navigates to the previous testimonial when prev button is clicked', () => {
    render(<TestimonialCarousel {...mockData} />);

    // From index 0, pressing prev wraps to last
    const prevButton = screen.getByRole('button', { name: 'Previous testimonial' });
    act(() => {
      prevButton.click();
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText(/Third testimonial quote/)).toBeInTheDocument();
  });

  it('navigates directly to a testimonial via dot click', () => {
    render(<TestimonialCarousel {...mockData} />);

    const thirdDot = screen.getByRole('button', { name: 'Go to testimonial 3' });
    act(() => {
      thirdDot.click();
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText(/Third testimonial quote/)).toBeInTheDocument();
    expect(screen.getByText('Carol White')).toBeInTheDocument();
  });

  it('renders star rating when rating is provided', () => {
    render(<TestimonialCarousel {...mockData} />);
    expect(screen.getByLabelText('5 out of 5 stars')).toBeInTheDocument();
  });

  it('renders avatar image when avatar URL is provided', () => {
    render(<TestimonialCarousel {...mockData} />);
    const avatar = screen.getByAltText('Alice Johnson');
    expect(avatar).toBeInTheDocument();
    expect(avatar.getAttribute('src')).toContain('alice.jpg');
  });

  it('renders heading when provided', () => {
    const dataWithHeading: TestimonialCarouselSection = {
      ...mockData,
      heading: {
        eyebrow: 'Testimonials',
        title: 'What our customers say',
        align: 'center',
      },
    };
    render(<TestimonialCarousel {...dataWithHeading} />);
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('What our customers say')).toBeInTheDocument();
  });

  it('does not render heading section when heading is not provided', () => {
    render(<TestimonialCarousel {...mockData} />);
    expect(screen.queryByText('Testimonials')).not.toBeInTheDocument();
  });
});
