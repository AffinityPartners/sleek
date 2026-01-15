"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from 'framer-motion';
import { 
  Activity, 
  Battery, 
  Droplets, 
  Sparkles, 
  RotateCcw,
  Timer,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

/**
 * Type definition for product technology features.
 * Each feature includes a shortName for compact pill navigation labels.
 */
interface TechFeature {
  id: string;
  name: string;
  shortName: string; // Compact label for pill navigation
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  image: string;
  benefits: string[];
}

/**
 * Feature data for the product technology showcase bento grid.
 * Each feature has a unique image and shortName for the pill navigation.
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
    shortName: '5 Modes',
    description: 'Choose from five specialized brushing modes designed for different oral care needs, from gentle cleaning to deep whitening.',
    icon: <RotateCcw className="w-5 h-5" />,
    accentColor: '#1ab9a3',
    image: '/images/products/5-Professional-Cleaning-Modes.png',
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
    shortName: 'Sonic',
    description: 'High-frequency sonic vibrations deliver powerful yet gentle cleaning action to remove plaque and debris effectively.',
    icon: <Activity className="w-5 h-5" />,
    accentColor: '#7c3aed',
    image: '/images/products/Sonic-Cleaning-Technology.png',
    benefits: [
      'Reaches between teeth and along the gumline',
      'Gentle on enamel while removing plaque',
      'Creates dynamic fluid action for deeper clean'
    ]
  },
  {
    id: 'usb-charging',
    name: 'USB Rechargeable',
    shortName: 'USB',
    description: 'Convenient built-in USB charging keeps your brush powered and ready. Charge anywhere with any USB port.',
    icon: <Battery className="w-5 h-5" />,
    accentColor: '#2563eb',
    image: '/images/products/USB-Rechargeable.png',
    benefits: [
      'Charge with any USB port or adapter',
      'Up to 3 weeks of use per charge',
      'LED indicator shows charging status'
    ]
  },
  {
    id: 'water-resistant',
    name: 'Water-Resistant Design',
    shortName: 'Waterproof',
    description: 'Durable water-resistant construction allows safe use in the shower and easy rinsing after each brush.',
    icon: <Droplets className="w-5 h-5" />,
    accentColor: '#0891b2',
    image: '/images/products/Water-Resistant-Design.png',
    benefits: [
      'Safe for use in the shower',
      'Easy to rinse clean under running water',
      'Durable matte black finish'
    ]
  },
  {
    id: 'smart-timer',
    name: '2-Minute Smart Timer',
    shortName: 'Timer',
    description: 'Built-in timer ensures you brush for the dentist-recommended two minutes with interval alerts for each quadrant.',
    icon: <Timer className="w-5 h-5" />,
    accentColor: '#4f46e5',
    image: '/images/products/2-Minute-Smart-Timer.png',
    benefits: [
      '30-second quadrant pacer alerts',
      'Auto-shutoff after 2 minutes',
      'Helps build consistent brushing habits'
    ]
  },
  {
    id: 'complete-kit',
    name: 'Complete Starter Kit',
    shortName: 'Full Kit',
    description: 'Everything you need to start your oral care journey: brush, charger, holder, travel case, and floss picks.',
    icon: <Sparkles className="w-5 h-5" />,
    accentColor: '#ef4444',
    image: '/images/products/Complete-Starter-Kit.png',
    benefits: [
      'Premium matte black electric toothbrush',
      'Brush head, USB charger, and holder included',
      'Compact travel case for on-the-go',
      'Floss picks to start your routine'
    ]
  }
];

/**
 * ProductTechHighlight Component
 * 
 * A bento grid layout showcasing product technology features with large hero images.
 * Features horizontal pill navigation for quick access and an asymmetric grid where
 * the active feature gets a large 2x2 card while others display as smaller 1x1 cards.
 * 
 * Layout breakdown:
 * - Desktop (lg+): 4-column grid with active feature spanning 2 cols x 2 rows
 * - Tablet (md): Active feature full width on top, 2x2 grid of others below
 * - Mobile: Stacked layout with active card larger, others in horizontal scroll
 */
const ProductTechHighlight = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const prefersReducedMotion = useReducedMotion();
  const currentFeature = features[activeFeature];
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  /**
   * Preload images for current and next feature to ensure smooth transitions.
   * This prevents flash of empty space when switching between features.
   */
  useEffect(() => {
    const nextIndex = (activeFeature + 1) % features.length;
    const preloadImages = [features[activeFeature].image, features[nextIndex].image];
    
    preloadImages.forEach(src => {
      if (!imagesLoaded[src]) {
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          setImagesLoaded(prev => ({ ...prev, [src]: true }));
        };
      }
    });
  }, [activeFeature, imagesLoaded]);

  /**
   * Handle feature selection from pill navigation or card click.
   * Updates the active feature index to trigger layout animations.
   */
  const handleFeatureSelect = (index: number) => {
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

  /**
   * Benefit list item animation variants.
   * Staggered appearance with custom delay based on index.
   */
  const benefitItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.08 + 0.2,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  /**
   * Get features that are not currently active for the smaller bento cards.
   * Returns array of features with their original indices preserved.
   */
  const getInactiveFeatures = () => {
    return features
      .map((feature, index) => ({ feature, index }))
      .filter(({ index }) => index !== activeFeature);
  };

  const inactiveFeatures = getInactiveFeatures();

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
          className="space-y-10"
        >
          {/* Section Header */}
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

          {/* Horizontal Pill Navigation */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 md:gap-3"
          >
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureSelect(index)}
                className={cn(
                  "group relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  "backdrop-blur-md border min-h-[44px]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
                  index === activeFeature 
                    ? "bg-white/[0.12] border-white/25 text-white shadow-lg" 
                    : "bg-white/[0.04] border-white/[0.08] text-gray-400 hover:bg-white/[0.08] hover:border-white/15 hover:text-gray-200"
                )}
                style={{
                  boxShadow: index === activeFeature 
                    ? `0 0 25px -5px ${feature.accentColor}50, inset 0 1px 1px rgba(255,255,255,0.1)` 
                    : undefined
                }}
              >
                {/* Icon with accent color */}
                <span 
                  className="transition-colors duration-300"
                  style={{ color: index === activeFeature ? feature.accentColor : undefined }}
                >
                  {feature.icon}
                </span>
                <span>{feature.shortName}</span>
                
                {/* Active indicator dot */}
                {index === activeFeature && (
                  <motion.span
                    layoutId="activePillIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: feature.accentColor }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Bento Grid Layout */}
          <motion.div variants={itemVariants}>
            <LayoutGroup>
              {/* 
                Grid layout strategy:
                - Mobile (default): Single column stacked layout for readability
                - Tablet (md): 2-column grid with hero spanning full width
                - Desktop (lg+): 3-column bento grid with hero taking 2x2
                  This creates: Hero (2x2) + 2 cards in col 3 rows 1-2, then 3 cards in row 3
                  Total: 1 hero + 5 inactive = 6 features, perfectly balanced
              */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                
                {/* Active Feature - Large Hero Card */}
                <motion.div
                  layout
                  layoutId={`card-${currentFeature.id}`}
                  className="col-span-1 md:col-span-2 lg:row-span-2 relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/[0.04] border border-white/[0.1] group min-h-[400px] md:min-h-[450px] lg:min-h-0"
                  transition={{ 
                    layout: { 
                      type: "spring", 
                      stiffness: prefersReducedMotion ? 400 : 300, 
                      damping: prefersReducedMotion ? 40 : 30 
                    }
                  }}
                  style={{
                    boxShadow: `0 0 60px -15px ${currentFeature.accentColor}30, 0 25px 50px -12px rgba(0,0,0,0.5)`
                  }}
                >
                  {/* Inner glow effect following accent color */}
                  <div 
                    className="absolute inset-0 opacity-40 transition-opacity duration-700 pointer-events-none"
                    style={{ 
                      background: `radial-gradient(ellipse at 30% 30%, ${currentFeature.accentColor}20 0%, transparent 60%)`
                    }}
                  />
                  
                  {/* Subtle top edge highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  {/* 
                    Hero card layout:
                    - Mobile/Tablet: Stacked (image top, content bottom)
                    - Desktop: Side-by-side (image left, content right)
                  */}
                  <div className="relative h-full flex flex-col lg:flex-row z-10">
                    {/* Hero Image Section */}
                    <div className="lg:w-1/2 relative h-[280px] md:h-[320px] lg:h-full flex-shrink-0">
                      <AnimatePresence mode="sync">
                        <motion.div
                          key={`hero-image-${currentFeature.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0"
                        >
                          {/* Ambient glow behind product */}
                          <div 
                            className="absolute inset-0 blur-3xl opacity-30 scale-50"
                            style={{ backgroundColor: currentFeature.accentColor }}
                          />
                          
                          {/* Floating animation for the image */}
                          <motion.div
                            className="relative h-full w-full"
                            animate={prefersReducedMotion ? {} : { 
                              y: [0, -10, 0],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 6,
                              ease: "easeInOut"
                            }}
                          >
                            <Image
                              src={currentFeature.image}
                              alt={currentFeature.name}
                              fill
                              className="object-contain p-6 md:p-8 rounded-2xl"
                              priority
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                            />
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Content Section - More breathing room */}
                    <div className="lg:w-1/2 p-5 md:p-6 lg:p-8 flex flex-col justify-center flex-1">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`hero-content-${currentFeature.id}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {/* Feature header with icon */}
                          <div className="flex items-center gap-3 mb-3 lg:mb-4">
                            <div 
                              className="w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 flex-shrink-0"
                              style={{ backgroundColor: `${currentFeature.accentColor}25` }}
                            >
                              <span style={{ color: currentFeature.accentColor }}>
                                {currentFeature.icon}
                              </span>
                            </div>
                            <h3 
                              className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight"
                              style={{ color: currentFeature.accentColor }}
                            >
                              {currentFeature.name}
                            </h3>
                          </div>
                          
                          <p className="text-gray-400 mb-4 lg:mb-5 leading-relaxed text-sm lg:text-base">
                            {currentFeature.description}
                          </p>
                          
                          {/* Benefits list - show 3 on mobile, 4 on desktop */}
                          <ul className="space-y-2 lg:space-y-2.5">
                            {currentFeature.benefits.slice(0, 3).map((benefit, idx) => (
                              <motion.li 
                                key={idx}
                                custom={idx}
                                variants={benefitItemVariants}
                                initial="hidden"
                                animate="visible"
                                className="flex items-start gap-2.5"
                              >
                                <CheckCircle 
                                  className="h-4 w-4 flex-shrink-0 mt-0.5" 
                                  style={{ color: currentFeature.accentColor }}
                                />
                                <span className="text-gray-300 text-sm">{benefit}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>

                {/* Inactive Features - Smaller Cards */}
                {inactiveFeatures.map(({ feature, index }) => (
                  <motion.button
                    key={feature.id}
                    layout
                    layoutId={`card-${feature.id}`}
                    onClick={() => handleFeatureSelect(index)}
                    className={cn(
                      "relative rounded-xl overflow-hidden backdrop-blur-md bg-white/[0.03] border border-white/[0.08]",
                      "transition-all duration-300 cursor-pointer text-left",
                      "hover:bg-white/[0.06] hover:border-white/15 group",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60",
                      "min-h-[180px] md:min-h-[200px] lg:min-h-[220px]"
                    )}
                    transition={{ 
                      layout: { 
                        type: "spring", 
                        stiffness: prefersReducedMotion ? 400 : 300, 
                        damping: prefersReducedMotion ? 40 : 30 
                      }
                    }}
                    whileHover={prefersReducedMotion ? {} : { 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Subtle hover glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                      style={{ 
                        background: `radial-gradient(ellipse at 50% 50%, ${feature.accentColor}20 0%, transparent 70%)`
                      }}
                    />
                    
                    {/* Top edge highlight on hover */}
                    <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Card content with image and title */}
                    <div className="relative h-full flex flex-col p-4">
                      {/* Feature image - takes most of the card */}
                      <div className="flex-1 relative min-h-[120px]">
                        <div 
                          className="absolute inset-0 blur-2xl opacity-20 scale-75"
                          style={{ backgroundColor: feature.accentColor }}
                        />
                        <Image
                          src={feature.image}
                          alt={feature.name}
                          fill
                          className="object-contain p-3 rounded-xl group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      
                      {/* Feature title at bottom */}
                      <div className="mt-3 flex items-center gap-2">
                        <span 
                          className="transition-colors duration-300 flex-shrink-0"
                          style={{ color: feature.accentColor }}
                        >
                          {feature.icon}
                        </span>
                        <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors line-clamp-1">
                          {feature.shortName}
                        </h4>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </LayoutGroup>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductTechHighlight;
