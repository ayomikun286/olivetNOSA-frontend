import React from "react";
import {
    X,
    CheckCircle2,
    Clock3,
    XCircle,
    Printer,
    CreditCard,
    CalendarDays,
    Hash,
    Wallet,
} from "lucide-react";

const PaymentDetailsModal = ({ payment, onClose }) => {
    if (!payment) return null;

    const obligation =
        payment.obligationAssignment?.obligation;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: payment.currency || "NGN",
            maximumFractionDigits: 0,
        }).format(Number(amount || 0));
    };

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const getStatus = () => {
        switch (payment.status) {
            case "successful":
                return {
                    label: "Successful",
                    icon: CheckCircle2,
                    className:
                        "text-(--success) bg-(--success-light)",
                };

            case "pending":
                return {
                    label: "Pending",
                    icon: Clock3,
                    className:
                        "text-(--warning) bg-(--warning-light)",
                };

            case "failed":
                return {
                    label: "Failed",
                    icon: XCircle,
                    className:
                        "text-(--danger) bg-(--danger-light)",
                };

            case "cancelled":
                return {
                    label: "Cancelled",
                    icon: XCircle,
                    className:
                        "text-(--danger) bg-(--danger-light)",
                };

            case "refunded":
                return {
                    label: "Refunded",
                    icon: Wallet,
                    className:
                        "text-(--text-muted) bg-(--bg-light)",
                };

            default:
                return {
                    label: payment.status || "Unknown",
                    icon: Clock3,
                    className:
                        "text-(--text-muted) bg-(--bg-light)",
                };
        }
    };

    const status = getStatus();
    const StatusIcon = status.icon;

    const amountDue =
        Number(
            payment.obligationAssignment?.amountDue || 0
        );

    const amountPaid =
        Number(
            payment.obligationAssignment?.amountPaid || 0
        );

    const amountRemaining = Math.max(
        amountDue - amountPaid,
        0
    );

    const handlePrint = () => {
        window.print();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex overflow-y-scroll items-start justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg bg-(--bg-white) rounded shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="p-5 border-b border-(--border) flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-(--primary)">
                            Payment Details
                        </h2>

                        <p className="text-xs text-(--secondary) mt-1">
                            Transaction information
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-(--text-muted) hover:bg-(--bg-light) hover:text-(--primary) transition"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-5">

                    {/* STATUS + AMOUNT */}
                    <div className="rounded-lg border border-(--border) p-5">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-xs text-(--text-muted)">
                                    Amount Paid
                                </p>

                                <h3 className="text-2xl font-bold text-(--primary) mt-1">
                                    {formatCurrency(payment.amount)}
                                </h3>
                            </div>

                            <span
                                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full ${status.className}`}
                            >
                                <StatusIcon size={14} />
                                {status.label}
                            </span>
                        </div>
                    </div>

                    {/* PAYMENT INFORMATION */}
                    <div>
                        <h3 className="text-sm font-semibold text-(--primary) mb-3">
                            Payment Information
                        </h3>

                        <div className="border border-(--border) rounded-lg divide-y divide-(--border)">

                            {/* OBLIGATION */}
                            <div className="p-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                        <ReceiptIcon />
                                    </div>

                                    <span className="text-sm text-(--secondary)">
                                        Obligation
                                    </span>
                                </div>

                                <span className="text-sm font-medium text-(--primary) text-right">
                                    {obligation?.name || "—"}
                                </span>
                            </div>

                            {/* CATEGORY */}
                            <div className="p-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                        <Wallet size={16} />
                                    </div>

                                    <span className="text-sm text-(--secondary)">
                                        Category
                                    </span>
                                </div>

                                <span className="text-sm font-medium text-(--primary) capitalize">
                                    {obligation?.category || "—"}
                                </span>
                            </div>

                            {/* DATE */}
                            <div className="p-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                        <CalendarDays size={16} />
                                    </div>

                                    <span className="text-sm text-(--secondary)">
                                        Payment Date
                                    </span>
                                </div>

                                <span className="text-sm font-medium text-(--primary)">
                                    {formatDate(
                                        payment.paidAt ||
                                        payment.createdAt
                                    )}
                                </span>
                            </div>

                            {/* PAYMENT METHOD */}
                            <div className="p-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                        <CreditCard size={16} />
                                    </div>

                                    <span className="text-sm text-(--secondary)">
                                        Payment Method
                                    </span>
                                </div>

                                <span className="text-sm font-medium text-(--primary) capitalize">
                                    {payment.paymentMethod
                                        ?.replace("_", " ") ||
                                        "—"}
                                </span>
                            </div>

                            {/* REFERENCE */}
                            <div className="p-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                        <Hash size={16} />
                                    </div>

                                    <span className="text-sm text-(--secondary)">
                                        Reference
                                    </span>
                                </div>

                                <span className="text-xs font-medium text-(--primary) text-right break-all">
                                    {payment.gatewayReference ||
                                        "—"}
                                </span>
                            </div>

                            {/* REMAINING */}
                            {payment.status === "successful" &&
                                amountDue > 0 && (
                                    <div className="p-4 flex items-center justify-between gap-4">
                                        <span className="text-sm text-(--secondary)">
                                            Remaining Balance
                                        </span>

                                        <span className="text-sm font-semibold text-(--primary)">
                                            {formatCurrency(
                                                amountRemaining
                                            )}
                                        </span>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="p-5 border-t border-(--border) flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 text-sm font-medium text-(--secondary) border border-(--border) rounded hover:bg-(--bg-light) transition"
                    >
                        Close
                    </button>

                    {payment.status === "successful" && (
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-(--primary) text-white rounded hover:opacity-90 transition"
                        >
                            <Printer size={16} />
                            Print Receipt
                        </button>
                    )}
                </div>
            </div>
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
                            <h1>OLIVET OLD BOYS' HIGH SCHOOL</h1>
                            <h2>NATIONAL OLD STUDENTS ASSOCIATION</h2>
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
                            {formatDate(
                                payment.paidAt || payment.createdAt
                            )}
                        </strong>
                    </div>
                </div>

                {/* SUCCESS */}
                <div className="receipt-status">
                    <span>✓ PAYMENT SUCCESSFUL</span>
                </div>

                {/* MEMBER INFORMATION */}
                {/* <div className="receipt-section">
                    <h4>MEMBER INFORMATION</h4>

                    <div className="receipt-grid">
                        <div>
                            <span>Member Name</span>
                            <strong>
                                {payment.user?.firstName ||
                                    payment.member?.firstName
                                    ? `${payment.user?.firstName || payment.member?.firstName || ""} ${payment.user?.middleName ||
                                        payment.member?.middleName ||
                                        ""
                                        } ${payment.user?.lastName ||
                                        payment.member?.lastName ||
                                        ""
                                        }`.replace(/\s+/g, " ").trim()
                                    : payment.memberName || "—"}
                            </strong>
                        </div>

                        <div>
                            <span>Alumni ID</span>
                            <strong>
                                {payment.user?.alumniId ||
                                    payment.member?.alumniId ||
                                    payment.alumniId ||
                                    "—"}
                            </strong>
                        </div>
                    </div>
                </div> */}

                {/* PAYMENT INFORMATION */}
                <div className="receipt-section">
                    <h4>PAYMENT INFORMATION</h4>

                    <div className="receipt-grid">
                        <div>
                            <span>Obligation</span>
                            <strong>
                                {obligation?.name || "—"}
                            </strong>
                        </div>

                        <div>
                            <span>Category</span>
                            <strong className="capitalize">
                                {obligation?.category || "—"}
                            </strong>
                        </div>

                        <div>
                            <span>Payment Method</span>
                            <strong className="capitalize">
                                {payment.paymentMethod?.replace(
                                    "_",
                                    " "
                                ) || "—"}
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

                {/* AMOUNT */}
                <div className="receipt-total">
                    <span>AMOUNT PAID</span>

                    <strong>
                        {formatCurrency(payment.amount)}
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
        </div>
    );
};

const ReceiptIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M4 2v20l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2V2z" />
        <path d="M8 6h8" />
        <path d="M8 10h8" />
        <path d="M8 14h5" />
    </svg>
);

export default PaymentDetailsModal;