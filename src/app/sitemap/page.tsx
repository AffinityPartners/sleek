import { Metadata } from 'next';
import Script from 'next/script';
import SitemapPageClient from './SitemapPageClient';
import { createBreadcrumbSchema, createWebPageSchema, SITE_CONFIG } from '@/lib/schema';

/**
 * Metadata for the Sitemap page.
 * Provides SEO information for search engines with canonical URL.
 */
export const metadata: Metadata = {
  title: 'Sitemap',
  description:
    'Explore all pages and content on SLEEK Dental Club. Browse our membership plans, blog articles, partner programs, and resources.',
  openGraph: {
    title: 'Sitemap | SLEEK Dental Club',
    description: 'Explore all pages and content on SLEEK Dental Club.',
    url: 'https://sleekdentalclub.com/sitemap',
    siteName: 'SLEEK Dental Club',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Sitemap | SLEEK Dental Club',
    description: 'Browse all SLEEK Dental Club pages and content.',
  },
  alternates: {
    canonical: 'https://sleekdentalclub.com/sitemap',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Creates JSON-LD structured data for the sitemap page.
 * Includes WebPage schema and BreadcrumbList for navigation context.
 *
 * @returns Combined schema object
 */
function createSitemapPageSchemas() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Sitemap', url: `${SITE_CONFIG.url}/sitemap` },
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      createWebPageSchema(
        'Sitemap',
        'Browse all pages and content on SLEEK Dental Club website.',
        `${SITE_CONFIG.url}/sitemap`
      ),
      createBreadcrumbSchema(breadcrumbs),
    ],
  };
}

/**
 * Sitemap page server component.
 * Renders a comprehensive, interactive sitemap showcasing all site content.
 * Includes visual hierarchy, blog grid with filters, and search functionality.
 */
export default function SitemapPage() {
  return (
    <>
      {/* JSON-LD Schema for sitemap page */}
      <Script
        id="sitemap-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createSitemapPageSchemas()),
        }}
      />
      <SitemapPageClient />
    </>
  );
}
