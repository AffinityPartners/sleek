import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'dental' | 'dental-outline' | 'glass' | 'glass-teal';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  shine?: boolean;
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
}: ButtonProps) {
  console.log('Button component rendering');
  
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700 focus-visible:ring-teal-500 shadow-sm hover:shadow',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-400 border border-gray-200',
    outline: 'border border-teal-500 bg-transparent text-teal-500 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-400',
    ghost: 'bg-transparent text-teal-500 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-400',
    dental: 'bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:from-teal-500 hover:to-teal-700 active:from-teal-600 active:to-teal-800 focus-visible:ring-teal-500 shadow-sm hover:shadow-md',
    'dental-outline': 'border-2 border-teal-400 bg-transparent text-teal-500 hover:bg-teal-50 active:bg-teal-100 focus-visible:ring-teal-400',
    'glass': 'backdrop-blur-md bg-white/20 border border-white/20 text-gray-800 hover:bg-white/30 shadow-glass hover:shadow-glass-hover focus-visible:ring-white/30',
    'glass-teal': 'backdrop-blur-md bg-teal-500/90 border border-teal-400/30 text-white shadow-glass-teal hover:shadow-glow hover:bg-teal-500 focus-visible:ring-teal-400/50',
  };
  
  const sizeClasses = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-7 py-3.5 text-xl',
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : 'cursor-pointer';
  
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const isGlassVariant = variant === 'glass' || variant === 'glass-teal';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClasses} ${className} relative overflow-hidden`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {(shine || isGlassVariant) && (
        <span className="absolute inset-0 z-10 overflow-hidden">
          <span className="absolute top-0 left-0 w-[30px] h-full bg-white opacity-20 transform -skew-x-20" />
        </span>
      )}
      
      {isGlassVariant && (
        <span className="absolute inset-0 opacity-20 overflow-hidden">
          <span className="absolute blur-gradient-shape w-12 h-10 -top-5 -left-5" />
          <span className="absolute blur-gradient-shape w-10 h-8 -bottom-4 -right-4" />
        </span>
      )}
      
      {icon && iconPosition === 'left' && (
        <span className="mr-2 -ml-1">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2 -mr-1">{icon}</span>
      )}

      {variant === 'dental-outline' && (
        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-teal-300 to-teal-500"></span>
      )}
    </button>
  );
} 