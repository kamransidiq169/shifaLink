import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"

export const RelatedDoctors =({docId,speciality})=>{
 const {doctors}=useContext(AppContext)
 const [relDoc,setRelDoc]=useState([])
const navigate=useNavigate()
 useEffect(()=>{
    const doctorData=doctors.filter((doc=> doc.speciality === speciality && doc._id !== docId))
         setRelDoc(doctorData)
 },[doctors,docId,speciality])

    return( <>
        <div className="doctorContainer">
            <h1>Top Doctors to Book</h1>
            <p className="dp"> Simply browse through our extensive list of trusted doctors</p>
            <div className="doctors">
                {relDoc.slice(0,5).map((doc,index)=>(
                    <div key={index} className="allDoctors" onClick={()=>{navigate(`/appointment/${doc._id}`);scrollTo(0,0)}}>
                        <img src={doc.image} alt="doctor image" />
                        <div className="doctorANS">
                               <div className="docInfo">
                             <p className="dot"></p>
                             <p className="aval">Available</p>
                        </div>
                       <div className="ns">
                         <h3>{doc.name}</h3>
                        <p>{doc.speciality}</p>
                       </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="more" onClick={() => {
  navigate("/doctors");
  window.scrollTo(0, 0);
}}>
  More
</button>
        </div>
        </>)
}