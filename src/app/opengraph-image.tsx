/**
 * Dynamic OpenGraph Image Generator for SLEEK Dental
 *
 * Generates a premium, brand-accurate social share image using Next.js ImageResponse API.
 * Features a dark charcoal gradient background with teal accent glows, the SLEEK logo
 * rendered via embedded SVG paths, brand tagline, and a subtle toothbrush silhouette.
 *
 * This file is automatically detected by Next.js and used for og:image meta tags.
 * The image is generated at the edge for optimal performance.
 */
import { ImageResponse } from 'next/og'

/** Use edge runtime for optimal image generation performance */
export const runtime = 'edge'

/** Alt text for accessibility and SEO */
export const alt = 'SLEEK Dental - A Dental Experience Worth Smiling About'

/** Standard OpenGraph image dimensions (1200x630) */
export const size = {
  width: 1200,
  height: 630,
}

/** Output format */
export const contentType = 'image/png'

/**
 * SLEEK logo SVG path data extracted from the brand assets.
 * Original viewBox: 0 0 561.72 147.97
 * These paths render the "SLEEK" wordmark.
 */
const SLEEK_LOGO_PATHS = {
  // S letter
  S: 'M92.62,33.28c-1.21-5.84-3.62-10.87-7.65-15.29-8.65-9.26-22.54-13.08-35.22-12.88-13.28.2-28.37,5.03-36.83,16.1-5.03,6.24-6.84,13.68-6.24,21.53,3.62,49.3,82.71,10.67,92.37,55.74,6.44,29.78-21.93,47.49-48.7,47.49-20.53,0-45.48-11.67-47.89-34.41l-.2-1.41,3.22-.4.2,1.41c2.21,21.13,25.76,31.79,44.88,31.79,24.55,0,51.11-15.9,45.28-43.87C86.79,57.23,7.3,95.46,3.68,42.94c-.8-8.45,1.41-16.7,6.64-23.54C30.84-7.17,88.8-3.75,95.64,32.68l.2,1.61-3.02.6-.2-1.61Z',
  // L letter
  L: 'M138.5,141.34h75.66v3.22h-78.88V3.9h3.22v137.44Z',
  // E letter (first)
  E1: 'M250.18,141.54h74.86v3.02h-78.08V3.9h77.68v3.02h-74.46v65.6h72.85v3.22h-72.85v65.8Z',
  // E letter (second)
  E2: 'M363.07,141.54h74.86v3.02h-78.08V3.9h77.68v3.02h-74.46v65.6h72.85v3.22h-72.85v65.8Z',
  // K letter
  K: 'M559.72,4.03v140.66h-3.02V4.03h3.02ZM552.07,75.87l-78.08,68.82h-4.63s79.89-70.63,79.89-70.63L478.02,4.03h4.02s70.03,68.62,70.03,68.62v3.22Z',
}

/** Original SVG viewBox dimensions for proper scaling */
const LOGO_VIEWBOX = {
  width: 561.72,
  height: 147.97,
}

/** Brand color palette */
const COLORS = {
  backgroundDark: '#0C1015',
  backgroundMid: '#141B1D',
  background: '#1B2223',
  tealPrimary: '#0F766E',
  tealLight: '#14B8A6',
  tealAccent: '#2DD4BF',
  white: '#FFFFFF',
  whiteMuted: 'rgba(255, 255, 255, 0.7)',
}

/**
 * Generates the SLEEK Dental OpenGraph image.
 * Fetches the Lato font from Google Fonts and renders a premium dark-themed
 * social share image with the brand logo, tagline, and subtle product elements.
 *
 * Note: @vercel/og requires TTF/OTF format fonts, not WOFF2. We fetch from
 * Google Fonts API with a user-agent that requests truetype format.
 */
/**
 * Converts an ArrayBuffer to a base64 data URL.
 */
function arrayBufferToBase64(buffer: ArrayBuffer, mimeType: string): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:${mimeType};base64,${btoa(binary)}`;
}

export default async function Image() {
  // Fetch the toothbrush product image and convert to base64
  // This ensures the image is embedded directly in the OG image
  const productImageData = await fetch(
    'https://sleekdentalclub.com/images/edited_product_photography__32d59bd3.png'
  )
    .then((res) => res.arrayBuffer())
    .then((buffer) => arrayBufferToBase64(buffer, 'image/png'))
    .catch(() => null); // Return null if image fetch fails

  // Fetch Lato font in TTF format (required by @vercel/og, WOFF2 is not supported)
  const latoFontData = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/lato@latest/latin-400-normal.ttf'
  ).then((res) => res.arrayBuffer());

  // Fetch Lato Bold font in TTF format
  const latoBoldFontData = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/lato@latest/latin-700-normal.ttf'
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left side - Black with logo */}
        <div
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
          }}
        >
          {/* SLEEK Logo rendered via SVG */}
          <svg
            width={LOGO_VIEWBOX.width * 0.6}
            height={LOGO_VIEWBOX.height * 0.6}
            viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
          >
            {/* Render each letter path */}
            <path
              d={SLEEK_LOGO_PATHS.S}
              fill={COLORS.white}
              stroke={COLORS.white}
              strokeWidth="3"
              strokeMiterlimit="10"
            />
            <path
              d={SLEEK_LOGO_PATHS.L}
              fill={COLORS.white}
              stroke={COLORS.white}
              strokeWidth="3"
              strokeMiterlimit="10"
            />
            <path
              d={SLEEK_LOGO_PATHS.E1}
              fill={COLORS.white}
              stroke={COLORS.white}
              strokeWidth="3"
              strokeMiterlimit="10"
            />
            <path
              d={SLEEK_LOGO_PATHS.E2}
              fill={COLORS.white}
              stroke={COLORS.white}
              strokeWidth="3"
              strokeMiterlimit="10"
            />
            <path
              d={SLEEK_LOGO_PATHS.K}
              fill={COLORS.white}
              stroke={COLORS.white}
              strokeWidth="3"
              strokeMiterlimit="10"
            />
          </svg>
        </div>

        {/* Right side - Teal with toothbrush image */}
        <div
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.tealLight,
            position: 'relative',
          }}
        >
          {/* Toothbrush product image - embedded as base64 */}
          {productImageData && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={productImageData}
              alt="SLEEK Toothbrush"
              width={420}
              height={580}
              style={{
                objectFit: 'contain',
                transform: 'rotate(15deg)',
              }}
            />
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Lato',
          data: latoFontData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Lato',
          data: latoBoldFontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  )
}
