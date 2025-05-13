'use client';

import React from 'react';

export default function VideoShowcase() {
  return (
    <section 
      id="video" 
      className="py-24 relative overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="px-4 py-1 rounded-full bg-[#00e0cb]/10 text-[#00e0cb] text-sm font-medium">
              FEATURED VIDEO
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See the SLEEK Experience
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how SLEEK is transforming dental care with our innovative approach
          </p>
        </div>

        {/* Direct iframe implementation */}
        <div className="w-full max-w-4xl mx-auto my-8 bg-gray-200">
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe 
              src="https://player.vimeo.com/video/756870661?h=b858550a04&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="SLEEK Experience Video"
            ></iframe>
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