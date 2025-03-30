import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './LoginForm.css';
import { jwtDecode } from 'jwt-decode';  // Correction ici

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });

      // Log the response data for debugging
      console.log("Response received:", response.data);

      const token = response.data.token;
      if (token) {
        // Decode the token to extract userType if needed
        const decodedToken = jwtDecode(token);  // Utilisation de jwtDecode ici
        console.log("Decoded Token:", decodedToken);

        if (decodedToken.userType === 'admin') {
          localStorage.setItem('authToken', token);
          navigate('/admin-dashboard'); // Redirect to Admin dashboard
        } else if (decodedToken.userType === 'user') {
          localStorage.setItem('authToken', token);
          navigate('/user-dashboard'); // Redirect to User dashboard
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials or server error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>AutiLearn</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit">Sign in</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="links">
          <Link to="/forgot-password">Forgot password?</Link>
          <p>
            You don't have an account? <Link to="/user-type">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
