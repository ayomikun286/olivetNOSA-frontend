import React from "react";
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

import PageTitle from "../../components/common/PageTitle.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const Dashboard = () => {
  const {
    user,
    logout,
  } = useAuth();

  // ----------------------------------------
  // AUTH DATA
  // ----------------------------------------

  const firstName = user?.firstName || "Olivetian";
  const email = user?.email || "";
  const isEmailVerified = user?.isEmailVerified ?? false;

  // ----------------------------------------
  // LOGOUT
  // ----------------------------------------

  const handleLogout = async () => {
    await logout();
  };

  return (
    <main className="min-h-screen bg-[var(--bg-light)]">
      <PageTitle title="Member Dashboard | OlivetNOSA" />

      {/* ========================================
          TOP HEADER
      ======================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/olivetNOSA_logo.png"
              alt="Olivet NOSA"
              className="h-10 w-auto"
            />

            <div>
              <span className="block text-sm font-bold tracking-wide text-[var(--primary-dark)]">
                OlivetNOSA
              </span>

              <span className="block text-[10px] uppercase tracking-widest text-[var(--secondary)]">
                Member Portal
              </span>
            </div>
          </Link>

          {/* USER */}

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-[var(--primary-dark)]">
                {firstName}
              </p>

              <p className="text-xs text-[var(--text-secondary)]">
                {email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[var(--danger)]"
              title="Log out"
            >
              <LogOut size={16} />

              <span className="hidden sm:inline">
                Logout
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* ========================================
          DASHBOARD CONTENT
      ======================================== */}

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">

        {/* ========================================
            WELCOME
        ======================================== */}

        <div className="mb-8 rounded-2xl bg-gradient-to-r from-[var(--primary-dark)] to-[#184880] p-6 text-white shadow-md sm:p-8">

          <div className="max-w-2xl">

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--secondary)]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--secondary)]">
              <Sparkles size={13} />

              Welcome to the Alumni Network
            </span>

            <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Hello, {firstName}!
            </h1>

            <p className="mt-2 text-sm leading-6 text-white/80 sm:text-base">
              Welcome to the Olivet Baptist High School National Old Students'
              Association portal. Keep track of your alumni information,
              connect with classmates, and get involved.
            </p>

          </div>
        </div>

        {/* ========================================
            ACCOUNT STATUS
        ======================================== */}

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* EMAIL */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">

            <div className="flex items-center justify-between">

              <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                Email Verification
              </span>

              {isEmailVerified ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 size={13} />

                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                  Pending
                </span>
              )}

            </div>

            <p className="mt-3 text-lg font-bold text-[var(--primary-dark)]">
              {isEmailVerified
                ? "Active & Confirmed"
                : "Verification Required"}
            </p>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              {isEmailVerified
                ? "Your email address has been verified successfully."
                : "Please verify your email address to continue."}
            </p>

          </div>

          {/* MEMBERSHIP */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">

            <div className="flex items-center justify-between">

              <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                Membership
              </span>

              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                Account
              </span>

            </div>

            <p className="mt-3 text-lg font-bold text-[var(--primary-dark)]">
              OlivetNOSA Member
            </p>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Manage your alumni profile, membership information and activities.
            </p>

          </div>

          {/* ROLE */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs sm:col-span-2 lg:col-span-1">

            <div className="flex items-center justify-between">

              <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                Account Role
              </span>

              <span className="inline-flex items-center rounded-full bg-[var(--primary-light)] px-2.5 py-0.5 text-xs font-semibold text-[var(--primary)]">
                Member
              </span>

            </div>

            <p className="mt-3 text-lg font-bold capitalize text-[var(--primary-dark)]">
              {user?.role || "Member"}
            </p>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Your account access is determined by your assigned NOSA role.
            </p>

          </div>

        </div>

        {/* ========================================
            LEADERSHIP
        ======================================== */}

        <div className="mb-8 rounded-2xl border border-[var(--secondary)]/30 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/40 p-6 sm:flex sm:items-center sm:justify-between sm:p-8">

          <div className="max-w-xl">

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--secondary)]">
              <Award size={16} />

              Leadership Opportunity
            </div>

            <h2 className="mt-2 text-xl font-bold text-[var(--primary-dark)] sm:text-2xl">
              Interested in Serving as a NOSA Leader?
            </h2>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Members may be eligible to serve as Chapter or Year Set leaders.
              Leadership requests and approvals will be managed through the
              NOSA leadership system.
            </p>

          </div>

          <Link
            to="/portal/leadership"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--primary-dark)] sm:mt-0"
          >
            Explore Leadership

            <ChevronRight size={16} />
          </Link>

        </div>

        {/* ========================================
            ALUMNI RESOURCES
        ======================================== */}

        <h2 className="mb-4 text-lg font-bold text-[var(--primary-dark)]">
          Explore Alumni Resources
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* CHAPTERS */}

          <Link
            to="/nosa-chapters"
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-[var(--secondary)] hover:shadow-md"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] transition group-hover:bg-[var(--primary)] group-hover:text-white">
              <Users size={22} />
            </div>

            <h3 className="mt-4 text-base font-bold text-[var(--primary-dark)]">
              Chapters & Branches
            </h3>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Connect with fellow Olivetians in your city, state, or region.
            </p>

          </Link>

          {/* DIRECTORY */}

          <Link
            to="/olivetians"
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-[var(--secondary)] hover:shadow-md"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] transition group-hover:bg-[var(--primary)] group-hover:text-white">
              <GraduationCap size={22} />
            </div>

            <h3 className="mt-4 text-base font-bold text-[var(--primary-dark)]">
              Alumni Directory
            </h3>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Find old classmates, discover notable alumni, and network.
            </p>

          </Link>

          {/* EVENTS */}

          <Link
            to="/news"
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-[var(--secondary)] hover:shadow-md"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)] transition group-hover:bg-[var(--primary)] group-hover:text-white">
              <Calendar size={22} />
            </div>

            <h3 className="mt-4 text-base font-bold text-[var(--primary-dark)]">
              Reunions & Events
            </h3>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Stay updated on upcoming alumni reunions, assemblies, and projects.
            </p>

          </Link>

        </div>

      </div>
    </main>
  );
};

export default Dashboard;