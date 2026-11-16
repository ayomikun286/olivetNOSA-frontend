
import { useMemo, useState } from "react";
import {
    X,
    CreditCard,
    LoaderCircle,
    ShieldCheck,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 2,
    }).format(amount || 0);

const CombinedPaymentModal = ({ obligations = [], onClose }) => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");

    // ========================================
    // PAYABLE OBLIGATIONS
    // ========================================

    const payableObligations = useMemo(() => {
        return obligations
            .filter((assignment) => {
                const obligation = assignment.obligation;

                if (!obligation) return false;
                if (obligation.category !== "individual") return false;
                if (obligation.isActive !== true) return false;

                const outstanding =
                    Number(assignment.amountDue || 0) -
                    Number(assignment.amountPaid || 0);

                return outstanding > 0;
            })
            .map((assignment) => ({
                ...assignment,
                outstanding:
                    Number(assignment.amountDue || 0) -
                    Number(assignment.amountPaid || 0),
            }));
    }, [obligations]);

    // Mandatory obligations always appear first.
    const mandatoryObligations = payableObligations.filter(
        (assignment) =>
            assignment.obligation?.isOptional !== true
    );

    // Optional obligations always appear last.
    const optionalObligations = payableObligations.filter(
        (assignment) =>
            assignment.obligation?.isOptional === true
    );

    // ========================================
    // SELECTION
    // ========================================

    const selectedObligations = payableObligations.filter(
        (assignment) =>
            selectedIds.includes(assignment._id)
    );

    const totalAmount = selectedObligations.reduce(
        (total, assignment) =>
            total + assignment.outstanding,
        0
    );

    const allSelected =
        payableObligations.length > 0 &&
        payableObligations.every((assignment) =>
            selectedIds.includes(assignment._id)
        );

    const toggleObligation = (assignmentId) => {
        setError("");

        setSelectedIds((previous) =>
            previous.includes(assignmentId)
                ? previous.filter((id) => id !== assignmentId)
                : [...previous, assignmentId]
        );
    };

    const toggleSelectAll = () => {
        setError("");

        setSelectedIds(
            allSelected
                ? []
                : payableObligations.map(
                      (assignment) => assignment._id
                  )
        );
    };

    // ========================================
    // INITIALIZE COMBINED PAYMENT
    // ========================================

    const handleCombinedPayment = async () => {
        if (selectedIds.length === 0) {
            setError(
                "Please select at least one obligation to continue."
            );
            return;
        }

        try {
            setIsProcessing(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/payments/combined/initialize`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        obligationAssignmentIds: selectedIds,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                        "Unable to initialize combined payment."
                );
            }

            if (!data.authorizationUrl) {
                throw new Error(
                    "Payment initialization succeeded, but no Paystack payment URL was returned."
                );
            }

            window.location.href = data.authorizationUrl;
        } catch (err) {
            setError(
                err.message ||
                    "Something went wrong. Please try again."
            );

            setIsProcessing(false);
        }
    };

    // ========================================
    // REUSABLE OBLIGATION ITEM
    // ========================================

    const renderObligation = (assignment) => {
        const obligation = assignment.obligation;

        const isSelected = selectedIds.includes(
            assignment._id
        );

        const isOptional = obligation.isOptional === true;

        return (
            <label
                key={assignment._id}
                className={`
                    flex cursor-pointer items-start gap-3
                    border p-4 transition
                    ${
                        isSelected
                            ? "border-(--primary) bg-(--primary-light)"
                            : isOptional
                            ? "border-amber-200 bg-amber-50/40 hover:border-amber-400"
                            : "border-(--border) hover:border-(--primary)"
                    }
                    ${isProcessing ? "cursor-not-allowed opacity-70" : ""}
                `}
            >
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() =>
                        toggleObligation(assignment._id)
                    }
                    disabled={isProcessing}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-(--primary)"
                />

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-(--primary)">
                            {obligation.name}
                        </span>

                        {isOptional && (
                            <span className="inline-flex items-center gap-1 border border-amber-200 bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700">
                                <ShieldCheck size={11} />
                                OPTIONAL
                            </span>
                        )}

                        {!isOptional && (
                            <span className="border border-blue-100 bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
                                REQUIRED
                            </span>
                        )}
                    </div>

                    {obligation.description && (
                        <p className="mt-1 text-xs leading-relaxed text-(--secondary)">
                            {obligation.description}
                        </p>
                    )}

                    <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-xs text-(--text-muted)">
                            Outstanding balance
                        </span>

                        <span className="text-sm font-semibold text-(--primary)">
                            {formatCurrency(assignment.outstanding)}
                        </span>
                    </div>
                </div>

                {isSelected && (
                    <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-(--primary)"
                    />
                )}
            </label>
        );
    };

    // ========================================
    // RENDER
    // ========================================

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-5">
            <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded border border-(--border) bg-(--bg-white) shadow-xl">

                {/* HEADER */}

                <div className="flex items-start justify-between border-b border-(--border) p-5 sm:p-6">
                    <div>
                        <h2 className="text-lg font-semibold text-(--primary)">
                            Pay Multiple Obligations
                        </h2>

                        <p className="mt-1 text-sm text-(--secondary)">
                            Select the contributions you want to settle in one payment.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isProcessing}
                        aria-label="Close modal"
                        className="rounded p-2 text-(--secondary) transition hover:bg-(--bg-light) hover:text-(--primary) disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* CONTENT */}

                <div className="flex-1 overflow-y-auto p-5 sm:p-6">

                    {payableObligations.length === 0 ? (
                        <div className="py-10 text-center">
                            <CheckCircle2
                                size={40}
                                className="mx-auto text-(--success)"
                            />

                            <h3 className="mt-4 font-semibold text-(--primary)">
                                No Outstanding Obligations
                            </h3>

                            <p className="mt-2 text-sm text-(--secondary)">
                                You currently have no active Individual obligations available for payment.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* SELECT ALL */}

                            <div className="mb-5 flex items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-semibold text-(--primary)">
                                        Available Obligations
                                    </h3>

                                    <p className="mt-1 text-xs text-(--text-muted)">
                                        {payableObligations.length} outstanding obligation(s)
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={toggleSelectAll}
                                    disabled={isProcessing}
                                    className="text-xs font-semibold text-(--primary) transition hover:underline"
                                >
                                    {allSelected
                                        ? "Deselect All"
                                        : "Select All"}
                                </button>
                            </div>

                            {/* MANDATORY OBLIGATIONS */}

                            {mandatoryObligations.length > 0 && (
                                <div className="mb-6">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-wide text-(--primary)">
                                                Required Contributions
                                            </h4>

                                            <p className="mt-1 text-xs text-(--secondary)">
                                                Mandatory membership obligations
                                            </p>
                                        </div>

                                        <span className="text-xs text-(--text-muted)">
                                            {mandatoryObligations.length}
                                        </span>
                                    </div>

                                    <div className="divide-y divide-(--border) border border-(--border)">
                                        {mandatoryObligations.map(
                                            renderObligation
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* OPTIONAL OBLIGATIONS - ALWAYS LAST */}

                            {optionalObligations.length > 0 && (
                                <div>
                                    <div className="mb-3 flex items-center justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h4 className="text-xs font-bold uppercase tracking-wide text-amber-800">
                                                    Optional Contributions
                                                </h4>

                                                <span className="border border-amber-200 bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                                                    NOT COMPULSORY
                                                </span>
                                            </div>

                                            <p className="mt-1 text-xs text-amber-700">
                                                Include these only if you wish to.
                                            </p>
                                        </div>

                                        <span className="text-xs text-amber-700">
                                            {optionalObligations.length}
                                        </span>
                                    </div>

                                    <div className="divide-y divide-amber-200 border border-amber-200">
                                        {optionalObligations.map(
                                            renderObligation
                                        )}
                                    </div>

                                    <p className="mt-3 text-xs leading-relaxed text-(--secondary)">
                                        Optional contributions, such as insurance, do not affect your mandatory outstanding balance. You can include or exclude them from this payment.
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {/* ERROR */}

                    {error && (
                        <div className="mt-4 flex items-start gap-2 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            <AlertCircle
                                size={17}
                                className="mt-0.5 shrink-0"
                            />

                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* FOOTER */}

                {payableObligations.length > 0 && (
                    <div className="border-t border-(--border) bg-(--bg-light) p-5 sm:p-6">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-xs text-(--secondary)">
                                    Selected Obligations
                                </p>

                                <p className="mt-1 text-sm font-semibold text-(--primary)">
                                    {selectedObligations.length} selected
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-xs text-(--secondary)">
                                    Total to Pay
                                </p>

                                <p className="mt-1 text-xl font-bold text-(--primary)">
                                    {formatCurrency(totalAmount)}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleCombinedPayment}
                            disabled={
                                isProcessing ||
                                selectedObligations.length === 0
                            }
                            className="flex w-full items-center justify-center gap-2 rounded bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--primary-dark) disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isProcessing ? (
                                <>
                                    <LoaderCircle
                                        size={18}
                                        className="animate-spin"
                                    />

                                    Initializing Payment...
                                </>
                            ) : (
                                <>
                                    <CreditCard size={18} />

                                    Pay Selected Obligations
                                </>
                            )}
                        </button>

                        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-(--text-muted)">
                            <ShieldCheck size={14} />

                            Secure payment powered by Paystack
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CombinedPaymentModal;
