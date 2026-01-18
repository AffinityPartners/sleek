/**
 * Dynamic Robots.txt Generator for SLEEK Dental Club
 *
 * This file generates the robots.txt at build time using Next.js 13+ conventions.
 * It provides better maintainability than a static robots.txt file and ensures
 * the sitemap URL is always correct.
 *
 * Blocked paths:
 * - /test/* - Development and testing pages
 * - /api/* - API routes (should not be crawled)
 * - /marketing/example - Internal template page
 *
 * Note: The dynamic /marketing/[pageName] route is not blocked here because
 * it would require blocking all of /marketing/*, which might be undesirable
 * if specific marketing pages need to be indexed in the future.
 * Instead, those pages have noindex meta tags via the layout.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import { MetadataRoute } from 'next';

/**
 * Generates the robots.txt content for the site.
 *
 * @returns Robots.txt configuration object
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/test/',
          '/api/',
          '/marketing/example',
        ],
      },
    ],
    sitemap: 'https://sleekdentalclub.com/sitemap.xml',
    host: 'https://sleekdentalclub.com',
  };
}
