import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../asset/css/Login.css'; // Importing the CSS file
import { SERVER_URL_API } from '../constat';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${SERVER_URL_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.token) {
      alert('User Logged In');
      window.localStorage.setItem('token', data.token);
      window.location.href = '/';
    }
  };

  return (
    <section className="login-section">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <button className="form-button" type="submit">
          Login
        </button>
        <small className="form-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </small>
      </form>
    </section>
  );
};

export default Login;
