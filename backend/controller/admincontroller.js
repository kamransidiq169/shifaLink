import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
const AddDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, fees, about, address, degree, experience } = req.body
        const imageFile = req.file

        // console.log({name,email,password,fees,about,address,degree,experience},imageFile);

        // checking all details

        if (!name || !email || !password || !speciality || !fees || !about || !address || !degree || !experience) {
            return res.json({ success: false, message: "Missing details" })
        }

        // checking email

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }
 
  
        // Hashing password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

     // upload image to cloudinary

     const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
    const imageUrl = imageUpload.secure_url

    const doctorData ={
        name,
        email,
        image:imageUrl,
        speciality,
        address,
        fees,
        degree,
        password:hashedPassword,
        about,
        experience,
        address:JSON.parse(address),
        date:Date.now()
    }    

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()
    res.json({success:true,message:"doctor added"})
    } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    }
}

const LoginAdmin = async(req,res)=>{
  try {
     const {email,password}=req.body

   if(email === process.env.ADMIN_EMAIL  && password === process.env.ADMIN_PASSWORD){
       const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
       console.log("Generated token:", token);
        res.json({success:true,token})
   }else{
    res.json({success:false,message:"Invalid"})
   }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

const AllDoctors = async (req,res)=>{
    try {
        const Doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,Doctors})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const Appointments = async (req,res) =>{
   try {
    const appointments = await appointmentModel.find({})
    res.json({success:true,appointments})
   } catch (error) {
    console.log(error);
        res.json({success:false,message:error.message})
   }
}
const admincancelAppointment = async (req,res) => {
  try {
      const {appointmentId} = req.body
    
    const appointmentData = await appointmentModel.findById(appointmentId)

    

    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

    const {docId,slotData,slotTime} = appointmentData

    const docData = await doctorModel.findById(docId)

    const slots_booked = docData.slots_booked 

     if (Array.isArray(slots_booked[slotData])) {
      slots_booked[slotData] = slots_booked[slotData].filter(e => e === slotTime);
    }

    // slots_booked[slotData] = slots_booked[slotData].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    
    res.json({success:true,message:"Appointment Cancelled"})
  } catch (error) {
    console.log(error);
        res.json({ success: false, message: error.message })
  }
}

const Dashboard = async (req,res) =>{
    try {
        const doctors = await doctorModel.find({})
        const appointments = await appointmentModel.find({})
        const users = await userModel.find({})
        const dashData ={
         doctors:doctors.length,
         appointments:appointments.length,
         patients:users.length,
         latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export { AddDoctor,LoginAdmin,AllDoctors,Appointments,admincancelAppointment,Dashboard }