import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const TestComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [analytics, setAnalytics] = useState(0);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, { username, password });
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
      } else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login Failed');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/logout`, {username});
      if (response.data.message === 'Logout successful') {
        console.log('Logout Successful');
      } else {
        console.error('Logout Failed');
      }
    } catch (error) {
      console.error('Logout Failed:', error);
    }
  };

  const createShortLink = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/shortlinks/create`, { username, originalUrl });
      console.log('Response:', response);
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error creating short link:', error.message);
    }
  };

  const show = () =>{
    setAnalytics(false);
  }

  const viewAnalytics = async () => {
    try {
      const response = await axios.get(`${shortUrl}/analytics`);
      console.log('Analytics:', response.data.analytics);
      setAnalytics(response.data.analytics);
      setShowAnalytics(true);
    } catch (error) {
      console.error('Error fetching analytics:', error.message);
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
      <div>
      <label>
        Original URL:
        <input type="text" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} />
      </label>
      <button onClick={createShortLink}>Create Short Link</button>

      {shortUrl && (
        <div>
          <p>Short Link: {shortUrl}</p>

          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            <button onClick={show}>Redirect to Original URL</button>
          </a>

          <button onClick={viewAnalytics}>View Analytics</button>
          {showAnalytics && <p>URL Visited Analytics: {analytics} </p>}
        </div>
      )}
    </div>
    </div>
  );
};

export default TestComponent;
