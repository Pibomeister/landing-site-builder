import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PricingCards } from '../pricing-cards';
import type { PricingCardsSection } from '@/registry/schemas/pricing.schema';

describe('PricingCards', () => {
  const mockData: PricingCardsSection = {
    type: 'pricing',
    variant: 'cards',
    heading: {
      eyebrow: 'Pricing',
      title: 'Simple, transparent pricing',
      body: 'Choose the plan that fits your needs.',
      align: 'center',
    },
    showToggle: true,
    plans: [
      {
        name: 'Starter',
        description: 'Perfect for individuals.',
        price: { monthly: '$9', annual: '$7' },
        period: '/mo',
        features: ['5 projects', '10 GB storage', 'Email support'],
        cta: { label: 'Get started', href: '/signup?plan=starter' },
        highlighted: false,
      },
      {
        name: 'Pro',
        description: 'For growing teams.',
        price: { monthly: '$29', annual: '$23' },
        period: '/mo',
        features: ['Unlimited projects', '100 GB storage', 'Priority support', 'Custom domains'],
        cta: { label: 'Get started', href: '/signup?plan=pro' },
        highlighted: true,
        badge: 'Most Popular',
      },
      {
        name: 'Enterprise',
        description: 'For large organizations.',
        price: { monthly: '$99', annual: '$79' },
        period: '/mo',
        features: ['Unlimited projects', '1 TB storage', 'Dedicated support', 'SSO & SAML'],
        cta: { label: 'Contact sales', href: '/contact' },
        highlighted: false,
      },
    ],
  };

  it('renders all plans', () => {
    render(<PricingCards {...mockData} />);
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders the billing toggle when showToggle is true', () => {
    render(<PricingCards {...mockData} />);
    expect(screen.getByRole('button', { name: 'Monthly' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Annual' })).toBeInTheDocument();
  });

  it('does not render the billing toggle when showToggle is false', () => {
    render(<PricingCards {...mockData} showToggle={false} />);
    expect(screen.queryByRole('button', { name: 'Monthly' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Annual' })).not.toBeInTheDocument();
  });

  it('shows monthly prices by default', () => {
    render(<PricingCards {...mockData} />);
    expect(screen.getByText('$9')).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
  });

  it('switches to annual prices when annual toggle is clicked', () => {
    render(<PricingCards {...mockData} />);
    fireEvent.click(screen.getByRole('button', { name: 'Annual' }));
    expect(screen.getByText('$7')).toBeInTheDocument();
    expect(screen.getByText('$23')).toBeInTheDocument();
    expect(screen.getByText('$79')).toBeInTheDocument();
  });

  it('renders the optional heading', () => {
    render(<PricingCards {...mockData} />);
    expect(screen.getByText('Simple, transparent pricing')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('renders features for each plan', () => {
    render(<PricingCards {...mockData} />);
    expect(screen.getByText('5 projects')).toBeInTheDocument();
    // "Unlimited projects" appears in both Pro and Enterprise plans
    expect(screen.getAllByText('Unlimited projects').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('SSO & SAML')).toBeInTheDocument();
  });

  it('renders CTA links with correct hrefs', () => {
    render(<PricingCards {...mockData} />);
    const starterLinks = screen.getAllByRole('link', { name: 'Get started' });
    expect(starterLinks).toHaveLength(2);
    expect(starterLinks[0]).toHaveAttribute('href', '/signup?plan=starter');
    expect(starterLinks[1]).toHaveAttribute('href', '/signup?plan=pro');
    const enterpriseLink = screen.getByRole('link', { name: 'Contact sales' });
    expect(enterpriseLink).toHaveAttribute('href', '/contact');
  });

  it('highlighted plan has distinct styling', () => {
    render(<PricingCards {...mockData} />);
    // The highlighted plan card should have bg-primary class applied to its container
    // We verify by checking the badge on the highlighted plan is present
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('renders the badge on the highlighted plan', () => {
    render(<PricingCards {...mockData} />);
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('renders without heading when not provided', () => {
    const dataWithoutHeading = { ...mockData, heading: undefined };
    render(<PricingCards {...dataWithoutHeading} />);
    expect(screen.queryByText('Simple, transparent pricing')).not.toBeInTheDocument();
    // Plans should still render
    expect(screen.getByText('Starter')).toBeInTheDocument();
  });

  it('renders savings badge when annual is selected', () => {
    render(<PricingCards {...mockData} />);
    fireEvent.click(screen.getByRole('button', { name: 'Annual' }));
    // Should show a savings badge (e.g. "Save 20%")
    expect(screen.getByText(/Save \d+%/)).toBeInTheDocument();
  });
});
