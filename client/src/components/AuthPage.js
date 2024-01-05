import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const AuthPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const handleSignUp = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/signup`, { username, password });
      console.log('User Registered Successful');
    } catch (error) {
      console.error('User already exists');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
      if (response.data.message === 'Login successful') {
        console.log('Login Successful');
        setLoggedInUsername(username);
        onLogin(username);
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login Failed');
    }
  };

  return (
    <div>
      <h2>Login/Signup Page</h2>
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
      </div>
    </div>
  );
};

export default AuthPage;
