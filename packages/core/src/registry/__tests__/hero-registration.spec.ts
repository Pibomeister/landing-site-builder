import { describe, it, expect } from 'vitest';
import { getSection, getAllSections } from '../section-registry';
import '../sections/hero.registry';

describe('Hero Section Registration', () => {
  it('should have Hero Split section registered', () => {
    const heroSplit = getSection('hero', 'split');
    expect(heroSplit).toBeDefined();
    expect(heroSplit?.type).toBe('hero');
    expect(heroSplit?.variant).toBe('split');
    expect(heroSplit?.metadata.name).toBe('Hero Split');
    expect(heroSplit?.metadata.category).toBe('orient');
  });

  it('should have complete metadata for Hero Split', () => {
    const heroSplit = getSection('hero', 'split');
    expect(heroSplit?.metadata.description).toBe(
      '50/50 split layout with text on left, media on right'
    );
    expect(heroSplit?.metadata.preview).toBe('/previews/hero-split.png');
    expect(heroSplit?.metadata.tags).toContain('hero');
    expect(heroSplit?.metadata.tags).toContain('split');
    expect(heroSplit?.metadata.renderMode).toBe('server');
    expect(heroSplit?.metadata.bundleImpact).toBe('light');
  });

  it('should have basic and advanced examples', () => {
    const heroSplit = getSection('hero', 'split');
    expect(heroSplit?.examples.basic).toBeDefined();
    expect(heroSplit?.examples.advanced).toBeDefined();
    expect(heroSplit?.examples.basic.type).toBe('hero');
    expect(heroSplit?.examples.basic.variant).toBe('split');
  });

  it('should include Hero Split in all sections', () => {
    const allSections = getAllSections();
    const heroSplit = allSections.find((s) => s.type === 'hero' && s.variant === 'split');
    expect(heroSplit).toBeDefined();
  });
});
