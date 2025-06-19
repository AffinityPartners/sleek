"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

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

  // Animation variants adjusted for reduced motion
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.05 : 0.15,
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
        duration: prefersReducedMotion ? 0.4 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Word animation for headline - more natural flow than per-letter
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 40, filter: "blur(8px)" },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : custom * 0.1,
      },
    }),
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 0.97 : 0.92, y: prefersReducedMotion ? 10 : 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.6 : 1.2,
        ease: "easeOut",
        delay: prefersReducedMotion ? 0.1 : 0.3,
      },
    },
  };

  const ctaVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.7,
        ease: "easeOut",
        delay: prefersReducedMotion ? 0.1 : 0.6,
      },
    },
  };

  const bgElementVariants: Variants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 0.9 : 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.7 : 1.5,
        ease: "easeOut",
      },
    },
  };

  // Split headline by words for better animation
  const headlineWords = headline.split(' ');
  
  return (
    <section className="section-padding-lg bg-white overflow-hidden relative" ref={ref}>
      {/* Background animated elements - only animate if not reduced motion */}
      <motion.div 
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
        variants={bgElementVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div 
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[60%] bg-gradient-to-tr from-teal-500/8 to-blue-500/8 rounded-full z-0"
          animate={prefersReducedMotion ? {} : { 
            scale: [1, 1.05, 1],
            rotate: [0, 3, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[50%] bg-gradient-to-br from-blue-500/8 to-teal-500/8 rounded-full z-0"
          animate={prefersReducedMotion ? {} : { 
            scale: [1, 1.1, 1],
            rotate: [0, -3, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </motion.div>

      <div className="container-standard relative z-10">
        <div className="grid md:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* Left column - Text content with staggered animation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="relative z-10"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6 font-heading"
            >
              {/* If reduced motion is preferred, don't animate each word */}
              {prefersReducedMotion ? (
                headline
              ) : (
                <span className="inline-flex flex-wrap">
                  {headlineWords.map((word, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={wordVariants}
                      className="inline-block mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              )}
            </motion.h1>
            
            <motion.p 
              variants={textVariants}
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg"
            >
              {subheadline}
            </motion.p>
            
            <motion.div variants={ctaVariants} className="flex">
              <motion.button
                onClick={onCtaClick}
                className="btn-primary-lg group"
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.35)" 
                }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <span>{ctaText}</span>
                <ArrowRight className="ml-2 h-5 w-5 opacity-70 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Right column - Media content with enhanced visuals */}
          <motion.div
            className="relative mt-8 md:mt-0"
            variants={imageVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="relative h-[350px] md:h-[450px] lg:h-[500px] w-full">
              {mediaType === 'image' && (
                <motion.div
                  className="h-full w-full rounded-2xl overflow-hidden relative p-3"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.02,
                    transition: { duration: 0.3 } 
                  }}
                >
                  {/* Enhanced image container with subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-blue-500/5 rounded-2xl" />
                  
                  <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={mediaSrc}
                      alt={mediaAlt}
                      fill
                      className="object-contain"
                      priority={!isMobile}
                      loading={isMobile ? "lazy" : "eager"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Subtle reflection effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent rounded-b-2xl mix-blend-overlay pointer-events-none" />
                </motion.div>
              )}
              {mediaType === 'video' && (
                <motion.div 
                  className="h-full w-full rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.02,
                    transition: { duration: 0.3 } 
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
              
              {/* Decorative animated elements */}
              {!prefersReducedMotion && (
                <>
                  <motion.div 
                    className="absolute -bottom-10 -right-10 w-72 h-72 bg-teal-500/8 rounded-full z-0 blur-2xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <motion.div 
                    className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/8 rounded-full z-0 blur-2xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 0],
                      y: [0, 5, 0]
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1
                    }}
                  />
                </>
              )}
              
              {/* Feature badges with improved design */}
              <AnimatePresence>
                {inView && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: prefersReducedMotion ? 10 : 30, y: prefersReducedMotion ? 5 : 10 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0, 
                        y: 0,
                        transition: { 
                          delay: prefersReducedMotion ? 0.3 : 0.9, 
                          duration: prefersReducedMotion ? 0.3 : 0.6 
                        }
                      }}
                      className="absolute top-[20%] right-0 px-6 py-3 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-teal-500/10 text-teal-600 font-medium z-10"
                      whileHover={{ scale: 1.05, y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                    >
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
                        Smart Timer
                      </span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: prefersReducedMotion ? -10 : -30, y: prefersReducedMotion ? 5 : 10 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0, 
                        y: 0,
                        transition: { 
                          delay: prefersReducedMotion ? 0.4 : 1.1, 
                          duration: prefersReducedMotion ? 0.3 : 0.6 
                        }
                      }}
                      className="absolute bottom-[25%] left-0 px-6 py-3 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-blue-500/10 text-blue-600 font-medium z-10"
                      whileHover={{ scale: 1.05, y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                    >
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                        Premium Quality
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: prefersReducedMotion ? 10 : 30 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: prefersReducedMotion ? 0.5 : 1.3, 
                          duration: prefersReducedMotion ? 0.3 : 0.6 
                        }
                      }}
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-200/40 text-gray-800 font-medium z-10"
                      whileHover={{ scale: 1.05, y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                    >
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-2 animate-pulse"></span>
                        30-Day Battery Life
                      </span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 