const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sessionToken: { type: String },
  isLoggedIn: { type: Boolean, default: false },
  shortenedUrls: [
    {
      originalUrl: String,
      shortUrl: String,
      createdAt: Date,
      analytics: { type: Number, default: 0 },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
