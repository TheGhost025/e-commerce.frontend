import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './compoenets/login';
import Register from './compoenets/register';
import SupplierDashboard from './compoenets/Supplier/SupplierDashBoard';
import AddProduct from './compoenets/Supplier/AddProduct';
import EditProduct from './compoenets/Supplier/EditProduct';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/supplier/dashboard" element={<SupplierDashboard />}/>
        <Route path="/supplier/addproduct" element={<AddProduct />}/>
        <Route path="/supplier/editproduct/:id" element={<EditProduct />}/>
      </Routes>
    </Router>
  );
};

export default App;