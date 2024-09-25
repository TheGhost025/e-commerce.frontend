import React from 'react';
import SupplierNavBar from './SupplierNavBar';

const SupplierDashBoard = () => {
  return (
    <SupplierNavBar>
        <div className="container mt-4">
            <h2 className="text-center">Supplier Dashboard</h2>
            <div className="row">
            <div className="col-md-6">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Manage Products</h5>
                    <p className="card-text">Add, edit, or remove products from your inventory.</p>
                    <a href="/supplier/manageProduct" className="btn btn-primary">Manage Products</a>
                </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Add New Product</h5>
                    <p className="card-text">Add new products to your store.</p>
                    <a href="/supplier/addproduct" className="btn btn-success">Add Product</a>
                </div>
                </div>
            </div>
            </div>
        </div>
    </SupplierNavBar>
  );
};

export default SupplierDashBoard;