type MarketingPageProps = {
  params: {
    pageName: string;
  };
};

export default function MarketingPage({ params }: MarketingPageProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Marketing Page: {params.pageName}</h1>
      <p className="text-lg">This is a placeholder for the "{params.pageName}" marketing page.</p>
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