'use client';

import { useState, useMemo, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Tag, ChevronRight, Filter } from 'lucide-react';
import { getAllPosts, CATEGORIES, TAGS, BlogPost, CategoryKey, TagKey } from '@/lib/blog';

/**
 * Props for the SitemapBlogGrid component.
 */
interface SitemapBlogGridProps {
  /** Maximum number of posts to display. Defaults to all posts. */
  maxPosts?: number;
  /** Whether to show the filter controls */
  showFilters?: boolean;
}

/**
 * Props for the BlogPostCard component.
 */
interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

/**
 * BlogPostCard displays a single blog post in a card format.
 * Uses forwardRef to properly handle refs from AnimatePresence.
 * Features image thumbnail, title, excerpt, metadata, and hover effects.
 */
const BlogPostCard = forwardRef<HTMLElement, BlogPostCardProps>(
  function BlogPostCard({ post, index }, ref) {
    const category = CATEGORIES.find(c => c.key === post.category);

    return (
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        layout
      >
        <Link
          href={`/blog/${post.slug}`}
          className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Category badge overlay */}
            <div className="absolute top-3 left-3">
              <span
                className={`
                  inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                  backdrop-blur-sm
                  ${category?.color === 'teal' ? 'bg-teal-500/90 text-white' : ''}
                  ${category?.color === 'amber' ? 'bg-amber-500/90 text-white' : ''}
                  ${category?.color === 'gray' ? 'bg-gray-700/90 text-white' : ''}
                `}
              >
                {category?.name}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime} min read
                </span>
                <span>{post.dateFormatted}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }
);

/**
 * SitemapBlogGrid displays all blog posts with filtering capabilities.
 * Features include:
 * - Category and tag filtering
 * - Animated grid with staggered entrance
 * - Responsive card layout
 * - Real-time filter updates
 */
export default function SitemapBlogGrid({
  maxPosts,
  showFilters = true,
}: SitemapBlogGridProps) {
  const allPosts = getAllPosts();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<TagKey | 'all'>('all');
  const [showTagFilter, setShowTagFilter] = useState(false);

  /**
   * Filters posts based on selected category and tag.
   */
  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    if (selectedTag !== 'all') {
      posts = posts.filter(post => post.tags.includes(selectedTag));
    }

    if (maxPosts) {
      posts = posts.slice(0, maxPosts);
    }

    return posts;
  }, [allPosts, selectedCategory, selectedTag, maxPosts]);

  /**
   * Gets the count of posts for each category.
   */
  const getCategoryCount = (categoryKey: CategoryKey | 'all') => {
    if (categoryKey === 'all') return allPosts.length;
    return allPosts.filter(post => post.category === categoryKey).length;
  };

  return (
    <div>
      {/* Filter controls */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          {/* Category tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${selectedCategory === 'all'
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              All Posts ({getCategoryCount('all')})
            </button>
            {CATEGORIES.map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${selectedCategory === category.key
                    ? category.color === 'teal'
                      ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/25'
                      : category.color === 'amber'
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                      : 'bg-gray-700 text-white shadow-lg shadow-gray-500/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {category.name} ({getCategoryCount(category.key)})
              </button>
            ))}

            {/* Tag filter toggle */}
            <button
              onClick={() => setShowTagFilter(!showTagFilter)}
              className={`
                ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200
                ${showTagFilter
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              <Filter className="w-4 h-4" />
              Tags
            </button>
          </div>

          {/* Tag filter pills */}
          <AnimatePresence>
            {showTagFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-2 py-4 border-t border-gray-100">
                  <Tag className="w-4 h-4 text-gray-400 mr-2" />
                  <button
                    onClick={() => setSelectedTag('all')}
                    className={`
                      px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                      ${selectedTag === 'all'
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }
                    `}
                  >
                    All Tags
                  </button>
                  {TAGS.map(tag => (
                    <button
                      key={tag.key}
                      onClick={() => setSelectedTag(tag.key)}
                      className={`
                        px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                        ${selectedTag === tag.key
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }
                      `}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Results count */}
      <motion.p
        key={`${selectedCategory}-${selectedTag}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-gray-500 mb-6"
      >
        Showing {filteredPosts.length} of {allPosts.length} articles
      </motion.p>

      {/* Posts grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters to find what you&apos;re looking for.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTag('all');
            }}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
