
'use client';

import type { FC } from 'react';
import { PricingCard } from './pricing-card';

const pricingPlans = [
  {
    title: 'BASIC',
    priceNaira: '$60',
    priceUsd: '',
    description: 'Best for Personal Websites',
    features: ['Up to 5 Pages', 'Responsive Design', 'SEO Optimization', '1 Revision'],
    examples: [
      'Personal Portfolio Website',
      'Resume/CV Website',
      'Blog Website',
      'Event/Invitation Website',
      'Small Community Website',
    ],
  },
  {
    title: 'STANDARD',
    priceNaira: '$120',
    priceUsd: '',
    description: 'Best for Small Business Websites',
    features: ['Up to 10 Pages', 'Responsive Design', 'SEO Optimization', '3 Revisions'],
    examples: [
      'Small Business Website',
      'School/Academy Website',
      'Restaurant/Cafe Website',
      'NGO/Charity Website',
      'Startup/Tech Service Website',
    ],
    isFeatured: true,
  },
  {
    title: 'GOLD',
    priceNaira: '$800',
    priceUsd: '',
    description: 'Best for E-commerce Websites',
    features: ['Up to 20 Pages', 'Responsive Design', 'SEO Optimization', '5 Revisions'],
    examples: [
      'Online Store/E-commerce Website',
      'Real Estate Listings Website',
      'Corporate/Company Website',
      'News/Media Website',
      'Membership or Subscription-based Website',
    ],
  },
];

export const PricingSection: FC = () => {
  return (
    <section id="pricing" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Pricing Plans</h2>
          <p className="text-lg text-muted-foreground">Choose the plan that suits your needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.title} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};
