import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import UrlPage from './components/UrlPage';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const handleLogin = (username) => {
    setLoggedIn(true);
    setLoggedInUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setLoggedInUsername('');
  };
  return (
    <div className='App'>
      {!loggedIn ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <UrlPage username={loggedInUsername} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
