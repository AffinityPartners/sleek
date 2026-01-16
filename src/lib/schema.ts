/**
 * JSON-LD Schema Utilities for SEO
 *
 * This module provides centralized JSON-LD structured data generators for SEO optimization.
 * All schemas follow Schema.org specifications and are designed to enhance search engine
 * understanding of the site's content, enabling rich snippets and improved rankings.
 *
 * @see https://schema.org/
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Site-wide constants used across all schemas.
 * Centralized here to ensure consistency and easy updates.
 */
export const SITE_CONFIG = {
  name: 'SLEEK Dental Club',
  legalName: 'Affinity Partners Marketing, LLC',
  url: 'https://sleekdentalclub.com',
  logo: 'https://sleekdentalclub.com/images/blog/logo/sleek-black.svg',
  image: 'https://sleekdentalclub.com/images/social-share.png',
  description:
    'Premium dental care memberships with electric toothbrush kits, quarterly refills, and dental insurance benefits. Transform your oral care routine.',
  email: 'members@sleekdentalclub.com',
  telephone: '+1-888-918-2386',
  address: {
    streetAddress: '16775 Addison Rd. Suite 605',
    addressLocality: 'Addison',
    addressRegion: 'TX',
    postalCode: '75001',
    addressCountry: 'US',
  },
  socialProfiles: ['https://www.facebook.com/sleekdentalclub'],
  foundingDate: '2023',
  priceRange: '$$',
} as const;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/**
 * Breadcrumb item for navigation trail schemas.
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * FAQ item for FAQPage schema.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Product information for Product schema.
 */
export interface ProductInfo {
  name: string;
  description: string;
  price: string;
  priceCurrency?: string;
  image?: string;
  sku?: string;
  brand?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  url?: string;
}

// =============================================================================
// ORGANIZATION SCHEMA
// =============================================================================

/**
 * Creates Organization JSON-LD schema.
 * This schema helps search engines understand the business entity behind the website.
 * Should be included on all pages via layout.tsx.
 *
 * Benefits:
 * - Knowledge panel in search results
 * - Brand recognition
 * - Contact information display
 *
 * @returns Organization schema object
 */
export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: {
      '@type': 'ImageObject',
      url: SITE_CONFIG.logo,
      width: 120,
      height: 32,
    },
    image: SITE_CONFIG.image,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.telephone,
    address: {
      '@type': 'PostalAddress',
      ...SITE_CONFIG.address,
    },
    sameAs: SITE_CONFIG.socialProfiles,
    foundingDate: SITE_CONFIG.foundingDate,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.telephone,
      contactType: 'customer service',
      email: SITE_CONFIG.email,
      availableLanguage: ['English'],
    },
  };
}

// =============================================================================
// LOCAL BUSINESS SCHEMA
// =============================================================================

/**
 * Creates LocalBusiness JSON-LD schema.
 * Specifically tailored for dental-related services.
 * Enhances local SEO and enables business features in search results.
 *
 * Benefits:
 * - Local search visibility
 * - Google Maps integration potential
 * - Business hours display
 *
 * @returns LocalBusiness schema object
 */
export function createLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    image: SITE_CONFIG.image,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.telephone,
    email: SITE_CONFIG.email,
    priceRange: SITE_CONFIG.priceRange,
    address: {
      '@type': 'PostalAddress',
      ...SITE_CONFIG.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.9545,
      longitude: -96.8292,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    description: SITE_CONFIG.description,
    sameAs: SITE_CONFIG.socialProfiles,
  };
}

// =============================================================================
// WEBSITE SCHEMA
// =============================================================================

/**
 * Creates WebSite JSON-LD schema with SearchAction.
 * Enables sitelinks search box in Google search results.
 * Should be included site-wide via layout.tsx.
 *
 * Benefits:
 * - Sitelinks search box potential
 * - Better site representation in search
 *
 * @returns WebSite schema object
 */
export function createWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// =============================================================================
// BREADCRUMB SCHEMA
// =============================================================================

/**
 * Creates BreadcrumbList JSON-LD schema for navigation trails.
 * Helps search engines understand site hierarchy and can display
 * breadcrumbs directly in search results.
 *
 * Benefits:
 * - Enhanced search result appearance
 * - Clear navigation context
 * - Improved user understanding
 *
 * @param items - Array of breadcrumb items with name and url
 * @returns BreadcrumbList schema object
 */
export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// =============================================================================
// FAQ PAGE SCHEMA
// =============================================================================

/**
 * Creates FAQPage JSON-LD schema for frequently asked questions.
 * Enables rich FAQ snippets in search results with expandable Q&A.
 *
 * Benefits:
 * - Rich snippets with expandable FAQs
 * - Increased SERP real estate
 * - Higher click-through rates
 *
 * @param faqs - Array of FAQ items with question and answer
 * @returns FAQPage schema object
 */
export function createFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// =============================================================================
// PRODUCT SCHEMA
// =============================================================================

/**
 * Creates Product JSON-LD schema for membership plans and products.
 * Enables rich product snippets with pricing and availability.
 *
 * Benefits:
 * - Product rich snippets
 * - Price display in search
 * - Availability information
 *
 * @param product - Product information object
 * @returns Product schema object
 */
export function createProductSchema(product: ProductInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image || SITE_CONFIG.image,
    brand: {
      '@type': 'Brand',
      name: product.brand || SITE_CONFIG.name,
    },
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      url: product.url || SITE_CONFIG.url,
      priceCurrency: product.priceCurrency || 'USD',
      price: product.price,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString().split('T')[0],
      availability: `https://schema.org/${product.availability || 'InStock'}`,
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
    },
  };
}

