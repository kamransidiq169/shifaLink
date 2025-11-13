import { useState } from "react"
import { assets } from "../assets/assets_frontend/assets"

export const MyProfile = () => {
    const [userData,setUserData]=useState({
        name:"Kamran sidiq",
        image:assets.profile_pic,
        email:"kamransidiq169@gmail.com",
        phone:'7006040427',
        address:{
            line1:"Lalbazar Srinagar",
            line2:"Soura "
        },
        gender:'Male',
        dob:'2004-06-18'
    })
    const [isEdit,setIsEdit]=useState(false)
    return (
       <div className="profileContainer">
        <div>
            <img src={userData.image} alt="" />

            {isEdit?
             <input type="text" value={userData.name} onChange={e=>setUserData(prev =>({...prev,name:e.target.value}))} />:
             <p>{userData.name}</p>
            }

            <hr />

            <div>
                <p>CONTACT INFORMATION</p>
                <div>
                    <p>Email id:</p>
                    <p>{userData.email}</p>
                    <p>Phone:</p>
                    {
                        isEdit?
                        <input type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))} />:
                        <p>{userData.phone}</p>
                    }
                    <p>Address:</p>
                    {
                        isEdit?
                        <p>
                            <input type="text" onChange={e => setUserData(prev => ({...prev.address,line1:e.target.value}))} value={userData.address.line1}/>
                            <br />
                            <input type="text" onChange={e => setUserData(prev => ({...prev.address,line2:e.target.value}))} value={userData.address.line2}/>
                        </p>:
                        <p>
                            {userData.address.line1}
                            <br />
                            {userData.address.line2}
                        </p>
                    }
                </div>
            </div>
            <div>
                <p>BASIC INFORMATION</p>
                <div>
                    <p>Gender:</p>
                    {
                        isEdit?
                        <select value={userData.gender} onChange={e => setUserData(prev => ({...prev,gender:e.target.value}))}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>:
                        <p>{userData.gender}</p>
                    }
                    <p>Birthday:</p>
                    {isEdit}?
                    <input type="date" onChange={e => setUserData(prev => ({...prev,gender:e.target.value}))}/>:
                    <p>{userData.dob}</p>
                </div>
            </div>
        </div>
        {isEdit ?<button onClick={()=>setIsEdit(false)}>Save Information</button>: <button onClick={()=>setIsEdit(true)}>Edit</button>}
       </div>
    )
}