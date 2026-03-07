import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pickaxe, HardHat, Factory, HeartHandshake, Package, X, ArrowLeft } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Industries() {
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null);
  const [title, setTitle] = useState('Specialized Sourcing & Procurement for Key African Sectors');
  const [description, setDescription] = useState('We deeply understand the unique logistical challenges and stringent regulatory requirements of diverse industries operating across the African continent. From large-scale mining operations requiring heavy-duty machinery to commercial construction projects demanding bulk building materials, DM Trading Solutions provides targeted, industry-specific supply chain solutions. Our expertise extends to industrial manufacturing, NGO relief efforts, and wholesale distribution networks. By leveraging our extensive network of vetted South African manufacturers and global suppliers, we mitigate cross-border trade risks, optimize your operational efficiency, and ensure that your sector-specific procurement needs are met with unparalleled reliability and precision.');
  const [image, setImage] = useState('https://images.pexels.com/photos/29224601/pexels-photo-29224601.jpeg');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'content', 'industries'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.title) setTitle(data.title);
        if (data.description) setDescription(data.description);
        if (data.image) setImage(data.image);
      }
    });

    return () => unsubscribe();
  }, []);

  const industries = [
    {
      name: 'Mining Industry',
      description: 'We proceed by sourcing heavy-duty equipment, safety gear, and specialized machinery directly from vetted manufacturers. We coordinate complex logistics to remote mining sites across Africa, ensuring your operations never face downtime due to supply chain delays.',
      icon: <Pickaxe className="h-10 w-10" />,
      image: 'https://images.pexels.com/photos/3089685/pexels-photo-3089685.jpeg',
    },
    {
      name: 'Construction Industry',
      description: 'We proceed by supplying bulk construction materials, tools, and heavy vehicles. We negotiate competitive rates with regional suppliers and manage cross-border transport, ensuring your construction projects in the DRC and beyond stay on schedule and within budget.',
      icon: <HardHat className="h-10 w-10" />,
      image: 'https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg',
    },
    {
      name: 'Industrial Supply',
      description: 'We proceed by identifying high-quality industrial components, electrical parts, and manufacturing inputs. We conduct rigorous supplier verification to guarantee product standards, followed by efficient freight forwarding to keep your manufacturing and processing plants running smoothly.',
      icon: <Factory className="h-10 w-10" />,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'NGOs & Development',
      description: 'We proceed by rapidly sourcing relief items, medical supplies, and infrastructure materials. We prioritize compliance, transparency, and speed, navigating complex customs regulations to deliver essential goods to development projects and crisis zones across the continent.',
      icon: <HeartHandshake className="h-10 w-10" />,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Wholesale & Distribution',
      description: 'We proceed by connecting you with reliable bulk suppliers for consumer goods and commercial products. We optimize your import strategy, handle all trade documentation, and secure cost-effective shipping routes to maximize your profit margins in local markets.',
      icon: <Package className="h-10 w-10" />,
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1935&auto=format&fit=crop',
    },
  ];

  return (
    <section id="industries" className="py-24 bg-corporate-navy text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-center">
          <div className="lg:col-span-5">
            <img 
              src={image} 
              alt="Industrial warehouse with heavy machinery" 
              className="w-full h-auto rounded-sm shadow-xl object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1 w-8 bg-corporate-gold"></span>
              <span className="text-corporate-gold font-semibold tracking-wider uppercase text-sm">
                Industries Served
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              {title}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {description}
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
              onClick={() => setSelectedIndustry(index)}
              className="group relative overflow-hidden rounded-sm h-64 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
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
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold text-corporate-gold flex items-center gap-1">
                  How we proceed <ArrowLeft className="h-3 w-3 rotate-180" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedIndustry !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndustry(null)}
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
                    {industries[selectedIndustry].icon}
                  </div>
                  <h3 className="text-2xl font-heading font-bold">
                    {industries[selectedIndustry].name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedIndustry(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-8">
                <h4 className="text-corporate-navy font-bold mb-3 uppercase tracking-wider text-sm">How we proceed</h4>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {industries[selectedIndustry].description}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedIndustry(null)}
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
