'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#0a1e2c] to-[#0d2837] text-white">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#00e0cb]/10 blur-[100px] opacity-60" />
        <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] rounded-full bg-[#5cbbff]/10 blur-[100px] opacity-70" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-[0.02]"></div>
      </div>

      <motion.div
        className="max-w-md w-full mx-auto px-4 py-20 text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Toothbrush icon */}
        <motion.div variants={itemVariants} className="mb-8 mx-auto">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00e0cb]/20 to-[#5cbbff]/20 rounded-full blur-lg"></div>
            <div className="relative w-full h-full flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full">
              <Sparkles className="h-10 w-10 text-[#00e0cb]" />
            </div>
          </div>
        </motion.div>

        {/* 404 text */}
        <motion.h1 
          variants={itemVariants} 
          className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#00e0cb] to-[#5cbbff] bg-clip-text text-transparent"
        >
          404
        </motion.h1>
        
        <motion.h2 
          variants={itemVariants} 
          className="text-2xl font-bold mb-6"
        >
          Page Not Found
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-gray-300 mb-10"
        >
          Oops! The page you're looking for seems to have vanished like plaque after a good brushing.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00e0cb] to-[#5cbbff] rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#00e0cb]/20"
          >
            <Home size={18} />
            <span>Go Home</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-white font-medium transition-all duration-300 hover:bg-white/20"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </motion.div>
        
        {/* Brand element */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 flex justify-center items-center"
        >
          <div className="flex items-center gap-2">
            <Image
              src="/images/SLEEK-Favicon.png"
              alt="SLEEK Dental"
              width={24}
              height={24}
            />
            <span className="text-sm font-medium text-white/70">SLEEK Dental</span>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
} 