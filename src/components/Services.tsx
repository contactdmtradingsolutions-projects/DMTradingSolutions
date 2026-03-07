import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Search, Ship, CheckCircle, Truck, X, ArrowLeft } from 'lucide-react';

export default function Services() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      title: 'Procurement Services Africa',
      shortDescription: 'Helping companies procure equipment, materials, and supplies from trusted African suppliers with competitive pricing and quality assurance.',
      fullDescription: 'Our Procurement Services in Africa are designed to streamline your supply chain by acting as your dedicated purchasing arm on the continent. We understand that navigating the African market can be complex due to varying regulations, language barriers, and logistical hurdles. We handle the entire procurement lifecycle—from identifying your specific requirements to negotiating the best possible prices with trusted local suppliers. By leveraging our extensive network and deep market knowledge, we ensure that you receive high-quality equipment, materials, and supplies without the typical risks associated with cross-border purchasing. Our goal is to reduce your operational costs while guaranteeing quality and compliance.',
      icon: <ShoppingCart className="h-8 w-8" />,
    },
    {
      title: 'Product Sourcing',
      shortDescription: 'Finding reliable manufacturers and suppliers for companies looking to buy specific products from South Africa and the broader African market.',
      fullDescription: 'Product Sourcing is at the core of what we do. When you need a specific product, whether it is heavy industrial machinery, agricultural goods, or specialized construction materials, our team conducts exhaustive market research to find the perfect match. We do not just find suppliers; we find the right partners for your business. We evaluate potential manufacturers based on their production capacity, quality control standards, and financial stability. By conducting on-site visits and requesting product samples, we ensure that the goods you receive meet your exact specifications. This meticulous approach saves you time and protects your business from substandard products.',
      icon: <Search className="h-8 w-8" />,
    },
    {
      title: 'Import & Export Services',
      shortDescription: 'Handling international trade processes including supplier coordination, documentation guidance, and comprehensive supply chain support.',
      fullDescription: 'International trade involves a maze of regulations, tariffs, and paperwork. Our Import & Export Services are tailored to simplify this process for you. We manage the complexities of cross-border trade, ensuring that all your shipments comply with both local and international laws. Our team provides expert guidance on necessary documentation, including certificates of origin, commercial invoices, and customs declarations. We coordinate closely with customs brokers and freight forwarders to prevent delays at the border. Whether you are importing goods into the DRC or exporting from South Africa, we provide the regulatory expertise needed to keep your supply chain moving smoothly.',
      icon: <Ship className="h-8 w-8" />,
    },
    {
      title: 'Supplier Verification',
      shortDescription: 'Helping businesses verify African suppliers to ensure reliability, compliance, and significantly reduce procurement risk.',
      fullDescription: 'In global trade, trust is paramount, but verification is essential. Our Supplier Verification service is designed to protect your business from fraud and unreliable partners. Before you commit to a large order, we conduct comprehensive background checks on potential African suppliers. This includes verifying their legal registration, checking their financial health, and confirming their track record with previous clients. We also ensure they hold the necessary export licenses and quality certifications (such as ISO). By conducting these rigorous audits, we mitigate the risks of non-delivery or poor quality, giving you the confidence to build long-term, secure trading relationships.',
      icon: <CheckCircle className="h-8 w-8" />,
    },
    {
      title: 'Logistics Coordination',
      shortDescription: 'Assisting with transportation planning and cross-border logistics, specializing in routes between South Africa and the Democratic Republic of the Congo.',
      fullDescription: 'Moving goods across the African continent requires specialized knowledge and reliable partners. Our Logistics Coordination service takes the headache out of transportation planning. We specialize in managing complex freight routes, particularly the busy corridors between South Africa and the Democratic Republic of the Congo. We select the most efficient and cost-effective transport methods—whether by road, rail, or sea—and coordinate with trusted carriers. Our team tracks your shipments in real-time, proactively managing any potential delays at border crossings or ports. From the supplier’s warehouse to your final destination, we ensure your goods arrive safely, on time, and within budget.',
      icon: <Truck className="h-8 w-8" />,
    },
  ];

  return (
    <section id="services" className="py-24 bg-corporate-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-center">
          <div className="lg:col-span-5">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
              alt="Services Overview" 
              className="w-full h-auto rounded-sm shadow-xl object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1 w-8 bg-corporate-gold"></span>
              <span className="text-corporate-navy font-semibold tracking-wider uppercase text-sm">
                Our Services
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-corporate-navy mb-6">
              Comprehensive African Procurement & Supply Chain Solutions
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At DM Trading Solutions, we deliver end-to-end supply chain management and strategic product sourcing tailored for international businesses operating within or expanding into Africa. As a premier South African procurement company, we specialize in bridging the gap between global enterprises and reliable African suppliers. Our core services encompass heavy industrial equipment sourcing, cross-border logistics coordination, import and export compliance, and rigorous supplier verification. Whether you are navigating the complex trade corridors of the Democratic Republic of the Congo (DRC) or securing wholesale materials across the SADC region, our dedicated team ensures cost-effective, risk-free, and timely delivery of your critical assets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedService(index)}
              className="bg-white p-8 rounded-sm shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-transparent hover:border-corporate-gold group cursor-pointer flex flex-col h-full"
            >
              <div className="text-corporate-navy mb-6 group-hover:text-corporate-gold transition-colors transform group-hover:scale-110 duration-300 origin-left">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-corporate-navy mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed flex-grow">
                {service.shortDescription}
              </p>
              <div className="mt-6 text-corporate-gold font-semibold flex items-center gap-2 group-hover:text-yellow-500 transition-colors">
                Learn More <ArrowLeft className="h-4 w-4 rotate-180" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
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
                    {services[selectedService].icon}
                  </div>
                  <h3 className="text-2xl font-heading font-bold">
                    {services[selectedService].title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {services[selectedService].fullDescription}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="bg-corporate-gold text-corporate-navy px-6 py-3 rounded-sm font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" /> Back to Home
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
