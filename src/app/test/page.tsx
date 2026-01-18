/**
 * Simple test page for verifying rendering works correctly.
 * Noindex metadata is applied via the parent layout.tsx file,
 * ensuring this page is not indexed by search engines.
 */
export default function TestPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Test Page</h1>
      <p className="mb-4">This is a simple test page to verify rendering is working correctly.</p>
      <div className="p-4 bg-teal-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-teal-700">Content is rendering!</h2>
        <p className="text-teal-600">If you can see this text, basic rendering is working correctly.</p>
      </div>
    </div>
  );
} 