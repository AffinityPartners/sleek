'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  Check,
  Stethoscope,
  Share2,
  Briefcase,
  Users,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

/**
 * Supported icon names for market program hero sections.
 * Maps string identifiers to Lucide icon components to allow
 * Server Components to specify icons without passing functions.
 */
export type MarketProgramIconName = 'stethoscope' | 'share2' | 'briefcase' | 'users';

/**
 * Internal mapping of icon names to Lucide icon components.
 * Used to resolve string icon names passed from Server Components.
 */
const iconMap: Record<MarketProgramIconName, LucideIcon> = {
  stethoscope: Stethoscope,
  share2: Share2,
  briefcase: Briefcase,
  users: Users,
};

/**
 * Props for the MarketProgramHero component.
 * Allows customization of the hero section for different partner types.
 */
interface MarketProgramHeroProps {
  /** Main headline displayed prominently */
  title: string;
  /** Supporting text beneath the headline */
  subtitle: string;
  /** Icon name string to identify which Lucide icon to render (avoids passing functions from Server Components) */
  iconName: MarketProgramIconName;
  /** Array of 3-4 short benefit bullets to display */
  benefits: string[];
  /** Badge text shown above the title (e.g., "FOR DENTISTS") */
  badgeText: string;
}

/**
 * MarketProgramHero is a reusable hero section for market program landing pages.
 * Features a gradient background, animated content reveal, and benefit bullets.
 * Designed to match the premium aesthetic of the privacy/terms pages while
 * providing customization for different partner audiences (dentists, affiliates, etc.).
 */
export default function MarketProgramHero({
  title,
  subtitle,
  iconName,
  benefits,
  badgeText,
}: MarketProgramHeroProps) {
  // Resolve the icon component from the name string
  const Icon = iconMap[iconName];
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile viewport for performance optimizations
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Should we animate? Disabled on mobile or if user prefers reduced motion
  const shouldAnimate = !prefersReducedMotion && !isMobile;

  // Animation variants for staggered reveal effect
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.05 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    // Standardized padding: pt-24 for nav clearance (consistent with Hero), pb-16 md:pb-20 for content spacing
    <section className="relative pt-24 pb-16 md:pb-20 overflow-hidden">
      {/* Premium gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-white to-teal-50/30" />
        <motion.div
          className="absolute -top-[30%] -right-[20%] w-[60%] h-[80%] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 70%)',
          }}
          animate={
            shouldAnimate
              ? {
                  scale: [1, 1.1, 1],
                  x: [0, 20, 0],
                }
              : {}
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-[30%] -left-[20%] w-[50%] h-[60%] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
          }}
          animate={
            shouldAnimate
              ? {
                  scale: [1, 1.15, 1],
                  y: [0, -20, 0],
                }
              : {}
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      <div className="container-standard relative z-10">
        {/* Breadcrumb navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-teal-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Partner Programs</span>
        </motion.nav>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Hero content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge with icon */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-teal-200/50"
            style={{
              background:
                'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(15, 118, 110, 0.05) 100%)',
            }}
          >
            <Icon className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-teal-700 tracking-wide uppercase">
              {badgeText}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6 font-heading"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8"
          >
            {subtitle}
          </motion.p>

          {/* Benefits list */}
          <motion.ul variants={itemVariants} className="space-y-3">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 text-gray-700"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.2 : 0.4,
                  delay: prefersReducedMotion ? 0 : 0.4 + index * 0.1,
                }}
              >
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-teal-600" />
                </div>
                <span className="text-base md:text-lg">{benefit}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
