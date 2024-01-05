import React, { useState } from "react";
import axios from "axios";
import "../assets/css/Dashboard.css";

const API_BASE_URL = "http://localhost:3001";

const UrlPage = ({ username, onLogout }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [analytics, setAnalytics] = useState(0);
  const [createdAt, setCreatedAt] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
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

  const viewAnalytics = async () => {
    try {
      const response = await axios.get(`${shortUrl}/analytics`);
      console.log("Analytics:", response.data);

      const { analytics, createdAt, expiresAt } = response.data;
      setAnalytics(analytics);
      setCreatedAt(createdAt);
      setExpiresAt(expiresAt);
      setShowAnalytics(true);

      console.log("CreatedAt:", createdAt);
      console.log("ExpiresAt:", expiresAt);
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
              {showAnalytics && (
                <div>
                  <p>Number of Visits (Analytics): {analytics}</p>
                  <p>Created At: {createdAt}</p>
                  <p>Expires At: {expiresAt}</p>
                </div>
              )}
              <div className="buttons">
                <button onClick={viewAnalytics}>View Analytics</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlPage;
