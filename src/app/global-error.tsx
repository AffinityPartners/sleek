'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, ArrowLeft, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Global Error Page - Catches errors that occur in the root layout.tsx itself.
 *
 * This is different from error.tsx which catches errors in route segments.
 * Since this replaces the entire root layout when active, it must define its own
 * <html> and <body> tags and cannot use the normal layout's font configuration.
 *
 * Key features:
 * - Full HTML document structure (required since it replaces root layout)
 * - Inline Lato font loading via Google Fonts
 * - Development vs production error detail display
 * - Error logging for debugging and future error tracking integration
 * - Accessible UI with proper ARIA attributes
 * - Matching design aesthetic with not-found.tsx (dark gradient, teal accents)
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Log the error when the component mounts.
   * In production, this could be extended to send errors to a monitoring service
   * like Sentry, LogRocket, or a custom error tracking endpoint.
   */
  useEffect(() => {
    console.error('Global error caught:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      digest: error.digest,
    });
    // Future integration point for error tracking services:
    // sendToErrorTracker(error);
  }, [error]);

  /**
   * Animation variants for staggered content reveal.
   * Matches the animation style used in not-found.tsx for consistency.
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
    },
  };

  return (
    <html lang="en" style={{ fontFamily: 'Lato, system-ui, sans-serif' }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <title>Something went wrong | SLEEK Dental Club</title>
        <meta name="description" content="An unexpected error occurred. Please try again." />
        {/* Load Lato font directly since we can't use Next.js font optimization here */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        {/* Inline critical styles to ensure the page renders correctly */}
        <style dangerouslySetInnerHTML={{ __html: `
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html, body { height: 100%; overflow-x: hidden; }
          body { 
            min-height: 100vh;
            background: linear-gradient(to bottom, #0a1e2c, #0d2837);
            color: white;
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); }
            50% { box-shadow: 0 0 40px rgba(239, 68, 68, 0.5); }
          }
        `}} />
      </head>
      <body>
        <main 
          className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #0a1e2c, #0d2837)',
            color: 'white',
          }}
        >
          {/* Background ambient gradient orbs for visual depth */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div
              style={{
                position: 'absolute',
                top: '20%',
                right: '10%',
                width: '40%',
                height: '40%',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.1)',
                filter: 'blur(100px)',
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '30%',
                height: '30%',
                borderRadius: '50%',
                background: 'rgba(0, 224, 203, 0.1)',
                filter: 'blur(100px)',
                opacity: 0.7,
              }}
            />
          </div>

          <motion.div
            style={{
              maxWidth: '32rem',
              width: '100%',
              margin: '0 auto',
              padding: '5rem 1rem',
              textAlign: 'center',
              position: 'relative',
              zIndex: 10,
            }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Animated error icon with pulsing glow effect */}
            <motion.div variants={itemVariants} style={{ marginBottom: '2rem', margin: '0 auto 2rem' }}>
              <div
                style={{
                  position: 'relative',
                  width: '10rem',
                  height: '10rem',
                  margin: '0 auto',
                }}
              >
                {/* Glow background */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(239, 68, 68, 0.2), rgba(251, 146, 60, 0.2))',
                    borderRadius: '50%',
                    filter: 'blur(24px)',
                  }}
                />
                {/* Icon container with animation */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse-glow 3s ease-in-out infinite',
                    borderRadius: '50%',
                  }}
                >
                  <AlertTriangle size={80} color="#ef4444" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            {/* Error heading */}
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                background: 'linear-gradient(to right, #ef4444, #fb923c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Something went wrong
            </motion.h1>

            {/* Friendly error message */}
            <motion.p
              variants={itemVariants}
              style={{
                color: '#d1d5db',
                marginBottom: '1.5rem',
                fontSize: '1.125rem',
                lineHeight: 1.6,
              }}
            >
              We encountered an unexpected error. Don&apos;t worry, our team has been notified 
              and we&apos;re working to fix it.
            </motion.p>

            {/* Error details section - shown in development or when user expands */}
            {(isDevelopment || error.digest) && (
              <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                  aria-expanded={showDetails}
                  aria-controls="error-details"
                >
                  {showDetails ? 'Hide' : 'Show'} technical details
                  {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {showDetails && (
                  <div
                    id="error-details"
                    style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.75rem',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                      fontFamily: 'ui-monospace, monospace',
                    }}
                  >
                    {error.digest && (
                      <p style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>
                        <strong style={{ color: '#d1d5db' }}>Error ID:</strong> {error.digest}
                      </p>
                    )}
                    <p style={{ color: '#9ca3af', marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#d1d5db' }}>Error:</strong> {error.name}
                    </p>
                    <p style={{ color: '#9ca3af', marginBottom: isDevelopment ? '0.5rem' : 0 }}>
                      <strong style={{ color: '#d1d5db' }}>Message:</strong> {error.message}
                    </p>
                    {isDevelopment && error.stack && (
                      <details style={{ marginTop: '0.75rem' }}>
                        <summary
                          style={{
                            color: '#9ca3af',
                            cursor: 'pointer',
                            userSelect: 'none',
                          }}
                        >
                          Stack trace
                        </summary>
                        <pre
                          style={{
                            marginTop: '0.5rem',
                            padding: '0.75rem',
                            background: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '0.5rem',
                            overflow: 'auto',
                            maxHeight: '200px',
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                          }}
                        >
                          {error.stack}
                        </pre>
                      </details>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Action buttons */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Primary action: Try Again */}
              <button
                onClick={reset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(to right, #00e0cb, #5cbbff)',
                  borderRadius: '0.75rem',
                  color: 'white',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 14px rgba(0, 224, 203, 0.3)',
                  minWidth: '160px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 224, 203, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 224, 203, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <RefreshCw size={18} />
                <span>Try Again</span>
              </button>

              {/* Secondary actions row */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link
                  href="/"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    minWidth: '140px',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <Home size={18} />
                  <span>Go Home</span>
                </Link>

                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.history.back();
                    }
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    color: 'white',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    minWidth: '140px',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <ArrowLeft size={18} />
                  <span>Go Back</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </body>
    </html>
  );
}
