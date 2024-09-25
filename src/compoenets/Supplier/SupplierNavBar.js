import React from 'react';
import { Link } from 'react-router-dom';

const SupplierNavBar = ({ children }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/supplier/dashboard">Supplier Dashboard</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/supplier/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/supplier/addproduct">Add Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/supplier/manageProduct">Manage Products</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default SupplierNavBar;