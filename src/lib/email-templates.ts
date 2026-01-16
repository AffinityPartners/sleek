/**
 * Email templates for partner inquiry forms.
 * These templates use table-based layouts and inline CSS for maximum
 * compatibility with Gmail, Outlook, and other email clients.
 *
 * Design principles:
 * - Table-based layouts (no CSS grid/flexbox)
 * - Inline CSS only (no <style> blocks that get stripped)
 * - Web-safe fonts (Arial, Helvetica, sans-serif)
 * - Max width 600px for mobile compatibility
 * - SLEEK brand colors: teal (#0d9488), dark gray (#1f2937)
 */

/**
 * Form data structure matching the PartnerContactForm component.
 * Used by both email template functions for type safety.
 */
export interface PartnerInquiryData {
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  message?: string;
  partnerType: string;
  subjectLine: string;
}

/**
 * Generates the internal notification email HTML sent to the SLEEK team.
 * Contains all form fields in a clean, scannable format.
 *
 * @param data - The form submission data
 * @returns HTML string for the internal notification email
 */
export function generateInternalNotificationEmail(
  data: PartnerInquiryData
): string {
  const { fullName, email, phone, companyName, message, partnerType } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Partner Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; max-width: 600px;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0d9488; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">New Partner Inquiry</h1>
              <p style="margin: 8px 0 0 0; color: #ccfbf1; font-size: 14px;">${partnerType} Partnership Request</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px 0; color: #374151; font-size: 16px; line-height: 1.5;">
                A new partnership inquiry has been submitted through the website. Details below:
              </p>
              
              <!-- Contact Details Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f9fafb; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    
                    <!-- Name -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 16px;">
                      <tr>
                        <td style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">Full Name</td>
                      </tr>
                      <tr>
                        <td style="color: #1f2937; font-size: 16px; font-weight: 600;">${fullName}</td>
                      </tr>
                    </table>
                    
                    <!-- Email -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 16px;">
                      <tr>
                        <td style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">Email Address</td>
                      </tr>
                      <tr>
                        <td style="color: #1f2937; font-size: 16px;">
                          <a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Phone -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 16px;">
                      <tr>
                        <td style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">Phone Number</td>
                      </tr>
                      <tr>
                        <td style="color: #1f2937; font-size: 16px;">${phone || 'Not provided'}</td>
                      </tr>
                    </table>
                    
                    <!-- Company -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 4px;">Company / Practice</td>
                      </tr>
                      <tr>
                        <td style="color: #1f2937; font-size: 16px; font-weight: 600;">${companyName}</td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
              </table>
              
              <!-- Message Section -->
              ${
                message
                  ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 8px;">Message</td>
                </tr>
                <tr>
                  <td style="color: #374151; font-size: 15px; line-height: 1.6; padding: 16px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #0d9488;">
                    ${message.replace(/\n/g, '<br>')}
                  </td>
                </tr>
              </table>
              `
                  : `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; font-style: italic;">
                    No additional message was provided.
                  </td>
                </tr>
              </table>
              `
              }
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 13px; text-align: center;">
                This inquiry was submitted via the SLEEK Dental Club website.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generates the auto-response email HTML sent to the person who submitted the form.
 * Confirms receipt and sets expectations for follow-up.
 *
 * @param data - The form submission data
 * @returns HTML string for the auto-response email
 */
export function generateAutoResponseEmail(data: PartnerInquiryData): string {
  const { fullName, partnerType } = data;

  // Extract first name for a more personal greeting
  const firstName = fullName.split(' ')[0];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Interest</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; max-width: 600px;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0d9488; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">SLEEK Dental Club</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px 0; color: #1f2937; font-size: 20px; font-weight: bold;">
                Thank you for your interest, ${firstName}!
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                We have received your ${partnerType} partnership inquiry and appreciate you reaching out to SLEEK Dental Club.
              </p>
              
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Our partnerships team will review your information and get back to you within 24-48 business hours.
              </p>
              
              <!-- What to Expect Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f0fdfa; border-radius: 8px; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 12px 0; color: #0d9488; font-size: 16px; font-weight: bold;">What happens next?</h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 15px; line-height: 1.5;">
                          1. Our team reviews your inquiry
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 15px; line-height: 1.5;">
                          2. We will reach out to schedule a brief call
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #374151; font-size: 15px; line-height: 1.5;">
                          3. Together, we will explore the best partnership fit
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                In the meantime, if you have any questions, feel free to reply to this email or contact us at 
                <a href="mailto:support@sleekdentalclub.com" style="color: #0d9488; text-decoration: none;">support@sleekdentalclub.com</a>.
              </p>
              
              <p style="margin: 24px 0 0 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #1f2937;">The SLEEK Dental Club Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;">
                SLEEK Dental Club
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                <a href="https://sleekdentalclub.com" style="color: #0d9488; text-decoration: none;">sleekdentalclub.com</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generates plain text version of the internal notification email.
 * Used as fallback for email clients that don't support HTML.
 *
 * @param data - The form submission data
 * @returns Plain text string for the internal notification email
 */
export function generateInternalNotificationText(
  data: PartnerInquiryData
): string {
  const { fullName, email, phone, companyName, message, partnerType } = data;

  return `
NEW PARTNER INQUIRY - ${partnerType}
========================================

Contact Details:
- Full Name: ${fullName}
- Email: ${email}
- Phone: ${phone || 'Not provided'}
- Company/Practice: ${companyName}

Message:
${message || 'No additional message was provided.'}

----------------------------------------
This inquiry was submitted via the SLEEK Dental Club website.
  `.trim();
}

/**
 * Generates plain text version of the auto-response email.
 * Used as fallback for email clients that don't support HTML.
 *
 * @param data - The form submission data
 * @returns Plain text string for the auto-response email
 */
export function generateAutoResponseText(data: PartnerInquiryData): string {
  const { fullName, partnerType } = data;
  const firstName = fullName.split(' ')[0];

  return `
Thank you for your interest, ${firstName}!

We have received your ${partnerType} partnership inquiry and appreciate you reaching out to SLEEK Dental Club.

Our partnerships team will review your information and get back to you within 24-48 business hours.

WHAT HAPPENS NEXT?
1. Our team reviews your inquiry
2. We will reach out to schedule a brief call
3. Together, we will explore the best partnership fit

In the meantime, if you have any questions, feel free to reply to this email or contact us at support@sleekdentalclub.com.

Best regards,
The SLEEK Dental Club Team

----------------------------------------
SLEEK Dental Club
https://sleekdentalclub.com
  `.trim();
}
