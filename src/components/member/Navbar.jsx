import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";

const Navbar = ({ setIsOpen, firstName, year, logout, alumniId }) => {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        {/* Notification */}
        <button
          className="relative p-1 text-(--primary)"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={2} />

          <span className="absolute -right-1 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-(--secondary) px-1 text-[9px] font-bold text-white">
            0
          </span>
        </button>

        {/* Profile */}
        <div ref={dropdownRef} className="relative">

          {/* Profile trigger */}
          <button
            onClick={() => setDropDown((prev) => !prev)}
            className="flex items-center gap-3 text-left"
          >
            {/* Avatar */}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--secondary) font-bold text-(--primary)">
              {firstName?.charAt(0)?.toUpperCase()}
            </span>

            {/* Name */}
            <div className="hidden flex-col text-(--primary) sm:flex">
              <strong className="text-sm leading-tight">
                {firstName.toUpperCase()}
              </strong>

              <small className="text-xs opacity-70">
                {alumniId || (
                  <span className="text-(--color-warning)">
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

          {/* ================= DROPDOWN ================= */}
          <div
            className={`absolute right-0 top-13 z-50 w-64 origin-top-right overflow-hidden rounded border border-(--secondary)/20 bg-(--bg-light) shadow-lg transition-all duration-200 ${dropDown
              ? "visible scale-100 opacity-100"
              : "invisible scale-95 opacity-0"
              }`}
          >

            {/* User info */}
            <div className="border-b border-(--secondary)/20 px-4 py-4">
              <p className="font-semibold text-(--primary)">
                {firstName.toUpperCase()}
              </p>

              <p className="text-xs text-(--primary)/60">
                {alumniId || (
                  <span className="text-(--color-warning)">
                    Pending approval
                  </span>
                )}
              </p>
            </div>

            {/* Profile */}
            <button
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-(--primary) transition-colors hover:bg-(--primary)/5"
              onClick={() => setDropDown(false)}
            >
              <User size={17} />
              <span>My Profile</span>
            </button>

            {/* Settings */}
            <button
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-(--primary) transition-colors hover:bg-(--primary)/5"
              onClick={() => setDropDown(false)}
            >
              <Settings size={17} />
              <span>Settings</span>
            </button>

            {/* Logout */}
            <div className="border-t border-(--secondary)/20">
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition-colors hover:bg-red-50"
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