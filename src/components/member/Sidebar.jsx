import React from "react";
import {
  XCircle,
  Home,
  User,
  ClipboardList,
  CreditCard,
  Users,
  MapPin,
  Bell,
  CalendarDays,
  HelpCircle,
  LogOut,
  ContactRound,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const handleLinkClick = () => {
  setIsOpen(false);
};
const Sidebar = ({ setIsOpen }) => {
  const { user } = useAuth();

  const isYearSetLeader =
    user?.yearSet?.leader?.toString() === user?.id?.toString();

  const isChapterLeader =
    user?.chapter?.leader?.toString() === user?.id?.toString();

  const linkClass = ({ isActive }) =>
    `
      group flex items-center gap-4
      px-3 py-2.5 rounded
      border border-transparent
      font-medium text-[0.88rem]
      transition-all duration-300 ease-out
      ${isActive
      ? `
            bg-white/10
            text-[var(--secondary)]
            border-[var(--secondary)]/20
            shadow-sm
          `
      : `
            text-white/90
            hover:text-[var(--secondary)]
            hover:bg-white/[0.06]
            hover:border-white/10
          `
    }
    `;

  const iconClass =
    "h-[17px] w-[17px] shrink-0 transition-transform duration-300 group-hover:scale-110";

  const sectionTitle =
    "px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40";

  return (
    <div className="w-full h-full overflow-hidden bg-[var(--primary)] p-3 flex flex-col">

      {/* ================= LOGO ================= */}
      <div className="relative flex items-center md:justify-center gap-3 p-2 pb-4 border-b border-[var(--secondary)]/40">

        {/* MOBILE CLOSE */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="
            md:hidden absolute top-0 right-0
            text-[var(--secondary)]/80
            hover:text-[var(--secondary)]
            transition-colors duration-200
          "
        >
          <XCircle className="w-5 h-5" />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl shrink-0">
          <img
            src="/images/olivetNOSA_logo.png"
            alt="Olivet NOSA"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="leading-none">
          <p className="text-lg font-bold tracking-wide text-white">
            OBHS
          </p>

          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/90">
            ALUMNI PORTAL
          </p>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 overflow-y-auto mt-7 space-y-7 pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        {/* ================= OVERVIEW ================= */}
        <div>
          <p className={sectionTitle}>Overview</p>

          <div className="space-y-1">
            <NavLink
              to="/portal/member/dashboard"
              end
              onClick={handleLinkClick}
              className={linkClass}
            >
              <Home className={iconClass} />
              <span>Dashboard</span>
            </NavLink>
          </div>
        </div>

        {/* ================= MEMBERSHIP ================= */}
        <div>
          <p className={sectionTitle}>Membership</p>

          <div className="space-y-1">
            <NavLink
              to="/portal/member/dashboard/profile"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <User className={iconClass} />
              <span>My Profile</span>
            </NavLink>

            <NavLink
              to="/portal/member/dashboard/my-obligation"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <ClipboardList className={iconClass} />
              <span>My Obligations</span>
            </NavLink>

            <NavLink
              to="/portal/member/dashboard/payment-history"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <CreditCard className={iconClass} />
              <span>Payment History</span>
            </NavLink>

            <NavLink
              to="/portal/member/dashboard/directory"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <ContactRound className={iconClass} />
              <span>Directory</span>
            </NavLink>
          </div>
        </div>

        {/* ================= LEADERSHIP ================= */}
        {(isYearSetLeader || isChapterLeader) && (
          <div>
            <p className={sectionTitle}>Leadership</p>

            <div className="space-y-1">

              {isYearSetLeader && (
                <NavLink
                  to="/portal/member/dashboard/year-set"
                  className={linkClass}
                  onClick={handleLinkClick}
                >
                  <Users className={iconClass} />
                  <span>My Year Set</span>
                </NavLink>
              )}

              {isChapterLeader && (
                <NavLink
                  to="/portal/member/dashboard/chapter "
                  className={linkClass}
                  onClick={handleLinkClick}
                >
                  <MapPin className={iconClass} />
                  <span>My Chapter</span>
                </NavLink>
              )}

            </div>
          </div>
        )}

        

        {/* ================= COMMUNICATION ================= */}
        <div>
          <p className={sectionTitle}>Communication</p>

          <div className="space-y-1">
            <NavLink
              to="/portal/member/dashboard/notifications"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <Bell className={iconClass} />
              <span>Notifications</span>
            </NavLink>

            <NavLink
              to="/portal/member/dashboard/events"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <CalendarDays className={iconClass} />
              <span>Events</span>
            </NavLink>
          </div>
        </div>

        {/* ================= SUPPORT ================= */}
        <div>
          <p className={sectionTitle}>Support</p>

          <div className="space-y-1">
            <NavLink
              to="/portal/member/dashboard/help-support"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <HelpCircle className={iconClass} />
              <span>Help & Support</span>
            </NavLink>
          </div>
        </div>

      </nav>

      {/* ================= ACCOUNT ================= */}
      <div className="pt-3 mt-3 border-t border-white/10">

        <button
          type="button"
          className="
            group w-full flex items-center gap-4
            px-3 py-2.5 rounded-lg
            text-white/90
            hover:text-[var(--secondary)]
            hover:bg-white/[0.06]
            transition-all duration-300 ease-out
          "
        >
          <LogOut
            className="
              h-[17px] w-[17px]
              transition-transform duration-300
              group-hover:translate-x-0.5
            "
          />

          <span className="font-medium text-[0.88rem]">
            Logout
          </span>
        </button>

      </div>

    </div>
  );
};

export default Sidebar;