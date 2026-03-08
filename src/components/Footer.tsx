import React, { useState } from 'react';
import { Globe, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SuccessModal from './SuccessModal';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xgonvaaa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setIsModalOpen(true);
        setEmail('');
      } else {
        console.error("Failed to subscribe");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <footer className="bg-corporate-blue text-gray-300 pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="h-8 w-8 text-corporate-gold" />
              <span className="font-heading font-bold text-xl tracking-tight text-white">
                DM TRADING <span className="text-corporate-gold">SOLUTIONS</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Your trusted African procurement and sourcing partner, specializing in cross-border trade, supplier sourcing, and logistics coordination between South Africa and the DRC.
            </p>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-corporate-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-corporate-gold transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-corporate-gold transition-colors">Our Services</Link></li>
              <li><Link to="/industries" className="hover:text-corporate-gold transition-colors">Industries Served</Link></li>
              <li><Link to="/markets" className="hover:text-corporate-gold transition-colors">Our Markets</Link></li>
              <li><Link to="/blog" className="hover:text-corporate-gold transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-corporate-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-corporate-gold transition-colors">Procurement Services Africa</Link></li>
              <li><Link to="/services" className="hover:text-corporate-gold transition-colors">Product Sourcing</Link></li>
              <li><Link to="/services" className="hover:text-corporate-gold transition-colors">Import & Export Services</Link></li>
              <li><Link to="/services" className="hover:text-corporate-gold transition-colors">Supplier Verification</Link></li>
              <li><Link to="/services" className="hover:text-corporate-gold transition-colors">Logistics Coordination</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to receive updates on African trade and procurement insights.</p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="bg-corporate-navy border border-gray-700 text-white px-4 py-2 w-full rounded-l-sm focus:outline-none focus:border-corporate-gold text-sm"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-corporate-gold text-corporate-navy px-4 py-2 rounded-r-sm font-semibold hover:bg-yellow-500 transition-colors text-sm disabled:opacity-50"
              >
                {isSubmitting ? '...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p><Link to="/admin" className="cursor-default hover:text-gray-400 text-gray-400">&copy;</Link> {new Date().getFullYear()} DM Trading Solutions. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        message="Thank you for subscribing to our newsletter!" 
      />
    </footer>
  );
}
