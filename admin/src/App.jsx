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
const App =()=>{
  const{aToken}=useContext(AdminContext)
  return aToken ? (
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