"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Activity, 
  Battery, 
  Droplets, 
  Sparkles, 
  RotateCcw,
  Timer,
  CheckCircle,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

/* ==========================================================================
   TYPE DEFINITIONS
   ========================================================================== */

/**
 * Represents a single product technology feature with all display data.
 * Each feature has unique 3D perspective transforms and accent colors
 * that drive the holographic UI overlay system.
 */
interface TechFeature {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  accentColorRGB: string; // RGB values for gradient manipulation
  specs: { label: string; value: string }[];
  benefits: string[];
  // Path to the showcase image for this feature
  showcaseImage: string;
  // 3D perspective transform values for the product hero
  perspective: {
    rotateY: number;
    rotateX: number;
    scale: number;
  };
}

/* ==========================================================================
   FEATURE DATA
   Each feature drives unique 3D transforms, holographic overlays, and 
   accent effects throughout the component.
   ========================================================================== */

const features: TechFeature[] = [
  {
    id: 'cleaning-modes',
    name: '5 Professional Cleaning Modes',
    shortName: '5 Modes',
    tagline: 'Personalized Care',
    description: 'Five specialized brushing modes designed for different oral care needs, from gentle cleaning to deep whitening.',
    icon: <RotateCcw className="w-5 h-5" />,
    accentColor: '#1ab9a3',
    accentColorRGB: '26, 185, 163',
    specs: [
      { label: 'Modes', value: '5' },
      { label: 'Timer', value: '2 Min' },
      { label: 'Pacer', value: '30 Sec' },
    ],
    benefits: [
      'Clean mode for thorough daily brushing',
      'Soft mode for gentle care',
      'Whiten mode for stain removal',
      'Massage mode for gum circulation',
      'Deep Clean mode for intensive cleaning'
    ],
    showcaseImage: '/images/products/5-modes.png',
    perspective: { rotateY: 5, rotateX: -2, scale: 1 }
  },
  {
    id: 'sonic-technology',
    name: 'Sonic Cleaning Technology',
    shortName: 'Sonic',
    tagline: '31,000 VPM',
    description: 'High-frequency sonic vibrations deliver powerful yet gentle cleaning action to remove plaque effectively.',
    icon: <Activity className="w-5 h-5" />,
    accentColor: '#7c3aed',
    accentColorRGB: '124, 58, 237',
    specs: [
      { label: 'VPM', value: '31K' },
      { label: 'Power', value: 'Sonic' },
      { label: 'Rating', value: 'IPX7' },
    ],
    benefits: [
      'Reaches between teeth and along the gumline',
      'Gentle on enamel while removing plaque',
      'Creates dynamic fluid action for deeper clean'
    ],
    showcaseImage: '/images/products/sonic.png',
    perspective: { rotateY: -3, rotateX: 2, scale: 1.02 }
  },
  {
    id: 'usb-charging',
    name: 'USB Rechargeable',
    shortName: 'USB',
    tagline: '20-Day Battery',
    description: 'Convenient built-in USB charging keeps your brush powered and ready. Charge anywhere with any USB port.',
    icon: <Battery className="w-5 h-5" />,
    accentColor: '#2563eb',
    accentColorRGB: '37, 99, 235',
    specs: [
      { label: 'Battery', value: '20 Day' },
      { label: 'Charge', value: '6-10 Hr' },
      { label: 'Type', value: 'USB' },
    ],
    benefits: [
      'Charge with any USB port or adapter',
      'Up to 20 days of use per charge¹',
      'LED indicator shows charging status'
    ],
    showcaseImage: '/images/USB-Charge.png',
    perspective: { rotateY: 0, rotateX: 8, scale: 1 }
  },
  {
    id: 'water-resistant',
    name: 'Water-Resistant Design',
    shortName: 'IPX7',
    tagline: 'Shower Safe',
    description: 'Durable water-resistant construction allows safe use in the shower and easy rinsing after each brush.',
    icon: <Droplets className="w-5 h-5" />,
    accentColor: '#0891b2',
    accentColorRGB: '8, 145, 178',
    specs: [
      { label: 'Rating', value: 'IPX7' },
      { label: 'Safe', value: 'Shower' },
      { label: 'Rinse', value: 'Yes' },
    ],
    benefits: [
      'Safe for use in the shower',
      'Easy to rinse clean under running water',
      'Durable matte black finish'
    ],
    showcaseImage: '/images/products/IPX7.png',
    perspective: { rotateY: -5, rotateX: 5, scale: 1 }
  },
  {
    id: 'smart-timer',
    name: '2-Minute Smart Timer',
    shortName: 'Timer',
    tagline: 'Quad-Pacer',
    description: 'Built-in timer ensures you brush for the dentist-recommended two minutes with interval alerts.',
    icon: <Timer className="w-5 h-5" />,
    accentColor: '#4f46e5',
    accentColorRGB: '79, 70, 229',
    specs: [
      { label: 'Timer', value: '2 Min' },
      { label: 'Pacer', value: '30 Sec' },
      { label: 'Zones', value: '4' },
    ],
    benefits: [
      '30-second quadrant pacer alerts',
      'Auto-shutoff after 2 minutes',
      'Helps build consistent brushing habits'
    ],
    showcaseImage: '/images/products/Timer.png',
    perspective: { rotateY: 3, rotateX: 0, scale: 1 }
  },
  {
    id: 'complete-kit',
    name: 'Complete Starter Kit',
    shortName: 'Full Kit',
    tagline: 'Everything Included',
    description: 'Everything you need to start your oral care journey: brush, charger, holder, travel case, and floss picks.',
    icon: <Sparkles className="w-5 h-5" />,
    accentColor: '#ef4444',
    accentColorRGB: '239, 68, 68',
    specs: [
      { label: 'Items', value: '6+' },
      { label: 'Case', value: 'Travel' },
      { label: 'Refills', value: 'Quarterly' },
    ],
    benefits: [
      'Premium matte black electric toothbrush',
      'Brush head, USB charger, and holder included',
      'Compact travel case for on-the-go',
      'Floss picks to complete your routine'
    ],
    showcaseImage: '/images/products/Full-Kit.png',
    perspective: { rotateY: 0, rotateX: 0, scale: 0.92 }
  }
];

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */

/**
 * BackgroundLayers Component
 * Creates the immersive multi-layer background with:
 * - Deep gradient base
 * - Animated particle/dot field
 * - Tech grid pattern with subtle parallax
 * - Dynamic accent glow that follows active feature color
 */
interface BackgroundLayersProps {
  accentColor: string;
  accentColorRGB: string;
  mousePosition: { x: number; y: number };
  prefersReducedMotion: boolean | null;
  isMobile: boolean;
}

/**
 * BackgroundLayers Component
 * Creates the immersive multi-layer background. On mobile, particles and heavy
 * animations are disabled for performance. Parallax is mouse-based so naturally
 * disabled on touch devices.
 */
