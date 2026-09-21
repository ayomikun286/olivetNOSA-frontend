import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import PageTitle from "../../components/common/PageTitle.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import Sidebar from "../../components/member/Sidebar.jsx";
import Footer from "../../components/member/Footer.jsx";
import Navbar from "../../components/member/Navbar.jsx";
import NotificationAlert from "../../components/common/NotificationAlert.jsx";



import { getMyNotifications } from "../../services/notificationService.js";
const Dashboard = () => {
  const navigate = useNavigate();
  const {
    user,
    logout,
  } = useAuth();



  const [isOpen, setIsOpen] = useState(false)
  const [alertNotification, setAlertNotification] =
    useState(null);

  const latestNotificationRef = useRef(null);


  const firstName = user?.firstName || "Olivetian";
  const email = user?.email || "";
  const alumniId = user?.alumniId
  const isEmailVerified = user?.isEmailVerified ?? false;
  // const [pageSection, setPageSection] = useState('Dashboard');


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