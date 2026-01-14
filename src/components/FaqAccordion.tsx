'use client';

import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Script from 'next/script';

/**
 * FAQ item type definition for questions and answers.
 */
interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ content data based on official SLEEK marketing materials.
 * These questions cover the most common inquiries about the SLEEK Dental Club.
 */
const faqItems: FaqItem[] = [
  {
    question: 'What is SLEEK Dental Club?',
    answer: 'SLEEK Dental Club is a modern, convenient program helping members stay on top of their oral care game with a welcome kit delivered in the mail and quarterly refills auto-shipped, including a new brush head and floss picks. Choose from multiple membership levels that include dental savings or MetLife dental insurance benefits.'
  },
  {
    question: 'What is included in my welcome kit?',
    answer: 'Your welcome kit contains: a Sonic Electric Toothbrush with 5 Cleaning Modes, a Brush Head with 2-Minute Smart Timer, a Built-In Rechargeable USB Charger, a Toothbrush Holder, and a Travel Case. Everything you need to start your improved oral care routine.'
  },
  {
    question: 'When will my quarterly refills ship?',
    answer: 'Your SLEEK Dental Club plan includes auto-refills every three months. After your initial purchase, you can expect to receive your new brush head and floss pick supply after 90 days. This schedule follows the American Dental Association recommendation for replacing your brush head regularly.'
  },
  {
    question: 'How do I set up my new SLEEK toothbrush?',
    answer: 'Once your welcome kit arrives, open the package and locate the USB charger and toothbrush. After plugging your charger in, place your toothbrush flat on its surface to begin charging the device. It is recommended to charge your toothbrush fully before first use.'
  },
  {
    question: 'How do I replace my brush head?',
    answer: 'Simply hold the brush head in one hand and the device in the other. Pull the two parts gently away from each other to remove your old brush head. Place your refill on top of the device and gently push down to replace. Turn the device on to test that there is a good connection and you are all set!'
  },
  {
    question: 'What happens if my order arrives damaged?',
    answer: 'If you receive an item that is damaged, contact us for assistance at members@sleekdentalclub.com. Our support team will help resolve the issue promptly and ensure you receive a replacement.'
  },
  {
    question: 'What if I want to cancel or change my subscription?',
    answer: 'We make it easy to manage your subscription. Simply log into your member portal to pause, modify, or cancel at any time with no questions asked. You have the right to cancel within 30 days of the effective date for a full refund of fees paid. There are no contracts or cancellation fees.'
  },
  {
    question: 'How do I update my payment information?',
    answer: 'Visit your member portal to change your payment settings. You can update your credit card, billing address, and other account details at any time through your secure online account.'
  },
  {
    question: 'What are the 5 cleaning modes on the SLEEK toothbrush?',
    answer: 'The SLEEK toothbrush features 5 specialized cleaning modes: Clean (daily cleaning), Soft (first-time use or sensitive teeth), Whiten (clean and whiten for stain removal), Massage (daily gum massage for circulation), and Deep Clean (intensive deep cleaning). If used for more than 1 minute, your selected mode will be saved for next use.'
  },
  {
    question: 'How long does it take to charge the toothbrush?',
    answer: 'A full charge takes 6-10 hours via the USB connection (5V). Simply open the silicone cover in the direction of the arrow and connect to a computer or phone adapter. The charge indicator will flash while charging and stay bright when fully charged. A normal amount of heat during charging is acceptable.'
  },
  {
    question: 'How does the 2-minute smart timer work?',
    answer: 'The SLEEK toothbrush features a 2-minute smart timing guide with 30-second pause reminders to help you change brush zones. This ensures you spend the optimal amount of time cleaning each quadrant of your mouth, following dentist recommendations for thorough brushing.'
  }
];

/**
 * Creates JSON-LD structured data for SEO purposes.
 * This helps search engines understand the FAQ content.
 */
const createFaqSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
};

/**
 * AccordionItem component renders an individual FAQ item
 * with animated expand/collapse functionality.
 */
interface AccordionItemProps {
  question: string;
  answer: string;
  index: number;
  value: string;
  isOpen: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, value, index, isOpen }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <Accordion.Item 
      value={value}
      className="group"
    >
      <motion.div
        initial={false}
        className="overflow-hidden rounded-2xl bg-white border border-gray-100 transition-all duration-300 hover:border-teal-200/50"
        style={{
          boxShadow: isOpen 
            ? '0 8px 30px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(20, 184, 166, 0.1)' 
            : '0 2px 10px rgba(0, 0, 0, 0.03)'
        }}
      >
        <Accordion.Header className="flex">
          <Accordion.Trigger 
            className="flex w-full justify-between items-center px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-2xl transition-all duration-300"
          >
            <span className={`text-base md:text-lg font-semibold transition-colors duration-300 pr-4 ${
              isOpen ? 'text-teal-700' : 'text-gray-900 group-hover:text-teal-600'
            }`}>
              {question}
            </span>
            <motion.div
              initial={false}
              animate={{ 
                rotate: isOpen ? 180 : 0,
                backgroundColor: isOpen ? 'rgba(20, 184, 166, 0.1)' : 'rgba(243, 244, 246, 1)'
              }}
              transition={{ 
                duration: prefersReducedMotion ? 0.2 : 0.3,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            >
              {isOpen ? (
                <Minus className="w-4 h-4 text-teal-600" />
              ) : (
                <Plus className="w-4 h-4 text-gray-500 group-hover:text-teal-600 transition-colors" />
              )}
            </motion.div>
          </Accordion.Trigger>
        </Accordion.Header>
        
        <AnimatePresence initial={false}>
          {isOpen && (
            <Accordion.Content forceMount asChild>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.2 : 0.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="px-6 pb-6">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed pt-4">
                      {answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          )}
        </AnimatePresence>
      </motion.div>
    </Accordion.Item>
  );
};

/**
 * FaqAccordion component renders the FAQ section with
 * expandable question/answer items and structured data for SEO.
 */
export default function FaqAccordion() {
  const [activeItem, setActiveItem] = useState("item-0");
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for staggered reveal
  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 10 : 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
        delay: prefersReducedMotion ? 0 : custom * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[50%] h-[60%] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.2) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[40%] h-[50%] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.1) 0%, transparent 70%)'
          }}
        />
      </div>
      
      {/* JSON-LD structured data for SEO */}
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqSchema())}
      </Script>
      
      <div className="container-narrow relative z-10">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          custom={0}
          className="section-header"
        >
          <motion.span 
            variants={itemVariants}
            custom={0.5}
            className="section-badge"
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            custom={1}
            className="section-title"
          >
            Common Questions
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            custom={1.5}
            className="section-subtitle"
          >
            Everything you need to know about your SLEEK subscription
          </motion.p>
        </motion.div>
        
        {/* Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Accordion.Root
            type="single"
            value={activeItem}
            onValueChange={setActiveItem}
            collapsible={true}
            className="space-y-4"
          >
            {faqItems.map((item, index) => (
              <motion.div 
                key={`item-${index}`} 
                variants={itemVariants}
                custom={index + 2}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  question={item.question} 
                  answer={item.answer}
                  index={index}
                  isOpen={activeItem === `item-${index}`}
                />
              </motion.div>
            ))}
          </Accordion.Root>
        </motion.div>
        
        {/* Contact prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center p-8 md:p-10 rounded-2xl bg-white border border-gray-100 shadow-card">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 font-heading">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Our support team is here to help with any questions about your SLEEK experience.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                boxShadow: '0 4px 14px rgba(15, 118, 110, 0.3)'
              }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 8px 25px rgba(15, 118, 110, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Support
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
