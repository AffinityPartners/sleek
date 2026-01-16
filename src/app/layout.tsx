import type { Metadata, Viewport } from 'next'
import { Lato } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { createBaseSchemaGraph } from '@/lib/schema'

/**
 * Lato font for all typography (headings and body).
 * A clean, professional humanist sans-serif with excellent readability.
 * Works well at all sizes from body text to large display headlines.
 * Weight 300 for light/subtle text, 400 for body, 700 for emphasis/headings, 900 for display.
 */
const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
  weight: ['300', '400', '700', '900'],
  preload: true,
})

/**
 * Viewport configuration for mobile devices.
 * maximumScale: 5 allows users to zoom for accessibility (WCAG compliance).
 * The previous value of 1 prevented zooming which is an accessibility issue.
 */
export const viewport: Viewport = {
  themeColor: '#07675e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/**
 * Site-wide default metadata configuration for SEO and social sharing.
 *
 * This serves as the base metadata that individual pages can override.
 * OpenGraph and Twitter images use the static social-share.png for consistent
 * branding across all platforms (iMessage, Slack, Twitter/X, Facebook, LinkedIn, etc.).
 *
 * Individual pages should export their own metadata to override these defaults
 * with page-specific titles, descriptions, and canonical URLs.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://sleekdentalclub.com'),
  title: {
    default: 'SLEEK Dental Club | Premium Electric Toothbrush + Dental Coverage',
    template: '%s | SLEEK Dental Club',
  },
  description:
    'SLEEK Dental Club offers affordable dental care memberships with premium sonic electric toothbrush kits, quarterly refills, and dental insurance options.',
  keywords: [
    'dental membership',
    'electric toothbrush',
    'dental insurance',
    'oral care subscription',
    'MetLife dental',
  ],
  authors: [{ name: 'SLEEK Dental Club' }],
  creator: 'SLEEK Dental Club',
  publisher: 'Affinity Partners Marketing, LLC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  /**
   * Favicon configuration for browsers, Google, and mobile devices.
   * - favicon.ico (32x32) is auto-served by Next.js from src/app/favicon.ico
   * - icon-192.png is the preferred size for Google and PWA
   * - icon-512.png is used for PWA splash screens
   * - apple-touch-icon.png (180x180) is for iOS home screen bookmarks
   */
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  /**
   * Link to web manifest for PWA support and improved Google indexing.
   * The manifest provides app metadata including icons for install prompts.
   */
  manifest: '/manifest.json',
  openGraph: {
    title: 'SLEEK Dental Club | Premium Electric Toothbrush + Dental Coverage',
    description:
      'Affordable dental care memberships with premium sonic electric toothbrush kits and dental insurance options.',
    url: 'https://sleekdentalclub.com',
    siteName: 'SLEEK Dental Club',
    images: [
      {
        url: '/images/social-share.png',
        width: 1200,
        height: 630,
        alt: 'SLEEK Dental Club - Premium Electric Toothbrush and Dental Coverage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SLEEK Dental Club | Premium Electric Toothbrush + Dental Coverage',
    description:
      'Affordable dental care memberships with premium sonic electric toothbrush kits and dental insurance options.',
    images: ['/images/social-share.png'],
    creator: '@sleekdentalclub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-site-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  category: 'Health & Dental Care',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${lato.variable}`}>
      <head>
        {/* Preload critical hero image for faster LCP */}
        <link
          rel="preload"
          href="/images/SleekKit.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className="min-h-screen bg-white font-body antialiased selection:bg-teal-200 selection:text-teal-900">
        {/* Site-wide JSON-LD structured data for Organization and WebSite */}
        <Script
          id="site-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createBaseSchemaGraph()),
          }}
        />
        
        {/* Global grain texture overlay for premium feel */}
        <div className="grain-overlay" aria-hidden="true" />
        
        <div className="relative overflow-hidden">
          {/* Enhanced ambient background gradient shapes */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
            <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[60%] rounded-full bg-gradient-to-br from-teal-100/40 to-teal-50/20 blur-3xl animate-pulse-slow" />
            <div className="absolute top-[20%] -right-[20%] w-[70%] h-[40%] rounded-full bg-gradient-to-bl from-teal-100/30 to-teal-50/20 blur-3xl" />
            <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] rounded-full bg-gradient-to-tr from-teal-100/30 to-transparent blur-3xl" />
          </div>
          {children}
        </div>
      </body>
    </html>
  )
} 