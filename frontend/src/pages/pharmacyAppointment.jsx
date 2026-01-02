import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { RelatedDoctors } from "../components/RelatedDoctors"
import { toast } from "react-toastify"
import axios from "axios"

export const PharmacyAppointments = () => {
  const [docInfo, setdocInfo] = useState(null)
  const [docSlots, setdocSlots] = useState([])
  const [slotIndex, setslotIndex] = useState(0)
  const [slotTime, setslotTime] = useState("")

  const { docId } = useParams()
  const navigate = useNavigate()

  const {
    currency,
    token,
    backendUrl,
    getDoctorsData,
    doctors,
    userData
  } = useContext(AppContext)

  const daysofWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  const makeDateKey = date =>
    `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

  // ---- doctor pick from context ----
  const findDoctorbyId = () => {
    if (!doctors?.length) return
    const doc = doctors.find(d => String(d._id) === String(docId))
    setdocInfo(doc || null)
  }

  // doctors change ya docId change -> docInfo refresh
  useEffect(() => {
    if (doctors?.length > 0) {
      findDoctorbyId()
    }
  }, [doctors, docId])

  // docInfo change -> slots recalc
  useEffect(() => {
    if (docInfo?.availability?.length > 0) {
      getAvailableSlots()
    } else {
      setdocSlots([])
      setslotIndex(0)
      setslotTime("")
    }
  }, [docInfo])

  // ---- slots generator ----
  const getAvailableSlots = () => {
    if (!docInfo) return

    const docAvailability = docInfo.availability
    if (!docAvailability || !docAvailability.length) return

    const today = new Date()
    const upcomingWeek = []

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const currentDayName = daysofWeek[currentDate.getDay()]
      const dayAvailability = docAvailability.find(
        slot => slot.day === currentDayName
      )

      if (!dayAvailability) continue

      const [fromHour, fromMin] = dayAvailability.from.split(":").map(Number)
      const [toHour, toMin] = dayAvailability.to.split(":").map(Number)

      let slotStart = new Date(currentDate)
      slotStart.setHours(fromHour, fromMin, 0, 0)

      const endTime = new Date(currentDate)
      endTime.setHours(toHour, toMin, 0, 0)

      // first day -> past time skip
      if (i === 0 && slotStart < today) {
        slotStart = new Date(Math.max(slotStart.getTime(), today.getTime()))
        slotStart.setMinutes(Math.ceil(slotStart.getMinutes() / 30) * 30)
      }

      const timeSlots = []
      const slotDateStr = makeDateKey(currentDate)

      while (slotStart < endTime) {
        const formattedTime = slotStart.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        })

        let isBooked = false

        if (docInfo?.slots_booked?.[slotDateStr]) {
          const dateSlots = docInfo.slots_booked[slotDateStr]

          if (Array.isArray(dateSlots)) {
            isBooked = dateSlots.includes(formattedTime)
          } else if (dateSlots && dateSlots[formattedTime]) {
            isBooked = true
          }
        }

        timeSlots.push({
          datetime: new Date(slotStart),
          time: formattedTime,
          day: currentDayName,
          date: slotDateStr,
          dateObj: currentDate,
          available: !isBooked,
          booked: isBooked
        })

        slotStart.setMinutes(slotStart.getMinutes() + 30)
      }

      if (timeSlots.length > 0) {
        upcomingWeek.push({
          dateObj: currentDate,
          slots: timeSlots,
          dayName: currentDayName
        })
      }
    }

    setdocSlots(upcomingWeek)
    if (upcomingWeek.length > 0) {
      setslotIndex(0)
      setslotTime("")
    }
  }

  // ---- booking ----
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment")
      return navigate("/login")
    }

    if (!slotTime || !docSlots[slotIndex]) {
      toast.error("Please select date and time")
      return
    }

    if (!userData?._id) {
      toast.error("User not loaded, please login again")
      return
    }

    try {
      const selectedSlot = docSlots[slotIndex].slots.find(
        s => s.time === slotTime
      )
      if (!selectedSlot?.available) {
        toast.error("Slot not available")
        return
      }

      const slotDate = selectedSlot.date
      const slotTimeToSend = selectedSlot.time

      const { data } = await axios.post(
        backendUrl + "api/user/book-appointment",
        {
          docId,
          userId: userData._id,
          slotDate,
          slotTime: slotTimeToSend
        },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)

        // MongoDB se latest doctor + slots
        await getDoctorsData()

        // getDoctorsData doctors ko update karega,
        // doctors change -> findDoctorbyId -> docInfo update -> getAvailableSlots
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log("❌ Book appointment error:", error.response?.data || error)
      toast.error(error.response?.data?.message || "Failed to book appointment")
    }
  }

  if (!doctors?.length)
    return <div className="loading">Loading doctors...</div>

  if (!docInfo)
    return <div className="loading">Doctor not found: {docId}</div>

  return (
    <>
      <div className="appointDoctorContainer">
        <div className="appointmentDoctorImage">
          <img src={docInfo.image} alt={docInfo.name} />
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
          <p>
            Pharmacy: <strong>{docInfo.pharmacy}</strong>
          </p>
          <p>
            Fee:{" "}
            <span className="fees">
              {currency}
              {docInfo.fees}
            </span>
          </p>

          <div style={{ marginTop: "10px" }}>
            <strong>📅 Schedule:</strong>
            {docInfo.availability?.map((slot, idx) => (
              <span
                key={idx}
                style={{
                  marginLeft: "10px",
                  background: "#e7f3ff",
                  padding: "2px 8px",
                  borderRadius: "4px"
                }}
              >
                {slot.day} ({slot.from}-{slot.to})
              </span>
            ))}
            <br />
            <small style={{ color: "#28a745" }}>
              📊
              {docSlots.reduce(
                (total, day) =>
                  total + day.slots.filter(s => s.available).length,
                0
              )}{" "}
              available slots found
            </small>
          </div>
        </div>
      </div>

      <div className="bookingContainer">
        <h3>Available Slots ({docSlots.length} days)</h3>
        {docSlots.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#666"
            }}
          >
            No slots available for this doctor this week
          </div>
        )}
        {docSlots.length > 0 && (
          <div className="bookingSlots">
            <div className="daydateContainer">
              {docSlots.map((dayData, index) => (
                <div
                  key={index}
                  className={`insidedaydate ${
                    slotIndex === index ? "doctorblue" : "none"
                  }`}
                  onClick={() => {
                    setslotIndex(index)
                    setslotTime("")
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <p>{dayData.dayName.slice(0, 3)}</p>
                  <p>{dayData.dateObj.toLocaleDateString()}</p>
                  <small
                    style={{
                      color: dayData.slots.filter(s => s.available).length
                        ? "#28a745"
                        : "#dc3545"
                    }}
                  >
                    {dayData.slots.filter(s => s.available).length}/
                    {dayData.slots.length}
                  </small>
                </div>
              ))}
            </div>

            <div className="timeContainer">
              {docSlots[slotIndex]?.slots.map((item, index) => (
                <p
                  key={index}
                  onClick={() => item.available && setslotTime(item.time)}
                  className={`time ${
                    item.time === slotTime ? "doctorblue" : "none"
                  } ${!item.available ? "booked-slot" : ""}`}
                  style={{
                    width: "200px",
                    opacity: item.available ? 1 : 0.6,
                    cursor: item.available ? "pointer" : "not-allowed",
                    position: "relative",
                    padding: "8px 12px"
                  }}
                >
                  <span>{item.time.toLowerCase()}</span>
                </p>
              ))}
            </div>

            {slotTime && (
              <div
                style={{
                  padding: "15px",
                  background: "#d4edda",
                  borderRadius: "8px",
                  margin: "10px 0",
                  border: "1px solid #c3e6cb"
                }}
              >
                <strong style={{ color: "#155724" }}>✅ Selected:</strong>{" "}
                {slotTime} | {docSlots[slotIndex].dayName} |{" "}
                {docSlots[slotIndex].dateObj.toLocaleDateString()}
                <br />
                <strong style={{ color: "#155724" }}>💰 Fee:</strong>{" "}
                {currency}
                {docInfo.fees}
              </div>
            )}

            <button
              className="book"
              onClick={bookAppointment}
              disabled={!slotTime}
            >
              Book Appointment
            </button>
          </div>
        )}
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </>
  )
}

export default PharmacyAppointments
