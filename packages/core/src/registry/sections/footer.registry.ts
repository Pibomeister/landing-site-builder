import { z } from 'zod';
import { registerSection } from '../section-registry';
import { FooterStandard } from '../../components/landing/sections/footer/footer-standard';
import { footerStandardSchema } from '../schemas/footer.schema';
import type { FooterStandardSection } from '../schemas/footer.schema';

/**
 * Register Footer Standard section
 */
registerSection<FooterStandardSection>({
  type: 'footer',
  variant: 'standard',
  component: FooterStandard,
  schema: footerStandardSchema as z.ZodSchema<FooterStandardSection>,
  metadata: {
    name: 'Footer Standard',
    category: 'convert',
    description:
      'Kibo UI / Linear-style footer with logo, tagline, link columns, social icons, and bottom bar',
    preview: '/previews/footer-standard.png',
    tags: ['footer', 'links', 'social', 'copyright'],
    renderMode: 'server',
    dependencies: ['@landing-builder/core/primitives'],
    bundleImpact: 'light',
  },
  examples: {
    basic: {
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
            { label: 'Changelog', href: '/changelog' },
            { label: 'Roadmap', href: '/roadmap' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', href: '/about' },
            { label: 'Blog', href: '/blog' },
            { label: 'Careers', href: '/careers' },
            { label: 'Contact', href: '/contact' },
          ],
        },
        {
          title: 'Legal',
          links: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Cookie Policy', href: '/cookies' },
          ],
        },
      ],
      social: [
        { platform: 'twitter', href: 'https://twitter.com/acme' },
        { platform: 'github', href: 'https://github.com/acme' },
        { platform: 'linkedin', href: 'https://linkedin.com/company/acme' },
      ],
      copyright: '© 2025 Acme Inc. All rights reserved.',
      bottomLinks: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
    advanced: {
      type: 'footer',
      variant: 'standard',
      container: 'xl',
      logo: {
        text: 'BuildKit',
        src: '/logo.svg',
        href: '/',
      },
      tagline: 'The fastest way to ship beautiful landing pages.',
      columns: [
        {
          title: 'Product',
          links: [
            { label: 'Features', href: '/features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Docs', href: '/docs' },
            { label: 'Changelog', href: '/changelog' },
            { label: 'Roadmap', href: '/roadmap' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', href: '/about' },
            { label: 'Blog', href: '/blog' },
            { label: 'Careers', href: '/careers' },
            { label: 'Press', href: '/press' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { label: 'Templates', href: '/templates' },
            { label: 'Integrations', href: '/integrations' },
            { label: 'Status', href: 'https://status.buildkit.io' },
            { label: 'Support', href: '/support' },
          ],
        },
        {
          title: 'Legal',
          links: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Cookie Policy', href: '/cookies' },
            { label: 'DPA', href: '/dpa' },
          ],
        },
      ],
      social: [
        { platform: 'twitter', href: 'https://twitter.com/buildkit' },
        { platform: 'github', href: 'https://github.com/buildkit' },
        { platform: 'linkedin', href: 'https://linkedin.com/company/buildkit' },
        { platform: 'discord', href: 'https://discord.gg/buildkit' },
        { platform: 'youtube', href: 'https://youtube.com/@buildkit' },
      ],
      copyright: '© 2025 BuildKit, Inc. All rights reserved.',
      bottomLinks: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookies', href: '/cookies' },
      ],
    },
  },
});
