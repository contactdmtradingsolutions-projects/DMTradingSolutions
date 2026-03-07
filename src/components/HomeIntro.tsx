import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Target, Shield, Zap, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomeIntro() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Strategic Sourcing",
      icon: <Target className="h-10 w-10 text-corporate-gold mb-4" />,
      shortDesc: "Direct access to vetted manufacturers and premium suppliers across South Africa and beyond.",
      fullDesc: "Unlock unparalleled value with our strategic sourcing solutions in South Africa. We connect international buyers with vetted African suppliers, ensuring high-quality product sourcing and competitive pricing. Our expert procurement company Africa trusts specializes in identifying reliable manufacturers for heavy industrial equipment, wholesale materials, and agricultural goods. Streamline your supply chain and secure the best cross-border trade partnerships today."
    },
    {
      title: "Risk Mitigation",
      icon: <Shield className="h-10 w-10 text-corporate-gold mb-4" />,
      shortDesc: "Rigorous compliance checks, quality assurance, and secure financial transactions.",
      fullDesc: "Safeguard your investments with our comprehensive risk mitigation and supplier verification services. Navigating African markets requires rigorous due diligence, quality control, and compliance checks. We protect your business from fraud by auditing manufacturers, verifying export licenses, and ensuring secure financial transactions. Trust our expert import export South Africa team to minimize supply chain disruptions and guarantee reliable cross-border procurement."
    },
    {
      title: "Rapid Logistics",
      icon: <Zap className="h-10 w-10 text-corporate-gold mb-4" />,
      shortDesc: "Optimized freight routes and expert customs clearance for faster delivery times.",
      fullDesc: "Accelerate your supply chain with our rapid logistics and freight forwarding services. We specialize in complex cross-border logistics, particularly the South Africa to DRC trade corridor. Our expert team manages customs clearance, transportation planning, and real-time shipment tracking to ensure timely delivery. Experience seamless import and export operations with optimized freight routes, reducing delays and lowering your operational costs."
    }
  ];

  return (
    <section className="py-24 bg-white relative">
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
            {features.map((feature, index) => (
              <div 
                key={index}
                onClick={() => setSelectedFeature(index)}
                className={`bg-corporate-light p-8 rounded-sm border-t-4 border-corporate-gold hover:shadow-lg transition-shadow cursor-pointer ${index === 1 ? 'sm:mt-12' : ''}`}
              >
                {feature.icon}
                <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.shortDesc}</p>
                <div className="mt-4 text-sm font-semibold text-corporate-gold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
            
            <div className="bg-corporate-navy p-8 rounded-sm border-t-4 border-corporate-gold text-white hover:shadow-lg transition-shadow sm:mt-12">
              <div className="text-4xl font-heading font-bold text-corporate-gold mb-2">15+</div>
              <h3 className="text-xl font-heading font-bold mb-3">Years Experience</h3>
              <p className="text-gray-300">Decades of combined expertise in African supply chain management.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedFeature !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-corporate-navy/90 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-sm shadow-2xl max-w-lg w-full overflow-hidden z-10"
            >
              <div className="bg-corporate-navy p-6 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <div className="text-corporate-gold">
                    {React.cloneElement(features[selectedFeature].icon as React.ReactElement, { className: "h-8 w-8 mb-0" })}
                  </div>
                  <h3 className="text-2xl font-heading font-bold">
                    {features[selectedFeature].title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedFeature(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {features[selectedFeature].fullDesc}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="bg-corporate-gold text-corporate-navy px-6 py-3 rounded-sm font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" /> Back
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
