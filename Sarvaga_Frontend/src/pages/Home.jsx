import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/hero/Hero';
import Products from '../components/Products/Products';
import Trending from '../components/TopProducts/Trending';
import Banner from '../components/Banner/Banner';
import Testimonial from '../components/Testimonial/Testimonial';
import Footer from '../components/footer/Footer';
import { useAuth0 } from '@auth0/auth0-react';
import PropagateLoader from "react-spinners/PropagateLoader"
export default function Home() {
  const {isLoading} = useAuth0();
  return (
    <div className="flex flex-col min-h-screen">
      {isLoading ? <div className="flex items-center justify-center min-h-screen">
        <PropagateLoader color='#A855F7' />
        </div> : <><div><Navbar />
      <Hero />
      <Products />
      <Trending />
      <Banner />
      <Testimonial />
      </div>
      <Footer/>
      </>}
      
    </div>
  );
}
