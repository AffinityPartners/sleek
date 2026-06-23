# SEO Phase 2b — Toothbrush-Subscription Landing Page + Insurance-Question Post — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capture the commercial "toothbrush subscription" query cluster with one focused conversion landing page at `/electric-toothbrush-subscription`, and the 127-impression "does dental insurance cover electric toothbrush" query with a dedicated blog post, both wired into the site's internal links and sitemap.

**Architecture:** Follow the existing affiliates-page pattern exactly — a server-component route that injects `FAQPage` + `BreadcrumbList` JSON-LD via `next/script` and composes reusable section components (`MarketProgramHero`, a new `SubscriptionContent`, the existing `PricingSection`, `StickyNav`, `Footer`). Page copy/FAQ/breadcrumb data lives in a `src/lib/*-content.ts` module (mirrors `affiliate-content.ts`). The blog post is a pure data addition to `BLOG_POSTS` in `blog.ts`; the existing `[slug]` route handles its static generation, metadata, and Article schema automatically.

**Tech Stack:** Next.js 16 (App Router, server components), React 19, TypeScript 6, Tailwind v4, `next/script` for JSON-LD, vitest 4 for tests, lucide-react icons.

## Global Constraints

- **No fabricated facts or figures.** All plan facts come verbatim from `src/components/sections/PricingSection.tsx`. The verified **CLUB** plan = `$16.95`/mo + `$39.95` one-time welcome kit; features: "Sonic Electric Toothbrush (5 Modes)", "2-Minute Timer Oscillating Brush Head", "USB Rechargeable with Holder & Case", "Quarterly Brush Head Refill", "50 Floss Picks Every Quarter", "Free Shipping in Contiguous US", "Cancel Anytime"; CTA `https://enrollment.sleekdentalclub.com/product-details`. Other plans: OCP `$29.95`/mo, PRO `$56.95`/mo, MAX `$64.95`/mo (CTA `https://enrollment.sleekdentalclub.com/onboarding`). Insurance/FSA/HSA statements must be **general and hedged** ("generally", "most plans", "check your plan") — never invented specifics.
- **Canonical host** is `https://www.sleekdentalclub.com`. All new URLs, canonicals, OG tags, breadcrumb URLs, and sitemap entries use it (no trailing slash).
- **Fixed slugs (used across tasks):** landing page route = `/electric-toothbrush-subscription`; blog post slug = `does-dental-insurance-cover-electric-toothbrush` (→ `/blog/does-dental-insurance-cover-electric-toothbrush`). Both tasks hardcode the other's path.
- **Reuse, don't reinvent:** existing `createFaqSchema`/`createBreadcrumbSchema` builders and `FaqItem`/`BreadcrumbItem` types from `src/lib/schema.ts`; existing components; the `BlogPost` interface + `BLOG_POSTS` array.
- **Design refinements from the approved spec (deliberate, documented):**
  1. **No `Product` schema on the landing page.** The spec suggested injecting `createAllProductSchemas()`, but its prices (OCP 19.95 / PRO 65.95 / MAX 79.95) **do not match** the displayed `PricingSection` prices (29.95 / 56.95 / 64.95) — a pre-existing inconsistency. Duplicating that schema onto a second URL would propagate a Merchant-listing price mismatch. The page's structured-data wins are `FAQPage` + `BreadcrumbList` only.
  2. **Homepage→landing link lives in the `Footer` nav** (site-wide, always-visible, low-risk) rather than buried in the 2,568-line `ProductTechHighlight` client component (whose subtitle is hidden on mobile).
- **Test convention:** this repo has **no component unit tests** — all tests live in `src/lib/__tests__/` and cover data/schema/sitemap. New tests follow that convention (test the data modules and `blog.ts`/`sitemap.ts` outputs); components are verified by `tsc`, `lint`, `build`, and visual QA.
- **Per-task gate:** every task ends green on the relevant tests; the whole suite + `tsc --noEmit` + `pnpm lint` + `pnpm build` must pass before a task is marked complete.

---

### Task 1: Toothbrush-subscription content data module

