import type { Metadata, Viewport } from 'next'
import { Outfit, DM_Sans } from 'next/font/google'
import './globals.css'

/**
 * Outfit font for display/headings.
 * Modern, geometric typeface with distinctive character that sets SLEEK apart
 * from generic corporate sites. Excellent for headlines and brand moments.
 */
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800'],
  preload: true,
})

/**
 * DM Sans for body text.
 * Clean, professional sans-serif with excellent readability at all sizes.
 * Pairs beautifully with Outfit for a premium, cohesive typographic system.
 */
const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
  preload: true,
})

export const viewport: Viewport = {
  themeColor: '#07675e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'), // Replace with your actual domain
  title: 'SLEEK Dental | A Dental Experience Worth Smiling About',
  description: 'SLEEK Dental offers affordable dental care memberships with electric toothbrush kits and value-added benefits for individuals and families.',
  icons: {
    icon: [
      {
        url: '/images/SLEEK-Favicon.png',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/images/SLEEK-Favicon.png',
      type: 'image/png',
    },
  },
  openGraph: {
    title: 'SLEEK Dental | A Dental Experience Worth Smiling About',
    description: 'Affordable dental care memberships with electric toothbrush kits and more.',
    url: 'https://yourdomain.com', // Replace with your actual domain
    siteName: 'SLEEK Dental',
    images: [
      {
        url: '/images/og-sleek-dental.png', // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: 'SLEEK Dental Hero Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SLEEK Dental | A Dental Experience Worth Smiling About',
    description: 'Affordable dental care memberships with electric toothbrush kits and more.',
    // creator: '@yourTwitterHandle', // Optional: add your Twitter handle
    images: ['/images/twitter-sleek-dental.png'], // Replace with your actual Twitter image path
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
  // Optional: Add more specific keywords or category if relevant
  // keywords: ['dental care', 'electric toothbrush', 'membership', 'oral health'],
  // category: 'health',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${outfit.variable} ${dmSans.variable}`}>
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
        {/* Global grain texture overlay for premium feel */}
        <div className="grain-overlay" aria-hidden="true" />
        
        <div className="relative overflow-hidden">
          {/* Enhanced ambient background gradient shapes */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
            <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[60%] rounded-full bg-gradient-to-br from-teal-100/40 to-teal-50/20 blur-3xl animate-pulse-slow" />
            <div className="absolute top-[20%] -right-[20%] w-[70%] h-[40%] rounded-full bg-gradient-to-bl from-amber-50/30 to-teal-50/20 blur-3xl" />
            <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] rounded-full bg-gradient-to-tr from-teal-100/30 to-transparent blur-3xl" />
          </div>
          {children}
        </div>
      </body>
    </html>
  )
} 