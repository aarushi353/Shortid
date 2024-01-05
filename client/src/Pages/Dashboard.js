import React, { useState } from "react";
import axios from "axios";
import "../assets/css/Dashboard.css";

const API_BASE_URL = "http://localhost:3001";

const UrlPage = ({ username, onLogout }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [analytics, setAnalytics] = useState(0);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const createShortLink = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/shortlinks/create`,
        { username, originalUrl }
      );
      console.log("Response:", response);
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error("Error creating short link:", error.message);
    }
  };

  const show = () => {
    setAnalytics(false);
  };

  const viewAnalytics = async () => {
    try {
      const response = await axios.get(`${shortUrl}/analytics`);
      console.log("Analytics:", response.data.analytics);
      setAnalytics(response.data.analytics);
      setShowAnalytics(true);
    } catch (error) {
      console.error("Error fetching analytics:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, { username });
      onLogout();
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="url-shorten">
        <h1>Shortening URLs made easy!</h1>
        <div className="main-section">
          <div className="field">
            <label>Enter the URL to be shortened</label>
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
          </div>
          <button onClick={createShortLink}>Create Short Link</button>

          {shortUrl && (
            <div>
              <p>
                Short Link:{" "}
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
              </p>
              <div className="buttons">
                <button onClick={viewAnalytics}>View Analytics</button>
              </div>
              {showAnalytics && <p>URL Visited Analytics: {analytics}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlPage;
