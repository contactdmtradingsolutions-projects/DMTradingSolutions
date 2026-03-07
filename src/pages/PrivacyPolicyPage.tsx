import React from 'react';
import PageHero from '../components/PageHero';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero 
        title="Privacy Policy" 
        subtitle="How we collect, use, and protect your data."
        image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-corporate">
          <h2>1. Information We Collect</h2>
          <p>
            At DM Trading Solutions, we collect information that you provide directly to us, such as when you fill out a contact form, request a quote, or subscribe to our newsletter. This may include your name, email address, phone number, company details, and any other information you choose to provide.
          </p>
          
          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services. This includes responding to your inquiries, processing your requests, sending you technical notices, and communicating with you about products, services, and events offered by DM Trading Solutions.
          </p>
          
          <h2>3. Information Sharing</h2>
          <p>
            We do not share your personal information with third parties except as described in this privacy policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf, such as logistics partners and customs brokers.
          </p>
          
          <h2>4. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no data transmission over the internet or electronic storage system can be guaranteed to be 100% secure.
          </p>
          
          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at contact.dmtradingsolutions@gmail.com.
          </p>
        </div>
      </section>
    </>
  );
}
