import type { FaqItem, BreadcrumbItem } from '@/lib/schema';

/** How-it-works steps for the affiliate program (facts from the affiliates page config). */
export const affiliateSteps: { n: string; title: string; body: string }[] = [
  { n: '1', title: 'Apply in minutes', body: 'Join the SLEEK Dental affiliate program for free — no fees and no minimums to get started.' },
  { n: '2', title: 'Share your link', body: 'Promote SLEEK Dental memberships and the sonic electric toothbrush subscription using the marketing materials we provide.' },
  { n: '3', title: 'Earn recurring commission', body: 'Get paid a recurring commission every time someone joins through your unique tracking link.' },
];

/** FAQ for the affiliate program. Answers use only facts already on the page — no invented figures. */
export const affiliateFaqs: FaqItem[] = [
  {
    question: 'What is the SLEEK Dental affiliate program?',
    answer:
      'It is a free partner program that pays recurring commissions for referring new members to SLEEK Dental Club, which pairs a premium sonic electric toothbrush subscription with real dental coverage.',
  },
  {
    question: 'How do affiliates earn commissions?',
    answer:
      'You get a unique tracking link. When someone signs up for a SLEEK membership through your link, you earn a recurring commission, paid monthly.',
  },
  {
    question: 'Who can join the dental affiliate program?',
    answer:
      'Content creators, dentists and hygienists, health and wellness influencers, deal and coupon sites, and marketing agencies — anyone who can reach people interested in better oral care. Approval is quick.',
  },
  {
    question: 'Is it free to join?',
    answer:
      'Yes. Joining the SLEEK Dental affiliate program is completely free, with low minimums to start earning.',
  },
  {
    question: 'What can I promote?',
    answer:
      'SLEEK Dental memberships and the sonic electric toothbrush subscription, plus seasonal offers — all with professional marketing materials we provide.',
  },
  {
    question: 'How and when do I get paid?',
    answer:
      'Commissions are paid monthly with low minimum thresholds, and you can track everything you earn in real time from your affiliate dashboard.',
  },
];

export const affiliateBreadcrumb: BreadcrumbItem[] = [
  { name: 'Home', url: 'https://www.sleekdentalclub.com' },
  { name: 'Affiliate Program', url: 'https://www.sleekdentalclub.com/market-programs/affiliates' },
];
