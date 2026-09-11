import React, { useState } from 'react'
import {
  ShieldCheck,
  CreditCard,
  Landmark,
  ReceiptText,
} from "lucide-react";;
import { useAuth } from "../../context/AuthContext.jsx";


const Main = () => {

     const { user, logout } = useAuth();

     const{statusBar, setStatusBar} = useState("")
     const name = user?.firstName;
     const status=user?.memberStatus;

     const membershipStatus = () =>{
        if(status === "pending"){
        setStatusBar(``)
     }

     }
     
    


  return (

    <div className='p-5' >
        <div className='flex justify-center md:justify-between gap-2  items-center flex-wrap'>
            <div className='w-full md:w-fit'>
                <h1 className='text-(--primary) text-2xl font-semibold'>Wellcome back , <span>{name}</span>! 👋</h1>
                <small className='text-(--primary)/80'>Stay connected, Stay informed, Stay involved</small>
            </div>
            <div className='text-end text-(--primary)/80 w-full md:w-fit'>
                <p className='text-[0.9rem] md:text-lg'>Once an Olivetian, Always an Olivetian</p>
                <small>-Together We Rise</small>
            </div>
        </div>

        <div className='flex  justify-center gap-5 items-center mt-8 flex-col  md:flex-row'>

            <div className='min-w-55 w-full p-3 shadow-(--shadow-sm) flex gap-5 rounded'>
                <span className=' flex justify-center items-center text-(--success) w-10 h-10 rounded-full bg-(--success)/20 '>
                    <ShieldCheck />
                </span>
                <div className='flex flex-col gap-2'>
                    <small>MEMBERSHIP STATUS</small>
                    <strong className='text-xl text-(--success)'>Verified Member</strong>
                    <span className='px-2 w-fit text-xs font-semibold text-(--success) bg-(--success)/20 rounded-xl'>Active</span>
                </div>

            </div>
            <div className='min-w-55 p-3 w-full shadow-(--shadow-sm) flex gap-5 rounded'>
                 <span className=' flex justify-center items-center text-(--primary) w-10 h-10 rounded-full bg-(--primary)/20 '>
                    <CreditCard />
                </span>
                <div className='flex flex-col gap-2'>
                    <small>ANNUAL DUES</small>
                    <strong className='text-xl text-(--primary)'>#20,000</strong>
                    <span className='px-2 w-fit text-xs font-semibold text-(--primary) bg-(--primary)/20 rounded-xl'>Active</span>
                </div>

            </div>
           
            <div className='min-w-55 p-3 w-full shadow-(--shadow-sm) flex gap-5 rounded'>
                <span className=' block w-10 h-10 rounded-full bg-(--success) '>

                </span>
                <div className='flex flex-col gap-2'>
                    <small>MEMBERSHIP STATUS</small>
                    <strong className='text-xl'>Verified Member</strong>
                    <span className='px-2  bg-(--success)/50'>Active</span>
                </div>

            </div>
           
            <div className='min-w-55 w-full p-3 shadow-(--shadow-sm) flex gap-5 rounded'>
                <span className=' block w-10 h-10 rounded-full bg-(--success)'>

                </span>
                <div className='flex flex-col gap-2'>
                    <small>MEMBERSHIP STATUS</small>
                    <strong className='text-xl'>Verified Member</strong>
                    <span className='px-2  bg-(--success)/50'>Active</span>
                </div>

            </div>
           
            
        </div>
    
    </div>
  )
}

export default Main