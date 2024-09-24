import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    imageURL: ''
  });

  useEffect(() => {
    // Fetch the product to edit
    axios.get(`https://localhost:44305/api/Products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://localhost:44305/api/Product/${id}`, product)
      .then(response => {
        navigate('/supplier/dashboard');
      })
      .catch(error => {
        console.error('There was an error updating the product!', error);
      });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={product.description} onChange={handleInputChange} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={product.category} onChange={handleInputChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleInputChange} />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" name="stock" value={product.stock} onChange={handleInputChange} />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="imageURL" value={product.imageURL} onChange={handleInputChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
