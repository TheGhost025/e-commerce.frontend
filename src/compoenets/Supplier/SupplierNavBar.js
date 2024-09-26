import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

const SupplierNavBar = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => 
    {

      e.preventDefault();

      try
      {
        const token = localStorage.getItem('token');
          const response = await axios.post("https://localhost:44305/api/Account/logout",
             {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              }
            }
      );

          localStorage.removeItem('token');

          // Handle successful login
          console.log('Logout successful:', response.data);
            navigate("/login");
      }
      catch(err){
          console.error('Logout failed:', err.response?.data || err.message);
      }
    }

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
                <button className="nav-link" onClick={handleLogout}>Logout</button>
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