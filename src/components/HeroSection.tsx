'use client';

import Image from 'next/image';
import { ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';

export default function OldHeroSection() {
  console.log('OldHeroSection component rendering - DEBUGGING CONNECTION ISSUE');

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background with modern gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sleek-dark-blue via-[#0a1e2c] to-[#0d2837] z-0" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-[0.03] z-0" />
      
      {/* Main content */}
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          {/* Left column - Text content */}
          <div className="text-white">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="bg-gradient-to-r from-[#00e0cb] to-[#5cbbff] bg-clip-text text-transparent font-medium">
                Smart Sonic Technology • Dental Insurance • Premium Oral Care
              </span>
            </div>
            
            <h1 className="text-4xl font-bold leading-tight mb-6 text-shadow">
              <span className="text-white">A Dental Experience</span>
              <span className="block bg-gradient-to-r from-[#00ffde] to-[#5cbbff] text-white bg-clip-text text-transparent font-bold text-shadow-glow">
                Worth Smiling About
              </span>
            </h1>
            
            <p className="text-base font-normal leading-normal text-gray-300 mb-8">
              Experience the perfect blend of cutting-edge technology and comprehensive dental care with our sonic toothbrush and insurance membership.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="https://enrollment.sleekdentalclub.com/onboarding"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00e0cb] to-[#5cbbff] text-sleek-dark-blue font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Find My Perfect Plan <ArrowRight className="w-4 h-4 ml-1" />
              </a>
              
              <a
                href="#toothbrush"
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium flex items-center gap-2 hover:bg-white/15 transition-all duration-300"
              >
                See How It Works
              </a>
            </div>
            
            {/* Feature list */}
            <div className="space-y-4">
              {[
                { icon: <Zap className="w-5 h-5 text-[#00e0cb]" />, text: "40,000 Sonic Vibrations/Min" },
                { icon: <ShieldCheck className="w-5 h-5 text-[#00e0cb]" />, text: "Tiered Dental Insurance Options" },
                { icon: <Sparkles className="w-5 h-5 text-[#00e0cb]" />, text: "Quarterly Oral Care Refills Included" }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <span className="text-sm leading-snug text-gray-200">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column - Product showcase */}
          <div className="relative flex items-center justify-center">
            {/* Backdrop circle */}
            <div className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-r from-[#00e0cb]/20 to-[#5cbbff]/20 backdrop-blur-md z-0" />
            
            {/* Product image */}
            <div className="relative z-10">
              <div className="relative w-[300px] h-[500px] md:w-[400px] md:h-[600px]">
                <Image
                  src="/images/SleekKit.jpg"
                  alt="SLEEK Electric Toothbrush Kit"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 300px, 400px"
                />
              </div>
              
              {/* Floating feature badges */}
              <div className="absolute top-10 -right-16 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg">
                5 Cleaning Modes
              </div>
              
              <div className="absolute bottom-20 -left-12 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg">
                Smart Timer
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 text-sm gap-2 z-20">
        <span>Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-center justify-center">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
} 