import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
    ArrowLeft,
    LockKeyhole,
    Eye,
    EyeOff,
    LoaderCircle,
    CheckCircle2,
    ShieldCheck,
} from "lucide-react";

import PageTitle from "../../components/common/PageTitle.jsx";
import { resetPassword } from "../../services/authService.js";

const Resetpassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!token) {
            setError(
                "This password reset link is invalid or missing."
            );
            return;
        }

        if (!password || !confirmPassword) {
            setError("Please fill in both password fields.");
            return;
        }

        if (password.length < 8) {
            setError(
                "Your new password must be at least 8 characters."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await resetPassword(
                token,
                password,
                confirmPassword
            );

            if (!response.ok) {
                setError(
                    response.data?.message ||
                    "Unable to reset your password. Please try again."
                );

                return;
            }

            setSuccess(true);

            setTimeout(() => {
                navigate("/portal/login", {
                    replace: true,
                    state: {
                        alert: {
                            type: "success",
                            title: "Password Reset Successful",
                            message:
                                "Your password has been reset successfully. Please log in with your new password.",
                        },
                    },
                });
            }, 2000);
        } catch (err) {
            console.error("Reset password error:", err);

            setError(
                "Unable to connect to the server. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--light)] px-4 py-10 sm:py-16">
            <PageTitle title="Reset Password | OlivetNOSA" />

            <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
                <div className="w-full">

                    {/* HEADER */}
                    <div className="mb-7 text-center">

                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10 shadow-lg shadow-blue-900/15">
                            <LockKeyhole
                                size={32}
                                strokeWidth={1.8}
                                className="text-[var(--primary)]"
                            />
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-[var(--dark)] sm:text-3xl">
                            Create a New Password
                        </h1>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
                            Choose a strong password to secure your
                            OlivetNOSA account.
                        </p>

                    </div>

                    {/* CARD */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">




                        <div className="p-6 sm:p-8">

                            {success ? (
                                /* ========================= */
                                /* SUCCESS */
                                /* ========================= */

                                <div className="py-6 text-center">

                                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                        <CheckCircle2
                                            size={38}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <h2 className="text-xl font-bold text-[var(--dark)]">
                                        Password Reset Successful
                                    </h2>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        Your password has been changed successfully.
                                        You can now log in using your new password.
                                    </p>

                                    <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-[var(--primary)]">
                                        <LoaderCircle
                                            size={14}
                                            className="animate-spin"
                                        />

                                        Redirecting you to login...
                                    </div>

                                </div>
                            ) : !token ? (
                                /* ========================= */
                                /* INVALID / MISSING TOKEN */
                                /* ========================= */

                                <div className="py-5 text-center">

                                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
                                        <LockKeyhole
                                            size={34}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <h2 className="text-xl font-bold text-[var(--dark)]">
                                        Invalid Reset Link
                                    </h2>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        This password reset link is missing or
                                        invalid. Please request a new password
                                        reset link.
                                    </p>

                                    <Link
                                        to="/portal//ForgotPassword"
                                        className="mt-6 inline-flex items-center justify-center rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition "
                                    >
                                        Request New Reset Link
                                    </Link>

                                </div>
                            ) : (
                                /* ========================= */
                                /* RESET FORM */
                                /* ========================= */

                                <form onSubmit={handleSubmit}>

                                    {/* PASSWORD */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="mb-2 block text-sm font-semibold text-[var(--dark)]"
                                        >
                                            New Password
                                        </label>

                                        <div className="relative">

                                            <LockKeyhole
                                                size={18}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    setError("");
                                                }}
                                                placeholder="Enter your new password"
                                                autoComplete="new-password"
                                                disabled={loading}
                                                className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        (prev) => !prev
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[var(--primary)]"
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

                                        <p className="mt-2 text-xs text-slate-500">
                                            Password must contain at least 8
                                            characters.
                                        </p>
                                    </div>

                                    {/* CONFIRM PASSWORD */}
                                    <div className="mt-5">

                                        <label
                                            htmlFor="confirmPassword"
                                            className="mb-2 block text-sm font-semibold text-[var(--dark)]"
                                        >
                                            Confirm New Password
                                        </label>

                                        <div className="relative">

                                            <LockKeyhole
                                                size={18}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                id="confirmPassword"
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    setConfirmPassword(
                                                        e.target.value
                                                    );
                                                    setError("");
                                                }}
                                                placeholder="Confirm your new password"
                                                autoComplete="new-password"
                                                disabled={loading}
                                                className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        (prev) => !prev
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[var(--primary)]"
                                                aria-label={
                                                    showConfirmPassword
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff size={18} />
                                                ) : (
                                                    <Eye size={18} />
                                                )}
                                            </button>

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
                                                Resetting Password...
                                            </>
                                        ) : (
                                            <>
                                                <LockKeyhole size={18} />
                                                Reset Password
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
                                            Your reset link is valid for 30 minutes.
                                            Once your password is changed, this link
                                            can no longer be used.
                                        </p>

                                    </div>

                                </form>
                            )}

                        </div>
                    </div>

                    {/* BACK TO LOGIN */}
                    {!success && (
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
                        Olivet Baptist High School – Global Old Students
                        Association
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Resetpassword;