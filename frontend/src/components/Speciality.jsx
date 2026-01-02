import { Link, useNavigate } from "react-router-dom";
import { specialityData } from "../assets/assets_frontend/assets.js";
import { useEffect } from 'react';

export const Speciality = () => {
  const navigate = useNavigate();

  // 🔥 SCROLL TO TOP ON SPECIALITY CLICK
  const handleSpecialityClick = (speciality) => {
    // Navigate + Scroll to top instantly
    navigate(`/doctors/${speciality}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fallback: Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section id="speciality" className="speciality-section" aria-labelledby="speciality-title">
      <div className="speciality-container">
        {/* Animated Title */}
        <div className="section-header" style={{marginBottom:"30px",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <h2 id="speciality-title" className="section-title">Find by Speciality</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle" style={{fontSize:"23px",textAlign:"center"}}>
            Access trusted healthcare professionals across Kashmir and schedule your visit effortlessly.
          </p>
        </div>

        {/* Speciality Grid - DESKTOP */}
        <div className="speciality-grid" role="grid" aria-label="Speciality options">
          {specialityData.map((item, index) => (
            <div
              key={item.speciality}
              className="speciality-card"
              style={{ 
                '--card-delay': `${index * 0.1}s`,
                '--card-color': item.color || '#6da9fd'
              }}
              onClick={() => handleSpecialityClick(item.speciality)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSpecialityClick(item.speciality);
                }
              }}
              aria-label={`View doctors for ${item.speciality}`}
            >
              <div className="card-icon">
                <img src={item.image} alt={`${item.speciality} icon`} className="simages" />
              </div>
              <h3 className="speciality-text">{item.speciality}</h3>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        {/* Infinite Carousel for Mobile */}
        <div className="speciality-carousel" aria-label="Speciality carousel for mobile">
          <div className="carousel-track">
            {specialityData.concat(specialityData).map((item, index) => (
              <div
                key={`${item.speciality}-${index}`}
                className="carousel-item"
                onClick={() => handleSpecialityClick(item.speciality)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSpecialityClick(item.speciality);
                  }
                }}
                aria-label={`View doctors for ${item.speciality}`}
              >
                <img src={item.image} alt={`${item.speciality} icon`} className="carousel-img" />
                <span>{item.speciality}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
