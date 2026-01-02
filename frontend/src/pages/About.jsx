import { assets } from "../assets/assets_frontend/assets";

export const About = () => {
    return (
        <section className="about-section" aria-labelledby="about-heading">
            <div className="about-container">
                {/* Header */}
                <header className="about-header">
                    <h2 id="about-heading" className="about-title">About Us</h2>
                </header>

                {/* Main Content */}
                <article className="about-content">
                    <div className="about-image-wrapper">
                        <img 
                            src={assets.aboutimg} 
                            alt="ShifaLink healthcare platform illustration" 
                            className="about-image"
                            loading="lazy" // Lazy load for performance
                        />
                    </div>
                    <div className="about-info">
                        <p>
                            ShifaLink is a modern healthcare appointment platform designed to bridge the gap between patients and doctors through seamless digital interaction. Built with a focus on accessibility, efficiency, and trust, ShifaLink allows users to book appointments, view doctor profiles, and receive timely notifications — all from a clean, intuitive interface. Whether it's a routine check-up or a specialist consultation, the platform ensures that healthcare is just a few clicks away, empowering users with control and clarity over their medical journey.
                        </p>
                        <p>
                            What sets ShifaLink apart is its blend of smart technology and compassionate care. The system integrates real-time scheduling, secure data handling, and email notifications powered by Resend API, ensuring both functionality and reliability. Inspired by the needs of Kashmir’s evolving digital landscape, ShifaLink also reflects regional identity through thoughtful design and culturally respectful visuals. It’s not just a tool — it’s a step toward smarter, more human-centered healthcare.
                        </p>
                        <h3 className="vision-title">Our Vision</h3>
                        <p>
                            Our vision is to make healthcare accessible, efficient, and human-centered through smart digital platforms. ShifaLink aims to empower every patient with seamless appointment access while preserving the warmth of real doctor-patient care.
                        </p>
                    </div>
                </article>

                {/* Why Choose Us Section */}
                <section className="why-choose-us" aria-labelledby="why-choose-heading">
                    <h3 id="why-choose-heading" className="why-choose-title">
                        WHY <span className="highlight">CHOOSE US</span>
                    </h3>
                    <div className="choose-grid">
                        <div className="choose-item">
                            <div className="icon-wrapper">
                                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h4>EFFICIENCY</h4>
                            <p>Streamlined Appointment Scheduling That Fits Your Busy Lifestyle.</p>
                        </div>
                        <div className="choose-item">
                            <div className="icon-wrapper">
                                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h4>CONVENIENCE</h4>
                            <p>Access To a Network of Trusted Healthcare Professionals in Your Area.</p>
                        </div>
                        <div className="choose-item">
                            <div className="icon-wrapper">
                                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h4>PERSONALIZATION</h4>
                            <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};