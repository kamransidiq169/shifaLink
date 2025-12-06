import { useState } from "react"
import axios from 'axios'
import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const Login = () => {
    const [state,setState]=useState('sign up')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {backendUrl,token,setToken}=useContext(AppContext)
    const navigate = useNavigate()
    const onSubmitfunction=async(e)=>{
          e.preventDefault()

    
          try {
            if(state === 'sign up'){
                const {data} = await axios.post(backendUrl + 'api/user/register',{name,email,password})
                if(data.success){
                  localStorage.setItem("token",data.token)
                  setToken(data.token)
                }else{
                 console.log(data.message);
                }
            } else{
                     const {data} = await axios.post(backendUrl + 'api/user/login',{email,password})
                if(data.success){
                  localStorage.setItem("token",data.token)
                  setToken(data.token)
                }else{
                 console.log(data.message);
                }
            }
          } catch (error) {
            console.log(error);
            
          }
    }  

    useEffect(()=>{
        if(token){
            navigate("/")
        }
    },[token])
    return (
      <div className="loginContainer">
         <form className="loginform" onSubmit={onSubmitfunction}>
            <div className="headDiv">
               <h2> {state==="sign up" ? 'Create Account' : 'Login'}</h2>
              <p style={{color:"rgba(68, 68, 68, 1)"}}>Please {state==="sign up" ? 'create account' : 'log in'} to book appointment</p>
              {state === 'sign up' && <div>
                <p style={{color:"rgba(68, 68, 68, 1)"}}>Full Name</p>
                <input type="text" onChange={(e)=>setName(e.target.value)} value={name} required />
            </div> }
            
            <div>
                <p style={{color:"rgba(68, 68, 68, 1)"}}>Email</p>
                <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} required />
            </div>
            <div>
                <p style={{color:"rgba(68, 68, 68, 1)"}}>Password</p>
                <input type="text" onChange={(e)=>setPassword(e.target.value)} value={password} required />
            </div>
            <button type="submit" className="cl">{state==='sign up'?'Create Account':'Login'}</button>
            {state==='sign up' ? <p style={{color:"rgba(68, 68, 68, 1)"}}>Already have an account? <span onClick={()=>setState("login")} className="login">Login here</span></p>: <p style={{color:"rgba(68, 68, 68, 1)"}}>Create a new account? <span onClick={()=>setState('sign up')} className="signup">Click here</span></p>}
            </div>
         </form>
      </div>
    )
}