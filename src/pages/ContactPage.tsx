import React from 'react';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

export default function ContactPage() {
  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with DM Trading Solutions team to discuss your procurement, logistics, and company registration needs in South Africa and Africa."
        keywords="contact DM Trading Solutions, procurement inquiry, logistics support, South Africa contact"
      />
      <PageHero 
        title="Contact Us" 
        subtitle="Get in touch with our team to discuss your procurement needs."
        image="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop"
      />
      <Contact />
    </>
  );
}
