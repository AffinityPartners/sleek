import { describe, it, expect } from 'vitest';
import { createAllProductSchemas } from '@/lib/schema';

describe('product Offer rich data', () => {
  const offers = createAllProductSchemas().map((p: any) => p.offers);

  it('every offer declares free US shipping', () => {
    for (const o of offers) {
      expect(o.shippingDetails['@type']).toBe('OfferShippingDetails');
      expect(o.shippingDetails.shippingRate.value).toBe('0');
      expect(o.shippingDetails.shippingDestination.addressCountry).toBe('US');
    }
  });

  it('every offer declares a 30-day return policy', () => {
    for (const o of offers) {
      expect(o.hasMerchantReturnPolicy['@type']).toBe('MerchantReturnPolicy');
      expect(o.hasMerchantReturnPolicy.merchantReturnDays).toBe(30);
      expect(o.hasMerchantReturnPolicy.returnPolicyCategory)
        .toBe('https://schema.org/MerchantReturnFiniteReturnWindow');
    }
  });

  it('does NOT add aggregateRating or review (deferred to Phase 3)', () => {
    for (const p of createAllProductSchemas() as any[]) {
      expect(p.aggregateRating).toBeUndefined();
      expect(p.review).toBeUndefined();
    }
  });
});
