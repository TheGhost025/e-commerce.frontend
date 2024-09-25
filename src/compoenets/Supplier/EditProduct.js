import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SupplierNavBar from './SupplierNavBar';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: null // Image is initially null
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

  const handleFileChange = (e) => {
    // Set the selected file in the state
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Create FormData to send files and other data
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('price', product.price);
    formData.append('stock', product.stock);

    // Append the image file if one has been selected
    if (product.image) {
      formData.append('image', product.image);
    }

    axios.put(`https://localhost:44305/api/Products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        navigate('/supplier/manageProduct');
      })
      .catch(error => {
        console.error('There was an error updating the product!', error);
      });
  };

  return (
    <SupplierNavBar>
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" className="form-control" value={product.name} onChange={handleInputChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" className="form-control" value={product.description} onChange={handleInputChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="category">Category:</label>
            <input type="text" name="category" className="form-control" value={product.category} onChange={handleInputChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="price">Price:</label>
            <input type="number" name="price" className="form-control" value={product.price} onChange={handleInputChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="stock">Stock:</label>
            <input type="number" name="stock" className="form-control" value={product.stock} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input type="file" className="form-control" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </SupplierNavBar>
  );
};

export default EditProduct;
