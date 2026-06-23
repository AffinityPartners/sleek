# SEO Phase 2 — On-Page Optimization + Internal Linking — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Maximize rankings of existing pages for the commercial money-keywords — chiefly build out the thin affiliates page for "dental affiliate program" — without redesigning or fabricating program terms.

**Architecture:** Add keyword-targeted content + FAQPage/BreadcrumbList JSON-LD to the affiliates page (new content component + data module), surgically sharpen homepage/plans copy, and add descriptive internal links from blog posts to money pages. Reuses existing `schema.ts` builders and Next `<Script>` JSON-LD injection. Pure-data (FAQ) is unit-tested; rendered content/links/schema are verified by build + grep + Rich Results.

**Tech Stack:** Next.js 16, React 19, TypeScript 6, Tailwind v4, vitest, pnpm/Node 24.

## Global Constraints

- **SEO-additive, not a redesign** — preserve existing visual design + conversion flow; add/sharpen only.
- **No fabricated program terms/figures** — affiliate commission/payout copy uses ONLY facts already in `affiliates/page.tsx` `pageContent` (competitive commissions, monthly payouts, low minimums, real-time tracking, marketing materials, free to join, promotes memberships + toothbrush subscriptions). No invented rates/percentages/schedules.
- **No new routes/pages**, no net-new blog posts (Phase 2b).
- Canonical host `https://www.sleekdentalclub.com`. Reuse `createFaqSchema(faqs: FaqItem[])` and `createBreadcrumbSchema(items: BreadcrumbItem[])` from `src/lib/schema.ts` (`FaqItem = {question, answer}`, `BreadcrumbItem = {name, url}`).
- pnpm + `CI=true` for test/build/lint; commit after each task.

---

### Task 1: Affiliate content data module (FAQ + breadcrumb)

**Files:**
- Create: `src/lib/affiliate-content.ts`
- Test: `src/lib/__tests__/affiliate-content.test.ts`

**Interfaces:**
- Produces: `export const affiliateFaqs: FaqItem[]`, `export const affiliateBreadcrumb: BreadcrumbItem[]`, `export const affiliateSteps: { n: string; title: string; body: string }[]` — consumed by Tasks 2 & 3.

- [ ] **Step 1: Write the failing test**

`src/lib/__tests__/affiliate-content.test.ts`:
```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true pnpm test src/lib/__tests__/affiliate-content.test.ts`
Expected: FAIL — cannot resolve `@/lib/affiliate-content`.

- [ ] **Step 3: Write `src/lib/affiliate-content.ts`**

```ts
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
```

- [ ] **Step 4: Run tests, verify pass**

Run: `CI=true pnpm test src/lib/__tests__/affiliate-content.test.ts && pnpm exec tsc --noEmit`
Expected: 5 tests PASS; tsc 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/affiliate-content.ts src/lib/__tests__/affiliate-content.test.ts
git commit -m "feat(seo): affiliate program FAQ + breadcrumb content data"
```

---

### Task 2: AffiliateProgramContent component

Renders the keyword-targeted content + an accessible FAQ (native `<details>` so answers are in the DOM and a server component suffices — no client JS).

**Files:**
- Create: `src/components/market-programs/AffiliateProgramContent.tsx`
- Modify: `src/components/market-programs/index.ts` (add export)

**Interfaces:**
- Consumes: `affiliateSteps`, `affiliateFaqs` from `@/lib/affiliate-content` (Task 1).
- Produces: `export default AffiliateProgramContent` — consumed by Task 3.

- [ ] **Step 1: Create the component**

`src/components/market-programs/AffiliateProgramContent.tsx`:
```tsx
import { affiliateSteps, affiliateFaqs } from '@/lib/affiliate-content';

/**
 * Keyword-targeted content for the affiliate program landing page.
 * SEO-additive: renders between the hero and the contact form. Native <details>
 * keeps it a server component and puts FAQ answers in the DOM for FAQPage schema.
 */
