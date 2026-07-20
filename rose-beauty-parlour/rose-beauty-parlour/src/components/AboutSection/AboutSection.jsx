import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="about" className="universal-about-section">
      <div className="universal-about-container">
        
        <div className="about-grid-wrapper">
          
          {/* Left Column: Visual Aesthetic Images */}
          <div className="about-visual-column">
            <div className="about-image-frame primary-frame">
              <img 
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&h=700&q=80" 
                alt="Luxury Salon Interior" 
                className="about-img animate-subtle-zoom"
              />
            </div>
            <div className="about-image-frame secondary-frame hidden-mobile">
              <img 
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=500&h=500&q=80" 
                alt="Premium Treatment" 
                className="about-img"
              />
            </div>
          </div>

          {/* Right Column: Brand Narrative Text */}
          <div className="about-content-column">
            <span className="about-tagline">Since 2018</span>
            <h2 className="about-title">Redefining The Art Of Luxury Beauty</h2>
            <div className="about-accent-line"></div>
            
            <p className="about-lead-text">
              At Rose Beauty Salon, we believe that beauty is an exquisite expression of identity. We don't just offer services; we curate tailor-made luxury transformations.
            </p>
            
            <p className="about-body-text">
              Step into a sanctuary where science meets serenity. Our team of internationally trained master artists combines elite aesthetic techniques with world-class, professional-grade products to elevate your natural radiance. Whether it's our signature bridal artistry or advanced hair design, excellence is our standard.
            </p>

            {/* Core Salon Pillars */}
            <div className="about-pillars-grid">
              <div className="pillar-item">
                <span className="pillar-icon">✦</span>
                <div>
                  <h4>Master Artists</h4>
                  <p>Certified experts with global training.</p>
                </div>
              </div>
              <div className="pillar-item">
                <span className="pillar-icon">✦</span>
                <div>
                  <h4>Premium Products</h4>
                  <p>100% professional-grade global brands.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;