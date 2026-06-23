import { describe, it, expect } from 'vitest';
import {
  subscriptionFaqs,
  subscriptionBreadcrumb,
  subscriptionHeroTitle,
} from '@/lib/toothbrush-subscription-content';
import { createFaqSchema, createBreadcrumbSchema } from '@/lib/schema';

describe('toothbrush subscription content data', () => {
  it('has 4-6 FAQ items, all with question + answer', () => {
    expect(subscriptionFaqs.length).toBeGreaterThanOrEqual(4);
    expect(subscriptionFaqs.length).toBeLessThanOrEqual(6);
    for (const f of subscriptionFaqs) {
      expect(f.question.length).toBeGreaterThan(0);
      expect(f.answer.length).toBeGreaterThan(0);
    }
  });

  it('H1 hero title targets "electric toothbrush subscription"', () => {
    expect(subscriptionHeroTitle.toLowerCase()).toContain('electric toothbrush subscription');
  });

  it('targets the toothbrush-subscription keyword in the FAQ', () => {
    const joined = subscriptionFaqs.map((f) => f.question + ' ' + f.answer).join(' ').toLowerCase();
    expect(joined).toContain('toothbrush subscription');
  });

  it('does not fabricate co-insurance / discount percentages', () => {
    const joined = subscriptionFaqs.map((f) => f.answer).join(' ');
    expect(/\d+\s?%/.test(joined)).toBe(false);
  });

  it('builds a valid FAQPage schema from the FAQ', () => {
    const schema = createFaqSchema(subscriptionFaqs) as any;
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(subscriptionFaqs.length);
  });

  it('breadcrumb is Home -> Electric Toothbrush Subscription on the www host', () => {
    const schema = createBreadcrumbSchema(subscriptionBreadcrumb) as any;
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(subscriptionBreadcrumb[0].url).toBe('https://www.sleekdentalclub.com');
    expect(subscriptionBreadcrumb.at(-1)!.url).toBe(
      'https://www.sleekdentalclub.com/electric-toothbrush-subscription'
    );
  });
});
