import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;