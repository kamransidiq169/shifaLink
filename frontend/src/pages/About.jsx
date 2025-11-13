import { assets } from "../assets/assets_frontend/assets"

export const About = () => {
    return (
     <div className="aboutContainer">
        <h2>About Us</h2>
     <div className="allAbout">
           <div className="aboutImage">
            <img src={assets.techDoc} alt="shifalink image" />
        </div>
        <div className="aboutInfo">
            <p>ShifaLink is a modern healthcare appointment platform designed to bridge the gap between patients and doctors through seamless digital interaction. Built with a focus on accessibility, efficiency, and trust, ShifaLink allows users to book appointments, view doctor profiles, and receive timely notifications — all from a clean, intuitive interface. Whether it's a routine check-up or a specialist consultation, the platform ensures that healthcare is just a few clicks away, empowering users with control and clarity over their medical journey.</p>
            <p>What sets ShifaLink apart is its blend of smart technology and compassionate care. The system integrates real-time scheduling, secure data handling, and email notifications powered by Resend API, ensuring both functionality and reliability. Inspired by the needs of Kashmir’s evolving digital landscape, ShifaLink also reflects regional identity through thoughtful design and culturally respectful visuals. It’s not just a tool — it’s a step toward smarter, more human-centered healthcare.</p>
            <b>Our Vision</b>
            <p>Our vision is to make healthcare accessible, efficient, and human-centered through smart digital platforms. ShifaLink aims to empower every patient with seamless appointment access while preserving the warmth of real doctor-patient care.</p>
        </div>
     </div>
     <div className="whychoose">
        <p className="whyus">WHY <span className="us">CHOOSE US</span></p>
        <div className="chooseContainer">
            <div>
                <b>EFFICIENCY:</b>
                <p>Streamlined Appointment Scheduling <br /> That Fits Your Busy Lifestyle.</p>
            </div>
            <div>
                <b>CONVENIENCE:</b>
                <p>Access To a Network of Trusted <br /> Healthcare Professionals in Your Area.
                </p>
            </div>
            <div>
                <b>PERSONALIZATION:</b>
                <p>Tailored Recommendations And Reminders <br />To Help You Stay On The Top Of Your Health.</p>
            </div>
        </div>
     </div>
     </div>
    )
}