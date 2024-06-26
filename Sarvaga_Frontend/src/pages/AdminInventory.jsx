import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Card from '../components/Cards/Card';
import { useAuth0 } from '@auth0/auth0-react';
import PropagateLoader from 'react-spinners/PropagateLoader';
function AdminInventory() {
  const [products, setProducts] = useState([]);
  const {isLoading} = useAuth0();
const axiosInstance = axios.create({
  baseURL: "https://api.sarvagafashions.com/BE",
});
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(
          "/admin/products/all"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
    {isLoading ? <div className="flex items-center justify-center min-h-screen">
      <PropagateLoader color='#A855F7' />        </div> : <div>
      <Navbar />
      <div className="p-8 pt-16">
        <h1 className="text-2xl font-bold mb-4">Admin Inventory</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </div>
    </div>}
    
    </>
  );
}

export default AdminInventory;
