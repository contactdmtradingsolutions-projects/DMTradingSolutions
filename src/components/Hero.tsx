import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, ShieldCheck, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const defaultImages = [
  "https://images.pexels.com/photos/30517083/pexels-photo-30517083.jpeg",
  "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg",
  "https://images.pexels.com/photos/1267329/pexels-photo-1267329.jpeg"
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>(defaultImages);
  const [title, setTitle] = useState("Your Trusted African <br /> <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-corporate-gold to-yellow-200\">Procurement & Sourcing</span> Partner");
  const [subtitle, setSubtitle] = useState("Expert cross-border trade, supplier sourcing, and logistics coordination between South Africa, the Democratic Republic of the Congo, and beyond.");

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
    const unsub = onSnapshot(doc(db, 'content', 'home'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.heroImages && data.heroImages.length > 0) {
          setHeroImages(data.heroImages);
        }
        if (data.title) {
          setTitle(data.title);
        }
        if (data.subtitle) {
          setSubtitle(data.subtitle);
        }
      }
    }, (error) => {
      console.error("Error fetching home content:", error);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-corporate-navy">
      {/* Background Image Slider with Parallax */}
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0 w-full h-full origin-top">
        {heroImages.map((img, index) => (
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

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 flex flex-col items-center text-center">
        <div className="max-w-4xl flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl leading-relaxed mx-auto"
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
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
            className="mt-16 flex flex-wrap justify-center gap-8 border-t border-white/20 pt-8"
          >
            <div className="flex items-center gap-3 text-left">
              <ShieldCheck className="h-8 w-8 text-corporate-gold" />
              <span className="text-white text-sm font-medium">Verified African<br/>Suppliers</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <Globe2 className="h-8 w-8 text-corporate-gold" />
              <span className="text-white text-sm font-medium">Cross-Border<br/>Expertise</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
