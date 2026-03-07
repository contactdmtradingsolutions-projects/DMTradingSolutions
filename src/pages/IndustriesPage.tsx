import React from 'react';
import PageHero from '../components/PageHero';
import Industries from '../components/Industries';

export default function IndustriesPage() {
  return (
    <>
      <PageHero 
        title="Industries We Serve" 
        subtitle="Specialized sourcing and procurement for key sectors across Africa."
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
      />
      <Industries />
    </>
  );
}
