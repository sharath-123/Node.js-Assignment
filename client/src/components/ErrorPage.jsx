import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ErrorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <h2>Sorry, we can't log you in.</h2>
      <p>Something went wrong. Please try again or contact support.</p>
      <button onClick={() => navigate('/')}>Back to Login</button>
    </div>
  );
};

export default ErrorPage;
