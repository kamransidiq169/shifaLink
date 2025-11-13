import { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import {useNavigate}from 'react-router-dom'
export const Doctors = () => {
    const navigate=useNavigate()
    const {speciality}=useParams()
    const {doctors}=useContext(AppContext)
    const [filterDoc,setFilterDoc]=useState([])

    const applyDoc=()=>{
     if(speciality){
        setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
     }else{
        setFilterDoc(doctors)
     }
    }

    useEffect(()=>{
        applyDoc()
    },[doctors,speciality])

    return (
       <div className="actualdoctorContainer">
        <div className="specialities">
            <p onClick={()=>speciality==="General physician" ? navigate("/doctors") : navigate("/doctors/General physician")} className={speciality==='General physician'?'blue':'none'}>General physician</p>
            <p onClick={()=>speciality==="Gynecologist" ? navigate("/doctors") : navigate("/doctors/Gynecologist")} className={speciality==='Gynecologist'?'blue':'none'}>Gynecologist</p>
            <p onClick={()=>speciality==="Dermatologist" ? navigate("/doctors") : navigate("/doctors/Dermatologist")} className={speciality==='Dermatologist'?'blue':'none'}>Dermatologist</p>
            <p onClick={()=>speciality==="Pediatricians" ? navigate("/doctors") : navigate("/doctors/Pediatricians")} className={speciality==='Pediatricians'?'blue':'none'}>Pediatricians</p>
            <p onClick={()=>speciality==="Neurologist" ? navigate("/doctors") : navigate("/doctors/Neurologist")} className={speciality==='Neurologist'?'blue':'none'}>Neurologist</p>
            <p onClick={()=>speciality==="Gastroenterologist" ? navigate("/doctors") : navigate("/doctors/Gastroenterologist")} className={speciality==='Gastroenterologist'?'blue':'none'}>Gastroenterologist</p>
        </div>
        <div className="rightDoctors">
            {filterDoc.map((doc,index)=>(
                    <div key={index} className="allDoctors" onClick={()=>navigate(`/appointment/${doc._id}`)}>
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
       </div>
    )
}