import React from 'react'
import {
    XCircle,
    Home,
    User
} from "lucide-react";

const Sidebar = ({setIsOpen, isOpen,pageSection, setPageSection }) => {
    return (
        <div className='w-full overflow-hidden h-full bg-(--primary) p-3 overflow'>
            {/* LOGO */}
            <div className="flex  relative items-center md:justify-center gap-3 p-2">

                   
                    <div onClick={()=> setIsOpen(false)} className='absolute top-0 right-0 text-(--secondary)/90'><XCircle className='w-5' /></div>
                
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
                <button className="
                        flex items-center gap-5 font-semibold text-white
                        bg-white/5
                        hover:text-[var(--secondary)]
                          px-3 py-2 rounded
                        border border-transparent
                        
                        transition-all duration-300
                    "
                    onClick={()=>setPageSection("Dashboard")}
                    >

                    <Home className="h-4 w-4 " strokeWidth={2}/>
                    <p className='text-[0.9rem]'>Dashboard</p>

                </button>
                <button className="
                        flex items-center gap-5 font-semibold text-white 
                        hover:text-[var(--secondary)]
                         px-3 py-2 rounded
                        border border-transparent
                        
                        transition-all duration-300
                    "
                    onClick={()=> setPageSection("Profile")}
                    >

                    <User className="h-4 w-4 " strokeWidth={2}/>
                    <p className='text-[0.9rem]'>My Profile</p>

                </button>

                <button className="
                        flex items-center gap-5 font-semibold text-white 
                        hover:text-[var(--secondary)]
                         px-3 py-2 rounded
                        border border-transparent
                        
                        transition-all duration-300
                    ">

                    <Home className="h-4 w-4 " strokeWidth={2}/>
                    <p className='text-[0.9rem]'>Membership & dues</p>

                </button>

            </div>

        </div>
    )
}

export default Sidebar