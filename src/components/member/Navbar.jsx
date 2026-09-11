import React from 'react'
import {
    ArrowDown,
    ArrowUpRight,
    UsersRound,
    Globe2,
    HeartHandshake,
    GraduationCap,
    Landmark,
    Infinity,
    Home,
    User,
    Bell
} from "lucide-react";

const Navbar = ({setIsOpen }) => {
  return (
    <div className='flex justify-between items-center border py-3 px-15 border-b-(--primary-light)'>

      <div 
      onClick= {()=> {setIsOpen(true), alert('hello ')}}
      className=' w-9 gap-1 flex flex-col border rounded border-(--primary)/50 p-1'>
        <span className='block w-full h-0.75 bg-(--primary)/50 rounded-full' />
        <span className='block w-full h-0.75 bg-(--primary)/50 rounded-full' />
        <span className='block w-full h-0.75 bg-(--primary)/50 rounded-full' />
      </div>


      <div className='flex items-center gap-4'>

        <div className='relative '>
          <span className='absolute -top-1 -right-1 w-fit h-3 p-[0.1rem] text-white block bg-(--secondary) flex justify-center items-center text-xs font-bold  rounded-full'>0</span>
          <Bell className="h-5 w-5 text-(--primary) " strokeWidth={2} />
        </div>

        <div  className='flex items-center justify-center gap-4 '>
          <span className='w-8 h-8 bg-red-400 rounded-full'>

          </span>
          <div className='flex flex-col'>
            <strong>ayomikun e..</strong>
            <small>class of 2018</small>
          </div>

          

        </div>

      </div>

    </div>
  )
}

export default Navbar