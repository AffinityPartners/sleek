"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Define type for a value-added benefit
interface ValueBenefit {
  id: string;
  title: string;
  description: string[];
  imageSrc: string;
  ctaText?: string;
  ctaLink?: string;
  accent?: string;
}

// Array of value-added benefits with their details
const valueBenefits: ValueBenefit[] = [
  {
    id: 'teledentistry',
    title: 'Virtual Dental Consultations',
    description: [
      'Connect with licensed dentists via secure video call at no extra cost',
      'Get professional advice on oral health concerns without leaving home',
      'Unlimited consultations included with premium subscription plans'
    ],
    imageSrc: '/images/Teledentistry.jpg',
    ctaText: 'Schedule a free consult',
    ctaLink: '/consultations',
    accent: '#4fa8df'
  },
  {
    id: 'whitening-kit',
    title: 'Complimentary Whitening Kit',
    description: [
      'Professional-grade teeth whitening system delivered to your door',
      'Custom-fit trays designed for comfort and effectiveness',
      'Clinically proven to whiten teeth up to 5 shades in just one week'
    ],
    imageSrc: '/images/SLEEK-Dental-Club-Kit-Graphic.jpg',
    ctaText: 'Learn more about whitening',
    ctaLink: '/whitening',
    accent: '#1ab9a3'
  },
  {
    id: 'family-plan',
    title: 'Family Plan Savings',
    description: [
      'Save up to 30% when you add family members to your subscription',
      'Each family member receives their own personalized brush and replacement heads',
      'Centralized account management for easy tracking of everyone\'s oral care'
    ],
    imageSrc: '/images/SLEEK-Dental-Club-Complete-Kit-Graphic.jpg',
    ctaText: 'Add family members',
    ctaLink: '/family-plan',
    accent: '#8757e6'
  }
];

const AdditionalValueBenefits = () => {
  return (
    <section className="py-20 md:py-28 relative bg-white overflow-hidden">
      {/* Top fade in */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="px-4 py-1 rounded-full bg-[#1ab9a3]/10 text-[#1ab9a3] text-sm font-semibold mb-4 inline-block"
          >
            VALUE-ADDED BENEFITS
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#070708] tracking-tight">
            Premium Benefits for Members
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Enjoy these exclusive perks with our premium subscription plans.
          </p>
        </motion.div>

        {valueBenefits.map((benefit, index) => {
          const isEven = index % 2 === 0;
          const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.1,
            rootMargin: "-100px 0px"
          });
          
          return (
            <motion.div 
              key={benefit.id}
              ref={ref}
              className="mb-20 last:mb-0"
            >
              <div className={`
                flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16
                ${isEven ? '' : 'lg:flex-row-reverse'} 
              `}>
                {/* Image Side */}
                <motion.div 
                  className="w-full lg:w-1/2"
                  initial={{ 
                    opacity: 0, 
                    x: isEven ? -50 : 50 
                  }}
                  animate={inView ? { 
                    opacity: 1, 
                    x: 0 
                  } : {}}
                  transition={{ 
                    duration: 0.8, 
                    type: "spring", 
                    bounce: 0.2
                  }}
                >
                  <div className="relative aspect-video md:aspect-[4/3] lg:aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-2xl group">
                    {/* Image container with hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent z-10 group-hover:opacity-50 transition-opacity duration-500"></div>
                    
                    <motion.div 
                      className="relative h-full w-full"
                      whileHover={{
                        scale: 1.05
                      }}
                      transition={{
                        duration: 1,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                    >
                      <Image
                        src={benefit.imageSrc}
                        alt={benefit.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500"
                      />
                    </motion.div>
                    
                    {/* Decorative accent corner element */}
                    <div className="absolute top-0 left-0 h-16 w-16 overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 w-32 h-32 -rotate-45 -translate-x-16 -translate-y-8 opacity-90"
                        style={{ background: benefit.accent }}
                      ></div>
                    </div>
                  </div>
                </motion.div>

                {/* Text Side */}
                <motion.div 
                  className="w-full lg:w-1/2 p-0 md:p-6"
                  initial={{ 
                    opacity: 0, 
                    x: isEven ? 50 : -50
                  }}
                  animate={inView ? { 
                    opacity: 1, 
                    x: 0 
                  } : {}}
                  transition={{ 
                    duration: 0.8, 
                    type: "spring", 
                    bounce: 0.2,
                    delay: 0.1
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight"
                      style={{ color: benefit.accent }}
                    >
                      {benefit.title}
                    </motion.h3>
                    
                    <motion.ul 
                      className="space-y-4 mb-8"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {benefit.description.map((item, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.3, delay: 0.5 + (idx * 0.1) }}
                        >
                          <div 
                            className="mr-3 mt-1 p-0.5 rounded-full"
                            style={{ background: `${benefit.accent}20` }}
                          >
                            <Check className="h-4 w-4" style={{ color: benefit.accent }} />
                          </div>
                          <span className="text-gray-700 leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                    
                    {benefit.ctaText && benefit.ctaLink && (
                      <motion.a 
                        href={benefit.ctaLink} 
                        className="inline-flex items-center font-medium rounded-lg px-5 py-2.5 transition-all duration-300 group"
                        style={{
                          backgroundColor: `${benefit.accent}10`,
                          color: benefit.accent
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        whileHover={{ 
                          backgroundColor: benefit.accent,
                          color: 'white',
                          scale: 1.05,
                        }}
                      >
                        {benefit.ctaText}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Bottom fade out */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
};

export default AdditionalValueBenefits; 