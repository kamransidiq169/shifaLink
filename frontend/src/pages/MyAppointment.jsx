import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react"

export const MyAppointment = () => {
  const {backendUrl,token,getDoctorsData } = useContext(AppContext)

  const [appointments,setAppointments] = useState([])

  const getAppointmentData = async () =>{
   const {data} = await axios.get(backendUrl + 'api/user/get-appointmentdata',{headers:{token}})

   if(data.success){
    setAppointments(data.appointments.reverse())
    console.log(data);
    
   }else{
    toast.error(data.message)
   }
  }

  useEffect(()=>{
    if(token){
      getAppointmentData()
    }
  },[token])

  const cancelAppointment = async(appointmentId) =>{
    
    try {
      const {data} = await axios.post(backendUrl + 'api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getAppointmentData()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="appointmentContainer">
      <h2>My appointments</h2>

      <div className="dac">
        {appointments.map((item, index) => (
          <div className="allInfo">
            <div className="docimgandinfo">
              <div className="docimage">
                <img src={item.docData.image} alt="doctor image" />
              </div>
              <div className="docinformation">
                <h3 style={{ fontWeight: 500, fontSize: '21px' }}>{item.docData.name}</h3>
                <p>{item.docData.speciality}</p>
                <p style={{ fontWeight: 500 }}>Address:</p>
                {item.docData.address && (
                  <>
                    <p>{item.docData.address.line1}</p>
                    <p>{item.docData.address.line2}</p>
                  </>
                )}
                <p><span style={{ fontWeight: 500 }}>Date & Time : </span>{item.slotDate} |{item.slotTime}</p>
              </div>
            </div>

            <div className="payCancel">
              {!item.cancelled && <button className="pay">Pay Online</button>}
             {!item.cancelled && <button onClick={()=> cancelAppointment(item._id)} className="cancel">Cancel Appointment</button>} 
             {item.cancelled && <button style={{color:"red"}}>Appointment cancelled </button>}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}