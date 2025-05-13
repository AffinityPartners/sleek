'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Handle Dental Emergencies in Children: A Parent\'s Guide',
      category: 'Oral Health',
      imageUrl: '/images/blog/Dental-Emergencies-in-Children-Blog-2025.jpg',
      alt: 'Child with dental emergency'
    },
    {
      id: 2,
      title: 'Does Charcoal Toothpaste Really Whiten Teeth? The Truth Behind the Trend',
      category: 'Oral Health',
      imageUrl: '/images/blog/Charcoal-Toothpaste-Blog-2025.jpg',
      alt: 'Charcoal toothpaste'
    },
    {
      id: 3,
      title: 'Understanding Oral Cancer: Early Signs, Symptoms and Prevention',
      category: 'Oral Health',
      imageUrl: '/images/blog/Oral-Cancer-Blog-2025.jpg',
      alt: 'Oral cancer awareness'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Tips and Insights</h2>
          <Link href="#" className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md">
            View Our Blog
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 relative h-48">
                <Image 
                  src={post.imageUrl}
                  alt={post.alt}
                  fill
                  className="object-cover rounded-t-lg"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <span className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{post.title}</h3>
                <Link href="#" className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center">
                  Read Article
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 