'use client';

/**
 * PrivacyContent - Client component containing the Privacy Policy UI.
 *
 * This component contains all the interactive privacy policy functionality
 * while allowing the page.tsx to be a server component that can export
 * metadata for SEO. Handles scroll tracking, table of contents, and animations.
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  FileText,
  BookOpen,
  Shield,
  Lock,
  Cookie,
  Eye,
  Database,
  Users,
  Globe,
  Mail,
  Scale,
  Baby,
  RefreshCw,
  ExternalLink,
  Menu,
  MapPin,
} from 'lucide-react';

import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';

/**
 * Section configuration for the Privacy Policy page.
 * Each section has an id (for anchor linking), title, and icon.
 * Used to generate the table of contents and section headers.
 */
const SECTIONS = [
  { id: 'interpretation', title: 'Interpretation and Definitions', icon: BookOpen },
  { id: 'collecting-data', title: 'Collecting Your Data', icon: Database },
  { id: 'cookies', title: 'Tracking Technologies and Cookies', icon: Cookie },
  { id: 'using-data', title: 'Use of Your Personal Data', icon: Eye },
  { id: 'disclosure', title: 'Disclosure of Your Personal Data', icon: Users },
  { id: 'security', title: 'Security of Your Personal Data', icon: Lock },
  { id: 'third-party', title: 'Third-Party Service Providers', icon: Globe },
  { id: 'remarketing', title: 'Behavioral Remarketing', icon: Eye },
  { id: 'ccpa', title: 'CCPA Privacy (California)', icon: Scale },
  { id: 'do-not-track', title: 'Do Not Track Policy', icon: Shield },
  { id: 'children', title: "Children's Privacy", icon: Baby },
  { id: 'california', title: 'Additional California Rights', icon: Scale },
  { id: 'links', title: 'Links to Other Websites', icon: ExternalLink },
  { id: 'changes', title: 'Changes to This Policy', icon: RefreshCw },
  { id: 'contact', title: 'Contact Us', icon: Mail },
];

/**
 * TableOfContents component for desktop sidebar navigation.
 * Shows all sections with active state highlighting based on scroll position.
 */
