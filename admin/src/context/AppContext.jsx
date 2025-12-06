import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const calculateAge = (dob) =>{
        const todayAge = new Date()
        const birthDate = new Date(dob)
        const Age = todayAge.getFullYear() - birthDate.getFullYear()
       return Age
    }
const value={calculateAge}
return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}

export default AppContextProvider