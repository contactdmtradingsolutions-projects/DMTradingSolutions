import React from 'react';
import { motion } from 'motion/react';
import { Pickaxe, HardHat, Factory, HeartHandshake, Package } from 'lucide-react';

export default function Industries() {
  const industries = [
    {
      name: 'Mining Industry',
      icon: <Pickaxe className="h-10 w-10" />,
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1974&auto=format&fit=crop',
    },
    {
      name: 'Construction Industry',
      icon: <HardHat className="h-10 w-10" />,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356f90?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Industrial Supply',
      icon: <Factory className="h-10 w-10" />,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'NGOs & Development',
      icon: <HeartHandshake className="h-10 w-10" />,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Wholesale & Distribution',
      icon: <Package className="h-10 w-10" />,
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1935&auto=format&fit=crop',
    },
  ];

  return (
    <section id="industries" className="py-24 bg-corporate-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1 w-8 bg-corporate-gold"></span>
              <span className="text-corporate-gold font-semibold tracking-wider uppercase text-sm">
                Industries Served
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Specialized Sourcing for Key Sectors
            </h2>
            <p className="text-gray-300 text-lg">
              We understand the unique procurement challenges and requirements of different industries operating in Africa.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-sm h-64 cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-corporate-navy/70 group-hover:bg-corporate-navy/50 transition-colors duration-300"></div>
              </div>
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="text-corporate-gold mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">
                  {industry.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-white group-hover:text-corporate-gold transition-colors">
                  {industry.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
