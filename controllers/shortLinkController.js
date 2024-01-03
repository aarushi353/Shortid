const express = require('express');
const shortLinkService = require('../services/shortLinkService');

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortLink = await shortLinkService.createShortLink(originalUrl);
    const fullShortUrl = `http://localhost:3001/api/shortlinks/${shortLink.shortUrl}`;
    res.json({ shortUrl: fullShortUrl });
  } catch (error) {
    console.error('Error in short link creation controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:shortUrl', async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const shortLink = await shortLinkService.getShortLink(shortUrl);

    if (shortLink) {
      res.redirect(shortLink.originalUrl);
    } else {
      res.status(404).json({ error: 'Short link not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
