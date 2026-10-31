
import React, { useEffect, useState } from "react";

import ContentLoading from "../../components/admin/ContentLoading.jsx";
import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";
import Alert from "../../components/common/Alert.jsx";
import TreasurerMemberDrawer from "../../components/admin/TreasurerMemberDrawer.jsx";

import {
    Users,
    Banknote,
    Wallet,
    AlertCircle,
    Search,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    Eye,
} from "lucide-react";

import { getTreasurerMembers, getTreasurerMemberDetails } from "../../services/adminService.js";

const TreasurerDashboard = () => {
    const [members, setMembers] = useState([]);
    const [pagination, setPagination] = useState(null);

    const [loading, setLoading] = useState(true);
    const [membersLoading, setMembersLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [selectedMember, setSelectedMember] = useState(null);
    const [memberDetails, setMemberDetails] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState("");


    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [financialStatusFilter, setFinancialStatusFilter] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [alert, setAlert] = useState(null);

    // ========================================
    // INITIAL LOAD
    // ========================================

    useEffect(() => {
        loadMembers(1);
    }, []);

    // ========================================
    // SEARCH / FILTER
    // ========================================

    useEffect(() => {
        const timer = setTimeout(() => {
            loadMembers(1);
        }, 400);

        return () => clearTimeout(timer);
    }, [search, statusFilter, financialStatusFilter]);




    // ========================================
    // LOAD MEMBERS
    // ========================================

    const loadMembers = async (page = 1) => {
        try {
            setMembersLoading(true);
            setError("");

            const result = await getTreasurerMembers({
                page,
                limit: 20,
                search,
                status: statusFilter,
                financialStatus: financialStatusFilter,
            });

            setMembers(result?.members || []);
            setPagination(result?.pagination || null);
            setCurrentPage(result?.pagination?.page || page);
        } catch (error) {
            console.error("Treasurer members error:", error);

            setError(
                error.message || "Failed to load Treasurer members."
            );
        } finally {
            setMembersLoading(false);
            setLoading(false);
            setPageLoading(false);
        }
    };

    const refreshSelectedMember = async () => {
        if (!selectedMember?._id) return;

        const result = await getTreasurerMemberDetails(
            selectedMember._id
        );

        setMemberDetails(result);

        await loadMembers(currentPage);
    };

    const handleViewMember = async (member) => {
        try {
            setSelectedMember(member);
            setMemberDetails(null);
            setDetailsError("");
            setDetailsLoading(true);

            const result = await getTreasurerMemberDetails(member._id);

            setMemberDetails(result);
        } catch (error) {
            console.error("Member details error:", error);
            setDetailsError(
                error.message || "Unable to load member details."
            );
        } finally {
            setDetailsLoading(false);
        }
    };


    // ========================================
    // FORMATTERS
    // ========================================

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(Number(amount || 0));
    };

    const getFinancialStatusStyle = (status) => {
        const styles = {
            financial: "bg-(--success-light) text-(--success)",
            non_financial: "bg-(--danger-light) text-(--danger)",
        };

        return (
            styles[status] ||
            "bg-(--bg-soft) text-(--secondary)"
        );
    };

    const formatFinancialStatus = (status) => {
        if (!status) return "Unknown";

        return status.replace(/_/g, " ");
    };

    // ========================================
    // MEMBER TABLE COLUMNS
    // ========================================

    const memberColumns = [
        {
            key: "member",
            label: "Member",
            render: (member) => (
                <div>
                    <p className="font-medium text-(--primary)">
                        {member.firstName || ""}
                        {member.middleName ? ` ${member.middleName}` : ""}
                        {member.lastName ? ` ${member.lastName}` : ""}
                    </p>

                    <p className="text-xs text-(--text-muted) mt-0.5">
                        {member.email || "No email"}
                    </p>
                </div>
            ),
        },

        {
            key: "alumniId",
            label: "Alumni ID",
            render: (member) => (
                <span className="font-medium text-(--primary)">
                    {member.alumniId || "—"}
                </span>
            ),
        },

        {
            key: "yearSet",
            label: "Year Set",
            render: (member) => (
                <span className="text-sm text-(--secondary)">
                    {member.yearSet?.name || "—"}
                </span>
            ),
        },

        {
            key: "assignments",
            label: "Obligations",
            render: (member) => (
                <span className="text-sm text-(--primary)">
                    {member.financialSummary?.totalAssignments ?? 0}
                </span>
            ),
        },

        {
            key: "totalPaid",
            label: "Total Paid",
            render: (member) => (
                <span className="font-semibold text-(--success)">
                    {formatCurrency(member.financialSummary?.totalPaid)}
                </span>
            ),
        },

        {
            key: "outstanding",
            label: "Outstanding",
            render: (member) => (
                <span className="font-semibold text-(--primary)">
                    {formatCurrency(
                        member.financialSummary?.outstandingBalance
                    )}
                </span>
            ),
        },

        {
            key: "financialStatus",
            label: "Financial Status",
            render: (member) => (
                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium capitalize ${getFinancialStatusStyle(
                        member.financialStatus
                    )}`}
                >
                    {formatFinancialStatus(member.financialStatus)}
                </span>
            ),
        },

        {
            key: "actions",
            label: "Action",
            render: (member) => (
                <button
                    type="button"
                    onClick={() => handleViewMember(member)}
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
        if (!canGoPrevious || membersLoading) return;

        loadMembers(currentPage - 1);
    };

    const handleNext = () => {
        if (!canGoNext || membersLoading) return;

        loadMembers(currentPage + 1);
    };

    // ========================================
    // CLEAR FILTERS
    // ========================================

    const hasFilters =
        search || statusFilter || financialStatusFilter;

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("");
        setFinancialStatusFilter("");
    };

    // ========================================
    // ERROR
    // ========================================

    if (error && !members.length) {
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
                        onClick={() => loadMembers(1)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--primary) mt-4 hover:text-(--primary-dark)"
                    >
                        Try again
                        <RefreshCw size={14} />
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
                            Treasurer Dashboard
                        </h1>

                        <p className="text-sm text-(--secondary) mt-1">
                            Monitor member financial records, obligations, and payments.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => loadMembers(currentPage)}
                        disabled={membersLoading}
                        className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded border border-(--border) bg-(--bg-white) text-(--primary) text-sm font-medium hover:bg-(--bg-soft) disabled:opacity-60 transition-colors"
                    >
                        <RefreshCw
                            size={15}
                            className={membersLoading ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>
                </div>

                {/* OVERVIEW CARDS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

                    <AdminStatCard
                        icon={Users}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="Members"
                        label="Total Members"
                        value={pagination?.total ?? members.length}
                        description="Registered alumni members"
                    />

                    <AdminStatCard
                        icon={Banknote}
                        iconBg="bg-(--success-light)"
                        iconClass="text-(--success)"
                        badge="Collected"
                        label="Total Collected"
                        value={formatCurrency(
                            members.reduce(
                                (total, member) =>
                                    total +
                                    Number(member.financialSummary?.totalPaid || 0),
                                0
                            )
                        )}
                        description="Currently loaded members"
                    />

                    <AdminStatCard
                        icon={Wallet}
                        iconBg="bg-(--warning-light)"
                        iconClass="text-(--warning)"
                        badge="Outstanding"
                        label="Outstanding Balance"
                        value={formatCurrency(
                            members.reduce(
                                (total, member) =>
                                    total +
                                    Number(
                                        member.financialSummary?.outstandingBalance || 0
                                    ),
                                0
                            )
                        )}
                        description="Currently loaded members"
                    />

                    <AdminStatCard
                        icon={AlertCircle}
                        iconBg="bg-(--danger-light)"
                        iconClass="text-(--danger)"
                        badge="Non-financial"
                        label="Non-financial Members"
                        value={members.filter(
                            (member) => member.financialStatus !== "financial"
                        ).length}
                        description="Currently loaded members"
                    />

                </div>

                {/* MEMBER DIRECTORY */}

                <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                    {/* TABLE HEADER */}

                    <div className="px-5 py-4 border-b border-(--border)">
                        <div className="flex flex-col gap-4">

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div>
                                    <h2 className="text-sm font-semibold text-(--primary)">
                                        Member Financial Records
                                    </h2>

                                    <p className="text-xs text-(--secondary) mt-1">
                                        Search members and review their financial standing.
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
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search members..."
                                        className="w-full h-9 pl-9 pr-3 rounded border border-(--border) bg-(--bg-white) text-sm text-(--primary) outline-none focus:border-(--primary)"
                                    />
                                </div>
                            </div>

                            {/* FILTERS */}

                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">

                                <select
                                    value={statusFilter}
                                    onChange={(event) => setStatusFilter(event.target.value)}
                                    className="h-9 px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                >
                                    <option value="">All Member Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="suspended">Suspended</option>
                                    <option value="inactive">Inactive</option>
                                </select>

                                <select
                                    value={financialStatusFilter}
                                    onChange={(event) =>
                                        setFinancialStatusFilter(event.target.value)
                                    }
                                    className="h-9 px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                >
                                    <option value="">All Financial Statuses</option>
                                    <option value="financial">Financial</option>
                                    <option value="non_financial">Non-financial</option>
                                </select>

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
                        columns={memberColumns}
                        data={members}
                        loading={membersLoading}
                        rowKey="_id"
                        emptyMessage="No members found."
                    />

                    {/* PAGINATION */}

                    {pagination && pagination.total > 0 && (
                        <div className="px-5 py-3 border-t border-(--border) flex items-center justify-between">

                            <p className="text-xs text-(--primary)">
                                Page {pagination.page} of {pagination.totalPages}
                                <span className="mx-1">•</span>
                                {pagination.total} members
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    disabled={!canGoPrevious || membersLoading}
                                    onClick={handlePrevious}
                                    className="w-8 h-8 inline-flex items-center justify-center rounded border border-(--border) text-(--secondary) hover:text-(--primary) hover:bg-(--bg-soft) disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                <button
                                    type="button"
                                    disabled={!canGoNext || membersLoading}
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

            <TreasurerMemberDrawer
                open={!!selectedMember}
                onClose={() => {
                    setSelectedMember(null);
                    setMemberDetails(null);
                    setDetailsError("");
                }}
                memberDetails={memberDetails}
                loading={detailsLoading}
                error={detailsError}
                onPaymentRecorded={refreshSelectedMember}
            />
        </div>
    );
};

export default TreasurerDashboard;
