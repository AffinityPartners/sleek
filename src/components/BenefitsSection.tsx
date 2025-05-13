'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
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

const staggerContainer = (staggerChildren = 0.05, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export default function BenefitsSection() {
  const [activeBenefit, setActiveBenefit] = useState<number | null>(null);
  
  // Close any open benefit when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.benefit-card')) {
        setActiveBenefit(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggle = (index: number) => {
    setActiveBenefit(activeBenefit === index ? null : index);
  };

  const benefitsData = [
    {
      title: "Chiropractic Savings",
      content: "Save 20% to 40% on chiropractic fees at participating chiropractors across the country."
    },
    {
      title: "Health Services Hub",
      content: "Daily wellness articles, health tips, personalized workout programs."
    },
    {
      title: "Hearing Discount",
      content: "TruHearing® offers savings of 30-60% off retail prices on a wide variety of hearing aids in different styles and colors."
    },
    {
      title: "Vision Savings",
      content: "Save 10% to 60% off eyeglasses, contact lenses and other retail eyewear items at participating providers."
    },
    {
      title: "24-Hour Nurseline",
      content: "Members have unlimited access to Registered Nurses via a toll-free telephone number."
    },
    {
      title: "Diabetic & Home Medical Supplies",
      content: "Save 10% on diabetic, health & wellness, and pet health."
    },
    {
      title: "Vitamins & Nutritional Supplements",
      content: "Our members can save an additional 20% on a wide range of vitamins."
    },
    {
      title: "Online Wellness",
      content: "Nutrition, fitness, stress management, and supplementation information."
    },
    {
      title: "Avis and Budget Car Rentals",
      content: "Up to 25% off your rental when you use the Avis or Budget discount code."
    },
    {
      title: "Choice Hotels",
      content: "Members save up to 20% off the best available rate at participating Choice Hotels."
    },
    {
      title: "Lenovo Discount",
      content: "Save up to 30% off the entire product line of laptops, tablets, desktops, servers, and more!"
    },
    {
      title: "My Association Saving Benefits",
      content: "Exclusive perks and over $4,500 in savings on everything!"
    },
    {
      title: "Office Supplies",
      content: "Save up to 80% on over 93,000 products at any Office Depot or OfficeMax store."
    },
    {
      title: "Auto Glass Repair",
      content: "Save $10 on rock chip repair, $20 on glass replacement through Safelite® AutoGlass."
    },
    {
      title: "Travel Savings",
      content: "Online booking website comparable to Expedia & Priceline, offering Member Only prices."
    },
    {
      title: "Delivery Services",
      content: "Discounts on UPS delivery services for a variety of shipping options."
    }
  ];

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
      className="py-24 relative overflow-hidden"
    >
      {/* Ambient background with gradient & pattern */}
      <div className="absolute inset-0 bg-gradient-teal-subtle opacity-60"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      {/* Light orbs for ambient effect */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-100/20 blur-3xl"></div>
      <div className="absolute -bottom-60 -left-20 w-96 h-96 rounded-full bg-teal-200/20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <motion.h2 
            variants={fadeIn(0.1)} 
            className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
          >
            OCP, PRO & MAX Membership Value Added Benefits<sup className="text-teal-500">1</sup>
          </motion.h2>
        </div>
        
        <motion.div variants={fadeIn(0.2)} className="mt-14">
          <div className="relative bg-white/40 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-glass overflow-hidden border border-white/30">
            {/* Highlight reflections - glass morphism effect */}
            <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
            <div className="absolute -top-10 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 right-10 w-60 h-60 bg-teal-100/10 rounded-full blur-3xl"></div>
            
            <motion.div variants={fadeIn(0.3)} className="relative">
              <div className="flex flex-col items-center mb-8">
                <div className="flex items-center justify-center mb-6 relative group">
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-md rounded-2xl shadow-glass-hover scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-white/80 p-5 rounded-2xl shadow-sm overflow-hidden border border-white/40">
                    <Image
                      src="/images/blog/logo/Premier-Business-Association-logo.png"
                      alt="Premier Business Association"
                      width={200}
                      height={140}
                      sizes="200px"
                      className="object-contain"
                      priority
                    />
                    
                    {/* Subtle reflection */}
                    <div className="absolute top-0 left-5 right-5 h-px bg-white/50"></div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                  Premier Business Association Perks
                </h2>
                
                <p className="text-base text-gray-600/80 max-w-2xl mx-auto leading-tight font-light">
                  Exclusive benefits for PRO & MAX members to support your business and lifestyle.
                </p>
              </div>
              
              <motion.div variants={fadeIn(0.4)} className="prose max-w-none text-gray-600/70 mb-10 text-sm leading-snug px-4 sm:px-8 lg:px-16">
                <p className="max-w-4xl mx-auto text-center font-light">
                  The Premier Business Association serves small businesses, self-employed professionals, and entrepreneurs across the nation with professional, lifestyle, health-related benefits, and advocacy opportunities.
                  <span className="text-teal-600 hover:text-teal-700 transition-colors pl-1 inline-flex items-center cursor-pointer">
                    Learn more
                    <svg className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </p>
              </motion.div>
              
              <motion.div 
                variants={staggerContainer(0.03, 0.1)} 
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {benefitsData.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn()}
                    className={`benefit-card relative rounded-xl overflow-hidden transition-all duration-300 ease-out ${
                      activeBenefit === index
                        ? 'col-span-1 lg:col-span-2 row-span-1'
                        : ''
                    }`}
                  >
                    <div 
                      className={`h-full bg-white/60 backdrop-blur-lg border border-white/30 ${
                        activeBenefit === index
                          ? 'shadow-lg'
                          : 'shadow-sm hover:shadow-md'
                      } transition-all duration-300`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggle(index);
                        }}
                        className="w-full px-6 py-5 text-left flex justify-between items-center group transition-all duration-300"
                        aria-expanded={activeBenefit === index}
                        aria-controls={`benefit-content-${index}`}
                      >
                        <span className="font-medium text-gray-800 leading-tight tracking-tight group-hover:text-teal-700 transition-colors duration-300">
                          {benefit.title}
                        </span>
                        
                        <div
                          className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-300 ${
                            activeBenefit === index ? 'bg-teal-50 text-teal-600' : 'text-gray-400'
                          } group-hover:text-teal-600`}
                        >
                          <motion.div
                            initial={false}
                            animate={{ 
                              rotate: activeBenefit === index ? 180 : 0,
                              opacity: activeBenefit === index ? 1 : 0.7
                            }}
                            transition={{ duration: 0.3, ease: 'anticipate' }}
                          >
                            <svg 
                              className="h-4 w-4" 
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
                        </div>
                      </button>
                      
                      {/* Short preview always visible */}
                      {activeBenefit !== index && (
                        <div className="px-6 pb-5 text-xs text-gray-500 font-light leading-relaxed">
                          {benefit.content.length > 60 ? `${benefit.content.substring(0, 60)}...` : benefit.content}
                        </div>
                      )}
                      
                      <AnimatePresence>
                        {activeBenefit === index && (
                          <motion.div
                            id={`benefit-content-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 py-4 text-sm text-gray-600 leading-relaxed">
                              <div className="mb-5">{benefit.content}</div>
                              
                              {/* Call-to-action button */}
                              <div className="pt-2">
                                <button className="inline-flex items-center px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-medium rounded-full transition-colors duration-300">
                                  Learn more
                                  <svg className="ml-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div variants={fadeIn(0.4)} className="mt-8 flex justify-center">
                <p className="text-xs text-gray-400/80 max-w-2xl text-center font-light">
                  <sup>1</sup>Included in Pro & Max Plans only. PBA benefits are not provided by Metropolitan Life Insurance Company.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 