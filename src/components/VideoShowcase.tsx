'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';

/**
 * VideoShowcase component displays a featured video section with lazy loading.
 * The video only loads when the section comes into view, improving page performance.
 * Includes a loading state with spinner animation.
 */
export default function VideoShowcase() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      // Delay loading the video slightly to prioritize other content
      const timer = setTimeout(() => {
        setVideoLoaded(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section className="section-padding-sm relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[80%] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.2) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="container-narrow relative z-10">
        {/* Section header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
        >
          <span className="section-badge">
            FEATURED VIDEO
          </span>
          
          <h2 className="section-title">
            See the SLEEK Experience
          </h2>
          
          <p className="section-subtitle">
            Discover how SLEEK is transforming dental care with our innovative approach
          </p>
        </motion.div>

        {/* Video container with lazy loading */}
        <motion.div 
          ref={ref}
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
        >
          {/* Decorative gradient border */}
          <div 
            className="absolute -inset-[1px] rounded-3xl opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(15, 118, 110, 0.1) 50%, rgba(245, 158, 11, 0.2) 100%)'
            }}
          />
          
          {/* Video wrapper */}
          <div className="relative bg-gray-900 rounded-3xl overflow-hidden shadow-elevation-4">
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              {videoLoaded ? (
                <iframe 
                  src="https://player.vimeo.com/video/756870661?h=b858550a04&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen 
                  loading="lazy"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  title="SLEEK Experience Video"
                />
              ) : (
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900"
                  aria-label="Video loading placeholder"
                >
                  {/* Play button placeholder */}
                  <motion.div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(15, 118, 110, 0.3) 100%)',
                      border: '2px solid rgba(20, 184, 166, 0.3)'
                    }}
                    animate={prefersReducedMotion ? {} : { 
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="w-8 h-8 text-teal-400 ml-1" />
                  </motion.div>
                  
                  {/* Loading spinner */}
                  <div className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-gray-400 font-medium">Loading video...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p 
          className="mt-6 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
        >
          Experience the future of dental care with SLEEK
        </motion.p>
      </div>
    </section>
  );
}
