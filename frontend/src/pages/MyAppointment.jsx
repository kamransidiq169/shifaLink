import { useContext, useState, useEffect, useRef } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

export const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData, userData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState({})
  const razorpayRef = useRef(null)

  const getAppointmentData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        backendUrl + "api/user/get-appointmentdata",
        { headers: { token } }
      )

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log("📋 Appointments loaded:", data.appointments.length)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log("❌ Get appointments error:", error.response?.data)
      toast.error("Failed to load appointments")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      getAppointmentData()
    }
  }, [token])

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => {
      console.log("✅ Razorpay loaded")
    }
    document.body.appendChild(script)

    return () => {
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  const handlePayment = async (appointmentId, amount) => {
    try {
      console.log("💳 PAYMENT INIT - ID:", appointmentId, "Amount:", amount)
      setPaymentLoading(prev => ({ ...prev, [appointmentId]: true }))
      
      const { data } = await axios.post(
        backendUrl + "api/user/create-order",
        { amount, appointmentId },  // ✅ NO userId - perfect!
        { headers: { token } }
      )

      console.log("🔍 BACKEND RESPONSE:", data)  // DEBUG LOG

      if (!data.success || !data.order) {
        console.log("❌ FULL RESPONSE ERROR:", data)
        toast.error(data.message || "Failed to create payment order")
        return
      }

      // Razorpay options...
     const options = {
  key: "rzp_test_RvkpPRFGVCa2V9",  // ✅ HARDCODE karo (tumhara key)
  amount: data.amount * 100,
  currency: "INR",
  name: "ShifaLink Pharmacy",
  description: `Appointment with ${appointments.find(a => a._id === appointmentId)?.docData?.name}`,
  order_id: data.order.id,
  handler: (response) => {
    console.log("✅ RAZORPAY SUCCESS:", response)
    verifyPayment(response, appointmentId)
  },
  prefill: {
    name: userData?.name || "User",
    contact: userData?.phone || "",
  },
  theme: {
    color: "#28a745"
  }
}


      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      console.log("❌ Payment error:", error.response?.data || error)
      toast.error(error.response?.data?.message || "Payment failed")
    } finally {
      setPaymentLoading(prev => ({ ...prev, [appointmentId]: false }))
    }
  }

  const verifyPayment = async (response, appointmentId) => {
    try {
      console.log("🔄 VERIFYING PAYMENT:", response)
      const { data } = await axios.post(
        backendUrl + "api/user/verify-payment",
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          appointmentId
        },
        { headers: { token } }
      )

      if (data.success) {
        toast.success("✅ Payment successful! Appointment confirmed")
        getAppointmentData()
        getDoctorsData()
      } else {
        toast.error("Payment verification failed")
      }
    } catch (error) {
      console.log("❌ Verification error:", error.response?.data)
      toast.error("Payment verification failed")
    }
  }

  const cancelAppointment = async appointmentId => {
    try {
      console.log("🔄 Cancelling appointment:", appointmentId)
      const { data } = await axios.post(
        backendUrl + "api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        setAppointments(prev =>
          prev.map(appt =>
            appt._id === appointmentId
              ? { ...appt, cancelled: true }
              : appt
          )
        )
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log("❌ Cancel error:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Cancel failed")
    }
  }

  if (loading) {
    return (
      <div className="appointmentContainer" style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading appointments...</h2>
      </div>
    )
  }

  return (
    <div className="appointmentContainer">
      <h2>My Appointments ({appointments.length})</h2>

      <div className="dac">
        {appointments.map(item => (
          <div key={item._id} className="allInfo">
            <div className="docimgandinfo">
              <div className="docimage">
                <img src={item.docData.image} alt="doctor image" />
              </div>
              <div className="docinformation">
                <h3 style={{ fontWeight: 500, fontSize: "21px" }}>
                  {item.docData.name}
                </h3>
                <p>{item.docData.speciality}</p>
                <p style={{ fontWeight: 500 }}>
                  Pharmacy: {item.docData.pharmacy}
                </p>
                <p style={{ fontWeight: 500 }}>Address:</p>
                {item.docData.address && (
                  <>
                    <p>{item.docData.address.line1}</p>
                    <p>{item.docData.address.line2}</p>
                  </>
                )}
                <p>
                  <span style={{ fontWeight: 500 }}>Date &amp; Time:</span>
                  <strong>
                    {" "}
                    {item.slotDate} | {item.slotTime}
                  </strong>
                </p>
                <p>
                  <span style={{ fontWeight: 500 }}>Status:</span>
                  <span
                    style={{
                      color: item.cancelled ? "#dc3545" : "#28a745",
                      fontWeight: "bold"
                    }}
                  >
                    {item.cancelled ? "Cancelled" : "Active"}
                  </span>
                </p>
                <p>
                  <span style={{ fontWeight: 500 }}>Fee:</span> ₹
                  {item.docData.fees}
                </p>
              </div>
            </div>

            <div className="payCancel">
              {!item.cancelled ? (
                <>
                  <button 
                    className="pay"
                    onClick={() => handlePayment(item._id, item.docData.fees)}
                    disabled={paymentLoading[item._id]}
                    style={{
                      background: paymentLoading[item._id] ? "#6c757d" : "#28a745",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: paymentLoading[item._id] ? "not-allowed" : "pointer"
                    }}
                  >
                    {paymentLoading[item._id] ? "Processing..." : `💳 Pay ₹${item.docData.fees}`}
                  </button>
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="cancel"
                    style={{ 
                      marginLeft: "10px",
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: paymentLoading[item._id] ? "not-allowed" : "pointer"
                    }}
                    disabled={paymentLoading[item._id]}
                  >
                    Cancel Appointment
                  </button>
                </>
              ) : (
                <button
                  className="cancelled"
                  style={{
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px"
                  }}
                  disabled
                >
                  ✅ Cancelled
                </button>
              )}
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            <p>No appointments booked yet.</p>
            <p>Book your first appointment from doctor profiles!</p>
          </div>
        )}
      </div>
    </div>
  )
}
