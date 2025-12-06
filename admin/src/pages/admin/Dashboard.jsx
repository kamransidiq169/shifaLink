import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaUserMd, FaCalendarAlt, FaUser } from 'react-icons/fa';


export const Dashboard = () => {
  const { dashData, getDashData, aToken,adminCancelAppointment} = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon "><FaUserMd size={32} color="#3752a8" /></div>
          <div>
            <div className="stat-count">{dashData.doctors}</div>
            <div className="stat-label">Doctors</div>
          </div>
        </div>
        <div className="stat-card">
          
<div className="stat-icon "><FaCalendarAlt size={32} color="#3752a8" /></div>
          <div>
            <div className="stat-count">{dashData.appointments}</div>
            <div className="stat-label">Appointments</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon "><FaUser size={32} color="#3752a8" /></div>
          <div>
            <div className="stat-count">{dashData.patients}</div>
            <div className="stat-label">Patients</div>
          </div>
        </div>
      </div>

      <div className="latest-bookings-section">
        <div className="bookings-header">
          <span className="header-icon">📄</span>
          <span className="header-text">Latest Bookings</span>
        </div>
        <ul className="latest-bookings-list">
          {dashData.latestAppointments &&
            dashData.latestAppointments.map((item, idx) => (
              <li key={idx} className="booking-item">
                <div className="booking-info">
                  <img src={item.docData.image} alt="doctor" className="booking-avatar" />
                  <div>
                    <div className="doctor-name">{item.docData.name}</div>
                    <div className="booking-date">{item.slotDate}</div>
                  </div>
                </div>
                {item.cancelled ? <p className="cancel-btn">Cancelled</p> : <button className="cancel-btn" onClick={()=>adminCancelAppointment(item._id)}>Cancel</button>}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
