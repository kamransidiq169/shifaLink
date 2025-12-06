import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {assets} from '../assets/assets_frontend/assets.js'
import axios from "axios";
export const MyProfile = () => {
  const { userData, setUserData,backendUrl,token,loadProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image,setImage]= useState(false)
  if (!userData) return null;

   const updateProfileData = async()=>{
    try {
        const formdata = new FormData()
        formdata.append('name',userData.name)
        formdata.append('phone',userData.phone)
        formdata.append('dob',userData.dob)
        formdata.append('gender',userData.gender)
        formdata.append('address',JSON.stringify(userData.address))

         formdata.append('image',image)

         const {data} = await axios.post(backendUrl + 'api/user/update-profile',formdata,{headers:{token}})
          
         if(data.success){
            console.log('profileupdated');
            await loadProfileData
            setIsEdit(false)
            setImage(false)
         }else{
            console.error(data.message);
         }
    } catch (error) {
        console.log(error);
    }
   }

  return (
    <div className="profile-root">
      <div className="profile-main">
        <div className="profile-photo-row">
          {/* <img src={userData.image || "/default-avatar.png"} alt="Profile" className="profile-avatar" /> */}
          <div>
            {
                isEdit ?
                <label>
                  <div>
                    <img src={image ? URL.createObjectURL(image):userData.image} alt="" />
                    <img src={image ? '' : assets.upload_icon} alt="" />
                  </div>
                  <input type="file" onChange={(e)=>setImage(e.target.files[0])} hidden />
                </label>:
                <img src={userData.image} alt="" />
            }
            {isEdit ? (
              <input
                type="text"
                className="profile-input profile-username"
                value={userData.name}
                onChange={e =>
                  setUserData(prev => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <div className="profile-username">{userData.name}</div>
            )}
          </div>
        </div>
        <hr className="profile-divider" />
        <div className="profile-section">
          <div className="profile-title">Contact Info</div>
          <div className="profile-grid">
            <label>Email</label>
            <span>{userData.email}</span>
            <label>Phone</label>
            {isEdit ? (
              <input
                type="text"
                className="profile-input"
                value={userData.phone}
                onChange={e =>
                  setUserData(prev => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <span>{userData.phone}</span>
            )}
            <label>Address</label>
            {isEdit ? (
              <div>
                <input
                  type="text"
                  className="profile-input"
                  placeholder="Line 1"
                  value={userData.address.line1}
                  onChange={e =>
                    setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))
                  }
                />
                <input
                  type="text"
                  className="profile-input"
                  placeholder="Line 2"
                  value={userData.address.line2}
                  onChange={e =>
                    setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))
                  }
                />
              </div>
            ) : (
              <span>
                {userData.address.line1} <br />
                {userData.address.line2}
              </span>
            )}
          </div>
        </div>
        <div className="profile-section">
          <div className="profile-title">Basic Info</div>
          <div className="profile-grid">
            <label>Gender</label>
            {isEdit ? (
              <select
                className="profile-input"
                value={userData.gender}
                onChange={e =>
                  setUserData(prev => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span>{userData.gender}</span>
            )}
            <label>Birthday</label>
            {isEdit ? (
              <input
                type="date"
                className="profile-input"
                value={userData.dob}
                onChange={e =>
                  setUserData(prev => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <span>{userData.dob}</span>
            )}
          </div>
        </div>
        <div className="profile-btn-row">
          {isEdit ? (
            <button className="profile-btn" onClick={updateProfileData}>
              Save
            </button>
          ) : (
            <button className="profile-btn" onClick={() => setIsEdit(true)}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
