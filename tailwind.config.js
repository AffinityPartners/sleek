/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Lato for all typography - clean, humanist sans-serif with excellent readability
        body: ['var(--font-lato)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-lato)', 'system-ui', 'sans-serif', ...fontFamily.sans],
        // Lato for headings - works beautifully at larger sizes with heavier weights
        heading: ['var(--font-lato)', 'system-ui', 'sans-serif'],
        display: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Enhanced teal color palette - deeper, more saturated for premium feel
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Amber accent palette - warm accent for premium feel and CTAs
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Brand colors with semantic naming
        brand: {
          primary: '#0f766e',
          'primary-light': '#14b8a6',
          'primary-dark': '#115e59',
          accent: '#f59e0b',
          'accent-light': '#fcd34d',
          'accent-dark': '#d97706',
        },
        // Legacy SLEEK colors for backward compatibility
        sleek: {
          'dark-blue': '#0c1015',
          'blue': '#1b2223',
          'gray': '#cfe0dd',
          'teal': '#14b8a6',
          'dark-teal': '#0f766e',
          'light-teal': '#ccfbf1',
        },
        // Surface colors for backgrounds
        surface: {
          DEFAULT: '#f8fafb',
          elevated: '#ffffff',
          muted: '#f1f5f9',
        },
      },
      spacing: {
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '4.5': '1.125rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem',
        '16': '4rem',
        '18': '4.5rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
        '60': '15rem',
        '64': '16rem',
        '68': '17rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        '100': '25rem',
        '120': '30rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
        '8xl': '4rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        // Premium shadow system
        'soft': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'elevation-1': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.03)',
        'elevation-2': '0 6px 20px rgba(0, 0, 0, 0.06), 0 3px 8px rgba(0, 0, 0, 0.04)',
        'elevation-3': '0 12px 36px rgba(0, 0, 0, 0.08), 0 6px 16px rgba(0, 0, 0, 0.05)',
        'elevation-4': '0 20px 50px rgba(0, 0, 0, 0.1), 0 10px 24px rgba(0, 0, 0, 0.06)',
        // Brand glow shadows
        'teal': '0 4px 14px rgba(15, 118, 110, 0.25)',
        'teal-lg': '0 8px 30px rgba(15, 118, 110, 0.35)',
        'teal-glow': '0 0 40px rgba(15, 118, 110, 0.3)',
        'teal-glow-intense': '0 0 60px rgba(15, 118, 110, 0.5)',
        'amber': '0 4px 14px rgba(245, 158, 11, 0.25)',
        'amber-glow': '0 0 40px rgba(245, 158, 11, 0.3)',
        // Glass effects
        'glass': '0 8px 32px rgba(0, 0, 0, 0.06)',
        'glass-hover': '0 12px 48px rgba(0, 0, 0, 0.1)',
        'glass-teal': '0 8px 32px rgba(15, 118, 110, 0.12)',
        // Card shadows
        'card': '0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)',
        'card-glow': '0 8px 32px rgba(0, 0, 0, 0.08), 0 0 40px rgba(15, 118, 110, 0.2)',
        // Inset effects
        'inset-light': 'inset 0 1px 1px rgba(255, 255, 255, 0.25)',
        'inset-bottom': 'inset 0 -1px 1px rgba(0, 0, 0, 0.04)',
        // Ambient glow
        'ambient': '0 0 60px rgba(15, 118, 110, 0.15)',
        'ambient-lg': '0 0 100px rgba(15, 118, 110, 0.2)',
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.2)',
        'DEFAULT': '0 2px 4px rgba(0, 0, 0, 0.2)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.12)',
        'lg': '0 8px 16px rgba(0, 0, 0, 0.15)',
        'xl': '0 12px 24px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 8px rgba(255, 255, 255, 0.5)',
        'teal-glow': '0 0 8px rgba(20, 184, 166, 0.5)',
      },
      lineHeight: {
        tight: '1.2',
        normal: '1.4',
        relaxed: '1.6',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.2' }],
        sm: ['0.875rem', { lineHeight: '1.2' }],
        base: ['1rem', { lineHeight: '1.4' }],
        lg: ['1.125rem', { lineHeight: '1.4' }],
        xl: ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        'fluid-h1': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1' }],
        'fluid-h2': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.2' }],
        'fluid-h3': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.3' }],
        'fluid-h4': ['clamp(1.25rem, 2vw, 1.875rem)', { lineHeight: '1.4' }],
        'fluid-body': ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.5' }],
        'fluid-body-lg': ['clamp(1rem, 1.25vw, 1.125rem)', { lineHeight: '1.6' }],
        'fluid-display': ['clamp(3.5rem, 8vw, 6rem)', { lineHeight: '1' }],
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '32px',
        '3xl': '48px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'morph': 'morph 10s ease-in-out infinite alternate',
        'subtle-bounce': 'subtleBounce 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'accordion-down': 'accordionDown 0.3s ease-out',
        'accordion-up': 'accordionUp 0.3s ease-out',
        // Premium animations
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'slide-up-fade': 'slideUpFade 0.5s ease-out forwards',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
        },
        subtleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        accordionDown: {
          from: { height: 0, opacity: 0 },
          to: { height: 'var(--radix-accordion-content-height)', opacity: 1 },
        },
        accordionUp: {
          from: { height: 'var(--radix-accordion-content-height)', opacity: 1 },
          to: { height: 0, opacity: 0 },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(15, 118, 110, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(15, 118, 110, 0.5)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
        'glass-gradient-dark': 'linear-gradient(135deg, rgba(12, 16, 21, 0.9) 0%, rgba(12, 16, 21, 0.7) 100%)',
        'grid-pattern': 'url("/images/grid-pattern.svg")',
        // Premium teal gradients
        'gradient-teal-soft': 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
        'gradient-teal-subtle': 'linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(15, 118, 110, 0.04) 100%)',
        'gradient-teal-vibrant': 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
        'gradient-teal-dark': 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
        // Premium amber gradients
        'gradient-amber-soft': 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
        'gradient-amber-vibrant': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        // Section backgrounds
        'gradient-section-light': 'linear-gradient(180deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 1) 100%)',
        'gradient-section-teal': 'linear-gradient(135deg, rgba(240, 253, 250, 0.7) 0%, rgba(255, 255, 255, 1) 100%)',
        'gradient-section-premium': 'linear-gradient(135deg, rgba(248, 250, 252, 1) 0%, rgba(240, 253, 250, 0.5) 50%, rgba(255, 255, 255, 1) 100%)',
        // Mesh gradients for backgrounds
        'gradient-mesh-teal': 'radial-gradient(at 40% 20%, rgba(20, 184, 166, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(15, 118, 110, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(94, 234, 212, 0.1) 0px, transparent 50%)',
        // Button gradients
        'gradient-btn-primary': 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
        'gradient-btn-accent': 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: 'var(--font-lato)',
            lineHeight: '1.6',
            color: theme('colors.gray.700'),
            maxWidth: '65ch',
            a: {
              color: theme('colors.teal.600'),
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: theme('colors.teal.700'),
              },
            },
            strong: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            h1: {
              color: theme('colors.gray.900'),
              fontFamily: 'var(--font-lato)',
              lineHeight: '1.1',
              fontWeight: '700',
              letterSpacing: '-0.02em',
            },
            h2: {
              color: theme('colors.gray.900'),
              fontFamily: 'var(--font-lato)',
              lineHeight: '1.2',
              fontWeight: '700',
              letterSpacing: '-0.01em',
            },
            h3: {
              color: theme('colors.gray.900'),
              fontFamily: 'var(--font-lato)',
              lineHeight: '1.3',
              fontWeight: '600',
            },
            h4: {
              color: theme('colors.gray.900'),
              fontFamily: 'var(--font-lato)',
              lineHeight: '1.4',
              fontWeight: '600',
            },
            p: {
              marginTop: '0',
              marginBottom: '1rem',
            },
            code: {
              color: theme('colors.gray.900'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            blockquote: {
              borderLeftColor: theme('colors.teal.400'),
              backgroundColor: theme('colors.teal.50'),
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
              borderRadius: '0.5rem',
              fontStyle: 'normal',
              color: theme('colors.gray.700'),
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:last-of-type::after': {
              content: 'none',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
    // Add text-shadow utilities
    function({ addUtilities, theme, variants }) {
      const textShadows = theme('textShadow', {});
      const textShadowUtilities = Object.entries(textShadows).reduce(
        (utilities, [key, value]) => {
          return {
            ...utilities,
            [`.text-shadow${key === 'DEFAULT' ? '' : `-${key}`}`]: {
              textShadow: value,
            },
          };
        },
        {}
      );
      addUtilities(textShadowUtilities, variants('textShadow', ['responsive', 'hover']));
    },
  ],
} 