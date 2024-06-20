import React from 'react'
import AOS from "aos";
import "aos/dist/aos.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sarees from './pages/Sarees'
import SalwaarSuits from './pages/SalwaarSuits'
import Lehangas from './pages/Lehangas'
import Designers from './pages/Designers'
import Newarrivals from './pages/Newarrivals'
import Home from './pages/Home'
import Description from './pages/Description'
import { useAuth0 } from "@auth0/auth0-react";
import CartPage from './pages/Cart';
import AdminItems from './pages/AdminItems';
import AdminInventory from './pages/AdminInventory';
import AdminOrders from './pages/AdminOrders';
import Aboutus from './pages/Aboutus';
const App = () => {
  React.useEffect(()=>{
    AOS.init({
      offset:100,
      duration:800,
      easing:"ease in sine",
      delay:100,
    });
    AOS.refresh();
  },[]);
  const isAuthenticated=useAuth0();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/admin/editItems" element={<AdminItems></AdminItems>}></Route>
          <Route path="/admin/inventory" element={<AdminInventory></AdminInventory>}></Route>
          <Route path="/admin/orders" element={<AdminOrders></AdminOrders>}></Route>
          <Route path="/user/aboutus" element={<Aboutus></Aboutus>}></Route>
          <Route
            path="/home"
            element={<Home Authenticated={isAuthenticated}></Home>}
          ></Route>
          <Route
            path="/sarees"
            element={<Sarees Authenticated={isAuthenticated}></Sarees>}
          ></Route>
          <Route
            path="/salwaar-suits"
            element={
              <SalwaarSuits Authenticated={isAuthenticated}></SalwaarSuits>
            }
          ></Route>
          <Route
            path="/lehangas"
            element={<Lehangas Authenticated={isAuthenticated}></Lehangas>}
          ></Route>
          <Route
            path="/designers"
            element={<Designers Authenticated={isAuthenticated}></Designers>}
          ></Route>
          <Route
            path="/newArrivals"
            element={
              <Newarrivals Authenticated={isAuthenticated}></Newarrivals>
            }
          ></Route>
          <Route
            path="/description/:id"
            element={
              <Description Authenticated={isAuthenticated}></Description>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <CartPage Authenticated={isAuthenticated}></CartPage>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
