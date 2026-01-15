'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  FileText,
  BookOpen,
  Shield,
  CreditCard,
  Lightbulb,
  MessageSquare,
  Link2,
  XCircle,
  AlertTriangle,
  Scale,
  Globe,
  Users,
  Gavel,
  Languages,
  RefreshCw,
  Mail,
  Menu,
} from 'lucide-react';

import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';

/**
 * Section configuration for the Terms page.
 * Each section has an id (for anchor linking), title, and icon.
 * Used to generate the table of contents and section headers.
 */
const SECTIONS = [
  { id: 'interpretation', title: 'Interpretation and Definitions', icon: BookOpen },
  { id: 'acknowledgment', title: 'Acknowledgment', icon: Shield },
  { id: 'subscriptions', title: 'Subscriptions', icon: CreditCard },
  { id: 'intellectual-property', title: 'Intellectual Property', icon: Lightbulb },
  { id: 'feedback', title: 'Your Feedback to Us', icon: MessageSquare },
  { id: 'links', title: 'Links to Other Websites', icon: Link2 },
  { id: 'termination', title: 'Termination', icon: XCircle },
  { id: 'limitation', title: 'Limitation of Liability', icon: AlertTriangle },
  { id: 'disclaimer', title: '"AS IS" and "AS AVAILABLE" Disclaimer', icon: Scale },
  { id: 'governing-law', title: 'Governing Law', icon: Globe },
  { id: 'disputes', title: 'Disputes Resolution', icon: Gavel },
  { id: 'eu-users', title: 'For European Union (EU) Users', icon: Users },
  { id: 'us-federal', title: 'United States Federal Government End Use Provisions', icon: Gavel },
  { id: 'us-compliance', title: 'United States Legal Compliance', icon: Shield },
  { id: 'severability', title: 'Severability and Waiver', icon: Scale },
  { id: 'translation', title: 'Translation Interpretation', icon: Languages },
  { id: 'changes', title: 'Changes to These Terms', icon: RefreshCw },
  { id: 'contact', title: 'Contact Us', icon: Mail },
];

/**
 * TableOfContents component for desktop sidebar navigation.
 * Shows all sections with active state highlighting based on scroll position.
 */
