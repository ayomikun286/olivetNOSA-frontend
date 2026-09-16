import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import PageTitle from "../../components/common/PageTitle.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

import Sidebar from "../../components/admin/Sidebar.jsx";
import Navbar from "../../components/admin/Navbar.jsx";

import NotificationAlert from "../../components/common/NotificationAlert.jsx";
import { getMyNotifications } from "../../services/notificationService.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [alertNotification, setAlertNotification] = useState(null);

  const latestNotificationRef = useRef(null);

  const firstName = user?.firstName || "Admin";
  const lastName = user?.lastName || "";
  const role = user?.role || "admin";

  // ========================================
  // LOGOUT
  // ========================================
  const handleLogout = async () => {
    await logout();
  };


  const [loading, setLoading] = useState(true)

  // ========================================
  // NOTIFICATION POLLING
  // ========================================
  useEffect(() => {
    if (!user?._id) return;

    let isMounted = true;

    const checkNotifications = async () => {
      try {
        const data = await getMyNotifications();

        const notifications = data.notifications || [];

        if (!notifications.length) return;

        const latest = notifications[0];

        // First load — don't show an alert
        if (!latestNotificationRef.current) {
          latestNotificationRef.current = latest._id;
          return;
        }

        // New notification detected
        if (latest._id !== latestNotificationRef.current) {
          latestNotificationRef.current = latest._id;

          if (isMounted && !latest.isRead) {
            setAlertNotification(latest);
          }
        }

          setLoading(false)
      } catch (error) {
        console.error(
          "Admin notification polling error:",
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

  return (
    <>
      <PageTitle title="Admin Dashboard | OlivetNOSA" />

      <main className="flex h-screen w-screen overflow-x-hidden">

        {/* ========================================
            SIDEBAR
        ======================================== */}
        <section
          className={`
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
          `}
        >
          <Sidebar setIsOpen={setIsOpen} />
        </section>

        {/* ========================================
            MAIN CONTENT
        ======================================== */}
        <section className="main w-full flex flex-col overflow-y-auto overflow-x-hidden">

          {/* NAVBAR */}
          <Navbar
            setIsOpen={setIsOpen}
            firstName={firstName}
            lastName={lastName}
            role={role}
            logout={handleLogout}
          />

          {/* ========================================
              PAGE CONTENT
          ======================================== */}
          <Outlet />

        </section>

        {/* ========================================
            NOTIFICATION ALERT
        ======================================== */}
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