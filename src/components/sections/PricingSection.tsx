'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Shield, Zap, Sparkles, Clock, Smartphone, Award, Crown, Stethoscope, Pill, Gift, Users, BadgePercent, X, FileText, MapPin, Package, Truck, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Type definitions for pricing plan features and plans.
 * Each plan has a unique id, pricing info, and list of features.
 */
interface PlanFeature {
  text: string;
  icon: React.ReactNode;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  enrollmentFee: string;
  isPopular: boolean;
  badge?: string;
  logo: string;
  features: PlanFeature[];
  ctaText: string;
  ctaLink: string;
  accentColor: string;
}

/**
 * Pricing plans data with features and styling based on official SLEEK marketing materials.
 * Club = Toothbrush only, OCP = Oral Care Plan (discount dental), PRO & MAX include MetLife dental insurance.
 * The PRO plan is marked as popular and receives special visual treatment.
 */
const pricingPlans: Plan[] = [
  {
    id: 'club',
    name: 'CLUB',
    description: 'Smart toothbrush with quarterly refills',
    monthlyPrice: '$16.95',
    enrollmentFee: 'billed quarterly',
    isPopular: false,
    logo: '/images/SLEEK-logo.svg',
    accentColor: '#3b82f6',
    features: [
      { text: 'Sonic Electric Toothbrush (5 Modes)', icon: <Sparkles className="h-4 w-4" />, included: true },
      { text: '2-Minute Timer Oscillating Brush Head', icon: <Clock className="h-4 w-4" />, included: true },
      { text: 'USB Rechargeable with Holder & Case', icon: <Package className="h-4 w-4" />, included: true },
      { text: 'Quarterly Brush Head Refill', icon: <RefreshCw className="h-4 w-4" />, included: true },
      { text: '50 Floss Picks Every Quarter', icon: <Gift className="h-4 w-4" />, included: true },
      { text: 'Free Shipping in Contiguous US', icon: <Truck className="h-4 w-4" />, included: true },
      { text: 'Cancel Anytime', icon: <Check className="h-4 w-4" />, included: true },
    ],
    ctaText: 'Join Club',
    ctaLink: 'https://enrollment.sleekdentalclub.com/product-details',
  },
  {
    id: 'ocp',
    name: 'OCP',
    description: 'Oral Care Plan with dental savings',
    monthlyPrice: '$29.95',
    enrollmentFee: '$25',
    isPopular: false,
    logo: '/images/plans/sleek-ocp.png',
    accentColor: '#64748b',
    features: [
      { text: 'Everything in CLUB', icon: <Check className="h-4 w-4" />, included: true },
      { text: 'Save 15-50% on Dental Care*', icon: <BadgePercent className="h-4 w-4" />, included: true },
      { text: 'Aetna Dental Access® Network¹', icon: <Shield className="h-4 w-4" />, included: true },
      { text: 'Discount Rx Benefits¹', icon: <Pill className="h-4 w-4" />, included: true },
      { text: 'Teledentistry¹', icon: <Stethoscope className="h-4 w-4" />, included: true },
      { text: 'Byte Impression Kit Discount¹', icon: <Gift className="h-4 w-4" />, included: true },
    ],
    ctaText: 'Get Started',
    ctaLink: 'https://enrollment.sleekdentalclub.com/onboarding',
  },
  {
    id: 'pro',
    name: 'PRO',
    description: 'Dental insurance by MetLife',
    monthlyPrice: '$56.95',
    enrollmentFee: '$25',
    isPopular: true,
    badge: 'Most Popular',
    logo: '/images/plans/sleek-pro.png',
    accentColor: '#0f766e',
    features: [
      { text: 'Everything in CLUB', icon: <Check className="h-4 w-4" />, included: true },
      { text: '80 / 60 / 50 Co-Insurance', icon: <Shield className="h-4 w-4" />, included: true },
      { text: 'Increasing Annual Max (Year 3)', icon: <Zap className="h-4 w-4" />, included: true },
      { text: 'MetLife PDP Plus Network', icon: <Award className="h-4 w-4" />, included: true },
      { text: 'Teledentistry¹', icon: <Stethoscope className="h-4 w-4" />, included: true },
      { text: 'Discount Rx Benefits¹', icon: <Pill className="h-4 w-4" />, included: true },
      { text: 'Association Benefits¹', icon: <Users className="h-4 w-4" />, included: true },
      { text: 'Byte Impression Kit Discount¹', icon: <Gift className="h-4 w-4" />, included: true },
    ],
    ctaText: 'Join Pro Plan',
    ctaLink: 'https://enrollment.sleekdentalclub.com/onboarding',
  },
  {
    id: 'max',
    name: 'MAX',
    description: 'Premium MetLife coverage for families',
    monthlyPrice: '$64.95',
    enrollmentFee: '$25',
    isPopular: false,
    badge: 'Best Value',
    logo: '/images/plans/sleek-max.png',
    accentColor: '#0d9488',
    features: [
      { text: 'Everything in CLUB', icon: <Check className="h-4 w-4" />, included: true },
      { text: '100 / 80 / 50 Co-Insurance', icon: <Shield className="h-4 w-4" />, included: true },
      { text: 'Increasing Annual Max (Year 3)', icon: <Zap className="h-4 w-4" />, included: true },
      { text: 'No Waiting Period on Major', icon: <Crown className="h-4 w-4" />, included: true },
      { text: 'Orthodontia Benefits', icon: <Sparkles className="h-4 w-4" />, included: true },
      { text: 'MetLife PDP Plus Network', icon: <Award className="h-4 w-4" />, included: true },
      { text: 'Teledentistry¹', icon: <Stethoscope className="h-4 w-4" />, included: true },
      { text: 'Discount Rx & Association Benefits¹', icon: <Pill className="h-4 w-4" />, included: true },
      { text: 'Byte Impression Kit Discount¹', icon: <Gift className="h-4 w-4" />, included: true },
    ],
    ctaText: 'Join Max Plan',
    ctaLink: 'https://enrollment.sleekdentalclub.com/onboarding',
  },
];

/**
 * Modal component for displaying plan information details.
 * Shows different content based on the plan type (OCP, PRO, MAX).
 * OCP shows sample savings table and discount disclosure.
 * PRO/MAX show coverage details and covered services by type.
 */
