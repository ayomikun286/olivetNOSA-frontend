import React, { useEffect, useState } from "react";

import {
  LockKeyhole,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { setPassword as submitPassword,verifyAccountSetup, } from "../../services/authService.js";

const SetPassword = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [password, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [checkingToken, setCheckingToken] = useState(true);
  const [tokenError, setTokenError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  // ========================================
  // GET TOKEN
  // ========================================

  const token = new URLSearchParams(
    window.location.search
  ).get("token");

  // ========================================
  // VERIFY ACTIVATION TOKEN
  // ========================================

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenError(
          "This activation link is missing or invalid."
        );
        setCheckingToken(false);
        return;
      }

      try {
        await verifyAccountSetup(token);
      } catch (error) {
        setTokenError(
          error.message ||
            "This activation link is invalid or has expired."
        );
      } finally {
        setCheckingToken(false);
      }
    };

    verifyToken();
  }, [token]);

  // ========================================
  // SUBMIT PASSWORD
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setTokenError("Invalid activation link.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);

      await submitPassword(
        token,
        password,
        confirmPassword
      );

      navigate("/portal/login", {
        state: {
          alert: {
            type: "success",
            title: "Account Activation Successful",
            message:
              "Your account has been activated. You can now log in.",
          },
        },
      });
    } catch (error) {
      alert(
        error.message ||
          "Unable to set your password. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ========================================
  // VERIFYING TOKEN
  // ========================================

  if (checkingToken) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#123B6D]" />

          <h2 className="text-lg font-semibold text-[#123B6D]">
            Verifying your activation link
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please wait a moment...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // INVALID / EXPIRED TOKEN
  // ========================================

  if (tokenError) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#123B6D] text-white shadow-lg">
              <LockKeyhole size={26} />
            </div>

            <h1 className="text-2xl font-bold text-[#123B6D]">
              Account Activation
            </h1>
          </div>

          <div className="rounded border border-gray-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <XCircle size={28} />
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              Activation Link Invalid
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {tokenError}
            </p>

            <button
              type="button"
              onClick={() => navigate("/portal/login")}
              className="mt-6 w-full rounded bg-[#123B6D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0B294D]"
            >
              Go to Login
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            OlivetNOSA • Secure Member Portal
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // VALID TOKEN → PASSWORD FORM
  // ========================================

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#123B6D] text-white shadow-lg">
            <LockKeyhole size={26} />
          </div>

          <h1 className="text-2xl font-bold text-[#123B6D]">
            Set Your Password
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Welcome to OlivetNOSA. Create your password to
            activate your account and continue to your
            member dashboard.
          </p>
        </div>

        {/* Form */}
        <div className="rounded border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPasswordValue(e.target.value)
                  }
                  placeholder="Create a password"
                  required
                  disabled={submitting}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#123B6D] focus:ring-2 focus:ring-[#123B6D]/10 disabled:bg-gray-50"
                />

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={
                    showConfirm ? "text" : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm your password"
                  required
                  disabled={submitting}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#123B6D] focus:ring-2 focus:ring-[#123B6D]/10 disabled:bg-gray-50"
                />

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() =>
                    setShowConfirm((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                >
                  {showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirement */}
            <div className="rounded bg-[#F5F8FC] p-4">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-[#123B6D]"
                />

                <span>
                  Use at least 8 characters with a
                  combination of letters and numbers.
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center rounded bg-[#123B6D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0B294D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Activating Account...
                </>
              ) : (
                "Set Password"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          OlivetNOSA • Secure Member Portal
        </p>
      </div>
    </div>
  );
};

export default SetPassword;