const BackgroundLayers: React.FC<BackgroundLayersProps> = ({ 
  accentColor, 
  accentColorRGB,
  mousePosition,
  prefersReducedMotion,
  isMobile
}) => {
  // Calculate parallax offset - disabled on mobile since mouse tracking doesn't apply
  const parallaxX = (prefersReducedMotion || isMobile) ? 0 : (mousePosition.x - 0.5) * 20;
  const parallaxY = (prefersReducedMotion || isMobile) ? 0 : (mousePosition.y - 0.5) * 20;
  
  // Determine particle count: 0 on mobile, reduced with motion preference, full otherwise
  const particleCount = isMobile ? 0 : (prefersReducedMotion ? 10 : 40);
  
  // Should we animate? Disabled on mobile or if user prefers reduced motion
  const shouldAnimate = !prefersReducedMotion && !isMobile;

  return (
    <>
      {/* Base gradient - deep dark with subtle color influence */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050608] via-[#0a0d10] to-[#0d1114]" />
      
      {/* Tech grid pattern layer with parallax - static on mobile */}
      <div 
        className="absolute inset-0 opacity-[0.03] transition-transform duration-700 ease-out"
        style={{
          transform: isMobile ? 'none' : `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated particle field - hidden on mobile for performance */}
      {particleCount > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                left: `${(i * 17) % 100}%`,
                top: `${(i * 23) % 100}%`,
              }}
              animate={shouldAnimate ? {
                opacity: [0.1, 0.4, 0.1],
                scale: [0.8, 1.2, 0.8],
              } : {}}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Primary accent glow - smaller and less intense on mobile */}
      <motion.div 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none",
          isMobile ? "w-[400px] h-[400px] blur-[80px]" : "w-[900px] h-[900px] blur-[180px]"
        )}
        animate={{
          backgroundColor: accentColor,
          opacity: isMobile ? 0.1 : 0.15,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Secondary ambient glows - smaller on mobile */}
      <div 
        className={cn(
          "absolute rounded-full pointer-events-none",
          isMobile 
            ? "-top-20 -left-20 w-[200px] h-[200px] blur-[60px]" 
            : "-top-40 -left-40 w-[500px] h-[500px] blur-[150px]"
        )}
        style={{ backgroundColor: `rgba(${accentColorRGB}, ${isMobile ? 0.05 : 0.08})` }}
      />
      <div 
        className={cn(
          "absolute rounded-full pointer-events-none",
          isMobile 
            ? "-bottom-20 -right-20 w-[250px] h-[250px] blur-[80px]" 
            : "-bottom-40 -right-40 w-[600px] h-[600px] blur-[180px]"
        )}
        style={{ backgroundColor: `rgba(${accentColorRGB}, ${isMobile ? 0.04 : 0.06})` }}
      />

      {/* Scanning line effect - disabled on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={false}
        >
          <motion.div
            className="absolute left-0 right-0 h-[2px] opacity-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              boxShadow: `0 0 20px ${accentColor}`,
            }}
            animate={shouldAnimate ? {
              top: ['-10%', '110%'],
            } : {}}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}

      {/* Noise texture overlay for premium feel */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20400%20400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')]" />
    </>
  );
};

/**
 * ProductHero3D Component
 * Central showcase image with 3D perspective transforms.
 * Responds to feature selection with smooth perspective shifts and image changes.
 * Each feature displays a unique showcase image that highlights that specific feature.
 * 
 * Mobile optimization: Uses smaller image (220x320px) to fit more content on screen.
 * Desktop: Full 3D transforms and larger images (420x680px / 520x780px).
 */
interface ProductHero3DProps {
  perspective: { rotateY: number; rotateX: number; scale: number };
  accentColor: string;
  prefersReducedMotion: boolean | null;
  showcaseImage: string;
  featureName: string;
  isMobile?: boolean;
  specs?: { label: string; value: string }[];
}

const ProductHero3D: React.FC<ProductHero3DProps> = ({ 
  perspective, 
  accentColor,
  prefersReducedMotion,
  showcaseImage,
  featureName,
  isMobile = false,
  specs = []
}) => {
  return (
    <div className="relative" style={{ perspective: isMobile ? 'none' : '1200px' }}>
      {/* Ambient glow behind product - smaller on mobile */}
      <motion.div
        className={cn(
          "absolute rounded-full pointer-events-none",
          isMobile 
            ? "inset-0 blur-[60px]" 
            : "inset-0 blur-[100px]"
        )}
        animate={{
          backgroundColor: accentColor,
          opacity: isMobile ? 0.2 : 0.25,
          scale: isMobile ? 1 : 1.2,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* 3D Transform container - disabled on mobile for performance */}
      <motion.div
        className="relative"
        animate={isMobile ? {} : {
          rotateY: perspective.rotateY,
          rotateX: perspective.rotateX,
          scale: perspective.scale,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformStyle: isMobile ? 'flat' : 'preserve-3d' }}
      >
        {/* Product container with AnimatePresence for smooth image transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showcaseImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Showcase image - compact on mobile, reduced size on desktop to fit viewport */}
            <div className={cn(
              "relative mx-auto",
              isMobile 
                ? "w-[200px] h-[300px]" 
                : "w-[300px] h-[450px] md:w-[340px] md:h-[510px] lg:w-[380px] lg:h-[570px]"
            )}>
              <Image
                src={showcaseImage}
                alt={`SLEEK Toothbrush - ${featureName}`}
                fill
                className="object-contain drop-shadow-2xl"
                priority
                sizes={isMobile ? "200px" : "(max-width: 768px) 300px, (max-width: 1024px) 340px, 380px"}
              />
            </div>
            
            {/* Mobile-only: Floating spec badges overlay on the image */}
            {isMobile && specs.length > 0 && (
              <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-2 z-20">
                {specs.slice(0, 2).map((spec, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1.5"
                    style={{
                      border: `1px solid ${accentColor}40`,
                      boxShadow: `0 0 10px ${accentColor}20`,
                    }}
                  >
                    <span style={{ color: accentColor }} className="font-bold">
                      {spec.value}
                    </span>
                    <span className="text-gray-300">{spec.label}</span>
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/**
 * HolographicPanel Component
 * Glassmorphic data panel with animated entrance and tech styling.
 * Displays feature specs and benefits with staggered reveal.
 */
interface HolographicPanelProps {
  feature: TechFeature;
  position: 'left' | 'right';
  prefersReducedMotion: boolean | null;
}

const HolographicPanel: React.FC<HolographicPanelProps> = ({ 
  feature, 
  position,
  prefersReducedMotion 
}) => {
  // Animation variants for panel entrance - near-instant for better UX
  const panelVariants = {
    hidden: {
      opacity: 0,
      x: position === 'left' ? -20 : 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.15,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.02,
        delayChildren: 0,
      }
    },
    exit: {
      opacity: 0,
      x: position === 'left' ? -10 : 10,
      scale: 0.99,
      transition: {
        duration: 0.1,
        ease: "easeIn",
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.1, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "relative backdrop-blur-xl rounded-2xl overflow-hidden",
        "border border-white/[0.08]",
        position === 'left' ? 'text-left' : 'text-right'
      )}
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
        boxShadow: `
          0 0 60px -20px ${feature.accentColor}40,
          inset 0 1px 1px rgba(255,255,255,0.05),
          0 20px 40px -20px rgba(0,0,0,0.5)
        `,
      }}
    >
      {/* Top edge glow */}
      <div 
        className="absolute top-0 left-4 right-4 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${feature.accentColor}60, transparent)`,
        }}
      />

      {/* Scanning line animation inside panel */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={false}
      >
        <motion.div
          className="absolute left-0 right-0 h-[1px] opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${feature.accentColor}, transparent)`,
          }}
          animate={prefersReducedMotion ? {} : {
            top: ['-5%', '105%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      <div className="relative p-6 lg:p-8">
        {/* Feature icon and name */}
        <motion.div variants={itemVariants} className={cn(
          "flex items-center gap-3 mb-4",
          position === 'right' && 'flex-row-reverse'
        )}>
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ 
              backgroundColor: `${feature.accentColor}20`,
              boxShadow: `0 0 20px ${feature.accentColor}30`,
            }}
          >
            <span style={{ color: feature.accentColor }}>
              {feature.icon}
            </span>
          </div>
          <div>
            <p 
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: feature.accentColor }}
            >
              {feature.tagline}
            </p>
            <h3 className="text-lg font-bold text-white">
              {feature.name}
            </h3>
          </div>
        </motion.div>

        {/* Specs row */}
        <motion.div 
          variants={itemVariants}
          className={cn(
            "flex gap-4 mb-5",
            position === 'right' && 'justify-end'
          )}
        >
          {feature.specs.map((spec, idx) => (
            <div 
              key={idx}
              className="text-center px-3 py-2 rounded-lg"
              style={{ 
                backgroundColor: `${feature.accentColor}10`,
                border: `1px solid ${feature.accentColor}20`,
              }}
            >
              <p 
                className="text-lg font-bold"
                style={{ color: feature.accentColor }}
              >
                {spec.value}
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                {spec.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-400 text-sm leading-relaxed mb-5"
        >
          {feature.description}
        </motion.p>

        {/* Benefits list */}
        <motion.ul variants={itemVariants} className="space-y-2.5">
          {feature.benefits.slice(0, 3).map((benefit, idx) => (
            <motion.li 
              key={idx}
              variants={itemVariants}
              className={cn(
                "flex items-start gap-2.5",
                position === 'right' && 'flex-row-reverse text-right'
              )}
            >
              <CheckCircle 
                className="h-4 w-4 flex-shrink-0 mt-0.5" 
                style={{ color: feature.accentColor }}
              />
              <span className="text-gray-300 text-sm">{benefit}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};

/**
 * ConnectionLine Component
 * SVG animated line connecting product to info panel.
 * Creates a tech-forward visual connection between elements.
 */
interface ConnectionLineProps {
  accentColor: string;
  position: 'left' | 'right';
  prefersReducedMotion: boolean | null;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ 
  accentColor, 
  position,
  prefersReducedMotion 
}) => {
  return (
    <svg
      className={cn(
        "absolute top-1/2 -translate-y-1/2 w-20 h-32 pointer-events-none",
        position === 'left' ? 'right-full mr-4' : 'left-full ml-4'
      )}
      viewBox="0 0 80 128"
      fill="none"
    >
      {/* Main connection line */}
      <motion.path
        d={position === 'left' 
          ? "M80 64 Q40 64 20 40 Q0 16 0 64 Q0 112 20 88 Q40 64 80 64" 
          : "M0 64 Q40 64 60 40 Q80 16 80 64 Q80 112 60 88 Q40 64 0 64"
        }
        stroke={accentColor}
        strokeWidth="1"
        strokeOpacity="0.4"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.8, ease: "easeOut" }}
      />
      
      {/* Animated pulse along the line */}
      <motion.circle
        r="3"
        fill={accentColor}
        animate={prefersReducedMotion ? {} : {
          offsetDistance: ['0%', '100%'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          offsetPath: `path("${position === 'left' 
            ? 'M80 64 Q40 64 20 40 Q0 16 0 64 Q0 112 20 88 Q40 64 80 64' 
            : 'M0 64 Q40 64 60 40 Q80 16 80 64 Q80 112 60 88 Q40 64 0 64'
          }")`,
        }}
      />
      
      {/* End node */}
      <motion.circle
        cx={position === 'left' ? 0 : 80}
        cy="64"
        r="4"
        fill={accentColor}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : 0.5 }}
      />
      <motion.circle
        cx={position === 'left' ? 0 : 80}
        cy="64"
        r="8"
        fill="none"
        stroke={accentColor}
        strokeWidth="1"
        strokeOpacity="0.3"
        initial={{ scale: 0 }}
        animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.5, 1] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          delay: prefersReducedMotion ? 0 : 0.5 
        }}
      />
    </svg>
  );
};

