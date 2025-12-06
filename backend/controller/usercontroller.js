import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.json({ success: false, message: "Please fill the details" })
        }

        if (!validator.isEmail(email)) {
            res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            res.json({ success: false, message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Account doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const getProfilePage = async(req,res) => {

    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId).select("-password")

        res.json({ success: true, userData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const updateProfile = async (req,res) =>{
   try {
     const {userId,name,phone,address,dob,gender} = req.body
     const imageFile = req.file

     if(!name || !phone || !dob || !gender){
        res.json({ success: false, message:"Data Missing"})
     }

     await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

     if(imageFile){
        // image upload to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        await userModel.findByIdAndUpdate(userId,{image:imageUrl})
     }
     res.json({success:true,message:'profile updated'})
   } catch (error) {
    console.log(error);
        res.json({ success: false, message: error.message })
   }
}

const bookAppointment = async (req,res) =>{
 try {
       const {docId,userId,slotDate,slotTime} = req.body
    
    const docData = await doctorModel.findById(docId).select('-password')

    if(!docData.avaliable){
        res.json({success:false,message:"Doctor not available"})
    }

    let slots_booked = docData.slots_booked

    if(slots_booked[slotDate]){
        if(slots_booked[slotDate].includes(slotTime)){
          res.json({success:false,message:"Slot not available"})
        }else{
            slots_booked[slotDate].push(slotTime)
        }
    }else{
        slots_booked[slotDate]=[]
        slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select("-password")

      delete docData.slots_booked

      const appointmentData = {
        userId,
        docId,
        userData,
        docData,
        amount:docData.fees,
        slotTime,
        slotDate,
        date:Date.now()
      }

      const newAppointment = new appointmentModel(appointmentData)
      await newAppointment.save()
    //   await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    await doctorModel.findByIdAndUpdate(
  docId,
  { slots_booked: slots_booked },   // field specify karo
  { new: true }                     // optional: updated doc return karega
)
      res.json({success:true,message:"Appointment Booked"})
 } catch (error) {
    console.log(error);
        res.json({ success: false, message: error.message })
 }
}

const getAppointmentData = async (req,res) =>{
   try {
     const {userId} = req.body

    const appointments = await appointmentModel.find({userId})

    res.json({success:true,appointments})
   } catch (error) {
    console.log(error);
        res.json({ success: false, message: error.message })
   }
}
const cancelAppointment = async (req,res) => {
  try {
      const {userId,appointmentId} = req.body
    
    const appointmentData = await appointmentModel.findById(appointmentId)

    if(appointmentData.userId !== userId){
        res.json({success:false,message:"unauthorized action"})
    }

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

// const razorpayInstance = new razorpay({
//     key_id:"",
//     key_secret:"",
// })
// const paymentRazorpay = async (req,res) =>{
//   try {
//       const {appointmentId} = req.body

//     const appointmentData = await appointmentModel.findById(appointmentId)

//     if(!appointmentData || appointmentData.cancelled){
//         return res.json({success:false,message:"Appointment Cancelled or not found"})
//     }

//     const options ={
//         amount:appointmentData.amount * 100,
//         currency:process.env.CURRENCY,
//         receipt:appointmentId
//     }

//     const order = await razorpayInstance.orders.create(options)

//     res.json({success:true,order})
//   } catch (error) {
//     console.log(error);
//         res.json({ success: false, message: error.message })
//   }
// }
export { registerUser, loginUser,getProfilePage,updateProfile,bookAppointment,getAppointmentData,cancelAppointment }