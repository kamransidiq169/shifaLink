import { Login } from "./pages/Login"
import './App.css'
import { useContext } from "react"
import { AdminContext } from "./context/AdminContext"
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css'
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/admin/Dashboard.jsx";
import { AddDoctors } from "./pages/admin/AddDoctors.jsx";
import { AllAppointments } from "./pages/admin/AllAppointments.jsx";
import { DoctorsList } from "./pages/admin/DoctorsList.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";
import DoctorAppointment from "./pages/doctor/DoctorAppointment.jsx";
import DoctorProfile from "./pages/doctor/DoctorProfile.jsx";
const App =()=>{
  const{aToken}=useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)
  return aToken || dToken ? (
    <div>
      <ToastContainer/>
      <Navbar/>
       <div style={{display:"flex"}}>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<></>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/add-doctor" element={<AddDoctors/>}/>
          <Route path="/all-appointments" element={<AllAppointments/>}/>
          <Route path="/doctor-list" element={<DoctorsList/>}/>

          {/* Doctor Routes */}

          <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
          <Route path="/doctor-appointment" element={<DoctorAppointment/>}/>
          <Route path="/doctor-profile" element={<DoctorProfile/>}/>

        </Routes>
       </div>
    </div>
  ):(
    <>
     <Login/>
      <ToastContainer/>
    </>
  )
}

export default App