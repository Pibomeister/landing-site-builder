import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CtaSimple } from '../cta-simple';
import type { CtaSimpleSection } from '@/registry/schemas/cta.schema';

describe('CtaSimple', () => {
  const mockData: CtaSimpleSection = {
    type: 'cta',
    variant: 'simple',
    title: 'Start building today',
    body: 'Join thousands of teams already using our platform to ship faster.',
    background: 'brand',
    primary: {
      type: 'link',
      label: 'Get Started',
      href: '/signup',
    },
    secondary: {
      type: 'link',
      label: 'View Docs',
      href: '/docs',
    },
  };

  it('renders title', () => {
    render(<CtaSimple {...mockData} />);
    expect(screen.getByText('Start building today')).toBeInTheDocument();
  });

  it('renders body when provided', () => {
    render(<CtaSimple {...mockData} />);
    expect(
      screen.getByText('Join thousands of teams already using our platform to ship faster.')
    ).toBeInTheDocument();
  });

  it('does not render body when not provided', () => {
    const dataWithoutBody = { ...mockData, body: undefined };
    render(<CtaSimple {...dataWithoutBody} />);
    expect(
      screen.queryByText('Join thousands of teams already using our platform to ship faster.')
    ).not.toBeInTheDocument();
  });

  it('renders primary button', () => {
    render(<CtaSimple {...mockData} />);
    const primaryButton = screen.getByRole('link', { name: 'Get Started' });
    expect(primaryButton).toBeInTheDocument();
    expect(primaryButton).toHaveAttribute('href', '/signup');
  });

  it('renders secondary button when provided', () => {
    render(<CtaSimple {...mockData} />);
    const secondaryButton = screen.getByRole('link', { name: 'View Docs' });
    expect(secondaryButton).toBeInTheDocument();
    expect(secondaryButton).toHaveAttribute('href', '/docs');
  });

  it('does not render secondary button when not provided', () => {
    const dataWithoutSecondary = { ...mockData, secondary: undefined };
    render(<CtaSimple {...dataWithoutSecondary} />);
    expect(screen.queryByRole('link', { name: 'View Docs' })).not.toBeInTheDocument();
  });

  it('applies brand background class', () => {
    const { container } = render(<CtaSimple {...mockData} />);
    const section = container.querySelector('section');
    expect(section?.className).toContain('bg-primary');
    expect(section?.className).toContain('text-primary-foreground');
  });
});
