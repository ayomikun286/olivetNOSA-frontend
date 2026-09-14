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
} from "lucide-react";



import Notifications from "../../components/member/Notifications.jsx";
import PaymentHistory from "../../components/member/PaymentHistory.jsx"
import QuickActions from "../../components/member/QuickActions.jsx"
import MembershipStatus from "../../components/member/MembershipStatus.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getMyObligation } from "../../services/obligationService.js";

const Main = () => {
    const { user } = useAuth();

    const [obligations, setObligations] = useState([]);
    const [loadingObligations, setLoadingObligations] = useState(true);

    useEffect(() => {
        const fetchObligations = async () => {
            try {
                const data = await getMyObligation();

                setObligations(data?.assignments || []);
            } catch (error) {
                console.error("Failed to fetch obligations:", error);
            } finally {
                setLoadingObligations(false);
            }
        };

        fetchObligations();
    }, []);

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

    const totalObligation = obligations.reduce(
        (total, item) => total + (item.amountDue || 0),
        0
    );

    const amountPaid = obligations.reduce(
        (total, item) => total + (item.amountPaid || 0),
        0
    );

    const outstanding = totalObligation - amountPaid;

    const unpaidObligations = obligations.filter(
        (item) =>
            item.status !== "paid" &&
            Number(item.amountDue || 0) > Number(item.amountPaid || 0)
    );

    const nextDueDate = obligations
        .filter((item) => item.status !== "paid" && item.dueDate)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0]?.dueDate;

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

                    <div className="flex justify-between md:px-15 px-2 items-start md:justify-between md:items-center flex-wrap">

                        {/* Alumni ID */}
                        <div className="flex gap-4 md:border-r md:pr-5 items-center">
                            <GraduationCap size={20} strokeWidth={2} />

                            <div className="flex flex-col gap-1">
                                <small>Alumni ID</small>

                                <strong className="font-semibold text-sm">
                                    {alumniId || (
                                        <span className="text-(--color-warning)">
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
                                        <span className="text-(--color-warning)">
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
                                        <span className="text-(--color-warning)">
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
                                <h2 className="text-lg font-semibold text-(--text-primary)">
                                    Your contributions
                                </h2>

                                <p className="text-sm text-(--text-secondary)">
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
                                                        ? `${Math.min((amountPaid / totalObligation) * 100, 100)}%`
                                                        : "0%",
                                                }}
                                            />
                                        </div>

                                        <div className="flex justify-between text-xs mt-2 text-white/60">
                                            <span>{formatCurrency(amountPaid)} paid</span>
                                            <span>
                                                {totalObligation
                                                    ? Math.round((amountPaid / totalObligation) * 100)
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

                                    <p className="text-sm text-(--text-secondary) mt-5">
                                        Amount paid
                                    </p>

                                    <h3 className="text-2xl font-bold text-(--text-primary) mt-1">
                                        {formatCurrency(amountPaid)}
                                    </h3>

                                    <p className="text-xs text-(--text-muted) mt-2">
                                        Across {obligations.length} obligation
                                        {obligations.length !== 1 ? "s" : ""}
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

                                    <p className="text-sm text-(--text-secondary) mt-5">
                                        Next due date
                                    </p>

                                    <h3 className="text-xl font-bold text-(--text-primary) mt-1">
                                        {nextDueDate ? formatDate(nextDueDate) : "All settled"}
                                    </h3>

                                    <p className="text-xs text-(--text-muted) mt-2">
                                        {unpaidObligations.length
                                            ? `${unpaidObligations.length} outstanding obligation${unpaidObligations.length > 1 ? "s" : ""
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
                                    <h2 className="font-semibold text-(--text-primary)">
                                        My Obligations
                                    </h2>

                                    <p className="text-sm text-(--text-secondary) mt-1">
                                        Your assigned membership contributions.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-(--text-secondary)">
                                    <CircleDollarSign size={16} />
                                    {obligations.length} obligation
                                    {obligations.length !== 1 ? "s" : ""}
                                </div>

                            </div>


                            <div className="divide-y divide-(--border)">

                                {loadingObligations ? (

                                    <div className="p-8 text-center text-sm text-(--text-secondary)">
                                        Loading your obligations...
                                    </div>

                                ) : obligations.length === 0 ? (

                                    <div className="p-10 text-center">

                                        <div className="w-12 h-12 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                            <CheckCircle2 size={22} />
                                        </div>

                                        <h3 className="font-semibold mt-4">
                                            You're all caught up
                                        </h3>

                                        <p className="text-sm text-(--text-secondary) mt-1">
                                            You currently have no outstanding obligations.
                                        </p>

                                    </div>

                                ) : (

                                    obligations.map((item) => {

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
                                                className="p-5 hover:bg-(--bg-light)/60 transition"
                                            >

                                                <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                                                    {/* NAME */}
                                                    <div className="flex items-start gap-3 flex-1 min-w-0">

                                                        <div className="w-10 h-10 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                                            <ReceiptText size={19} />
                                                        </div>

                                                        <div className="min-w-0">

                                                            <h3 className="font-semibold text-(--text-primary)">
                                                                {item.obligation?.name || "Membership obligation"}
                                                            </h3>

                                                            <p className="text-xs text-(--text-secondary) mt-1 truncate">
                                                                {item.obligation?.description ||
                                                                    "Assigned membership contribution"}
                                                            </p>

                                                        </div>

                                                    </div>


                                                    {/* AMOUNT */}
                                                    <div className="lg:w-32">

                                                        <p className="text-xs text-(--text-muted)">
                                                            Amount
                                                        </p>

                                                        <p className="font-semibold mt-1">
                                                            {formatCurrency(due)}
                                                        </p>

                                                    </div>


                                                    {/* PROGRESS */}
                                                    <div className="lg:w-40">

                                                        <div className="flex justify-between text-xs mb-2">

                                                            <span className="text-(--text-secondary)">
                                                                Paid {formatCurrency(paid)}
                                                            </span>

                                                            <span className="font-medium">
                                                                {Math.round(progress)}%
                                                            </span>

                                                        </div>

                                                        <div className="h-1.5 bg-(--bg-light) rounded-full overflow-hidden">

                                                            <div
                                                                className="h-full bg-(--success) rounded-full"
                                                                style={{
                                                                    width: `${progress}%`,
                                                                }}
                                                            />

                                                        </div>

                                                    </div>


                                                    {/* DUE DATE */}
                                                    <div className="lg:w-28">

                                                        <p className="text-xs text-(--text-muted)">
                                                            Due date
                                                        </p>

                                                        <p className="text-sm font-medium mt-1">
                                                            {formatDate(item.dueDate)}
                                                        </p>

                                                    </div>


                                                    {/* STATUS + ACTION */}
                                                    <div className="flex items-center gap-3">

                                                        {isPaid ? (

                                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-(--success) bg-green-50 px-2.5 py-1.5 rounded-full">
                                                                <CheckCircle2 size={14} />
                                                                Paid
                                                            </span>

                                                        ) : isPartial ? (

                                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-(--warning) bg-orange-50 px-2.5 py-1.5 rounded-full">
                                                                <Clock3 size={14} />
                                                                Partial
                                                            </span>

                                                        ) : (

                                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-(--primary) bg-(--primary-light) px-2.5 py-1.5 rounded-full">
                                                                <AlertCircle size={14} />
                                                                Pending
                                                            </span>

                                                        )}

                                                        {!isPaid && (
                                                            <button
                                                                className="flex items-center gap-1 bg-(--primary) text-white px-3 py-2 rounded-(--radius-sm) text-xs font-semibold hover:bg-(--primary-dark) transition"
                                                            >
                                                                Pay
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
                           <QuickActions   hasOutstanding={outstanding > 0}/>

                        </div>

                    </div>

                    <aside className="flex flex-col space-y-8">
                        <MembershipStatus />

                        <Notifications />
                    </aside>


                </div>

            </div>
        </div>
    );
};

export default Main;