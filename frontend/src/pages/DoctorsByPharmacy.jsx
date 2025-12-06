// DoctorsByPharmacy.jsx
import { useParams } from "react-router-dom";
import { pharmacies } from "../assets/assets_frontend/pharmacies.js";

// demo doctors data (baad me backend se la sakte ho)
const doctorsByPharmacy = {
  "shifa-care-pharmacy": [
    { id: 1, name: "Dr. A. Khan", speciality: "General Physician" },
    { id: 2, name: "Dr. S. Ahmad", speciality: "Pediatrics" },
  ],
  "city-medico-pharmacy": [
    { id: 3, name: "Dr. R. Bhat", speciality: "Dermatologist" },
  ],
  // baaki pharmacies ke doctors yahan add karo
};

const DoctorsByPharmacy = () => {
  const { pharmacyId } = useParams();

  const pharmacy = pharmacies.find((p) => p.id === pharmacyId);
  const doctors = doctorsByPharmacy[pharmacyId] || [];

  if (!pharmacy) {
    return <p>Pharmacy not found.</p>;
  }

  return (
    <div className="pharmacy-doctors-page">
      <h1>{pharmacy.name}</h1>
      <p>{pharmacy.area}</p>

      <h2>Available Doctors</h2>
      {doctors.length === 0 ? (
        <p>No doctors listed yet.</p>
      ) : (
        <ul>
          {doctors.map((doc) => (
            <li key={doc.id}>
              <strong>{doc.name}</strong> – {doc.speciality}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorsByPharmacy;
