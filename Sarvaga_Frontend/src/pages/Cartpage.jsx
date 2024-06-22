import React from 'react'
import Navbar from '../components/Navbar';
import Cart from '../components/cart/Cart';

const Cartpage = () => {
    return (
      <div>
          <div>
            <Navbar></Navbar>
        </div> 
        <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
            <Cart />
        </div>
      </div>
    );
}

export default Cartpage