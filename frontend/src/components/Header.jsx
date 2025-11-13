import { assets } from "../assets/assets_frontend/assets.js"
export const Header=()=>{
    return(<>
    <div className="headerContainer">
        <div className="leftSide">
            <h1>ShifaLink makes it easy to book appointments with verified doctors across Kashmir <br /> fast, secure, and reliable.</h1>
            <div className="headingParagraph">
                <img src={assets.group_profiles} alt="group" className="groupprofile"/>
                <p>Access trusted healthcare professionals across Kashmir and schedule your visit effortlessly.</p>
            </div>
            <a href="#speciality" className="ba">Book Appointment <img src={assets.arrow_icon} alt="book appointment button" /></a>
        </div>
        <div className="rightSide">
            <img src={assets.doctor} alt="doctor image" />
        </div>
    </div>

    </>)
}