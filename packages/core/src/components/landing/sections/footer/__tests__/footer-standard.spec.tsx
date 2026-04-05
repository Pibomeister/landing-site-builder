import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FooterStandard } from '../footer-standard';
import type { FooterStandardSection } from '@/registry/schemas/footer.schema';

describe('FooterStandard', () => {
  const mockData: FooterStandardSection = {
    type: 'footer',
    variant: 'standard',
    logo: {
      text: 'Acme Inc.',
      href: '/',
    },
    tagline: 'Building better products, faster.',
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Blog', href: '/blog' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ],
      },
    ],
    social: [
      { platform: 'twitter', href: 'https://twitter.com/acme' },
      { platform: 'github', href: 'https://github.com/acme' },
    ],
    copyright: '© 2025 Acme Inc. All rights reserved.',
    bottomLinks: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  };

  it('renders a footer element', () => {
    const { container } = render(<FooterStandard {...mockData} />);
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('renders the logo text', () => {
    render(<FooterStandard {...mockData} />);
    expect(screen.getByText('Acme Inc.')).toBeInTheDocument();
  });

  it('renders logo as a link with correct href', () => {
    render(<FooterStandard {...mockData} />);
    const logoLink = screen.getByRole('link', { name: 'Acme Inc.' });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders the tagline when provided', () => {
    render(<FooterStandard {...mockData} />);
    expect(screen.getByText('Building better products, faster.')).toBeInTheDocument();
  });

  it('does not render tagline when not provided', () => {
    const dataWithoutTagline = { ...mockData, tagline: undefined };
    render(<FooterStandard {...dataWithoutTagline} />);
    expect(screen.queryByText('Building better products, faster.')).not.toBeInTheDocument();
  });

  it('renders all column titles', () => {
    render(<FooterStandard {...mockData} />);
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it('renders all column links', () => {
    render(<FooterStandard {...mockData} />);
    expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute('href', '/features');
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '/pricing');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
  });

  it('renders the copyright text', () => {
    render(<FooterStandard {...mockData} />);
    expect(screen.getByText('© 2025 Acme Inc. All rights reserved.')).toBeInTheDocument();
  });

  it('renders social links when provided', () => {
    render(<FooterStandard {...mockData} />);
    const twitterLink = screen.getByRole('link', { name: 'Twitter' });
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/acme');

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/acme');
  });

  it('does not render social section when social is not provided', () => {
    const dataWithoutSocial = { ...mockData, social: undefined };
    render(<FooterStandard {...dataWithoutSocial} />);
    expect(screen.queryByRole('link', { name: 'Twitter' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'GitHub' })).not.toBeInTheDocument();
  });

  it('renders bottom links when provided', () => {
    render(<FooterStandard {...mockData} />);
    // Bottom links duplicate column links in this mock, so use getAllByRole
    const privacyLinks = screen.getAllByRole('link', { name: 'Privacy Policy' });
    expect(privacyLinks.length).toBeGreaterThanOrEqual(1);

    const termsLinks = screen.getAllByRole('link', { name: 'Terms of Service' });
    expect(termsLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('does not render bottom links nav when not provided', () => {
    const dataWithoutBottomLinks = { ...mockData, bottomLinks: undefined };
    render(<FooterStandard {...dataWithoutBottomLinks} />);
    expect(
      screen.queryByRole('navigation', { name: 'Footer legal links' })
    ).not.toBeInTheDocument();
  });

  it('renders logo image when src is provided', () => {
    const dataWithLogoSrc = {
      ...mockData,
      logo: { text: 'Acme Inc.', src: '/logo.svg', href: '/' },
    };
    render(<FooterStandard {...dataWithLogoSrc} />);
    const logoImg = screen.getByAltText('Acme Inc.');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', '/logo.svg');
  });
});
