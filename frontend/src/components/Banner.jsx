import { assets } from "../assets/assets_frontend/assets"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export const Banner = () => {
  const navigate = useNavigate()
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const handleCTAClick = () => {
    navigate("/login")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="banner-section">
      <div className={`banner-container ${animateIn ? 'animate-in' : ''}`}>
        {/* Animated Background */}
        <div className="banner-bg">
          <div className="bg-overlay"></div>
          <div className="bg-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>

        {/* Content */}
        <div className="banner-content">
          <div className="banner-left">
            <div className="banner-badge">
              🚀 Instant Booking
            </div>
            
            <h1 className="banner-title">
              Book Appointment with 
              <span className="gradient-text"> 100+</span>
              <br />
              Trusted Doctors Across 
              <span className="highlight-text">Kashmir</span>
            </h1>
            
            <p className="banner-subtitle">
              Connect with verified healthcare professionals instantly. 
              Secure, fast, and available 24/7.
            </p>

            <div className="banner-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Doctors</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15K+</div>
                <div className="stat-label">Bookings</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4.9⭐</div>
                <div className="stat-label">Rating</div>
              </div>
            </div>

            <div className="banner-cta">
              <button className="cta-primary" onClick={handleCTAClick}>
                <span>Get Started Free</span>
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="cta-secondary" onClick={() => navigate("/doctors")}>
                Browse Doctors
              </button>
            </div>
          </div>

          <div className="banner-right">
            <div className="mockup-container">
              <img 
                src={assets.appointment_img} 
                alt="Book appointment with trusted doctors" 
                className="banner-image"
              />
              <div className="mockup-glow"></div>
              <div className="mockup-badge">
                <span>Live Demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
