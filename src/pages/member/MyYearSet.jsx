import React, { useEffect, useState } from "react";
import {
    Users,
    Wallet,
    CircleDollarSign,
    AlertCircle,
    CalendarDays,
    UserRound,
    ArrowUpRight,
    CheckCircle2,
    X,
    CreditCard,
    Loader2,
} from "lucide-react";

import PageTitle from "../../components/common/PageTitle.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getyearSetObligation } from "../../services/yearSetService.js";

const MyYearSet = () => {
    const { user } = useAuth();

    const [yearSetData, setYearSetData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const [paymentModal, setPaymentModal] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState("");

    useEffect(() => {
        const fetchYearSet = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getyearSetObligation();
                console.log(data)

                setYearSetData(data);
            } catch (err) {
                console.error("Fetch year set error:", err);

                setError(
                    err.message || "Failed to load year set information."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchYearSet();
    }, []);

    // ========================================
    // DATA
    // ========================================

    const yearSet = yearSetData?.yearSet || user?.yearSet;
    const summary = yearSetData?.summary;
    const obligations = yearSetData?.obligations || [];
    const members = yearSetData?.members || [];
    const recentActivity = yearSetData?.recentActivity || [];

    console.log(recentActivity)

    const totalDue = Number(summary?.totalDue || 0);
    const amountPaid = Number(summary?.amountPaid || 0);
    const outstanding = Number(summary?.outstanding || 0);
    const memberCount = Number(summary?.memberCount || 0);

    const contributionProgress =
        totalDue > 0
            ? Math.min((amountPaid / totalDue) * 100, 100)
            : 0;

    // ========================================
    // HELPERS
    // ========================================

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };



    const handlePayNow = (obligation) => {
        const amountDue = Number(obligation.amountDue || 0);
        const amountPaid = Number(obligation.amountPaid || 0);

        const outstanding = Math.max(
            amountDue - amountPaid,
            0
        );

        setPaymentModal({
            ...obligation,
            outstanding,
        });

        setPaymentAmount(outstanding.toString());
        setPaymentError("");
    };

    const handleInitializePayment = async () => {
        if (!paymentModal) return;

        const amount = Number(paymentAmount);

        if (!Number.isFinite(amount) || amount <= 0) {
            setPaymentError("Please enter a valid payment amount.");
            return;
        }

        if (amount > paymentModal.outstanding) {
            setPaymentError(
                `Amount cannot exceed the outstanding balance of ₦${paymentModal.outstanding.toLocaleString()}.`
            );
            return;
        }

        setPaymentLoading(true);
        setPaymentError("");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/payments/initialize`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        obligationAssignmentId: paymentModal._id,
                        amount,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to initialize payment."
                );
            }

            window.location.href = data.authorizationUrl;
        } catch (error) {
            console.error(
                "Payment initialization error:",
                error
            );

            setPaymentError(
                error.message ||
                "Unable to initialize payment."
            );

            setPaymentLoading(false);
        }
    };


    return (
        <>
            <PageTitle title="My Year Set | OlivetNOSA" />

            <div className="p-4">
                <div className="space-y-4">

                    {/* ========================================
                        PAGE INTRO
                    ======================================== */}

                    <div className="flex flex-col mb-5  sm:flex-row sm:items-end sm:justify-between gap-3">
                        <div>
                           
                       
                              <h1 className="text-xl md:text-2xl font-semibold text-(--primary) mt-1">
                                Year Set Contributions
                            </h1>

                            <p className="text-sm text-(--secondary) mt-1">
                               Track your year set's financial responsibility.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <Users size={19} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-(--primary)">
                                    {yearSet?.name || "Year Set"}
                                </p>

                                <p className="text-xs text-(--text-muted) mt-0.5">
                                    {yearSet?.year ||
                                        user?.graduationYear ||
                                        "—"}{" "}
                                    Set
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ========================================
                        ERROR
                    ======================================== */}

                    {error && (
                        <div className="border border-(--danger)/20 bg-(--danger)/5 rounded-md px-4 py-3">
                            <div className="flex items-center gap-2">
                                <AlertCircle
                                    size={16}
                                    className="text-(--danger)"
                                />

                                <p className="text-sm text-(--danger)">
                                    {error}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ========================================
                        FINANCIAL OVERVIEW
                    ======================================== */}

                    <div className="space-y-3">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">

                            {/* MAIN BALANCE */}

                            <div className="lg:col-span-2 rounded bg-(--primary) text-white p-5 relative overflow-hidden">
                                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/5" />

                                <div className="absolute -right-3 -bottom-10 w-24 h-24 rounded-full bg-(--secondary)/10" />

                                <div className="relative">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                                                <Wallet size={18} />
                                            </div>

                                            <span className="text-sm text-white/75">
                                                Outstanding balance
                                            </span>
                                        </div>

                                        {!loading && outstanding > 0 && (
                                            <span className="text-xs bg-(--secondary) text-(--primary) px-2 py-1 rounded font-semibold">
                                                Action needed
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-3xl font-bold mt-7">
                                        {loading
                                            ? "—"
                                            : formatCurrency(outstanding)}
                                    </h3>

                                    <p className="text-sm text-white/65 mt-1">
                                        remaining from{" "}
                                        {loading
                                            ? "—"
                                            : formatCurrency(totalDue)}
                                    </p>

                                    <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                                        <div
                                            className="h-full bg-(--secondary) rounded-full transition-all duration-500"
                                            style={{
                                                width: loading
                                                    ? "0%"
                                                    : `${contributionProgress}%`,
                                            }}
                                        />
                                    </div>

                                    <div className="flex justify-between text-xs mt-2 text-white/60">
                                        <span>
                                            {loading
                                                ? "—"
                                                : `${formatCurrency(amountPaid)} paid`}
                                        </span>

                                        <span>
                                            {loading
                                                ? "—"
                                                : `${Math.round(
                                                    contributionProgress
                                                )}%`}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* PAID */}

                            <div className="rounded bg-(--bg-white) border border-(--border) p-5">
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-lg bg-green-50 text-(--success) flex items-center justify-center">
                                        <CheckCircle2 size={20} />
                                    </div>

                                    <span className="text-xs text-(--text-muted)">
                                        Total
                                    </span>
                                </div>

                                <p className="text-sm text-(--secondary) mt-5">
                                    Amount paid
                                </p>

                                <h3 className="text-2xl font-bold text-(--primary) mt-1">
                                    {loading
                                        ? "—"
                                        : formatCurrency(amountPaid)}
                                </h3>

                                <p className="text-xs text-(--text-muted) mt-2">
                                    Official year set payments
                                </p>
                            </div>

                            {/* MEMBERS */}

                            <div className="rounded bg-(--bg-white) border border-(--border) p-5">
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                        <Users size={20} />
                                    </div>

                                    <span className="text-xs text-(--text-muted)">
                                        Active
                                    </span>
                                </div>

                                <p className="text-sm text-(--secondary) mt-5">
                                    Year set members
                                </p>

                                <h3 className="text-2xl font-bold text-(--primary) mt-1">
                                    {loading ? "—" : memberCount}
                                </h3>

                                <p className="text-xs text-(--text-muted) mt-2">
                                    Members assigned to this set
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ========================================
                        YEAR SET OBLIGATIONS
                    ======================================== */}

                    <section className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                        <div className="p-5 border-b border-(--border) flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <h2 className="font-semibold text-(--primary)">
                                    Year Set Obligations
                                </h2>

                                <p className="text-sm text-(--secondary) mt-1">
                                    View all financial obligations assigned to your year set.
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-(--secondary)">
                                <CircleDollarSign size={15} />

                                {obligations.length} obligation
                                {obligations.length !== 1 ? "s" : ""}
                            </div>
                        </div>

                        {loading ? (
                            <div className="p-10 text-center">
                                <p className="text-sm text-(--secondary)">
                                    Loading obligations...
                                </p>
                            </div>
                        ) : obligations.length === 0 ? (
                            <div className="p-10 text-center">
                                <div className="w-12 h-12 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                    <CheckCircle2 size={22} />
                                </div>

                                <h3 className="font-semibold text-(--primary) mt-4">
                                    No obligations assigned
                                </h3>

                                <p className="text-sm text-(--secondary) mt-1 max-w-md mx-auto">
                                    There are currently no financial obligations assigned to this year set.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-(--border) max-h-[450px] overflow-y-auto scrollbar-hide">
                                {obligations.map((item) => {
                                    const due = Number(item.amountDue || 0);
                                    const paid = Number(item.amountPaid || 0);

                                    const remaining = Math.max(
                                        due - paid,
                                        0
                                    );

                                    const progress = due
                                        ? Math.min((paid / due) * 100, 100)
                                        : 0;

                                    const isPaid = remaining === 0;

                                    return (
                                        <div
                                            key={item._id}
                                            className="p-5 sm:p-6"
                                        >
                                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                                                {/* OBLIGATION INFO */}

                                                <div className="flex items-start gap-3.5 min-w-0">
                                                    <div className="w-10 h-10 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                                        <CircleDollarSign
                                                            size={18}
                                                        />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h3 className="text-sm font-semibold text-(--primary)">
                                                            {item.obligation
                                                                ?.name ||
                                                                "Year Set Obligation"}
                                                        </h3>

                                                        <p className="text-xs text-(--secondary) mt-1 leading-relaxed max-w-2xl">
                                                            {item.obligation
                                                                ?.description ||
                                                                "Official year set contribution"}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-(--text-muted)">
                                                            <span className="flex items-center gap-1">
                                                                <CalendarDays
                                                                    size={13}
                                                                />

                                                                Due{" "}
                                                                {formatDate(
                                                                    item.dueDate
                                                                )}
                                                            </span>

                                                            <span>
                                                                Year Set
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* AMOUNT + STATUS */}

                                                <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0">
                                                    <div className="lg:text-right">
                                                        <p className="text-[11px] text-(--text-muted)">
                                                            Amount due
                                                        </p>

                                                        <p className="text-sm font-semibold text-(--primary) mt-0.5">
                                                            {formatCurrency(
                                                                due
                                                            )}
                                                        </p>
                                                    </div>

                                                    <span
                                                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full ${isPaid
                                                            ? "text-(--success) bg-(--success-light)"
                                                            : "text-(--warning) bg-(--warning-light)"
                                                            }`}
                                                    >
                                                        {isPaid ? (
                                                            <CheckCircle2
                                                                size={13}
                                                            />
                                                        ) : (
                                                            <AlertCircle
                                                                size={13}
                                                            />
                                                        )}

                                                        {isPaid
                                                            ? "Paid"
                                                            : "Outstanding"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* PAYMENT PROGRESS */}

                                            <div className="mt-5 pt-4 border-t border-(--border)">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs text-(--secondary)">
                                                                {paid > 0
                                                                    ? `${formatCurrency(
                                                                        paid
                                                                    )} paid`
                                                                    : "No payment recorded"}
                                                            </span>

                                                            <span className="text-xs font-semibold text-(--primary)">
                                                                {Math.round(
                                                                    progress
                                                                )}
                                                                %
                                                            </span>
                                                        </div>

                                                        <div className="h-1.5 bg-(--bg-light) rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-(--success) rounded-full transition-all"
                                                                style={{
                                                                    width: `${progress}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:w-32 shrink-0">
                                                        <p className="text-[11px] text-(--text-muted)">
                                                            Outstanding
                                                        </p>

                                                        <p
                                                            className={`text-sm font-semibold mt-0.5 ${remaining > 0
                                                                ? "text-(--primary)"
                                                                : "text-(--success)"
                                                                }`}
                                                        >
                                                            {formatCurrency(
                                                                remaining
                                                            )}
                                                        </p>
                                                    </div>

                                                    {remaining > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handlePayNow(item)}
                                                            className="
                                                                    inline-flex
                                                                    items-center
                                                                    justify-center
                                                                    gap-1.5
                                                                    bg-(--primary)
                                                                    text-white
                                                                    px-4
                                                                    py-2
                                                                    rounded
                                                                    text-xs
                                                                    font-semibold
                                                                    hover:bg-(--primary-dark)
                                                                    transition
                                                                    shrink-0
                                                                "
                                                        >
                                                            Pay now
                                                            <ArrowUpRight size={14} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* ========================================
                        MEMBERS + PAYMENT
                    ======================================== */}

                    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4">

                        {/* MEMBERS */}

                        <section className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-(--border)">
                                <div>
                                    <h2 className="font-semibold text-(--primary)">
                                        Year Set Members
                                    </h2>

                                    <p className="text-sm text-(--secondary) mt-1">
                                        Active members assigned to your year set.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-(--secondary)">
                                    <Users size={15} />

                                    {memberCount} member
                                    {memberCount !== 1 ? "s" : ""}
                                </div>
                            </div>

                            {loading ? (
                                <div className="p-8 text-center text-sm text-(--secondary)">
                                    Loading members...
                                </div>
                            ) : members.length === 0 ? (
                                <div className="p-10 text-center">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                        <Users size={22} />
                                    </div>

                                    <h3 className="font-semibold mt-4 text-(--primary)">
                                        No members found
                                    </h3>

                                    <p className="text-sm text-(--secondary) mt-1">
                                        No active members are currently assigned
                                        to this year set.
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-(--border) max-h-125 overflow-y-auto scrollbar-hide">
                                    {members.slice(0, 5).map((member) => (
    //   later fix for leader  to view user details ----------------------------------------||||                              
                                        <div
                                            key={member._id}
                                            onClick={console.log("member leader view ",member._id)}
                                            className="p-5 hover:bg-(--bg-light)/50 transition"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-3.5 min-w-0">
                                                    <div className="w-10 h-10 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                                        <UserRound size={18} />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h3 className="text-sm font-semibold text-(--primary) truncate">
                                                            {member.firstName}{" "}
                                                            {member.middleName
                                                                ? `${member.middleName} `
                                                                : ""}
                                                            {member.lastName}
                                                        </h3>

                                                        <p className="text-xs text-(--secondary) mt-1">
                                                            {member.alumniId ||
                                                                "No Alumni ID"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="text-right shrink-0">
                                                    <p className="text-xs font-semibold text-(--primary)">
                                                        {member.chapter?.code ||
                                                            "—"}
                                                    </p>

                                                    <p className="text-xs text-(--text-muted) mt-1">
                                                        Class of{" "}
                                                        {member.graduationYear ||
                                                            "—"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {members.length > 5 && (
                                <div className="border-t border-(--border) p-4 text-center">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--primary) hover:text-(--secondary) transition"
                                    >
                                        View all members
                                        <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            )}
                        </section>

                        {/* PAYMENT */}

                        <section className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                            <div className="p-5 border-b border-(--border)">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-(--secondary-light) text-(--secondary) flex items-center justify-center">
                                        <Wallet size={19} />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-(--primary)">
                                            Year Set Payment
                                        </h2>

                                        <p className="text-xs text-(--secondary) mt-1">
                                            Official contribution
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <p className="text-xs text-(--secondary)">
                                    Outstanding
                                </p>

                                <h3 className="text-2xl font-bold text-(--primary) mt-1">
                                    {loading
                                        ? "—"
                                        : formatCurrency(outstanding)}
                                </h3>

                                <div className="mt-5 space-y-3">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-(--text-muted)">
                                            Paid
                                        </span>

                                        <span className="font-semibold text-(--primary)">
                                            {loading
                                                ? "—"
                                                : formatCurrency(amountPaid)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-(--text-muted)">
                                            Total due
                                        </span>

                                        <span className="font-semibold text-(--primary)">
                                            {loading
                                                ? "—"
                                                : formatCurrency(totalDue)}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-xs text-(--text-muted) leading-relaxed mt-5">
                                    Collect contributions from your year set
                                    members and make the official payment
                                    through the portal.
                                </p>

                                <button
                                    type="button"
                                    disabled={loading || outstanding <= 0}
                                    onClick={() => {
                                        const outstandingObligation = obligations.find(
                                            (item) =>
                                                Number(item.amountDue || 0) >
                                                Number(item.amountPaid || 0)
                                        );

                                        if (outstandingObligation) {
                                            handlePayNow(outstandingObligation);
                                        }
                                    }}
                                    className="
                                            mt-5 w-full
                                            inline-flex items-center justify-center gap-2
                                            bg-(--primary)
                                            text-white
                                            px-4 py-2.5
                                            rounded
                                            text-xs font-semibold
                                            hover:bg-(--primary-dark)
                                            disabled:opacity-50
                                            disabled:cursor-not-allowed
                                            transition-all
                                        "
                                >
                                    Make Year Set Payment
                                    <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* ========================================
                        RECENT ACTIVITY
                    ======================================== */}

                    <section className="bg-(--bg-white) border border-(--border) rounded max-h-125 scroll-none ">
                        <div className="p-5 border-b border-(--border)">
                            <div className="flex items-center gap-2">
                                <CircleDollarSign
                                    size={17}
                                    className="text-(--primary)"
                                />

                                <h2 className="font-semibold text-(--primary)">
                                    Recent Activity
                                </h2>
                            </div>

                            <p className="text-sm text-(--secondary) mt-1">
                                Recent financial activity from your year set.
                            </p>
                        </div>

                        {recentActivity.length > 0 ? (
                            <div className="divide-y max-h-[400px] overflow-y-auto scrollbar-hide divide-(--border)">
                                {recentActivity.map((activity, index) => (
                                    <div
                                        key={activity._id || index}
                                        className="p-5 flex items-center justify-between gap-4"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                                <CheckCircle2
                                                    size={18}
                                                    className="text-green-600"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-(--primary)">
                                                    {activity.obligationAssignment?.obligation?.name ||
                                                        "Year Set Payment"}
                                                </p>

                                                <p className="text-[11px] text-(--text-muted) mt-1">
                                                    {activity.paidAt
                                                        ? new Date(activity.paidAt).toLocaleDateString(
                                                            "en-NG",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )
                                                        : "Payment date unavailable"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-semibold text-green-600">
                                                +₦{Number(activity.amount || 0).toLocaleString()}
                                            </p>

                                            <p className="text-[11px] text-(--text-muted) mt-1">
                                                Successful
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <CalendarDays
                                    size={22}
                                    className="mx-auto text-(--text-muted)"
                                />

                                <p className="mt-3 text-sm font-medium text-(--primary)">
                                    No recent activity
                                </p>

                                <p className="mt-1 text-xs text-(--secondary)">
                                    Transactions and updates will appear here.
                                </p>
                            </div>
                        )}
                    </section>
                </div>

            </div>


            {/* payment module */}
            {paymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md bg-white rounded shadow-xl overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                            <div>
                                <h3 className="text-lg font-bold text-(--primary-dark)">
                                    Make Payment
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    {paymentModal.obligation?.name ||
                                        "Year Set Obligation"}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    if (!paymentLoading) {
                                        setPaymentModal(null);
                                        setPaymentError("");
                                    }
                                }}
                                className="p-2 rounded-full hover:bg-slate-100 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-5">

                            {/* Outstanding */}
                            <div className="rounded-(--radius-sm) bg-(--primary-light) p-4">
                                <p className="text-xs text-slate-500">
                                    Outstanding Balance
                                </p>

                                <p className="text-2xl font-bold text-(--primary-dark) mt-1">
                                    ₦{paymentModal.outstanding.toLocaleString()}
                                </p>
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Amount to Pay
                                </label>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                                        ₦
                                    </span>

                                    <input
                                        type="number"
                                        min="1"
                                        max={paymentModal.outstanding}
                                        value={paymentAmount}
                                        onChange={(e) => {
                                            setPaymentAmount(e.target.value);
                                            setPaymentError("");
                                        }}
                                        disabled={paymentLoading}
                                        className="w-full border border-slate-300 rounded-(--radius-sm) pl-9 pr-4 py-3 text-sm outline-none focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                                        placeholder="Enter amount"
                                    />
                                </div>

                                <p className="text-xs text-slate-500 mt-2">
                                    You can pay any amount up to your outstanding
                                    balance.
                                </p>
                            </div>

                            {/* Error */}
                            {paymentError && (
                                <div className="rounded-(--radius-sm) bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                                    {paymentError}
                                </div>
                            )}

                            {/* Continue */}
                            <button
                                type="button"
                                onClick={handleInitializePayment}
                                disabled={paymentLoading}
                                className="w-full inline-flex items-center justify-center gap-2 bg-(--primary) text-white py-3 rounded text-sm font-semibold hover:bg-(--primary-dark) transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {paymentLoading ? (
                                    <>
                                        <Loader2
                                            size={17}
                                            className="animate-spin"
                                        />
                                        Preparing payment...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard size={17} />
                                        Continue to Payment
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyYearSet;