/**
 * Dynamic Sitemap Generator for SLEEK Dental Club
 *
 * This file generates the sitemap.xml at build time using Next.js 13+ conventions.
 * It automatically pulls all valid, indexable pages and blog posts.
 *
 * Benefits over static sitemap:
 * - Always up-to-date with actual routes
 * - Excludes test/dev/marketing pages automatically
 * - Blog posts are pulled dynamically from the data source
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

/**
 * Base URL for all sitemap entries.
 * Used to construct absolute URLs for each page.
 */
const BASE_URL = 'https://sleekdentalclub.com';

/**
 * Static pages that should be included in the sitemap.
 * Each entry includes the path, change frequency, and priority.
 *
 * Priority scale:
 * - 1.0: Homepage (most important)
 * - 0.9: High-traffic pages (blog listing)
 * - 0.8: Important pages (market programs, sitemap)
 * - 0.7: Secondary pages (aobg)
 * - 0.5: Low-priority pages (terms, privacy)
 *
 * Excluded pages (not in sitemap):
 * - /test/* (development/testing pages)
 * - /marketing/* (internal marketing templates)
 * - /api/* (API routes)
 */
const STATIC_PAGES: Array<{
  path: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}> = [
  { path: '', changeFrequency: 'daily', priority: 1.0 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.9 },
  { path: '/sitemap', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/market-programs/groups', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/market-programs/dentists', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/market-programs/affiliates', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/market-programs/agents', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/aobg', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.5 },
];

/**
 * Generates the sitemap for the entire site.
 *
 * This function is called by Next.js at build time to generate sitemap.xml.
 * It combines static pages with dynamically generated blog post URLs.
 *
 * @returns Array of sitemap entries with url, lastModified, changeFrequency, and priority
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Get current date for lastModified on static pages
  const currentDate = new Date();

  // Generate static page entries
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Generate blog post entries from the blog data source
  const blogPosts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Combine all entries and return
  return [...staticEntries, ...blogEntries];
}
