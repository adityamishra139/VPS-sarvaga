import React from 'react';
import banner1 from "../../assets/_DSC1439-1.JPG";
import { IoFastFood } from 'react-icons/io5';
import { GiFoodTruck } from 'react-icons/gi';
import { GrSecure } from 'react-icons/gr';

const Banner = () => {
  return (
    <div className='min-h-[500px] flex justify-center py-12 sm:py-0'>
      <div className='container bg-gray-100 py-10 px-5 rounded-lg shadow-lg'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 items-center'>
          {/* Image Section */}
          <div data-aos="zoom-in" className='flex justify-center'>
            <img src={banner1} alt="Winter Sale" className='max-w-full h-auto shadow-xl rounded-xl'/>
          </div>
          {/* Text Section */}
          <div className='flex flex-col justify-center gap-6'>
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold text-gray-900">Winter Sale Up to 50% Off</h1>
            <p data-aos="fade-up" className='text-sm sm:text-base text-gray-600 tracking-wide leading-6'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis nemo inventore ex odit optio saepe.
            </p>
            <div className='flex flex-col gap-6'>
              <div data-aos="fade-up" className='flex items-center gap-4'>
                <GrSecure className="text-4xl h-12 w-12 p-2 rounded-full bg-violet-100"/>
                <p className="text-gray-800 font-medium">Quality Products</p>
              </div>
              <div data-aos="fade-up" className='flex items-center gap-4'>
                <IoFastFood className='text-4xl h-12 w-12 p-2 rounded-full bg-orange-100'/>
                <p className="text-gray-800 font-medium">Fast Delivery</p>
              </div>
              <div data-aos="fade-up" className='flex items-center gap-4'>
                <GiFoodTruck className='text-4xl h-12 w-12 p-2 rounded-full bg-green-100'/>
                <p className="text-gray-800 font-medium">Easy Payment Method</p>
              </div>
              <div data-aos="fade-up" className='flex items-center gap-4'>
                <IoFastFood className='text-4xl h-12 w-12 p-2 rounded-full bg-yellow-100'/>
                <p className="text-gray-800 font-medium">Get Offers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner;
