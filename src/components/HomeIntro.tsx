import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Target, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomeIntro() {
  return (
    <section className="py-24 bg-white">
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
                Welcome to DM Trading Solutions
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-corporate-navy mb-6 leading-tight">
              Your Gateway to Seamless <span className="text-corporate-gold">African Trade</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              As a premier South African procurement and logistics firm, we specialize in connecting global enterprises with the vast opportunities of the African market. We eliminate the complexities of cross-border trade, ensuring your supply chain operates with maximum efficiency and minimal risk.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Whether you are sourcing heavy industrial machinery, securing wholesale construction materials, or navigating the intricate logistics of the DRC trade corridor, our expert team provides end-to-end solutions tailored to your exact specifications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/about"
                className="bg-corporate-navy text-white px-8 py-4 rounded-sm font-bold text-lg hover:bg-corporate-blue transition-colors flex items-center justify-center gap-2"
              >
                Learn About Us <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="bg-corporate-light p-8 rounded-sm border-t-4 border-corporate-gold hover:shadow-lg transition-shadow">
              <Target className="h-10 w-10 text-corporate-gold mb-4" />
              <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3">Strategic Sourcing</h3>
              <p className="text-gray-600">Direct access to vetted manufacturers and premium suppliers across South Africa and beyond.</p>
            </div>
            
            <div className="bg-corporate-light p-8 rounded-sm border-t-4 border-corporate-gold hover:shadow-lg transition-shadow sm:mt-12">
              <Shield className="h-10 w-10 text-corporate-gold mb-4" />
              <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3">Risk Mitigation</h3>
              <p className="text-gray-600">Rigorous compliance checks, quality assurance, and secure financial transactions.</p>
            </div>

            <div className="bg-corporate-light p-8 rounded-sm border-t-4 border-corporate-gold hover:shadow-lg transition-shadow">
              <Zap className="h-10 w-10 text-corporate-gold mb-4" />
              <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3">Rapid Logistics</h3>
              <p className="text-gray-600">Optimized freight routes and expert customs clearance for faster delivery times.</p>
            </div>
            
            <div className="bg-corporate-navy p-8 rounded-sm border-t-4 border-corporate-gold text-white hover:shadow-lg transition-shadow sm:mt-12">
              <div className="text-4xl font-heading font-bold text-corporate-gold mb-2">15+</div>
              <h3 className="text-xl font-heading font-bold mb-3">Years Experience</h3>
              <p className="text-gray-300">Decades of combined expertise in African supply chain management.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
