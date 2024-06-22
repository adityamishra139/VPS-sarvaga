import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import PropagateLoader from "react-spinners/PropagateLoader";

// Lazy load the Card component
const Card = lazy(() => import("../components/Cards/Card"));

export default function Sarees() {
  const [sarees, setSarees] = useState([]);
  const navigate = useNavigate();
  const { isLoading } = useAuth0();

  useEffect(() => {
    fetchSarees();
  }, []);

  async function fetchSarees() {
    try {
      const response = await axios.get("https://api.sarvagafashions.com/BE/user/products/Saree", {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true // if you need to include credentials like cookies
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch sarees");
      }

      const data = response.data;
      setSarees(data);
    } catch (error) {
      console.error("Error fetching sarees:", error);
      // Optionally, set an error state to inform the user
    }
  }

  const handleCardClick = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <PropagateLoader color='#A855F7' />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="container mx-auto px-4 mt-14">
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><PropagateLoader color='#A855F7' /></div>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sarees.map((saree) => (
                  <div key={saree.id} onClick={() => handleCardClick(saree.id)}>
                    <Card product={saree} />
                  </div>
                ))}
              </div>
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
