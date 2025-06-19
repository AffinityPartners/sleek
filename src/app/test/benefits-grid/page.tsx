'use client';

import React from 'react';
import MembershipBenefitsGrid, { BenefitItem } from '@/components/MembershipBenefitsGrid';
import { 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  CreditCard, 
  Gift 
} from 'lucide-react';

export default function BenefitsGridPage() {
  // Sample benefits data
  const benefits: BenefitItem[] = [
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
    <main className="pt-24">
      <MembershipBenefitsGrid 
        title="Why Choose SLEEK" 
        benefits={benefits} 
      />
    </main>
  );
} 