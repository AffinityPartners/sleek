"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Activity, 
  Battery, 
  Droplets, 
  Sparkles, 
  Bluetooth, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Smartphone,
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

// Define our feature data
const features: TechFeature[] = [
  {
    id: 'pressure-sensor',
    name: 'Smart Pressure Sensor',
    description: 'Intelligent pressure detection protects your gums and ensures optimal cleaning without damage to enamel.',
    icon: <Activity className="w-6 h-6" />,
    accentColor: '#1ab9a3',
    image: '/images/SLEEK-ToothBrush.jpg',
    benefits: [
      'Prevents gum recession and enamel wear',
      'Visual feedback when you press too hard',
      'Automatically reduces intensity when needed'
    ]
  },
  {
    id: 'uv-sanitizer',
    name: 'UV-C Sanitizing',
    description: 'Built-in UV light technology kills 99.9% of bacteria between brushings for maximum hygiene.',
    icon: <Sparkles className="w-6 h-6" />,
    accentColor: '#7c3aed',
    image: '/images/SLEEK-ToothBrush.jpg',
    benefits: [
      'Destroys harmful microorganisms',
      'Maintains brush cleanliness between uses',
      'Automatic sanitizing cycle after each use'
    ]
  },
  {
    id: 'wireless-charging',
    name: 'Wireless Charging',
    description: 'Fast-charging wireless dock provides up to 30 days of power on a single charge.',
    icon: <Battery className="w-6 h-6" />,
    accentColor: '#2563eb',
    image: '/images/SLEEK-ToothBrush.jpg',
    benefits: [
      'Sleek minimalist charging dock',
      'LED charging indicator',
      'Travel-friendly with 30-day battery life'
    ]
  },
  {
    id: 'water-resistant',
    name: 'IPX7 Water Resistant',
    description: 'Fully waterproof design ensures durability and easy cleaning under any water conditions.',
    icon: <Droplets className="w-6 h-6" />,
    accentColor: '#0891b2',
    image: '/images/SLEEK-ToothBrush.jpg',
    benefits: [
      'Safe for shower use',
      'Submersible up to 1 meter for 30 minutes',
      'Easy to rinse clean under running water'
    ]
  },
  {
    id: 'smart-connect',
    name: 'Smart Connect',
    description: 'Bluetooth connectivity pairs with our app to track brushing habits and provide personalized coaching.',
    icon: <Bluetooth className="w-6 h-6" />,
    accentColor: '#4f46e5',
    image: '/images/SLEEK-ToothBrush.jpg',
    benefits: [
      'Real-time brushing feedback',
      'Personalized brushing routines',
      'Tracks progress and suggests improvements'
    ]
  },
  {
    id: 'cleaning-modes',
    name: 'Multiple Cleaning Modes',
    description: '5 intelligent brushing modes designed for different oral care needs from sensitive to whitening.',
    icon: <RotateCcw className="w-6 h-6" />,
    accentColor: '#ef4444',
    image: '/images/SLEEK-ToothBrush.jpg',
    benefits: [
      'Clean mode for daily brushing',
      'Sensitive mode for gentle care',
      'Whitening mode for stain removal',
      'Gum care mode for improved circulation',
      'Deep clean mode for intensive cleaning'
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
    <section id="technology" className="py-20 md:py-28 bg-gradient-to-b from-white to-[#f4f9f8]" ref={ref}>
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Section Header */}
          <div className="text-center">
            <motion.span
              variants={itemVariants}
              className="px-4 py-1 rounded-full bg-[#1ab9a3]/10 text-[#1ab9a3] text-sm font-semibold mb-4 inline-block"
            >
              ADVANCED TECHNOLOGY
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4 text-[#070708] tracking-tight"
            >
              Cutting-Edge Toothbrush Features
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Experience next-generation oral care with features designed for superior cleaning results.
            </motion.p>
          </div>

          {/* Main Content - Feature Showcase */}
          <motion.div variants={itemVariants} className="relative">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start justify-between">
              {/* Feature Visualization - Left Column */}
              <div className="w-full lg:w-3/5 relative bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Background Gradient Element */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-20" 
                       style={{ backgroundColor: currentFeature.accentColor }}></div>
                  <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-10"
                       style={{ backgroundColor: currentFeature.accentColor }}></div>
                </div>

                {/* Feature Content Carousel */}
                <div className="relative p-6 md:p-10 h-full flex flex-col z-10">
                  {/* Feature header */}
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                         style={{ backgroundColor: `${currentFeature.accentColor}15` }}>
                      <div style={{ color: currentFeature.accentColor }}>
                        {currentFeature.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight" style={{ color: currentFeature.accentColor }}>
                      {currentFeature.name}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-8 min-h-[400px]">
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
                          {/* Feature Image with lazy loading */}
                          <motion.div 
                            className="h-full w-full rounded-xl overflow-hidden"
                            animate={prefersReducedMotion ? {} : { 
                              y: [0, -8, 0],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 5,
                              ease: "easeInOut"
                            }}
                          >
                            <Image
                              src={currentFeature.image}
                              alt={currentFeature.name}
                              fill
                              className="object-contain scale-90"
                              priority={activeFeature === 0}
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            
                            {/* Reflection effect */}
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent rounded-b-xl mix-blend-overlay pointer-events-none" />
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    
                    {/* Feature Description and Benefits */}
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
                          <p className="text-gray-600 mb-6 leading-relaxed">{currentFeature.description}</p>
                          
                          {/* Feature Benefits */}
                          <h4 className="text-lg font-semibold mb-4 text-gray-800">Key Benefits:</h4>
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
                                <CheckCircle className="h-5 w-5 text-[#1ab9a3] mr-3 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{benefit}</span>
                              </motion.li>
                            ))}
                          </ul>
                          
                          {/* View more link */}
                          <motion.a 
                            href="#"
                            className="mt-auto pt-6 text-[#1ab9a3] font-medium inline-flex items-center group"
                            whileHover={{ x: 5 }}
                          >
                            Learn more
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </motion.a>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  {/* Carousel Navigation Buttons */}
                  <div className="absolute flex justify-between w-full left-0 top-1/2 -translate-y-1/2 px-4 z-20 pointer-events-none">
                    <button 
                      onClick={handlePrevious}
                      className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors pointer-events-auto"
                      aria-label="Previous feature"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors pointer-events-auto"
                      aria-label="Next feature"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Feature Tabs - Right Column */}
              <div className="w-full lg:w-2/5">
                <div className="space-y-3 md:space-y-4">
                  {features.map((feature, index) => (
                    <motion.button
                      key={feature.id}
                      onClick={() => handleTabChange(index)}
                      className={cn(
                        "w-full border-2 p-4 md:p-5 rounded-xl flex items-start text-left gap-4 transition-all duration-300",
                        index === activeFeature 
                          ? "bg-white shadow-lg translate-x-0" 
                          : "bg-white/50 border-transparent hover:bg-white/80 hover:-translate-x-2"
                      )}
                      style={{
                        borderColor: index === activeFeature ? feature.accentColor : 'transparent',
                        boxShadow: index === activeFeature ? `0 8px 20px -6px ${feature.accentColor}30` : 'none'
                      }}
                      whileHover={prefersReducedMotion ? {} : { 
                        scale: 1.02,
                        x: -8,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div 
                        className="p-2.5 rounded-full flex-shrink-0"
                        style={{ 
                          backgroundColor: index === activeFeature 
                            ? `${feature.accentColor}20` 
                            : '#f4f9f8' 
                        }}
                      >
                        <div style={{ color: feature.accentColor }}>
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{feature.name}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{feature.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTabChange(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeFeature 
                      ? 'bg-[#1ab9a3] scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Additional Tech Specs Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          >
            {[
              { 
                title: "40,000", 
                subtitle: "Sonic vibrations per minute",
                icon: <Activity className="w-6 h-6 text-[#1ab9a3]" />
              },
              { 
                title: "30+ Days", 
                subtitle: "Battery life on a single charge",
                icon: <Battery className="w-6 h-6 text-[#1ab9a3]" />
              },
              { 
                title: "Real-time", 
                subtitle: "Brushing feedback and coaching",
                icon: <Smartphone className="w-6 h-6 text-[#1ab9a3]" />
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-md flex items-center gap-5 hover:shadow-xl transition-shadow duration-300"
                whileHover={prefersReducedMotion ? {} : { y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-[#1ab9a3]/10 p-3.5 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600">{item.subtitle}</p>
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