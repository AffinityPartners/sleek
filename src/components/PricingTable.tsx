'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Sparkles, Shield, Info, X } from 'lucide-react';

// --- Framer Motion Variants ---
const viewport = { once: true, margin: '-100px' };

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.6, -0.05, 0.01, 0.99] }
  }
});

const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

// --- Plan Data ---
const plans = [
  {
    id: 'ocp',
    name: 'OCP',
    subtitle: 'Aetna Dental Access®',
    price: '29',
    priceSuffix: '95',
    priceNote: 'Starting',
    enrollmentFee: '$25 One-time Enrollment',
    mainBenefit: 'Save 15-50% on Dental Care*',
    features: [
      { label: 'Aetna Dental Access® Network¹', included: true },
      { label: 'SLEEK Electronic Toothbrush Kit¹', included: true },
      { label: 'Quarterly Oral Care Refills¹', included: true },
      { label: 'Discount Rx Benefits¹', included: true },
      { label: 'Teledentistry¹', included: true },
      { label: 'Byte Impression Kit Discount¹', included: true }
    ],
    planInfoLink: '#',
    providerInfoLink: '#',
    color: '#00e0cb',
    secondaryColor: '#ebfbfa',
    isHighlighted: false,
    additionalInfo: []
  },
  {
    id: 'pro',
    name: 'PRO',
    subtitle: 'Underwritten by MetLife',
    price: '56',
    priceSuffix: '95',
    priceNote: 'Starting',
    enrollmentFee: '$25 One-time Enrollment',
    mainBenefit: '80 / 60 / 50 Co-Insurance',
    benefitNote: 'Increasing Annual Max per Year (Through Year 3)',
    networkInfo: 'MetLife PDP Plus Network',
    features: [
      { label: 'SLEEK Electronic Toothbrush Kit¹', included: true },
      { label: 'Quarterly Oral Care Refills¹', included: true },
      { label: 'Teledentistry¹', included: true },
      { label: 'Discount Rx Benefits¹', included: true },
      { label: 'Association Benefits¹', included: true },
      { label: 'Byte Impression Kit Discount¹', included: true }
    ],
    planInfoLink: '#',
    providerInfoLink: '#',
    color: '#5cbbff',
    secondaryColor: '#ebf3fb',
    isHighlighted: true,
    additionalInfo: []
  },
  {
    id: 'max',
    name: 'MAX',
    subtitle: 'Underwritten by MetLife',
    price: '64',
    priceSuffix: '95',
    priceNote: 'Starting',
    enrollmentFee: '$25 One-time Enrollment',
    mainBenefit: '100 / 80 / 50 Co-Insurance',
    benefitNote: 'Increasing Annual Max per Year (Through Year 3)',
    additionalInfo: [
      'No Waiting Period on Major Services',
      'Orthodontia Benefits (MAX Only)'
    ],
    networkInfo: 'MetLife PDP Plus Network',
    features: [
      { label: 'SLEEK Electronic Toothbrush Kit¹', included: true },
      { label: 'Quarterly Oral Care Refills¹', included: true },
      { label: 'Teledentistry¹', included: true },
      { label: 'Discount Rx Benefits¹', included: true },
      { label: 'Association Benefits¹', included: true },
      { label: 'Byte Impression Kit Discount¹', included: true }
    ],
    planInfoLink: '#',
    providerInfoLink: '#',
    color: '#764fb8',
    secondaryColor: '#f0ebfb',
    isHighlighted: false
  }
];

// Framer Motion variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.04, 0.62, 0.23, 0.98],
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.5,
      type: "spring",
      stiffness: 100
    }
  },
  hover: { 
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 20
    }
  },
  proHover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(92, 187, 255, 0.3)",
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 20
    }
  }
};

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300 } }
};

// Tooltip component
const Tooltip = ({ text }: { text: string }) => (
  <div className="group relative">
    <button aria-label="More information" className="text-gray-400 hover:text-gray-600 transition-colors">
      <Info size={14} />
    </button>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900"></div>
    </div>
  </div>
);

