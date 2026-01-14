import { Metadata } from 'next';
import SitemapPageClient from './SitemapPageClient';

/**
 * Metadata for the Sitemap page.
 * Provides SEO information for search engines.
 */
export const metadata: Metadata = {
  title: 'Sitemap | SLEEK Dental Club',
  description: 'Explore all pages and content on SLEEK Dental Club. Browse our membership plans, blog articles, and resources.',
  openGraph: {
    title: 'Sitemap | SLEEK Dental Club',
    description: 'Explore all pages and content on SLEEK Dental Club.',
    type: 'website',
  },
};

/**
 * Sitemap page component.
 * Renders a comprehensive, interactive sitemap showcasing all site content.
 * Includes visual hierarchy, blog grid with filters, and search functionality.
 */
export default function SitemapPage() {
  return <SitemapPageClient />;
}
