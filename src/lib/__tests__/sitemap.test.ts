import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  const entries = sitemap();

  it('every URL is on the canonical www host', () => {
    for (const e of entries) {
      expect(e.url.startsWith('https://www.sleekdentalclub.com')).toBe(true);
    }
  });

  it('excludes the removed /aobg route', () => {
    expect(entries.some((e) => e.url.endsWith('/aobg'))).toBe(false);
  });

  it('excludes test and marketing routes', () => {
    expect(entries.some((e) => e.url.includes('/test'))).toBe(false);
    expect(entries.some((e) => e.url.includes('/marketing'))).toBe(false);
  });

  it('includes the homepage and blog index', () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain('https://www.sleekdentalclub.com');
    expect(urls).toContain('https://www.sleekdentalclub.com/blog');
  });

  it('includes the electric toothbrush subscription landing page', () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain('https://www.sleekdentalclub.com/electric-toothbrush-subscription');
  });
});
