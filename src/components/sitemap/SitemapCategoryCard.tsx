'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

/**
 * Props for the SitemapCategoryCard component.
 */
interface SitemapCategoryCardProps {
  /** The icon to display for this category */
  icon: LucideIcon;
  /** Category title */
  title: string;
  /** Short description of the category */
  description: string;
  /** Number of items in this category */
  count: number;
  /** Anchor ID to scroll to when clicked */
  anchorId: string;
  /** Optional color theme for the card accent */
  accentColor?: 'teal' | 'amber' | 'gray';
  /** Animation delay for staggered entrance */
  delay?: number;
}

/**
 * SitemapCategoryCard displays a clickable card for each sitemap category.
 * Features a premium glass-like design with hover animations and glow effects.
 * Clicking scrolls to the corresponding section on the page.
 */
export default function SitemapCategoryCard({
  icon: Icon,
  title,
  description,
  count,
  anchorId,
  accentColor = 'teal',
  delay = 0,
}: SitemapCategoryCardProps) {
  /**
   * Handles smooth scrolling to the target anchor section.
   */
  const handleClick = () => {
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Color configurations based on accent color
  const colorConfig = {
    teal: {
      iconBg: 'bg-teal-500/10',
      iconColor: 'text-teal-600',
      hoverIconBg: 'group-hover:bg-teal-500',
      countBg: 'bg-teal-50',
      countText: 'text-teal-700',
      borderHover: 'hover:border-teal-200/50',
      glow: 'group-hover:shadow-[0_8px_30px_rgba(15,118,110,0.15)]',
    },
    amber: {
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-600',
      hoverIconBg: 'group-hover:bg-amber-500',
      countBg: 'bg-amber-50',
      countText: 'text-amber-700',
      borderHover: 'hover:border-amber-200/50',
      glow: 'group-hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)]',
    },
    gray: {
      iconBg: 'bg-gray-500/10',
      iconColor: 'text-gray-600',
      hoverIconBg: 'group-hover:bg-gray-500',
      countBg: 'bg-gray-100',
      countText: 'text-gray-700',
      borderHover: 'hover:border-gray-300/50',
      glow: 'group-hover:shadow-[0_8px_30px_rgba(107,114,128,0.1)]',
    },
  };

  const colors = colorConfig[accentColor];

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative w-full text-left p-6 rounded-2xl
        bg-white border border-gray-100
        transition-all duration-300 ease-out
        ${colors.borderHover} ${colors.glow}
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        hover:shadow-xl
        focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 focus-visible:ring-offset-2
      `}
    >
      {/* Icon container with animated background */}
      <div
        className={`
          w-12 h-12 rounded-xl flex items-center justify-center mb-4
          ${colors.iconBg} ${colors.hoverIconBg}
          transition-all duration-300 ease-out
        `}
      >
        <Icon
          className={`
            w-6 h-6 ${colors.iconColor}
            group-hover:text-white
            transition-colors duration-300
          `}
        />
      </div>

      {/* Title and description */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-800">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {description}
      </p>

      {/* Count badge */}
      <div
        className={`
          inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
          ${colors.countBg} ${colors.countText}
        `}
      >
        {count} {count === 1 ? 'item' : 'items'}
      </div>

      {/* Subtle gradient overlay on hover */}
      <div
        className="
          absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
          transition-opacity duration-300 pointer-events-none
          bg-gradient-to-br from-white/50 via-transparent to-transparent
        "
      />
    </motion.button>
  );
}
