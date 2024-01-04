import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/auth';

const AuthTestComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [redirectedUrl, setRedirectedUrl] = useState('');
  const [analytics, setAnalytics] = useState(0);

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

  const createShortLink = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/shortlinks/create', { username, originalUrl });
      console.log('Response:', response);
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error creating short link:', error.message);
    }
  };

  const redirectToOriginalUrl = async () => {
    try {
      const response = await axios.get(shortUrl);
      console.log('Redirected URL:', response.request.responseURL);
      setRedirectedUrl(response.request.responseURL);
      setAnalytics(analytics + 1);
    } catch (error) {
      console.error('Error redirecting to original URL:', error.message);
    }
  };

  const viewAnalytics = async () => {
    try {
      const response = await axios.get(`${shortUrl}`);
      console.log('Analytics:', response.data.analytics);
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

          <a href={redirectedUrl || shortUrl} target="_blank" rel="noopener noreferrer">
            <button onClick={redirectToOriginalUrl}>Redirect to Original URL</button>
          </a>

          <button onClick={viewAnalytics}>View Analytics</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default AuthTestComponent;
