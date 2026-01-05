import { useContext } from "react"
import { AdminContext } from "../../context/AdminContext"
import { useEffect } from "react"


export const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors,changeAvailablity} = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    }, [aToken])

    return (<>
        <div className="doctors-list-container">
            {doctors && doctors.map((item) => (
                <div className="doctor-card" key={item._id}>
                    <img src={item.image} alt={item.name} className="doctor-image" />
                    <div className="doctor-info">
                        <h3 className="doctor-name">{item.name}</h3>
                        <p className="doctor-speciality">{item.speciality}</p>
                        <div className={`doctor-availability ${item.
                            avaliable ? 'available' : 'not-available'}`}>
                            <input onChange={()=>changeAvailablity(item._id)} type="checkbox" checked={item.avaliable}/>
                            <p>Available</p>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    </>
    )
}
// PRODUCTION READY DOCTORS LIST - FULL FEATURES

