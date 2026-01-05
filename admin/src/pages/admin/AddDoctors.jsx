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


// AddDoctors.jsx - PRODUCTION READY + AVAILABILITY
// AddDoctors.jsx - 1500px WIDTH + FULL RESPONSIVE
// import { useContext, useState, useCallback, useRef, useEffect } from "react";
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { AdminContext } from "../../context/AdminContext";
// import { MdUpload, MdAdd, MdDelete, MdInfo } from 'react-icons/md';

// export const AddDoctors = () => {
//   const { backendUrl, aToken } = useContext(AdminContext);
//   const [formData, setFormData] = useState({
//     name: '', email: '', password: '', speciality: 'General Physician',
//     degree: '', pharmacy: '', about: '', fees: '', experience: '1 Year',
//     address1: '', address2: ''
//   });
//   const [docImg, setDocImg] = useState(null);
//   const [imgPreview, setImgPreview] = useState(null);
//   const [availability, setAvailability] = useState([{ day: 'Monday', from: '10:00', to: '14:00' }]);
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef(null);

//   // Cleanup preview URL on unmount
//   useEffect(() => () => {
//     if (imgPreview) URL.revokeObjectURL(imgPreview);
//   }, [imgPreview]);

//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   }, []);

//   const handleImageChange = useCallback((e) => {
//     const file = e.target.files[0];
//     if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
//       toast.error('Image size must be less than 5MB');
//       return;
//     }
//     if (file) {
//       setDocImg(file);
//       const preview = URL.createObjectURL(file);
//       setImgPreview(preview);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!docImg) {
//       toast.error('Please upload doctor image');
//       return;
//     }

//     setLoading(true);
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('image', docImg);
//       formDataToSend.append('name', formData.name.trim());
//       formDataToSend.append('email', formData.email.trim());
//       formDataToSend.append('password', formData.password);
//       formDataToSend.append('speciality', formData.speciality);
//       formDataToSend.append('degree', formData.degree.trim());
//       formDataToSend.append('pharmacy', formData.pharmacy.trim());
//       formDataToSend.append('address', JSON.stringify({ 
//         line1: formData.address1.trim(), 
//         line2: formData.address2.trim() 
//       }));
//       formDataToSend.append('experience', formData.experience);
//       formDataToSend.append('fees', formData.fees);
//       formDataToSend.append('about', formData.about.trim());
//       formDataToSend.append('availability', JSON.stringify(availability));

//       const response = await axios.post(
//         `${backendUrl}api/admin/add-doctor`, 
//         formDataToSend, 
//         { 
//           headers: { 
//             'Authorization': `Bearer ${aToken}`,
//             'Content-Type': 'multipart/form-data'
//           },
//           timeout: 30000
//         }
//       );

//       if (response.data.success) {
//         toast.success('Doctor added successfully! 🎉');
//         resetForm();
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || 
//                      error.message === 'timeout of 30000ms exceeded' ? 
//                      'Request timeout. Please try again.' : 
//                      'Error adding doctor';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '', email: '', password: '', speciality: 'General Physician',
//       degree: '', pharmacy: '', about: '', fees: '', experience: '1 Year',
//       address1: '', address2: ''
//     });
//     setDocImg(null);
//     setImgPreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = '';
//     setAvailability([{ day: 'Monday', from: '10:00', to: '14:00' }]);
//   };

//   const addSlot = () => setAvailability(prev => [...prev, { day: 'Monday', from: '10:00', to: '14:00' }]);
//   const removeSlot = (index) => setAvailability(prev => prev.filter((_, i) => i !== index));
  
