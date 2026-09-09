import React, { useEffect, useRef, useState } from "react";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  CheckCircle,
  XCircle,
  LoaderCircle,
} from "lucide-react";

import PageTitle from "../../components/common/PageTitle.jsx";
import { VerifyEmail } from "../../services/authService.js";

const VerifyEmailLink = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  const verificationStarted = useRef(false);

  useEffect(() => {
    if (verificationStarted.current) {
      return;
    }

    verificationStarted.current = true;

    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing.");
        return;
      }

      try {
        const response = await VerifyEmail(token);

        if (!response.ok) {
          setStatus("error");

          setMessage(
            response.message ||
            "This verification link is invalid or has expired."
          );

          return;
        }

        setStatus("success");

        setMessage(
          response.message ||
          "Your email has been verified successfully."
        );

        setTimeout(() => {
          navigate("/portal/member/dashboard", {
            replace: true,
          });
        }, 1500);
      } catch (error) {
        console.error("Email verification error:", error);

        setStatus("error");
        setMessage(
          error.message ||
          "We couldn't verify your email. Please try again."
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <main className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center px-5 py-12">

      <PageTitle title="Verify Email | OlivetNOSA" />

      <div className="w-full max-w-md">

        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[var(--shadow-md)] sm:p-10">

          {/* VERIFYING */}

          {status === "verifying" && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary-light)]">

                <LoaderCircle
                  size={30}
                  className="animate-spin text-[var(--primary)]"
                />

              </div>

              <h1 className="text-2xl font-semibold text-[var(--primary-dark)]">
                Verifying your email
              </h1>

              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                Please wait while we verify your email address.
              </p>
            </>
          )}

          {/* SUCCESS */}

          {status === "success" && (
            <>
              <CheckCircle
                size={48}
                className="mx-auto text-emerald-600"
              />

              <h1 className="text-emerald-700">
                Email Verified Successfully!
              </h1>

              <p className="mt-3">
                {message}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Taking you to your dashboard...
              </p>

              <LoaderCircle
                size={18}
                className="mx-auto mt-4 animate-spin text-[var(--primary)]"
              />
            </>
          )}

          {/* ERROR */}

          {status === "error" && (
            <>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">

                <XCircle
                  size={32}
                  className="text-[var(--danger)]"
                  strokeWidth={1.8}
                />

              </div>

              <h1 className="text-2xl font-semibold text-[var(--primary-dark)]">
                Verification unsuccessful
              </h1>

              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                {message}
              </p>

              <p className="mt-4 text-xs leading-5 text-[var(--text-muted)]">
                The verification link may have expired or already been
                used.
              </p>

              <Link
                to="/portal/login"
                className="mt-8 flex h-12 w-full items-center justify-center rounded-xl border border-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary-light)]"
              >
                Back to Login
              </Link>
            </>
          )}

        </div>

        <div className="mt-6 text-center">

          <Link
            to="/"
            className="text-sm text-[var(--text-muted)] transition hover:text-[var(--primary)]"
          >
            ← Back to OlivetNOSA
          </Link>

        </div>

      </div>
    </main>
  );
};

export default VerifyEmailLink;