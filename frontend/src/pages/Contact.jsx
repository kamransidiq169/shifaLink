import { assets } from "../assets/assets_frontend/assets"

export const Contact = () => {
    return (
        <div className="contactContainer">
            <h2>Contact Us</h2>
            <div className="allAboutContact">
                <div className="contactImage">
                    <img src={assets.contact_image} alt="contact image" />
                </div>
                <div className="contactInfo">
                    <h3>Our OFFICE</h3>
                    <p style={{color:"gray"}}>Lalbazar Srinagar <br /> Jammu & Kashmir India</p>
                    <p style={{color:"gray"}}>tel:7006040427 <br /> Email:kamransidiq169@gmail.com</p>
                    <h4>Careers at ShifaLink</h4>
                    <p style={{color:"gray"}}>Learn more about teams and job openings </p>
                    <button className="explore">Explore Jobs</button>
                </div>
            </div>
        </div>
    )
}