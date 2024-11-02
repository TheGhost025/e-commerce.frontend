import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
//import "../css/Auth.css";

const Register = () => 
    {
        const navigate = useNavigate();
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confPassword, setConfPassword] = useState('');
        const [image ,setImage] = useState(null);
        const [isSupplier,setIsSupplier] =useState(false);
        const [error, setError] = useState('');

        const handleRegister = async (e) => {
            e.preventDefault();

            // Create a FormData object to handle the file upload
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('confirmPassword', confPassword);
            formData.append('isSupplier', isSupplier);
            if (image) {
                formData.append('image', image);
            }

            try {
                await axios.post('https://localhost:44305/api/Account/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                navigate('/login');
            } catch (error) {
              if (error.response && error.response.data && error.response.data.Errors) {
                // Show detailed errors from backend
                setError(error.response.data.Errors.join(', '));
            } else {
                setError('Registration failed.');
            }
            }
          };

          const handleFileChange = (e) => {
            setImage(e.target.files[0]);
          };
        
          return (
            <div className="auth-container">
              {error && <div className="error-message">{error}</div>}
              <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                    <label className="form-label">Profile Image:</label>
                    <input
                        className="form-control"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                  <label>Are you a supplier?</label>
                  <input
                    type="checkbox"
                    checked={isSupplier}
                    onChange={(e) => setIsSupplier(e.target.checked)}
                  />
                </div>
                <button type="submit" className="auth-button">Register</button>
              </form>
              <button onClick={() => navigate('/login')} className="auth-button">Back to Login</button>
            </div>
          );
    }

export default Register;