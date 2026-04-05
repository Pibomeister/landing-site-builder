import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CtaSplit } from '../cta-split';
import type { CtaSplitSection } from '@/registry/schemas/cta.schema';

describe('CtaSplit', () => {
  const mockData: CtaSplitSection = {
    type: 'cta',
    variant: 'split',
    title: 'Start building for free',
    body: 'Join thousands of teams already using our platform to ship faster.',
    primary: {
      type: 'link',
      label: 'Get Started Free',
      href: '/signup',
    },
    secondary: {
      type: 'link',
      label: 'See a demo',
      href: '/demo',
    },
    benefits: ['No credit card required', 'Free 14-day trial'],
  };

  it('renders the title', () => {
    render(<CtaSplit {...mockData} />);
    expect(screen.getByText('Start building for free')).toBeInTheDocument();
  });

  it('renders the body text', () => {
    render(<CtaSplit {...mockData} />);
    expect(
      screen.getByText('Join thousands of teams already using our platform to ship faster.')
    ).toBeInTheDocument();
  });

  it('renders the benefits list', () => {
    render(<CtaSplit {...mockData} />);
    expect(screen.getByText('No credit card required')).toBeInTheDocument();
    expect(screen.getByText('Free 14-day trial')).toBeInTheDocument();
  });

  it('renders the primary CTA', () => {
    render(<CtaSplit {...mockData} />);
    const primaryButton = screen.getByRole('link', { name: 'Get Started Free' });
    expect(primaryButton).toBeInTheDocument();
    expect(primaryButton).toHaveAttribute('href', '/signup');
  });

  it('renders the secondary CTA when provided', () => {
    render(<CtaSplit {...mockData} />);
    const secondaryButton = screen.getByRole('link', { name: 'See a demo' });
    expect(secondaryButton).toBeInTheDocument();
    expect(secondaryButton).toHaveAttribute('href', '/demo');
  });

  it('does not render secondary CTA when not provided', () => {
    const dataWithoutSecondary: CtaSplitSection = {
      ...mockData,
      secondary: undefined,
    };
    render(<CtaSplit {...dataWithoutSecondary} />);
    expect(screen.queryByRole('link', { name: 'See a demo' })).not.toBeInTheDocument();
  });

  it('renders media when provided', () => {
    const dataWithMedia: CtaSplitSection = {
      ...mockData,
      media: {
        kind: 'image',
        src: '/cta-image.jpg',
        alt: 'Product preview',
      },
    };
    render(<CtaSplit {...dataWithMedia} />);
    const image = screen.getByAltText('Product preview');
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toContain('cta-image.jpg');
  });

  it('renders placeholder card when no media provided', () => {
    const dataWithoutMedia: CtaSplitSection = {
      ...mockData,
      media: undefined,
    };
    render(<CtaSplit {...dataWithoutMedia} />);
    // Placeholder card is rendered — no img element should be present
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
