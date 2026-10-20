import React from 'react';
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar"
import HomePage from "./pages/home";
import ProductPage from "./pages/product"; 


function App() {
  return (
    <>  
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme="night">
      <Navbar />

      <Routes>  
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />

      </Routes>
    </div>
    </>
  )
}

export default App
