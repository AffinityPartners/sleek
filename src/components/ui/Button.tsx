"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'dental' 
  | 'dental-outline' 
  | 'glass' 
  | 'glass-teal' 
  | 'link';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  shine?: boolean;
  loading?: boolean;
  animate?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
  form?: string;
  tabIndex?: number;
  value?: string;
  title?: string;
  ariaLabel?: string;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  shine = false,
  loading = false,
  animate = true,
  href,
  name,
  id,
  form,
  tabIndex,
  value,
  title,
  ariaLabel,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700 focus-visible:ring-teal-500 shadow-sm hover:shadow',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-400 border border-gray-200',
    outline: 'border border-teal-500 bg-transparent text-teal-500 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-400',
    ghost: 'bg-transparent text-teal-500 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-400',
    dental: 'bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:from-teal-500 hover:to-teal-700 active:from-teal-600 active:to-teal-800 focus-visible:ring-teal-500 shadow-sm hover:shadow-md',
    'dental-outline': 'border-2 border-teal-400 bg-transparent text-teal-500 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-400',
    'glass': 'backdrop-blur-md bg-white/20 border border-white/20 text-gray-800 hover:bg-white/30 shadow-glass hover:shadow-glass-hover focus-visible:ring-white/30',
    'glass-teal': 'backdrop-blur-md bg-teal-500/90 border border-teal-400/30 text-white shadow-glass-teal hover:shadow-glow hover:bg-teal-500 focus-visible:ring-teal-400/50',
    'link': 'bg-transparent text-teal-500 hover:text-teal-600 hover:underline p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0',
  };
  
  const sizeClasses = {
    xs: 'px-3 py-1.5 text-xs gap-1.5',
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-5 py-2.5 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
    xl: 'px-7 py-3.5 text-xl gap-3',
  };
  
  const disabledClasses = disabled || loading 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : 'cursor-pointer';
  
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const isGlassVariant = variant === 'glass' || variant === 'glass-teal';
  
  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    widthClasses,
    className,
    'relative overflow-hidden'
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };
  
  const ButtonContent = () => (
    <>
      {(shine || isGlassVariant) && (
        <span className="absolute inset-0 z-10 overflow-hidden">
          <motion.span 
            className="absolute top-0 left-0 w-[30px] h-full bg-white opacity-20 transform -skew-x-20"
            animate={{
              left: ['0%', '150%'],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 3,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </span>
      )}
      
      {isGlassVariant && (
        <span className="absolute inset-0 opacity-20 overflow-hidden">
          <span className="absolute blur-gradient-shape w-12 h-10 -top-5 -left-5 animate-morph" />
          <span className="absolute blur-gradient-shape w-10 h-8 -bottom-4 -right-4 animation-delay-300 animate-morph" />
        </span>
      )}
      
      {loading && (
        <svg 
          className="animate-spin h-4 w-4 mr-2" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="flex-shrink-0">{icon}</span>
      )}

      {variant === 'dental-outline' && (
        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-teal-300 to-teal-500" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        title={title}
        id={id}
        tabIndex={tabIndex}
      >
        <ButtonContent />
      </a>
    );
  }

  if (animate) {
    return (
      <motion.button
        whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        type={type}
        className={buttonClasses}
        onClick={handleClick}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        name={name}
        id={id}
        form={form}
        tabIndex={tabIndex}
        value={value}
        title={title}
        aria-label={ariaLabel}
      >
        <ButtonContent />
      </motion.button>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      name={name}
      id={id}
      form={form}
      tabIndex={tabIndex}
      value={value}
      title={title}
      aria-label={ariaLabel}
    >
      <ButtonContent />
    </button>
  );
} 