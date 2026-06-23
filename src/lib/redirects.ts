/**
 * 301 redirect map: legacy WordPress URLs -> current Next.js routes.
 * Consumed by next.config.ts `redirects()`. Reclaims ranking equity from the
 * WP -> Next migration (GSC 2026-06-22: 33 "Not found" + 7 bad redirects).
 *
 * Ordering: explicit entries first, then pattern/catch-all rules. The catch-all
 * matches ONLY legacy shapes (long top-level slugs, /wp-content/*) so it can
 * never shadow a live route.
 *
 * NOTE: Sources are listed WITHOUT trailing slashes. With `trailingSlash: false`
 * in next.config.ts, Next.js strips trailing slashes before custom redirect
 * matching fires. WordPress URLs arriving with trailing slashes get normalized
 * first (308 strip), then the custom redirect fires on the slash-free URL.
 */
export type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
  basePath?: false;
};

export const legacyRedirects: LegacyRedirect[] = [
  // --- Blog posts (old WP slug -> new /blog/* slug) ---
  { source: '/does-charcoal-toothpaste-really-whiten-teeth-the-truth-behind-the-trend', destination: '/blog/charcoal-toothpaste-whitening', permanent: true },
  { source: '/understanding-oral-cancer-early-signs-symptoms-and-prevention', destination: '/blog/understanding-oral-cancer', permanent: true },
  { source: '/understanding-tooth-decay-causes-prevention-and-treatment', destination: '/blog/understanding-tooth-decay', permanent: true },
  { source: '/bleeding-gums-know-the-causes-symptoms-and-treatment', destination: '/blog/bleeding-gums', permanent: true },
  { source: '/introducing-sleek-dental-club', destination: '/blog/introducing-sleek-dental-club', permanent: true },
  { source: '/unlocking-the-benefits-of-sleek-dentals-pro-membership', destination: '/blog/sleek-dental-pro-membership', permanent: true },
  { source: '/how-to-handle-dental-emergencies-in-children-a-parents-guide', destination: '/blog/dental-emergencies-children', permanent: true },
  { source: '/the-role-of-nutrition-and-oral-health', destination: '/blog/nutrition-oral-health', permanent: true },
  { source: '/unlocking-your-smiles-potential-with-sleek-ocp', destination: '/blog/sleek-ocp-overview', permanent: true },

  // --- Pages ---
  // Sources are de-slashed: with `trailingSlash: false`, Next normalizes trailing slashes before redirect matching, so trailing-slash sources never match.
  { source: '/pricing', destination: '/#plans', permanent: true },
  { source: '/contact-us', destination: '/', permanent: true },
  { source: '/privacy-policy', destination: '/privacy', permanent: true },
  { source: '/checkout-ocp', destination: 'https://enrollment.sleekdentalclub.com/onboarding', permanent: true, basePath: false },
  { source: '/terms-and-conditions', destination: '/terms', permanent: true },
  { source: '/marketing-programs', destination: '/market-programs/affiliates', permanent: true },
  { source: '/confirmation', destination: '/', permanent: true },
  // Removed route (was a homepage duplicate) -> send to home instead of 404.
  { source: '/aobg', destination: '/', permanent: true },

  // --- Legacy WordPress asset PDFs ---
  { source: '/wp-content/uploads/2023/01/Sleek-OCP-TC.pdf', destination: '/images/Sleek-TC-Website.pdf', permanent: true, basePath: false },

  // Reconciled against the full GSC "Not found (404)" export (2026-06-23). The
  // understanding-cavities / understanding-gingivitis posts have NO 404ing legacy URL
  // (Google never indexed an old path for them), so they need no redirect. WordPress
  // taxonomy archives (/category/*, /tag/*) and defunct Avada/Fusion theme-builder URLs
  // (/element_category/*, /fusion_tb_category/*, /slide*, /comments/*) are handled by
  // pattern rules in next.config.ts redirects().
];
