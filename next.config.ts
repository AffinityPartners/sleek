import type { NextConfig } from 'next';
import { legacyRedirects } from './src/lib/redirects';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com', pathname: '**' }],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  async redirects() {
    return [
      ...legacyRedirects,
      // --- Legacy WordPress/Avada pattern redirects (from GSC 404 export 2026-06-23) ---
      // Old WP taxonomy archives -> blog index (they listed articles).
      { source: '/category/:path*', destination: '/blog', permanent: true },
      { source: '/tag/:path*', destination: '/blog', permanent: true },
      // Malformed legacy privacy sub-paths -> privacy.
      { source: '/privacy-policy/:path*', destination: '/privacy', permanent: true },
      // Defunct Avada/Fusion theme-builder + WP system URLs -> home (no equivalent).
      { source: '/element_category/:path*', destination: '/', permanent: true },
      { source: '/fusion_tb_category/:path*', destination: '/', permanent: true },
      { source: '/slide-page/:path*', destination: '/', permanent: true },
      { source: '/slide/:path*', destination: '/', permanent: true },
      { source: '/comments/:path*', destination: '/', permanent: true },
      // Catch-all for legacy WordPress assets we didn't map explicitly.
      { source: '/wp-content/:path*', destination: '/', permanent: true, basePath: false },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/blog/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
};

export default nextConfig;
