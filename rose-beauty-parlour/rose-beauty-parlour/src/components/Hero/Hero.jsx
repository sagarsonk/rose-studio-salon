import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Hero.css";
import fallbackImage from "../../assets/images/hero/hero2.jpg"; // Fallback placeholder
import { Link } from "react-router-dom";

function Hero() {
  const [heroBg, setHeroBg] = useState('');

  useEffect(() => {
    const fetchHeroCanvas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hero-config");
        if (response.data && response.data.heroImage) {
          setHeroBg(response.data.heroImage);
        }
      } catch (err) {
        console.error("Error fetching live client hero layout:", err);
      }
    };
    fetchHeroCanvas();
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-subtitle">
          Welcome To Rose Beauty Parlour
        </span>

        <h1>
          Glow Naturally,
          <br />
          Shine Beautifully
        </h1>

        <p>
          Experience premium beauty services including
          hair styling, facials, makeup,
          nail care and bridal packages.
        </p>

        <div className="hero-buttons">
          <Link to="/page/bookform">
            <button className="primary-btn">
              Book Appointment
            </button>
          </Link>

          <Link to="/services">
            <button className="secondary-btn">
              Explore Services
            </button>
          </Link>
        </div>
      </div>

      <div className="hero-image">
        {/* 🎯 Live Active Admin Canvas Mirror Injection */}
        <img
          src={heroBg || fallbackImage}
          alt="Rose Beauty Parlour Dynamic Canvas"
        />
      </div>
    </section>
  );
}

export default Hero;