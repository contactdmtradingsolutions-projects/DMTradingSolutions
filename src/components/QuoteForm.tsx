import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SuccessModal from './SuccessModal';

export default function QuoteForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/xgonvaaa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsModalOpen(true);
        form.reset();
      } else {
        console.error("Failed to send request");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/');
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
                  <input type="text" id="company" name="company" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="Your Company Ltd" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select id="country" name="country" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow bg-white">
                    <option value="">Select a country</option>
                    <optgroup label="Africa">
                      <option value="South Africa">South Africa</option>
                      <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                      <option value="Angola">Angola</option>
                      <option value="Botswana">Botswana</option>
                      <option value="Egypt">Egypt</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Mozambique">Mozambique</option>
                      <option value="Namibia">Namibia</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                    </optgroup>
                    <optgroup label="Global">
                      <option value="Australia">Australia</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Canada">Canada</option>
                      <option value="China">China</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="India">India</option>
                      <option value="Japan">Japan</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Other">Other</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="john@company.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">Product Needed *</label>
                  <input type="text" id="product" name="product" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="e.g. Mining Equipment" />
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                  <input type="text" id="quantity" name="quantity" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="e.g. 5 Units" />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Delivery Location *</label>
                <input type="text" id="location" name="location" required className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow" placeholder="City, Country" />
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                <textarea id="details" name="details" rows={4} className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none text-gray-900 transition-shadow resize-none" placeholder="Please provide any specific requirements, timelines, or specifications..."></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-corporate-gold text-corporate-navy py-4 rounded-sm font-bold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'} <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        message="Thank you for your request. We will get back to you with a tailored solution shortly." 
      />
    </section>
  );
}
