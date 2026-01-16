import { Resend } from 'resend';

/**
 * Resend client instance for sending transactional emails.
 * Requires RESEND_API_KEY environment variable to be set.
 *
 * Usage:
 * - Import this client in API routes to send emails
 * - The API key is read from environment variables at runtime
 *
 * @see https://resend.com/docs/introduction
 */
export const resend = new Resend(process.env.RESEND_API_KEY);
