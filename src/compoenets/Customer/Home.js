import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import CustomerNavBar from './CustomerNacBar';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      // Fetch all products from the API
      axios.get('https://localhost:44305/api/Products/all')
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.error('Error fetching products', error);
        });
    }, []);
  
    // Filter products based on search term
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleViewDetails = (productId) => {
      navigate(`/customer/products/${productId}`);
    };

  return (
    <CustomerNavBar>
    <div className="container mt-4">
      <h1>All Products</h1>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleSearch}
        className="form-control mb-4"
      />
      <div className="row">
        {filteredProducts.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={product.imageUrl || 'default-image-url.jpg'} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <button className="btn btn-primary" onClick={() => handleViewDetails(product.id)}>View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </CustomerNavBar>
  );
};

export default Home;
