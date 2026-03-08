import React from 'react';
import PageHero from '../components/PageHero';
import QuoteForm from '../components/QuoteForm';
import SEO from '../components/SEO';

export default function QuotePage() {
  return (
    <>
      <SEO 
        title="Request a Quote" 
        description="Request a competitive quote for your procurement, sourcing, and logistics needs in Africa with DM Trading Solutions."
        keywords="procurement quote, logistics pricing, sourcing request, African trade quote"
      />
      <PageHero 
        title="Request a Quote" 
        subtitle="Start your procurement request today and get competitive pricing."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
      />
      <QuoteForm />
    </>
  );
}
