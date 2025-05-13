"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LucideIcon } from 'lucide-react';

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

type FeatureGridVariant = 'default' | 'cards' | 'minimal' | 'bordered';
type FeatureGridColumns = 2 | 3 | 4;

interface FeatureGridProps {
  features: FeatureItem[];
  variant?: FeatureGridVariant;
  columns?: FeatureGridColumns;
  className?: string;
  animate?: boolean;
  staggerDelay?: number;
}

export default function FeatureGrid({
  features,
  variant = 'default',
  columns = 3,
  className,
  animate = false,
  staggerDelay = 0.1,
}: FeatureGridProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const itemVariantClasses = {
    default: 'flex flex-col items-start gap-4',
    cards: 'flex flex-col items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100',
    minimal: 'flex gap-4 items-start',
    bordered: 'flex flex-col items-start gap-4 p-6 border border-gray-200 rounded-xl',
  };

  const gridClasses = cn(
    'grid gap-8',
    columnClasses[columns],
    className
  );

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={gridClasses}
      initial="hidden"
      animate={inView && animate ? "visible" : "hidden"}
      variants={containerAnimation}
    >
      {features.map((feature, index) => {
        const Icon = feature.icon;
        
        return (
          <motion.div
            key={index}
            className={cn(itemVariantClasses[variant])}
            variants={animate ? itemAnimation : undefined}
          >
            <div className="text-teal-500 p-2 rounded-lg bg-teal-50">
              <Icon size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
} 