//   const updateSlot = (index, field, value) => {
//     const newSlots = [...availability];
//     newSlots[index][field] = value;
//     setAvailability(newSlots);
//   };

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   return (
//     <div className="add-doctor-wrapper">
//       <div className="add-doctor-container">
//         <div className="header-section">
//           <h1 className="page-title">
//             {/* <MdInfo className="title-icon" /> */}
//             Add New Doctor
//           </h1>
//           <p className="subtitle">Fill all details to register a new doctor</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="doctor-form" noValidate>
//           {/* Image Upload */}
//           <div className="upload-section">
//             <div className="upload-container">
//               <label className="upload-box" htmlFor="doctor-image">
//                 {imgPreview ? (
//                   <div className="image-preview">
//                     <img src={imgPreview} alt="Doctor Preview" />
//                     <button 
//                       type="button" 
//                       className="remove-image"
//                       onClick={() => {
//                         setDocImg(null);
//                         setImgPreview(null);
//                         if (fileInputRef.current) fileInputRef.current.value = '';
//                       }}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="upload-placeholder">
//                     <MdUpload className="upload-icon" />
//                     <p>Upload Photo</p>
//                     <span className="upload-hint">PNG, JPG up to 5MB</span>
//                   </div>
//                 )}
//               </label>
//               <input 
//                 ref={fileInputRef}
//                 id="doctor-image"
//                 type="file" 
//                 accept="image/jpeg,image/png,image/jpg"
//                 onChange={handleImageChange}
//                 className="file-input"
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           {/* Form Grid */}
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="name">Doctor Name *</label>
//               <input 
//                 id="name"
//                 name="name" 
//                 value={formData.name} 
//                 onChange={handleInputChange}
//                 placeholder="Dr. John Doe"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email *</label>
//               <input 
//                 id="email"
//                 name="email" 
//                 type="email"
//                 value={formData.email} 
//                 onChange={handleInputChange}
//                 placeholder="doctor@example.com"
//                 required
//                 className={!isValidEmail(formData.email) && formData.email ? 'error' : ''}
//                 disabled={loading}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="speciality">Speciality *</label>
//               <select 
//                 id="speciality"
//                 name="speciality" 
//                 value={formData.speciality} 
//                 onChange={handleInputChange}
//                 disabled={loading}
//               >
//                 <option value="">Select Speciality</option>
//                 <option>General Physician</option>
//                 <option>Cardiologist</option>
//                 <option>Dermatologist</option>
//                 <option>Neurologist</option>
//                 <option>Pediatrician</option>
//                 <option>Orthopedist</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="experience">Experience</label>
//               <select 
//                 id="experience"
//                 name="experience" 
//                 value={formData.experience} 
//                 onChange={handleInputChange}
//                 disabled={loading}
//               >
//                 <option>1 Year</option>
//                 <option>2 Years</option>
//                 <option>3+ Years</option>
//                 <option>5+ Years</option>
//                 <option>10+ Years</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="degree">Qualification</label>
//               <input 
//                 id="degree"
//                 name="degree" 
//                 value={formData.degree} 
//                 onChange={handleInputChange}
//                 placeholder="MBBS, MD Dermatology"
//                 disabled={loading}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="fees">Consultation Fees (₹) *</label>
//               <input 
//                 id="fees"
//                 name="fees" 
//                 type="number"
//                 min="100"
//                 max="5000"
//                 value={formData.fees} 
//                 onChange={handleInputChange}
//                 placeholder="500"
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           {/* Address Section */}
//           <div className="address-section">
//             <label className="section-label">Clinic Address</label>
//             <div className="form-grid">
//               <div className="form-group">
//                 <input 
//                   name="address1" 
//                   value={formData.address1} 
//                   onChange={handleInputChange}
//                   placeholder="Street, Area, Landmark"
//                   disabled={loading}
//                 />
//               </div>
//               <div className="form-group">
//                 <input 
//                   name="address2" 
//                   value={formData.address2} 
//                   onChange={handleInputChange}
//                   placeholder="City, State, PIN Code"
//                   disabled={loading}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Pharmacy */}
//           <div className="form-group">
//             <label htmlFor="pharmacy">Associated Pharmacy</label>
//             <input 
//               id="pharmacy"
//               name="pharmacy" 
//               value={formData.pharmacy} 
//               onChange={handleInputChange}
//               placeholder="Apollo Pharmacy, MedPlus etc."
//               disabled={loading}
//             />
//           </div>

//           {/* Availability Section */}
//           <div className="availability-section">
//             <div className="section-header">
//               <h3>Availability Slots</h3>
//               <p>Add doctor's working hours</p>
//             </div>
            
//             <div className="slots-container">
//               {availability.map((slot, i) => (
//                 <div key={i} className="slot-row">
//                   <select 
//                     value={slot.day} 
//                     onChange={(e) => updateSlot(i, 'day', e.target.value)}
//                     disabled={loading}
//                   >
//                     {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
//                       <option key={day}>{day}</option>
//                     ))}
//                   </select>
                  
//                   <div className="time-inputs">
//                     <input 
//                       type="time" 
//                       value={slot.from} 
//                       onChange={(e) => updateSlot(i, 'from', e.target.value)}
//                       disabled={loading}
//                     />
//                     <span>to</span>
//                     <input 
//                       type="time" 
//                       value={slot.to} 
//                       onChange={(e) => updateSlot(i, 'to', e.target.value)}
//                       disabled={loading}
//                     />
//                   </div>
                  
//                   {availability.length > 1 && (
//                     <button 
//                       type="button" 
//                       onClick={() => removeSlot(i)} 
//                       className="remove-btn"
//                       disabled={loading}
//                     >
//                       <MdDelete />
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
            
//             <button 
//               type="button" 
//               className="add-slot-btn"
//               onClick={addSlot}
//               disabled={loading}
//             >
//               <MdAdd /> Add Slot
//             </button>
//           </div>

//           {/* About Section */}
//           <div className="form-group full-width">
//             <label htmlFor="about">About Doctor</label>
//             <textarea 
//               id="about"
//               name="about"
//               value={formData.about} 
//               onChange={handleInputChange}
//               placeholder="Write about doctor's experience, expertise, and specialties..."
//               rows="4"
//               maxLength={1000}
//               disabled={loading}
//             />
//             <span className="char-count">{formData.about.length}/1000</span>
//           </div>

//           {/* Form Actions */}
//           <div className="form-actions">
//             <button 
//               type="button" 
//               className="reset-btn"
//               onClick={resetForm}
//               disabled={loading}
//             >
//               Reset Form
//             </button>
//             <button 
//               type="submit" 
//               className="submit-btn"
//               disabled={loading || !docImg || !formData.name || !formData.email}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner"></span>
//                   Adding Doctor...
//                 </>
//               ) : (
//                 'Add Doctor'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
