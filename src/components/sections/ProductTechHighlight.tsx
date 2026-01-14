"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Activity, 
  Battery, 
  Droplets, 
  Sparkles, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

// Define types for feature data
interface TechFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  image: string;
  benefits: string[];
}

/**
 * Feature data for the product technology showcase carousel.
 * Each feature has a unique image to better showcase different aspects of the product.
 * Images are high-quality renderings from the marketing assets folder.
 * 
 * Note: Features are based on actual SLEEK Dental Club product specifications.
 * The toothbrush is a sonic electric toothbrush with 5 cleaning modes, USB charging,
 * 2-minute timer, and water-resistant design.
 */
const features: TechFeature[] = [
  {
    id: 'cleaning-modes',
    name: '5 Professional Cleaning Modes',
    description: 'Choose from five specialized brushing modes designed for different oral care needs, from gentle cleaning to deep whitening.',
    icon: <RotateCcw className="w-6 h-6" />,
    accentColor: '#1ab9a3',
    // Front view with visible mode labels shows the control interface
    image: '/images/products/sleek-brush-front-modes.png',
    benefits: [
      'Clean mode for thorough daily brushing',
      'Sensitive mode for gentle care',
      'Whitening mode for stain removal',
      'Gum care mode for improved circulation',
      'Deep clean mode for intensive cleaning'
    ]
  },
  {
    id: 'sonic-technology',
    name: 'Sonic Cleaning Technology',
    description: 'High-frequency sonic vibrations deliver powerful yet gentle cleaning action to remove plaque and debris effectively.',
    icon: <Activity className="w-6 h-6" />,
    accentColor: '#7c3aed',
    // Side view shows the sleek brush design
    image: '/images/products/sleek-brush-side.png',
    benefits: [
      'Reaches between teeth and along the gumline',
      'Gentle on enamel while removing plaque',
      'Creates dynamic fluid action for deeper clean'
    ]
  },
  {
    id: 'usb-charging',
    name: 'USB Rechargeable',
    description: 'Convenient built-in USB charging keeps your brush powered and ready. Charge anywhere with any USB port.',
    icon: <Battery className="w-6 h-6" />,
    accentColor: '#2563eb',
    // Full kit image shows the complete charging setup
    image: '/images/SleekKit.jpg',
    benefits: [
      'Charge with any USB port or adapter',
      'Up to 3 weeks of use per charge',
      'LED indicator shows charging status'
    ]
  },
  {
    id: 'water-resistant',
    name: 'Water-Resistant Design',
    description: 'Durable water-resistant construction allows safe use in the shower and easy rinsing after each brush.',
    icon: <Droplets className="w-6 h-6" />,
    accentColor: '#0891b2',
    // Angled view highlights the sleek waterproof design
    image: '/images/products/sleek-brush-angle.png',
    benefits: [
      'Safe for use in the shower',
      'Easy to rinse clean under running water',
      'Durable matte black finish'
    ]
  },
  {
    id: 'smart-timer',
    name: '2-Minute Smart Timer',
    description: 'Built-in timer ensures you brush for the dentist-recommended two minutes with interval alerts for each quadrant.',
    icon: <Activity className="w-6 h-6" />,
    accentColor: '#4f46e5',
    // Product with box shows the premium smart product branding
    image: '/images/SLEEK-ToothBrush.jpg',
    benefits: [
      '30-second quadrant pacer alerts',
      'Auto-shutoff after 2 minutes',
      'Helps build consistent brushing habits'
    ]
  },
  {
    id: 'complete-kit',
    name: 'Complete Starter Kit',
    description: 'Everything you need to start your oral care journey: brush, charger, holder, travel case, and floss picks.',
    icon: <Sparkles className="w-6 h-6" />,
    accentColor: '#ef4444',
    // Front symmetric view clearly shows the complete kit
    image: '/images/products/sleek-brush-front.png',
    benefits: [
      'Premium matte black electric toothbrush',
      'Brush head, USB charger, and holder included',
      'Compact travel case for on-the-go',
      'Floss picks to start your routine'
    ]
  }
];

