# SEO Foundation (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop the WordPress-migration 404 bleed, lock a single canonical host, and complete the site's rich-result markup — without fabricating any review data.

**Architecture:** Add a version-controlled 301 redirect map consumed by Next's `redirects()`; enrich the existing `Offer` JSON-LD with real shipping/return data; tighten `sitemap.ts`/`robots.ts`; validate everything. Logic-bearing units (redirect map, schema builder, sitemap) get vitest unit tests; redirect behavior and rich results get integration/manual verification.

**Tech Stack:** Next.js 16, React 19, TypeScript 6, pnpm 11, Node 24, vitest (added in Task 1).

## Global Constraints

- **Canonical host is `https://www.sleekdentalclub.com`** (www). Every URL the site emits uses www.
- **No fabricated reviews/ratings.** Do NOT add `aggregateRating` or `review` markup in this phase (deferred to Phase 3 — no real reviews exist).
- **Real merchant values only:** shipping = **free**, country **US**; returns = **30-day**, returnable. (Source: on-site "Free Shipping" + "30-Day Guarantee".)
- **Redirects are permanent (301/308):** `permanent: true`.
- **Don't break existing routes:** no redirect may target a live route that itself redirects, and the catch-all must match only legacy patterns — never live `/blog/*`, `/market-programs/*`, `/privacy`, `/terms`, `/`.
- Package manager is **pnpm**; commit after every task.

---

### Task 1: Test infrastructure (vitest)

The repo has no test runner. Add vitest with the `@/` path alias so later tasks can TDD pure logic.

**Files:**
- Modify: `package.json` (add `vitest` devDep + `test` script)
- Create: `vitest.config.ts`
- Create: `src/lib/__tests__/smoke.test.ts`

- [ ] **Step 1: Add vitest + test script**

