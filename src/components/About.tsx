import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1 w-8 bg-corporate-gold"></span>
              <span className="text-corporate-navy font-semibold tracking-wider uppercase text-sm">
                About Us
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-corporate-navy mb-6">
              Connecting African Suppliers with International Buyers
            </h2>
            
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Based in South Africa, DM Trading Solutions specializes in bridging the gap between reliable African suppliers and international businesses. As a leading procurement company Africa trusts, we are your dedicated partner for supplier sourcing South Africa and import export South Africa operations.
            </p>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Our core expertise lies in facilitating seamless trade between South Africa and the Democratic Republic of the Congo, helping businesses source reliable suppliers, manage complex procurement processes, and coordinate logistics efficiently.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-corporate-light p-3 rounded-full text-corporate-gold">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-corporate-navy mb-1">Strategic Sourcing</h4>
                  <p className="text-sm text-gray-500">Finding the right partners for your specific needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-corporate-light p-3 rounded-full text-corporate-gold">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-corporate-navy mb-1">Supplier Verification</h4>
                  <p className="text-sm text-gray-500">Ensuring reliability and reducing risk.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-corporate-light p-3 rounded-full text-corporate-gold">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-corporate-navy mb-1">Supply Chain Support</h4>
                  <p className="text-sm text-gray-500">End-to-end management of your procurement.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-corporate-gold translate-x-4 translate-y-4 rounded-sm -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
              alt="Business professionals discussing procurement strategy"
              className="w-full h-auto object-cover rounded-sm shadow-xl"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute -bottom-8 -left-8 bg-corporate-navy p-8 rounded-sm shadow-xl hidden md:block">
              <div className="text-corporate-gold font-heading font-bold text-4xl mb-1">10+</div>
              <div className="text-white text-sm font-medium uppercase tracking-wider">Years of African<br/>Trade Experience</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
