# SLEEK Dental — SEO Phase 2b: Toothbrush-Subscription Landing Page + Insurance-Question Post

- **Date:** 2026-06-23
- **Status:** Design approved → ready for implementation plan
- **Scope:** Phase 2b of the SEO roadmap. The net-new content explicitly deferred from Phase 2: **one commercial landing page** for the toothbrush-subscription keyword cluster + **one informational blog post** for the highest-impression uncovered question, plus internal links wiring them in.

## North-Star

Capture the commercial "toothbrush subscription" query cluster (~190 impressions, scattered across the homepage at positions 15–66 with no dedicated page) by giving it a single focused, conversion-oriented landing page; and capture the 127-impression "does dental insurance cover electric toothbrush" question with a dedicated post that funnels readers to plans. All copy generated from existing product facts — no content burden on the owner, nothing fabricated.

## Problem & Evidence (GSC Queries 2026-06-22 + code audit)

**Commercial toothbrush-subscription cluster — no dedicated page, only the homepage ranks for it (poorly):**

| Query | Impr | Avg pos |
|---|---|---|
| toothbrush subscription | 51 | 66.3 |
| best subscription plan for electric toothbrush refills | 31 | 15.4 |
| electric toothbrush subscription | 23 | 52.7 |
| best toothbrush subscription service | 18 | 46.8 |
| electric toothbrush subscription service | 17 | 51.8 |
| subscription toothbrush | 12 | 55.4 |
| affordable toothbrush and oral care subscription plans | 13 | 14.2 |
| best deals adult toothbrush subscription plans | 9 | 15.4 |
| sleek electric toothbrush | 9 | 16.3 |

≈190 combined impressions with no page built to win them. The homepage tries to rank for membership + insurance + toothbrush + subscription at once, so it maxes out for none of them.

**Informational standout — no content exists:**

| Query | Impr | Avg pos |
|---|---|---|
| does dental insurance cover electric toothbrush | 127 | 19.6 |

The single biggest uncovered query on the site after the affiliate terms (handled in Phase 2). It is a literal question at the top of page 2 — strong featured-snippet / page-1 potential, and it ties directly to SLEEK's value proposition (the membership *includes* the brush + refills, unlike insurance).

**Already covered (no action this phase):** `bleeding-gums` and `charcoal-toothpaste-whitening` posts already exist and rank (weakly, pos 30–90) — refreshing them is lower-value and explicitly out of scope here.

## Key Product Facts (source of truth for all copy — from `PricingSection.tsx`)

- **CLUB** — "Smart toothbrush with quarterly refills", $39.95 welcome kit, CTA `https://enrollment.sleekdentalclub.com/product-details`. **This plan is the literal "toothbrush subscription"** the cluster is searching for; the landing page leads with it.
- **OCP** — "Oral Care Plan with dental savings", $25 enrollment, CTA `https://enrollment.sleekdentalclub.com/onboarding`.
- **PRO** — "Dental insurance by MetLife", $25.
- **MAX** — "Premium MetLife coverage for families", $25.

## Guiding Principle

**Additive, pattern-following, no redesign.** Build the new page and post using the existing components, schema builders, and data-module conventions already in the codebase (the affiliates page + `affiliate-content.ts` is the landing-page template; `BLOG_POSTS` in `blog.ts` is the post model). Reuse, don't reinvent. Homepage stays as-is (it targets brand + membership); we link it *to* the new page so there is no cannibalization — the focused page becomes the canonical answer for the cluster.

## Constraints

- **No fabricated facts or figures.** Plan names, prices, what's included, and enrollment CTAs come verbatim from `PricingSection.tsx`. Insurance / FSA / HSA statements are made **generally** ("standard dental insurance generally does not cover electric toothbrushes"; "most FSA/HSA plans exclude general-use toothbrushes — check your plan") — never invented specifics. Same discipline as Phase 1's no-fabricated-reviews and Phase 2's no-invented-commissions.
- **Canonical host** stays `https://www.sleekdentalclub.com`. All new URLs, sitemap entries, and OG/canonical tags use it.
- **Reuse existing builders/components:** `createFaqSchema`, `createBreadcrumbSchema`, `createAllProductSchemas` (`src/lib/schema.ts`); `MarketProgramHero`, `PricingSection`, `StickyNav`, `Footer`; the `*-content.ts` data-module pattern; the `BlogPost` interface + `BLOG_POSTS` array.
- **Preserve the existing visual design and conversion flow.** Reused components are dropped in unmodified where possible.

