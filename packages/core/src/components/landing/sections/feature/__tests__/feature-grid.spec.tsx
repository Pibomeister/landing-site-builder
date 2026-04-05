import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeatureGrid } from '../feature-grid';
import type { FeatureGridSection } from '@/registry/schemas/feature.schema';

describe('FeatureGrid', () => {
  const mockData: FeatureGridSection = {
    type: 'feature',
    variant: 'grid',
    heading: {
      eyebrow: 'Why choose us',
      title: 'Features built for scale',
      body: 'Everything you need to build and grow your product.',
      align: 'center',
    },
    features: [
      {
        icon: '⚡',
        title: 'Lightning Fast',
        description: 'Optimized for performance out of the box.',
      },
      {
        icon: '🔒',
        title: 'Secure by Default',
        description: 'Enterprise-grade security baked in.',
      },
      {
        icon: '📈',
        title: 'Built to Scale',
        description: 'Handles millions of users effortlessly.',
      },
    ],
  };

  it('renders the component', () => {
    render(<FeatureGrid {...mockData} />);
    expect(screen.getByText('Lightning Fast')).toBeInTheDocument();
  });

  it('renders all features', () => {
    render(<FeatureGrid {...mockData} />);
    expect(screen.getByText('Lightning Fast')).toBeInTheDocument();
    expect(screen.getByText('Secure by Default')).toBeInTheDocument();
    expect(screen.getByText('Built to Scale')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(<FeatureGrid {...mockData} />);
    expect(screen.getByText('Optimized for performance out of the box.')).toBeInTheDocument();
    expect(screen.getByText('Enterprise-grade security baked in.')).toBeInTheDocument();
    expect(screen.getByText('Handles millions of users effortlessly.')).toBeInTheDocument();
  });

  it('renders feature icons', () => {
    render(<FeatureGrid {...mockData} />);
    expect(screen.getByText('⚡')).toBeInTheDocument();
    expect(screen.getByText('🔒')).toBeInTheDocument();
    expect(screen.getByText('📈')).toBeInTheDocument();
  });

  it('shows heading when provided', () => {
    render(<FeatureGrid {...mockData} />);
    expect(screen.getByText('Features built for scale')).toBeInTheDocument();
    expect(screen.getByText('Why choose us')).toBeInTheDocument();
    expect(
      screen.getByText('Everything you need to build and grow your product.')
    ).toBeInTheDocument();
  });

  it('hides heading when absent', () => {
    const dataWithoutHeading = {
      ...mockData,
      heading: undefined,
    };
    render(<FeatureGrid {...dataWithoutHeading} />);
    expect(screen.queryByText('Features built for scale')).not.toBeInTheDocument();
    expect(screen.queryByText('Why choose us')).not.toBeInTheDocument();
  });
});
