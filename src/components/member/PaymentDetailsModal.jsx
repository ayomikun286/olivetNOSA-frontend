
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

    const isCombinedPayment =
        payment.metadata?.paymentType === "combined" ||
        (Array.isArray(payment.allocations) &&
            payment.allocations.length > 0);

    const obligation =
        payment.obligationAssignment?.obligation;

    // MEMBER INFORMATION
    const memberName = [
        payment.user?.firstName,
        payment.user?.middleName,
        payment.user?.lastName,
    ]
        .filter(Boolean)
        .join(" ") || "—";

    const memberAlumniId =
        payment.user?.alumniId || "—";

    const memberEmail =
        payment.user?.email || "—";

    // MULTIPLE PAYMENT ALLOCATIONS
    const allocations = (payment.allocations || []).map(
        (allocation) => {
            const paidObligation =
                allocation.obligationAssignment?.obligation;

            return {
                name: paidObligation?.name || "Obligation",
                category: paidObligation?.category || "—",
                year: paidObligation?.year || null,
                amount: Number(allocation.amount || 0),
            };
        }
    );

    const categories = [
        ...new Set(
            allocations
                .map((item) => item.category)
                .filter((category) => category !== "—")
        ),
    ];

    // RECEIPT BREAKDOWN
    // Single payment: use its linked obligation.
    // Multiple payment: use every saved allocation.
    const receiptItems = isCombinedPayment
        ? allocations
        : [
              {
                  name: obligation?.name || "Payment",
                  category: obligation?.category || "—",
                  year: obligation?.year || null,
                  amount: Number(payment.amount || 0),
              },
          ];

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

    const amountDue = Number(
        payment.obligationAssignment?.amountDue || 0
    );

    const amountPaid = Number(
        payment.obligationAssignment?.amountPaid || 0
    );

    const amountRemaining = Math.max(
        amountDue - amountPaid,
        0
    );

    const paymentTitle = isCombinedPayment
        ? "Combined Payment"
        : obligation?.name || "Payment";

    const paymentCategory = isCombinedPayment
        ? categories.length
            ? categories.join(", ")
            : "—"
        : obligation?.category || "—";

    const handlePrint = () => {
        window.print();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-3 sm:p-5"
            onClick={onClose}
        >
            {/* PAYMENT DETAILS MODAL */}
            <div
                className="my-auto w-full max-w-xl overflow-hidden rounded bg-(--bg-white) shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-(--border) bg-(--bg-white) px-5 py-4 sm:px-6">
                    <div>
                        <h2 className="text-base font-semibold text-(--primary)">
                            Payment Details
                        </h2>

                        <p className="mt-1 text-xs text-(--text-muted)">
                            View your transaction information and receipt
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded text-(--text-muted) transition hover:bg-(--bg-light) hover:text-(--primary)"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="space-y-5 p-5 sm:p-6">
                    {/* AMOUNT AND STATUS */}
                    <div className="rounded border border-(--border) bg-(--bg-light) p-5">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-xs font-medium text-(--text-muted)">
                                    Amount Paid
                                </p>

                                <h3 className="mt-1 text-2xl font-bold text-(--primary)">
                                    {formatCurrency(payment.amount)}
                                </h3>
                            </div>

                            <span
                                className={`inline-flex items-center gap-1.5 rounded px-3 py-2 text-xs font-semibold ${status.className}`}
                            >
                                <StatusIcon size={14} />
                                {status.label}
                            </span>
                        </div>
                    </div>

                    {/* PAYMENT INFORMATION */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-(--primary)">
                            Payment Information
                        </h3>

                        <div className="overflow-hidden rounded border border-(--border) divide-y divide-(--border)">
                            {/* PAYMENT TYPE */}
                            <div className="flex items-center justify-between gap-4 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                                        <Wallet size={16} />
                                    </div>

                                    <span className="text-sm text-(--secondary)">
                                        Payment Type
                                    </span>
                                </div>

                                <span className="text-right text-sm font-semibold text-(--primary)">
                                    {paymentTitle}
                                </span>
                            </div>

                            {/* MULTIPLE OBLIGATIONS */}
                            {isCombinedPayment ? (
                                <div className="p-4">
                                    <div className="mb-3">
                                        <p className="text-sm font-semibold text-(--primary)">
                                            Obligations Paid
                                        </p>

                                        <p className="mt-1 text-xs text-(--text-muted)">
                                            Breakdown of this transaction
                                        </p>
                                    </div>

                                    <div className="overflow-hidden rounded border border-(--border)">
                                        {allocations.length > 0 ? (
                                            allocations.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex items-start justify-between gap-3 p-3 ${
                                                        index !== allocations.length - 1
                                                            ? "border-b border-(--border)"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium text-(--primary)">
                                                            {item.name}
                                                        </p>

                                                        <p className="mt-1 text-xs capitalize text-(--text-muted)">
                                                            {item.category}
                                                        </p>
                                                    </div>

                                                    <span className="shrink-0 text-sm font-semibold text-(--primary)">
                                                        {formatCurrency(item.amount)}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="p-3 text-sm text-(--text-muted)">
                                                Allocation details unavailable.
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-3 flex items-center justify-between gap-3">
                                        <span className="text-xs font-medium text-(--secondary)">
                                            Total Transaction
                                        </span>

                                        <span className="text-sm font-bold text-(--primary)">
                                            {formatCurrency(payment.amount)}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between gap-4 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                                            <Wallet size={16} />
                                        </div>

                                        <span className="text-sm text-(--secondary)">
                                            Category
                                        </span>
                                    </div>

                                    <span className="text-right text-sm font-semibold capitalize text-(--primary)">
                                        {paymentCategory}
                                    </span>
                                </div>
                            )}

                            {/* PAYMENT DATE */}
                            <div className="flex items-center justify-between gap-4 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                                        <CalendarDays size={16} />
                                    </div>

                                    <span className="text-sm text-(--secondary)">
                                        Payment Date
                                    </span>
                                </div>

                                <span className="text-right text-sm font-medium text-(--primary)">
                                    {formatDate(
                                        payment.paidAt || payment.createdAt
                                    )}
                                </span>
                            </div>

                            {/* PAYMENT METHOD */}
                            <div className="flex items-center justify-between gap-4 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                                        <CreditCard size={16} />
                                    </div>

                                    <span className="text-sm text-(--secondary)">
                                        Payment Method
                                    </span>
                                </div>

                                <span className="text-right text-sm font-medium capitalize text-(--primary)">
                                    {payment.paymentMethod?.replace(
                                        "_",
                                        " "
                                    ) || "—"}
                                </span>
                            </div>

                            {/* REFERENCE */}
                            <div className="flex items-center justify-between gap-4 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                                        <Hash size={16} />
                                    </div>

                                    <span className="text-sm text-(--secondary)">
                                        Reference
                                    </span>
                                </div>

                                <span className="max-w-[55%] break-all text-right text-xs font-medium text-(--primary)">
                                    {payment.gatewayReference || "—"}
                                </span>
                            </div>

                            {/* REMAINING BALANCE */}
                            {!isCombinedPayment &&
                                payment.status === "successful" &&
                                amountDue > 0 && (
                                    <div className="flex items-center justify-between gap-4 p-4">
                                        <span className="text-sm text-(--secondary)">
                                            Remaining Balance
                                        </span>

                                        <span className="text-sm font-semibold text-(--primary)">
                                            {formatCurrency(amountRemaining)}
                                        </span>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-end gap-3 border-t border-(--border) bg-(--bg-white) p-5 sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded border border-(--border) px-4 py-2.5 text-sm font-medium text-(--secondary) transition hover:bg-(--bg-light)"
                    >
                        Close
                    </button>

                    {payment.status === "successful" && (
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 rounded bg-(--primary) px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            <Printer size={16} />
                            Print Receipt
                        </button>
                    )}
                </div>
            </div>

            {/* PRINT RECEIPT */}
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
                            {formatDate(
                                payment.paidAt || payment.createdAt
                            )}
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
                            <strong>{memberAlumniId}</strong>
                        </div>

                        <div>
                            <span>Email Address</span>
                            <strong>{memberEmail}</strong>
                        </div>
                    </div>
                </div>

                {/* PAYMENT STATUS */}
                <div className="receipt-status">
                    <span>✓ PAYMENT SUCCESSFUL</span>
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
                                            {formatCurrency(item.amount)}
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

export default PaymentDetailsModal;
