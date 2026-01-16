import { Metadata } from 'next';

import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import { MarketProgramHero, PartnerContactForm } from '@/components/market-programs';

/**
 * SEO metadata for the Affiliate Partner page.
 * Optimized for search visibility targeting affiliate marketers and influencers.
 */
export const metadata: Metadata = {
  title: 'Become a SLEEK Affiliate | Affiliate Marketing Program',
  description:
    'Join the SLEEK Dental Club affiliate program. Earn competitive commissions promoting premium dental care subscriptions with marketing materials and tracking tools.',
  openGraph: {
    title: 'Become a SLEEK Affiliate | Affiliate Marketing Program',
    description:
      'Earn competitive commissions by promoting premium dental care subscriptions with the SLEEK affiliate program.',
    type: 'website',
    url: 'https://sleekdentalclub.com/market-programs/affiliates',
  },
  twitter: {
    card: 'summary',
    title: 'Become a SLEEK Affiliate | Affiliate Marketing Program',
    description: 'Earn commissions promoting SLEEK Dental Club memberships.',
  },
  alternates: {
    canonical: 'https://sleekdentalclub.com/market-programs/affiliates',
  },
};

/**
 * Partner program page content configuration for affiliate marketers.
 * Contains all the customized messaging for the affiliate audience.
 */
const pageContent = {
  badgeText: 'For Affiliates',
  title: 'Become a SLEEK Affiliate',
  subtitle:
    'Earn commissions by promoting premium dental care subscriptions. Our affiliate program provides everything you need to succeed, from marketing materials to real-time tracking.',
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
      {/* Sticky navigation header with light mode for light hero background */}
      <StickyNav lightHero />

      {/* Hero section with partner benefits */}
      <MarketProgramHero
        badgeText={pageContent.badgeText}
        title={pageContent.title}
        subtitle={pageContent.subtitle}
        iconName="share2"
        benefits={pageContent.benefits}
      />

      {/* Contact form section */}
      <PartnerContactForm
        subjectLine={pageContent.formSubjectLine}
        partnerType={pageContent.partnerType}
      />

      {/* Site footer */}
      <Footer />
    </main>
  );
}
