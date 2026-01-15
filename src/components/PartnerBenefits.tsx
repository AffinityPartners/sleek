'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Framer Motion Variants ---
const viewport = { once: true, margin: '-100px' };

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }
  }
});

const slideIn = (direction = 'left', delay = 0) => ({
  hidden: { opacity: 0, x: direction === 'left' ? -30 : 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }
  }
});

const staggerContainer = (staggerChildren = 0.05, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

// --- Partner Benefit Data ---
const partnerBenefitsData = [
  {
    id: 'teledentists',
    name: 'TheTeleDentists®',
    tagline: 'Save time and money!',
    description: 'Virtual dentists wherever and whenever a dentist is needed 24/7/365.',
    features: [
      'US-Licensed dental professionals',
      'Personalized treatment plans',
      'E-prescriptions of non-narcotic medication'
    ],
    imageSrc: '/images/products/Teledentistry-Consultations.jpg',
    imageAlt: 'TheTeleDentists Virtual Dental Care',
    imageOrder: 'order-1 md:order-2', // Image on right for md screens
    textOrder: 'order-2 md:order-1', // Text on left for md screens
    disclosure: 'Terms, Conditions and Disclosures',
    ctaText: 'TheTeleDentists Virtual Dental Care'
  },
  {
    id: 'optumrx',
    name: 'Optum Rx®',
    tagline: 'Prescription Benefit',
    description: 'Savings on generic and name-brand medications at over 65,000 select pharmacies nationwide.',
    features: [
      'Save 10% to 85% on Generic and Name Brand Prescriptions',
      'Mail Order Service Available',
      'Members Always Receive the Lowest Price at the Pharmacy that day'
    ],
    imageSrc: '/images/products/Discount-Rx-Benefits.jpg',
    imageAlt: 'Optum Rx Prescription Benefits',
    imageOrder: 'order-1', // Image on left for md screens (alternating with teledentists)
    textOrder: 'order-2', // Text on right for md screens (alternating with teledentists)
    disclosure: 'Terms, Conditions and Disclosures',
    ctaText: 'Optum Rx Prescription Benefits'
  }
];

export default function PartnerBenefits() {
  const [expandedTerms, setExpandedTerms] = useState<{[key: string]: boolean}>({});

  const toggleTerms = (id: string) => {
    setExpandedTerms(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
      className="py-24 relative overflow-hidden"
    >
      {/* Ambient background with gradient & pattern */}
      <div className="absolute inset-0 bg-gradient-teal-subtle opacity-50"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      {/* Light orbs for ambient effect */}
      <div className="absolute -top-40 -right-20 w-96 h-96 rounded-full bg-teal-100/20 blur-3xl"></div>
      <div className="absolute -bottom-60 -left-40 w-96 h-96 rounded-full bg-teal-200/20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            variants={fadeIn(0.1)} 
            className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3"
          >
            Additional Value-Added Benefits
          </motion.h2>
          <motion.p
            variants={fadeIn(0.2)}
            className="text-base text-gray-600/80 max-w-2xl mx-auto leading-tight font-light"
          >
            Exclusive partner services for SLEEK Dental Club members
          </motion.p>
        </div>

        <div className="space-y-20">
          {partnerBenefitsData.map((benefit, index) => (
            <motion.div 
              key={benefit.id}
              variants={staggerContainer(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="relative"
            >
              <div className="absolute inset-0 w-full h-full bg-white/30 rounded-3xl backdrop-blur-md shadow-glass border border-white/30 -z-10"></div>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch p-8 md:p-10 rounded-3xl">
                <motion.div 
                  variants={slideIn(index % 2 === 0 ? 'left' : 'right', 0.1)} 
                  className={`${benefit.textOrder} flex flex-col`}
                >
                  <div>
                    <div className="flex flex-col mb-5">
                      <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight mb-1.5">
                        {benefit.name}
                      </h3>
                      {benefit.tagline && (
                        <p className="text-teal-600 font-medium text-sm">
                          {benefit.tagline}
                        </p>
                      )}
                    </div>
                    
                    <p className="text-gray-700 leading-snug mb-6">
                      {benefit.description}
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      {benefit.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600/90 leading-tight">
                          <span className="text-teal-500 mr-2.5 mt-0.5 flex-shrink-0">
                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {benefit.disclosure && (
                      <div className="mt-4">
                        <button 
                          onClick={() => toggleTerms(benefit.id)}
                          className="inline-flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors duration-200 group"
                          aria-expanded={expandedTerms[benefit.id]}
                        >
                          <span>{benefit.disclosure}</span>
                          <span className="ml-1.5 h-4 w-4 rounded-full flex items-center justify-center bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
                            <motion.div
                              initial={false}
                              animate={{ 
                                rotate: expandedTerms[benefit.id] ? 180 : 0,
                                opacity: expandedTerms[benefit.id] ? 1 : 0.8
                              }}
                              transition={{ duration: 0.3, ease: 'anticipate' }}
                            >
                              <svg 
                                className="h-3 w-3" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </motion.div>
                          </span>
                        </button>
                        
                        <AnimatePresence>
                          {expandedTerms[benefit.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 text-xs text-gray-500 font-light leading-snug">
                                <p>Terms, Conditions and Disclosures</p>
                                <p className="mt-2">Services provided by third-party vendors. Limitations and restrictions apply. Not available in all states.</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                    
                    <div className="mt-8">
                      <button className="inline-flex items-center px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-medium rounded-full transition-colors duration-300 border border-teal-100/30">
                        {benefit.ctaText}
                        <svg className="ml-1.5 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={slideIn(index % 2 === 0 ? 'right' : 'left', 0.2)}
                  className={`relative ${benefit.imageOrder} h-96 md:h-auto bg-white/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-sm`}
                >
                  <div className="absolute inset-0 group">
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <Image 
                      src={benefit.imageSrc} 
                      alt={benefit.imageAlt} 
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Subtle reflection */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-white/40"></div>
                  </div>
                </motion.div>
              </div>
              
              {/* Light orb for each benefit */}
              <div className={`absolute ${index % 2 === 0 ? '-bottom-20 -right-20' : '-top-20 -left-20'} w-60 h-60 rounded-full bg-teal-100/10 blur-3xl -z-10`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 