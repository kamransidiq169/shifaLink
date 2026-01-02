import { assets } from "../assets/assets_frontend/assets";

export const Contact = () => {
    return (
        <section className="contact-section" aria-labelledby="contact-heading">
            <div className="contact-container">
                {/* Header */}
                <header className="contact-header">
                    <h2 id="contact-heading" className="contact-title">Contact Us</h2>
                </header>

                {/* Main Content */}
                <article className="contact-content">
                    <div className="contact-image-wrapper">
                        <img 
                            src={assets.contact_image} 
                            alt="ShifaLink contact illustration" 
                            className="contact-image"
                            loading="lazy" // Lazy load for performance
                        />
                    </div>
                    <div className="contact-info">
                        <h3 className="office-title">Our Office</h3>
                        <address className="office-address">
                            <div className="address-item">
                                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                <p>Lalbazar Srinagar<br />Jammu & Kashmir, India</p>
                            </div>
                            <div className="address-item">
                                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <p>Tel: <a href="tel:7006040427">7006040427</a></p>
                            </div>
                            <div className="address-item">
                                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <p>Email: <a href="mailto:kamransidiq169@gmail.com">kamransidiq169@gmail.com</a></p>
                            </div>
                        </address>

                        <div className="careers-section">
                            <h4 className="careers-title">Careers at ShifaLink</h4>
                            <p>Learn more about our teams and job openings.</p>
                            <button className="explore-btn" aria-label="Explore job opportunities">
                                Explore Jobs
                                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};