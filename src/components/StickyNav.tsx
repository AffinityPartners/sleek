'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useTransform, useScroll, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';

/**
 * StickyNav component provides a fixed navigation header with scroll-based
 * visual effects and active section tracking. The navigation becomes more
 * prominent on scroll with enhanced glassmorphism effects.
 */
export default function StickyNav() {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const headerRef = useRef(null);
  const { scrollY } = useScroll();
  
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
  
  // Background effects based on scroll
  const bgOpacity = useTransform(scrollY, [0, 80], [0.6, 0.98]);
  const blurStrength = useTransform(scrollY, [0, 80], [8, 16]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.1]);

  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state for styling changes
      setScrolled(window.scrollY > 20);
      
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
        backgroundColor: `rgba(255, 255, 255, ${bgOpacity.get()})`,
        backdropFilter: `blur(${blurStrength.get()}px)`,
        boxShadow: `0 4px 30px rgba(0, 0, 0, ${shadowOpacity.get()})`,
        borderBottom: `1px solid rgba(0, 0, 0, ${borderOpacity.get()})`,
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-standard py-4">
        <div className="flex items-center justify-between">
          {/* Logo with scale animation */}
          <Link href="/" className="flex items-center relative z-10">
            <motion.div 
              style={{ scale: prefersReducedMotion ? 1 : logoScale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image 
                src="/images/blog/logo/sleek-black.svg" 
                alt="SLEEK" 
                width={120}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </motion.div>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 rounded-lg ${
                  activeSection === item.id
                    ? 'text-teal-700'
                    : 'text-gray-700 hover:text-teal-600'
                }`}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {item.label}
                {/* Active indicator with animated underline */}
                {activeSection === item.id && (
                  <motion.div 
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                    layoutId="activeNavIndicator"
                    style={{
                      background: 'linear-gradient(90deg, #14b8a6 0%, #0f766e 100%)'
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <motion.a
              href="#plans"
              className="relative overflow-hidden text-sm font-semibold px-6 py-2.5 rounded-full text-white"
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
            </motion.a>
          </div>
          
          {/* Mobile menu */}
          <Disclosure as="div" className="lg:hidden">
            {({ open }) => (
              <>
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-teal-600 hover:bg-gray-100/50 focus:outline-none transition-all duration-300">
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
                    <Disclosure.Panel
                      static
                      as={motion.div}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl shadow-elevation-3 border-t border-gray-100"
                    >
                      <div className="container-standard py-4 space-y-1">
                        {navItems.map((item, index) => (
                          <Disclosure.Button
                            key={item.id}
                            as={motion.a}
                            href={`#${item.id}`}
                            className={`block px-4 py-3 rounded-xl text-base font-medium ${
                              activeSection === item.id
                                ? 'text-teal-700 bg-teal-50'
                                : 'text-gray-800 hover:text-teal-600 hover:bg-gray-50'
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {item.label}
                          </Disclosure.Button>
                        ))}
                        <div className="pt-4 pb-2 px-2">
                          <motion.a
                            href="#plans"
                            className="block w-full text-center py-3.5 rounded-xl text-white font-semibold"
                            style={{
                              background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            GET STARTED
                          </motion.a>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  )}
                </AnimatePresence>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </motion.header>
  );
}
