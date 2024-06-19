import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/hero/Hero';
import Products from '../components/Products/Products';
import Trending from '../components/TopProducts/Trending';
import Banner from '../components/Banner/Banner';
import Testimonial from '../components/Testimonial/Testimonial';
import Footer from '../components/footer/Footer';
export default function Home({Authenticated}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div><Navbar />
      <Hero />
      <Products />
      <Trending />
      <Banner />
      <Testimonial />
      </div>
      <Footer/>
      
    </div>
  );
}
