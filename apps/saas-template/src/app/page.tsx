import { PageRenderer } from '@/components/page-renderer';
import type { PageConfig } from '@/components/page-renderer';

const homePageConfig: PageConfig = {
  sections: [
    {
      type: 'hero',
      variant: 'split',
      props: {
        type: 'hero',
        variant: 'split',
        heading: {
          title: 'Build beautiful landing pages',
          body: 'Create stunning, conversion-optimized landing pages with our JSON-driven page builder. No code required.',
          align: 'left',
        },
        media: {
          kind: 'image',
          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
          alt: 'Dashboard preview',
        },
        actions: {
          primary: {
            type: 'link',
            label: 'Get Started',
            href: '/examples/waitlist',
            target: '_self',
          },
          secondary: {
            type: 'link',
            label: 'View Example',
            href: '/examples/waitlist',
            target: '_self',
          },
        },
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
