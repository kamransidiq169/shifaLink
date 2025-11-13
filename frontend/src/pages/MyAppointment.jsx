import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export const MyAppointment = () => {
    const {doctors}=useContext(AppContext)
    return (
        <div className="appointmentContainer">
            <h2>My appointments</h2>
            
       <div className="dac">
        {doctors.slice(0,3).map((item,index)=>(
           <div className="allInfo">
             <div className="docimgandinfo">
                <div className="docimage">
                <img src={item.image} alt="doctor image" />
                </div>
                <div className="docinformation">
                 <h3 style={{fontWeight:500,fontSize:'21px'}}>{item.name}</h3>
                 <p>{item.speciality}</p>
                 <p style={{fontWeight:500}}>Address:</p>
                 <p>{item.address.line1}</p>
                 <p>{item.address.line2}</p>
                 <p><span style={{fontWeight:500}}>Date & Time : </span>25,july,2024 | 8:30pm</p>
                </div>
            </div>
             
             <div className="payCancel">
               <button className="pay">Pay Online</button>
               <button className="cancel">Cancel Appointment</button>
             </div>
             
           </div>
        ))}
       </div>
        </div>
    )
}