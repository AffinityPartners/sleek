"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from './Button';
import { LucideIcon } from 'lucide-react';

type CalloutVariant = 'default' | 'teal' | 'dark' | 'gradient' | 'warning' | 'success';
type CalloutLayout = 'row' | 'column';

export interface CalloutBoxProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  buttonText?: string;
  buttonAction?: () => void;
  variant?: CalloutVariant;
  layout?: CalloutLayout;
  className?: string;
  children?: React.ReactNode;
  animate?: boolean;
}

export default function CalloutBox({
  title,
  description,
  icon: Icon,
  buttonText,
  buttonAction,
  variant = 'default',
  layout = 'row',
  className,
  children,
  animate = false,
}: CalloutBoxProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm',
    teal: 'bg-teal-50 border border-teal-100',
    dark: 'bg-sleek-blue text-white',
    gradient: 'bg-gradient-to-r from-teal-400 to-teal-600 text-white',
    warning: 'bg-teal-50 border border-teal-100',
    success: 'bg-green-50 border border-green-100',
  };

  const buttonVariant = {
    default: 'primary',
    teal: 'dental',
    dark: 'glass-teal',
    gradient: 'glass',
    warning: 'primary',
    success: 'primary',
  };

  const iconColors = {
    default: 'text-teal-500',
    teal: 'text-teal-600',
    dark: 'text-teal-300',
    gradient: 'text-white',
    warning: 'text-teal-500',
    success: 'text-green-500',
  };

  const descriptionColors = {
    default: 'text-gray-500',
    teal: 'text-teal-700',
    dark: 'text-gray-300',
    gradient: 'text-teal-50',
    warning: 'text-teal-700',
    success: 'text-green-700',
  };

  const containerClasses = cn(
    'rounded-2xl p-6 lg:p-8',
    variantClasses[variant],
    layout === 'row' ? 'flex flex-col md:flex-row md:items-center md:gap-8' : 'flex flex-col gap-6',
    className
  );

  const buttonVariantType = buttonVariant[variant] as 'primary' | 'dental' | 'glass' | 'glass-teal';

  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const content = (
    <>
      <div className={layout === 'row' ? 'flex-1' : ''}>
        <div className="flex items-center gap-3 mb-3">
          {Icon && (
            <div className={cn("p-1", iconColors[variant])}>
              <Icon size={24} />
            </div>
          )}
          <h3 className={cn(
            "text-xl font-bold",
            variant === 'dark' || variant === 'gradient' ? 'text-white' : 'text-gray-900'
          )}>
            {title}
          </h3>
        </div>
        
        {description && (
          <p className={cn("text-base mb-4", descriptionColors[variant])}>
            {description}
          </p>
        )}
        
        {children}
      </div>
      
      {buttonText && (
        <div className={layout === 'row' ? 'mt-4 md:mt-0 md:flex-shrink-0' : 'mt-2'}>
          <Button
            variant={buttonVariantType}
            onClick={buttonAction}
          >
            {buttonText}
          </Button>
        </div>
      )}
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