function TableOfContents({ 
  activeSection, 
  onSectionClick 
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
            <Icon className={`w-4 h-4 flex-shrink-0 ${
              isActive ? 'text-teal-600' : 'text-gray-400 group-hover:text-gray-600'
            }`} />
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
  onSectionClick 
}: { 
  activeSection: string;
  onSectionClick: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const currentSection = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];
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
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
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
 * SectionCard component wraps each terms section with consistent styling.
 * Includes icon, title, and animated reveal on scroll into view.
 */
function SectionCard({ 
  id, 
  title, 
  icon: Icon, 
  children 
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
        <div className="px-6 py-6 prose prose-gray prose-sm max-w-none">
          {children}
        </div>
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
 * Terms and Conditions page with premium design.
 * Features a sticky table of contents, animated sections, and modern styling.
 * Content sourced from official legal documents (TermsFeed).
 * Last updated: January 16, 2023
 */
export default function TermsPage() {
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
        block: 'start'
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
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
            }}
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
            animate={prefersReducedMotion ? {} : {
              scale: [1, 1.15, 1],
              y: [0, -20, 0],
            }}
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
            <span className="text-gray-900 font-medium">Terms and Conditions</span>
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
                background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(15, 118, 110, 0.05) 100%)',
              }}
            >
              <FileText className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700 tracking-wide">
                LEGAL
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6 font-heading"
            >
              Terms and Conditions
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4"
            >
              Please read these terms and conditions carefully before using our Service.
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
              <span>~15 min read</span>
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
                    Have questions about our terms? Our support team is here to help.
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

              {/* Terms content sections */}
              <SectionCard id="interpretation" title="Interpretation and Definitions" icon={BookOpen}>
                <SubSection title="Interpretation">
                  <p>
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                  </p>
                </SubSection>

                <SubSection title="Definitions">
                  <p>For the purposes of these Terms and Conditions:</p>
                  <ul className="space-y-3 mt-4">
                    <li><strong className="text-gray-900">Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
                    <li><strong className="text-gray-900">Country</strong> refers to: Texas, United States</li>
                    <li><strong className="text-gray-900">Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to SLEEK Dental Club, 16775 Addison Rd. Suite 605, Addison, Texas 75001.</li>
                    <li><strong className="text-gray-900">Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
                    <li><strong className="text-gray-900">Feedback</strong> means feedback, innovations or suggestions sent by You regarding the attributes, performance or features of our Service.</li>
                    <li><strong className="text-gray-900">Service</strong> refers to the Website.</li>
                    <li><strong className="text-gray-900">Subscriptions</strong> refer to the services or access to the Service offered on a subscription basis by the Company to You.</li>
                    <li><strong className="text-gray-900">Terms and Conditions</strong> (also referred as &quot;Terms&quot;) mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</li>
                    <li><strong className="text-gray-900">Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</li>
                    <li><strong className="text-gray-900">Website</strong> refers to SLEEK Dental Club, accessible from <a href="https://sleekdentalclub.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">sleekdentalclub.com</a></li>
                    <li><strong className="text-gray-900">You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                  </ul>
                </SubSection>
              </SectionCard>

              <SectionCard id="acknowledgment" title="Acknowledgment" icon={Shield}>
                <p>
                  These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                </p>
                <p>
                  Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
                </p>
                <p>
                  By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
                </p>
                <p>
                  You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
                </p>
                <p>
                  Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our <Link href="/privacy" className="text-teal-600 hover:text-teal-700 underline">Privacy Policy</Link> carefully before using Our Service.
                </p>
              </SectionCard>

              <SectionCard id="subscriptions" title="Subscriptions" icon={CreditCard}>
                <SubSection title="Subscription Period">
                  <p>
                    The Service or some parts of the Service are available only with a paid Subscription. You will be billed in advance on a recurring and periodic basis (such as daily, weekly, monthly or annually), depending on the type of Subscription plan you select when purchasing the Subscription.
                  </p>
                  <p>
                    At the end of each period, Your Subscription will automatically renew under the exact same conditions unless You cancel it or the Company cancels it.
                  </p>
                </SubSection>

                <SubSection title="Subscription Cancellations">
                  <p>
                    You may cancel Your Subscription renewal either through Your Account settings page or by contacting the Company. You will not receive a refund for the fees You already paid for Your current Subscription period and You will be able to access the Service until the end of Your current Subscription period.
                  </p>
                </SubSection>

                <SubSection title="Billing">
                  <p>
                    You shall provide the Company with accurate and complete billing information including full name, address, state, zip code, telephone number, and a valid payment method information.
                  </p>
                  <p>
                    Should automatic billing fail to occur for any reason, the Company will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.
                  </p>
                </SubSection>

                <SubSection title="Fee Changes">
                  <p>
                    The Company, in its sole discretion and at any time, may modify the Subscription fees. Any Subscription fee change will become effective at the end of the then-current Subscription period.
                  </p>
                  <p>
                    The Company will provide You with reasonable prior notice of any change in Subscription fees to give You an opportunity to terminate Your Subscription before such change becomes effective.
                  </p>
                  <p>
                    Your continued use of the Service after the Subscription fee change comes into effect constitutes Your agreement to pay the modified Subscription fee amount.
                  </p>
                </SubSection>

                <SubSection title="Refunds">
                  <p>
                    Except when required by law, paid Subscription fees are non-refundable. Certain refund requests for Subscriptions may be considered by the Company on a case-by-case basis and granted at the sole discretion of the Company.
                  </p>
                </SubSection>
              </SectionCard>

              <SectionCard id="intellectual-property" title="Intellectual Property" icon={Lightbulb}>
                <p>
                  The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors.
                </p>
                <p>
                  The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.
                </p>
                <p>
                  Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.
                </p>
              </SectionCard>

              <SectionCard id="feedback" title="Your Feedback to Us" icon={MessageSquare}>
                <p>
                  You assign all rights, title and interest in any Feedback You provide the Company. If for any reason such assignment is ineffective, You agree to grant the Company a non-exclusive, perpetual, irrevocable, royalty free, worldwide right and license to use, reproduce, disclose, sub-license, distribute, modify and exploit such Feedback without restriction.
                </p>
              </SectionCard>

              <SectionCard id="links" title="Links to Other Websites" icon={Link2}>
                <p>
                  Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.
                </p>
                <p>
                  The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.
                </p>
                <p>
                  We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.
                </p>
              </SectionCard>

              <SectionCard id="termination" title="Termination" icon={XCircle}>
                <p>
                  We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
                </p>
                <p>
                  Upon termination, Your right to use the Service will cease immediately.
                </p>
              </SectionCard>

              <SectionCard id="limitation" title="Limitation of Liability" icon={AlertTriangle}>
                <p>
                  Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven&apos;t purchased anything through the Service.
                </p>
                <p>
                  To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
                </p>
                <p>
                  Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party&apos;s liability will be limited to the greatest extent permitted by law.
                </p>
              </SectionCard>

              <SectionCard id="disclaimer" title='"AS IS" and "AS AVAILABLE" Disclaimer' icon={Scale}>
                <p>
                  The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
                </p>
                <p>
                  Without limiting the foregoing, neither the Company nor any of the company&apos;s provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
                </p>
                <p>
                  Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.
                </p>
              </SectionCard>

              <SectionCard id="governing-law" title="Governing Law" icon={Globe}>
                <p>
                  The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
                </p>
              </SectionCard>

              <SectionCard id="disputes" title="Disputes Resolution" icon={Gavel}>
                <p>
                  If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
                </p>
              </SectionCard>

              <SectionCard id="eu-users" title="For European Union (EU) Users" icon={Users}>
                <p>
                  If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.
                </p>
              </SectionCard>

              <SectionCard id="us-federal" title="United States Federal Government End Use Provisions" icon={Gavel}>
                <p>
                  If You are a U.S. federal government end user, our Service is a &quot;Commercial Item&quot; as that term is defined at 48 C.F.R. §2.101.
                </p>
              </SectionCard>

              <SectionCard id="us-compliance" title="United States Legal Compliance" icon={Shield}>
                <p>
                  You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.
                </p>
              </SectionCard>

              <SectionCard id="severability" title="Severability and Waiver" icon={Scale}>
                <SubSection title="Severability">
                  <p>
                    If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
                  </p>
                </SubSection>

                <SubSection title="Waiver">
                  <p>
                    Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not effect a party&apos;s ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.
                  </p>
                </SubSection>
              </SectionCard>

              <SectionCard id="translation" title="Translation Interpretation" icon={Languages}>
                <p>
                  These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.
                </p>
              </SectionCard>

              <SectionCard id="changes" title="Changes to These Terms and Conditions" icon={RefreshCw}>
                <p>
                  We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
                </p>
                <p>
                  By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.
                </p>
              </SectionCard>

              <SectionCard id="contact" title="Contact Us" icon={Mail}>
                <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-teal-600" />
                    </div>
                    <span>
                      By email: <a href="mailto:support@sleekdentalclub.com" className="text-teal-600 hover:text-teal-700 underline">support@sleekdentalclub.com</a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4 text-teal-600" />
                    </div>
                    <span>By mail: SLEEK Dental Club, 16775 Addison Rd. Suite 605, Addison, Texas 75001</span>
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
              Ready to Transform Your Dental Care?
            </h2>
            <p className="text-gray-300 mb-8">
              Join SLEEK Dental Club today and experience premium dental care with our smart toothbrush subscription service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://enrollment.sleekdentalclub.com/onboarding"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-400 transition-colors"
              >
                View Plans
              </Link>
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                Privacy Policy
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
