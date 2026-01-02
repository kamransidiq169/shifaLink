import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import doctor from './doctor.png'
import doctor3 from './three.png'
import techDoc from './techDoc.png'
import rc from './realcontact.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import kd from './kd.png'
import fdd from './fdd.png'
import dc from './dc.png'
import nc from './nc.png'
import bac from './bac.jpg'
import cell from "./cell.jpg"
import green from './green.jpg'
import aboutimg from './aboutimage.jpg'
export const assets = {
    aboutimg,
    green,
    cell,
    bac,
    nc,
    dc,
    fdd,
    kd,
    rc,
    techDoc,
    doctor3,
    doctor,
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
    
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        pharmacy:'Siddique-Pharmacy',
        name: 'Dr. Mudasir',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Mudasir has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
          availability: [
            { day: 'Sunday', from: '16:00', to: '20:00' },
            { day: 'Wednesday', from: '10:00', to: '14:00' }
        ]
    },
    {
        _id: 'doc2',
        pharmacy:'Inayat-Medicate',
        name: 'Dr. Hania',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Hania has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
         availability: [
            { day: 'Monday', from: '10:00', to: '14:00' },
            { day: 'Friday', from: '14:00', to: '18:00' }
        ]
    },
    {
        _id: 'doc3',
        pharmacy:'Inayat-Medicate',
        name: 'Dr. Yawar',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Yawar has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Tuesday', from: '14:00', to: '18:00' },
            { day: 'Saturday', from: '09:00', to: '13:00' }
        ]
    },
    {
        _id: 'doc4',
        pharmacy:'Inayat-Medicate',
        name: 'Dr. Sufiyan',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Sufiyan has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Wednesday', from: '09:00', to: '13:00' },
            { day: 'Sunday', from: '18:00', to: '22:00' }
        ]
    },
    {
        _id: 'doc5',
        pharmacy:'Inayat-Medicate',
        name: 'Dr. Azka',
        image: doc5,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Azka has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Thursday', from: '15:00', to: '19:00' }
        ]
    },
    {
        _id: 'doc6',
        pharmacy:'Valley-Health-Pharmacy',
        name: 'Dr. Ahtisham',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Ahtisham has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Friday', from: '11:00', to: '15:00' },
            { day: 'Monday', from: '16:00', to: '20:00' }
        ]
    },
    {
        _id: 'doc7',
        pharmacy:'Valley-Health-Pharmacy',
        name: 'Dr. Muzamil',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Muzamil has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Saturday', from: '17:00', to: '21:00' },
            { day: 'Tuesday', from: '09:00', to: '13:00' }
        ]
    },
    {
        _id: 'doc8',
        pharmacy:'Valley-Health-Pharmacy',
        name: 'Dr. Musharaf',
        image: doc8,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Musharaf has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Tuesday', from: '12:00', to: '16:00' },
            { day: 'Thursday', from: '17:00', to: '21:00' }
        ]
    },
    {
        _id: 'doc9',
        pharmacy:'Downtown-Medical-Store',
        name: 'Dr. Bisma',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Bisma has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Wednesday', from: '16:00', to: '20:00' }
        ]
    },
    {
        _id: 'doc10',
        pharmacy:'Downtown-Medical-Store',
        name: 'Dr. Yasir',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Yasir has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Thursday', from: '09:00', to: '13:00' },
            { day: 'Saturday', from: '15:00', to: '19:00' }
        ]
    },
    {
        _id: 'doc11',
        pharmacy:'Downtown-Medical-Store',
        name: 'Dr. Noorain',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Noorain has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Friday', from: '14:00', to: '18:00' }
        ]
    },
    {
        _id: 'doc12',
        pharmacy:'Downtown-Medical-Store',
        name: 'Dr. Kamran',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Kamran has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Saturday', from: '10:00', to: '14:00' },
            { day: 'Sunday', from: '12:00', to: '16:00' }
        ]
    },
    {
        _id: 'doc13',
        name: 'Dr. Muskaan',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Muskaan has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        pharmacy:'Downtown-Medical-Store',
        name: 'Dr. Tanveer',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Tanveer has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Saturday', from: '10:00', to: '14:00' },
            { day: 'Sunday', from: '12:00', to: '16:00' }
        ]
    },
    {
        _id: 'doc15',
        pharmacy:'Downtown-Medical-Store',
        name: 'Dr. Hadiya',
        image: doc15,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Hadiya has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Saturday', from: '10:00', to: '14:00' },
            { day: 'Sunday', from: '12:00', to: '16:00' }
        ]
    },
    {
        _id: 'doc16',
        pharmacy:'Downtown-Medical-Store',
        name: 'Dr. Abrar',
        image: doc3,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Hadiya has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Saturday', from: '10:00', to: '14:00' },
            { day: 'Sunday', from: '12:00', to: '16:00' }
        ]
    },
    {
        _id: 'doc17',
        pharmacy:'Downtown-Medical-Store',
        name: 'Dr. Rahil',
        image: doc4,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Hadiya has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        },
        availability: [
            { day: 'Saturday', from: '10:00', to: '14:00' },
            { day: 'Sunday', from: '12:00', to: '16:00' }
        ]
    }
]