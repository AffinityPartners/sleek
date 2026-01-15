'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronRight,
  Home,
  FileText,
  BookOpen,
  Scale,
  HelpCircle,
  Folder,
  FolderOpen,
  ExternalLink,
  Hash,
} from 'lucide-react';

/**
 * Represents a node in the sitemap tree structure.
 */
interface TreeNode {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  type: 'folder' | 'page' | 'anchor' | 'external';
  children?: TreeNode[];
  badge?: string;
  description?: string;
}

/**
 * Props for the SitemapTree component.
 */
interface SitemapTreeProps {
  /** Custom tree data to display. If not provided, uses default site structure. */
  data?: TreeNode[];
  /** Whether to show descriptions inline */
  showDescriptions?: boolean;
}

/**
 * Props for individual tree node items.
 */
interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  showDescriptions?: boolean;
}

/**
 * TreeNodeItem renders a single node in the tree with its children.
 * Handles expand/collapse state and animations.
 */
function TreeNodeItem({ node, level, showDescriptions }: TreeNodeItemProps) {
  const [isOpen, setIsOpen] = useState(level < 2); // Auto-expand first two levels
  const hasChildren = node.children && node.children.length > 0;
  const isFolder = node.type === 'folder';

  /**
   * Returns the appropriate icon based on node type and state.
   */
  const getIcon = () => {
    if (node.icon) return node.icon;
    
    if (isFolder) {
      return isOpen ? (
        <FolderOpen className="w-4 h-4 text-teal-500" />
      ) : (
        <Folder className="w-4 h-4 text-teal-500" />
      );
    }
    
    switch (node.type) {
      case 'anchor':
        return <Hash className="w-4 h-4 text-teal-500" />;
      case 'external':
        return <ExternalLink className="w-4 h-4 text-gray-400" />;
      default:
        return <FileText className="w-4 h-4 text-teal-600" />;
    }
  };

  /**
   * Renders the node content as either a link or button.
   */
  const renderContent = () => {
    const content = (
      <>
        {/* Expand/collapse button for folders */}
        {hasChildren && (
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 text-gray-400"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.span>
        )}
        
        {/* Spacer when no children */}
        {!hasChildren && <span className="w-4" />}
        
        {/* Icon */}
        <span className="flex-shrink-0">{getIcon()}</span>
        
        {/* Label and description */}
        <span className="flex-1 min-w-0">
          <span className="font-medium text-gray-800 group-hover:text-teal-700 transition-colors">
            {node.label}
          </span>
          {showDescriptions && node.description && (
            <span className="block text-xs text-gray-400 mt-0.5 truncate">
              {node.description}
            </span>
          )}
        </span>
        
        {/* Badge */}
        {node.badge && (
          <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-medium">
            {node.badge}
          </span>
        )}
      </>
    );

    // Folders expand/collapse, pages navigate
    if (isFolder || !node.href) {
      return (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            group flex items-center gap-2 w-full py-2 px-3 rounded-lg
            hover:bg-gray-50 transition-colors text-left
            focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60
          "
          aria-expanded={isOpen}
        >
          {content}
        </button>
      );
    }

    return (
      <Link
        href={node.href}
        target={node.type === 'external' ? '_blank' : undefined}
        rel={node.type === 'external' ? 'noopener noreferrer' : undefined}
        className="
          group flex items-center gap-2 w-full py-2 px-3 rounded-lg
          hover:bg-gray-50 transition-colors
          focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60
        "
      >
        {content}
      </Link>
    );
  };

  return (
    <div>
      {/* Node content */}
      <div style={{ paddingLeft: `${level * 16}px` }}>
        {renderContent()}
      </div>

      {/* Children with animated expand/collapse */}
      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/* Vertical line connector */}
            <div
              className="relative"
              style={{ marginLeft: `${(level + 1) * 16 + 7}px` }}
            >
              <div className="absolute left-0 top-0 bottom-2 w-px bg-gray-200" />
            </div>
            
            {/* Child nodes */}
            <div className="relative">
              {node.children!.map((child, index) => (
                <TreeNodeItem
                  key={child.id}
                  node={child}
                  level={level + 1}
                  showDescriptions={showDescriptions}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Default tree structure representing the SLEEK Dental site.
 */
const defaultTreeData: TreeNode[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    type: 'page',
    icon: <Home className="w-4 h-4 text-teal-600" />,
    description: 'Main landing page',
    children: [
      { id: 'plans', label: 'Membership Plans', href: '/#plans', type: 'anchor', description: 'OCP, PRO, and MAX plans' },
      { id: 'video', label: 'Video Showcase', href: '/#video', type: 'anchor', description: 'Product introduction' },
      { id: 'technology', label: 'Technology', href: '/#technology', type: 'anchor', description: 'Advanced brush technology' },
      { id: 'benefits', label: 'Benefits', href: '/#benefits', type: 'anchor', description: 'Member benefits overview' },
      { id: 'testimonials', label: 'Testimonials', href: '/#testimonials', type: 'anchor', description: 'Customer reviews' },
      { id: 'faq', label: 'FAQ', href: '/#faq', type: 'anchor', description: 'Frequently asked questions' },
    ],
  },
  {
    id: 'blog',
    label: 'Blog',
    type: 'folder',
    icon: <BookOpen className="w-4 h-4 text-teal-500" />,
    badge: '12 articles',
    children: [
      {
        id: 'blog-oral-health',
        label: 'Oral Health',
        type: 'folder',
        badge: '6',
        children: [
          { id: 'dental-emergencies', label: 'Dental Emergencies in Children', href: '/blog/dental-emergencies-children', type: 'page' },
          { id: 'charcoal-toothpaste', label: 'Charcoal Toothpaste: The Truth', href: '/blog/charcoal-toothpaste-whitening', type: 'page' },
          { id: 'oral-cancer', label: 'Understanding Oral Cancer', href: '/blog/understanding-oral-cancer', type: 'page' },
          { id: 'tooth-decay', label: 'Understanding Tooth Decay', href: '/blog/understanding-tooth-decay', type: 'page' },
          { id: 'nutrition', label: 'Nutrition and Oral Health', href: '/blog/nutrition-oral-health', type: 'page' },
        ],
      },
      {
        id: 'blog-health',
        label: 'Health',
        type: 'folder',
        badge: '3',
        children: [
          { id: 'bleeding-gums', label: 'Bleeding Gums', href: '/blog/bleeding-gums', type: 'page' },
          { id: 'cavities', label: 'Understanding Cavities', href: '/blog/understanding-cavities', type: 'page' },
          { id: 'gingivitis', label: 'Understanding Gingivitis', href: '/blog/understanding-gingivitis', type: 'page' },
        ],
      },
      {
        id: 'blog-membership',
        label: 'SLEEK Membership',
        type: 'folder',
        badge: '3',
        children: [
          { id: 'pro-membership', label: 'PRO Membership Benefits', href: '/blog/sleek-dental-pro-membership', type: 'page' },
          { id: 'ocp-overview', label: 'OCP Overview', href: '/blog/sleek-ocp-overview', type: 'page' },
          { id: 'introducing-sleek', label: 'Introducing SLEEK Dental Club', href: '/blog/introducing-sleek-dental-club', type: 'page' },
        ],
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    type: 'folder',
    icon: <HelpCircle className="w-4 h-4 text-gray-500" />,
    children: [
      { id: 'about', label: 'About Us', href: '/about', type: 'page', description: 'Our mission and team' },
      { id: 'contact', label: 'Contact Us', href: '/contact', type: 'page', description: 'Get in touch' },
      { id: 'help', label: 'Help Center', href: '/help', type: 'page', description: 'Support resources' },
      { id: 'shipping', label: 'Shipping Information', href: '/shipping', type: 'page', description: 'Delivery details' },
      { id: 'returns', label: 'Returns Policy', href: '/returns', type: 'page', description: 'Return process' },
    ],
  },
  {
    id: 'legal',
    label: 'Legal',
    type: 'folder',
    icon: <Scale className="w-4 h-4 text-gray-500" />,
    children: [
      { id: 'privacy', label: 'Privacy Policy', href: '/privacy', type: 'page', description: 'Data handling practices' },
      { id: 'terms', label: 'Terms of Service', href: '/terms', type: 'page', description: 'Usage terms and conditions' },
      { id: 'accessibility', label: 'Accessibility', href: '/accessibility', type: 'page', description: 'Accessibility statement' },
    ],
  },
];

/**
 * SitemapTree displays an interactive, collapsible tree view of the site structure.
 * Features include:
 * - Animated expand/collapse
 * - Visual hierarchy with connecting lines
 * - Icons for different node types
 * - Badge counts for folders
 * - Keyboard accessibility
 */
export default function SitemapTree({
  data = defaultTreeData,
  showDescriptions = true,
}: SitemapTreeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-semibold text-gray-900">Site Structure</h3>
        <p className="text-sm text-gray-500 mt-1">Click folders to expand or collapse</p>
      </div>

      {/* Tree content */}
      <div className="p-4">
        {data.map((node) => (
          <TreeNodeItem
            key={node.id}
            node={node}
            level={0}
            showDescriptions={showDescriptions}
          />
        ))}
      </div>
    </motion.div>
  );
}
