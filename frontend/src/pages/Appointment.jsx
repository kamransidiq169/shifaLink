import { useContext, useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
// import { RelatedDoctors } from "../components/RelatedDoctors"
import { toast } from 'react-toastify'
import axios from "axios"

export const Appointment = () => {
  const [docInfo, setdocInfo] = useState(null)
  const [docSlots, setdocSlots] = useState([])
  const [slotIndex, setslotIndex] = useState(0)
  const [slotTime, setslotTime] = useState('')
  const [loading, setLoading] = useState(true)

  const { docId } = useParams()
  const { doctors, currency, token, backendUrl, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  // ✅ ORIGINAL DOCTOR FINDER
  const findDoctorbyId = useCallback(async () => {
    const doc = doctors.find(doc => doc._id === docId)
    setdocInfo(doc)
    setLoading(false)
  }, [doctors, docId])

  // ✅ ORIGINAL SLOTS LOGIC (FIXED)
  const getAvailableSlots = useCallback(async () => {
    if (!docInfo) return
    
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
      setdocSlots(prev => [...prev, timeSlots])
    }
  }, [docInfo])

  // ✅ ORIGINAL BOOKING (ENHANCED)
  const bookAppointment = useCallback(async () => {
    if (!token) {
      toast.warn("Login to book appointment")
      navigate("/login")
      return
    }

    if (!slotTime) {
      toast.error("Please select time slot")
      return
    }

    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      const slotDate = `${day}_${month}_${year}`

      const { data } = await axios.post(
        backendUrl + 'api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate("/my-appointments")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Booking failed. Try again.")
      console.error(error)
    }
  }, [token, docId, slotTime, slotIndex, docSlots, backendUrl, navigate, getDoctorsData])

  // ✅ EFFECTS (ORIGINAL FLOW)
  useEffect(() => {
    findDoctorbyId()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [findDoctorbyId])

  useEffect(() => {
    if (docInfo) getAvailableSlots()
  }, [getAvailableSlots])

  if (loading || !docInfo) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading doctor details...</p>
      </div>
    )
  }

  return (
    <div className="appointment-wrapper">
      {/* ✅ DOCTOR INFO CARD */}
      <div className="appointDoctorContainer">
        <div className="appointmentDoctorImage">
          <img src={docInfo.image} alt={docInfo.name} />
          <div className="image-overlay"></div>
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
          <p className="fee-line">
            Appointment fee: <span className="fees">{currency}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* ✅ BOOKING SLOTS (ORIGINAL STRUCTURE) */}
      <div className="bookingContainer">
        <h3>Booking Slots</h3>
        <div className="bookingSlots">
          {/* ✅ DAYS */}
          <div className="daydateContainer">
            {docSlots.length > 0 && docSlots.map((item, index) => (
              <div 
                key={index}
                className={`insidedaydate ${slotIndex === index ? 'doctorblue' : ''}`}
                onClick={() => setslotIndex(index)}
              >
                <p>{daysofWeek[item[0]?.datetime.getDay()]}</p>
                <p>{item[0]?.datetime.getDate()}</p>
              </div>
            ))}
          </div>

          {/* ✅ TIMES */}
          <div className="timeContainer">
            {docSlots[slotIndex]?.map((item, index) => (
              <p 
                key={index}
                className={`time ${item.time === slotTime ? "doctorblue" : ''}`}
                style={{ width: "200px" }}
                onClick={() => setslotTime(item.time)}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          {/* ✅ BOOK BUTTON */}
          <button 
            className={`book ${!slotTime ? 'disabled' : ''}`}
            onClick={bookAppointment}
            disabled={!slotTime}
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* ✅ RELATED DOCTORS */}
      {/* <RelatedDoctors docId={docId} speciality={docInfo.speciality} /> */}
    </div>
  )
}
