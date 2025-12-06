import { Banner } from "../components/Banner.jsx"
import { Header } from "../components/Header.jsx"
import { Speciality } from "../components/Speciality.jsx"
import { TopDoctors } from "../components/TopDoctors.jsx"
import { TopPharmacies } from "../components/TopPharmacies.jsx"

export const Home = () => {
    return (
    <>
    <Header/>
    <Speciality/>
    <TopPharmacies/>
    <TopDoctors/>
    <Banner/>
    </>
    )
}