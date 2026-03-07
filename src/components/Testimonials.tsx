import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "DM Trading Solutions has completely transformed our supply chain. Their ability to source high-quality mining equipment from South Africa and deliver it seamlessly to our sites in the DRC has saved us both time and money.",
      author: "Jean-Paul K.",
      position: "Procurement Director",
      company: "Kivu Mining Corp",
      industry: "Mining"
    },
    {
      quote: "As a construction firm operating across Southern Africa, finding reliable suppliers was a constant challenge. DM Trading Solutions (PTY) LTD provided us with verified partners and handled all the cross-border logistics flawlessly.",
      author: "Sarah M.",
      position: "Operations Manager",
      company: "Apex Construction",
      industry: "Construction"
    },
    {
      quote: "Their local market expertise and competitive pricing negotiation have given us a significant edge. We rely on them for all our wholesale import needs from South Africa. Highly recommended.",
      author: "David L.",
      position: "Managing Director",
      company: "Global Wholesale Distributors",
      industry: "Wholesale"
    }
  ];

  return (
    <section className="py-24 bg-corporate-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-1 w-8 bg-corporate-gold"></span>
            <span className="text-corporate-gold font-semibold tracking-wider uppercase text-sm">
              Client Testimonials
            </span>
            <span className="h-1 w-8 bg-corporate-gold"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-300 text-lg">
            Hear what our clients in mining, construction, and wholesale have to say about our procurement and logistics services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-corporate-blue p-8 rounded-sm border border-gray-700 relative"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-corporate-gold opacity-20" />
              <div className="mb-6">
                <span className="inline-block bg-corporate-navy border border-corporate-gold/30 text-corporate-gold text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-4">
                  {testimonial.industry}
                </span>
                <p className="text-gray-300 italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
              <div className="border-t border-gray-700 pt-4 mt-auto">
                <p className="font-heading font-bold text-white">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.position}</p>
                <p className="text-sm text-corporate-gold font-medium mt-1">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
