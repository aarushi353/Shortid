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
        shortLink.analytics += 1;
        await shortLink.save();
      }
      return shortLink;
    } catch (error) {
      console.error('Error retrieving short link:', error.message);
      throw error;
    }
  }
}

module.exports = new ShortLinkService();
