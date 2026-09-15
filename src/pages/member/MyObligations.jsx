import React, { useEffect, useState } from "react";
import {
    ReceiptText,
    WalletCards,
    CircleDollarSign,
    CalendarDays,
    CheckCircle2,
    Clock3,
    AlertCircle,
    ArrowUpRight,
} from "lucide-react";

import { getMyObligation } from "../../services/obligationService.js";

const Obligations = () => {
    const [obligations, setObligations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchObligations = async () => {
            try {
                const data = await getMyObligation();

                const individual = (data?.assignments || []).filter(
                    (item) => item.obligation?.category === "individual"
                );

                setObligations(individual);
            } catch (error) {
                console.error("Failed to fetch obligations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchObligations();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        }).format(Number(amount || 0));
    };

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const totalDue = obligations.reduce(
        (total, item) => total + Number(item.amountDue || 0),
        0
    );

    const totalPaid = obligations.reduce(
        (total, item) => total + Number(item.amountPaid || 0),
        0
    );

    const outstanding = Math.max(totalDue - totalPaid, 0);

    const getStatus = (item) => {
        const due = Number(item.amountDue || 0);
        const paid = Number(item.amountPaid || 0);
        const remaining = Math.max(due - paid, 0);

        if (remaining === 0) {
            return {
                label: "Paid",
                icon: CheckCircle2,
                className: "text-(--success) bg-(--success-light)",
            };
        }

        if (paid > 0) {
            return {
                label: "Partial",
                icon: Clock3,
                className: "text-(--warning) bg-(--warning-light)",
            };
        }

        return {
            label: "Pending",
            icon: AlertCircle,
            className: "text-(--warning) bg-(--warning-light)",
        };
    };

    return (
        <div className="p-4">
            <div className="space-y-5">

                {/* PAGE HEADER */}
                <div>
                    <h1 className="text-xl font-semibold text-(--primary)">
                        My Obligations
                    </h1>

                    <p className="text-sm text-(--secondary) mt-1">
                        View your assigned membership contributions and payment status.
                    </p>
                </div>

                {/* SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">

                    {/* TOTAL DUE */}
                    <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <ReceiptText size={20} />
                            </div>

                            <span className="text-xs text-(--text-muted)">
                                Total
                            </span>
                        </div>

                        <p className="text-sm text-(--secondary) mt-5">
                            Total amount due
                        </p>

                        <h2 className="text-2xl font-bold text-(--primary) mt-1">
                            {formatCurrency(totalDue)}
                        </h2>

                        <p className="text-xs text-(--text-muted) mt-2">
                            Across {obligations.length} obligation
                            {obligations.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    {/* AMOUNT PAID */}
                    <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-(--success-light) text-(--success) flex items-center justify-center">
                                <CheckCircle2 size={20} />
                            </div>

                            <span className="text-xs text-(--text-muted)">
                                Paid
                            </span>
                        </div>

                        <p className="text-sm text-(--secondary) mt-5">
                            Amount paid
                        </p>

                        <h2 className="text-2xl font-bold text-(--primary) mt-1">
                            {formatCurrency(totalPaid)}
                        </h2>

                        <p className="text-xs text-(--text-muted) mt-2">
                            Payments recorded
                        </p>
                    </div>

                    {/* OUTSTANDING */}
                    <div className="bg-(--primary) text-white rounded p-5">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                <WalletCards size={20} />
                            </div>

                            {outstanding > 0 && (
                                <span className="text-xs font-medium text-(--secondary)">
                                    Action needed
                                </span>
                            )}
                        </div>

                        <p className="text-sm text-white/75 mt-5">
                            Outstanding balance
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-1">
                            {formatCurrency(outstanding)}
                        </h2>

                        <p className="text-xs text-white/60 mt-2">
                            Remaining amount to be paid
                        </p>
                    </div>
                </div>

                {/* OBLIGATIONS */}
                <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                    {/* HEADER */}
                    <div className="p-5 border-b border-(--border) flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h2 className="font-semibold text-(--primary)">
                                Individual Obligations
                            </h2>

                            <p className="text-sm text-(--secondary) mt-1">
                                Your assigned personal membership contributions.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-(--secondary)">
                            <CircleDollarSign size={16} />

                            {obligations.length} obligation
                            {obligations.length !== 1 ? "s" : ""}
                        </div>
                    </div>

                    {/* CONTENT */}
                    {loading ? (
                        <div className="p-12 text-center">
                            <p className="text-sm text-(--secondary)">
                                Loading your obligations...
                            </p>
                        </div>
                    ) : obligations.length === 0 ? (
                        <div className="p-12 text-center">

                            <div className="w-12 h-12 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <CheckCircle2 size={22} />
                            </div>

                            <h3 className="font-semibold text-(--primary) mt-4">
                                No individual obligations
                            </h3>

                            <p className="text-sm text-(--secondary) mt-1 max-w-md mx-auto">
                                You currently have no individual membership obligations
                                assigned to your account.
                            </p>
                        </div>
                    ) : (
                        <div className="max-h-[500px] overflow-y-auto">
                            <div className="divide-y divide-(--border)">

                                {obligations.map((item) => {
                                    const due = Number(item.amountDue || 0);
                                    const paid = Number(item.amountPaid || 0);
                                    const remaining = Math.max(due - paid, 0);

                                    const progress = due
                                        ? Math.min((paid / due) * 100, 100)
                                        : 0;

                                    const status = getStatus(item);
                                    const StatusIcon = status.icon;

                                    return (
                                        <div
                                            key={item._id}
                                            className="p-5 sm:p-6"
                                        >

                                            {/* TOP */}
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                                                <div className="flex items-start gap-3.5 min-w-0">

                                                    <div className="w-10 h-10 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                                        <ReceiptText size={18} />
                                                    </div>

                                                    <div className="min-w-0">

                                                        <h3 className="text-sm font-semibold text-(--primary)">
                                                            {item.obligation?.name ||
                                                                "Membership obligation"}
                                                        </h3>

                                                        <p className="text-xs text-(--secondary) mt-1 leading-relaxed max-w-2xl">
                                                            {item.obligation?.description ||
                                                                "Assigned membership contribution"}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-(--text-muted)">

                                                            <span className="flex items-center gap-1">
                                                                <CalendarDays size={13} />
                                                                Due {formatDate(item.dueDate)}
                                                            </span>

                                                            <span>
                                                                Individual
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>

                                                {/* STATUS + AMOUNT */}
                                                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">

                                                    <div className="sm:text-right">
                                                        <p className="text-[11px] text-(--text-muted)">
                                                            Amount due
                                                        </p>

                                                        <p className="text-sm font-semibold text-(--primary) mt-0.5">
                                                            {formatCurrency(due)}
                                                        </p>
                                                    </div>

                                                    <span
                                                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full ${status.className}`}
                                                    >
                                                        <StatusIcon size={13} />
                                                        {status.label}
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
                                                                    ? `${formatCurrency(paid)} paid`
                                                                    : "No payment recorded"}
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

                                                    {/* PAY */}
                                                    {remaining > 0 && (
                                                        <button
                                                            type="button"
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
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Obligations;