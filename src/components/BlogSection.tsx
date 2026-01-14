'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

/**
 * Blog post data type definition.
 * Contains all metadata needed for blog card display.
 */
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  alt: string;
  author: string;
  date: string;
  readTime: string;
}

/**
 * BlogSection displays featured blog posts in a responsive grid.
 * Features animated cards with hover effects and lazy-loaded images.
 */
export default function BlogSection() {
  const prefersReducedMotion = useReducedMotion();
  
  // Blog posts data - would typically come from a CMS or API
  // Using slugs that match the actual blog pages in lib/blog.ts
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      slug: 'dental-emergencies-children',
      title: 'How to Handle Dental Emergencies in Children: A Parent\'s Guide',
      excerpt: 'Learn essential tips for managing common dental emergencies that can occur in children, from knocked-out teeth to severe toothaches.',
      category: 'Oral Health',
      imageUrl: '/images/blog/Dental-Emergencies-in-Children-Blog-2025.jpg',
      alt: 'Child with dental emergency',
      author: 'SLEEK Dental Team',
      date: 'March 26, 2025',
      readTime: '5 min read'
    },
    {
      id: 2,
      slug: 'charcoal-toothpaste-whitening',
      title: 'Does Charcoal Toothpaste Really Whiten Teeth? The Truth Behind the Trend',
      excerpt: 'We examine the scientific evidence behind charcoal toothpaste and whether its whitening claims stand up to scrutiny.',
      category: 'Oral Health',
      imageUrl: '/images/blog/Charcoal-Toothpaste-Blog-2025.jpg',
      alt: 'Charcoal toothpaste',
      author: 'SLEEK Dental Team',
      date: 'March 14, 2025',
      readTime: '4 min read'
    },
    {
      id: 3,
      slug: 'understanding-oral-cancer',
      title: 'Understanding Oral Cancer: Early Signs, Symptoms and Prevention',
      excerpt: 'Recognize the warning signs of oral cancer and learn about preventative measures you can take to protect your oral health.',
      category: 'Oral Health',
      imageUrl: '/images/blog/Oral-Cancer-Blog-2025.jpg',
      alt: 'Oral cancer awareness',
      author: 'SLEEK Dental Team',
      date: 'March 7, 2025',
      readTime: '5 min read'
    }
  ];

  // Track which card is being hovered for arrow animation
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.05 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 15 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.15) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="container-standard relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16"
        >
          <div>
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="section-badge"
            >
              BLOG
            </motion.span>
            
            <h2 className="section-title text-left mb-4">
              Tips and Insights
            </h2>
            <p className="text-gray-600 max-w-lg text-lg">
              Expert advice and the latest research on oral care and dental health
            </p>
          </div>
          
          <Link href="/blog" className="mt-6 md:mt-0 flex-shrink-0">
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
              }}
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.03,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </motion.div>
        
        {/* Blog cards grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article 
              key={post.id} 
              variants={cardVariants}
              className="group"
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:border-teal-200/50 hover:shadow-card-hover">
                  {/* Image container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
                    
                    <Image 
                      src={post.imageUrl}
                      alt={post.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span 
                        className="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md"
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          color: '#0f766e'
                        }}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-teal-600" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-teal-600" />
                        <span>{post.readTime}</span>
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
                          animate={{ 
                            x: hoveredCard === post.id ? 4 : 0,
                          }}
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
