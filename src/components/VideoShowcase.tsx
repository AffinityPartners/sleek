'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function VideoShowcase() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    if (inView) {
      // Delay loading the video slightly to prioritize other content first
      const timer = setTimeout(() => {
        setVideoLoaded(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section className="section-padding-sm bg-white relative overflow-hidden">
      <div className="container-narrow">
        {/* Section header */}
        <div className="section-header">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="section-badge">
              FEATURED VIDEO
            </span>
          </div>
          
          <h2 className="section-title">
            See the SLEEK Experience
          </h2>
          
          <p className="section-subtitle">
            Discover how SLEEK is transforming dental care with our innovative approach
          </p>
        </div>

        {/* Lazy-loaded iframe implementation */}
        <div 
          ref={ref}
          className="w-full bg-gray-100 rounded-2xl overflow-hidden shadow-2xl"
        >
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
              ></iframe>
            ) : (
              <div 
                className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center"
                aria-label="Video loading placeholder"
              >
                <div className="text-gray-500 text-center">
                  <svg className="animate-spin h-8 w-8 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-medium">Loading video...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Caption */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Experience the future of dental care with SLEEK
          </p>
        </div>
      </div>
    </section>
  );
} 