import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Plus_Jakarta_Sans, Lato } from 'next/font/google'
import './globals.css'

// Load Inter font with variable weights for body text
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Add Space Grotesk for headings and accents
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

// Add Plus Jakarta Sans for body text
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
  // Adjust weights if specific ones are needed, e.g., weight: ['400', '700']
  // By default, it loads variable weights if available from the font.
})

// Add Lato font for new typography system with preload
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
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
    <html lang="en" className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable} ${plusJakartaSans.variable} ${lato.variable}`}>
      <head>
        {/* Removed direct Google Font links, next/font handles optimization */}
        <link
          rel="preload"
          href="/images/SleekKit.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className="min-h-screen bg-white font-sans antialiased selection:bg-teal-100 selection:text-teal-900">
        <div className="relative overflow-hidden">
          {/* Ambient background gradient shapes - visible on light backgrounds */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
            <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[60%] rounded-full bg-teal-50/30 blur-3xl" />
            <div className="absolute top-[20%] -right-[20%] w-[70%] h-[40%] rounded-full bg-teal-100/20 blur-3xl" />
            <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] rounded-full bg-teal-50/30 blur-3xl" />
          </div>
          {children}
        </div>
      </body>
    </html>
  )
} 