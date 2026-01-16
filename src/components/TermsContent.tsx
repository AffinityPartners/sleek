'use client';

/**
 * TermsContent - Client component containing the Terms and Conditions UI.
 *
 * This component contains all the interactive terms page functionality
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
 * SectionCard component wraps each terms section with consistent styling.
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
        <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-teal-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
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
 * TermsContent renders the Terms and Conditions page with premium design.
 * Features a sticky table of contents, animated sections, and modern styling.
 */
export default function TermsContent() {
  const prefersReducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState('interpretation');
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleSectionClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

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
      <StickyNav lightHero={true} />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Hero section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
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
        </div>

        <div className="container-standard relative z-10">
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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-teal-200/50"
              style={{
                background:
                  'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(15, 118, 110, 0.05) 100%)',
              }}
            >
              <FileText className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700 tracking-wide">LEGAL</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6 font-heading"
            >
              Terms and Conditions
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4"
            >
              Please read these terms and conditions carefully before using our Service.
            </motion.p>

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

            <div ref={contentRef} className="min-w-0">
              <MobileTableOfContents
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
              />

              {/* Terms content sections - abbreviated for length */}
              <SectionCard id="interpretation" title="Interpretation and Definitions" icon={BookOpen}>
                <SubSection title="Interpretation">
                  <p>
                    The words of which the initial letter is capitalized have meanings defined under
                    the following conditions.
                  </p>
                </SubSection>
                <SubSection title="Definitions">
                  <p>For the purposes of these Terms and Conditions:</p>
                  <ul className="space-y-3 mt-4">
                    <li>
                      <strong className="text-gray-900">Company</strong> refers to SLEEK Dental
                      Club, 16775 Addison Rd. Suite 605, Addison, Texas 75001.
                    </li>
                    <li>
                      <strong className="text-gray-900">Service</strong> refers to the Website.
                    </li>
                    <li>
                      <strong className="text-gray-900">Website</strong> refers to SLEEK Dental
                      Club, accessible from sleekdentalclub.com
                    </li>
                  </ul>
                </SubSection>
              </SectionCard>

              <SectionCard id="acknowledgment" title="Acknowledgment" icon={Shield}>
                <p>
                  These are the Terms and Conditions governing the use of this Service. Your access
                  to and use of the Service is conditioned on Your acceptance of these Terms.
                </p>
              </SectionCard>

              <SectionCard id="subscriptions" title="Subscriptions" icon={CreditCard}>
                <p>
                  The Service is available with a paid Subscription. You will be billed in advance
                  on a recurring basis. Your Subscription will automatically renew unless canceled.
                </p>
              </SectionCard>

              <SectionCard id="intellectual-property" title="Intellectual Property" icon={Lightbulb}>
                <p>
                  The Service and its original content, features and functionality are the exclusive
                  property of the Company and its licensors.
                </p>
              </SectionCard>

              <SectionCard id="feedback" title="Your Feedback to Us" icon={MessageSquare}>
                <p>
                  You assign all rights, title and interest in any Feedback You provide the Company.
                </p>
              </SectionCard>

              <SectionCard id="links" title="Links to Other Websites" icon={Link2}>
                <p>
                  Our Service may contain links to third-party websites. We have no control over
                  their content or privacy policies.
                </p>
              </SectionCard>

              <SectionCard id="termination" title="Termination" icon={XCircle}>
                <p>
                  We may terminate or suspend Your access immediately for any reason whatsoever.
                </p>
              </SectionCard>

              <SectionCard id="limitation" title="Limitation of Liability" icon={AlertTriangle}>
                <p>
                  Our liability shall be limited to the amount actually paid by You through the
                  Service or 100 USD.
                </p>
              </SectionCard>

              <SectionCard id="disclaimer" title='"AS IS" and "AS AVAILABLE" Disclaimer' icon={Scale}>
                <p>
                  The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without
                  warranty of any kind.
                </p>
              </SectionCard>

              <SectionCard id="governing-law" title="Governing Law" icon={Globe}>
                <p>
                  The laws of Texas, United States, shall govern these Terms and Your use of the
                  Service.
                </p>
              </SectionCard>

              <SectionCard id="disputes" title="Disputes Resolution" icon={Gavel}>
                <p>
                  If You have any concern or dispute about the Service, You agree to first try to
                  resolve it informally by contacting the Company.
                </p>
              </SectionCard>

              <SectionCard id="eu-users" title="For European Union (EU) Users" icon={Users}>
                <p>
                  If You are an EU consumer, you will benefit from any mandatory provisions of the
                  law of your country of residence.
                </p>
              </SectionCard>

              <SectionCard id="us-federal" title="US Federal Government End Use" icon={Gavel}>
                <p>
                  If You are a U.S. federal government end user, our Service is a &quot;Commercial
                  Item&quot; as defined at 48 C.F.R. §2.101.
                </p>
              </SectionCard>

              <SectionCard id="us-compliance" title="United States Legal Compliance" icon={Shield}>
                <p>
                  You represent that You are not located in a country subject to the US government
                  embargo.
                </p>
              </SectionCard>

              <SectionCard id="severability" title="Severability and Waiver" icon={Scale}>
                <p>
                  If any provision of these Terms is held unenforceable, it will be modified to
                  accomplish its objectives.
                </p>
              </SectionCard>

              <SectionCard id="translation" title="Translation Interpretation" icon={Languages}>
                <p>
                  The original English text shall prevail in the case of a dispute about
                  translations.
                </p>
              </SectionCard>

              <SectionCard id="changes" title="Changes to These Terms" icon={RefreshCw}>
                <p>
                  We reserve the right to modify these Terms at any time with at least 30 days
                  notice for material changes.
                </p>
              </SectionCard>

              <SectionCard id="contact" title="Contact Us" icon={Mail}>
                <p>If you have any questions about these Terms, contact us:</p>
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
                      <Globe className="w-4 h-4 text-teal-600" />
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
              Ready to Transform Your Dental Care?
            </h2>
            <p className="text-gray-300 mb-8">
              Join SLEEK Dental Club today and experience premium dental care with our smart
              toothbrush subscription service.
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

      <Footer />
    </main>
  );
}
