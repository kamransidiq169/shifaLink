import { assets } from "../assets/assets_frontend/assets"
import {useNavigate} from 'react-router-dom'
export const Banner=()=>{
    const navigate=useNavigate()
    return (
        <>
        <div className="bannerContainer">
            <div className="leftBanner">
                <h1>Book Appointment with <br /> 100+ Trusted Doctors Across Kashmir</h1>
                <button onClick={()=>navigate("/login")}>Create account</button>
            </div>
            <div className="rightBanner">
                <img src={assets.appointment_img} alt="appointment image" />
            </div>
        </div>
        </>
    )
}