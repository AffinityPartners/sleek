'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Mail, MapPin, Phone, ChevronUp, Send } from 'lucide-react';

type FooterLinkItem = {
  name: string;
  href: string;
  external?: boolean;
};

type SocialLinkItem = {
  name: string;
  icon: React.FC<{ className?: string }>;
  href: string;
};

const footerNavigation = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Our Mission', href: '/mission' },
    { name: 'Press', href: '/press' },
  ],
  pages: [
    { name: 'Home', href: '/' },
    { name: 'Plans', href: '#plans' },
    { name: 'Technology', href: '#technology' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Blog', href: '/blog' }
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Help Center', href: '/help' },
    { name: 'Returns Policy', href: '/returns' },
    { name: 'Shipping Information', href: '/shipping' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  social: [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
  ],
  contact: [
    { name: 'hello@sleektoothbrush.com', icon: Mail, href: 'mailto:hello@sleektoothbrush.com' },
    { name: '1-800-SLEEK-SMILE', icon: Phone, href: 'tel:18007533575' },
    { name: 'San Francisco, CA', icon: MapPin, href: '#' },
  ],
};

const FooterLinkGroup = ({ title, links }: { title: string; links: FooterLinkItem[] }) => (
  <div className="flex flex-col">
    <h3 className="text-lg font-semibold mb-5 text-white">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link 
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="text-sm text-gray-400 hover:text-[#1ab9a3] transition-colors duration-200"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLink = ({ item }: { item: SocialLinkItem }) => (
  <motion.a 
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Follow us on ${item.name}`}
    className="p-3 bg-gray-800 rounded-full hover:bg-[#1ab9a3]/20 hover:text-[#1ab9a3] transition-all duration-300"
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <item.icon className="w-5 h-5" />
  </motion.a>
);

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 p-4 rounded-full bg-[#1ab9a3] text-white shadow-xl z-50 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would connect to a newsletter service
    console.log(`Subscribed with email: ${email}`);
    setSubmitted(true);
    
    // Reset form state after 3 seconds
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <ScrollToTopButton />
      <footer id="contact" className="bg-gray-900 text-gray-100">
        {/* Top gradient accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1ab9a3] via-[#dbe7ed] to-gray-900"></div>
        
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-x-12 lg:gap-y-16">
            {/* Brand column */}
            <div className="col-span-full lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/blog/logo/sleek-black.svg"
                  alt="SLEEK"
                  width={140}
                  height={40}
                  className="h-10 w-auto invert"
                />
              </Link>
              <p className="text-gray-400 text-sm mb-8 max-w-md leading-relaxed">
                Transform your dental routine with cutting-edge technology. SLEEK delivers premium electric toothbrushes and quarterly replacement heads right to your door. Experience the perfect blend of design and performance.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {footerNavigation.social.map((item) => (
                  <SocialLink key={item.name} item={item} />
                ))}
              </div>
              <div className="space-y-3 text-sm text-gray-400">
                {footerNavigation.contact.map((item) => (
                  <div key={item.name} className="flex items-center group">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3 group-hover:bg-[#1ab9a3]/20 transition-colors duration-300">
                      <item.icon className="w-4 h-4 text-[#1ab9a3]" />
                    </div>
                    <a href={item.href} className="hover:text-[#1ab9a3] transition-colors duration-200">
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation columns with improved spacing */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:ml-auto">
              <FooterLinkGroup title="Company" links={footerNavigation.company} />
            </div>
            
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <FooterLinkGroup title="Navigation" links={footerNavigation.pages} />
            </div>
            
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <FooterLinkGroup title="Support" links={footerNavigation.support} />
            </div>
            
            {/* Newsletter column */}
            <div className="col-span-full md:col-span-4 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-5 text-white">Stay in the loop</h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Get exclusive offers, oral health tips, and product updates delivered to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full pl-4 pr-12 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1ab9a3] focus:border-transparent transition-all duration-300"
                      aria-label="Email address"
                    />
                    <button
                      type="submit"
                      disabled={submitted}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1ab9a3] hover:text-[#15a592] transition-colors p-1.5 rounded-md disabled:opacity-70"
                    >
                      {submitted ? 
                        <Send className="w-5 h-5 animate-pulse" /> :
                        <ArrowRight className="w-5 h-5" />
                      }
                    </button>
                  </div>
                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[#1ab9a3] text-sm py-1"
                      >
                        Thanks for subscribing!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
              <p className="text-gray-500 text-xs">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from SLEEK.
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom bar with copyright and links */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                © {currentYear} SLEEK. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#1ab9a3] transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-[#1ab9a3] transition-colors">
                  Terms
                </Link>
                <Link href="/sitemap.xml" className="text-sm text-gray-500 hover:text-[#1ab9a3] transition-colors">
                  Sitemap
                </Link>
                <Link href="/accessibility" className="text-sm text-gray-500 hover:text-[#1ab9a3] transition-colors">
                  Accessibility
                </Link>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-600 text-center md:text-left">
              <p>
                SLEEK is not a dental insurance provider. Product availability varies by region. Please read our terms for details.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 