import { Metadata } from 'next';
import Script from 'next/script';
import PrivacyContent from '@/components/PrivacyContent';
import { createBreadcrumbSchema, createWebPageSchema, SITE_CONFIG } from '@/lib/schema';

/**
 * Privacy Policy page metadata for SEO.
 *
 * Standard legal page metadata with clear title and description.
 * Includes canonical URL and proper indexing directives.
 */
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'SLEEK Dental Club Privacy Policy. Learn how we collect, use, and protect your personal information when you use our dental membership services.',
  openGraph: {
    title: 'Privacy Policy | SLEEK Dental Club',
    description:
      'Learn how SLEEK Dental Club collects, uses, and protects your personal information.',
    url: 'https://sleekdentalclub.com/privacy',
    siteName: 'SLEEK Dental Club',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | SLEEK Dental Club',
    description: 'Learn how SLEEK Dental Club protects your personal information.',
  },
  alternates: {
    canonical: 'https://sleekdentalclub.com/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Creates JSON-LD structured data for the privacy policy page.
 * Includes WebPage schema and BreadcrumbList for navigation context.
 *
 * @returns Combined schema object
 */
function createPrivacyPageSchemas() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Privacy Policy', url: `${SITE_CONFIG.url}/privacy` },
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      createWebPageSchema(
        'Privacy Policy',
        'SLEEK Dental Club Privacy Policy describing our data collection and use practices.',
        `${SITE_CONFIG.url}/privacy`
      ),
      createBreadcrumbSchema(breadcrumbs),
    ],
  };
}

/**
 * Privacy Policy page server component.
 *
 * This server component exports metadata for SEO and renders the
 * PrivacyContent client component. JSON-LD structured data is
 * injected for WebPage and breadcrumb schemas.
 */
export default function PrivacyPage() {
  return (
    <>
      {/* JSON-LD Schema for privacy page */}
      <Script
        id="privacy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createPrivacyPageSchemas()),
        }}
      />
      <PrivacyContent />
    </>
  );
}
