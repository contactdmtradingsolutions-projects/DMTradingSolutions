import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export default function QuoteForm() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="quote" className="py-24 bg-corporate-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1 w-8 bg-corporate-gold"></span>
              <span className="text-corporate-gold font-semibold tracking-wider uppercase text-sm">
                Request a Quote
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Start Your Procurement Request Today
            </h2>
            
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Looking for a reliable sourcing agent in Africa? Provide us with your procurement requirements, and our team will get back to you with a tailored solution and competitive pricing.
            </p>

            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-corporate-gold rounded-full"></div>
                Fast response times
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-corporate-gold rounded-full"></div>
                Verified African suppliers
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-corporate-gold rounded-full"></div>
                End-to-end logistics coordination
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-sm p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input type="text" id="company" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="Your Company Ltd" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <input type="text" id="country" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="e.g. DRC" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                  <input type="text" id="name" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" id="email" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="john@company.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">Product Needed *</label>
                  <input type="text" id="product" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="e.g. Mining Equipment" />
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                  <input type="text" id="quantity" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="e.g. 5 Units" />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Delivery Location *</label>
                <input type="text" id="location" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="City, Country" />
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                <textarea id="details" rows={4} className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow resize-none" placeholder="Please provide any specific requirements, timelines, or specifications..."></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus !== 'idle'}
                className="w-full bg-corporate-gold text-corporate-navy py-4 rounded-sm font-bold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {formStatus === 'idle' && <>Submit Request <Send className="h-5 w-5" /></>}
                {formStatus === 'submitting' && 'Sending...'}
                {formStatus === 'success' && 'Request Sent Successfully!'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
