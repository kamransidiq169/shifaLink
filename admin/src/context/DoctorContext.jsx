import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
    const [dToken, setDToken] = useState(localStorage.getItem('dToken'))
    const [appointments, setAppointments] = useState([])
    const [dashData,setDashData] = useState([])
    const [profileData,setProfileData] = useState(false)
    const backendurl = import.meta.env.VITE_BACKENDURL

    const getDoctorAppointment = async (req, res) => {
        try {
            const { data } = await axios.get(backendurl + 'api/doctor/appointments', { headers: { dToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);

        }
    }
     const getdashData = async ()=>{
        try {
            const {data} = await axios.get(backendurl + "api/doctor/doctor-dashboard", {headers:{dToken}})
          if(data.success){
            setDashData(data.dashData)
          }else{
            toast.error(data.message)
          }
        } catch (error) {
         console.log(error);   
        }
    }
    const completeAppointment = async (appointmentId) => {
        try {
        const {data} = await axios.post(backendurl + 'api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
        if(data.success){
            toast.success(data.message)
            getDoctorAppointment()
            getdashData()
        }else{
            toast.error(data.message)
        }
        } catch (error) {
            console.log(error);

        }
    }

        const cancelAppointment = async (appointmentId) => {
        try {
        const {data} = await axios.post(backendurl + 'api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
        if(data.success){
            toast.success(data.message)
            getDoctorAppointment()
            getdashData()
        }else{
            toast.error(data.message)
        }
        } catch (error) {
            console.log(error);

        }
    }


    const getDoctorProfileData = async () =>{
       try {
        const {data} = await axios.get(backendurl + 'api/doctor/getdoctor-profile',{headers:{dToken}})
        if(data.success){
            setProfileData(data.profileData)
            console.log(data.profileData);
            
        }else{
            toast.error(data.message)
        }
       } catch (error) {
           console.log(error);
       }
    }
   
    const value = { dToken, setDToken, backendurl, appointments, getDoctorAppointment,completeAppointment,cancelAppointment,dashData,getdashData,profileData,getDoctorProfileData,setProfileData }
    return <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>
}

export default DoctorContextProvider