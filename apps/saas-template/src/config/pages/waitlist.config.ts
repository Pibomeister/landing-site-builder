import type { PageConfig } from '@/components/page-renderer'

export const waitlistPageConfig: PageConfig = {
  sections: [
    {
      type: 'hero',
      variant: 'split',
      props: {
        type: 'hero',
        variant: 'split',
        heading: {
          eyebrow: 'Coming Soon',
          title: 'Join the waitlist for early access',
          body: 'Be the first to experience our revolutionary SaaS platform. Sign up now and get exclusive early access when we launch.',
          align: 'left',
        },
        media: {
          kind: 'image',
          src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
          alt: 'Team collaborating on a project',
        },
        actions: {
          primary: {
            type: 'link',
            label: 'Join Waitlist',
            href: '#waitlist',
            target: '_self',
          },
          secondary: {
            type: 'link',
            label: 'Learn More',
            href: '#features',
            target: '_self',
          },
        },
      },
    },
  ],
}
