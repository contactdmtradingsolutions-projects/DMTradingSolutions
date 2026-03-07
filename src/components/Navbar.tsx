import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Industries', href: '#industries' },
    { name: 'Markets', href: '#markets' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-corporate-navy text-white shadow-lg py-3' : 'bg-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-corporate-gold" />
            <span className="font-heading font-bold text-xl tracking-tight">
              DM TRADING <span className="text-corporate-gold">SOLUTIONS</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-corporate-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#quote"
              className="bg-corporate-gold text-corporate-navy px-5 py-2 rounded-sm font-semibold text-sm hover:bg-yellow-500 transition-colors flex items-center gap-1"
            >
              Request a Quote <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-corporate-gold focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-corporate-navy absolute top-full left-0 w-full shadow-xl border-t border-gray-800">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-medium text-white hover:text-corporate-gold hover:bg-corporate-blue rounded-md"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 text-center bg-corporate-gold text-corporate-navy px-5 py-3 rounded-sm font-semibold text-base hover:bg-yellow-500 transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
