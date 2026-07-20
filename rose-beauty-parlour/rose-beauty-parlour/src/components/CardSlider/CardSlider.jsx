import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './CardSlider.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const API_BASE = "http://localhost:5000/api";

const CardSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  // 📡 Dynamic Cache-Busted Fetch Engine
  const fetchSliderData = async () => {
    try {
      // API URL ke peeche timestamp query laga di taaki browser cache load na kare
      const response = await axios.get(`${API_BASE}/banners?t=${new Date().getTime()}`);
      
      if (response.data && response.data.length > 0) {
        const activeImages = response.data
          .map(item => item.img)
          .filter(url => url && url.trim() !== ''); // Khali rows bypass
        
        setSlides(activeImages);
      } else {
        setSlides([]);
      }
    } catch (err) {
      console.error("Error loading live website slider:", err);
    }
  };

  useEffect(() => {
    fetchSliderData();
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Auto-scroll loop mechanics
  useEffect(() => {
    if (slides.length <= 1) return;
    
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1)),
      3500 // 3.5 Seconds interval auto transition
    );
    return () => resetTimeout();
  }, [currentIndex, slides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Fallback view layer
  if (slides.length === 0) {
    return (
      <div className="pure-image-slider-viewport" style={{ textAlign: 'center', padding: '60px 0', color: '#999', background: '#faf7f7', borderRadius: '20px' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>
          No active showcase images linked inside the system database.<br/>
          Please upload or link pictures from your Admin Control Desk.
        </p>
      </div>
    );
  }

  return (
    <div className="pure-image-slider-viewport">
      <div className="slider-frame-container">
        
        {/* Left Arrow */}
        <button className="slider-arrow-btn left-arrow" onClick={handlePrev}>
          <FaChevronLeft />
        </button>

        {/* Viewport Track */}
        <div className="slider-window-track">
          <div 
            className="slider-cards-flexbox" 
            style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
          >
            {slides.map((imageUrl, idx) => (
              <div className="slider-individual-image-card" key={idx}>
                {/* 🎯 Img tags me timestamp append kiya taaki data realtime reload ho sake */}
                <img src={imageUrl} alt={`Live Salon Showcase Frame ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button className="slider-arrow-btn right-arrow" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>

      {/* Pagination Layer */}
      <div className="slider-pagination-dots">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`pagination-dot ${currentIndex === idx ? "dot-active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;