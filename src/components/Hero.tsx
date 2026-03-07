import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, ShieldCheck, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const images = [
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop", // Cargo ship
  "https://images.unsplash.com/photo-1504307651254-35680f356f90?q=80&w=2070&auto=format&fit=crop", // Construction/Industrial
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"  // Business/Trade
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Enhanced parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-corporate-navy">
      {/* Background Image Slider with Parallax */}
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0 w-full h-full origin-top">
        {images.map((img, index) => (
          <motion.img
            key={img}
            src={img}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImage ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            alt="Global logistics and procurement"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ))}
        <div className="absolute inset-0 bg-corporate-navy/60 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-corporate-navy via-corporate-navy/80 to-transparent z-10"></div>
      </motion.div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="h-1 w-8 bg-corporate-gold"></span>
            <span className="text-corporate-gold font-semibold tracking-wider uppercase text-sm">
              African Supply Chain Solutions
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6"
          >
            Your Trusted African <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-corporate-gold to-yellow-200">
              Procurement & Sourcing
            </span> Partner
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
          >
            Expert cross-border trade, supplier sourcing, and logistics coordination between South Africa, the Democratic Republic of the Congo, and beyond.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/quote"
              className="bg-corporate-gold text-corporate-navy px-8 py-4 rounded-sm font-bold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
            >
              Start Your Procurement Request <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-sm font-semibold text-lg hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Explore Our Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-white/20 pt-8"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-corporate-gold" />
              <span className="text-white text-sm font-medium">Verified African<br/>Suppliers</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe2 className="h-8 w-8 text-corporate-gold" />
              <span className="text-white text-sm font-medium">Cross-Border<br/>Expertise</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
