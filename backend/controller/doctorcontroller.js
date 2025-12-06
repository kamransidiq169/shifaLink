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
const getAppointments = async (req,res) =>{
   try {
      const {docId} = req.body
      const appointments = await appointmentModel.find({docId})
      res.json({success:true,appointments})
   } catch (error) {
      console.log(error);
    res.json({success:false,message:error.message})
   }
}
const completeAppointment = async(req,res) =>{
  try {
    const {docId,appointmentId} = req.body

   const appointmentData = await appointmentModel.findById(appointmentId)

   if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
      return res.json({success:true,message:"Appointment completed"})
   }
  } catch (error) {
   console.log(error);
    res.json({success:false,message:error.message})
  }
}
const cancelAppointment = async(req,res) =>{
  try {
    const {docId,appointmentId} = req.body

   const appointmentData = await appointmentModel.findById(appointmentId)

   if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
      return res.json({success:true,message:"Appointment cancelled"})
   }
  } catch (error) {
   console.log(error);
    res.json({success:false,message:error.message})
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