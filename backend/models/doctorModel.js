import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true,},
    password:{type:String,required:true},
    image:{type:String,required:true},
    speciality:{type:String,required:true},
    degree:{type:String,required:true},
    experience:{type:String,required:true},
    about:{type:String,required:true},
    avaliable:{type:Boolean,default:true},
    fees:{type:Number,required:true},
    date:{type:Number,required:true},
    slots_booked:{type:Object,default:{}},
},{minimize:false}) /// when you write minimize false than after you will write defalt value empty object

const doctorModel= mongoose.models.doctor || mongoose.model('doctor',doctorSchema)

export default doctorModel