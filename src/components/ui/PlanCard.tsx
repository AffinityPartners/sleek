"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import Button from './Button'; 

type PlanVariant = 'default' | 'featured' | 'simple' | 'enterprise';

export interface PlanCardProps {
  title: string;
  price: string;
  description?: string;
  features: string[];
  buttonText: string;
  onButtonClick?: () => void;
  variant?: PlanVariant;
  className?: string;
  animate?: boolean;
  popular?: boolean;
  subtext?: string;
  icon?: React.ReactNode;
  highlightedFeatures?: number[];
}

export default function PlanCard({
  title,
  price,
  description,
  features,
  buttonText,
  onButtonClick,
  variant = 'default',
  className,
  animate = false,
  popular = false,
  subtext,
  icon,
  highlightedFeatures = [],
}: PlanCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm',
    featured: 'bg-white border-2 border-teal-400 shadow-lg',
    simple: 'bg-gray-50 border border-gray-200',
    enterprise: 'bg-sleek-blue border border-sleek-blue text-white',
  };

  const buttonVariant = {
    default: 'primary',
    featured: 'dental',
    simple: 'outline',
    enterprise: 'glass-teal',
  };

  const cardClasses = cn(
    'rounded-2xl p-6 lg:p-8 flex flex-col',
    variantClasses[variant],
    popular && 'relative z-10 scale-105 my-4',
    className
  );

  const buttonVariantType = buttonVariant[variant] as 'primary' | 'dental' | 'outline' | 'glass-teal';

  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: popular ? 0.2 : 0,
      }
    }
  };

  const content = (
    <>
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <div className="bg-teal-500 text-white text-xs font-medium px-4 py-1 rounded-full shadow-md">
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
        </div>
        {icon && <div className="text-teal-500">{icon}</div>}
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold tracking-tight text-gray-900">{price}</span>
          {subtext && <span className="ml-2 text-sm text-gray-500">{subtext}</span>}
        </div>
      </div>

      <ul className="mb-8 space-y-3 flex-1">
        {features.map((feature, index) => (
          <li 
            key={index} 
            className={cn(
              "flex items-start", 
              highlightedFeatures.includes(index) && "font-medium text-gray-900"
            )}
          >
            <Check 
              className={cn(
                "h-5 w-5 shrink-0 mr-2", 
                variant === 'enterprise' ? "text-teal-300" : "text-teal-500"
              )} 
            />
            <span className={cn(
              "text-sm", 
              variant === 'enterprise' ? "text-gray-100" : "text-gray-500",
              highlightedFeatures.includes(index) && (
                variant === 'enterprise' ? "text-white" : "text-gray-900"
              )
            )}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Button
          variant={buttonVariantType}
          size="lg"
          fullWidth
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </>
  );

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerAnimation}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses}>
      {content}
    </div>
  );
} 