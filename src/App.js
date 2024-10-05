import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './compoenets/login';
import Register from './compoenets/register';
import AddProduct from './compoenets/Supplier/AddProduct';
import EditProduct from './compoenets/Supplier/EditProduct';
import SupplierManageProduct from './compoenets/Supplier/SupplierManageProduct';
import SupplierDashBoard from './compoenets/Supplier/SupplierDashBoard';
import ProfileSupplierUpdate from './compoenets/Supplier/ProfileSupplierUpdate';
import ProductDetailsSupplier from './compoenets/Supplier/ProductDetailsSupplier';
import Home from './compoenets/Customer/Home';
import ProductDetailsCustomer from './compoenets/Customer/ProductDetailsCustomer';
import ProfileDetailsCustomer from './compoenets/Customer/ProfileDetailsCustomer';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer" element={<Home />} />
        <Route path="/supplier/update-profile" element={<ProfileSupplierUpdate />}/>
        <Route path="/customer/update-profile" element={<ProfileDetailsCustomer />}/>
        <Route path="/supplier/dashboard" element={<SupplierDashBoard />}/>
        <Route path="/supplier/manageProduct" element={<SupplierManageProduct />}/>
        <Route path="/supplier/products/:productId" element={<ProductDetailsSupplier />} />
        <Route path="/customer/products/:productId" element={<ProductDetailsCustomer />} />
        <Route path="/supplier/addproduct" element={<AddProduct />}/>
        <Route path="/supplier/editproduct/:id" element={<EditProduct />}/>
      </Routes>
    </Router>
  );
};

export default App;