import { useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from "../context/AppContext"

export const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [visibleDoctors, setVisibleDoctors] = useState({})
  const [hoveredDoctor, setHoveredDoctor] = useState(null)
  const observerRef = useRef(null) // Observer reference
  const cardsRef = useRef([]) // Cards reference array

  // Observer callback
  const observerCallback = useCallback((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setVisibleDoctors(prev => ({ 
            ...prev, 
            [entry.target.dataset.doctorId]: true 
          }))
        }, index * 100)
      }
    })
  }, [])

  // Create observer
  const createObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    // Observe all cards after small delay
    setTimeout(() => {
      cardsRef.current.forEach(card => {
        if (card && observerRef.current) {
          observerRef.current.observe(card)
        }
      })
    }, 100)
  }, [observerCallback])

  // Doctors change पर re-observe
  useEffect(() => {
    if (doctors?.length > 0) {
      createObserver()
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [doctors, createObserver])

  // Fallback: Show all on mount (refresh fix)
  useEffect(() => {
    if (doctors?.length > 0) {
      const timeoutId = setTimeout(() => {
        const newVisible = {}
        doctors.slice(3, 15).forEach(doc => {
          newVisible[doc._id] = true
        })
        setVisibleDoctors(newVisible)
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [doctors])

  const handleDoctorClick = useCallback((doctorId) => {
    navigate(`/appointment/${doctorId}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [navigate])

  return (
    <section className="topdocs-hero">
      <div className="topdocs-wrapper">
        {/* Header */}
        <header className="topdocs-header">
          <div className="topdocs-badge">
            <span className="badge-emoji">🏥</span>
            Top Rated Doctors
          </div>
          <h1 className="topdocs-main-title">Featured Doctors</h1>
          <p className="topdocs-subtitle">
            Discover Kashmir's best verified doctors available for instant booking
          </p>
        </header>

        {/* Featured Grid */}
        <div className="topdocs-featured-grid">
          {doctors?.slice(3, 15).map((doc, index) => (
            <article
              key={doc._id}
              ref={el => {
                cardsRef.current[index] = el // Store card ref
              }}
              className={`topdoc-card ${visibleDoctors[doc._id] ? 'topdoc-visible' : ''}`}
              data-doctor-id={doc._id}
              onClick={() => handleDoctorClick(doc._id)}
              onMouseEnter={() => setHoveredDoctor(doc._id)}
              onMouseLeave={() => setHoveredDoctor(null)}
            >
              {/* Doctor Portrait */}
              <div className="topdoc-portrait">
                <img 
                  src={doc.image || '/placeholder-doctor.jpg'} 
                  alt={`${doc.name}, ${doc.speciality}`}
                  className="portrait-img"
                  loading="lazy"
                />
                <div className={`live-indicator ${doc.avaliable ? 'live' : 'busy'}`}>
                  <div className="pulse-dot"></div>
                  <span>{doc.avaliable ? 'Live Now' : 'Busy'}</span>
                </div>
                <div className={`portrait-glow ${hoveredDoctor === doc._id ? 'glow-active' : ''}`}></div>
              </div>

              {/* Professional Info */}
              <div className="topdoc-bio">
                <div className="bio-stats">
                  <div className="rating-display">
                    <span className="star-rating">⭐⭐⭐⭐⭐</span>
                    <span className="score">4.9</span>
                  </div>
                  <span className={`session-status ${doc.avaliable ? 'live' : 'busy'}`}>
                    {doc.avaliable ? 'Available' : 'Booked'}
                  </span>
                </div>

                <h3 className="doctor-display-name">{doc.name}</h3>
                <p className="practice-area">{doc.speciality}</p>
                
                <div className="consult-details">
                  <span className="patient-count">248 patients</span>
                  <span className="fee-info">₹{doc.fees || 500}/consult</span>
                </div>

                <button className="instant-book-btn">
                  Book Now
                  <svg className="arrow-forward" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Action CTA */}
        <div className="topdocs-action">
          <button 
            className="explore-all-btn"
            onClick={() => {
              navigate("/doctors")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            Explore All Doctors
            <svg className="cta-arrow" viewBox="0 0 24 24" fill="none">
              <path d="M17 8l-5 5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
