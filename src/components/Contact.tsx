import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-1 w-8 bg-corporate-gold"></span>
            <span className="text-corporate-navy font-semibold tracking-wider uppercase text-sm">
              Contact Us
            </span>
            <span className="h-1 w-8 bg-corporate-gold"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-corporate-navy mb-6">
            Get in Touch with Our Team
          </h2>
          <p className="text-gray-600 text-lg">
            Ready to streamline your African supply chain? Contact DM Trading Solutions today to discuss your procurement needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-corporate-light p-8 rounded-sm text-center hover:shadow-lg transition-shadow">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <MapPin className="h-8 w-8 text-corporate-gold" />
            </div>
            <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3">Head Office</h3>
            <p className="text-gray-600">
              Johannesburg,<br />
              South Africa
            </p>
          </div>

          <div className="bg-corporate-light p-8 rounded-sm text-center hover:shadow-lg transition-shadow">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Phone className="h-8 w-8 text-corporate-gold" />
            </div>
            <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3">Phone</h3>
            <p className="text-gray-600">
              <a href="tel:+27000000000" className="hover:text-corporate-gold transition-colors">+27 (0) 00 000 0000</a><br />
              <span className="text-sm text-gray-500">Mon-Fri, 8am-5pm SAST</span>
            </p>
          </div>

          <div className="bg-corporate-light p-8 rounded-sm text-center hover:shadow-lg transition-shadow">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Mail className="h-8 w-8 text-corporate-gold" />
            </div>
            <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3">Email</h3>
            <p className="text-gray-600">
              <a href="mailto:info@dmtradingsolutions.com" className="hover:text-corporate-gold transition-colors">info@dmtradingsolutions.com</a><br />
              <a href="mailto:sales@dmtradingsolutions.com" className="hover:text-corporate-gold transition-colors">sales@dmtradingsolutions.com</a>
            </p>
          </div>

          <div className="bg-corporate-light p-8 rounded-sm text-center hover:shadow-lg transition-shadow">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Clock className="h-8 w-8 text-corporate-gold" />
            </div>
            <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3">Business Hours</h3>
            <p className="text-gray-600">
              Monday - Friday<br />
              08:00 - 17:00 SAST
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
