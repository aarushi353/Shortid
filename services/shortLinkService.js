const shortid = require('shortid');
const ShortLink = require('../models/shortLinkModel');

class ShortLinkService {
  async createShortLink(originalUrl) {
    try {
      const shortUrl = shortid.generate();
      const newShortLink = new ShortLink({
        originalUrl,
        shortUrl,
      });
      await newShortLink.save();
      return newShortLink;
    } catch (error) {
      console.error('Error creating short link:', error.message);
      throw error;
    }
  }

  async getShortLink(shortUrl) {
    try {
      const shortLink = await ShortLink.findOne({ shortUrl });
      return shortLink;
    } catch (error) {
      console.error('Error retrieving short link:', error.message);
      throw error;
    }
  }
}

module.exports = new ShortLinkService();
