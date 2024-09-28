import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SupplierNavBar from './SupplierNavBar';
import { useNavigate } from 'react-router-dom';

const ProfileSupplierUpdate = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: null,  // Image file to be uploaded
    profileImageUrl: ''  // Image URL to be displayed
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch current profile details
    const token = localStorage.getItem('token');
    axios.get('https://localhost:44305/api/Account/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setProfile({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          profileImageUrl: "https://localhost:44305" + response.data.profileImageURL,  // Existing image URL from server
          profileImage: null
        });
      })
      .catch(err => {
        console.error('Error fetching profile details', err);
      });
  }, []);

  // Trigger the file input click when the image is clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        profileImage: file,
        profileImageUrl: URL.createObjectURL(file) // Update preview image locally
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    formData.append('email', profile.email);
    if (profile.profileImage) {
      formData.append('profileImage', profile.profileImage);  // Append new image
    }

    const token = localStorage.getItem('token');

    try {
      await axios.put('https://localhost:44305/api/Account/update-profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Profile updated successfully');
      navigate('/supplier/dashboard');
    } catch (err) {
      setError('There was an error updating the profile.');
      console.error('Error updating profile', err);
    }
  };

  return (
    <SupplierNavBar>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>First Name</label>
            <input type="text" name="firstName" className="form-control" value={profile.firstName} onChange={handleInputChange} />
          </div>
          <div className="form-group mb-3">
            <label>Last Name</label>
            <input type="text" name="lastName" className="form-control" value={profile.lastName} onChange={handleInputChange} />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" value={profile.email} onChange={handleInputChange} />
          </div>
          <div className="form-group mb-3">
            <label>Profile Image</label>
            <div onClick={handleImageClick} style={{ cursor: 'pointer' }}>
              <img
                src={profile.profileImageUrl || 'default-image-url.jpg'} // Fallback for no image
                alt="Profile"
                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </form>
      </div>
    </SupplierNavBar>
  );
};

export default ProfileSupplierUpdate;