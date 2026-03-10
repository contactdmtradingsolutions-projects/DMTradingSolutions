import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Handshake, Globe, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import SuccessModal from '../components/SuccessModal';

export default function PartnerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xvgzedoa', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setShowSuccess(true);
        form.reset();
      } else {
        alert('There was a problem submitting your request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was a problem submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Globe className="w-8 h-8 text-corporate-gold" />,
      title: "Expanded Reach",
      description: "Gain access to new markets across South Africa and the DRC through our established logistics and procurement networks."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-corporate-gold" />,
      title: "Mutual Growth",
      description: "We believe in synergistic partnerships where both parties benefit from shared expertise, resources, and opportunities."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-corporate-gold" />,
      title: "Trusted Network",
      description: "Join a curated network of vetted suppliers, manufacturers, and service providers committed to excellence."
    },
    {
      icon: <Handshake className="w-8 h-8 text-corporate-gold" />,
      title: "Strategic Alignment",
      description: "Collaborate on large-scale projects in mining, agriculture, and infrastructure with a reliable local partner."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-corporate-navy overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?q=80&w=2000&auto=format&fit=crop"
            alt="Business partners shaking hands"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-corporate-navy via-corporate-navy/90 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-corporate-gold/20 text-corporate-gold text-sm font-semibold mb-6">
              <Handshake className="w-4 h-4" />
              <span>Partner Network</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Grow With <span className="text-corporate-gold">DM Trading Solutions</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              We are actively seeking strategic partnerships with manufacturers, suppliers, and service providers to deliver comprehensive solutions across the African continent.
            </p>
            <a
              href="#partner-form"
              className="inline-flex items-center gap-2 bg-corporate-gold text-corporate-navy px-6 py-3 rounded-sm font-semibold hover:bg-yellow-500 transition-colors"
            >
              Become a Partner <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold text-corporate-navy mb-4">Why Partner With Us?</h2>
            <div className="w-20 h-1 bg-corporate-gold mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              A partnership with DM Trading Solutions is built on transparency, mutual benefit, and a shared vision for developing African infrastructure and commerce.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center shadow-sm mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-corporate-navy mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-heading font-bold text-corporate-navy mb-6">Who We Partner With</h2>
              <p className="text-gray-600 text-lg mb-8">
                Our ecosystem thrives on diversity. We collaborate with various entities to create end-to-end supply chain solutions.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Original Equipment Manufacturers (OEMs)", desc: "Direct sourcing of heavy machinery, mining equipment, and industrial tools." },
                  { title: "Logistics & Freight Forwarders", desc: "Enhancing our cross-border transport capabilities between SA and DRC." },
                  { title: "Agricultural Producers", desc: "Sourcing high-quality grains, fertilizers, and farming equipment." },
                  { title: "Technology Providers", desc: "Implementing modern tracking, procurement, and management software." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="w-6 h-6 text-corporate-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-corporate-navy">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop" 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block border-l-4 border-corporate-gold">
                <p className="text-corporate-navy font-bold text-lg mb-2">"Alone we can do so little; together we can do so much."</p>
                <p className="text-gray-500 text-sm">— Helen Keller</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="partner-form" className="py-24 bg-corporate-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Apply to Become a Partner</h2>
            <p className="text-gray-300">Fill out the form below and our partnership team will get back to you within 48 hours.</p>
          </div>

          <div className="bg-white text-gray-900 rounded-2xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="_subject" value="New Partnership Application" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent transition-colors"
                    placeholder="e.g. Acme Corp"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent transition-colors"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700 mb-2">Type of Partnership *</label>
                <select
                  id="partnershipType"
                  name="partnershipType"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent transition-colors bg-white"
                >
                  <option value="">Select an option...</option>
                  <option value="Supplier/Manufacturer">Supplier / Manufacturer</option>
                  <option value="Logistics/Transport">Logistics / Transport Provider</option>
                  <option value="Service Provider">Service Provider</option>
                  <option value="Distributor">Distributor / Reseller</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Tell us about your company and how we can collaborate *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent transition-colors resize-none"
                  placeholder="Please provide details about your products/services and proposed partnership..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-corporate-navy text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-corporate-blue transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        message="Thank you for your interest in partnering with us. Your application has been received and our team will contact you shortly."
      />
    </div>
  );
}
