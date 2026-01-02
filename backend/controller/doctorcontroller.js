import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
 const changeAvailablity = async (req,res) => {
 try {
    const {docId} = req.body

    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId,{avaliable:!docData.avaliable})
    res.json({success:true,message:"Availablity Changed"})
 } catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message})
 }
}

const doctorList = async(req,res)=>{
 try {
    const doctors= await doctorModel.find({}).select(['-password','-email'])
    res.json({success:true,doctors})
 } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
 }
}

const doctorLogin = async(req,res) =>{
   try {
      const{email,password} = req.body
      const doctorData = await doctorModel.findOne({email})
       
      if(!doctorData){
         res.json({success:false,message:"Invalid Credentials"})
      }

      const match = await bcrypt.compare(password,doctorData.password)

      if(match){
        const token = jwt.sign({id:doctorData._id},process.env.JWT_SECRET)
        res.json({success:true,token})
      }else{
       res.json({success:false,message:"invalid credentials"})
      }
   } catch (error) {
      console.log(error);
    res.json({success:false,message:error.message})
   }
}
const getAppointments = async (req, res) => {
  try {
    const { docId } = req.body

    if (!docId) {
      return res.json({ success: false, message: "Doctor ID missing" })
    }

    const appointments = await appointmentModel.find({ docId }).sort({ date: -1 })

    return res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: error.message })
  }
}
const completeAppointment = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body

    if (!docId || !appointmentId) {
      return res.json({ success: false, message: "Missing fields" })
    }

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (!appointmentData || appointmentData.docId !== docId) {
      return res.json({ success: false, message: "Appointment not found" })
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true
    })

    return res.json({ success: true, message: "Appointment completed" })
  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: error.message })
  }
}

const cancelAppointment = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body

    if (!docId || !appointmentId) {
      return res.json({ success: false, message: "Missing fields" })
    }

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (!appointmentData || appointmentData.docId !== docId) {
      return res.json({ success: false, message: "Appointment not found" })
    }

    // original slot values save karo
    const origSlotDate = appointmentData.slotDate
    const origSlotTime = appointmentData.slotTime

    // 1) appointment ko cancel mark karo
    appointmentData.cancelled = true
    await appointmentData.save()

    // 2) doctor ke slots_booked se slot hatao
    if (origSlotDate && origSlotTime) {
      const doctor = await doctorModel.findById(docId)

      if (doctor && doctor.slots_booked) {
        const daySlots = doctor.slots_booked[origSlotDate]

        if (Array.isArray(daySlots)) {
          const newDaySlots = daySlots.filter(t => t !== origSlotTime)
          if (newDaySlots.length > 0) {
            doctor.slots_booked[origSlotDate] = newDaySlots
          } else {
            delete doctor.slots_booked[origSlotDate]
          }

          await doctor.save()
          console.log("✅ DOCTOR SLOT REOPENED (DOC PANEL):", origSlotDate, origSlotTime)
        } else {
          console.log("ℹ️ slots_booked[slotDate] array nahi hai:", origSlotDate)
        }
      }
    }

    return res.json({ success: true, message: "Appointment cancelled" })
  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: error.message })
  }
}

const doctorDashboard = async(req,res) =>{
   try {
     const {docId} = req.body 
     const appointmentData = await appointmentModel.find({docId})

     let earning = 0
       
      appointmentData.map((item)=>{
         if(item.isCompleted || item.payment){
            earning += item.amount
         }
      })

      let patients = []

        appointmentData.map((item)=>{
         if(!patients.includes(item.userId)){
            patients.push(item.userId)
         }
        })

        let dashData = {
         earning,
         appointmentData:appointmentData.length,
         patients:patients.length,
         latestappointments: appointmentData.reverse().slice(0,5)
        }
    res.json({success:true,dashData})
   } catch (error) {
      console.log(error);
    res.json({success:false,message:error.message})
   }
}

const getProfileData = async (req,res) =>{
  try {
      const {docId} = req.body
    const profileData = await doctorModel.findById(docId).select("-password")
    res.json({success:true,profileData})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }  
}

const updateProfileData = async(req,res) =>{
   try {
      const {docId,fees,avaliable,address} = req.body
      await doctorModel.findByIdAndUpdate(docId,{fees,avaliable,address})
      res.json({success:true,message:"Profile updated"})
   } catch (error) {
      console.log(error);
    res.json({success:false,message:error.message})
   }
}
export {changeAvailablity,doctorList,doctorLogin,getAppointments,completeAppointment,cancelAppointment,doctorDashboard,getProfileData,updateProfileData}