/**
 * Dynamic Marketing Landing Page
 *
 * This is a placeholder route for dynamic marketing pages that can be created
 * on-the-fly by appending any slug to /marketing/ (e.g., /marketing/new-campaign).
 *
 * Important: This page is noindexed via the parent marketing/layout.tsx to prevent
 * search engines from indexing these thin content/template pages. This resolves
 * "Soft 404" issues reported in Google Search Console.
 *
 * Use cases:
 * - Quick landing pages for marketing campaigns
 * - Partner-specific pages shared via direct links
 * - Testing new page layouts before full implementation
 */

/**
 * Props for the MarketingPage component.
 * In Next.js 15, params is now a Promise and must be awaited.
 */
type MarketingPageProps = {
  params: Promise<{
    pageName: string;
  }>;
};

/**
 * MarketingPage is a dynamic route component for marketing landing pages.
 * The pageName param is extracted from the URL path (e.g., /marketing/new-campaign).
 * This is an async server component to support Next.js 15's async params API.
 */
export default async function MarketingPage({ params }: MarketingPageProps) {
  const { pageName } = await params;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Marketing Page: {pageName}</h1>
      <p className="text-lg">This is a placeholder for the &quot;{pageName}&quot; marketing page.</p>
      {/* Placeholder for specific marketing content */}
    </div>
  );
}

// Optional: Add generateStaticParams if you have a predefined set of marketing pages
// export async function generateStaticParams() {
//   return [
//     { pageName: 'new-campaign' }, 
//     { pageName: 'special-offer' }
//   ];
// } 