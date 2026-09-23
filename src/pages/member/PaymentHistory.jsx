import React, { useEffect, useState } from "react";
import PaymentDetailsModal from "../../components/member/PaymentDetailsModal.jsx";
import {
    CheckCircle2,
    Clock3,
    XCircle,
    CreditCard,
    Receipt,
    CircleDollarSign,
} from "lucide-react";

import { getMyPayments, verifyPayment, } from "../../services/paymentService.js";
import {
    useSearchParams,
} from "react-router-dom";
const PaymentHistory = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [verifying, setVerifying] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [verificationMessage, setVerificationMessage] = useState("");
    const [payments, setPayments] = useState([]);

    const [summary, setSummary] = useState({
        totalPaid: 0,
        successful: 0,
        pending: 0,
        failed: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const loadPayments = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getMyPayments();

                console.log(data)

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
                console.error(
                    "Payment history error:",
                    error
                );

                setError(
                    error.message ||
                    "Failed to load payment history."
                );
            } finally {
                setLoading(false);
            }
        };



        const verifyReturnedPayment = async () => {
            const paymentStatus = searchParams.get("payment");
            const reference = searchParams.get("reference");

            // Nothing to verify
            if (!paymentStatus) {
                await loadPayments();
                return;
            }

            // Payment failed or Paystack callback did not return a reference
            if (paymentStatus === "failed") {
                setVerificationMessage(
                    "Your payment could not be completed. You can try again from your outstanding obligations."
                );

                await loadPayments();

                setSearchParams({});
                return;
            }

            // Verify successful Paystack return
            if (paymentStatus !== "verify" || !reference) {
                await loadPayments();
                return;
            }

            try {
                setVerifying(true);
                setVerificationMessage("Verifying your payment...");
                setError("");

                const data = await verifyPayment(reference);

                if (data.success) {
                    window.dispatchEvent(
                        new CustomEvent("nosa:payment-success", {
                            detail: {
                                title: "Payment Successful",
                                message: `Your payment of ₦${data.payment?.amount?.toLocaleString() || ""
                                    } was successful.`,
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

                setSearchParams({});
            } catch (error) {
                console.error("Payment verification error:", error);

                setError(
                    error.message ||
                    "We could not verify your payment."
                );
            } finally {
                setVerifying(false);
            }
        };
        verifyReturnedPayment();
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

    return (
        <div className="p-4">
            <div className="space-y-5">

                {/* PAGE HEADER */}
                <div>
                    <h1 className="text-xl font-semibold text-(--primary)">
                        Payment History
                    </h1>

                    <p className="text-sm text-(--secondary) mt-1">
                        View your previous payments and transaction status.
                    </p>
                </div>

                {(verifying || verificationMessage) && (
                    <div className="border border-(--primary)/20 bg-(--primary-light) rounded p-4">
                        <div className="flex items-start gap-3">
                            {verifying ? (
                                <div className="w-5 h-5 border-2 border-(--primary)/20 border-t-(--primary) rounded-full animate-spin shrink-0 mt-0.5" />
                            ) : (
                                <CheckCircle2
                                    size={18}
                                    className="text-(--success) shrink-0 mt-0.5"
                                />
                            )}

                            <div>
                                <p className="text-sm font-medium text-(--primary)">
                                    {verificationMessage}
                                </p>

                                {verifying && (
                                    <p className="text-xs text-(--secondary) mt-1">
                                        Please wait while we confirm the transaction with Paystack.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <div className="border border-(--danger)/20 bg-(--danger)/5 rounded p-4">
                        <div className="flex items-start gap-3">
                            <XCircle
                                size={18}
                                className="text-(--danger) shrink-0 mt-0.5"
                            />

                            <p className="text-sm text-(--danger)">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

                    {/* TOTAL PAID */}
                    <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <CircleDollarSign size={20} />
                            </div>

                            <span className="text-xs text-(--text-muted)">
                                Total
                            </span>
                        </div>

                        <p className="text-sm text-(--secondary) mt-5">
                            Total paid
                        </p>

                        <h2 className="text-2xl font-bold text-(--primary) mt-1">
                            {formatCurrency(summary.totalPaid)}
                        </h2>

                        <p className="text-xs text-(--text-muted) mt-2">
                            Successful payments
                        </p>
                    </div>

                    {/* SUCCESSFUL */}
                    <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-(--success-light) text-(--success) flex items-center justify-center">
                                <CheckCircle2 size={20} />
                            </div>

                            <span className="text-xs text-(--text-muted)">
                                Successful
                            </span>
                        </div>

                        <p className="text-sm text-(--secondary) mt-5">
                            Successful payments
                        </p>

                        <h2 className="text-2xl font-bold text-(--primary) mt-1">
                            {summary.successful}
                        </h2>

                        <p className="text-xs text-(--text-muted) mt-2">
                            Completed transactions
                        </p>
                    </div>

                    {/* PENDING */}
                    <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-(--warning-light) text-(--warning) flex items-center justify-center">
                                <Clock3 size={20} />
                            </div>

                            <span className="text-xs text-(--text-muted)">
                                Pending
                            </span>
                        </div>

                        <p className="text-sm text-(--secondary) mt-5">
                            Pending payments
                        </p>

                        <h2 className="text-2xl font-bold text-(--primary) mt-1">
                            {summary.pending}
                        </h2>

                        <p className="text-xs text-(--text-muted) mt-2">
                            Awaiting confirmation
                        </p>
                    </div>

                    {/* FAILED */}
                    <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-(--danger-light) text-(--danger) flex items-center justify-center">
                                <XCircle size={20} />
                            </div>

                            <span className="text-xs text-(--text-muted)">
                                Failed
                            </span>
                        </div>

                        <p className="text-sm text-(--secondary) mt-5">
                            Failed payments
                        </p>

                        <h2 className="text-2xl font-bold text-(--primary) mt-1">
                            {summary.failed}
                        </h2>

                        <p className="text-xs text-(--text-muted) mt-2">
                            Failed or cancelled
                        </p>
                    </div>
                </div>

                {/* TRANSACTIONS */}
                <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                    {/* HEADER */}
                    <div className="p-5 border-b border-(--border) flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h2 className="font-semibold text-(--primary)">
                                Payment Transactions
                            </h2>

                            <p className="text-sm text-(--secondary) mt-1">
                                Your recorded payment activity.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-(--secondary)">
                            <CreditCard size={15} />

                            {payments.length} transaction
                            {payments.length !== 1 ? "s" : ""}
                        </div>
                    </div>

                    {/* CONTENT */}
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="w-6 h-6 border-2 border-(--primary)/20 border-t-(--primary) rounded-full animate-spin mx-auto" />

                            <p className="text-sm text-(--secondary) mt-3">
                                Loading payment history...
                            </p>
                        </div>
                    ) : payments.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <CreditCard size={21} />
                            </div>

                            <h3 className="font-semibold text-(--primary) mt-4">
                                No payments yet
                            </h3>

                            <p className="text-sm text-(--secondary) mt-1 max-w-md mx-auto">
                                Your payment transactions will appear here
                                once you make a payment.
                            </p>
                        </div>
                    ) : (
                        <div className="max-h-[600px] overflow-y-auto">
                            <div className="divide-y max-h-[400px] overflow-y-auto scrollbar-hide divide-(--border)">
                                {payments.map((payment) => {
                                    const status = getStatus(
                                        payment.status
                                    );

                                    const StatusIcon = status.icon;

                                    const obligation =
                                        payment
                                            .obligationAssignment
                                            ?.obligation;

                                    return (
                                        <div
                                            key={payment._id}
                                            onClick={() => setSelectedPayment(payment)}
                                            className="p-5 sm:p-6 hover:bg-(--bg-light)/40 transition"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                                                {/* PAYMENT INFO */}
                                                <div className="flex items-start gap-3.5 min-w-0">
                                                    <div className="w-10 h-10 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                                        <CreditCard
                                                            size={18}
                                                        />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h3 className="text-sm font-semibold text-(--primary)">
                                                            {obligation?.name ||
                                                                "Payment"}
                                                        </h3>

                                                        <p className="text-xs text-(--secondary) mt-1">
                                                            {obligation?.category ||
                                                                "—"}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-(--text-muted)">
                                                            <span>
                                                                {formatDate(
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
                                                            <p className="text-[10px] text-(--text-muted) mt-2">
                                                                Ref:{" "}
                                                                {
                                                                    payment.gatewayReference
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* AMOUNT + STATUS */}
                                                <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
                                                    <div className="sm:text-right">
                                                        <p className="text-[11px] text-(--text-muted)">
                                                            Amount
                                                        </p>

                                                        <p className="text-sm font-semibold text-(--primary) mt-0.5">
                                                            {formatCurrency(
                                                                payment.amount
                                                            )}
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
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <PaymentDetailsModal
                payment={selectedPayment}
                onClose={() => setSelectedPayment(null)}
            />
        </div>
    );
};

export default PaymentHistory;