import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import "../css/Auth.css";

const Login = () =>
{
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');

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

            // Handle successful login
            console.log('Login successful:', response.data);
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