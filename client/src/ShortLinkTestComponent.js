import React, { useState } from 'react';
import axios from 'axios';

const ShortLinkTester = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [redirectedUrl, setRedirectedUrl] = useState('');

  const createShortLink = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/shortlinks/create', { originalUrl });
      console.log('Response:', response);
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error creating short link:', error.message);
    }
  };

  return (
    <div>
      <h2>Short Link Tester</h2>
      <label>
        Original URL:
        <input type="text" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} />
      </label>
      <button onClick={createShortLink}>Create Short Link</button>

      {shortUrl && (
        <div>
          <p>Short Link: {shortUrl}</p>

          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            <button>Redirect to Original URL</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default ShortLinkTester;