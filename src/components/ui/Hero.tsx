"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Zap, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';

/**
 * Hero component props for the dark immersive hero section.
 * This hero is designed to showcase the SLEEK toothbrush with a premium,
 * Apple-inspired dark aesthetic while communicating the dual value proposition
 * of premium sonic technology AND dental insurance membership.
 */
interface HeroProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  secondaryCtaText?: string;
  mediaSrc?: string;
  mediaAlt?: string;
  onCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
}

/**
 * Feature card configuration for the floating glass cards.
 * Each card highlights a key value proposition of the SLEEK offering.
 */
interface FeatureCard {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: 'teal' | 'amber' | 'white';
  delay: number;
}

/**
 * Particle component for the ambient background effect.
 * Creates floating light particles that add depth to the dark hero.
 */
const Particle = ({ index, prefersReducedMotion }: { index: number; prefersReducedMotion: boolean | null }) => {
  // Generate consistent random values based on index for SSR compatibility
  const randomValues = useMemo(() => ({
    left: `${(index * 17) % 100}%`,
    top: `${(index * 23) % 100}%`,
    size: 2 + (index % 4),
    duration: 15 + (index % 10),
    delay: index * 0.5,
    opacity: 0.1 + (index % 5) * 0.1,
  }), [index]);

  if (prefersReducedMotion) {
    return (
      <div
        className="absolute rounded-full bg-teal-400/20"
        style={{
          left: randomValues.left,
          top: randomValues.top,
          width: randomValues.size,
          height: randomValues.size,
          opacity: randomValues.opacity,
        }}
      />
    );
  }

  return (
    <motion.div
      className="absolute rounded-full bg-teal-400/30"
      style={{
        left: randomValues.left,
        top: randomValues.top,
        width: randomValues.size,
        height: randomValues.size,
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [randomValues.opacity, randomValues.opacity * 1.5, randomValues.opacity],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: randomValues.duration,
        repeat: Infinity,
        delay: randomValues.delay,
        ease: "easeInOut",
      }}
    />
  );
};

/**
 * ParticleField component renders multiple particles for the ambient effect.
 * Completely disabled on mobile for optimal performance. On desktop, uses
 * 20 particles with animation (or static if reduced motion is preferred).
 */
const ParticleField = ({ prefersReducedMotion, isMobile }: { prefersReducedMotion: boolean | null; isMobile: boolean }) => {
  // No particles on mobile for smooth scrolling and reduced GPU usage
  if (isMobile) {
    return null;
  }
  
  const particleCount = 20;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: particleCount }).map((_, i) => (
        <Particle key={i} index={i} prefersReducedMotion={prefersReducedMotion} />
      ))}
    </div>
  );
};

/**
 * FeatureCardComponent renders a single floating glass card with icon and text.
 * Features glassmorphism styling on dark background with subtle animations.
 */
