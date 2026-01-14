'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

/**
 * Testimonial data structure for customer reviews.
 * Contains the quote, customer name, location, and optional highlight phrase.
 */
interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  highlight?: string;
}

/**
 * Customer testimonials from official SLEEK marketing materials.
 * These are real customer quotes showcasing different benefits of the service.
 */
const testimonials: Testimonial[] = [
  {
    id: 'mary-kate',
    quote: 'Incredibly affordable and convenient, SLEEK has helped me improve my oral health by auto-shipping my head refills every quarter. That makes one less thing I must remember to do as a busy Mom of three!',
    name: 'Mary Kate',
    location: 'Atlanta, GA',
    highlight: 'auto-shipping'
  },
  {
    id: 'oliver',
    quote: 'Having access to Teledentistry through my SLEEK Dental Club membership really came in handy when I was traveling and my crown fell off. It was good to know I could wait until the next day to see a dentist without worry.',
    name: 'Oliver',
    location: 'Salem, OH',
    highlight: 'Teledentistry'
  },
  {
    id: 'eddie',
    quote: 'One thing I enjoy about my membership is the floss picks they send every quarter. I always forget to grab these at the store and am happy when my delivery comes in the mail.',
    name: 'Eddie V.',
    location: 'Boston, MA',
    highlight: 'quarterly delivery'
  }
];

/**
 * TestimonialsSection component displays customer reviews in a grid layout.
 * Features animated reveals and a premium card design with quote styling.
 */
export default function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0.1 : 0.15,
        delayChildren: prefersReducedMotion ? 0.1 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: prefersReducedMotion ? 15 : 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.4 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-[60%] h-[50%] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.15) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="container-standard relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Section header */}
          <div className="section-header">
            <motion.span 
              variants={itemVariants}
              className="section-badge"
            >
              MEMBER TESTIMONIALS
            </motion.span>
            
            <motion.h2
              variants={itemVariants}
              className="section-title"
            >
              What Our Members Say
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="section-subtitle"
            >
              Real feedback from SLEEK Dental Club members across the country
            </motion.p>
          </div>

          {/* Testimonials grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { 
                  y: -8,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className="relative bg-white rounded-2xl p-8 shadow-card border border-gray-100 hover:shadow-card-hover hover:border-teal-200/30 transition-all duration-300"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                  <Quote className="w-5 h-5 text-teal-500" />
                </div>

                {/* Star rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 text-amber-400 fill-amber-400" 
                    />
                  ))}
                </div>

                {/* Quote text - truncated on mobile for consistent card heights */}
                <blockquote className="text-gray-700 leading-relaxed mb-6 line-clamp-4 sm:line-clamp-5 md:line-clamp-none">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
