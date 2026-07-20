import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BridalShowcase.css';

const BridalShowcase = () => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bridal-video");
        if (res.data && res.data.videoUrl) {
          setVideoUrl(res.data.videoUrl);
        }
      } catch (err) {
        console.error("Error loading live bridal video showcase:", err);
      }
    };
    fetchVideo();
  }, []);

  return (
    <section className="bridal-luxury-showcase-section">
      <div className="bridal-text-branding">
        <span>The Royal Artistry</span>
        <h2>Bridal & Cinematic Makeovers</h2>
        <div className="subtle-divider-line"></div>
      </div>

      <div className="video-cinematic-frame">
        {videoUrl ? (
          <video 
            src={videoUrl}
            autoPlay 
            loop 
            muted 
            playsInline
            controls
            className="salon-live-video-player"
          />
        ) : (
          <div className="video-placeholder-luxury">
            <p>Experience the transformation stream coming soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BridalShowcase;