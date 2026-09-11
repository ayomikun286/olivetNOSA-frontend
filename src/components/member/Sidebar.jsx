import React from 'react'
import {
    XCircle,
    Home,
    User
} from "lucide-react";

import { NavLink } from 'react-router-dom';
const Sidebar = ({ setIsOpen}) => {
    return (
        <div className='w-full overflow-hidden h-full bg-(--primary) p-3 overflow'>
            {/* LOGO */}
            <div className="flex  relative items-center md:justify-center gap-3 p-2 border-b border-b-(--secondary) ">


                <div onClick={() => setIsOpen(false)} className=' md:hidden absolute top-0 right-0 text-(--secondary)/90'><XCircle className='w-5' /></div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl text-[var(--primary-dark)] shadow-lg">
                    <img
                        src="/images/olivetNOSA_logo.png"
                        alt="Olivet NOSA"
                        className="h-full w-full object-contain"
                    />
                </div>

                <div className="leading-none">

                    <p className="text-lg font-bold tracking-wide text-white transition-colors duration-500 max-w-35">
                        OBHS
                    </p>

                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors duration-500 max-w-50">
                        ALUMNI PORTAL
                    </p>

                    {/* <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors duration-500 max-w-50">
                Global Old Students Association Website
              </p> */}

                </div>

            </div>


            {/* Navigators */}
            <div className='flex flex-col gap-2  mt-10'>
                <NavLink
                    to="/portal/member/dashboard"
                    className={({ isActive }) =>
    `
      flex items-center gap-5 font-semibold
      px-3 py-2 rounded
      border border-transparent
      transition-all duration-300
      ${
        isActive
          ? "bg-white/10 text-[var(--secondary)] border-[var(--secondary)]/20"
          : "text-white hover:text-[var(--secondary)] hover:bg-white/5"
      }
    `
  }
                    >
                    <Home className="h-4 w-4" />
                    <p className="text-[0.9rem]">Dashboard</p>
                </NavLink>
                <NavLink
                    to="/portal/member/dashboard/profile"
                    className="
                        flex items-center gap-5 font-semibold text-white 
                        hover:text-[var(--secondary)]
                         px-3 py-2 rounded
                        border border-transparent
                        
                        transition-all duration-300
                    "
                    >
                    <Home className="h-4 w-4" />
                    <p className="text-[0.9rem]">My Profile</p>
                </NavLink>

            </div>

        </div>
    )
}

export default Sidebar