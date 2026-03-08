import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import SuccessModal from './SuccessModal';

export default function Contact() {
  const [title, setTitle] = useState('Get in Touch with Our Team');
  const [description, setDescription] = useState('Ready to optimize your African supply chain and reduce procurement costs? Partner with DM Trading Solutions for expert cross-border logistics, reliable product sourcing, and seamless import/export services across South Africa and the DRC. Contact our dedicated procurement specialists today and let\'s build your customized trade solution!');
  const [address, setAddress] = useState('Johannesburg,\nSouth Africa');
  const [phone1, setPhone1] = useState('+27 65 845 6336');
  const [phone2, setPhone2] = useState('+27 73 760 4653');
  const [hours, setHours] = useState('Mon-Fri, 8am-5pm SAST');
  const [email1, setEmail1] = useState('info@dmtradingsolutions.com');
  const [email2, setEmail2] = useState('sales@dmtradingsolutions.com');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'content', 'contact'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.title) setTitle(data.title);
        if (data.description) setDescription(data.description);
        if (data.address) setAddress(data.address);
        if (data.phone1) setPhone1(data.phone1);
        if (data.phone2) setPhone2(data.phone2);
        if (data.hours) setHours(data.hours);
        if (data.email1) setEmail1(data.email1);
        if (data.email2) setEmail2(data.email2);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xgonvaaa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsModalOpen(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error("Failed to send message");
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
              <p className="text-gray-600 whitespace-pre-line">
                {address}
              </p>
            </div>

            <div className="bg-corporate-light p-8 rounded-sm text-center hover:shadow-lg transition-shadow">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Phone className="h-8 w-8 text-corporate-gold" />
              </div>
              <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3">Phone</h3>
              <p className="text-gray-600">
                <a href={`tel:${phone1.replace(/\s+/g, '')}`} className="hover:text-corporate-gold transition-colors block">{phone1}</a>
                {phone2 && <a href={`tel:${phone2.replace(/\s+/g, '')}`} className="hover:text-corporate-gold transition-colors block mb-1">{phone2}</a>}
                <span className="text-sm text-gray-500">{hours}</span>
              </p>
            </div>

            <div className="bg-corporate-light p-8 rounded-sm text-center hover:shadow-lg transition-shadow">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Mail className="h-8 w-8 text-corporate-gold" />
              </div>
              <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3">Email</h3>
              <p className="text-gray-600">
                <a href={`mailto:${email1}`} className="hover:text-corporate-gold transition-colors block">{email1}</a>
                {email2 && <a href={`mailto:${email2}`} className="hover:text-corporate-gold transition-colors block">{email2}</a>}
              </p>
            </div>

            <div className="bg-corporate-light p-8 rounded-sm text-center hover:shadow-lg transition-shadow">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Clock className="h-8 w-8 text-corporate-gold" />
              </div>
              <h3 className="text-xl font-heading font-bold text-corporate-navy mb-3">Business Hours</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {hours}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-sm shadow-xl border border-gray-100">
            <h3 className="text-2xl font-heading font-bold text-corporate-navy mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
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
                  value={formData.subject}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-corporate-gold focus:border-transparent outline-none transition-shadow resize-none"
                  placeholder="Please provide details about your inquiry..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-corporate-navy text-white px-6 py-4 rounded-sm font-bold text-lg hover:bg-corporate-blue transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        message="Thank you for your message. We will get back to you shortly." 
      />
    </section>
  );
}