// Modal component for plan information
const PlanInfoModal = ({ isOpen, onClose, plan }: { isOpen: boolean; onClose: () => void; plan: string }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h3 className="text-xl font-bold">
            {plan === 'ocp' && 'SLEEK Dental OCP (Aetna Dental Access®)'}
            {plan === 'pro' && 'SLEEK Dental PRO (Underwritten by MetLife)'}
            {plan === 'max' && 'SLEEK Dental MAX (Underwritten by MetLife)'}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {plan === 'ocp' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Sample Savings</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Service</th>
                        <th className="px-4 py-2 text-right">Avg. Price</th>
                        <th className="px-4 py-2 text-right">You Pay</th>
                        <th className="px-4 py-2 text-right">Savings</th>
                        <th className="px-4 py-2 text-right">% Saved</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2">Dental Cleaning (Adult)</td>
                        <td className="px-4 py-2 text-right">$130.00</td>
                        <td className="px-4 py-2 text-right">$69.00</td>
                        <td className="px-4 py-2 text-right">$61.00</td>
                        <td className="px-4 py-2 text-right">47%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2">Dental Cleaning (Child)</td>
                        <td className="px-4 py-2 text-right">$96.00</td>
                        <td className="px-4 py-2 text-right">$53.00</td>
                        <td className="px-4 py-2 text-right">$43.00</td>
                        <td className="px-4 py-2 text-right">45%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2">Complete X-rays</td>
                        <td className="px-4 py-2 text-right">$174.00</td>
                        <td className="px-4 py-2 text-right">$89.00</td>
                        <td className="px-4 py-2 text-right">$85.00</td>
                        <td className="px-4 py-2 text-right">49%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2">Root Canal (Anterior)</td>
                        <td className="px-4 py-2 text-right">$906.00</td>
                        <td className="px-4 py-2 text-right">$548.00</td>
                        <td className="px-4 py-2 text-right">$358.00</td>
                        <td className="px-4 py-2 text-right">40%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Complete Upper Denture</td>
                        <td className="px-4 py-2 text-right">$1,422.00</td>
                        <td className="px-4 py-2 text-right">$1,025.00</td>
                        <td className="px-4 py-2 text-right">$397.00</td>
                        <td className="px-4 py-2 text-right">28%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  *Actual costs and savings may vary by provider, service and geographic location. We use the average of negotiated fees from participating providers to determine the average costs, as shown on the chart.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Disclosure</h4>
                <p className="text-sm text-gray-700">
                  The discount program provides access to the Aetna Dental Access® network. This network is administered by Aetna Life Insurance Company (ALIC). Neither ALIC nor any of its affiliates offers or administers the discount program. Neither ALIC nor any of its affiliates is an affiliate, agent, representative or employee of the discount program. Dental providers are independent contractors and not employees or agents of ALIC or its affiliates. ALIC does not provide dental care or treatment and is not responsible for outcomes.
                </p>
                <p className="text-sm font-bold mt-3">
                  This benefit is not available to residents of Vermont<br />
                  This is not Insurance
                </p>
              </div>
            </div>
          )}
          
          {(plan === 'pro' || plan === 'max') && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Coverage Details</h4>
                <p className="text-sm mb-3">
                  <strong>Child(ren)'s eligibility</strong> for dental coverage is from birth up to age 26
                </p>
                <p className="text-sm mb-3">
                  <strong>*Negotiated Fee</strong> refers to the fees that participating dentists have agreed to accept as payment in full for covered services, subject to any copayments, deductibles, cost sharing and benefits maximums. Negotiated fees are subject to change.
                </p>
                {plan === 'pro' ? (
                  <p className="font-semibold">80 / 60 / 50 Co-Insurance with Increasing Annual Maximum</p>
                ) : (
                  <p className="font-semibold">100 / 80 / 50 Co-Insurance with No Waiting Period on Major Services</p>
                )}
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Type A Covered Services</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Oral exams and problem-focused exams, but no more than one exam every 6 months.</li>
                  <li>Screenings to determine an individual's need to be seen by a dentist for diagnosis, but no more than once every 6 months.</li>
                  <li>Bitewing x-rays 1 set every 12 months.</li>
                  <li>Cleaning of teeth (oral prophylaxis) once every 6 months.</li>
                  <li>Topical fluoride treatment for a Child under age 14 once in 12 months.</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Type B Covered Services</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Full mouth or panoramic x-rays once every 60 months.</li>
                  <li>Intraoral-periapical x-rays.</li>
                  <li>Emergency palliative treatment to relieve tooth pain.</li>
                  <li>Initial placement of amalgam fillings.</li>
                  <li>Initial placement of resin-based composite fillings.</li>
                  <li>Protective (sedative) fillings.</li>
                  <li>Space maintainers for a Child under age 14 once per lifetime per tooth area.</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Type C Covered Services</h4>
                <p className="text-sm italic mb-3">Certain benefit waiting periods may need to be satisfied before expenses for these services are payable.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Root canal therapy.</li>
                  <li>Periodontal scaling and root planing, but not more than once per quadrant in any 24 month period.</li>
                  <li>Simple extractions.</li>
                  <li>Surgical extractions.</li>
                  <li>Oral surgery except as mentioned elsewhere in the certificate.</li>
                  <li>Consultations for oral surgery.</li>
                </ul>
                {plan === 'max' && (
                  <div className="mt-3">
                    <p className="font-semibold text-sm">MAX Plan Additional Benefits:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>No waiting period on major services</li>
                      <li>Orthodontia benefits included</li>
                    </ul>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-xs text-gray-500">
                  This is only a brief summary of benefits. Please refer to the certificate for more complete details regarding the limits and exclusions that may apply.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="sticky bottom-0 bg-white p-4 border-t">
          <button 
            onClick={onClose}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function PricingTable() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModalPlan, setCurrentModalPlan] = useState('');
  
  const openPlanModal = (planId: string) => {
    setCurrentModalPlan(planId);
    setModalOpen(true);
  };
  
  return (
    <section id="plans" className="relative py-24 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-[#00e0cb]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#5cbbff]/5 to-transparent rounded-full blur-3xl"></div>
        {/* Add a subtle glow behind the PRO card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/2 bg-[#5cbbff]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={sectionVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Choose Your Perfect Plan
          </motion.h2>
          <motion.p 
            variants={sectionVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            
          </motion.p>
        </motion.div>
        
        {/* Plan selector buttons for mobile view */}
        <div className="md:hidden mb-8">
          <div className="bg-gray-100 p-2 rounded-xl flex">
            {plans.map(plan => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedPlan === plan.id 
                    ? `bg-white shadow-md text-gray-900` 
                    : `text-gray-600 hover:bg-gray-200/50`
                }`}
              >
                {plan.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.id}
              variants={cardVariants}
              whileHover={plan.isHighlighted ? "proHover" : "hover"}
              custom={index}
              className={`
                rounded-2xl overflow-hidden bg-white border transition-all duration-300 flex flex-col
                ${selectedPlan === plan.id ? 'block' : 'hidden md:block'}
                ${plan.isHighlighted 
                  ? `border-transparent shadow-xl relative z-10 scale-110 md:my-6` 
                  : `border-gray-200 shadow-sm hover:shadow-xl`
                }
              `}
              style={{
                height: plan.isHighlighted ? 'auto' : '100%',
                ...(plan.isHighlighted ? { 
                  boxShadow: `0 15px 40px rgba(92, 187, 255, 0.3), 0 0 0 2px ${plan.color}60`,
                } : {})
              }}
            >
              {/* Recommended badge */}
              {plan.isHighlighted && (
                <div className="absolute top-0 left-0 right-0 text-center">
                  <div className="inline-block bg-gradient-to-r from-[#00e0cb] to-[#5cbbff] text-white text-sm font-semibold py-1.5 px-6 rounded-b-lg shadow-md">
                    Most Popular
                  </div>
                </div>
              )}
              
              {/* Plan corner icon */}
              <div className="absolute top-0 left-0 z-10 pointer-events-none">
                {plan.id === 'ocp' && (
                  <img 
                    src="/icon/new-corner-1.jpg" 
                    alt="OCP Corner" 
                    className="w-20 h-20"
                  />
                )}
                {plan.id === 'pro' && (
                  <img 
                    src="/icon/new-corner-2.jpg" 
                    alt="PRO Corner" 
                    className="w-20 h-20"
                  />
                )}
                {plan.id === 'max' && (
                  <img 
                    src="/icon/new-corner-3.jpg" 
                    alt="MAX Corner" 
                    className="w-20 h-20"
                  />
                )}
              </div>
              
              <div className="pt-10 pb-6 px-6 text-center flex-1">
                <div 
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center`}
                  style={{ backgroundColor: `${plan.secondaryColor}` }}
                >
                  <Sparkles 
                    size={30} 
                    className="transform transition-transform duration-700 hover:scale-110 hover:rotate-12"
                    style={{ color: plan.color }}
                  />
                </div>
                
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-5">{plan.subtitle}</p>
                
                <div className="mb-6">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-xl font-bold">{plan.priceSuffix}</span>
                    <span className="text-gray-500 ml-1">/{plan.priceNote}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{plan.enrollmentFee}</p>
                </div>
                
                {/* Main benefit pill */}
                <div 
                  className={`inline-block rounded-full px-4 py-1.5 mb-4 text-sm font-medium`}
                  style={{ backgroundColor: `${plan.secondaryColor}`, color: plan.color }}
                >
                  {plan.mainBenefit}
                </div>
                
                <div className="min-h-[48px]">
                  {plan.benefitNote && (
                    <p className="text-gray-500 text-xs mb-2">{plan.benefitNote}</p>
                  )}
                </div>
                
                {/* Additional benefits */}
                <div className="min-h-[88px] flex flex-col justify-center">
                  {plan.additionalInfo && plan.additionalInfo.length > 0 ? (
                    <div className="mt-4">
                      {plan.additionalInfo.map((info, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center justify-center text-sm mb-2"
                          style={{ color: plan.color }}
                        >
                          <Shield size={16} className="mr-2 flex-shrink-0" />
                          <span className="font-medium">{info}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 h-10"></div>
                  )}
                  
                  {plan.networkInfo && (
                    <p className="font-medium text-gray-700 text-sm mt-2">{plan.networkInfo}</p>
                  )}
                </div>
              </div>
              
              {/* Features list */}
              <div className="px-6 pb-6">
                <div className="space-y-3.5">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0">
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={checkVariants}
                          className="h-5 w-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${plan.color}20` }}
                        >
                          <Check size={12} style={{ color: plan.color }} />
                        </motion.div>
                      </div>
                      <span className="text-gray-700 text-sm">{feature.label}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA button */}
                <div className="mt-8">
                  <motion.a
                    href="#signup"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`block w-full py-3.5 px-6 rounded-xl text-center text-white font-medium transition-all duration-300 bg-gradient-to-r shadow-lg hover:shadow-xl`}
                    style={{ 
                      backgroundImage: plan.isHighlighted 
                        ? `linear-gradient(to right, #00e0cb, #5cbbff)` 
                        : `linear-gradient(to right, ${plan.color}, ${plan.color}CC)` 
                    }}
                  >
                    Select {plan.name} Plan
                  </motion.a>
                  
                  <div className="mt-4 space-y-2 text-center">
                    <button 
                      onClick={() => openPlanModal(plan.id)}
                      className="block w-full text-sm py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                    >
                      PLAN INFORMATION
                    </button>
                    <Link 
                      href={plan.providerInfoLink} 
                      className="block w-full text-sm py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                    >
                      PROVIDER INFORMATION
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Legal notes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-gray-500 max-w-3xl mx-auto">
            ¹ All plans include the SLEEK Electronic Toothbrush Kit and quarterly oral care refills.
            * Savings vary based on provider, service, and geographical area.
            See plan information for complete details on coverage, limitations, and exclusions.
          </p>
        </motion.div>
      </div>
      
      {/* Plan Information Modal */}
      <PlanInfoModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        plan={currentModalPlan} 
      />
    </section>
  );
} 