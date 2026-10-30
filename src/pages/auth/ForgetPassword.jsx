import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  LoaderCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import PageTitle from "../../components/common/PageTitle.jsx";
import { forgetPassword } from "../../services/authService.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await forgetPassword(email.trim());

      if (!response.ok) {
        setError(
          response.data?.message ||
            "Unable to process your request. Please try again."
        );
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Forgot password error:", err);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--light)] px-4 py-10 sm:py-16">
      <PageTitle title="Forgot Password | OlivetNOSA" />

      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">

        <div className="w-full">

          {/* BRAND / HEADER */}
          <div className="mb-7 text-center">

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10 shadow-lg shadow-blue-900/15">
              <ShieldCheck
                size={32}
                strokeWidth={1.8}
                className="text-[var(--primary)]"
              />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[var(--dark)] sm:text-3xl">
              Reset Your Password
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
              Don't worry, it happens. Enter the email address
              associated with your OlivetNOSA account and we'll
              send you a secure password reset link.
            </p>

          </div>

          {/* CARD */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">

            

            <div className="p-6 sm:p-8">

              {submitted ? (
                /* ============================= */
                /* SUCCESS STATE */
                /* ============================= */

                <div className="py-5 text-center">

                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2
                      size={36}
                      strokeWidth={1.8}
                    />
                  </div>

                  <h2 className="text-xl font-bold text-[var(--dark)]">
                    Check Your Email
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    If an account exists with{" "}
                    <strong className="font-semibold text-[var(--primary)]">
                      {email}
                    </strong>
                    , we've sent a password reset link.
                  </p>

                  <div className="mt-5 rounded-xl border border-blue-100 bg-[var(--light)] px-4 py-3 text-left">
                    <p className="text-xs leading-5 text-slate-600">
                      <strong className="text-[var(--primary)]">
                        Didn't receive it?
                      </strong>{" "}
                      Check your Spam or Junk folder. The reset
                      link will expire after 30 minutes.
                    </p>
                  </div>

                  <Link
                    to="/portal/login"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--dark)]"
                  >
                    <ArrowLeft size={17} />
                    Back to Login
                  </Link>

                </div>

              ) : (
                /* ============================= */
                /* FORM */
                /* ============================= */

                <form onSubmit={handleSubmit}>

                  {/* EMAIL ICON */}
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--light)] text-[var(--primary)]">
                      <Mail
                        size={35}
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[var(--dark)]"
                    >
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="Enter your email address"
                        autoComplete="email"
                        disabled={loading}
                        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                      />

                    </div>

                  </div>

                  {/* ERROR */}
                  {error && (
                    <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3">
                      <p className="text-sm font-medium text-red-600">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-900/10 transition hover:bg-[var(--dark)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle
                          size={18}
                          className="animate-spin"
                        />
                        Sending Reset Link...
                      </>
                    ) : (
                      <>
                        <Mail size={18} />
                        Send Reset Link
                      </>
                    )}
                  </button>

                  {/* SECURITY NOTE */}
                  <div className="mt-5 flex items-start gap-2 rounded-lg bg-slate-50 px-4 py-3">
                    <ShieldCheck
                      size={16}
                      className="mt-0.5 shrink-0 text-[var(--secondary)]"
                    />

                    <p className="text-xs leading-5 text-slate-500">
                      For your security, we'll only send a reset
                      link if an account is associated with the
                      email address provided.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

          {/* BACK TO LOGIN */}
          {!submitted && (
            <div className="mt-6 text-center">
              <Link
                to="/portal/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition hover:text-[var(--dark)]"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          )}

          {/* FOOTER */}
          <p className="mt-8 text-center text-xs text-slate-400">
            Olivet Baptist High School – Global Old Students Association
          </p>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;