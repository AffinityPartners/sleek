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
        sans: ['var(--font-lato)', 'sans-serif', ...fontFamily.sans],
        heading: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Colors extracted from the screenshots
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042f2e',
        },
        sleek: {
          'dark-blue': '#070708', // #070708 - Dark header
          'blue': '#1b2223', // #1b2223 - Dark panels  
          'gray': '#cfe0dd', // #cfe0dd - Light gray panels
          'teal': '#1ab9a3', // #1ab9a3 - Teal accents
          'dark-teal': '#07675e', // #07675e - Dark teal accents
          'light-teal': '#d1f7ed', // #d1f7ed - Light teal
        },
      },
      spacing: {
        '0.5': '0.125rem', // 2px
        '1': '0.25rem',   // 4px
        '1.5': '0.375rem', // 6px
        '2': '0.5rem',    // 8px
        '2.5': '0.625rem', // 10px
        '3': '0.75rem',   // 12px
        '3.5': '0.875rem', // 14px
        '4': '1rem',      // 16px
        '4.5': '1.125rem', // 18px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '7': '1.75rem',   // 28px
        '8': '2rem',      // 32px
        '9': '2.25rem',   // 36px
        '10': '2.5rem',   // 40px
        '11': '2.75rem',  // 44px
        '12': '3rem',     // 48px
        '13': '3.25rem',  // 52px
        '14': '3.5rem',   // 56px
        '16': '4rem',     // 64px
        '18': '4.5rem',   // 72px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
        '28': '7rem',     // 112px
        '32': '8rem',     // 128px
        '36': '9rem',     // 144px
        '40': '10rem',    // 160px
        '44': '11rem',    // 176px
        '48': '12rem',    // 192px
        '52': '13rem',    // 208px
        '56': '14rem',    // 224px
        '60': '15rem',    // 240px
        '64': '16rem',    // 256px
        '68': '17rem',    // 272px
        '72': '18rem',    // 288px
        '80': '20rem',    // 320px
        '96': '24rem',    // 384px
        '100': '25rem',   // 400px
        '120': '30rem',   // 480px
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem', // 2px
        'DEFAULT': '0.25rem', // 4px
        'md': '0.375rem', // 6px
        'lg': '0.5rem',   // 8px
        'xl': '0.75rem',  // 12px
        '2xl': '1rem',    // 16px
        '3xl': '1.5rem',  // 24px
        '4xl': '2rem',    // 32px
        '5xl': '2.5rem',  // 40px
        '6xl': '3rem',    // 48px
        '7xl': '3.5rem',  // 56px
        '8xl': '4rem',    // 64px
        'full': '9999px',
      },
      boxShadow: {
        // Standard elevations
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        // Custom shadows
        'soft': '0 4px 15px rgba(0, 0, 0, 0.06)',
        'elevation-1': '0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'elevation-2': '0 6px 16px rgba(0, 0, 0, 0.07), 0 3px 6px rgba(0, 0, 0, 0.05)',
        'elevation-3': '0 12px 28px rgba(0, 0, 0, 0.08), 0 6px 12px rgba(0, 0, 0, 0.06)',
        'ambient': '0 0 20px 0px rgba(20, 184, 166, 0.15)',
        'teal': '0 4px 14px 0 rgba(7, 103, 94, 0.3)',
        'futuristic': '0 8px 32px -4px rgba(0, 0, 0, 0.1), 0 4px 16px -8px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(26, 185, 163, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.06)',
        'glass-hover': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'glass-teal': '0 8px 32px rgba(7, 103, 94, 0.15)',
        'inset-light': 'inset 0 1px 1px rgba(255, 255, 255, 0.2)',
        'inset-bottom': 'inset 0 -1px 1px rgba(0, 0, 0, 0.04)',
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
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'morph': 'morph 10s ease-in-out infinite alternate',
        'subtle-bounce': 'subtleBounce 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'fade-in-up': 'fadeInUp 0.7s ease forwards',
        'fade-in-down': 'fadeInDown 0.7s ease forwards',
        'fade-in-left': 'fadeInLeft 0.7s ease forwards',
        'fade-in-right': 'fadeInRight 0.7s ease forwards',
        'scale-in': 'scaleIn 0.5s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
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
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1))',
        'glass-gradient-dark': 'linear-gradient(to right bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1))',
        'grid-pattern': 'url("/images/grid-pattern.svg")',
        'gradient-teal-soft': 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',
        'gradient-teal-subtle': 'linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, rgba(13, 148, 136, 0.03) 100%)',
        'gradient-teal-vibrant': 'linear-gradient(135deg, #2DD4BF 0%, #14B8A6 100%)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: 'var(--font-lato)',
            lineHeight: '1.4',
            color: theme('colors.gray.700'),
            maxWidth: '65ch',
            a: {
              color: theme('colors.teal.500'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.teal.600'),
              },
            },
            strong: {
              color: theme('colors.gray.900'),
            },
            h1: {
              color: theme('colors.gray.900'),
              fontFamily: theme('fontFamily.heading'),
              lineHeight: '1.2',
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.gray.900'),
              fontFamily: theme('fontFamily.heading'),
              lineHeight: '1.3',
              fontWeight: '700',
            },
            h3: {
              color: theme('colors.gray.900'),
              fontFamily: theme('fontFamily.heading'),
              lineHeight: '1.3',
            },
            h4: {
              color: theme('colors.gray.900'),
              fontFamily: theme('fontFamily.heading'),
              lineHeight: '1.4',
            },
            p: {
              marginTop: '0',
              marginBottom: '0.75rem',
            },
            code: {
              color: theme('colors.gray.900'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            blockquote: {
              borderLeftColor: theme('colors.teal.200'),
              backgroundColor: theme('colors.teal.50'),
              paddingLeft: '1rem',
              paddingRight: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              borderRadius: '0.25rem',
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