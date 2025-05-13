'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, PlusCircle, ChevronUp } from 'lucide-react';
import Script from 'next/script';

// Type definitions
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  category: string;
  questions: FaqItem[];
}

// FAQ content with categories
const faqItems: FaqCategory[] = [
  {
    category: 'About SLEEK',
    questions: [
      {
        question: 'What is SLEEK Dental Club and What Do I Receive with Membership?',
        answer: 'SLEEK Dental Club is a modern, convenient oral care program offering four dental benefit membership levels to choose from. Each qualifying member receives an introductory oral care kit that includes a SLEEK sonic electric toothbrush, carrying case, USB charger, toothbrush holder and traveling case. Quarterly auto-shipped toothbrush heads and floss picks are included with each membership. Additionally, members who join the Premier Business Association (PBA) have access to dental insurance underwritten by Metropolitan Life Insurance Company as part of their enrollment into the association.'
      },
      {
        question: 'How many kits and quarterly refills are included in my membership?',
        answer: 'Each SLEEK Dental Club membership includes the following welcome kit(s):\nMember receives: 1\nMember plus spouse: 2\nMember plus child: 1\nMember plus family: 2\nAdditional quarterly refills for each qualifying member includes a new brush head and floss picks.'
      },
      {
        question: 'What is the Premier Business Association?',
        answer: 'The PBA is a non-profit organization that offers small businesses, the self-employed, independent contractors, and entrepreneurs ages 18 and over access to quality benefits on business, health and even consumer products and services.'
      },
      {
        question: 'How do I look up providers and access my benefits?',
        answer: 'Members can search for providers and learn how to utilize each benefit included in their membership by logging into their member portal 24 hours a day, 7 days a week.'
      },
      {
        question: 'What are Byte invisible aligners?',
        answer: 'Invisible aligners are these amazing, totally clear plastic devices custom made to fit your teeth. They gradually shift your teeth so that they\'re straight and your smile looks great.'
      },
      {
        question: 'What is teledentistry?',
        answer: 'Teledentistry provides virtual online dental consultations to help with oral health issues related to dental emergencies, pediatric dentistry, general questions related to dental products, and other oral health concerns.'
      }
    ]
  }
];

// Framer Motion variants
const accordionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.04, 0.62, 0.23, 0.98],
    }
  }
};

// Create JSON-LD structured data for SEO
const createFaqSchema = () => {
  const faqs = faqItems.flatMap(category => 
    category.questions.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  };
};

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.04, 0.62, 0.23, 0.98]
    }
  }
};

// Legal disclaimers content
const legalDisclaimers = [
  {
    title: "OCP Plan Disclosure",
    content: "Dental, Teledentist and Pharmacy Disclosure. This plan is NOT insurance. This plan is not a qualified health plan under the Affordable Care Act (ACA). Some services may be covered by a qualified health plan under the ACA. This plan does not meet the minimum creditable coverage requirements under M.G.L. c. 111M and 956 CMR 5.00. The plan provides discounts at certain health care providers of medical services. The plan does not make payments directly to the providers of medical services. The plan member is obligated to pay for all health care services but will receive a discount from those health care providers who have contracted with the discount plan organization. The range of discounts will vary depending on the provider type and services provided. This benefit is not available to residents of Vermont. This is not Insurance."
  },
  {
    title: "MetLife Plan Disclosure (PRO & MAX)",
    content: "Like most insurance policies, insurance policies offered by MetLife and its affiliates contain certain exclusions, exceptions, waiting periods, reductions, limitations, and terms for keeping them in force. Please contact MetLife for complete details about costs and coverage. Group dental insurance policies featuring the MetLife PDP Plus Network are underwritten by Metropolitan Life Insurance Company, 200 Park Avenue, New York, NY 10166."
  },
  {
    title: "General Disclaimer",
    content: "SLEEK Dental Club is not an insurance company. Plan availability varies by state. Please see plan details for limitations and exclusions. In certain states, SLEEK membership plans that include insurance benefits may be offered through licensed affiliate partners. Costs of dental procedures may vary based on location, provider, and specific treatment needed. Savings calculations are based on average costs and may vary."
  }
];

