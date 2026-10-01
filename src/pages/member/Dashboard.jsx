import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import PageTitle from "../../components/common/PageTitle.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import Sidebar from "../../components/member/Sidebar.jsx";
import Navbar from "../../components/member/Navbar.jsx";
import NotificationAlert from "../../components/common/NotificationAlert.jsx";
import { getMemberProfile } from "../../services/authService.js";
import {
  UserRoundCheck,
  ArrowUpRight,
} from "lucide-react";

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
  const [profileLoading, setProfileLoading] = useState(true);
  const latestNotificationRef = useRef(null);


  const firstName = user?.firstName || "Olivetian";
  const email = user?.email || "";
  const alumniId = user?.alumniId
  const isEmailVerified = user?.isEmailVerified ?? false;



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
    const loadProfile = async () => {
      try {
        const response = await getMemberProfile();


        if (response?.success) {
          setMemberProfile(response.data);

        }

      } catch (error) {
        console.error("Failed to load member profile:", error);
      } finally {
        setProfileLoading(false)
      }
    };

    loadProfile();
  }, []);


  const isProfileIncomplete = !memberProfile?.phone ||
    !memberProfile?.profile?.country ||
    !memberProfile?.profile?.city ||
    !memberProfile?.profile?.profession;


  const profilePhoto = memberProfile?.profile?.profilePhoto;





  return (
    <>

      <main className='flex h-screen overflow-x-hidden w-screen'>
        <PageTitle title="Member Dashboard | OlivetGOSA" />

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
            profilePhoto={profilePhoto}
          />

          <div className="flex-1 overflow-y-auto">

            {!profileLoading && isProfileIncomplete && (
              <div className="px-4 pt-4 md:px-6">
                <div className="relative overflow-hidden rounded border border-(--primary)/15 bg-linear-to-r from-(--primary)/5 via-(--bg-white) to-(--bg-white) shadow-sm">

                  {/* Decorative accent */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-(--primary)" />

                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                    {/* Content */}
                    <div className="flex items-start gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--primary)/10 text-(--primary)">
                        <UserRoundCheck size={21} />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-(--text-primary) sm:text-base">
                            Complete your profile
                          </h3>

                          <span className="rounded-full bg-(--primary)/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-(--primary)">
                            Action required
                          </span>
                        </div>

                        <p className="mt-1 max-w-xl text-xs leading-5 text-(--text-secondary) sm:text-sm">
                          Your profile is not complete yet. Add your personal and
                          professional details to keep your OlivetGOSA profile up to date.
                        </p>
                      </div>

                    </div>

                    {/* Button */}
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/portal/member/dashboard/profile")
                      }
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded bg-(--primary) px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
                    >
                      Complete Profile
                      <ArrowUpRight size={16} />
                    </button>

                  </div>
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