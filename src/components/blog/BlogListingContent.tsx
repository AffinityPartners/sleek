'use client';

/**
 * BlogListingContent - Client component for blog listing page UI.
 *
 * This component contains all the interactive blog listing functionality while
 * allowing the page.tsx to be a server component that can export metadata for SEO.
 * Handles category filtering, search params, and animations.
 */

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import { BlogHero, BlogCard, CategoryFilter } from '@/components/blog';
import { getAllPosts, getPostsByCategory, CategoryKey, BlogPost } from '@/lib/blog';

/**
 * BlogListContent handles the filtered blog grid display.
 * Separated to use Suspense for searchParams.
 */
function BlogListContent() {
  const prefersReducedMotion = useReducedMotion();
  const searchParams = useSearchParams();

  // Get current category filter from URL
  const categoryFilter = searchParams.get('category') as CategoryKey | null;

  // Get all posts or filtered by category
  const allPosts = getAllPosts();
  const filteredPosts = useMemo(() => {
    if (categoryFilter) {
      return getPostsByCategory(categoryFilter);
    }
    return allPosts;
  }, [categoryFilter, allPosts]);

  // Featured post is the most recent one
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  // Animation variants for grid
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.05 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  return (
    <>
      {/* Category filter */}
      <CategoryFilter totalPosts={allPosts.length} />

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600 mb-6">
            Try selecting a different category to find what you&apos;re looking for.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}

      {/* Featured post */}
      {featuredPost && (
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="section-badge">Featured Article</span>
          </motion.div>
          <BlogCard post={featuredPost} featured index={0} />
        </section>
      )}

      {/* Blog grid */}
      {remainingPosts.length > 0 && (
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 font-heading">
              {categoryFilter ? 'More Articles' : 'Latest Articles'}
            </h2>
            <span className="text-sm text-gray-500">
              {remainingPosts.length} article{remainingPosts.length !== 1 ? 's' : ''}
            </span>
          </motion.div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {remainingPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index + 1} />
            ))}
          </motion.div>
        </section>
      )}
    </>
  );
}

/**
 * BlogListingContent is the main client component for the blog listing page.
 * Features a hero section, category filtering, featured post spotlight,
 * and a responsive grid of blog post cards.
 */
export default function BlogListingContent() {
  const allPosts = getAllPosts();

  return (
    <main className="relative min-h-screen bg-white">
      {/* Sticky navigation */}
      <StickyNav lightHero={true} />

      {/* Hero section */}
      <BlogHero postCount={allPosts.length} />

      {/* Main content */}
      <section className="section-padding-sm bg-section-light">
        <div className="container-standard">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
              </div>
            }
          >
            <BlogListContent />
          </Suspense>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-teal-700 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
              Ready to Improve Your Oral Health?
            </h2>
            <p className="text-teal-100 text-lg mb-8">
              Join SLEEK Dental Club today and get premium dental care with our smart toothbrush kit
              delivered to your door.
            </p>
            <Link
              href="https://enrollment.sleekdentalclub.com/onboarding"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-teal-700 font-semibold text-lg hover:bg-teal-50 transition-colors shadow-lg"
            >
              Explore Our Plans
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
