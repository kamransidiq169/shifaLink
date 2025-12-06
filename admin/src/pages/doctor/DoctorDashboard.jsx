import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";


export const DoctorDashboard = () => {
  const { dashData, getdashData, dToken,cancelAppointment,completeAppointment } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getdashData();
    }
  }, [dToken]);

  return (
    <div className="doctor-dashboard">
      {/* Top summary cards */}
      <div className="dd-stats">
        <div className="dd-card">
          <div className="dd-icon earnings-icon"></div>
          <div>
            <div className="dd-count">${dashData.earning || 0}</div>
            <div className="dd-label">Earnings</div>
          </div>
        </div>

        <div className="dd-card">
          <div className="dd-icon appointment-icon"></div>
          <div>
            <div className="dd-count">{dashData.appointmentData || 0}</div>
            <div className="dd-label">Appointments</div>
          </div>
        </div>

        <div className="dd-card">
          <div className="dd-icon patient-icon"></div>
          <div>
            <div className="dd-count">{dashData.patients || 0}</div>
            <div className="dd-label">Patients</div>
          </div>
        </div>
      </div>

      {/* Latest bookings */}
      <div className="dd-latest-box">
        <div className="dd-latest-header">
          <span className="dd-header-icon">📝</span>
          <span className="dd-header-text">Latest Bookings</span>
        </div>

        <ul className="dd-latest-list">
          {dashData.latestappointments &&
            dashData.latestappointments.map((item, index) => (
              <li
                key={item._id || index}
                className={`dd-booking-item ${
                  index === 0 ? "dd-booking-highlight" : ""
                }`}
              >
                <div className="dd-booking-left">
                  <img
                    src={item.userData?.image}
                    alt="doctor"
                    className="dd-doc-avatar"
                  />
                  <div>
                    <div className="dd-doc-name">
                      {item.userData?.name || "Doctor"}
                    </div>
                    <div className="dd-booking-date">
                      {item.slotDate?.replace(/_/g, " ")}
                    </div>
                  </div>
                </div>

                <div className="dd-booking-right">
                  {item.cancelled ? <p>Cancelled</p> : item.isCompleted ? <p>Completed</p>: <div className="action-buttons"> <button className="cancel-btn" onClick={() => cancelAppointment(item._id)}>✕</button>
                                        <button className="complete-btn" onClick={() => completeAppointment(item._id)}>✓</button>  </div>}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard;
