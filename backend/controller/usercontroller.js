import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import Razorpay from 'razorpay'
import crypto from 'crypto'
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

// const bookAppointment = async (req,res) =>{
//  try {
//        const {docId,userId,slotDate,slotTime} = req.body
    
//     const docData = await doctorModel.findById(docId).select('-password')

//     if(!docData.avaliable){
//         res.json({success:false,message:"Doctor not available"})
//     }

//     let slots_booked = docData.slots_booked

//     if(slots_booked[slotDate]){
//         if(slots_booked[slotDate].includes(slotTime)){
//           res.json({success:false,message:"Slot not available"})
//         }else{
//             slots_booked[slotDate].push(slotTime)
//         }
//     }else{
//         slots_booked[slotDate]=[]
//         slots_booked[slotDate].push(slotTime)
//     }

//     const userData = await userModel.findById(userId).select("-password")

//       delete docData.slots_booked

//       const appointmentData = {
//         userId,
//         docId,
//         userData,
//         docData,
//         amount:docData.fees,
//         slotTime,
//         slotDate,
//         date:Date.now()
//       }

//       const newAppointment = new appointmentModel(appointmentData)
//       await newAppointment.save()
//     //   await doctorModel.findByIdAndUpdate(docId,{slots_booked})
//     await doctorModel.findByIdAndUpdate(
//   docId,
//   { slots_booked: slots_booked },   // field specify karo
//   { new: true }                     // optional: updated doc return karega
// )
//       res.json({success:true,message:"Appointment Booked"})
//  } catch (error) {
//     console.log(error);
//         res.json({ success: false, message: error.message })
//  }
// }
// bookAppointment backend – yeh karo:
const bookAppointment = async (req, res) => {
  try {
    const { docId, userId, slotDate, slotTime } = req.body

    if (!docId || !userId || !slotDate || !slotTime) {
      return res.json({ success: false, message: "Missing fields" })
    }

    const docData = await doctorModel.findById(docId).select("-password")
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" })
    }
    if (!docData.avaliable) {
      return res.json({ success: false, message: "Doctor not available" })
    }

    let slots_booked = docData.slots_booked || {}

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = [slotTime]
    }

    const userData = await userModel.findById(userId).select("-password")
    if (!userData) {
      return res.json({ success: false, message: "User not found" })
    }

    const { slots_booked: _ignore, ...docDataForAppointment } =
      docData.toObject()

    const appointmentData = {
      userId,
      docId,
      userData,
      docData: docDataForAppointment,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    await new appointmentModel(appointmentData).save()
    await doctorModel.findByIdAndUpdate(docId, { slots_booked }, { new: true })

    return res.json({ success: true, message: "Appointment Booked" })
  } catch (error) {
    console.log("BOOK ERROR:", error)
    return res.json({ success: false, message: error.message })
  }
}



const getAppointmentData = async (req, res) => {
  try {
    const token = req.headers.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id

    const appointments = await appointmentModel.find({ userId })
    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);
    
    if (!appointment || appointment.cancelled) {
      return res.json({ success: false, message: appointment ? "Already cancelled" : "Appointment not found" });
    }

    const origSlotDate = appointment.slotDate;
    const origSlotTime = appointment.slotTime;
    
    console.log("🔍 CANCEL DEBUG - Original slot:", origSlotDate, origSlotTime);

    // 1) Appointment cancel mark karo
    appointment.cancelled = true;
    await appointment.save();

    // 2) CORRECT $pull - dynamic date key use karo
    if (origSlotDate && origSlotTime && appointment.docId) {
      const result = await doctorModel.updateOne(
        { 
          _id: appointment.docId,
          [`slots_booked.${origSlotDate}`]: origSlotTime  // ✅ DYNAMIC KEY
        },
        { 
          $pull: { 
            [`slots_booked.${origSlotDate}`]: origSlotTime 
          } 
        }
      );
      
      console.log("🔧 MongoDB $pull result:", result);
      
      if (result.modifiedCount === 1) {
        console.log("✅ SLOT SUCCESSFULLY REMOVED:", origSlotDate, origSlotTime);
      } else {
        console.log("⚠️ Slot not found - manual check");
        // Double-check with full doctor fetch
        const doctor = await doctorModel.findById(appointment.docId);
        console.log("📋 All slots for date:", doctor?.slots_booked?.[origSlotDate]);
      }
    }

    return res.json({ success: true, message: "Appointment cancelled! Slot reopened." });
  } catch (error) {
    console.error("❌ Cancel ERROR:", error);
    return res.json({ success: false, message: error.message });
  }
};




const createRazorpayOrder = async (req, res) => {
  try {
    console.log("🚀 CREATE ORDER CALLED");
    
    const { amount, appointmentId } = req.body;
    const token = req.headers.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id.toString();

    const appointment = await appointmentModel.findOne({ 
      _id: appointmentId, 
      userId: userId,
      cancelled: { $ne: true }
    });
    
    if (!appointment) {
      return res.json({ success: false, message: "Invalid appointment" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(appointment.amount * 100),
      currency: "INR",
      receipt: `appt_${appointmentId.slice(-10)}`,  // ✅ 40 chars max
    };

    console.log("✅ FIXED OPTIONS:", options);

    const razorpayOrder = await razorpay.orders.create(options);
    console.log("🎉 ORDER CREATED:", razorpayOrder.id);

    res.json({
      success: true,
      order: razorpayOrder,
      amount: appointment.amount,
      appointmentId
    });

  } catch (error) {
    console.log("💥 RAZORPAY ERROR:", error.error || error);
    res.json({ success: false, message: error.error?.description || "Payment failed" });
  }
};




const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                .update(sign.toString())
                                .digest('hex');

    if (expectedSign === razorpay_signature) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        payment: true,
        razorpay_order_id,
        razorpay_payment_id
      });
      res.json({ success: true, message: "Payment verified successfully!" });
    } else {
      res.json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export { registerUser, loginUser,getProfilePage,updateProfile,bookAppointment,getAppointmentData,cancelAppointment,createRazorpayOrder,verifyPayment }