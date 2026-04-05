import { z } from 'zod';
import { registerSection } from '../section-registry';
import { FaqAccordion } from '../../components/landing/sections/faq/faq-accordion';
import { faqAccordionSchema } from '../schemas/faq.schema';
import type { FaqAccordionSection } from '../schemas/faq.schema';

/**
 * Register FAQ Accordion section
 */
registerSection<FaqAccordionSection>({
  type: 'faq',
  variant: 'accordion',
  component: FaqAccordion,
  schema: faqAccordionSchema as z.ZodSchema<FaqAccordionSection>,
  metadata: {
    name: 'FAQ Accordion',
    category: 'convert',
    description: 'Expandable accordion list for frequently asked questions',
    preview: '/previews/faq-accordion.png',
    tags: ['faq', 'accordion', 'support', 'questions'],
    renderMode: 'client',
    dependencies: ['@landing-builder/core/primitives'],
    bundleImpact: 'light',
  },
  examples: {
    basic: {
      type: 'faq',
      variant: 'accordion',
      heading: {
        eyebrow: 'FAQ',
        title: 'Frequently Asked Questions',
        body: 'Everything you need to know about our product.',
        align: 'center',
      },
      items: [
        {
          question: 'How does the free trial work?',
          answer:
            'You can try our platform free for 14 days with full access to all features. No credit card required. At the end of your trial, choose a plan that fits your needs or your account will automatically move to the free tier.',
        },
        {
          question: 'Can I change my plan later?',
          answer:
            'Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Changes take effect at the start of your next billing cycle, and we will prorate any payments accordingly.',
        },
        {
          question: 'What payment methods do you accept?',
          answer:
            'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through Stripe.',
        },
        {
          question: 'Is my data secure?',
          answer:
            'Yes. We take security seriously. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 Type II certified and GDPR compliant. You can export or delete your data at any time.',
        },
        {
          question: 'Do you offer discounts for startups or nonprofits?',
          answer:
            'We offer a 50% discount for eligible nonprofits and a startup program for companies less than two years old with under $1M in funding. Contact our sales team to apply.',
        },
      ],
      columns: 1,
    },
    advanced: {
      type: 'faq',
      variant: 'accordion',
      heading: {
        title: 'Got Questions?',
        align: 'center',
      },
      items: [
        {
          question: 'How does the free trial work?',
          answer:
            'You can try our platform free for 14 days with full access to all features. No credit card required.',
        },
        {
          question: 'Can I change my plan later?',
          answer:
            'Absolutely. You can upgrade or downgrade your plan at any time from your account settings.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
        },
        {
          question: 'Is my data secure?',
          answer:
            'Yes. All data is encrypted in transit and at rest. We are SOC 2 Type II certified and GDPR compliant.',
        },
        {
          question: 'Do you offer discounts for startups?',
          answer:
            'We offer a startup program for companies less than two years old with under $1M in funding.',
        },
      ],
      columns: 2,
    },
  },
});
