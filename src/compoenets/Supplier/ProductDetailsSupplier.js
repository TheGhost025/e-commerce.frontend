import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SupplierNavBar from './SupplierNavBar';

const ProductDetailsSupplier = () => {
  const { productId } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
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
    return <div>Loading product details...</div>;
  }

  return (
    <SupplierNavBar>
      <div className="container mt-4">
        <h1>Product Details</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text"><strong>Description:</strong> {product.description}</p>
            <p className="card-text"><strong>Category:</strong> {product.category}</p>
            <p className="card-text"><strong>Price:</strong> ${product.price}</p>
            <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
            {product.imageURL && (
              <img src={`https://localhost:44305${product.imageURL}`} alt={product.name} style={{ width: '200px', height: '200px' }} />
            )}
          </div>
        </div>
      </div>
    </SupplierNavBar>
  );
};

export default ProductDetailsSupplier;
