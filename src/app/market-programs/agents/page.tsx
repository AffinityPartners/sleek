import { Metadata } from 'next';

import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import { MarketProgramHero, PartnerContactForm } from '@/components/market-programs';

/**
 * SEO metadata for the Licensed Agents/Brokers Partner page.
 * Optimized for search visibility targeting insurance agents and brokers.
 */
export const metadata: Metadata = {
  title: 'Sell SLEEK Dental Plans | Agent & Broker Partnership',
  description:
    'Add MetLife dental coverage to your product portfolio. Licensed products, competitive commission structure, sales support, and compliance materials for agents.',
  openGraph: {
    title: 'Sell SLEEK Dental Plans | Agent & Broker Partnership',
    description:
      'Licensed products and competitive commissions for agents selling SLEEK dental plans with MetLife coverage.',
    type: 'website',
    url: 'https://www.sleekdentalclub.com/market-programs/agents',
  },
  twitter: {
    card: 'summary',
    title: 'Sell SLEEK Dental Plans | Agent Partnership',
    description: 'Licensed products and competitive commissions for agents.',
  },
  alternates: {
    canonical: 'https://www.sleekdentalclub.com/market-programs/agents',
  },
};

/**
 * Partner program page content configuration for licensed agents and brokers.
 * Contains all the customized messaging for the insurance professional audience.
 */
const pageContent = {
  badgeText: 'For Licensed Agents',
  title: 'Sell SLEEK Dental Plans',
  subtitle:
    'Add MetLife dental coverage to your product portfolio. Our agent program provides licensed products, competitive commissions, and full sales support to help you succeed.',
  benefits: [
    'Licensed insurance products',
    'Competitive commission structure',
    'Dedicated sales support',
    'Compliance materials provided',
  ],
  formSubjectLine: 'Agent/Broker Partnership Inquiry',
  partnerType: 'Licensed Agent/Broker',
};

/**
 * AgentsPage is the landing page for licensed insurance agents and brokers
 * interested in selling SLEEK dental plans. Features a hero section with
 * targeted messaging and a contact form for inquiries.
 */
export default function AgentsPage() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      {/* Sticky navigation header with light mode for light hero background */}
      <StickyNav lightHero />

      {/* Hero section with partner benefits */}
      <MarketProgramHero
        badgeText={pageContent.badgeText}
        title={pageContent.title}
        subtitle={pageContent.subtitle}
        iconName="briefcase"
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
