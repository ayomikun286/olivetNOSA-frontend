import {
  CheckCircle2,
  ArrowRight,
  ReceiptText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const PaymentHistory = ({ payments = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
      {/* HEADER */}
      <div className="p-5 border-b border-(--border) flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-(--text-primary)">
            Payment History
          </h2>

          <p className="text-sm text-(--text-secondary) mt-1">
            Your most recent payments.
          </p>
        </div>

        {payments.length > 0 && (
          <button
            type="button"
            onClick={() => navigate("/dashboard/payments")}
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

          <h3 className="text-sm font-semibold text-(--text-primary) mt-3">
            No payments yet
          </h3>

          <p className="text-xs text-(--text-secondary) mt-1">
            Your payment history will appear here once you make a payment.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-(--border)">
          {payments.slice(0, 3).map((payment) => (
            <div
              key={payment._id}
              className="p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 shrink-0 rounded-lg bg-green-50 text-(--success) flex items-center justify-center">
                <CheckCircle2 size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-(--text-primary) truncate">
                  {payment.description || "Membership payment"}
                </p>

                <p className="text-xs text-(--text-secondary) mt-0.5">
                  {payment.date || "—"}
                </p>
              </div>

              <p className="text-sm font-semibold text-(--text-primary)">
                {payment.amount || "₦0"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      {payments.length > 0 && (
        <div className="px-5 py-3 border-t border-(--border)">
          <button
            type="button"
            onClick={() => navigate("/dashboard/payments")}
            className="text-xs font-medium text-(--text-secondary) hover:text-(--primary) transition"
          >
            View complete payment history →
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
