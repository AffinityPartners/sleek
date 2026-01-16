'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useTransform, useScroll, useMotionValueEvent, AnimatePresence, useReducedMotion, useMotionTemplate } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { Mail, Phone, ChevronRight, X } from 'lucide-react';

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
 * Partner programs navigation data for mobile menu.
 * These link to dedicated marketing pages for different audiences.
 */
const programsNav = [
  { name: 'For Dentists', href: '/market-programs/dentists' },
  { name: 'For Affiliates', href: '/market-programs/affiliates' },
  { name: 'For Groups', href: '/market-programs/groups' },
  { name: 'For Agents', href: '/market-programs/agents' },
];

/**
 * Support/legal links for mobile menu footer section.
 */
const supportNav = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Sitemap', href: '/sitemap' },
];

/**
 * Contact information displayed in mobile menu.
 */
const contactInfo = {
  email: 'members@sleekdentalclub.com',
  phone: '(888) 918-2386',
};

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
 * - Dark charcoal theme matching site aesthetic
 * - Clickable backdrop to close menu
 * - Slide-in animation from right
 * - Organized navigation sections (Main, Programs, Contact, Support)
 * - Morphing hamburger-to-X animation
 * - Staggered Framer Motion entrance for menu items
 * - Brand gradient accent line at top
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

  /**
   * Animation variants for the menu panel slide-in effect.
   * Uses translateX for smooth GPU-accelerated animation.
   */
  const menuPanelVariants = {
    closed: { 
      x: '100%',
      opacity: 0.8,
    },
    open: { 
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }
    },
    exit: {
      x: '100%',
      opacity: 0.8,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      }
    }
  };

  /**
   * Animation variants for backdrop fade effect.
   */
  const backdropVariants = {
    closed: { opacity: 0 },
    open: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15, delay: 0.1 }
    }
  };

  /**
   * Stagger container for menu items animation.
   */
  const staggerContainer = {
    open: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      }
    }
  };

  /**
   * Individual menu item animation variant.
   */
  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      }
    }
  };

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
      
      {/* Mobile menu panel - renders via portal to document.body to escape header stacking context.
          IMPORTANT: AnimatePresence must be INSIDE the portal, not wrapping it, because:
          1. Portal content renders outside React's tree at document.body
          2. AnimatePresence can only track direct motion component children
          3. Wrapping the portal breaks exit animations and initial render */}
      {mounted && createPortal(
        <AnimatePresence>
          {open && (
            <>
              {/* Clickable backdrop overlay - closes menu when clicked */}
              <Disclosure.Button
                as={motion.div}
                key="mobile-menu-backdrop"
                variants={backdropVariants}
                initial="closed"
                animate="open"
                exit="exit"
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] cursor-pointer"
                aria-label="Close menu"
              />
              
              {/* Slide-in menu panel with dark premium theme */}
              <motion.div 
                key="mobile-menu-panel"
                variants={prefersReducedMotion ? {} : menuPanelVariants}
                initial="closed"
                animate="open"
                exit="exit"
                className="fixed inset-y-0 right-0 w-full max-w-sm z-[9999] overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #0C1015 0%, #111518 50%, #161B1E 100%)',
                }}
              >
              {/* Brand gradient accent line at the top */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: 'linear-gradient(90deg, #5eead4 0%, #14b8a6 35%, #0f766e 70%, #115e59 100%)'
                }}
                aria-hidden="true"
              />
              
              {/* Close button in top right corner */}
              <Disclosure.Button
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 z-10"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </Disclosure.Button>
              
              {/* Menu content container with safe area padding */}
              <div 
                className="flex flex-col h-full px-6 pt-6 pb-safe overflow-y-auto"
                style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
              >
                {/* Logo section */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <Image
                    src="/images/hero/SLEEK-logo-white.png"
                    alt="SLEEK"
                    width={100}
                    height={28}
                    className="h-7 w-auto"
                    style={{ width: 'auto' }}
                  />
                  <p className="text-[10px] text-gray-500 mt-1 tracking-wide">
                    A Dental Experience Worth Smiling About
                  </p>
                </motion.div>
                
                {/* Main Navigation Section */}
                <motion.nav 
                  variants={staggerContainer}
                  initial="closed"
                  animate="open"
                  className="space-y-1 mb-6" 
                  role="navigation" 
                  aria-label="Mobile navigation"
                >
                  <p className="text-[10px] font-semibold text-teal-500/80 uppercase tracking-wider mb-3 px-1">
                    Navigate
                  </p>
                  {navItems.map((item) => {
                    // Blog links to its own page, not an anchor
                    const isBlogItem = item.id === 'blog';
                    const href = isBlogItem 
                      ? '/blog' 
                      : isHomePage ? `#${item.id}` : `/#${item.id}`;
                    
                    // scroll={false} when on homepage (we handle smooth scroll manually)
                    // scroll={true} when navigating cross-page to allow hash scroll
                    const shouldScroll = !isHomePage && !isBlogItem;
                    
                    return (
                      <motion.div
                        key={item.id}
                        variants={prefersReducedMotion ? {} : menuItemVariants}
                      >
                        <Disclosure.Button
                          as={Link}
                          href={href}
                          scroll={shouldScroll}
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
                          className={`group flex items-center w-full px-4 py-3.5 min-h-[52px] rounded-xl text-base font-medium tracking-wide transition-all duration-200 ${
                            activeSection === item.id
                              ? 'text-white bg-gradient-to-r from-teal-500/20 to-teal-600/10 border-l-2 border-teal-400'
                              : 'text-gray-300 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                          }`}
                        >
                          {item.label}
                          {/* Arrow indicator */}
                          <ChevronRight className={`ml-auto w-4 h-4 transition-all duration-200 ${
                            activeSection === item.id 
                              ? 'text-teal-400 translate-x-0 opacity-100' 
                              : 'text-gray-600 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50'
                          }`} />
                        </Disclosure.Button>
                      </motion.div>
                    );
                  })}
                </motion.nav>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
                
                {/* Partner Programs Section */}
                <motion.div
                  variants={staggerContainer}
                  initial="closed"
                  animate="open"
                  className="mb-6"
                >
                  <p className="text-[10px] font-semibold text-teal-500/80 uppercase tracking-wider mb-3 px-1">
                    Partner Programs
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {programsNav.map((item) => (
                      <motion.div
                        key={item.name}
                        variants={prefersReducedMotion ? {} : menuItemVariants}
                      >
                        <Disclosure.Button
                          as={Link}
                          href={item.href}
                          className="flex items-center justify-center px-3 py-2.5 min-h-[44px] rounded-lg text-sm font-medium text-gray-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 transition-all duration-200"
                        >
                          {item.name}
                        </Disclosure.Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Contact Section */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <p className="text-[10px] font-semibold text-teal-500/80 uppercase tracking-wider mb-3 px-1">
                    Contact Us
                  </p>
                  <div className="space-y-2">
                    <a 
                      href={`tel:${contactInfo.phone.replace(/[^0-9]/g, '')}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-teal-500/30 transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-teal-400" />
                      </div>
                      <span className="text-sm font-medium">{contactInfo.phone}</span>
                    </a>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-teal-500/30 transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-teal-400" />
                      </div>
                      <span className="text-sm font-medium truncate">{contactInfo.email}</span>
                    </a>
                  </div>
                </motion.div>
                
                {/* Spacer to push CTA and footer to bottom */}
                <div className="flex-1 min-h-4" />
                
                {/* CTA Button section with premium styling */}
                <motion.div 
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mb-6"
                >
                  <Disclosure.Button
                    as={Link}
                    href="https://enrollment.sleekdentalclub.com/onboarding"
                    className="group relative flex items-center justify-center w-full py-4 min-h-[56px] rounded-2xl text-white font-bold text-base tracking-wide overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 50%, #115e59 100%)',
                      boxShadow: '0 0 30px rgba(20, 184, 166, 0.25), 0 4px 15px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {/* Glow effect behind button */}
                    <span 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: '0 0 40px rgba(20, 184, 166, 0.4)',
                      }}
                      aria-hidden="true"
                    />
                    {/* Shimmer effect overlay */}
                    <span 
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                      }}
                      aria-hidden="true"
                    />
                    <span className="relative">GET STARTED</span>
                    <ChevronRight className="relative w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Disclosure.Button>
                  
                  {/* Secondary info text */}
                  <p className="mt-3 text-center text-xs text-gray-500">
                    Join thousands of members with healthier smiles
                  </p>
                </motion.div>
                
                {/* Footer Links */}
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 border-t border-white/5"
                >
                  <div className="flex items-center justify-center gap-4">
                    {supportNav.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        href={item.href}
                        className="text-xs text-gray-500 hover:text-teal-400 transition-colors duration-200 py-2"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </motion.div>
              </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
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
