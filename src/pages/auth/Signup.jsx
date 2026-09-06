import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import PageTitle  from "../../components/common/PageTitle.jsx";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    alumniId: "",
    enrollmentYear: "",
    graduationYear: "",
    yearSet: "",
    chapter: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agree) {
      alert("Please accept the Terms and Privacy Policy.");
      return;
    }

    // Backend registration will be connected here later.
    console.log("Create account:", formData);
  };

  return (
    <main className="min-h-screen bg-[var(--background-soft)]">
      
      
      <PageTitle title="Create Account | OlivetNOSA" />
      <div className="grid w-screen h-screen overflow-hidden lg:grid-cols-2">

        {/* =====================================================
            LEFT — BRAND / HERITAGE
        ===================================================== */}
        <section className="relative hidden overflow-hidden bg-[var(--primary-dark)] lg:block">

          <img
            src="/images/olivetNOSA-2.jpg"
            alt="Olivetians"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[var(--primary-dark)]/85" />

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)] via-[var(--primary-dark)]/60 to-transparent" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-16">

            {/* Logo */}
            <Link to="/" className="w-fit">
              <img
                src="/images/olivetNOSA_logo.png"
                alt="OlivetNOSA"
                className="h-16 w-auto invert"
              />
            </Link>

            {/* Content */}
            <div className="max-w-xl">

              <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                <span className="h-px w-10 bg-[var(--secondary)]" />
                Join the Community
              </div>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white xl:text-6xl">
                Your Olivet
                <span className="block text-[var(--secondary)]">
                  story continues here.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/70">
                Create your OlivetNOSA member account and stay connected
                with the people, memories and community that began at Olivet.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm text-white/50">
                <span className="h-8 w-px bg-[var(--secondary)]" />
                <span>Cum Christo Progredere</span>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT — CREATE ACCOUNT
        ===================================================== */}
        <section className="flex h-screen overflow-y-scroll items-start justify-center bg-white px-5 py-12 sm:px-8 lg:px-12 xl:px-20">

          <div className="w-full max-w-2xl">

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
                Member Registration
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-[var(--primary-dark)] sm:text-4xl">
                Create your account.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">
                Join the OlivetNOSA community and keep your connection to
                Olivet alive across generations.
              </p>

            </div>

            {/* =================================================
                FORM
            ================================================= */}
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* =================================================
                  PERSONAL INFORMATION
              ================================================= */}
              <div>

                <div className="mb-5 flex items-center gap-3">
                  

                  <div>
                    <h3 className="text-sm font-semibold text-[var(--primary-dark)]">
                      Personal information
                    </h3>

                    <p className="text-xs text-slate-400">
                      Tell us a little about yourself.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-[var(--primary-dark)]"
                    >
                      First Name *
                    </label>

                    <div className="relative">
                      <UserRound
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        required
                        className="h-13 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                      />
                    </div>
                  </div>

                  {/* Middle Name */}
                  <div>
                    <label
                      htmlFor="middleName"
                      className="mb-2 block text-sm font-medium text-[var(--primary-dark)]"
                    >
                      Middle Name
                    </label>

                    <input
                      id="middleName"
                      name="middleName"
                      type="text"
                      value={formData.middleName}
                      onChange={handleChange}
                      placeholder="Middle name"
                      className="h-13 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-[var(--primary-dark)]"
                    >
                      Last Name *
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                      className="h-13 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[var(--primary-dark)]"
                    >
                      Email Address *
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
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
                        className="h-13 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-[var(--primary-dark)]"
                    >
                      Phone Number *
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        required
                        className="h-13 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* =================================================
                  OLIVET INFORMATION
              ================================================= */}
              <div>

                <div className="mb-5 flex items-center gap-3">
                  
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--primary-dark)]">
                      Your Olivet history
                    </h3>

                    <p className="text-xs text-slate-400">
                      Help us connect you with your generation.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">

                  {/* Alumni ID */}
                  <div className="sm:col-span-3">
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="alumniId"
                        className="text-sm font-medium text-[var(--primary-dark)]"
                      >
                        Alumni ID
                      </label>

                      <span className="text-xs text-slate-400">
                        Optional for now
                      </span>
                    </div>

                    <input
                      id="alumniId"
                      name="alumniId"
                      type="text"
                      value={formData.alumniId}
                      onChange={handleChange}
                      placeholder="Enter your Alumni ID if you have one"
                      className="h-13 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                    />
                  </div>

                  {/* Enrollment Year */}
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="enrollmentYear"
                      className="mb-2 block text-sm font-medium text-[var(--primary-dark)]"
                    >
                      Enrollment Year *
                    </label>

                    <input
                      id="enrollmentYear"
                      name="enrollmentYear"
                      type="number"
                      min="1945"
                      max="2026"
                      value={formData.enrollmentYear}
                      onChange={handleChange}
                      placeholder="e.g. 1985"
                      required
                      className="h-13 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                    />
                  </div>

                  {/* Graduation Year */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="graduationYear"
                      className="mb-2 block text-sm font-medium text-[var(--primary-dark)]"
                    >
                      Graduation Year *
                    </label>

                    <input
                      id="graduationYear"
                      name="graduationYear"
                      type="number"
                      min="1945"
                      max="2026"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      placeholder="e.g. 1989"
                      required
                      className="h-13 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                    />
                  </div>

                 

                  {/* Chapter */}
                  <div>
                    <label
                      htmlFor="chapter"
                      className="mb-2 block text-sm font-medium text-[var(--primary-dark)] min-w-full"
                    >
                      Chapter *
                    </label>

                    <select
                      id="chapter"
                      name="chapter"
                      value={formData.chapter}
                      onChange={handleChange}
                      required
                      className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                    >
                      <option value="">Select Chapter</option>
                      <option value="Lagos">Lagos Chapter</option>
                      <option value="Ibadan">Ibadan Chapter</option>
                      <option value="Abuja">Abuja Chapter</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* =================================================
                  SECURITY
              ================================================= */}
              <div>

                <div className="mb-5 flex items-center gap-3">
                  

                  <div>
                    <h3 className="text-sm font-semibold text-[var(--primary-dark)]">
                      Account security
                    </h3>

                    <p className="text-xs text-slate-400">
                      Create a secure password for your account.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-[var(--primary-dark)]"
                    >
                      Password *
                    </label>

                    <div className="relative">

                      <LockKeyhole
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        required
                        minLength={8}
                        className="h-13 w-full rounded-xl border border-slate-200 pl-11 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[var(--primary)]"
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>

                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      Minimum 8 characters.
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-medium text-[var(--primary-dark)]"
                    >
                      Confirm Password *
                    </label>

                    <div className="relative">

                      <LockKeyhole
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repeat your password"
                        required
                        className="h-13 w-full rounded-xl border border-slate-200 pl-11 pr-11 text-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[var(--primary)]"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>

                    </div>
                  </div>

                </div>
              </div>

              {/* =================================================
                  TERMS
              ================================================= */}
              <label className="flex cursor-pointer items-start gap-3">

                <button
                  type="button"
                  onClick={() => setAgree(!agree)}
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                    agree
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {agree && <Check size={13} strokeWidth={3} />}
                </button>

                <span className="text-xs leading-5 text-slate-500">
                  I agree to the OlivetNOSA{" "}
                  <span className="font-medium text-[var(--primary)]">
                    Terms of Use
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-[var(--primary)]">
                    Privacy Policy
                  </span>
                  .
                </span>

              </label>

              {/* =================================================
                  CREATE ACCOUNT
              ================================================= */}
              <button
                type="submit"
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[var(--primary)] px-6 text-sm font-semibold text-white shadow-lg shadow-[var(--primary)]/15 transition hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] hover:shadow-xl"
              >
                Create Member Account

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

            </form>

            {/* =================================================
                LOGIN
            ================================================= */}
            <div className="mt-8 text-center">

              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/portal/login"
                  className="font-semibold text-[var(--primary)] transition hover:text-[var(--secondary)]"
                >
                  Sign in
                </Link>
              </p>

            </div>

            {/* Back Home */}
            <div className="mt-6 text-center">

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

export default Signup;