const FeatureCardComponent = ({ 
  card, 
  index, 
  inView, 
  prefersReducedMotion 
}: { 
  card: FeatureCard; 
  index: number; 
  inView: boolean;
  prefersReducedMotion: boolean | null;
}) => {
  const Icon = card.icon;
  
  // Color configuration for different card types
  const colorConfig = {
    teal: {
      iconBg: 'bg-teal-500/20',
      iconColor: 'text-teal-400',
      dotColor: 'bg-teal-400',
    },
    amber: {
      iconBg: 'bg-teal-500/20',
      iconColor: 'text-teal-400',
      dotColor: 'bg-teal-400',
    },
    white: {
      iconBg: 'bg-white/10',
      iconColor: 'text-white',
      dotColor: 'bg-white',
    },
  };

  const colors = colorConfig[card.color];

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 10 : 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.6,
        delay: prefersReducedMotion ? 0.1 : card.delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.03, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      {/* Glass card with dark glassmorphism */}
      <div className="relative flex items-center gap-4 px-5 py-4 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
        {/* Icon container */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colors.iconColor}`} />
        </div>
        
        {/* Text content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-1.5 h-1.5 ${colors.dotColor} rounded-full animate-pulse`} />
            <h4 className="text-white font-semibold text-sm tracking-wide">
              {card.title}
            </h4>
          </div>
          <p className="text-gray-400 text-xs">
            {card.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Premium Dark Immersive Hero Section
 * 
 * A full-viewport dark cinematic hero inspired by Apple and Dyson product pages.
 * Features the SLEEK toothbrush with dramatic lighting effects while communicating
 * the dual value proposition of premium sonic technology AND dental insurance.
 * 
 * Key features:
 * - Dark gradient background with particle effects
 * - Floating product showcase with ambient glow
 * - Word-by-word animated headline
 * - Glassmorphic feature cards highlighting Tech + Insurance + Value
 * - Premium CTAs with glow effects
 * - Scroll indicator
 */
export default function Hero({
  headline = "Premium Sonic Tech. Complete Dental Coverage.",
  subheadline = "Experience the perfect fusion of cutting-edge sonic technology and comprehensive dental insurance. One membership, total oral care.",
  ctaText = "Find My Perfect Plan",
  secondaryCtaText = "See How It Works",
  mediaSrc = "/images/hero/sleek-box-premium.png",
  mediaAlt = "SLEEK Premium Electric Toothbrush Kit",
  onCtaClick = () => { window.location.href = 'https://enrollment.sleekdentalclub.com/onboarding'; },
  onSecondaryCtaClick = () => { document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' }); },
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '100px',
  });

  // Check for mobile device and hydration
  useEffect(() => {
    setIsClient(true);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Trigger animations when in view, with fallback timeout
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
    
    // Fallback: trigger animation after a short delay if intersection observer doesn't fire
    const fallbackTimer = setTimeout(() => {
      controls.start('visible');
    }, 300);
    
    return () => clearTimeout(fallbackTimer);
  }, [controls, inView]);

  /**
   * Feature cards configuration highlighting the dual value proposition.
   * Tech + Insurance + Value creates a complete picture of the SLEEK offering.
   */
  const featureCards: FeatureCard[] = [
    {
      icon: Zap,
      title: "31,000 Vibrations/min",
      subtitle: "Professional sonic cleaning power",
      color: 'teal',
      delay: 0.8,
    },
    {
      icon: ShieldCheck,
      title: "Dental Insurance Included",
      subtitle: "PRO & MAX memberships",
      color: 'teal',
      delay: 1.0,
    },
    {
      icon: Sparkles,
      title: "Quarterly Refills",
      subtitle: "Brush heads delivered free",
      color: 'white',
      delay: 1.2,
    },
  ];

  // Animation variants with premium easing
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

  const textVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Word animation for headline with blur reveal
  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 10 : 40, 
      filter: "blur(8px)",
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : 0.3 + custom * 0.08,
      },
    }),
  };

  const imageVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 0.98 : 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.5 : 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0.1 : 0.15,
      },
    },
  };

  const ctaVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Split headline into words for animation
  const headlineWords = headline.split(' ');
  
  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ===== DARK CINEMATIC BACKGROUND ===== */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0C1015 0%, #0F1518 30%, #141B1D 60%, #1B2223 100%)',
          }}
        />
        
        {/* Radial glow behind product area */}
        <div 
          className="absolute top-1/2 right-0 md:right-[15%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, rgba(20, 184, 166, 0.05) 40%, transparent 70%)',
          }}
        />
        
        {/* Secondary ambient glow */}
        {/* Secondary ambient glow - disabled animation on mobile */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%)',
          }}
          animate={(prefersReducedMotion || isMobile) ? {} : {
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Particle field for ambient depth */}
        {isClient && <ParticleField prefersReducedMotion={prefersReducedMotion} isMobile={isMobile} />}
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'url("/images/grid-pattern.svg")',
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      {/* Mobile uses pt-24 for nav clearance, pb-16 for content breathing room */}
      <div className="container-standard relative z-10 pt-24 pb-16 md:py-0">
        {/* Mobile: flex-col with ordering, Desktop: grid-cols-2 */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 items-center min-h-[calc(100vh-10rem)]">
          
          {/* ===== SECTION 1: TEXT HEADER (Badge + Headline + Subheadline + Desktop CTAs) ===== */}
          {/* Mobile: order-1 (top), Desktop: left column with vertical centering */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="relative z-10 text-center lg:text-left order-1"
          >
            {/* Premium badge */}
            <motion.div
              variants={textVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-teal-500/30"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(20, 184, 166, 0.05) 100%)',
              }}
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-semibold text-teal-300 tracking-wide uppercase">
                Premium Dental Care
              </span>
            </motion.div>

            {/* Animated headline with word-by-word reveal - text-3xl on narrow screens (375px) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6 font-heading">
              {prefersReducedMotion ? (
                <span className="text-white">{headline}</span>
              ) : (
                <span className="inline-flex flex-wrap justify-center lg:justify-start">
                  {headlineWords.map((word, index) => {
                    // Apply gradient to key words for emphasis
                    const isGradientWord = ['Premium', 'Sonic', 'Tech.', 'Complete', 'Dental', 'Coverage.'].includes(word);
                    
                    return (
                      <motion.span
                        key={index}
                        custom={index}
                        variants={wordVariants}
                        initial="hidden"
                        animate={controls}
                        className={`inline-block mr-[0.2em] ${
                          isGradientWord && (word === 'Sonic' || word === 'Tech.')
                            ? 'bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent pb-1'
                            : isGradientWord && (word === 'Dental' || word === 'Coverage.')
                            ? 'bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent pb-1'
                            : 'text-white'
                        }`}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </span>
              )}
            </h1>
            
            {/* Subheadline */}
            <motion.p 
              variants={textVariants}
              className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0 lg:mb-10"
            >
              {subheadline}
            </motion.p>
            
            {/* Desktop-only CTA Buttons - shown inline with text on desktop */}
            <motion.div variants={ctaVariants} className="hidden lg:flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              {/* Primary CTA with glow effect */}
              <motion.button
                onClick={onCtaClick}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                  boxShadow: '0 0 30px rgba(20, 184, 166, 0.3)',
                }}
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.03,
                  boxShadow: '0 0 50px rgba(20, 184, 166, 0.5)',
                }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                {/* Shimmer effect */}
                <span 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                  }}
                />
                <span className="relative z-10">{ctaText}</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              {/* Secondary CTA - ghost style for dark background */}
              <motion.button
                onClick={onSecondaryCtaClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white/90 border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <span>{secondaryCtaText}</span>
              </motion.button>
            </motion.div>

            {/* Desktop-only Trust indicators */}
            <motion.div 
              variants={textVariants}
              className="hidden lg:flex items-center gap-6 text-sm text-gray-500 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400">30-Day Guarantee</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* ===== SECTION 2: PRODUCT SHOWCASE ===== */}
          {/* Mobile: order-2 (middle), Desktop: right column */}
          <motion.div
            className="relative order-2"
            variants={imageVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="relative h-[280px] sm:h-[350px] md:h-[550px] lg:h-[600px] w-full">
              {/* Pulsing ambient glow behind product - disabled on mobile */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={(prefersReducedMotion || isMobile) ? {} : {
                  scale: [1, 1.05, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div 
                  className="w-[80%] h-[80%] rounded-full blur-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.25) 0%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)',
                  }}
                />
              </motion.div>
              
              {/* Product image with floating animation - OVERSIZED and ROTATED for dramatic effect
                  Animation disabled on mobile for performance. Uses initial prop for rotation to avoid
                  conflict between inline style and framer-motion on mobile where animate is empty.
                  z-10 ensures image stays above background glow but below feature tags (z-20). */}
              <motion.div
                className="relative z-10 h-full w-full flex items-center justify-center"
                initial={{ rotate: -8 }}
                animate={(prefersReducedMotion || isMobile) ? { rotate: -8 } : {
                  y: [0, -20, 0],
                  rotate: [-8, -6, -8],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Oversized container - adjusted mobile heights to fit within parent container
                    while maintaining visual impact. Uses max-w on mobile to prevent overflow on 375px screens */}
                <div className="relative w-full max-w-[280px] h-[260px] sm:max-w-[340px] sm:h-[330px] md:w-[550px] md:max-w-none md:h-[720px] lg:w-[650px] lg:h-[850px] xl:w-[750px] xl:h-[950px]">
                  <Image
                    src={mediaSrc}
                    alt={mediaAlt}
                    fill
                    priority
                    className="object-contain drop-shadow-[0_0_80px_rgba(20,184,166,0.3)]"
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 550px, (max-width: 1280px) 650px, 750px"
                  />
                </div>
              </motion.div>
              
              {/* ===== DESKTOP FEATURE CARDS - Floating around product ===== */}
              {/* z-20 ensures cards float above the product image (z-10) */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="hidden lg:block">
                  {/* Top right card */}
                  <div className="absolute top-[10%] right-0 xl:right-[-5%] pointer-events-auto">
                    <FeatureCardComponent 
                      card={featureCards[0]} 
                      index={0} 
                      inView={inView}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>
                  
                  {/* Middle left card */}
                  <div className="absolute top-[45%] left-0 xl:left-[-10%] pointer-events-auto">
                    <FeatureCardComponent 
                      card={featureCards[1]} 
                      index={1} 
                      inView={inView}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>
                  
                  {/* Bottom center card */}
                  <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 pointer-events-auto">
                    <FeatureCardComponent 
                      card={featureCards[2]} 
                      index={2} 
                      inView={inView}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </div>
                </div>
              </div>
              
              {/* ===== MOBILE FEATURE TAGS - Small tags surrounding product ===== */}
              {/* z-20 ensures tags float above the product image (z-10) */}
              <div className="lg:hidden absolute inset-0 z-20 pointer-events-none">
                {/* Top left tag */}
                <motion.div 
                  className="absolute top-[5%] left-[2%] pointer-events-auto"
                  variants={textVariants}
                  initial="hidden"
                  animate={controls}
                >
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur-md border border-white/10 bg-white/[0.05]">
                    <Zap className="w-3 h-3 text-teal-400" />
                    <span className="text-[10px] text-white/80 font-medium whitespace-nowrap">31,000 Vibrations/min</span>
                  </div>
                </motion.div>
                
                {/* Top right tag */}
                <motion.div 
                  className="absolute top-[15%] right-[2%] pointer-events-auto"
                  variants={textVariants}
                  initial="hidden"
                  animate={controls}
                >
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur-md border border-white/10 bg-white/[0.05]">
                    <ShieldCheck className="w-3 h-3 text-teal-400" />
                    <span className="text-[10px] text-white/80 font-medium whitespace-nowrap">Dental Insurance Included</span>
                  </div>
                </motion.div>
                
                {/* Bottom center tag */}
                <motion.div 
                  className="absolute bottom-[5%] left-1/2 -translate-x-1/2 pointer-events-auto"
                  variants={textVariants}
                  initial="hidden"
                  animate={controls}
                >
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur-md border border-white/10 bg-white/[0.05]">
                    <Sparkles className="w-3 h-3 text-white/70" />
                    <span className="text-[10px] text-white/80 font-medium whitespace-nowrap">Quarterly Refills Included</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* ===== SECTION 3: MOBILE CTAs AND TRUST INDICATORS ===== */}
          {/* Mobile: order-3 (bottom), Hidden on desktop (shown inline above) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="lg:hidden order-3 text-center w-full"
          >
            {/* Mobile CTA Buttons */}
            <motion.div variants={ctaVariants} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              {/* Primary CTA with glow effect */}
              <motion.button
                onClick={onCtaClick}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white text-base overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                  boxShadow: '0 0 30px rgba(20, 184, 166, 0.3)',
                }}
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.03,
                  boxShadow: '0 0 50px rgba(20, 184, 166, 0.5)',
                }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                {/* Shimmer effect */}
                <span 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                  }}
                />
                <span className="relative z-10">{ctaText}</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              {/* Secondary CTA - ghost style for dark background */}
              <motion.button
                onClick={onSecondaryCtaClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-white/90 border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <span>{secondaryCtaText}</span>
              </motion.button>
            </motion.div>

            {/* Mobile Trust indicators */}
            <motion.div 
              variants={textVariants}
              className="flex items-center gap-4 text-sm text-gray-500 justify-center"
            >
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400 text-xs">Free Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400 text-xs">30-Day Guarantee</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ===== SCROLL INDICATOR =====
          Uses left-0 right-0 + justify-center instead of translate-x-1/2 because
          framer-motion overwrites the transform property with its animations.
          Hidden on mobile (md:flex) for cleaner mobile experience. */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 hidden md:flex flex-col items-center justify-center text-white/50 text-sm gap-2 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="tracking-wide text-xs uppercase">Scroll to explore</span>
        <motion.div
          animate={(prefersReducedMotion || isMobile) ? {} : {
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