## Unit 1 — `/electric-toothbrush-subscription` landing page *(priority — the ~190-impression lever)*

Target keywords: *electric toothbrush subscription · toothbrush subscription · subscription toothbrush · electric toothbrush subscription service · best toothbrush subscription service · best subscription plan for electric toothbrush refills.*

A new server-component route at `src/app/electric-toothbrush-subscription/page.tsx`, following the affiliates-page pattern (`export const metadata` + JSON-LD `<Script>` tags + section components):

- **Hero** — reuse `MarketProgramHero` with a keyword `<h1>` containing **"Electric Toothbrush Subscription"**, a subhead framing the sonic brush + quarterly refills as a single subscription, and benefit bullets drawn **only from the verified CLUB plan features in `PricingSection.tsx`**: sonic toothbrush (5 modes), quarterly brush-head + 50 floss-pick refills, "Free Shipping in Contiguous US", "Cancel Anytime". (All four are shipped CLUB features — source of truth.) **Do not assert any term not present in `PricingSection` CLUB copy** — omit rather than invent.
- **`SubscriptionContent`** — a new server component (`src/components/toothbrush-subscription/SubscriptionContent.tsx`) with scannable sections: **What it is · How the subscription works** (welcome kit → quarterly brush-head/floss refills auto-ship) **· What's included · Why a subscription beats buying brushes at retail.** Leads with the **CLUB** plan as the literal answer and notes it sits within the broader membership lineup.
- **Plans** — reuse `<PricingSection />` wholesale (it takes no props): real CLUB/OCP/PRO/MAX cards with their real `enrollment.sleekdentalclub.com` CTAs. This delivers the "drive to plans + enrollment" conversion goal and carries the existing Product schema styling.
- **FAQ** — 4–6 Q&As wired to **`FAQPage` schema** via `createFaqSchema`. Candidate questions, each answerable from established facts only: *How does the SLEEK toothbrush subscription work? · What's included in the subscription? · How often do refills ship? · How much does it cost? · Is shipping free? · Is it just a toothbrush, or dental coverage too?* (Any question whose honest answer would require an unverified term — e.g. cancellation policy — is dropped, not guessed.)
- **Structured data injected on the page:** `FAQPage` (from the page FAQs), `BreadcrumbList` (Home → Electric Toothbrush Subscription), and the product graph via `createAllProductSchemas()` (the page displays the plans, so it should carry the same Product schema the homepage does).
- `StickyNav` + `Footer`, matching the affiliates page.
- **Content/FAQ/breadcrumb data** lives in `src/lib/toothbrush-subscription-content.ts` (mirrors `affiliate-content.ts`): exported `subscriptionFaqs: FaqItem[]`, `subscriptionBreadcrumb: BreadcrumbItem[]`, and any section copy arrays.

## Unit 2 — Blog post: "Does Dental Insurance Cover an Electric Toothbrush?" *(127 impr, pos ~19.6)*

A new entry appended to `BLOG_POSTS` in `src/lib/blog.ts`:

- **slug:** `does-dental-insurance-cover-electric-toothbrush` (exact-match the query)
- **title:** "Does Dental Insurance Cover an Electric Toothbrush?"
- **category/tags:** `health` category; tags include `insurance`, `products`, `membership` (all existing keys).
- **image:** reuse the existing `/images/SLEEK-ToothBrush.jpg` (a real file in `public/`) as the featured image — no new asset. If it renders poorly in the blog card aspect ratio during visual QA, fall back to another existing `/blog/*.jpg`.
- **content (HTML, like the other posts):** opens with a **crisp direct answer** in the first paragraph for featured-snippet eligibility — standard dental insurance generally treats electric toothbrushes as an out-of-pocket purchase, not a covered benefit; most FSA/HSA plans exclude general-use toothbrushes, so check your specific plan (stated generally, nothing fabricated). The body then explains *why* (insurance covers treatment/procedures, not devices) and pivots to SLEEK's different model: a membership/CLUB subscription that **includes** the sonic brush + quarterly refills for one predictable price.
- **Schema:** Article schema is emitted automatically by `BlogPostClient` (`createArticleSchema`) — no extra wiring. Metadata (title/description/OG/canonical) is generated automatically by the `[slug]` route from `title` + `excerpt`.
- **Internal links (in-body):** to **`/electric-toothbrush-subscription`** (descriptive anchor, e.g. "SLEEK's electric toothbrush subscription") and to **`/#plans`**.

