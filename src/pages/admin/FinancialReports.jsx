import React, { useEffect, useMemo, useState } from "react";

import {
    FileText,
    Wallet,
    CircleDollarSign,
    AlertTriangle,
    TrendingUp,
    Search,
    Eye,
    ChevronLeft,
    ChevronRight,
    X,
    Plus,
    RefreshCw,
    Send,
    RotateCcw,
    Loader2,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";
import Alert from "../../components/common/Alert.jsx";

import {
  exportAdminFinancialReportToExcel,
  exportAdminFinancialReportToPDF,
} from "../../utils/financialReportExport.js";

import {
    getFinancialReports,
    getFinancialReportById,
    createFinancialReport,
    updateFinancialReport,
    publishFinancialReport,
    unpublishFinancialReport,
} from "../../services/adminService.js";

const FinancialReports = () => {
    // ========================================
    // DATA
    // ========================================

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ========================================
    // FILTERS
    // ========================================

    const currentYear = new Date().getFullYear();

    const [yearFilter, setYearFilter] = useState(
        String(currentYear)
    );

    const [statusFilter, setStatusFilter] = useState("");

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    // ========================================
    // MODALS
    // ========================================

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const [selectedReport, setSelectedReport] = useState(null);

    const [detailLoading, setDetailLoading] = useState(false);

    // ========================================
    // CREATE FORM
    // ========================================

    const [reportMonth, setReportMonth] = useState(
        new Date().getMonth() + 1
    );

    const [reportYear, setReportYear] = useState(currentYear);

    const [createSaving, setCreateSaving] = useState(false);

    // ========================================
    // ACTION STATE
    // ========================================

    const [actionLoading, setActionLoading] = useState(false);

    const [actionType, setActionType] = useState("");

    // ========================================
    // ALERT
    // ========================================

    const [alert, setAlert] = useState(null);

    const showAlert = (type, message) => {
        setAlert({
            type,
            message,
        });
    };

    // ========================================
    // LOAD REPORTS
    // ========================================

    const loadReports = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getFinancialReports({
                year: yearFilter,
                status: statusFilter,
            });

            setReports(response?.data || []);
        } catch (error) {
            console.error(
                "Failed to load financial reports:",
                error
            );

            setError(
                error.message ||
                "Failed to load financial reports."
            );

            setReports([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReports();
    }, [yearFilter, statusFilter]);

    // ========================================
    // FILTER
    // ========================================

    const filteredReports = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        return reports.filter((report) => {
            if (!normalizedSearch) {
                return true;
            }

            const title =
                report.title?.toLowerCase() || "";

            const month = String(report.month || "");

            const year = String(report.year || "");

            return (
                title.includes(normalizedSearch) ||
                month.includes(normalizedSearch) ||
                year.includes(normalizedSearch)
            );
        });
    }, [reports, search]);

    // ========================================
    // PAGINATION
    // ========================================

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredReports.length / itemsPerPage
        )
    );

    const paginatedReports = filteredReports.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const canGoPrevious = currentPage > 1;

    const canGoNext = currentPage < totalPages;

    const handlePrevious = () => {
        if (!canGoPrevious) return;

        setCurrentPage((page) => page - 1);
    };

    const handleNext = () => {
        if (!canGoNext) return;

        setCurrentPage((page) => page + 1);
    };

    // ========================================
    // STATISTICS
    // ========================================

    const stats = useMemo(() => {
        const latestReport = [...reports].sort(
            (a, b) => b.year - a.year || b.month - a.month
        )[0] ?? null;

        const summary = latestReport?.summary || {};

        const published = reports.filter(
            (report) =>
                report.status === "published"
        ).length;

        const drafts = reports.filter(
            (report) =>
                report.status === "draft"
        ).length;

        return {
            expected: Number(
                summary.totalExpected || 0
            ),

            collected: Number(
                summary.totalCollected || 0
            ),

            outstanding: Number(
                summary.totalOutstanding || 0
            ),

            overdue: Number(
                summary.totalOverdue || 0
            ),

            collectionRate: Number(
                summary.collectionRate || 0
            ),

            published,
            drafts,
        };
    }, [reports]);

    // ========================================
    // EXPORT EXCEL
    // ========================================

    const handleExportExcel = async () => {
        if (!selectedReport) return;

        try {
            await exportFinancialReportToExcel(
                selectedReport
            );

            showAlert(
                "success",
                "Financial report exported to Excel successfully."
            );
        } catch (error) {
            console.error(
                "Excel export failed:",
                error
            );

            showAlert(
                "error",
                "Failed to export financial report to Excel."
            );
        }
    };

    // ========================================
    // EXPORT PDF
    // ========================================

    const handleExportPDF = async () => {
        if (!selectedReport) return;

        try {
            await exportFinancialReportToPDF(
                selectedReport
            );

            showAlert(
                "success",
                "Financial report exported to PDF successfully."
            );
        } catch (error) {
            console.error(
                "PDF export failed:",
                error
            );

            showAlert(
                "error",
                "Failed to export financial report to PDF."
            );
        }
    };

    // ========================================
    // VIEW REPORT
    // ========================================

    const openViewModal = async (report) => {
        if (!report?._id) return;

        setViewModalOpen(true);
        setDetailLoading(true);
        setSelectedReport(report);

        try {
            const response =
                await getFinancialReportById(
                    report._id
                );

            if (response?.data) {
                setSelectedReport(
                    response.data
                );
            }
        } catch (error) {
            console.error(
                "Load financial report details error:",
                error
            );

            showAlert(
                "error",
                error.message ||
                "Unable to load financial report."
            );
        } finally {
            setDetailLoading(false);
        }
    };

    const closeViewModal = () => {
        if (actionLoading) return;

        setViewModalOpen(false);
        setSelectedReport(null);
    };

    // ========================================
    // CREATE REPORT
    // ========================================

    const openCreateModal = () => {
        setReportMonth(
            new Date().getMonth() + 1
        );

        setReportYear(
            new Date().getFullYear()
        );

        setCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        if (createSaving) return;

        setCreateModalOpen(false);
    };

    const handleCreateReport = async (event) => {
        event.preventDefault();

        if (!reportMonth) {
            showAlert(
                "error",
                "Please select a report month."
            );
            return;
        }

        if (!reportYear) {
            showAlert(
                "error",
                "Please enter a report year."
            );
            return;
        }

        try {
            setCreateSaving(true);

            const response =
                await createFinancialReport(
                    Number(reportMonth),
                    Number(reportYear)
                );

            showAlert(
                "success",
                response?.message ||
                "Financial report created successfully."
            );

            setCreateModalOpen(false);

            setYearFilter(
                String(reportYear)
            );

            await loadReports();
        } catch (error) {
            console.error(
                "Create financial report error:",
                error
            );

            showAlert(
                "error",
                error.message ||
                "Failed to create financial report."
            );
        } finally {
            setCreateSaving(false);
        }
    };

    // ========================================
    // REGENERATE DRAFT
    // ========================================

    const handleRegenerate = async (report) => {
        if (!report?._id) return;

        if (report.status !== "draft") {
            showAlert(
                "error",
                "Published reports cannot be modified."
            );
            return;
        }

        const confirmed = window.confirm(
            `Regenerate the ${report.title} snapshot using the latest financial data?`
        );

        if (!confirmed) return;

        try {
            setActionLoading(true);
            setActionType("regenerate");

            const response =
                await updateFinancialReport(
                    report._id
                );

            showAlert(
                "success",
                response?.message ||
                "Financial report updated successfully."
            );

            if (
                selectedReport?._id ===
                report._id
            ) {
                setSelectedReport(
                    response?.data ||
                    selectedReport
                );
            }

            await loadReports();
        } catch (error) {
            console.error(
                "Regenerate financial report error:",
                error
            );

            showAlert(
                "error",
                error.message ||
                "Failed to regenerate financial report."
            );
        } finally {
            setActionLoading(false);
            setActionType("");
        }
    };

    // ========================================
    // PUBLISH
    // ========================================

    const handlePublish = async (report) => {
        if (!report?._id) return;

        const confirmed = window.confirm(
            `Publish ${report.title}? Once published, the financial snapshot cannot be modified until it is unpublished.`
        );

        if (!confirmed) return;

        try {
            setActionLoading(true);
            setActionType("publish");

            const response =
                await publishFinancialReport(
                    report._id
                );

            showAlert(
                "success",
                response?.message ||
                "Financial report published successfully."
            );

            if (
                selectedReport?._id ===
                report._id
            ) {
                setSelectedReport(
                    response?.data ||
                    selectedReport
                );
            }

            await loadReports();
        } catch (error) {
            console.error(
                "Publish financial report error:",
                error
            );

            showAlert(
                "error",
                error.message ||
                "Failed to publish financial report."
            );
        } finally {
            setActionLoading(false);
            setActionType("");
        }
    };

    // ========================================
    // UNPUBLISH
    // ========================================

    const handleUnpublish = async (report) => {
        if (!report?._id) return;

        const confirmed = window.confirm(
            `Unpublish ${report.title}? This will return the report to draft status.`
        );

        if (!confirmed) return;

        try {
            setActionLoading(true);
            setActionType("unpublish");

            const response =
                await unpublishFinancialReport(
                    report._id
                );

            showAlert(
                "success",
                response?.message ||
                "Financial report unpublished successfully."
            );

            if (
                selectedReport?._id ===
                report._id
            ) {
                setSelectedReport(
                    response?.data ||
                    selectedReport
                );
            }

            await loadReports();
        } catch (error) {
            console.error(
                "Unpublish financial report error:",
                error
            );

            showAlert(
                "error",
                error.message ||
                "Failed to unpublish financial report."
            );
        } finally {
            setActionLoading(false);
            setActionType("");
        }
    };

    // ========================================
    // HELPERS
    // ========================================

    const formatCurrency = (amount) => {
        return `₦${Number(
            amount || 0
        ).toLocaleString()}`;
    };

    const formatMonth = (month) => {
        return new Date(
            2000,
            Number(month) - 1,
            1
        ).toLocaleString("en-US", {
            month: "long",
        });
    };

    // ========================================
    // TABLE COLUMNS
    // ========================================

    const reportColumns = [
        {
            key: "report",
            label: "Report",

            render: (report) => (
                <div>
                    <p className="text-xs font-semibold text-(--primary)">
                        {report.title}
                    </p>

                    <p className="text-[10px] text-(--text-muted) mt-0.5">
                        {formatMonth(
                            report.month
                        )}{" "}
                        {report.year}
                    </p>
                </div>
            ),
        },

        {
            key: "expected",
            label: "Expected",

            render: (report) => (
                <span className="text-xs font-medium text-(--primary)">
                    {formatCurrency(
                        report.summary
                            ?.totalExpected
                    )}
                </span>
            ),
        },

        {
            key: "collected",
            label: "Collected",

            render: (report) => (
                <span className="text-xs font-medium text-(--success)">
                    {formatCurrency(
                        report.summary
                            ?.totalCollected
                    )}
                </span>
            ),
        },

        {
            key: "outstanding",
            label: "Outstanding",

            render: (report) => (
                <span className="text-xs font-medium text-(--warning)">
                    {formatCurrency(
                        report.summary
                            ?.totalOutstanding
                    )}
                </span>
            ),
        },

        {
            key: "collectionRate",
            label: "Collection",

            render: (report) => (
                <span className="text-xs font-semibold text-(--primary)">
                    {Number(
                        report.summary
                            ?.collectionRate ||
                        0
                    ).toFixed(2)}
                    %
                </span>
            ),
        },

        {
            key: "status",
            label: "Status",

            render: (report) => (
                <span
                    className={`
                        inline-flex
                        items-center
                        px-2.5
                        py-1
                        rounded
                        text-xs
                        font-medium
                        ${report.status ===
                            "published"
                            ? "bg-(--success-light) text-(--success)"
                            : "bg-(--warning-light) text-(--warning)"
                        }
                    `}
                >
                    {report.status ===
                        "published"
                        ? "Published"
                        : "Draft"}
                </span>
            ),
        },

        {
            key: "actions",
            label: "Action",

            render: (report) => (
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="
                            inline-flex
                            items-center
                            gap-1.5
                            text-xs
                            font-semibold
                            text-(--primary)
                            hover:text-(--primary-dark)
                            transition-colors
                        "
                        onClick={() =>
                            openViewModal(
                                report
                            )
                        }
                    >
                        <Eye size={15} />
                        View
                    </button>

                    {report.status ===
                        "draft" && (
                            <>
                                <button
                                    type="button"
                                    className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    text-xs
                                    font-semibold
                                    text-(--secondary)
                                    hover:text-(--primary)
                                    transition-colors
                                "
                                    onClick={() =>
                                        handleRegenerate(
                                            report
                                        )
                                    }
                                    disabled={
                                        actionLoading
                                    }
                                >
                                    <RefreshCw
                                        size={14}
                                    />
                                    Regenerate
                                </button>

                                <button
                                    type="button"
                                    className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    text-xs
                                    font-semibold
                                    text-(--success)
                                    hover:underline
                                    transition-colors
                                "
                                    onClick={() =>
                                        handlePublish(
                                            report
                                        )
                                    }
                                    disabled={
                                        actionLoading
                                    }
                                >
                                    <Send
                                        size={14}
                                    />
                                    Publish
                                </button>
                            </>
                        )}

                    {report.status ===
                        "published" && (
                            <button
                                type="button"
                                className="
                                inline-flex
                                items-center
                                gap-1.5
                                text-xs
                                font-semibold
                                text-(--warning)
                                hover:underline
                                transition-colors
                            "
                                onClick={() =>
                                    handleUnpublish(
                                        report
                                    )
                                }
                                disabled={
                                    actionLoading
                                }
                            >
                                <RotateCcw
                                    size={14}
                                />
                                Unpublish
                            </button>
                        )}
                </div>
            ),
        },
    ];

    // ========================================
    // RETURN
    // ========================================

    return (
        <div className="p-4">
            <div className="space-y-5">

                {/* ALERT */}

                {alert && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() =>
                            setAlert(null)
                        }
                    />
                )}

                {/* HEADER */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-xl font-semibold text-(--primary)">
                            Financial Reports
                        </h1>

                        <p className="text-sm text-(--secondary) mt-1">
                            Create, review and publish
                            monthly financial reports.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={
                            openCreateModal
                        }
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            h-9
                            px-4
                            rounded
                            bg-(--primary)
                            text-white
                            text-xs
                            font-semibold
                            hover:bg-(--primary-dark)
                            transition-colors
                        "
                    >
                        <Plus size={15} />
                        Create Report
                    </button>
                </div>

                {/* OVERVIEW CARDS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">

                    <AdminStatCard
                        icon={CircleDollarSign}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="Expected"
                        label="Total Expected"
                        value={formatCurrency(
                            stats.expected
                        )}
                        description="Latest report expected amount"
                    />

                    <AdminStatCard
                        icon={Wallet}
                        iconBg="bg-(--success-light)"
                        iconClass="text-(--success)"
                        badge="Collected"
                        label="Total Collected"
                        value={formatCurrency(
                            stats.collected
                        )}
                        description="Collected against obligations"
                    />

                    <AdminStatCard
                        icon={TrendingUp}
                        iconBg="bg-(--warning-light)"
                        iconClass="text-(--warning)"
                        badge="Outstanding"
                        label="Outstanding"
                        value={formatCurrency(
                            stats.outstanding
                        )}
                        description="Remaining mandatory obligations"
                    />

                    <AdminStatCard
                        icon={AlertTriangle}
                        iconBg="bg-(--danger-light)"
                        iconClass="text-(--danger)"
                        badge="Overdue"
                        label="Total Overdue"
                        value={formatCurrency(
                            stats.overdue
                        )}
                        description="Mandatory overdue amount"
                    />

                    <AdminStatCard
                        icon={FileText}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="Reports"
                        label="Published Reports"
                        value={stats.published}
                        description={`${stats.drafts} draft report${stats.drafts === 1
                                ? ""
                                : "s"
                            }`}
                    />

                </div>

                {/* ERROR */}

                {error && (
                    <div
                        className="
                            bg-(--danger-light)
                            border
                            border-(--danger)
                            rounded
                            px-4
                            py-3
                            flex
                            items-center
                            justify-between
                            gap-3
                        "
                    >
                        <p className="text-xs text-(--danger)">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={
                                loadReports
                            }
                            className="
                                text-xs
                                font-semibold
                                text-(--danger)
                                hover:underline
                            "
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* REPORT TABLE */}

                <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                    {/* TABLE HEADER */}

                    <div className="px-5 py-4 border-b border-(--border)">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    Monthly Financial Reports
                                </h2>

                                <p className="text-xs text-(--secondary) mt-1">
                                    Review historical reports
                                    and manage draft reports.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">

                                {/* SEARCH */}

                                <div className="relative">
                                    <Search
                                        size={15}
                                        className="
                                            absolute
                                            left-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-(--text-muted)
                                        "
                                    />

                                    <input
                                        type="text"
                                        placeholder="Search reports..."
                                        value={
                                            search
                                        }
                                        onChange={(
                                            e
                                        ) => {
                                            setSearch(
                                                e
                                                    .target
                                                    .value
                                            );
                                            setCurrentPage(
                                                1
                                            );
                                        }}
                                        className="
                                            h-9
                                            w-full
                                            sm:w-[210px]
                                            pl-9
                                            pr-3
                                            rounded
                                            border
                                            border-(--border)
                                            bg-(--bg-white)
                                            text-xs
                                            text-(--primary)
                                            outline-none
                                            focus:border-(--primary)
                                        "
                                    />
                                </div>

                                {/* YEAR */}

                                <select
                                    value={
                                        yearFilter
                                    }
                                    onChange={(
                                        e
                                    ) => {
                                        setYearFilter(
                                            e
                                                .target
                                                .value
                                        );
                                        setCurrentPage(
                                            1
                                        );
                                    }}
                                    className="
                                        h-9
                                        px-3
                                        rounded
                                        border
                                        border-(--border)
                                        bg-(--bg-white)
                                        text-xs
                                        text-(--primary)
                                        outline-none
                                    "
                                >
                                    <option value="">
                                        All Years
                                    </option>

                                    {Array.from(
                                        {
                                            length: 7,
                                        },
                                        (
                                            _,
                                            index
                                        ) => {
                                            const year =
                                                currentYear -
                                                index;

                                            return (
                                                <option
                                                    key={
                                                        year
                                                    }
                                                    value={
                                                        year
                                                    }
                                                >
                                                    {
                                                        year
                                                    }
                                                </option>
                                            );
                                        }
                                    )}
                                </select>

                                {/* STATUS */}

                                <select
                                    value={
                                        statusFilter
                                    }
                                    onChange={(
                                        e
                                    ) => {
                                        setStatusFilter(
                                            e
                                                .target
                                                .value
                                        );
                                        setCurrentPage(
                                            1
                                        );
                                    }}
                                    className="
                                        h-9
                                        px-3
                                        rounded
                                        border
                                        border-(--border)
                                        bg-(--bg-white)
                                        text-xs
                                        text-(--primary)
                                        outline-none
                                    "
                                >
                                    <option value="">
                                        All Status
                                    </option>

                                    <option value="draft">
                                        Draft
                                    </option>

                                    <option value="published">
                                        Published
                                    </option>
                                </select>

                            </div>
                        </div>
                    </div>

                    {/* TABLE */}

                    <AdminTable
                        columns={reportColumns}
                        data={paginatedReports}
                        loading={loading}
                        rowKey="_id"
                        emptyMessage={
                            error
                                ? "Unable to load financial reports."
                                : "No financial reports found."
                        }
                    />

                    {/* PAGINATION */}

                    {filteredReports.length > 0 && (
                        <div
                            className="
                                px-5
                                py-3
                                border-t
                                border-(--border)
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <p className="text-xs text-(--primary)">
                                Page{" "}
                                <span className="font-medium">
                                    {currentPage}
                                </span>{" "}
                                of{" "}
                                <span className="font-medium">
                                    {totalPages}
                                </span>

                                <span className="mx-1">
                                    •
                                </span>

                                {filteredReports.length}{" "}
                                reports
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    onClick={
                                        handlePrevious
                                    }
                                    disabled={
                                        !canGoPrevious
                                    }
                                    className="
                                        w-8
                                        h-8
                                        rounded
                                        border
                                        border-(--border)
                                        flex
                                        items-center
                                        justify-center
                                        text-(--primary)
                                        hover:bg-(--bg-soft)
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        transition-colors
                                    "
                                >
                                    <ChevronLeft
                                        size={16}
                                    />
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleNext
                                    }
                                    disabled={
                                        !canGoNext
                                    }
                                    className="
                                        w-8
                                        h-8
                                        rounded
                                        border
                                        border-(--border)
                                        flex
                                        items-center
                                        justify-center
                                        text-(--primary)
                                        hover:bg-(--bg-soft)
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        transition-colors
                                    "
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

            {/* CREATE MODAL */}

            {createModalOpen && (
                <CreateFinancialReportModal
                    month={reportMonth}
                    year={reportYear}
                    saving={createSaving}
                    onMonthChange={
                        setReportMonth
                    }
                    onYearChange={
                        setReportYear
                    }
                    onSubmit={
                        handleCreateReport
                    }
                    onClose={
                        closeCreateModal
                    }
                />
            )}

            {/* VIEW MODAL */}

            {viewModalOpen &&
                selectedReport && (
                    <FinancialReportViewModal
                        report={selectedReport}
                        loading={detailLoading}
                        actionLoading={
                            actionLoading
                        }
                        actionType={
                            actionType
                        }
                        onClose={
                            closeViewModal
                        }
                        onRegenerate={() =>
                            handleRegenerate(
                                selectedReport
                            )
                        }
                        onPublish={() =>
                            handlePublish(
                                selectedReport
                            )
                        }
                        onUnpublish={() =>
                            handleUnpublish(
                                selectedReport
                            )
                        }
                        onExportExcel={
                            handleExportExcel
                        }
                        onExportPDF={
                            handleExportPDF
                        }
                    />
                )}
        </div>
    );
};

export default FinancialReports;


/*
|--------------------------------------------------------------------------
| CREATE FINANCIAL REPORT MODAL
|--------------------------------------------------------------------------
*/

const CreateFinancialReportModal = ({
    month,
    year,
    saving,
    onMonthChange,
    onYearChange,
    onSubmit,
    onClose,
}) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                p-4
                bg-black/40
            "
        >
            <div
                className="
                    w-full
                    max-w-md
                    bg-(--bg-white)
                    rounded
                    border
                    border-(--border)
                    shadow-xl
                "
            >

                {/* HEADER */}

                <div
                    className="
                        px-5
                        py-4
                        border-b
                        border-(--border)
                        flex
                        items-start
                        justify-between
                        gap-4
                    "
                >
                    <div>
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Create Financial Report
                        </h2>

                        <p className="text-xs text-(--secondary) mt-1">
                            Generate a monthly financial
                            snapshot.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="
                            text-(--text-muted)
                            hover:text-(--primary)
                            disabled:opacity-40
                        "
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* FORM */}

                <form
                    onSubmit={onSubmit}
                    className="p-5 space-y-4"
                >

                    <div>
                        <label className="block text-xs font-medium text-(--primary) mb-1.5">
                            Report Month
                        </label>

                        <select
                            value={month}
                            onChange={(e) =>
                                onMonthChange(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                            disabled={saving}
                            className="
                                w-full
                                h-10
                                px-3
                                rounded
                                border
                                border-(--border)
                                bg-(--bg-white)
                                text-xs
                                text-(--primary)
                                outline-none
                                focus:border-(--primary)
                            "
                        >
                            {months.map(
                                (
                                    name,
                                    index
                                ) => (
                                    <option
                                        key={name}
                                        value={
                                            index +
                                            1
                                        }
                                    >
                                        {name}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-(--primary) mb-1.5">
                            Report Year
                        </label>

                        <input
                            type="number"
                            min="1900"
                            max="9999"
                            value={year}
                            onChange={(e) =>
                                onYearChange(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                            disabled={saving}
                            className="
                                w-full
                                h-10
                                px-3
                                rounded
                                border
                                border-(--border)
                                bg-(--bg-white)
                                text-xs
                                text-(--primary)
                                outline-none
                                focus:border-(--primary)
                            "
                        />
                    </div>

                    <div
                        className="
                            rounded
                            border
                            border-(--border)
                            bg-(--bg-light)
                            px-3
                            py-3
                        "
                    >
                        <p className="text-xs font-medium text-(--primary)">
                            What happens?
                        </p>

                        <p className="text-[11px] text-(--secondary) mt-1 leading-5">
                            The system will calculate the
                            selected month's financial data
                            and create it as a draft report.
                            You can review it before publishing.
                        </p>
                    </div>

                    {/* ACTIONS */}

                    <div className="flex items-center justify-end gap-2 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="
                                h-9
                                px-4
                                rounded
                                border
                                border-(--border)
                                text-xs
                                font-semibold
                                text-(--secondary)
                                hover:bg-(--bg-soft)
                                disabled:opacity-40
                            "
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="
                                h-9
                                px-4
                                rounded
                                bg-(--primary)
                                text-white
                                text-xs
                                font-semibold
                                inline-flex
                                items-center
                                gap-2
                                hover:bg-(--primary-dark)
                                disabled:opacity-60
                            "
                        >
                            {saving ? (
                                <>
                                    <Loader2
                                        size={14}
                                        className="animate-spin"
                                    />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus size={14} />
                                    Create Report
                                </>
                            )}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};


/*
|--------------------------------------------------------------------------
| FINANCIAL REPORT VIEW MODAL
|--------------------------------------------------------------------------
*/

const FinancialReportViewModal = ({
    report,
    loading,
    actionLoading,
    actionType,
    onClose,
    onRegenerate,
    onPublish,
    onUnpublish,
    onExportExcel,
    onExportPDF,
}) => {
    const formatCurrency = (amount) => {
        return `₦${Number(
            amount || 0
        ).toLocaleString()}`;
    };

    const formatMonth = (month) => {
        return new Date(
            2000,
            Number(month) - 1,
            1
        ).toLocaleString("en-US", {
            month: "long",
        });
    };

    const getCategoryName = (category) => {
        if (category === "yearSet") {
            return "Year Set";
        }

        if (category === "chapter") {
            return "Chapter";
        }

        return "Individual";
    };

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                p-4
                bg-black/40
            "
        >
            <div
                className="
                    w-full
                    max-w-5xl
                    max-h-[92vh]
                    overflow-y-auto
                    bg-(--bg-white)
                    rounded
                    border
                    border-(--border)
                    shadow-xl
                "
            >

                {/* HEADER */}

                <div
                    className="
                        sticky
                        top-0
                        z-10
                        px-5
                        py-4
                        bg-(--bg-white)
                        border-b
                        border-(--border)
                        flex
                        items-start
                        justify-between
                        gap-4
                    "
                >
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">

                            <h2 className="text-sm font-semibold text-(--primary)">
                                {report.title}
                            </h2>

                            <span
                                className={`
                                    inline-flex
                                    items-center
                                    px-2.5
                                    py-1
                                    rounded
                                    text-[10px]
                                    font-medium
                                    ${report.status ===
                                        "published"
                                        ? "bg-(--success-light) text-(--success)"
                                        : "bg-(--warning-light) text-(--warning)"
                                    }
                                `}
                            >
                                {report.status ===
                                    "published"
                                    ? "Published"
                                    : "Draft"}
                            </span>

                        </div>

                        <p className="text-xs text-(--secondary) mt-1">
                            {formatMonth(
                                report.month
                            )}{" "}
                            {report.year}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={actionLoading}
                        className="
                            text-(--text-muted)
                            hover:text-(--primary)
                            disabled:opacity-40
                        "
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* BODY */}

                <div className="p-5 space-y-5">

                    {loading ? (
                        <div className="py-16 flex items-center justify-center">
                            <Loader2
                                size={24}
                                className="
                                    animate-spin
                                    text-(--primary)
                                "
                            />
                        </div>
                    ) : (
                        <>

                            {/* SUMMARY */}

                            <div>
                                <h3 className="text-sm font-semibold text-(--primary)">
                                    Financial Summary
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 mt-3">

                                    <ReportMetric
                                        label="Expected"
                                        value={formatCurrency(
                                            report.summary
                                                ?.totalExpected
                                        )}
                                    />

                                    <ReportMetric
                                        label="Collected"
                                        value={formatCurrency(
                                            report.summary
                                                ?.totalCollected
                                        )}
                                        valueClass="text-(--success)"
                                    />

                                    <ReportMetric
                                        label="Outstanding"
                                        value={formatCurrency(
                                            report.summary
                                                ?.totalOutstanding
                                        )}
                                        valueClass="text-(--warning)"
                                    />

                                    <ReportMetric
                                        label="Overdue"
                                        value={formatCurrency(
                                            report.summary
                                                ?.totalOverdue
                                        )}
                                        valueClass="text-(--danger)"
                                    />

                                    <ReportMetric
                                        label="Collection Rate"
                                        value={`${Number(
                                            report.summary
                                                ?.collectionRate ||
                                            0
                                        ).toFixed(2)}%`}
                                    />

                                </div>
                            </div>

                            {/* CASH ACTIVITY */}

                            <div>
                                <h3 className="text-sm font-semibold text-(--primary)">
                                    Payment Activity
                                </h3>

                                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mt-3">

                                    <ReportMetric
                                        label="Transactions"
                                        value={
                                            report
                                                .paymentSummary
                                                ?.totalPayments ||
                                            0
                                        }
                                    />

                                    <ReportMetric
                                        label="Successful"
                                        value={
                                            report
                                                .paymentSummary
                                                ?.successfulPayments ||
                                            0
                                        }
                                        valueClass="text-(--success)"
                                    />

                                    <ReportMetric
                                        label="Pending"
                                        value={
                                            report
                                                .paymentSummary
                                                ?.pendingPayments ||
                                            0
                                        }
                                        valueClass="text-(--warning)"
                                    />

                                    <ReportMetric
                                        label="Failed"
                                        value={
                                            report
                                                .paymentSummary
                                                ?.failedPayments ||
                                            0
                                        }
                                        valueClass="text-(--danger)"
                                    />

                                    <ReportMetric
                                        label="Refunded"
                                        value={
                                            report
                                                .paymentSummary
                                                ?.refundedPayments ||
                                            0
                                        }
                                    />

                                    <ReportMetric
                                        label="Cash This Month"
                                        value={formatCurrency(
                                            report
                                                .paymentSummary
                                                ?.totalCollectedThisMonth
                                        )}
                                        valueClass="text-(--success)"
                                    />

                                </div>
                            </div>

                            {/* CATEGORY BREAKDOWN */}

                            <div>
                                <h3 className="text-sm font-semibold text-(--primary)">
                                    Category Breakdown
                                </h3>

                                <div className="mt-3 border border-(--border) rounded overflow-hidden">

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">

                                            <thead>
                                                <tr className="border-b border-(--border) bg-(--bg-light)">
                                                    <th className="px-4 py-3 text-[11px] font-semibold text-(--secondary)">
                                                        Category
                                                    </th>

                                                    <th className="px-4 py-3 text-[11px] font-semibold text-(--secondary)">
                                                        Type
                                                    </th>

                                                    <th className="px-4 py-3 text-[11px] font-semibold text-(--secondary)">
                                                        Expected
                                                    </th>

                                                    <th className="px-4 py-3 text-[11px] font-semibold text-(--secondary)">
                                                        Collected
                                                    </th>

                                                    <th className="px-4 py-3 text-[11px] font-semibold text-(--secondary)">
                                                        Outstanding
                                                    </th>

                                                    <th className="px-4 py-3 text-[11px] font-semibold text-(--secondary)">
                                                        Overdue
                                                    </th>

                                                    <th className="px-4 py-3 text-[11px] font-semibold text-(--secondary)">
                                                        Rate
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {(
                                                    report.categoryBreakdown ||
                                                    []
                                                ).map(
                                                    (
                                                        item
                                                    ) => {
                                                        const categoryName =
                                                            getCategoryName(
                                                                item.category
                                                            );

                                                        const mandatory =
                                                            item.mandatory ||
                                                            {};

                                                        const optional =
                                                            item.optional ||
                                                            {};

                                                        const inactive = item.inactive || {};

                                                        return (
                                                            <React.Fragment
                                                                key={
                                                                    item.category
                                                                }
                                                            >

                                                                {/* MANDATORY */}

                                                                <tr className="border-b border-(--border)">
                                                                    <td
                                                                        rowSpan="2"
                                                                        className="
                                                                            px-4
                                                                            py-3
                                                                            text-xs
                                                                            font-semibold
                                                                            text-(--primary)
                                                                            align-top
                                                                        "
                                                                    >
                                                                        {
                                                                            categoryName
                                                                        }
                                                                    </td>

                                                                    <td className="px-4 py-3">
                                                                        <span
                                                                            className="
                                                                                inline-flex
                                                                                items-center
                                                                                px-2
                                                                                py-1
                                                                                rounded
                                                                                text-[10px]
                                                                                font-semibold
                                                                                bg-(--primary-light)
                                                                                text-(--primary)
                                                                            "
                                                                        >
                                                                            Mandatory
                                                                        </span>
                                                                    </td>

                                                                    <td className="px-4 py-3 text-xs text-(--secondary)">
                                                                        {formatCurrency(
                                                                            mandatory.expected
                                                                        )}
                                                                    </td>

                                                                    <td className="px-4 py-3 text-xs text-(--success)">
                                                                        {formatCurrency(
                                                                            mandatory.collected
                                                                        )}
                                                                    </td>

                                                                    <td className="px-4 py-3 text-xs text-(--warning)">
                                                                        {formatCurrency(
                                                                            mandatory.outstanding
                                                                        )}
                                                                    </td>

                                                                    <td className="px-4 py-3 text-xs text-(--danger)">
                                                                        {formatCurrency(
                                                                            mandatory.overdue
                                                                        )}
                                                                    </td>

                                                                    <td className="px-4 py-3 text-xs font-medium text-(--primary)">
                                                                        {Number(
                                                                            mandatory.collectionRate ||
                                                                            0
                                                                        ).toFixed(
                                                                            2
                                                                        )}
                                                                        %
                                                                    </td>
                                                                </tr>

                                                                {/* OPTIONAL */}

                                                                <tr className="border-b border-(--border) last:border-b-0 bg-(--bg-light)/40">

                                                                    <td className="px-4 py-3">
                                                                        <span
                                                                            className="
                                                                                inline-flex
                                                                                items-center
                                                                                px-2
                                                                                py-1
                                                                                rounded
                                                                                text-[10px]
                                                                                font-semibold
                                                                                border
                                                                                border-(--border)
                                                                                text-(--secondary)
                                                                            "
                                                                        >
                                                                            Optional
                                                                        </span>
                                                                    </td>

                                                                    <td className="px-4 py-3 text-xs text-(--secondary)">
                                                                        {formatCurrency(
                                                                            optional.expected
                                                                        )}
                                                                    </td>

                                                                    <td className="px-4 py-3 text-xs text-(--success)">
                                                                        {formatCurrency(
                                                                            optional.collected
                                                                        )}
                                                                    </td>

                                                                    <td className="px-4 py-3 text-xs text-(--warning)">
                                                                        {formatCurrency(
                                                                            optional.outstanding
                                                                        )}
                                                                    </td>

                                                                    <td className="px-4 py-3 text-xs text-(--danger)">
                                                                        {formatCurrency(
                                                                            optional.overdue
                                                                        )}
                                                                    </td>

                                                                    <td className="px-4 py-3 text-xs font-medium text-(--secondary)">
                                                                        {Number(
                                                                            optional.collectionRate ||
                                                                            0
                                                                        ).toFixed(
                                                                            2
                                                                        )}
                                                                        %
                                                                    </td>

                                                                </tr>

                                                                {/* INACTIVE */}
                                                                <tr className="border-b border-(--border)">
                                                                    <td className="px-4 py-3">
                                                                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-semibold bg-(--danger-light) text-(--danger)">
                                                                            Inactive
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-4 py-3 text-xs text-(--secondary)">
                                                                        {formatCurrency(inactive.expected)}
                                                                    </td>
                                                                    <td className="px-4 py-3 text-xs text-(--success)">
                                                                        {formatCurrency(inactive.cashReceived)}
                                                                    </td>
                                                                    <td className="px-4 py-3 text-xs text-(--warning)">—</td>
                                                                    <td className="px-4 py-3 text-xs text-(--danger)">—</td>
                                                                    <td className="px-4 py-3 text-xs font-medium text-(--secondary)">—</td>
                                                                </tr>

                                                            </React.Fragment>
                                                        );
                                                    }
                                                )}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* OBLIGATION BREAKDOWN */}

                            <div>
                                <h3 className="text-sm font-semibold text-(--primary)">
                                    Obligation Breakdown
                                </h3>

                                <div className="mt-3 space-y-2">

                                    {(
                                        report.obligationBreakdown ||
                                        []
                                    ).length > 0 ? (
                                        report.obligationBreakdown.map(
                                            (
                                                item
                                            ) => (
                                                <div
                                                    key={
                                                        item._id ||
                                                        item.obligation
                                                    }
                                                    className="
                                                        rounded
                                                        border
                                                        border-(--border)
                                                        bg-(--bg-light)
                                                        px-4
                                                        py-3
                                                    "
                                                >
                                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                                                        <div>
                                                            <div className="flex items-center gap-2 flex-wrap">

                                                                <p className="text-xs font-semibold text-(--primary)">
                                                                    {
                                                                        item.name
                                                                    }
                                                                </p>

                                                                {item.isOptional && (
                                                                    <span className="
                                                                        inline-flex
                                                                        items-center
                                                                        px-2
                                                                        py-0.5
                                                                        rounded
                                                                        text-[10px]
                                                                        font-medium
                                                                        bg-(--primary-light)
                                                                        text-(--primary)
                                                                    ">
                                                                        Optional
                                                                    </span>
                                                                )}

                                                                {!item.isActive && (
                                                                    <span className="
                                                                        inline-flex
                                                                        items-center
                                                                        px-2
                                                                        py-0.5
                                                                        rounded
                                                                        text-[10px]
                                                                        font-medium
                                                                        bg-(--danger-light)
                                                                        text-(--danger)
                                                                    ">
                                                                        Inactive
                                                                    </span>
                                                                )}

                                                            </div>

                                                            <p className="text-[10px] text-(--text-muted) mt-0.5">
                                                                {getCategoryName(
                                                                    item.category
                                                                )}
                                                            </p>
                                                        </div>

                                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">

                                                            <SmallMetric
                                                                label="Expected"
                                                                value={formatCurrency(
                                                                    item.expected
                                                                )}
                                                            />

                                                            <SmallMetric
                                                                label="Collected"
                                                                value={formatCurrency(
                                                                    item.collected
                                                                )}
                                                                valueClass="text-(--success)"
                                                            />

                                                            <SmallMetric
                                                                label="Outstanding"
                                                                value={formatCurrency(
                                                                    item.outstanding
                                                                )}
                                                                valueClass="text-(--warning)"
                                                            />

                                                            <SmallMetric
                                                                label="Overdue"
                                                                value={formatCurrency(
                                                                    item.overdue
                                                                )}
                                                                valueClass="text-(--danger)"
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div className="
                                            rounded
                                            border
                                            border-dashed
                                            border-(--border)
                                            bg-(--bg-light)
                                            px-4
                                            py-6
                                            text-center
                                        ">
                                            <p className="text-xs text-(--text-muted)">
                                                No obligation data available.
                                            </p>
                                        </div>
                                    )}

                                </div>
                            </div>

                            {/* REPORT META */}

                            <div className="
                                rounded
                                border
                                border-(--border)
                                bg-(--bg-light)
                                px-4
                                py-3
                            ">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                    <div>
                                        <p className="text-[10px] text-(--text-muted)">
                                            Created
                                        </p>

                                        <p className="text-xs font-medium text-(--primary) mt-0.5">
                                            {report.createdAt
                                                ? new Date(
                                                    report.createdAt
                                                ).toLocaleString()
                                                : "—"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] text-(--text-muted)">
                                            Published
                                        </p>

                                        <p className="text-xs font-medium text-(--primary) mt-0.5">
                                            {report.publishedAt
                                                ? new Date(
                                                    report.publishedAt
                                                ).toLocaleString()
                                                : "Not published"}
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </>
                    )}

                </div>

                {/* FOOTER */}

                <div
                    className="
                        px-5
                        py-4
                        border-t
                        border-(--border)
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        gap-3
                    "
                >

                    {/* EXPORT ACTIONS */}

                    <div className="flex items-center gap-2">

                        <button
                            type="button"
                            onClick={
                                onExportExcel
                            }
                            disabled={
                                loading ||
                                actionLoading
                            }
                            className="
                                h-9
                                px-4
                                rounded
                                border
                                border-(--border)
                                text-xs
                                font-semibold
                                text-(--success)
                                inline-flex
                                items-center
                                gap-2
                                hover:bg-(--success-light)
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            <FileText size={14} />
                            Export Excel
                        </button>

                        <button
                            type="button"
                            onClick={
                                onExportPDF
                            }
                            disabled={
                                loading ||
                                actionLoading
                            }
                            className="
                                h-9
                                px-4
                                rounded
                                border
                                border-(--border)
                                text-xs
                                font-semibold
                                text-(--primary)
                                inline-flex
                                items-center
                                gap-2
                                hover:bg-(--bg-soft)
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            <FileText size={14} />
                            Export PDF
                        </button>

                    </div>

                    {/* REPORT ACTIONS */}

                    <div className="flex flex-wrap items-center gap-2">

                        {report.status ===
                            "draft" && (
                                <>
                                    <button
                                        type="button"
                                        onClick={
                                            onRegenerate
                                        }
                                        disabled={
                                            actionLoading
                                        }
                                        className="
                                        h-9
                                        px-4
                                        rounded
                                        border
                                        border-(--border)
                                        text-xs
                                        font-semibold
                                        text-(--secondary)
                                        inline-flex
                                        items-center
                                        gap-2
                                        hover:bg-(--bg-soft)
                                        disabled:opacity-50
                                    "
                                    >
                                        {actionLoading &&
                                            actionType ===
                                            "regenerate" ? (
                                            <Loader2
                                                size={14}
                                                className="animate-spin"
                                            />
                                        ) : (
                                            <RefreshCw
                                                size={14}
                                            />
                                        )}

                                        Regenerate
                                    </button>

                                    <button
                                        type="button"
                                        onClick={
                                            onPublish
                                        }
                                        disabled={
                                            actionLoading
                                        }
                                        className="
                                        h-9
                                        px-4
                                        rounded
                                        bg-(--primary)
                                        text-white
                                        text-xs
                                        font-semibold
                                        inline-flex
                                        items-center
                                        gap-2
                                        hover:bg-(--primary-dark)
                                        disabled:opacity-50
                                    "
                                    >
                                        {actionLoading &&
                                            actionType ===
                                            "publish" ? (
                                            <Loader2
                                                size={14}
                                                className="animate-spin"
                                            />
                                        ) : (
                                            <Send
                                                size={14}
                                            />
                                        )}

                                        Publish Report
                                    </button>
                                </>
                            )}

                        {report.status ===
                            "published" && (
                                <button
                                    type="button"
                                    onClick={
                                        onUnpublish
                                    }
                                    disabled={
                                        actionLoading
                                    }
                                    className="
                                    h-9
                                    px-4
                                    rounded
                                    border
                                    border-(--border)
                                    text-xs
                                    font-semibold
                                    text-(--warning)
                                    inline-flex
                                    items-center
                                    gap-2
                                    hover:bg-(--warning-light)
                                    disabled:opacity-50
                                "
                                >
                                    {actionLoading &&
                                        actionType ===
                                        "unpublish" ? (
                                        <Loader2
                                            size={14}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <RotateCcw
                                            size={14}
                                        />
                                    )}

                                    Unpublish
                                </button>
                            )}

                        <button
                            type="button"
                            onClick={
                                onClose
                            }
                            disabled={
                                actionLoading
                            }
                            className="
                                h-9
                                px-4
                                rounded
                                border
                                border-(--border)
                                text-xs
                                font-semibold
                                text-(--secondary)
                                hover:bg-(--bg-soft)
                                disabled:opacity-50
                            "
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
};


/*
|--------------------------------------------------------------------------
| SMALL METRIC COMPONENTS
|--------------------------------------------------------------------------
*/

const ReportMetric = ({
    label,
    value,
    valueClass = "text-(--primary)",
}) => {
    return (
        <div
            className="
                p-3
                rounded
                border
                border-(--border)
                bg-(--bg-light)
            "
        >
            <p className="text-[10px] text-(--text-muted)">
                {label}
            </p>

            <p
                className={`text-xs font-semibold mt-1 ${valueClass}`}
            >
                {value}
            </p>
        </div>
    );
};

const SmallMetric = ({
    label,
    value,
    valueClass = "text-(--primary)",
}) => {
    return (
        <div
            className="
                p-2.5
                rounded
                border
                border-(--border)
                bg-(--bg-white)
            "
        >
            <p className="text-[9px] text-(--text-muted)">
                {label}
            </p>

            <p
                className={`text-xs font-semibold mt-0.5 ${valueClass}`}
            >
                {value}
            </p>
        </div>
    );
};