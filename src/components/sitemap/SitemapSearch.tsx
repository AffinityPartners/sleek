'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, BookOpen, Scale, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getAllPosts, BlogPost, CATEGORIES } from '@/lib/blog';

/**
 * Represents a searchable item that can be a page, blog post, or anchor link.
 */
interface SearchableItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  type: 'page' | 'blog' | 'legal' | 'anchor';
  category?: string;
}

/**
 * Props for the SitemapSearch component.
 */
interface SitemapSearchProps {
  /** Optional callback when search results change */
  onSearchResults?: (results: SearchableItem[], query: string) => void;
  /** Optional placeholder text */
  placeholder?: string;
}

/**
 * SitemapSearch provides a real-time search interface for finding pages and content.
 * Features include:
 * - Fuzzy matching with highlighted results
 * - Keyboard navigation support
 * - Categorized results display
 * - Animated dropdown with scroll support
 */
export default function SitemapSearch({
  onSearchResults,
  placeholder = 'Search pages and articles...',
}: SitemapSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  /**
   * Static pages that are always searchable.
   * These represent the main site structure.
   */
  const staticPages: SearchableItem[] = [
    { id: 'home', title: 'Home', description: 'Welcome to SLEEK Dental Club', href: '/', type: 'page' },
    { id: 'plans', title: 'Membership Plans', description: 'OCP, PRO, and MAX plans', href: '/#plans', type: 'anchor' },
    { id: 'technology', title: 'Technology', description: 'Our advanced toothbrush technology', href: '/#technology', type: 'anchor' },
    { id: 'benefits', title: 'Benefits', description: 'Member benefits and perks', href: '/#benefits', type: 'anchor' },
    { id: 'faq', title: 'FAQ', description: 'Frequently asked questions', href: '/#faq', type: 'anchor' },
    { id: 'blog', title: 'Blog', description: 'Oral health articles and tips', href: '/blog', type: 'page' },
    { id: 'privacy', title: 'Privacy Policy', description: 'Our privacy practices', href: '/privacy', type: 'legal' },
    { id: 'terms', title: 'Terms of Service', description: 'Terms and conditions', href: '/terms', type: 'legal' },
    { id: 'contact', title: 'Contact Us', description: 'Get in touch with our team', href: '/contact', type: 'page' },
    { id: 'about', title: 'About Us', description: 'Learn about SLEEK Dental Club', href: '/about', type: 'page' },
  ];

  /**
   * Converts blog posts to searchable items with their metadata.
   */
  const getBlogItems = useCallback((): SearchableItem[] => {
    const posts = getAllPosts();
    return posts.map((post: BlogPost) => ({
      id: post.id,
      title: post.title,
      description: post.excerpt,
      href: `/blog/${post.slug}`,
      type: 'blog' as const,
      category: CATEGORIES.find(c => c.key === post.category)?.name,
    }));
  }, []);

  /**
   * Performs fuzzy search matching against the query.
   * Returns items sorted by relevance.
   */
  const searchItems = useCallback((searchQuery: string): SearchableItem[] => {
    if (!searchQuery.trim()) return [];

    const normalizedQuery = searchQuery.toLowerCase().trim();
    const allItems = [...staticPages, ...getBlogItems()];

    // Score and filter items based on query match
    const scoredResults = allItems
      .map(item => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const descLower = (item.description || '').toLowerCase();

        // Exact title match gets highest score
        if (titleLower === normalizedQuery) {
          score = 100;
        } else if (titleLower.startsWith(normalizedQuery)) {
          score = 80;
        } else if (titleLower.includes(normalizedQuery)) {
          score = 60;
        } else if (descLower.includes(normalizedQuery)) {
          score = 40;
        }

        // Bonus for category match
        if (item.category?.toLowerCase().includes(normalizedQuery)) {
          score += 20;
        }

        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);

    return scoredResults.slice(0, 10); // Limit to top 10 results
  }, [getBlogItems]);

  /**
   * Updates search results when query changes.
   */
  useEffect(() => {
    const searchResults = searchItems(query);
    setResults(searchResults);
    setSelectedIndex(-1);
    onSearchResults?.(searchResults, query);
    setIsOpen(query.length > 0);
  }, [query, searchItems, onSearchResults]);

  /**
   * Handles keyboard navigation within search results.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = results[selectedIndex].href;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  /**
   * Closes dropdown when clicking outside.
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Returns the appropriate icon for each result type.
   */
  const getTypeIcon = (type: SearchableItem['type']) => {
    switch (type) {
      case 'blog':
        return BookOpen;
      case 'legal':
        return Scale;
      case 'anchor':
        return Home;
      default:
        return FileText;
    }
  };

  /**
   * Highlights matching text in search results.
   */
  const highlightMatch = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;
    
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-teal-100 text-teal-800 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={resultsRef}>
      {/* Search input container */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="
            w-full pl-12 pr-12 py-4 rounded-2xl
            bg-white border border-gray-200
            text-gray-900 placeholder-gray-400
            shadow-lg shadow-gray-100/50
            focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400
            transition-all duration-200
          "
          aria-label="Search sitemap"
          aria-expanded={isOpen}
          aria-controls="search-results"
        />
        {/* Clear button */}
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="
                absolute inset-y-0 right-0 pr-4 flex items-center
                text-gray-400 hover:text-gray-600
                transition-colors
              "
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            id="search-results"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="
              absolute z-50 w-full mt-2
              bg-white rounded-2xl border border-gray-100
              shadow-2xl shadow-gray-200/50
              overflow-hidden
            "
          >
            <div className="max-h-96 overflow-y-auto">
              {results.map((result, index) => {
                const Icon = getTypeIcon(result.type);
                const isSelected = index === selectedIndex;
                
                return (
                  <Link
                    key={result.id}
                    href={result.href}
                    className={`
                      flex items-start gap-4 p-4
                      transition-colors duration-150
                      ${isSelected ? 'bg-teal-50' : 'hover:bg-gray-50'}
                      ${index !== results.length - 1 ? 'border-b border-gray-50' : ''}
                    `}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {/* Type icon */}
                    <div className={`
                      flex-shrink-0 w-10 h-10 rounded-xl
                      flex items-center justify-center
                      ${result.type === 'blog' ? 'bg-amber-100 text-amber-600' : ''}
                      ${result.type === 'legal' ? 'bg-gray-100 text-gray-600' : ''}
                      ${result.type === 'page' ? 'bg-teal-100 text-teal-600' : ''}
                      ${result.type === 'anchor' ? 'bg-teal-50 text-teal-500' : ''}
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900 truncate">
                          {highlightMatch(result.title, query)}
                        </h4>
                        {result.category && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                            {result.category}
                          </span>
                        )}
                      </div>
                      {result.description && (
                        <p className="text-sm text-gray-500 truncate mt-0.5">
                          {highlightMatch(result.description, query)}
                        </p>
                      )}
                    </div>

                    {/* Arrow indicator */}
                    <div className={`
                      flex-shrink-0 self-center
                      text-gray-300 transition-colors
                      ${isSelected ? 'text-teal-500' : ''}
                    `}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Results count footer */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </motion.div>
        )}

        {/* No results message */}
        {isOpen && query && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              absolute z-50 w-full mt-2 p-8
              bg-white rounded-2xl border border-gray-100
              shadow-xl text-center
            "
          >
            <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No results found for &quot;{query}&quot;</p>
            <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
