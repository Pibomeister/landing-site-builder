import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroCentered } from '../hero-centered';
import type { HeroCenteredSection } from '@/registry/schemas/hero.schema';

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
    sizes?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  ),
}));

describe('HeroCentered', () => {
  const mockData: HeroCenteredSection = {
    type: 'hero',
    variant: 'centered',
    heading: {
      title: 'Build Amazing Landing Pages',
      body: 'Create beautiful, high-converting landing pages with our powerful builder.',
    },
    actions: {
      primary: {
        type: 'link',
        label: 'Get Started',
        href: '/signup',
      },
    },
  };

  it('renders the heading title', () => {
    render(<HeroCentered {...mockData} />);
    expect(screen.getByText('Build Amazing Landing Pages')).toBeInTheDocument();
  });

  it('renders the heading body text', () => {
    render(<HeroCentered {...mockData} />);
    expect(
      screen.getByText('Create beautiful, high-converting landing pages with our powerful builder.')
    ).toBeInTheDocument();
  });

  it('renders the badge when provided', () => {
    render(<HeroCentered {...mockData} badge="Now in Beta" />);
    expect(screen.getByText('Now in Beta')).toBeInTheDocument();
  });

  it('does not render badge when not provided', () => {
    render(<HeroCentered {...mockData} />);
    expect(screen.queryByText('Now in Beta')).not.toBeInTheDocument();
  });

  it('renders the primary CTA', () => {
    render(<HeroCentered {...mockData} />);
    const primaryButton = screen.getByRole('link', { name: 'Get Started' });
    expect(primaryButton).toBeInTheDocument();
    expect(primaryButton).toHaveAttribute('href', '/signup');
  });

  it('renders the secondary CTA when provided', () => {
    const dataWithSecondary: HeroCenteredSection = {
      ...mockData,
      actions: {
        ...mockData.actions,
        secondary: {
          type: 'link',
          label: 'Learn More',
          href: '/docs',
        },
      },
    };
    render(<HeroCentered {...dataWithSecondary} />);
    const secondaryButton = screen.getByRole('link', { name: 'Learn More' });
    expect(secondaryButton).toBeInTheDocument();
    expect(secondaryButton).toHaveAttribute('href', '/docs');
  });

  it('does not render secondary CTA when not provided', () => {
    render(<HeroCentered {...mockData} />);
    expect(screen.queryByRole('link', { name: 'Learn More' })).not.toBeInTheDocument();
  });

  it('renders social proof label when provided', () => {
    const dataWithSocialProof: HeroCenteredSection = {
      ...mockData,
      socialProof: {
        label: 'Join 2,000+ users',
      },
    };
    render(<HeroCentered {...dataWithSocialProof} />);
    expect(screen.getByText('Join 2,000+ users')).toBeInTheDocument();
  });

  it('renders social proof avatars when provided', () => {
    const dataWithAvatars: HeroCenteredSection = {
      ...mockData,
      socialProof: {
        avatars: ['https://i.pravatar.cc/64?img=1', 'https://i.pravatar.cc/64?img=2'],
        label: 'Join 2,000+ users',
      },
    };
    const { container } = render(<HeroCentered {...dataWithAvatars} />);
    // Avatars are decorative (alt=""), query by tag rather than ARIA role
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
  });

  it('does not render social proof when not provided', () => {
    render(<HeroCentered {...mockData} />);
    expect(screen.queryByText('Join 2,000+ users')).not.toBeInTheDocument();
  });
});
