import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export default function Markets() {
  const markets = [
    { name: 'South Africa', description: 'Our headquarters and primary sourcing hub for high-quality industrial and commercial goods.' },
    { name: 'Democratic Republic of the Congo', description: 'Our specialized destination market with deep logistical expertise and established trade routes.' },
    { name: 'Southern Africa', description: 'Comprehensive procurement coverage across SADC nations.' },
    { name: 'Central Africa', description: 'Expanding supply chain solutions into emerging Central African markets.' }
  ];

  return (
    <section id="markets" className="py-24 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-1 w-8 bg-corporate-gold"></span>
            <span className="text-corporate-navy font-semibold tracking-wider uppercase text-sm">
              Our Markets
            </span>
            <span className="h-1 w-8 bg-corporate-gold"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-corporate-navy mb-6">
            Connecting Key African Economies
          </h2>
          <p className="text-gray-600 text-lg">
            We specialize in facilitating trade corridors that drive growth, focusing on reliable sourcing from South Africa to the DRC and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {markets.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-sm shadow-md border-t-4 border-corporate-gold hover:shadow-xl transition-shadow"
            >
              <div className="bg-corporate-light w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-corporate-navy" />
              </div>
              <h3 className="text-xl font-heading font-bold text-corporate-navy mb-4">
                {market.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {market.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
