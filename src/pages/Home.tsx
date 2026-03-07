import React from 'react';
import Hero from '../components/Hero';
import HomeIntro from '../components/HomeIntro';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
