
import { NavLink, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets_frontend/assets.js"
import { AppContext } from "../context/AppContext.jsx"
import { useContext } from "react"
export const Navbar = () => {
    const navigate = useNavigate()

    const {token, setToken,userData} = useContext(AppContext)

    const logout =()=>{
        localStorage.removeItem('token')
        setToken(false)
    }
    return (<>
        <div className="navbarContainer">
            <div className="shifaImage" onClick={()=>navigate("/")}>
                <img src="https://shifa.net.au/wp-content/uploads/2023/05/col_logo_1.png"></img>
                <h2>ShifaLink</h2>
            </div>
            <ul>
                <NavLink to="/">
                    <li>HOME</li>
                </NavLink>
                <NavLink to="/about">
                    <li>ABOUT</li>
                </NavLink>
                <NavLink to="/doctors">
                    <li>ALL DOCTORS</li>
                </NavLink>

                <NavLink to="/contact">
                    <li>CONTACT</li>
                </NavLink>
            </ul>
            <div className="tokenImages">{token ? <div className="parent" >
                <img src={userData.image} alt="profilePic" className="profileImage" />
                <img src={assets.dropdown_icon} alt="dropdown Icon" className="dropdownImage" />
                <div> 
                    <div className="pal">
                        <p className="palInputs" onClick={()=>navigate("/my-profile")}>My Profile</p>
                        <p className="palInputs" onClick={()=>navigate("/my-appointments")}>My Appointments</p>
                        <p className="palInputs" onClick={logout}>Logout</p>
                    </div>
                </div>
                </div>
                : <button className="createButton" onClick={() => navigate("/login")}>Create account</button>}</div>

        </div>
        <hr />
    </>)
}