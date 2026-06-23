import { Metadata } from 'next';

import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { MarketProgramHero, PartnerContactForm, AffiliateProgramContent } from '@/components/market-programs';
import { affiliateFaqs, affiliateBreadcrumb } from '@/lib/affiliate-content';
import { createFaqSchema, createBreadcrumbSchema } from '@/lib/schema';

/**
 * SEO metadata for the Affiliate Partner page.
 * Optimized for search visibility targeting affiliate marketers and influencers.
 */
export const metadata: Metadata = {
  title: { absolute: 'Dental Affiliate Program | Earn With SLEEK Dental Club' },
  description:
    'Join the SLEEK Dental affiliate program — promote dental memberships & sonic toothbrush subscriptions and earn recurring commissions. Free to join.',
  openGraph: {
    title: 'Dental Affiliate Program | Earn With SLEEK Dental Club',
    description:
      'Join the SLEEK Dental affiliate program — promote dental memberships & sonic toothbrush subscriptions and earn recurring commissions. Free to join.',
    type: 'website',
    url: 'https://www.sleekdentalclub.com/market-programs/affiliates',
  },
  twitter: {
    card: 'summary',
    title: 'Dental Affiliate Program | Earn With SLEEK Dental Club',
    description: 'Earn commissions promoting SLEEK Dental Club memberships.',
  },
  alternates: {
    canonical: 'https://www.sleekdentalclub.com/market-programs/affiliates',
  },
};

/**
 * Partner program page content configuration for affiliate marketers.
 * Contains all the customized messaging for the affiliate audience.
 */
const pageContent = {
  badgeText: 'For Affiliates',
  title: 'Dental Affiliate Program',
  subtitle:
    'Become a SLEEK affiliate and earn recurring commissions promoting premium dental memberships and our sonic electric toothbrush subscription. Everything you need to succeed — marketing materials, real-time tracking, monthly payouts.',
  benefits: [
    'Competitive commission structure',
    'Professional marketing materials provided',
    'Real-time tracking dashboard',
    'Monthly payouts with low minimums',
  ],
  formSubjectLine: 'Affiliate Partnership Inquiry',
  partnerType: 'Affiliate Marketer',
};

/**
 * AffiliatesPage is the landing page for affiliate marketers interested
 * in promoting SLEEK Dental Club products. Features a hero section with
 * targeted messaging and a contact form for inquiries.
 */
export default function AffiliatesPage() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      <Script
        id="affiliate-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createFaqSchema(affiliateFaqs)) }}
      />
      <Script
        id="affiliate-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(createBreadcrumbSchema(affiliateBreadcrumb)) }}
      />
      <StickyNav lightHero />
      <MarketProgramHero
        badgeText={pageContent.badgeText}
        title={pageContent.title}
        subtitle={pageContent.subtitle}
        iconName="share2"
        benefits={pageContent.benefits}
      />
      <AffiliateProgramContent />
      <PartnerContactForm
        subjectLine={pageContent.formSubjectLine}
        partnerType={pageContent.partnerType}
      />
      <Footer />
    </main>
  );
}
