'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useTransform, useScroll, useMotionValueEvent, AnimatePresence, useReducedMotion, useMotionTemplate } from 'framer-motion';
import { Disclosure } from '@headlessui/react';

/**
 * Props for the MobileMenu component.
 * Extracted to its own component to properly handle useEffect for body scroll lock.
 */
interface MobileMenuProps {
  navItems: Array<{ id: string; label: string }>;
  activeSection: string;
  isHomePage: boolean;
  useScrolledStyling: boolean;
}

/**
 * MobileMenu component handles the mobile navigation with proper React patterns.
 * Features a premium full-screen overlay design with:
 * - Morphing hamburger icon animation
 * - Staggered menu item entrance animations
 * - Solid background with brand gradient accent
 * - iOS safe area support
 * - Body scroll lock when open
 */
function MobileMenu({ navItems, activeSection, isHomePage, useScrolledStyling }: MobileMenuProps) {
  return (
    <Disclosure as="div" className="lg:hidden">
      {({ open }) => (
        <MobileMenuContent
          open={open}
          navItems={navItems}
          activeSection={activeSection}
          isHomePage={isHomePage}
          useScrolledStyling={useScrolledStyling}
        />
      )}
    </Disclosure>
  );
}

/**
 * MobileMenuContent is a separate component to properly use useEffect for body scroll lock.
 * This premium implementation features:
 * - Fixed full-screen overlay (no positioning gaps)
 * - Morphing hamburger-to-X animation with three animated spans
 * - Staggered Framer Motion entrance for menu items
 * - Brand gradient accent line at top
 * - Proper visual hierarchy with separators and active states
 * - iOS safe area padding for notched devices
 */
function MobileMenuContent({ 
  open, 
  navItems, 
  activeSection, 
  isHomePage, 
  useScrolledStyling 
}: MobileMenuProps & { open: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  
  // Track if component is mounted (needed for portal SSR safety)
  useEffect(() => {
    setMounted(true);
  }, []);
  
  /**
   * Body scroll lock effect when menu is open.
   * Prevents background content from scrolling while the menu is displayed.
   * Cleanup ensures scroll is restored when component unmounts.
   */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Hamburger/Close button with morphing animation */}
      <Disclosure.Button 
        className={`relative flex flex-col items-center justify-center w-11 h-11 rounded-xl cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 focus-visible:ring-offset-2 transition-colors duration-300 ${
          useScrolledStyling 
            ? 'text-gray-700 hover:text-teal-600 hover:bg-gray-100/50' 
            : 'text-white hover:text-teal-300 hover:bg-white/10'
        }`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        {/* Animated hamburger lines that morph into an X */}
        <span className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
          <span 
            className={`block h-0.5 w-6 rounded-full bg-current transform transition-all duration-300 ease-out ${
              open ? 'rotate-45 translate-y-2' : ''
            }`}
            aria-hidden="true"
          />
          <span 
            className={`block h-0.5 w-6 rounded-full bg-current transition-all duration-200 ease-out ${
              open ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
            }`}
            aria-hidden="true"
          />
          <span 
            className={`block h-0.5 w-6 rounded-full bg-current transform transition-all duration-300 ease-out ${
              open ? '-rotate-45 -translate-y-2' : ''
            }`}
            aria-hidden="true"
          />
        </span>
      </Disclosure.Button>
      
      {/* Mobile menu panel - renders via portal when open to escape header stacking context */}
      {open && mounted && createPortal(
        <>
          {/* Full-screen backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-[9998]"
            aria-hidden="true"
          />
          
          {/* Full-screen menu panel */}
          <div className="fixed inset-x-0 top-[72px] bottom-0 bg-white z-[9999] overflow-y-auto">
              {/* Brand gradient accent line at the top */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: 'linear-gradient(90deg, #5eead4 0%, #14b8a6 35%, #0f766e 70%, #115e59 100%)'
                }}
                aria-hidden="true"
              />
              
              {/* Menu content container with safe area padding */}
              <div 
                className="flex flex-col min-h-full px-6 pt-8 pb-safe"
                style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
              >
                {/* Navigation items with staggered animation */}
                <nav className="flex-1 space-y-1" role="navigation" aria-label="Mobile navigation">
                  {navItems.map((item, index) => {
                    // Blog links to its own page, not an anchor
                    const isBlogItem = item.id === 'blog';
                    const href = isBlogItem 
                      ? '/blog' 
                      : isHomePage ? `#${item.id}` : `/#${item.id}`;
                    
                    return (
                    <motion.div
                      key={item.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Disclosure.Button
                        as={Link}
                        href={href}
                        scroll={false}
                        onClick={(e: React.MouseEvent) => {
                          // Blog item navigates to /blog page, no special handling needed
                          if (isBlogItem) return;
                          
                          // If on homepage, use smooth scroll for anchor navigation
                          if (isHomePage) {
                            e.preventDefault();
                            const element = document.getElementById(item.id);
                            if (element) {
                              element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                            }
                          }
                        }}
                        className={`group flex items-center w-full px-4 py-4 min-h-[56px] rounded-2xl text-lg font-semibold tracking-wide transition-all duration-200 ${
                          activeSection === item.id
                            ? 'text-teal-700 bg-gradient-to-r from-teal-50 to-teal-100/50 border-l-4 border-teal-500 pl-3'
                            : 'text-gray-800 hover:text-teal-600 hover:bg-gray-50 border-l-4 border-transparent'
                        }`}
                      >
                        {item.label}
                        {/* Arrow indicator for active item */}
                        {activeSection === item.id && (
                          <motion.span 
                            className="ml-auto text-teal-500"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.span>
                        )}
                      </Disclosure.Button>
                      
                      {/* Separator line between items (except last) */}
                      {index < navItems.length - 1 && (
                        <div className="mx-4 mt-1 border-b border-gray-100" aria-hidden="true" />
                      )}
                    </motion.div>
                  );
                  })}
                </nav>
                
                {/* CTA Button section with premium styling */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Disclosure.Button
                    as={Link}
                    href={isHomePage ? '#plans' : '/#plans'}
                    scroll={false}
                    onClick={(e: React.MouseEvent) => {
                      if (isHomePage) {
                        e.preventDefault();
                        const element = document.getElementById('plans');
                        if (element) {
                          element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                        }
                      }
                    }}
                    className="group relative block w-full text-center py-4 min-h-[56px] rounded-2xl text-white font-bold text-lg tracking-wide overflow-hidden shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 50%, #115e59 100%)',
                    }}
                  >
                    {/* Shimmer effect overlay */}
                    <span 
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                      }}
                      aria-hidden="true"
                    />
                    <span className="relative">GET STARTED</span>
                  </Disclosure.Button>
                  
                  {/* Secondary info text */}
                  <p className="mt-4 text-center text-sm text-gray-500">
                    Join thousands of members with healthier smiles
                  </p>
                </div>
              </div>
            </div>
          </>,
        document.body
        )}
    </>
  );
}

