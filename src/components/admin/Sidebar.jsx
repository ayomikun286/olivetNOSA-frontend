import React from "react";
import {
  XCircle,
  LayoutDashboard,
  Users,
  ClipboardList,
  CreditCard,
  CalendarRange,
  MapPin,
  ChartNoAxesCombined,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Sidebar = ({ setIsOpen }) => {
  const { user, logout } = useAuth();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `
      group flex items-center gap-4
      px-3 py-2.5 rounded
      border border-transparent
      font-medium text-[0.88rem]
      transition-all duration-300 ease-out
      ${
        isActive
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
            ADMIN PORTAL
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
              to="/portal/admin/dashboard"
              end
              onClick={handleLinkClick}
              className={linkClass}
            >
              <LayoutDashboard className={iconClass} />
              <span>Dashboard</span>
            </NavLink>
          </div>
        </div>

        {/* ================= MANAGEMENT ================= */}
        <div>
          <p className={sectionTitle}>Management</p>

          <div className="space-y-1">
            <NavLink
              to="/portal/admin/dashboard/members"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <Users className={iconClass} />
              <span>Members</span>
            </NavLink>

            <NavLink
              to="/portal/admin/dashboard/obligations"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <ClipboardList className={iconClass} />
              <span>Obligations</span>
            </NavLink>

            <NavLink
              to="/portal/admin/dashboard/payments"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <CreditCard className={iconClass} />
              <span>Payments</span>
            </NavLink>

            <NavLink
              to="/portal/admin/dashboard/year-sets"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <CalendarRange className={iconClass} />
              <span>Year Sets</span>
            </NavLink>

            <NavLink
              to="/portal/admin/dashboard/chapters"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <MapPin className={iconClass} />
              <span>Chapters</span>
            </NavLink>
          </div>
        </div>

        {/* ================= FINANCE ================= */}
        <div>
          <p className={sectionTitle}>Finance</p>

          <div className="space-y-1">
            <NavLink
              to="/portal/admin/dashboard/financial-reports"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <ChartNoAxesCombined className={iconClass} />
              <span>Financial Reports</span>
            </NavLink>
          </div>
        </div>

        {/* ================= COMMUNICATION ================= */}
        <div>
          <p className={sectionTitle}>Communication</p>

          <div className="space-y-1">
            <NavLink
              to="/portal/admin/dashboard/notifications"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <Bell className={iconClass} />
              <span>Notifications</span>
            </NavLink>
          </div>
        </div>

        {/* ================= SYSTEM ================= */}
        <div>
          <p className={sectionTitle}>System</p>

          <div className="space-y-1">
            <NavLink
              to="/portal/admin/dashboard/settings"
              className={linkClass}
              onClick={handleLinkClick}
            >
              <Settings className={iconClass} />
              <span>Admin Settings</span>
            </NavLink>
          </div>
        </div>

      </nav>

      {/* ================= ACCOUNT ================= */}
      <div className="pt-3 mt-3 border-t border-white/10">

        <button
          type="button"
          onClick={logout}
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