## Unit 3 — Internal-linking architecture

Wire the new assets into the existing hub-and-spoke so authority flows to the money page:

- New blog post → `/electric-toothbrush-subscription` + `/#plans` (descriptive anchors, in-body).
- New landing page → the new blog post (natural anchor for the insurance angle, e.g. in the FAQ or content body).
- Homepage → **one** contextual link to `/electric-toothbrush-subscription` from a relevant existing section (e.g. the product/tech highlight or the pricing intro), using a descriptive anchor. Sparse and natural — no link stuffing.

## Unit 4 — Sitemap + discoverability

- Add `/electric-toothbrush-subscription` to `STATIC_PAGES` in `src/app/sitemap.ts` with `priority: 0.9` (high commercial value), `changeFrequency: 'monthly'`.
- The new blog post is included in the sitemap automatically via `getAllPosts()`.
- Update `src/lib/__tests__/sitemap.test.ts` to assert the new landing route is present and on the canonical host.

## Data Flow / Architecture

- Landing page: server component → reads `subscriptionFaqs` / `subscriptionBreadcrumb` from `toothbrush-subscription-content.ts`, renders `MarketProgramHero` + `SubscriptionContent` + `PricingSection` + FAQ markup, injects `FAQPage` / `BreadcrumbList` / product JSON-LD via `<Script type="application/ld+json">` using existing `schema.ts` builders.
- Blog post: pure data addition to `BLOG_POSTS`; the existing `[slug]` route + `BlogPostClient` handle static generation, metadata, Article schema, and rendering. No route or component changes for the post.
- No new data sources, no new dependencies, no schema-builder changes.

## Testing & Validation

1. `pnpm test` + `tsc --noEmit` + `pnpm lint` + `pnpm build` all green.
2. **Keyword-presence test** — assert the rendered landing-page `<h1>` contains "Electric Toothbrush Subscription" (lightweight test or build-HTML grep), and the new post is reachable at its slug.
3. **Sitemap test** (updated) — `/electric-toothbrush-subscription` present and on the www host.
4. **Rich Results Test** (post-deploy) on `/electric-toothbrush-subscription` → FAQPage + BreadcrumbList + Product valid; on `/blog/does-dental-insurance-cover-electric-toothbrush` → Article valid.
5. **Visual QA** — landing page (desktop/mobile) reads cleanly, plan cards + enrollment CTAs intact; post renders like the other posts.
6. Lighthouse SEO 100 on the new landing page.

## Success Criteria

- A new `/electric-toothbrush-subscription` page exists with a keyword `<h1>`, subscription-focused content, the real plan cards driving to enrollment, an FAQ with valid FAQPage schema, BreadcrumbList + Product schema, and outbound internal links — no fabricated facts.
- A new "Does Dental Insurance Cover an Electric Toothbrush?" post exists, answers the query directly up top, carries Article schema automatically, and links to the landing page + `/#plans`.
- Homepage links to the new landing page once, naturally.
- Sitemap includes the new page; all structured data valid; build/lint/test green; Lighthouse SEO 100.
- (Ranking movement is the real-world outcome, measured in GSC over the following weeks — not a build-time gate.)

## Out of Scope (→ later phases)

- Refreshing the existing thin `bleeding-gums` / `charcoal-toothpaste-whitening` posts.
- `FAQPage` schema on the blog post (Article only; the blog system has no FAQ-on-post support and adding it is unjustified scope here).
- The other market-program pages (dentists/groups/agents) build-out.
- Reviews/ratings (Phase 3), Core Web Vitals (Phase 4), off-page/local/GBP (Phase 5).
