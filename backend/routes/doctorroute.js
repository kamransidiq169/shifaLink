import { Router } from 'express'
import { cancelAppointment, completeAppointment, doctorDashboard, doctorList, doctorLogin, getAppointments, getProfileData, updateProfileData } from '../controller/doctorcontroller.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter = Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post("/login",doctorLogin)
 doctorRouter.get("/appointments",authDoctor,getAppointments)
 doctorRouter.post("/complete-appointment",authDoctor,completeAppointment)
 doctorRouter.post("/cancel-appointment",authDoctor,cancelAppointment)
 doctorRouter.get("/doctor-dashboard",authDoctor,doctorDashboard)
 doctorRouter.get("/getdoctor-profile",authDoctor,getProfileData)
 doctorRouter.post("/updatedoctor-profile",authDoctor,updateProfileData)
export default doctorRouter