import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NavTop } from '../nav-top';
import type { NavTopSection } from '@/registry/schemas/nav.schema';

describe('NavTop', () => {
  const mockData: NavTopSection = {
    type: 'nav',
    variant: 'top',
    logo: {
      text: 'Acme Corp',
      href: '/',
    },
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'About', href: '/about' },
    ],
    cta: {
      type: 'link',
      label: 'Get Started',
      href: '/signup',
    },
    sticky: true,
    transparent: false,
  };

  it('renders the logo text', () => {
    render(<NavTop {...mockData} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('renders nav links', () => {
    render(<NavTop {...mockData} />);
    expect(screen.getByRole('link', { name: 'Features' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Pricing' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('renders CTA when provided', () => {
    render(<NavTop {...mockData} />);
    const ctaLinks = screen.getAllByRole('link', { name: 'Get Started' });
    expect(ctaLinks.length).toBeGreaterThan(0);
    expect(ctaLinks[0]).toHaveAttribute('href', '/signup');
  });

  it('renders header element', () => {
    render(<NavTop {...mockData} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('does not render CTA when not provided', () => {
    const dataWithoutCta: NavTopSection = {
      ...mockData,
      cta: undefined,
    };
    render(<NavTop {...dataWithoutCta} />);
    expect(screen.queryByRole('link', { name: 'Get Started' })).not.toBeInTheDocument();
  });

  it('renders logo as text when no src provided', () => {
    render(<NavTop {...mockData} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('renders logo as image when src provided', () => {
    const dataWithLogoSrc: NavTopSection = {
      ...mockData,
      logo: {
        text: 'Acme Corp',
        src: '/logo.png',
        href: '/',
      },
    };
    render(<NavTop {...dataWithLogoSrc} />);
    const logoImage = screen.getByAltText('Acme Corp');
    expect(logoImage).toBeInTheDocument();
  });
});
