import React from 'react';
import PageHero from '../components/PageHero';
import Markets from '../components/Markets';

export default function MarketsPage() {
  return (
    <>
      <PageHero 
        title="Our Markets" 
        subtitle="Connecting key African economies through reliable trade corridors."
        image="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop"
      />
      <Markets />
    </>
  );
}
