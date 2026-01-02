import React, { useCallback, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets.js';
import { useNavigate } from 'react-router-dom';

export const Header = React.memo(() => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Optimized callbacks
  const bookNow = useCallback(() => {
    navigate('/pharmacies');
  }, [navigate]);

  const scrollToSection = useCallback(() => {
    const element = document.querySelector('#speciality');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleImageError = useCallback(() => setImageError(true), []);

  return (
    <section className="neo-hero" role="banner" aria-labelledby="hero-title">
      <div className="neo-canvas"></div>
      <div className="neo-grid-overlay"></div>
      <div className="neo-particles"></div>

      <div className="neo-container">
        <div className="neo-main-header">
          {/* <div className="neo-badge">
            <div className="badge-glow"></div>
            <span className="badge-icon"></span>
          </div>  */}

          <h1 id="hero-title" className="neo-title">
            <span className="title-line-1">Find Your</span>
            <span className="title-line-2">Perfect Doctor</span>
            <span className="title-line-3">in Kashmir</span>
          </h1>

          <p className="neo-subtitle">
            500+ verified specialists across 20+ categories. Instant booking,
            real-time availability, and 24/7 support in Srinagar & Kashmir.
          </p>

          <div className="neo-cta-stack">
            {/* <button
              className="neo-primary-btn"
              onClick={bookNow}
              aria-label="Book an appointment with a doctor now"
            >

              <span>Book Now</span>
              <div className="btn-shimmer"></div>
            </button> */}

           
             <a
              href="#speciality"
              className="neo-primary-btn"
              aria-label="Scroll to speciality and book appointment"
            >
              <span>Book Now</span>
              <div className="btn-shimmer"></div>
            </a>
          
            {/* <button 
              className="neo-secondary-btn" 
              onClick={scrollToSection}
              aria-label="View all available doctors and specialties"
            >
              View All Doctors
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </button> */}
          </div>

          <div className="neo-stats">
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24K</div>
              <div className="stat-label">Happy Patients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Doctors</div>
            </div>
          </div>
        </div>

        <div className="neo-visual">
          <div className="floating-clinic">
            <div className="clinic-card">
              <div className="clinic-glow"></div>
              {!imageError ? (
                <img
                  src={assets.nc}
                  alt="ShifaLink Digital Clinic - Book Doctors in Kashmir"
                  className="clinic-image"
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              ) : (
                <div className="image-fallback">
                  <span>Digital Clinic</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Header.displayName = 'NeoHeader';
