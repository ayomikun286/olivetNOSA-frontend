import React, { useEffect, useState } from "react";

import ContentLoading from "../../components/admin/ContentLoading.jsx";
import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";
import PaymentDetailsDrawer from "../../components/admin/PaymentDetailsDrawer.jsx";
import Alert from "../../components/common/Alert.jsx";

import {
    CreditCard,
    CheckCircle2,
    Clock3,
    XCircle,
    Wallet,
    Eye,
    Search,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    ArrowUpRight,
    Banknote
} from "lucide-react";

import {
    getAdminPayments,
    getAdminPaymentById,
} from "../../services/adminService.js";

const AdminPayments = () => {
    const [paymentsData, setPaymentsData] = useState(null);
    const [summary, setSummary] = useState(null);
    const [pagination, setPagination] = useState(null);

    const [loading, setLoading] = useState(true);
    const [paymentsLoading, setPaymentsLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [gatewayFilter, setGatewayFilter] = useState("");
    const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false);
    const [paymentDetailsLoading, setPaymentDetailsLoading] =
        useState(false);

    const [alert, setAlert] = useState(null);

    // ========================================
    // LOAD PAYMENTS
    // ========================================

    const loadPayments = async (page = 1) => {
        try {
            setPaymentsLoading(true);
            setError("");

            const result = await getAdminPayments({
                page,
                limit: 20,
                search,
                status: statusFilter,
                gateway: gatewayFilter,
                paymentMethod: paymentMethodFilter,
                startDate,
                endDate,
            });

            setPaymentsData(result?.payments || []);
            setSummary(result?.summary || null);
            setPagination(result?.pagination || null);
            setCurrentPage(result?.pagination?.page || page);
        } catch (error) {
            console.error("Admin payments error:", error);

            setError(
                error.message || "Failed to load admin payments."
            );
        } finally {
            setPaymentsLoading(false);
            setLoading(false);
            setPageLoading(false);
        }
    };

    // ========================================
    // INITIAL LOAD
    // ========================================

    useEffect(() => {
        loadPayments(1);
    }, []);

    // ========================================
    // SEARCH / FILTER
    // ========================================

    useEffect(() => {
        const timer = setTimeout(() => {
            loadPayments(1);
        }, 400);

        return () => clearTimeout(timer);
    }, [
        search,
        statusFilter,
        gatewayFilter,
        paymentMethodFilter,
        startDate,
        endDate,
    ]);

    // ========================================
    // PAYMENT DETAILS
    // ========================================

    const handleViewPayment = async (payment) => {
        try {
            setSelectedPayment(payment);
            setPaymentDrawerOpen(true);
            setPaymentDetailsLoading(true);

            const result = await getAdminPaymentById(
                payment._id
            );

            setSelectedPayment(result);
        } catch (error) {
            console.error(
                "Payment details error:",
                error
            );

            setAlert({
                type: "error",
                title: "Unable to Load Payment",
                message:
                    error.message ||
                    "Failed to load payment details.",
            });
        } finally {
            setPaymentDetailsLoading(false);
        }
    };

    // ========================================
    // FORMATTERS
    // ========================================

    const formatCurrency = (amount, currency = "NGN") => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
        }).format(Number(amount || 0));
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

    const formatPaymentMethod = (method) => {
        if (!method) return "—";

        return method
            .replace(/[_-]/g, " ")
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };

    const formatGateway = (gateway) => {
        if (!gateway) return "—";

        return gateway
            .replace(/[_-]/g, " ")
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };

    // ========================================
    // STATUS STYLES
    // ========================================

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

    // ========================================
    // TABLE COLUMNS
    // ========================================

    const paymentColumns = [
        {
            key: "member",
            label: "Member",
            render: (payment) => {
                const user = payment.user;

                return (
                    <div>
                        <p className="font-medium text-(--primary)">
                            {user?.firstName || ""}
                            {user?.middleName
                                ? ` ${user.middleName}`
                                : ""}
                            {user?.lastName
                                ? ` ${user.lastName}`
                                : ""}
                        </p>

                        <p className="text-xs text-(--text-muted) mt-0.5">
                            {user?.email || "No email"}
                        </p>
                    </div>
                );
            },
        },

        {
            key: "alumniId",
            label: "Alumni ID",
            render: (payment) => (
                <span className="font-medium text-(--primary)">
                    {payment.user?.alumniId || "—"}
                </span>
            ),
        },

        {
            key: "obligation",
            label: "Obligation",
            render: (payment) => (
                <div>
                    <p className="font-medium text-(--primary)">
                        {payment.obligationAssignment
                            ?.obligation?.name || "—"}
                    </p>

                    <p className="text-xs text-(--text-muted) mt-0.5 capitalize">
                        {payment.obligationAssignment
                            ?.obligation?.category || "—"}
                    </p>
                </div>
            ),
        },

        {
            key: "amount",
            label: "Amount",
            render: (payment) => (
                <span className="font-semibold text-(--primary)">
                    {formatCurrency(
                        payment.amount,
                        payment.currency
                    )}
                </span>
            ),
        },

        {
            key: "method",
            label: "Method",
            render: (payment) => (
                <div>
                    <p className="text-sm text-(--primary)">
                        {formatPaymentMethod(
                            payment.paymentMethod
                        )}
                    </p>

                    <p className="text-xs text-(--text-muted) mt-0.5">
                        {formatGateway(payment.gateway)}
                    </p>
                </div>
            ),
        },

        {
            key: "status",
            label: "Status",
            render: (payment) => (
                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium capitalize ${getStatusStyle(
                        payment.status
                    )}`}
                >
                    {payment.status || "Unknown"}
                </span>
            ),
        },

        {
            key: "paidAt",
            label: "Paid Date",
            render: (payment) => (
                <span className="text-sm text-(--secondary)">
                    {formatDate(payment.paidAt)}
                </span>
            ),
        },

        {
            key: "actions",
            label: "Action",
            render: (payment) => (
                <button
                    type="button"
                    onClick={() =>
                        handleViewPayment(payment)
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--primary) hover:text-(--primary-dark) transition-colors"
                >
                    <Eye size={15} />
                    View
                </button>
            ),
        },
    ];

    // ========================================
    // PAGINATION
    // ========================================

    const canGoPrevious =
        pagination && pagination.page > 1;

    const canGoNext =
        pagination &&
        pagination.page < pagination.totalPages;

    const handlePrevious = () => {
        if (!canGoPrevious || paymentsLoading) {
            return;
        }

        loadPayments(currentPage - 1);
    };

    const handleNext = () => {
        if (!canGoNext || paymentsLoading) {
            return;
        }

        loadPayments(currentPage + 1);
    };

    // ========================================
    // CLEAR FILTERS
    // ========================================

    const hasFilters =
        search ||
        statusFilter ||
        gatewayFilter ||
        paymentMethodFilter ||
        startDate ||
        endDate;

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("");
        setGatewayFilter("");
        setPaymentMethodFilter("");
        setStartDate("");
        setEndDate("");
    };

    // ========================================
    // ERROR
    // ========================================

    if (error && !paymentsData) {
        return (
            <div className="p-4">
                <div className="bg-(--bg-white) border border-(--border) rounded-xl p-8 text-center">
                    <AlertCircle
                        size={24}
                        className="mx-auto text-(--danger)"
                    />

                    <p className="text-sm text-(--secondary) mt-3">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => loadPayments(1)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--primary) mt-4 hover:text-(--primary-dark)"
                    >
                        Try again
                        <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">

            {pageLoading && <ContentLoading />}

            <div className="space-y-5">

                {/* ALERT */}
                {alert && (
                    <Alert
                        type={alert.type}
                        title={alert.title}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )}

                {/* HEADER */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold text-(--primary)">
                            Payments
                        </h1>

                        <p className="text-sm text-(--secondary) mt-1">
                            Monitor and manage OlivetNOSA payment transactions.
                        </p>
                    </div>
                </div>

                {/* OVERVIEW CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">

                   <AdminStatCard
    icon={Banknote}
    iconBg="bg-(--primary-light)"
    iconClass="text-(--primary)"
    badge="Received"
    label="Total Received"
    value={`₦${Number(summary?.totalReceived ?? 0).toLocaleString("en-NG")}`}
    description="Successfully received"
/>

<AdminStatCard
    icon={CheckCircle2}
    iconBg="bg-(--success-light)"
    iconClass="text-(--success)"
    badge="Successful"
    label="Successful"
    value={summary?.successful ?? 0}
    description="Completed payments"
/>

<AdminStatCard
    icon={Clock3}
    iconBg="bg-(--warning-light)"
    iconClass="text-(--warning)"
    badge="Pending"
    label="Pending"
    value={summary?.pending ?? 0}
    description="Awaiting completion"
/>

<AdminStatCard
    icon={XCircle}
    iconBg="bg-(--danger-light)"
    iconClass="text-(--danger)"
    badge="Failed"
    label="Failed"
    value={summary?.failed ?? 0}
    description="Unsuccessful payments"
/>

                </div>

                {/* PAYMENTS TABLE */}
                <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                    {/* TABLE HEADER */}
                    <div className="px-5 py-4 border-b border-(--border)">

                        <div className="flex flex-col gap-4">

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                <div>
                                    <h2 className="text-sm font-semibold text-(--primary)">
                                        Payment Transactions
                                    </h2>

                                    <p className="text-xs text-(--secondary) mt-1">
                                        View and monitor member payment transactions.
                                    </p>
                                </div>

                                {/* SEARCH */}
                                <div className="relative w-full lg:w-72">
                                    <Search
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                                    />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Search payments..."
                                        className="w-full h-9 pl-9 pr-3 rounded border border-(--border) bg-(--bg-white) text-sm text-(--primary) outline-none focus:border-(--primary)"
                                    />
                                </div>

                            </div>

                            {/* FILTERS */}
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">

                                <select
                                    value={statusFilter}
                                    onChange={(event) =>
                                        setStatusFilter(
                                            event.target.value
                                        )
                                    }
                                    className="h-9 px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                >
                                    <option value="">
                                        All Status
                                    </option>

                                    <option value="successful">
                                        Successful
                                    </option>

                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="failed">
                                        Failed
                                    </option>

                                    <option value="cancelled">
                                        Cancelled
                                    </option>
                                </select>

                                <select
                                    value={gatewayFilter}
                                    onChange={(event) =>
                                        setGatewayFilter(
                                            event.target.value
                                        )
                                    }
                                    className="h-9 px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                >
                                    <option value="">
                                        All Gateways
                                    </option>

                                    <option value="paystack">
                                        Paystack
                                    </option>

                                    <option value="flutterwave">
                                        Flutterwave
                                    </option>
                                </select>

                                <select
                                    value={paymentMethodFilter}
                                    onChange={(event) =>
                                        setPaymentMethodFilter(
                                            event.target.value
                                        )
                                    }
                                    className="h-9 px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                >
                                    <option value="">
                                        All Methods
                                    </option>

                                    <option value="card">
                                        Card
                                    </option>

                                    <option value="bank">
                                        Bank
                                    </option>

                                    <option value="ussd">
                                        USSD
                                    </option>

                                    <option value="bank_transfer">
                                        Bank Transfer
                                    </option>

                                    <option value="mobile_money">
                                        Mobile Money
                                    </option>
                                </select>

                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(event) =>
                                        setStartDate(
                                            event.target.value
                                        )
                                    }
                                    className="h-9 px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                />

                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(event) =>
                                        setEndDate(
                                            event.target.value
                                        )
                                    }
                                    className="h-9 px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                />

                                {hasFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="h-9 px-3 rounded border border-(--border) bg-(--bg-soft) text-xs font-medium text-(--secondary) hover:text-(--primary) transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                )}

                            </div>

                        </div>
                    </div>

                    {/* TABLE */}
                    <AdminTable
                        columns={paymentColumns}
                        data={paymentsData || []}
                        loading={paymentsLoading}
                        rowKey="_id"
                        emptyMessage="No payment transactions found."
                    />

                    {/* PAGINATION */}
                    {pagination &&
                        pagination.total > 0 && (
                            <div className="px-5 py-3 border-t border-(--border) flex items-center justify-between">

                                <p className="text-xs text-(--primary)">
                                    Page {pagination.page} of{" "}
                                    {pagination.totalPages}

                                    <span className="mx-1">
                                        •
                                    </span>

                                    {pagination.total} payments
                                </p>

                                <div className="flex items-center gap-2">

                                    <button
                                        type="button"
                                        disabled={
                                            !canGoPrevious ||
                                            paymentsLoading
                                        }
                                        onClick={
                                            handlePrevious
                                        }
                                        className="w-8 h-8 inline-flex items-center justify-center rounded border border-(--border) text-(--secondary) hover:text-(--primary) hover:bg-(--bg-soft) disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft
                                            size={16}
                                        />
                                    </button>

                                    <button
                                        type="button"
                                        disabled={
                                            !canGoNext ||
                                            paymentsLoading
                                        }
                                        onClick={handleNext}
                                        className="w-8 h-8 inline-flex items-center justify-center rounded border border-(--border) text-(--secondary) hover:text-(--primary) hover:bg-(--bg-soft) disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight
                                            size={16}
                                        />
                                    </button>

                                </div>
                            </div>
                        )}

                </div>

            </div>

            {/* PAYMENT DETAILS DRAWER */}
            <PaymentDetailsDrawer
                payment={selectedPayment}
                open={paymentDrawerOpen}
                loading={paymentDetailsLoading}
                onClose={() =>
                    setPaymentDrawerOpen(false)
                }
            />

        </div>
    );
};

export default AdminPayments;