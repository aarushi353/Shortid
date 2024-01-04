const bcrypt = require('bcrypt');
const User = require('../models/user');

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Sign-up failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        user.isLoggedIn = true;
        await user.save();
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const logout = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user.isLoggedIn) {
      user.isLoggedIn = false;
      await user.save();
      res.status(200).json({ message: 'Logout successful' });
    } else {
      res.status(401).json({ message: 'Not logged in' });
    }
  } catch (error) {
    console.error('Logout failed:', error);
    res.status(500).json({ error: 'Internal server error during logout' });
  }
};

module.exports = { signUp, login, logout };
