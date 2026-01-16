import { Metadata } from 'next';
import Script from 'next/script';
import HomeContent from '@/components/HomeContent';
import { createHomepageSchemaGraph } from '@/lib/schema';

/**
 * Homepage metadata configuration for SEO.
 *
 * Optimized for search visibility targeting dental membership, electric toothbrush,
 * and dental insurance keywords. Includes comprehensive Open Graph and Twitter cards
 * for social sharing.
 */
export const metadata: Metadata = {
  title: 'SLEEK Dental Club | Premium Electric Toothbrush + Dental Coverage Membership',
  description:
    'Transform your oral care with SLEEK Dental Club. Get a premium sonic electric toothbrush kit, quarterly refills, and dental insurance options with MetLife. Plans starting at $19.95/month.',
  keywords: [
    'dental membership',
    'electric toothbrush subscription',
    'dental insurance',
    'MetLife dental',
    'sonic toothbrush',
    'oral care subscription',
    'dental discount plan',
    'teledentistry',
    'dental coverage Texas',
    'affordable dental care',
  ],
  openGraph: {
    title: 'SLEEK Dental Club | Premium Electric Toothbrush + Dental Coverage',
    description:
      'Premium sonic electric toothbrush kit with dental insurance options. Transform your oral care routine with quarterly refills and MetLife coverage.',
    url: 'https://sleekdentalclub.com',
    siteName: 'SLEEK Dental Club',
    images: [
      {
        url: '/images/social-share.png',
        width: 1200,
        height: 630,
        alt: 'SLEEK Dental Club - Premium Electric Toothbrush and Dental Coverage Membership',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SLEEK Dental Club | Premium Electric Toothbrush + Dental Coverage',
    description:
      'Premium sonic electric toothbrush kit with dental insurance options. Plans starting at $19.95/month.',
    images: ['/images/social-share.png'],
  },
  alternates: {
    canonical: 'https://sleekdentalclub.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/**
 * Homepage server component.
 *
 * This is a server component that exports metadata for SEO and renders
 * the HomeContent client component. JSON-LD structured data is injected
 * here for comprehensive search engine optimization including:
 * - Organization schema
 * - WebSite schema with SearchAction
 * - LocalBusiness schema
 * - Service schema
 * - Product schemas for all membership plans
 *
 * The FAQ schema is handled separately in the FaqAccordion component.
 */
export default function HomePage() {
  return (
    <>
      {/* Comprehensive JSON-LD structured data for homepage */}
      <Script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createHomepageSchemaGraph()),
        }}
      />
      <HomeContent />
    </>
  );
}
