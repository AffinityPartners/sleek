'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Fragment } from 'react';

// FAQ item type
interface FaqItem {
  question: string;
  answer: string;
}

// Sample FAQ data
const faqItems: FaqItem[] = [
  {
    question: "What comes with the subscription?",
    answer: "Our subscription includes a premium sonic electric toothbrush, a USB charger, a travel case, and quarterly replacement brush heads. The brush features 5 cleaning modes, up to 3 weeks of battery life per charge, and a 2-minute smart timer. Each quarterly shipment also includes floss picks to complete your oral care routine."
  },
  {
    question: "Can I cancel or pause anytime?",
    answer: "Absolutely! You have complete control over your subscription. You can pause, cancel, or modify your plan at any time through your account dashboard or by contacting our customer support team. There are no cancellation fees or long-term commitments. We want our members to stay because they love the service, not because they're locked in."
  },
  {
    question: "Do you accept dental insurance?",
    answer: "While our subscription is not typically covered by dental insurance, many of our customers use their HSA or FSA accounts to pay for their membership. Additionally, some of our premium plans include discounts on dental services that can complement your existing insurance coverage. We're happy to provide an itemized receipt if you'd like to submit a claim to your insurance provider."
  },
  {
    question: "How often do I get new brush heads?",
    answer: "New brush heads are automatically shipped to you every 3 months, which is the recommended replacement schedule by dental professionals. Each shipment is timed perfectly so you'll always have a fresh brush head when you need it. If you need extra brush heads, you can easily add them to your subscription through your account dashboard."
  }
];

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

export default function FaqSection() {
  return (
    <section className="py-20 bg-[#f4f9f8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold text-center mb-8"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-gray-600 mb-8"
          >
            Find answers to common questions about our subscription service.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-lg font-medium text-gray-900 hover:text-[#1ab9a3] focus:outline-none focus:text-[#1ab9a3] transition-colors duration-200">
                      <span>{item.question}</span>
                      <span className="ml-6 flex-shrink-0">
                        {open ? (
                          <Minus className="h-5 w-5 text-[#1ab9a3] transition-transform duration-300" />
                        ) : (
                          <Plus className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                        )}
                      </span>
                    </Disclosure.Button>
                    
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 transform -translate-y-2"
                      enterTo="opacity-100 transform translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 transform translate-y-0"
                      leaveTo="opacity-0 transform -translate-y-2"
                    >
                      <Disclosure.Panel className="px-6 pb-6 pt-2">
                        <p className="text-base text-gray-700">{item.answer}</p>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            Still have questions? <a href="#contact" className="text-[#1ab9a3] font-medium hover:underline">Contact our support team</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
} 