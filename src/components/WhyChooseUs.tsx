import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhyChooseUs() {
  const reasons = [
    "Reliable African supplier network",
    "Local market expertise",
    "Cross-border procurement experience",
    "Trusted sourcing partner",
    "Efficient supply chain coordination",
    "Risk mitigation and compliance",
    "Competitive pricing negotiation",
    "Dedicated account management"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 relative"
          >
             <img
              src="https://images.pexels.com/photos/6169186/pexels-photo-6169186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Delivery man carrying a package"
              className="w-full h-auto object-cover rounded-sm shadow-xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -right-8 -bottom-8 bg-corporate-gold p-8 rounded-sm shadow-xl hidden md:block max-w-xs">
              <h4 className="font-heading font-bold text-corporate-navy text-xl mb-2">Global Standards</h4>
              <p className="text-corporate-navy/80 text-sm">Delivering international quality with local African expertise.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1 w-8 bg-corporate-gold"></span>
              <span className="text-corporate-navy font-semibold tracking-wider uppercase text-sm">
                Why Choose DM Trading Solutions
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-corporate-navy mb-6">
              Your Competitive Advantage in African Markets
            </h2>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Navigating procurement in Africa requires deep local knowledge, established relationships, and a commitment to reliability. We provide the assurance and efficiency your business needs to succeed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-corporate-gold shrink-0" />
                  <span className="text-gray-700 font-medium">{reason}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-block bg-corporate-navy text-white px-8 py-4 rounded-sm font-semibold text-lg hover:bg-corporate-blue transition-colors"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
