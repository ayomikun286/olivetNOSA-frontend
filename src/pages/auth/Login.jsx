import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import PageTitle  from "../../components/common/PageTitle.jsx";


const Login = () => {
  const [loginMethod, setLoginMethod] = useState("magic");

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    alumniId: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginMethod === "magic") {
      console.log("Request magic login link:", {
        email: formData.email,
      });

      return;
    }

    console.log("Password login:", {
      email: formData.email,
      alumniId: formData.alumniId,
      password: formData.password,
    });
  };

  return (
    <main className="min-h-screen bg-white">

      <PageTitle title="Login | OlivetNOSA" />  
      <div className="grid w-screen h-screen overflow-hidden lg:grid-cols-2">

        {/* =====================================================
            LEFT SIDE — OLIVET HERITAGE
        ===================================================== */}
        <section className="relative hidden min-h-screen overflow-hidden bg-[var(--primary-dark)] lg:block">

          <img
            src="/images/olivetNOSA-6.jpg"
            alt="Olivetians"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[var(--primary-dark)]/80" />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)] via-[var(--primary-dark)]/50 to-transparent" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-16">

            {/* Logo */}
            <Link to="/" className="w-fit">
              <img
                src="/images/olivetNOSA_logo.png"
                alt="OlivetNOSA"
                className="h-16 w-auto  invert"
              />
            </Link>

            {/* Bottom Content */}
            <div className="max-w-xl">

              <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                <span className="h-px w-10 bg-[var(--secondary)]" />
                Member Portal
              </div>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white xl:text-6xl">
                Your Olivet
                <span className="block text-[var(--secondary)]">
                  connection continues.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/70">
                Access your member profile, stay connected with fellow
                Olivetians and remain part of the community beyond school.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm text-white/50">
                <span className="h-8 w-px bg-[var(--secondary)]" />
                <span>Cum Christo Progredere</span>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT SIDE — LOGIN
        ===================================================== */}
        <section className="flex h-screen overflow-y-scroll items-start justify-center px-5 py-12 sm:px-8 lg:px-12 xl:px-20">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-10 lg:hidden w-fit">
              <Link to="/">
                <img
                  src="/images/olivetNOSA_logo.png"
                  alt="OlivetNOSA"
                  className="h-14 w-auto"
                />
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--secondary)]/20 bg-[var(--secondary-light)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--primary)]">
                <ShieldCheck size={14} />
                Secure Member Access
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-[var(--primary-dark)] sm:text-4xl">
                Welcome back.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)] sm:text-base">
                Sign in to your OlivetNOSA member account.
              </p>

            </div>

            {/* =================================================
                LOGIN METHOD SWITCH
            ================================================= */}
            <div className="mb-7 grid grid-cols-2 rounded-xl bg-slate-100 p-1">

              <button
                type="button"
                onClick={() => setLoginMethod("magic")}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                  loginMethod === "magic"
                    ? "bg-white text-[var(--primary)] shadow-sm"
                    : "text-slate-500 hover:text-[var(--primary)]"
                }`}
              >
                Email Link
              </button>

              <button
                type="button"
                onClick={() => setLoginMethod("password")}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                  loginMethod === "password"
                    ? "bg-white text-[var(--primary)] shadow-sm"
                    : "text-slate-500 hover:text-[var(--primary)]"
                }`}
              >
                Password
              </button>

            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[var(--primary-dark)]"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                  />

                </div>
              </div>

              {/* ALUMNI ID — PASSWORD MODE */}
              {loginMethod === "password" && (
                <div>

                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="alumniId"
                      className="text-sm font-medium text-[var(--primary-dark)]"
                    >
                      Alumni ID
                    </label>

                    <span className="text-xs text-slate-400">
                      Optional
                    </span>
                  </div>

                  <div className="relative">

                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="alumniId"
                      name="alumniId"
                      type="text"
                      value={formData.alumniId}
                      onChange={handleChange}
                      placeholder="Enter your Alumni ID"
                      className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                    />

                  </div>

                </div>
              )}

              {/* PASSWORD */}
              {loginMethod === "password" && (
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-[var(--primary-dark)]"
                    >
                      Password
                    </label>

                    <Link
                      to="/portal/forgot-password"
                      className="text-xs font-medium text-[var(--primary)] hover:text-[var(--secondary)]"
                    >
                      Forgot password?
                    </Link>

                  </div>

                  <div className="relative">

                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[var(--primary)]"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>
              )}

              {/* MAGIC LINK INFO */}
              {loginMethod === "magic" && (
                <div className="rounded-xl border border-[var(--primary)]/10 bg-[var(--primary-light)] p-4">

                  <div className="flex gap-3">

                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-[var(--primary)]"
                    />

                    <p className="text-sm leading-6 text-[var(--primary-dark)]">
                      We'll send a secure sign-in link to your email.
                      No password required.
                    </p>

                  </div>

                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[var(--primary)] px-6 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-xl"
              >

                {loginMethod === "magic"
                  ? "Send Sign-in Link"
                  : "Sign in"}

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />

              </button>

            </form>

            {/* SIGN UP */}
            <div className="my-8 flex items-center gap-4">

              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs uppercase tracking-wider text-slate-400">
                New to NOSA?
              </span>

              <div className="h-px flex-1 bg-slate-200" />

            </div>

            <Link
              to="/portal/signup"
              className="flex h-14 w-full items-center justify-center rounded-xl border border-[var(--primary)]/20 text-sm font-semibold text-[var(--primary)] transition hover:border-[var(--secondary)] hover:bg-[var(--secondary-light)]"
            >
              Create your member account
            </Link>

            {/* HOME */}
            <div className="mt-8 text-center">

              <Link
                to="/"
                className="text-sm text-slate-400 transition hover:text-[var(--primary)]"
              >
                ← Back to OlivetNOSA
              </Link>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
};

export default Login;