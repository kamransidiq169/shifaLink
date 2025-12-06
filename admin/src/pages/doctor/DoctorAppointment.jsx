import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";


export const DoctorAppointment = () => {
    const { dToken, appointments, getDoctorAppointment, completeAppointment, cancelAppointment } = useContext(DoctorContext);

    useEffect(() => {
        if (dToken) {
            getDoctorAppointment();
        }
    }, [dToken]);


    return (
        <div className="doctor-appointments-container">
            <h1>All Appointments</h1>
            <div className="appointments-table-wrapper">
                <table className="doctor-appointments-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Patient</th>
                            <th>Payment</th>
                            <th>Age</th>
                            <th>Date & Time</th>
                            <th>Fees</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments && appointments.length > 0 ? (
                            appointments.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td className="patient-cell">
                                        <img
                                            src={item.userData.image}
                                            alt="patient"
                                            className="patient-avatar"
                                        />
                                        <span>{item.userData.name}</span>
                                    </td>
                                    <td>
                                        <span className="payment-badge">
                                            {item.payment ? "PAID" : "CASH"}
                                        </span>
                                    </td>
                                    <td>{item.docData.dob || 'not selected'}</td>
                                    <td>
                                        {item.slotDate.replace(/_/g, " ")}, {item.slotTime}
                                    </td>
                                    <td>${item.amount}</td>

                                    {item.cancelled ? <td>Cancelled</td> : item.isCompleted ? <td>Completed</td> : <td className="action-buttons"> <button className="cancel-btn" onClick={() => cancelAppointment(item._id)}>✕</button>
                                        <button className="complete-btn" onClick={() => completeAppointment(item._id)}>✓</button>  </td>}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center" }}>
                                    No appointments found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorAppointment;
