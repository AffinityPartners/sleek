'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Type definition for individual benefit items.
 * Each benefit has an icon, title, and description.
 */
export interface BenefitItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Props for the MembershipBenefitsGrid component.
 * Accepts a title and array of benefits to display.
 */
interface MembershipBenefitsGridProps {
  title?: string;
  subtitle?: string;
  benefits: BenefitItem[];
  className?: string;
}

/**
 * MembershipBenefitsGrid displays a grid of benefits with icons.
 * Features staggered animations and hover effects for each card.
 * The grid is responsive: 1 column on mobile, 2 on tablet, 3 on desktop.
 */
export default function MembershipBenefitsGrid({
  title = "The SLEEK Membership Experience",
  subtitle = "Everything you need for exceptional oral care, delivered to your door",
  benefits,
  className,
}: MembershipBenefitsGridProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Animation variants with near-instant timing for better UX
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 10,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className={cn("section-padding relative overflow-hidden", className)}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute bottom-0 left-1/4 w-[60%] h-[50%] rounded-full blur-3xl opacity-25"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.2) 0%, transparent 70%)'
          }}
        />
      </div>
      
      <div className="container-standard relative z-10">
        {/* Section heading */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="section-header"
        >
          <motion.span 
            initial={{ opacity: 0, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.15 }}
            className="section-badge"
          >
            MEMBERSHIP BENEFITS
          </motion.span>
          
          <h2 className="section-title">
            {title}
          </h2>
          
          <p className="section-subtitle">
            {subtitle}
          </p>
        </motion.div>
        
        {/* Benefits grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={prefersReducedMotion ? {} : { 
                  y: -8,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className="group relative"
              >
                {/* Card with hover glow effect - responsive padding for mobile */}
                <div className="relative h-full p-6 md:p-8 rounded-2xl bg-white border border-gray-100 transition-all duration-300 group-hover:border-teal-200/50 group-hover:shadow-card-hover">
                  {/* Subtle gradient overlay on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.03) 0%, transparent 100%)'
                    }}
                  />
                  
                  {/* Icon container with gradient background */}
                  <div className="relative mb-6">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(15, 118, 110, 0.08) 100%)'
                      }}
                    >
                      <Icon className="w-7 h-7 text-teal-600 transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    {/* Glow effect behind icon on hover */}
                    <div 
                      className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, transparent 70%)'
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
