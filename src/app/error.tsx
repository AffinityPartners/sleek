'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, ArrowLeft, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Route-level Error Boundary - Catches errors in route segments.
 *
 * Unlike global-error.tsx, this component runs within the root layout, so it can use
 * the normal styling and fonts configured there. It catches errors that occur in
 * child route segments but not in the root layout itself.
 *
 * Key features:
 * - Uses the root layout's styling and fonts (no need for own html/body)
 * - Development vs production error detail display
 * - Error logging for debugging and future error tracking integration
 * - Accessible UI with proper ARIA attributes
 * - Matching design aesthetic with not-found.tsx and global-error.tsx
 */
export default function Error({
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
    console.error('Route error caught:', {
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
    <main className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#0a1e2c] to-[#0d2837] text-white">
      {/* Background ambient gradient orbs for visual depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-red-500/10 blur-[100px] opacity-60" />
        <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] rounded-full bg-[#00e0cb]/10 blur-[100px] opacity-70" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-[0.02]" />
      </div>

      <motion.div
        className="max-w-lg w-full mx-auto px-4 py-20 text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animated error icon with pulsing glow effect */}
        <motion.div variants={itemVariants} className="mb-8 mx-auto">
          <div className="relative w-40 h-40 mx-auto">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-400/20 rounded-full blur-xl" />
            {/* Icon container with animation */}
            <div className="relative w-full h-full flex items-center justify-center animate-pulse-glow rounded-full">
              <AlertTriangle size={80} className="text-red-500" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        {/* Error heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent"
        >
          Something went wrong
        </motion.h1>

        {/* Friendly error message */}
        <motion.p variants={itemVariants} className="text-gray-300 mb-6 text-lg leading-relaxed">
          We encountered an unexpected error. Don&apos;t worry, our team has been notified 
          and we&apos;re working to fix it.
        </motion.p>

        {/* Error details section - shown in development or when user expands */}
        {(isDevelopment || error.digest) && (
          <motion.div variants={itemVariants} className="mb-8">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-sm hover:bg-white/10 transition-all duration-200"
              aria-expanded={showDetails}
              aria-controls="error-details"
            >
              {showDetails ? 'Hide' : 'Show'} technical details
              {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showDetails && (
              <div
                id="error-details"
                className="mt-4 p-4 bg-black/30 border border-white/10 rounded-xl text-left text-sm font-mono"
              >
                {error.digest && (
                  <p className="text-gray-400 mb-2">
                    <strong className="text-gray-300">Error ID:</strong> {error.digest}
                  </p>
                )}
                <p className="text-gray-400 mb-2">
                  <strong className="text-gray-300">Error:</strong> {error.name}
                </p>
                <p className={`text-gray-400 ${isDevelopment ? 'mb-2' : ''}`}>
                  <strong className="text-gray-300">Message:</strong> {error.message}
                </p>
                {isDevelopment && error.stack && (
                  <details className="mt-3">
                    <summary className="text-gray-400 cursor-pointer select-none hover:text-gray-300 transition-colors">
                      Stack trace
                    </summary>
                    <pre className="mt-2 p-3 bg-black/30 rounded-lg overflow-auto max-h-[200px] text-xs text-gray-400 whitespace-pre-wrap break-words">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4 justify-center items-center">
          {/* Primary action: Try Again */}
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00e0cb] to-[#5cbbff] rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#00e0cb]/20 hover:-translate-y-0.5 min-w-[160px]"
          >
            <RefreshCw size={18} />
            <span>Try Again</span>
          </button>

          {/* Secondary actions row */}
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-white font-medium transition-all duration-300 hover:bg-white/20 min-w-[140px]"
            >
              <Home size={18} />
              <span>Go Home</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-white font-medium transition-all duration-300 hover:bg-white/20 min-w-[140px]"
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
