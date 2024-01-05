const mongoose = require('mongoose');

const shortenedUrlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  createdAt: { type: Date, default: Date.now, get: v => v.toLocaleString() }, 
  expiresAt: { type: Date, get: v => v ? v.toLocaleString() : null }, 
  analytics: { type: Number, default: 0 },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sessionToken: String,
  isLoggedIn: { type: Boolean, default: false },
  shortenedUrls: [shortenedUrlSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