/**
 * Props for StickyNav component.
 * Allows customization of visual behavior based on hero background.
 */
interface StickyNavProps {
  /** 
   * When true, the nav starts with light-background styling (dark text/logo)
   * instead of dark-background styling (white text/logo).
   * Use this when placing the nav over a light-colored hero section.
   * Defaults to false for backward compatibility with dark heroes.
   */
  lightHero?: boolean;
}

/**
 * StickyNav component provides a fixed navigation header with scroll-based
 * visual effects and active section tracking. The navigation starts transparent
 * over the dark hero and transitions to a white glassmorphism style on scroll.
 * 
 * Key features:
 * - Transparent on dark hero, white on scroll (or light mode for light heroes)
 * - Logo swaps from white to black based on scroll state
 * - Text color transitions from white to dark
 * - Active section tracking
 * - Cross-page anchor navigation (redirects to homepage when not on homepage)
 */
export default function StickyNav({ lightHero = false }: StickyNavProps) {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const headerRef = useRef(null);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  
  // Check if we're on the homepage
  const isHomePage = pathname === '/';
  
  // Navigation items configuration
  const navItems = [
    { id: 'plans', label: 'PLANS' },
    { id: 'technology', label: 'TECHNOLOGY' },
    { id: 'benefits', label: 'BENEFITS' },
    { id: 'faq', label: 'FAQ' },
    { id: 'blog', label: 'BLOG' },
  ];

  // Logo scale animation based on scroll
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  
  // Background effects based on scroll - starts transparent for dark hero
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.98]);
  const blurStrength = useTransform(scrollY, [0, 100], [0, 16]);
  const shadowOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);
  
  // Create reactive CSS values using useMotionTemplate for dynamic string interpolation
  const backgroundColor = useMotionTemplate`rgba(255, 255, 255, ${bgOpacity})`;
  const backdropFilter = useMotionTemplate`blur(${blurStrength}px)`;
  const boxShadow = useMotionTemplate`0 4px 30px rgba(0, 0, 0, ${shadowOpacity})`;
  const borderBottom = useMotionTemplate`1px solid rgba(0, 0, 0, ${borderOpacity})`;

  // Track scroll for logo and text color changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });
  
  // Determine if we should use "scrolled" styling for text/logo colors
  // When lightHero is true, always use scrolled (dark) styling
  const useScrolledStyling = lightHero || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state for styling changes
      setScrolled(window.scrollY > 50);
      
      // Find the current active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(section => section.element);
      
      if (sections.length > 0) {
        // Determine which section is currently most visible
        const currentSection = sections.reduce((closest, section) => {
          const rect = section.element?.getBoundingClientRect();
          if (!rect) return closest;
          
          // Section is considered in view if its top is within 200px of viewport top
          const isInView = rect.top <= 200 && rect.bottom >= 200;
          
          if (isInView && (!closest.element || rect.top > closest.element.getBoundingClientRect().top)) {
            return section;
          }
          return closest;
        }, { id: '', element: null });
        
        if (currentSection.id) {
          setActiveSection(currentSection.id);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);
  
  return (
    <motion.header 
      ref={headerRef}
      style={{
        backgroundColor,
        backdropFilter,
        boxShadow,
        borderBottom,
      }}
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-standard py-4">
        <div className="flex items-center justify-between">
          {/* Logo with scale animation - swaps between white and black based on scroll */}
          <Link href="/" className="flex flex-col relative z-10">
            <motion.div 
              style={{ scale: prefersReducedMotion ? 1 : logoScale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative"
            >
              {/* White logo for dark hero (shown when not scrolled and not lightHero) */}
              <Image 
                src="/images/hero/SLEEK-logo-white.png" 
                alt="SLEEK" 
                width={120}
                height={32}
                className={`h-8 w-auto transition-opacity duration-300 ${useScrolledStyling ? 'opacity-0' : 'opacity-100'}`}
                style={{ width: 'auto' }}
                priority
              />
              {/* Black logo for scrolled state or light hero (overlaid) */}
              <Image 
                src="/images/blog/logo/sleek-black.svg" 
                alt="SLEEK" 
                width={120}
                height={32}
                className={`h-8 w-auto absolute inset-0 transition-opacity duration-300 ${useScrolledStyling ? 'opacity-100' : 'opacity-0'}`}
                style={{ width: 'auto' }}
                priority
              />
            </motion.div>
            {/* Brand tagline - transitions color with scroll state or uses dark text on light hero */}
            <span 
              className={`text-[10px] font-medium tracking-wide mt-0.5 transition-colors duration-300 ${
                useScrolledStyling ? 'text-gray-500' : 'text-white/70'
              }`}
            >
              A Dental Experience Worth Smiling About
            </span>
          </Link>
          
          {/* Desktop navigation with 44px minimum touch targets */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              // Blog links to its own page, not an anchor
              const isBlogItem = item.id === 'blog';
              const href = isBlogItem 
                ? '/blog' 
                : isHomePage ? `#${item.id}` : `/#${item.id}`;
              
              return (
              <Link
                key={item.id}
                href={href}
                scroll={false}
                onClick={(e) => {
                  // Blog item navigates to /blog page, no special handling needed
                  if (isBlogItem) return;
                  
                  // If on homepage, use smooth scroll instead of instant jump
                  if (isHomePage) {
                    e.preventDefault();
                    const element = document.getElementById(item.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                  // If not on homepage, Link will navigate to /#section
                }}
              >
                <motion.span
                  className={`relative px-4 py-3 min-h-[44px] flex items-center text-sm font-medium tracking-wide transition-colors duration-300 rounded-lg ${
                    useScrolledStyling
                      ? activeSection === item.id
                        ? 'text-teal-700'
                        : 'text-gray-700 hover:text-teal-600'
                      : activeSection === item.id
                        ? 'text-teal-300'
                        : 'text-white/90 hover:text-white'
                  }`}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {item.label}
                  {/* Active indicator with animated underline */}
                  {activeSection === item.id && (
                    <motion.div 
                      className="absolute bottom-1 left-2 right-2 h-0.5 rounded-full"
                      layoutId="activeNavIndicator"
                      style={{
                        background: useScrolledStyling 
                          ? 'linear-gradient(90deg, #14b8a6 0%, #0f766e 100%)'
                          : 'linear-gradient(90deg, #5eead4 0%, #14b8a6 100%)'
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.span>
              </Link>
            );
            })}
          </nav>
          
          {/* CTA Button with proper touch target */}
          <div className="hidden lg:flex items-center">
            <Link
              href={isHomePage ? '#plans' : '/#plans'}
              scroll={false}
              onClick={(e) => {
                // If on homepage, use smooth scroll
                if (isHomePage) {
                  e.preventDefault();
                  const element = document.getElementById('plans');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              <motion.span
                className="relative overflow-hidden text-sm font-semibold px-6 py-3 min-h-[44px] flex items-center rounded-full text-white"
                style={{
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                }}
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.03,
                  boxShadow: '0 8px 25px rgba(15, 118, 110, 0.35)' 
                }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Shimmer effect on hover */}
                <span 
                  className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                  }}
                />
                <span className="relative">GET STARTED</span>
              </motion.span>
            </Link>
          </div>
          
          {/* Mobile menu with backdrop overlay and improved animations */}
          <MobileMenu 
            navItems={navItems}
            activeSection={activeSection}
            isHomePage={isHomePage}
            useScrolledStyling={useScrolledStyling}
          />
        </div>
      </div>
    </motion.header>
  );
}
