'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useTransform, useScroll, useMotionValueEvent, AnimatePresence, useReducedMotion, useMotionTemplate } from 'framer-motion';
import { Disclosure } from '@headlessui/react';

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
            {navItems.map(item => (
              <Link
                key={item.id}
                href={isHomePage ? `#${item.id}` : `/#${item.id}`}
                scroll={false}
                onClick={(e) => {
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
            ))}
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
          <Disclosure as="div" className="lg:hidden">
            {({ open }) => {
              // Body scroll lock effect when menu is open
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
                  <Disclosure.Button className={`inline-flex items-center justify-center p-3 min-h-[44px] min-w-[44px] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 transition-all duration-300 relative z-50 ${
                    useScrolledStyling 
                      ? 'text-gray-700 hover:text-teal-600 hover:bg-gray-100/50' 
                      : 'text-white hover:text-teal-300 hover:bg-white/10'
                  }`}>
                    <span className="sr-only">Open main menu</span>
                    <motion.div
                      animate={{ rotate: open ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {open ? (
                        <X className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Menu className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </motion.div>
                  </Disclosure.Button>
                  
                  <AnimatePresence>
                    {open && (
                      <>
                        {/* Backdrop overlay for visual focus */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                          aria-hidden="true"
                        />
                        
                        {/* Menu panel */}
                        <Disclosure.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl shadow-elevation-3 border-t border-gray-100 z-50"
                        >
                          <div className="container-standard py-4 space-y-1">
                            {navItems.map((item, index) => (
                              <Disclosure.Button
                                key={item.id}
                                as={Link}
                                href={isHomePage ? `#${item.id}` : `/#${item.id}`}
                                scroll={false}
                                onClick={(e: React.MouseEvent) => {
                                  // If on homepage, use smooth scroll
                                  if (isHomePage) {
                                    e.preventDefault();
                                    const element = document.getElementById(item.id);
                                    if (element) {
                                      element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                  }
                                }}
                                className={`block px-4 py-3 min-h-[44px] rounded-xl text-base font-medium ${
                                  activeSection === item.id
                                    ? 'text-teal-700 bg-teal-50'
                                    : 'text-gray-800 hover:text-teal-600 hover:bg-gray-50'
                                }`}
                              >
                                <motion.span
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  {item.label}
                                </motion.span>
                              </Disclosure.Button>
                            ))}
                            <div className="pt-4 pb-2 px-2">
                              <Disclosure.Button
                                as={Link}
                                href={isHomePage ? '#plans' : '/#plans'}
                                scroll={false}
                                onClick={(e: React.MouseEvent) => {
                                  if (isHomePage) {
                                    e.preventDefault();
                                    const element = document.getElementById('plans');
                                    if (element) {
                                      element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                  }
                                }}
                                className="block w-full text-center py-3.5 min-h-[48px] rounded-xl text-white font-semibold"
                                style={{
                                  background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                                }}
                              >
                                <motion.span whileTap={{ scale: 0.98 }}>
                                  GET STARTED
                                </motion.span>
                              </Disclosure.Button>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              );
            }}
          </Disclosure>
        </div>
      </div>
    </motion.header>
  );
}
