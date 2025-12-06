import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";

export const DoctorProfile = () => {
  const { profileData, getDoctorProfileData, dToken,setProfileData,backendurl } = useContext(DoctorContext);
  const [isEdit,setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) {
      getDoctorProfileData();
    }
  }, [dToken]);

  if (!profileData) return null; // ya loader laga sakte ho

  const updateProfile = async ()=>{
    const updatedData = {
        fees:profileData.fees,
        address:profileData.address,
        avaliable:profileData.avaliable
    }

     try {
        const {data} = await axios.post(backendurl + "api/doctor/updatedoctor-profile",updatedData,{headers:{dToken}})
        if(data.success){
            toast.success(data.message)
            setIsEdit(false)
            getDoctorProfileData()
        }else{
            toast.error(data.message)
        }
     } catch (error) {
        console.log(error)
     }
  }

  return (
    <div className="dp-page">
      <div className="dp-card">
        {/* Left: image */}
        <div className="dp-image-wrap">
          <img
            src={profileData.image}
            alt={profileData.name}
            className="dp-image"
          />
        </div>

        {/* Right: details */}
        <div className="dp-content">
          <h1 className="dp-name">{profileData.name}</h1>
          <div className="dp-line">
            <span className="dp-degree">{profileData.degree}</span>
            <span className="dp-speciality"> - {profileData.speciality}</span>
            <span className="dp-exp-pill">{profileData.experience}</span>
          </div>

          <div className="dp-section">
            <h3>About:</h3>
            <p className="dp-about">{profileData.about}</p>
          </div>

          <div className="dp-section">
            <p>
              <span className="dp-label">Appointment fee: </span>
              <span className="dp-value">$ {isEdit ? <input type="number" onChange={(e)=>setProfileData(prev =>({...prev,fees:e.target.value}))} value={profileData.fees} /> :profileData.fees}</span>
            </p>
          </div>

          <div className="dp-section">
            <p>
              <span className="dp-label">Address: </span>
              <span className="dp-value">
                {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev => ({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address?.line1} /> :profileData.address?.line1}
                <br />
                {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev => ({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address?.line2} /> :profileData.address?.line2}
              </span>
            </p>
          </div>

          <div className="dp-section dp-availability">
            <label>
              <input
                type="checkbox"
                onChange={()=>isEdit && setProfileData(prev => ({...prev,avaliable:!prev.avaliable}))}
                checked={profileData.avaliable}
                readOnly
              />
              <span>Available</span>
            </label>
          </div>
             {isEdit ?  <button onClick={updateProfile} className="dp-edit-btn">Save</button> : <button onClick={()=>setIsEdit(true)} className="dp-edit-btn">Edit</button>}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
