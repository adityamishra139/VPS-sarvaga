import React, { Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer/Footer';
import { useAuth0 } from '@auth0/auth0-react';
import PropagateLoader from "react-spinners/PropagateLoader";

const Hero = lazy(() => import('../components/hero/Hero'));
const Products = lazy(() => import('../components/Products/Products'));
const Trending = lazy(() => import('../components/TopProducts/Trending'));
const Banner = lazy(() => import('../components/Banner/Banner'));
const Testimonial = lazy(() => import('../components/Testimonial/Testimonial'));

export default function Home() {
  const { isLoading } = useAuth0();

  return (
    <div className="flex flex-col min-h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <PropagateLoader color='#A855F7' />
        </div>
      ) : (
        <>
          <Navbar />
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><PropagateLoader color='#A855F7' /></div>}>
            <Hero />
            <Products />
            <Trending />
            <Banner />
            <Testimonial />
          </Suspense>
          <Footer />
        </>
      )}
    </div>
  );
}
