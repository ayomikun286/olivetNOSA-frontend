import React, { useEffect, useState } from "react";

import {
    ReceiptText,
    WalletCards,
    CircleDollarSign,
    CalendarDays,
    CheckCircle2,
    Clock3,
    AlertCircle,
    ArrowUpRight,
    Users,
    MapPin,
    X,
    CreditCard,
    Loader2,
    ShieldCheck,
} from "lucide-react";

import { getMyObligation } from "../../services/obligationService.js";
import ContentLoading from "../../components/admin/ContentLoading.jsx";

const Obligations = () => {
    const [obligations, setObligations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [paymentModal, setPaymentModal] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState("");

    // ========================================
    // FETCH OBLIGATIONS
    // ========================================

    useEffect(() => {
        const fetchObligations = async () => {
            try {
                const data = await getMyObligation();

                const individual = (data?.assignments || []).filter(
                    (item) =>
                        item.obligation?.category === "individual"
                );

                setObligations(individual);
            } catch (error) {
                console.error(
                    "Failed to fetch obligations:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchObligations();
    }, []);

    // ========================================
    // HELPERS
    // ========================================

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

    const getCategoryLabel = (category) => {
        switch (category) {
            case "individual":
                return "Individual";

            case "yearSet":
                return "Year Set";

            case "chapter":
                return "Chapter";

            default:
                return "Membership";
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case "yearSet":
                return Users;

            case "chapter":
                return MapPin;

            default:
                return ReceiptText;
        }
    };

    // ========================================
    // OBLIGATION GROUPS
    // ========================================

    /*
     * IMPORTANT:
     *
     * isOptional === true
     * -------------------
     * Optional contribution such as Insurance.
     *
     * isActive === true
     * ------------------
     * Current/live obligation.
     *
     * isActive === false
     * -------------------
     * Historical obligation only.
     */

    const activeMandatoryObligations = obligations.filter(
        (item) =>
            item.obligation?.isActive === true &&
            item.obligation?.isOptional !== true
    );

    const activeOptionalObligations = obligations.filter(
        (item) =>
            item.obligation?.isActive === true &&
            item.obligation?.isOptional === true
    );

    const inactiveObligations = obligations.filter(
        (item) =>
            item.obligation?.isActive === false
    );

    // ========================================
    // MANDATORY FINANCIAL CALCULATIONS
    // ========================================

    /*
     * ONLY mandatory active obligations
     * are included here.
     *
     * Insurance / optional contributions
     * are intentionally excluded.
     */

    const totalDue = activeMandatoryObligations.reduce(
        (total, item) =>
            total + Number(item.amountDue || 0),
        0
    );

    const totalPaid = activeMandatoryObligations.reduce(
        (total, item) =>
            total + Number(item.amountPaid || 0),
        0
    );

    const outstanding = Math.max(
        totalDue - totalPaid,
        0
    );

    // ========================================
    // MANDATORY UNPAID
    // ========================================

    const unpaidMandatoryObligations =
        activeMandatoryObligations.filter((item) => {
            const due = Number(item.amountDue || 0);
            const paid = Number(item.amountPaid || 0);

            return due > paid;
        });

    // ========================================
    // NEXT MANDATORY DUE DATE
    // ========================================

    const nextDueDate = unpaidMandatoryObligations
        .filter((item) => item.dueDate)
        .sort(
            (a, b) =>
                new Date(a.dueDate) -
                new Date(b.dueDate)
        )[0]?.dueDate;

    // ========================================
    // OPTIONAL TOTAL
    // ========================================

    const optionalTotal = activeOptionalObligations.reduce(
        (total, item) =>
            total + Number(item.amountDue || 0),
        0
    );

    const optionalPaid = activeOptionalObligations.reduce(
        (total, item) =>
            total + Number(item.amountPaid || 0),
        0
    );

    const optionalOutstanding = Math.max(
        optionalTotal - optionalPaid,
        0
    );

    // ========================================
    // STATUS
    // ========================================

    const getStatus = (item) => {
        const isInactive =
            item.obligation?.isActive === false;

        const isOptional =
            item.obligation?.isOptional === true;

        // ----------------------------------------
        // INACTIVE
        // ----------------------------------------

        if (isInactive) {
            return {
                label: "Inactive",
                icon: Clock3,
                className:
                    "text-slate-500 bg-slate-100",
            };
        }

        const due = Number(item.amountDue || 0);
        const paid = Number(item.amountPaid || 0);

        const remaining = Math.max(
            due - paid,
            0
        );

        // ----------------------------------------
        // PAID
        // ----------------------------------------

        if (remaining === 0) {
            return {
                label: "Paid",
                icon: CheckCircle2,
                className:
                    "text-(--success) bg-(--success-light)",
            };
        }

        // ----------------------------------------
        // PARTIAL
        // ----------------------------------------

        if (paid > 0) {
            return {
                label: isOptional
                    ? "Partially Paid"
                    : "Partial",
                icon: Clock3,
                className:
                    isOptional
                        ? "text-amber-700 bg-amber-100"
                        : "text-(--warning) bg-(--warning-light)",
            };
        }

        // ----------------------------------------
        // PENDING
        // ----------------------------------------

        return {
            label: isOptional
                ? "Available"
                : "Pending",
            icon: AlertCircle,
            className:
                isOptional
                    ? "text-amber-700 bg-amber-100"
                    : "text-(--warning) bg-(--warning-light)",
        };
    };

    // ========================================
    // PAYMENT
    // ========================================

    const handlePayNow = (obligation) => {
        /*
         * Extra frontend protection.
         * Backend must also enforce this.
         */

        if (
            obligation.obligation?.isActive !== true
        ) {
            return;
        }

        const amountDue = Number(
            obligation.amountDue || 0
        );

        const amountPaid = Number(
            obligation.amountPaid || 0
        );

        const currentOutstanding = Math.max(
            amountDue - amountPaid,
            0
        );

        if (currentOutstanding <= 0) {
            return;
        }

        setPaymentModal({
            ...obligation,
            outstanding: currentOutstanding,
        });

        setPaymentAmount(
            currentOutstanding.toString()
        );

        setPaymentError("");
    };

    // ========================================
    // INITIALIZE PAYMENT
    // ========================================

    const handleInitializePayment = async () => {
        if (!paymentModal) return;

        // ----------------------------------------
        // ACTIVE PROTECTION
        // ----------------------------------------

        if (
            paymentModal.obligation?.isActive !== true
        ) {
            setPaymentError(
                "This obligation is inactive and cannot receive payments."
            );

            return;
        }

        const amount = Number(paymentAmount);

        // ----------------------------------------
        // VALIDATE AMOUNT
        // ----------------------------------------

        if (
            !Number.isInteger(amount) ||
            amount <= 0
        ) {
            setPaymentError(
                "Please enter a valid whole-naira payment amount."
            );

            return;
        }

        // ----------------------------------------
        // PREVENT OVERPAYMENT
        // ----------------------------------------

        if (
            amount > paymentModal.outstanding
        ) {
            setPaymentError(
                `Amount cannot exceed the outstanding balance of ${formatCurrency(
                    paymentModal.outstanding
                )}.`
            );

            return;
        }

        setPaymentLoading(true);
        setPaymentError("");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/payments/initialize`,
                {
                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        obligationAssignmentId:
                            paymentModal._id,
                        amount,
                    }),
                }
            );

            const data = await response.json();

            if (
                !response.ok ||
                !data.success
            ) {
                throw new Error(
                    data.message ||
                        "Failed to initialize payment."
                );
            }

            // Redirect to Paystack
            window.location.href =
                data.authorizationUrl;
        } catch (error) {
            console.error(
                "Payment initialization error:",
                error
            );

            setPaymentError(
                error.message ||
                    "Unable to initialize payment."
            );

            setPaymentLoading(false);
        }
    };

    // ========================================
    // LOADING
    // ========================================

    if (loading) {
        return <ContentLoading />;
    }

    // ========================================
    // REUSABLE OBLIGATION CARD
    // ========================================

    const renderObligationCard = (
        item,
        { historical = false } = {}
    ) => {
        const isActive =
            item.obligation?.isActive === true;

        const isInactive =
            item.obligation?.isActive === false;

        const isOptional =
            item.obligation?.isOptional === true;

        const due = Number(
            item.amountDue || 0
        );

        const paid = Number(
            item.amountPaid || 0
        );

        const remaining = Math.max(
            due - paid,
            0
        );

        const progress = due
            ? Math.min(
                  (paid / due) * 100,
                  100
              )
            : 0;

        const status = getStatus(item);

        const StatusIcon = status.icon;

        const CategoryIcon =
            getCategoryIcon(
                item.obligation?.category
            );

        return (
            <div
                key={item._id}
                className={`
                    p-5 sm:p-6
                    transition
                    ${
                        isOptional &&
                        isActive &&
                        !historical
                            ? "bg-amber-50/60 border-l-4 border-amber-400"
                            : ""
                    }
                    ${
                        isInactive
                            ? "bg-slate-50/60"
                            : ""
                    }
                `}
            >
                {/* TOP */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* INFO */}
                    <div className="flex items-start gap-3.5 min-w-0">
                        <div
                            className={`
                                w-10 h-10 shrink-0 rounded-lg
                                flex items-center justify-center
                                ${
                                    isOptional &&
                                    isActive
                                        ? "bg-amber-100 text-amber-700"
                                        : isInactive
                                        ? "bg-slate-100 text-slate-500"
                                        : "bg-(--primary-light) text-(--primary)"
                                }
                            `}
                        >
                            {isOptional &&
                            isActive ? (
                                <ShieldCheck
                                    size={18}
                                />
                            ) : (
                                <CategoryIcon
                                    size={18}
                                />
                            )}
                        </div>

                        <div className="min-w-0">
                            {/* NAME + BADGES */}

                            <div className="flex flex-wrap items-center gap-2">
                                <h3
                                    className={`
                                        text-sm font-semibold
                                        ${
                                            isOptional &&
                                            isActive
                                                ? "text-amber-800"
                                                : isInactive
                                                ? "text-slate-600"
                                                : "text-(--primary)"
                                        }
                                    `}
                                >
                                    {item.obligation
                                        ?.name ||
                                        "Membership obligation"}
                                </h3>

                                {/* CATEGORY */}

                                <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-(--bg-light) text-(--secondary)">
                                    {getCategoryLabel(
                                        item.obligation
                                            ?.category
                                    )}
                                </span>

                                {/* OPTIONAL */}

                                {isOptional &&
                                    isActive && (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                                            <ShieldCheck
                                                size={11}
                                            />
                                            Optional
                                        </span>
                                    )}

                                {/* REQUIRED */}

                                {!isOptional &&
                                    isActive && (
                                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                            Required
                                        </span>
                                    )}

                                {/* INACTIVE */}

                                {isInactive && (
                                    <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                                        Inactive
                                    </span>
                                )}
                            </div>



                            {/* DESCRIPTION */}

                            <p className="text-xs text-(--secondary) mt-1 leading-relaxed max-w-2xl">
                                {item.obligation
                                    ?.description ||
                                    "Assigned membership contribution"}
                            </p>

                            {/* OPTIONAL EXPLANATION */}

                            {isOptional &&
                                isActive && (
                                    <div className="mt-2.5 inline-flex items-start gap-2 text-xs font-medium text-amber-700 bg-amber-100/70 border border-amber-200 rounded-lg px-3 py-2">
                                        <ShieldCheck
                                            size={14}
                                            className="mt-0.5 shrink-0"
                                        />

                                        <span>
                                            Optional contribution.
                                            This does not affect
                                            your mandatory
                                            outstanding balance.
                                        </span>
                                    </div>
                                )}

                            {/* DATE */}

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-(--text-muted)">
                                <span className="flex items-center gap-1">
                                    <CalendarDays
                                        size={13}
                                    />

                                    Due{" "}
                                    {formatDate(
                                        item.dueDate
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* STATUS + AMOUNT */}

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                        <div className="sm:text-right">
                            <p className="text-[11px] text-(--text-muted)">
                                Amount due
                            </p>

                            <p
                                className={`
                                    text-sm font-semibold mt-0.5
                                    ${
                                        isOptional &&
                                        isActive
                                            ? "text-amber-700"
                                            : isInactive
                                            ? "text-slate-600"
                                            : "text-(--primary)"
                                    }
                                `}
                            >
                                {formatCurrency(
                                    due
                                )}
                            </p>
                        </div>

                        <span
                            className={`
                                inline-flex items-center gap-1.5
                                text-xs font-medium
                                px-2.5 py-1.5 rounded-full
                                ${status.className}
                            `}
                        >
                            <StatusIcon
                                size={13}
                            />

                            {status.label}
                        </span>
                    </div>
                </div>

                {/* PAYMENT PROGRESS */}

                <div className="mt-5 pt-4 border-t border-(--border)">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* PROGRESS */}

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-(--secondary)">
                                    {paid > 0
                                        ? `${formatCurrency(
                                              paid
                                          )} paid`
                                        : "No payment recorded"}
                                </span>

                                <span className="text-xs font-semibold text-(--primary)">
                                    {Math.round(
                                        progress
                                    )}
                                    %
                                </span>
                            </div>

                            <div className="h-1.5 bg-(--bg-light) rounded-full overflow-hidden">
                                <div
                                    className={`
                                        h-full rounded-full transition-all
                                        ${
                                            isOptional &&
                                            isActive
                                                ? "bg-amber-400"
                                                : "bg-(--success)"
                                        }
                                    `}
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* BALANCE */}

                        <div className="sm:w-32 shrink-0">
                            <p className="text-[11px] text-(--text-muted)">
                                {isInactive
                                    ? "Historical balance"
                                    : isOptional
                                    ? "Optional balance"
                                    : "Outstanding"}
                            </p>

                            <p
                                className={`
                                    text-sm font-semibold mt-0.5
                                    ${
                                        remaining > 0
                                            ? isInactive
                                                ? "text-slate-500"
                                                : isOptional
                                                ? "text-amber-700"
                                                : "text-(--primary)"
                                            : "text-(--success)"
                                    }
                                `}
                            >
                                {formatCurrency(
                                    remaining
                                )}
                            </p>
                        </div>

                        {/* PAY */}

                        {isActive &&
                            remaining > 0 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePayNow(
                                            item
                                        )
                                    }
                                    className={`
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-1.5
                                        text-white
                                        px-4 py-2
                                        rounded-(--radius-sm)
                                        text-xs
                                        font-semibold
                                        transition
                                        shrink-0
                                        ${
                                            isOptional
                                                ? "bg-amber-600 hover:bg-amber-700"
                                                : "bg-(--primary) hover:bg-(--primary-dark)"
                                        }
                                    `}
                                >
                                    Pay now

                                    <ArrowUpRight
                                        size={14}
                                    />
                                </button>
                            )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4">
            <div className="space-y-5">
                {/* ========================================
                    PAGE HEADER
                ======================================== */}

                <div>
                    <h1 className="text-xl font-semibold text-(--primary)">
                        My Obligations
                    </h1>

                    <p className="text-sm text-(--secondary) mt-1">
                        View your assigned membership
                        contributions and payment status.
                    </p>
                </div>

                {/* ========================================
                    SUMMARY
                ======================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {/* TOTAL MANDATORY DUE */}

                    <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <ReceiptText
                                    size={20}
                                />
                            </div>

                            <span className="text-xs text-(--text-muted)">
                                Required
                            </span>
                        </div>

                        <p className="text-sm text-(--secondary) mt-5">
                            Mandatory contributions
                        </p>

                        <h2 className="text-2xl font-bold text-(--primary) mt-1">
                            {formatCurrency(
                                totalDue
                            )}
                        </h2>

                        <p className="text-xs text-(--text-muted) mt-2">
                            Across{" "}
                            {
                                activeMandatoryObligations.length
                            }{" "}
                            required obligation
                            {activeMandatoryObligations.length !==
                            1
                                ? "s"
                                : ""}
                        </p>
                    </div>

                    {/* MANDATORY PAID */}

                    <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-(--success-light) text-(--success) flex items-center justify-center">
                                <CheckCircle2
                                    size={20}
                                />
                            </div>

                            <span className="text-xs text-(--text-muted)">
                                Paid
                            </span>
                        </div>

                        <p className="text-sm text-(--secondary) mt-5">
                            Mandatory amount paid
                        </p>

                        <h2 className="text-2xl font-bold text-(--primary) mt-1">
                            {formatCurrency(
                                totalPaid
                            )}
                        </h2>

                        <p className="text-xs text-(--text-muted) mt-2">
                            Optional contributions are
                            excluded
                        </p>
                    </div>

                    {/* OUTSTANDING */}

                    <div className="bg-(--primary) text-white rounded p-5">
                        <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                <WalletCards
                                    size={20}
                                />
                            </div>

                            {outstanding > 0 && (
                                <span className="text-xs font-medium text-(--secondary)">
                                    Action needed
                                </span>
                            )}
                        </div>

                        <p className="text-sm text-white/75 mt-5">
                            Mandatory outstanding
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-1">
                            {formatCurrency(
                                outstanding
                            )}
                        </h2>

                        <p className="text-xs text-white/60 mt-2">
                            Optional insurance is not
                            included
                        </p>
                    </div>
                </div>

                {/* ========================================
                    REQUIRED CONTRIBUTIONS
                ======================================== */}

                <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                    {/* HEADER */}

                    <div className="p-5 border-b border-(--border) flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="font-semibold text-(--primary)">
                                    Required Contributions
                                </h2>

                                <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                    Mandatory
                                </span>
                            </div>

                            <p className="text-sm text-(--secondary) mt-1">
                                These contributions make up
                                your mandatory membership
                                obligations.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-(--secondary)">
                            <CircleDollarSign
                                size={16}
                            />

                            {
                                activeMandatoryObligations.length
                            }{" "}
                            obligation
                            {activeMandatoryObligations.length !==
                            1
                                ? "s"
                                : ""}
                        </div>
                    </div>

                    {/* CONTENT */}

                    {activeMandatoryObligations.length ===
                    0 ? (
                        <div className="p-10 text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <CheckCircle2
                                    size={22}
                                />
                            </div>

                            <h3 className="font-semibold text-(--primary) mt-4">
                                No mandatory obligations
                            </h3>

                            <p className="text-sm text-(--secondary) mt-1">
                                You currently have no
                                active mandatory
                                contributions.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y max-h-[500px] overflow-y-auto scrollbar-hide divide-(--border)">
                            {activeMandatoryObligations.map(
                                (item) =>
                                    renderObligationCard(
                                        item
                                    )
                            )}
                        </div>
                    )}
                </div>

                {/* ========================================
                    OPTIONAL CONTRIBUTIONS
                ======================================== */}

                {activeOptionalObligations.length >
                    0 && (
                    <div className="bg-amber-50/50 border border-amber-200 rounded overflow-hidden">
                        {/* OPTIONAL HEADER */}

                        <div className="p-5 border-b border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                                        <ShieldCheck
                                            size={18}
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="font-semibold text-amber-900">
                                                Optional Contributions
                                            </h2>

                                            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                                                Optional
                                            </span>
                                        </div>

                                        <p className="text-sm text-amber-800/70 mt-1">
                                            These contributions
                                            are available to
                                            you but are not
                                            part of your
                                            mandatory dues.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-left sm:text-right">
                                <p className="text-[11px] text-amber-700">
                                    Optional balance
                                </p>

                                <p className="text-lg font-bold text-amber-800">
                                    {formatCurrency(
                                        optionalOutstanding
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* OPTIONAL ITEMS */}

                        <div className="divide-y divide-amber-200">
                            {activeOptionalObligations.map(
                                (item) =>
                                    renderObligationCard(
                                        item
                                    )
                            )}
                        </div>
                    </div>
                )}

                {/* ========================================
                    INACTIVE / HISTORY
                ======================================== */}

                {inactiveObligations.length > 0 && (
                    <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                        <div className="p-5 border-b border-(--border)">
                            <div className="flex items-center gap-2">
                                <h2 className="font-semibold text-(--primary)">
                                    Contribution History
                                </h2>

                                <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                                    Inactive
                                </span>
                            </div>

                            <p className="text-sm text-(--secondary) mt-1">
                                Previous obligations are kept
                                here for your records. Inactive
                                obligations cannot receive new
                                payments.
                            </p>
                        </div>

                        <div className="divide-y max-h-[450px] overflow-y-auto scrollbar-hide divide-(--border)">
                            {inactiveObligations.map(
                                (item) =>
                                    renderObligationCard(
                                        item,
                                        {
                                            historical: true,
                                        }
                                    )
                            )}
                        </div>
                    </div>
                )}

                {/* ========================================
                    NEXT DUE
                ======================================== */}

                <div className="bg-(--bg-white) border border-(--border) rounded p-5">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-(--secondary-light) text-(--secondary) flex items-center justify-center shrink-0">
                            <CalendarDays
                                size={20}
                            />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-(--primary)">
                                Next mandatory due date
                            </p>

                            <p className="text-lg font-bold text-(--primary) mt-1">
                                {nextDueDate
                                    ? formatDate(
                                          nextDueDate
                                      )
                                    : "All settled"}
                            </p>

                            <p className="text-xs text-(--text-muted) mt-1">
                                {unpaidMandatoryObligations.length >
                                0
                                    ? `${unpaidMandatoryObligations.length} mandatory obligation${
                                          unpaidMandatoryObligations.length !==
                                          1
                                              ? "s"
                                              : ""
                                      } outstanding`
                                    : "You're all caught up on mandatory contributions."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================
                PAYMENT MODAL
            ======================================== */}

            {paymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md bg-white rounded shadow-xl overflow-hidden">
                        {/* HEADER */}

                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-bold text-(--primary-dark)">
                                        Make Payment
                                    </h3>

                                    {paymentModal
                                        .obligation
                                        ?.isOptional ===
                                        true && (
                                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                                            Optional
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-slate-500 mt-1">
                                    {paymentModal
                                        .obligation
                                        ?.name ||
                                        "Obligation Payment"}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    if (
                                        !paymentLoading
                                    ) {
                                        setPaymentModal(
                                            null
                                        );
                                        setPaymentError(
                                            ""
                                        );
                                    }
                                }}
                                className="p-2 rounded-full hover:bg-slate-100 transition disabled:opacity-50"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* BODY */}

                        <div className="p-6 space-y-5">
                            {/* OPTIONAL NOTICE */}

                            {paymentModal.obligation
                                ?.isOptional ===
                                true && (
                                <div className="flex items-start gap-2 rounded-(--radius-sm) bg-amber-50 border border-amber-200 p-4">
                                    <ShieldCheck
                                        size={17}
                                        className="text-amber-600 mt-0.5 shrink-0"
                                    />

                                    <p className="text-xs text-amber-800">
                                        This is an optional
                                        contribution. Payment
                                        here will not reduce
                                        your mandatory
                                        outstanding balance.
                                    </p>
                                </div>
                            )}

                            {/* OUTSTANDING */}

                            <div
                                className={`
                                    rounded-(--radius-sm)
                                    p-4
                                    ${
                                        paymentModal
                                            .obligation
                                            ?.isOptional ===
                                        true
                                            ? "bg-amber-50"
                                            : "bg-(--primary-light)"
                                    }
                                `}
                            >
                                <p className="text-xs text-slate-500">
                                    Outstanding Balance
                                </p>

                                <p
                                    className={`
                                        text-2xl font-bold mt-1
                                        ${
                                            paymentModal
                                                .obligation
                                                ?.isOptional ===
                                            true
                                                ? "text-amber-700"
                                                : "text-(--primary-dark)"
                                        }
                                    `}
                                >
                                    {formatCurrency(
                                        paymentModal.outstanding
                                    )}
                                </p>
                            </div>

                            {/* AMOUNT */}

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Amount to Pay
                                </label>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                                        ₦
                                    </span>

                                    <input
                                        type="number"
                                        min="1"
                                        max={
                                            paymentModal.outstanding
                                        }
                                        step="1"
                                        value={
                                            paymentAmount
                                        }
                                        onChange={(e) => {
                                            setPaymentAmount(
                                                e.target
                                                    .value
                                            );
                                            setPaymentError(
                                                ""
                                            );
                                        }}
                                        disabled={
                                            paymentLoading
                                        }
                                        className="w-full border border-slate-300 rounded-(--radius-sm) pl-9 pr-4 py-3 text-sm outline-none focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                                        placeholder="Enter amount"
                                    />
                                </div>

                                <p className="text-xs text-slate-500 mt-2">
                                    You can pay any amount up
                                    to your outstanding
                                    balance.
                                </p>
                            </div>

                            {/* ERROR */}

                            {paymentError && (
                                <div className="rounded-(--radius-sm) bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                                    {paymentError}
                                </div>
                            )}

                            {/* BUTTON */}

                            <button
                                type="button"
                                onClick={
                                    handleInitializePayment
                                }
                                disabled={paymentLoading}
                                className={`
                                    w-full
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    text-white
                                    py-3
                                    rounded
                                    text-sm
                                    font-semibold
                                    transition
                                    disabled:opacity-60
                                    disabled:cursor-not-allowed
                                    ${
                                        paymentModal
                                            .obligation
                                            ?.isOptional ===
                                        true
                                            ? "bg-amber-600 hover:bg-amber-700"
                                            : "bg-(--primary) hover:bg-(--primary-dark)"
                                    }
                                `}
                            >
                                {paymentLoading ? (
                                    <>
                                        <Loader2
                                            size={17}
                                            className="animate-spin"
                                        />

                                        Preparing payment...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard
                                            size={17}
                                        />

                                        Continue to Payment
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Obligations;