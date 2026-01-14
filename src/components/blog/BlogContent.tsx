'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { addHeadingIds } from '@/lib/blog';

/**
 * Props for the BlogContent component.
 */
interface BlogContentProps {
  /** HTML content string to render */
  content: string;
}

/**
 * BlogContent renders the blog post content with proper styling.
 * Processes HTML content to add heading IDs for anchor navigation,
 * and applies the Tailwind Typography prose classes for rich formatting.
 */
export default function BlogContent({ content }: BlogContentProps) {
  const prefersReducedMotion = useReducedMotion();

  // Process content to add heading IDs for table of contents
  const processedContent = useMemo(() => {
    return addHeadingIds(content);
  }, [content]);

  // Animation variants for content reveal
  const contentVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.article
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      className="prose prose-lg max-w-none
        prose-headings:font-heading prose-headings:text-gray-900 prose-headings:scroll-mt-24
        prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:font-bold
        prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-semibold
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
        prose-a:text-teal-600 prose-a:font-medium prose-a:no-underline hover:prose-a:text-teal-700 hover:prose-a:underline
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-ul:my-6 prose-ul:space-y-2
        prose-ol:my-6 prose-ol:space-y-2
        prose-li:text-gray-700 prose-li:leading-relaxed
        prose-li:marker:text-teal-500
        prose-blockquote:border-l-4 prose-blockquote:border-teal-400 prose-blockquote:bg-teal-50/50
        prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
        prose-blockquote:not-italic prose-blockquote:text-gray-700
        prose-code:text-teal-700 prose-code:bg-teal-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-code:before:content-none prose-code:after:content-none
        prose-hr:border-gray-200 prose-hr:my-10
      "
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
