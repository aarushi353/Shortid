import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/auth';

const AuthTestComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, { username, password });
      console.log('User Registered Successful');
    } catch (error) {
      console.error('User already exists');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
      if (response.data.message === 'Login successful') {
        console.log('Login Successful');
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login Failed');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/logout`, {username});
      if (response.data.message === 'Logout successful') {
        console.log('Logout Successful');
      } else {
        console.error('Logout Failed');
      }
    } catch (error) {
      console.error('Logout Failed:', error);
    }
  };
  return (
    <div>
      <h2>Login/Signup Test</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleSignUp}>Signup</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AuthTestComponent;
