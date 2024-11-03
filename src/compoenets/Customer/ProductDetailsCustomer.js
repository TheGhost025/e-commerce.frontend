import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomerNavBar from './CustomerNacBar';

const ProductDetailsCustomer = () => {
  const { productId } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  useEffect(() => {
    // Fetch the specific product for the supplier
    axios.get(`https://localhost:44305/api/Products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setProduct(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the product!', error);
    });
  }, [productId, token]);

  if (!product) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const addToCart = async () => {
    const token = localStorage.getItem('token'); // Assume you store JWT in localStorage
    const formData = new FormData();
    formData.append('ProductId', product.id);
    formData.append('Quantity', quantity);
    try {
      const response = await axios.post(
        'https://localhost:44305/api/cart/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    }
  };
  

  return (
    <CustomerNavBar>
      <div className="container mt-4">
        <h1>{product.name}</h1>
        <div className="row">
          <div className="col-md-6">
            <img 
              src={"https://localhost:44305" + product.imageURL} 
              alt={product.name} 
              className="img-fluid product-image" 
            />
          </div>
          <div className="col-md-6">
            <h2>Price: ${product.price}</h2>
            <p>{product.description}</p>
            <p>Stock: {product.stock}</p>
            
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control"
            />

            <button onClick={addToCart} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </CustomerNavBar>
  );
};

export default ProductDetailsCustomer;