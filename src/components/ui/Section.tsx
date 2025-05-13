"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type SectionVariant = 'default' | 'teal' | 'dark' | 'gray' | 'gradient';
type SectionWidth = 'default' | 'narrow' | 'wide' | 'full';

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: SectionVariant;
  width?: SectionWidth;
  withContainer?: boolean;
  animate?: boolean;
  id?: string;
}

export default function Section({
  children,
  className,
  variant = 'default',
  width = 'default',
  withContainer = true,
  animate = false,
  id,
}: SectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px',
  });

  const variantClasses = {
    default: 'bg-white',
    teal: 'bg-teal-50',
    dark: 'bg-sleek-dark-blue text-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-teal-soft',
  };

  const widthClasses = withContainer ? {
    default: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    narrow: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
    wide: 'max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8',
    full: 'w-full',
  } : {
    default: '',
    narrow: '',
    wide: '',
    full: '',
  };

  const sectionClasses = cn(
    'py-16 md:py-24',
    variantClasses[variant],
    className
  );

  const containerClasses = cn(
    widthClasses[width]
  );

  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      }
    }
  };

  if (animate) {
    return (
      <section id={id} className={sectionClasses}>
        <motion.div
          ref={ref}
          className={containerClasses}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerAnimation}
        >
          {children}
        </motion.div>
      </section>
    );
  }

  return (
    <section id={id} className={sectionClasses}>
      <div className={containerClasses}>
        {children}
      </div>
    </section>
  );
} 