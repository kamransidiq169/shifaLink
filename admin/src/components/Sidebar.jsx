import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";

export const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // agar dono token nahi hain to sidebar mat dikhao
  if (!aToken && !dToken) return null;

  return (
    <>
      {/* ADMIN SIDEBAR */}
      {aToken && (
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Admin Menu</h2>
          </div>

          <ul className="sidebar-menu">
            <NavLink to="/dashboard" className="sidebar-link">
              <img src={assets.home_icon} alt="dashboard" />
              <p>Dashboard</p>
            </NavLink>

            <NavLink to="/all-appointments" className="sidebar-link">
              <img src={assets.appointment_icon} alt="appointments" />
              <p>Appointments</p>
            </NavLink>

            <NavLink to="/add-doctor" className="sidebar-link">
              <img src={assets.add_icon} alt="add doctor" />
              <p>Add Doctor</p>
            </NavLink>

            <NavLink to="/doctor-list" className="sidebar-link">
              <img src={assets.people_icon} alt="doctor list" />
              <p>Doctor List</p>
            </NavLink>
          </ul>
        </div>
      )}

      {/* DOCTOR SIDEBAR */}
      {dToken && (
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Doctor Menu</h2>
          </div>

          <ul className="sidebar-menu">
            <NavLink to="/doctor-dashboard" className="sidebar-link">
              <img src={assets.home_icon} alt="dashboard" />
              <p>Dashboard</p>
            </NavLink>

            <NavLink to="/doctor-appointment" className="sidebar-link">
              <img src={assets.appointment_icon} alt="appointments" />
              <p>Appointments</p>
            </NavLink>

            {/* agar doctor ko Add Doctor nahi dikhana ho to is NavLink ko hata dena */}
            <NavLink to="/doctor-profile" className="sidebar-link">
              <img src={assets.people_icon} alt="doctor list" />
              <p>Doctor List</p>
            </NavLink>
          </ul>
        </div>
      )}
    </>
  );
};
