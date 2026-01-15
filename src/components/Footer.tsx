'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, Phone, ChevronUp, ChevronDown, Facebook } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';

/**
 * Type definitions for footer navigation links and social items.
 */
type FooterLinkItem = {
  name: string;
  href: string;
  external?: boolean;
  /** Anchor ID for smooth scroll (when on homepage) */
  anchorId?: string;
};

type ContactItem = {
  name: string;
  icon: React.FC<{ className?: string }>;
  href: string;
};

/**
 * Footer navigation data organized by category.
 * Programs section links to partner/marketing landing pages for different audiences.
 * Anchor links use full paths (/#section) for cross-page navigation.
 */
const footerNavigation = {
  pages: [
    { name: 'Home', href: '/' },
    { name: 'Plans', href: '/#plans', anchorId: 'plans' },
    { name: 'Technology', href: '/#technology', anchorId: 'technology' },
    { name: 'Benefits', href: '/#benefits', anchorId: 'benefits' },
    { name: 'FAQ', href: '/#faq', anchorId: 'faq' },
    { name: 'Blog', href: '/blog' }
  ],
  programs: [
    { name: 'For Dentists', href: '/market-programs/dentists' },
    { name: 'For Affiliates', href: '/market-programs/affiliates' },
    { name: 'For Groups', href: '/market-programs/groups' },
    { name: 'For Agents', href: '/market-programs/agents' },
  ],
  support: [
    { name: 'Shipping Information', href: '/shipping' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  contact: [
    { name: 'members@sleekdentalclub.com', icon: Mail, href: 'mailto:members@sleekdentalclub.com' },
    { name: '(888) 918-2386', icon: Phone, href: 'tel:18889182386' },
  ],
};

/**
 * FooterLinkGroup component renders a column of navigation links.
 * Each link has padding for 44px minimum touch targets on mobile.
 * Handles smooth scrolling for anchor links when already on homepage.
 */
const FooterLinkGroup = ({ title, links, isHomePage }: { title: string; links: FooterLinkItem[]; isHomePage: boolean }) => (
  <div className="flex flex-col">
    <h3 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">{title}</h3>
    <ul className="space-y-1">
      {links.map((link) => (
        <li key={link.name}>
          <Link 
            href={isHomePage && link.anchorId ? `#${link.anchorId}` : link.href}
            scroll={false}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              // If on homepage and this is an anchor link, use smooth scroll
              if (isHomePage && link.anchorId) {
                e.preventDefault();
                const element = document.getElementById(link.anchorId);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className="py-2 text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200 min-h-[44px] flex items-center"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

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
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl flex items-center justify-center text-white shadow-lg z-50"
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
 * contact info, latest blog post, and social links.
 * Handles cross-page anchor navigation for homepage sections.
 */
export default function Footer() {
  const [showFullDisclosure, setShowFullDisclosure] = useState(false);
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  
  // Check if we're on the homepage for smooth scroll behavior
  const isHomePage = pathname === '/';
  
  // Get the most recent blog post to display in the footer
  const latestPost = getAllPosts()[0];

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
        
        {/* Main footer content - uses section-padding-sm for consistency */}
        <div className="bg-gray-900 text-gray-100">
          <div className="container-standard py-16 md:py-20 lg:py-24">
            {/* Improved mobile layout: Brand + Nav sections, then Newsletter */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
              {/* Brand column - full width on mobile/tablet, 4 cols on desktop */}
              <div className="lg:col-span-4">
                <Link href="/" className="inline-block mb-6">
                  <Image
                    src="/images/blog/logo/sleek-black.svg"
                    alt="SLEEK"
                    width={120}
                    height={32}
                    className="h-8 w-auto brightness-0 invert"
                    style={{ width: 'auto' }}
                  />
                </Link>
                <p className="text-gray-400 text-sm mb-6 max-w-sm leading-relaxed">
                  Transform your dental routine with SLEEK Dental Club. Premium electric toothbrush kits, quarterly refills, and dental benefits delivered to your door.
                </p>
                
                {/* Social link */}
                <div className="mb-6">
                  <a 
                    href="https://www.facebook.com/sleekdentalclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Facebook"
                    className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:bg-teal-500/10 transition-all duration-300 border border-white/5 hover:border-teal-500/30"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
                
                {/* Contact info - horizontal on mobile, vertical on desktop */}
                <div className="flex flex-wrap gap-4 sm:gap-6 lg:flex-col lg:gap-3">
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
              
              {/* Navigation columns - 3 columns grid on mobile/tablet, inline on desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:contents gap-6 lg:col-span-6">
                <div className="lg:col-span-2">
                  <FooterLinkGroup title="Navigation" links={footerNavigation.pages} isHomePage={isHomePage} />
                </div>
                
                <div className="lg:col-span-2">
                  <FooterLinkGroup title="Programs" links={footerNavigation.programs} isHomePage={isHomePage} />
                </div>
                
                <div className="lg:col-span-2">
                  <FooterLinkGroup title="Support" links={footerNavigation.support} isHomePage={isHomePage} />
                </div>
              </div>
              
              {/* Latest Blog Post column - full width on mobile */}
              <div className="lg:col-span-2">
                <h3 className="text-sm font-semibold mb-5 text-white uppercase tracking-wider">
                  Latest from Our Blog
                </h3>
                {latestPost && (
                  <Link 
                    href={`/blog/${latestPost.slug}`}
                    className="group block"
                  >
                    {/* Post title */}
                    <h4 className="text-white font-medium text-sm mb-2 leading-snug group-hover:text-teal-400 transition-colors duration-200 line-clamp-2">
                      {latestPost.title}
                    </h4>
                    
                    {/* Post excerpt */}
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed line-clamp-3">
                      {latestPost.excerpt}
                    </p>
                    
                    {/* Meta info: date */}
                    <p className="text-xs text-gray-500 mb-3">
                      {latestPost.dateFormatted}
                    </p>
                    
                    {/* Read more link */}
                    <span className="inline-flex items-center gap-1.5 text-teal-500 text-sm font-medium group-hover:text-teal-400 transition-colors duration-200">
                      Read article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          {/* Legal Disclosures Section - Collapsible on mobile for better UX */}
          <div className="border-t border-gray-800">
            <div className="container-standard py-6 md:py-8">
              {/* Desktop: show all, Mobile: collapsible */}
              <div className="hidden md:block space-y-4 text-xs text-gray-500 leading-relaxed">
                {/* Value Added Benefits Note */}
                <p>
                  <sup>1</sup>Value added benefits included in all membership levels are not provided by or affiliated with Metropolitan Life Insurance Company.
                </p>
                
                {/* Savings Disclaimer */}
                <p>
                  *Per visit, in most instances, on services. Actual costs and savings vary by provider, service, and geographical area.
                </p>
                
                {/* MetLife Group Benefit Disclosure */}
                <p>
                  Like most group benefit programs, benefit programs offered by MetLife and its affiliates contain certain exclusions, exceptions, waiting periods, reductions of benefits, limitations and terms for keeping them in force. Please contact Affinity Partners at{' '}
                  <a href="tel:18447533532" className="text-teal-500 hover:text-teal-400 transition-colors">844-753-3532</a>
                  {' '}for complete details.
                </p>
                
                {/* MetLife Address and Copyright */}
                <p>
                  Metropolitan Life Insurance Company | 200 Park Avenue | New York, NY 10166 L0223029203[exp0225][All States][DC,GU,MP,PR,VI] © 2023 MSS
                </p>
                
                {/* Dental, Teledentist and Pharmacy Disclosure */}
                <p>
                  <strong className="text-gray-400">Dental, Teledentist and Pharmacy Disclosure:</strong> This plan is NOT insurance. This plan is not a qualified health plan under the Affordable Care Act (ACA). Some services may be covered by a qualified health plan under the ACA. This plan does not meet the minimum creditable coverage requirements under M.G.L. c. 111M and 956 CMR 5.00. This is not a Medicare prescription drug plan. Discounts on hospital services are not available in Maryland. The plan provides discounts at certain health care providers of medical services. The plan does not make payments directly to the providers of medical services. The plan member is obligated to pay for all health care services but will receive a discount from those health care providers who have contracted with the discount plan organization. The range of discounts will vary depending on the provider type and services provided. The licensed discount plan organization is Coverdell & Company, Inc., at 2850 W. Golf Road, Rolling Meadows, IL 60008,{' '}
                  <a href="tel:18888686199" className="text-teal-500 hover:text-teal-400 transition-colors">1-888-868-6199</a>. To view a list of participating providers visit{' '}
                  <a href="https://www.findbestbenefits.com" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-400 transition-colors">www.findbestbenefits.com</a>
                  {' '}and enter promo code 575313. You have the right to cancel this plan within 30 days of the effective date for a full refund of fees paid. Such refunds are issued within 30 days of cancellation.
                </p>
                
                {/* Chiropractic, Hearing, Vision, etc. Disclosure */}
                <p>
                  <strong className="text-gray-400">Chiropractic, Hearing, Vision, Nurseline, Vitamin, Online Wellness, Diabetic & Home Medical Supplies Disclosure:</strong> This plan is NOT insurance. This is not a qualified health plan under the Affordable Care Act (ACA). Some services may be covered by a qualified health plan under the ACA. The plan provides discounts at certain health care providers of medical services. The plan does not make payments directly to the providers of medical services. The plan member is obligated to pay for all health care services but will receive a discount from those health care providers who have contracted with the discount plan organization. The range of discounts for services will vary depending on the type of provider and services. The discount plan organization is Gallagher Affinity Insurance Services, Inc., at 2850 W. Golf Road, Rolling Meadows, IL 60008,{' '}
                  <a href="tel:18662151376" className="text-teal-500 hover:text-teal-400 transition-colors">1-866-215-1376</a>. To view a listing of participating providers visit{' '}
                  <a href="https://www.findbestbenefits.com" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-400 transition-colors">www.findbestbenefits.com</a>
                  {' '}and enter promo code 725336. The discount health benefits have been provided at no cost to you and will remain active until you cancel.
                </p>
                
                {/* Affinity Partners Copyright */}
                <p className="pt-2">
                  © Copyright 2025 Affinity Partners | Content, Pricing and Availability Subject to Change.
                </p>
              </div>
              
              {/* Mobile: collapsible disclosure */}
              <div className="md:hidden">
                <button
                  onClick={() => setShowFullDisclosure(!showFullDisclosure)}
                  className="flex items-center justify-between w-full py-2 text-sm text-gray-400 hover:text-gray-300 transition-colors min-h-[44px]"
                  aria-expanded={showFullDisclosure}
                >
                  <span className="font-medium">Legal Disclosures</span>
                  <motion.span
                    animate={{ rotate: showFullDisclosure ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {showFullDisclosure && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 text-xs text-gray-500 leading-relaxed pt-4">
                        {/* Value Added Benefits Note */}
                        <p>
                          <sup>1</sup>Value added benefits included in all membership levels are not provided by or affiliated with Metropolitan Life Insurance Company.
                        </p>
                        
                        {/* Savings Disclaimer */}
                        <p>
                          *Per visit, in most instances, on services. Actual costs and savings vary by provider, service, and geographical area.
                        </p>
                        
                        {/* MetLife Group Benefit Disclosure */}
                        <p>
                          Like most group benefit programs, benefit programs offered by MetLife and its affiliates contain certain exclusions, exceptions, waiting periods, reductions of benefits, limitations and terms for keeping them in force. Please contact Affinity Partners at{' '}
                          <a href="tel:18447533532" className="text-teal-500 hover:text-teal-400 transition-colors">844-753-3532</a>
                          {' '}for complete details.
                        </p>
                        
                        {/* MetLife Address and Copyright */}
                        <p>
                          Metropolitan Life Insurance Company | 200 Park Avenue | New York, NY 10166 L0223029203[exp0225][All States][DC,GU,MP,PR,VI] © 2023 MSS
                        </p>
                        
                        {/* Dental, Teledentist and Pharmacy Disclosure */}
                        <p>
                          <strong className="text-gray-400">Dental, Teledentist and Pharmacy Disclosure:</strong> This plan is NOT insurance. This plan is not a qualified health plan under the Affordable Care Act (ACA). Some services may be covered by a qualified health plan under the ACA. This plan does not meet the minimum creditable coverage requirements under M.G.L. c. 111M and 956 CMR 5.00. This is not a Medicare prescription drug plan. Discounts on hospital services are not available in Maryland. The plan provides discounts at certain health care providers of medical services. The plan does not make payments directly to the providers of medical services. The plan member is obligated to pay for all health care services but will receive a discount from those health care providers who have contracted with the discount plan organization. The range of discounts will vary depending on the provider type and services provided. The licensed discount plan organization is Coverdell & Company, Inc., at 2850 W. Golf Road, Rolling Meadows, IL 60008,{' '}
                          <a href="tel:18888686199" className="text-teal-500 hover:text-teal-400 transition-colors">1-888-868-6199</a>. To view a list of participating providers visit{' '}
                          <a href="https://www.findbestbenefits.com" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-400 transition-colors">www.findbestbenefits.com</a>
                          {' '}and enter promo code 575313. You have the right to cancel this plan within 30 days of the effective date for a full refund of fees paid. Such refunds are issued within 30 days of cancellation.
                        </p>
                        
                        {/* Chiropractic, Hearing, Vision, etc. Disclosure */}
                        <p>
                          <strong className="text-gray-400">Chiropractic, Hearing, Vision, Nurseline, Vitamin, Online Wellness, Diabetic & Home Medical Supplies Disclosure:</strong> This plan is NOT insurance. This is not a qualified health plan under the Affordable Care Act (ACA). Some services may be covered by a qualified health plan under the ACA. The plan provides discounts at certain health care providers of medical services. The plan does not make payments directly to the providers of medical services. The plan member is obligated to pay for all health care services but will receive a discount from those health care providers who have contracted with the discount plan organization. The range of discounts for services will vary depending on the type of provider and services. The discount plan organization is Gallagher Affinity Insurance Services, Inc., at 2850 W. Golf Road, Rolling Meadows, IL 60008,{' '}
                          <a href="tel:18662151376" className="text-teal-500 hover:text-teal-400 transition-colors">1-866-215-1376</a>. To view a listing of participating providers visit{' '}
                          <a href="https://www.findbestbenefits.com" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-400 transition-colors">www.findbestbenefits.com</a>
                          {' '}and enter promo code 725336. The discount health benefits have been provided at no cost to you and will remain active until you cancel.
                        </p>
                        
                        {/* Affinity Partners Copyright */}
                        <p className="pt-2">
                          © Copyright 2025 Affinity Partners | Content, Pricing and Availability Subject to Change.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom bar - links have touch target padding for mobile */}
          <div className="border-t border-gray-800">
            <div className="container-standard py-4 md:py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
                <p className="text-sm text-gray-500 py-2">
                  © {currentYear} SLEEK Dental Club. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:gap-6">
                  <Link href="/privacy" className="text-sm text-gray-500 hover:text-teal-400 transition-colors px-3 py-2 min-h-[44px] flex items-center">
                    Privacy
                  </Link>
                  <Link href="/terms" className="text-sm text-gray-500 hover:text-teal-400 transition-colors px-3 py-2 min-h-[44px] flex items-center">
                    Terms
                  </Link>
                  <Link href="/sitemap" className="text-sm text-gray-500 hover:text-teal-400 transition-colors px-3 py-2 min-h-[44px] flex items-center">
                    Sitemap
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
