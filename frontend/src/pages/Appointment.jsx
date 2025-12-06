import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { RelatedDoctors } from "../components/RelatedDoctors"
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from "axios"
export const Appointment = () => {

    const [docInfo, setdocInfo] = useState(null)
    const [docSlots, setdocSlots] = useState([])
    const [slotIndex, setslotIndex] = useState(0)
    const [slotTime, setslotTime] = useState('')

    const { docId } = useParams()
    const { doctors, currency,token,backendUrl,getDoctorsData } = useContext(AppContext)
    const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const findDoctorbyId = async () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setdocInfo(docInfo)
        console.log(docInfo);
    }

    const getAvailableSlots = async () => {
        setdocSlots([])

        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)


            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }
            let timeSlots = []
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: '2-digit' })

                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                })

                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setdocSlots((prev => ([...prev, timeSlots])))
        }
    }

    useEffect(() => {
        findDoctorbyId()
    }, [doctors, docId])

    useEffect(() => {
        getAvailableSlots()
    }, [docInfo])

    useEffect(() => {
        console.log(docSlots);

    }, [docSlots])


      const navigate = useNavigate()


    const bookAppointment =async ()=>{
      if(!token){
      toast.warn("Login to book appointment")
        navigate("/login")
      }

      try {
        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth()+1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        
        const {data} = await axios.post(backendUrl + 'api/user/book-appointment' , {docId,slotDate,slotTime},{headers:{token}})

        if(data.success){
            toast.success(data.message)
            getDoctorsData()
            // navigate("/my-appointments")
        }else{
            toast.error(data.message)
        }
        
      } catch (error) {
        console.log(error.message);
        
      }
    }
    return (
        <>
            {docInfo ? (<>
                <div className="appointDoctorContainer">
                    <div className="appointmentDoctorImage">
                        <img src={docInfo.image} alt="appointed doctor image" />
                    </div>
                    <div className="appointmentDoctorInfo">
                        <h2>{docInfo.name}</h2>
                        <div className="degspeexp">
                            <p>{docInfo.degree}</p>
                            <p>{docInfo.speciality}</p>
                            <p className="exp">{docInfo.experience}</p>
                        </div>
                        <h4>About</h4>
                        <p className="about">{docInfo.about}</p>
                        <p >Appointment fee: <span className="fees">{currency}{docInfo.fees}</span></p>
                    </div>
                </div>
                <div className="bookingContainer">
                    <h3>Booking slots</h3>
                    <div className="bookingSlots">
                        <div className="daydateContainer">
                            {docSlots.length > 0 && docSlots.map((item, index) => (
                            <div className={`insidedaydate ${slotIndex === index ? 'doctorblue' : 'none'}`} onClick={() => setslotIndex(index)}>
                                <p>{item[0] && daysofWeek[item[0].datetime.getDay()]}</p>
                                <p>{item[0] && item[0].datetime.getDate()}</p>
                            </div>

                        ))}
                        </div>

                        <div className="timeContainer">
                            {docSlots.length && docSlots[slotIndex].map((item,index)=>(
                                <p onClick={()=>setslotTime(item.time)} key={index} className={`time ${item.time === slotTime ? "doctorblue":'none'}`} style={{width:"200px"}} >
                                {item.time.toLowerCase()}
                                </p>
                            ))}
                        </div>
                        <button className="book" onClick={bookAppointment}>Book an appointment</button>
                    </div>

                    {/* relationComponent */}

                </div>
                    <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
            </>) : (
                <p>Loading doctor info...</p>
            )}
        </>
    );
}