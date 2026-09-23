import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import PageTitle from "../../components/common/PageTitle.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import Sidebar from "../../components/member/Sidebar.jsx";
import Footer from "../../components/member/Footer.jsx";
import Navbar from "../../components/member/Navbar.jsx";
import NotificationAlert from "../../components/common/NotificationAlert.jsx";
import { getMemberProfile } from "../../services/authService.js";


import { getMyNotifications } from "../../services/notificationService.js";
const Dashboard = () => {
  const navigate = useNavigate();
  const {
    user,
    logout,
  } = useAuth();



  const [isOpen, setIsOpen] = useState(false)
  const [alertNotification, setAlertNotification] = useState(null);
  const [memberProfile, setMemberProfile] = useState(null);
  const latestNotificationRef = useRef(null);


  const firstName = user?.firstName || "Olivetian";
  const email = user?.email || "";
  const alumniId = user?.alumniId
  const isEmailVerified = user?.isEmailVerified ?? false;
 const isProfileIncomplete =
  !memberProfile?.phone ||
  !memberProfile?.profile?.country ||
  !memberProfile?.profile?.city ||
  !memberProfile?.profile?.professionalHeadline ||
  !memberProfile?.profile?.employmentStatus ||
  !memberProfile?.profile?.profession;


  // LOGOUT
  // ----------------------------------------
  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (!user?._id) return;

    let isMounted = true;

    const checkNotifications = async () => {
      try {
        const data = await getMyNotifications();

        const notifications =
          data.notifications || [];

        if (!notifications.length) return;

        const latest = notifications[0];

        // First load — don't show an alert
        if (!latestNotificationRef.current) {
          latestNotificationRef.current =
            latest._id;

          return;
        }

        // New notification detected
        if (
          latest._id !==
          latestNotificationRef.current
        ) {
          latestNotificationRef.current =
            latest._id;

          if (isMounted && !latest.isRead) {
            setAlertNotification(latest);
          }
        }
      } catch (error) {
        console.error(
          "Notification polling error:",
          error
        );
      }
    };

    checkNotifications();

    const interval = setInterval(
      checkNotifications,
      60000
    );

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user?._id]);

  useEffect(() => {
    const handlePaymentSuccess = (event) => {
        const notification = event.detail;

        setAlertNotification(notification);
    };

    window.addEventListener(
        "nosa:payment-success",
        handlePaymentSuccess
    );

    return () => {
        window.removeEventListener(
            "nosa:payment-success",
            handlePaymentSuccess
        );
    };
}, []);


useEffect(() => {
  if (!user?._id) return;

  const loadProfile = async () => {
    try {
      const response = await getMemberProfile();

      if (response?.success) {
        setMemberProfile(response.data);
      }
    } catch (error) {
      console.error("Failed to load member profile:", error);
    }
  };

  loadProfile();
}, [user?._id]);

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
               
                ${isOpen ? "w-60 md:w-0" : "w-0 md:w-70"}
               
            `}>

          <Sidebar

            isOpen={isOpen}
            setIsOpen={setIsOpen}

          />

        </section>

        {/* main content */}
        <section className='main  w-full  flex flex-col '>
          <Navbar
            setIsOpen={setIsOpen}
            alumniId={alumniId}
            firstName={firstName}
            year={user?.graduationYear}
            logout={logout}
          />

          <div className="flex-1 overflow-y-auto">
  {isProfileIncomplete && (
  <div className="px-4 pt-4 md:px-6">
    <div className="flex flex-col gap-3 rounded border border-(--border) bg-(--bg-white) px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-sm font-semibold text-(--text-primary)">
          Complete your profile
        </h3>

        <p className="mt-0.5 text-xs text-(--text-secondary)">
          Add your details to keep your OlivetNOSA profile up to date.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/dashboard/profile")}
        className="shrink-0 text-sm font-medium text-(--primary) hover:underline"
      >
        Complete Profile
      </button>
    </div>
  </div>
)}

  <Outlet />
</div>
        </section>


        {alertNotification && (
          <NotificationAlert
            notification={alertNotification}
            onClose={() => setAlertNotification(null)}
            onClick={() => {
              const link = alertNotification.link;

              setAlertNotification(null);

              if (link) {
                navigate(link);
              }
            }}
          />
        )}







      </main>


    </>
  );
};

export default Dashboard;