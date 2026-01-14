'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { List } from 'lucide-react';
import { extractHeadings } from '@/lib/blog';

/**
 * Props for the TableOfContents component.
 */
interface TableOfContentsProps {
  /** HTML content string to extract headings from */
  content: string;
}

/**
 * Heading type for table of contents items.
 */
interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * TableOfContents displays a sticky sidebar navigation for blog posts.
 * Features scroll spy to highlight the current section and smooth scrolling on click.
 * Only renders on desktop viewports.
 */
export default function TableOfContents({ content }: TableOfContentsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from content
  const headings: TocHeading[] = useMemo(() => {
    return extractHeadings(content);
  }, [content]);

  // Scroll spy to track active section
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for fixed header

      // Find the current active heading
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const element = document.getElementById(heading.id);
        
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(heading.id);
          return;
        }
      }
      
      // Default to first heading if none is active
      setActiveId(headings[0]?.id || '');
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  /**
   * Handles click on a TOC item.
   * Scrolls smoothly to the target section.
   */
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  // Don't render if no headings
  if (headings.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 10 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
        delay: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="hidden xl:block sticky top-32 h-fit"
      aria-label="Table of contents"
    >
      <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
          <List className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            On This Page
          </span>
        </div>

        {/* TOC items */}
        <ul className="space-y-2">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const isH3 = heading.level === 3;

            return (
              <li key={heading.id}>
                <button
                  onClick={() => handleClick(heading.id)}
                  className={`
                    w-full text-left text-sm transition-all duration-200
                    ${isH3 ? 'pl-4' : 'pl-0'}
                    ${isActive
                      ? 'text-teal-600 font-medium'
                      : 'text-gray-600 hover:text-teal-600'
                    }
                  `}
                >
                  <span className="flex items-start gap-2">
                    {/* Active indicator */}
                    <span
                      className={`
                        flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 transition-all duration-200
                        ${isActive ? 'bg-teal-500' : 'bg-gray-300'}
                      `}
                    />
                    <span className="line-clamp-2">{heading.text}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
          className="mt-6 pt-4 border-t border-gray-100 w-full text-sm text-gray-500 hover:text-teal-600 transition-colors text-left"
        >
          Back to top
        </button>
      </div>
    </motion.nav>
  );
}
