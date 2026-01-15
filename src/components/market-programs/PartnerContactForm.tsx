'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, Building2, User, Mail, Phone, MessageSquare } from 'lucide-react';

/**
 * Props for the PartnerContactForm component.
 * Allows customization of the email subject line based on partner type.
 */
interface PartnerContactFormProps {
  /** Subject line prefix for the mailto link (e.g., "Dentist Partnership Inquiry") */
  subjectLine: string;
  /** Partner type label shown in the form title */
  partnerType: string;
}

/**
 * PartnerContactForm is a contact form component for market program pages.
 * Uses mailto submission to send inquiries to partners@sleekdentalclub.com.
 * Form data is URL-encoded and included in the email body.
 * 
 * Features:
 * - Client-side form handling with mailto submission
 * - Input validation for required fields
 * - Premium styling consistent with the SLEEK design system
 * - Accessible form labels and error messaging
 */
export default function PartnerContactForm({
  subjectLine,
  partnerType,
}: PartnerContactFormProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Form state management
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Validates the form data and returns true if all required fields are filled.
   * Sets error messages for any invalid fields.
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company/Practice name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission by opening the user's email client with
   * a pre-populated mailto link containing the form data.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Build the email body from form data
    const emailBody = `
Partner Inquiry - ${partnerType}

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company/Practice: ${formData.companyName}

Message:
${formData.message || 'No additional message provided.'}
    `.trim();

    // Construct the mailto URL with encoded parameters
    const mailtoUrl = `mailto:partners@sleekdentalclub.com?subject=${encodeURIComponent(
      subjectLine
    )}&body=${encodeURIComponent(emailBody)}`;

    // Open the user's email client
    window.location.href = mailtoUrl;
  };

  /**
   * Updates form state when an input value changes.
   * Also clears any existing error for that field.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: prefersReducedMotion ? 10 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="py-16 md:py-20"
    >
      <div className="container-standard">
        <div className="max-w-2xl mx-auto">
          {/* Form header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">
              Get in Touch
            </h2>
            <p className="text-gray-600">
              Ready to partner with SLEEK? Fill out the form below and our team will contact you within 24-48 hours.
            </p>
          </div>

          {/* Contact form card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name field (required) */}
              <div>
                <label
                  htmlFor="fullName"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <User className="w-4 h-4 text-gray-400" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`input ${errors.fullName ? 'border-red-300 focus:border-red-400' : ''}`}
                  placeholder="John Smith"
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1.5 text-sm text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email field (required) */}
              <div>
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <Mail className="w-4 h-4 text-gray-400" />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input ${errors.email ? 'border-red-300 focus:border-red-400' : ''}`}
                  placeholder="john@example.com"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone field (optional) */}
              <div>
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <Phone className="w-4 h-4 text-gray-400" />
                  Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Company/Practice Name field (required) */}
              <div>
                <label
                  htmlFor="companyName"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <Building2 className="w-4 h-4 text-gray-400" />
                  Company / Practice Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`input ${errors.companyName ? 'border-red-300 focus:border-red-400' : ''}`}
                  placeholder="Smith Dental Practice"
                  aria-describedby={errors.companyName ? 'companyName-error' : undefined}
                  aria-invalid={errors.companyName ? 'true' : 'false'}
                />
                {errors.companyName && (
                  <p id="companyName-error" className="mt-1.5 text-sm text-red-600">
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Message field (optional) */}
              <div>
                <label
                  htmlFor="message"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                >
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  Message <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="input resize-none"
                  placeholder="Tell us about your interest in partnering with SLEEK..."
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                className="w-full btn-primary-lg justify-center"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Send Inquiry
              </motion.button>

              {/* Privacy note */}
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our{' '}
                <a href="/privacy" className="text-teal-600 hover:text-teal-700 underline">
                  Privacy Policy
                </a>
                . We will never share your information with third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