/**
 * Gets feature-specific icon animation properties.
 * Each feature has a unique micro-animation that plays on hover/click.
 * These quirky animations add personality and visual feedback.
 */
/**
 * Base animation structure for type consistency.
 * All icon animations return this shape to avoid TypeScript errors.
 */
interface IconAnimationResult {
  animate?: Record<string, unknown>;
  whileHover?: Record<string, unknown>;
  whileTap?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

const getIconAnimation = (featureId: string, isActive: boolean, prefersReducedMotion: boolean | null): IconAnimationResult => {
  // Return empty animation properties when reduced motion is preferred
  if (prefersReducedMotion) {
    return { animate: {}, whileHover: {}, whileTap: {}, transition: {} };
  }

  const baseActive: IconAnimationResult = isActive ? {
    animate: { scale: [1, 1.1, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  } : { animate: {}, whileHover: {}, whileTap: {}, transition: {} };

  switch (featureId) {
    case 'cleaning-modes':
      // Rotation click animation - like turning a dial
      return {
        animate: isActive ? {
          rotate: [0, 72, 144, 216, 288, 360],
          scale: [1, 1.1, 1, 1.1, 1, 1.1],
        } : {},
        whileHover: { rotate: 45, scale: 1.15 },
        whileTap: { rotate: 180, scale: 0.9 },
        transition: isActive ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 400 }
      };
    
    case 'sonic-technology':
      // Vibration shake animation
      return {
        animate: isActive ? {
          x: [-1, 1, -1, 1, 0],
          scale: [1, 1.05, 1, 1.05, 1],
        } : {},
        whileHover: { x: [-2, 2, -2, 2, 0], transition: { duration: 0.3, repeat: Infinity } },
        whileTap: { scale: 0.85, x: 0 },
        transition: isActive ? { duration: 0.2, repeat: Infinity } : undefined
      };
    
    case 'usb-charging':
      // Pulse/glow charging animation
      return {
        animate: isActive ? {
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        } : {},
        whileHover: { scale: 1.2, y: -2 },
        whileTap: { scale: 0.9, y: 2 },
        transition: isActive ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : { type: "spring", stiffness: 500 }
      };
    
    case 'water-resistant':
      // Wobble/splash animation
      return {
        animate: isActive ? {
          rotate: [-5, 5, -5, 5, 0],
          y: [0, -2, 0, -2, 0],
        } : {},
        whileHover: { rotate: [0, -10, 10, -5, 5, 0], y: -3 },
        whileTap: { scale: 0.9, rotate: 0, y: 3 },
        transition: isActive ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }
      };
    
    case 'smart-timer':
      // Clock tick rotation
      return {
        animate: isActive ? {
          rotate: [0, 90, 180, 270, 360],
        } : {},
        whileHover: { rotate: 180, scale: 1.1 },
        whileTap: { rotate: 360, scale: 0.95 },
        transition: isActive ? { duration: 4, repeat: Infinity, ease: "linear" } : { type: "spring", stiffness: 300 }
      };
    
    case 'complete-kit':
      // Sparkle/bounce animation
      return {
        animate: isActive ? {
          scale: [1, 1.15, 1],
          rotate: [0, 5, -5, 0],
        } : {},
        whileHover: { scale: 1.2, rotate: [0, -10, 10, 0] },
        whileTap: { scale: 0.85 },
        transition: isActive ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }
      };
    
    default:
      return baseActive;
  }
};

