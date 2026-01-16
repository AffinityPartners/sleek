import { Metadata } from 'next';
import Script from 'next/script';
import BlogListingContent from '@/components/blog/BlogListingContent';
import { getAllPosts, BlogPost } from '@/lib/blog';
import { createBlogSchema, createBreadcrumbSchema, SITE_CONFIG } from '@/lib/schema';

/**
 * Blog listing page metadata for SEO.
 *
 * Optimized for search visibility targeting oral health, dental care,
 * and dental tips keywords. Includes Open Graph and Twitter cards.
 */
export const metadata: Metadata = {
  title: 'Oral Health Blog | Tips, Guides & Dental Care Advice',
  description:
    'Expert advice on oral health, dental care tips, and the latest research from SLEEK Dental Club. Learn about teeth whitening, gum health, dental emergencies, and membership benefits.',
  keywords: [
    'oral health blog',
    'dental care tips',
    'teeth whitening',
    'gum health',
    'dental hygiene',
    'toothbrush tips',
    'dental membership',
    'oral care advice',
  ],
  openGraph: {
    title: 'Oral Health Blog | SLEEK Dental Club',
    description:
      'Expert advice on oral health, dental care tips, and the latest research from SLEEK Dental Club.',
    url: 'https://sleekdentalclub.com/blog',
    siteName: 'SLEEK Dental Club',
    images: [
      {
        url: '/images/social-share.png',
        width: 1200,
        height: 630,
        alt: 'SLEEK Dental Club Blog - Oral Health Tips and Advice',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oral Health Blog | SLEEK Dental Club',
    description: 'Expert advice on oral health, dental care tips, and the latest research.',
    images: ['/images/social-share.png'],
  },
  alternates: {
    canonical: 'https://sleekdentalclub.com/blog',
  },
};

/**
 * Creates JSON-LD structured data for the blog listing page.
 * Includes Blog schema and BreadcrumbList for navigation context.
 *
 * @param posts - Array of all blog posts for schema generation
 * @returns Combined schema object
 */
function createBlogListingSchemas(posts: BlogPost[]) {
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Blog', url: `${SITE_CONFIG.url}/blog` },
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Blog schema
      {
        '@type': 'Blog',
        name: 'SLEEK Dental Blog',
        description:
          'Expert advice and the latest research on oral care and dental health',
        url: `${SITE_CONFIG.url}/blog`,
        publisher: {
          '@type': 'Organization',
          name: SITE_CONFIG.name,
          logo: {
            '@type': 'ImageObject',
            url: SITE_CONFIG.logo,
          },
        },
        blogPost: posts.slice(0, 10).map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          image: `${SITE_CONFIG.url}${post.image}`,
          url: `${SITE_CONFIG.url}/blog/${post.slug}`,
        })),
      },
      // Breadcrumb schema
      createBreadcrumbSchema(breadcrumbs),
    ],
  };
}

/**
 * Blog listing page server component.
 *
 * This server component exports metadata for SEO and renders the
 * BlogListingContent client component. JSON-LD structured data is
 * injected here including Blog schema and breadcrumbs.
 */
export default function BlogListingPage() {
  const allPosts = getAllPosts();

  return (
    <>
      {/* JSON-LD Schema for blog listing */}
      <Script
        id="blog-listing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createBlogListingSchemas(allPosts)),
        }}
      />
      <BlogListingContent />
    </>
  );
}
