import { PageRenderer } from '@/components/page-renderer'
import { waitlistPageConfig } from '@/config/pages/waitlist.config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join the Waitlist | SaaS Template',
  description: 'Be the first to experience our revolutionary SaaS platform. Sign up now and get exclusive early access when we launch.',
  openGraph: {
    title: 'Join the Waitlist | SaaS Template',
    description: 'Be the first to experience our revolutionary SaaS platform. Sign up now and get exclusive early access when we launch.',
    type: 'website',
  },
}

export default function WaitlistPage() {
  return (
    <main>
      <PageRenderer config={waitlistPageConfig} />
    </main>
  )
}