**Files:**
- Create: `src/lib/toothbrush-subscription-content.ts`
- Test: `src/lib/__tests__/toothbrush-subscription-content.test.ts`

**Interfaces:**
- Consumes: `FaqItem`, `BreadcrumbItem` from `@/lib/schema`; `createFaqSchema`, `createBreadcrumbSchema` (in the test only).
- Produces (used by Task 3):
  - `subscriptionHeroTitle: string`
  - `subscriptionHeroSubtitle: string`
  - `subscriptionHeroBenefits: string[]`
  - `subscriptionSteps: { n: string; title: string; body: string }[]`
  - `subscriptionFaqs: FaqItem[]`
  - `subscriptionBreadcrumb: BreadcrumbItem[]`

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/toothbrush-subscription-content.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test -- toothbrush-subscription-content`
Expected: FAIL — `Cannot find module '@/lib/toothbrush-subscription-content'`.

- [ ] **Step 3: Create the content module**

Create `src/lib/toothbrush-subscription-content.ts`:

```ts
import type { FaqItem, BreadcrumbItem } from '@/lib/schema';

/**
 * Content for the /electric-toothbrush-subscription landing page.
 * Every figure is verified against the CLUB plan in PricingSection.tsx — no invented terms.
 */

export const subscriptionHeroTitle = 'Electric Toothbrush Subscription';

export const subscriptionHeroSubtitle =
  'Get a premium sonic electric toothbrush plus auto-shipped quarterly refills in one simple subscription — starting at $16.95/month with the SLEEK CLUB plan. Free shipping in the contiguous US, and cancel anytime.';