export default function AffiliateProgramContent() {
  return (
    <section className="container-standard py-16 md:py-20">
      <div className="max-w-3xl">
        <h2 className="section-title">How the SLEEK Dental Affiliate Program Works</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          The SLEEK Dental affiliate program lets creators, dental professionals, and health &amp;
          wellness marketers earn recurring commissions by promoting SLEEK Dental Club — a premium
          sonic electric toothbrush subscription paired with real dental coverage.
        </p>
      </div>

      <ol className="grid gap-6 md:grid-cols-3 mb-16">
        {affiliateSteps.map((step) => (
          <li key={step.n} className="card p-6">
            <span className="badge-primary mb-4">{step.n}</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600 leading-relaxed">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="grid gap-10 md:grid-cols-2 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Earn as a SLEEK Affiliate</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Competitive recurring commissions on every membership</li>
            <li>Monthly payouts with low minimums</li>
            <li>Real-time tracking dashboard</li>
            <li>Professional marketing materials provided</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who the Affiliate Program Is For</h2>
          <p className="text-gray-600 leading-relaxed">
            Dental and oral-health bloggers, dentists and hygienists, health and wellness influencers,
            coupon and deal sites, and marketing agencies — anyone who can reach people who want better
            oral care.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dental Affiliate Program FAQ</h2>
      <div className="max-w-3xl space-y-3">
        {affiliateFaqs.map((faq) => (
          <details key={faq.question} className="card p-5">
            <summary className="font-semibold text-gray-900 cursor-pointer">{faq.question}</summary>
            <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>

      <p className="mt-10 text-gray-600">
        Explore the{' '}
        <a href="/#plans" className="text-teal-600 font-medium hover:text-teal-700">
          SLEEK Dental membership plans
        </a>{' '}
        you&apos;ll be promoting.
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Export it from the barrel**

In `src/components/market-programs/index.ts`, add after the `PartnerContactForm` export:
```ts
export { default as AffiliateProgramContent } from './AffiliateProgramContent';
```

- [ ] **Step 3: Verify it builds**

Run: `CI=true pnpm build`
Expected: build succeeds, no TS errors. (Component isn't rendered yet — Task 3 wires it.)

- [ ] **Step 4: Commit**

```bash
git add src/components/market-programs/AffiliateProgramContent.tsx src/components/market-programs/index.ts
git commit -m "feat(seo): affiliate program content + FAQ component"
```

---

### Task 3: Wire the affiliates page (H1 + content + schema)

**Files:**
- Modify: `src/app/market-programs/affiliates/page.tsx`

**Interfaces:**
- Consumes: `AffiliateProgramContent` (Task 2); `affiliateFaqs`, `affiliateBreadcrumb` (Task 1); `createFaqSchema`, `createBreadcrumbSchema` (`schema.ts`).

- [ ] **Step 1: Update the page**

Make these edits to `src/app/market-programs/affiliates/page.tsx`:

1. Add imports at the top (after the existing imports):
```ts
import Script from 'next/script';
import { MarketProgramHero, PartnerContactForm, AffiliateProgramContent } from '@/components/market-programs';
import { affiliateFaqs, affiliateBreadcrumb } from '@/lib/affiliate-content';
import { createFaqSchema, createBreadcrumbSchema } from '@/lib/schema';
```
(Replace the existing `import { MarketProgramHero, PartnerContactForm } ...` line with the combined import above.)

2. Change the H1 text — in `pageContent`, set:
```ts
  title: 'Dental Affiliate Program',
  subtitle:
    'Become a SLEEK affiliate and earn recurring commissions promoting premium dental memberships and our sonic electric toothbrush subscription. Everything you need to succeed — marketing materials, real-time tracking, monthly payouts.',
```
(The hero renders `title` as the `<h1>`, so this puts the target keyword in the H1; the value-prop moves into the subtitle.)

3. Render the content + schema. Replace the `return (...)` body so it reads:
```tsx
  return (
    <main className="relative min-h-screen bg-gray-50">
      <Script
        id="affiliate-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createFaqSchema(affiliateFaqs)) }}
      />
      <Script
        id="affiliate-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createBreadcrumbSchema(affiliateBreadcrumb)) }}
      />
      <StickyNav lightHero />
      <MarketProgramHero
        badgeText={pageContent.badgeText}
        title={pageContent.title}
        subtitle={pageContent.subtitle}
        iconName="share2"
        benefits={pageContent.benefits}
      />
      <AffiliateProgramContent />
      <PartnerContactForm
        subjectLine={pageContent.formSubjectLine}
        partnerType={pageContent.partnerType}
      />
      <Footer />
    </main>
  );
```

- [ ] **Step 2: Build + verify H1, content, and schema render**

```bash
CI=true pnpm build
./node_modules/.bin/next start -p 3013 > /tmp/p2_aff.log 2>&1 &
SRV=$!
curl --retry 40 --retry-delay 1 --retry-connrefused -sf http://localhost:3013/ -o /dev/null
HTML=$(curl -s http://localhost:3013/market-programs/affiliates)
echo "$HTML" | grep -oE "<h1[^>]*>[^<]*Dental Affiliate Program[^<]*</h1>" && echo "  H1 OK" || echo "  H1 MISSING"
echo "$HTML" | grep -qF '"@type":"FAQPage"' && echo "  FAQPage schema OK" || echo "  FAQPage MISSING"
echo "$HTML" | grep -qF '"@type":"BreadcrumbList"' && echo "  Breadcrumb schema OK" || echo "  Breadcrumb MISSING"
echo "$HTML" | grep -qF 'How the SLEEK Dental Affiliate Program Works' && echo "  content OK" || echo "  content MISSING"
echo "$HTML" | grep -qF 'href="/#plans"' && echo "  internal link OK" || echo "  link MISSING"
kill $SRV 2>/dev/null
```
Expected: H1 OK, FAQPage schema OK, Breadcrumb schema OK, content OK, internal link OK. (The H1 grep may need a loose match if the hero wraps the text in spans — if so, assert `Dental Affiliate Program` appears within the first `<h1 ...>...</h1>`.)

- [ ] **Step 3: Rich Results check (manual, note in report)**

After deploy (or via tunnel), run Google's Rich Results Test on `/market-programs/affiliates` → FAQPage + BreadcrumbList detected, zero critical errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/market-programs/affiliates/page.tsx
git commit -m "feat(seo): affiliates page H1 keyword, content section, FAQ + breadcrumb schema"
```

---

### Task 4: Homepage hero copy targeting

The homepage FAQ already emits FAQPage schema (`FaqAccordion`), so this is surgical copy only — weave the commercial phrases into the hero subtitle without touching the brand `<h1>` or layout.

**Files:**
- Modify: `src/components/ui/Hero.tsx` (the hero subtitle/description copy only)

- [ ] **Step 1: Read the current hero subtitle**

Run: `grep -nE "Experience|membership|sonic|toothbrush|insurance|<p|subtitle|description" src/components/ui/Hero.tsx | head`
Identify the descriptive paragraph under the `<h1>` (the "Experience the perfect fusion…" copy). Record its exact current text.

- [ ] **Step 2: Replace the subtitle copy** (preserve the surrounding JSX/element, change only the text)

Set the hero description paragraph text to:
```
Experience the perfect fusion of an electric toothbrush subscription and comprehensive dental coverage. One SLEEK dental membership delivers a premium sonic toothbrush with quarterly refills plus real insurance savings — total oral care.
```
(Do not change the `<h1>` "Premium SonicTech. Complete Dental Coverage." brand headline, the buttons, or any layout.)

- [ ] **Step 3: Build + verify the phrasing is present**

```bash
CI=true pnpm build
./node_modules/.bin/next start -p 3013 > /tmp/p2_home.log 2>&1 &
SRV=$!
curl --retry 40 --retry-delay 1 --retry-connrefused -sf http://localhost:3013/ -o /dev/null
HOME=$(curl -s http://localhost:3013/)
echo "$HOME" | grep -qiF 'electric toothbrush subscription' && echo "  subscription phrase OK" || echo "  MISSING"
echo "$HOME" | grep -qiF 'dental membership' && echo "  membership phrase OK" || echo "  MISSING"
kill $SRV 2>/dev/null
```
Expected: both phrases present.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Hero.tsx
git commit -m "feat(seo): weave electric-toothbrush-subscription + dental-membership into homepage hero copy"
```

---

### Task 5: Plans/pricing copy targeting

**Files:**
- Modify: `src/components/sections/PricingSection.tsx` (plan headings/intro copy only)

- [ ] **Step 1: Read the current pricing section copy**

Run: `grep -nE "section-title|section-subtitle|<h2|Choose|Perfect Plan|MAX|PRO|OCP|membership|plan" src/components/sections/PricingSection.tsx | head -20`
Identify the section heading + subtitle (e.g. "Choose Your Perfect Plan") and the plan name labels. Record exact current text.

- [ ] **Step 2: Sharpen the section subtitle** (preserve element; change only text)

Set the pricing section subtitle to include the "dental membership" phrasing, e.g.:
```
Pick the SLEEK dental membership that fits — every plan includes the sonic electric toothbrush subscription with quarterly refills.
```
And ensure each plan card's accessible name/heading reads as a membership (e.g. "MAX Dental Membership", "PRO Dental Membership", "OCP") — if the plan headings are just "MAX"/"PRO", append "Dental Membership" in the heading text. Change only text content, not structure/prices/Product schema.

- [ ] **Step 3: Build + verify**

```bash
CI=true pnpm build
./node_modules/.bin/next start -p 3013 > /tmp/p2_plans.log 2>&1 &
SRV=$!
curl --retry 40 --retry-delay 1 --retry-connrefused -sf http://localhost:3013/ -o /dev/null
curl -s http://localhost:3013/ | grep -qiF 'dental membership' && echo "  membership phrasing OK" || echo "  MISSING"
kill $SRV 2>/dev/null
```
Expected: phrasing present.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/PricingSection.tsx
git commit -m "feat(seo): plan copy targets dental-membership terms"
```

---

### Task 6: Internal links from blog posts → money pages

**Files:**
- Modify: `src/lib/blog.ts` (the `content` markdown of 3 relevant posts)

- [ ] **Step 1: Confirm markdown links render as anchors**

Run:
```bash
grep -nE "replace|\\[.*\\]\\(|href|<a|markdown|remark" src/components/blog/BlogContent.tsx | head
```
Confirm the content processor converts `[text](url)` markdown into `<a href>`. If it does NOT (only handles headings/paragraphs), STOP and report NEEDS_CONTEXT — the linking mechanism must be confirmed before editing content.

- [ ] **Step 2: Add one contextual link to each of 3 posts**

In `src/lib/blog.ts`, inside the `content` string of these posts, add ONE descriptive link near a relevant sentence (keyword anchor, not "click here"). Do not disturb existing markdown:
- `slug: 'sleek-dental-pro-membership'` → add: `Compare the [SLEEK Dental membership plans](/#plans) to find the right coverage.`
- `slug: 'charcoal-toothpaste-whitening'` → add: `A consistent routine is easier with a [sonic electric toothbrush subscription](/#plans) that ships fresh brush heads automatically.`
- `slug: 'understanding-oral-cancer'` → add: `Routine dental care matters — a [SLEEK dental membership](/#plans) includes coverage and a sonic toothbrush to help you stay on top of your oral health.`

(Place each within an existing paragraph so it reads naturally; keep to one link per post.)

> NOTE: all three blog links target `/#plans`, not `/market-programs/affiliates`. The affiliates page is for marketers, so linking patient-facing health articles to it would be an unnatural match (the spec said "where natural"). The affiliates page already receives site-wide inbound links from the footer ("For Affiliates"), which covers its internal-link authority; these new contextual links feed `/#plans`, which had none.

- [ ] **Step 3: Build + verify the links render**

```bash
CI=true pnpm build
./node_modules/.bin/next start -p 3013 > /tmp/p2_blog.log 2>&1 &
SRV=$!
curl --retry 40 --retry-delay 1 --retry-connrefused -sf http://localhost:3013/ -o /dev/null
curl -s http://localhost:3013/blog/sleek-dental-pro-membership | grep -qE '<a [^>]*href="/#plans"' && echo "  link renders as anchor OK" || echo "  LINK NOT RENDERED"
kill $SRV 2>/dev/null
```
Expected: the link renders as a real `<a href="/#plans">`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/blog.ts
git commit -m "feat(seo): internal links from blog posts to plans/affiliates"
```

---

### Task 7: Full validation & sign-off

**Files:** none (verification + report)

- [ ] **Step 1: Green toolchain**

Run: `CI=true pnpm test && pnpm exec tsc --noEmit && CI=true pnpm lint && CI=true pnpm build`
Expected: tests pass, tsc 0, lint 0 errors, build green.

- [ ] **Step 2: Visual QA (design unchanged)**

Start `next start -p 3013`; screenshot `/market-programs/affiliates` and `/` at desktop (1440) and mobile (390) widths. Confirm: new affiliate content reads cleanly and on-brand; hero/plans/conversion elements visually unchanged; no layout breakage. Note any visual regression as a finding.

- [ ] **Step 3: Rich Results + Lighthouse (manual, document)**

Rich Results Test on `/market-programs/affiliates` (FAQPage + BreadcrumbList, zero critical errors). Lighthouse SEO on `/` and `/market-programs/affiliates` (target 100). Record results.

- [ ] **Step 4: Keyword-presence summary**

Confirm via the running server: affiliates `<h1>` contains "Dental Affiliate Program"; homepage contains "electric toothbrush subscription" + "dental membership"; the 3 blog posts contain the new anchors. Record the grep results in the report.

- [ ] **Step 5: Commit any validation fixes** (only if Steps 1–2 required changes)

```bash
git add -A && git commit -m "chore(seo): phase 2 validation fixes"
```

---

## Done = Phase 2 success criteria

- Affiliates page: real keyword `<h1>`, substantive content, FAQ with valid FAQPage schema, breadcrumb, outbound internal links — no fabricated figures.
- Homepage + plans carry the target commercial phrasing; conversion + design unchanged.
- ≥3 blog posts link to money pages with descriptive anchors.
- All structured data valid; build/lint/test green; Lighthouse SEO 100.
