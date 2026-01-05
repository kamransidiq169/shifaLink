// import { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { FaUserMd, FaCalendarAlt, FaUser } from 'react-icons/fa';


// export const Dashboard = () => {
//   const { dashData, getDashData, aToken,adminCancelAppointment} = useContext(AdminContext);

//   useEffect(() => {
//     if (aToken) {
//       getDashData();
//     }
//   }, [aToken]);

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-stats">
//         <div className="stat-card">
//           <div className="stat-icon "><FaUserMd size={32} color="#3752a8" /></div>
//           <div>
//             <div className="stat-count">{dashData.doctors}</div>
//             <div className="stat-label">Doctors</div>
//           </div>
//         </div>
//         <div className="stat-card">
          
// <div className="stat-icon "><FaCalendarAlt size={32} color="#3752a8" /></div>
//           <div>
//             <div className="stat-count">{dashData.appointments}</div>
//             <div className="stat-label">Appointments</div>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon "><FaUser size={32} color="#3752a8" /></div>
//           <div>
//             <div className="stat-count">{dashData.patients}</div>
//             <div className="stat-label">Patients</div>
//           </div>
//         </div>
//       </div>

//       <div className="latest-bookings-section">
//         <div className="bookings-header">
//           <span className="header-icon">📄</span>
//           <span className="header-text">Latest Bookings</span>
//         </div>
//         <ul className="latest-bookings-list">
//           {dashData.latestAppointments &&
//             dashData.latestAppointments.map((item, idx) => (
//               <li key={idx} className="booking-item">
//                 <div className="booking-info">
//                   <img src={item.docData.image} alt="doctor" className="booking-avatar" />
//                   <div>
//                     <div className="doctor-name">{item.docData.name}</div>
//                     <div className="booking-date">{item.slotDate}</div>
//                   </div>
//                 </div>
//                 {item.cancelled ? <p className="cancel-btn">Cancelled</p> : <button className="cancel-btn" onClick={()=>adminCancelAppointment(item._id)}>Cancel</button>}
//               </li>
//             ))}
//         </ul>
//       </div>
//     </div>
//   );
// };
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaUserMd, FaCalendarAlt, FaUser, FaSpinner } from 'react-icons/fa';

export const Dashboard = () => {
  const { dashData, getDashData, aToken, adminCancelAppointment } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (aToken) {
      getDashData()
        .then(() => setLoading(false))
        .catch((err) => {
          setError('Failed to load dashboard data. Please try again.');
          setLoading(false);
        });
    }
  }, [aToken]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <FaSpinner className="dashboard-spinner" />
        <p>Loading dashboard...</p>. 
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Dashboard Stats Section */}
        <section className="dashboard-stats" aria-labelledby="stats-heading">
          <div className="stat-card">
            <div className="stat-icon">
              <FaUserMd aria-hidden="true" />
            </div>
            <div className="stat-content">
              <div className="stat-count">{dashData.doctors || 0}</div>
              <div className="stat-label">Doctors</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaCalendarAlt aria-hidden="true" />
            </div>
            <div className="stat-content">
              <div className="stat-count">{dashData.appointments || 0}</div>
              <div className="stat-label">Appointments</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaUser aria-hidden="true" />
            </div>
            <div className="stat-content">
              <div className="stat-count">{dashData.patients || 0}</div>
              <div className="stat-label">Patients</div>
            </div>
          </div>
        </section>

        {/* Latest Bookings Section */}
        <section className="latest-bookings" aria-labelledby="bookings-heading">
          <header className="bookings-header">
            <span className="header-icon" aria-hidden="true">📄</span>
            <h2 id="bookings-heading" className="header-title">Latest Bookings</h2>
          </header>
          <div className="bookings-list">
            {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, idx) => (
                <div key={idx} className="booking-card">
                  <div className="booking-info">
                    <img
                      src={item.docData.image}
                      alt={`Profile picture of ${item.docData.name}`}
                      className="booking-avatar"
                      loading="lazy"
                    />
                    <div className="booking-details">
                      <div className="doctor-name">{item.docData.name}</div>
                      <div className="booking-date">{item.slotDate}</div>
                    </div>
                  </div>
                  {item.cancelled ? (
                    <span className="cancel-status" aria-label="Appointment cancelled">Cancelled</span>
                  ) : (
                    <button
                      className="cancel-btn"
                      onClick={() => adminCancelAppointment(item._id)}
                      aria-label={`Cancel appointment with ${item.docData.name}`}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No recent bookings found. Check back later!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};