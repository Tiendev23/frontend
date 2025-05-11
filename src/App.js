// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct'; // 👈 Thêm dòng này
import EditProduct from './pages/EditProduct'; // 👈 thêm dòng này
import Product from './pages/Products';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} /> {/* 👈 Thêm route mới */}
        <Route path="/add" element={<AddProduct />} /> {/* 👈 Thêm route mới */}
        <Route path="/edit/:id" element={<EditProduct />} /> {/* 👈 Thêm route mới */}
      </Routes>
    </Router>
  );
}

export default App;
