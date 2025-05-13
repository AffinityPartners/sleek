"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, MotionProps } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type CardVariant = 'default' | 'outline' | 'glass' | 'filled' | 'teal';
type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  variant?: CardVariant;
  size?: CardSize;
  hover?: boolean;
  animate?: boolean;
  children: React.ReactNode;
  className?: string;
  motionProps?: Partial<MotionProps>;
  onClick?: () => void;
}

export default function Card({
  variant = 'default',
  size = 'md',
  hover = true,
  animate = false,
  children,
  className,
  motionProps,
  onClick,
  ...props
}: CardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px',
  });
  
  const baseClasses = "rounded-2xl relative overflow-hidden";

  const variantClasses = {
    default: 'bg-white border border-gray-100 shadow-sm',
    outline: 'bg-transparent border border-gray-200 hover:border-teal-200',
    glass: 'backdrop-blur-md bg-white/70 border border-white/20 shadow-glass',
    filled: 'bg-gray-50',
    teal: 'bg-teal-50 border border-teal-100',
  };

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover
    ? variant === 'glass'
      ? 'transition-all duration-300 hover:shadow-glass-hover'
      : 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
    : '';

  const containerClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    hoverClasses,
    className
  );

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={containerClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={containerClasses} onClick={onClick}>
      {children}
    </div>
  );
} 