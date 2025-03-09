import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import {Home, About, Contact, Services, Portfolio} from "../../pages";

const Router = () => {
  return(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/services" element={<Services />} />
    <Route path="/portfolio" element={<Portfolio />} />
  </Routes>
</BrowserRouter>
);
}

export default Router;