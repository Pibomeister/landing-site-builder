import { PageRenderer } from '@/components/page-renderer';
import type { PageConfig } from '@/components/page-renderer';

const homePageConfig: PageConfig = {
  sections: [
    {
      type: 'nav',
      variant: 'top',
      props: {
        type: 'nav',
        variant: 'top',
        logo: { text: 'BuildKit', href: '/' },
        links: [
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Docs', href: '/docs' },
        ],
        cta: { type: 'link', label: 'Get Started', href: '/examples/waitlist' },
        sticky: true,
        transparent: false,
      },
    },
    {
      type: 'hero',
      variant: 'centered',
      props: {
        type: 'hero',
        variant: 'centered',
        badge: 'Now in Beta',
        heading: {
          title: 'Build landing pages at the speed of thought',
          body: 'Schema-driven, composable sections. Ship pixel-perfect pages in hours, not weeks.',
          align: 'center',
        },
        actions: {
          primary: { type: 'link', label: 'Start for free', href: '/examples/waitlist' },
          secondary: { type: 'link', label: 'View demo', href: '#features' },
        },
        socialProof: {
          avatars: [
            'https://i.pravatar.cc/64?img=1',
            'https://i.pravatar.cc/64?img=2',
            'https://i.pravatar.cc/64?img=3',
            'https://i.pravatar.cc/64?img=4',
          ],
          label: 'Trusted by 2,000+ teams',
        },
      },
    },
    {
      type: 'social-proof',
      variant: 'logo-cloud',
      props: {
        type: 'social-proof',
        variant: 'logo-cloud',
        label: 'Trusted by teams at',
        logos: [
          { name: 'Stripe', src: 'https://logo.clearbit.com/stripe.com' },
          { name: 'Vercel', src: 'https://logo.clearbit.com/vercel.com' },
          { name: 'Notion', src: 'https://logo.clearbit.com/notion.so' },
          { name: 'Linear', src: 'https://logo.clearbit.com/linear.app' },
          { name: 'Figma', src: 'https://logo.clearbit.com/figma.com' },
          { name: 'GitHub', src: 'https://logo.clearbit.com/github.com' },
        ],
        marquee: false,
      },
    },
    {
      type: 'feature',
      variant: 'grid',
      props: {
        type: 'feature',
        variant: 'grid',
        columns: 3,
        heading: {
          eyebrow: 'Everything you need',
          title: 'Features that move the needle',
          body: 'A complete toolkit designed to help you build, launch, and grow faster than ever.',
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
            description: 'Handles millions of users without a sweat.',
          },
          { icon: '🎨', title: 'Fully Customizable', description: 'Every pixel is yours to own.' },
          {
            icon: '🔌',
            title: 'Integrates Anywhere',
            description: 'Connect with your existing tools.',
          },
          {
            icon: '💬',
            title: '24/7 Support',
            description: 'Always available to help you succeed.',
          },
        ],
      },
    },
    {
      type: 'testimonial',
      variant: 'grid',
      props: {
        type: 'testimonial',
        variant: 'grid',
        columns: 3,
        heading: {
          eyebrow: 'Customer Stories',
          title: 'Loved by teams everywhere',
          align: 'center',
        },
        testimonials: [
          {
            quote:
              'This platform completely transformed how we build marketing pages. Ship in hours, not weeks.',
            author: { name: 'Sarah Chen', title: 'VP of Marketing', company: 'Streamline Inc' },
            rating: 5,
          },
          {
            quote:
              'The component library is incredible. Our conversion rates improved by 40% after switching.',
            author: { name: 'Marcus Rivera', title: 'Head of Growth', company: 'Launchpad HQ' },
            rating: 5,
          },
          {
            quote:
              'Finally a builder that respects developer workflows. The schema-first approach is a game changer.',
            author: { name: 'Priya Patel', title: 'Senior Engineer', company: 'DevCraft' },
            rating: 5,
          },
        ],
      },
    },
    {
      type: 'pricing',
      variant: 'cards',
      props: {
        type: 'pricing',
        variant: 'cards',
        showToggle: true,
        heading: {
          eyebrow: 'Pricing',
          title: 'Simple, transparent pricing',
          body: 'Choose the plan that fits your needs. Upgrade or downgrade at any time.',
          align: 'center',
        },
        plans: [
          {
            name: 'Starter',
            description: 'Perfect for individuals and small projects.',
            price: { monthly: '$9', annual: '$7' },
            period: '/mo',
            features: ['5 projects', '10 GB storage', 'Basic analytics', 'Email support'],
            cta: { label: 'Get started', href: '/signup?plan=starter' },
            highlighted: false,
          },
          {
            name: 'Pro',
            description: 'For growing teams that need more power.',
            price: { monthly: '$29', annual: '$23' },
            period: '/mo',
            features: [
              'Unlimited projects',
              '100 GB storage',
              'Advanced analytics',
              'Priority support',
              'Custom domains',
            ],
            cta: { label: 'Get started', href: '/signup?plan=pro' },
            highlighted: true,
            badge: 'Most Popular',
          },
          {
            name: 'Enterprise',
            description: 'For large organizations with advanced needs.',
            price: { monthly: '$99', annual: '$79' },
            period: '/mo',
            features: [
              'Unlimited projects',
              '1 TB storage',
              'Advanced analytics',
              'Dedicated support',
              'SSO & SAML',
              'SLA guarantee',
            ],
            cta: { label: 'Contact sales', href: '/contact' },
            highlighted: false,
          },
        ],
      },
    },
    {
      type: 'faq',
      variant: 'accordion',
      props: {
        type: 'faq',
        variant: 'accordion',
        columns: 1,
        heading: {
          eyebrow: 'FAQ',
          title: 'Frequently Asked Questions',
          body: 'Everything you need to know.',
          align: 'center',
        },
        items: [
          {
            question: 'How does the free trial work?',
            answer: 'Try free for 14 days with full access. No credit card required.',
          },
          {
            question: 'Can I change my plan later?',
            answer: 'Yes, upgrade or downgrade at any time from your account settings.',
          },
          {
            question: 'What payment methods do you accept?',
            answer: 'All major credit cards, PayPal, and bank transfers for annual plans.',
          },
          {
            question: 'Is my data secure?',
            answer: 'Yes. TLS 1.3 in transit, AES-256 at rest. SOC 2 Type II certified.',
          },
        ],
      },
    },
    {
      type: 'cta',
      variant: 'simple',
      props: {
        type: 'cta',
        variant: 'simple',
        title: 'Start building today',
        body: 'Join thousands of teams already using BuildKit to ship faster.',
        background: 'brand',
        primary: { type: 'link', label: 'Get Started Free', href: '/examples/waitlist' },
        secondary: { type: 'link', label: 'View Docs', href: '/docs', target: '_blank' },
      },
    },
    {
      type: 'footer',
      variant: 'standard',
      props: {
        type: 'footer',
        variant: 'standard',
        logo: { text: 'BuildKit', href: '/' },
        tagline: 'The fastest way to ship beautiful landing pages.',
        columns: [
          {
            title: 'Product',
            links: [
              { label: 'Features', href: '/features' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Changelog', href: '/changelog' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'About', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Careers', href: '/careers' },
            ],
          },
        ],
        social: [
          { platform: 'twitter', href: 'https://twitter.com/buildkit' },
          { platform: 'github', href: 'https://github.com/buildkit' },
        ],
        copyright: '© 2025 BuildKit, Inc. All rights reserved.',
        bottomLinks: [
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' },
        ],
      },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <PageRenderer config={homePageConfig} />
    </main>
  );
}