function TableOfContents({
  activeSection,
  onSectionClick,
}: {
  activeSection: string;
  onSectionClick: (id: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <nav className="space-y-1" aria-label="Table of contents">
      {SECTIONS.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;

        return (
          <motion.button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center gap-2.5 group ${
              isActive
                ? 'bg-teal-50 text-teal-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
            whileHover={prefersReducedMotion ? {} : { x: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Icon
              className={`w-4 h-4 flex-shrink-0 ${
                isActive ? 'text-teal-600' : 'text-gray-400 group-hover:text-gray-600'
              }`}
            />
            <span className="truncate">{section.title}</span>
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 w-0.5 h-6 bg-teal-500 rounded-full"
                initial={false}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}

/**
 * MobileTableOfContents component for collapsible navigation on mobile.
 * Expands to show all sections when toggled.
 */
function MobileTableOfContents({
  activeSection,
  onSectionClick,
}: {
  activeSection: string;
  onSectionClick: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const currentSection = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];
  const CurrentIcon = currentSection.icon;

  return (
    <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-100 -mx-4 px-4 py-3 mb-8 xl:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-sm font-medium text-gray-700"
        aria-expanded={isOpen}
        aria-controls="mobile-toc"
      >
        <div className="flex items-center gap-2">
          <Menu className="w-4 h-4 text-gray-400" />
          <span>Jump to section</span>
        </div>
        <div className="flex items-center gap-2 text-teal-600">
          <CurrentIcon className="w-4 h-4" />
          <span className="truncate max-w-[150px]">{currentSection.title}</span>
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-toc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-1 space-y-1 max-h-[50vh] overflow-y-auto">
              {SECTIONS.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      onSectionClick(section.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-teal-50 text-teal-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
                    <span>{section.title}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * SectionCard component wraps each privacy section with consistent styling.
 * Includes icon, title, and animated reveal on scroll into view.
 */
function SectionCard({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.FC<{ className?: string }>;
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: prefersReducedMotion ? 10 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-28 mb-12"
    >
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        {/* Section header with icon */}
        <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-teal-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>

        {/* Section content */}
        <div className="px-6 py-6 prose prose-gray prose-sm max-w-none">{children}</div>
      </div>
    </motion.section>
  );
}

/**
 * SubSection component for nested headings within a section.
 */
function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 first:mt-0">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      {children}
    </div>
  );
}

/**
 * PrivacyContent renders the Privacy Policy page with premium design.
 * Features a sticky table of contents, animated sections, and modern styling.
 * Content sourced from official legal documents (TermsFeed).
 * Last updated: January 16, 2023
 */
export default function PrivacyContent() {
  const prefersReducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState('interpretation');
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /**
   * Intersection Observer to track which section is currently in view.
   * Updates the active section state for the table of contents.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    // Observe all section elements
    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  /**
   * Handles smooth scrolling to a section when clicked in the ToC.
   */
  const handleSectionClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.05 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <main className="relative min-h-screen bg-gray-50">
      {/* Sticky navigation - lightHero for dark text on light background */}
      <StickyNav lightHero={true} />

      {/* Progress indicator bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Hero section with gradient background */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Premium gradient mesh background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-white to-teal-50/30" />
          <motion.div
            className="absolute -top-[30%] -right-[20%] w-[60%] h-[80%] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 70%)',
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    scale: [1, 1.1, 1],
                    x: [0, 20, 0],
                  }
            }
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -bottom-[30%] -left-[20%] w-[50%] h-[60%] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    scale: [1, 1.15, 1],
                    y: [0, -20, 0],
                  }
            }
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </div>

        <div className="container-standard relative z-10">
          {/* Breadcrumb navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Privacy Policy</span>
          </motion.nav>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Hero content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-teal-200/50"
              style={{
                background:
                  'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(15, 118, 110, 0.05) 100%)',
              }}
            >
              <Shield className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700 tracking-wide">LEGAL</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6 font-heading"
            >
              Privacy Policy
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4"
            >
              This Privacy Policy describes our policies and procedures on the collection, use and
              disclosure of your information when you use our Service.
            </motion.p>

            {/* Last updated */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 text-sm text-gray-500"
            >
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4" />
                Last updated: January 16, 2023
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>~12 min read</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main content area */}
      <section className="pb-20">
        <div className="container-standard">
          <div className="grid xl:grid-cols-[280px_1fr] gap-12">
            {/* Desktop sidebar - Table of Contents */}
            <aside className="hidden xl:block">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    On this page
                  </h3>
                  <TableOfContents
                    activeSection={activeSection}
                    onSectionClick={handleSectionClick}
                  />
                </div>

                {/* Quick help card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-100"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">Need help?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Have questions about our privacy practices? Our support team is here to help.
                  </p>
                  <a
                    href="mailto:support@sleekdentalclub.com"
                    className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Support
                  </a>
                </motion.div>
              </div>
            </aside>

            {/* Main content column */}
            <div ref={contentRef} className="min-w-0">
              {/* Mobile table of contents */}
              <MobileTableOfContents
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
              />

              {/* Privacy Policy content sections - abbreviated for length */}
              <SectionCard id="interpretation" title="Interpretation and Definitions" icon={BookOpen}>
                <SubSection title="Interpretation">
                  <p>
                    The words of which the initial letter is capitalized have meanings defined under
                    the following conditions. The following definitions shall have the same meaning
                    regardless of whether they appear in singular or in plural.
                  </p>
                </SubSection>

                <SubSection title="Definitions">
                  <p>For the purposes of this Privacy Policy:</p>
                  <ul className="space-y-3 mt-4">
                    <li>
                      <strong className="text-gray-900">Account</strong> means a unique account
                      created for You to access our Service or parts of our Service.
                    </li>
                    <li>
                      <strong className="text-gray-900">Company</strong> (referred to as either
                      &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;)
                      refers to SLEEK Dental Club, 16775 Addison Rd. Suite 605, Addison, Texas 75001.
                    </li>
                    <li>
                      <strong className="text-gray-900">Cookies</strong> are small files placed on
                      Your computer, mobile device or any other device by a website, containing
                      details of Your browsing history.
                    </li>
                    <li>
                      <strong className="text-gray-900">Website</strong> refers to SLEEK Dental
                      Club, accessible from{' '}
                      <a
                        href="https://sleekdentalclub.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 underline"
                      >
                        sleekdentalclub.com
                      </a>
                    </li>
                  </ul>
                </SubSection>
              </SectionCard>

              <SectionCard id="collecting-data" title="Collecting and Using Your Personal Data" icon={Database}>
                <SubSection title="Types of Data Collected">
                  <p>
                    While using Our Service, We may ask You to provide Us with certain personally
                    identifiable information that can be used to contact or identify You. This may
                    include email address, name, phone number, address, and usage data.
                  </p>
                </SubSection>
              </SectionCard>

              <SectionCard id="cookies" title="Tracking Technologies and Cookies" icon={Cookie}>
                <p>
                  We use Cookies and similar tracking technologies to track the activity on Our
                  Service and store certain information.
                </p>
              </SectionCard>

              <SectionCard id="using-data" title="Use of Your Personal Data" icon={Eye}>
                <p>
                  The Company may use Personal Data to provide and maintain our Service, manage Your
                  Account, contact You, and for other business purposes.
                </p>
              </SectionCard>

              <SectionCard id="disclosure" title="Disclosure of Your Personal Data" icon={Users}>
                <p>
                  We may share your personal information with Service Providers, for business
                  transfers, with Affiliates, and with Your consent.
                </p>
              </SectionCard>

              <SectionCard id="security" title="Security of Your Personal Data" icon={Lock}>
                <p>
                  The security of Your Personal Data is important to Us, but remember that no method
                  of transmission over the Internet is 100% secure.
                </p>
              </SectionCard>

              <SectionCard id="third-party" title="Third-Party Service Providers" icon={Globe}>
                <p>
                  We may use third-party Service providers including Google Analytics, Mailchimp,
                  and payment processors. Their use of Your personal information is governed by
                  their Privacy Policies.
                </p>
              </SectionCard>

              <SectionCard id="remarketing" title="Behavioral Remarketing" icon={Eye}>
                <p>
                  The Company uses remarketing services to advertise to You after You accessed our
                  Service. You can opt-out through various third-party tools.
                </p>
              </SectionCard>

              <SectionCard id="ccpa" title="CCPA Privacy (California Residents)" icon={Scale}>
                <p>
                  California residents have specific rights regarding their personal information
                  under the CCPA, including the right to know, delete, and opt-out of sale of
                  personal data.
                </p>
              </SectionCard>

              <SectionCard id="do-not-track" title='"Do Not Track" Policy' icon={Shield}>
                <p>
                  Our Service does not respond to Do Not Track signals. You can set Your preferences
                  in Your web browser.
                </p>
              </SectionCard>

              <SectionCard id="children" title="Children's Privacy" icon={Baby}>
                <p>
                  We use reasonable efforts to ensure that before we collect any personal
                  information from a child, the child&apos;s parent receives notice and consents.
                </p>
              </SectionCard>

              <SectionCard id="california" title="Additional California Privacy Rights" icon={Scale}>
                <p>
                  Under California&apos;s Shine the Light law, California residents can request
                  information about sharing their Personal Data with third parties.
                </p>
              </SectionCard>

              <SectionCard id="links" title="Links to Other Websites" icon={ExternalLink}>
                <p>
                  Our Service may contain links to other websites. We strongly advise You to review
                  the Privacy Policy of every site You visit.
                </p>
              </SectionCard>

              <SectionCard id="changes" title="Changes to this Privacy Policy" icon={RefreshCw}>
                <p>
                  We may update Our Privacy Policy from time to time. We will notify You of any
                  changes by posting the new Privacy Policy on this page.
                </p>
              </SectionCard>

              <SectionCard id="contact" title="Contact Us" icon={Mail}>
                <p>
                  If you have any questions about this Privacy Policy, You can contact us:
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-teal-600" />
                    </div>
                    <span>
                      By email:{' '}
                      <a
                        href="mailto:support@sleekdentalclub.com"
                        className="text-teal-600 hover:text-teal-700 underline"
                      >
                        support@sleekdentalclub.com
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-teal-600" />
                    </div>
                    <span>
                      By mail: SLEEK Dental Club, 16775 Addison Rd. Suite 605, Addison, Texas 75001
                    </span>
                  </li>
                </ul>
              </SectionCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="container-standard relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-heading">
              Your Privacy Matters to Us
            </h2>
            <p className="text-gray-300 mb-8">
              Have questions about how we handle your data? Our support team is here to help you
              understand our privacy practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@sleekdentalclub.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Contact Support
              </a>
              <Link
                href="/terms"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
