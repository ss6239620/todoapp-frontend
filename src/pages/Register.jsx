import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../asset/css/Register.css'; // Importing the CSS file

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    alert(data);

    if (response.ok) {
      window.location.href = '/login';
    }
  };

  return (
    <section className="register-section">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>
        <input
          className="form-input"
          type="text"
          placeholder="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
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
          Register
        </button>
        <small className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </form>
    </section>
  );
};

export default Register;
