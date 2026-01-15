'use client';

import { motion } from 'framer-motion';
import { Map, FileText, BookOpen, Layers } from 'lucide-react';
import SitemapSearch from './SitemapSearch';
import { getAllPosts, CATEGORIES } from '@/lib/blog';

/**
 * Props for the SitemapHero component.
 */
interface SitemapHeroProps {
  /** Total number of static pages on the site */
  totalPages?: number;
  /** Optional callback when search is performed */
  onSearch?: (query: string) => void;
}

/**
 * SitemapHero displays a premium hero section for the sitemap page.
 * Features include:
 * - Gradient background with animated shapes
 * - Site statistics display (pages, posts, categories)
 * - Integrated real-time search
 * - Animated entrance effects
 */
export default function SitemapHero({
  totalPages = 15,
  onSearch,
}: SitemapHeroProps) {
  const blogPosts = getAllPosts();
  const totalPosts = blogPosts.length;
  const totalCategories = CATEGORIES.length;

  // Stats configuration for display
  const stats = [
    {
      icon: FileText,
      value: totalPages,
      label: 'Pages',
      color: 'teal',
    },
    {
      icon: BookOpen,
      value: totalPosts,
      label: 'Blog Posts',
      color: 'teal',
    },
    {
      icon: Layers,
      value: totalCategories,
      label: 'Categories',
      color: 'gray',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Teal gradient blob */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Secondary teal gradient blob */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.4) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative container-standard py-20 md:py-28 lg:py-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <Map className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-white/90">Site Navigation</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6"
          style={{ letterSpacing: '-0.02em' }}
        >
          Explore Our Site
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mx-auto mb-10"
        >
          Find everything you need to know about SLEEK Dental Club. Browse our pages, articles, and resources.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${stat.color === 'teal' ? 'bg-teal-500/20 text-teal-400' : ''}
                  ${stat.color === 'amber' ? 'bg-teal-500/20 text-teal-400' : ''}
                  ${stat.color === 'gray' ? 'bg-gray-500/20 text-gray-400' : ''}
                `}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <SitemapSearch
            onSearchResults={(results, query) => {
              if (query) onSearch?.(query);
            }}
            placeholder="Search pages, articles, and more..."
          />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
