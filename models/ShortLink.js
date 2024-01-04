const mongoose = require('mongoose');

const shortLinkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, expires: 60 * 60 * 48, default: () => Date.now() + 48 * 60 * 60 * 1000 },
});

const ShortLink = mongoose.model('ShortLink', shortLinkSchema);

module.exports = ShortLink;
