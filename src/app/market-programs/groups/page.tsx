import { Metadata } from 'next';

import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import { MarketProgramHero, PartnerContactForm } from '@/components/market-programs';

/**
 * SEO metadata for the Groups/Associations Partner page.
 * Optimized for search visibility targeting organizations, associations, and employers.
 */
export const metadata: Metadata = {
  title: 'Group Partnership Opportunities | SLEEK Dental Club for Organizations',
  description:
    'Bring SLEEK dental benefits to your members or employees at exclusive rates. Volume discounts, branded enrollment, and dedicated account management for groups.',
  openGraph: {
    title: 'Group Partnership Opportunities | SLEEK Dental Club for Organizations',
    description:
      'Exclusive group rates and branded enrollment options for organizations partnering with SLEEK Dental Club.',
    type: 'website',
    url: 'https://www.sleekdentalclub.com/market-programs/groups',
  },
  twitter: {
    card: 'summary',
    title: 'Group Partnership | SLEEK Dental Club',
    description: 'Exclusive group rates for organizations and associations.',
  },
  alternates: {
    canonical: 'https://www.sleekdentalclub.com/market-programs/groups',
  },
};

/**
 * Partner program page content configuration for groups and associations.
 * Contains all the customized messaging for the organizational audience.
 */
const pageContent = {
  badgeText: 'For Groups & Associations',
  title: 'Group Partnership Opportunities',
  subtitle:
    'Bring SLEEK benefits to your members or employees at exclusive rates. Our group program is designed for associations, employers, and organizations looking to provide premium dental benefits.',
  benefits: [
    'Volume discounts for your organization',
    'Branded enrollment portal',
    'Dedicated account manager',
    'Flexible billing options',
  ],
  formSubjectLine: 'Group Partnership Inquiry',
  partnerType: 'Group/Association',
};

/**
 * GroupsPage is the landing page for organizations, associations, and employers
 * interested in offering SLEEK benefits to their members. Features a hero section
 * with targeted messaging and a contact form for inquiries.
 */
export default function GroupsPage() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      {/* Sticky navigation header with light mode for light hero background */}
      <StickyNav lightHero />

      {/* Hero section with partner benefits */}
      <MarketProgramHero
        badgeText={pageContent.badgeText}
        title={pageContent.title}
        subtitle={pageContent.subtitle}
        iconName="users"
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
