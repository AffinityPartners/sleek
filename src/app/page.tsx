'use client';

import PricingSection from '@/components/sections/PricingSection';
import FaqAccordion from '../components/FaqAccordion';
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';
import StickyNav from '../components/StickyNav';
import VideoShowcase from '../components/VideoShowcase';
import Hero from '@/components/ui/Hero';
import ProductTechHighlight from '@/components/sections/ProductTechHighlight';
import MembershipBenefitsGrid, { BenefitItem } from '@/components/MembershipBenefitsGrid';
import AdditionalValueBenefits from '@/components/sections/AdditionalValueBenefits';
import { ShieldCheck, Clock, Sparkles, Truck, CreditCard, Gift } from 'lucide-react';

export default function Home() {
  console.log('Home page component rendering');
  
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
    <main className="relative overflow-hidden">
      {/* Consistent background system */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-white to-blue-50/20"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]"></div>
        <div className="absolute top-[10%] left-[15%] w-[40%] h-[30%] rounded-full bg-teal-500/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[35%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>
      
      {/* Sticky navigation */}
      <StickyNav />
      
      {/* Main content with consistent spacing */}
      <div className="relative z-10">
        {/* Hero section */}
        <section id="hero" className="pt-16">
          <Hero 
            headline="A Dental Experience Worth Smiling About" 
            subheadline="Experience the perfect blend of cutting-edge technology and comprehensive dental care with our premium electric toothbrush subscription service."
            ctaText="Find My Perfect Plan"
            mediaType="image"
            mediaSrc="/images/SleekKit.jpg"
            mediaAlt="SLEEK Electric Toothbrush Kit"
            onCtaClick={() => {
              document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
            }}
            variant="light"
          />
        </section>
        
        {/* Plans and pricing section */}
        <section id="plans" className="bg-section-light">
          <PricingSection />
        </section>
        
        {/* Featured Video Showcase */}
        <section id="video" className="bg-white">
          <VideoShowcase />
        </section>
        
        {/* Product Technology Highlight section */}
        <section id="technology" className="bg-section-teal">
          <ProductTechHighlight />
        </section>
        
        {/* Membership Benefits section */}
        <section id="benefits" className="bg-white">
          <MembershipBenefitsGrid
            title="Why Choose SLEEK Dental"
            benefits={membershipBenefits}
          />
        </section>
        
        {/* Additional Value Benefits section */}
        <section className="bg-section-light">
          <AdditionalValueBenefits />
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="bg-white">
          <FaqAccordion />
        </section>
        
        {/* Blog Section */}
        <section id="blog" className="bg-section-light">
          <BlogSection />
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
} 