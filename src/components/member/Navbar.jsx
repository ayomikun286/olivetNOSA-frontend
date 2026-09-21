import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { NavLink, useNavigate, } from "react-router-dom";
import NotificationDropdown from "../common/NotificationDropdown.jsx";

const Navbar = ({
  setIsOpen,
  firstName,
  year,
  logout,
  alumniId,
}) => {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const initial = firstName?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="flex items-center justify-between border-b border-b-(--secondary)/50 bg-(--bg-light) px-4 py-3 md:px-8">

      {/* ================= LEFT ================= */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex flex-col gap-1 p-1"
        aria-label="Toggle sidebar"
      >
        <span className="block h-0.75 w-8 rounded-full bg-(--primary)" />
        <span className="block h-0.75 w-9 rounded-full bg-(--primary)" />
        <span className="block h-0.75 w-7 rounded-full bg-(--primary)" />
      </button>

      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-5">

        {/* ================= NOTIFICATIONS ================= */}
        <NotificationDropdown />

        {/* ================= PROFILE ================= */}
        <div
          ref={dropdownRef}
          className="relative"
        >
          {/* Profile trigger */}
          <button
            onClick={() => setDropDown((prev) => !prev)}
            className="flex items-center gap-3 text-left"
            aria-label="Open profile menu"
          >
            {/* Avatar */}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--secondary) font-bold text-(--primary)">
              {initial}
            </span>

            {/* Name + Alumni ID */}
            <div className="hidden flex-col sm:flex">
              <strong className="text-sm leading-tight text-(--primary)">
                {firstName?.toUpperCase()}
              </strong>

              <small className="mt-0.5 text-xs text-(--primary)/60">
                {alumniId || (
                  <span className="text-(--warning)">
                    Pending approval
                  </span>
                )}
              </small>
            </div>

            {/* Chevron */}
            <ChevronDown
              size={16}
              className={`text-(--primary) transition-transform duration-300 ${dropDown ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* ================= PROFILE DROPDOWN ================= */}
          <div
            className={`
              absolute right-0 top-13 z-50
              w-72
              origin-top-right
              overflow-hidden
              rounded
              border border-(--secondary)/20
              bg-(--bg-light)
              shadow-lg
              transition-all duration-200
              ${dropDown
                ? "visible scale-100 opacity-100"
                : "invisible scale-95 opacity-0"
              }
            `}
          >

            {/* ================= USER INFO ================= */}
            <div className="border-b border-(--secondary)/20 px-4 py-4">
              <div className="flex items-center gap-3">

                {/* Avatar */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--secondary) text-base font-bold text-(--primary)">
                  {initial}
                </span>

                {/* Identity */}
                <div className="min-w-0">
                  <p className="truncate font-semibold text-(--primary)">
                    {firstName?.toUpperCase()}
                  </p>

                  <p className="mt-0.5 text-xs text-(--primary)/60">
                    {alumniId || (
                      <span className="text-(--warning)">
                        Pending approval
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= PROFILE ================= */}
            <NavLink
              to="/portal/member/dashboard/profile"
              onClick={() => setDropDown(false)}
              className="
                flex w-full items-center gap-3
                px-4 py-3
                text-sm text-(--primary)
                transition-colors
                hover:bg-(--primary)/5
              "
            >
              <User size={17} />
              <span>My Profile</span>
            </NavLink>

            {/* ================= SETTINGS ================= */}
            <button
              type="button"
              onClick={() => setDropDown(false)}
              className="
                flex w-full items-center gap-3
                px-4 py-3
                text-sm text-(--primary)
                transition-colors
                hover:bg-(--primary)/5
              "
            >
              <Settings size={17} />
              <span>Settings</span>
            </button>

            {/* ================= LOGOUT ================= */}
            <div className="border-t border-(--secondary)/20">
              <button
                type="button"
                onClick={async () => {
                  setDropDown(false);
                  await logout();
                  navigate("/portal/login", { replace: true });
                }}
                className="
                  flex w-full items-center gap-3
                  px-4 py-3
                  text-sm text-red-600
                  transition-colors
                  hover:bg-red-50
                "
              >
                <LogOut size={17} />
                <span>Logout</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;