const ShortLink = require('../models/ShortLink');
const User = require('../models/user');
const shortid = require('shortid');

class ShortLinkService {
  async createShortLink(originalUrl, user) {
    try {
      const shortUrl = shortid.generate();
      const newShortLink = {
        originalUrl,
        shortUrl,
        createdAt: new Date(),
        analytics: 0,
      };

      const shortLinkDocument = new ShortLink(newShortLink);
      await shortLinkDocument.save();

      user.shortenedUrls.push(newShortLink);
      await user.save();

      return newShortLink;
    } catch (error) {
      console.error('Error creating short link:', error.message);
      throw error;
    }
  }

  async getShortLink(shortUrl) {
    try {
      const shortLink = await ShortLink.findOne({ shortUrl });

      if (shortLink) {
        const user = await User.findOne({ 'shortenedUrls.shortUrl': shortUrl });

        if (user) {
          const userShortLink = user.shortenedUrls.find((link) => link.shortUrl === shortUrl);
          userShortLink.analytics += 1;
          await user.save();
        }
      }

      return shortLink;
    } catch (error) {
      console.error('Error retrieving short link:', error.message);
      throw error;
    }
  }
}

module.exports = new ShortLinkService();
