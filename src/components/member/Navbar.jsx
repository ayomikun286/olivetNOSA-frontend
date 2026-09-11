import React from 'react'
import {
    Bell
} from "lucide-react";

const Navbar = ({setIsOpen,firstName ,year }) => {
  console.log(firstName)
  return (
    <div className='flex justify-between items-center border-b py-3 px-8 md:px-8 border-b-(--secondary)/50'>

      <div 
      onClick={() => setIsOpen(prev => !prev)}
      className='  gap-1 flex flex-col  p-1'>
        <span className='block w-8 h-0.75 bg-(--primary) rounded-full' />
        <span className='block w-9 h-0.75 bg-(--primary) rounded-full' />
        <span className='block w-7 h-0.75 bg-(--primary) rounded-full' />
      </div>


      <div className='flex items-center gap-4'>

        <div className='relative '>
          <span className='absolute -top-1 -right-1 w-fit h-3 p-[0.1rem] text-white block bg-(--secondary) flex justify-center items-center text-xs font-bold  rounded-full'>0</span>
          <Bell className="h-5 w-5 text-(--primary) " strokeWidth={2} />
        </div>

        <div  className='flex items-center justify-center gap-4 '>
          <span className="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center text-[var(--primary)] font-bold">
  {firstName?.charAt(0)}
</span>
          <div className='flex flex-col text-(--primary)'>
            <strong>{firstName}</strong>
            <small>class of <span>{year}</span></small>
          </div>

          

        </div>

      </div>

    </div>
  )
}

export default Navbar