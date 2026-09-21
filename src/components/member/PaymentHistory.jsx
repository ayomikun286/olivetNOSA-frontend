import {
  CheckCircle2,
  ArrowRight,
  ReceiptText,
  Clock3,
  XCircle,
  Import,
} from "lucide-react";
import{getMyPayments} from "../../services/paymentService.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PaymentHistory = () => {
  const navigate = useNavigate();


  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true);

        const data = await getMyPayments();

        setPayments(data?.payments || []);
      } catch (error) {
        console.error("Failed to load payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
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

  const getStatus = (status) => {
    switch (status) {
      case "successful":
        return {
          label: "Successful",
          icon: CheckCircle2,
          className: "text-(--success) bg-(--success-light)",
        };

      case "pending":
        return {
          label: "Pending",
          icon: Clock3,
          className: "text-(--warning) bg-(--warning-light)",
        };

      case "failed":
        return {
          label: "Failed",
          icon: XCircle,
          className: "text-(--danger) bg-(--danger-light)",
        };

      case "cancelled":
        return {
          label: "Cancelled",
          icon: XCircle,
          className: "text-(--danger) bg-(--danger-light)",
        };

      case "refunded":
        return {
          label: "Refunded",
          icon: ReceiptText,
          className: "text-(--text-muted) bg-(--bg-light)",
        };

      default:
        return {
          label: status || "Unknown",
          icon: Clock3,
          className: "text-(--text-muted) bg-(--bg-light)",
        };
    }
  };

  return (
    <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
      {/* HEADER */}
      <div className="p-5 border-b border-(--border) flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-(--primary)">
            Payment History
          </h2>

          <p className="text-sm text-(--secondary) mt-1">
            Your most recent payments.
          </p>
        </div>

        {payments.length > 0 && (
          <button
            type="button"
            onClick={() =>
              navigate("/portal/member/dashboard/payment-history")
            }
            className="flex items-center gap-1 text-xs font-semibold text-(--primary) hover:text-(--primary-dark)"
          >
            View all
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* PAYMENTS */}
      {payments.length === 0 ? (
        <div className="p-8 text-center">
          <div className="w-11 h-11 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
            <ReceiptText size={20} />
          </div>

          <h3 className="text-sm font-semibold text-(--primary) mt-3">
            No payments yet
          </h3>

          <p className="text-xs text-(--secondary) mt-1">
            Your payment history will appear here once you make a
            payment.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-(--border)">
          {payments.slice(0, 3).map((payment) => {
            const status = getStatus(payment.status);
            const StatusIcon = status.icon;

            const obligation =
              payment.obligationAssignment?.obligation;

            return (
              <div
                key={payment._id}
                className="p-4 flex items-center gap-3"
              >
                {/* ICON */}
                <div
                  className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center ${status.className}`}
                >
                  <StatusIcon size={17} />
                </div>

                {/* INFO */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-(--primary) truncate">
                    {obligation?.name || "Payment"}
                  </p>

                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-(--secondary)">
                      {formatDate(payment.createdAt)}
                    </p>

                    {payment.gateway && (
                      <>
                        <span className="text-(--text-muted)">
                          •
                        </span>

                        <p className="text-xs text-(--secondary) capitalize">
                          {payment.gateway}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* AMOUNT + STATUS */}
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-(--primary)">
                    {formatCurrency(payment.amount)}
                  </p>

                  <p
                    className={`text-[10px] font-medium mt-0.5 ${status.className
                      .split(" ")
                      .find((className) =>
                        className.includes("text-")
                      ) || "text-(--text-muted)"}`}
                  >
                    {status.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FOOTER */}
      {payments.length > 0 && (
        <div className="px-5 py-3 border-t border-(--border)">
          <button
            type="button"
            onClick={() =>
              navigate("payment-history")
            }
            className="text-xs font-medium text-(--secondary) hover:text-(--primary) transition"
          >
            View complete payment history →
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;