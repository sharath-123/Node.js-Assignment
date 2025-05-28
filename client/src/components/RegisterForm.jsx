import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './styles/RegisterForm.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    age: '',
    dob: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image || !['image/png', 'image/jpeg'].includes(form.image.type)) {
      alert('Please upload a valid PNG or JPG image');
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));

    try {
      const res = await api.post('/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        alert('Account created!');
        navigate('/');
      } else {
        alert(res.data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-box">
        <h2>Create Account</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="company" placeholder="Company Name" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
        <input name="dob" type="date" onChange={handleChange} required />
        <input name="image" type="file" accept="image/png, image/jpeg" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
