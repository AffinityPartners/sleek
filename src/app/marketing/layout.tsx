import { Metadata } from 'next';

/**
 * Layout for all marketing pages.
 *
 * This layout applies noindex/nofollow metadata to all pages under /marketing/*,
 * ensuring search engines do not index internal marketing templates and landing pages.
 * This prevents "Soft 404" issues in Google Search Console from thin content pages
 * created by the dynamic [pageName] route.
 *
 * Marketing pages are intended for:
 * - Internal template development
 * - Partner-specific landing pages (shared via direct links)
 * - Campaign testing
 *
 * All child pages automatically inherit this robots directive.
 */
export const metadata: Metadata = {
  title: {
    template: '%s | Marketing',
    default: 'Marketing Page',
  },
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Marketing pages layout wrapper.
 * Simply passes children through while applying the noindex metadata.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
