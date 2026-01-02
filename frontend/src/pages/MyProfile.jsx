// MyProfile.jsx - ✅ LOADING STATE Added
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {assets} from '../assets/assets_frontend/assets.js'
import axios from "axios";

export const MyProfile = () => {
  const { userData, setUserData,backendUrl,token,loadProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image,setImage]= useState(false)
  const [loading, setLoading] = useState(false) // ✅ NEW Loading State
  
  if (!userData) return null;

   const updateProfileData = async()=>{
    try {
        setLoading(true) // ✅ Start Loading
        
        const formdata = new FormData()
        formdata.append('name',userData.name)
        formdata.append('phone',userData.phone)
        formdata.append('dob',userData.dob)
        formdata.append('gender',userData.gender)
        formdata.append('address',JSON.stringify(userData.address))
        if(image) formdata.append('image',image)

         const {data} = await axios.post(backendUrl + 'api/user/update-profile',formdata,{
           headers:{ 
             'Content-Type': 'multipart/form-data',
             token 
           }
         })
          
         if(data.success){
            console.log('✅ Profile updated successfully');
            
            if(loadProfileData && typeof loadProfileData === 'function') {
              await loadProfileData();
            }
            
            setIsEdit(false)
            setImage(false)
            alert('✅ Profile updated successfully!')
         }else{
            console.error('❌ Update failed:', data.message);
            alert(data.message || 'Update failed');
         }
    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
        alert(error.response?.data?.message || 'Something went wrong');
    } finally {
        setLoading(false) // ✅ Stop Loading
    }
   }

  return (
    <div className="profile-root">
      <div className="profile-main">
        <div className="profile-photo-row">
          <div className="profile-avatar-container">
            {isEdit ? (
              <label htmlFor="profile-file-input" className="profile-upload-label">
                <div className="profile-upload-preview">
                  <img 
                    src={image ? URL.createObjectURL(image) : userData.image} 
                    alt="Profile Preview" 
                    className="profile-preview-img"
                  />
                  <div className="profile-upload-overlay">
                    <img src={assets.upload_icon} alt="Upload" className="profile-upload-icon" />
                    <span>Change Photo</span>
                  </div>
                </div>
                <input 
                  id="profile-file-input"
                  type="file" 
                  className="profile-file-input"
                  onChange={(e)=>setImage(e.target.files[0])}
                  accept="image/*"
                  disabled={loading} // ✅ Disable during loading
                />
              </label>
            ) : (
              <img src={userData.image} alt="Profile" className="profile-avatar" />
            )}
          </div>

          {isEdit ? (
            <input
              type="text"
              className="profile-input profile-username"
              value={userData.name}
              onChange={e =>
                setUserData(prev => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter your name"
              autoFocus
              disabled={loading} // ✅ Disable during loading
            />
          ) : (
            <h1 className="profile-username">{userData.name}</h1>
          )}
        </div>

        <hr className="profile-divider" />
        
        <div className="profile-section">
          <h3 className="profile-title">Contact Information</h3>
          <div className="profile-grid">
            <label>Email</label>
            <div className="profile-value">{userData.email}</div>
            
            <label>Phone</label>
            {isEdit ? (
              <input
                type="tel"
                className="profile-input"
                value={userData.phone || ''}
                onChange={e =>
                  setUserData(prev => ({ ...prev, phone: e.target.value }))
                }
                placeholder="Enter phone number"
                disabled={loading} // ✅ Disable during loading
              />
            ) : (
              <div className="profile-value">{userData.phone || 'Not set'}</div>
            )}
            
            <label>Address</label>
            {isEdit ? (
              <div className="address-inputs">
                <input
                  type="text"
                  className="profile-input"
                  placeholder="Street Address 1"
                  value={userData.address?.line1 || ''}
                  onChange={e =>
                    setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))
                  }
                  disabled={loading} // ✅ Disable during loading
                />
                <input
                  type="text"
                  className="profile-input"
                  placeholder="Street Address 2 (Optional)"
                  value={userData.address?.line2 || ''}
                  onChange={e =>
                    setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))
                  }
                  disabled={loading} // ✅ Disable during loading
                />
              </div>
            ) : (
              <div className="profile-value">
                <div>{userData.address?.line1 || 'Not set'}</div>
                {userData.address?.line2 && <div>{userData.address.line2}</div>}
              </div>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h3 className="profile-title">Basic Information</h3>
          <div className="profile-grid">
            <label>Gender</label>
            {isEdit ? (
              <select
                className="profile-input"
                value={userData.gender || ''}
                onChange={e =>
                  setUserData(prev => ({ ...prev, gender: e.target.value }))
                }
                disabled={loading} // ✅ Disable during loading
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <div className="profile-value">{userData.gender || 'Not set'}</div>
            )}
            
            <label>Date of Birth</label>
            {isEdit ? (
              <input
                type="date"
                className="profile-input"
                value={userData.dob || ''}
                onChange={e =>
                  setUserData(prev => ({ ...prev, dob: e.target.value }))
                }
                disabled={loading} // ✅ Disable during loading
              />
            ) : (
              <div className="profile-value">{userData.dob || 'Not set'}</div>
            )}
          </div>
        </div>

        <div className="profile-btn-row">
          {isEdit ? (
            <>
              <button 
                className={`profile-btn profile-btn-save ${loading ? 'loading' : ''}`} 
                onClick={updateProfileData}
                disabled={loading} // ✅ Disable Save button
              >
                {loading ? (
                  <>
                    <span className="btn-spinner"></span>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
              <button 
                className="profile-btn profile-btn-cancel" 
                onClick={() => {
                  setIsEdit(false);
                  setImage(false);
                }}
                disabled={loading} // ✅ Disable Cancel button
              >
                 Cancel
              </button>
            </>
          ) : (
            <button className="profile-btn profile-btn-edit" onClick={() => setIsEdit(true)}>
               Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