export default function FaqAccordion() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState('About SLEEK');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [legalDisclosureOpen, setLegalDisclosureOpen] = useState(false);
  
  const toggleItem = (category: string, index: number) => {
    const itemKey = `${category}-${index}`;
    setOpenItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };
  
  const isOpen = (category: string, index: number): boolean => {
    const itemKey = `${category}-${index}`;
    return !!openItems[itemKey];
  };
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  // Filter questions based on search query
  const filteredFaqItems = faqItems.map(category => ({
    ...category,
    questions: category.questions.filter(item => 
      searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <section id="faq" className="py-24 relative bg-gray-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#00e0cb]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-[#5cbbff]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-[0.02]"></div>
      </div>
      
      {/* JSON-LD structured data */}
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(createFaqSchema())}
      </Script>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={accordionVariants}
          className="text-center mb-16"
        >
          <motion.span 
            variants={accordionVariants}
            className="inline-block px-4 py-1 rounded-full bg-[#00e0cb]/10 text-[#00e0cb] text-sm font-medium mb-4"
          >
            Frequently Asked Questions
          </motion.span>
          
          <motion.h2 
            variants={accordionVariants}
            className="text-4xl font-bold leading-tight mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p 
            variants={accordionVariants}
            className="text-base font-normal leading-normal text-gray-600 max-w-2xl mx-auto"
          >
            Everything you need to know about SLEEK Dental Club membership
          </motion.p>
        </motion.div>
        
        {/* Search bar */}
        <div className="mb-10">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#00e0cb] focus:outline-none focus:ring-1 focus:ring-[#00e0cb] transition-colors"
            />
          </div>
        </div>
        
        {searchQuery === '' && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {faqItems.map(category => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.category
                    ? 'bg-[#00e0cb]/10 text-[#00e0cb]'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-6">
          {(searchQuery === '' 
            ? faqItems.filter(category => category.category === activeCategory) 
            : filteredFaqItems
          ).map((category) => (
            <div key={category.category} className="space-y-4">
              {searchQuery !== '' && (
                <h3 className="text-lg font-bold text-gray-700 mb-2">{category.category}</h3>
              )}
              
              {category.questions.map((item, index) => (
                <motion.div
                  key={`${category.category}-${index}`}
                  initial={false}
                  animate={{ 
                    borderColor: isOpen(category.category, index) ? '#00e0cb' : '#e5e7eb'
                  }}
                  className="bg-white rounded-xl border shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(category.category, index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                  >
                    <span className="font-medium text-gray-900">{item.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen(category.category, index) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className={`h-5 w-5 transition-colors ${
                        isOpen(category.category, index) ? 'text-[#00e0cb]' : 'text-gray-500'
                      }`} />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen(category.category, index) && (
                      <motion.div
                        key={`answer-${category.category}-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-4 text-base font-normal leading-normal text-gray-600">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#00e0cb]/10 text-[#00e0cb]">
            <PlusCircle size={24} />
          </div>
          <h3 className="text-2xl font-semibold leading-snug mb-2">Still have questions?</h3>
          <p className="text-base font-normal leading-normal text-gray-600 mb-6">Our team is here to help. We're just a message away.</p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00e0cb] to-[#5cbbff] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Contact Support
          </a>
        </motion.div>
        
        {/* Legal disclaimers section */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Legal Disclosures</h3>
            <button 
              onClick={() => setLegalDisclosureOpen(!legalDisclosureOpen)}
              className="text-[#00e0cb] text-sm font-medium flex items-center"
            >
              {legalDisclosureOpen ? 'Hide Details' : 'View Details'}
              {legalDisclosureOpen ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
            </button>
          </div>
          
          <AnimatePresence>
            {legalDisclosureOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border rounded-xl p-5 bg-gray-50"
              >
                <div className="space-y-6">
                  {legalDisclaimers.map((disclaimer, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-700 mb-2">{disclaimer.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{disclaimer.content}</p>
                    </div>
                  ))}
                  
                  <p className="text-xs text-gray-500 italic mt-4">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!legalDisclosureOpen && (
            <p className="text-sm text-gray-500">
              SLEEK Dental Club is not an insurance company. Plan availability varies by state. The OCP plan is NOT insurance. The PRO and MAX plans are underwritten by MetLife. Please view full legal disclosures for complete details.
            </p>
          )}
        </div>
      </div>
    </section>
  );
} 