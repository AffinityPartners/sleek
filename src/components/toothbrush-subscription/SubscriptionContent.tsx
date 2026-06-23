import Link from 'next/link';
import { subscriptionSteps, subscriptionFaqs } from '@/lib/toothbrush-subscription-content';

/**
 * Keyword-targeted content for the electric toothbrush subscription landing page.
 * Renders between the hero and the pricing section. Facts come from the CLUB plan only.
 */
export default function SubscriptionContent() {
  return (
    <section className="container-standard py-16 md:py-20">
      <div className="max-w-3xl">
        <h2 className="section-title">How the SLEEK Electric Toothbrush Subscription Works</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          With the SLEEK CLUB membership, you get a premium sonic toothbrush and never have to think
          about replacements again — fresh brush heads and floss arrive at your door every quarter, so
          you skip the reorder runs and the markup at the store. There&apos;s no long-term commitment:
          keep it as long as it works for you, and cancel anytime. Start with CLUB, then add dental
          savings or insurance whenever you want.
        </p>
      </div>

      <ol className="grid gap-6 md:grid-cols-3 mb-16">
        {subscriptionSteps.map((step) => (
          <li key={step.n} className="card p-6">
            <span className="badge-primary mb-4">{step.n}</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600 leading-relaxed">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="grid gap-10 md:grid-cols-2 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What&apos;s Included Every Quarter</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Sonic electric toothbrush with 5 cleaning modes (in your welcome kit)</li>
            <li>Quarterly brush head refill — replaced on the dentist-recommended schedule</li>
            <li>50 floss picks every quarter</li>
            <li>Free shipping in the contiguous US — cancel anytime, no long-term commitment</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why a Toothbrush Subscription</h2>
          <p className="text-gray-600 leading-relaxed">
            Brush heads wear out — the ADA recommends replacing them about every three months. A SLEEK
            membership keeps fresh refills arriving for one predictable price, so your sonic toothbrush
            always cleans like new — and you can cancel anytime if your needs change. Wondering whether
            insurance pays for this? See{' '}
            <Link
              href="/blog/does-dental-insurance-cover-electric-toothbrush"
              className="text-teal-600 font-medium hover:text-teal-700"
            >
              whether dental insurance covers an electric toothbrush
            </Link>
            .
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Electric Toothbrush Subscription FAQ</h2>
      <div className="max-w-3xl space-y-3">
        {subscriptionFaqs.map((faq) => (
          <details key={faq.question} className="card p-5">
            <summary className="font-semibold text-gray-900 cursor-pointer">{faq.question}</summary>
            <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>

      <p className="mt-10 text-gray-600">
        Ready to start?{' '}
        <Link href="#plans" className="text-teal-600 font-medium hover:text-teal-700">
          Compare the SLEEK plans and join below
        </Link>
        .
      </p>
    </section>
  );
}
