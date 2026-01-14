"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Sparkles, Zap, Battery } from 'lucide-react';

/**
 * Hero component props for customizing the hero section content and media.
 * Supports both image and video media types with light/dark variants.
 */
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  mediaType: string;
  mediaSrc: string;
  mediaAlt: string;
  onCtaClick: () => void;
  variant?: 'light' | 'dark';
}

/**
 * Premium Hero section component with animated content reveal,
 * floating feature badges, and gradient mesh backgrounds.
 * Designed to create an impactful first impression with bold typography
 * and sophisticated animations.
 */
export default function Hero({
  headline = "A Dental Experience Worth Smiling About",
  subheadline = "Get a premium smart toothbrush and dentist-approved oral care, delivered to your door.",
  ctaText = "Join Now",
  mediaType = "image",
  mediaSrc = "/images/SleekKit.jpg",
  mediaAlt = "Smart toothbrush product image",
  onCtaClick = () => {},
  variant = "light"
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile device on component mount
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants with premium easing curves
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.05 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Word animation for headline with blur reveal effect
  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 10 : 50, 
      filter: "blur(10px)",
      scale: 0.95 
    },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : custom * 0.08,
      },
    }),
  };

  const imageVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 0.97 : 0.9, 
      y: prefersReducedMotion ? 10 : 30 
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.6 : 1,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0.1 : 0.2,
      },
    },
  };

  const ctaVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0.1 : 0.5,
      },
    },
  };

  // Split headline by words for better animation
  const headlineWords = headline.split(' ');
  
  // Feature badges configuration with icons
  const featureBadges = [
    { 
      icon: Zap, 
      text: "Smart Timer", 
      position: "top-[15%] right-0 md:right-[-5%]",
      color: "teal",
      delay: 0.9 
    },
    { 
      icon: Sparkles, 
      text: "Premium Quality", 
      position: "bottom-[30%] left-0 md:left-[-5%]",
      color: "amber",
      delay: 1.1 
    },
    { 
      icon: Battery, 
      text: "30-Day Battery", 
      position: "bottom-[5%] left-1/2 -translate-x-1/2",
      color: "gray",
      delay: 1.3 
    },
  ];
  
  return (
    <section className="section-padding-lg overflow-hidden relative" ref={ref}>
      {/* Premium gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient mesh */}
        <div className="absolute inset-0 bg-gradient-mesh-teal opacity-60" />
        
        {/* Animated ambient blobs */}
        <motion.div 
          className="absolute -bottom-[20%] -right-[15%] w-[60%] h-[70%] rounded-full blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)' 
          }}
          animate={prefersReducedMotion ? {} : { 
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -top-[20%] -left-[15%] w-[50%] h-[60%] rounded-full blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)' 
          }}
          animate={prefersReducedMotion ? {} : { 
            scale: [1, 1.15, 1],
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container-standard relative z-10">
        <div className="grid md:grid-cols-2 items-center gap-12 lg:gap-20">
          {/* Left column - Text content with staggered animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="relative z-10"
          >
            {/* Premium badge */}
            <motion.div
              variants={textVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-teal-200/50"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(15, 118, 110, 0.05) 100%)'
              }}
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700 tracking-wide">
                PREMIUM DENTAL CARE
              </span>
            </motion.div>

            {/* Animated headline with word-by-word reveal */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-8 font-heading"
            >
              {prefersReducedMotion ? (
                headline
              ) : (
                <span className="inline-flex flex-wrap">
                  {headlineWords.map((word, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={wordVariants}
                      className="inline-block mr-[0.2em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              )}
            </motion.h1>
            
            {/* Subheadline with refined typography */}
            <motion.p 
              variants={textVariants}
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-xl"
            >
              {subheadline}
            </motion.p>
            
            {/* CTA Button with premium glow effect */}
            <motion.div variants={ctaVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={onCtaClick}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                }}
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.03,
                }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                {/* Glow effect behind button */}
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)'
                  }}
                />
                {/* Shimmer effect on hover */}
                <span 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                  }}
                />
                <span className="relative z-10">{ctaText}</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-gray-700 border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <span>Watch Video</span>
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              variants={textVariants}
              className="mt-10 flex items-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>30-Day Guarantee</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right column - Media content with enhanced visuals */}
          <motion.div
            className="relative mt-8 md:mt-0"
            variants={imageVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="relative h-[400px] md:h-[500px] lg:h-[560px] w-full">
              {/* Ambient glow behind image */}
              <div 
                className="absolute inset-0 blur-3xl opacity-40 scale-90"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.3) 0%, transparent 70%)'
                }}
              />
              
              {mediaType === 'image' && (
                <motion.div
                  className="relative h-full w-full rounded-3xl overflow-hidden"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.02,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
                  }}
                >
                  {/* Premium card styling for image container */}
                  <div className="absolute inset-0 rounded-3xl p-1 bg-gradient-to-br from-teal-200/30 via-white/50 to-amber-100/20">
                    <div className="relative h-full w-full rounded-[22px] overflow-hidden bg-white shadow-elevation-3">
                      <Image
                        src={mediaSrc}
                        alt={mediaAlt}
                        fill
                        className="object-contain p-4"
                        priority={!isMobile}
                        loading={isMobile ? "lazy" : "eager"}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  
                  {/* Subtle top highlight */}
                  <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </motion.div>
              )}
              
              {mediaType === 'video' && (
                <motion.div 
                  className="relative h-full w-full rounded-3xl overflow-hidden shadow-elevation-4"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.02,
                    transition: { duration: 0.4 } 
                  }}
                >
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    preload="none"
                  >
                    <source src={mediaSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              )}
              
              {/* Feature badges with premium styling */}
              <AnimatePresence>
                {inView && featureBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  const colorClasses = {
                    teal: 'bg-teal-500 text-teal-600 border-teal-200/50',
                    amber: 'bg-amber-500 text-amber-600 border-amber-200/50',
                    gray: 'bg-gray-700 text-gray-700 border-gray-200/50',
                  };
                  const dotColor = badge.color === 'teal' ? 'bg-teal-500' : badge.color === 'amber' ? 'bg-amber-500' : 'bg-gray-700';
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ 
                        opacity: 0, 
                        scale: 0.8,
                        y: prefersReducedMotion ? 5 : 20 
                      }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        y: 0,
                        transition: { 
                          delay: prefersReducedMotion ? 0.3 : badge.delay, 
                          duration: prefersReducedMotion ? 0.3 : 0.5,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      }}
                      className={`absolute ${badge.position} z-20`}
                      whileHover={prefersReducedMotion ? {} : { 
                        scale: 1.05, 
                        y: -5,
                      }}
                    >
                      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-xl shadow-elevation-2 border border-gray-100/80">
                        <span className={`w-2.5 h-2.5 ${dotColor} rounded-full animate-pulse`} />
                        <span className="font-semibold text-gray-800 text-sm">
                          {badge.text}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
