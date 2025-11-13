
import { Router } from 'express'
import { AddDoctor, LoginAdmin } from '../controller/admincontroller.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'


const adminRouter = Router()


adminRouter.post('/add-doctor',authAdmin,upload.single('image'),AddDoctor)
adminRouter.post('/login',LoginAdmin)


export default adminRouter