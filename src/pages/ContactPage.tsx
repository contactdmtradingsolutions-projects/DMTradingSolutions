import React from 'react';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <>
      <PageHero 
        title="Contact Us" 
        subtitle="Get in touch with our team to discuss your procurement needs."
        image="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop"
      />
      <Contact />
    </>
  );
}
