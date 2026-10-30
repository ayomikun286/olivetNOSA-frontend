import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Clock3,
  AlertCircle,
  RefreshCw,
  Heart,
} from "lucide-react";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import { verifyDonation } from "../../services/authService.js";

export default function DonationVerification() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const verifyPayment = async () => {
    if (!reference) {
      setError("No donation reference was provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await verifyDonation(reference);

      setResult(response);
    } catch (err) {
      console.error("Donation verification error:", err);
      setError(
        err.message || "Unable to verify your donation."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [reference]);

  const status = result?.donation?.status;

  const isSuccessful = status === "successful";
  const isPending = result?.pending || status === "pending";
  const isCancelled = status === "cancelled";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-5 py-24 flex items-center justify-center">
        <div className="w-full max-w-xl rounded-2xl bg-white p-8 md:p-12 shadow-lg text-center">

          {loading ? (
            <>
              <RefreshCw className="mx-auto mb-6 h-14 w-14 animate-spin text-[var(--primary)]" />

              <h1 className="text-2xl font-bold text-[var(--primary-dark)]">
                Verifying Your Donation
              </h1>

              <p className="mt-3 text-slate-500">
                Please wait while we confirm your payment with Paystack.
              </p>
            </>
          ) : error ? (
            <>
              <AlertCircle className="mx-auto mb-6 h-16 w-16 text-amber-500" />

              <h1 className="text-2xl font-bold text-[var(--primary-dark)]">
                Verification Unavailable
              </h1>

              <p className="mt-3 text-slate-500">
                {error}
              </p>

              <button
                onClick={verifyPayment}
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-white"
              >
                <RefreshCw size={18} />
                Try Again
              </button>
            </>
          ) : isSuccessful ? (
            <>
              <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-green-600" />

              <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-dark)]">
                Thank You for Your Donation!
              </h1>

              <p className="mt-3 text-slate-500">
                Your donation has been successfully received.
                Your generosity helps us make a difference.
              </p>

              <div className="mt-7 rounded-xl bg-slate-50 p-5 text-left">
                <p className="text-sm text-slate-500">
                  Amount Donated
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--primary-dark)]">
                  ₦{Number(result.donation.amount).toLocaleString()}
                </p>

                <p className="mt-4 text-xs text-slate-500">
                  Reference
                </p>

                <p className="break-all text-sm font-medium">
                  {result.donation.reference}
                </p>
              </div>
            </>
          ) : isPending ? (
            <>
              <Clock3 className="mx-auto mb-6 h-16 w-16 text-amber-500" />

              <h1 className="text-2xl font-bold text-[var(--primary-dark)]">
                Payment Still Processing
              </h1>

              <p className="mt-3 text-slate-500">
                Your payment is still being confirmed. Please check again shortly.
              </p>

              <button
                onClick={verifyPayment}
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-white"
              >
                <RefreshCw size={18} />
                Check Again
              </button>
            </>
          ) : (
            <>
              <XCircle className="mx-auto mb-6 h-16 w-16 text-red-500" />

              <h1 className="text-2xl font-bold text-[var(--primary-dark)]">
                {isCancelled
                  ? "Donation Checkout Cancelled"
                  : "Payment Unsuccessful"}
              </h1>

              <p className="mt-3 text-slate-500">
                {result?.message ||
                  "We couldn't confirm your donation payment."}
              </p>

              {result?.donation?.reference && (
                <p className="mt-5 break-all text-xs text-slate-400">
                  Reference: {result.donation.reference}
                </p>
              )}
            </>
          )}

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-[var(--primary)] hover:underline"
          >
            <Heart size={17} />
            Return to Homepage
          </Link>

        </div>
      </main>

      <Footer />
    </>
  );
}