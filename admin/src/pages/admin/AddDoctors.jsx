import React, { useContext, useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
export const AddDoctors = () => {
  const { backendUrl, aToken } = useContext(AdminContext)

  const [docImg,setdocImg] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [speciality,setSpeciality] = useState('General Physician')
  const [degree,setDegree] = useState('')
  const [about,setAbout] = useState('')
  const [fees,setFees] = useState('')
  const [experience,setExperience] = useState('1 Year')
  const [address1,setAddress1] = useState('')
  const [address2,setAddress2] = useState('')



  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

      if (!docImg) {
        toast.error("Image not selected")
      }

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address', JSON.stringify({ line1:address1, line2:address2 }))
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)

      formData.forEach((key, value) => {
        console.log(`${value}:${key}`);

      })

       const {data}= await axios.post(backendUrl + 'api/admin/add-doctor',formData,{headers:{aToken}})

      console.log(data);
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);

    }

  };

  return (
    <div className="add-doctor-container">
      <h2 className="form-title">Add Doctor</h2>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="upload-section">
            <label htmlFor="upload-input" className="upload-circle">
              <img src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="" />
            </label>
            <input
              
              type="file"
              id="upload-input"
              onChange={(e)=>setdocImg(e.target.files[0])}
              style={{ display: "none" }}
            />
            <p>Upload doctor picture</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Doctor name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Speciality</label>
              <select
                name="speciality"
                value={speciality}
                onChange={(e)=>setSpeciality(e.target.value)}
              >
                <option value="">Select speciality</option>
                <option value="General physician">General physician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
              </select>
            </div>

            <div className="form-group">
              <label>Doctor Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Education</label>
              <input
                type="text"
                name="degree"
                placeholder="Education"
                value={degree}
                onChange={(e)=>setDegree(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Doctor Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <div className="form-group address-group">
              <label>Address</label>
              <input
                type="text"
                name="address1"
                placeholder="Address 1"
                value={address1}
                onChange={(e)=>setAddress1(e.target.value)}
              />
              <input
                type="text"
                name="address2"
                placeholder="Address 2"
                value={address2}
                onChange={(e)=>setAddress2(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Experience</label>
              <select
                name="experience"
                value={experience}
                onChange={(e)=>setExperience(e.target.value)}
              >
                <option value="">Experience</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3+ Years">3+ Years</option>
              </select>
            </div>

            <div className="form-group">
              <label>Fees</label>
              <input
                type="number"
                name="fees"
                placeholder="Your fees"
                value={fees}
                onChange={(e)=>setFees(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>About me</label>
            <textarea
              name="about"
              rows="3"
              placeholder="Write about yourself"
              value={about}
              onChange={(e)=>setAbout(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};
