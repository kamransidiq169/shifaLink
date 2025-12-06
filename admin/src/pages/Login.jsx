import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from "../context/DoctorContext";
export const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setaToken, backendUrl } = useContext(AdminContext)
  const { setDToken, backendurl } = useContext(DoctorContext)


  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendurl}api/admin/login`, { email, password });

        if (data.success) {
          console.log(data.token);

          localStorage.setItem('aToken', data.token)
          setaToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(`${backendUrl}api/doctor/login`, { email, password });

        if (data.success) {
          console.log(data.token);

          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
        } else {
          toast.error(data.message)
        }

      }

    } catch (error) {
      console.log(error);

    }

  }

  return (

    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-header">
          {state} <span>Login</span>
        </h2>

        <form className="login-form" onSubmit={onSubmitHandler}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="switch-text">
          {state === "Admin" ? (
            <>
              Doctor Login?{" "}
              <span onClick={() => setState("Doctor")}>Click here</span>
            </>
          ) : (
            <>
              Admin Login?{" "}
              <span onClick={() => setState("Admin")}>Click here</span>
            </>
          )}
        </p>
      </div>
    </div>

  );
};
