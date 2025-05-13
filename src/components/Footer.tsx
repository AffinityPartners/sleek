'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

// Provider search component
const ProviderSearch = () => {
  const [zipCode, setZipCode] = useState('');
  const [network, setNetwork] = useState('aetna');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zipCode.match(/^\d{5}$/)) {
      alert('Please enter a valid 5-digit zip code');
      return;
    }
    
    if (network === 'aetna') {
      window.open(`https://www.aetna.com/dsepublic/#/contentPage?page=providerSearchLanding&site_id=dse`, '_blank');
    } else if (network === 'metlife') {
      window.open(`https://metlocator.metlife.com/metlocator/execute/Search?networkId=PDP_Plus`, '_blank');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Find a Provider</h3>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Network</label>
          <select 
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00e0cb] focus:border-transparent transition-colors"
          >
            <option value="aetna">Aetna Dental Access® (OCP Plan)</option>
            <option value="metlife">MetLife PDP Plus (PRO & MAX Plans)</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter Zip Code</label>
          <input 
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="e.g. 90210"
            maxLength={5}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00e0cb] focus:border-transparent transition-colors"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-[#00e0cb] to-[#5cbbff] text-white font-medium rounded-lg hover:shadow-md transition-shadow"
        >
          Search Providers <ExternalLink className="w-4 h-4 inline ml-1" />
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-3">
        You will be redirected to the provider network website to complete your search
      </p>
    </div>
  );
};

// Social icons component
const SocialIcon = ({ Icon, href }: { Icon: any; href: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-gray-100 rounded-full hover:bg-[#00e0cb]/10 hover:text-[#00e0cb] transition-colors duration-300"
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Provider search banner */}
      <div className="bg-gradient-to-r from-[#00e0cb]/5 to-[#5cbbff]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Find a Provider in Your Area</h2>
              <p className="text-gray-600 mb-6">
                With access to extensive networks of dental professionals, SLEEK members can easily find participating providers nationwide.
              </p>
              <div className="flex gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center">
                  <Image 
                    src="/images/blog/logo/Aetna-logo.jpeg" 
                    alt="Aetna Dental Access" 
                    width={100} 
                    height={40} 
                    className="h-8 w-auto object-contain" 
                  />
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center">
                  <Image 
                    src="/images/blog/logo/metlife-logo.png" 
                    alt="MetLife" 
                    width={100} 
                    height={40} 
                    className="h-8 w-auto object-contain" 
                  />
                </div>
              </div>
            </div>
            <div>
              <ProviderSearch />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main footer */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Column 1 - Logo and description */}
            <div className="col-span-1">
              <Link href="/" className="block mb-4">
                <Image
                  src="/images/blog/logo/sleek-black.svg"
                  alt="SLEEK Dental Club"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-gray-600 text-sm mb-6">
                A premium dental membership experience with modern care technology and comprehensive benefits.
              </p>
              <div className="flex space-x-2">
                <SocialIcon Icon={Facebook} href="https://facebook.com" />
                <SocialIcon Icon={Twitter} href="https://twitter.com" />
                <SocialIcon Icon={Instagram} href="https://instagram.com" />
                <SocialIcon Icon={Linkedin} href="https://linkedin.com" />
              </div>
            </div>
            
            {/* Column 2 - Quick links */}
            <div className="col-span-1">
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { name: 'About Us', href: '#about' },
                  { name: 'Our Plans', href: '#plans' },
                  { name: 'Member Benefits', href: '#benefits' },
                  { name: 'Join Now', href: '#join' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'FAQs', href: '#faq' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-[#00e0cb] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 3 - Plan information */}
            <div className="col-span-1">
              <h3 className="font-semibold text-lg mb-4">Plan Information</h3>
              <ul className="space-y-2">
                {[
                  { name: 'OCP Plan Details', href: '#plans' },
                  { name: 'PRO Plan Details', href: '#plans' },
                  { name: 'MAX Plan Details', href: '#plans' },
                  { name: 'Legal Disclosures', href: '#legal' },
                  { name: 'Provider Networks', href: '#networks' },
                  { name: 'Plan Comparison', href: '#compare' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-[#00e0cb] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Column 4 - Contact info */}
            <div className="col-span-1">
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-[#00e0cb] mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Customer Support</p>
                    <a href="tel:+18005555555" className="text-gray-600 hover:text-[#00e0cb] transition-colors">
                      1-800-555-5555
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-[#00e0cb] mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email Us</p>
                    <a href="mailto:support@sleekdentalclub.com" className="text-gray-600 hover:text-[#00e0cb] transition-colors">
                      support@sleekdentalclub.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#00e0cb] mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Office</p>
                    <p className="text-gray-600">
                      123 Dental Way, Suite 100<br />
                      Austin, TX 78701
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} SLEEK Dental Club. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Sitemap', href: '/sitemap.xml' }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            <p>
              SLEEK is not an insurance company. Plan availability varies by state. Please see plan details for limitations and exclusions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 