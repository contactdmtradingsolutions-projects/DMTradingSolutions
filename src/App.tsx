/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Industries from './components/Industries';
import WhyChooseUs from './components/WhyChooseUs';
import Markets from './components/Markets';
import QuoteForm from './components/QuoteForm';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-corporate-light font-sans text-gray-900 selection:bg-corporate-gold selection:text-corporate-navy">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Industries />
        <WhyChooseUs />
        <Markets />
        <QuoteForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
