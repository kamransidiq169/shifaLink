import { Routes,Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Doctors } from "./pages/Doctors";
import { Login } from "./pages/Login";
import { Contact } from "./pages/Contact";
import { MyProfile } from "./pages/MyProfile";
import { MyAppointment } from "./pages/MyAppointment";
import { Appointment } from "./pages/Appointment";
import { Navbar } from "./components/Navbar";
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css'
import "./App.css"
import { Footer } from "./components/Footer";
import DoctorsByPharmacy from "./pages/doctorsByPharmacy";
import PharmacyAppointments from "./pages/pharmacyAppointment";
import TopPharmacies from "./components/TopPharmacies";



const App=()=>{
  return (<div className="homeContainer">
  <Navbar/>
  <ToastContainer/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/doctors" element={<Doctors/>}/>
    <Route path="/doctors/:speciality" element={<Doctors/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/my-profile" element={<MyProfile/>}/>
    <Route path="/my-appointments" element={<MyAppointment/>}/>
    <Route path="/appointment/:docId" element={<Appointment/>}/>
    <Route path="/pharmacies" element={<TopPharmacies/>}/>
    <Route path="/pharmacies/:pharmacyId" element={<DoctorsByPharmacy/>}/>
    <Route path="/pharmacyappointment/:docId" element={<PharmacyAppointments/>}/>
  </Routes>
  <Footer/>
  
 </div> )
}

export default App;