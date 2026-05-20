"use client";
import React, { useState, useEffect } from "react";

interface WindowWithNotification extends Window {
  showNotification?: (text: string) => void;
}

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessKey, setAccessKey] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("web3forms_access_key");
    if (saved) {
      setAccessKey(saved);
    }
  }, []);

  const openSettings = () => setIsModalOpen(true);
  const closeSettings = () => setIsModalOpen(false);

  const saveSettings = () => {
    if (accessKey.trim()) {
      localStorage.setItem("web3forms_access_key", accessKey.trim());
      if (typeof window !== "undefined") {
        const win = window as WindowWithNotification;
        if (win.showNotification) {
          win.showNotification("Web3Forms key saved.");
        }
      }
    } else {
      localStorage.removeItem("web3forms_access_key");
      if (typeof window !== "undefined") {
        const win = window as WindowWithNotification;
        if (win.showNotification) {
          win.showNotification("Key cleared — using default.");
        }
      }
    }
    closeSettings();
  };

  return (
    <>
      <footer>
        <div>
          <div className="footer-logo">
            Ashish <span>Sharma</span>
          </div>
          <p style={{ marginTop: "8px" }}>
            Rotor Wing Services and its divisions are registered trademarks of
            JavAirTec Holding Group. © 2026 Ashish Sharma · AI Systems &
            Platform Engineer · Works Globally.
          </p>
        </div>
        <div className="footer-links">
          <a href="https://linkedin.com">LinkedIn</a>
          <a href="https://cal.com/ashish-sharma-2000">Book a Call</a>
          <a href="#work">Work</a>
          <button className="settings-trigger" onClick={openSettings}>
            Email Config
          </button>
        </div>
      </footer>

      {isModalOpen && (
        <>
          <div className="modal-overlay active" onClick={closeSettings}></div>
          <div id="settings-modal" className="active">
            <h3>Configure Lead Destination</h3>
            <p>
              Web3Forms delivers submissions directly to your Gmail. Paste your
              Access Key below to secure your integration (stored in
              localStorage).
            </p>
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label className="form-label">Web3Forms Access Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="ea7d1911-c91f-49b8-..."
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <button
                className="btn-secondary"
                onClick={closeSettings}
                style={{ padding: "8px 16px", fontSize: "0.8rem" }}
              >
                Cancel
              </button>
              <button
                className="btn-accent"
                onClick={saveSettings}
                style={{ padding: "8px 16px", fontSize: "0.8rem" }}
              >
                Save Key
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
