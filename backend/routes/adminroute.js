
import { Router } from 'express'
import { AddDoctor, admincancelAppointment, AllDoctors, Appointments, Dashboard, LoginAdmin } from '../controller/admincontroller.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controller/doctorcontroller.js'



const adminRouter = Router()


adminRouter.post('/add-doctor',authAdmin,upload.single('image'),AddDoctor)
adminRouter.post('/login',LoginAdmin)
adminRouter.post('/all-doctors',authAdmin,AllDoctors)
adminRouter.post('/change-availablity',authAdmin,changeAvailablity)
adminRouter.get("/appointments",authAdmin,Appointments)
adminRouter.post("/adminCancelAppointment",authAdmin,admincancelAppointment)
adminRouter.get("/dashboard",authAdmin,Dashboard)
export default adminRouter