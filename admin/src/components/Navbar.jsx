import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";


export const Navbar = () => {
  const { aToken, setaToken } = useContext(AdminContext);
  const {setDToken} = useContext(DoctorContext)
  const navigate = useNavigate();

  const Logout = () => {
    navigate("/");
    if (aToken) {
      setaToken("");
      localStorage.removeItem("aToken");
    }else{
      setDToken("")
       localStorage.removeItem("dToken");
    }
  };

  return (
    <div className="navbarContainer">
      <div className="navbar-left">
        <div className="brand">
          <h1 style={{color:"blue"}}>ShifaLink</h1>
          <p>Dashboard Panel</p>
        </div>
        <span className="role-badge">{aToken ? "Admin" : "Doctor"}</span>
      </div>

      <div className="navbar-right">
        <button onClick={Logout}>Logout</button>
      </div>
    </div>
  );
};
