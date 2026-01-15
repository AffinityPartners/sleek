'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  console.log('Header component rendering');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-glass' 
        : 'bg-white/60 backdrop-blur-sm'
    }`}>
      <div className="relative">
        {/* Decorative gradient line */}
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-300/30 to-transparent"></div>
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="relative group">
                <div>
                  <Image 
                    src="/images/blog/logo/sleek-black.svg" 
                    alt="SLEEK" 
                    width={150} 
                    height={39} 
                    className="h-12 w-auto"
                    style={{ width: 'auto' }}
                    priority
                  />
                </div>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-3 lg:space-x-5">
                <NavLink href="#">SLEEK Dental Club</NavLink>
                <NavLink href="#">Membership</NavLink>
                <NavLink href="#">Benefits</NavLink>
                <NavLink href="/blog">Blog</NavLink>
                <NavLink href="#">Contact</NavLink>
                
                <Button 
                  variant="glass-teal"
                  size="sm"
                  className="ml-2"
                >
                  Find the Perfect Plan
                </Button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100/50 hover:backdrop-blur-lg focus:outline-none transition-all duration-200"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-6">
                  <span 
                    className={`absolute inset-0 transform transition-all duration-200 ease-in-out ${
                      isMenuOpen 
                        ? 'rotate-45 translate-y-2.5' 
                        : ''
                    }`}
                  >
                    <span className="absolute h-0.5 w-6 bg-current rounded-sm"></span>
                  </span>
                  <span 
                    className={`absolute inset-0 transition-opacity duration-200 ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <span className="absolute h-0.5 w-6 bg-current rounded-sm translate-y-2"></span>
                  </span>
                  <span 
                    className={`absolute inset-0 transform transition-all duration-200 ease-in-out ${
                      isMenuOpen 
                        ? '-rotate-45 translate-y-2.5' 
                        : ''
                    }`}
                  >
                    <span className="absolute h-0.5 w-6 bg-current rounded-sm translate-y-4"></span>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden overflow-hidden bg-white/90 backdrop-blur-md">
          <div className="px-4 pt-2 pb-3 space-y-1 sm:px-6">
            <MobileNavLink href="#" onClick={() => setIsMenuOpen(false)}>SLEEK Dental Club</MobileNavLink>
            <MobileNavLink href="#" onClick={() => setIsMenuOpen(false)}>Membership</MobileNavLink>
            <MobileNavLink href="#" onClick={() => setIsMenuOpen(false)}>Benefits</MobileNavLink>
            <MobileNavLink href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</MobileNavLink>
            <MobileNavLink href="#" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Button 
                variant="glass-teal"
                size="md"
                fullWidth
                onClick={() => setIsMenuOpen(false)}
              >
                Find the Perfect Plan
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-gray-800 hover:text-teal-600 px-3 py-2 rounded-xl text-sm font-bold uppercase tracking-wide transition-colors duration-200 relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-300 ease-out"></span>
    </Link>
  );
}

function MobileNavLink({ 
  href, 
  children,
  onClick
}: { 
  href: string, 
  children: React.ReactNode,
  onClick?: () => void
}) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="block text-gray-800 hover:text-teal-600 hover:bg-gray-50/50 hover:backdrop-blur-sm px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-200"
    >
      {children}
    </Link>
  );
} 