const ProductTechHighlight = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const prefersReducedMotion = useReducedMotion();
  const currentFeature = features[activeFeature];
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
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

  useEffect(() => {
    // Pre-load the current feature image and the next one
    const nextIndex = (activeFeature + 1) % features.length;
    
    const preloadImages = [features[activeFeature].image, features[nextIndex].image];
    
    preloadImages.forEach(src => {
      if (!imagesLoaded[src]) {
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          setImagesLoaded(prev => ({...prev, [src]: true}));
        };
      }
    });
  }, [activeFeature, imagesLoaded, features]);

  const goToNext = () => {
    setActiveFeature((prev) => (prev + 1) % features.length);
  };

  const goToPrev = () => {
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToFeature = (index: number) => {
    setActiveFeature(index);
  };

  // Animation variants with reduced motion support
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.05 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.3 : 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: prefersReducedMotion ? (direction > 0 ? 30 : -30) : (direction > 0 ? 200 : -200),
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: prefersReducedMotion ? (direction < 0 ? 30 : -30) : (direction < 0 ? 200 : -200),
      opacity: 0,
      scale: 0.9,
    })
  };

  const benefitItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1 + 0.2,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const [slideDirection, setSlideDirection] = useState(0);

  const handlePrevious = () => {
    setSlideDirection(-1);
    goToPrev();
  };

  const handleNext = () => {
    setSlideDirection(1);
    goToNext();
  };

  const handleTabChange = (index: number) => {
    setSlideDirection(index > activeFeature ? 1 : -1);
    goToFeature(index);
  };

  return (
    <section id="technology" className="section-padding scroll-mt-20 relative overflow-hidden" ref={ref}>
      {/* Dark Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C1015] via-[#141B1D] to-[#1B2223]" />
      
      {/* Ambient Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-left teal glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px]" />
        {/* Bottom-right accent glow */}
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-teal-600/8 blur-[150px]" />
        {/* Center subtle glow that follows active feature color */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-20 transition-colors duration-700"
          style={{ backgroundColor: currentFeature.accentColor }}
        />
      </div>
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20400%20400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="container-standard relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Section Header - Dark Theme */}
          <div className="section-header">
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase bg-teal-500/10 text-teal-400 border border-teal-500/20 backdrop-blur-sm"
            >
              ADVANCED TECHNOLOGY
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading tracking-tight"
              style={{ lineHeight: 1.1 }}
            >
              Cutting-Edge Toothbrush Features
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Experience next-generation oral care with features designed for superior cleaning results.
            </motion.p>
          </div>

          {/* Main Content - Feature Showcase */}
          <motion.div variants={itemVariants} className="relative">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start justify-between">
              {/* Feature Visualization - Left Column - Dark Glassmorphism */}
              <div className="w-full lg:w-3/5 relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.03] border border-white/[0.08]">
                {/* Inner glow effect */}
                <div 
                  className="absolute inset-0 opacity-30 transition-opacity duration-700"
                  style={{ 
                    background: `radial-gradient(ellipse at 30% 20%, ${currentFeature.accentColor}15 0%, transparent 50%)`
                  }}
                />
                
                {/* Subtle top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Feature Content Carousel */}
                <div className="relative p-6 md:p-10 h-full flex flex-col z-10">
                  {/* Feature header - Dark Theme */}
                  <div className="flex items-center mb-6">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm border border-white/10"
                      style={{ backgroundColor: `${currentFeature.accentColor}20` }}
                    >
                      <div style={{ color: currentFeature.accentColor }}>
                        {currentFeature.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight" style={{ color: currentFeature.accentColor }}>
                      {currentFeature.name}
                    </h3>
                  </div>
                  
                  {/* Responsive min-height: smaller on mobile, larger on desktop */}
                  <div className="flex flex-col md:flex-row gap-8 min-h-[320px] md:min-h-[400px]">
                    {/* Feature Image Section */}
                    <div className="md:w-1/2">
                      <AnimatePresence custom={slideDirection} mode="wait">
                        <motion.div
                          key={`image-${currentFeature.id}`}
                          custom={slideDirection}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { 
                              type: "spring", 
                              stiffness: prefersReducedMotion ? 200 : 300, 
                              damping: prefersReducedMotion ? 40 : 30 
                            },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.4 }
                          }}
                          className="relative h-[300px] md:h-[350px] w-full"
                        >
                          {/* Feature Image with subtle glow behind it */}
                          <motion.div 
                            className="h-full w-full rounded-xl overflow-hidden relative"
                            animate={prefersReducedMotion ? {} : { 
                              y: [0, -8, 0],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 5,
                              ease: "easeInOut"
                            }}
                          >
                            {/* Ambient glow behind product */}
                            <div 
                              className="absolute inset-0 blur-2xl opacity-40 scale-75"
                              style={{ backgroundColor: currentFeature.accentColor }}
                            />
                            <Image
                              src={currentFeature.image}
                              alt={currentFeature.name}
                              fill
                              className="object-contain scale-90 relative z-10 drop-shadow-2xl"
                              priority={activeFeature === 0}
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    
                    {/* Feature Description and Benefits - Dark Theme Text */}
                    <div className="md:w-1/2">
                      <AnimatePresence custom={slideDirection} mode="wait">
                        <motion.div
                          key={`content-${currentFeature.id}`}
                          custom={slideDirection}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { 
                              type: "spring", 
                              stiffness: prefersReducedMotion ? 200 : 300, 
                              damping: prefersReducedMotion ? 40 : 30 
                            },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.4 }
                          }}
                          className="flex flex-col"
                        >
                          <p className="text-gray-400 mb-6 leading-relaxed">{currentFeature.description}</p>
                          
                          {/* Feature Benefits - Dark Theme */}
                          <h4 className="text-lg font-semibold mb-4 text-white/90">Key Benefits:</h4>
                          <ul className="space-y-3">
                            {currentFeature.benefits.map((benefit, idx) => (
                              <motion.li 
                                key={idx}
                                custom={idx}
                                variants={benefitItemVariants}
                                initial="hidden"
                                animate="visible"
                                className="flex items-start"
                              >
                                <CheckCircle className="h-5 w-5 text-teal-400 mr-3 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">{benefit}</span>
                              </motion.li>
                            ))}
                          </ul>
                          
                          {/* View more link - Brighter for dark theme */}
                          <motion.a 
                            href="#"
                            className="mt-auto pt-6 text-teal-400 font-medium inline-flex items-center group hover:text-teal-300 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            Learn more
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </motion.a>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  {/* Carousel Navigation Buttons - Dark Theme Glass */}
                  <div className="absolute flex justify-between w-full left-0 top-1/2 -translate-y-1/2 px-2 sm:px-4 z-20 pointer-events-none">
                    <button 
                      onClick={handlePrevious}
                      className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center hover:bg-white/20 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 transition-all duration-300 pointer-events-auto"
                      aria-label="Previous feature"
                    >
                      <ChevronLeft className="w-5 h-5 text-white/80" />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center hover:bg-white/20 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 transition-all duration-300 pointer-events-auto"
                      aria-label="Next feature"
                    >
                      <ChevronRight className="w-5 h-5 text-white/80" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Feature Tabs - Right Column - Dark Glass Cards */}
              <div className="w-full lg:w-2/5">
                <div className="space-y-3 md:space-y-4">
                  {features.map((feature, index) => (
                    <motion.button
                      key={feature.id}
                      onClick={() => handleTabChange(index)}
                      className={cn(
                        "w-full p-4 md:p-5 rounded-xl flex items-start text-left gap-4 transition-all duration-300 backdrop-blur-md border",
                        index === activeFeature 
                          ? "bg-white/[0.08] border-white/20 shadow-lg" 
                          : "bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.06] hover:border-white/10"
                      )}
                      style={{
                        boxShadow: index === activeFeature 
                          ? `0 0 30px -5px ${feature.accentColor}40, inset 0 1px 1px rgba(255,255,255,0.05)` 
                          : 'none'
                      }}
                      whileHover={prefersReducedMotion ? {} : { 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div 
                        className="p-2.5 rounded-full flex-shrink-0 border border-white/10 backdrop-blur-sm transition-all duration-300"
                        style={{ 
                          backgroundColor: index === activeFeature 
                            ? `${feature.accentColor}30` 
                            : 'rgba(255,255,255,0.05)',
                          boxShadow: index === activeFeature ? `0 0 20px ${feature.accentColor}30` : 'none'
                        }}
                      >
                        <div style={{ color: feature.accentColor }}>
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className={cn(
                          "font-semibold text-lg mb-1 transition-colors duration-300",
                          index === activeFeature ? "text-white" : "text-gray-200"
                        )}>
                          {feature.name}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{feature.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Navigation Dots - Dark Theme with 44px touch targets */}
            <div className="flex justify-center mt-8 -space-x-1">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => handleTabChange(index)}
                  className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 rounded-lg group"
                  aria-label={`Go to feature ${index + 1}`}
                >
                  <span 
                    className={cn(
                      "block w-3 h-3 rounded-full transition-all duration-300",
                      index === activeFeature 
                        ? "scale-125" 
                        : "bg-white/20 group-hover:bg-white/40"
                    )}
                    style={{
                      backgroundColor: index === activeFeature ? feature.accentColor : undefined,
                      boxShadow: index === activeFeature ? `0 0 10px ${feature.accentColor}60` : 'none'
                    }}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Additional Tech Specs Section - Floating Glass Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          >
            {[
              { 
                title: "5 Modes", 
                subtitle: "Professional cleaning modes",
                icon: <RotateCcw className="w-6 h-6" />,
                color: "#14B8A6"
              },
              { 
                title: "2-Minute", 
                subtitle: "Smart timer with quad-pacer",
                icon: <Activity className="w-6 h-6" />,
                color: "#14B8A6"
              },
              { 
                title: "USB", 
                subtitle: "Built-in rechargeable charger",
                icon: <Battery className="w-6 h-6" />,
                color: "#14B8A6"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="group relative rounded-xl p-6 flex items-center gap-5 backdrop-blur-md bg-white/[0.03] border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.06] hover:border-white/15"
                whileHover={prefersReducedMotion ? {} : { 
                  y: -5, 
                  transition: { duration: 0.2 } 
                }}
                style={{
                  boxShadow: '0 4px 30px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 40px rgba(20, 184, 166, 0.15), 0 0 30px ${item.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
                }}
              >
                {/* Top edge highlight */}
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div 
                  className="p-3.5 rounded-full border border-white/10 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    backgroundColor: `${item.color}15`,
                  }}
                >
                  <div style={{ color: item.color }}>
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-gray-400">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductTechHighlight; 