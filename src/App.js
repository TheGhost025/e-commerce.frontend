import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './compoenets/login';
import Register from './compoenets/register';
import AddProduct from './compoenets/Supplier/AddProduct';
import EditProduct from './compoenets/Supplier/EditProduct';
import SupplierManageProduct from './compoenets/Supplier/SupplierManageProduct';
import SupplierDashBoard from './compoenets/Supplier/SupplierDashBoard';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/supplier/dashboard" element={<SupplierDashBoard />}/>
        <Route path="/supplier/manageProduct" element={<SupplierManageProduct />}/>
        <Route path="/supplier/addproduct" element={<AddProduct />}/>
        <Route path="/supplier/editproduct/:id" element={<EditProduct />}/>
      </Routes>
    </Router>
  );
};

export default App;