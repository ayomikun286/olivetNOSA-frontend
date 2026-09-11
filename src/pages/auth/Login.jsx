import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import PageTitle from "../../components/common/PageTitle.jsx";
import Alert from "../../components/common/Alert.jsx";
import NosaLoader from "../../components/common/NosaLoader.jsx";

import { LoginUser } from "../../services/authService.js";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();






  // FORM STATE
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState(() => location.state?.alert || null);
  
  //  useEffect(() => {

  //   if (location.state?.alert) {
  //     setAlert(location.state.alert);
  //   }
  // }, [location.state]);


  const showAlert = (type, title, message) => {
    setAlert({
      type,
      title,
      message,
    });
  };

  // ========================================
  // HANDLE CHANGE
  // Same pattern as Signup
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    setError((prev) => ({
      ...prev,
      [name]: "",
      server: "",
    }));


  };

  // ========================================
  // HANDLE SUBMIT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    setAlert(null);
    setError({});

    // ========================================
    // FRONTEND VALIDATION
    // ========================================

    const newErrors = {};

    if (!formData.login.trim()) {
      newErrors.login = "Email address or Alumni ID is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    // ========================================
    // SHOW FIELD ERRORS
    // ========================================

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);

      showAlert(
        "error",
        "Please complete the required fields",
        "Check the highlighted fields below and try again."
      );

      return;
    }

    // ========================================
    // LOGIN
    // ========================================

    try {
      setLoader(true);

      const payload = {
        login: formData.login.trim(),
        password: formData.password,
      };

      const response = await LoginUser(payload);

      // ========================================
      // BACKEND ERROR
      // Same pattern as Signup
      // ========================================

      if (!response?.ok) {
        const message =
          response?.data?.message ||
          "Invalid email/Alumni ID or password.";

        setError({
          server: message,
        });

        showAlert(
          "error",
          "Login failed",
          message
        );

        return;
      }

      // ========================================
      // SUCCESS
      // ========================================

      showAlert(
        "success",
        "Login successful",
        "Welcome back to OlivetNOSA."
      );

      setRedirect(true);

      // Give the success alert/loader a moment
      setTimeout(() => {
        navigate("/portal/member/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Login error:", err);

      const message =
        err?.message ||
        "We couldn't complete your login. Please try again.";

      setError({
        server: message,
      });

      showAlert(
        "error",
        "Something went wrong",
        message
      );
    } finally {
      setLoader(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <PageTitle title="Login | OlivetNOSA" />

      {/* REDIRECT LOADER */}
      {redirect && <NosaLoader />}



      {/* ALERT */}
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}


      {/* {location.state?.alert && (
        <Alert
          type={location.state.alert.type}
          title={location.state.alert.title}
          message={location.state.alert.message}
          onClose={() => setAlert(null)}
        />
      )} */}

      <div className="grid min-h-screen w-screen overflow-hidden lg:grid-cols-2">

        {/* ========================================
            LEFT HERITAGE SECTION
        ======================================== */}

        <section className="relative hidden min-h-screen overflow-hidden lg:block">

          <img
            src="/images/olivetNOSA-6.jpg"
            alt="Olivet Baptist High School"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">

            {/* LOGO */}
            <div>
              <img
                src="/images/olivetNOSA_logo.png"
                alt="OlivetNOSA"
                className="w-32"
              />
            </div>

            {/* HERITAGE MESSAGE */}
            <div className="max-w-xl text-white">

              <div className="mb-5 flex items-center gap-2">
                <div className="h-px w-10 bg-white/70" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                  Welcome Back
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Your Olivet connection
                <span className="block text-white/80">
                  continues.
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/75">
                Stay connected with fellow Old Students, reconnect
                with your year set, support the school and continue
                the legacy of Olivet Baptist High School.
              </p>

            </div>

            {/* FOOTER */}
            <div className="text-xs text-white/60">
              Olivet Baptist High School, Olivet Heights, Oyo, Nigeria
            </div>

          </div>
        </section>

        {/* ========================================
            RIGHT LOGIN SECTION
        ======================================== */}

        <section className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">

          <div className="w-full max-w-md">

            {/* HEADER */}
            <div className="mb-8">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                <ShieldCheck
                  size={24}
                  className="text-[var(--primary)]"
                />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to continue to your OlivetNOSA account.
              </p>

            </div>






            {/* FORM*/}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/*EMAIL / ALUMNI ID*/}

              <div>

                <label
                  htmlFor="login"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email / Alumni ID
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="login"
                    name="login"
                    type="text"
                    value={formData.login}
                    onChange={handleChange}
                    placeholder="Enter your email or Alumni ID"
                    autoComplete="username"
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${error.login
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-200 focus:border-[var(--primary)]"
                      }`}
                  />

                </div>





                {/* FIELD ERROR */}
                {error.login && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {error.login}
                  </p>
                )}

              </div>






              {/* PASSWORD*/}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/portal/forgot-password"
                    className="text-xs font-medium text-[var(--primary)] hover:underline"
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
                    autoComplete="current-password"
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${error.password
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-200 focus:border-[var(--primary)]"
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>




                {/* FIELD ERROR */}
                {error.password && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {error.password}
                  </p>
                )}

              </div>







              {/*SERVER ERROR */}

              {error.server && (
                <div className="">
                  <p className="text-sm leading-6 text-red-600">
                    {error.server}
                  </p>
                </div>
              )}





              {/*SUBMIT*/}
              <button
                type="submit"
                disabled={loader}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loader ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign in

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}

              </button>

            </form>

          
                {/* SIGN UP
            ======================================== */} 

            <div className="mt-8 text-center">

              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/portal/signup"
                  className="font-semibold text-[var(--primary)] hover:underline"
                >
                  Create an account
                </Link>
              </p>

            </div>

        



            <div className="mt-6 text-center">

              <Link
                to="/"
                className="text-xs font-medium text-slate-400 transition hover:text-slate-700"
              >
                ← Back to home
              </Link>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Login;