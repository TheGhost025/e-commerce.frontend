import React, { useState } from 'react';
import axios from 'axios';
import SupplierNavBar from './SupplierNavBar';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    formData.append('Category', category);
    formData.append('Price', price);
    formData.append('Stock', stock);
    formData.append('Image', image); // Append the image file

    try {
        const token = localStorage.getItem('token');
      const response = await axios.post('https://localhost:44305/api/Products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Product added successfully:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <SupplierNavBar>      
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input type="text" className="form-control" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input type="number" className="form-control" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input type="number" className="form-control" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input type="file" className="form-control" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
      </div>
  </SupplierNavBar>
  );
};

export default AddProduct;