export const subscriptionHeroBenefits: string[] = [
  'Sonic electric toothbrush with 5 cleaning modes included',
  'Fresh brush heads + 50 floss picks auto-shipped every quarter',
  'Free shipping in the contiguous US',
  'Cancel anytime',
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
      'Yes. Shipping is free in the contiguous US, and you can cancel anytime.',
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test -- toothbrush-subscription-content`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/toothbrush-subscription-content.ts src/lib/__tests__/toothbrush-subscription-content.test.ts
git commit -m "feat(seo): toothbrush-subscription landing-page content data + tests"
```

---

### Task 2: Make `MarketProgramHero` reusable for a consumer page

The hero hardcodes a "Partner Programs" breadcrumb label and only maps partner icons. Add a backward-compatible `breadcrumbLabel` prop (default preserves existing behavior for the 4 partner pages) and a `sparkles` icon. No behavior change for existing callers.

**Files:**
- Modify: `src/components/market-programs/MarketProgramHero.tsx`

**Interfaces:**
- Produces (used by Task 3): `MarketProgramHero` now accepts optional `breadcrumbLabel?: string` (default `'Partner Programs'`) and `iconName` now includes `'sparkles'`. `MarketProgramIconName` union gains `'sparkles'`.

- [ ] **Step 1: Add the `Sparkles` icon import**

In `src/components/market-programs/MarketProgramHero.tsx`, add `Sparkles` to the existing `lucide-react` import block (which currently imports `ArrowLeft, ChevronRight, Check, Stethoscope, Share2, Briefcase, Users, type LucideIcon`):

```tsx
import {
  ArrowLeft,
  ChevronRight,
  Check,
  Stethoscope,
  Share2,
  Briefcase,
  Users,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
```

- [ ] **Step 2: Extend the icon name union and map**

Change the type:

```tsx
export type MarketProgramIconName = 'stethoscope' | 'share2' | 'briefcase' | 'users' | 'sparkles';
```

Add to `iconMap`:

```tsx
const iconMap: Record<MarketProgramIconName, LucideIcon> = {
  stethoscope: Stethoscope,
  share2: Share2,
  briefcase: Briefcase,
  users: Users,
  sparkles: Sparkles,
};
```

- [ ] **Step 3: Add the `breadcrumbLabel` prop**

In `MarketProgramHeroProps`, add:

```tsx
  /** Middle breadcrumb label and back-context (defaults to "Partner Programs" for partner pages). */
  breadcrumbLabel?: string;
```

In the component signature destructure, add the default:

```tsx
export default function MarketProgramHero({
  title,
  subtitle,
  iconName,
  benefits,
  badgeText,
  breadcrumbLabel = 'Partner Programs',
}: MarketProgramHeroProps) {
```

Replace the hardcoded breadcrumb label span:

```tsx
          <span className="text-gray-900 font-medium">{breadcrumbLabel}</span>
```

(Leave the "Back to Home" link and the `Home` crumb unchanged — both are correct for a consumer page too.)

- [ ] **Step 4: Verify types, lint, and existing tests still pass**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm test`
Expected: PASS — no type errors; `affiliate-content` and all existing tests green. The 4 partner pages don't pass `breadcrumbLabel`, so they keep the `'Partner Programs'` default (no behavior change).

- [ ] **Step 5: Commit**

```bash
git add src/components/market-programs/MarketProgramHero.tsx
git commit -m "feat(seo): add breadcrumbLabel prop + sparkles icon to MarketProgramHero (reuse for consumer page)"
```

---

### Task 3: `/electric-toothbrush-subscription` landing page

Build the new route plus its content component. Injects `FAQPage` + `BreadcrumbList` JSON-LD (no Product schema — see Global Constraints). Reuses `MarketProgramHero`, `PricingSection`, `StickyNav`, `Footer`.

**Files:**
- Create: `src/components/toothbrush-subscription/SubscriptionContent.tsx`
- Create: `src/app/electric-toothbrush-subscription/page.tsx`

**Interfaces:**
- Consumes: all exports from Task 1 (`subscriptionHeroTitle`, `subscriptionHeroSubtitle`, `subscriptionHeroBenefits`, `subscriptionSteps`, `subscriptionFaqs`, `subscriptionBreadcrumb`); `MarketProgramHero` with `iconName="sparkles"` + `breadcrumbLabel` from Task 2; `createFaqSchema`, `createBreadcrumbSchema` from `@/lib/schema`; default `PricingSection` from `@/components/sections/PricingSection`; default `StickyNav` from `@/components/StickyNav`; default `Footer` from `@/components/Footer`.
- Links out to: `#plans` (same-page, the embedded `PricingSection`) and `/blog/does-dental-insurance-cover-electric-toothbrush` (Task 4).

- [ ] **Step 1: Create the `SubscriptionContent` component**

Create `src/components/toothbrush-subscription/SubscriptionContent.tsx` (server component — mirrors `AffiliateProgramContent`; native `<details>` keeps FAQ answers in the DOM for `FAQPage` schema):

```tsx
import Link from 'next/link';
import { subscriptionSteps, subscriptionFaqs } from '@/lib/toothbrush-subscription-content';

/**
 * Keyword-targeted content for the electric toothbrush subscription landing page.
 * Renders between the hero and the pricing section. Facts come from the CLUB plan only.
 */
export default function SubscriptionContent() {
  return (
    <section className="container-standard py-16 md:py-20">
      <div className="max-w-3xl">
        <h2 className="section-title">How the SLEEK Electric Toothbrush Subscription Works</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          A SLEEK electric toothbrush subscription gives you a premium sonic toothbrush and keeps it
          performing at its best with brush-head and floss refills shipped automatically every quarter
          — no remembering to reorder, no overpaying at the store. It starts with the CLUB plan, and you
          can add dental savings or insurance whenever you want.
        </p>
      </div>

      <ol className="grid gap-6 md:grid-cols-3 mb-16">
        {subscriptionSteps.map((step) => (
          <li key={step.n} className="card p-6">
            <span className="badge-primary mb-4">{step.n}</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600 leading-relaxed">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="grid gap-10 md:grid-cols-2 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What&apos;s Included Every Quarter</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Sonic electric toothbrush with 5 cleaning modes (in your welcome kit)</li>
            <li>Quarterly brush head refill — replaced on the dentist-recommended schedule</li>
            <li>50 floss picks every quarter</li>
            <li>Free shipping in the contiguous US, and cancel anytime</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why a Toothbrush Subscription</h2>
          <p className="text-gray-600 leading-relaxed">
            Brush heads wear out — the ADA recommends replacing them about every three months. A
            subscription keeps fresh refills arriving automatically for one predictable price, so your
            sonic toothbrush always cleans like new. Wondering whether insurance pays for this? See{' '}
            <Link
              href="/blog/does-dental-insurance-cover-electric-toothbrush"
              className="text-teal-600 font-medium hover:text-teal-700"
            >
              whether dental insurance covers an electric toothbrush
            </Link>
            .
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Electric Toothbrush Subscription FAQ</h2>
      <div className="max-w-3xl space-y-3">
        {subscriptionFaqs.map((faq) => (
          <details key={faq.question} className="card p-5">
            <summary className="font-semibold text-gray-900 cursor-pointer">{faq.question}</summary>
            <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>

      <p className="mt-10 text-gray-600">
        Ready to start?{' '}
        <Link href="#plans" className="text-teal-600 font-medium hover:text-teal-700">
          Compare the SLEEK plans and join below
        </Link>
        .
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Create the page route**

Create `src/app/electric-toothbrush-subscription/page.tsx` (mirrors `src/app/market-programs/affiliates/page.tsx`):

```tsx
import { Metadata } from 'next';
import Script from 'next/script';

import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import PricingSection from '@/components/sections/PricingSection';
import { MarketProgramHero } from '@/components/market-programs';
import SubscriptionContent from '@/components/toothbrush-subscription/SubscriptionContent';
import {
  subscriptionHeroTitle,
  subscriptionHeroSubtitle,
  subscriptionHeroBenefits,
  subscriptionFaqs,
  subscriptionBreadcrumb,
} from '@/lib/toothbrush-subscription-content';
import { createFaqSchema, createBreadcrumbSchema } from '@/lib/schema';

const PAGE_URL = 'https://www.sleekdentalclub.com/electric-toothbrush-subscription';

/**
 * SEO metadata for the electric toothbrush subscription landing page.
 * Targets the commercial "toothbrush subscription" query cluster.
 */
export const metadata: Metadata = {
  title: { absolute: 'Electric Toothbrush Subscription | SLEEK Dental Club' },
  description:
    'The SLEEK electric toothbrush subscription delivers a sonic toothbrush plus auto-shipped quarterly brush-head and floss refills from $16.95/month. Free shipping, cancel anytime.',
  openGraph: {
    title: 'Electric Toothbrush Subscription | SLEEK Dental Club',
    description:
      'A sonic electric toothbrush plus auto-shipped quarterly refills in one subscription from $16.95/month. Free shipping, cancel anytime.',
    type: 'website',
    url: PAGE_URL,
  },
  twitter: {
    card: 'summary',
    title: 'Electric Toothbrush Subscription | SLEEK Dental Club',
    description: 'Sonic toothbrush + quarterly refills in one subscription from $16.95/month.',
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

/**
 * Consumer landing page for the SLEEK electric toothbrush subscription.
 * Hero + how-it-works content + the real plan cards (drive to enrollment) + FAQ.
 */
export default function ElectricToothbrushSubscriptionPage() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      <Script
        id="subscription-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createFaqSchema(subscriptionFaqs)) }}
      />
      <Script
        id="subscription-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createBreadcrumbSchema(subscriptionBreadcrumb)) }}
      />
      <StickyNav lightHero />
      <MarketProgramHero
        badgeText="Toothbrush Subscription"
        title={subscriptionHeroTitle}
        subtitle={subscriptionHeroSubtitle}
        iconName="sparkles"
        benefits={subscriptionHeroBenefits}
        breadcrumbLabel="Electric Toothbrush Subscription"
      />
      <SubscriptionContent />
      <section id="plans" className="bg-section-light scroll-mt-20">
        <PricingSection />
      </section>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Verify types, lint, build, and tests**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build && pnpm test`
Expected: PASS — type-checks, builds the new static route `/electric-toothbrush-subscription`, all tests green.

- [ ] **Step 4: Visual + DOM sanity check**

Run the dev server and confirm the rendered page:

```bash
./node_modules/.bin/next dev
```

Then in a separate shell, verify the H1 and JSON-LD are present in the rendered DOM:

```bash
curl -s http://localhost:3000/electric-toothbrush-subscription | grep -o 'Electric Toothbrush Subscription' | head -1
curl -s http://localhost:3000/electric-toothbrush-subscription | grep -o '"@type":"FAQPage"' | head -1
curl -s http://localhost:3000/electric-toothbrush-subscription | grep -o '"@type":"BreadcrumbList"' | head -1
```

Expected: each `grep` prints its match (H1 text, FAQPage, BreadcrumbList present). Stop the dev server when done.

> **Note on schema verification:** server-component RSC output can serialize differently than a naive grep expects; if a `grep` above returns nothing, confirm via the browser DevTools "Elements" tab or a Playwright DOM check (`page.content()`) rather than assuming the schema is missing. (`pnpm build` succeeding already confirms the `<Script>` tags compile.)

- [ ] **Step 5: Commit**

```bash
git add src/components/toothbrush-subscription/SubscriptionContent.tsx src/app/electric-toothbrush-subscription/page.tsx
git commit -m "feat(seo): add /electric-toothbrush-subscription landing page (FAQPage + breadcrumb schema, plan CTAs)"
```

---

### Task 4: "Does Dental Insurance Cover an Electric Toothbrush?" blog post

Add one entry to `BLOG_POSTS`. The `[slug]` route + `BlogPostClient` give it static generation, metadata (from `title`/`excerpt`), Article schema, and sitemap inclusion automatically.

**Files:**
- Modify: `src/lib/blog.ts` (insert one `BlogPost` object as the **first** element of the `BLOG_POSTS` array — `getAllPosts()` returns array order, so first = newest/featured)
- Test: `src/lib/__tests__/insurance-toothbrush-post.test.ts`

**Interfaces:**
- Consumes: `getPostBySlug`, `getAllSlugs` from `@/lib/blog` (test only). The new post must satisfy the existing `BlogPost` interface (`id, slug, title, excerpt, content, category, tags, author, date, dateFormatted, image, imageAlt, readTime`).
- Produces: a post reachable at `/blog/does-dental-insurance-cover-electric-toothbrush`, linking to `/electric-toothbrush-subscription` (Task 3) and `/#plans`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/insurance-toothbrush-post.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test -- insurance-toothbrush-post`
Expected: FAIL — `getAllSlugs()` does not contain the slug; `getPostBySlug(...)` is `undefined`.

- [ ] **Step 3: Add the post to `BLOG_POSTS`**

In `src/lib/blog.ts`, insert this object as the **first** element of the `BLOG_POSTS` array (immediately after `export const BLOG_POSTS: BlogPost[] = [`):

```ts
  {
    id: 'dental-insurance-electric-toothbrush',
    slug: 'does-dental-insurance-cover-electric-toothbrush',
    title: 'Does Dental Insurance Cover an Electric Toothbrush?',
    excerpt:
      'Most dental insurance plans won’t pay for an electric toothbrush. Here’s why — and how a subscription that includes the brush and refills can be a simpler way to budget for great oral care.',
    category: 'health',
    tags: ['insurance', 'products', 'membership'],
    author: 'SLEEK Dental Team',
    date: '2026-06-20',
    dateFormatted: 'June 20, 2026',
    image: '/images/SLEEK-ToothBrush.jpg',
    imageAlt: 'SLEEK sonic electric toothbrush',
    readTime: 5,
    content: `
      <p><strong>Does dental insurance cover an electric toothbrush? In most cases, no.</strong> Standard dental insurance is built to help pay for treatment and procedures &mdash; cleanings, fillings, crowns, and the like &mdash; not for everyday products you use at home. Most plans treat an electric toothbrush as an out-of-pocket purchase, and many FSA and HSA accounts exclude general-use toothbrushes too. It always pays to check the specific rules of your plan, but as a rule of thumb you shouldn&rsquo;t count on insurance to buy your toothbrush.</p>

      <h2>Why dental insurance usually won&rsquo;t pay for a toothbrush</h2>
      <p>Dental insurance is designed around <em>services</em> delivered by a licensed provider &mdash; preventive care like exams and cleanings, basic work like fillings, and major work like crowns. Benefits are organized around those visits and procedures. A toothbrush is a product you own and keep using at home, so it generally falls outside what a dental plan is built to reimburse, even though good brushing is exactly what helps you avoid the procedures insurance does cover.</p>

      <h2>What about FSA or HSA dollars?</h2>
      <p>People often ask whether they can use a flexible spending account (FSA) or health savings account (HSA) to buy an electric toothbrush. In most cases the answer is no: general-use toothbrushes are typically treated as everyday personal-care items rather than qualified medical expenses, so they&rsquo;re usually not reimbursable. Rules vary by plan administrator and can change, so confirm with yours before assuming a toothbrush is eligible.</p>

      <h2>A simpler approach: a subscription that includes the brush</h2>
      <p>If insurance won&rsquo;t cover your toothbrush, a subscription that <em>includes</em> it can be an easier way to budget for great oral care. The <a href="/electric-toothbrush-subscription">SLEEK electric toothbrush subscription</a> bundles a sonic electric toothbrush with auto-shipped quarterly brush-head and floss refills for one predictable monthly price &mdash; starting at $16.95/month on the CLUB plan, with free shipping in the contiguous US and the ability to cancel anytime.</p>
      <p>Because the American Dental Association recommends replacing your brush head about every three months, having refills arrive automatically keeps your toothbrush working its best without a separate trip to the store.</p>

      <h2>Want dental coverage too?</h2>
      <p>SLEEK also offers memberships that pair the same sonic toothbrush and quarterly refills with real dental benefits &mdash; from discount dental savings on the OCP plan to MetLife dental insurance on the PRO and MAX plans. <a href="/#plans">Compare the SLEEK Dental membership plans</a> to find the right fit, whether you just want the toothbrush subscription or full dental coverage on top of it.</p>

      <p>The bottom line: traditional dental insurance generally won&rsquo;t buy your electric toothbrush, and most FSA/HSA plans won&rsquo;t either &mdash; so a subscription that includes the brush and its refills can be the most straightforward way to keep your smile in top shape.</p>
    `,
  },
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test -- insurance-toothbrush-post`
Expected: PASS (4 tests).

- [ ] **Step 5: Verify the full suite, types, and build**

Run: `pnpm exec tsc --noEmit && pnpm test && pnpm build`
Expected: PASS — the new post statically generates at `/blog/does-dental-insurance-cover-electric-toothbrush`; all tests green.

- [ ] **Step 6: Commit**

```bash
git add src/lib/blog.ts src/lib/__tests__/insurance-toothbrush-post.test.ts
git commit -m "feat(seo): add 'does dental insurance cover an electric toothbrush' post + internal links"
```

---

### Task 5: Internal link (Footer) + sitemap entry

Add the site-wide Footer link to the new landing page and register the route in the sitemap.

**Files:**
- Modify: `src/components/Footer.tsx` (the `footerNavigation.pages` array, ~line 35-42)
- Modify: `src/app/sitemap.ts` (the `STATIC_PAGES` array, ~line 47-57)
- Test: `src/lib/__tests__/sitemap.test.ts` (add one assertion)

**Interfaces:**
- Consumes: nothing new. Uses the fixed route `/electric-toothbrush-subscription` from Task 3.

- [ ] **Step 1: Add the failing sitemap assertion**

In `src/lib/__tests__/sitemap.test.ts`, add this test inside the existing `describe('sitemap', ...)` block:

```ts
  it('includes the electric toothbrush subscription landing page', () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain('https://www.sleekdentalclub.com/electric-toothbrush-subscription');
  });
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm test -- sitemap`
Expected: FAIL — the URL is not yet in the sitemap.

- [ ] **Step 3: Add the route to the sitemap**

In `src/app/sitemap.ts`, add this entry to the `STATIC_PAGES` array (place it right after the `{ path: '/blog', ... }` entry so high-value commercial pages sit near the top):

```ts
  { path: '/electric-toothbrush-subscription', changeFrequency: 'monthly', priority: 0.9 },
```

- [ ] **Step 4: Run the sitemap test to verify it passes**

Run: `pnpm test -- sitemap`
Expected: PASS — including the existing assertions (canonical host, excludes /aobg, includes homepage + /blog).

- [ ] **Step 5: Add the Footer link**

In `src/components/Footer.tsx`, add an entry to the `footerNavigation.pages` array (after the `Blog` entry):

```ts
  pages: [
    { name: 'Home', href: '/' },
    { name: 'Plans', href: '/#plans', anchorId: 'plans' },
    { name: 'Technology', href: '/#technology', anchorId: 'technology' },
    { name: 'Benefits', href: '/#benefits', anchorId: 'benefits' },
    { name: 'FAQ', href: '/#faq', anchorId: 'faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'Toothbrush Subscription', href: '/electric-toothbrush-subscription' },
  ],
```

(No `anchorId` — it's a real route, not a homepage anchor, so the default `<Link href>` navigation is correct.)

- [ ] **Step 6: Verify types, lint, build, and full suite**

Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build && pnpm test`
Expected: PASS — Footer renders the new link site-wide; sitemap includes the route; everything green.

- [ ] **Step 7: Commit**

```bash
git add src/components/Footer.tsx src/app/sitemap.ts src/lib/__tests__/sitemap.test.ts
git commit -m "feat(seo): link toothbrush-subscription page in footer + sitemap"
```

---

## Self-Review

**1. Spec coverage:**
- Unit 1 (landing page: hero `<h1>`, content sections, FAQ + FAQPage, breadcrumb, plan CTAs, internal links) → Tasks 1, 2, 3. ✓
- Unit 2 (insurance blog post: direct answer, Article schema auto, links) → Task 4. ✓
- Unit 3 (internal linking: post→page+plans, page→post, homepage→page) → Task 3 (page→post, page→#plans), Task 4 (post→page+plans), Task 5 (site-wide Footer→page). ✓
- Unit 4 (sitemap + sitemap test) → Task 5. ✓
- Constraints (no fabrication, www host, reuse builders) → enforced in Global Constraints + tests (`%` guards, breadcrumb host asserts). ✓
- Spec's `createAllProductSchemas` suggestion → consciously dropped with documented rationale (price mismatch). ✓ (deviation recorded, to be surfaced at handoff)

**2. Placeholder scan:** No TBD/TODO; every code step contains complete, runnable code; the blog HTML and component bodies are fully written. ✓

**3. Type consistency:** `FaqItem`/`BreadcrumbItem` used consistently from `@/lib/schema`; Task 1 export names (`subscriptionHeroTitle`, `subscriptionHeroSubtitle`, `subscriptionHeroBenefits`, `subscriptionSteps`, `subscriptionFaqs`, `subscriptionBreadcrumb`) match exactly where Task 3 imports them; `MarketProgramIconName` gains `'sparkles'` (Task 2) and Task 3 passes `iconName="sparkles"`; `breadcrumbLabel` prop (Task 2) matches Task 3's usage; the blog slug/URL string is identical across Tasks 3, 4, 5 and both tests. ✓

## Notes to carry into execution / finishing

- **Pre-existing bug to surface (not fixed here):** `createAllProductSchemas()` in `schema.ts` emits prices (OCP 19.95 / PRO 65.95 / MAX 79.95) that don't match the displayed `PricingSection` prices (29.95 / 56.95 / 64.95). This affects the homepage today; Phase 2b avoids amplifying it by not adding Product schema to the new page. Worth a follow-up fix.
- Post-deploy (owner): Rich Results Test on the new page (FAQPage + BreadcrumbList) and post (Article); Lighthouse SEO; GSC URL-inspect + request indexing for both URLs.
