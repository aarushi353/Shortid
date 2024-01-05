import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/Auth.css';

const API_BASE_URL = 'http://localhost:3001';

const AuthPage = ({ onLogin }) => {
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleSignUp = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/signup`, { username: signupUsername, password: signupPassword });
      console.log('User Registered Successfully');
      setRegistrationMessage('User registered successfully! Now you can login.');
      setRegistrationMessageColor('green');
      setSignupUsername('');
      setSignupPassword('');
    } catch (error) {
      console.error('User already exists');
      setRegistrationMessage('Username is already taken. Please choose another username!');
      setRegistrationMessageColor('red'); 
    }
  };

  const handleLogin = async () => {
    setRegistrationMessage('');
    setLoginErrorMessage('');
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { username: loginUsername, password: loginPassword });
      if (response.data.message === 'Login successful') {
        console.log('Login Successful');
        onLogin(loginUsername);
      } else {
        console.error('Invalid credentials');
        setLoginErrorMessage('Invalid username or password. Please try again!');
      }
    } catch (error) {
      console.error('Login Failed');
      setLoginErrorMessage('An error occurred. Please try again later!');
    }
  };

  const [registrationMessageColor, setRegistrationMessageColor] = useState('');

  return (
    <div className='auth'>
      <div className='signup'>
        <h1>Create an account</h1>
        <div className='field'>
          <label>Username</label>
          <input type="text" value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
        </div>
        <div className='field'>
          <label>Password</label>
          <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
        </div>
        <div>
          <button onClick={handleSignUp}>Signup</button>
          {registrationMessage && <p style={{ color: registrationMessageColor }}>{registrationMessage}</p>}
        </div>
      </div>
      <div className='login'>
        <h1>Login</h1>
        <div className='field'>
          <label>Username</label>
          <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
        </div>
        <div className='field'>
          <label>Password</label>
          <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
          {loginErrorMessage && <p style={{ color: 'red' }}>{loginErrorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
