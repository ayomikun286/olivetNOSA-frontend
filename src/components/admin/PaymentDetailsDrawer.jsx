import React, { useState } from "react";
import {
    X,
    UserRound,
    CreditCard,
    ReceiptText,
    CalendarDays,
    Hash,
    Mail,
    Phone,
    BadgeCheck,
    CircleAlert,
    Clock3,
    RefreshCw,
    ShieldAlert,
    Printer,
} from "lucide-react";

const PaymentDetailsDrawer = ({
    payment,
    open,
    loading = false,
    onClose,
    isSuperAdmin = false,
    onRecover,
    recovering = false,
    onVerify,
    verifying = false,
}) => {
    const [showRecoveryModal, setShowRecoveryModal] = useState(false);
    const [recoveryReason, setRecoveryReason] = useState("");

    if (!open) return null;

    const canRecover =
        isSuperAdmin &&
        payment?.gateway === "paystack" &&
        ["failed", "cancelled",].includes(payment?.status);


        const canVerify =
    payment?.status === "pending" &&
    payment?.gateway === "paystack" &&
    Boolean(payment?.gatewayReference);

    const formatCurrency = (amount, currency = "NGN") => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
        }).format(Number(amount || 0));
    };

    const formatDateTime = (date) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        return parsedDate.toLocaleString("en-NG", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatDate = (date) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        return parsedDate.toLocaleDateString("en-NG", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatText = (value) => {
        if (!value) return "—";

        return String(value)
            .replace(/[_-]/g, " ")
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };

    const getStatusStyle = (status) => {
        const styles = {
            successful:
                "bg-(--success-light) text-(--success)",

            pending:
                "bg-(--warning-light) text-(--warning)",

            failed:
                "bg-(--danger-light) text-(--danger)",

            cancelled:
                "bg-(--danger-light) text-(--danger)",
        };

        return (
            styles[status] ||
            "bg-(--bg-soft) text-(--secondary)"
        );
    };

    const user = payment?.user;
    const assignment = payment?.obligationAssignment;
    const obligation = assignment?.obligation;

    const isCombinedPayment =
        payment?.metadata?.paymentType === "combined" &&
        payment?.allocations?.length > 0;

    const canPrintTransaction = Boolean(payment);

    const memberName = [
        user?.firstName,
        user?.middleName,
        user?.lastName,
    ]
        .filter(Boolean)
        .join(" ") || "—";

    const receiptItems = isCombinedPayment
        ? payment.allocations.map((allocation) => {
            const itemObligation =
                allocation.obligationAssignment?.obligation;

            return {
                name: itemObligation?.name || "Unknown Obligation",
                category: itemObligation?.category || "—",
                year: itemObligation?.year || "",
                amount: allocation.amount || 0,
            };
        })
        : obligation
            ? [
                {
                    name: obligation.name || "Unknown Obligation",
                    category: obligation.category || "—",
                    year: obligation.year || "",
                    amount: payment.amount || 0,
                },
            ]
            : [];

    return (
        <div className="fixed inset-0 z-50">

            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* DRAWER */}
            <div className="absolute right-0 top-0 h-full w-full sm:max-w-xl bg-(--bg-white) shadow-xl flex flex-col">

                {/* HEADER */}
                <div className="px-5 py-4 border-b border-(--border) flex items-center justify-between">

                    <div>
                        <h2 className="text-base font-semibold text-(--primary)">
                            Payment Details
                        </h2>

                        <p className="text-xs text-(--secondary) mt-1">
                            View transaction information.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 inline-flex items-center justify-center rounded hover:bg-(--bg-soft) text-(--secondary) hover:text-(--primary) transition-colors"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto p-5">

                    {loading ? (
                        <div className="space-y-4">

                            <div className="h-24 rounded bg-(--bg-soft) animate-pulse" />

                            <div className="h-32 rounded bg-(--bg-soft) animate-pulse" />

                            <div className="h-40 rounded bg-(--bg-soft) animate-pulse" />

                        </div>
                    ) : !payment ? (
                        <div className="py-12 text-center">
                            <CircleAlert
                                size={28}
                                className="mx-auto text-(--danger)"
                            />

                            <p className="text-sm text-(--secondary) mt-3">
                                Payment details unavailable.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-5">

                            {/* STATUS / AMOUNT */}
                            <div className="border border-(--border) rounded p-5">

                                <div className="flex items-start justify-between gap-4">

                                    <div>
                                        <p className="text-xs text-(--text-muted)">
                                            Payment Amount
                                        </p>

                                        <p className="text-2xl font-semibold text-(--primary) mt-1">
                                            {formatCurrency(
                                                payment.amount,
                                                payment.currency
                                            )}
                                        </p>
                                    </div>

                                    <span
                                        className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-semibold capitalize ${getStatusStyle(
                                            payment.status
                                        )}`}
                                    >
                                        {payment.status ||
                                            "Unknown"}
                                    </span>

                                </div>

                                <div className="mt-4 pt-4 border-t border-(--border) grid grid-cols-2 gap-4">

                                    <div>
                                        <p className="text-xs text-(--text-muted)">
                                            Payment Method
                                        </p>

                                        <p className="text-sm font-medium text-(--primary) mt-1 capitalize">
                                            {formatText(
                                                payment.paymentMethod
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-(--text-muted)">
                                            Gateway
                                        </p>

                                        <p className="text-sm font-medium text-(--primary) mt-1 capitalize">
                                            {formatText(
                                                payment.gateway
                                            )}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* MEMBER */}
                            <div className="border border-(--border) rounded overflow-hidden">

                                <div className="px-4 py-3 border-b border-(--border) flex items-center gap-2">
                                    <UserRound
                                        size={16}
                                        className="text-(--primary)"
                                    />

                                    <h3 className="text-sm font-semibold text-(--primary)">
                                        Member Information
                                    </h3>
                                </div>

                                <div className="p-4 space-y-4">

                                    <div>
                                        <p className="text-xs text-(--text-muted)">
                                            Full Name
                                        </p>

                                        <p className="text-sm font-medium text-(--primary) mt-1">
                                            {user?.firstName ||
                                                ""}
                                            {user?.middleName
                                                ? ` ${user.middleName}`
                                                : ""}
                                            {user?.lastName
                                                ? ` ${user.lastName}`
                                                : ""}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        <div className="flex items-start gap-2.5">
                                            <Mail
                                                size={15}
                                                className="text-(--text-muted) mt-0.5"
                                            />

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Email
                                                </p>

                                                <p className="text-sm text-(--primary) mt-1 break-all">
                                                    {user?.email ||
                                                        "—"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5">
                                            <Phone
                                                size={15}
                                                className="text-(--text-muted) mt-0.5"
                                            />

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Phone
                                                </p>

                                                <p className="text-sm text-(--primary) mt-1">
                                                    {user?.phone ||
                                                        "—"}
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        <div>
                                            <p className="text-xs text-(--text-muted)">
                                                Alumni ID
                                            </p>

                                            <p className="text-sm font-medium text-(--primary) mt-1">
                                                {user?.alumniId ||
                                                    "—"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-(--text-muted)">
                                                User ID
                                            </p>

                                            <p className="text-xs text-(--secondary) mt-1 break-all">
                                                {user?._id ||
                                                    "—"}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            {/* OBLIGATION */}

                            <div className="border border-(--border) rounded overflow-hidden">

                                <div className="px-4 py-3 border-b border-(--border) flex items-center gap-2">
                                    <ReceiptText
                                        size={16}
                                        className="text-(--primary)"
                                    />

                                    <h3 className="text-sm font-semibold text-(--primary)">
                                        {isCombinedPayment
                                            ? "Obligations Covered"
                                            : "Obligation"}
                                    </h3>
                                </div>

                                {isCombinedPayment ? (
                                    <div className="p-4 space-y-3">

                                        {payment.allocations.map((allocation, index) => {
                                            const allocationAssignment =
                                                allocation.obligationAssignment;

                                            const allocationObligation =
                                                allocationAssignment?.obligation;

                                            return (
                                                <div
                                                    key={allocation._id || index}
                                                    className="border border-(--border) rounded p-4"
                                                >
                                                    <div className="flex items-start justify-between gap-3">

                                                        <div className="min-w-0">
                                                            <p className="text-sm font-semibold text-(--primary)">
                                                                {allocationObligation?.name ||
                                                                    "Unknown Obligation"}
                                                            </p>

                                                            <p className="text-xs text-(--text-muted) mt-1 capitalize">
                                                                {formatText(
                                                                    allocationObligation?.category
                                                                )}
                                                                {allocationObligation?.year
                                                                    ? ` · ${allocationObligation.year}`
                                                                    : ""}
                                                            </p>
                                                        </div>

                                                        <div className="text-right shrink-0">
                                                            <p className="text-xs text-(--text-muted)">
                                                                Amount Applied
                                                            </p>

                                                            <p className="text-sm font-semibold text-(--success) mt-1">
                                                                {formatCurrency(
                                                                    allocation.amount,
                                                                    payment.currency
                                                                )}
                                                            </p>
                                                        </div>

                                                    </div>

                                                    {allocationObligation?.description && (
                                                        <p className="text-xs text-(--secondary) mt-3 leading-5">
                                                            {allocationObligation.description}
                                                        </p>
                                                    )}

                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-(--border)">

                                                        <div>
                                                            <p className="text-xs text-(--text-muted)">
                                                                Amount Due
                                                            </p>

                                                            <p className="text-sm font-medium text-(--primary) mt-1">
                                                                {formatCurrency(
                                                                    allocationAssignment?.amountDue,
                                                                    payment.currency
                                                                )}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-(--text-muted)">
                                                                Total Paid
                                                            </p>

                                                            <p className="text-sm font-medium text-(--primary) mt-1">
                                                                {formatCurrency(
                                                                    allocationAssignment?.amountPaid,
                                                                    payment.currency
                                                                )}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-(--text-muted)">
                                                                Status
                                                            </p>

                                                            <p className="text-sm font-medium text-(--primary) mt-1 capitalize">
                                                                {formatText(
                                                                    allocationAssignment?.status
                                                                )}
                                                            </p>
                                                        </div>

                                                    </div>

                                                </div>
                                            );
                                        })}

                                        <div className="flex items-center justify-between gap-3 pt-3 border-t border-(--border)">
                                            <p className="text-sm font-semibold text-(--primary)">
                                                Total Allocated
                                            </p>

                                            <p className="text-base font-bold text-(--success)">
                                                {formatCurrency(
                                                    payment.allocations.reduce(
                                                        (total, allocation) =>
                                                            total + Number(allocation.amount || 0),
                                                        0
                                                    ),
                                                    payment.currency
                                                )}
                                            </p>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="p-4 space-y-4">

                                        <div>
                                            <p className="text-xs text-(--text-muted)">
                                                Obligation Name
                                            </p>

                                            <p className="text-sm font-medium text-(--primary) mt-1">
                                                {obligation?.name || "—"}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Category
                                                </p>

                                                <p className="text-sm text-(--primary) mt-1 capitalize">
                                                    {obligation?.category || "—"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Year
                                                </p>

                                                <p className="text-sm text-(--primary) mt-1">
                                                    {obligation?.year || "—"}
                                                </p>
                                            </div>

                                        </div>

                                        {obligation?.description && (
                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Description
                                                </p>

                                                <p className="text-sm text-(--secondary) mt-1 leading-6">
                                                    {obligation.description}
                                                </p>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Amount Due
                                                </p>

                                                <p className="text-sm font-medium text-(--primary) mt-1">
                                                    {formatCurrency(
                                                        assignment?.amountDue,
                                                        payment.currency
                                                    )}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Amount Paid
                                                </p>

                                                <p className="text-sm font-medium text-(--primary) mt-1">
                                                    {formatCurrency(
                                                        assignment?.amountPaid,
                                                        payment.currency
                                                    )}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Assignment Status
                                                </p>

                                                <p className="text-sm font-medium text-(--primary) mt-1 capitalize">
                                                    {assignment?.status || "—"}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="flex items-center gap-2 pt-1">
                                            <CalendarDays
                                                size={15}
                                                className="text-(--text-muted)"
                                            />

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Due Date
                                                </p>

                                                <p className="text-sm text-(--primary) mt-1">
                                                    {formatDate(assignment?.dueDate)}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                )}

                            </div>

                            {/* TRANSACTION */}
                            <div className="border border-(--border) rounded overflow-hidden">

                                <div className="px-4 py-3 border-b border-(--border) flex items-center gap-2">
                                    <CreditCard
                                        size={16}
                                        className="text-(--primary)"
                                    />

                                    <h3 className="text-sm font-semibold text-(--primary)">
                                        Transaction Information
                                    </h3>
                                </div>

                                <div className="p-4 space-y-4">

                                    <div>
                                        <p className="text-xs text-(--text-muted)">
                                            Gateway Reference
                                        </p>

                                        <p className="text-xs font-medium text-(--primary) mt-1 break-all">
                                            {payment.gatewayReference ||
                                                "—"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-(--text-muted)">
                                            Payment ID
                                        </p>

                                        <p className="text-xs text-(--secondary) mt-1 break-all">
                                            {payment._id || "—"}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                        <div className="flex items-start gap-2.5">
                                            <CalendarDays
                                                size={15}
                                                className="text-(--text-muted) mt-0.5"
                                            />

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Paid At
                                                </p>

                                                <p className="text-sm text-(--primary) mt-1">
                                                    {formatDateTime(
                                                        payment.paidAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5">
                                            <Clock3
                                                size={15}
                                                className="text-(--text-muted) mt-0.5"
                                            />

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Created At
                                                </p>

                                                <p className="text-sm text-(--primary) mt-1">
                                                    {formatDateTime(
                                                        payment.createdAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                    {payment.metadata
                                        ?.paystackTransactionId && (
                                            <div className="flex items-start gap-2.5">
                                                <Hash
                                                    size={15}
                                                    className="text-(--text-muted) mt-0.5"
                                                />

                                                <div>
                                                    <p className="text-xs text-(--text-muted)">
                                                        Paystack Transaction ID
                                                    </p>

                                                    <p className="text-sm text-(--primary) mt-1">
                                                        {
                                                            payment
                                                                .metadata
                                                                .paystackTransactionId
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                </div>
                            </div>

                            {/* GATEWAY RESPONSE */}
                            {payment.metadata && (
                                <div className="border border-(--border) rounded overflow-hidden">

                                    <div className="px-4 py-3 border-b border-(--border) flex items-center gap-2">
                                        <BadgeCheck
                                            size={16}
                                            className="text-(--primary)"
                                        />

                                        <h3 className="text-sm font-semibold text-(--primary)">
                                            Gateway Information
                                        </h3>
                                    </div>

                                    <div className="p-4 space-y-4">

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Channel
                                                </p>

                                                <p className="text-sm text-(--primary) mt-1 capitalize">
                                                    {formatText(
                                                        payment.metadata.channel ||
                                                        payment.paymentMethod
                                                    )}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Currency
                                                </p>

                                                <p className="text-sm text-(--primary) mt-1">
                                                    {payment.metadata.currency ||
                                                        payment.currency ||
                                                        "—"}
                                                </p>
                                            </div>

                                        </div>

                                        <div>
                                            <p className="text-xs text-(--text-muted)">
                                                Gateway Response
                                            </p>

                                            <p className="text-sm text-(--primary) mt-1">
                                                {formatText(
                                                    payment.metadata.gatewayResponse ||
                                                    payment.metadata.paystackStatus
                                                )}
                                            </p>
                                        </div>

                                        {payment.metadata.failureReason && (
                                            <div>
                                                <p className="text-xs text-(--danger)">
                                                    Failure Reason
                                                </p>

                                                <p className="text-sm text-(--danger) mt-1">
                                                    {payment.metadata.failureReason}
                                                </p>
                                            </div>
                                        )}

                                        {payment.metadata.verifiedAt && (
                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Verified At
                                                </p>

                                                <p className="text-sm text-(--primary) mt-1">
                                                    {formatDateTime(
                                                        payment.metadata.verifiedAt
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                </div>

                {/* FOOTER */}
                <div className="px-5 py-3 border-t border-(--border) flex flex-wrap justify-end gap-3">

                    {canPrintTransaction && (
                        <button
                            type="button"
                            onClick={() => window.print()}
                            disabled={loading}
                            className="px-4 py-2 rounded text-xs font-semibold text-white bg-(--primary) hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-2 transition-colors"
                        >
                            <Printer size={14} />
                            Print Receipt
                        </button>
                    )}

                    {canVerify && (
    <button
        type="button"
        onClick={() => onVerify?.(payment)}
        disabled={verifying || loading || recovering}
        className="px-4 py-2 rounded text-xs font-semibold text-white bg-(--success) hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-2 transition-colors"
    >
        <RefreshCw
            size={14}
            className={verifying ? "animate-spin" : ""}
        />

        {verifying ? "Verifying..." : "Verify Payment"}
    </button>
)}

                    {canRecover && (
                        <button
                            type="button"
                            onClick={() => setShowRecoveryModal(true)}
                            disabled={recovering || loading}
                            className="px-4 py-2 rounded text-xs font-semibold text-white bg-(--danger) hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-2 transition-colors"
                        >
                            <RefreshCw size={14} />
                            Recover Payment
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded text-xs font-semibold text-(--primary) border border-(--border) hover:bg-(--bg-soft) transition-colors"
                    >
                        Close
                    </button>

                </div>

            </div>

            {showRecoveryModal && canRecover && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-(--bg-white) shadow-2xl p-5">

                        <div className="flex items-center gap-3 mb-4">
                            <ShieldAlert
                                size={24}
                                className="text-(--danger)"
                            />

                            <h3 className="text-base font-semibold text-(--primary)">
                                Recover Failed Payment
                            </h3>
                        </div>

                        <p className="text-sm text-(--secondary) leading-6 mb-4">
                            Paystack will be checked again before this payment
                            is marked successful. Only proceed when you have
                            a valid reason for recovery.
                        </p>

                        <label className="block text-xs font-semibold text-(--primary) mb-2">
                            Recovery reason
                        </label>

                        <textarea
                            value={recoveryReason}
                            onChange={(event) =>
                                setRecoveryReason(event.target.value)
                            }
                            rows={4}
                            maxLength={500}
                            placeholder="Explain why this payment needs recovery..."
                            disabled={recovering}
                            className="w-full rounded border border-(--border) bg-(--bg-white) text-(--primary) text-sm p-3 outline-none focus:border-(--primary) resize-y disabled:opacity-60"
                        />

                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowRecoveryModal(false);
                                    setRecoveryReason("");
                                }}
                                disabled={recovering}
                                className="px-4 py-2 rounded text-xs font-semibold border border-(--border) text-(--primary) hover:bg-(--bg-soft) disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={recovering || !recoveryReason.trim()}
                                onClick={async () => {
                                    const success = await onRecover(
                                        payment,
                                        recoveryReason.trim()
                                    );

                                    if (success) {
                                        setShowRecoveryModal(false);
                                        setRecoveryReason("");
                                    }
                                }}
                                className="px-4 py-2 rounded text-xs font-semibold text-white bg-(--danger) hover:opacity-90 disabled:opacity-50"
                            >
                                {recovering ? "Verifying..." : "Confirm Recovery"}
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* PRINT RECEIPT */}
            {payment && canPrintTransaction && (
                <div className="print-receipt">

                    {/* HEADER */}
                    <div className="receipt-header">
                        <div className="receipt-brand">
                            <img
                                src="/images/olivetNOSA_logo.png"
                                alt="Olivet NOSA"
                                className="receipt-logo"
                            />

                            <div>
                                <h1>NATIONAL OLD STUDENTS ASSOCIATION</h1>
                                <p>OLIVET NOSA</p>
                            </div>
                        </div>

                        <div className="receipt-title">
                            <h3>OFFICIAL PAYMENT RECEIPT</h3>
                            <span>Payment Confirmation</span>
                        </div>
                    </div>

                    {/* RECEIPT META */}
                    <div className="receipt-meta">
                        <div>
                            <span>Receipt No.</span>
                            <strong>
                                {payment.receiptNumber ||
                                    payment.gatewayReference ||
                                    "—"}
                            </strong>
                        </div>

                        <div>
                            <span>Payment Date</span>
                            <strong>
                                {formatDate(payment.paidAt || payment.createdAt)}
                            </strong>
                        </div>
                    </div>

                    {/* MEMBER INFORMATION */}
                    <div className="receipt-section">
                        <h4>MEMBER INFORMATION</h4>

                        <div className="receipt-grid">
                            <div>
                                <span>Member Name</span>
                                <strong>{memberName}</strong>
                            </div>

                            <div>
                                <span>Alumni ID</span>
                                <strong>{user?.alumniId || "—"}</strong>
                            </div>

                            <div>
                                <span>Email Address</span>
                                <strong>{user?.email || "—"}</strong>
                            </div>
                        </div>
                    </div>

                    {/* PAYMENT STATUS */}
                   
                    <div className="receipt-status">
    <span
        className={
            payment.status === "successful"
                ? "receipt-status-success"
                : payment.status === "pending"
                    ? "receipt-status-pending"
                    : ["failed", "cancelled"].includes(payment.status)
                        ? "receipt-status-danger"
                        : "receipt-status-pending"
        }
    >
        {payment.status === "successful"
            ? "✓ PAYMENT SUCCESSFUL"
            : payment.status === "pending"
                ? "● PAYMENT PENDING"
                : payment.status === "failed"
                    ? "✕ PAYMENT FAILED"
                    : payment.status === "cancelled"
                        ? "✕ PAYMENT CANCELLED"
                        : `● ${formatText(payment.status).toUpperCase()}`}
    </span>
</div>

                    {/* PAYMENT INFORMATION */}
                    <div className="receipt-section">
                        <h4>PAYMENT INFORMATION</h4>

                        <div className="receipt-grid">
                            <div>
                                <span>Payment Type</span>
                                <strong>
                                    {isCombinedPayment
                                        ? "Multiple Obligations Payment"
                                        : "Single Obligation Payment"}
                                </strong>
                            </div>

                            <div>
                                <span>Payment Method</span>
                                <strong className="capitalize">
                                    {payment.paymentMethod?.replace(/[_-]/g, " ") || "—"}
                                </strong>
                            </div>

                            <div>
                                <span>Transaction Reference</span>
                                <strong className="receipt-reference">
                                    {payment.gatewayReference || "—"}
                                </strong>
                            </div>
                        </div>
                    </div>

                    {/* PAYMENT BREAKDOWN */}
                    <div className="receipt-section">
                        <h4>PAYMENT BREAKDOWN</h4>

                        <table className="receipt-items-table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Amount Paid</th>
                                </tr>
                            </thead>

                            <tbody>
                                {receiptItems.length > 0 ? (
                                    receiptItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <strong>{item.name}</strong>

                                                {item.year && (
                                                    <small className="receipt-item-year">
                                                        {item.year}
                                                    </small>
                                                )}
                                            </td>

                                            <td className="capitalize">
                                                {item.category}
                                            </td>

                                            <td className="receipt-item-amount">
                                                {formatCurrency(
                                                    item.amount,
                                                    payment.currency
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">
                                            Payment allocation details unavailable.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* TOTAL */}
                    <div className="receipt-total">
                        <span>TOTAL AMOUNT PAID</span>

                        <strong>
                            {formatCurrency(payment.amount, payment.currency)}
                        </strong>
                    </div>

                    {/* FOOTER */}
                    <div className="receipt-footer">
                        <p>
                            Thank you for your contribution to Olivet NOSA.
                        </p>

                        <small>
                            This receipt confirms that the payment above was
                            successfully processed.
                        </small>

                        <small>
                            Generated electronically — no signature required.
                        </small>
                    </div>

                </div>
            )}

        </div>
    );
};

export default PaymentDetailsDrawer;