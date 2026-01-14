'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Hero: React.FC = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-b from-[#070708] to-[#141526]">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-[#0c1124]/90 mix-blend-overlay z-0"></div>
      
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-[0.05] z-0"></div>
      
      {/* Gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1ab9a3] via-[#dbe7ed] to-[#1ab9a3] z-10"></div>
      
      {/* Main content */}
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20 z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-2 gap-12 md:gap-8 items-center"
        >
          {/* Left column - Text content */}
          <div className="text-white">
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="bg-gradient-to-r from-[#1ab9a3] to-[#dbe7ed] bg-clip-text text-transparent font-medium">
                Premium Oral Care • Delivered
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-white">A Dental Experience</span>
              <span className="block text-[#1ab9a3] mt-2">
                Worth Smiling About
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg font-normal leading-relaxed text-gray-300 mb-8 max-w-xl">
              Get a premium smart toothbrush and dentist-approved oral care products, delivered right to your door on a schedule that works for you.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  href="https://enrollment.sleekdentalclub.com/onboarding"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#1ab9a3] text-white font-medium shadow-lg hover:shadow-xl hover:bg-[#15a592] transition-all duration-300"
                >
                  Join Now
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  href="/#learn-more"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/15 transition-all duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Feature list */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Smart Sonic Technology",
                "5 Cleaning Modes",
                "Quarterly Refill Delivery",
                "Mobile App Connectivity"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1ab9a3]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#1ab9a3]"></div>
                  </div>
                  <span className="text-sm text-gray-200">{feature}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Right column - Product showcase */}
          <motion.div 
            variants={itemVariants}
            className="relative flex items-center justify-center"
          >
            {/* Backdrop glow */}
            <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[#1ab9a3]/10 filter blur-xl z-0"></div>
            
            {/* Product image container with floating animation */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <div className="relative w-[300px] h-[450px] md:w-[400px] md:h-[550px]">
                <Image
                  src="/images/SleekKit.jpg"
                  alt="SLEEK Premium Toothbrush Kit"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 300px, 400px"
                />
              </div>
              
              {/* Feature badges */}
              <motion.div 
                animate={{ 
                  x: [0, 5, 0],
                  rotate: [0, 2, 0],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 -right-12 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/10 text-white shadow-lg"
              >
                Smart Timer
              </motion.div>
              
              <motion.div 
                animate={{ 
                  x: [0, -5, 0],
                  rotate: [0, -2, 0],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut"
                }}
                className="absolute bottom-1/4 -left-12 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/10 text-white shadow-lg"
              >
                USB-C Charging
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 text-sm gap-2 z-20"
      >
        <span>Scroll to explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-9 rounded-full border border-white/20 flex items-center justify-center p-1"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 