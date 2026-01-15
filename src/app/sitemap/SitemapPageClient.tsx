'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Home,
  CreditCard,
  BookOpen,
  Scale,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Shield,
  FileText,
} from 'lucide-react';
import {
  SitemapHero,
  SitemapTree,
  SitemapBlogGrid,
  SitemapCategoryCard,
} from '@/components/sitemap';
import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import { getAllPosts, CATEGORIES } from '@/lib/blog';

/**
 * SitemapPageClient is the main client component for the sitemap page.
 * It orchestrates all sitemap sections including:
 * - Header navigation
 * - Hero with search and stats
 * - Quick navigation category cards
 * - Interactive site tree
 * - Full blog listing with filters
 * - Contact information
 * 
 * The component uses Framer Motion for scroll-triggered animations
 * and maintains the premium SLEEK design aesthetic.
 */
export default function SitemapPageClient() {
  const allPosts = getAllPosts();

  /**
   * Category card configuration for quick navigation.
   * Each card links to a specific section on the page.
   */
  const categoryCards = [
    {
      icon: Home,
      title: 'Main Pages',
      description: 'Homepage sections including plans, technology, benefits, and FAQ',
      count: 7,
      anchorId: 'site-tree',
      accentColor: 'teal' as const,
    },
    {
      icon: CreditCard,
      title: 'Membership Plans',
      description: 'OCP, PRO, and MAX membership options with pricing details',
      count: 3,
      anchorId: 'site-tree',
      accentColor: 'teal' as const,
    },
    {
      icon: BookOpen,
      title: 'Blog Articles',
      description: 'Oral health tips, product guides, and membership information',
      count: allPosts.length,
      anchorId: 'blog-section',
      accentColor: 'teal' as const,
    },
    {
      icon: Scale,
      title: 'Legal',
      description: 'Privacy policy and terms of service',
      count: 2,
      anchorId: 'legal-section',
      accentColor: 'gray' as const,
    },
  ];

  /**
   * Animation variants for staggered section reveals.
   */
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {/* Site Header */}
      <StickyNav />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section with Search */}
        <SitemapHero totalPages={4 + allPosts.length} />

        {/* Quick Navigation Cards */}
        <section className="relative -mt-8 z-10">
          <div className="container-standard">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categoryCards.map((card, index) => (
                <SitemapCategoryCard
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  count={card.count}
                  anchorId={card.anchorId}
                  accentColor={card.accentColor}
                  delay={0.1 + index * 0.05}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Site Structure Tree */}
        <motion.section
          id="site-tree"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
          className="py-20 md:py-28 bg-gradient-to-b from-gray-50/50 to-white scroll-mt-20"
        >
          <div className="container-standard">
            {/* Section header */}
            <div className="text-center mb-12">
              <span className="section-badge">Navigation</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                Site Structure
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our complete site hierarchy. Click on folders to expand and discover all available pages.
              </p>
            </div>

            {/* Tree component */}
            <div className="max-w-3xl mx-auto">
              <SitemapTree showDescriptions />
            </div>
          </div>
        </motion.section>

        {/* Blog Articles Section */}
        <motion.section
          id="blog-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
          className="py-20 md:py-28 scroll-mt-20"
        >
          <div className="container-standard">
            {/* Section header */}
            <div className="text-center mb-12">
              <span className="section-badge">Content Library</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                Blog Articles
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse our complete collection of oral health articles, membership guides, and product information.
              </p>
            </div>

            {/* Blog grid with filters */}
            <SitemapBlogGrid showFilters />

            {/* Link to full blog */}
            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="btn-primary inline-flex items-center gap-2"
              >
                Visit Blog
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
          className="py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 scroll-mt-20 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
              style={{
                background: 'radial-gradient(circle, rgba(20, 184, 166, 0.6) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10"
              style={{
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />
          </div>

          <div className="container-standard relative z-10">
            {/* Section header */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold mb-6 tracking-wide uppercase bg-white/10 text-teal-400 border border-white/10">
                Contact
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Have questions? Our team is here to help.
              </p>
            </div>

            {/* Contact info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <motion.a
                href="mailto:members@sleekdentalclub.com"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/20 hover:border-teal-400/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-teal-400 font-medium mb-0.5">Email Us</p>
                  <p className="text-white font-medium truncate">members@sleekdentalclub.com</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:18889182386"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/20 hover:border-teal-400/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-teal-400 font-medium mb-0.5">Call Us</p>
                  <p className="text-white font-medium">(888) 918-2386</p>
                </div>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-600 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-0.5">Location</p>
                  <p className="text-white font-medium">Addison, TX 75001</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Legal Section - Redesigned */}
        <motion.section
          id="legal-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionVariants}
          className="py-20 md:py-28 scroll-mt-20"
        >
          <div className="container-standard">
            {/* Section header */}
            <div className="text-center mb-12">
              <span className="section-badge">Legal</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                Legal Information
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Important legal documents and policies for your reference.
              </p>
            </div>

            {/* Legal links grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href="/privacy"
                  className="group flex items-start gap-5 p-6 bg-white rounded-2xl border border-gray-100 hover:border-teal-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-500 transition-colors duration-300">
                    <Shield className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg group-hover:text-teal-700 transition-colors">
                      Privacy Policy
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      How we collect, use, and protect your personal information
                    </p>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Link
                  href="/terms"
                  className="group flex items-start gap-5 p-6 bg-white rounded-2xl border border-gray-100 hover:border-teal-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-500 transition-colors duration-300">
                    <FileText className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg group-hover:text-teal-700 transition-colors">
                      Terms of Service
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Terms and conditions governing your use of our services
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Back to top button */}
            <div className="text-center mt-16">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-colors font-medium"
              >
                <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Back to Top
              </button>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
