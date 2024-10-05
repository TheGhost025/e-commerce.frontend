import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import "../css/Auth.css";

const Login = () =>
{
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');

    // Retrieve token from localStorage and set default Axios header on component mount
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      }, []);

    const handleLogIn = async (e) => {
        e.preventDefault();

        try
        {
            const response = await axios.post("https://localhost:44305/api/Account/login",
                {
                    email,
                    password
            }
        );

        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            // Handle successful login
            console.log('Login successful:', response.data);
            if(response.data.isSupplier){
              navigate("/supplier/dashboard");
            }
            else{
              navigate("/customer");
            }
        }
        catch(err){
            console.error('Login failed:', err.response?.data || err.message);
            setError('Invalid email or password.');
        }
    }

    return (
        <div className="auth-container">
          <form onSubmit={handleLogIn} className="auth-form">
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
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit" className="auth-button">Login</button>
          </form>
          <button onClick={() => navigate('/register')} className="auth-button">Go to Register</button>
        </div>
      );
}

export default Login;