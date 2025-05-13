"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LucideIcon } from 'lucide-react';

type IconTextVariant = 'default' | 'teal' | 'outline' | 'dark' | 'minimal';
type IconTextSize = 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'top' | 'right';

export interface IconTextProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  variant?: IconTextVariant;
  size?: IconTextSize;
  iconPosition?: IconPosition;
  animate?: boolean;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function IconText({
  icon: Icon,
  title,
  description,
  variant = 'default',
  size = 'md',
  iconPosition = 'left',
  animate = false,
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
}: IconTextProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variantClasses = {
    default: 'text-gray-900',
    teal: 'text-teal-900',
    outline: 'border border-gray-200 rounded-xl p-4',
    dark: 'text-white',
    minimal: 'text-gray-700',
  };

  const sizeClasses = {
    sm: iconPosition === 'top' ? 'gap-2' : 'gap-3',
    md: iconPosition === 'top' ? 'gap-3' : 'gap-4',
    lg: iconPosition === 'top' ? 'gap-4' : 'gap-5',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const titleSizeClasses = {
    sm: 'text-sm font-medium',
    md: 'text-base font-semibold',
    lg: 'text-lg font-semibold',
  };

  const descriptionSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const iconPositionClasses = {
    left: 'flex-row items-center',
    top: 'flex-col items-start',
    right: 'flex-row-reverse items-center',
  };

  const containerClasses = cn(
    'flex',
    iconPositionClasses[iconPosition],
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const iconContainerClasses = cn(
    iconPosition === 'top' ? 'mb-1' : '',
    variant === 'teal' ? 'text-teal-600' : 'text-gray-500',
    iconSizeClasses[size],
    iconClassName
  );

  const titleClasses = cn(
    titleSizeClasses[size],
    titleClassName
  );

  const descriptionClasses = cn(
    'text-gray-500',
    descriptionSizeClasses[size],
    descriptionClassName
  );

  const containerAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const content = (
    <>
      <div className={iconContainerClasses}>
        <Icon className={iconSizeClasses[size]} />
      </div>
      <div className="flex flex-col">
        <div className={titleClasses}>{title}</div>
        {description && <div className={descriptionClasses}>{description}</div>}
      </div>
    </>
  );

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={containerClasses}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerAnimation}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={containerClasses}>
      {content}
    </div>
  );
} 