'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Tag, Clock } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import React from 'react';

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Handle Dental Emergencies in Children: A Parent\'s Guide',
      excerpt: 'Learn essential tips for managing common dental emergencies that can occur in children, from knocked-out teeth to severe toothaches.',
      category: 'Oral Health',
      imageUrl: '/images/blog/Dental-Emergencies-in-Children-Blog-2025.jpg',
      alt: 'Child with dental emergency',
      author: 'Dr. Smith',
      date: 'May 15, 2023',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Does Charcoal Toothpaste Really Whiten Teeth? The Truth Behind the Trend',
      excerpt: 'We examine the scientific evidence behind charcoal toothpaste and whether its whitening claims stand up to scrutiny.',
      category: 'Oral Health',
      imageUrl: '/images/blog/Charcoal-Toothpaste-Blog-2025.jpg',
      alt: 'Charcoal toothpaste',
      author: 'Dr. Johnson',
      date: 'Apr 22, 2023',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'Understanding Oral Cancer: Early Signs, Symptoms and Prevention',
      excerpt: 'Recognize the warning signs of oral cancer and learn about preventative measures you can take to protect your oral health.',
      category: 'Oral Health',
      imageUrl: '/images/blog/Oral-Cancer-Blog-2025.jpg',
      alt: 'Oral cancer awareness',
      author: 'Dr. Williams',
      date: 'Mar 10, 2023',
      readTime: '6 min read'
    }
  ];

  // Track which card is being hovered
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Log blog posts for debugging
  React.useEffect(() => {
    console.log("Blog posts:", blogPosts);
  }, []);

  return (
    <section id="blog" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="px-4 py-1 rounded-full bg-[#1ab9a3]/10 text-[#1ab9a3] text-sm font-semibold mb-4 inline-block"
            >
              BLOG
            </motion.span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">Tips and Insights</h2>
            <p className="text-gray-600 max-w-lg">Expert advice and the latest research on oral care and dental health</p>
          </div>
          
          <Link href="/blog" className="mt-6 md:mt-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-6 py-3 bg-[#070708] text-white font-medium rounded-lg transition-all duration-300"
            >
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 opacity-70" />
            </motion.div>
          </Link>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div 
              key={post.id} 
              variants={cardVariants}
              className="bg-white rounded-xl overflow-hidden flex flex-col h-full shadow-lg border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-xl hover:border-[#1ab9a3]/20"
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative aspect-video w-full overflow-hidden border border-gray-200 rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10"></div>
                <Image 
                  src={post.imageUrl}
                  alt={post.alt}
                  width={600}
                  height={400}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  onLoad={() => console.log("Image loaded:", post.imageUrl)}
                  onError={(e) => console.error("Error loading image:", post.imageUrl, e)}
                />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1ab9a3] text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 text-[#1ab9a3] mr-1.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 text-[#1ab9a3] mr-1.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight tracking-tight line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {post.author}
                    </span>
                    
                    <Link 
                      href={`/blog/${post.id}`}
                      className="text-[#1ab9a3] hover:text-[#15a592] font-medium inline-flex items-center group"
                    >
                      <span>Read Article</span>
                      <motion.div
                        animate={{ 
                          x: hoveredCard === post.id ? 5 : 0,
                          opacity: hoveredCard === post.id ? 1 : 0.7
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 