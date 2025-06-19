"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  CalendarX, 
  Sparkles, 
  PiggyBank, 
  Clock, 
  Smile 
} from 'lucide-react';

// Define the type for a membership benefit
interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Array of membership benefits
const benefits: Benefit[] = [
  {
    id: 'free-shipping',
    title: 'Free Shipping',
    description: 'Get your replacement brush heads delivered to your door at no extra cost, exactly when you need them.',
    icon: <Truck className="w-6 h-6 text-[#1ab9a3]" />
  },
  {
    id: 'cancel-anytime',
    title: 'Cancel Anytime',
    description: 'No long-term commitments. Pause or cancel your subscription whenever you want with zero hassle.',
    icon: <CalendarX className="w-6 h-6 text-[#1ab9a3]" />
  },
  {
    id: 'dentist-approved',
    title: 'Dentist Approved',
    description: 'Our brushes are designed with and endorsed by leading dental professionals for optimal oral care.',
    icon: <Sparkles className="w-6 h-6 text-[#1ab9a3]" />
  },
  {
    id: 'save-money',
    title: 'Save Money',
    description: 'Subscription members save up to 30% compared to retail prices. Smarter brushing, smarter spending.',
    icon: <PiggyBank className="w-6 h-6 text-[#1ab9a3]" />
  },
  {
    id: 'convenience',
    title: 'Ultimate Convenience',
    description: 'Never worry about forgetting to replace your brush head again. We handle the schedule for you.',
    icon: <Clock className="w-6 h-6 text-[#1ab9a3]" />
  },
  {
    id: 'healthier-smile',
    title: 'Healthier Smile',
    description: 'Regular brush head replacements mean more effective cleaning and better oral health outcomes.',
    icon: <Smile className="w-6 h-6 text-[#1ab9a3]" />
  }
];

const MembershipBenefits = () => {
  // Animation variants for staggered reveal
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
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#070708]">
            The SLEEK Membership Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of members who enjoy these exclusive benefits with their SLEEK subscription.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md hover:-translate-y-1"
              variants={itemVariants}
            >
              <div className="w-12 h-12 rounded-full bg-[#dbe7ed] flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipBenefits; 