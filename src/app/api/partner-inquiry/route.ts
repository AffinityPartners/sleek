import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import {
  PartnerInquiryData,
  generateInternalNotificationEmail,
  generateInternalNotificationText,
  generateAutoResponseEmail,
  generateAutoResponseText,
} from '@/lib/email-templates';
import {
  checkRateLimit,
  getClientIp,
  createRateLimitHeaders,
  RATE_LIMITS,
} from '@/lib/rate-limit';

/**
 * Request body interface for partner inquiry submissions.
 * Matches the form fields from PartnerContactForm component.
 */
interface PartnerInquiryRequest {
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  message?: string;
  partnerType: string;
  subjectLine: string;
  /** Honeypot field - should be empty for legitimate submissions */
  website?: string;
}

/**
 * Validates an email address format using a basic regex pattern.
 * This is a server-side validation to complement client-side checks.
 *
 * @param email - The email address to validate
 * @returns True if the email format is valid, false otherwise
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * POST handler for partner inquiry form submissions.
 *
 * This endpoint:
 * 1. Validates required fields (fullName, email, companyName, partnerType)
 * 2. Sends an internal notification email to the partnerships team
 * 3. Sends an auto-response confirmation email to the submitter
 *
 * Both emails are sent in parallel for faster response times.
 * If either email fails, the endpoint still returns success if at least
 * the internal notification was sent (to ensure no inquiries are lost).
 *
 * Environment variables required:
 * - RESEND_API_KEY: Resend API key for authentication
 * - RESEND_FROM_EMAIL: Verified sender email address
 * - PARTNER_NOTIFICATION_EMAIL: Email address for internal notifications
 *
 * @returns JSON response with success status or error message
 */
export async function POST(request: Request) {
  try {
    // Rate limit check - prevents spam and abuse
    // Using FORM_SUBMISSION preset: 5 requests per minute per IP
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(clientIp, RATE_LIMITS.FORM_SUBMISSION);

    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        {
          error: 'Too many requests. Please wait a moment before trying again.',
        },
        {
          status: 429,
          headers: createRateLimitHeaders(
            rateLimitResult,
            RATE_LIMITS.FORM_SUBMISSION.maxRequests
          ),
        }
      );
    }

    const body: PartnerInquiryRequest = await request.json();
    const {
      fullName,
      email,
      phone,
      companyName,
      message,
      partnerType,
      subjectLine,
      website,
    } = body;

    // Honeypot spam check - if this field is filled, it's likely a bot
    // Legitimate users won't see this field, so it should always be empty
    // Return a fake success to avoid tipping off the bot
    if (website) {
      console.log('Honeypot triggered - likely spam submission blocked');
      return NextResponse.json({
        success: true,
        message: 'Your inquiry has been submitted successfully.',
      });
    }

    // Validate required fields
    if (!fullName?.trim()) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (!companyName?.trim()) {
      return NextResponse.json(
        { error: 'Company/Practice name is required' },
        { status: 400 }
      );
    }

    if (!partnerType?.trim()) {
      return NextResponse.json(
        { error: 'Partner type is required' },
        { status: 400 }
      );
    }

    // Prepare email data object
    const emailData: PartnerInquiryData = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      companyName: companyName.trim(),
      message: message?.trim(),
      partnerType,
      subjectLine,
    };

    // Get environment variables with fallbacks
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const notificationEmail =
      process.env.PARTNER_NOTIFICATION_EMAIL || 'support@sleekdentalclub.com';

    // Send both emails in parallel for faster response
    const [internalResult, autoResponseResult] = await Promise.allSettled([
      // Internal notification to the partnerships team
      resend.emails.send({
        from: fromEmail,
        to: [notificationEmail],
        subject: `${subjectLine} - ${fullName}`,
        html: generateInternalNotificationEmail(emailData),
        text: generateInternalNotificationText(emailData),
        replyTo: email,
      }),

      // Auto-response confirmation to the submitter
      resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: 'Thank you for your interest in SLEEK Dental Club',
        html: generateAutoResponseEmail(emailData),
        text: generateAutoResponseText(emailData),
        replyTo: notificationEmail,
      }),
    ]);

    // Check if internal notification was sent successfully
    // This is critical since we don't want to lose any inquiries
    if (internalResult.status === 'rejected') {
      console.error(
        'Failed to send internal notification:',
        internalResult.reason
      );
      return NextResponse.json(
        { error: 'Failed to submit inquiry. Please try again.' },
        { status: 500 }
      );
    }

    // Log if auto-response failed (but don't fail the request)
    // The internal notification was sent, so the inquiry is not lost
    if (autoResponseResult.status === 'rejected') {
      console.error(
        'Failed to send auto-response email:',
        autoResponseResult.reason
      );
    }

    // Check for Resend API errors in the internal notification
    const internalData = internalResult.value;
    if (internalData.error) {
      console.error('Resend API error (internal):', internalData.error);
      return NextResponse.json(
        { error: 'Failed to submit inquiry. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted successfully.',
    });
  } catch (err) {
    console.error('Partner inquiry error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
