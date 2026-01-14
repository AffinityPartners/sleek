'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ChevronRight, Sparkles, Timer, Battery, Zap, RefreshCw } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.04, 0.62, 0.23, 0.98]
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.04, 0.62, 0.23, 0.98]
    }
  }
};

/**
 * Feature badges displayed around the product image.
 * Highlights key product features based on actual SLEEK toothbrush specifications.
 */
const featureBadges = [
  { 
    icon: <Zap size={18} />, 
    label: "Sonic Cleaning Power",
    position: "top-1/3 right-[5%] md:right-[8%] lg:right-[15%]"
  },
  { 
    icon: <Timer size={18} />, 
    label: "2-Minute Smart Timer",
    position: "bottom-1/3 right-[5%] md:right-[8%] lg:right-[15%]"
  },
  { 
    icon: <Battery size={18} />, 
    label: "Up to 3 Weeks Per Charge",
    position: "top-1/3 left-[5%] md:left-[8%] lg:left-[15%]"
  },
  { 
    icon: <RefreshCw size={18} />, 
    label: "Quarterly Refills",
    position: "bottom-1/3 left-[5%] md:left-[8%] lg:left-[15%]"
  },
];

export default function ToothbrushPromo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeMode, setActiveMode] = useState('clean');

  const cleaningModes = [
    { id: 'clean', name: 'Clean', description: 'Everyday thorough cleaning mode' },
    { id: 'white', name: 'White', description: 'Polishing for a brighter smile' },
    { id: 'gum', name: 'Gum Care', description: 'Gentle gum stimulation and massage' },
    { id: 'sensitive', name: 'Sensitive', description: 'Extra gentle for sensitive teeth' },
    { id: 'deep', name: 'Deep Clean', description: 'Intensive cleaning session' },
  ];

  return (
    <section 
      id="toothbrush" 
      ref={ref}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-24 left-1/4 w-64 h-64 rounded-full bg-[#00e0cb]/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#5cbbff]/5 blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-2/3 h-2/3 opacity-[0.03] bg-[url('/images/grid-pattern.svg')] bg-repeat" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center mb-4">
            <span className="px-4 py-1 rounded-full bg-[#00e0cb]/10 text-[#00e0cb] text-sm font-medium">
              SLEEK Dental Club Membership
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants} 
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Advanced Toothbrush Technology
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Experience premium oral care with our smart sonic electric toothbrush, delivered to your door with quarterly refills
          </motion.p>
        </motion.div>

        {/* Full width image section */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative mb-20"
        >
          {/* Product image with glow effect */}
          <motion.div 
            variants={imageVariants}
            className="relative w-full flex justify-center"
          >
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[70%] max-w-3xl mx-auto -z-10 bg-gradient-to-r from-gray-900/10 to-[#5cbbff]/10 rounded-full blur-xl opacity-70" />
            
            <div className="relative w-full max-w-xl h-[550px] md:h-[650px] mx-auto">
              <Image 
                src="/images/SleekKit.png" 
                alt="SLEEK Electric Toothbrush Kit" 
                fill
                className="object-contain z-10"
                priority
              />
            </div>
            
            {/* Feature badges around product */}
            {featureBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                className={`absolute ${badge.position} bg-black/90 text-white shadow-lg backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 z-20 hidden md:flex`}
              >
                <span className="text-[#00e0cb]">{badge.icon}</span>
                <span className="text-sm font-medium">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Features section - now full width under the image */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left column - Cleaning modes */}
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold mb-6"
            >
              The Complete SLEEK Dental Experience
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 mb-8"
            >
              SLEEK Dental Club members receive a premium sonic electric toothbrush welcome kit with quarterly brush head and floss picks auto-shipped. Enjoy a professional clean feeling with every brush, powered by advanced sonic technology.
            </motion.p>
            
            {/* Interactive cleaning modes selector */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <h4 className="text-lg font-semibold mb-3">5 Professional Cleaning Modes</h4>
              <div className="bg-gray-100 p-1.5 rounded-xl flex flex-wrap gap-2 mb-4">
                {cleaningModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeMode === mode.id
                        ? 'bg-white shadow-md text-[#00e0cb]'
                        : 'text-gray-600 hover:bg-gray-200/50'
                    }`}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
              <p className="text-gray-600 text-sm italic">
                {cleaningModes.find(m => m.id === activeMode)?.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Right column - Kit contents and CTA */}
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Kit contents */}
            {/* Kit contents list based on actual SLEEK product specifications */}
            <motion.div
              variants={itemVariants}
              className="mb-10"
            >
              <h4 className="text-lg font-semibold mb-4">Every SLEEK Dental Kit Includes:</h4>
              <div className="space-y-3">
                {[
                  "Sonic Electric Toothbrush with 5 Cleaning Modes",
                  "Brush Head with 2-Minute Smart Timer",
                  "Built-In Rechargeable USB Charger",
                  "Toothbrush Holder & Travel Case",
                  "Quarterly Replacement Heads & Floss Picks"
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.8 + idx * 0.1, duration: 0.3 }}
                    className="flex items-start"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#00e0cb] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* CTA button */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="https://enrollment.sleekdentalclub.com/onboarding"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#00e0cb] to-[#5cbbff] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Join SLEEK Dental Club</span>
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.a>
              <p className="mt-3 text-sm text-gray-500">Starts at just $29.95/month</p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Divider with icon */}
        <div className="mt-24 flex items-center justify-center">
          <div className="h-px w-full max-w-sm bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <div className="mx-4 p-2 rounded-full bg-[#00e0cb]/10">
            <Sparkles className="h-5 w-5 text-[#00e0cb]" />
          </div>
          <div className="h-px w-full max-w-sm bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>
      </div>
    </section>
  );
} 