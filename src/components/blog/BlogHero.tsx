'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/**
 * Props for the BlogHero component.
 */
interface BlogHeroProps {
  /** Optional title override (defaults to "Tips and Insights") */
  title?: string;
  /** Optional subtitle override */
  subtitle?: string;
  /** Number of total posts to display */
  postCount?: number;
}

/**
 * BlogHero displays the hero section for the blog listing page.
 * Features animated text reveal, gradient mesh background, and a premium badge.
 * Matches the design language of the main site Hero component.
 */
export default function BlogHero({ 
  title = 'Tips and Insights',
  subtitle = 'Expert advice and the latest research on oral care and dental health from the SLEEK Dental team.',
  postCount = 0,
}: BlogHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for staggered content reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.05 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Word-by-word animation for the title
  const words = title.split(' ');
  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 10 : 40,
      filter: 'blur(8px)',
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.6,
        delay: prefersReducedMotion ? 0 : custom * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Premium gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient mesh */}
        <div className="absolute inset-0 bg-gradient-mesh-teal opacity-50" />
        
        {/* Animated ambient blobs */}
        <motion.div
          className="absolute top-0 right-0 w-[60%] h-[70%] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 70%)',
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[50%] h-[60%] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%)',
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.15, 1],
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          {/* Premium badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-teal-200/50"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(15, 118, 110, 0.05) 100%)',
            }}
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-teal-700 tracking-wide uppercase">
              SLEEK Dental Blog
            </span>
            {postCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-teal-600 text-white text-xs font-bold">
                {postCount}
              </span>
            )}
          </motion.div>

          {/* Animated title with word-by-word reveal */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6 font-heading"
          >
            {prefersReducedMotion ? (
              title
            ) : (
              <span className="inline-flex flex-wrap justify-center">
                {words.map((word, index) => (
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

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex justify-center"
          >
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-teal-400 to-teal-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
