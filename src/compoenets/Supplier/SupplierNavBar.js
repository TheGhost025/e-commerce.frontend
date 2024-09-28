import React, { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

const SupplierNavBar = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    profileImageUrl: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Fetch the current user data
    axios.get('https://localhost:44305/api/Account/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          profileImageUrl: "https://localhost:44305"+ response.data.profileImageURL || 'default-image-url.jpg' // Fallback image
        });
      })
      .catch(err => {
        console.error('Error fetching profile data', err);
      });
  }, []);

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
                <Link className="nav-link" to="/supplier/update-profile">Update Profile</Link>
              </li>
            </ul>
              <div className="d-flex align-items-center">
              {/* Profile Image and Name */}
              <img
                src={user.profileImageUrl}
                alt="Profile"
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
              />
              <span className="navbar-text">
                {user.firstName} {user.lastName}
              </span>
              <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default SupplierNavBar;