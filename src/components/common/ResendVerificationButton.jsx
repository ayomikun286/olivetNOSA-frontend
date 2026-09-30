import React, { useEffect, useState } from "react";
import { Mail, LoaderCircle } from "lucide-react";
import { resendVerifyLink } from "../../services/authService.js";

const ResendVerificationButton = ({ email }) => {
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================================
  // COOLDOWN TIMER
  // =========================================================

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // =========================================================
  // RESEND VERIFICATION
  // =========================================================

  const handleResend = async () => {
    if (!email || resending || cooldown > 0) return;

    setResending(true);
    setMessage("");
    setError("");

    try {
      const response = await resendVerifyLink(email);

      if (!response.ok) {
        setError(
          response.data?.message ||
            "Unable to resend verification email."
        );

        return;
      }

      setMessage(
        response.data?.message ||
          "A new verification link has been sent to your email."
      );

      // Prevent repeated requests
      setCooldown(60);

    } catch (err) {
      console.error(
        "Resend verification failed:",
        err
      );

      setError(
        err.message ||
          "Unable to resend verification email."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="mt-6 text-center">

      <button
        type="button"
        onClick={handleResend}
        disabled={
          !email ||
          resending ||
          cooldown > 0
        }
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--primary)] px-5 py-2.5 font-semibold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {resending ? (
          <>
            <LoaderCircle
              size={17}
              className="animate-spin"
            />

            Sending...
          </>
        ) : cooldown > 0 ? (
          <>
            <Mail size={17} />

            Resend in {cooldown}s
          </>
        ) : (
          <>
            <Mail size={17} />

            Resend Verification Email
          </>
        )}
      </button>

      {message && (
        <p className="mt-3 text-sm font-medium text-emerald-600">
          {message}
        </p>
      )}

      {error && (
        <p className="mt-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

    </div>
  );
};

export default ResendVerificationButton;