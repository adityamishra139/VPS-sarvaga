import React from "react";
import Productpage from "../components/Productpage/Productpage";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
const Description = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Invalid Product ID</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        <Productpage id={id} />
      </div>
    </div>
  );
};

export default Description;
