// DoctorsByPharmacy.jsx
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";


const DoctorsByPharmacy = () => {
  const {doctors} = useContext(AppContext)
  console.log(doctors);
  
  const { pharmacyId } = useParams();
  const navigate = useNavigate()
  // Filter doctors by pharmacyId or show all if no specific match
  const filteredDoctors = doctors.filter(doctor => doctor.pharmacy === pharmacyId);

  return (
    <section className="doctors-section">
  <div className="section-header">
    <h2 className="section-title">
      Doctors Available at {pharmacyId}
    </h2>
    <p className="section-subtitle">
      Browse qualified doctors currently associated with this pharmacy
      and check their availability in real time.
    </p>
  </div>

      <div className="rightDoctors">
        {filteredDoctors.map((doc) => (
          <div key={doc._id} className="allDoctors" onClick={() => navigate(`/pharmacyappointment/${doc._id}`)}>
            <img src={doc.image} alt="doctor image" />
            <div className="doctorANS">
              <div className="docInfo">
                <p className={doc.avaliable ? "dot" : "notdot"}></p>
                <p className={doc.avaliable ? "aval" : "notaval"}>{doc.avaliable ? "Available" : "Not Available"}</p>
              </div>
              <div className="ns">
                <h3>{doc.name}</h3>
                <p>{doc.speciality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorsByPharmacy;
