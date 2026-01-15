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
import TestimonialsSection from '@/components/TestimonialsSection';
import PBABenefitsSection from '@/components/PBABenefitsSection';
import { ShieldCheck, Clock, Sparkles, Truck, CreditCard, Gift } from 'lucide-react';

/**
 * Home page component for SLEEK Dental.
 * Renders the main landing page with all sections in order:
 * Hero, Pricing, Video, Technology, Benefits, Value Benefits, FAQ, Blog, Footer.
 * Each section has consistent spacing and background treatments from the design system.
 */
export default function Home() {
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
    <main className="relative">
      {/* Sticky navigation - fixed at top */}
      <StickyNav />
      
      {/* Main content */}
      <div className="relative">
        {/* Hero section - Dark immersive hero with full viewport height */}
        <section id="hero">
          <Hero 
            headline="Premium Sonic Tech. Complete Dental Coverage."
            subheadline="Experience the perfect fusion of cutting-edge sonic technology and comprehensive dental insurance. One membership, total oral care."
            ctaText="Find My Perfect Plan"
            secondaryCtaText="See How It Works"
            mediaSrc="/images/hero/sleek-brush-splash.png"
            mediaAlt="SLEEK Sonic Electric Toothbrush with Water Splash"
            onCtaClick={() => {
              window.location.href = 'https://enrollment.sleekdentalclub.com/onboarding';
            }}
            onSecondaryCtaClick={() => {
              document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </section>
        
        {/* Plans and pricing section - scroll-mt accounts for sticky header */}
        <section id="plans" className="bg-section-light scroll-mt-20">
          <PricingSection />
        </section>
        
        {/* Featured Video Showcase */}
        <section id="video" className="scroll-mt-20">
          <VideoShowcase />
        </section>
        
        {/* Product Technology Highlight section */}
        <section id="technology" className="scroll-mt-20">
          <ProductTechHighlight />
        </section>
        
        {/* Membership Benefits section */}
        <section id="benefits" className="scroll-mt-20">
          <MembershipBenefitsGrid
            title="Why Choose SLEEK Dental"
            subtitle="Everything you need for exceptional oral care, delivered to your door"
            benefits={membershipBenefits}
          />
        </section>
        
        {/* Additional Value Benefits section */}
        <section className="bg-section-light">
          <AdditionalValueBenefits />
        </section>
        
        {/* PBA Benefits section - PRO & MAX exclusive */}
        <section id="pba-benefits" className="scroll-mt-20">
          <PBABenefitsSection />
        </section>
        
        {/* Customer Testimonials section */}
        <section id="testimonials" className="bg-section-light scroll-mt-20">
          <TestimonialsSection />
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="bg-section-light scroll-mt-20">
          <FaqAccordion />
        </section>
        
        {/* Blog Section */}
        <section id="blog" className="bg-section-light scroll-mt-20">
          <BlogSection />
        </section>
        
        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
} 