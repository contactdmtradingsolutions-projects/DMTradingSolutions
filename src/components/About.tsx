import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Users, TrendingUp, X } from 'lucide-react';

export default function About() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    {
      title: "Strategic Sourcing",
      icon: <Target className="h-6 w-6" />,
      shortDesc: "Finding the right partners for your specific needs.",
      fullDesc: "At DM Trading Solutions (PTY) LTD, Strategic Sourcing is the foundation of our operations. We meticulously identify, evaluate, and engage with top-tier manufacturers and suppliers across South Africa and the broader African continent. Our process goes beyond simply finding products; we negotiate competitive pricing, secure favorable terms, and build resilient supply chains tailored to your specific industry requirements. By leveraging our extensive network and deep market intelligence, we ensure that you receive high-quality materials and equipment while minimizing costs and mitigating the risks associated with cross-border procurement in complex emerging markets."
    },
    {
      title: "Supplier Verification",
      icon: <Users className="h-6 w-6" />,
      shortDesc: "Ensuring reliability and reducing risk.",
      fullDesc: "Supplier Verification is a critical component of how DM Trading Solutions (PTY) LTD protects your business interests. We conduct rigorous due diligence on all potential African suppliers before any transaction occurs. Our comprehensive vetting process includes verifying legal registration, assessing financial stability, inspecting production facilities, and confirming quality control standards like ISO certifications. By thoroughly auditing our partners, we eliminate the risk of fraud, non-delivery, or substandard goods. This strict compliance framework guarantees that you are partnering with reputable, capable, and ethical suppliers, ensuring a secure and reliable procurement experience."
    },
    {
      title: "Supply Chain Support",
      icon: <TrendingUp className="h-6 w-6" />,
      shortDesc: "End-to-end management of your procurement.",
      fullDesc: "DM Trading Solutions (PTY) LTD provides comprehensive Supply Chain Support to ensure your goods move seamlessly from the manufacturer to your final destination. We handle the entire logistical lifecycle, specializing in complex cross-border routes like the South Africa to DRC corridor. Our dedicated team manages freight forwarding, customs clearance, import/export documentation, and real-time tracking. We proactively address potential bottlenecks at borders and ports, ensuring compliance with all regional trade regulations. By acting as your single point of contact for all logistical needs, we guarantee timely, cost-effective, and hassle-free delivery of your critical assets."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
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
              Based in South Africa, DM Trading Solutions (PTY) LTD specializes in bridging the gap between reliable African suppliers and international businesses. As a leading procurement company Africa trusts, we are your dedicated partner for supplier sourcing South Africa and import export South Africa operations.
            </p>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Our core expertise lies in facilitating seamless trade between South Africa and the Democratic Republic of the Congo, helping businesses source reliable suppliers, manage complex procurement processes, and coordinate logistics efficiently.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {topics.map((topic, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 cursor-pointer group"
                  onClick={() => setSelectedTopic(index)}
                >
                  <div className="bg-corporate-light p-3 rounded-full text-corporate-gold group-hover:bg-corporate-gold group-hover:text-corporate-navy transition-colors">
                    {topic.icon}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-corporate-navy mb-1 group-hover:text-corporate-gold transition-colors">{topic.title}</h4>
                    <p className="text-sm text-gray-500">{topic.shortDesc}</p>
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

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedTopic !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTopic(null)}
              className="absolute inset-0 bg-corporate-navy/80 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-sm shadow-2xl max-w-2xl w-full overflow-hidden z-10"
            >
              <div className="bg-corporate-navy p-6 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <div className="text-corporate-gold">
                    {topics[selectedTopic].icon}
                  </div>
                  <h3 className="text-2xl font-heading font-bold">
                    {topics[selectedTopic].title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedTopic(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {topics[selectedTopic].fullDesc}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="bg-corporate-gold text-corporate-navy px-6 py-3 rounded-sm font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    Close
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
