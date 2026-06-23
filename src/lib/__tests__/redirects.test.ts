import { describe, it, expect } from 'vitest';
import { legacyRedirects } from '@/lib/redirects';

describe('legacyRedirects', () => {
  it('every source is an absolute path or starts with /', () => {
    for (const r of legacyRedirects) {
      expect(r.source.startsWith('/')).toBe(true);
    }
  });

  it('has no duplicate sources', () => {
    const sources = legacyRedirects.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it('never redirects a path to itself (no loops)', () => {
    for (const r of legacyRedirects) {
      expect(r.source).not.toBe(r.destination);
    }
  });

  it('all redirects are permanent', () => {
    for (const r of legacyRedirects) expect(r.permanent).toBe(true);
  });

  it('maps the known high-value WordPress blog URLs to new slugs', () => {
    const map = Object.fromEntries(legacyRedirects.map((r) => [r.source, r.destination]));
    expect(map['/understanding-oral-cancer-early-signs-symptoms-and-prevention'])
      .toBe('/blog/understanding-oral-cancer');
    expect(map['/does-charcoal-toothpaste-really-whiten-teeth-the-truth-behind-the-trend'])
      .toBe('/blog/charcoal-toothpaste-whitening');
  });

  it('external redirects use absolute URLs with basePath:false', () => {
    const checkout = legacyRedirects.find((r) => r.source === '/checkout-ocp');
    expect(checkout?.destination).toBe('https://enrollment.sleekdentalclub.com/onboarding');
    expect(checkout?.basePath).toBe(false);
  });
});
