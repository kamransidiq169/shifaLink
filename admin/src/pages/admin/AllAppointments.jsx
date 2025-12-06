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
import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";


export const AllAppointments = () => {
  const { appointments, aToken, getAllAppointments,adminCancelAppointment } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);
  

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
console.log(appointments);

  return (
    <div className="appointments-container">
      <h2>All Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Patient</th>
            <th>Age</th>
            <th>Date & Time</th>
            <th>Doctor</th>
            <th>Fees</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.userData.name}</td>
              <td>{calculateAge(item.userData.dob)}</td>
              <td>
                {item.slotDate} <br />
                <span className="time">{item.slotTime}</span>
              </td>
              <td className="doctor-cell">
                <img
                  src={item.docData.image}
                  alt="doctor"
                  className="doctor-img"
                />
                <span>{item.docData.name}</span>
              </td>
              <td>${item.amount}</td>
              <td>
                {item.cancelled ? <p className="cancel-btn">Cancelled</p> : <button className="cancel-btn" onClick={()=>adminCancelAppointment(item._id)}>Cancel</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};