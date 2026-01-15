'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Twitter, 
  Linkedin, 
  Link2, 
  Check,
  ChevronRight,
} from 'lucide-react';
import Script from 'next/script';

import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import { BlogContent, TableOfContents, RelatedPosts } from '@/components/blog';
import { BlogPost, CATEGORY_MAP, TAG_MAP } from '@/lib/blog';

/**
 * Props for the BlogPostClient component.
 */
interface BlogPostClientProps {
  post: BlogPost;
}

/**
 * Creates JSON-LD structured data for the blog post.
 * Helps search engines understand the article content.
 */
function createArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'image': `https://sleekdentalclub.com${post.image}`,
    'datePublished': post.date,
    'dateModified': post.date,
    'author': {
      '@type': 'Person',
      'name': post.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'SLEEK Dental Club',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://sleekdentalclub.com/images/logo.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://sleekdentalclub.com/blog/${post.slug}`,
    },
    'articleSection': CATEGORY_MAP[post.category].name,
    'keywords': post.tags.map((tag) => TAG_MAP[tag].name).join(', '),
  };
}

/**
 * BlogPostClient is the client component for individual blog post pages.
 * Features a hero image, breadcrumb navigation, table of contents,
 * article content, tags, social sharing, and related posts.
 */
export default function BlogPostClient({ post }: BlogPostClientProps) {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const category = CATEGORY_MAP[post.category];

  // Category color classes
  const categoryColors = {
    teal: 'bg-teal-500 text-white',
    amber: 'bg-teal-500 text-white',
    gray: 'bg-gray-700 text-white',
  };

  // Tag color classes
  const tagColors = {
    teal: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
    amber: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
    gray: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100',
  };

  /**
   * Handles copying the article URL to clipboard.
   */
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  /**
   * Opens a share dialog for Twitter.
   */
  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  /**
   * Opens a share dialog for LinkedIn.
   */
  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <main className="relative min-h-screen bg-white">
      {/* Sticky navigation */}
      <StickyNav lightHero={true} />

      {/* Hero section with featured image */}
      <section className="relative pt-24 pb-0">
        {/* Breadcrumb navigation */}
        <div className="container-standard mb-6">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-gray-500"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-teal-600 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">
              {post.title}
            </span>
          </motion.nav>
        </div>

        {/* Back link */}
        <div className="container-standard mb-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </motion.div>
        </div>

        {/* Hero image and title */}
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="container-standard"
        >
          <div className="relative rounded-3xl overflow-hidden mb-10">
            {/* Image with gradient overlay */}
            <div className="relative aspect-[21/9] md:aspect-[3/1]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              
              {/* Content overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-10 lg:p-12">
                {/* Category badge */}
                <div className="mb-4">
                  <Link
                    href={`/blog?category=${post.category}`}
                    className={`inline-flex px-4 py-1.5 rounded-full text-sm font-semibold ${categoryColors[category.color]} hover:opacity-90 transition-opacity`}
                  >
                    {category.name}
                  </Link>
                </div>
                
                {/* Title */}
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 font-heading max-w-4xl">
                  {post.title}
                </h1>
                
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-sm font-semibold">{post.author[0]}</span>
                    </div>
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{post.dateFormatted}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Article content section */}
      <section className="pb-20">
        <div className="container-standard">
          <div className="grid xl:grid-cols-[1fr_280px] gap-12">
            {/* Main content column */}
            <div className="min-w-0">
              {/* Article content */}
              <BlogContent content={post.content} />

              {/* Tags section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Tagged Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tagKey) => {
                    const tag = TAG_MAP[tagKey];
                    return (
                      <Link
                        key={tagKey}
                        href={`/blog?tag=${tagKey}`}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${tagColors[category.color]}`}
                      >
                        {tag.name}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>

              {/* Share section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-8 pt-8 border-t border-gray-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      Share this article
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={shareOnTwitter}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={shareOnLinkedIn}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#0A66C2] hover:text-white transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        copied
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-teal-100 hover:text-teal-600'
                      }`}
                      aria-label="Copy link"
                    >
                      {copied ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Link2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Author card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-white">{post.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm text-teal-600 font-medium mb-1">Written by</p>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{post.author}</h4>
                    <p className="text-gray-600 text-sm">
                      A dental health expert at SLEEK Dental Club, sharing insights and tips to help you achieve your best smile.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Related posts */}
              <RelatedPosts currentPost={post} />
            </div>

            {/* Sidebar - Table of Contents */}
            <aside className="hidden xl:block">
              <TableOfContents content={post.content} />
            </aside>
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
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
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
              Take Control of Your Dental Health
            </h2>
            <p className="text-gray-300 mb-8">
              Join SLEEK Dental Club today and get a premium smart toothbrush kit with dental coverage that fits your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://enrollment.sleekdentalclub.com/onboarding"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-400 transition-colors"
              >
                View Plans
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                More Articles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <Script id="article-schema" type="application/ld+json">
        {JSON.stringify(createArticleSchema(post))}
      </Script>

      {/* Footer */}
      <Footer />
    </main>
  );
}
