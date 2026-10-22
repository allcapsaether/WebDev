import React from 'react';
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx"; 

import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>  
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme="night">
      <Navbar />

      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />

      </Routes>

      <Toaster />

    </div>
    </>
  )
}

export default App
