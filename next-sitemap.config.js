/**
 * Next.js Sitemap Configuration
 * 
 * This configuration generates XML sitemaps and robots.txt for SEO.
 * It includes custom priority and changefreq settings based on page type,
 * and excludes development/test pages from the sitemap.
 * 
 * @see https://github.com/iamvishnusankar/next-sitemap
 */

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Site URL from environment or default
  siteUrl: process.env.SITE_URL || 'https://sleekdentalclub.com',
  
  // Generate robots.txt alongside the sitemap
  generateRobotsTxt: true,
  
  // Exclude test, development, and internal pages from sitemap
  exclude: [
    '/test',
    '/test/*',
    '/marketing/example',
    '/api/*',
    '/_next/*',
  ],
  
  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/test/', '/api/', '/marketing/example'],
      },
    ],
    additionalSitemaps: [
      // Add any additional sitemaps if needed in the future
    ],
  },
  
  /**
   * Transform function to customize each sitemap entry.
   * Sets priority and changefreq based on page type and importance.
   * 
   * @param {object} config - The sitemap config object
   * @param {string} path - The page path being processed
   * @returns {object} The transformed sitemap entry
   */
  transform: async (config, path) => {
    // Default values
    let priority = 0.7;
    let changefreq = 'weekly';
    
    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    // Blog listing page
    else if (path === '/blog') {
      priority = 0.9;
      changefreq = 'daily';
    }
    // Individual blog posts
    else if (path.startsWith('/blog/')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // Sitemap page
    else if (path === '/sitemap') {
      priority = 0.8;
      changefreq = 'weekly';
    }
    // Legal pages (privacy, terms)
    else if (path === '/privacy' || path === '/terms') {
      priority = 0.5;
      changefreq = 'yearly';
    }
    // Marketing pages
    else if (path.startsWith('/marketing/')) {
      priority = 0.6;
      changefreq = 'monthly';
    }
    
    return {
      loc: path, // URL path
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      // Alternate refs can be added here for multilingual support
      // alternateRefs: [],
    };
  },
  
  // Additional configuration options
  generateIndexSitemap: true, // Generate a sitemap index if there are multiple sitemaps
  outDir: 'public', // Output directory for generated files
};
