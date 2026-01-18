import { Metadata } from 'next';

/**
 * Layout for all test pages.
 *
 * This layout applies noindex/nofollow metadata to all pages under /test/*,
 * ensuring search engines do not index any development or testing pages.
 * This prevents "Excluded by 'noindex' tag" entries in Google Search Console
 * from being unexpected.
 *
 * All child pages automatically inherit this robots directive.
 */
export const metadata: Metadata = {
  title: {
    template: '%s | Test',
    default: 'Test Page',
  },
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Test pages layout wrapper.
 * Simply passes children through while applying the noindex metadata.
 */
export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
