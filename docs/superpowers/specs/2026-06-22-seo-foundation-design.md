# SLEEK Dental — SEO Foundation (Phase 1) + End-to-End Roadmap

- **Date:** 2026-06-22
- **Status:** Design approved → ready for implementation plan
- **Scope of this spec:** Phase 1 only (Technical SEO + Rich Results). Phases 2–5 are summarized as a roadmap; each gets its own spec → plan → build cycle.

## North-Star

Reclaim the rankings lost in the WordPress → Next.js migration, win the commercial dental / toothbrush-subscription search terms, and make the SERP listing visually dominant through rich results.

## Problem & Evidence (GSC export 2026-06-22 + code audit)

**Leaks:**
1. **Migration equity bleeding.** WP → Next changed URL slugs. Old WP URLs are still indexed — some ranking #1 (`/understanding-oral-cancer-…`) or pulling hundreds of impressions (`/does-charcoal-toothpaste-…`, 328 impr) — but now **404**. GSC: **33 "Not found (404)" + 7 "Page with redirect."** No redirect map exists in the codebase (`next.config.js` has none).
2. **www + non-www both indexed** → split ranking signals.
3. **Incomplete merchant data.** `Product`/`Offer` schema present but missing `shippingDetails` and `hasMerchantReturnPolicy`. Also missing `aggregateRating`/`review` — but **no real reviews exist**, so star markup is deferred to Phase 3 (fabrication risks a manual penalty).
4. **30 pages "crawled/discovered – currently not indexed."**
5. **Money keywords stuck page 2–7** despite real impressions: *electric toothbrush subscription* (pos 52), *toothbrush subscription* (66), *dental membership club* (43), *dental affiliate program* (753 impr, pos 23).

**Strengths to preserve:** brand terms rank well (*sleek dental insurance* pos 3.8 / 30% CTR). Structured-data foundation already solid (Organization, LocalBusiness, WebSite+SearchAction, FAQPage, Product, BreadcrumbList, Article in `src/lib/schema.ts`, 580 lines). **Zero critical rich-result errors** in GSC.

## End-to-End Roadmap

Each phase is an independent spec → plan → build cycle.

| Phase | Focus | Type | Headline outcome |
|---|---|---|---|
| **1 (this spec)** | Technical SEO + Rich Results | code | Stop the 404 bleed; complete merchant listings; single canonical host |
| 2 | On-page keyword optimization | code + content | Climb the money keywords already getting impressions |
| 3 | Reviews & ratings system | code + ops | Real reviews on-site → compliant ⭐ markup |
| 4 | Performance / Core Web Vitals | code | Green LCP/INP/CLS on the animation-heavy hero |
| 5 | Off-page & local | ops, ongoing | Google Business Profile, Affinity-network backlinks, citations |

## Phase 1 — Detailed Design

Four isolated, independently testable units.

### Unit 1 — Redirect & Canonical layer

- **`src/lib/redirects.ts`** exports a typed array of `{ source, destination, permanent }` consumed by `next.config.js` `redirects()`. Version-controlled, testable, served as Vercel edge 301/308 with zero runtime cost.
- **Explicit blog 301s (confirmed old → new):**
  | Old (WordPress) | New |
  |---|---|
  | `/does-charcoal-toothpaste-really-whiten-teeth-the-truth-behind-the-trend/` | `/blog/charcoal-toothpaste-whitening` |
  | `/understanding-oral-cancer-early-signs-symptoms-and-prevention/` | `/blog/understanding-oral-cancer` |
  | `/understanding-tooth-decay-causes-prevention-and-treatment/` | `/blog/understanding-tooth-decay` |
  | `/bleeding-gums-know-the-causes-symptoms-and-treatment/` | `/blog/bleeding-gums` |
  | `/introducing-sleek-dental-club/` | `/blog/introducing-sleek-dental-club` |
  | `/unlocking-the-benefits-of-sleek-dentals-pro-membership/` | `/blog/sleek-dental-pro-membership` |
- **Remaining blog posts** (`dental-emergencies-children`, `nutrition-oral-health`, `understanding-cavities`, `understanding-gingivitis`, `sleek-ocp-overview`): infer the old WP slug from the post title and confirm against the GSC 404 export before adding.
- **Page 301s (approved destinations):**
  | Old | New |
  |---|---|
  | `/pricing/` | `/#plans` |
  | `/contact-us/` | `/` (no contact page today) |
  | `/checkout-ocp/` | `https://enrollment.sleekdentalclub.com/onboarding` (cross-domain) |
  | `/privacy-policy/` | `/privacy` |
  | `/blog/` | `/blog` |
  | `/wp-content/uploads/2023/01/Sleek-OCP-TC.pdf` | `/images/Sleek-TC-Website.pdf` |
