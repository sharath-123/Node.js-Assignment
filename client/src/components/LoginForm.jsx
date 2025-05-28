// src/components/LoginForm.jsx
import React, { useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import './styles/LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('userEmail', email); // Save email for OTP
        navigate('/otp');
      }
    } catch (err) {
      navigate('/error');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="form-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate('/register')}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
