'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Check, 
  Sparkles, 
  Shield, 
  Info, 
  X, 
  Star, 
  Clock, 
  Calendar, 
  Award,
  CreditCard,
  Gift,
  Users,
  Stethoscope,
  Lightbulb,
  Zap
} from 'lucide-react';

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
      { label: 'Teledentistry¹', included: true }
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
      { label: 'Association Benefits¹', included: true }
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
      { label: 'Association Benefits¹', included: true }
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
    y: -12,
    boxShadow: "0 22px 40px rgba(0,0,0,0.15)",
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 15
    }
  },
  proHover: {
    y: -15,
    scale: 1.02,
    boxShadow: "0 25px 50px rgba(92, 187, 255, 0.35)",
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 15
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

/**
 * Modal component for displaying plan information details.
 * Shows different content based on the plan type (OCP, PRO, MAX).
 * OCP shows sample savings table and discount disclosure.
 * PRO/MAX show coverage details and covered services by type.
 */
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
                  <strong>Child(ren)&apos;s eligibility</strong> for dental coverage is from birth up to age 26
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
                  <li>Screenings to determine an individual&apos;s need to be seen by a dentist for diagnosis, but no more than once every 6 months.</li>
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

/**
 * Modal component for displaying provider/network information.
 * Shows the appropriate provider network details based on the plan type.
 * OCP uses Aetna Dental Access network, PRO/MAX use MetLife PDP Plus network.
 * Includes links to external provider search tools.
 */
const ProviderInfoModal = ({ isOpen, onClose, plan }: { isOpen: boolean; onClose: () => void; plan: string }) => {
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
            {plan === 'ocp' && 'Provider Network: Aetna Dental Access®'}
            {plan === 'pro' && 'Provider Network: MetLife PDP Plus'}
            {plan === 'max' && 'Provider Network: MetLife PDP Plus'}
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
                <h4 className="text-lg font-semibold mb-3">Aetna Dental Access® Network</h4>
                <p className="text-sm text-gray-700 mb-4">
                  The Aetna Dental Access® network includes over 262,000 dentist locations nationwide. 
                  As a member, you have access to significant discounts on dental services when you visit 
                  participating providers.
                </p>
                <div className="bg-[#00e0cb]/10 border border-[#00e0cb]/20 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Network Highlights</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>Over 262,000 dentist locations nationwide</li>
                    <li>Save 15-50% on most dental procedures</li>
                    <li>No waiting periods or annual maximums</li>
                    <li>Immediate access to savings</li>
                    <li>Specialists included in the network</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Find a Provider</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Use the Aetna Dental Access® provider search tool to find participating dentists in your area.
                </p>
                <a 
                  href="https://www.aetna.com/dsepublic/#/contentPage?page=providerSearchLanding&site_id=dac" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-[#00e0cb] text-white rounded-lg hover:bg-[#00c9b6] transition-colors"
                >
                  <Stethoscope size={18} className="mr-2" />
                  Search for Providers
                </a>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Important Note</h5>
                <p className="text-sm text-gray-600">
                  When searching for providers, select &quot;Aetna Dental Access®&quot; as your plan type. 
                  Always confirm that the provider participates in the network before your appointment.
                </p>
              </div>
            </div>
          )}
          
          {(plan === 'pro' || plan === 'max') && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">MetLife PDP Plus Network</h4>
                <p className="text-sm text-gray-700 mb-4">
                  The MetLife PDP Plus network is one of the largest dental networks in the nation, 
                  featuring over 475,000 dentist access points. This extensive network ensures you 
                  can find quality dental care wherever you are.
                </p>
                <div className="bg-[#5cbbff]/10 border border-[#5cbbff]/20 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Network Highlights</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>Over 475,000 dentist access points nationwide</li>
                    <li>Negotiated fees for all covered services</li>
                    <li>General dentists and specialists included</li>
                    <li>No referrals required for specialist visits</li>
                    <li>Freedom to see any licensed dentist (in-network benefits apply to PDP Plus providers)</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Find a Provider</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Use the MetLife provider search tool to find PDP Plus participating dentists in your area.
                </p>
                <a 
                  href="https://www.metlife.com/dental-providers/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-[#5cbbff] text-white rounded-lg hover:bg-[#4aa8ec] transition-colors"
                >
                  <Stethoscope size={18} className="mr-2" />
                  Search for Providers
                </a>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Important Note</h5>
                <p className="text-sm text-gray-600">
                  When searching for providers, select &quot;PDP Plus&quot; as your network type. You may also 
                  visit out-of-network dentists, but your benefits will be based on the lesser of 
                  the submitted charge or the negotiated fee.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Out-of-Network Coverage</h4>
                <p className="text-sm text-gray-700">
                  While you can see any licensed dentist, visiting an in-network PDP Plus provider 
                  ensures you receive the maximum benefit. Out-of-network claims are processed at 
                  the negotiated fee level, which may result in higher out-of-pocket costs.
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
  // State for plan information modal
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [currentPlanModalPlan, setCurrentPlanModalPlan] = useState('');
  // State for provider information modal
  const [providerModalOpen, setProviderModalOpen] = useState(false);
  const [currentProviderModalPlan, setCurrentProviderModalPlan] = useState('');
  
  /**
   * Opens the plan information modal for the specified plan.
   * Sets the current plan ID and opens the modal.
   */
  const openPlanModal = (planId: string) => {
    setCurrentPlanModalPlan(planId);
    setPlanModalOpen(true);
  };
  
  /**
   * Opens the provider information modal for the specified plan.
   * Sets the current plan ID and opens the modal.
   */
  const openProviderModal = (planId: string) => {
    setCurrentProviderModalPlan(planId);
    setProviderModalOpen(true);
  };
  
  return (
    <section id="plans" className="relative py-24 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-[#00e0cb]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#5cbbff]/5 to-transparent rounded-full blur-3xl"></div>
        {/* Add a subtle glow behind the PRO card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-[#5cbbff]/10 rounded-full blur-3xl"></div>
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
          {/* Visual separator lines between plans */}
          <div className="absolute top-1/4 bottom-1/4 left-1/3 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden md:block"></div>
          <div className="absolute top-1/4 bottom-1/4 left-2/3 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden md:block"></div>
          
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
                  ? `border-transparent shadow-xl relative z-10 md:scale-110 md:-my-6` 
                  : `border-gray-200 shadow-sm hover:shadow-xl`
                }
              `}
              style={{
                height: plan.isHighlighted ? 'auto' : '100%',
                ...(plan.isHighlighted ? { 
                  boxShadow: `0 20px 45px rgba(92, 187, 255, 0.35), 0 0 0 2px ${plan.color}60`,
                  background: 'linear-gradient(180deg, white 0%, #f0f7ff 100%)'
                } : {})
              }}
            >
              {/* Recommended badge */}
              {plan.isHighlighted && (
                <div className="absolute top-0 left-0 right-0 text-center">
                  <motion.div 
                    className="inline-block bg-gradient-to-r from-[#00e0cb] to-[#5cbbff] text-white text-sm font-semibold py-1.5 px-6 rounded-b-lg shadow-md"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <Award size={14} className="mr-1" />
                      <span>Most Popular</span>
                    </div>
                  </motion.div>
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
                <motion.div 
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-3`}
                  style={{ backgroundColor: `${plan.secondaryColor}` }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  {...(plan.isHighlighted && {
                    animate: {
                      boxShadow: [
                        `0 0 0 0px ${plan.color}30`,
                        `0 0 0 8px ${plan.color}00`
                      ],
                      scale: [1, 1.05, 1]
                    },
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  })}
                >
                  <Sparkles 
                    size={30} 
                    className="transform transition-transform duration-700 hover:scale-110 hover:rotate-12"
                    style={{ color: plan.color }}
                  />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-5">{plan.subtitle}</p>
                
                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-center justify-center">
                    <span className="text-5xl font-bold" style={{ color: plan.isHighlighted ? plan.color : 'inherit' }}>${plan.price}</span>
                    <div className="flex flex-col items-start ml-1">
                      <span className="text-xl font-bold">{plan.priceSuffix}</span>
                      <span className="text-gray-500 text-xs">/{plan.priceNote}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{plan.enrollmentFee}</p>
                </div>
                
                {/* Main benefit pill */}
                <div 
                  className={`inline-block rounded-full px-4 py-1.5 mb-4 text-sm font-medium transform transition-all duration-300 hover:scale-105`}
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
              
              {/* Features list with horizontal separator */}
              <div className="relative">
                <div className="h-px w-4/5 mx-auto bg-gray-100"></div>
              </div>
              
              {/* Features list */}
              <div className="px-6 pb-6">
                <div className="space-y-3.5 mt-6">
                  {plan.features.map((feature, idx) => {
                    // Use different icons based on the feature type
                    const getIcon = () => {
                      const iconProps = { size: 14, style: { color: plan.color } };
                      
                      if (feature.label.includes('Toothbrush')) return <Sparkles {...iconProps} />;
                      if (feature.label.includes('Refills')) return <Gift {...iconProps} />;
                      if (feature.label.includes('Teledentistry')) return <Stethoscope {...iconProps} />;
                      if (feature.label.includes('Discount')) return <CreditCard {...iconProps} />;
                      if (feature.label.includes('Association')) return <Users {...iconProps} />;
                      if (feature.label.includes('Network')) return <Star {...iconProps} />;
                      
                      // Default icon
                      return <Check {...iconProps} />;
                    };
                    
                    return (
                      <div key={idx} className="flex items-start group">
                        <div className="mt-0.5 mr-3 flex-shrink-0">
                          <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={checkVariants}
                            className="h-5 w-5 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${plan.color}20` }}
                          >
                            {getIcon()}
                          </motion.div>
                        </div>
                        <span className={`text-gray-700 text-sm group-hover:text-gray-900 transition-colors duration-200 ${plan.isHighlighted ? 'font-medium' : ''}`}>
                          {feature.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                {/* CTA button */}
                <div className="mt-8">
                  <motion.a
                    href="#signup"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`block w-full py-3.5 px-6 rounded-xl text-center text-white font-medium transition-all duration-300 bg-gradient-to-r shadow-lg hover:shadow-xl transform`}
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
                    <button 
                      onClick={() => openProviderModal(plan.id)}
                      className="block w-full text-sm py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                    >
                      PROVIDER INFORMATION
                    </button>
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
        isOpen={planModalOpen} 
        onClose={() => setPlanModalOpen(false)} 
        plan={currentPlanModalPlan} 
      />
      
      {/* Provider Information Modal */}
      <ProviderInfoModal 
        isOpen={providerModalOpen} 
        onClose={() => setProviderModalOpen(false)} 
        plan={currentProviderModalPlan} 
      />
    </section>
  );
} 