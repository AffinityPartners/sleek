'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { BlogPost, CATEGORY_MAP } from '@/lib/blog';

/**
 * Props for the BlogCard component.
 */
interface BlogCardProps {
  /** The blog post data to display */
  post: BlogPost;
  /** Whether this is a featured/large card variant */
  featured?: boolean;
  /** Animation delay for staggered reveals */
  index?: number;
}

/**
 * BlogCard displays a blog post preview in a card format.
 * Features animated hover effects, category badges, and meta information.
 * Supports both regular and featured (larger) variants.
 */
export default function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  
  // Get category info for color coding
  const category = CATEGORY_MAP[post.category];
  
  // Category color classes based on category type
  const categoryColors = {
    teal: 'bg-teal-50 text-teal-700 border-teal-200/50',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/50',
    gray: 'bg-gray-100 text-gray-700 border-gray-200/50',
  };
  
  // Animation variants for card reveal
  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 15 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Featured card variant renders a larger horizontal layout
  if (featured) {
    return (
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300 hover:border-teal-200/50 hover:shadow-card-hover">
            {/* Featured image */}
            <div className="relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Category badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${categoryColors[category.color]}`}>
                  {category.name}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              {/* Meta info */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>{post.dateFormatted}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
              
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-teal-700 transition-colors duration-300 font-heading">
                {post.title}
              </h2>
              
              {/* Excerpt */}
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              
              {/* Read more link */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-700">
                  By {post.author}
                </span>
                
                <span className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm">
                  Read Article
                  <motion.span
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Standard card variant
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:border-teal-200/50 hover:shadow-card-hover">
          {/* Image container */}
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
            
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            
            {/* Category badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${categoryColors[category.color]}`}>
                {category.name}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>{post.dateFormatted}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors duration-300">
              {post.title}
            </h3>
            
            {/* Excerpt */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
              {post.excerpt}
            </p>
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm font-medium text-gray-700">
                {post.author}
              </span>
              
              <span className="inline-flex items-center gap-2 text-teal-600 font-medium text-sm">
                Read Article
                <motion.span
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
