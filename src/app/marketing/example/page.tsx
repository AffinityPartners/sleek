"use client";

/**
 * Example Marketing Page
 *
 * A complete example marketing page showcasing all available components.
 * Used as a reference/template for building new marketing landing pages.
 *
 * Important: This page is noindexed via the parent marketing/layout.tsx
 * to prevent search engines from indexing this internal template page.
 * It is also explicitly blocked in robots.txt at /marketing/example.
 */

import React from 'react';
import StickyNav from '@/components/StickyNav';
import HeroSection from '@/components/HeroSection';
import MembershipBenefitsGrid, { BenefitItem } from '@/components/MembershipBenefitsGrid';
import PricingSection from '@/components/PricingSection';
import FaqAccordion from '@/components/FaqAccordion';
import Footer from '@/components/Footer';
import { 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Truck, 
  CreditCard, 
  Gift 
} from 'lucide-react';

export default function ExampleMarketingPage() {
  // Benefits data for the membership benefits grid
  const membershipBenefits: BenefitItem[] = [
    {
      icon: ShieldCheck,
      title: 'Premium Protection',
      description: 'Our advanced brush technology protects your enamel while providing superior cleaning for healthier gums and teeth.'
    },
    {
      icon: Clock,
      title: 'Time-Saving',
      description: 'Smart timers and zone detection ensure you spend the optimal amount of time cleaning each area of your mouth.'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Enjoy complimentary fast shipping on all subscription orders, with eco-friendly packaging.'
    },
    {
      icon: Sparkles,
      title: 'Whitening Technology',
      description: 'Our specialized bristles and polishing cups help remove stains for a naturally whiter smile in just weeks.'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payments',
      description: 'Choose monthly or annual billing with transparent pricing and no hidden fees or commitments.'
    },
    {
      icon: Gift,
      title: 'Member Perks',
      description: 'Access exclusive discounts on premium oral care products and receive surprise gifts with your shipments.'
    }
  ];

  return (
    <>
      <StickyNav />
      <main>
        <HeroSection />
        
        {/* Toothbrush showcase section (placeholder) */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
              Futuristic Toothbrush Technology
            </h2>
            {/* Placeholder for product showcase */}
            <div className="bg-gray-200 h-96 rounded-2xl flex items-center justify-center">
              <p className="text-xl text-gray-500">Product Showcase</p>
            </div>
          </div>
        </div>
        
        {/* Membership Benefits Grid */}
        <MembershipBenefitsGrid 
          title="Why Choose SLEEK" 
          benefits={membershipBenefits} 
        />
        
        {/* Pricing Section */}
        <PricingSection />
        
        {/* FAQ Section */}
        <FaqAccordion />
      </main>
      <Footer />
    </>
  );
} 