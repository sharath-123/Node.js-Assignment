import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './styles/ThankYou.css';

const ThankYou = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.post('/user-details', { email });
        setUser(res.data.user);
      } catch (err) {
        navigate('/error');
      }
    };
    fetchUser();
  }, [email, navigate]);

  const handleDelete = async () => {
    try {
      await api.post('/remove-account', { email });
      alert('Account deleted');
      localStorage.clear();
      navigate('/');
    } catch (err) {
      alert('Error deleting account');
    }
  };

  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="dashboard-container">
      <h2>Welcome {user.name} 🎉</h2>
      {user.image && (
        <img
          src={`http://localhost:5000${user.image}`}
          alt="User"
          style={{ width: '200px', height: '200px', borderRadius: '10px' }}
        />
      )}

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Company:</strong> {user.company}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>DOB:</strong> {user.dob}</p>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default ThankYou;
