import { affiliateSteps, affiliateFaqs } from '@/lib/affiliate-content';

/**
 * Keyword-targeted content for the affiliate program landing page.
 * SEO-additive: renders between the hero and the contact form. Native <details>
 * keeps it a server component and puts FAQ answers in the DOM for FAQPage schema.
 */
export default function AffiliateProgramContent() {
  return (
    <section className="container-standard py-16 md:py-20">
      <div className="max-w-3xl">
        <h2 className="section-title">How the SLEEK Dental Affiliate Program Works</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          The SLEEK Dental affiliate program lets creators, dental professionals, and health &amp;
          wellness marketers earn recurring commissions by promoting SLEEK Dental Club — a premium
          sonic electric toothbrush subscription paired with real dental coverage.
        </p>
      </div>

      <ol className="grid gap-6 md:grid-cols-3 mb-16">
        {affiliateSteps.map((step) => (
          <li key={step.n} className="card p-6">
            <span className="badge-primary mb-4">{step.n}</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600 leading-relaxed">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="grid gap-10 md:grid-cols-2 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Earn as a SLEEK Affiliate</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Competitive recurring commissions on every membership</li>
            <li>Monthly payouts with low minimums</li>
            <li>Real-time tracking dashboard</li>
            <li>Professional marketing materials provided</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who the Affiliate Program Is For</h2>
          <p className="text-gray-600 leading-relaxed">
            Dental and oral-health bloggers, dentists and hygienists, health and wellness influencers,
            coupon and deal sites, and marketing agencies — anyone who can reach people who want better
            oral care.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dental Affiliate Program FAQ</h2>
      <div className="max-w-3xl space-y-3">
        {affiliateFaqs.map((faq) => (
          <details key={faq.question} className="card p-5">
            <summary className="font-semibold text-gray-900 cursor-pointer">{faq.question}</summary>
            <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>

      <p className="mt-10 text-gray-600">
        Explore the{' '}
        <a href="/#plans" className="text-teal-600 font-medium hover:text-teal-700">
          SLEEK Dental membership plans
        </a>{' '}
        you&apos;ll be promoting.
      </p>
    </section>
  );
}
