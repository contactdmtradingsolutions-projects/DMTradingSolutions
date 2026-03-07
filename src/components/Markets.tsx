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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-center">
          <div className="lg:col-span-5">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
              alt="African Markets Map" 
              className="w-full h-auto rounded-sm shadow-xl object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1 w-8 bg-corporate-gold"></span>
              <span className="text-corporate-navy font-semibold tracking-wider uppercase text-sm">
                Our Markets
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-corporate-navy mb-6">
              Connecting Key African Economies
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              We specialize in facilitating trade corridors that drive growth, focusing on reliable sourcing from South Africa to the DRC and beyond.
            </p>
            
            {/* SEO Content */}
            <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-corporate-gold text-left">
              <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3">Expert African Trade & Logistics</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                As a leading procurement company in Africa, DM Trading Solutions bridges the gap between high-quality South African suppliers and rapidly growing markets like the Democratic Republic of the Congo (DRC) and the broader SADC region. Our deep understanding of cross-border logistics, customs compliance, and regional supply chain dynamics allows us to deliver seamless import and export services. Whether you are sourcing heavy mining equipment, construction materials, or industrial supplies, our established trade routes ensure your goods arrive safely and on schedule. We are committed to fostering economic growth through reliable, transparent, and efficient African procurement solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {markets.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-sm shadow-md border-t-4 border-corporate-gold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="bg-corporate-light w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-corporate-gold transition-colors duration-300">
                <MapPin className="h-6 w-6 text-corporate-navy group-hover:text-white transition-colors duration-300" />
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
