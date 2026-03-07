import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Search, Ship, CheckCircle, Truck } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Procurement Services Africa',
      description: 'Helping companies procure equipment, materials, and supplies from trusted African suppliers with competitive pricing and quality assurance.',
      icon: <ShoppingCart className="h-8 w-8" />,
    },
    {
      title: 'Product Sourcing',
      description: 'Finding reliable manufacturers and suppliers for companies looking to buy specific products from South Africa and the broader African market.',
      icon: <Search className="h-8 w-8" />,
    },
    {
      title: 'Import & Export Services',
      description: 'Handling international trade processes including supplier coordination, documentation guidance, and comprehensive supply chain support.',
      icon: <Ship className="h-8 w-8" />,
    },
    {
      title: 'Supplier Verification',
      description: 'Helping businesses verify African suppliers to ensure reliability, compliance, and significantly reduce procurement risk.',
      icon: <CheckCircle className="h-8 w-8" />,
    },
    {
      title: 'Logistics Coordination',
      description: 'Assisting with transportation planning and cross-border logistics, specializing in routes between South Africa and the Democratic Republic of the Congo.',
      icon: <Truck className="h-8 w-8" />,
    },
  ];

  return (
    <section id="services" className="py-24 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-1 w-8 bg-corporate-gold"></span>
            <span className="text-corporate-navy font-semibold tracking-wider uppercase text-sm">
              Our Services
            </span>
            <span className="h-1 w-8 bg-corporate-gold"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-corporate-navy mb-6">
            Comprehensive Procurement Solutions
          </h2>
          <p className="text-gray-600 text-lg">
            We offer end-to-end supply chain solutions tailored for international businesses operating in or sourcing from Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-sm shadow-md hover:shadow-xl transition-shadow border-t-4 border-transparent hover:border-corporate-gold group"
            >
              <div className="text-corporate-navy mb-6 group-hover:text-corporate-gold transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-corporate-navy mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
