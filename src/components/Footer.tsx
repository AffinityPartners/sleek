'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Mail, MapPin, Phone, ChevronUp, Send } from 'lucide-react';

/**
 * Type definitions for footer navigation links and social items.
 */
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

type ContactItem = {
  name: string;
  icon: React.FC<{ className?: string }>;
  href: string;
};

/**
 * Footer navigation data organized by category.
 */
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
    { name: 'members@sleekdentalclub.com', icon: Mail, href: 'mailto:members@sleekdentalclub.com' },
    { name: '(888) 918-2386', icon: Phone, href: 'tel:18889182386' },
    { name: 'Addison, TX 75001', icon: MapPin, href: '#' },
  ],
};

/**
 * FooterLinkGroup component renders a column of navigation links.
 */
const FooterLinkGroup = ({ title, links }: { title: string; links: FooterLinkItem[] }) => (
  <div className="flex flex-col">
    <h3 className="text-sm font-semibold mb-5 text-white uppercase tracking-wider">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link 
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * SocialLink component renders an individual social media icon link.
 */
const SocialLink = ({ item }: { item: SocialLinkItem }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.a 
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow us on ${item.name}`}
      className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-teal-400 transition-all duration-300"
      style={{
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.1, 
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        borderColor: 'rgba(20, 184, 166, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      <item.icon className="w-5 h-5" />
    </motion.a>
  );
};

/**
 * ScrollToTopButton component provides a floating button
 * to scroll back to the top of the page.
 */
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg z-50"
          style={{
            background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
            boxShadow: '0 4px 20px rgba(15, 118, 110, 0.4)'
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/**
 * Footer component renders the site footer with navigation,
 * contact info, newsletter signup, and social links.
 */
export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would connect to a newsletter service
    console.log(`Newsletter subscription: ${email}`);
    setSubmitted(true);
    
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <ScrollToTopButton />
      <footer id="contact" className="relative">
        {/* Gradient border at top */}
        <div 
          className="h-1 w-full"
          style={{
            background: 'linear-gradient(90deg, #14b8a6 0%, #0f766e 30%, #f59e0b 70%, #0f766e 100%)'
          }}
        />
        
        {/* Main footer content */}
        <div className="bg-gray-900 text-gray-100">
          <div className="container-standard py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
              {/* Brand column */}
              <div className="lg:col-span-4">
                <Link href="/" className="inline-block mb-6">
                  <Image
                    src="/images/blog/logo/sleek-black.svg"
                    alt="SLEEK"
                    width={120}
                    height={32}
                    className="h-8 w-auto brightness-0 invert"
                  />
                </Link>
                <p className="text-gray-400 text-sm mb-8 max-w-sm leading-relaxed">
                  Transform your dental routine with SLEEK Dental Club. Premium electric toothbrush kits, quarterly refills, and dental benefits delivered to your door.
                </p>
                
                {/* Social links */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {footerNavigation.social.map((item) => (
                    <SocialLink key={item.name} item={item} />
                  ))}
                </div>
                
                {/* Contact info */}
                <div className="space-y-3">
                  {footerNavigation.contact.map((item) => (
                    <div key={item.name} className="flex items-center group">
                      <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center mr-3 group-hover:bg-teal-500/10 transition-colors duration-300">
                        <item.icon className="w-4 h-4 text-teal-500" />
                      </div>
                      <a 
                        href={item.href} 
                        className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation columns */}
              <div className="lg:col-span-2">
                <FooterLinkGroup title="Company" links={footerNavigation.company} />
              </div>
              
              <div className="lg:col-span-2">
                <FooterLinkGroup title="Navigation" links={footerNavigation.pages} />
              </div>
              
              <div className="lg:col-span-2">
                <FooterLinkGroup title="Support" links={footerNavigation.support} />
              </div>
              
              {/* Newsletter column */}
              <div className="lg:col-span-2">
                <h3 className="text-sm font-semibold mb-5 text-white uppercase tracking-wider">
                  Stay Updated
                </h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                  Get exclusive offers, oral health tips, and product updates.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-all duration-300 text-sm"
                        aria-label="Email address"
                      />
                      <button
                        type="submit"
                        disabled={submitted}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-teal-500 hover:text-teal-400 transition-colors disabled:opacity-70"
                      >
                        {submitted ? 
                          <Send className="w-4 h-4" /> :
                          <ArrowRight className="w-4 h-4" />
                        }
                      </button>
                    </div>
                    <AnimatePresence>
                      {submitted && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-teal-400 text-sm"
                        >
                          Thanks for subscribing!
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
                <p className="text-gray-500 text-xs mt-4">
                  By subscribing, you agree to our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
          
          {/* Legal Disclosures Section */}
          <div className="border-t border-gray-800">
            <div className="container-standard py-8">
              <div className="space-y-4 text-xs text-gray-500 leading-relaxed">
                <p>
                  <strong className="text-gray-400">Insurance Disclosure:</strong> Dental insurance plans (PRO and MAX) are underwritten by Metropolitan Life Insurance Company, 200 Park Avenue, New York, NY 10166. Like most group benefit programs, benefit programs offered by MetLife and its affiliates contain certain exclusions, exceptions, waiting periods, reductions of benefits, limitations, and terms for keeping them in force. Value-added benefits included in all membership levels are not provided by or affiliated with Metropolitan Life Insurance Company.
                </p>
                <p>
                  <strong className="text-gray-400">Discount Plan Disclosure:</strong> The OCP plan discount benefits are NOT insurance. This plan is not a qualified health plan under the Affordable Care Act (ACA). This is not a Medicare prescription drug plan. The plan provides discounts at certain health care providers of medical services. The plan does not make payments directly to the providers of medical services. The plan member is obligated to pay for all health care services but will receive a discount from those health care providers who have contracted with the discount plan organization. The range of discounts will vary depending on the provider type and services provided.
                </p>
                <p>
                  The licensed discount plan organization is Coverdell & Company, Inc., at 2850 W. Golf Road, Rolling Meadows, IL 60008, 1-888-868-6199. You have the right to cancel this plan within 30 days of the effective date for a full refund of fees paid.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800">
            <div className="container-standard py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">
                  © {currentYear} SLEEK Dental Club. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Link href="/privacy" className="text-sm text-gray-500 hover:text-teal-400 transition-colors">
                    Privacy
                  </Link>
                  <Link href="/terms" className="text-sm text-gray-500 hover:text-teal-400 transition-colors">
                    Terms
                  </Link>
                  <Link href="/sitemap.xml" className="text-sm text-gray-500 hover:text-teal-400 transition-colors">
                    Sitemap
                  </Link>
                  <Link href="/accessibility" className="text-sm text-gray-500 hover:text-teal-400 transition-colors">
                    Accessibility
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
