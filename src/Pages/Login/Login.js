import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Hero from '../Hero/Hero';
import styles from './Login.module.scss'; 

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', {
        name,
        email,
      }, { withCredentials: true });

      // Show dog search page if login is successful
      if (response.status === 200) {
        navigate('/dogs');
      }
    } catch (error) {
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <div className={styles.loginContainer}> 
      <Hero />

      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.inputField} 
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField} 
        />
        <button  type="submit">Log In</button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>} 
    </div>
  );
};

export default Login;