import React, { useState, useEffect } from "react";

import {
    CreditCard,
    ReceiptText,
    Users,
    GraduationCap,
    Calendar,
    MapPin,
    ArrowUpRight,
    Clock3,
    CheckCircle2,
    AlertCircle,
    WalletCards,
    CircleDollarSign,
    X,
    Loader2,
} from "lucide-react";

import ContentLoading from "../../components/admin/ContentLoading.jsx"
import PaymentHistory from "../../components/member/PaymentHistory.jsx";
import QuickActions from "../../components/member/QuickActions.jsx";
import MembershipStatus from "../../components/member/MembershipStatus.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyObligation } from "../../services/obligationService.js";
import NotificationsCard from "../../components/member/NotificationsCard.jsx";

const Main = () => {
    const { user } = useAuth();
    const [obligations, setObligations] = useState([]);
    const [loadingObligations, setLoadingObligations] = useState(true);
    const [loading, setLoading] = useState(true)
    const [paymentModal, setPaymentModal] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState("");

    useEffect(() => {
        const fetchObligations = async () => {
            try {
                const data = await getMyObligation();
                setObligations(data?.assignments || []);

               
                    setLoading(false)
             
            } catch (error) {
                console.error("Failed to fetch obligations:", error);
            } finally {
                setLoadingObligations(false);
            }
        };
        fetchObligations();
    }, []);

     if (loading) {
    return (
      <ContentLoading />
    );
  }





    const handlePayNow = (obligation) => {
        const amountDue = Number(obligation.amountDue || 0);
        const amountPaid = Number(obligation.amountPaid || 0);

        const outstanding = Math.max(amountDue - amountPaid, 0);

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

        if (!Number.isInteger(amount) || amount <= 0) {
            setPaymentError("Please enter a valid whole-naira payment amount.");
            return;
        }

        if (amount > paymentModal.outstanding) {
            setPaymentError(
                `Amount cannot exceed the outstanding balance of ${formatCurrency(
                    paymentModal.outstanding
                )}.`
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

            // Send member to Paystack checkout
            window.location.href = data.authorizationUrl;
        } catch (error) {
            console.error("Payment initialization error:", error);

            setPaymentError(
                error.message || "Unable to initialize payment."
            );

            setPaymentLoading(false);
        }
    };


    // ========================================
    // INDIVIDUAL OBLIGATIONS
    // ========================================

    const individualObligations = obligations.filter(
        (item) => item.obligation?.category === "individual"
    );

    // ========================================
    // MEMBER DATA
    // ========================================

    const name = user?.firstName;
    const year = user?.graduationYear;
    const chapter = user?.chapter?.name;
    const yearSet = user?.yearSet?.name;
    const alumniId = user?.alumniId;

    // ========================================
    // OBLIGATION SUMMARY
    // ========================================

    // ========================================
    // INDIVIDUAL OBLIGATION SUMMARY
    // ========================================

    const totalObligation = individualObligations.reduce(
        (total, item) => total + Number(item.amountDue || 0),
        0
    );

    const amountPaid = individualObligations.reduce(
        (total, item) => total + Number(item.amountPaid || 0),
        0
    );

    const outstanding = Math.max(totalObligation - amountPaid, 0);

    const unpaidObligations = individualObligations.filter(
        (item) =>
            item.status !== "paid" &&
            Number(item.amountDue || 0) > Number(item.amountPaid || 0)
    );

    const nextDueDate = individualObligations
        .filter((item) => item.status !== "paid" && item.dueDate)
        .sort(
            (a, b) =>
                new Date(a.dueDate) - new Date(b.dueDate)
        )[0]?.dueDate;

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

    const getStatus = (obligation) => {
        if (obligation.status === "paid") {
            return {
                label: "Paid",
                icon: CheckCircle2,
                className: "text-green-600 bg-green-50",
            };
        }

        if (obligation.amountPaid > 0) {
            return {
                label: "Partially Paid",
                icon: Clock3,
                className: "text-orange-600 bg-orange-50",
            };
        }

        return {
            label: "Pending",
            icon: AlertCircle,
            className: "text-(--primary) bg-(--bg-light)",
        };
    };

    return (
        <div className="p-4">
            {/* ========================================
                                 MAIN CONTENT
                ======================================== */}

            <div className=" space-y-4">
                {/* MEMBER HERO */}
                <div
                    style={{
                        backgroundImage: "url('/images/olivetNOSA-6.jpg')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundBlendMode: "overlay",
                    }}
                    className="flex overflow-hidden flex-col justify-between p-5 rounded bg-black/80 text-white relative min-h-50 md:gap-2 gap-8"
                >
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold">
                                Welcome back, <span>{name}</span>!
                            </h1>

                            <small className="font-semibold">
                                Stay connected, Stay involved. Keep the legacy alive.
                            </small>
                        </div>

                        <div>
                            <img
                                src="/images/olivetNOSA_logo.png"
                                alt="logo"
                                className="w-20"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between gap-3 md:px-15 px-2 items-start md:justify-between md:items-center flex-wrap">
                        {/* Alumni ID */}
                        <div className="flex gap-4 md:border-r pr-2 md:pr-5 items-center">
                            <GraduationCap size={20} strokeWidth={2} />

                            <div className="flex flex-col gap-1">
                                <small>Alumni ID</small>

                                <strong className="font-semibold text-sm">
                                    {alumniId || (
                                        <span className="text-(--warning)">
                                            Pending approval
                                        </span>
                                    )}
                                </strong>
                            </div>
                        </div>

                        {/* Graduation Year */}
                        <div className="flex gap-4 md:border-r pr-5 items-center">
                            <Calendar size={20} strokeWidth={2} />

                            <div className="flex flex-col gap-1">
                                <small>Graduation Year</small>

                                <strong className="font-semibold text-sm">
                                    {year}
                                </strong>
                            </div>
                        </div>

                        {/* Year Set */}
                        <div className="flex gap-4 md:border-r pr-5 items-center">
                            <Users size={20} strokeWidth={2} />

                            <div className="flex flex-col gap-1">
                                <small>Year Set</small>

                                <strong className="font-semibold text-sm">
                                    {yearSet || (
                                        <span className="text-(--warning)">
                                            Not yet assigned
                                        </span>
                                    )}
                                </strong>
                            </div>
                        </div>

                        {/* Chapter */}
                        <div className="flex gap-4 md:border-r pr-5 items-center">
                            <MapPin size={20} strokeWidth={2} />

                            <div className="flex flex-col gap-1">
                                <small>Chapter</small>

                                <strong className="font-semibold text-sm">
                                    {chapter || (
                                        <span className="text-(--warning)">
                                            Not yet assigned
                                        </span>
                                    )}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-4">
                    <div className="space-y-5">
                        {/* // FINANCIAL OVERVIEW */}
                        <div className="space-y-3">
                            <div>
                                <h2 className="text-lg font-semibold text-(--primary)">
                                    Your contributions
                                </h2>

                                <p className="text-sm text-(--secondary)">
                                    Keep track of your membership obligations and payments.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                                {/* MAIN BALANCE */}
                                <div className="lg:col-span-1 rounded bg-(--primary) text-white p-5 relative overflow-hidden">
                                    <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/5" />
                                    <div className="absolute -right-3 -bottom-10 w-24 h-24 rounded-full bg-(--secondary)/10" />

                                    <div className="relative">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                                                    <WalletCards size={18} />
                                                </div>

                                                <span className="text-sm text-white/75">
                                                    Outstanding balance
                                                </span>
                                            </div>

                                            {outstanding > 0 && (
                                                <span className="text-xs bg-(--secondary) text-end w-fit text-(--primary) p-1 rounded font-semibold">
                                                    Action needed
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-3xl font-bold mt-7">
                                            {formatCurrency(outstanding)}
                                        </h3>

                                        <p className="text-sm text-white/65 mt-1">
                                            remaining from {formatCurrency(totalObligation)}
                                        </p>

                                        <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                                            <div
                                                className="h-full bg-(--secondary) rounded-full transition-all"
                                                style={{
                                                    width: totalObligation
                                                        ? `${Math.min(
                                                            (amountPaid / totalObligation) * 100,
                                                            100
                                                        )}%`
                                                        : "0%",
                                                }}
                                            />
                                        </div>

                                        <div className="flex justify-between text-xs mt-2 text-white/60">
                                            <span>{formatCurrency(amountPaid)} paid</span>

                                            <span>
                                                {totalObligation
                                                    ? Math.round(
                                                        (amountPaid / totalObligation) * 100
                                                    )
                                                    : 0}
                                                %
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
                                        {formatCurrency(amountPaid)}
                                    </h3>

                                    <p className="text-xs text-(--text-muted) mt-2">
                                        Across {individualObligations.length} obligation
                                        {individualObligations.length !== 1 ? "s" : ""}
                                    </p>
                                </div>

                                {/* NEXT DUE */}
                                <div className="rounded bg-(--bg-white) border border-(--border) p-5">
                                    <div className="flex items-center justify-between">
                                        <div className="w-10 h-10 rounded-lg bg-(--secondary-light) text-(--secondary) flex items-center justify-center">
                                            <Calendar size={20} />
                                        </div>

                                        {unpaidObligations.length > 0 && (
                                            <span className="text-xs text-(--warning)">
                                                Upcoming
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-(--secondary) mt-5">
                                        Next due date
                                    </p>

                                    <h3 className="text-xl font-bold text-(--primary) mt-1">
                                        {nextDueDate
                                            ? formatDate(nextDueDate)
                                            : "All settled"}
                                    </h3>

                                    <p className="text-xs text-(--text-muted) mt-2">
                                        {unpaidObligations.length
                                            ? `${unpaidObligations.length} outstanding obligation${unpaidObligations.length > 1
                                                ? "s"
                                                : ""
                                            }`
                                            : "You're all caught up"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* MY OBLIGATIONS */}
                        <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-(--border)">
                                <div>
                                    <h2 className="font-semibold text-(--primary)">
                                        My Obligations
                                    </h2>

                                    <p className="text-sm text-(--secondary) mt-1">
                                        Your assigned membership contributions.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-(--secondary)">
                                    <CircleDollarSign size={16} />

                                    {individualObligations.length} obligation
                                    {individualObligations.length !== 1 ? "s" : ""}
                                </div>
                            </div>

                            {/* the table */}
                            <div className="divide-y max-h-[500px] overflow-y-auto scrollbar-hide divide-(--border)">
                                {loadingObligations ? (
                                    <div className="p-8 text-center text-sm text-(--secondary)">
                                        Loading your obligations...
                                    </div>
                                ) : individualObligations.length === 0 ? (
                                    <div className="p-10 text-center">
                                        <div className="w-12 h-12 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                            <CheckCircle2 size={22} />
                                        </div>

                                        <h3 className="font-semibold mt-4 text-(--primary)">
                                            You're all caught up
                                        </h3>

                                        <p className="text-sm text-(--secondary) mt-1">
                                            You currently have no outstanding obligations.
                                        </p>
                                    </div>
                                ) : (
                                    individualObligations.map((item) => {
                                        const paid = Number(item.amountPaid || 0);
                                        const due = Number(item.amountDue || 0);
                                        const remaining = Math.max(due - paid, 0);
                                        const progress = due
                                            ? Math.min((paid / due) * 100, 100)
                                            : 0;
                                        const isPaid = remaining === 0;
                                        const isPartial = paid > 0 && remaining > 0;

                                        return (
                                            <div
                                                key={item._id}
                                                className="p-5 sm:p-6 hover:bg-(--bg-light)/50 transition"
                                            >
                                                {/* TOP ROW */}
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                                    {/* OBLIGATION INFO */}
                                                    <div className="flex items-start gap-3.5 min-w-0">
                                                        <div className="w-10 h-10 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                                            <ReceiptText size={18} />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <h3 className="text-sm font-semibold text-(--primary)">
                                                                {item.obligation?.name ||
                                                                    "Membership obligation"}
                                                            </h3>

                                                            <p className="text-xs text-(--secondary) mt-1 leading-relaxed max-w-xl">
                                                                {item.obligation?.description ||
                                                                    "Assigned membership contribution"}
                                                            </p>

                                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-(--text-muted)">
                                                                <span>
                                                                    Due {formatDate(item.dueDate)}
                                                                </span>

                                                                <span>Individual</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* AMOUNT + STATUS */}
                                                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                                                        <div className="sm:text-right">
                                                            <p className="text-[11px] text-(--text-muted)">
                                                                Amount due
                                                            </p>

                                                            <p className="text-sm font-semibold text-(--primary) mt-0.5">
                                                                {formatCurrency(due)}
                                                            </p>
                                                        </div>

                                                        {isPaid ? (
                                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-(--success) bg-(--success-light) px-2.5 py-1.5 rounded-full">
                                                                <CheckCircle2 size={13} />
                                                                Paid
                                                            </span>
                                                        ) : isPartial ? (
                                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-(--warning) bg-(--warning-light) px-2.5 py-1.5 rounded-full">
                                                                <Clock3 size={13} />
                                                                Partial
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-(--primary) bg-(--danger-light) px-2.5 py-1.5 rounded-full">
                                                                <AlertCircle size={13} />
                                                                Pending
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* BOTTOM ROW */}
                                                <div className="mt-5 pt-4 border-t border-(--border)">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                        {/* PROGRESS */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-xs text-(--secondary)">
                                                                    {isPaid
                                                                        ? "Payment completed"
                                                                        : `${formatCurrency(paid)} paid`}
                                                                </span>

                                                                <span className="text-xs font-semibold text-(--primary)">
                                                                    {Math.round(progress)}%
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

                                                        {/* OUTSTANDING */}
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
                                                                {formatCurrency(remaining)}
                                                            </p>
                                                        </div>

                                                        {/* ACTION */}
                                                        {!isPaid && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handlePayNow(item)}
                                                                className="inline-flex items-center justify-center gap-1.5 bg-(--primary) text-white px-4 py-2 rounded-(--radius-sm) text-xs font-semibold hover:bg-(--primary-dark) transition shrink-0"
                                                            >
                                                                Pay now
                                                                <ArrowUpRight size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>


                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* PAYMENT HISTORY */}
                            <PaymentHistory />

                            {/* QUICK ACTIONS */}
                            <QuickActions hasOutstanding={outstanding > 0} />
                        </div>
                    </div>

                    <aside className="flex flex-col space-y-8">
                        <MembershipStatus />
                        <NotificationsCard />
                    </aside>
                </div>
            </div>

            {paymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md bg-white rounded shadow-xl overflow-hidden">

                        {/* HEADER */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                            <div>
                                <h3 className="text-lg font-bold text-(--primary-dark)">
                                    Make Payment
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    {paymentModal.obligation?.name ||
                                        "Obligation Payment"}
                                </p>
                            </div>

                            <button
                                type="button"
                                disabled={paymentLoading}
                                onClick={() => {
                                    setPaymentModal(null);
                                    setPaymentError("");
                                }}
                                className="p-2 rounded-full hover:bg-slate-100 transition disabled:opacity-50"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="p-6 space-y-5">

                            {/* OUTSTANDING */}
                            <div className="rounded-(--radius-sm) bg-(--primary-light) p-4">
                                <p className="text-xs text-slate-500">
                                    Outstanding Balance
                                </p>

                                <p className="text-2xl font-bold text-(--primary-dark) mt-1">
                                    {formatCurrency(paymentModal.outstanding)}
                                </p>
                            </div>

                            {/* AMOUNT */}
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
                                        step="1"
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
                                    You can pay any amount up to your outstanding balance.
                                </p>
                            </div>

                            {/* ERROR */}
                            {paymentError && (
                                <div className="rounded-(--radius-sm) bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                                    {paymentError}
                                </div>
                            )}

                            {/* CONTINUE */}
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
        </div>
    );
};

export default Main;