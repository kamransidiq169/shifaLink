import { useContext, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export const Doctors = () => {
    const navigate = useNavigate()
    const { speciality } = useParams()
    const { doctors } = useContext(AppContext)
    
    const filteredDoctors = useMemo(() => {
        if (!doctors?.length) return []
        return speciality 
            ? doctors.filter(doc => doc.speciality === speciality)
            : doctors
    }, [doctors, speciality])

    const specialties = [
        { name: 'General physician', slug: 'General physician' },
        { name: 'Gynecologist', slug: 'Gynecologist' },
        { name: 'Dermatologist', slug: 'Dermatologist' },
        { name: 'Pediatricians', slug: 'Pediatricians' },
        { name: 'Neurologist', slug: 'Neurologist' },
        { name: 'Gastroenterologist', slug: 'Gastroenterologist' }
    ]

    return (
        <section className="doctors-page">
            <div className="doctors-page-container">
                {/* Header */}
                <header className="doctors-header">
                    <div className="header-badge">
                        <span className="badge-icon">👨‍⚕️</span>
                        Verified Doctors
                    </div>
                    <h1 className="header-title">
                        {speciality || 'All Doctors'}
                    </h1>
                    <p className="header-subtitle">
                        {filteredDoctors.length || 0}+ doctors available in Srinagar
                    </p>
                </header>

                {/* Filter Bar */}
                <nav className="filter-bar">
                    <button 
                        className={`filterbutton ${!speciality ? 'active' : ''}`}
                        onClick={() => navigate('/doctors')}
                    >
                        All Specialties
                    </button>
                    {specialties.map(({ name, slug }) => (
                        <button
                            key={slug}
                            className={`filterbutton ${speciality === slug ? 'active' : ''}`}
                            onClick={() => navigate(`/doctors/${slug}`)}
                        >
                            {name}
                        </button>
                    ))}
                </nav>

                {/* Doctors Grid */}
                <main className="doctors-main">
                    {filteredDoctors.length ? (
                        filteredDoctors.map((doctor) => (
                            <article
                                key={doctor._id}
                                className="doctor-profile"
                                onClick={() => navigate(`/appointment/${doctor._id}`)}
                            >
                                {/* Image & Status */}
                                <div className="profile-image-wrapper">
                                    <img 
                                        src={doctor.image} 
                                        alt={doctor.name}
                                        className="profile-image"
                                    />
                                    <div className={`live-status ${doctor.avaliable ? 'online' : 'offline'}`}>
                                        <div className="status-indicator"></div>
                                        <span>{doctor.avaliable ? 'Available' : 'Booked'}</span>
                                    </div>
                                </div>

                                {/* Doctor Details */}
                                <div className="profile-details">
                                    <div className="profile-header">
                                        <div className="doctor-rating">
                                            <span className="stars">⭐ 4.9</span>
                                            <span className="reviews">(248)</span>
                                        </div>
                                        <span className={`status-tag ${doctor.avaliable ? 'online' : 'offline'}`}>
                                            {doctor.avaliable ? 'OPEN' : 'BUSY'}
                                        </span>
                                    </div>

                                    <h2 className="doctor-fullname">{doctor.name}</h2>
                                    <p className="doctor-field">{doctor.speciality}</p>

                                    <div className="doctor-info">
                                        <span className="info-item">
                                            👥 {Math.floor(Math.random() * 500) + 100} patients
                                        </span>
                                        <span className="info-item">
                                            💰 ₹{doctor.fees || 500}/visit
                                        </span>
                                    </div>

                                    <button className="book-appointment-btn">
                                        Book Appointment
                                        <svg className="btn-icon" viewBox="0 0 20 20">
                                            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none"/>
                                        </svg>
                                    </button>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="no-results">
                            <div className="empty-icon">🔍</div>
                            <h3>No Doctors Found</h3>
                            <p>No doctors match your search. Try another specialty.</p>
                            <button 
                                className="back-to-all-btn"
                                onClick={() => navigate('/doctors')}
                            >
                                View All Doctors
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </section>
    )
}
