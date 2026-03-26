import { registerSection } from '../section-registry';
import { SocialProofStats } from '../../components/landing/sections/social-proof/social-proof-stats';
import { socialProofStatsSchema } from '../schemas/social-proof.schema';
import type { SocialProofStats as SocialProofStatsType } from '../schemas/social-proof.schema';

/**
 * Register Social Proof Stats section
 */
registerSection<SocialProofStatsType>({
  type: 'social-proof',
  variant: 'stats',
  component: SocialProofStats,
  schema: socialProofStatsSchema,
  metadata: {
    name: 'Social Proof Stats',
    category: 'convince',
    description: 'Display statistics to build trust (waitlist count, users, metrics)',
    preview: '/previews/social-proof-stats.png',
    tags: ['social-proof', 'stats', 'metrics', 'trust', 'waitlist'],
    renderMode: 'server',
    dependencies: ['@landing-builder/core/primitives'],
    bundleImpact: 'light',
  },
  examples: {
    waitlist: {
      stats: [
        { value: '2,500+', label: 'On Waitlist' },
        { value: '45', label: 'Days to Launch' },
        { value: '100+', label: 'Beta Testers' },
      ],
    },
    metrics: {
      stats: [
        { value: '10,000+', label: 'Active Users' },
        { value: '99.9%', label: 'Uptime' },
        { value: '24/7', label: 'Support' },
        { value: '50+', label: 'Countries' },
      ],
    },
  },
});
