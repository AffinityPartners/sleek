'use client';

import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, MinusCircle } from 'lucide-react';
import Script from 'next/script';

// Type definitions
interface FaqItem {
  question: string;
  answer: string;
}

// FAQ content
const faqItems: FaqItem[] = [
  {
    question: 'How does the SLEEK toothbrush subscription work?',
    answer: 'Our subscription is simple: you receive a premium SLEEK sonic toothbrush when you join, followed by automatic quarterly brush head replacements delivered to your door. Choose from our range of plans to find the perfect option for your needs. You can pause, modify, or cancel your subscription anytime.'
  },
  {
    question: 'What makes SLEEK toothbrushes different from other electric toothbrushes?',
    answer: 'SLEEK toothbrushes combine cutting-edge technology with elegant design. Our brushes feature advanced sonic technology with 40,000 vibrations per minute, smart timers for optimal brushing duration, zone detection for complete coverage, and specialized polishing cups for stain removal – all in a sleek, minimalist design that looks beautiful in any bathroom.'
  },
  {
    question: 'How long does the battery last on a single charge?',
    answer: 'The SLEEK toothbrush battery lasts for up to 30 days on a single charge with regular use (twice daily for two minutes). Our included USB-C charger allows for fast charging when needed, typically reaching full capacity in just 4 hours.'
  },
  {
    question: 'Are replacement brush heads included in my subscription?',
    answer: 'Yes! All SLEEK subscriptions include quarterly brush head replacements delivered automatically. This ensures optimal cleaning performance and hygiene, as dental professionals recommend replacing your brush head every 3 months. Each delivery also includes our premium floss picks at no additional cost.'
  },
  {
    question: 'What if I want to cancel or change my subscription?',
    answer: 'We make it easy to manage your subscription. Simply log into your account to pause, modify, or cancel at any time with no questions asked. You can also contact our customer support team for assistance. There are no contracts or cancellation fees.'
  }
];

// Create JSON-LD structured data for SEO
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

// Animation variants
const accordionItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.1,
      ease: [0.04, 0.62, 0.23, 0.98]
    }
  })
};

// Content animation variants
const contentVariants = {
  open: { 
    opacity: 1, 
    height: 'auto',
    transition: { 
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98] 
    } 
  },
  closed: { 
    opacity: 0, 
    height: 0,
    transition: { 
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98] 
    } 
  }
};

interface AccordionItemProps {
  question: string;
  answer: string;
  index: number;
  value: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, value, index }) => {
  const [open, setOpen] = useState(index === 0);
  
  return (
    <Accordion.Item 
      value={value}
      className="mt-4 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300"
    >
      <motion.div
        initial={false}
        animate={{ 
          borderColor: open ? '#0d9488' : 'transparent',
          backgroundColor: open ? 'rgba(20, 184, 166, 0.04)' : 'white'
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden rounded-xl"
      >
        <Accordion.Header className="flex">
          <Accordion.Trigger 
            className="group flex w-full justify-between items-center px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 transition-all duration-300"
            onClick={() => setOpen(!open)}
          >
            <span className={`text-base md:text-lg font-medium transition-colors duration-300 font-heading ${open ? 'text-teal-600' : 'text-gray-900'}`}>
              {question}
            </span>
            <motion.div
              initial={false}
              animate={{ 
                rotate: open ? 180 : 0,
                scale: open ? 1.1 : 1,
                color: open ? '#0d9488' : '#94a3b8'
              }}
              transition={{ 
                duration: 0.4, 
                ease: [0.04, 0.62, 0.23, 0.98]
              }}
              className="flex items-center justify-center ml-4 flex-shrink-0"
            >
              {open ? 
                <MinusCircle className="h-5 w-5" /> : 
                <PlusCircle className="h-5 w-5" />
              }
            </motion.div>
          </Accordion.Trigger>
        </Accordion.Header>
        
        <Accordion.Content>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={contentVariants}
              >
                <div className="px-6 pb-6 pt-0">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="pt-4 border-t border-teal-500/10"
                  >
                    <p className="text-gray-700 leading-relaxed">{answer}</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Accordion.Content>
      </motion.div>
    </Accordion.Item>
  );
};

export default function FaqAccordion() {
  const [activeItem, setActiveItem] = useState("item-0");

  return (
    <section className="section-padding bg-section-light relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-teal-50/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-teal-50/40 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      {/* JSON-LD structured data */}
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqSchema())}
      </Script>
      
      <div className="container-tight relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={accordionItemVariants}
          custom={0}
          className="section-header"
        >
          <motion.span 
            variants={accordionItemVariants}
            custom={0.5}
            className="section-badge"
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.span>
          
          <motion.h2 
            variants={accordionItemVariants}
            custom={1}
            className="section-title"
          >
            Common Questions
          </motion.h2>
          
          <motion.p 
            variants={accordionItemVariants}
            custom={1.5}
            className="section-subtitle"
          >
            Everything you need to know about your SLEEK subscription
          </motion.p>
        </motion.div>
        
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
            className="space-y-6"
          >
            {faqItems.map((item, index) => (
              <motion.div 
                key={`item-${index}`} 
                variants={accordionItemVariants}
                custom={index + 2}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  question={item.question} 
                  answer={item.answer}
                  index={index}
                />
              </motion.div>
            ))}
          </Accordion.Root>
        </motion.div>
        
        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center p-8 md:p-10 rounded-2xl bg-white shadow-xl border border-gray-100"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 font-heading">Still have questions?</h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">Our support team is here to help with any questions about your SLEEK experience.</p>
          <motion.a
            href="#contact"
            className="btn-primary-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 25px -5px rgba(20, 184, 166, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Support
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 