Run:
```bash
cd /Volumes/ssd/Websites/sleek
CI=true pnpm add -D vitest@^4.1.8
```
Then add this script to `package.json` `"scripts"` (after `"lint"`):
```json
    "test": "vitest run",
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 3: Write a smoke test**

`src/lib/__tests__/smoke.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('test runner', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 4: Run the test, verify it passes**

Run: `CI=true pnpm test`
Expected: 1 passed (`smoke.test.ts`).

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts src/lib/__tests__/smoke.test.ts
git commit -m "test: add vitest runner with @/ alias"
```

---

### Task 2: Legacy redirect map (data + tests)

**Files:**
- Create: `src/lib/redirects.ts`
- Test: `src/lib/__tests__/redirects.test.ts`

**Interfaces:**
- Produces: `export type LegacyRedirect = { source: string; destination: string; permanent: boolean; basePath?: false }` and `export const legacyRedirects: LegacyRedirect[]` — consumed by `next.config.ts` in Task 3.

- [ ] **Step 1: Write the failing test**

`src/lib/__tests__/redirects.test.ts`:
```ts
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
    expect(map['/understanding-oral-cancer-early-signs-symptoms-and-prevention/'])
      .toBe('/blog/understanding-oral-cancer');
    expect(map['/does-charcoal-toothpaste-really-whiten-teeth-the-truth-behind-the-trend/'])
      .toBe('/blog/charcoal-toothpaste-whitening');
  });

  it('external redirects use absolute URLs with basePath:false', () => {
    const checkout = legacyRedirects.find((r) => r.source === '/checkout-ocp/');
    expect(checkout?.destination).toBe('https://enrollment.sleekdentalclub.com/onboarding');
    expect(checkout?.basePath).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true pnpm test src/lib/__tests__/redirects.test.ts`
Expected: FAIL — cannot resolve `@/lib/redirects`.

- [ ] **Step 3: Write `src/lib/redirects.ts`**

```ts
/**
 * 301 redirect map: legacy WordPress URLs -> current Next.js routes.
 * Consumed by next.config.ts `redirects()`. Reclaims ranking equity from the
 * WP -> Next migration (GSC 2026-06-22: 33 "Not found" + 7 bad redirects).
 *
 * Ordering: explicit entries first, then pattern/catch-all rules. The catch-all
 * matches ONLY legacy shapes (long top-level slugs, /wp-content/*) so it can
 * never shadow a live route.
 */
export type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
  basePath?: false;
};

export const legacyRedirects: LegacyRedirect[] = [
  // --- Blog posts (old WP slug -> new /blog/* slug) ---
  { source: '/does-charcoal-toothpaste-really-whiten-teeth-the-truth-behind-the-trend/', destination: '/blog/charcoal-toothpaste-whitening', permanent: true },
  { source: '/understanding-oral-cancer-early-signs-symptoms-and-prevention/', destination: '/blog/understanding-oral-cancer', permanent: true },
  { source: '/understanding-tooth-decay-causes-prevention-and-treatment/', destination: '/blog/understanding-tooth-decay', permanent: true },
  { source: '/bleeding-gums-know-the-causes-symptoms-and-treatment/', destination: '/blog/bleeding-gums', permanent: true },
  { source: '/introducing-sleek-dental-club/', destination: '/blog/introducing-sleek-dental-club', permanent: true },
  { source: '/unlocking-the-benefits-of-sleek-dentals-pro-membership/', destination: '/blog/sleek-dental-pro-membership', permanent: true },

  // --- Pages ---
  { source: '/pricing/', destination: '/#plans', permanent: true },
  { source: '/contact-us/', destination: '/', permanent: true },
  { source: '/privacy-policy/', destination: '/privacy', permanent: true },
  { source: '/blog/', destination: '/blog', permanent: true },
  { source: '/checkout-ocp/', destination: 'https://enrollment.sleekdentalclub.com/onboarding', permanent: true, basePath: false },

  // --- Legacy WordPress asset PDFs ---
  { source: '/wp-content/uploads/2023/01/Sleek-OCP-TC.pdf', destination: '/images/Sleek-TC-Website.pdf', permanent: true, basePath: false },
];
```

> NOTE for implementer: the 5 remaining blog posts (`dental-emergencies-children`, `nutrition-oral-health`, `understanding-cavities`, `understanding-gingivitis`, `sleek-ocp-overview`) and any other legacy URLs should be appended here once the full GSC "Not found (404)" export is dropped in `notes/GSC/`. Infer the old slug from the post title (e.g. "Understanding Cavities" → `/understanding-cavities/`). Add them as explicit entries following the same pattern; the tests above will keep guarding invariants.

- [ ] **Step 4: Run tests, verify pass**

Run: `CI=true pnpm test src/lib/__tests__/redirects.test.ts`
Expected: PASS (all 6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/redirects.ts src/lib/__tests__/redirects.test.ts
git commit -m "feat(seo): add legacy WordPress -> Next 301 redirect map"
```

---

### Task 3: Wire redirects into Next config + verify behavior

`next.config.js` is CommonJS and cannot import the TS map. Convert it to `next.config.ts` (Next 16 supports it) and add `redirects()`.

**Files:**
- Delete: `next.config.js`
- Create: `next.config.ts` (port all existing config + add `redirects()`)

**Interfaces:**
- Consumes: `legacyRedirects` from `@/lib/redirects` (Task 2).

- [ ] **Step 1: Create `next.config.ts`** (ports every option from the current `next.config.js`, adds `redirects()` and a catch-all)

```ts
import type { NextConfig } from 'next';
import { legacyRedirects } from './src/lib/redirects';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com', pathname: '**' }],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  async redirects() {
    return [
      ...legacyRedirects,
      // Catch-all for legacy WordPress assets we didn't map explicitly.
      { source: '/wp-content/:path*', destination: '/', permanent: true, basePath: false },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/blog/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: Delete the old config**

```bash
git rm next.config.js
```

- [ ] **Step 3: Build to confirm the TS config + redirects compile**

Run: `CI=true pnpm build`
Expected: BUILD succeeds; output lists no config errors.

- [ ] **Step 4: Integration-verify the redirects against the built server**

Start the server, then curl a sample of sources and assert 301/308 → destination:
```bash
./node_modules/.bin/next start -p 3009 > /tmp/seo_srv.log 2>&1 &
SRV=$!
curl --retry 40 --retry-delay 1 --retry-connrefused -sf http://localhost:3009/ -o /dev/null
for pair in \
  "/understanding-oral-cancer-early-signs-symptoms-and-prevention/|/blog/understanding-oral-cancer" \
  "/does-charcoal-toothpaste-really-whiten-teeth-the-truth-behind-the-trend/|/blog/charcoal-toothpaste-whitening" \
  "/pricing/|/#plans" \
  "/privacy-policy/|/privacy" ; do
  src="${pair%%|*}"; want="${pair##*|}"
  got=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "http://localhost:3009${src}")
  echo "$src -> $got (want 308/301 ...${want})"
