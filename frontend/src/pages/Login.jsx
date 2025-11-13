import { useState } from "react"

export const Login = () => {
    const [state,setState]=useState('sign up')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const onSubmitfunction=async(e)=>{
          e.preventDefault()
    }  
    return (
      <div className="loginContainer">
         <form className="loginform">
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
            <button className="cl">{state==='sign up'?'Create Account':'Login'}</button>
            {state==='sign up' ? <p style={{color:"rgba(68, 68, 68, 1)"}}>Already have an account? <span onClick={()=>setState("login")} className="login">Login here</span></p>: <p style={{color:"rgba(68, 68, 68, 1)"}}>Create a new account? <span onClick={()=>setState('sign up')} className="signup">Click here</span></p>}
            </div>
         </form>
      </div>
    )
}