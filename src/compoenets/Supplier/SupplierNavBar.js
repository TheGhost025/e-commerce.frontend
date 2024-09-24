import React from 'react';
import { Link } from 'react-router-dom';

const SupplierNavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/supplier/dashboard">Dashboard</Link></li>
        <li><Link to="/supplier/addproduct">Add Product</Link></li>
        <li>Manage Products</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default SupplierNavBar;