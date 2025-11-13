import { Link } from "react-router-dom"
import { specialityData } from "../assets/assets_frontend/assets.js"
export const Speciality =()=>{
    return (<>
  <div id="speciality" className="specialityContainer" >
    <h1>Find by Speciality</h1>
     <p>Access trusted healthcare professionals across Kashmir and <br /> schedule your visit effortlessly.</p>
     <div className="specialityImages">
         {specialityData.map((item)=>(
            <Link onClick={()=>scrollTo(0,0)} to={`doctors/${item.speciality}`} className="alldoctors">
                <img src={item.image} alt="speciality image" className="simages"/>
                {/* <p style={{fontSize:"16px", }}>{item.speciality}</p> */}
                <p className="specialityText" style={{fontSize:"16px"}}>{item.speciality}</p>
            </Link>
         ))}
     </div>
  </div>
    </>)
} 