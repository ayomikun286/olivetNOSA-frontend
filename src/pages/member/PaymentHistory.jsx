
import React, { useEffect, useRef, useState } from "react";
import PaymentDetailsModal from "../../components/member/PaymentDetailsModal.jsx";
import {
    CheckCircle2,
    Clock3,
    XCircle,
    CreditCard,
    Receipt,
    CircleDollarSign,
} from "lucide-react";
import ContentLoading from "../../components/admin/ContentLoading.jsx";
import {
    getMyPayments,
    verifyPayment,
} from "../../services/paymentService.js";
import { useSearchParams } from "react-router-dom";

const PaymentHistory = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [verifying, setVerifying] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [verificationMessage, setVerificationMessage] = useState("");
    const [payments, setPayments] = useState([]);

    const verificationStarted = useRef(false);

    const [summary, setSummary] = useState({
        totalPaid: 0,
        successful: 0,
        pending: 0,
        failed: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadPayments = async (showLoader = false) => {
            try {
                if (showLoader && isMounted) {
                    setLoading(true);
                }

                setError("");

                const data = await getMyPayments();

                if (!isMounted) return;

                setPayments(data.payments || []);

                setSummary(
                    data.summary || {
                        totalPaid: 0,
                        successful: 0,
                        pending: 0,
                        failed: 0,
                    }
                );
            } catch (error) {
                if (!isMounted) return;

                console.error("Payment history error:", error);

                setError(
                    error.message || "Failed to load payment history."
                );
            } finally {
                if (isMounted && showLoader) {
                    setLoading(false);
                }
            }
        };

        const verifyReturnedPayment = async () => {
            const paymentStatus = searchParams.get("payment");
            const reference = searchParams.get("reference");

            await loadPayments(true);

            if (!isMounted) return;

            if (!paymentStatus) return;

            if (paymentStatus === "failed") {
                setVerificationMessage(
                    "Your payment could not be completed. You can try again from your outstanding obligations."
                );

                setSearchParams({});
                return;
            }

            if (paymentStatus !== "verify" || !reference) {
                setSearchParams({});
                return;
            }

            if (verificationStarted.current) return;

            verificationStarted.current = true;

            try {
                setVerifying(true);
                setVerificationMessage("Verifying your payment...");
                setError("");

                const data = await verifyPayment(reference);

                if (!isMounted) return;

                if (data.success) {
                    window.dispatchEvent(
                        new CustomEvent("nosa:payment-success", {
                            detail: {
                                title: "Payment Successful",
                                message: `Your payment of ₦${data.payment?.amount?.toLocaleString() || ""} was successful.`,
                                link: "/portal/member/dashboard/payment-history",
                            },
                        })
                    );

                    setVerificationMessage(
                        "Payment successful. Your payment history has been updated."
                    );
                } else {
                    setVerificationMessage(
                        data.message || "Payment was not successful."
                    );
                }

                await loadPayments();

                if (isMounted) {
                    setSearchParams({});
                }
            } catch (error) {
                if (!isMounted) return;

                console.error("Payment verification error:", error);

                setError(
                    error.message || "We could not verify your payment."
                );
            } finally {
                if (isMounted) {
                    setVerifying(false);
                }
            }
        };

        verifyReturnedPayment();

        return () => {
            isMounted = false;
        };
    }, [searchParams, setSearchParams]);

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

    const getStatus = (status) => {
        switch (status) {
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
                    icon: Receipt,
                    className:
                        "text-(--text-muted) bg-(--bg-light)",
                };

            default:
                return {
                    label: status || "Unknown",
                    icon: Clock3,
                    className:
                        "text-(--text-muted) bg-(--bg-light)",
                };
        }
    };

    if (loading) {
        return <ContentLoading />;
    }

    return (
        <div className="p-4">
            <div className="space-y-5">

                {/* PAGE HEADER */}
                <div>
                    <h1 className="text-xl font-semibold text-(--primary)">
                        Payment History
                    </h1>

                    <p className="mt-1 text-sm text-(--secondary)">
                        View your previous payments and transaction status.
                    </p>
                </div>

                {/* VERIFICATION MESSAGE */}
                {(verifying || verificationMessage) && (
                    <div className="rounded border border-(--primary)/20 bg-(--primary-light) p-4">
                        <div className="flex items-start gap-3">
                            {verifying ? (
                                <div className="mt-0.5 h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-(--primary)/20 border-t-(--primary)" />
                            ) : (
                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-(--success)"
                                />
                            )}

                            <div>
                                <p className="text-sm font-medium text-(--primary)">
                                    {verificationMessage}
                                </p>

                                {verifying && (
                                    <p className="mt-1 text-xs text-(--secondary)">
                                        Please wait while we confirm the transaction with Paystack.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <div className="rounded border border-(--danger)/20 bg-(--danger)/5 p-4">
                        <div className="flex items-start gap-3">
                            <XCircle
                                size={18}
                                className="mt-0.5 shrink-0 text-(--danger)"
                            />

                            <p className="text-sm text-(--danger)">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* SUMMARY */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                    {/* TOTAL PAID */}
                    <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
                                <CircleDollarSign size={20} />
                            </div>

                            <span className="text-xs text-(--text-muted)">
                                Total
                            </span>
                        </div>

                        <p className="mt-5 text-sm text-(--secondary)">
                            Total paid
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-(--primary)">
                            {formatCurrency(summary.totalPaid)}
                        </h2>

                        <p className="mt-2 text-xs text-(--text-muted)">
                            Successful payments
                        </p>
                    </div>

                    {/* SUCCESSFUL */}
                    <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--success-light) text-(--success)">
                                <CheckCircle2 size={20} />
                            </div>

                            <span className="text-xs text-(--text-muted)">
                                Successful
                            </span>
                        </div>

                        <p className="mt-5 text-sm text-(--secondary)">
                            Successful payments
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-(--primary)">
                            {summary.successful}
                        </h2>

                        <p className="mt-2 text-xs text-(--text-muted)">
                            Completed transactions
                        </p>
                    </div>

                    {/* PENDING */}
                    <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--warning-light) text-(--warning)">
                                <Clock3 size={20} />
                            </div>

                            <span className="text-xs text-(--text-muted)">
                                Pending
                            </span>
                        </div>

                        <p className="mt-5 text-sm text-(--secondary)">
                            Pending payments
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-(--primary)">
                            {summary.pending}
                        </h2>

                        <p className="mt-2 text-xs text-(--text-muted)">
                            Awaiting confirmation
                        </p>
                    </div>

                    {/* FAILED */}
                    <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--danger-light) text-(--danger)">
                                <XCircle size={20} />
                            </div>

                            <span className="text-xs text-(--text-muted)">
                                Failed
                            </span>
                        </div>

                        <p className="mt-5 text-sm text-(--secondary)">
                            Failed payments
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-(--primary)">
                            {summary.failed}
                        </h2>

                        <p className="mt-2 text-xs text-(--text-muted)">
                            Failed or cancelled
                        </p>
                    </div>
                </div>

                {/* TRANSACTIONS */}
                <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">

                    {/* HEADER */}
                    <div className="flex flex-col justify-between gap-3 border-b border-(--border) p-5 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="font-semibold text-(--primary)">
                                Payment Transactions
                            </h2>

                            <p className="mt-1 text-sm text-(--secondary)">
                                Your recorded payment activity.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-(--secondary)">
                            <CreditCard size={15} />

                            {payments.length} transaction
                            {payments.length !== 1 ? "s" : ""}
                        </div>
                    </div>

                    {/* EMPTY STATE */}
                    {payments.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--primary-light) text-(--primary)">
                                <CreditCard size={21} />
                            </div>

                            <h3 className="mt-4 font-semibold text-(--primary)">
                                No payments yet
                            </h3>

                            <p className="mx-auto mt-1 max-w-md text-sm text-(--secondary)">
                                Your payment transactions will appear here
                                once you make a payment.
                            </p>
                        </div>
                    ) : (
                        <div className="max-h-[600px]  overflow-y-auto  scrollbar-hide divide-y divide-(--border)">
                            {payments.map((payment) => {
                                const status = getStatus(payment.status);
                                const StatusIcon = status.icon;

                                const isCombinedPayment =
                                    payment.metadata?.paymentType === "combined" ||
                                    (Array.isArray(payment.allocations) &&
                                        payment.allocations.length > 0);

                                const obligation =
                                    payment.obligationAssignment?.obligation;

                                const allocations = (
                                    payment.allocations || []
                                ).map((allocation) => ({
                                    name:
                                        allocation.obligationAssignment
                                            ?.obligation?.name ||
                                        "Obligation",
                                    category:
                                        allocation.obligationAssignment
                                            ?.obligation?.category ||
                                        "—",
                                    amount: Number(allocation.amount || 0),
                                }));

                                const categories = [
                                    ...new Set(
                                        allocations
                                            .map((item) => item.category)
                                            .filter((category) => category !== "—")
                                    ),
                                ];

                                return (
                                    <div
                                        key={payment._id}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() =>
                                            setSelectedPayment(payment)
                                        }
                                        onKeyDown={(event) => {
                                            if (
                                                event.key === "Enter" ||
                                                event.key === " "
                                            ) {
                                                event.preventDefault();
                                                setSelectedPayment(payment);
                                            }
                                        }}
                                        className="cursor-pointer p-5 transition hover:bg-(--bg-light)/40 focus-visible:outline-2 focus-visible:outline-(--primary) sm:p-6"
                                    >
                                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                                            {/* PAYMENT INFO */}
                                            <div className="flex min-w-0 items-start gap-3.5">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
                                                    <CreditCard size={18} />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h3 className="text-sm font-semibold text-(--primary)">
                                                            {isCombinedPayment
                                                                ? "Combined Payment"
                                                                : obligation?.name || "Payment"}
                                                        </h3>

                                                        {isCombinedPayment && (
                                                            <span className="rounded bg-(--primary-light) px-2 py-1 text-[10px] font-semibold text-(--primary)">
                                                                {allocations.length} obligations
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* SINGLE PAYMENT CATEGORY */}
                                                    {!isCombinedPayment && (
                                                        <p className="mt-1 text-xs capitalize text-(--secondary)">
                                                            {obligation?.category || "—"}
                                                        </p>
                                                    )}

                                                    {/* COMBINED PAYMENT BREAKDOWN */}
                                                    {isCombinedPayment && (
                                                        <div className="mt-3  max-w-md space-y-2">
                                                            {allocations.length > 0 ? (
                                                                <div className="overflow-hidden rounded border border-(--border)">
                                                                    {allocations.map(
                                                                        (item, index) => (
                                                                            <div
                                                                                key={`${payment._id}-${index}`}
                                                                                className={`flex items-start justify-between gap-3 px-3 py-2 ${
                                                                                    index !== allocations.length - 1
                                                                                        ? "border-b border-(--border)"
                                                                                        : ""
                                                                                }`}
                                                                            >
                                                                                <div className="min-w-0">
                                                                                    <p className="text-xs font-medium text-(--primary)">
                                                                                        {item.name}
                                                                                    </p>

                                                                                    <p className="mt-0.5 text-[10px] capitalize text-(--text-muted)">
                                                                                        {item.category}
                                                                                    </p>
                                                                                </div>

                                                                                <span className="shrink-0 text-xs font-semibold text-(--secondary)">
                                                                                    {formatCurrency(item.amount)}
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <p className="text-xs text-(--text-muted)">
                                                                    Allocation details unavailable.
                                                                </p>
                                                            )}

                                                            {categories.length > 0 && (
                                                                <p className="text-[10px] capitalize text-(--text-muted)">
                                                                    {categories.join(", ")}
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-(--text-muted)">
                                                        <span>
                                                            {formatDate(
                                                                payment.paidAt ||
                                                                payment.createdAt
                                                            )}
                                                        </span>

                                                        {payment.gateway && (
                                                            <span className="capitalize">
                                                                {payment.gateway}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {payment.gatewayReference && (
                                                        <p className="mt-2 break-all text-[10px] text-(--text-muted)">
                                                            Ref: {payment.gatewayReference}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* AMOUNT + STATUS */}
                                            <div className="flex shrink-0 items-center justify-between gap-5 sm:justify-end">
                                                <div className="sm:text-right">
                                                    <p className="text-[11px] text-(--text-muted)">
                                                        {isCombinedPayment
                                                            ? "Total transaction"
                                                            : "Amount"}
                                                    </p>

                                                    <p className="mt-0.5 text-sm font-semibold text-(--primary)">
                                                        {formatCurrency(
                                                            payment.amount
                                                        )}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium ${status.className}`}
                                                >
                                                    <StatusIcon size={13} />
                                                    {status.label}
                                                </span>
                                            </div>
                                        </div>

                                        {/* VIEW DETAILS */}
                                        <div className="mt-3 flex justify-end">
                                            <span className="text-[11px] font-medium text-(--primary)">
                                                View transaction details →
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* PAYMENT DETAILS MODAL */}
            <PaymentDetailsModal
                payment={selectedPayment}
                onClose={() => setSelectedPayment(null)}
            />
        </div>
    );
};

export default PaymentHistory;
