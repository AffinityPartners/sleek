import { describe, it, expect } from 'vitest';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';

const SLUG = 'does-dental-insurance-cover-electric-toothbrush';

describe('insurance-question blog post', () => {
  it('exists in the slug list and is retrievable', () => {
    expect(getAllSlugs()).toContain(SLUG);
    expect(getPostBySlug(SLUG)).toBeDefined();
  });

  it('answers the query in its title', () => {
    const post = getPostBySlug(SLUG)!;
    expect(post.title.toLowerCase()).toContain('electric toothbrush');
    expect(post.title.toLowerCase()).toContain('insurance');
  });

  it('links to the toothbrush-subscription page and the plans', () => {
    const post = getPostBySlug(SLUG)!;
    expect(post.content).toContain('href="/electric-toothbrush-subscription"');
    expect(post.content).toContain('href="/#plans"');
  });

  it('does not fabricate FSA/HSA or coverage percentages', () => {
    const post = getPostBySlug(SLUG)!;
    expect(/\d+\s?%/.test(post.content)).toBe(false);
  });
});
