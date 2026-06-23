import { Metadata } from 'next';
import Script from 'next/script';

import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import PricingSection from '@/components/sections/PricingSection';
import { MarketProgramHero } from '@/components/market-programs';
import SubscriptionContent from '@/components/toothbrush-subscription/SubscriptionContent';
import {
  subscriptionHeroTitle,
  subscriptionHeroSubtitle,
  subscriptionHeroBenefits,
  subscriptionFaqs,
  subscriptionBreadcrumb,
} from '@/lib/toothbrush-subscription-content';
import { createFaqSchema, createBreadcrumbSchema } from '@/lib/schema';

const PAGE_URL = 'https://www.sleekdentalclub.com/electric-toothbrush-subscription';

/**
 * SEO metadata for the electric toothbrush subscription landing page.
 * Targets the commercial "toothbrush subscription" query cluster.
 */
export const metadata: Metadata = {
  title: { absolute: 'Electric Toothbrush Subscription | SLEEK Dental Club' },
  description:
    'The SLEEK electric toothbrush subscription delivers a sonic toothbrush plus auto-shipped quarterly brush-head and floss refills from $16.95/month. Free shipping, cancel anytime.',
  openGraph: {
    title: 'Electric Toothbrush Subscription | SLEEK Dental Club',
    description:
      'A sonic electric toothbrush plus auto-shipped quarterly refills in one subscription from $16.95/month. Free shipping, cancel anytime.',
    type: 'website',
    url: PAGE_URL,
  },
  twitter: {
    card: 'summary',
    title: 'Electric Toothbrush Subscription | SLEEK Dental Club',
    description: 'Sonic toothbrush + quarterly refills in one subscription from $16.95/month.',
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

/**
 * Consumer landing page for the SLEEK electric toothbrush subscription.
 * Hero + how-it-works content + the real plan cards (drive to enrollment) + FAQ.
 */
export default function ElectricToothbrushSubscriptionPage() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      <Script
        id="subscription-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createFaqSchema(subscriptionFaqs)) }}
      />
      <Script
        id="subscription-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createBreadcrumbSchema(subscriptionBreadcrumb)) }}
      />
      <StickyNav lightHero />
      <MarketProgramHero
        badgeText="Toothbrush Subscription"
        title={subscriptionHeroTitle}
        subtitle={subscriptionHeroSubtitle}
        iconName="sparkles"
        benefits={subscriptionHeroBenefits}
        breadcrumbLabel="Electric Toothbrush Subscription"
      />
      <SubscriptionContent />
      <section id="plans" className="bg-section-light scroll-mt-20">
        <PricingSection />
      </section>
      <Footer />
    </main>
  );
}