/**
 * Creates multiple Product schemas for all SLEEK membership plans.
 * Use this on the homepage to showcase all plan options.
 *
 * @returns Array of Product schema objects for OCP, PRO, and MAX plans
 */
export function createAllProductSchemas() {
  const plans: ProductInfo[] = [
    {
      name: 'SLEEK OCP (Oral Care Plan)',
      description:
        'Discount dental care membership with sonic electric toothbrush kit, quarterly refills, teledentistry access, and Aetna Dental Access Network savings of 15-50% on dental care.',
      price: '19.95',
      sku: 'SLEEK-OCP',
      image: 'https://sleekdentalclub.com/images/SleekKit.jpg',
      url: 'https://enrollment.sleekdentalclub.com/onboarding',
    },
    {
      name: 'SLEEK PRO Dental Membership',
      description:
        'Premium dental insurance membership with MetLife PDP Plus Network, 80/60/50 co-insurance, sonic electric toothbrush kit, quarterly refills, teledentistry, and increasing annual max benefits.',
      price: '65.95',
      sku: 'SLEEK-PRO',
      image: 'https://sleekdentalclub.com/images/SleekKit.jpg',
      url: 'https://enrollment.sleekdentalclub.com/onboarding',
    },
    {
      name: 'SLEEK MAX Dental Membership',
      description:
        'Ultimate dental insurance membership with MetLife PDP Plus Network, 100/80/50 co-insurance, orthodontia coverage up to age 19, sonic electric toothbrush kit, quarterly refills, teledentistry, and maximum annual benefits.',
      price: '79.95',
      sku: 'SLEEK-MAX',
      image: 'https://sleekdentalclub.com/images/SleekKit.jpg',
      url: 'https://enrollment.sleekdentalclub.com/onboarding',
    },
  ];

  return plans.map((plan) => createProductSchema(plan));
}

// =============================================================================
// SERVICE SCHEMA
// =============================================================================

/**
 * Creates Service JSON-LD schema for the dental membership service.
 * Describes the overall service offering for better search understanding.
 *
 * @returns Service schema object
 */
export function createServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_CONFIG.url}/#service`,
    name: 'SLEEK Dental Club Membership',
    description:
      'Premium dental care membership service including electric toothbrush kits, quarterly oral care refills, dental insurance options, and teledentistry access.',
    provider: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    serviceType: 'Dental Care Membership',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'SLEEK Dental Membership Plans',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SLEEK OCP Plan',
            description: 'Discount dental care with toothbrush kit',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SLEEK PRO Plan',
            description: 'MetLife dental insurance with toothbrush kit',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SLEEK MAX Plan',
            description:
              'Premium MetLife dental insurance with orthodontia and toothbrush kit',
          },
        },
      ],
    },
  };
}

// =============================================================================
// BLOG/ARTICLE SCHEMAS
// =============================================================================

/**
 * Blog post information for Article schema.
 */
export interface BlogPostInfo {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
  category?: string;
  keywords?: string[];
}

/**
 * Creates Article/BlogPosting JSON-LD schema for blog posts.
 * Enables rich article snippets in search results.
 *
 * Benefits:
 * - Article rich snippets
 * - Author information display
 * - Publication date in search
 *
 * @param post - Blog post information
 * @returns BlogPosting schema object
 */
export function createArticleSchema(post: BlogPostInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: {
      '@type': 'ImageObject',
      url: post.image,
      alt: post.imageAlt,
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
    articleSection: post.category,
    keywords: post.keywords?.join(', '),
  };
}

/**
 * Creates Blog JSON-LD schema for the blog listing page.
 * Represents the blog as a collection of posts.
 *
 * @param postCount - Total number of blog posts
 * @returns Blog schema object
 */
export function createBlogSchema(postCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_CONFIG.url}/blog/#blog`,
    name: 'SLEEK Dental Blog',
    description:
      'Expert advice, tips, and the latest research on oral care, dental health, and SLEEK Dental Club membership benefits.',
    url: `${SITE_CONFIG.url}/blog`,
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    blogPost: {
      '@type': 'ItemList',
      numberOfItems: postCount,
    },
  };
}

// =============================================================================
// WEBPAGE SCHEMA
// =============================================================================

/**
 * Creates WebPage JSON-LD schema for generic pages.
 * Provides context about individual pages to search engines.
 *
 * @param name - Page name/title
 * @param description - Page description
 * @param url - Full page URL
 * @returns WebPage schema object
 */
export function createWebPageSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: {
      '@id': `${SITE_CONFIG.url}/#website`,
    },
    about: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
  };
}

// =============================================================================
// COMBINED SCHEMAS
// =============================================================================

/**
 * Creates a combined schema graph for the homepage.
 * Includes Organization, WebSite, LocalBusiness, Service, and Product schemas.
 * Using @graph allows multiple schemas to be combined efficiently.
 *
 * @returns Combined schema graph for homepage
 */
export function createHomepageSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      createOrganizationSchema(),
      createWebSiteSchema(),
      createLocalBusinessSchema(),
      createServiceSchema(),
      ...createAllProductSchemas(),
    ],
  };
}

/**
 * Creates a base schema graph for all pages.
 * Includes Organization and WebSite schemas.
 * Should be used in layout.tsx for site-wide SEO.
 *
 * @returns Base schema graph for all pages
 */
export function createBaseSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [createOrganizationSchema(), createWebSiteSchema()],
  };
}
