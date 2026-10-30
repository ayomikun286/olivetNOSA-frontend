import React, { useEffect, useState } from "react";

import ContentLoading from "../../components/admin/ContentLoading.jsx";
import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";
import Alert from "../../components/common/Alert.jsx";

import {
    CheckCircle2,
    Clock3,
    XCircle,
    Eye,
    Search,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    ArrowUpRight,
    Banknote,
    Heart,
    UserRound,
} from "lucide-react";

import {
    getAdminDonations,
    getAdminDonationSummary,
    getAdminDonationById,
} from "../../services/adminService.js";

const AdminDonations = () => {
    const [donations, setDonations] = useState([]);
    const [summary, setSummary] = useState(null);
    const [pagination, setPagination] = useState(null);

    const [loading, setLoading] = useState(true);
    const [donationsLoading, setDonationsLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [gatewayFilter, setGatewayFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [selectedDonation, setSelectedDonation] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const [alert, setAlert] = useState(null);

    // ========================================
    // LOAD DONATIONS
    // ========================================

    const loadDonations = async (page = 1) => {
        try {
            setDonationsLoading(true);
            setError("");

            const [donationResult, summaryResult] = await Promise.all([
                getAdminDonations({
                    page,
                    limit: 20,
                    search,
                    status: statusFilter,
                    gateway: gatewayFilter,
                    startDate,
                    endDate,
                }),
                getAdminDonationSummary(),
            ]);

            setDonations(donationResult?.donations || []);
            setPagination(donationResult?.pagination || null);
            setSummary(summaryResult?.summary || null);

            setCurrentPage(
                donationResult?.pagination?.currentPage || page
            );
        } catch (error) {
            console.error("Admin donations error:", error);

            setError(
                error.message || "Failed to load donations."
            );
        } finally {
            setDonationsLoading(false);
            setLoading(false);
            setPageLoading(false);
        }
    };

    // ========================================
    // INITIAL LOAD
    // ========================================

    useEffect(() => {
        loadDonations(1);
    }, []);

    // ========================================
    // SEARCH / FILTER
    // ========================================

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1);
            loadDonations(1);
        }, 400);

        return () => clearTimeout(timer);
    }, [
        search,
        statusFilter,
        gatewayFilter,
        startDate,
        endDate,
    ]);

    // ========================================
    // DONATION DETAILS
    // ========================================

    const handleViewDonation = async (donation) => {
        try {
            setSelectedDonation(donation);
            setDrawerOpen(true);
            setDetailsLoading(true);

            const result = await getAdminDonationById(
                donation._id
            );

            setSelectedDonation(result?.donation || donation);
        } catch (error) {
            console.error("Donation details error:", error);

            setAlert({
                type: "error",
                title: "Unable to Load Donation",
                message:
                    error.message ||
                    "Failed to load donation details.",
            });
        } finally {
            setDetailsLoading(false);
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

    const formatDateTime = (date) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        return parsedDate.toLocaleString("en-NG", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatLabel = (value) => {
        if (!value) return "—";

        return value
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

    const donationColumns = [
        {
            key: "donor",

            label: "Donor",

            render: (donation) => (
                <div>
                    <p className="font-medium text-(--primary)">
                        {donation.isAnonymous
                            ? "Anonymous Donor"
                            : donation.donorName || "Anonymous"}
                    </p>

                    <p className="text-xs text-(--text-muted) mt-0.5">
                        {donation.isAnonymous
                            ? "Identity hidden"
                            : donation.email || "No email"}
                    </p>
                </div>
            ),
        },

        {
            key: "reference",

            label: "Reference",

            render: (donation) => (
                <span className="text-xs font-medium text-(--secondary) break-all">
                    {donation.gatewayReference || "—"}
                </span>
            ),
        },

        {
            key: "amount",

            label: "Amount",

            render: (donation) => (
                <span className="font-semibold text-(--primary)">
                    {formatCurrency(
                        donation.amount,
                        donation.currency
                    )}
                </span>
            ),
        },

        {
            key: "gateway",

            label: "Gateway",

            render: (donation) => (
                <span className="text-sm text-(--primary)">
                    {formatLabel(donation.gateway)}
                </span>
            ),
        },

        {
            key: "status",

            label: "Status",

            render: (donation) => (
                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium capitalize ${getStatusStyle(
                        donation.status
                    )}`}
                >
                    {donation.status || "Unknown"}
                </span>
            ),
        },

        {
            key: "createdAt",

            label: "Date",

            render: (donation) => (
                <span className="text-sm text-(--secondary)">
                    {formatDate(donation.createdAt)}
                </span>
            ),
        },

        {
            key: "actions",

            label: "Action",

            render: (donation) => (
                <button
                    type="button"
                    onClick={() => handleViewDonation(donation)}
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
        pagination && pagination.currentPage > 1;

    const canGoNext =
        pagination &&
        pagination.currentPage < pagination.totalPages;

    const handlePrevious = () => {
        if (!canGoPrevious || donationsLoading) return;

        loadDonations(currentPage - 1);
    };

    const handleNext = () => {
        if (!canGoNext || donationsLoading) return;

        loadDonations(currentPage + 1);
    };

    // ========================================
    // FILTERS
    // ========================================

    const hasFilters =
        search ||
        statusFilter ||
        gatewayFilter ||
        startDate ||
        endDate;

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("");
        setGatewayFilter("");
        setStartDate("");
        setEndDate("");
    };

    // ========================================
    // ERROR
    // ========================================

    if (error && !loading && donations.length === 0) {
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
                        onClick={() => loadDonations(1)}
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

                <div>
                    <h1 className="text-xl font-semibold text-(--primary)">
                        Donations
                    </h1>

                    <p className="text-sm text-(--secondary) mt-1">
                        Monitor and manage contributions made to OlivetNOSA.
                    </p>
                </div>

                {/* OVERVIEW CARDS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
                    <AdminStatCard
                        icon={Banknote}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="All Donations"
                        label="Total Donations"
                        value={summary?.totalDonations ?? 0}
                        description="Total donation records"
                    />

                    <AdminStatCard
                        icon={CheckCircle2}
                        iconBg="bg-(--success-light)"
                        iconClass="text-(--success)"
                        badge="Successful"
                        label="Successful"
                        value={summary?.successfulDonations ?? 0}
                        description="Completed donations"
                    />

                    <AdminStatCard
                        icon={Clock3}
                        iconBg="bg-(--warning-light)"
                        iconClass="text-(--warning)"
                        badge="Pending"
                        label="Pending"
                        value={summary?.pendingDonations ?? 0}
                        description="Awaiting completion"
                    />

                    <AdminStatCard
                        icon={AlertCircle}
                        iconBg="bg-(--danger-light)"
                        iconClass="text-(--danger)"
                        badge="Failed"
                        label="Failed"
                        value={summary?.failedDonations ?? 0}
                        description="Unsuccessful donations"
                    />

                    <AdminStatCard
                        icon={AlertCircle}
                        iconBg="bg-(--danger-light)"
                        iconClass="text-(--danger)"
                        badge="Failed & Cancelled"
                        label="Unsuccessful"
                        value={summary?.unsuccessfulDonations ?? 0}
                        description="Failed and cancelled donations"
                    />
                </div>

                {/* DONATION COLLECTION OVERVIEW */}

                <section className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                    <div className="px-5 py-4 border-b border-(--border)">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    Donation Overview
                                </h2>

                                <p className="text-xs text-(--secondary) mt-1">
                                    Total funds received through successful donations.
                                </p>
                            </div>

                            <div className="inline-flex items-center gap-2 self-start px-3 py-2 rounded bg-(--success-light)">
                                <CheckCircle2
                                    size={14}
                                    className="text-(--success)"
                                />

                                <span className="text-xs font-medium text-(--success)">
                                    Successful donations
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="text-xs font-medium text-(--secondary)">
                                    Total Amount Received
                                </p>

                                <p className="text-2xl font-semibold text-(--primary) mt-2">
                                    {formatCurrency(
                                        summary?.totalAmount || 0
                                    )}
                                </p>

                                <p className="text-xs text-(--text-muted) mt-1">
                                    From{" "}
                                    {Number(
                                        summary?.successfulDonations || 0
                                    ).toLocaleString("en-NG")}{" "}
                                    successful donation
                                    {summary?.successfulDonations === 1
                                        ? ""
                                        : "s"}
                                </p>
                            </div>

                            <div className="w-12 h-12 rounded-full bg-(--primary-light) flex items-center justify-center">
                                <Heart
                                    size={22}
                                    className="text-(--primary)"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* DONATION TABLE */}

                <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                    {/* TABLE HEADER */}

                    <div className="px-5 py-4 border-b border-(--border)">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div>
                                    <h2 className="text-sm font-semibold text-(--primary)">
                                        Donation Records
                                    </h2>

                                    <p className="text-xs text-(--secondary) mt-1">
                                        View and monitor donor contributions.
                                    </p>
                                </div>

                                <div className="relative w-full lg:w-72">
                                    <Search
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                                    />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        placeholder="Search donations..."
                                        className="w-full h-9 pl-9 pr-3 rounded border border-(--border) bg-(--bg-white) text-sm text-(--primary) outline-none focus:border-(--primary)"
                                    />
                                </div>
                            </div>

                            {/* FILTERS */}

                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                                <select
                                    value={statusFilter}
                                    onChange={(event) =>
                                        setStatusFilter(event.target.value)
                                    }
                                    className="h-9 px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                >
                                    <option value="">All Status</option>
                                    <option value="successful">Successful</option>
                                    <option value="pending">Pending</option>
                                    <option value="failed">Failed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>

                                <select
                                    value={gatewayFilter}
                                    onChange={(event) =>
                                        setGatewayFilter(event.target.value)
                                    }
                                    className="h-9 px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                >
                                    <option value="">All Gateways</option>
                                    <option value="paystack">Paystack</option>
                                    <option value="flutterwave">Flutterwave</option>
                                </select>

                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(event) =>
                                        setStartDate(event.target.value)
                                    }
                                    className="h-9 px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                />

                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(event) =>
                                        setEndDate(event.target.value)
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
                        columns={donationColumns}
                        data={donations}
                        loading={donationsLoading}
                        rowKey="_id"
                        emptyMessage="No donation records found."
                    />

                    {/* PAGINATION */}

                    {pagination && pagination.totalRecords > 0 && (
                        <div className="px-5 py-3 border-t border-(--border) flex items-center justify-between">
                            <p className="text-xs text-(--primary)">
                                Page {pagination.currentPage} of{" "}
                                {pagination.totalPages}

                                <span className="mx-1">•</span>

                                {pagination.totalRecords} donations
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    disabled={
                                        !canGoPrevious || donationsLoading
                                    }
                                    onClick={handlePrevious}
                                    className="w-8 h-8 inline-flex items-center justify-center rounded border border-(--border) text-(--secondary) hover:text-(--primary) hover:bg-(--bg-soft) disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                <button
                                    type="button"
                                    disabled={!canGoNext || donationsLoading}
                                    onClick={handleNext}
                                    className="w-8 h-8 inline-flex items-center justify-center rounded border border-(--border) text-(--secondary) hover:text-(--primary) hover:bg-(--bg-soft) disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* DONATION DETAILS DRAWER */}

            <DonationDetailsDrawer
                donation={selectedDonation}
                open={drawerOpen}
                loading={detailsLoading}
                onClose={() => setDrawerOpen(false)}
                formatCurrency={formatCurrency}
                formatDateTime={formatDateTime}
                getStatusStyle={getStatusStyle}
            />
        </div>
    );
};

// ============================================================
// DONATION DETAILS DRAWER
// ============================================================

const DonationDetailsDrawer = ({
    donation,
    open,
    loading,
    onClose,
    formatCurrency,
    formatDateTime,
    getStatusStyle,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <button
                type="button"
                aria-label="Close donation details"
                onClick={onClose}
                className="absolute inset-0 bg-black/40"
            />

            <div className="relative w-full max-w-xl h-full bg-(--bg-white) shadow-xl overflow-y-auto">
                <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-(--border) bg-(--bg-white)">
                    <div>
                        <h2 className="text-base font-semibold text-(--primary)">
                            Donation Details
                        </h2>

                        <p className="text-xs text-(--secondary) mt-1">
                            Donation transaction information
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 rounded border border-(--border) flex items-center justify-center text-(--secondary) hover:bg-(--bg-soft)"
                    >
                        <XCircle size={18} />
                    </button>
                </div>

                {loading ? (
                    <div className="p-8">
                        <ContentLoading />
                    </div>
                ) : !donation ? (
                    <div className="p-8 text-center text-sm text-(--secondary)">
                        Donation details unavailable.
                    </div>
                ) : (
                    <div className="p-5 space-y-5">
                        {/* AMOUNT */}

                        <div className="rounded border border-(--border) bg-(--bg-soft) p-5">
                            <p className="text-xs font-medium text-(--secondary)">
                                Donation Amount
                            </p>

                            <p className="text-2xl font-semibold text-(--primary) mt-2">
                                {formatCurrency(
                                    donation.amount,
                                    donation.currency
                                )}
                            </p>

                            <span
                                className={`inline-flex items-center px-2.5 py-1 mt-3 rounded text-xs font-medium capitalize ${getStatusStyle(
                                    donation.status
                                )}`}
                            >
                                {donation.status}
                            </span>
                        </div>

                        {/* DONOR INFORMATION */}

                        <section>
                            <h3 className="text-sm font-semibold text-(--primary) mb-3">
                                Donor Information
                            </h3>

                            <div className="border border-(--border) rounded divide-y divide-(--border)">
                                <DetailRow
                                    label="Donor Name"
                                    value={
                                        donation.isAnonymous
                                            ? "Anonymous Donor"
                                            : donation.donorName || "Anonymous"
                                    }
                                />

                                <DetailRow
                                    label="Email Address"
                                    value={
                                        donation.isAnonymous
                                            ? "Hidden"
                                            : donation.email
                                    }
                                />

                                <DetailRow
                                    label="Anonymous Donation"
                                    value={
                                        donation.isAnonymous ? "Yes" : "No"
                                    }
                                />

                                <DetailRow
                                    label="Registered Member"
                                    value={
                                        donation.user
                                            ? [
                                                donation.user.firstName,
                                                donation.user.lastName,
                                            ]
                                                .filter(Boolean)
                                                .join(" ")
                                            : "Guest donor"
                                    }
                                />
                            </div>
                        </section>

                        {/* TRANSACTION INFORMATION */}

                        <section>
                            <h3 className="text-sm font-semibold text-(--primary) mb-3">
                                Transaction Information
                            </h3>

                            <div className="border border-(--border) rounded divide-y divide-(--border)">
                                <DetailRow
                                    label="Reference"
                                    value={donation.gatewayReference}
                                />

                                <DetailRow
                                    label="Gateway"
                                    value={donation.gateway}
                                />

                                <DetailRow
                                    label="Currency"
                                    value={donation.currency}
                                />

                                <DetailRow
                                    label="Created At"
                                    value={formatDateTime(donation.createdAt)}
                                />

                                <DetailRow
                                    label="Paid At"
                                    value={
                                        donation.paidAt
                                            ? formatDateTime(donation.paidAt)
                                            : "—"
                                    }
                                />
                            </div>
                        </section>

                        {/* DONOR MESSAGE */}

                        {donation.message && (
                            <section>
                                <h3 className="text-sm font-semibold text-(--primary) mb-3">
                                    Donor Message
                                </h3>

                                <div className="border border-(--border) rounded p-4">
                                    <p className="text-sm text-(--secondary) whitespace-pre-wrap leading-relaxed">
                                        {donation.message}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* METADATA */}

                        {donation.metadata &&
                            Object.keys(donation.metadata).length > 0 && (
                                <section>
                                    <h3 className="text-sm font-semibold text-(--primary) mb-3">
                                        Transaction Metadata
                                    </h3>

                                    <div className="border border-(--border) rounded divide-y divide-(--border)">
                                        {Object.entries(
                                            donation.metadata
                                        ).map(([key, value]) => (
                                            <DetailRow
                                                key={key}
                                                label={key
                                                    .replace(/([A-Z])/g, " $1")
                                                    .replace(/[_-]/g, " ")}
                                                value={
                                                    typeof value === "object"
                                                        ? JSON.stringify(value)
                                                        : String(value ?? "—")
                                                }
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}
                    </div>
                )}
            </div>
        </div>
    );
};

// ============================================================
// DRAWER DETAIL ROW
// ============================================================

const DetailRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 px-4 py-3">
        <span className="text-xs text-(--text-muted)">
            {label}
        </span>

        <span className="text-sm font-medium text-(--primary) sm:text-right break-all">
            {value || "—"}
        </span>
    </div>
);

export default AdminDonations;