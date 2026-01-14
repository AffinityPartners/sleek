'use client';

import { motion, useReducedMotion } from 'framer-motion';
import BlogCard from './BlogCard';
import { BlogPost, getRelatedPosts } from '@/lib/blog';

/**
 * Props for the RelatedPosts component.
 */
interface RelatedPostsProps {
  /** The current post to find related content for */
  currentPost: BlogPost;
  /** Maximum number of related posts to display (default: 3) */
  maxPosts?: number;
}

/**
 * RelatedPosts displays a grid of related blog posts.
 * Uses an algorithm that prioritizes posts from the same category,
 * then by shared tags, to surface the most relevant content.
 */
export default function RelatedPosts({ currentPost, maxPosts = 3 }: RelatedPostsProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Get related posts using the algorithm
  const relatedPosts = getRelatedPosts(currentPost, maxPosts);

  // Don't render if no related posts
  if (relatedPosts.length === 0) {
    return null;
  }

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 15 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
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

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-20 pt-16 border-t border-gray-200"
    >
      {/* Section header */}
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="section-badge"
        >
          KEEP READING
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 font-heading"
        >
          Related Articles
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-gray-600 mt-3 max-w-lg mx-auto"
        >
          Continue exploring more tips and insights about oral health
        </motion.p>
      </div>

      {/* Related posts grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {relatedPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </motion.div>
    </motion.section>
  );
}
