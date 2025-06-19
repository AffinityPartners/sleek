'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Shield, Zap, Sparkles, Info, Clock, Smartphone, Award, Star, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Define types for our pricing plans
interface PlanFeature {
  text: string;
  icon: React.ReactNode;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  isPopular: boolean;
  badge?: string;
  features: PlanFeature[];
  ctaText: string;
  ctaLink: string;
  accentColor: string;
}

// Define our pricing plans data
const pricingPlans: Plan[] = [
  {
    id: 'ocr',
    name: 'OCR',
    description: 'Essential oral care for individuals',
    monthlyPrice: '$19.99',
    isPopular: false,
    accentColor: '#4fa8df',
    features: [
      { text: 'Smart Sonic Toothbrush', icon: <Sparkles className="h-4 w-4" />, included: true },
      { text: 'Quarterly brush head replacements', icon: <Clock className="h-4 w-4" />, included: true },
      { text: 'Basic mobile app features', icon: <Smartphone className="h-4 w-4" />, included: true },
      { text: '2 cleaning modes', icon: <Zap className="h-4 w-4" />, included: true },
      { text: 'Basic oral care refills', icon: <Sparkles className="h-4 w-4" />, included: true },
      { text: 'Basic dental insurance', icon: <Shield className="h-4 w-4" />, included: false },
      { text: 'Annual dental checkup', icon: <Check className="h-4 w-4" />, included: false },
    ],
    ctaText: 'Get Started',
    ctaLink: '/signup/ocr',
  },
  {
    id: 'pro',
    name: 'PRO',
    description: 'Advanced care with insurance benefits',
    monthlyPrice: '$39.99',
    isPopular: true,
    badge: 'Most Popular',
    accentColor: '#1ab9a3',
    features: [
      { text: 'Premium Sonic Toothbrush', icon: <Award className="h-4 w-4" />, included: true },
      { text: 'Bi-monthly brush head replacements', icon: <Clock className="h-4 w-4" />, included: true },
      { text: 'Advanced app with coaching', icon: <Smartphone className="h-4 w-4" />, included: true },
      { text: '5 cleaning modes', icon: <Zap className="h-4 w-4" />, included: true },
      { text: 'Complete oral care package', icon: <Sparkles className="h-4 w-4" />, included: true },
      { text: 'Basic dental insurance', icon: <Shield className="h-4 w-4" />, included: true },
      { text: 'Annual dental checkup', icon: <Check className="h-4 w-4" />, included: true },
    ],
    ctaText: 'Join Pro Plan',
    ctaLink: '/signup/pro',
  },
  {
    id: 'max',
    name: 'MAX',
    description: 'Complete dental care for families',
    monthlyPrice: '$59.99',
    isPopular: false,
    badge: 'Best Value',
    accentColor: '#8757e6',
    features: [
      { text: 'Premium Sonic Toothbrush', icon: <Crown className="h-4 w-4" />, included: true },
      { text: 'Monthly brush head replacements', icon: <Clock className="h-4 w-4" />, included: true },
      { text: 'Premium app with family accounts', icon: <Smartphone className="h-4 w-4" />, included: true },
      { text: '5 cleaning modes + intensity control', icon: <Zap className="h-4 w-4" />, included: true },
      { text: 'Premium oral care package', icon: <Sparkles className="h-4 w-4" />, included: true },
      { text: 'Comprehensive dental insurance', icon: <Shield className="h-4 w-4" />, included: true },
      { text: 'Bi-annual dental checkups', icon: <Check className="h-4 w-4" />, included: true },
    ],
    ctaText: 'Join Max Plan',
    ctaLink: '/signup/max',
  },
];

const PricingSection: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="section-padding">
      <div className="container-standard">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Section header */}
          <div className="section-header">
            <motion.span 
              variants={itemVariants}
              className="section-badge"
            >
              PRICING PLANS
            </motion.span>
            
            <motion.h2
              variants={itemVariants}
              className="section-title"
            >
              Choose Your Perfect Plan
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="section-subtitle"
            >
              Find the ideal dental care plan for your needs with flexible options and premium benefits
            </motion.p>
          </div>

          {/* Pricing cards */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-8"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className={cn(
                  "relative rounded-2xl overflow-hidden",
                  "bg-white border flex flex-col h-full transition-all duration-300",
                  plan.isPopular 
                    ? "border-teal-500 shadow-xl md:scale-[1.07] z-10 ring-4 ring-teal-500/10" 
                    : "border-gray-200 shadow-lg hover:shadow-xl hover:border-teal-500/30"
                )}
                style={{
                  transformOrigin: 'center'
                }}
              >
                {/* Card highlight for the most popular plan */}
                {plan.isPopular && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-transparent to-teal-500/5 pointer-events-none"
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  />
                )}
                
                {/* Plan badge */}
                {plan.badge && (
                  <div 
                    className={`absolute top-0 right-0 py-1.5 px-4 rounded-bl-lg shadow-md z-20 font-semibold text-xs text-white`}
                    style={{ backgroundColor: plan.accentColor }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Plan header */}
                <div className={cn(
                  "p-6 border-b",
                  plan.isPopular 
                    ? "bg-teal-50/50 border-teal-200/50" 
                    : "bg-gray-50/80 border-gray-100"
                )}>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-heading tracking-tight">{plan.name}</h3>
                  <p className="text-gray-600 mb-5">{plan.description}</p>
                  <div className="flex items-end">
                    <span className="text-3xl md:text-4xl font-bold text-gray-900 font-heading">{plan.monthlyPrice}</span>
                    <span className="text-gray-500 ml-2 pb-1">/month</span>
                  </div>
                </div>

                {/* Plan features */}
                <div className="p-6 flex-grow">
                  <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        variants={featureVariants}
                        custom={idx}
                        className={cn(
                          "flex items-start py-1.5 px-1 rounded-lg group transition-colors duration-200",
                          feature.included ? "text-gray-800" : "text-gray-400"
                        )}
                      >
                        <div className={cn(
                          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors duration-200",
                          feature.included 
                            ? "bg-teal-100 text-teal-600" 
                            : "bg-gray-100 text-gray-400"
                        )}>
                          {feature.icon}
                        </div>
                        <span className={cn(
                          "font-lato transition-colors duration-200",
                          !feature.included && "line-through opacity-70"
                        )}>
                          {feature.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA button */}
                <div className="px-6 pb-6 pt-0">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      href={plan.ctaLink}
                      className={cn(
                        "w-full inline-flex justify-center items-center py-3.5 px-6 rounded-lg font-medium transition-all duration-300",
                        plan.isPopular 
                          ? "btn-primary text-white shadow-lg hover:shadow-xl" 
                          : "btn-secondary"
                      )}
                    >
                      {plan.ctaText}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional info */}
          <motion.div 
            variants={itemVariants}
            className="text-center text-sm text-gray-500 max-w-3xl mx-auto bg-white/60 py-6 px-8 rounded-2xl backdrop-blur-sm border border-gray-100"
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Check className="h-4 w-4 text-teal-600" />
              <p className="font-medium text-gray-700">All plans include 30-day money-back guarantee</p>
            </div>
            <p>Switch or cancel anytime. No long-term commitments required.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; 