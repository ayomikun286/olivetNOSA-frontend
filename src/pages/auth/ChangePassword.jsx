import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LockKeyhole,
    Eye,
    EyeOff,
    ShieldCheck,
    CheckCircle2,
    AlertCircle,
    Loader2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { changePassword } from "../../services/authService";

const ChangePassword = () => {
    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
    };

    const togglePassword = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const {
            currentPassword,
            newPassword,
            confirmPassword,
        } = formData;

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please complete all password fields.");
            return;
        }

        if (newPassword.length < 8) {
            setError("Your new password must contain at least 8 characters.");
            return;
        }

        if (newPassword === currentPassword) {
            setError("Your new password must be different from your temporary password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Your new passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await changePassword({
                currentPassword,
                newPassword,
                confirmPassword,
            });

            if (!response?.ok) {
                setError(
                    response?.data?.message ||
                    "Unable to change your password. Please try again."
                );
                return;
            }

            setSuccess("Your password has been changed successfully.");

            await checkAuth();

            setTimeout(() => {
                navigate("/portal/dashboard", { replace: true });
            }, 1200);

        } catch (err) {
            console.error("Change password error:", err);

            setError(
                err?.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen  flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md">

                {/* HEADER */}
                <div className="text-center mb-7">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B294D] shadow-lg">
                        <LockKeyhole size={29} className="text-[#C9A227]" />
                    </div>

                    <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-[#C9A227]">
                        Account Security
                    </p>

                    <h1 className="text-2xl font-bold text-[#0B294D]">
                        Change Your Password
                    </h1>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                        Before accessing your alumni account, please replace your temporary
                        password with a new, secure password.
                    </p>
                </div>

                {/* FORM CARD */}
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">

                    {/* NOTICE */}
                    <div className="mb-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                        <ShieldCheck
                            size={21}
                            className="mt-0.5 shrink-0 text-amber-600"
                        />

                        <p className="text-xs leading-5 text-amber-800">
                            Your account requires a password update. You must complete this
                            step before continuing to the member portal.
                        </p>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            <AlertCircle size={18} className="mt-0.5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    {/* SUCCESS */}
                    {success && (
                        <div className="mb-5 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                            <p>{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <PasswordField
                            label="Temporary Password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            visible={showPasswords.current}
                            toggle={() => togglePassword("current")}
                            onChange={handleChange}
                            loading={loading}
                            placeholder="Enter your temporary password"
                        />

                        <div className="border-t border-slate-100 pt-5">
                            <PasswordField
                                label="New Password"
                                name="newPassword"
                                value={formData.newPassword}
                                visible={showPasswords.new}
                                toggle={() => togglePassword("new")}
                                onChange={handleChange}
                                loading={loading}
                                placeholder="Create a new password"
                            />
                        </div>

                        <PasswordField
                            label="Confirm New Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            visible={showPasswords.confirm}
                            toggle={() => togglePassword("confirm")}
                            onChange={handleChange}
                            loading={loading}
                            placeholder="Enter your new password again"
                        />

                        <div className="rounded-lg bg-slate-50 p-3">
                            <p className="text-xs font-medium text-slate-600">
                                Password requirements
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                Your password must contain at least 8 characters.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || Boolean(success)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B6D] px-5 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#0B294D] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Updating Password...
                                </>
                            ) : (
                                <>
                                    <LockKeyhole size={17} />
                                    Update Password
                                </>
                            )}
                        </button>

                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    OlivetNOSA · Secure Member Portal
                </p>

            </div>
        </div>
    );
};

const PasswordField = ({
    label,
    name,
    value,
    visible,
    toggle,
    placeholder,
    onChange,
    loading,
}) => (
    <div>
        <label
            htmlFor={name}
            className="mb-2 block text-sm font-semibold text-[#0B294D]"
        >
            {label}
        </label>

        <div className="relative">
            <input
                id={name}
                type={visible ? "text" : "password"}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete="new-password"
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-sm text-[#0B294D] outline-none transition focus:border-[#123B6D] focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
            />

            <button
                type="button"
                onClick={toggle}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#123B6D]"
                aria-label={visible ? "Hide password" : "Show password"}
            >
                {visible ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
        </div>
    </div>
);

export default ChangePassword;