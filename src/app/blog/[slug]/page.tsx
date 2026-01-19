import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { getPostBySlug, getAllSlugs, BlogPost } from '@/lib/blog';

/**
 * Props for the BlogPostPage component.
 */
interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generates static params for all blog post slugs at build time.
 * This enables static generation of all blog post pages.
 */
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generates dynamic metadata for SEO optimization.
 * Includes title, description, Open Graph, and Twitter cards.
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | SLEEK Dental Blog',
    };
  }

  const ogImage = `https://www.sleekdentalclub.com${post.image}`;
  const url = `https://www.sleekdentalclub.com/blog/${post.slug}`;

  return {
    title: `${post.title} | SLEEK Dental Blog`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * BlogPostPage is the main page component for individual blog posts.
 * This server component handles data fetching and passes to the client component.
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // If post not found, show 404
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
