'use client';

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
 * Privacy Policy page with premium design matching the Terms page.
 * Features a sticky table of contents, animated sections, and modern styling.
 * Content sourced from official legal documents (TermsFeed).
 * Last updated: January 16, 2023
 */
export default function PrivacyPolicyPage() {
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
      {/* Sticky navigation */}
      <StickyNav />

      {/* Progress indicator bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Hero section with gradient background */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Premium gradient mesh background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-white to-amber-50/30" />
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

              {/* Privacy Policy content sections */}
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
                      <strong className="text-gray-900">Business</strong> (for the purpose of the
                      CCPA) refers to the Company as the legal entity that collects Consumers&apos;
                      personal information and determines the purposes and means of the processing.
                    </li>
                    <li>
                      <strong className="text-gray-900">Company</strong> (referred to as either
                      &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;)
                      refers to SLEEK Dental Club, 16775 Addison Rd., Suite 612 Addison, TX 75001.
                    </li>
                    <li>
                      <strong className="text-gray-900">Consumer</strong> (for the purpose of the
                      CCPA) means a natural person who is a California resident.
                    </li>
                    <li>
                      <strong className="text-gray-900">Cookies</strong> are small files placed on
                      Your computer, mobile device or any other device by a website, containing
                      details of Your browsing history.
                    </li>
                    <li>
                      <strong className="text-gray-900">Country</strong> refers to: Texas, United
                      States
                    </li>
                    <li>
                      <strong className="text-gray-900">Device</strong> means any device that can
                      access the Service such as a computer, a cellphone or a digital tablet.
                    </li>
                    <li>
                      <strong className="text-gray-900">Do Not Track (DNT)</strong> is a concept
                      promoted by US regulatory authorities for the Internet industry to develop a
                      mechanism for allowing users to control the tracking of their online
                      activities.
                    </li>
                    <li>
                      <strong className="text-gray-900">Personal Data</strong> is any information
                      that relates to an identified or identifiable individual.
                    </li>
                    <li>
                      <strong className="text-gray-900">Sale</strong> (for the purpose of the CCPA)
                      means selling, renting, releasing, disclosing, disseminating, making
                      available, or otherwise communicating a Consumer&apos;s personal information
                      to a third party for monetary or other valuable consideration.
                    </li>
                    <li>
                      <strong className="text-gray-900">Service</strong> refers to the Website.
                    </li>
                    <li>
                      <strong className="text-gray-900">Service Provider</strong> means any natural
                      or legal person who processes the data on behalf of the Company.
                    </li>
                    <li>
                      <strong className="text-gray-900">Usage Data</strong> refers to data collected
                      automatically, either generated by the use of the Service or from the Service
                      infrastructure itself.
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
                    <li>
                      <strong className="text-gray-900">You</strong> means the individual accessing
                      or using the Service, or the company, or other legal entity on behalf of which
                      such individual is accessing or using the Service.
                    </li>
                  </ul>
                </SubSection>
              </SectionCard>

              <SectionCard id="collecting-data" title="Collecting and Using Your Personal Data" icon={Database}>
                <SubSection title="Types of Data Collected">
                  <h4 className="text-base font-semibold text-gray-800 mt-4 mb-2">Personal Data</h4>
                  <p>
                    While using Our Service, We may ask You to provide Us with certain personally
                    identifiable information that can be used to contact or identify You. Personally
                    identifiable information may include, but is not limited to:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Address, State, Province, ZIP/Postal code, City</li>
                    <li>Usage Data</li>
                  </ul>

                  <h4 className="text-base font-semibold text-gray-800 mt-6 mb-2">Usage Data</h4>
                  <p>
                    Usage Data is collected automatically when using the Service. Usage Data may
                    include information such as Your Device&apos;s Internet Protocol address (e.g.
                    IP address), browser type, browser version, the pages of our Service that You
                    visit, the time and date of Your visit, the time spent on those pages, unique
                    device identifiers and other diagnostic data.
                  </p>
                  <p className="mt-3">
                    When You access the Service by or through a mobile device, We may collect
                    certain information automatically, including the type of mobile device You use,
                    Your mobile device unique ID, the IP address of Your mobile device, Your mobile
                    operating system, the type of mobile Internet browser You use, and other
                    diagnostic data.
                  </p>
                </SubSection>
              </SectionCard>

              <SectionCard id="cookies" title="Tracking Technologies and Cookies" icon={Cookie}>
                <p>
                  We use Cookies and similar tracking technologies to track the activity on Our
                  Service and store certain information. Tracking technologies used are beacons,
                  tags, and scripts to collect and track information and to improve and analyze Our
                  Service.
                </p>

                <SubSection title="Cookies or Browser Cookies">
                  <p>
                    A cookie is a small file placed on Your Device. You can instruct Your browser to
                    refuse all Cookies or to indicate when a Cookie is being sent. However, if You
                    do not accept Cookies, You may not be able to use some parts of our Service.
                    Unless you have adjusted Your browser setting so that it will refuse Cookies,
                    our Service may use Cookies.
                  </p>
                </SubSection>

                <SubSection title="Web Beacons">
                  <p>
                    Certain sections of our Service and our emails may contain small electronic
                    files known as web beacons (also referred to as clear gifs, pixel tags, and
                    single-pixel gifs) that permit the Company, for example, to count users who have
                    visited those pages or opened an email and for other related website statistics.
                  </p>
                </SubSection>

                <SubSection title="Types of Cookies We Use">
                  <p className="mb-4">
                    Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent
                    Cookies remain on Your personal computer or mobile device when You go offline,
                    while Session Cookies are deleted as soon as You close Your web browser.
                  </p>
                  <ul className="space-y-3 mt-4">
                    <li>
                      <strong className="text-gray-900">Necessary / Essential Cookies</strong>{' '}
                      (Session): These Cookies are essential to provide You with services available
                      through the Website and to enable You to use some of its features. They help
                      to authenticate users and prevent fraudulent use of user accounts.
                    </li>
                    <li>
                      <strong className="text-gray-900">
                        Cookies Policy / Notice Acceptance Cookies
                      </strong>{' '}
                      (Persistent): These Cookies identify if users have accepted the use of cookies
                      on the Website.
                    </li>
                    <li>
                      <strong className="text-gray-900">Functionality Cookies</strong> (Persistent):
                      These Cookies allow us to remember choices You make when You use the Website,
                      such as remembering your login details or language preference. The purpose is
                      to provide You with a more personal experience.
                    </li>
                    <li>
                      <strong className="text-gray-900">Tracking and Performance Cookies</strong>{' '}
                      (Third-Party): These Cookies are used to track information about traffic to
                      the Website and how users use the Website. The information gathered may
                      directly or indirectly identify you as an individual visitor.
                    </li>
                  </ul>
                </SubSection>
              </SectionCard>

              <SectionCard id="using-data" title="Use of Your Personal Data" icon={Eye}>
                <p>The Company may use Personal Data for the following purposes:</p>
                <ul className="space-y-3 mt-4">
                  <li>
                    <strong className="text-gray-900">To provide and maintain our Service</strong>,
                    including to monitor the usage of our Service.
                  </li>
                  <li>
                    <strong className="text-gray-900">To manage Your Account</strong>: to manage
                    Your registration as a user of the Service.
                  </li>
                  <li>
                    <strong className="text-gray-900">For the performance of a contract</strong>:
                    the development, compliance and undertaking of the purchase contract for the
                    products, items or services You have purchased.
                  </li>
                  <li>
                    <strong className="text-gray-900">To contact You</strong>: To contact You by
                    email, telephone calls, SMS, or other equivalent forms of electronic
                    communication.
                  </li>
                  <li>
                    <strong className="text-gray-900">To provide You</strong> with news, special
                    offers and general information about other goods, services and events which we
                    offer.
                  </li>
                  <li>
                    <strong className="text-gray-900">To manage Your requests</strong>: To attend
                    and manage Your requests to Us.
                  </li>
                  <li>
                    <strong className="text-gray-900">To deliver targeted advertising</strong>: We
                    may use Your information to develop and display content and advertising tailored
                    to Your interests.
                  </li>
                  <li>
                    <strong className="text-gray-900">For business transfers</strong>: We may use
                    Your information to evaluate or conduct a merger, divestiture, restructuring,
                    reorganization, dissolution, or other sale or transfer of some or all of Our
                    assets.
                  </li>
                  <li>
                    <strong className="text-gray-900">For other purposes</strong>: We may use Your
                    information for data analysis, identifying usage trends, determining the
                    effectiveness of our promotional campaigns and to evaluate and improve our
                    Service.
                  </li>
                </ul>

                <SubSection title="Sharing Your Personal Information">
                  <p>We may share Your personal information in the following situations:</p>
                  <ul className="space-y-3 mt-4">
                    <li>
                      <strong className="text-gray-900">With Service Providers</strong>: We may
                      share Your personal information with Service Providers to monitor and analyze
                      the use of our Service, to advertise on third party websites to You after You
                      visited our Service, for payment processing, to contact You.
                    </li>
                    <li>
                      <strong className="text-gray-900">For business transfers</strong>: We may
                      share or transfer Your personal information in connection with, or during
                      negotiations of, any merger, sale of Company assets, financing, or acquisition
                      of all or a portion of Our business to another company.
                    </li>
                    <li>
                      <strong className="text-gray-900">With Affiliates</strong>: We may share Your
                      information with Our affiliates, in which case we will require those
                      affiliates to honor this Privacy Policy.
                    </li>
                    <li>
                      <strong className="text-gray-900">With business partners</strong>: We may
                      share Your information with Our business partners to offer You certain
                      products, services or promotions.
                    </li>
                    <li>
                      <strong className="text-gray-900">With other users</strong>: When You share
                      personal information or otherwise interact in the public areas with other
                      users, such information may be viewed by all users and may be publicly
                      distributed outside.
                    </li>
                    <li>
                      <strong className="text-gray-900">With Your consent</strong>: We may disclose
                      Your personal information for any other purpose with Your consent.
                    </li>
                  </ul>
                </SubSection>

                <SubSection title="Retention of Your Personal Data">
                  <p>
                    The Company will retain Your Personal Data only for as long as is necessary for
                    the purposes set out in this Privacy Policy. We will retain and use Your
                    Personal Data to the extent necessary to comply with our legal obligations,
                    resolve disputes, and enforce our legal agreements and policies.
                  </p>
                </SubSection>

                <SubSection title="Transfer of Your Personal Data">
                  <p>
                    Your information, including Personal Data, is processed at the Company&apos;s
                    operating offices and in any other places where the parties involved in the
                    processing are located. Your consent to this Privacy Policy followed by Your
                    submission of such information represents Your agreement to that transfer.
                  </p>
                </SubSection>

                <SubSection title="Delete Your Personal Data">
                  <p>
                    You have the right to delete or request that We assist in deleting the Personal
                    Data that We have collected about You. You may update, amend, or delete Your
                    information at any time by signing in to Your Account, if you have one, and
                    visiting the account settings section. You may also contact Us to request
                    access to, correct, or delete any personal information that You have provided to
                    Us.
                  </p>
                  <p className="mt-3">
                    Please note, however, that We may need to retain certain information when we
                    have a legal obligation or lawful basis to do so.
                  </p>
                </SubSection>
              </SectionCard>

              <SectionCard id="disclosure" title="Disclosure of Your Personal Data" icon={Users}>
                <SubSection title="Business Transactions">
                  <p>
                    If the Company is involved in a merger, acquisition or asset sale, Your Personal
                    Data may be transferred. We will provide notice before Your Personal Data is
                    transferred and becomes subject to a different Privacy Policy.
                  </p>
                </SubSection>

                <SubSection title="Law Enforcement">
                  <p>
                    Under certain circumstances, the Company may be required to disclose Your
                    Personal Data if required to do so by law or in response to valid requests by
                    public authorities (e.g. a court or a government agency).
                  </p>
                </SubSection>

                <SubSection title="Other Legal Requirements">
                  <p>
                    The Company may disclose Your Personal Data in the good faith belief that such
                    action is necessary to:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>Comply with a legal obligation</li>
                    <li>Protect and defend the rights or property of the Company</li>
                    <li>
                      Prevent or investigate possible wrongdoing in connection with the Service
                    </li>
                    <li>Protect the personal safety of Users of the Service or the public</li>
                    <li>Protect against legal liability</li>
                  </ul>
                </SubSection>
              </SectionCard>

              <SectionCard id="security" title="Security of Your Personal Data" icon={Lock}>
                <p>
                  The security of Your Personal Data is important to Us, but remember that no method
                  of transmission over the Internet, or method of electronic storage is 100% secure.
                  While We strive to use commercially acceptable means to protect Your Personal
                  Data, We cannot guarantee its absolute security.
                </p>
              </SectionCard>

              <SectionCard id="third-party" title="Third-Party Service Providers" icon={Globe}>
                <p>
                  The Service Providers We use may have access to Your Personal Data. These
                  third-party vendors collect, store, use, process and transfer information about
                  Your activity on Our Service in accordance with their Privacy Policies.
                </p>

                <SubSection title="Analytics">
                  <p>
                    We may use third-party Service providers to monitor and analyze the use of our
                    Service.
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="font-semibold text-gray-900 mb-2">Google Analytics</p>
                    <p className="text-sm text-gray-600">
                      Google Analytics is a web analytics service offered by Google that tracks and
                      reports website traffic. For more information, visit:{' '}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 underline"
                      >
                        Google Privacy Policy
                      </a>
                    </p>
                  </div>
                </SubSection>

                <SubSection title="Email Marketing">
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="font-semibold text-gray-900 mb-2">Mailchimp</p>
                    <p className="text-sm text-gray-600">
                      Mailchimp is an email marketing sending service provided by The Rocket Science
                      Group LLC. For more information:{' '}
                      <a
                        href="https://mailchimp.com/legal/privacy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 underline"
                      >
                        Mailchimp Privacy Policy
                      </a>
                    </p>
                  </div>
                </SubSection>

                <SubSection title="Payments">
                  <p>
                    We may provide paid products and/or services within the Service. In that case,
                    we may use third-party services for payment processing. We will not store or
                    collect Your payment card details. That information is provided directly to Our
                    third-party payment processors whose use of Your personal information is
                    governed by their Privacy Policy. These payment processors adhere to the
                    standards set by PCI-DSS.
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="font-semibold text-gray-900 mb-2">Enrollment123</p>
                    <p className="text-sm text-gray-600">
                      Their Privacy Policy can be viewed at{' '}
                      <a
                        href="https://sales.enrollment123.com/privacy-policy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 underline"
                      >
                        Enrollment123 Privacy Policy
                      </a>
                    </p>
                  </div>
                </SubSection>
              </SectionCard>

              <SectionCard id="remarketing" title="Behavioral Remarketing" icon={Eye}>
                <p>
                  The Company uses remarketing services to advertise to You after You accessed or
                  visited our Service. We and Our third-party vendors use cookies and non-cookie
                  technologies to help Us recognize Your Device and understand how You use our
                  Service so that We can improve our Service to reflect Your interests and serve You
                  advertisements that are likely to be of more interest to You.
                </p>
                <p className="mt-3">
                  These third-party vendors collect, store, use, process and transfer information
                  about Your activity on Our Service in accordance with their Privacy Policies and
                  to enable Us to:
                </p>
                <ul className="mt-3 space-y-2">
                  <li>Measure and analyze traffic and browsing activity on Our Service</li>
                  <li>
                    Show advertisements for our products and/or services to You on third-party
                    websites or apps
                  </li>
                  <li>Measure and analyze the performance of Our advertising campaigns</li>
                </ul>

                <SubSection title="Opt-Out of Interest-Based Advertising">
                  <p>
                    You can use the following third-party tools to decline the collection and use of
                    information for the purpose of serving You interest-based advertising:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <a
                        href="http://www.networkadvertising.org/choices/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 underline"
                      >
                        NAI&apos;s opt-out platform
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.youronlinechoices.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 underline"
                      >
                        EDAA&apos;s opt-out platform
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://optout.aboutads.info/?c=2&lang=EN"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 underline"
                      >
                        DAA&apos;s opt-out platform
                      </a>
                    </li>
                  </ul>
                </SubSection>

                <SubSection title="Third-Party Remarketing Services">
                  <div className="space-y-4 mt-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="font-semibold text-gray-900 mb-2">Google Ads (AdWords)</p>
                      <p className="text-sm text-gray-600 mb-2">
                        Google Ads remarketing service is provided by Google Inc. You can opt-out of
                        Google Analytics for Display Advertising and customize the Google Display
                        Network ads by visiting the Google Ads Settings page.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href="http://www.google.com/settings/ads"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-teal-600 hover:text-teal-700 underline"
                        >
                          Google Ads Settings
                        </a>
                        <a
                          href="https://tools.google.com/dlpage/gaoptout"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-teal-600 hover:text-teal-700 underline"
                        >
                          Google Analytics Opt-out
                        </a>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="font-semibold text-gray-900 mb-2">Facebook</p>
                      <p className="text-sm text-gray-600 mb-2">
                        Facebook remarketing service is provided by Facebook Inc. Facebook adheres
                        to the Self-Regulatory Principles for Online Behavioural Advertising
                        established by the Digital Advertising Alliance.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href="https://www.facebook.com/help/516147308587266"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-teal-600 hover:text-teal-700 underline"
                        >
                          Learn More
                        </a>
                        <a
                          href="https://www.facebook.com/help/568137493302217"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-teal-600 hover:text-teal-700 underline"
                        >
                          Opt-Out Instructions
                        </a>
                      </div>
                    </div>
                  </div>
                </SubSection>

                <SubSection title="Mobile Device Opt-Out">
                  <p>
                    You may opt-out of all personalized advertising by enabling privacy features on
                    Your mobile device:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>iOS devices:</strong> &quot;Limit Ad Tracking&quot; in Settings
                    </li>
                    <li>
                      <strong>Android devices:</strong> &quot;Opt out of Interest-Based Ads&quot; or
                      &quot;Opt out of Ads Personalization&quot;
                    </li>
                  </ul>
                </SubSection>
              </SectionCard>

              <SectionCard id="ccpa" title="CCPA Privacy (California Residents)" icon={Scale}>
                <p>
                  This privacy notice section for California residents supplements the information
                  contained in Our Privacy Policy and it applies solely to all visitors, users, and
                  others who reside in the State of California.
                </p>

                <SubSection title="Categories of Personal Information Collected">
                  <p>
                    We collect information that identifies, relates to, describes, references, is
                    capable of being associated with, or could reasonably be linked, directly or
                    indirectly, with a particular Consumer or Device. The following categories may
                    be collected:
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li>
                      <strong className="text-gray-900">Category A: Identifiers</strong> - Real
                      name, alias, postal address, unique personal identifier, online identifier, IP
                      address, email address, account name. <em>(Collected)</em>
                    </li>
                    <li>
                      <strong className="text-gray-900">
                        Category B: Personal information (Cal. Civ. Code § 1798.80(e))
                      </strong>{' '}
                      - Name, address, telephone number, financial information.{' '}
                      <em>(Collected)</em>
                    </li>
                    <li>
                      <strong className="text-gray-900">Category C: Protected classifications</strong>{' '}
                      - Age, race, gender, etc. <em>(Not Collected)</em>
                    </li>
                    <li>
                      <strong className="text-gray-900">Category D: Commercial information</strong>{' '}
                      - Records of products or services purchased. <em>(Collected)</em>
                    </li>
                    <li>
                      <strong className="text-gray-900">Category E: Biometric information</strong> -
                      Fingerprints, faceprints, voiceprints. <em>(Not Collected)</em>
                    </li>
                    <li>
                      <strong className="text-gray-900">
                        Category F: Internet or network activity
                      </strong>{' '}
                      - Interaction with our Service. <em>(Collected)</em>
                    </li>
                    <li>
                      <strong className="text-gray-900">Category G: Geolocation data</strong> -
                      Physical location. <em>(Not Collected)</em>
                    </li>
                    <li>
                      <strong className="text-gray-900">Category H: Sensory data</strong> - Audio,
                      visual, thermal information. <em>(Not Collected)</em>
                    </li>
                    <li>
                      <strong className="text-gray-900">
                        Category I: Professional/employment info
                      </strong>{' '}
                      - Job history. <em>(Not Collected)</em>
                    </li>
                    <li>
                      <strong className="text-gray-900">Category J: Education information</strong> -
                      Education records. <em>(Not Collected)</em>
                    </li>
                    <li>
                      <strong className="text-gray-900">Category K: Inferences</strong> - Profile
                      reflecting preferences, behavior. <em>(Not Collected)</em>
                    </li>
                  </ul>
                </SubSection>

                <SubSection title="Sources of Personal Information">
                  <p>We obtain personal information from:</p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <strong>Directly from You:</strong> From forms You complete on our Service,
                      preferences You express, or from Your purchases.
                    </li>
                    <li>
                      <strong>Indirectly from You:</strong> From observing Your activity on our
                      Service.
                    </li>
                    <li>
                      <strong>Automatically from You:</strong> Through cookies We or our Service
                      Providers set on Your Device.
                    </li>
                    <li>
                      <strong>From Service Providers:</strong> Third-party vendors for analytics,
                      advertising, payment processing.
                    </li>
                  </ul>
                </SubSection>

                <SubSection title="Sale of Personal Information">
                  <p>
                    We may sell and may have sold in the last twelve (12) months the following
                    categories of personal information:
                  </p>
                  <ul className="mt-3 space-y-1">
                    <li>Category A: Identifiers</li>
                    <li>Category B: Personal information (Cal. Civ. Code § 1798.80(e))</li>
                    <li>Category D: Commercial information</li>
                    <li>Category F: Internet or other similar network activity</li>
                  </ul>
                </SubSection>

                <SubSection title="Sale of Personal Information of Minors Under 16">
                  <p>
                    We do not sell the personal information of Consumers We actually know are less
                    than 16 years of age, unless We receive affirmative authorization from either
                    the Consumer who is between 13 and 16 years of age, or the parent or guardian of
                    a Consumer less than 13 years of age.
                  </p>
                </SubSection>

                <SubSection title="Your Rights under the CCPA">
                  <p>
                    The CCPA provides California residents with specific rights regarding their
                    personal information:
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li>
                      <strong className="text-gray-900">The right to notice</strong>: You have the
                      right to be notified which categories of Personal Data are being collected and
                      the purposes for which the Personal Data is being used.
                    </li>
                    <li>
                      <strong className="text-gray-900">The right to request</strong>: Under CCPA,
                      You have the right to request that We disclose information to You about Our
                      collection, use, sale, disclosure for business purposes and share of personal
                      information.
                    </li>
                    <li>
                      <strong className="text-gray-900">
                        The right to say no to the sale of Personal Data (opt-out)
                      </strong>
                      : You have the right to direct Us to not sell Your personal information.
                    </li>
                    <li>
                      <strong className="text-gray-900">The right to delete Personal Data</strong>:
                      You have the right to request the deletion of Your Personal Data, subject to
                      certain exceptions.
                    </li>
                    <li>
                      <strong className="text-gray-900">
                        The right not to be discriminated against
                      </strong>
                      : You have the right not to be discriminated against for exercising any of
                      Your consumer&apos;s rights.
                    </li>
                  </ul>
                </SubSection>

                <SubSection title="Exercising Your CCPA Data Protection Rights">
                  <p>
                    In order to exercise any of Your rights under the CCPA, and if You are a
                    California resident, You can contact Us by email:{' '}
                    <a
                      href="mailto:support@sleekdentalclub.com"
                      className="text-teal-600 hover:text-teal-700 underline"
                    >
                      support@sleekdentalclub.com
                    </a>
                  </p>
                  <p className="mt-3">
                    Only You, or a person registered with the California Secretary of State that You
                    authorize to act on Your behalf, may make a verifiable request related to Your
                    personal information. We will disclose and deliver the required information free
                    of charge within 45 days of receiving Your verifiable request.
                  </p>
                </SubSection>

                <SubSection title="Do Not Sell My Personal Information">
                  <p>
                    You have the right to opt-out of the sale of Your personal information. Once We
                    receive and confirm a verifiable consumer request from You, we will stop selling
                    Your personal information. To exercise Your right to opt-out, please contact Us.
                  </p>
                </SubSection>
              </SectionCard>

              <SectionCard id="do-not-track" title='"Do Not Track" Policy (CalOPPA)' icon={Shield}>
                <p>
                  Our Service does not respond to Do Not Track signals. However, some third party
                  websites do keep track of Your browsing activities. If You are visiting such
                  websites, You can set Your preferences in Your web browser to inform websites that
                  You do not want to be tracked. You can enable or disable DNT by visiting the
                  preferences or settings page of Your web browser.
                </p>
              </SectionCard>

              <SectionCard id="children" title="Children's Privacy" icon={Baby}>
                <p>
                  The Service may contain content appropriate for children under the age of 13. As a
                  parent, you should know that through the Service children under the age of 13 may
                  participate in activities that involve the collection or use of personal
                  information. We use reasonable efforts to ensure that before we collect any
                  personal information from a child, the child&apos;s parent receives notice of and
                  consents to our personal information practices.
                </p>
                <p className="mt-3">
                  We also may limit how We collect, use, and store some of the information of Users
                  between 13 and 18 years old. In some cases, this means We will be unable to
                  provide certain functionality of the Service to these Users.
                </p>

                <SubSection title="Information Collected from Children Under 13">
                  <p>
                    The Company may collect and store persistent identifiers such as cookies or IP
                    addresses from Children without parental consent for the purpose of supporting
                    the internal operation of the Service. We may collect and store other personal
                    information about children if this information is submitted by a child with
                    prior parent consent or by the parent or guardian of the child.
                  </p>
                  <p className="mt-3">
                    The Company may collect and store the following types of personal information
                    about a child when submitted with prior parental consent:
                  </p>
                  <ul className="mt-3 space-y-1">
                    <li>First and/or last name</li>
                    <li>Date of birth</li>
                    <li>Gender</li>
                    <li>Grade level</li>
                    <li>Email address</li>
                    <li>Telephone number</li>
                    <li>Parent&apos;s or guardian&apos;s name</li>
                    <li>Parent&apos;s or guardian&apos;s email address</li>
                  </ul>
                </SubSection>

                <SubSection title="Parental Access">
                  <p>
                    A parent who has already given the Company permission to collect and use his
                    child personal information can, at any time:
                  </p>
                  <ul className="mt-3 space-y-1">
                    <li>Review, correct or delete the child&apos;s personal information</li>
                    <li>
                      Discontinue further collection or use of the child&apos;s personal information
                    </li>
                  </ul>
                  <p className="mt-3">
                    To make such a request, You can write to Us using the contact information
                    provided in this Privacy Policy.
                  </p>
                </SubSection>
              </SectionCard>

              <SectionCard id="california" title="Additional California Privacy Rights" icon={Scale}>
                <SubSection title="California's Shine the Light Law">
                  <p>
                    Under California Civil Code Section 1798 (California&apos;s Shine the Light
                    law), California residents with an established business relationship with us can
                    request information once a year about sharing their Personal Data with third
                    parties for the third parties&apos; direct marketing purposes.
                  </p>
                  <p className="mt-3">
                    If you&apos;d like to request more information under the California Shine the
                    Light law, and if You are a California resident, You can contact Us using the
                    contact information provided below.
                  </p>
                </SubSection>

                <SubSection title="California Privacy Rights for Minor Users (Section 22581)">
                  <p>
                    California Business and Professions Code Section 22581 allows California
                    residents under the age of 18 who are registered users of online sites, services
                    or applications to request and obtain removal of content or information they
                    have publicly posted.
                  </p>
                  <p className="mt-3">
                    To request removal of such data, and if You are a California resident, You can
                    contact Us using the contact information provided below, and include the email
                    address associated with Your account. Be aware that Your request does not
                    guarantee complete or comprehensive removal of content or information posted
                    online and that the law may not permit or require removal in certain
                    circumstances.
                  </p>
                </SubSection>
              </SectionCard>

              <SectionCard id="links" title="Links to Other Websites" icon={ExternalLink}>
                <p>
                  Our Service may contain links to other websites that are not operated by Us. If
                  You click on a third party link, You will be directed to that third party&apos;s
                  site. We strongly advise You to review the Privacy Policy of every site You visit.
                </p>
                <p className="mt-3">
                  We have no control over and assume no responsibility for the content, privacy
                  policies or practices of any third party sites or services.
                </p>
              </SectionCard>

              <SectionCard id="changes" title="Changes to this Privacy Policy" icon={RefreshCw}>
                <p>
                  We may update Our Privacy Policy from time to time. We will notify You of any
                  changes by posting the new Privacy Policy on this page. We will let You know via
                  email and/or a prominent notice on Our Service, prior to the change becoming
                  effective and update the &quot;Last updated&quot; date at the top of this Privacy
                  Policy.
                </p>
                <p className="mt-3">
                  You are advised to review this Privacy Policy periodically for any changes.
                  Changes to this Privacy Policy are effective when they are posted on this page.
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
                      By mail: SLEEK Dental Club, 16775 Addison Rd., Suite 612, Addison, TX 75001
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
        {/* Background pattern */}
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
