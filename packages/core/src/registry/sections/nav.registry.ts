import { z } from 'zod';
import { registerSection } from '../section-registry';
import { NavTop } from '../../components/landing/sections/nav/nav-top';
import { navTopSchema } from '../schemas/nav.schema';
import type { NavTopSection } from '../schemas/nav.schema';

/**
 * Register Nav Top section
 */
registerSection<NavTopSection>({
  type: 'nav',
  variant: 'top',
  component: NavTop,
  schema: navTopSchema as z.ZodSchema<NavTopSection>,
  metadata: {
    name: 'Nav Top',
    category: 'orient',
    description: 'Sticky top navigation bar with logo, links, and CTA',
    preview: '/previews/nav-top.png',
    tags: ['nav', 'header', 'navigation', 'sticky'],
    renderMode: 'client',
    dependencies: ['@landing-builder/core/primitives'],
    bundleImpact: 'light',
  },
  examples: {
    basic: {
      type: 'nav',
      variant: 'top',
      logo: {
        text: 'Acme',
        href: '/',
      },
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Docs', href: '/docs' },
        { label: 'Blog', href: '/blog' },
      ],
      cta: {
        type: 'link',
        label: 'Get Started',
        href: '/signup',
      },
      sticky: true,
      transparent: false,
    },
  },
});
