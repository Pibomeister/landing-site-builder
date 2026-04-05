import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeatureAlternating } from '../feature-alternating';
import type { FeatureAlternatingSection } from '@/registry/schemas/feature-alternating.schema';

describe('FeatureAlternating', () => {
  const mockData: FeatureAlternatingSection = {
    type: 'feature',
    variant: 'alternating',
    rows: [
      {
        eyebrow: 'Design',
        title: 'Build pages visually',
        body: 'Drag and drop to create landing pages without code.',
        media: {
          kind: 'image',
          src: '/row-1.jpg',
          alt: 'Page builder screenshot',
        },
        cta: {
          label: 'Learn more',
          href: '/features/builder',
        },
      },
      {
        eyebrow: 'Analytics',
        title: 'Understand what converts',
        body: 'Real-time insights into visitor behaviour and conversions.',
        media: {
          kind: 'image',
          src: '/row-2.jpg',
          alt: 'Analytics dashboard',
        },
      },
    ],
  };

  it('renders all rows', () => {
    render(<FeatureAlternating {...mockData} />);
    expect(screen.getByText('Build pages visually')).toBeInTheDocument();
    expect(screen.getByText('Understand what converts')).toBeInTheDocument();
  });

  it('renders eyebrow text for each row', () => {
    render(<FeatureAlternating {...mockData} />);
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('renders body text for each row', () => {
    render(<FeatureAlternating {...mockData} />);
    expect(
      screen.getByText('Drag and drop to create landing pages without code.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Real-time insights into visitor behaviour and conversions.')
    ).toBeInTheDocument();
  });

  it('renders images for each row', () => {
    render(<FeatureAlternating {...mockData} />);
    const img1 = screen.getByAltText('Page builder screenshot');
    expect(img1).toBeInTheDocument();
    expect(img1.getAttribute('src')).toContain('row-1.jpg');

    const img2 = screen.getByAltText('Analytics dashboard');
    expect(img2).toBeInTheDocument();
    expect(img2.getAttribute('src')).toContain('row-2.jpg');
  });

  it('alternates layout by applying flex-row-reverse to odd-indexed rows', () => {
    const { container } = render(<FeatureAlternating {...mockData} />);
    const rows = container.querySelectorAll('.md\\:flex-row-reverse');
    // Row at index 1 (odd) should have flex-row-reverse
    expect(rows.length).toBe(1);
  });

  it('renders optional CTA link when provided', () => {
    render(<FeatureAlternating {...mockData} />);
    const ctaLink = screen.getByRole('link', { name: 'Learn more' });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute('href', '/features/builder');
  });

  it('does not render CTA when not provided', () => {
    render(<FeatureAlternating {...mockData} />);
    // Row 2 has no CTA — verify only one link exists
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
  });

  it('renders optional top-level heading when provided', () => {
    const dataWithHeading: FeatureAlternatingSection = {
      ...mockData,
      heading: {
        eyebrow: 'Features',
        title: 'Everything you need',
        body: 'A complete toolkit.',
        align: 'center',
      },
    };
    render(<FeatureAlternating {...dataWithHeading} />);
    expect(screen.getByText('Everything you need')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('A complete toolkit.')).toBeInTheDocument();
  });

  it('does not render top-level heading when not provided', () => {
    render(<FeatureAlternating {...mockData} />);
    // No h2 with section-level heading text should be present
    expect(screen.queryByText('Everything you need')).not.toBeInTheDocument();
  });

  it('renders a separator between rows', () => {
    const { container } = render(<FeatureAlternating {...mockData} />);
    const separators = container.querySelectorAll('.border-t.border-border');
    // There should be one separator (between 2 rows)
    expect(separators.length).toBe(1);
  });
});
