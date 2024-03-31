import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a request to your backend API to authenticate the user
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      // Check if authentication was successful
      if (response.data.success) {
        localStorage.setItem('is_authenticated', true);
        setIsAuthenticated(true);
        Swal.fire({
          icon: 'success',
          title: 'Successfully logged in!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Incorrect email or password.',
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Login failed. Please try again later.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input style={{ marginTop: '12px' }} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
