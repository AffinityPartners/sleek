/**
 * Next.js Configuration
 *
 * Enhanced configuration for performance, security, and SEO.
 * Includes image optimization, security headers, and compression.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  /**
   * Image Optimization Configuration
   *
   * Enables modern image formats (AVIF, WebP) for better compression
   * and faster loading times. Device sizes are optimized for common breakpoints.
   */
  images: {
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],

    // Remote patterns for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],

    // Device sizes for responsive images (matches Tailwind breakpoints)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],

    // Image sizes for fixed-width images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Minimum cache TTL for optimized images (1 year in seconds)
    minimumCacheTTL: 31536000,
  },

  /**
   * Compression Configuration
   *
   * Enables gzip compression for all responses to reduce bandwidth usage.
   */
  compress: true,

  /**
   * Powered-by Header
   *
   * Removes the X-Powered-By header for security (prevents server fingerprinting).
   */
  poweredByHeader: false,

  /**
   * Security Headers
   *
   * Comprehensive security headers to protect against common vulnerabilities.
   * These headers enhance SEO indirectly by improving site trustworthiness.
   */
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: '/:path*',
        headers: [
          {
            // Prevents clickjacking by disallowing iframe embedding
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            // Prevents MIME type sniffing
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Enables XSS filtering in browsers
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            // Controls referrer information sent with requests
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Permissions policy (formerly Feature-Policy)
            // Controls browser features the site can use
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            // Strict Transport Security - forces HTTPS
            // max-age is 1 year, includes subdomains
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
      {
        // Cache static assets for better performance
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache blog images
        source: '/blog/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  /**
   * Redirects Configuration
   *
   * Handles common URL patterns and ensures canonical URLs.
   */
  async redirects() {
    return [
      // Redirect www to non-www (canonical URL)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.sleekdentalclub.com',
          },
        ],
        destination: 'https://sleekdentalclub.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
