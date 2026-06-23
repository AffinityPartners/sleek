import { describe, it, expect } from 'vitest';
import { affiliateFaqs, affiliateBreadcrumb } from '@/lib/affiliate-content';
import { createFaqSchema, createBreadcrumbSchema } from '@/lib/schema';

describe('affiliate content data', () => {
  it('has 4-6 FAQ items, all with question + answer', () => {
    expect(affiliateFaqs.length).toBeGreaterThanOrEqual(4);
    expect(affiliateFaqs.length).toBeLessThanOrEqual(6);
    for (const f of affiliateFaqs) {
      expect(f.question.length).toBeGreaterThan(0);
      expect(f.answer.length).toBeGreaterThan(0);
    }
  });

  it('targets the affiliate-program keyword in the FAQ', () => {
    const joined = affiliateFaqs.map((f) => f.question + ' ' + f.answer).join(' ').toLowerCase();
    expect(joined).toContain('affiliate program');
  });

  it('does not fabricate commission percentages', () => {
    const joined = affiliateFaqs.map((f) => f.answer).join(' ');
    expect(/\d+\s?%/.test(joined)).toBe(false); // no invented "X%" rates
  });

  it('builds a valid FAQPage schema from the FAQ', () => {
    const schema = createFaqSchema(affiliateFaqs) as any;
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(affiliateFaqs.length);
  });

  it('breadcrumb is Home -> Affiliates on the www host', () => {
    const schema = createBreadcrumbSchema(affiliateBreadcrumb) as any;
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(affiliateBreadcrumb[0].url).toBe('https://www.sleekdentalclub.com');
    expect(affiliateBreadcrumb.at(-1)!.url)
      .toBe('https://www.sleekdentalclub.com/market-programs/affiliates');
  });
});