const PlanInfoModal = ({ isOpen, onClose, planId }: { isOpen: boolean; onClose: () => void; planId: string }) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white p-5 border-b flex justify-between items-center z-10">
            <h3 className="text-xl font-bold">
              {planId === 'club' && <span className="text-blue-500">SLEEK Dental Club</span>}
              {planId === 'ocp' && <span className="text-teal-500">SLEEK Dental OCP (Aetna Dental Access®)</span>}
              {planId === 'pro' && <span className="text-teal-600">SLEEK Dental PRO (Underwritten by MetLife)</span>}
              {planId === 'max' && <span className="text-teal-600">SLEEK Dental MAX (Underwritten by MetLife)</span>}
            </h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
          
          <div className="p-6">
            {/* Club Plan Content */}
            {planId === 'club' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-blue-500">The Perfect Electric Toothbrush Experience</h4>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    SLEEK Dental Club members receive a smart sonic electric toothbrush kit with quarterly brush head and floss picks auto shipped.
                  </p>
                </div>
                
                {/* Kit Contents */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <h5 className="font-semibold text-gray-900 mb-3">Every SLEEK Dental Club Kit Includes:</h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Electric Toothbrush with 5 Cleaning Modes
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Oscillating Brush Head with 2-Minute Timer
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Built-In Rechargeable USB Charger
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Toothbrush Holder
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Traveling Case
                    </li>
                  </ul>
                </div>
                
                {/* Quarterly Refills */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <h5 className="font-semibold text-gray-900 mb-3">Quarterly Refills per Kit:</h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <RefreshCw className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      (1) Brush Head
                    </li>
                    <li className="flex items-start">
                      <RefreshCw className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      (50) Floss Picks
                    </li>
                  </ul>
                </div>
                
                {/* Benefits */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Sonic Electric Toothbrush Benefits:</h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Sparkles className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Help prevent cavities with deep cleaning
                    </li>
                    <li className="flex items-start">
                      <Sparkles className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Perfect for individuals with sensitive teeth
                    </li>
                    <li className="flex items-start">
                      <Sparkles className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Ideal for whitening and plaque removal
                    </li>
                  </ul>
                </div>
                
                {/* Hassle Free */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Hassle Free Quarterly Refills:</h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Truck className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Automatic delivery to your doorstep every 3 months
                    </li>
                    <li className="flex items-start">
                      <Truck className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Free Shipping in the contiguous United States
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Cancel your plan at anytime
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {planId === 'ocp' && (
              <div className="space-y-6">
                {/* Sample Savings Table */}
                <div>
                  <div className="overflow-x-auto rounded-xl border border-teal-200">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-center text-lg font-semibold bg-teal-500 text-white" colSpan={5}>
                            Sample Savings*
                          </th>
                        </tr>
                        <tr className="bg-teal-500">
                          <th className="px-4 py-3 text-center text-sm font-semibold text-white">Product/Service</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-white">AVG. Price</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-white">You Pay</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-white">Savings</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-white">% Saved</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 text-sm text-slate-500">Dental Cleaning (Adult)</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$130.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$69.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$61.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">47%</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 text-sm text-slate-500">Dental Cleaning (Child)</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$96.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$53.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$43.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">45%</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 text-sm text-slate-500">Complete X-rays</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$174.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$89.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$85.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">49%</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 text-sm text-slate-500">Root Canal (Anterior)</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$906.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$548.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$358.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">40%</td>
                        </tr>
                        <tr className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 text-sm text-slate-500">Complete Upper Denture</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$1,422.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$1,025.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">$397.00</td>
                          <td className="px-4 py-3 text-center text-sm text-slate-500">28%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-3 leading-relaxed">
                    <sup>*</sup>Actual costs and savings may vary by provider, service and geographic location. We use the average of negotiated fees from participating providers to determine the average costs, as shown on the chart. The select regional average cost represents the average fees for the procedures listed above in Los Angeles, Orlando, Chicago and New York City, as displayed in the cost of care tool as of June 2020.
                  </p>
                  <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                    The discount program provides access to the Aetna Dental Access® network. This network is administered by Aetna Life Insurance Company (ALIC). Neither ALIC nor any of its affiliates offers or administers the discount program. Neither ALIC nor any of its affiliates is an affiliate, agent, representative or employee of the discount program. Dental providers are independent contractors and not employees or agents of ALIC or its affiliates. ALIC does not provide dental care or treatment and is not responsible for outcomes.
                  </p>
                </div>
                
                {/* Marketing Disclosure */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-teal-500">SLEEK OCP Marketing Disclosure</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Dental, Teledentist and Pharmacy Disclosure. <strong>This plan is NOT insurance.</strong> This plan is not a qualified health plan under the Affordable Care Act (ACA). Some services may be covered by a qualified health plan under the ACA. This plan does not meet the minimum creditable coverage requirements under M.G.L. c. 111M and 956 CMR 5.00. This is not a Medicare prescription drug plan. Discounts on hospital services are not available in Maryland. The plan provides discounts at certain health care providers of medical services. The plan does not make payments directly to the providers of medical services. The plan member is obligated to pay for all health care services but will receive a discount from those health care providers who have contracted with the discount plan organization. The range of discounts will vary depending on the provider type and services provided. The licensed discount plan organization is Coverdell &amp; Company, Inc., at 2850 W. Golf Road, Rolling Meadows, IL 60008, 1-888-868-6199. To view a list of participating providers visit www.findbestbenefits.com and enter promo code 575313. <strong>You have the right to cancel this plan within 30 days of the effective date for a full refund of fees paid.</strong> Such refunds are issued within 30 days of cancellation.
                  </p>
                  <p className="text-sm text-gray-600 mt-4">
                    Click to view{' '}
                    <a 
                      href="/documents/Sleek-OCP-TC.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-500 hover:text-teal-600 underline"
                    >
                      Terms, Conditions and Disclosures
                    </a>
                  </p>
                </div>
                
                {/* Important notices */}
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-800">This benefit is not available to residents of Vermont</p>
                  <p className="text-sm font-bold text-gray-800">This is not Insurance</p>
                </div>
              </div>
            )}
            
            {/* PRO Plan Content */}
            {planId === 'pro' && (
              <div className="space-y-6 text-xs">
                <h4 className="text-base font-semibold text-teal-500">Dental Insurance: Description of Covered Services</h4>
                
                {/* Type A Covered Services */}
                <div>
                  <p className="font-bold text-gray-900 mb-2">Type A Covered Services</p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
                    <li>Oral exams and problem-focused exams, but no more than one exam (whether the exam is an oral exam or problem-focused exam) every 6 months.</li>
                    <li>Screenings, including state or federally mandated screenings, to determine an individual's need to be seen by a dentist for diagnosis, but no more than once every 6 months.</li>
                    <li>Patient assessments (limited clinical inspection that is performed to identify possible signs of oral or systemic disease, malformation, or injury, and the potential need for referral for diagnosis and treatment), but no more than once every 6 months.</li>
                    <li>Bitewing x-rays 1 set every 12 months.</li>
                    <li>Cleaning of teeth also referred to as oral prophylaxis (including full mouth scaling in presence of generalized moderate or severe gingival inflammation after oral evaluation) once every 6 months.</li>
                    <li>Topical fluoride treatment for a Child under age 14 once in 12 months.</li>
                  </ol>
                </div>
                
                {/* Type B Covered Services */}
                <div>
                  <p className="font-bold text-gray-900 mb-2">Type B Covered Services</p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
                    <li>Full mouth or panoramic x-rays once every 60 months.</li>
                    <li>Intraoral-periapical x-rays.</li>
                    <li>X-rays, except as mentioned elsewhere.</li>
                    <li>Pulp vitality tests and bacteriological studies for determination of bacteriologic agents.</li>
                    <li>Collection and preparation of genetic sample material for laboratory analysis and report, but no more than once per lifetime.</li>
                    <li>Diagnostic casts.</li>
                    <li>Emergency palliative treatment to relieve tooth pain.</li>
                    <li>Initial placement of amalgam fillings.</li>
                    <li>Replacement of an existing amalgam filling, but only if:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>at least 24 months have passed since the existing filling was placed; or</li>
                        <li>a new surface of decay is identified on that tooth.</li>
                      </ul>
                    </li>
                    <li>Initial placement of resin-based composite fillings.</li>
                    <li>Replacement of an existing resin-based composite filling, but only if:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>at least 24 months have passed since the existing filling was placed; or</li>
                        <li>a new surface of decay is identified on that tooth.</li>
                      </ul>
                    </li>
                    <li>Protective (sedative) fillings.</li>
                    <li>Periodontal maintenance, where periodontal treatment (including scaling, root planing, and periodontal surgery, such as gingivectomy, gingivoplasty and osseous surgery) has been performed. Periodontal maintenance is limited to two times in any 12 months less the number of teeth cleanings received during such 12 month period.</li>
                    <li>Pulp capping (excluding final restoration).</li>
                    <li>Pulp therapy.</li>
                    <li>Injections of therapeutic drugs.</li>
                    <li>Space maintainers for a Child under age 14 once per lifetime per tooth area.</li>
                    <li>Sealants or sealant repairs for a Child under age 14, which are applied to non-restored, non-decayed first and second permanent molars, once per tooth every 60 months.</li>
                    <li>Preventive resin restorations, which are applied to non-restored first and second permanent molars, once per tooth every 60 months.</li>
                    <li>Interim caries arresting medicament application applied to permanent bicuspids and 1st and 2nd molar teeth, once per tooth every 60 months.</li>
                    <li>Application of desensitizing medicaments where periodontal treatment (including scaling, root planing, and periodontal surgery, such as osseous surgery) has been performed.</li>
                  </ol>
                </div>
                
                {/* Type C Covered Services */}
                <div>
                  <p className="font-bold text-gray-900 mb-2">Type C Covered Services</p>
                  <p className="text-gray-700 italic mb-2"><strong>Certain benefit waiting periods may need to be satisfied before expenses for these services are payable. Refer to the SCHEDULE OF BENEFITS for the benefit waiting period that applies.</strong></p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
                    <li>Therapeutic pulpotomy (excluding final restoration).</li>
                    <li>Apexification/recalcification.</li>
                    <li>Pulpal regeneration, but not more than once per lifetime.</li>
                    <li>General anesthesia or intravenous sedation in connection with oral surgery, extractions or other Covered Services, when We determine such anesthesia is necessary in accordance with generally accepted dental standards.</li>
                    <li>Local chemotherapeutic agents.</li>
                    <li>Initial installation of full or partial Dentures (other than implant supported prosthetics):
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>when needed to replace congenitally missing teeth; or</li>
                        <li>when needed to replace teeth that are lost while the person receiving such benefits was insured for Dental Insurance.</li>
                      </ul>
                    </li>
                    <li>Addition of teeth to a partial removable Denture to replace teeth removed while this Dental Insurance was in effect for the person receiving such services.</li>
                    <li>Replacement of a non-serviceable fixed Denture if such Denture was installed more than 10 Years prior to replacement.</li>
                    <li>Replacement of a non-serviceable removable Denture if such Denture was installed more than 10 Years prior to replacement.</li>
                    <li>Replacement of an immediate, temporary, full Denture with a permanent, full Denture, if the immediate, temporary, full Denture cannot be made permanent and such replacement is done within 12 months of the installation of the immediate, temporary, full Denture.</li>
                    <li>Relinings and rebasings of existing removable Dentures:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>if at least 6 months have passed since the installation of the existing removable Denture; and</li>
                        <li>not more than once in any 36 month period.</li>
                      </ul>
                    </li>
                    <li>Re-cementing of Cast Restorations or Dentures, but not more than once in a 12 month period.</li>
                    <li>Adjustments of Dentures, if at least 6 months have passed since the installation of the Denture and not more than once in any 12 month period.</li>
                    <li>Initial installation of Cast Restorations (except implant supported Cast Restorations).</li>
                    <li>Replacement of Cast Restorations (except an implant supported Cast Restoration) but only if at least 10 Years have passed since the most recent time that:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>a Cast Restoration was installed for the same tooth; or</li>
                        <li>a Cast Restoration for the same tooth was replaced.</li>
                      </ul>
                    </li>
                    <li>Prefabricated crown, but no more than one replacement for the same tooth within 10 Years.</li>
                    <li>Core buildup, but no more than once per tooth in a period of 10 Years.</li>
                    <li>Posts and cores, but no more than once per tooth in a period of 10 Years.</li>
                    <li>Labial veneers, but no more than once per tooth in a period of 10 Years.</li>
                    <li>Oral surgery, except as mentioned elsewhere in this certificate.</li>
                    <li>Consultations for interpretation of diagnostic image by a Dentist not associated with the capture of the image, but not more than once in a 12 month period.</li>
                    <li>Other consultations, but not more than once in a 12 month period.</li>
                    <li>Root canal treatment, including bone grafts and tissue regeneration procedures in conjunction with periradicular surgery, but not more than once for the same tooth.</li>
                    <li>Other endodontic procedures, such as apicoectomy, retrograde fillings, root amputation, and hemisection.</li>
                    <li>Periodontal scaling and root planing, but no more than once per quadrant in any 24 month period.</li>
                    <li>Full mouth debridements, but not more than once per lifetime.</li>
                    <li>Periodontal surgery, including gingivectomy, gingivoplasty and osseous surgery, but no more than one surgical procedure per quadrant in any 36 month period.</li>
                    <li>Simple extractions.</li>
                    <li>Surgical extractions.</li>
                    <li>Tissue conditioning, but not more than once in a 36 month period.</li>
                    <li>Simple repair of Cast Restorations or Dentures other than recementing, but not more than once in a 12 month period.</li>
                    <li>Occlusal adjustments, but not more than once in a 12 month period.</li>
                  </ol>
                </div>
                
                {/* Exclusions */}
                <div>
                  <p className="font-bold text-gray-900 mb-2">Dental Insurance: Exclusions</p>
                  <p className="text-gray-700 mb-2">We will not pay Dental Insurance benefits for charges incurred for:</p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
                    <li>services which are not Dentally Necessary, or those which do not meet generally accepted standards of care for treating the particular dental condition;</li>
                    <li>services for which You would not be required to pay in the absence of Dental Insurance;</li>
                    <li>services or supplies received by You or Your Dependent before the Dental Insurance starts for that person;</li>
                    <li>services which are neither performed nor prescribed by a Dentist, except for those services of a licensed Dental Hygienist which are supervised and billed by a Dentist, and which are for:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>scaling and polishing of teeth; or</li>
                        <li>fluoride treatments;</li>
                      </ul>
                    </li>
                    <li>services which are primarily cosmetic, (For residents of Texas, see notice page section);</li>
                    <li>services or appliances which restore or alter occlusion or vertical dimension;</li>
                    <li>restoration of tooth structure damaged by attrition, abrasion or erosion, unless caused by disease;</li>
                    <li>restorations or appliances used for the purpose of periodontal splinting;</li>
                    <li>counseling or instruction about oral hygiene, plaque control, nutrition and tobacco;</li>
                    <li>personal supplies or devices including, but not limited to: water piks, toothbrushes, or dental floss;</li>
                    <li>decoration or inscription of any tooth, device, appliance, crown or other dental work;</li>
                    <li>missed appointments;</li>
                    <li>services:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>covered under any workers' compensation or occupational disease law;</li>
                        <li>covered under any employer liability law;</li>
                        <li>for which the employer of the person receiving such services is required to pay; or</li>
                        <li>received at a facility maintained by the Policyholder, labor union, mutual benefit association, or VA hospital;</li>
                      </ul>
                    </li>
                    <li>services covered under other coverage provided by the Policyholder;</li>
                    <li>biopsies of hard or soft oral tissue;</li>
                    <li>temporary or provisional restorations;</li>
                    <li>temporary or provisional appliances;</li>
                    <li>prescription drugs;</li>
                    <li>services for which the submitted documentation indicates a poor prognosis;</li>
                    <li>the following, when charged by the Dentist on a separate basis:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>claim form completion;</li>
                        <li>infection control, such as gloves, masks, and sterilization of supplies; or</li>
                        <li>local anesthesia, non-intravenous conscious sedation or analgesia, such as nitrous oxide;</li>
                      </ul>
                    </li>
                    <li>dental services arising out of accidental injury to the teeth and supporting structures, except for injuries to the teeth due to chewing or biting of food;</li>
                    <li>caries susceptibility tests;</li>
                    <li>implant supported Cast Restorations;</li>
                    <li>modification of removable prosthodontic and other removable prosthetic services;</li>
                    <li>implants including, but not limited to any related surgery, placement, maintenance, and removal;</li>
                    <li>implant supported Dentures;</li>
                    <li>repair of implants;</li>
                    <li>fixed and removable appliances for correction of harmful habits;</li>
                    <li>appliances or treatment for bruxism (grinding teeth);</li>
                    <li>initial installation of a Denture to replace one or more teeth which were missing before such person was insured for Dental Insurance, except for congenitally missing teeth;</li>
                    <li>precision attachments associated with fixed and removable prostheses;</li>
                    <li>adjustment of a Denture made within 6 months after installation by the same Dentist who installed it;</li>
                    <li>duplicate prosthetic devices or appliances;</li>
                    <li>replacement of a lost or stolen appliance, Cast Restoration or Denture;</li>
                    <li>orthodontic services or appliances;</li>
                    <li>repair or replacement of an orthodontic device;</li>
                    <li>diagnosis and treatment of temporomandibular joint disorders and cone beam imaging associated with the treatment of temporomandibular joint disorders;</li>
                    <li>intra and extraoral photographic images.</li>
                  </ol>
                </div>
              </div>
            )}
            
            {/* MAX Plan Content */}
            {planId === 'max' && (
              <div className="space-y-6 text-xs">
                <h4 className="text-base font-semibold text-teal-500">Dental Insurance: Description of Covered Services</h4>
                
                {/* Type A Covered Services */}
                <div>
                  <p className="font-bold text-gray-900 mb-2">Type A Covered Services</p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
                    <li>Oral exams and problem-focused exams, but no more than one exam (whether the exam is an oral exam or problem-focused exam) every 6 months.</li>
                    <li>Screenings, including state or federally mandated screenings, to determine an individual's need to be seen by a dentist for diagnosis, but no more than once every 6 months.</li>
                    <li>Patient assessments (limited clinical inspection that is performed to identify possible signs of oral or systemic disease, malformation, or injury, and the potential need for referral for diagnosis and treatment), but no more than once every 6 months.</li>
                    <li>Bitewing x-rays 1 set every 12 months.</li>
                    <li>Cleaning of teeth also referred to as oral prophylaxis (including full mouth scaling in presence of generalized moderate or severe gingival inflammation after oral evaluation) once every 6 months.</li>
                    <li>Topical fluoride treatment for a Child under age 14 once in 12 months.</li>
                  </ol>
                </div>
                
                {/* Type B Covered Services */}
                <div>
                  <p className="font-bold text-gray-900 mb-2">Type B Covered Services</p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
                    <li>Full mouth or panoramic x-rays once every 60 months.</li>
                    <li>Intraoral-periapical x-rays.</li>
                    <li>X-rays, except as mentioned elsewhere.</li>
                    <li>Pulp vitality tests and bacteriological studies for determination of bacteriologic agents.</li>
                    <li>Collection and preparation of genetic sample material for laboratory analysis and report, but no more than once per lifetime.</li>
                    <li>Diagnostic casts.</li>
                    <li>Emergency palliative treatment to relieve tooth pain.</li>
                    <li>Initial placement of amalgam fillings.</li>
                    <li>Replacement of an existing amalgam filling, but only if:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>at least 24 months have passed since the existing filling was placed; or</li>
                        <li>a new surface of decay is identified on that tooth.</li>
                      </ul>
                    </li>
                    <li>Initial placement of resin-based composite fillings.</li>
                    <li>Replacement of an existing resin-based composite filling, but only if:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>at least 24 months have passed since the existing filling was placed; or</li>
                        <li>a new surface of decay is identified on that tooth.</li>
                      </ul>
                    </li>
                    <li>Protective (sedative) fillings.</li>
                    <li>Periodontal maintenance, where periodontal treatment (including scaling, root planing, and periodontal surgery, such as gingivectomy, gingivoplasty and osseous surgery) has been performed. Periodontal maintenance is limited to two times in any 12 months less the number of teeth cleanings received during such 12 month period.</li>
                    <li>Pulp capping (excluding final restoration).</li>
                    <li>Pulp therapy.</li>
                    <li>Injections of therapeutic drugs.</li>
                    <li>Space maintainers for a Child under age 14 once per lifetime per tooth area.</li>
                    <li>Sealants or sealant repairs for a Child under age 14, which are applied to non-restored, non-decayed first and second permanent molars, once per tooth every 60 months.</li>
                    <li>Preventive resin restorations, which are applied to non-restored first and second permanent molars, once per tooth every 60 months.</li>
                    <li>Interim caries arresting medicament application applied to permanent bicuspids and 1st and 2nd molar teeth, once per tooth every 60 months.</li>
                    <li>Application of desensitizing medicaments where periodontal treatment (including scaling, root planing, and periodontal surgery, such as osseous surgery) has been performed.</li>
                  </ol>
                </div>
                
                {/* Type C Covered Services */}
                <div>
                  <p className="font-bold text-gray-900 mb-2">Type C Covered Services</p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
                    <li>Therapeutic pulpotomy (excluding final restoration).</li>
                    <li>Apexification/recalcification.</li>
                    <li>Pulpal regeneration, but not more than once per lifetime.</li>
                    <li>General anesthesia or intravenous sedation in connection with oral surgery, extractions or other Covered Services, when We determine such anesthesia is necessary in accordance with generally accepted dental standards.</li>
                    <li>Local chemotherapeutic agents.</li>
                    <li>Initial installation of full or partial Dentures (other than implant supported prosthetics):
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>when needed to replace congenitally missing teeth; or</li>
                        <li>when needed to replace teeth that are lost while the person receiving such benefits was insured for Dental Insurance.</li>
                      </ul>
                    </li>
                    <li>Addition of teeth to a partial removable Denture to replace teeth removed while this Dental Insurance was in effect for the person receiving such services.</li>
                    <li>Replacement of a non-serviceable fixed Denture if such Denture was installed more than 10 Years prior to replacement.</li>
                    <li>Replacement of a non-serviceable removable Denture if such Denture was installed more than 10 Years prior to replacement.</li>
                    <li>Replacement of an immediate, temporary, full Denture with a permanent, full Denture, if the immediate, temporary, full Denture cannot be made permanent and such replacement is done within 12 months of the installation of the immediate, temporary, full Denture.</li>
                    <li>Relinings and rebasings of existing removable Dentures:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>if at least 6 months have passed since the installation of the existing removable Denture; and</li>
                        <li>not more than once in any 36 month period.</li>
                      </ul>
                    </li>
                    <li>Re-cementing of Cast Restorations or Dentures, but not more than once in a 12 month period.</li>
                    <li>Adjustments of Dentures, if at least 6 months have passed since the installation of the Denture and not more than once in any 12 month period.</li>
                    <li>Initial installation of Cast Restorations (except implant supported Cast Restorations).</li>
                    <li>Replacement of Cast Restorations (except an implant supported Cast Restoration) but only if at least 10 Years have passed since the most recent time that:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>a Cast Restoration was installed for the same tooth; or</li>
                        <li>a Cast Restoration for the same tooth was replaced.</li>
                      </ul>
                    </li>
                    <li>Prefabricated crown, but no more than one replacement for the same tooth within 10 Years.</li>
                    <li>Core buildup, but no more than once per tooth in a period of 10 Years.</li>
                    <li>Posts and cores, but no more than once per tooth in a period of 10 Years.</li>
                    <li>Labial veneers, but no more than once per tooth in a period of 10 Years.</li>
                    <li>Oral surgery, except as mentioned elsewhere in this certificate.</li>
                    <li>Consultations for interpretation of diagnostic image by a Dentist not associated with the capture of the image, but not more than once in a 12 month period.</li>
                    <li>Other consultations, but not more than once in a 12 month period.</li>
                    <li>Root canal treatment, including bone grafts and tissue regeneration procedures in conjunction with periradicular surgery, but not more than once for the same tooth.</li>
                    <li>Other endodontic procedures, such as apicoectomy, retrograde fillings, root amputation, and hemisection.</li>
                    <li>Periodontal scaling and root planing, but no more than once per quadrant in any 24 month period.</li>
                    <li>Full mouth debridements, but not more than once per lifetime.</li>
                    <li>Periodontal surgery, including gingivectomy, gingivoplasty and osseous surgery, but no more than one surgical procedure per quadrant in any 36 month period.</li>
                    <li>Simple extractions. Extractions of primary teeth or adult teeth solely for orthodontic purposes will be treated as orthodontic services.</li>
                    <li>Surgical extractions. Extractions of primary teeth or adult teeth solely for orthodontic purposes will be treated as orthodontic services.</li>
                    <li>Implant services (including sinus augmentation and bone replacement and graft for ridge preservation), but no more than once for the same tooth position in a 10 Year period:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>when needed to replace congenitally missing teeth; or</li>
                        <li>when needed to replace teeth that are lost while the person receiving such benefits was insured for Dental Insurance.</li>
                      </ul>
                    </li>
                    <li>Repair of implants, but no more than once in a 12 month period.</li>
                    <li>Implant supported Cast Restorations, but no more than once for the same tooth position in a 10 Year period:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>when needed to replace congenitally missing teeth; or</li>
                        <li>when needed to replace teeth that are lost while the person receiving such benefits was insured for Dental Insurance.</li>
                      </ul>
                    </li>
                    <li>Implant supported fixed Dentures, but no more than once for the same tooth position in a 10 Year period:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>when needed to replace congenitally missing teeth; or</li>
                        <li>when needed to replace teeth that are lost while the person receiving such benefits was insured for Dental Insurance.</li>
                      </ul>
                    </li>
                    <li>Implant supported removable Dentures, but no more than once for the same tooth position in a 10 Year period:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>when needed to replace congenitally missing teeth; or</li>
                        <li>when needed to replace teeth that are lost while the person receiving such benefits was insured for Dental Insurance.</li>
                      </ul>
                    </li>
                    <li>Tissue conditioning, but not more than once in a 36 month period.</li>
                    <li>Simple repair of Cast Restorations or Dentures other than recementing, but not more than once in a 12 month period.</li>
                    <li>Occlusal adjustments, but not more than once in a 12 month period.</li>
                    <li>Cleaning and inspection of a removable appliance once every 6 months.</li>
                  </ol>
                </div>
                
                {/* Orthodontic Covered Services */}
                <div>
                  <p className="font-bold text-gray-900 mb-2">Orthodontic Covered Services</p>
                  <p className="text-gray-700">Orthodontia, for a Child under 19.</p>
                </div>
                
                {/* Exclusions */}
                <div>
                  <p className="font-bold text-gray-900 mb-2">Dental Insurance: Exclusions</p>
                  <p className="text-gray-700 mb-2">We will not pay Dental Insurance benefits for charges incurred for:</p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-gray-700">
                    <li>services which are not Dentally Necessary, or those which do not meet generally accepted standards of care for treating the particular dental condition;</li>
                    <li>services for which You would not be required to pay in the absence of Dental Insurance;</li>
                    <li>services or supplies received by You or Your Dependent before the Dental Insurance starts for that person;</li>
                    <li>services which are neither performed nor prescribed by a Dentist, except for those services of a licensed Dental Hygienist which are supervised and billed by a Dentist, and which are for:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>scaling and polishing of teeth; or</li>
                        <li>fluoride treatments;</li>
                      </ul>
                    </li>
                    <li>services which are primarily cosmetic, (For residents of Texas, see notice page section);</li>
                    <li>services or appliances which restore or alter occlusion or vertical dimension;</li>
                    <li>restoration of tooth structure damaged by attrition, abrasion or erosion, unless caused by disease;</li>
                    <li>restorations or appliances used for the purpose of periodontal splinting;</li>
                    <li>counseling or instruction about oral hygiene, plaque control, nutrition and tobacco;</li>
                    <li>personal supplies or devices including, but not limited to: water piks, toothbrushes, or dental floss;</li>
                    <li>decoration or inscription of any tooth, device, appliance, crown or other dental work;</li>
                    <li>missed appointments;</li>
                    <li>services:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>covered under any workers' compensation or occupational disease law;</li>
                        <li>covered under any employer liability law;</li>
                        <li>for which the employer of the person receiving such services is required to pay; or</li>
                        <li>received at a facility maintained by the Policyholder, labor union, mutual benefit association, or VA hospital;</li>
                      </ul>
                    </li>
                    <li>services covered under other coverage provided by the Policyholder;</li>
                    <li>biopsies of hard or soft oral tissue;</li>
                    <li>temporary or provisional restorations;</li>
                    <li>temporary or provisional appliances;</li>
                    <li>prescription drugs;</li>
                    <li>services for which the submitted documentation indicates a poor prognosis;</li>
                    <li>the following, when charged by the Dentist on a separate basis:
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        <li>claim form completion;</li>
                        <li>infection control, such as gloves, masks, and sterilization of supplies; or</li>
                        <li>local anesthesia, non-intravenous conscious sedation or analgesia, such as nitrous oxide;</li>
                      </ul>
                    </li>
                    <li>dental services arising out of accidental injury to the teeth and supporting structures, except for injuries to the teeth due to chewing or biting of food;</li>
                    <li>caries susceptibility tests;</li>
                    <li>modification of removable prosthodontic and other removable prosthetic services;</li>
                    <li>fixed and removable appliances for correction of harmful habits;</li>
                    <li>appliances or treatment for bruxism (grinding teeth);</li>
                    <li>initial installation of a Denture or implant or implant supported prosthetic to replace one or more teeth which were missing before such person was insured for Dental Insurance, except for congenitally missing teeth;</li>
                    <li>precision attachments associated with fixed and removable prostheses, except when the precision attachment is related to implant prosthetics;</li>
                    <li>adjustment of a Denture made within 6 months after installation by the same Dentist who installed it;</li>
                    <li>duplicate prosthetic devices or appliances;</li>
                    <li>replacement of a lost or stolen appliance, Cast Restoration or Denture;</li>
                    <li>replacement of an orthodontic device;</li>
                    <li>diagnosis and treatment of temporomandibular joint disorders and cone beam imaging associated with the treatment of temporomandibular joint disorders;</li>
                    <li>intra and extraoral photographic images.</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
          
          <div className="sticky bottom-0 bg-white p-4 border-t">
            <button 
              onClick={onClose}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium text-gray-700"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/**
 * Modal component for displaying provider/network information.
 * Shows the appropriate provider network details based on the plan type.
 * OCP uses Aetna Dental Access network, PRO/MAX use MetLife PDP Plus network.
 * Includes links to external provider search tools.
 */
const ProviderInfoModal = ({ isOpen, onClose, planId }: { isOpen: boolean; onClose: () => void; planId: string }) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white p-5 border-b flex justify-between items-center z-10">
            <h3 className="text-xl font-bold">
              {planId === 'club' && <span className="text-blue-500">SLEEK Dental Club</span>}
              {planId === 'ocp' && <span className="text-teal-500">Provider Network: Aetna Dental Access®</span>}
              {planId === 'pro' && <span className="text-teal-500">Locate A Provider</span>}
              {planId === 'max' && <span className="text-teal-500">Locate A Provider</span>}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
          
          <div className="p-6">
            {/* Club plan - no provider network */}
            {planId === 'club' && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Package className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">Product-Only Plan</h4>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
                    The SLEEK Dental Club is a toothbrush subscription plan and does not include dental provider access. 
                    For dental coverage and provider networks, consider our OCP, PRO, or MAX plans.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <h5 className="font-semibold text-gray-900 mb-3">What You Get:</h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Premium sonic electric toothbrush kit shipped to your door
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Automatic quarterly refills of brush head and floss picks
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      Free shipping in the contiguous United States
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {planId === 'ocp' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">Aetna Dental Access® Network</h4>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    The Aetna Dental Access® network includes over 262,000 dentist locations nationwide. 
                    As a member, you have access to significant discounts on dental services when you visit 
                    participating providers.
                  </p>
                  <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 mb-4">
                    <h5 className="font-semibold text-gray-900 mb-3">Network Highlights</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                        Over 262,000 dentist locations nationwide
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                        Save 15-50% on most dental procedures
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                        No waiting periods or annual maximums
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                        Immediate access to savings
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                        Specialists included in the network
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Provider Search Form */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">Find a Provider</h4>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Enter a valid zip code, then press the search button. The search engine will return a sampling of the participating providers nearest the zip code entered.
                  </p>
                  <form 
                    action="https://providers.bestbenefits.com" 
                    method="post" 
                    target="_blank"
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
                  >
                    <input type="hidden" name="Products" value="AE" />
                    <input type="hidden" name="Title" value="Provider Results" />
                    <div className="flex items-center gap-3">
                      <label htmlFor="ocp-zip" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        Zip Code:
                      </label>
                      <input 
                        type="text" 
                        id="ocp-zip"
                        name="Zip" 
                        maxLength={5}
                        placeholder="Enter zip"
                        className="w-32 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors font-medium text-sm shadow-sm"
                    >
                      Search for Providers
                    </button>
                  </form>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5">
                  <h5 className="font-semibold text-gray-900 mb-2">Important Note</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Always confirm that the provider participates in the Aetna Dental Access® network before your appointment.
                  </p>
                </div>
              </div>
            )}
            
            {(planId === 'pro' || planId === 'max') && (
              <div className="space-y-6">
                {/* MetLife Logo - Left aligned per design requirements */}
                <div className="flex justify-start">
                  <Image 
                    src="/images/metlife-logo-400x88.png" 
                    alt="MetLife" 
                    width={200} 
                    height={44}
                    className="object-contain"
                  />
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    With 153 years of experience, the MetLife companies are a leading innovator and a recognized leader in protection planning and retirement and savings solutions around the world. We have established a strong presence in more than 40 markets globally through organic growth, acquisitions, joint ventures and other partnerships. We are strengthening our global brand by extending core products and competencies to markets around the world, an important driver of growth for the enterprise.
                  </p>
                </div>
                
                {/* Provider Search Instructions */}
                <div className={cn(
                  "border rounded-xl p-5",
                  planId === 'pro' ? "bg-teal-50 border-teal-100" : "bg-teal-50 border-teal-100"
                )}>
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">To Locate a Dentist in the MetLife PDP Plus Network:</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 mb-4">
                    <li>Click on "Find a Dentist" button below</li>
                    <li>Choose "PDP Plus" from the "Your Network" drop down list</li>
                    <li>Enter your zip code and/or your dentist's name</li>
                  </ol>
                  <a 
                    href="https://providers.online.metlife.com/findDentist?searchType=findDentistMetLife" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center px-6 py-3 text-white rounded-xl transition-colors font-medium shadow-sm",
                      planId === 'pro' ? "bg-teal-500 hover:bg-teal-600" : "bg-teal-500 hover:bg-teal-600"
                    )}
                  >
                    <MapPin size={18} className="mr-2" />
                    Find A Dentist
                  </a>
                </div>
              </div>
            )}
          </div>
          
          <div className="sticky bottom-0 bg-white p-4 border-t">
            <button 
              onClick={onClose}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium text-gray-700"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/**
 * PricingSection component displays three pricing tiers with animated reveals.
 * The popular plan receives a premium glow border effect and elevated styling.
 */
const PricingSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // State for plan information modal
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [currentPlanModal, setCurrentPlanModal] = useState('');
  
  // State for provider information modal
  const [providerModalOpen, setProviderModalOpen] = useState(false);
  const [currentProviderModal, setCurrentProviderModal] = useState('');
  
  /**
   * Opens the plan information modal for the specified plan.
   * Sets the current plan ID and opens the modal.
   */
  const openPlanModal = (planId: string) => {
    setCurrentPlanModal(planId);
    setPlanModalOpen(true);
  };
  
  /**
   * Opens the provider information modal for the specified plan.
   * Sets the current plan ID and opens the modal.
   */
  const openProviderModal = (planId: string) => {
    setCurrentProviderModal(planId);
    setProviderModalOpen(true);
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants with near-instant timing for better UX
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -4 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.1, ease: "easeOut" },
    },
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.15) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="container-standard relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-10"
        >
          {/* Section header */}
          <div className="section-header">
            <motion.span 
              variants={itemVariants}
              className="section-badge"
            >
              PRICING PLANS
            </motion.span>
            
            <motion.h2
              variants={itemVariants}
              className="section-title"
            >
              Choose Your Perfect Plan
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="section-subtitle"
            >
              Find the ideal dental care plan for your needs with flexible options and premium benefits
            </motion.p>
          </div>

          {/* Pricing cards grid - explicit 1 column on mobile, 2 on tablet, 4 on desktop */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-5 items-stretch"
          >
            {pricingPlans.map((plan, planIndex) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { 
                  y: -8,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className={cn(
                  "relative flex flex-col h-full",
                  /* Popular card uses z-10 for layering glow effects, no scale transform for consistent mobile layout */
                  plan.isPopular && "z-10"
                )}
              >
                {/* Popular plan glow border effect */}
                {plan.isPopular && (
                  <>
                    {/* Animated gradient border */}
                    <div 
                      className="absolute -inset-[2px] rounded-3xl opacity-80 animate-gradient"
                      style={{
                        background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 25%, #14b8a6 50%, #0f766e 75%, #14b8a6 100%)',
                        backgroundSize: '200% 200%',
                      }}
                    />
                    {/* Glow effect */}
                    <div 
                      className="absolute -inset-[2px] rounded-3xl blur-xl opacity-40"
                      style={{
                        background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                      }}
                    />
                  </>
                )}

                {/* Card container */}
                <div className={cn(
                  "relative rounded-3xl overflow-hidden bg-white flex flex-col h-full",
                  "transition-all duration-300",
                  plan.isPopular 
                    ? "shadow-card-glow" 
                    : "shadow-card border border-gray-100 hover:shadow-card-hover hover:border-teal-200/30"
                )}>
                  {/* Subtle inner highlight for popular card */}
                  {plan.isPopular && (
                    <motion.div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, transparent 50%, rgba(15, 118, 110, 0.05) 100%)'
                      }}
                      animate={prefersReducedMotion ? {} : { 
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    />
                  )}
                  
                  {/* Plan badge */}
                  {plan.badge && (
                    <div 
                      className={cn(
                        "absolute top-0 right-0 py-2 px-5 rounded-bl-2xl shadow-md z-20 font-semibold text-xs text-white tracking-wide",
                        plan.isPopular ? "animate-pulse-slow" : ""
                      )}
                      style={{ 
                        backgroundColor: plan.accentColor,
                        boxShadow: plan.isPopular ? `0 4px 14px ${plan.accentColor}50` : undefined
                      }}
                    >
                      {plan.badge}
                    </div>
                  )}

                  {/* Plan header - responsive padding */}
                  <div className={cn(
                    "p-4 md:p-5 border-b",
                    plan.isPopular
                      ? "bg-gradient-to-br from-teal-50/80 to-white border-teal-100/50"
                      : "bg-gradient-to-br from-gray-50/80 to-white border-gray-100"
                  )}>
                    {/* Plan logo */}
                    <div className="mb-3 h-12 relative flex items-center">
                      <Image
                        src={plan.logo}
                        alt={`${plan.name} Plan Logo`}
                        width={plan.id === 'club' ? 80 : 120}
                        height={plan.id === 'club' ? 24 : 48}
                        className={cn(
                          "object-contain w-auto",
                          plan.id === 'club' ? "h-6" : "h-12"
                        )}
                        style={{ width: 'auto' }}
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 font-heading tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    {/* "Starting at" label shown for all plans to indicate variable pricing */}
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Starting at</p>
                    <div className="flex items-baseline">
                      <span className="text-3xl md:text-4xl font-bold text-gray-900 font-heading tracking-tight">
                        {plan.monthlyPrice}
                      </span>
                      <span className="text-gray-500 ml-1.5 text-base">/month</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {plan.id === 'club' 
                        ? plan.enrollmentFee
                        : `+ ${plan.enrollmentFee} one-time enrollment fee`}
                    </p>
                  </div>

                  {/* Plan features - increased padding and text size for mobile readability */}
                  <div className="p-4 md:p-5 flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-3 text-xs uppercase tracking-wide">
                      What's included:
                    </h4>
                    <ul className="space-y-2.5 md:space-y-2">
                      {plan.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          variants={featureVariants}
                          custom={idx}
                          className={cn(
                            "flex items-start group transition-colors duration-200",
                            feature.included ? "text-gray-800" : "text-gray-400"
                          )}
                        >
                          <div className={cn(
                            "flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mr-2 transition-all duration-300",
                            feature.included 
                              ? plan.isPopular
                                ? "bg-gradient-to-br from-teal-100 to-teal-50 text-teal-600"
                                : "bg-gray-100 text-gray-600 group-hover:bg-teal-100 group-hover:text-teal-600"
                              : "bg-gray-50 text-gray-300"
                          )}>
                            {React.cloneElement(feature.icon as React.ReactElement, { className: 'h-3 w-3' })}
                          </div>
                          <span className={cn(
                            "text-sm md:text-xs leading-snug",
                            !feature.included && "line-through opacity-60"
                          )}>
                            {feature.text}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button - responsive padding */}
                  <div className="p-4 md:p-5 pt-0">
                    <motion.div
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    >
                      <Link
                        href={plan.ctaLink}
                        className={cn(
                          "w-full inline-flex justify-center items-center py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-300",
                          plan.isPopular 
                            ? "text-white" 
                            : "btn-secondary"
                        )}
                        style={plan.isPopular ? {
                          background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                          boxShadow: '0 4px 14px rgba(15, 118, 110, 0.35)',
                        } : undefined}
                      >
                        {plan.ctaText}
                      </Link>
                    </motion.div>
                    
                    {/* Plan Information and Provider Information links - 44px touch targets */}
                    <div className="mt-2 flex justify-center items-center gap-1 text-xs">
                      <button
                        onClick={() => openPlanModal(plan.id)}
                        className="text-gray-500 hover:text-teal-600 transition-colors underline underline-offset-2 px-3 py-2 min-h-[44px] flex items-center"
                      >
                        Plan Info
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => openProviderModal(plan.id)}
                        className="text-gray-500 hover:text-teal-600 transition-colors underline underline-offset-2 px-3 py-2 min-h-[44px] flex items-center"
                      >
                        Providers
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-row items-center justify-center gap-4 sm:gap-6 pt-8"
          >
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                <Check className="h-4 w-4 text-teal-600" />
              </div>
              <span className="font-medium">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                <Shield className="h-4 w-4 text-teal-600" />
              </div>
              <span className="font-medium">Cancel anytime, no commitments</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Plan Information Modal */}
      <PlanInfoModal 
        isOpen={planModalOpen} 
        onClose={() => setPlanModalOpen(false)} 
        planId={currentPlanModal} 
      />
      
      {/* Provider Information Modal */}
      <ProviderInfoModal 
        isOpen={providerModalOpen} 
        onClose={() => setProviderModalOpen(false)} 
        planId={currentProviderModal} 
      />
    </section>
  );
};

export default PricingSection;
