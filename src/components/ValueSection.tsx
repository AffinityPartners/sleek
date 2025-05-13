'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

// --- Framer Motion Variants ---
const viewport = { once: true, margin: '-100px' };

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.6, -0.05, 0.01, 0.99] }
  }
});

const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

// --- Component ---
export default function ValueSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  
  // Retry logic for video loading
  useEffect(() => {
    if (hasError && loadAttempts < 3) {
      const timer = setTimeout(() => {
        setIsLoading(true);
        setHasError(false);
        setLoadAttempts(prev => prev + 1);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [hasError, loadAttempts]);
  
  return (
    <section className="py-28 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Text on Left, Video on Right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.2)}
          className="grid md:grid-cols-5 gap-12 md:gap-16 items-center mb-24 md:mb-32"
        >
          {/* Left Column: Content */}
          <motion.div variants={fadeIn()} className="md:col-span-2 text-left">
            <motion.span 
              variants={fadeIn(0.1)}
              className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold tracking-wider px-3 py-1 rounded-full mb-4 uppercase"
            >
              Advanced Oral Care
            </motion.span>
            <motion.h2 
              variants={fadeIn(0.2)}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight"
            >
              SLEEK, A Modern Dental Care Solution
            </motion.h2>
            <motion.p 
              variants={fadeIn(0.3)}
              className="text-xl text-teal-600 font-medium mb-8"
            >
              Professional-Grade Cleaning & Benefits Together
            </motion.p>
            <motion.p 
              variants={fadeIn(0.4)}
              className="text-gray-700 text-lg leading-relaxed mb-12"
            >
              We provide members with advanced sonic technology that removes up to 10x more plaque than manual brushing. Each membership includes a premium sonic electric toothbrush welcome kit with quarterly brush head and floss picks auto shipped. Our OCP, PRO and MAX membership levels also include specialized dental care benefits to maintain optimal oral health year-round.
            </motion.p>

            {/* Membership Kit Details Card */}
            <motion.div
              variants={fadeIn(0.5)}
              whileHover={{ scale: 1.02, boxShadow: 'var(--tw-shadow-elevation-3)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 md:p-8 bg-gradient-teal-soft rounded-3xl shadow-elevation-2 backdrop-blur-sm border border-white/50"
            >
              <p className="font-semibold text-gray-900 mb-6 text-lg">Every SLEEK Membership kit contains:</p>
              <ul className="space-y-3">
                {[
                  "Sonic Toothbrush with 40,000 vibrations per minute",
                  "5 Cleaning Modes: Clean, White, Polish, Gum Care, Sensitive",
                  "Smart Timer with 30-second quadrant reminders",
                  "Pressure sensor to prevent gum damage",
                  "3-week battery life with USB-C charging",
                  "Antimicrobial brush head replacement quarterly",
                  "Premium travel case with ventilation"
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    variants={fadeIn(0.6 + index * 0.05)}
                    initial="hidden"
                    animate="visible"
                  >
                    <span className="flex-shrink-0 flex items-center justify-center bg-teal-500 text-white w-5 h-5 rounded-full mr-3 mt-1 shadow-sm">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700 text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
              {/* Removed Clinically proven benefits section */}
            </motion.div>
          </motion.div>

          {/* Right Column: Video */}
          <motion.div
            variants={fadeIn(0.1)} // Slight delay for smoother entry
            className="md:col-span-3 flex items-center justify-center h-full relative"
          >
            <div className="w-full rounded-3xl overflow-hidden shadow-elevation-3 bg-black relative aspect-video group">
              {isLoading && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                </div>
              )}

              {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10">
                  <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                  <p className="text-gray-700">Unable to load video</p>
                  <button 
                    onClick={() => {
                      setIsLoading(true);
                      setHasError(false);
                    }}
                    className="mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!hasError && (
                <iframe
                  title="vimeo-player"
                  src="https://player.vimeo.com/video/756870661?h=b858550a04&badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="rounded-3xl z-0"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                  }}
                ></iframe>
              )}
               {/* Optional: Floating card effect 
              <div className="absolute -right-6 -bottom-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-elevation-2 max-w-[200px] hidden lg:block z-20">
                <div className="flex items-start gap-3">
                  <span className="text-teal-500 flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </span>
                  <p className="text-xs text-gray-800">
                    <span className="font-semibold block mb-1">Dentist Recommended:</span>
                    9/10 professionals choose sonic tech.
                  </p>
                </div>
              </div>
              */}
            </div>
          </motion.div>
        </motion.div>

        {/* --- Science of Sonic Cleaning Section --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeIn(0.2)}
          className="my-24 md:my-32 bg-gradient-teal-subtle rounded-3xl p-8 md:p-12 lg:p-16 shadow-soft border border-gray-100/80"
        >
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            <motion.h2 variants={fadeIn(0.3)} className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              The Science of Sonic Cleaning
            </motion.h2>
            <motion.p variants={fadeIn(0.4)} className="text-gray-700 text-lg leading-relaxed">
              Our advanced sonic technology creates dynamic fluid movement that reaches deep between teeth and along the gumline.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer(0.15, 0.4)} 
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "40,000 Vibrations/Min",
                description: "Creates micro-bubbles that disrupt plaque biofilm even in hard-to-reach areas between teeth.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z" // Lightning Bolt
              },
              {
                title: "2-Minute Quadrant Timer",
                description: "Ensures you brush for the dentist-recommended full two minutes with 30-second zone reminders.",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" // Clock
              },
              {
                title: "Pressure Sensor",
                description: "Protects your gums by alerting you when you're brushing too hard, preventing enamel wear and gum recession.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" // Shield Check
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn()}
                whileHover={{ y: -6, boxShadow: 'var(--tw-shadow-elevation-2)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-elevation-1 border border-white/60 text-center md:text-left"
              >
                <div className="inline-flex md:flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-5 shadow-sm">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeIn(0.6)} className="mt-12 text-center">
            <p className="inline-block bg-teal-500/10 text-teal-800 text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
              Replace brush heads every 3 months for optimal cleaning
            </p>
          </motion.div>
        </motion.div>

        {/* --- Value of Membership Section --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeIn(0.2)}
          className="mt-24 md:mt-32"
        >
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <motion.h2 
              variants={fadeIn(0.3)}
              className="text-4xl md:text-5xl font-bold text-teal-600 mb-5 leading-tight"
            >
              The Value of SLEEK Membership
            </motion.h2>
            <motion.p variants={fadeIn(0.4)} className="text-gray-700 text-lg md:text-xl leading-relaxed">
              An exclusive dental care experience with comprehensive oral health benefits.
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer(0.1, 0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto"
          >
            {[
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z", // Lightning Bolt
                title: "Premium Sonic Toothbrush",
                description: "Professional-grade cleaning technology for healthier teeth & gums"
              },
              {
                icon: "M4 6h16M4 10h16M4 14h16M4 18h16", // List
                title: "Membership Options",
                description: "Three Club Levels to fit your dental care needs"
              },
              {
                icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", // Package
                title: "Quarterly Brush Refreshes",
                description: "New antimicrobial brush heads & floss picks auto-shipped"
              },
              {
                icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", // Device Phone Mobile
                title: "Digital Dental Dashboard",
                description: "Track benefits, brushing habits, and oral health progress"
              },
              {
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", // Heart
                title: "Dental Care Savings",
                description: "Up to 50% off regular dental visits, cleanings & procedures"
              },
              {
                icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z", // Users
                title: "Family Plans Available",
                description: "Protect everyone's smile with multi-user memberships"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn()}
                whileHover={{ y: -6, boxShadow: 'var(--tw-shadow-elevation-1)' }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-soft border border-gray-100/80"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-teal-soft flex items-center justify-center mb-6 shadow-sm ring-1 ring-teal-500/10">
                  <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* --- Final CTA Section --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeIn(0.2)}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 md:mt-32 text-center max-w-3xl mx-auto"
        >
          <motion.h3 variants={fadeIn(0.3)} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">
            Complete Oral Health, Delivered
          </motion.h3>
          <motion.p variants={fadeIn(0.4)} className="text-gray-700 text-lg leading-relaxed">
            Advanced dental technology and care that puts professional-grade cleaning in the palm of your hand, literally.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
} 