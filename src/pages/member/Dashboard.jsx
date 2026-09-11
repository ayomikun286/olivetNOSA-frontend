import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Award,
  Users,
  GraduationCap,
  Calendar,
  LogOut,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// pages //
import Main from "./Main.jsx";
import Profile from "./Profile.jsx";
import PageTitle from "../../components/common/PageTitle.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import Sidebar from "../../components/member/Sidebar.jsx";
import Footer from "../../components/member/Footer.jsx";
import Navbar from "../../components/member/Navbar.jsx";

const Dashboard = () => {
  const {
    user,
    logout,
  } = useAuth();

  const [isOpen, setIsOpen] = useState(false)
  const firstName = user?.firstName || "Olivetian";
  const email = user?.email || "";
  const isEmailVerified = user?.isEmailVerified ?? false;
  const [pageSection, setPageSection] = useState('Dashboard');

  // LOGOUT
  // ----------------------------------------
  const handleLogout = async () => {
    await logout();
  };

  return (
    <>

      <main className='flex h-screen overflow-x-hidden w-screen'>
        <PageTitle title="Member Dashboard | OlivetNOSA" />
          
          {/*sidebar*/}
        <section className={`
                fixed
                md:relative
                top-0
                left-0
                h-screen
                z-50
                overflow-hidden
                transition-all
                duration-200
               
                ${isOpen ? "w-60" : "w-0"}
                md:w-70
            `}>

              <Sidebar 
              pageSection={pageSection} 
              setPageSection={setPageSection} 
              isOpen={isOpen} 
              setIsOpen={setIsOpen}
              />

        </section>
        
        {/* main content */}
        <section className='main  w-full  flex flex-col'>
          <Navbar  setIsOpen={setIsOpen}/>

          {/* pages switch  */}
          {pageSection === "Dashboard" && (
          <Main />
        )}

         {pageSection === "Profile" && (
          <Profile />
        )}
        </section>



        



      </main>


    </>
  );
};

export default Dashboard;