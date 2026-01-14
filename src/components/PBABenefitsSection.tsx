'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Stethoscope, 
  Phone, 
  Ear, 
  Glasses, 
  Car, 
  Hotel, 
  Plane, 
  Laptop, 
  Gift, 
  FileText, 
  Truck, 
  Heart,
  Pill,
  Building2
} from 'lucide-react';

/**
 * PBA Benefit category with icon and items.
 * Categories organize the various Premier Business Association benefits.
 */
interface BenefitCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: string[];
  accentColor: string;
}

/**
 * Premier Business Association benefits data organized by category.
 * These benefits are available to PRO and MAX members.
 */
const benefitCategories: BenefitCategory[] = [
  {
    id: 'healthcare',
    title: 'Healthcare Savings',
    icon: <Stethoscope className="w-6 h-6" />,
    items: [
      'Chiropractic fees at participating chiropractors',
      '24-Hour Nurseline with unlimited toll-free access',
      'Hearing aids in a wide variety of styles and colors',
      'Eyewear discounts on eyeglasses and contact lenses'
    ],
    accentColor: '#14b8a6'
  },
  {
    id: 'travel',
    title: 'Travel & Transportation',
    icon: <Plane className="w-6 h-6" />,
    items: [
      'Car rentals through Avis and Budget',
      'Hotel room rates at over 7,000 Choice Hotels',
      'Travel savings through online booking website',
      'Auto glass repair through Safelite'
    ],
    accentColor: '#3b82f6'
  },
  {
    id: 'business',
    title: 'Business & Office',
    icon: <Building2 className="w-6 h-6" />,
    items: [
      'Computers, laptops, tablets through Lenovo',
      'Office supplies at Office Depot/Office Max',
      'UPS delivery services discounts',
      'Exclusive consumer perks'
    ],
    accentColor: '#8b5cf6'
  },
  {
    id: 'wellness',
    title: 'Wellness & Pharmacy',
    icon: <Heart className="w-6 h-6" />,
    items: [
      'Prescriptions through 65,000+ pharmacies nationwide',
      'Diabetic supplies and health products',
      'Wellness and pet health supplies',
      'And many more exclusive savings'
    ],
    accentColor: '#f59e0b'
  }
];

/**
 * PBABenefitsSection component displays the Premier Business Association benefits.
 * This is a value-add benefit available to PRO and MAX membership levels.
 * Features an animated grid layout with category cards.
 */
export default function PBABenefitsSection() {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.1 : 0.15,
        delayChildren: prefersReducedMotion ? 0.1 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: prefersReducedMotion ? 15 : 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.4 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[60%] h-[50%] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.15) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="container-standard relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Section header */}
          <div className="section-header">
            <motion.span 
              variants={itemVariants}
              className="section-badge"
            >
              PRO & MAX EXCLUSIVE
            </motion.span>
            
            <motion.h2
              variants={itemVariants}
              className="section-title"
            >
              Premier Business Association Benefits
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="section-subtitle max-w-3xl"
            >
              With your PRO or MAX membership, you&apos;re part of the Premier Business Association, 
              a non-profit organization delivering a wide variety of health services, business benefits, 
              and money-saving discounts.
            </motion.p>
          </div>

          {/* Benefits grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
          >
            {benefitCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { 
                  y: -5,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-gray-100 hover:shadow-card-hover hover:border-gray-200 transition-all duration-300"
              >
                {/* Category header */}
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${category.accentColor}15` }}
                  >
                    <div style={{ color: category.accentColor }}>
                      {category.icon}
                    </div>
                  </div>
                  <h3 
                    className="text-xl font-bold"
                    style={{ color: category.accentColor }}
                  >
                    {category.title}
                  </h3>
                </div>

                {/* Benefits list */}
                <ul className="space-y-3">
                  {category.items.map((item, idx) => (
                    <li 
                      key={idx}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: category.accentColor }}
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA note */}
          <motion.div 
            variants={itemVariants}
            className="text-center pt-4"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-100/50">
              <div className="flex items-center gap-2 text-purple-700">
                <Gift className="w-5 h-5" />
                <span className="font-semibold">Included with PRO & MAX Plans</span>
              </div>
              <span className="text-gray-500 hidden sm:block">|</span>
              <p className="text-gray-600 text-sm">
                Access your benefits through the Member Portal
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
