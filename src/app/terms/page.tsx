import { Metadata } from 'next';
import Script from 'next/script';
import TermsContent from '@/components/TermsContent';
import { createBreadcrumbSchema, createWebPageSchema, SITE_CONFIG } from '@/lib/schema';

/**
 * Terms and Conditions page metadata for SEO.
 *
 * Standard legal page metadata with clear title and description.
 * Includes canonical URL and proper indexing directives.
 */
export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description:
    'SLEEK Dental Club Terms and Conditions. Read our terms of service governing the use of our dental membership services and website.',
  openGraph: {
    title: 'Terms and Conditions | SLEEK Dental Club',
    description:
      'Terms of service governing the use of SLEEK Dental Club membership services.',
    url: 'https://www.sleekdentalclub.com/terms',
    siteName: 'SLEEK Dental Club',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms and Conditions | SLEEK Dental Club',
    description: 'Terms of service for SLEEK Dental Club membership services.',
  },
  alternates: {
    canonical: 'https://www.sleekdentalclub.com/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Creates JSON-LD structured data for the terms page.
 * Includes WebPage schema and BreadcrumbList for navigation context.
 *
 * @returns Combined schema object
 */
function createTermsPageSchemas() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Terms and Conditions', url: `${SITE_CONFIG.url}/terms` },
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      createWebPageSchema(
        'Terms and Conditions',
        'SLEEK Dental Club Terms and Conditions governing the use of our services.',
        `${SITE_CONFIG.url}/terms`
      ),
      createBreadcrumbSchema(breadcrumbs),
    ],
  };
}

/**
 * Terms and Conditions page server component.
 *
 * This server component exports metadata for SEO and renders the
 * TermsContent client component. JSON-LD structured data is
 * injected for WebPage and breadcrumb schemas.
 */
export default function TermsPage() {
  return (
    <>
      {/* JSON-LD Schema for terms page */}
      <Script
        id="terms-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createTermsPageSchemas()),
        }}
      />
      <TermsContent />
    </>
  );
}
