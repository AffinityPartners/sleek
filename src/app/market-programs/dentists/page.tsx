import { Metadata } from 'next';

import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import { MarketProgramHero, PartnerContactForm } from '@/components/market-programs';

/**
 * SEO metadata for the Dentist Partner page.
 * Optimized for search visibility targeting dental professionals.
 */
export const metadata: Metadata = {
  title: 'Partner with SLEEK Dental Club | Dentist Partnership Program',
  description:
    'Join the SLEEK Dental Club partner program. Offer your patients premium oral care products, earn recurring revenue, and grow your practice with dedicated support.',
  openGraph: {
    title: 'Partner with SLEEK Dental Club | Dentist Partnership Program',
    description:
      'Offer your patients premium oral care products and earn recurring revenue with the SLEEK dentist partnership program.',
    type: 'website',
    url: 'https://sleekdentalclub.com/market-programs/dentists',
  },
};

/**
 * Partner program page content configuration for dentists.
 * Contains all the customized messaging for the dental practice audience.
 */
const pageContent = {
  badgeText: 'For Dentists',
  title: 'Partner with SLEEK Dental Club',
  subtitle:
    'Offer your patients premium oral care products and earn recurring revenue. Our partnership program is designed to help dental practices grow while providing exceptional value to patients.',
  benefits: [
    'Increase patient retention with premium products',
    'Earn additional recurring revenue streams',
    'White-label options available for your practice',
    'Dedicated partner support team',
  ],
  formSubjectLine: 'Dentist Partnership Inquiry',
  partnerType: 'Dentist',
};

/**
 * DentistsPage is the landing page for dental professionals interested
 * in partnering with SLEEK Dental Club. Features a hero section with
 * targeted messaging and a contact form for inquiries.
 */
export default function DentistsPage() {
  return (
    <main className="relative min-h-screen bg-gray-50">
      {/* Sticky navigation header with light mode for light hero background */}
      <StickyNav lightHero />

      {/* Hero section with partner benefits */}
      <MarketProgramHero
        badgeText={pageContent.badgeText}
        title={pageContent.title}
        subtitle={pageContent.subtitle}
        iconName="stethoscope"
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