done
kill $SRV 2>/dev/null
```
Expected: each prints a `308`/`301` status and a `redirect_url` ending in the wanted path.

- [ ] **Step 5: Commit**

```bash
git add next.config.ts
git rm next.config.js
git commit -m "feat(seo): serve legacy 301 redirects via next.config.ts"
```

---

### Task 4: Complete Offer markup (shipping + returns)

Add `shippingDetails` (free) and `hasMerchantReturnPolicy` (30-day) to the `Offer` in `createProductSchema` so GSC merchant listings are complete. Stars stay OUT (Phase 3).

**Files:**
- Modify: `src/lib/schema.ts` (the `offers` object inside `createProductSchema`, ~lines 299–312)
- Test: `src/lib/__tests__/schema.test.ts`

**Interfaces:**
- Consumes: existing `createProductSchema(product: ProductInfo)` and `createAllProductSchemas()` from `@/lib/schema`.

- [ ] **Step 1: Write the failing test**

`src/lib/__tests__/schema.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { createAllProductSchemas } from '@/lib/schema';

describe('product Offer rich data', () => {
  const offers = createAllProductSchemas().map((p: any) => p.offers);

  it('every offer declares free US shipping', () => {
    for (const o of offers) {
      expect(o.shippingDetails['@type']).toBe('OfferShippingDetails');
      expect(o.shippingDetails.shippingRate.value).toBe('0');
      expect(o.shippingDetails.shippingDestination.addressCountry).toBe('US');
    }
  });

  it('every offer declares a 30-day return policy', () => {
    for (const o of offers) {
      expect(o.hasMerchantReturnPolicy['@type']).toBe('MerchantReturnPolicy');
      expect(o.hasMerchantReturnPolicy.merchantReturnDays).toBe(30);
      expect(o.hasMerchantReturnPolicy.returnPolicyCategory)
        .toBe('https://schema.org/MerchantReturnFiniteReturnWindow');
    }
  });

  it('does NOT add aggregateRating or review (deferred to Phase 3)', () => {
    for (const p of createAllProductSchemas() as any[]) {
      expect(p.aggregateRating).toBeUndefined();
      expect(p.review).toBeUndefined();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true pnpm test src/lib/__tests__/schema.test.ts`
Expected: FAIL — `o.shippingDetails` is undefined.

- [ ] **Step 3: Add the two fields to the Offer**

In `src/lib/schema.ts`, inside `createProductSchema`, replace the `offers: { ... }` object so it ends with these two new keys after `seller`:
```ts
    offers: {
      '@type': 'Offer',
      url: product.url || SITE_CONFIG.url,
      priceCurrency: product.priceCurrency || 'USD',
      price: product.price,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString().split('T')[0],
      availability: `https://schema.org/${product.availability || 'InStock'}`,
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: product.priceCurrency || 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
```

- [ ] **Step 4: Run tests + typecheck, verify pass**

Run: `CI=true pnpm test src/lib/__tests__/schema.test.ts && pnpm exec tsc --noEmit`
Expected: schema tests PASS; tsc 0 errors.

- [ ] **Step 5: Remove the unfulfillable WebSite `SearchAction`**

`createWebsiteSchema` in `src/lib/schema.ts` (~line 191–210) emits a `potentialAction` → `SearchAction` pointing at a `?q=` search URL. There is **no real URL-addressable search endpoint** — the only on-site search (`SitemapSearch` on `/sitemap`) is a client-side filter, not a route that reads a query param. An unfulfillable `SearchAction` is ignored by Google and clutters the markup, so remove the `potentialAction` block from `createWebsiteSchema` (leave the rest of the `WebSite` schema — `name`, `url`, `publisher` — intact). If a real `/search?q=` route is built later, restore it.

Run: `CI=true pnpm build`
Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/lib/schema.ts src/lib/__tests__/schema.test.ts
git commit -m "feat(seo): complete Offer markup (shipping + returns); drop dead SearchAction"
```

---

### Task 5: Sitemap / robots hygiene

Remove the `/aobg` homepage-duplicate from the sitemap (it's a "copy of homepage" → duplicate content), and lock the sitemap to canonical www URLs only.

**Files:**
- Modify: `src/app/sitemap.ts` (`STATIC_PAGES`, remove the `/aobg` entry)
- Test: `src/lib/__tests__/sitemap.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/__tests__/sitemap.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  const entries = sitemap();

  it('every URL is on the canonical www host', () => {
    for (const e of entries) {
      expect(e.url.startsWith('https://www.sleekdentalclub.com')).toBe(true);
    }
  });

  it('excludes the /aobg homepage duplicate', () => {
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
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true pnpm test src/lib/__tests__/sitemap.test.ts`
Expected: FAIL — `/aobg` is still present.

- [ ] **Step 3: Remove the `/aobg` entry from `STATIC_PAGES`**

In `src/app/sitemap.ts`, delete this line from the `STATIC_PAGES` array:
```ts
  { path: '/aobg', changeFrequency: 'weekly', priority: 0.7 },
```

- [ ] **Step 4: Run tests, verify pass**

Run: `CI=true pnpm test src/lib/__tests__/sitemap.test.ts`
Expected: PASS (all 4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts src/lib/__tests__/sitemap.test.ts
git commit -m "fix(seo): drop /aobg homepage duplicate from sitemap"
```

> NOTE: `/aobg` is a homepage copy. To fully prevent duplicate indexing, confirm its purpose with the owner; if it's a throwaway campaign mirror, follow up with a `noindex` or a canonical → `/` on that route (out of scope for this task — flag in the PR).

> NOTE (robots + remaining Unit 2 items): `src/app/robots.ts` is already correct — it allows `/`, disallows `/test/`, `/api/`, `/marketing/example`, and references the www sitemap + host. **No change needed; verify it still reads that way and leave it.** The GSC "2× Blocked (403)" and "1× Blocked by robots.txt" pages, and the internal-linking pass toward "crawled/discovered – not indexed" pages, require the actual URL list from the full GSC export and are deferred (403 triage → confirm with this task's PR; internal linking → Phase 2, per the spec).

---

### Task 6: Metadata polish for the highest-impression pages

Improve titles/descriptions where impressions are highest but CTR is poor (homepage 3.4% CTR @ pos 11; affiliates 0.66% CTR @ pos 16). Keep them unique, ≤60-char titles / ≤155-char descriptions, value-prop first.

**Files:**
- Read for context only: `src/app/layout.tsx` (root `metadata` title template — leave unchanged unless the homepage `description` is missing/empty)
- Modify: `src/app/market-programs/affiliates/page.tsx` (`metadata` export)

- [ ] **Step 1: Read the current metadata**

Run:
```bash
grep -nE "title|description" src/app/layout.tsx src/app/market-programs/affiliates/page.tsx | head -30
```
Record the existing strings so the change is a deliberate edit, not a blind overwrite.

- [ ] **Step 2: Tune the affiliates page metadata**

In `src/app/market-programs/affiliates/page.tsx`, set the `metadata` `title` and `description` to target *"dental affiliate program(s)"* (753+208 impressions, pos 23):
```ts
  title: 'Dental Affiliate Program | Earn With SLEEK Dental Club',
  description:
    'Join the SLEEK Dental affiliate program — promote dental memberships & sonic toothbrush subscriptions and earn recurring commissions. Free to join.',
```
(Preserve any existing `openGraph`/`canonical`/other keys; only change `title` + `description`.)

- [ ] **Step 3: Verify build + metadata render**

Run: `CI=true pnpm build`
Expected: build succeeds. Then confirm the rendered tag:
```bash
./node_modules/.bin/next start -p 3009 > /tmp/seo_srv.log 2>&1 &
SRV=$!
curl --retry 40 --retry-delay 1 --retry-connrefused -sf http://localhost:3009/ -o /dev/null
curl -s http://localhost:3009/market-programs/affiliates | grep -oE "<title>[^<]*</title>"
kill $SRV 2>/dev/null
```
Expected: prints the new affiliates `<title>`.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/market-programs/affiliates/page.tsx
git commit -m "feat(seo): CTR-tune titles/descriptions for top-impression pages"
```

---

### Task 7: Full validation & sign-off

**Files:** none (verification + final commit of any fixes)

- [ ] **Step 1: Green the whole toolchain**

Run:
```bash
CI=true pnpm test && pnpm exec tsc --noEmit && CI=true pnpm lint && CI=true pnpm build
```
Expected: tests pass, tsc 0 errors, lint 0 errors, build succeeds.

- [ ] **Step 2: Redirect sweep (no loops, correct targets)**

Start `next start -p 3009` (as in Task 3 Step 4) and curl **every** `source` in `src/lib/redirects.ts`, asserting a single 301/308 hop (no chains) to the expected destination. Record any miss.

- [ ] **Step 3: Rich Results validation (manual)**

After deploy (or via a tunnel), run Google's Rich Results Test (https://search.google.com/test/rich-results) on: the homepage, one membership-plan/product context, and one blog post. Confirm: Merchant listing now shows shipping + returns; FAQ, Article, Breadcrumb detected; **zero critical errors**; no unexpected `aggregateRating`.

- [ ] **Step 4: Lighthouse SEO**

Run Lighthouse (Chrome DevTools or `npx lighthouse`) on `/`, a `/blog/*` post, and `/market-programs/affiliates`. Expected: **SEO = 100**. Fix any flagged issue (e.g., missing meta description) before sign-off.

- [ ] **Step 5: Canonical-host check**

```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://sleekdentalclub.com/
```
Expected: `301`/`308` → `https://www.sleekdentalclub.com/`. If it does NOT redirect, fix the apex→www redirect in the Vercel project domain settings (ops step, not code).

- [ ] **Step 6: Post-deploy GSC actions (ops checklist — document in PR)**

- Resubmit `https://www.sleekdentalclub.com/sitemap.xml`.
- In GSC → Indexing → Pages, click "Validate Fix" on **Not found (404)** and **Page with redirect**.
- In GSC → Merchant listings, "Validate Fix" on the shipping/return warnings.

- [ ] **Step 7: Final commit (if Step 1/4 required fixes)**

```bash
git add -A
git commit -m "chore(seo): phase 1 validation fixes"
```

---

## Done = Phase 1 success criteria met

- Zero unhandled legacy 404s — every known old URL 301s to a sensible destination.
- Single canonical host (www); apex 301s to www.
- GSC merchant-listing warnings (`shippingDetails`, `hasMerchantReturnPolicy`) cleared.
- All structured data passes the Rich Results Test with no critical errors; no fabricated ratings.
- Lighthouse SEO 100 on home / blog / affiliates.
