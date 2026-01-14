'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CATEGORIES, getCategoryCounts, CategoryKey } from '@/lib/blog';

/**
 * Props for the CategoryFilter component.
 */
interface CategoryFilterProps {
  /** Total number of posts (for "All" count) */
  totalPosts: number;
}

/**
 * CategoryFilter displays a horizontal scrollable filter bar with category pills.
 * Features active state animations, post counts, and URL query param sync.
 * Allows users to filter blog posts by category.
 */
export default function CategoryFilter({ totalPosts }: CategoryFilterProps) {
  const prefersReducedMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Get current category from URL params
  const currentCategory = searchParams.get('category') as CategoryKey | null;
  
  // Get post counts per category
  const categoryCounts = getCategoryCounts();
  
  /**
   * Handles category filter click.
   * Updates URL query params for shareable filtered views.
   */
  const handleCategoryClick = (categoryKey: CategoryKey | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categoryKey === null) {
      // "All" was clicked - remove category filter
      params.delete('category');
    } else {
      params.set('category', categoryKey);
    }
    
    // Update URL without scroll
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Category color classes for active state
  const categoryColors = {
    teal: {
      active: 'bg-teal-600 text-white border-teal-600',
      hover: 'hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700',
    },
    amber: {
      active: 'bg-amber-500 text-white border-amber-500',
      hover: 'hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700',
    },
    gray: {
      active: 'bg-gray-700 text-white border-gray-700',
      hover: 'hover:bg-gray-100 hover:border-gray-300 hover:text-gray-700',
    },
  };

  // Animation variants
  const containerVariants = {
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-12"
    >
      {/* Filter container with horizontal scroll on mobile */}
      <div className="flex flex-wrap justify-center gap-3">
        {/* "All" button */}
        <motion.button
          onClick={() => handleCategoryClick(null)}
          className={`
            relative px-5 py-2.5 rounded-full text-sm font-semibold
            border transition-all duration-300
            ${currentCategory === null
              ? 'bg-teal-600 text-white border-teal-600 shadow-teal'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700'
            }
          `}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          <span className="flex items-center gap-2">
            All
            <span className={`
              px-2 py-0.5 rounded-full text-xs font-bold
              ${currentCategory === null
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-600'
              }
            `}>
              {totalPosts}
            </span>
          </span>
          
          {/* Active indicator glow */}
          {currentCategory === null && (
            <motion.div
              layoutId="categoryGlow"
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: '0 0 20px rgba(20, 184, 166, 0.4)',
              }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.button>

        {/* Category buttons */}
        {CATEGORIES.map((category) => {
          const isActive = currentCategory === category.key;
          const colors = categoryColors[category.color];
          const count = categoryCounts[category.key];

          return (
            <motion.button
              key={category.key}
              onClick={() => handleCategoryClick(category.key)}
              className={`
                relative px-5 py-2.5 rounded-full text-sm font-semibold
                border transition-all duration-300
                ${isActive
                  ? colors.active
                  : `bg-white text-gray-700 border-gray-200 ${colors.hover}`
                }
              `}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                {category.name}
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-bold
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {count}
                </span>
              </span>
              
              {/* Active indicator glow */}
              {isActive && (
                <motion.div
                  layoutId="categoryGlow"
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: category.color === 'teal'
                      ? '0 0 20px rgba(20, 184, 166, 0.4)'
                      : category.color === 'amber'
                      ? '0 0 20px rgba(245, 158, 11, 0.4)'
                      : '0 0 20px rgba(107, 114, 128, 0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Category description */}
      {currentCategory && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center text-gray-600 mt-4"
        >
          {CATEGORIES.find(c => c.key === currentCategory)?.description}
        </motion.p>
      )}
    </motion.div>
  );
}
