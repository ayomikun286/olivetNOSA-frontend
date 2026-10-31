
import React from "react";
import {
  X,
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  Wallet,
  AlertCircle,
  ReceiptText,
  Banknote,
  Save,
} from "lucide-react";
import Alert from "../../components/common/Alert.jsx";
import { recordTreasurerOfflinePayment } from "../../services/adminService.js";

const TreasurerMemberDrawer = ({
  open,
  onClose,
  memberDetails,
  loading = false,
  error = "",
  onPaymentRecorded,
}) => {
  const [showPaymentForm, setShowPaymentForm] = React.useState(false);
  const [selectedAssignment, setSelectedAssignment] = React.useState("");
  const [paymentAmount, setPaymentAmount] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("cash");
  const [paymentDate, setPaymentDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [paymentReference, setPaymentReference] = React.useState("");
  const [paymentNotes, setPaymentNotes] = React.useState("");
  const [paymentLoading, setPaymentLoading] = React.useState(false);
  const [paymentError, setPaymentError] = React.useState("");
    const [alert, setAlert] = React.useState(null);


  const member = memberDetails?.member;
  const summary = memberDetails?.financialSummary || {};
  const assignments = memberDetails?.assignments || [];
  const payments = memberDetails?.payments || [];

  const today = new Date().toISOString().split("T")[0];
  if (!open) return null;
  const openPaymentForm = (assignment) => {
    const outstanding =
      Number(assignment.amountDue || 0) -
      Number(assignment.amountPaid || 0);

    setSelectedAssignment(assignment._id);
    setPaymentAmount(String(Math.max(0, outstanding)));
    setPaymentMethod("cash");
    setPaymentDate(today);
    setPaymentReference("");
    setPaymentNotes("");
    setPaymentError("");
    setShowPaymentForm(true);
  };

  const closePaymentForm = () => {
    if (paymentLoading) return;

    setShowPaymentForm(false);
    setPaymentError("");
  };

  const handleRecordPayment = async (event) => {
    event.preventDefault();

    try {
      setPaymentError("");

      if (!member?._id) {
        throw new Error("Member information is unavailable.");
      }

      if (!selectedAssignment) {
        throw new Error("Please select an obligation.");
      }

      const assignment = assignments.find(
        (item) => item._id === selectedAssignment
      );

      if (!assignment) {
        throw new Error("Selected obligation was not found.");
      }

      const outstanding = Math.max(
        0,
        Number(assignment.amountDue || 0) -
          Number(assignment.amountPaid || 0)
      );

      const amount = Number(paymentAmount);

      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Enter a valid payment amount.");
      }

      if (amount > outstanding) {
        throw new Error(
          "Payment cannot exceed the outstanding balance."
        );
      }

      setPaymentLoading(true);

      await recordTreasurerOfflinePayment({
        userId: member._id,
        assignmentId: selectedAssignment,
        amount,
        paymentMethod,
        paidAt: paymentDate,
        reference: paymentReference.trim(),
        notes: paymentNotes.trim(),
      });

      setAlert({
  type: "success",
  title: "Payment Recorded",
  message: "Offline payment recorded successfully.",
});

      setShowPaymentForm(false);
      setSelectedAssignment("");
      setPaymentAmount("");
      setPaymentMethod("cash");
      setPaymentDate(today);
      setPaymentReference("");
      setPaymentNotes("");

      if (onPaymentRecorded) {
        await onPaymentRecorded();
      }
    } catch (error) {
      console.error("Offline payment error:", error);

      setPaymentError(
        error.message || "Unable to record payment."
      );
      setAlert({
  type: "error",
  title: "Payment Failed",
  message: error.message || "Unable to record payment.",
});
    } finally {
      setPaymentLoading(false);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(Number(amount || 0));

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    const styles = {
      paid: "bg-(--success-light) text-(--success)",
      partial: "bg-(--warning-light) text-(--warning)",
      pending: "bg-(--bg-soft) text-(--secondary)",
      overdue: "bg-(--danger-light) text-(--danger)",
      successful: "bg-(--success-light) text-(--success)",
      failed: "bg-(--danger-light) text-(--danger)",
    };

    return styles[status] || "bg-(--bg-soft) text-(--secondary)";
  };

  const getObligationName = (assignment) => {
    const obligation = assignment.obligation;

    return (
      obligation?.title ||
      obligation?.name ||
      obligation?.description ||
      "Financial Obligation"
    );
  };

  const getPaymentName = (payment) => {
    const obligation = payment.obligationAssignment?.obligation;

    return (
      obligation?.title ||
      obligation?.name ||
      "Obligation Payment"
    );
  };

  const selectedAssignmentDetails = assignments.find(
    (item) => item._id === selectedAssignment
  );

  const selectedOutstanding = selectedAssignmentDetails
    ? Math.max(
        0,
        Number(selectedAssignmentDetails.amountDue || 0) -
          Number(selectedAssignmentDetails.amountPaid || 0)
      )
    : 0;

  return (
    <>

    {alert && (
  <div className="fixed right-5 top-5 z-[100] w-full max-w-sm">
    <Alert
      type={alert.type}
      title={alert.title}
      message={alert.message}
      onClose={() => setAlert(null)}
    />
  </div>
)}
      {/* DRAWER OVERLAY */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40"
      />

      {/* MEMBER DRAWER */}
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-2xl flex-col bg-(--bg-white) shadow-xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-(--primary)">
              Member Financial Details
            </h2>

            <p className="mt-1 text-xs text-(--secondary)">
              Review member information, obligations and payments.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded border border-(--border) text-(--secondary) hover:bg-(--bg-soft) hover:text-(--primary)"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--border) border-t-(--primary)" />

              <p className="text-sm text-(--secondary)">
                Loading member details...
              </p>
            </div>
          ) : error ? (
            <div className="rounded border border-(--danger-light) bg-(--danger-light) p-5 text-center">
              <AlertCircle
                size={24}
                className="mx-auto text-(--danger)"
              />

              <p className="mt-3 text-sm text-(--danger)">
                {error}
              </p>
            </div>
          ) : !member ? (
            <div className="py-16 text-center">
              <UserRound
                size={30}
                className="mx-auto text-(--text-muted)"
              />

              <p className="mt-3 text-sm text-(--secondary)">
                Member information is unavailable.
              </p>
            </div>
          ) : (
            <div className="space-y-6">

              {/* MEMBER PROFILE */}
              <section className="rounded border border-(--border) p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--primary-light) text-(--primary)">
                    <UserRound size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-(--primary)">
                      {[
                        member.firstName,
                        member.middleName,
                        member.lastName,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    </h3>

                    <p className="mt-0.5 text-xs text-(--secondary)">
                      {member.alumniId || "No Alumni ID"}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded bg-(--bg-soft) px-2 py-1 text-xs capitalize text-(--secondary)">
                        {member.status || "Unknown"}
                      </span>

                      <span className="rounded bg-(--primary-light) px-2 py-1 text-xs capitalize text-(--primary)">
                        {member.financialStatus?.replace(/_/g, " ") || "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 border-t border-(--border) pt-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-xs text-(--secondary)">
                    <Mail size={15} className="shrink-0" />
                    <span className="break-all">
                      {member.email || "No email"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-(--secondary)">
                    <Phone size={15} className="shrink-0" />
                    {member.phone || "No phone number"}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-(--secondary)">
                    <CalendarDays size={15} />
                    Year Set: {member.yearSet?.name || "—"}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-(--secondary)">
                    <UserRound size={15} />
                    Chapter: {member.chapter?.name || "—"}
                  </div>
                </div>
              </section>

              {/* FINANCIAL SUMMARY */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-(--primary)">
                  Financial Summary
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded border border-(--border) p-3">
                    <p className="text-xs text-(--secondary)">
                      Total Due
                    </p>

                    <p className="mt-2 text-base font-semibold text-(--primary)">
                      {formatCurrency(summary.totalDue)}
                    </p>
                  </div>

                  <div className="rounded border border-(--border) p-3">
                    <p className="text-xs text-(--secondary)">
                      Total Paid
                    </p>

                    <p className="mt-2 text-base font-semibold text-(--success)">
                      {formatCurrency(summary.totalPaid)}
                    </p>
                  </div>

                  <div className="rounded border border-(--border) p-3">
                    <p className="text-xs text-(--secondary)">
                      Outstanding
                    </p>

                    <p className="mt-2 text-base font-semibold text-(--danger)">
                      {formatCurrency(summary.outstandingBalance)}
                    </p>
                  </div>
                </div>
              </section>

              {/* ASSIGNED OBLIGATIONS */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-(--primary)">
                    Assigned Obligations
                  </h3>

                  <span className="text-xs text-(--secondary)">
                    {assignments.length} records
                  </span>
                </div>

                {assignments.length === 0 ? (
                  <div className="rounded border border-(--border) p-6 text-center">
                    <Wallet
                      size={24}
                      className="mx-auto text-(--text-muted)"
                    />

                    <p className="mt-2 text-xs text-(--secondary)">
                      No financial obligations assigned.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {assignments.map((assignment) => {
                      const outstanding =
                        Number(assignment.amountDue || 0) -
                        Number(assignment.amountPaid || 0);

                      return (
                        <div
                          key={assignment._id}
                          className="rounded border border-(--border) p-4"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium text-(--primary)">
                                {getObligationName(assignment)}
                              </p>

                              <p className="mt-1 text-xs text-(--secondary)">
                                Due: {formatDate(assignment.dueDate)}
                              </p>
                            </div>

                            <span
                              className={`rounded px-2 py-1 text-xs capitalize ${getStatusStyle(
                                assignment.status
                              )}`}
                            >
                              {assignment.status || "Unknown"}
                            </span>
                          </div>

                          <div className="mt-4 grid grid-cols-3 gap-2">
                            <div>
                              <p className="text-[11px] text-(--secondary)">
                                Amount Due
                              </p>

                              <p className="mt-1 text-xs font-semibold text-(--primary)">
                                {formatCurrency(assignment.amountDue)}
                              </p>
                            </div>

                            <div>
                              <p className="text-[11px] text-(--secondary)">
                                Amount Paid
                              </p>

                              <p className="mt-1 text-xs font-semibold text-(--success)">
                                {formatCurrency(assignment.amountPaid)}
                              </p>
                            </div>

                            <div>
                              <p className="text-[11px] text-(--secondary)">
                                Balance
                              </p>

                              <p className="mt-1 text-xs font-semibold text-(--danger)">
                                {formatCurrency(Math.max(0, outstanding))}
                              </p>
                            </div>
                          </div>

                          {outstanding > 0 && (
                            <button
                              type="button"
                              onClick={() => openPaymentForm(assignment)}
                              className="mt-4 inline-flex h-9 items-center gap-2 rounded bg-(--primary) px-3 text-xs font-medium text-white transition-colors hover:bg-(--primary-dark)"
                            >
                              <Banknote size={15} />
                              Record Payment
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* PAYMENT HISTORY */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-(--primary)">
                    Payment History
                  </h3>

                  <span className="text-xs text-(--secondary)">
                    {payments.length} records
                  </span>
                </div>

                {payments.length === 0 ? (
                  <div className="rounded border border-(--border) p-6 text-center">
                    <ReceiptText
                      size={24}
                      className="mx-auto text-(--text-muted)"
                    />

                    <p className="mt-2 text-xs text-(--secondary)">
                      No payment history available.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded border border-(--border)">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-(--bg-soft) text-(--secondary)">
                        <tr>
                          <th className="px-3 py-3 font-medium">
                            Payment
                          </th>
                          <th className="px-3 py-3 font-medium">
                            Method
                          </th>
                          <th className="px-3 py-3 font-medium">
                            Date
                          </th>
                          <th className="px-3 py-3 font-medium">
                            Amount
                          </th>
                          <th className="px-3 py-3 font-medium">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-(--border)">
                        {payments.map((payment) => (
                          <tr key={payment._id}>
                            <td className="px-3 py-3 text-(--primary)">
                              {getPaymentName(payment)}
                            </td>

                            <td className="px-3 py-3 capitalize text-(--secondary)">
                              {(payment.paymentMethod || "—").replace(/_/g, " ")}
                            </td>

                            <td className="px-3 py-3 whitespace-nowrap text-(--secondary)">
                              {formatDate(payment.paidAt || payment.createdAt)}
                            </td>

                            <td className="px-3 py-3 whitespace-nowrap font-semibold text-(--primary)">
                              {formatCurrency(payment.amount)}
                            </td>

                            <td className="px-3 py-3">
                              <span
                                className={`rounded px-2 py-1 capitalize ${getStatusStyle(
                                  payment.status
                                )}`}
                              >
                                {payment.status || "Unknown"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>

        {/* DRAWER FOOTER */}
        <div className="border-t border-(--border) px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 w-full rounded border border-(--border) bg-(--bg-white) text-sm font-medium text-(--primary) hover:bg-(--bg-soft)"
          >
            Close
          </button>
        </div>
      </aside>

      {/* FLOATING PAYMENT MODAL */}
      {showPaymentForm && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
          onClick={closePaymentForm}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-(--border) bg-(--bg-white) p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-(--primary)">
                  Record Offline Payment
                </h3>

                <p className="mt-1 text-xs text-(--secondary)">
                  Record a cash or bank transfer payment.
                </p>
              </div>

              <button
                type="button"
                onClick={closePaymentForm}
                disabled={paymentLoading}
                className="flex h-9 w-9 items-center justify-center rounded border border-(--border) text-(--secondary) hover:bg-(--bg-soft) disabled:opacity-50"
              >
                <X size={17} />
              </button>
            </div>

            {/* SELECTED OBLIGATION */}
            {selectedAssignmentDetails && (
              <div className="mb-4 rounded border border-(--border) bg-(--bg-soft) p-3">
                <p className="text-xs text-(--secondary)">
                  Selected Obligation
                </p>

                <p className="mt-1 text-sm font-medium text-(--primary)">
                  {getObligationName(selectedAssignmentDetails)}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-(--secondary)">
                    Outstanding Balance
                  </span>

                  <span className="text-sm font-semibold text-(--danger)">
                    {formatCurrency(selectedOutstanding)}
                  </span>
                </div>
              </div>
            )}

            {/* ERROR */}
            {paymentError && (
              <div className="mb-4 rounded border border-(--danger-light) bg-(--danger-light) p-3 text-xs text-(--danger)">
                {paymentError}
              </div>
            )}

            {/* PAYMENT FORM */}
            <form
              onSubmit={handleRecordPayment}
              className="space-y-4"
            >
              {/* AMOUNT */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                  Amount Received (₦) *
                </label>

                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                  value={paymentAmount}
                  onChange={(event) =>
                    setPaymentAmount(event.target.value)
                  }
                  placeholder="Enter amount received"
                  className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-sm text-(--primary) outline-none focus:border-(--primary)"
                />
              </div>

              {/* PAYMENT METHOD */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                  Payment Method *
                </label>

                <select
                  value={paymentMethod}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                  required
                  className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-sm text-(--primary) outline-none focus:border-(--primary)"
                >
                  <option value="cash">Cash</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>

              {/* PAYMENT DATE */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                  Payment Date *
                </label>

                <input
                  type="date"
                  value={paymentDate}
                  onChange={(event) =>
                    setPaymentDate(event.target.value)
                  }
                  required
                  max={today}
                  className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-sm text-(--primary) outline-none focus:border-(--primary)"
                />
              </div>

              {/* REFERENCE */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                  Transaction Reference
                </label>

                <input
                  type="text"
                  value={paymentReference}
                  onChange={(event) =>
                    setPaymentReference(event.target.value)
                  }
                  placeholder="Optional bank transfer reference"
                  className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-sm text-(--primary) outline-none focus:border-(--primary)"
                />
              </div>

              {/* NOTES */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                  Notes
                </label>

                <textarea
                  rows={3}
                  value={paymentNotes}
                  onChange={(event) =>
                    setPaymentNotes(event.target.value)
                  }
                  placeholder="Additional payment information..."
                  className="w-full resize-none rounded border border-(--border) bg-(--bg-white) p-3 text-sm text-(--primary) outline-none focus:border-(--primary)"
                />
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap justify-end gap-2 border-t border-(--border) pt-4">
                <button
                  type="button"
                  disabled={paymentLoading}
                  onClick={closePaymentForm}
                  className="h-10 rounded border border-(--border) px-4 text-xs font-medium text-(--secondary) hover:bg-(--bg-soft) disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={paymentLoading || !selectedAssignmentDetails}
                  className="inline-flex h-10 items-center gap-2 rounded bg-(--primary) px-4 text-xs font-semibold text-white hover:bg-(--primary-dark) disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {paymentLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Recording...
                    </>
                  ) : (
                    <>
                      <Save size={15} />
                      Save Payment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TreasurerMemberDrawer;
