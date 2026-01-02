import { useContext, useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";

export const AddDoctors = () => {
  const { backendUrl, aToken } = useContext(AdminContext)

  // ✅ EXISTING STATES
  const [docImg, setdocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [docPharmacy, setDocPharmacy] = useState('')
  const [about, setAbout] = useState('')
  const [fees, setFees] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  // ✅ NEW: AVAILABILITY STATES
  const [availability, setAvailability] = useState([
    { day: 'Monday', from: '10:00', to: '14:00' }
  ])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        toast.error("Image not selected")
        return
      }

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('pharmacy', docPharmacy)  // ✅ FIXED
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      
      // ✅ NEW: AVAILABILITY FIELD
      formData.append('availability', JSON.stringify(availability))

      // ✅ DEBUG (uncomment kar sakte ho)
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value)
      // }

      const { data } = await axios.post(backendUrl + 'api/admin/add-doctor', formData, {
        headers: { aToken }
      })

      console.log("✅ Response:", data);
      
      if (data.success) {
        toast.success(data.message)
        // ✅ FULL RESET
        setdocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAbout('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setExperience('1 Year')
        setFees('')
        setSpeciality('General Physician')
        setDocPharmacy('')
        setAvailability([{ day: 'Monday', from: '10:00', to: '14:00' }])  // ✅ AVAILABILITY RESET
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log("❌ Error:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  };

  // ✅ AVAILABILITY HANDLERS
  const addAvailabilitySlot = () => {
    setAvailability(prev => [...prev, { day: 'Monday', from: '10:00', to: '14:00' }])
  }

  const updateAvailability = (index, field, value) => {
    const newAvailability = [...availability]
    newAvailability[index][field] = value
    setAvailability(newAvailability)
  }

  const removeAvailabilitySlot = (index) => {
    if (availability.length > 1) {
      setAvailability(prev => prev.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="add-doctor-container">
      <h2 className="form-title">Add Doctor</h2>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {/* IMAGE UPLOAD */}
          <div className="upload-section">
            <label htmlFor="upload-input" className="upload-circle">
              <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
            </label>
            <input
              type="file"
              id="upload-input"
              onChange={(e) => setdocImg(e.target.files[0])}
              style={{ display: "none" }}
              accept="image/*"
            />
            <p>Upload doctor picture</p>
          </div>

          <div className="form-grid">
            {/* DOCTOR NAME */}
            <div className="form-group">
              <label>Doctor name</label>
              <input
                type="text"
                placeholder="Dr. Mudasir"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* SPECIALITY */}
            <div className="form-group">
              <label>Speciality</label>
              <select value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
                <option value="">Select speciality</option>
                <option value="General physician">General physician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Gynacologist">Gynacologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Doctor Email</label>
              <input
                type="email"
                placeholder="doctor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* EDUCATION */}
            <div className="form-group">
              <label>Education</label>
              <input
                type="text"
                placeholder="MBBS, MD"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>

            {/* PHARMACY */}
            <div className="form-group">
              <label>Pharmacy</label>
              <input
                type="text"
                placeholder="Siddique-Pharmacy"
                value={docPharmacy}
                onChange={(e) => setDocPharmacy(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Doctor Password</label>
              <input
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ADDRESS */}
            <div className="form-group address-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="17th Cross, Richmond"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Circle, Ring Road"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>

            {/* EXPERIENCE */}
            <div className="form-group">
              <label>Experience</label>
              <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                <option value="">Select experience</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3+ Years">3+ Years</option>
              </select>
            </div>

            {/* FEES */}
            <div className="form-group">
              <label>Fees</label>
              <input
                type="number"
                placeholder="50"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
            </div>
          </div>

          {/* ✅ NEW AVAILABILITY SECTION */}
          <div className="form-group full-width">
            <label>Doctor Availability 
              <button type="button" onClick={addAvailabilitySlot} className="add-slot-btn" style={{marginLeft: '10px'}}>
                + Add Slot
              </button>
            </label>
            
            {availability.map((slot, index) => (
              <div key={index} className="availability-row" style={{display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center'}}>
                <select 
                  value={slot.day} 
                  onChange={(e) => updateAvailability(index, 'day', e.target.value)}
                  style={{flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                
                <input 
                  type="time" 
                  value={slot.from} 
                  onChange={(e) => updateAvailability(index, 'from', e.target.value)}
                  style={{flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
                />
                
                <input 
                  type="time" 
                  value={slot.to} 
                  onChange={(e) => updateAvailability(index, 'to', e.target.value)}
                  style={{flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}
                />
                
                {availability.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeAvailabilitySlot(index)}
                    style={{
                      background: '#dc3545', 
                      color: 'white', 
                      border: 'none', 
                      padding: '8px 12px', 
                      borderRadius: '4px', 
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* ABOUT */}
          <div className="form-group full-width">
            <label>About Doctor</label>
            <textarea
              rows="3"
              placeholder="Write about doctor experience and qualifications..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};
