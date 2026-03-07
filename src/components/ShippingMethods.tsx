import React from 'react';
import { motion } from 'motion/react';
import { Ship, Plane, Truck } from 'lucide-react';

export default function ShippingMethods() {
  const methods = [
    {
      title: 'Sea Freight',
      description: 'Ideal for large, heavy, or bulk shipments. We coordinate full container loads (FCL) and less than container loads (LCL) from major global ports to African destinations, ensuring cost-effective and secure maritime transport.',
      icon: <Ship className="h-10 w-10" />,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Air Freight',
      description: 'The fastest option for urgent, high-value, or perishable goods. We leverage our network of airline partners to provide expedited air cargo services, minimizing transit times and ensuring rapid delivery to key African airports.',
      icon: <Plane className="h-10 w-10" />,
      color: 'bg-sky-50 text-sky-600 border-sky-200'
    },
    {
      title: 'Road Freight',
      description: 'Crucial for cross-border and domestic distribution within Africa. We manage reliable trucking fleets for seamless overland transport, specializing in complex routes like the South Africa to DRC corridor, ensuring your goods reach their final destination safely.',
      icon: <Truck className="h-10 w-10" />,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-1 w-8 bg-corporate-gold"></span>
            <span className="text-corporate-navy font-semibold tracking-wider uppercase text-sm">
              Logistics & Shipping
            </span>
            <span className="h-1 w-8 bg-corporate-gold"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-corporate-navy mb-6">
            Comprehensive Freight Solutions
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We understand that efficient logistics are the backbone of successful procurement. That's why we offer a multi-modal approach to shipping, ensuring your products are imported and delivered using the most optimal method for your specific timeline and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {methods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-sm border ${method.color} shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group`}
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {method.icon}
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-corporate-navy">
                {method.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