- **Pattern + catch-all:** legacy slugs not mapped explicitly fall through to a best-effort rule (legacy blog-style slug → `/blog`; unknown `/wp-content/*` → `/`) so **nothing 404s**. Explicit rules ordered before patterns; known-good new routes excluded so no redirect can target a path that itself redirects (loop-free).
- **Canonical host:** **www** is canonical. Verify Vercel 301s apex → www (code already emits www canonicals via `metadataBase`/`schema.ts`). If Vercel is not enforcing it, add a host-based redirect.
- **Sourcing completeness:** ship the map above immediately; reconcile against the full GSC "Not found (404)" + "Page with redirect" URL export (to be dropped in `notes/GSC/`) to make it exhaustive.

### Unit 2 — Crawl / Index hygiene

- **`src/app/sitemap.ts`:** include only canonical www URLs; real `lastModified` (blog dates / git); sensible `priority`/`changeFrequency`; exclude `/test*`, `/marketing*`, `/aobg`, and any `noindex` route.
- **`src/app/robots.ts`:** allow crawl, reference the sitemap, ensure nothing important is disallowed.
- Investigate the **2× "Blocked due to access forbidden (403)"** and **1× "Blocked by robots.txt"** and resolve or intentionally document.
- Seed a handful of contextual internal links toward "crawled/discovered – not indexed" pages (heavier treatment lands in Phase 2).

### Unit 3 — Structured-data enrichment (no stars in Phase 1)

In `src/lib/schema.ts`:
- **Add to each `Offer`:** `shippingDetails` (`OfferShippingDetails`: free shipping, US) and `hasMerchantReturnPolicy` (`MerchantReturnPolicy`: 30-day, returnable) — using the real on-site values (free shipping, 30-day guarantee). Clears the GSC merchant-listing warnings.
- **Product representation (resolved):** model each **membership plan** (OCP / PRO / MAX, real prices) as a `Product` with the included toothbrush kit, so merchant listings map onto what is actually purchased. *(Open to veto in favor of a single toothbrush-kit Product.)*
- **Verify each schema actually emits and validates** (Google Rich Results Test): FAQPage rendered on the homepage; `Article`/`BlogPosting` has `author`, `datePublished`, `dateModified`, `image`, `headline`; `BreadcrumbList` on all subpages; `Organization` logo + `sameAs`.
- **`WebSite` `SearchAction` (sitelinks searchbox):** keep only if it points at a real, working search endpoint; otherwise remove (an unfulfillable SearchAction is ignored at best).
- **Defer to Phase 3:** `aggregateRating` + `review` (no real review data yet).

### Unit 4 — Metadata polish

- Unique, CTR-tuned `title` + `description` per route (templated via `generateMetadata`), front-loading value props + brand.
- Per-page Open Graph / Twitter images.
- Self-referencing **www** canonical on every page.

## Data Flow

- **Redirects:** request → `next.config.js redirects()` → 301/308 → new URL. Resolved at the edge; no React/runtime involvement.
- **Structured data:** server components inject `<script type="application/ld+json">` from `schema.ts` builders.
- **Sitemap / robots:** `sitemap.ts` / `robots.ts` route handlers generate output at build/request.

## Error Handling & Safety

- **No redirect loops:** never map a URL to itself or to another mapped source; exclude live new routes from pattern/catch-all matches.
- **Catch-all must not shadow valid routes:** explicit rules first, patterns last, with negative conditions for known-good paths.
- **No fabricated data:** shipping/return values must match the real policy; ratings/reviews stay out until Phase 3.
- **Cross-domain redirect** (`/checkout-ocp/` → enrollment) verified to resolve, not loop.

## Testing & Validation

1. `pnpm build` passes; `pnpm lint` + `tsc` clean.
2. **Automated redirect test:** a script curls every `source` in `redirects.ts` against the local/preview server and asserts a 301/308 to the expected `destination` with no chains/loops.
3. **Google Rich Results Test** on homepage, a plan/product page, and a blog post — zero critical errors; merchant warnings cleared.
4. **Lighthouse SEO = 100** on key templates.
5. Resubmit sitemap in GSC; mark the 404 + merchant issues "validate fix"; monitor.

## Success Criteria (Phase 1 "done")

- Zero unhandled legacy 404s — every known old URL 301s to a sensible destination.
- Single canonical host (www); apex 301s to www.
- GSC merchant-listing warnings (`shippingDetails`, `hasMerchantReturnPolicy`) cleared.
- All structured data passes the Rich Results Test with no critical errors.
- Lighthouse SEO 100 on home / plan / blog templates.

## Out of Scope (Phase 1)

Keyword/content rewriting (Phase 2), review collection + star markup (Phase 3), Core Web Vitals work (Phase 4), off-page/local/GBP (Phase 5).

## Open Items to Confirm During Implementation

- Full GSC "Not found (404)" + "Page with redirect" URL export → reconcile into `redirects.ts`.
- Old WP slugs for the 5 remaining blog posts.
- Whether Vercel already enforces apex → www.
- `Product` = membership plans (chosen) vs. standalone toothbrush kit.
- `WebSite` `SearchAction`: real search endpoint or remove.
