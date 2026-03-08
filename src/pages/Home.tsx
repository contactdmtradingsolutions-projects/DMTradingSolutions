import React from 'react';
import Hero from '../components/Hero';
import HomeIntro from '../components/HomeIntro';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO 
        title="Home" 
        description="DM Trading Solutions provides expert cross-border logistics, reliable product sourcing, and seamless import/export services across South Africa and Africa."
        keywords="procurement, supply chain, Africa, South Africa, logistics, sourcing, import, export, DM Trading Solutions, company registration"
      />
      <Hero />
      <HomeIntro />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
    </>
  );
}
