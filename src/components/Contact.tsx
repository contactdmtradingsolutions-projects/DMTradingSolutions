import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Contact() {
  const [title, setTitle] = useState('Get in Touch with Our Team');
  const [description, setDescription] = useState('Ready to optimize your African supply chain and reduce procurement costs? Partner with DM Trading Solutions for expert cross-border logistics, reliable product sourcing, and seamless import/export services across South Africa and the DRC. Contact our dedicated procurement specialists today and let\'s build your customized trade solution!');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'content', 'contact'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.title) setTitle(data.title);
        if (data.description) setDescription(data.description);
      }
    });

    return () => unsubscribe();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            {title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <a href="tel:+27658456336" className="hover:text-corporate-gold transition-colors block">+27 65 845 6336</a>
                <a href="tel:+27737604653" className="hover:text-corporate-gold transition-colors block mb-1">+27 73 760 4653</a>
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

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-sm shadow-xl border border-gray-100">
            <h3 className="text-2xl font-heading font-bold text-corporate-navy mb-6">Send us a Message</h3>
            <form action="https://formspree.io/f/xgonvaaa" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none transition-shadow"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none transition-shadow"
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none transition-shadow resize-none"
                  placeholder="Please provide details about your inquiry..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-corporate-navy text-white px-6 py-4 rounded-sm font-bold text-lg hover:bg-corporate-blue transition-colors flex items-center justify-center gap-2"
              >
                Send Message <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
