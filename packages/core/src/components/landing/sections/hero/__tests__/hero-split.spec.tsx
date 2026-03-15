import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSplit } from '../hero-split';
import type { HeroSplitSection } from '@/registry/schemas/hero.schema';

describe('HeroSplit', () => {
  const mockData: HeroSplitSection = {
    type: 'hero',
    variant: 'split',
    heading: {
      eyebrow: 'Welcome',
      title: 'Build Amazing Landing Pages',
      body: 'Create beautiful, high-converting landing pages with our powerful builder.',
    },
    media: {
      kind: 'image',
      src: '/hero-image.jpg',
      alt: 'Hero image',
    },
    actions: {
      primary: {
        type: 'link',
        label: 'Get Started',
        href: '/signup',
      },
      secondary: {
        type: 'link',
        label: 'Learn More',
        href: '/learn',
      },
    },
  };

  it('renders the eyebrow text', () => {
    render(<HeroSplit {...mockData} />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<HeroSplit {...mockData} />);
    expect(screen.getByText('Build Amazing Landing Pages')).toBeInTheDocument();
  });

  it('renders the body text', () => {
    render(<HeroSplit {...mockData} />);
    expect(
      screen.getByText('Create beautiful, high-converting landing pages with our powerful builder.')
    ).toBeInTheDocument();
  });

  it('renders the image with correct attributes', () => {
    render(<HeroSplit {...mockData} />);
    const image = screen.getByAltText('Hero image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/hero-image.jpg');
  });

  it('renders the primary CTA', () => {
    render(<HeroSplit {...mockData} />);
    const primaryButton = screen.getByRole('link', { name: 'Get Started' });
    expect(primaryButton).toBeInTheDocument();
    expect(primaryButton).toHaveAttribute('href', '/signup');
  });

  it('renders the secondary CTA when provided', () => {
    render(<HeroSplit {...mockData} />);
    const secondaryButton = screen.getByRole('link', { name: 'Learn More' });
    expect(secondaryButton).toBeInTheDocument();
    expect(secondaryButton).toHaveAttribute('href', '/learn');
  });

  it('does not render secondary CTA when not provided', () => {
    const dataWithoutSecondary = {
      ...mockData,
      actions: {
        primary: mockData.actions.primary,
      },
    };
    render(<HeroSplit {...dataWithoutSecondary} />);
    expect(screen.queryByRole('link', { name: 'Learn More' })).not.toBeInTheDocument();
  });

  it('renders heading with correct alignment when specified', () => {
    const dataWithAlignment = {
      ...mockData,
      heading: {
        ...mockData.heading,
        align: 'center' as const,
      },
    };
    render(<HeroSplit {...dataWithAlignment} />);
    expect(screen.getByText('Build Amazing Landing Pages')).toBeInTheDocument();
  });
});
