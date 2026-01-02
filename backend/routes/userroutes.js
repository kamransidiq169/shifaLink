import { Router } from 'express'
import { bookAppointment, cancelAppointment, createRazorpayOrder, getAppointmentData, getProfilePage, loginUser, registerUser, updateProfile, verifyPayment } from '../controller/usercontroller.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'
const userRouter = Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/get-profile",authUser,getProfilePage)
userRouter.post("/update-profile",upload.single("image"),authUser,updateProfile)
userRouter.post("/book-appointment",authUser,bookAppointment)
userRouter.get("/get-appointmentdata",authUser,getAppointmentData)
userRouter.post("/cancel-appointment",authUser,cancelAppointment)
// paymentRoutes.js
userRouter.post("/create-order", authUser, createRazorpayOrder);
userRouter.post("/verify-payment", verifyPayment);

export default userRouter