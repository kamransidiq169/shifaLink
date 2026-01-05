// import { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { AppContext } from "../../context/AppContext";



// export const AllAppointments = () => {
//     const { appointments, aToken, getAllAppointments } = useContext(AdminContext);
//     const {calculateAge} = useContext(AppContext)
//     useEffect(() => {
//         if (aToken) {
//             getAllAppointments();
//         }
//     }, [aToken]);
//     console.log(appointments);

//     return (
//         <>
//             <div className="adminAppointments">
//                 <p>All Appointments</p>
//                 <div className="upperDetails">
//                     <p>#</p>
//                     <p>Patient</p>
//                     <p>Age</p>
//                     <p>Date&Time</p>
//                     <p>Doctor</p>
//                     <p>Fees</p>
//                     <p>Action</p>
//                 </div>
//                 <div className="innerDetails">
//                     {appointments?.map((item, index) => {
//                         return <div key={index}>
//                             <p>{index + 1}</p>
//                             <p>{item.userData.name}</p>
//                             <p>{calculateAge(item.userData.dob)}</p>
//                             <div>
//                                 <p>{item.slotDate},<span>{item.slotTime}</span></p>
//                             </div>
//                             <div>
//                                 <img src={item.docData.image} alt="doctor image" />
//                                 <p>{item.docData.name}</p>
//                             </div>
//                             <p>{item.amount}</p>
//                             <p>*</p>
//                              </div>
//                     })}
//                 </div>
//             </div>
//         </>
//     )
// };
// AllAppointments.jsx - PERFECT RESPONSIVE + PRODUCTION READY
import { useContext, useEffect, useCallback } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

export const AllAppointments = () => {
  const { appointments, aToken, getAllAppointments, adminCancelAppointment, isLoadingAppointments } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken, getAllAppointments]);

  const handleCancel = useCallback((id) => {
    if (confirm('Cancel this appointment?')) {
      adminCancelAppointment(id);
    }
  }, [adminCancelAppointment]);

  if (isLoadingAppointments) {
    return (
      <div className="loading-full">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="appointments-main">
      <header className="page-header">
        <h1>All Appointments</h1>
        <span className="count">{appointments?.length || 0} total</span>
      </header>

      {appointments?.length ? (
        <>
          {/* DESKTOP TABLE */}
          <div className="desktop-view">
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Age</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Doctor</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, i) => (
                    <tr key={appt._id}>
                      <td>{i + 1}</td>
                      <td>{appt.userData?.name}</td>
                      <td>{calculateAge(appt.userData?.dob)}</td>
                      <td>{appt.slotDate}</td>
                      <td>{appt.slotTime}</td>
                      <td className="doctor-cell">
                        <img src={appt.docData?.image} alt="" className="doc-img" />
                        <span>{appt.docData?.name}</span>
                      </td>
                      <td>₹{appt.amount}</td>
                      <td>
                        {appt.cancelled ? 
                          <span className="tag cancelled">Cancelled</span> : 
                          <button className="btn-cancel" onClick={() => handleCancel(appt._id)}>
                            Cancel
                          </button>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE CARDS */}
          <div className="mobile-view">
            {appointments.map((appt, i) => (
              <div key={appt._id} className="appt-card">
                <div className="card-top">
                  <strong>#{i + 1}</strong>
                  {appt.cancelled ? 
                    <span className="tag cancelled">Cancelled</span> : 
                    <span className="tag active">Active</span>
                  }
                </div>
                <div className="patient-info">
                  👤 <strong>{appt.userData?.name}</strong>
                  <span>({calculateAge(appt.userData?.dob)})</span>
                </div>
                <div className="appt-details">
                  📅 {appt.slotDate} | 🕐 {appt.slotTime}
                </div>
                <div className="doctor-info">
                  👨‍⚕️ {appt.docData?.name}
                </div>
                <div className="amount">₹{appt.amount}</div>
                {!appt.cancelled && (
                  <button className="btn-full" onClick={() => handleCancel(appt._id)}>
                    Cancel Appointment
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-data">
          <div className="empty-emoji">📅</div>
          <h3>No Appointments</h3>
          <p>Check back later</p>
        </div>
      )}
    </div>
  );
};
