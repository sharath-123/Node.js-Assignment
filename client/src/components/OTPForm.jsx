import React, { useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import './styles/OTPForm.css';

const OTPForm = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/verify-otp', { email, otp });
      if (res.data.success) {
        navigate('/user-details');
      } else {
        navigate('/error');
      }
    } catch (err) {
      navigate('/error');
    }
  };

  return (
    <div className="otp-container">
      <form onSubmit={handleVerify} className="otp-box">
        <h2>Enter OTP</h2>
        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default OTPForm;
