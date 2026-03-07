import React from 'react';
import { Globe, Linkedin, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
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
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-corporate-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-corporate-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-corporate-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#home" className="hover:text-corporate-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-corporate-gold transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-corporate-gold transition-colors">Our Services</a></li>
              <li><a href="#industries" className="hover:text-corporate-gold transition-colors">Industries Served</a></li>
              <li><a href="#markets" className="hover:text-corporate-gold transition-colors">Our Markets</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#services" className="hover:text-corporate-gold transition-colors">Procurement Services Africa</a></li>
              <li><a href="#services" className="hover:text-corporate-gold transition-colors">Product Sourcing</a></li>
              <li><a href="#services" className="hover:text-corporate-gold transition-colors">Import & Export Services</a></li>
              <li><a href="#services" className="hover:text-corporate-gold transition-colors">Supplier Verification</a></li>
              <li><a href="#services" className="hover:text-corporate-gold transition-colors">Logistics Coordination</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to receive updates on African trade and procurement insights.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-corporate-navy border border-gray-700 text-white px-4 py-2 w-full rounded-l-sm focus:outline-none focus:border-corporate-gold text-sm"
              />
              <button
                type="submit"
                className="bg-corporate-gold text-corporate-navy px-4 py-2 rounded-r-sm font-semibold hover:bg-yellow-500 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} DM Trading Solutions. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
