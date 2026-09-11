import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { checkVerificationStatus } from "../../services/authService.js";
import PageTitle from "../../components/common/PageTitle.jsx";
import ResendVerificationButton from "../../components/common/ResendVerificationButton.jsx.jsx";

const VerifyEmail = () => {
  const location = useLocation();

  const email = location.state?.email;

  const [isVerified, setIsVerified] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!email || isVerified) return;

    let mounted = true;
    let pollInterval;

    const checkStatus = async () => {
      try {
        if (!mounted) return;

        setChecking(true);

        const response = await checkVerificationStatus(email);

        if (
          response?.ok &&
          response?.data?.data?.isEmailVerified === true
        ) {
          if (!mounted) return;

          setIsVerified(true);

          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error(
          "Verification status check failed:",
          error
        );
      } finally {
        if (mounted) {
          setChecking(false);
        }
      }
    };

    // Check immediately
    checkStatus();

    // Then check every 2.5 seconds
    pollInterval = setInterval(checkStatus, 2500);

    return () => {
      mounted = false;
      clearInterval(pollInterval);
    };
  }, [email, isVerified]);

  // =========================================================
  // NO EMAIL
  // =========================================================

  if (!email) {
    return (
      <div className="verify-email-page">
        <PageTitle title="Verify Email | OlivetNOSA" />

        <div className="verify-email-card">
          <div className="py-4 text-center">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Mail size={42} strokeWidth={1.8} />
            </div>

            <h1>Verification email not found</h1>

            <p className="verify-email-description">
              We couldn't determine which email address
              is being verified.
            </p>

            <Link
              to="/portal/signup"
              className="back-login"
            >
              <ArrowLeft size={17} />
              Back to Sign Up
            </Link>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="verify-email-page">
      <PageTitle title="Verify Email | OlivetNOSA" />

      <div className="verify-email-card">

        {/* =====================================================
            VERIFIED
        ====================================================== */}

        {isVerified ? (
          <div className="py-4 text-center">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2
                size={48}
                strokeWidth={2}
              />
            </div>

            <h1 className="text-emerald-700">
              Email Verified Successfully!
            </h1>

            <p className="verify-email-message font-bold text-[var(--primary-dark)]">
              Your email address has been verified.
            </p>

            <p className="verify-email-description">
              Your email verification is complete.
              You can now continue to login to your
              Olivet NOSA account.
            </p>

            <Link
              to="/portal/login"
              className="back-login"
            >
              Continue to Login
            </Link>

          </div>

        ) : (

          /* ===================================================
             WAITING
          ==================================================== */

          <>
            <div className="verify-email-icon relative">

              <Mail
                size={42}
                strokeWidth={1.8}
              />

              {checking && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--secondary)] opacity-75" />

                  <span className="relative inline-flex h-4 w-4 rounded-full bg-[var(--secondary)]" />

                </span>
              )}

            </div>

            <h1>
              Check your email
            </h1>

            <p className="verify-email-message">
              Your account is almost ready.
            </p>

            <p className="verify-email-description">
              We've sent a verification link to{" "}
              <strong>{email}</strong>.
              Please check your inbox and click the
              link to verify your email address.
            </p>

            <div className="mb-6 flex items-center justify-center gap-2 rounded-xl border border-slate-200/60 bg-slate-50 px-4 py-2.5 text-xs font-medium text-[var(--text-secondary)]">

              <LoaderCircle
                size={14}
                className="animate-spin text-[var(--secondary)]"
              />

              <span>
                Waiting for you to verify your email...
              </span>

            </div>

            <div className="email-help-box">

              <div className="email-help-icon">
                💡
              </div>

              <div>

                <h3>
                  Can't find the email?
                </h3>

                <p>
                  Check your{" "}
                  <strong>Spam</strong> or{" "}
                  <strong>Junk</strong> folder.
                  You can also search your inbox for{" "}
                  <strong>"Olivet NOSA"</strong>.
                </p>

                <p>
                  It may take a minute for the email
                  to arrive.
                </p>

              </div>

            </div>

            <p className="verification-expiry">
              Your verification link will expire after{" "}
              <strong>30 minutes</strong>.
            </p>

            <ResendVerificationButton email={email} />

            <Link
              to="/portal/login"
              className="back-login"
            >
              <ArrowLeft size={17} />
              Back to Login
            </Link>

          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;