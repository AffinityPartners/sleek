import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the response
  const response = NextResponse.next();

  // Base CSP directives
  let csp = "default-src 'self'; ";
  csp += "frame-src 'self' https://player.vimeo.com https://*.vimeo.com; ";
  csp += "img-src 'self' data: https://images.unsplash.com https://*.vimeocdn.com; ";
  csp += "connect-src 'self' https://vimeo.com https://*.vimeo.com; ";
  csp += "script-src 'self' 'unsafe-inline' https://player.vimeo.com https://*.vimeo.com";
  // Add 'unsafe-eval' in development for Next.js Fast Refresh
  if (process.env.NODE_ENV === 'development') {
    csp += " 'unsafe-eval'";
  }
  csp += "; "; // Semicolon after script-src
  csp += "style-src 'self' 'unsafe-inline'; ";
  csp += "worker-src 'self' blob:;";


  // Add security headers to allow Vimeo embeds - use single line format
  response.headers.set(
    'Content-Security-Policy',
    csp
  );

  // Add feature policy for autoplay
  response.headers.set(
    'Permissions-Policy',
    'autoplay=*, fullscreen=*'
  );

  return response;
}

// Only apply middleware to pages that might have Vimeo embed
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}; 