'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
  Building2,
  X
} from 'lucide-react';
import Modal from './Modal';

/**
 * Individual benefit item with title and detailed description.
 * Used to display specific savings percentages and provider information.
 */
interface BenefitItem {
  title: string;
  description: string;
}

/**
 * PBA Benefit category with icon and items.
 * Categories organize the various Premier Business Association benefits.
 */
interface BenefitCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: BenefitItem[];
  accentColor: string;
}

/**
 * Premier Business Association benefits data organized by category.
 * These benefits are available to PRO and MAX members.
 * Each item includes specific discount percentages and provider details.
 */
const benefitCategories: BenefitCategory[] = [
  {
    id: 'healthcare',
    title: 'Healthcare Savings',
    icon: <Stethoscope className="w-6 h-6" />,
    items: [
      {
        title: 'Chiropractic Savings',
        description: 'Save 20% to 40% on chiropractic fees at participating chiropractors across the country.'
      },
      {
        title: 'Hearing Discount',
        description: 'TruHearing offers savings of 30-60% off retail prices on hearing aids in different styles and colors.'
      },
      {
        title: 'Vision Savings',
        description: 'Save 10% to 60% off eyeglasses, contact lenses and other retail eyewear at participating providers.'
      },
      {
        title: '24-Hour Nurseline',
        description: 'Members have unlimited access to Registered Nurses via a toll-free telephone number.'
      }
    ],
    accentColor: '#14b8a6'
  },
  {
    id: 'travel',
    title: 'Travel & Transportation',
    icon: <Plane className="w-6 h-6" />,
    items: [
      {
        title: 'Avis and Budget Car Rentals',
        description: 'Up to 25% off your rental when you use the Avis or Budget discount code.'
      },
      {
        title: 'Choice Hotels',
        description: 'Members save up to 20% off the best available rate at participating Choice Hotels.'
      },
      {
        title: 'Travel Savings',
        description: 'Online booking website comparable to Expedia and Priceline, offering Member Only prices.'
      },
      {
        title: 'Auto Glass Repair',
        description: 'Save $10 on rock chip repair, $20 on glass replacement through Safelite AutoGlass.'
      }
    ],
    accentColor: '#3b82f6'
  },
  {
    id: 'business',
    title: 'Business & Office',
    icon: <Building2 className="w-6 h-6" />,
    items: [
      {
        title: 'Lenovo Discount',
        description: 'Save up to 30% off the entire product line of laptops, tablets, desktops, servers, and more.'
      },
      {
        title: 'Office Supplies',
        description: 'Save up to 80% on over 93,000 products at any Office Depot or OfficeMax store.'
      },
      {
        title: 'Delivery Services',
        description: 'Save up to 50% on UPS shipping rates for ground, air, and international services.'
      },
      {
        title: 'My Association Savings',
        description: 'Access over $4,500 in exclusive member discounts on everyday products and services.'
      }
    ],
    accentColor: '#8b5cf6'
  },
  {
    id: 'wellness',
    title: 'Wellness & Pharmacy',
    icon: <Heart className="w-6 h-6" />,
    items: [
      {
        title: 'Diabetic & Home Medical Supplies',
        description: 'Save 10% on diabetic, health and wellness, and pet health products.'
      },
      {
        title: 'Vitamins & Nutritional Supplements',
        description: 'Members can save an additional 20% on a wide range of vitamins.'
      },
      {
        title: 'Health Services Hub',
        description: 'Free access to daily wellness articles, health tips, and personalized workout programs.'
      },
      {
        title: 'Online Wellness Portal',
        description: 'Unlimited resources for nutrition, fitness, stress management, and healthy living guidance.'
      }
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
  
  // State for controlling the "About PBA" modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            
            {/* Premier Business Association logo */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mt-4"
            >
              <Image
                src="/images/Premier-Business-Association-logo.png"
                alt="Premier Business Association"
                width={200}
                height={80}
                className="object-contain"
              />
            </motion.div>
            
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
              and money-saving discounts.{' '}
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-purple-600 hover:text-purple-700 font-semibold underline underline-offset-2 transition-colors"
              >
                Learn More
              </button>
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
                <ul className="space-y-4">
                  {category.items.map((item, idx) => (
                    <li 
                      key={idx}
                      className="flex items-start gap-3"
                    >
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: category.accentColor }}
                      />
                      <div className="flex flex-col">
                        <span 
                          className="font-semibold text-gray-900 leading-tight"
                        >
                          {item.title}
                        </span>
                        <span className="text-gray-600 text-sm leading-relaxed mt-0.5">
                          {item.description}
                        </span>
                      </div>
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
                <Gift className="w-5 h-5 flex-shrink-0" />
                <span className="font-semibold text-sm">Included with PRO & MAX Plans</span>
              </div>
              <span className="text-gray-400 hidden sm:block leading-none">|</span>
              <span className="text-gray-600 text-sm">
                Access your benefits through the Member Portal
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* About Premier Business Association Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
        <div className="relative bg-white rounded-lg">
          {/* Close button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute -top-2 -right-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal content */}
          <div className="text-center space-y-6 bg-white">
            {/* PBA Logo */}
            <div className="flex justify-center">
              <Image
                src="/images/Premier-Business-Association-logo.png"
                alt="Premier Business Association"
                width={180}
                height={72}
                className="object-contain"
              />
            </div>

            {/* Divider */}
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-teal-500 mx-auto rounded-full" />

            {/* Description */}
            <div className="text-left space-y-4">
              <p className="text-gray-800 leading-relaxed">
                The Premier Business Association (Premier Business)* is a non-profit organization 
                serving the goals and needs of small businesses, the self-employed, independent 
                contractors, and entrepreneurs from across the nation.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Premier Business has been dedicated to providing benefits and resources to help 
                its members with professional, lifestyle and health-related benefits, as well as 
                advocacy opportunities so they can have a voice on issues that may impact their success.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Despite changes to the economy and the health care landscape that have made an 
                uncertain future, Premier Business is focused on assisting its members in any way 
                possible and growing into a leader for the independent business person.
              </p>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 italic pt-2 border-t border-gray-100">
              *Premier Business Association is a registered trademark.
            </p>
          </div>
        </div>
      </Modal>
    </section>
  );
}
