'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types for the benefits data
export interface BenefitItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Component props
interface MembershipBenefitsGridProps {
  title?: string;
  benefits: BenefitItem[];
  className?: string;
}

export default function MembershipBenefitsGrid({
  title = "The SLEEK Membership Experience",
  benefits,
  className,
}: MembershipBenefitsGridProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Animation variants with reduced motion support
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.05 : 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: prefersReducedMotion ? 10 : 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className={cn("section-padding bg-white relative overflow-hidden", className)}>
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-pattern-light"></div>
      
      <div className="container-standard relative z-10">
        {/* Section heading */}
        <motion.div 
          initial={{ opacity: 0, y: prefersReducedMotion ? 10 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
          className="section-header"
        >
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="section-badge"
          >
            MEMBERSHIP BENEFITS
          </motion.span>
          
          <h2 className="section-title">
            {title}
          </h2>
          
          <div className="w-24 h-1.5 bg-teal-600 mx-auto rounded-full"></div>
        </motion.div>
        
        {/* Benefits grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="feature-grid"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  transition: { duration: 0.3 }
                }}
                className="feature-card text-center md:text-left"
              >
                <div className="feature-icon mx-auto md:mx-0">
                  <Icon className="w-8 h-8" />
                </div>
                
                <div className="flex flex-col items-center md:items-start">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 tracking-tight leading-tight font-heading">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
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