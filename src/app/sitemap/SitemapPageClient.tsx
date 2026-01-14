'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Home,
  CreditCard,
  BookOpen,
  HeadphonesIcon,
  Scale,
  ArrowLeft,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import {
  SitemapHero,
  SitemapTree,
  SitemapBlogGrid,
  SitemapCategoryCard,
} from '@/components/sitemap';
import Footer from '@/components/Footer';
import { getAllPosts, CATEGORIES } from '@/lib/blog';

/**
 * SitemapPageClient is the main client component for the sitemap page.
 * It orchestrates all sitemap sections including:
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
      accentColor: 'amber' as const,
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
      icon: HeadphonesIcon,
      title: 'Resources',
      description: 'Help center, shipping info, and contact options',
      count: 5,
      anchorId: 'resources-section',
      accentColor: 'gray' as const,
    },
    {
      icon: Scale,
      title: 'Legal',
      description: 'Privacy policy, terms of service, and accessibility',
      count: 3,
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
    <main className="min-h-screen bg-white">
      {/* Hero Section with Search */}
      <SitemapHero totalPages={15} />

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

      {/* Back to Home Link */}
      <section className="py-8">
        <div className="container-standard">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Site Structure Tree */}
      <motion.section
        id="site-tree"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={sectionVariants}
        className="py-16 bg-gradient-to-b from-gray-50/50 to-white scroll-mt-20"
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
        className="py-16 md:py-24 scroll-mt-20"
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

      {/* Resources Section */}
      <motion.section
        id="resources-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={sectionVariants}
        className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white scroll-mt-20"
      >
        <div className="container-standard">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="section-badge">Support</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
              Resources & Help
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get the support you need with our comprehensive help resources.
            </p>
          </div>

          {/* Resources grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'About Us', href: '/about', description: 'Learn about our mission and team' },
              { title: 'Contact Us', href: '/contact', description: 'Get in touch with our support team' },
              { title: 'Help Center', href: '/help', description: 'Find answers to common questions' },
              { title: 'Shipping Information', href: '/shipping', description: 'Delivery times and policies' },
              { title: 'Returns Policy', href: '/returns', description: 'Return process and guidelines' },
              { title: 'Careers', href: '/careers', description: 'Join the SLEEK team' },
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={resource.href}
                  className="block p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-teal-200/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-500">{resource.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Contact info cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.a
              href="mailto:members@sleekdentalclub.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-4 p-6 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-teal-600 font-medium">Email Us</p>
                <p className="text-gray-900">members@sleekdentalclub.com</p>
              </div>
            </motion.a>

            <motion.a
              href="tel:18889182386"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex items-center gap-4 p-6 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-amber-600 font-medium">Call Us</p>
                <p className="text-gray-900">(888) 918-2386</p>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Location</p>
                <p className="text-gray-900">Addison, TX 75001</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Legal Section */}
      <motion.section
        id="legal-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={sectionVariants}
        className="py-16 md:py-24 scroll-mt-20"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                title: 'Privacy Policy',
                href: '/privacy',
                description: 'How we collect, use, and protect your personal information',
                icon: '🔒',
              },
              {
                title: 'Terms of Service',
                href: '/terms',
                description: 'Terms and conditions governing your use of our services',
                icon: '📄',
              },
              {
                title: 'Accessibility',
                href: '/accessibility',
                description: 'Our commitment to digital accessibility for all users',
                icon: '♿',
              },
            ].map((legal, index) => (
              <motion.div
                key={legal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={legal.href}
                  className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-4">{legal.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{legal.title}</h3>
                  <p className="text-sm text-gray-500">{legal.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
