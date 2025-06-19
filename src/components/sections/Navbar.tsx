import React, { useState, useEffect } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/#plans', label: 'Plans' },
  { href: '/#technology', label: 'Technology' },
  { href: '/#faq', label: 'FAQ' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href) || pathname === href;
  };

  return (
    <Disclosure as={motion.nav}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full"
    >
      {({ open: disclosureOpen }) => (
        <>
          <motion.div 
            className={`absolute inset-0 w-full transition-all duration-500 ease-in-out ${
              isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
            }`}
            animate={{
              backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0)',
              boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : '0 0 0 rgba(0, 0, 0, 0)'
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Desktop Menu */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/" className={`text-3xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  SLEEK
                </Link>
              </motion.div>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                <div className="flex items-baseline space-x-1 lg:space-x-2">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href}
                      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                        isScrolled
                          ? 'text-gray-700 hover:text-[#1ab9a3]'
                          : 'text-gray-100 hover:text-white'
                      } ${isActive(link.href) ? 'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-[#1ab9a3]' : ''}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="ml-6"
                >
                  <Link 
                    href="/start-trial"
                    className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-[#1ab9a3] hover:bg-[#15a592] shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    Start Your Trial
                  </Link>
                </motion.div>
              </div>

              {/* Mobile menu button */}
              <div className="flex md:hidden">
                <Disclosure.Button className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' : 'text-gray-100 hover:text-white hover:bg-white/10'
                } focus:outline-none`}>
                  <span className="sr-only">Open main menu</span>
                  {disclosureOpen ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <AnimatePresence>
            {disclosureOpen && (
              <Disclosure.Panel static className="md:hidden">
                {({ close }) => (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`px-4 pt-2 pb-4 space-y-2 ${
                      isScrolled ? 'bg-white' : 'bg-black/90 backdrop-blur-lg'
                    }`}
                  >
                    {navLinks.map((link) => (
                      <motion.div
                        key={link.label}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link 
                          href={link.href}
                          onClick={() => setTimeout(() => close(), 150)}
                          className={`block px-3 py-3 rounded-md text-base font-medium transition-colors duration-300 ${
                            isScrolled
                              ? 'text-gray-700 hover:text-[#1ab9a3]'
                              : 'text-gray-100 hover:text-white'
                          } ${isActive(link.href) ? 'border-l-2 border-[#1ab9a3] pl-2' : ''}`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="pt-2"
                    >
                      <Link 
                        href="/start-trial"
                        onClick={() => setTimeout(() => close(), 150)}
                        className="block w-full px-4 py-3 text-center text-base font-medium rounded-md text-white bg-[#1ab9a3] hover:bg-[#15a592] shadow-sm transition-all duration-300"
                      >
                        Start Your Trial
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </Disclosure.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar; 