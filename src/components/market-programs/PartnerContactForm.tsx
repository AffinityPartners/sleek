'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Send,
  Building2,
  User,
  Mail,
  Phone,
  MessageSquare,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

/**
 * Props for the PartnerContactForm component.
 * Allows customization of the email subject line based on partner type.
 */
interface PartnerContactFormProps {
  /** Subject line prefix for the email (e.g., "Dentist Partnership Inquiry") */
  subjectLine: string;
  /** Partner type label shown in the form title and used in emails */
  partnerType: string;
}

/**
 * Submission status type for tracking form state.
 * - 'idle': Form is ready for input
 * - 'submitting': Form is being submitted
 * - 'success': Form was submitted successfully
 * - 'error': Form submission failed
 */
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * PartnerContactForm is a contact form component for market program pages.
 * Submits inquiries via API to send emails through Resend.
 *
 * Features:
 * - Server-side form submission via /api/partner-inquiry
 * - Loading state with spinner during submission
 * - Success message with confirmation
 * - Error handling with user-friendly messages
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

  // Honeypot field to catch spam bots
  // This field is hidden from users but bots will typically fill it out
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState<string>('');

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
   * Handles form submission by sending data to the API endpoint.
   * Manages loading state and handles success/error responses.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus('submitting');
    setSubmitError('');

    try {
      const response = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          partnerType,
          subjectLine,
          // Include honeypot field for server-side spam detection
          website: honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      // Success: show confirmation and reset form
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        message: '',
      });
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitStatus('error');
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again.'
      );
    }
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

  /**
   * Resets the form to allow another submission after success or error.
   */
  const handleReset = () => {
    setSubmitStatus('idle');
    setSubmitError('');
  };

  // Show success message after successful submission
  if (submitStatus === 'success') {
    return (
      <motion.section
        initial={{ opacity: 0, y: prefersReducedMotion ? 10 : 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="py-16 md:py-20"
      >
        <div className="container-standard">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">
                Thank You!
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your inquiry has been submitted successfully. Our partnerships
                team will review your information and get back to you within
                24-48 business hours.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                A confirmation email has been sent to your inbox.
              </p>
              <button
                onClick={handleReset}
                className="text-teal-600 hover:text-teal-700 font-medium text-sm underline underline-offset-4"
              >
                Submit another inquiry
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: prefersReducedMotion ? 10 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: prefersReducedMotion ? 0.3 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
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
              Ready to partner with SLEEK? Fill out the form below and our team
              will contact you within 24-48 hours.
            </p>
          </div>

          {/* Contact form card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 md:p-8">
            {/* Error banner */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Submission Failed
                  </p>
                  <p className="text-sm text-red-600 mt-1">{submitError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from users, catches spam bots */}
              {/* Using aria-hidden and tabIndex -1 to hide from screen readers and keyboard navigation */}
              {/* Positioned off-screen rather than display:none to avoid bot detection */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: '-9999px',
                }}
              >
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

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
                  disabled={submitStatus === 'submitting'}
                  className={`input ${errors.fullName ? 'border-red-300 focus:border-red-400' : ''} ${submitStatus === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''}`}
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
                  disabled={submitStatus === 'submitting'}
                  className={`input ${errors.email ? 'border-red-300 focus:border-red-400' : ''} ${submitStatus === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''}`}
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
                  Phone Number{' '}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={submitStatus === 'submitting'}
                  className={`input ${submitStatus === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''}`}
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
                  disabled={submitStatus === 'submitting'}
                  className={`input ${errors.companyName ? 'border-red-300 focus:border-red-400' : ''} ${submitStatus === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''}`}
                  placeholder="Smith Dental Practice"
                  aria-describedby={
                    errors.companyName ? 'companyName-error' : undefined
                  }
                  aria-invalid={errors.companyName ? 'true' : 'false'}
                />
                {errors.companyName && (
                  <p
                    id="companyName-error"
                    className="mt-1.5 text-sm text-red-600"
                  >
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
                  Message{' '}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={submitStatus === 'submitting'}
                  rows={4}
                  className={`input resize-none ${submitStatus === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''}`}
                  placeholder="Tell us about your interest in partnering with SLEEK..."
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="w-full btn-primary-lg justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={
                  prefersReducedMotion || submitStatus === 'submitting'
                    ? {}
                    : { scale: 1.02 }
                }
                whileTap={
                  prefersReducedMotion || submitStatus === 'submitting'
                    ? {}
                    : { scale: 0.98 }
                }
              >
                {submitStatus === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Inquiry
                  </>
                )}
              </motion.button>

              {/* Privacy note */}
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our{' '}
                <a
                  href="/privacy"
                  className="text-teal-600 hover:text-teal-700 underline"
                >
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