/**
 * MobileFeatureNav Component
 * Horizontal scrollable pill navigation optimized for mobile devices.
 * Features:
 * - Horizontal scroll with snap points for easy swiping
 * - Fade edges to indicate scrollable content
 * - Auto-scrolls active pill into view
 * - Touch-friendly 48px minimum tap targets
 */
interface MobileFeatureNavProps {
  features: TechFeature[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const MobileFeatureNav: React.FC<MobileFeatureNavProps> = ({
  features,
  activeIndex,
  onSelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  /**
   * Auto-scroll to keep the active pill visible when selection changes.
   * Uses smooth scrolling for a polished feel.
   */
  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeButtonRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      
      // Calculate scroll position to center the active button
      const scrollLeft = button.offsetLeft - (containerRect.width / 2) + (buttonRect.width / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  return (
    <div className="relative md:hidden">
      {/* Left fade edge - indicates more content on the left */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0d10] to-transparent z-10 pointer-events-none" 
        aria-hidden="true"
      />
      
      {/* Scrollable container with horizontal scroll and snap behavior */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-6 py-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {features.map((feature, index) => {
          const isActive = index === activeIndex;
          
          return (
            <button
              key={feature.id}
              ref={isActive ? activeButtonRef : null}
              onClick={() => onSelect(index)}
              className={cn(
                "snap-center shrink-0 flex items-center gap-2 px-4 py-3 rounded-full",
                "text-sm font-medium transition-all duration-200",
                "backdrop-blur-md border min-h-[48px] min-w-[90px]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                isActive 
                  ? "bg-white/[0.12] border-white/25 text-white" 
                  : "bg-white/[0.04] border-white/[0.08] text-gray-400"
              )}
              style={{
                boxShadow: isActive 
                  ? `0 0 20px -5px ${feature.accentColor}50` 
                  : undefined,
                borderColor: isActive ? `${feature.accentColor}50` : undefined,
              }}
            >
              <span style={{ color: isActive ? feature.accentColor : undefined }}>
                {feature.icon}
              </span>
              <span>{feature.shortName}</span>
            </button>
          );
        })}
      </div>
      
      {/* Right fade edge - indicates more content on the right */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0a0d10] to-transparent z-10 pointer-events-none" 
        aria-hidden="true"
      />
    </div>
  );
};

/**
 * MobileFeatureCard Component
 * Compact, swipeable info card optimized for mobile displays.
 * Features:
 * - Glassmorphic design with accent color accents
 * - Inline specs displayed as compact chips
 * - Truncated description (2 lines) to keep content density high
 * - Supports swipe gestures for feature navigation
 */
interface MobileFeatureCardProps {
  feature: TechFeature;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const MobileFeatureCard: React.FC<MobileFeatureCardProps> = ({
  feature,
  onSwipeLeft,
  onSwipeRight,
}) => {
  /**
   * Handle drag end to detect swipe direction.
   * Threshold of 50px prevents accidental swipes.
   */
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    const threshold = 50;
    if (info.offset.x < -threshold && onSwipeLeft) {
      onSwipeLeft();
    } else if (info.offset.x > threshold && onSwipeRight) {
      onSwipeRight();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative backdrop-blur-xl rounded-xl overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid ${feature.accentColor}30`,
        boxShadow: `0 0 30px -10px ${feature.accentColor}40`,
      }}
    >
      {/* Top accent line */}
      <div 
        className="absolute top-0 left-4 right-4 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${feature.accentColor}60, transparent)`,
        }}
      />

      <div className="relative p-4">
        {/* Header: Icon + Title + Tagline */}
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ 
              backgroundColor: `${feature.accentColor}20`,
              boxShadow: `0 0 15px ${feature.accentColor}30`,
            }}
          >
            <span style={{ color: feature.accentColor }}>
              {feature.icon}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p 
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: feature.accentColor }}
            >
              {feature.tagline}
            </p>
            <h3 className="text-base font-bold text-white truncate">
              {feature.name}
            </h3>
          </div>
        </div>

        {/* Inline specs as compact chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {feature.specs.map((spec, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md text-xs font-medium"
              style={{
                backgroundColor: `${feature.accentColor}15`,
                border: `1px solid ${feature.accentColor}25`,
              }}
            >
              <span style={{ color: feature.accentColor }} className="font-bold">
                {spec.value}
              </span>
              <span className="text-gray-400 ml-1">{spec.label}</span>
            </span>
          ))}
        </div>

        {/* Truncated description */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-3">
          {feature.description}
        </p>

        {/* Top 2 benefits with checkmarks */}
        <div className="space-y-1.5">
          {feature.benefits.slice(0, 2).map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle 
                className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" 
                style={{ color: feature.accentColor }}
              />
              <span className="text-xs text-gray-300 line-clamp-1">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Swipe indicator */}
        <div className="flex justify-center mt-3 gap-1">
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="w-6 h-1 rounded-full" style={{ backgroundColor: `${feature.accentColor}60` }} />
          <span className="w-1 h-1 rounded-full bg-white/20" />
        </div>
      </div>
    </motion.div>
  );
};

/**
 * FeatureNavigation Component
 * Enhanced holographic-style pill navigation with glow effects,
 * coordinated transitions, and feature-specific micro-animations.
 * Each button has unique hover/click quirks that match its feature theme.
 * This is the desktop version - hidden on mobile in favor of MobileFeatureNav.
 */
interface FeatureNavigationProps {
  features: TechFeature[];
  activeIndex: number;
  onSelect: (index: number) => void;
  prefersReducedMotion: boolean | null;
}

const FeatureNavigation: React.FC<FeatureNavigationProps> = ({
  features,
  activeIndex,
  onSelect,
  prefersReducedMotion
}) => {
  return (
    <div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-3">
      {features.map((feature, index) => {
        const isActive = index === activeIndex;
        const iconAnimation = getIconAnimation(feature.id, isActive, prefersReducedMotion);
        
        return (
          <motion.button
            key={feature.id}
            onClick={() => onSelect(index)}
            className={cn(
              "group relative flex items-center gap-2 px-4 py-3 rounded-full",
              "text-sm font-medium transition-colors duration-300",
              "backdrop-blur-md border min-h-[48px]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              isActive 
                ? "bg-white/[0.1] border-white/20 text-white" 
                : "bg-white/[0.03] border-white/[0.06] text-gray-400 hover:bg-white/[0.06] hover:border-white/10 hover:text-gray-200"
            )}
            style={{
              boxShadow: isActive 
                ? `0 0 30px -5px ${feature.accentColor}60, inset 0 1px 1px rgba(255,255,255,0.1)` 
                : undefined,
              borderColor: isActive ? `${feature.accentColor}40` : undefined,
            }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          >
            {/* Inner glow sweep animation on active */}
            {isActive && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                initial={false}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      `linear-gradient(90deg, transparent 0%, ${feature.accentColor}15 50%, transparent 100%)`,
                      `linear-gradient(90deg, transparent 100%, ${feature.accentColor}15 150%, transparent 200%)`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            )}

            {/* Sparkle burst on click for complete-kit */}
            {isActive && feature.id === 'complete-kit' && !prefersReducedMotion && (
              <motion.div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: feature.accentColor }}
                    animate={{
                      x: [0, Math.cos((i / 6) * Math.PI * 2) * 20],
                      y: [0, Math.sin((i / 6) * Math.PI * 2) * 20],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Ripple effect for sonic */}
            {isActive && feature.id === 'sonic-technology' && !prefersReducedMotion && (
              <motion.div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: feature.accentColor }}
                    animate={{
                      scale: [0.8, 1.5],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Water droplet effect for IPX7 */}
            {isActive && feature.id === 'water-resistant' && !prefersReducedMotion && (
              <motion.div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-1/2 w-1.5 h-2 rounded-full -translate-x-1/2"
                  style={{ backgroundColor: feature.accentColor }}
                  animate={{
                    y: [-10, 40],
                    opacity: [0, 0.8, 0],
                    scaleY: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            )}

            {/* Icon with feature-specific animation */}
            <motion.span 
              className="relative z-10 transition-colors duration-300"
              style={{ color: isActive ? feature.accentColor : undefined }}
              animate={iconAnimation.animate}
              whileHover={iconAnimation.whileHover}
              whileTap={iconAnimation.whileTap}
              transition={iconAnimation.transition}
            >
              {feature.icon}
            </motion.span>
            
            {/* Label */}
            <span className="relative z-10">{feature.shortName}</span>
            
            {/* Active indicator dot */}
            {isActive && (
              <motion.span
                layoutId="activeNavIndicator"
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: feature.accentColor }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            {/* Charging bolt for USB when active */}
            {isActive && feature.id === 'usb-charging' && !prefersReducedMotion && (
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                }}
              >
                <Zap className="w-3 h-3" style={{ color: feature.accentColor }} />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

/**
 * FeatureAccentEffect Component
 * Renders feature-specific visual effects around the product.
 * Each feature has a unique accent animation.
 * Completely disabled on mobile for performance since these effects
 * are complex SVG/DOM animations that cause jank on mobile devices.
 */
interface FeatureAccentEffectProps {
  featureId: string;
  accentColor: string;
  prefersReducedMotion: boolean | null;
  isMobile: boolean;
}

const FeatureAccentEffect: React.FC<FeatureAccentEffectProps> = ({
  featureId,
  accentColor,
  prefersReducedMotion,
  isMobile
}) => {
  // Skip all accent effects on mobile for performance - these are heavy SVG/DOM animations
  if (isMobile) {
    return null;
  }
  
  // Different effects based on feature
  switch (featureId) {
    case 'sonic-technology':
      // Enhanced vibration effect with sine waves, blur, and shaking
      // Positioned close to the brush but offset for visibility
      return (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={false}
        >
          {/* Vibrating ripple rings with horizontal shake - at brush head */}
          <motion.div
            className="absolute top-[22%] left-1/2 -translate-x-1/2"
            animate={prefersReducedMotion ? {} : {
              x: [-2, 2, -2, 2, 0],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ 
                  borderColor: accentColor,
                  borderWidth: '3px',
                  borderStyle: 'solid',
                }}
                animate={prefersReducedMotion ? {} : {
                  width: [15, 120],
                  height: [15, 120],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>

          {/* Oscillating sine wave - LEFT side, closer to brush */}
          <svg
            className="absolute top-[45%] left-[28%] w-24 h-16 -translate-x-full"
            viewBox="0 0 96 64"
            fill="none"
          >
            <motion.path
              d="M0 32 Q12 10, 24 32 T48 32 T72 32 T96 32"
              stroke={accentColor}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              animate={prefersReducedMotion ? {} : {
                d: [
                  "M0 32 Q12 10, 24 32 T48 32 T72 32 T96 32",
                  "M0 32 Q12 54, 24 32 T48 32 T72 32 T96 32",
                  "M0 32 Q12 10, 24 32 T48 32 T72 32 T96 32",
                ],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* Sine wave - RIGHT side, closer to brush */}
          <svg
            className="absolute top-[45%] right-[28%] w-24 h-16 translate-x-full"
            viewBox="0 0 96 64"
            fill="none"
          >
            <motion.path
              d="M0 32 Q12 10, 24 32 T48 32 T72 32 T96 32"
              stroke={accentColor}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              animate={prefersReducedMotion ? {} : {
                d: [
                  "M0 32 Q12 54, 24 32 T48 32 T72 32 T96 32",
                  "M0 32 Q12 10, 24 32 T48 32 T72 32 T96 32",
                  "M0 32 Q12 54, 24 32 T48 32 T72 32 T96 32",
                ],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>

          {/* Floating vibration particles - closer to brush on both sides */}
          {[...Array(16)].map((_, i) => {
            const isLeft = i < 8;
            const row = Math.floor((i % 8) / 2);
            return (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 0 6px ${accentColor}`,
                  left: isLeft ? `${35 - (i % 2) * 6}%` : `${65 + (i % 2) * 6}%`,
                  top: `${30 + row * 12}%`,
                }}
                animate={prefersReducedMotion ? {} : {
                  x: isLeft ? [-12, -4, -12] : [12, 4, 12],
                  y: [0, -15, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 0.8 + (i % 3) * 0.2,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* VPM counter - bottom center, below the brush */}
          <motion.div
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2"
            animate={prefersReducedMotion ? {} : {
              x: [-1, 1, -1, 1, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="px-4 py-2 rounded-xl text-center backdrop-blur-md"
              style={{
                backgroundColor: `rgba(0, 0, 0, 0.6)`,
                border: `2px solid ${accentColor}50`,
                boxShadow: `0 0 20px ${accentColor}30`,
              }}
            >
              <motion.span
                className="text-xl font-bold block"
                style={{ color: accentColor }}
                animate={prefersReducedMotion ? {} : {
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
              >
                31,000
              </motion.span>
              <span 
                className="text-[9px] uppercase tracking-wider font-medium"
                style={{ color: 'white' }}
              >
                vibrations/min
              </span>
            </div>
          </motion.div>

          {/* Blur lines emanating from brush head */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`blur-${i}`}
              className="absolute top-[24%] left-1/2 h-[3px] rounded-full"
              style={{
                backgroundColor: accentColor,
                width: '50px',
                boxShadow: `0 0 8px ${accentColor}`,
                transform: `translateX(-50%) rotate(${-40 + i * 11}deg)`,
                transformOrigin: 'center center',
              }}
              animate={prefersReducedMotion ? {} : {
                opacity: [0.2, 0.8, 0.2],
                scaleX: [0.5, 1.3, 0.5],
              }}
              transition={{
                duration: 0.35,
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      );

    case 'usb-charging':
      // Enhanced charging with battery fill, traveling sparks, and percentage
      return (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={false}
        >
          {/* Charging base glow */}
          <motion.div
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2"
          >
            <motion.div
              className="w-20 h-6 rounded-full blur-lg"
              style={{ backgroundColor: accentColor }}
              animate={prefersReducedMotion ? { opacity: 0.4 } : {
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Animated battery icon with fill */}
          <motion.div
            className="absolute bottom-[15%] left-1/2 -translate-x-1/2"
          >
            <div
              className="relative w-12 h-6 rounded-md border-2 overflow-hidden"
              style={{ borderColor: accentColor }}
            >
              {/* Battery fill animation */}
              <motion.div
                className="absolute bottom-0 left-0 right-0"
                style={{ backgroundColor: accentColor }}
                animate={prefersReducedMotion ? { height: '70%' } : {
                  height: ['20%', '100%', '20%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Battery segments */}
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-[1px] bg-black/20"
                  style={{ bottom: `${(i + 1) * 25}%` }}
                />
              ))}
              {/* Battery cap */}
              <div
                className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1 h-2 rounded-r-sm"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          </motion.div>

          {/* Traveling electricity sparks up the handle */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: '10%' }}
            >
              <motion.div
                className="w-1 h-1 rounded-full"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 0 6px ${accentColor}`,
                }}
                animate={prefersReducedMotion ? {} : {
                  y: [0, -300],
                  x: [(i % 2 === 0 ? -1 : 1) * 5, (i % 2 === 0 ? 1 : -1) * 5, (i % 2 === 0 ? -1 : 1) * 5],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 0.8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          ))}

          {/* Percentage indicator */}
          <motion.div
            className="absolute bottom-[25%] left-1/2 -translate-x-1/2"
          >
            <motion.div
              className="px-2 py-1 rounded-md backdrop-blur-sm text-center"
              style={{
                backgroundColor: `${accentColor}15`,
                border: `1px solid ${accentColor}30`,
              }}
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.span
                className="text-sm font-bold"
                style={{ color: accentColor }}
                animate={prefersReducedMotion ? { opacity: 1 } : {
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <motion.span
                  animate={prefersReducedMotion ? {} : {
                    // Animate through percentages
                  }}
                >
                  100%
                </motion.span>
              </motion.span>
            </motion.div>
          </motion.div>

          {/* USB connector glow pulse */}
          <motion.div
            className="absolute bottom-[5%] left-1/2 -translate-x-1/2"
          >
            <motion.div
              className="w-6 h-2 rounded-sm"
              style={{ backgroundColor: accentColor }}
              animate={prefersReducedMotion ? { opacity: 0.6 } : {
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  `0 0 10px ${accentColor}40`,
                  `0 0 25px ${accentColor}80`,
                  `0 0 10px ${accentColor}40`,
                ],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Lightning bolt icons floating */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`zap-${i}`}
              className="absolute"
              style={{
                left: `${35 + i * 10}%`,
                bottom: '12%',
              }}
              animate={prefersReducedMotion ? {} : {
                y: [0, -80, -160],
                opacity: [0, 0.8, 0],
                rotate: [0, (i % 2 === 0 ? 15 : -15)],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
            >
              <Zap 
                className="w-3 h-3" 
                style={{ color: accentColor, filter: `drop-shadow(0 0 4px ${accentColor})` }} 
              />
            </motion.div>
          ))}
        </motion.div>
      );

    case 'water-resistant':
      // Enhanced water effects with droplets, splashes, bubbles, and shimmer
      return (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={false}
        >
          {/* Falling water droplets with wobble physics */}
          {[...Array(8)].map((_, i) => {
            const size = 8 + (i % 3) * 4; // Varying sizes
            return (
              <motion.div
                key={`drop-${i}`}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size * 1.4,
                  background: `radial-gradient(ellipse at 30% 20%, white 0%, ${accentColor} 50%, ${accentColor}80 100%)`,
                  left: `${25 + (i * 7)}%`,
                }}
                animate={prefersReducedMotion ? {} : {
                  y: ['-10%', '75%'],
                  x: [0, (i % 2 === 0 ? 8 : -8), 0, (i % 2 === 0 ? -5 : 5), 0],
                  scaleY: [1, 1.2, 0.9, 1.1, 1],
                  scaleX: [1, 0.85, 1.1, 0.9, 1],
                  opacity: [0, 0.8, 0.8, 0.6, 0],
                }}
                transition={{
                  duration: 2.5 + (i % 3) * 0.5,
                  repeat: Infinity,
                  delay: i * 0.35,
                  ease: "easeIn",
                }}
              />
            );
          })}

          {/* Splash effects at impact points */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`splash-${i}`}
              className="absolute"
              style={{
                left: `${30 + i * 20}%`,
                top: '75%',
              }}
            >
              {/* Splash droplets radiating outward */}
              {[...Array(5)].map((_, j) => {
                const angle = -60 + j * 30;
                return (
                  <motion.div
                    key={j}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                    animate={prefersReducedMotion ? {} : {
                      x: [0, Math.cos(angle * Math.PI / 180) * 25],
                      y: [0, Math.sin(angle * Math.PI / 180) * 20 - 15],
                      opacity: [0, 0.8, 0],
                      scale: [0.5, 1, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.8 + 0.3,
                      repeatDelay: 2,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </motion.div>
          ))}

          {/* Rising bubbles from bottom */}
          {[...Array(12)].map((_, i) => {
            const size = 4 + (i % 4) * 2;
            return (
              <motion.div
                key={`bubble-${i}`}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  border: `1px solid ${accentColor}60`,
                  background: `radial-gradient(circle at 30% 30%, white 0%, transparent 60%)`,
                  left: `${35 + (i % 6) * 5}%`,
                  bottom: '5%',
                }}
                animate={prefersReducedMotion ? {} : {
                  y: [0, -400],
                  x: [(i % 2 === 0 ? -1 : 1) * 10, (i % 2 === 0 ? 1 : -1) * 10, (i % 2 === 0 ? -1 : 1) * 10],
                  opacity: [0, 0.6, 0.6, 0],
                  scale: [0.5, 1, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Water shimmer/reflection effect on brush */}
          <motion.div
            className="absolute top-[20%] left-1/2 -translate-x-1/2 w-16 h-48 overflow-hidden"
            style={{ opacity: 0.3 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 0%, ${accentColor}40 50%, transparent 100%)`,
              }}
              animate={prefersReducedMotion ? {} : {
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Water ripple rings at base */}
          <motion.div
            className="absolute bottom-[10%] left-1/2 -translate-x-1/2"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ripple-${i}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{ borderColor: accentColor }}
                animate={prefersReducedMotion ? {} : {
                  width: [20, 80],
                  height: [8, 32],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>

          {/* IPX7 badge */}
          <motion.div
            className="absolute top-[10%] left-1/2 -translate-x-1/2"
            animate={prefersReducedMotion ? {} : {
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-2"
              style={{
                backgroundColor: `${accentColor}20`,
                border: `1px solid ${accentColor}40`,
              }}
            >
              <Droplets className="w-4 h-4" style={{ color: accentColor }} />
              <span 
                className="text-xs font-bold uppercase"
                style={{ color: accentColor }}
              >
                Shower Safe
              </span>
            </div>
          </motion.div>
        </motion.div>
      );

    case 'smart-timer':
      // Enhanced timer with sweeping hand, quadrant lighting, and countdown
      return (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={false}
        >
          {/* Outer timer ring - scaled down for compact desktop */}
          <div 
            className="w-[140px] h-[140px] rounded-full border-2 relative"
            style={{ borderColor: `${accentColor}30` }}
          >
            {/* Quadrant arc segments that light up sequentially */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              {[0, 1, 2, 3].map((quadrant) => {
                const startAngle = quadrant * 90;
                const endAngle = startAngle + 88; // Small gap between segments
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const x1 = 50 + 45 * Math.cos(startRad);
                const y1 = 50 + 45 * Math.sin(startRad);
                const x2 = 50 + 45 * Math.cos(endRad);
                const y2 = 50 + 45 * Math.sin(endRad);
                
                return (
                  <motion.path
                    key={quadrant}
                    d={`M 50 50 L ${x1} ${y1} A 45 45 0 0 1 ${x2} ${y2} Z`}
                    fill={accentColor}
                    animate={prefersReducedMotion ? { opacity: 0.2 } : {
                      opacity: [0.1, 0.5, 0.1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      delay: quadrant * 2,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </svg>

            {/* Sweeping clock hand - scaled proportionally */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-[55px] rounded-full origin-bottom"
              style={{ 
                backgroundColor: accentColor,
                boxShadow: `0 0 10px ${accentColor}80`,
                translateX: '-50%',
                translateY: '-100%',
              }}
              animate={prefersReducedMotion ? {} : {
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Center dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{ 
                backgroundColor: accentColor,
                boxShadow: `0 0 15px ${accentColor}60`,
              }}
            />

            {/* Quadrant markers with sequential pulse */}
            {[0, 90, 180, 270].map((deg, i) => {
              const rad = ((deg - 90) * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * 42;
              const y = 50 + Math.sin(rad) * 42;
              return (
                <motion.div
                  key={deg}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: accentColor,
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: `0 0 8px ${accentColor}60`,
                  }}
                  animate={prefersReducedMotion ? { opacity: 0.5 } : {
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.3, 0.8],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

            {/* 30-second interval ticks */}
            {[...Array(12)].map((_, i) => {
              const deg = i * 30;
              const rad = ((deg - 90) * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * 38;
              const y = 50 + Math.sin(rad) * 38;
              const isQuadrant = i % 3 === 0;
              
              if (isQuadrant) return null; // Skip quadrant positions (already have markers)
              
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: `${accentColor}60`,
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              );
            })}
          </div>

          {/* Countdown display - positioned closer for compact layout */}
          <motion.div
            className="absolute -bottom-12 left-1/2 -translate-x-1/2"
          >
            <div
              className="px-4 py-2 rounded-xl backdrop-blur-sm text-center"
              style={{
                backgroundColor: `${accentColor}15`,
                border: `1px solid ${accentColor}30`,
              }}
            >
              <motion.div
                className="text-2xl font-mono font-bold tracking-wider"
                style={{ color: accentColor }}
                animate={prefersReducedMotion ? {} : {
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                2:00
              </motion.div>
              <div 
                className="text-[9px] uppercase tracking-wider mt-0.5"
                style={{ color: `${accentColor}80` }}
              >
                Dentist Recommended
              </div>
            </div>
          </motion.div>

          {/* Quadrant zone labels */}
          {['Q1', 'Q2', 'Q3', 'Q4'].map((label, i) => {
            const positions = [
              { top: '5%', left: '75%' },
              { top: '75%', left: '75%' },
              { top: '75%', left: '5%' },
              { top: '5%', left: '5%' },
            ];
            return (
              <motion.div
                key={label}
                className="absolute text-[10px] font-bold"
                style={{
                  color: accentColor,
                  ...positions[i],
                }}
                animate={prefersReducedMotion ? { opacity: 0.3 } : {
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 2,
                }}
              >
                {label}
              </motion.div>
            );
          })}

          {/* Pulse ring on quadrant completion */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: accentColor }}
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.15, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.div>
      );

    case 'cleaning-modes':
      // Enhanced mode selector with rotating dial, sequential indicators, and mode icons
      return (
        <motion.div
          className="absolute top-[35%] left-1/2 -translate-x-1/2 pointer-events-none"
          initial={false}
        >
          {/* Rotating dial/knob visualization */}
          <motion.div
            className="relative w-24 h-24 mb-4"
            style={{ left: '-12px' }}
          >
            {/* Outer ring with notches */}
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: `${accentColor}40` }}
            />
            
            {/* 5 mode position markers around the dial */}
            {[0, 1, 2, 3, 4].map((i) => {
              const angle = -90 + (i * 45); // Spread across 180 degrees
              const rad = (angle * Math.PI) / 180;
              const x = 42 + Math.cos(rad) * 38;
              const y = 42 + Math.sin(rad) * 38;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: accentColor,
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={prefersReducedMotion ? { opacity: 0.5 } : {
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
            
            {/* Rotating dial pointer */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-8 h-1 rounded-full origin-left"
              style={{ 
                backgroundColor: accentColor,
                boxShadow: `0 0 10px ${accentColor}`,
              }}
              animate={prefersReducedMotion ? {} : {
                rotate: [-90, -45, 0, 45, 90, 45, 0, -45, -90],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
              }}
            />
            
            {/* Center knob */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{ 
                backgroundColor: accentColor,
                boxShadow: `0 0 15px ${accentColor}60`,
              }}
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
          </motion.div>

          {/* Sequential mode bars */}
          <div className="flex flex-col gap-1.5 items-center">
            {['Clean', 'Soft', 'White', 'Gum', 'Deep'].map((mode, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
              >
                <motion.div
                  className="w-10 h-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                  animate={prefersReducedMotion ? { opacity: 0.3 } : {
                    opacity: [0.15, 0.9, 0.15],
                    scaleX: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
                <motion.span
                  className="text-[8px] font-medium uppercase tracking-wider w-8"
                  style={{ color: accentColor }}
                  animate={prefersReducedMotion ? { opacity: 0.3 } : {
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                >
                  {mode}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );

    case 'complete-kit':
      // Static display for complete kit - no distracting animations
      return null;

    default:
      return null;
  }
};

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

/**
 * ProductTechHighlight Component
 * 
 * An immersive 3D product showcase featuring the SLEEK toothbrush with:
 * - Multi-layer parallax background with particle effects
 * - Central floating product with 3D perspective transforms
 * - Holographic info panels that animate based on feature selection
 * - Enhanced pill navigation with glow effects
 * - SVG connection lines linking product to panels
 * - Feature-specific accent animations (ripples, glows, etc.)
 * 
 * The design creates a premium, tech-forward experience that positions
 * SLEEK as a cutting-edge brand.
 */
const ProductTechHighlight: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const currentFeature = features[activeFeature];
  
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Combine refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  /**
   * Detect mobile viewport for performance optimizations.
   * Mobile devices get reduced animations and effects.
   */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Track mouse position for parallax effects.
   * Normalizes position to 0-1 range relative to container.
   * Disabled on mobile as touch devices don't track mouse.
   */
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion, isMobile]);

  /**
   * Handle feature selection from navigation.
   * Triggers coordinated animations across all layers.
   */
  const handleFeatureSelect = (index: number) => {
    setActiveFeature(index);
  };

  // Animation variants with near-instant timing for better UX
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.15, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  /**
   * Handler for swiping to next feature on mobile.
   * Wraps around to first feature when at the end.
   */
  const handleSwipeLeft = useCallback(() => {
    setActiveFeature((prev) => (prev + 1) % features.length);
  }, []);

  /**
   * Handler for swiping to previous feature on mobile.
   * Wraps around to last feature when at the beginning.
   */
  const handleSwipeRight = useCallback(() => {
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
  }, []);

  return (
    <section 
      id="technology" 
      className={cn(
        "relative overflow-hidden",
        // Mobile: Compact padding. Desktop: Reduced padding to fit on single screen
        "py-10 md:py-16 lg:py-16"
      )}
      ref={setRefs}
    >
      {/* Multi-layer background system - optimized for mobile */}
      <BackgroundLayers
        accentColor={currentFeature.accentColor}
        accentColorRGB={currentFeature.accentColorRGB}
        mousePosition={mousePosition}
        prefersReducedMotion={prefersReducedMotion}
        isMobile={isMobile}
      />

      <div className="container-standard relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className={cn(
            // Tighter spacing on mobile, reduced on desktop to fit viewport
            isMobile ? "space-y-5" : "space-y-8"
          )}
        >
          {/* Section Header - more compact on mobile */}
          <div className="text-center">
            <motion.span
              variants={itemVariants}
              className={cn(
                "inline-flex items-center rounded-full font-semibold tracking-wide uppercase",
                // Smaller badge on mobile
                isMobile ? "px-3 py-1 text-xs mb-3" : "px-4 py-1.5 text-sm mb-6"
              )}
              style={{
                backgroundColor: `${currentFeature.accentColor}15`,
                color: currentFeature.accentColor,
                border: `1px solid ${currentFeature.accentColor}30`,
              }}
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span 
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: currentFeature.accentColor }}
                />
                <span 
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: currentFeature.accentColor }}
                />
              </span>
              MODERN TECHNOLOGY
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className={cn(
                "font-bold text-white font-heading tracking-tight",
                // Smaller heading on mobile
                isMobile ? "text-2xl mb-2" : "text-4xl md:text-5xl lg:text-6xl mb-6"
              )}
              style={{ lineHeight: 1.1 }}
            >
              Simple Features for
              <br />
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${currentFeature.accentColor}, white)`,
                }}
              >
                Easy Use
              </span>
            </motion.h2>
            
            {/* Hide subtitle on mobile to save space */}
            {!isMobile && (
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
              >
                Smart features designed for a cleaner, healthier smile.
              </motion.p>
            )}
          </div>

          {/* Feature Navigation - different components for mobile vs desktop */}
          <motion.div variants={itemVariants}>
            {/* Mobile: Horizontal scrollable pills */}
            <MobileFeatureNav
              features={features}
              activeIndex={activeFeature}
              onSelect={handleFeatureSelect}
            />
            
            {/* Desktop: Wrapped pill navigation with animations */}
            <FeatureNavigation
              features={features}
              activeIndex={activeFeature}
              onSelect={handleFeatureSelect}
              prefersReducedMotion={prefersReducedMotion}
            />
          </motion.div>

          {/* Main Showcase Area */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            {/* Mobile Layout: Compact vertical stack */}
            {isMobile ? (
              <div className="space-y-4">
                {/* Product Image with overlay badges */}
                <div className="relative flex items-center justify-center py-2">
                  <ProductHero3D
                    perspective={currentFeature.perspective}
                    accentColor={currentFeature.accentColor}
                    prefersReducedMotion={prefersReducedMotion}
                    showcaseImage={currentFeature.showcaseImage}
                    featureName={currentFeature.name}
                    isMobile={true}
                    specs={currentFeature.specs}
                  />
                </div>
                
                {/* Mobile Feature Card - swipeable */}
                <div className="px-2">
                  <AnimatePresence mode="wait">
                    <MobileFeatureCard
                      key={`mobile-card-${currentFeature.id}`}
                      feature={currentFeature}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                    />
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              /* Desktop Layout: Three-column with holographic panels */
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-4 items-center min-h-[450px] lg:min-h-[500px]">
                
                {/* Left Info Panel (desktop only) */}
                <div className="relative hidden lg:block">
                  <AnimatePresence mode="wait">
                    <HolographicPanel
                      key={`left-${currentFeature.id}`}
                      feature={currentFeature}
                      position="left"
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </AnimatePresence>
                  
                  {/* Connection line to product */}
                  <ConnectionLine
                    accentColor={currentFeature.accentColor}
                    position="left"
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </div>

                {/* Central Product Hero with 3D transforms */}
                <div className="relative flex items-center justify-center py-4 lg:py-0">
                  <ProductHero3D
                    perspective={currentFeature.perspective}
                    accentColor={currentFeature.accentColor}
                    prefersReducedMotion={prefersReducedMotion}
                    showcaseImage={currentFeature.showcaseImage}
                    featureName={currentFeature.name}
                    isMobile={false}
                  />
                  
                  {/* Feature-specific accent effects - desktop only */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`effect-${currentFeature.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-10"
                    >
                      <FeatureAccentEffect
                        featureId={currentFeature.id}
                        accentColor={currentFeature.accentColor}
                        prefersReducedMotion={prefersReducedMotion}
                        isMobile={isMobile}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right placeholder for grid balance (desktop) */}
                <div className="hidden lg:block" />
              </div>
            )}
          </motion.div>

          {/* Bottom Feature Quick Stats - Desktop only, mobile shows in card */}
          {!isMobile && (
            <motion.div 
              variants={itemVariants}
              className="flex justify-center gap-8 md:gap-12 pt-4"
            >
              {currentFeature.specs.map((spec, idx) => (
                <motion.div
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                >
                  <p 
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: currentFeature.accentColor }}
                  >
                    {spec.value}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                    {spec.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default ProductTechHighlight;
