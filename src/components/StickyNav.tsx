'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { Disclosure, Transition } from '@headlessui/react';

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const headerRef = useRef(null);
  const { scrollY } = useScroll();
  
  const navItems = [
    { id: 'plans', label: 'PLANS' },
    { id: 'technology', label: 'TECHNOLOGY' },
    { id: 'benefits', label: 'BENEFITS' },
    { id: 'faq', label: 'FAQ' },
    { id: 'blog', label: 'BLOG' },
    { id: 'contact', label: 'CONTACT' }
  ];

  // Enhanced logo scale animation based on scroll
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);
  
  // Background opacity transition based on scroll
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.95]);
  
  // Blur effect transition based on scroll
  const blurStrength = useTransform(scrollY, [0, 80], [0, 12]);
  
  // Shadow opacity transition based on scroll
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.15]);

  useEffect(() => {
    const handleScroll = () => {
      // Change background when scrolled down (threshold lowered for faster transition)
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Find the current active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(section => section.element);
      
      if (sections.length > 0) {
        // Get the section that is currently visible
        const currentSection = sections.reduce((closest, section) => {
          const rect = section.element?.getBoundingClientRect();
          if (!rect) return closest;
          
          // Check if the section is visible in the viewport
          const isInView = rect.top <= 150 && rect.bottom >= 150;
          
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
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);
  
  return (
    <motion.header 
      ref={headerRef}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${bgOpacity.get()})`,
        backdropFilter: `blur(${blurStrength.get()}px)`,
        boxShadow: `0 4px 20px rgba(0, 0, 0, ${shadowOpacity.get()})`,
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-standard py-4">
        <div className="flex items-center justify-between">
          {/* Logo with enhanced scaling animation */}
          <Link href="/" className="flex items-center relative z-10">
            <motion.div 
              style={{ scale: logoScale }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              <Image 
                src="/images/blog/logo/sleek-black.svg" 
                alt="SLEEK" 
                width={130}
                height={36}
                className="h-9 w-auto"
                priority
              />
            </motion.div>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-teal-600'
                    : scrolled ? 'text-gray-900 hover:text-teal-600' : 'text-gray-800 hover:text-teal-600'
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div 
                    className="h-0.5 bg-teal-600 mt-1 rounded-full"
                    layoutId="activeNavIndicator"
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
              className="btn-primary text-sm font-medium px-6 py-2.5 rounded-full"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(20, 184, 166, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              GET STARTED
            </motion.a>
          </div>
          
          {/* Mobile menu */}
          <Disclosure as="div" className="lg:hidden">
            {({ open }) => (
              <>
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-teal-600 focus:outline-none transition-colors duration-300">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                
                <AnimatePresence>
                  {open && (
                    <Disclosure.Panel
                      static
                      as={motion.div}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl border-t border-gray-100"
                    >
                      <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                          <Disclosure.Button
                            key={item.id}
                            as={motion.a}
                            href={`#${item.id}`}
                            className={`block px-4 py-3 rounded-lg text-base font-medium ${
                              activeSection === item.id
                                ? 'text-teal-600 bg-teal-50'
                                : 'text-gray-900 hover:text-teal-600 hover:bg-gray-50'
                            }`}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            {item.label}
                          </Disclosure.Button>
                        ))}
                        <div className="mt-4 mb-2 px-2">
                          <motion.a
                            href="#plans"
                            className="btn-primary block w-full text-center py-3 rounded-lg shadow-sm"
                            whileHover={{ scale: 1.02 }}
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