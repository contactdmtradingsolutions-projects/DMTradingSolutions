/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import IndustriesPage from './pages/IndustriesPage';
import MarketsPage from './pages/MarketsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import QuotePage from './pages/QuotePage';
import AdminPage from './pages/AdminPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'colors'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const root = document.documentElement;
        if (data.corporateNavy) root.style.setProperty('--color-corporate-navy', data.corporateNavy);
        if (data.corporateBlue) root.style.setProperty('--color-corporate-blue', data.corporateBlue);
        if (data.corporateGold) root.style.setProperty('--color-corporate-gold', data.corporateGold);
        if (data.corporateLight) root.style.setProperty('--color-corporate-light', data.corporateLight);
      }
    });
    return () => unsub();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-corporate-light font-sans text-gray-900 selection:bg-corporate-gold selection:text-corporate-navy">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/markets" element={<MarketsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
