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

  // NOTE: the 5 remaining blog posts (dental-emergencies-children, nutrition-oral-health,
  // understanding-cavities, understanding-gingivitis, sleek-ocp-overview) and any other
  // legacy URLs should be appended here once the full GSC "Not found (404)" export is
  // dropped in notes/GSC/. Infer the old slug from the post title (e.g. "Understanding Cavities"
  // → /understanding-cavities/). Add them as explicit entries following the same pattern; the
  // tests above will keep guarding invariants.
];
