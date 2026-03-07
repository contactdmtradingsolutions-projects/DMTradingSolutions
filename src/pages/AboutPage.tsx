import React from 'react';
import PageHero from '../components/PageHero';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';

export default function AboutPage() {
  return (
    <>
      <PageHero 
        title="About Us" 
        subtitle="Learn more about DM Trading Solutions (PTY) LTD and our commitment to excellence."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
      />
      <About />
      <WhyChooseUs />
    </>
  );
}
