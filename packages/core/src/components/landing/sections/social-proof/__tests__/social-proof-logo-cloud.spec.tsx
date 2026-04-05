import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SocialProofLogoCloud } from '../social-proof-logo-cloud';
import type { SocialProofLogoCloudSection } from '@/registry/schemas/social-proof.schema';

describe('SocialProofLogoCloud', () => {
  const mockData: SocialProofLogoCloudSection = {
    type: 'social-proof',
    variant: 'logo-cloud',
    label: 'Trusted by 1,000+ companies',
    logos: [
      { name: 'Stripe', src: 'https://logo.clearbit.com/stripe.com' },
      { name: 'Vercel', src: 'https://logo.clearbit.com/vercel.com' },
      { name: 'Notion', src: 'https://logo.clearbit.com/notion.so' },
      { name: 'Linear', src: 'https://logo.clearbit.com/linear.app' },
      { name: 'Figma', src: 'https://logo.clearbit.com/figma.com' },
      { name: 'GitHub', src: 'https://logo.clearbit.com/github.com' },
    ],
    marquee: false,
  };

  it('renders the label when provided', () => {
    render(<SocialProofLogoCloud {...mockData} />);
    expect(screen.getByText('Trusted by 1,000+ companies')).toBeInTheDocument();
  });

  it('does not render a label when not provided', () => {
    const dataWithoutLabel = { ...mockData, label: undefined };
    render(<SocialProofLogoCloud {...dataWithoutLabel} />);
    expect(screen.queryByText('Trusted by 1,000+ companies')).not.toBeInTheDocument();
  });

  it('renders all logos', () => {
    render(<SocialProofLogoCloud {...mockData} />);
    expect(screen.getByAltText('Stripe')).toBeInTheDocument();
    expect(screen.getByAltText('Vercel')).toBeInTheDocument();
    expect(screen.getByAltText('Notion')).toBeInTheDocument();
    expect(screen.getByAltText('Linear')).toBeInTheDocument();
    expect(screen.getByAltText('Figma')).toBeInTheDocument();
    expect(screen.getByAltText('GitHub')).toBeInTheDocument();
  });

  it('renders logos with correct src attributes', () => {
    render(<SocialProofLogoCloud {...mockData} />);
    const stripeImg = screen.getByAltText('Stripe');
    expect(stripeImg).toHaveAttribute('src', 'https://logo.clearbit.com/stripe.com');
  });

  it('renders logo links when href is provided', () => {
    const dataWithLinks: SocialProofLogoCloudSection = {
      ...mockData,
      logos: [
        { name: 'Stripe', src: 'https://logo.clearbit.com/stripe.com', href: 'https://stripe.com' },
        { name: 'Vercel', src: 'https://logo.clearbit.com/vercel.com' },
        { name: 'Notion', src: 'https://logo.clearbit.com/notion.so' },
      ],
    };
    render(<SocialProofLogoCloud {...dataWithLinks} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://stripe.com');
  });

  it('applies marquee animation class when marquee is true', () => {
    const marqueeData: SocialProofLogoCloudSection = { ...mockData, marquee: true };
    const { container } = render(<SocialProofLogoCloud {...marqueeData} />);
    const animatedDiv = container.querySelector('.animate-\\[marquee_20s_linear_infinite\\]');
    expect(animatedDiv).toBeInTheDocument();
  });

  it('does not apply marquee animation class when marquee is false', () => {
    const { container } = render(<SocialProofLogoCloud {...mockData} />);
    const animatedDiv = container.querySelector('.animate-\\[marquee_20s_linear_infinite\\]');
    expect(animatedDiv).not.toBeInTheDocument();
  });

  it('duplicates logos for seamless marquee loop', () => {
    const marqueeData: SocialProofLogoCloudSection = { ...mockData, marquee: true };
    render(<SocialProofLogoCloud {...marqueeData} />);
    // Each logo should appear twice (original + duplicate for seamless loop)
    const stripeImgs = screen.getAllByAltText('Stripe');
    expect(stripeImgs).toHaveLength(2);
  });
});
