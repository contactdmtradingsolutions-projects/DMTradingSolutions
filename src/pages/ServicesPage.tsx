import React from 'react';
import PageHero from '../components/PageHero';
import Services from '../components/Services';
import ShippingMethods from '../components/ShippingMethods';
import SEO from '../components/SEO';

export default function ServicesPage() {
  return (
    <>
      <SEO 
        title="Our Services" 
        description="Comprehensive procurement, sourcing, and logistics solutions tailored for your business, including company registration in South Africa."
        keywords="procurement services, product sourcing, import export, supplier verification, logistics coordination, company registration South Africa"
      />
      <PageHero 
        title="Our Services" 
        subtitle="Comprehensive procurement, sourcing, and logistics solutions tailored for your business."
        image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
      />
      <Services />
      <ShippingMethods />
    </>
  );
}
