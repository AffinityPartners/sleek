"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Shield, Sparkles, Info } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// Types for our plan data
type PlanFeature = {
  label: string;
  included: boolean;
};

type Plan = {
  id: string;
  name: string;
  price: string;
  priceSuffix: string;
  description: string;
  isRecommended: boolean;
  features: PlanFeature[];
  insuranceInfo?: string;
  color: string;
};

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  },
  hover: {
    y: -8,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -5 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

// The plans data
const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '19',
    priceSuffix: '99',
    description: 'Essential toothbrush care for individuals',
    isRecommended: false,
    features: [
      { label: 'Smart toothbrush with UV sanitizing', included: true },
      { label: 'Brush head replacement every 3 months', included: true },
      { label: 'Basic tooth cleaning coverage', included: true },
      { label: 'Access to mobile app with brushing insights', included: true },
      { label: 'Limited dental emergency coverage', included: false },
      { label: 'Full annual dental check-up', included: false },
    ],
    color: '#1ab9a3',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '39',
    priceSuffix: '99',
    description: 'Perfect choice for most subscribers',
    isRecommended: true,
    features: [
      { label: 'Smart toothbrush with UV sanitizing', included: true },
      { label: 'Brush head replacement every 3 months', included: true },
      { label: 'Comprehensive cleaning coverage', included: true },
      { label: 'Premium app features with AI coaching', included: true },
      { label: 'Basic dental emergency coverage', included: true },
      { label: 'Full annual dental check-up', included: true },
    ],
    insuranceInfo: 'Includes basic dental insurance coverage',
    color: '#1ab9a3',
  },
  {
    id: 'max',
    name: 'Max',
    price: '59',
    priceSuffix: '99',
    description: 'Complete dental care for families',
    isRecommended: false,
    features: [
      { label: 'Smart toothbrush with UV sanitizing', included: true },
      { label: 'Brush head replacement every 2 months', included: true },
      { label: 'Full dental cleaning coverage', included: true },
      { label: 'Family app accounts with AI coaching', included: true },
      { label: 'Comprehensive dental emergency coverage', included: true },
      { label: 'Bi-annual dental check-ups', included: true },
    ],
    insuranceInfo: 'Includes premium dental insurance coverage',
    color: '#1ab9a3',
  }
];

export default function PricingSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px',
  });

  return (
    <Section 
      id="pricing" 
      variant="default" 
      width="wide" 
      className="overflow-hidden"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <motion.div 
          variants={sectionVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={sectionVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Choose Your Perfect Plan
          </motion.h2>
          <motion.p 
            variants={sectionVariants}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Find the ideal plan for your dental health needs with our smart toothbrush subscription
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6"
          variants={sectionVariants}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={cn(
                "relative bg-white rounded-xl overflow-hidden flex flex-col",
                plan.isRecommended 
                  ? "border-2 border-[#1ab9a3] shadow-xl md:scale-105 md:-my-2 z-10" 
                  : "border border-gray-200 shadow-md"
              )}
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Recommended badge */}
              {plan.isRecommended && (
                <div className="absolute top-0 left-0 right-0 text-center">
                  <div className="inline-block bg-[#1ab9a3] text-white text-xs font-semibold py-1.5 px-4 rounded-b-lg shadow-sm">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-6 md:p-8 flex-1">
                {/* Plan header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-xl font-bold">{plan.priceSuffix}</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </div>

                {/* Insurance info if available */}
                {plan.insuranceInfo && (
                  <div className="mb-6 flex items-center text-sm bg-[#f4f9f8] p-3 rounded-lg">
                    <Shield className="text-[#1ab9a3] h-5 w-5 mr-2 flex-shrink-0" />
                    <span>{plan.insuranceInfo}</span>
                  </div>
                )}

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-start"
                      variants={featureVariants}
                      custom={idx}
                    >
                      <Check 
                        className={cn(
                          "h-5 w-5 mr-3 mt-0.5 flex-shrink-0",
                          feature.included ? "text-[#1ab9a3]" : "text-gray-300"
                        )} 
                      />
                      <span className={cn(
                        "text-sm",
                        feature.included ? "text-gray-700" : "text-gray-400 line-through"
                      )}>
                        {feature.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button
                    variant={plan.isRecommended ? "dental" : "outline"}
                    size="lg"
                    fullWidth
                    animate
                  >
                    Select {plan.name} Plan
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
} 