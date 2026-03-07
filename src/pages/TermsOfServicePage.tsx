import React from 'react';
import PageHero from '../components/PageHero';

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero 
        title="Terms of Service" 
        subtitle="The rules and guidelines for using our services."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-corporate">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the services provided by DM Trading Solutions (PTY) LTD, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
          
          <h2>2. Description of Services</h2>
          <p>
            DM Trading Solutions provides procurement, sourcing, and logistics services, primarily focusing on trade between South Africa and other African nations, including the Democratic Republic of the Congo. We act as an intermediary to facilitate trade, source products, and manage supply chains.
          </p>
          
          <h2>3. User Responsibilities</h2>
          <p>
            You agree to provide accurate, current, and complete information when requesting quotes or utilizing our services. You are responsible for ensuring that any goods you request us to source or transport comply with all applicable laws and regulations in both the origin and destination countries.
          </p>
          
          <h2>4. Limitation of Liability</h2>
          <p>
            DM Trading Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
          </p>
          
          <h2>5. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page. Your continued use of the services after any such changes constitutes your acceptance of the new Terms.
          </p>
        </div>
      </section>
    </>
  );
}
