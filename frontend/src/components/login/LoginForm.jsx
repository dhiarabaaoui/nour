import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './LoginForm.css';
import { jwtDecode } from 'jwt-decode';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      const token = response.data.token;

      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.userType === 'admin') {
          localStorage.setItem('authToken', token);
          navigate('/admin-dashboard');
        } else if (decodedToken.userType === 'user') {
          localStorage.setItem('authToken', token);
          navigate('/user-dashboard');
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
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email ID' required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*******' required />
          </div>

          <button type="submit">LOGIN</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="links">
          <label>
            <input type="checkbox"/> Remember me 
          </label>
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