# SLEEK Dental — SEO Phase 2: On-Page Optimization + Internal Linking

- **Date:** 2026-06-23
- **Status:** Design approved → ready for implementation plan
- **Scope:** Phase 2 of the SEO roadmap. Deep-optimize **existing** pages + internal linking. New landing pages and net-new blog content are explicitly **Phase 2b** (separate cycle).

## North-Star

Climb the commercial money-keywords that already pull impressions by maximizing the ranking of pages that already exist — biggest impression pools first. No new pages, no content burden on the owner (all copy generated from existing product facts).

## Problem & Evidence (GSC 2026-06-22 + code audit)

- **`/market-programs/affiliates` is thin.** It renders only a hero + a contact form — no real `<h1>`, ~2 headings, no FAQ, no page-specific schema. Yet *"dental affiliate program"* + *"dental affiliate programs"* = **~960 impressions at position ~23**. A thin page is why it's stuck on page 3.
- **The homepage is spread thin** — 2,362 impressions at ~pos 11, trying to rank for membership + insurance + toothbrush + subscription simultaneously, so it maxes out for none.
- **Blog posts link to no money pages.** Zero internal links from `/blog/*` to `/market-programs/*` or `/#plans` — wasted internal authority.
- Plan-specific terms (*"max dental club,"* *"pro dental"*) and *"dental membership club"* (pos 43) have only the broad homepage.

## Guiding Principle

**SEO-additive, not a redesign.** Preserve the existing visual design and conversion flow. Add/sharpen headings, body copy, FAQ sections, structured data, and internal links. Surgical edits, not rewrites.

## Constraints

- **No fabricated program terms or figures.** Affiliate commission rates, payout schedules, and legal terms must come from existing site copy or be stated generally (e.g. "competitive recurring commissions") — never invented. (Same discipline as Phase 1's no-fabricated-reviews.)
- **Preserve homepage conversion + brand message** — homepage changes are surgical keyword/heading alignment, not a hero rewrite.
- **No new routes/pages**, no net-new blog posts (Phase 2b).
- Canonical host stays `https://www.sleekdentalclub.com`; reuse the existing `schema.ts` builders (`createFaqSchema`, `createBreadcrumbSchema`).

## Unit 1 — Affiliates page content build-out *(priority — the 960-impression lever)*

Target: **"dental affiliate program"** / "dental affiliate programs" / "dental health affiliate programs."

`/market-programs/affiliates` (and its components) gains real, keyword-targeted content **between the existing hero and contact form**, without disturbing them:
- A proper **`<h1>`** containing "Dental Affiliate Program."
- Content sections (concise, scannable, on-brand): **What the program is · How it works (steps) · What you earn (general/from existing copy — no invented rates) · Who it's for (bloggers, dentists, health & wellness creators, agencies) · Why promote SLEEK.**
- An **FAQ section** (4–6 Q&As) wired to **`FAQPage` schema** via the existing `createFaqSchema` builder. Candidate questions: *What is the SLEEK dental affiliate program? · How do affiliates earn? · Who can join? · Is it free to join? · What can I promote? · How do payouts work?* (answers from existing facts / general).
- **`BreadcrumbList` schema** for the page.
- **Internal links** out to `/#plans` (what affiliates promote) and to a relevant blog post.
- Implementer must **reconcile with existing affiliate copy** first (the hero/contact form may already state real terms) and reuse them rather than inventing.

## Unit 2 — Homepage targeting sharpen

Surgical alignment so the homepage ranks better for *"dental membership club,"* *"electric toothbrush subscription,"* *"toothbrush subscription"* without harming conversion:
- Ensure the primary `<h1>` / section headings include the high-value phrasing where natural (e.g. a section heading using "electric toothbrush subscription" / "dental membership").
- Tighten "subscription" framing in existing copy (quarterly refills = a subscription).
- Verify the homepage **FAQ (`FaqAccordion`) emits `FAQPage` schema** and its questions target real queries (e.g. "does dental insurance cover an electric toothbrush?"-style phrasing where truthful).

## Unit 3 — Plans/pricing copy optimization

In `PricingSection`: ensure plan headings/copy carry plan-+-club phrasing (*"MAX dental membership,"* *"PRO dental plan"*) for *"max dental club"* etc. `Product` schema already shipped in Phase 1 — no schema change, copy only.

## Unit 4 — Internal-linking architecture

Hub-and-spoke so authority flows to the money pages:
- Add **contextual in-body links** from relevant `/blog/*` posts → `/#plans` and `/market-programs/affiliates` using **descriptive keyword anchors** (e.g. "SLEEK dental membership plans," not "click here").
- Add links from relevant homepage sections to the affiliates page where natural.
- Keep it natural and sparse (1–2 per source); no link stuffing.

## Data Flow / Architecture

- Content lives in the existing page/section components (React/TSX). FAQ/breadcrumb JSON-LD injected via existing `schema.ts` builders as `<script type="application/ld+json">`.
- No new routes, no data sources; reuse `blog.ts`, `schema.ts`, existing components.

## Testing & Validation

1. `pnpm test` + `tsc --noEmit` + `pnpm lint` + `pnpm build` all green.
2. **Rich Results Test** on the affiliates page → FAQPage + BreadcrumbList valid, no errors.
3. **Visual QA** (screenshot affiliates + homepage desktop/mobile) → design unchanged, new content reads cleanly, conversion elements intact.
4. **Keyword presence check** — assert target phrases appear in the rendered `<h1>`/headings of their mapped pages (lightweight test or grep on built HTML).
5. Lighthouse SEO 100 on affiliates + homepage.

## Success Criteria

- Affiliates page has a real `<h1>`, substantive keyword-targeted content, an FAQ with valid FAQPage schema, breadcrumb, and outbound internal links — no fabricated program figures.
- Homepage/plans headings carry the target commercial phrasing without conversion regressions.
- Blog posts link to money pages with descriptive anchors (≥ the relevant posts).
- All structured data valid; design visually unchanged; build/lint/test green; Lighthouse SEO 100.
- (Ranking movement is the real-world outcome, measured in GSC over the following weeks — not a build-time gate.)

## Out of Scope (→ Phase 2b)

New landing pages for *"electric toothbrush subscription"* / *"toothbrush subscription"*; net-new blog posts for informational queries; the other market-program pages' build-out (dentists/groups/agents); off-page/links work (Phase 5).
