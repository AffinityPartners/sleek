import type { FaqItem, BreadcrumbItem } from '@/lib/schema';

/**
 * Content for the /electric-toothbrush-subscription landing page.
 * Every figure is verified against the CLUB plan in PricingSection.tsx — no invented terms.
 */

export const subscriptionHeroTitle = 'Electric Toothbrush Subscription';

export const subscriptionHeroSubtitle =
  'Join the SLEEK CLUB membership and get a premium sonic electric toothbrush with fresh brush-head and floss refills delivered to your door every quarter — from $16.95/month, with free shipping in the contiguous US. No long-term commitment: cancel anytime.';

export const subscriptionHeroBenefits: string[] = [
  'Sonic electric toothbrush with 5 cleaning modes included',
  'Fresh brush heads + 50 floss picks delivered every quarter',
  'Free shipping in the contiguous US',
  'Cancel anytime — no long-term commitment',
];

/** How-the-subscription-works steps. Facts from the CLUB plan in PricingSection.tsx. */
export const subscriptionSteps: { n: string; title: string; body: string }[] = [
  {
    n: '1',
    title: 'Join the CLUB',
    body: 'Start your electric toothbrush subscription with the SLEEK CLUB plan for $16.95/month plus a one-time $39.95 welcome kit.',
  },
  {
    n: '2',
    title: 'Get your welcome kit',
    body: 'Your sonic electric toothbrush arrives with 5 cleaning modes, a 2-minute timed oscillating brush head, a USB rechargeable charger, and a holder & travel case.',
  },
  {
    n: '3',
    title: 'Refills auto-ship every quarter',
    body: 'A fresh brush head and 50 floss picks ship to your door every three months — the dentist-recommended replacement schedule — with free shipping in the contiguous US.',
  },
];

/** FAQ for the toothbrush subscription. Answers use only verified CLUB facts — no invented figures. */
export const subscriptionFaqs: FaqItem[] = [
  {
    question: 'How does the SLEEK electric toothbrush subscription work?',
    answer:
      'You join the SLEEK CLUB plan for $16.95 per month plus a one-time $39.95 welcome kit. You receive a sonic electric toothbrush up front, then a fresh brush head and 50 floss picks are automatically shipped to you every quarter.',
  },
  {
    question: "What's included in the toothbrush subscription?",
    answer:
      'A sonic electric toothbrush with 5 cleaning modes, a 2-minute timed oscillating brush head, a USB rechargeable charger, and a holder & travel case — plus a quarterly brush head refill and 50 floss picks every three months.',
  },
  {
    question: 'How often do refills ship?',
    answer:
      'Brush head refills and floss picks ship automatically every quarter — every three months — which matches the American Dental Association recommendation to replace your brush head about every three months.',
  },
  {
    question: 'How much does the electric toothbrush subscription cost?',
    answer:
      'The SLEEK CLUB toothbrush subscription is $16.95 per month plus a one-time $39.95 welcome kit. Plans that add dental savings or insurance — OCP, PRO, and MAX — are available at higher monthly prices.',
  },
  {
    question: 'Is shipping free, and can I cancel anytime?',
    answer:
      'Yes. Shipping is free in the contiguous US, and you can cancel anytime — there is no long-term commitment.',
  },
  {
    question: 'Is it just a toothbrush, or does it include dental coverage too?',
    answer:
      'The CLUB plan is the toothbrush subscription on its own. If you also want dental savings or insurance, SLEEK OCP, PRO, and MAX add those benefits on top of the same sonic toothbrush and quarterly refills.',
  },
];

export const subscriptionBreadcrumb: BreadcrumbItem[] = [
  { name: 'Home', url: 'https://www.sleekdentalclub.com' },
  {
    name: 'Electric Toothbrush Subscription',
    url: 'https://www.sleekdentalclub.com/electric-toothbrush-subscription',
  },
];
