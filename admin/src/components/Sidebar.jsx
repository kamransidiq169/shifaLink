import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";


export const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  if (!aToken) return null;

  return (
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
  );
};
