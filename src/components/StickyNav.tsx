'use client';

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function StickyNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  console.log('StickyNav component rendering');

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'plans', label: 'Plans' },
    { id: 'video', label: 'Video' },
    { id: 'toothbrush', label: 'Toothbrush' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'faq', label: 'FAQ' }
  ];

  useEffect(() => {
    // Show sticky nav after scrolling down a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      // Find the current active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(section => section.element);
      
      // Get the section that is currently visible
      const currentSection = sections.reduce((closest, section) => {
        const rect = section.element?.getBoundingClientRect();
        if (!rect) return closest;
        
        // Check if the section is visibile in the viewport
        const isInView = rect.top <= 200 && rect.bottom >= 200;
        
        // If it's in view and higher than the previous closest section, it's our new closest
        if (isInView && (!closest.element || rect.top > closest.element.getBoundingClientRect().top)) {
          return section;
        }
        return closest;
      }, { id: '', element: null });
      
      if (currentSection.id) {
        setActiveSection(currentSection.id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Link href="/">
            <Image 
              src="/images/blog/logo/sleek-black.svg" 
              alt="SLEEK" 
              width={120}
              height={31}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'text-[#00e0cb]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        <a
          href="#plans"
          className="flex items-center px-5 py-2 bg-gradient-to-r from-[#00e0cb] to-[#5cbbff] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <span>Find My Plan</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
} 