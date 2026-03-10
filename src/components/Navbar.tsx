import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check initial language from cookie
    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    if (match) {
      const lang = match[2].split('/').pop();
      if (lang === 'fr' || lang === 'en') {
        setCurrentLang(lang);
      }
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lang: string) => {
    if (lang === currentLang) return;
    
    if (lang === 'en') {
      // Clear cookies to revert to original language
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    } else {
      // Set the cookie manually to ensure it persists
      document.cookie = `googtrans=/en/${lang}; path=/`;
      document.cookie = `googtrans=/en/${lang}; path=/; domain=${window.location.hostname}`;
    }
    
    // Reload the page to apply the translation robustly without React DOM conflicts
    window.location.reload();
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'Markets', href: '/markets' },
    { name: 'Partners', href: '/partners' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 'bg-corporate-navy text-white shadow-lg py-3' : 'bg-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-corporate-gold" />
            <span className="font-heading font-bold text-xl tracking-tight">
              DM TRADING <span className="text-corporate-gold">SOLUTIONS</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium hover:text-corporate-gold transition-colors ${
                  location.pathname === link.href ? 'text-corporate-gold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Custom Language Toggle */}
            <div className="flex items-center bg-white/10 rounded-sm p-1 notranslate">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 text-xs font-bold rounded-sm transition-colors ${currentLang === 'en' ? 'bg-corporate-gold text-corporate-navy' : 'text-white hover:bg-white/20'}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('fr')}
                className={`px-2 py-1 text-xs font-bold rounded-sm transition-colors ${currentLang === 'fr' ? 'bg-corporate-gold text-corporate-navy' : 'text-white hover:bg-white/20'}`}
              >
                FR
              </button>
            </div>

            <Link
              to="/quote"
              className="bg-corporate-gold text-corporate-navy px-5 py-2 rounded-sm font-semibold text-sm hover:bg-yellow-500 transition-colors flex items-center gap-1"
            >
              Request a Quote <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
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
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-3 text-base font-medium text-white hover:text-corporate-gold hover:bg-corporate-blue rounded-md ${
                  location.pathname === link.href ? 'text-corporate-gold bg-corporate-blue' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="px-3 py-3 flex items-center gap-2 notranslate">
              <span className="text-sm text-gray-400">Language:</span>
              <div className="flex items-center bg-white/10 rounded-sm p-1">
                <button
                  onClick={() => { changeLanguage('en'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1 text-sm font-bold rounded-sm transition-colors ${currentLang === 'en' ? 'bg-corporate-gold text-corporate-navy' : 'text-white hover:bg-white/20'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => { changeLanguage('fr'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1 text-sm font-bold rounded-sm transition-colors ${currentLang === 'fr' ? 'bg-corporate-gold text-corporate-navy' : 'text-white hover:bg-white/20'}`}
                >
                  FR
                </button>
              </div>
            </div>

            <Link
              to="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 text-center bg-corporate-gold text-corporate-navy px-5 py-3 rounded-sm font-semibold text-base hover:bg-yellow-500 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
