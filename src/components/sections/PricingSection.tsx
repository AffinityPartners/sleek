'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Shield, Zap, Sparkles, Clock, Smartphone, Award, Crown, Stethoscope, Pill, Gift, Users, BadgePercent } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Type definitions for pricing plan features and plans.
 * Each plan has a unique id, pricing info, and list of features.
 */
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
  enrollmentFee: string;
  isPopular: boolean;
  badge?: string;
  logo: string;
  features: PlanFeature[];
  ctaText: string;
  ctaLink: string;
  accentColor: string;
}

/**
 * Pricing plans data with features and styling based on official SLEEK marketing materials.
 * OCP = Oral Care Plan (discount dental), PRO & MAX include MetLife dental insurance.
 * The PRO plan is marked as popular and receives special visual treatment.
 */
const pricingPlans: Plan[] = [
  {
    id: 'ocp',
    name: 'OCP',
    description: 'Oral Care Plan with dental savings',
    monthlyPrice: '$29.95',
    enrollmentFee: '$25',
    isPopular: false,
    logo: '/images/plans/sleek-ocp.png',
    accentColor: '#64748b',
    features: [
      { text: 'SLEEK Electric Toothbrush Kit', icon: <Sparkles className="h-4 w-4" />, included: true },
      { text: 'Quarterly oral care refills', icon: <Clock className="h-4 w-4" />, included: true },
      { text: 'Dental Savings Plan (15-50% off)', icon: <BadgePercent className="h-4 w-4" />, included: true },
      { text: 'Aetna Dental Access Network', icon: <Shield className="h-4 w-4" />, included: true },
      { text: 'Teledentistry consultations', icon: <Stethoscope className="h-4 w-4" />, included: true },
      { text: 'Discount Rx benefits', icon: <Pill className="h-4 w-4" />, included: true },
      { text: 'Byte aligner discount', icon: <Gift className="h-4 w-4" />, included: true },
    ],
    ctaText: 'Get Started',
    ctaLink: 'https://enrollment.sleekdentalclub.com/onboarding',
  },
  {
    id: 'pro',
    name: 'PRO',
    description: 'Dental insurance by MetLife',
    monthlyPrice: '$56.95',
    enrollmentFee: '$25',
    isPopular: true,
    badge: 'Most Popular',
    logo: '/images/plans/sleek-pro.png',
    accentColor: '#0f766e',
    features: [
      { text: 'SLEEK Electric Toothbrush Kit', icon: <Award className="h-4 w-4" />, included: true },
      { text: 'Quarterly oral care refills', icon: <Clock className="h-4 w-4" />, included: true },
      { text: 'MetLife Dental Insurance (80/60/50)', icon: <Shield className="h-4 w-4" />, included: true },
      { text: 'Increasing annual max (3 years)', icon: <Zap className="h-4 w-4" />, included: true },
      { text: 'Teledentistry consultations', icon: <Stethoscope className="h-4 w-4" />, included: true },
      { text: 'Discount Rx benefits', icon: <Pill className="h-4 w-4" />, included: true },
      { text: 'PBA Association benefits', icon: <Users className="h-4 w-4" />, included: true },
      { text: 'Byte aligner discount', icon: <Gift className="h-4 w-4" />, included: true },
    ],
    ctaText: 'Join Pro Plan',
    ctaLink: 'https://enrollment.sleekdentalclub.com/onboarding',
  },
  {
    id: 'max',
    name: 'MAX',
    description: 'Premium MetLife coverage for families',
    monthlyPrice: '$64.95',
    enrollmentFee: '$25',
    isPopular: false,
    badge: 'Best Value',
    logo: '/images/plans/sleek-max.png',
    accentColor: '#f59e0b',
    features: [
      { text: 'SLEEK Electric Toothbrush Kit', icon: <Crown className="h-4 w-4" />, included: true },
      { text: 'Quarterly oral care refills', icon: <Clock className="h-4 w-4" />, included: true },
      { text: 'MetLife Dental Insurance (100/80/50)', icon: <Shield className="h-4 w-4" />, included: true },
      { text: 'No waiting on major services', icon: <Zap className="h-4 w-4" />, included: true },
      { text: 'Orthodontia benefits included', icon: <Sparkles className="h-4 w-4" />, included: true },
      { text: 'Teledentistry consultations', icon: <Stethoscope className="h-4 w-4" />, included: true },
      { text: 'Discount Rx benefits', icon: <Pill className="h-4 w-4" />, included: true },
      { text: 'PBA Association benefits', icon: <Users className="h-4 w-4" />, included: true },
      { text: 'Byte aligner discount', icon: <Gift className="h-4 w-4" />, included: true },
    ],
    ctaText: 'Join Max Plan',
    ctaLink: 'https://enrollment.sleekdentalclub.com/onboarding',
  },
];

/**
 * PricingSection component displays three pricing tiers with animated reveals.
 * The popular plan receives a premium glow border effect and elevated styling.
 */
const PricingSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
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

  // Animation variants with premium easing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.1 : 0.15,
        delayChildren: prefersReducedMotion ? 0.1 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: prefersReducedMotion ? 15 : 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.4 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.15) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="container-standard relative z-10">
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

          {/* Pricing cards grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            {pricingPlans.map((plan, planIndex) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { 
                  y: -8,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className={cn(
                  "relative flex flex-col h-full",
                  /* Popular card uses z-10 for layering glow effects, no scale transform for consistent mobile layout */
                  plan.isPopular && "z-10"
                )}
              >
                {/* Popular plan glow border effect */}
                {plan.isPopular && (
                  <>
                    {/* Animated gradient border */}
                    <div 
                      className="absolute -inset-[2px] rounded-3xl opacity-80 animate-gradient"
                      style={{
                        background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 25%, #14b8a6 50%, #0f766e 75%, #14b8a6 100%)',
                        backgroundSize: '200% 200%',
                      }}
                    />
                    {/* Glow effect */}
                    <div 
                      className="absolute -inset-[2px] rounded-3xl blur-xl opacity-40"
                      style={{
                        background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                      }}
                    />
                  </>
                )}

                {/* Card container */}
                <div className={cn(
                  "relative rounded-3xl overflow-hidden bg-white flex flex-col h-full",
                  "transition-all duration-300",
                  plan.isPopular 
                    ? "shadow-card-glow" 
                    : "shadow-card border border-gray-100 hover:shadow-card-hover hover:border-teal-200/30"
                )}>
                  {/* Subtle inner highlight for popular card */}
                  {plan.isPopular && (
                    <motion.div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, transparent 50%, rgba(15, 118, 110, 0.05) 100%)'
                      }}
                      animate={prefersReducedMotion ? {} : { 
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    />
                  )}
                  
                  {/* Plan badge */}
                  {plan.badge && (
                    <div 
                      className={cn(
                        "absolute top-0 right-0 py-2 px-5 rounded-bl-2xl shadow-md z-20 font-semibold text-xs text-white tracking-wide",
                        plan.isPopular ? "animate-pulse-slow" : ""
                      )}
                      style={{ 
                        backgroundColor: plan.accentColor,
                        boxShadow: plan.isPopular ? `0 4px 14px ${plan.accentColor}50` : undefined
                      }}
                    >
                      {plan.badge}
                    </div>
                  )}

                  {/* Plan header */}
                  <div className={cn(
                    "p-8 border-b",
                    plan.isPopular 
                      ? "bg-gradient-to-br from-teal-50/80 to-white border-teal-100/50" 
                      : "bg-gradient-to-br from-gray-50/80 to-white border-gray-100"
                  )}>
                    {/* Plan logo */}
                    <div className="mb-4 h-12 relative">
                      <Image
                        src={plan.logo}
                        alt={`${plan.name} Plan Logo`}
                        width={120}
                        height={48}
                        className="object-contain h-12 w-auto"
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-heading tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="flex items-baseline">
                      <span className="text-4xl md:text-5xl font-bold text-gray-900 font-heading tracking-tight">
                        {plan.monthlyPrice}
                      </span>
                      <span className="text-gray-500 ml-2 text-lg">/month</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      + {plan.enrollmentFee} one-time enrollment fee
                    </p>
                  </div>

                  {/* Plan features */}
                  <div className="p-8 flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-5 text-sm uppercase tracking-wide">
                      What's included:
                    </h4>
                    <ul className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          variants={featureVariants}
                          custom={idx}
                          className={cn(
                            "flex items-start group transition-colors duration-200",
                            feature.included ? "text-gray-800" : "text-gray-400"
                          )}
                        >
                          <div className={cn(
                            "flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mr-3 transition-all duration-300",
                            feature.included 
                              ? plan.isPopular
                                ? "bg-gradient-to-br from-teal-100 to-teal-50 text-teal-600"
                                : "bg-gray-100 text-gray-600 group-hover:bg-teal-100 group-hover:text-teal-600"
                              : "bg-gray-50 text-gray-300"
                          )}>
                            {feature.icon}
                          </div>
                          <span className={cn(
                            "text-sm leading-relaxed pt-1",
                            !feature.included && "line-through opacity-60"
                          )}>
                            {feature.text}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button */}
                  <div className="p-8 pt-0">
                    <motion.div
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    >
                      <Link
                        href={plan.ctaLink}
                        className={cn(
                          "w-full inline-flex justify-center items-center py-4 px-6 rounded-xl font-semibold transition-all duration-300",
                          plan.isPopular 
                            ? "text-white" 
                            : "btn-secondary"
                        )}
                        style={plan.isPopular ? {
                          background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                          boxShadow: '0 4px 14px rgba(15, 118, 110, 0.35)',
                        } : undefined}
                      >
                        {plan.ctaText}
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                <Check className="h-5 w-5 text-teal-600" />
              </div>
              <span className="font-medium">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-teal-600" />
              </div>
              <span className="font-medium">Cancel anytime, no commitments</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
