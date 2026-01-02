// Navbar.jsx - FIXED Dropdown Visible Issue
import { NavLink, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets_frontend/assets.js"
import { AppContext } from "../context/AppContext.jsx"
import { useContext, useState, useRef, useEffect } from "react"

export const Navbar = () => {
    const navigate = useNavigate()
    const {token, setToken, userData} = useContext(AppContext)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const logout = () => {
        navigate("/")
        localStorage.removeItem('token')
        setToken(false)
        setMobileMenuOpen(false)
        setDropdownOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <>
            <div className="navbarContainer">
                <div className="shifaImage" onClick={() => navigate("/")}>
                    <img src="https://shifa.net.au/wp-content/uploads/2023/05/col_logo_1.png" alt="ShifaLink Logo"/>
                    <h2>ShifaLink</h2>
                </div>

                <ul className={`navLinks ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                        <li>HOME</li>
                    </NavLink>
                    <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
                        <li>ABOUT</li>
                    </NavLink>
                    <NavLink to="/doctors" onClick={() => setMobileMenuOpen(false)}>
                        <li>ALL DOCTORS</li>
                    </NavLink>
                    <NavLink to="/pharmacies" onClick={() => setMobileMenuOpen(false)}>
                        <li>PHARMACIES</li>
                    </NavLink>
                    <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
                        <li>CONTACT</li>
                    </NavLink>
                </ul>

                <div className="tokenImages">
                    {token ? (
                        <div className="parent" ref={dropdownRef}>
                            {/* ✅ CLICK HERE */}
                            <div className="profileContainer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <img src={userData?.image || "https://via.placeholder.com/45"} 
                                     alt="profilePic" 
                                     className="profileImage" />
                                <img src={assets.dropdown_icon} 
                                     alt="dropdown" 
                                     className={`dropdownImage ${dropdownOpen ? 'rotate' : ''}`} />
                            </div>
                            
                            {/* ✅ DROPDOWN - NOW VISIBLE */}
                            <div className={`pal ${dropdownOpen ? 'show' : ''}`}>
                                <p className="palInputs" onClick={() => {
                                    navigate("/my-profile")
                                    setDropdownOpen(false)
                                }}>My Profile</p>
                                <p className="palInputs" onClick={() => {
                                    navigate("/my-appointments")
                                    setDropdownOpen(false)
                                }}>My Appointments</p>
                                <p className="palInputs" onClick={logout}>Logout</p>
                            </div>
                        </div>
                    ) : (
                        <button className="createButton" onClick={() => navigate("/login")}>
                            Create account
                        </button>
                    )}
                </div>

                <button className="mobileMenuBtn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <span className={`hamburgerLine ${mobileMenuOpen ? 'active' : ''}`}></span>
                    <span className={`hamburgerLine ${mobileMenuOpen ? 'active' : ''}`}></span>
                    <span className={`hamburgerLine ${mobileMenuOpen ? 'active' : ''}`}></span>
                </button>
            </div>
            
        </>
    )
}
