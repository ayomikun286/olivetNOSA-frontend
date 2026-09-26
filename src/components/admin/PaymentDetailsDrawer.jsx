import React from "react";

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
} from "lucide-react";

const PaymentDetailsDrawer = ({
    payment,
    open,
    loading = false,
    onClose,
}) => {
    if (!open) return null;

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

                            <div className="h-24 rounded-lg bg-(--bg-soft) animate-pulse" />

                            <div className="h-32 rounded-lg bg-(--bg-soft) animate-pulse" />

                            <div className="h-40 rounded-lg bg-(--bg-soft) animate-pulse" />

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
                            <div className="border border-(--border) rounded-lg p-5">

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
                            <div className="border border-(--border) rounded-lg overflow-hidden">

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
                            <div className="border border-(--border) rounded-lg overflow-hidden">

                                <div className="px-4 py-3 border-b border-(--border) flex items-center gap-2">
                                    <ReceiptText
                                        size={16}
                                        className="text-(--primary)"
                                    />

                                    <h3 className="text-sm font-semibold text-(--primary)">
                                        Obligation
                                    </h3>
                                </div>

                                <div className="p-4 space-y-4">

                                    <div>
                                        <p className="text-xs text-(--text-muted)">
                                            Obligation Name
                                        </p>

                                        <p className="text-sm font-medium text-(--primary) mt-1">
                                            {obligation?.name ||
                                                "—"}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">

                                        <div>
                                            <p className="text-xs text-(--text-muted)">
                                                Category
                                            </p>

                                            <p className="text-sm text-(--primary) mt-1 capitalize">
                                                {obligation?.category ||
                                                    "—"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-(--text-muted)">
                                                Year
                                            </p>

                                            <p className="text-sm text-(--primary) mt-1">
                                                {obligation?.year ||
                                                    "—"}
                                            </p>
                                        </div>

                                    </div>

                                    {obligation?.description && (
                                        <div>
                                            <p className="text-xs text-(--text-muted)">
                                                Description
                                            </p>

                                            <p className="text-sm text-(--secondary) mt-1 leading-6">
                                                {
                                                    obligation.description
                                                }
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
                                                {assignment?.status ||
                                                    "—"}
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
                                                {formatDate(
                                                    assignment?.dueDate
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* TRANSACTION */}
                            <div className="border border-(--border) rounded-lg overflow-hidden">

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
                                <div className="border border-(--border) rounded-lg overflow-hidden">

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
                                                        payment
                                                            .metadata
                                                            .channel
                                                    )}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Currency
                                                </p>

                                                <p className="text-sm text-(--primary) mt-1">
                                                    {payment
                                                        .metadata
                                                        .currency ||
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
                                                {payment.metadata
                                                    .gatewayResponse ||
                                                    "—"}
                                            </p>
                                        </div>

                                        {payment.metadata
                                            .failureReason && (
                                            <div>
                                                <p className="text-xs text-(--danger)">
                                                    Failure Reason
                                                </p>

                                                <p className="text-sm text-(--danger) mt-1">
                                                    {
                                                        payment
                                                            .metadata
                                                            .failureReason
                                                    }
                                                </p>
                                            </div>
                                        )}

                                        {payment.metadata
                                            .verifiedAt && (
                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Verified At
                                                </p>

                                                <p className="text-sm text-(--primary) mt-1">
                                                    {formatDateTime(
                                                        payment
                                                            .metadata
                                                            .verifiedAt
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
                <div className="px-5 py-3 border-t border-(--border) flex justify-end">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded text-xs font-semibold text-(--primary) border border-(--border) hover:bg-(--bg-soft) transition-colors"
                    >
                        Close
                    </button>

                </div>

            </div>
        </div>
    );
};

export default PaymentDetailsDrawer;