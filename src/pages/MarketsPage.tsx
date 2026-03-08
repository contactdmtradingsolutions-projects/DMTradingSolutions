import React from 'react';
import PageHero from '../components/PageHero';
import Markets from '../components/Markets';
import SEO from '../components/SEO';

export default function MarketsPage() {
  return (
    <>
      <SEO 
        title="Our Markets" 
        description="Connecting key African economies through reliable trade corridors, focusing on South Africa, DRC, Zambia, and Zimbabwe."
        keywords="African trade corridors, South Africa logistics, DRC procurement, Zambia supply chain, Zimbabwe import export"
      />
      <PageHero 
        title="Our Markets" 
        subtitle="Connecting key African economies through reliable trade corridors."
        image="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop"
      />
      <Markets />
    </>
  );
}
