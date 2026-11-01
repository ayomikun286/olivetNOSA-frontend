
import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Mail,
    ShieldCheck,
    Clock3,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Ban,
    RefreshCw,
    Search,
    Eye,
    RotateCcw,
    UserRound,
    Activity,
    Send,
    ChevronLeft,
    ChevronRight,
    FileText,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

import {
    getEmailQueueSummary,
    getAdminEmailJobs,
    getEmailJobDetails,
    getEmailQueueRuns,
    retryFailedEmailJob,
    cancelEmailJob,
    markUncertainEmailAsSent,
    retryUncertainEmailJob,
} from "../../services/adminService.js";

const PAGE_SIZE = 20;

// ========================================
// HELPERS
// ========================================

const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const formatDateTime = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};

const formatDuration = (duration) => {
    if (duration === null || duration === undefined) {
        return "Not available";
    }

    if (duration < 1000) return `${duration} ms`;

    return `${(duration / 1000).toFixed(1)} sec`;
};

const getRecipientName = (user) => {
    if (!user) return "Unlinked recipient";

    return [
        user.firstName,
        user.middleName,
        user.lastName,
    ].filter(Boolean).join(" ") || "Unknown recipient";
};

const statusStyles = {
    pending: "bg-(--warning-light) text-(--warning)",
    processing: "bg-(--primary-light) text-(--primary)",
    sent: "bg-(--success-light) text-(--success)",
    failed: "bg-(--danger-light) text-(--danger)",
    cancelled: "bg-(--bg-soft) text-(--secondary)",
    uncertain: "bg-(--danger-light) text-(--danger)",
    running: "bg-(--primary-light) text-(--primary)",
    completed: "bg-(--success-light) text-(--success)",
};

const StatusBadge = ({ status }) => (
    <span
        className={`inline-flex rounded px-2 py-1 text-[10px] font-medium capitalize ${
            statusStyles[status] ||
            "bg-(--bg-soft) text-(--secondary)"
        }`}
    >
        {status || "Unknown"}
    </span>
);

// ========================================
// COMPONENT
// ========================================

const EmailQueue = () => {
    const { user } = useAuth();

    const isSuperAdmin = user?.role === "superAdmin";

    const [summary, setSummary] = useState(null);
    const [recentRun, setRecentRun] = useState(null);

    const [jobs, setJobs] = useState([]);
    const [runs, setRuns] = useState([]);

    const [loading, setLoading] = useState(true);
    const [jobsLoading, setJobsLoading] = useState(false);
    const [runsLoading, setRunsLoading] = useState(false);

    const [error, setError] = useState("");
    const [runsError, setRunsError] = useState("");

    const [selectedStatus, setSelectedStatus] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const [jobPage, setJobPage] = useState(1);
    const [jobPagination, setJobPagination] = useState({
        page: 1,
        total: 0,
        totalPages: 1,
    });

    const [runPage, setRunPage] = useState(1);
    const [runPagination, setRunPagination] = useState({
        page: 1,
        total: 0,
        totalPages: 1,
    });

    const [selectedJob, setSelectedJob] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState("");
    const [actionSuccess, setActionSuccess] = useState("");

    // ========================================
    // LOAD SUMMARY
    // ========================================

    const loadSummary = useCallback(async () => {
        try {
            setError("");

            const result = await getEmailQueueSummary();

            setSummary(result.summary || {});
            setRecentRun(result.recentRun || null);
        } catch (error) {
            setError(
                error.message || "Unable to load email queue summary."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // ========================================
    // LOAD EMAIL JOBS
    // ========================================

    const loadJobs = useCallback(async (page = 1) => {
        try {
            setJobsLoading(true);
            setError("");

            const result = await getAdminEmailJobs({
                page,
                limit: PAGE_SIZE,
                search,
                status: selectedStatus,
                category: categoryFilter,
            });

            setJobs(
                Array.isArray(result.jobs) ? result.jobs : []
            );

            setJobPagination(
                result.pagination || {
                    page: 1,
                    total: 0,
                    totalPages: 1,
                }
            );
        } catch (error) {
            setError(
                error.message || "Unable to load email jobs."
            );
        } finally {
            setJobsLoading(false);
        }
    }, [search, selectedStatus, categoryFilter]);

    // ========================================
    // LOAD WORKER RUNS
    // ========================================

    const loadRuns = useCallback(async (page = 1) => {
        try {
            setRunsLoading(true);
            setRunsError("");

            const result = await getEmailQueueRuns({
                page,
                limit: PAGE_SIZE,
            });

            setRuns(
                Array.isArray(result.runs) ? result.runs : []
            );

            setRunPagination(
                result.pagination || {
                    page: 1,
                    total: 0,
                    totalPages: 1,
                }
            );
        } catch (error) {
            setRunsError(
                error.message || "Unable to load worker history."
            );
        } finally {
            setRunsLoading(false);
        }
    }, []);

    // ========================================
    // INITIAL LOAD
    // ========================================

    useEffect(() => {
        loadSummary();
        loadRuns(1);
    }, [loadSummary, loadRuns]);

    useEffect(() => {
        loadJobs(jobPage);
    }, [loadJobs, jobPage]);

    // ========================================
    // OVERVIEW STATISTICS
    // ========================================

    const overviewStats = useMemo(() => [
        {
            title: "Total Emails",
            value: summary?.total || 0,
            description: "All recorded email jobs",
            icon: Mail,
        },
        {
            title: "Pending Emails",
            value: summary?.pending || 0,
            description: `${summary?.duePending || 0} ready for processing`,
            icon: Clock3,
        },
        {
            title: "Successfully Sent",
            value: summary?.sent || 0,
            description: "Successfully recorded deliveries",
            icon: CheckCircle2,
        },
        {
            title: "Failed Emails",
            value: summary?.failed || 0,
            description: "Jobs that exhausted automatic retries",
            icon: XCircle,
        },
    ], [summary]);

    // ========================================
    // EMAIL STATUS GROUPS
    // ========================================

    const statusGroups = useMemo(() => [
        {
            id: "",
            title: "All Email Jobs",
            description: "Every email recorded in the queue",
            count: summary?.total || 0,
            icon: Mail,
        },
        {
            id: "pending",
            title: "Pending Emails",
            description: "Emails waiting to be processed",
            count: summary?.pending || 0,
            icon: Clock3,
        },
        {
            id: "processing",
            title: "Processing Emails",
            description: "Emails currently being processed",
            count: summary?.processing || 0,
            icon: Activity,
        },
        {
            id: "sent",
            title: "Successfully Sent",
            description: "Emails successfully recorded as sent",
            count: summary?.sent || 0,
            icon: CheckCircle2,
        },
        {
            id: "failed",
            title: "Failed Emails",
            description: "Emails that exhausted automatic retries",
            count: summary?.failed || 0,
            icon: XCircle,
        },
        {
            id: "uncertain",
            title: "Uncertain Emails",
            description: "Emails requiring manual delivery investigation",
            count: summary?.uncertain || 0,
            icon: AlertCircle,
        },
        {
            id: "cancelled",
            title: "Cancelled Emails",
            description: "Email jobs cancelled by an administrator",
            count: summary?.cancelled || 0,
            icon: Ban,
        },
    ], [summary]);

    // ========================================
    // SELECT STATUS GROUP
    // ========================================

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        setJobPage(1);
        setSearch("");
        setSearchInput("");
        setCategoryFilter("");
        setSelectedJob(null);
        setActionError("");
        setActionSuccess("");
    };

    // ========================================
    // SEARCH
    // ========================================

    const handleSearch = (e) => {
        e.preventDefault();

        setSearch(searchInput.trim());
        setJobPage(1);
        setSelectedJob(null);
    };

    const handleClearFilters = () => {
        setSearch("");
        setSearchInput("");
        setCategoryFilter("");
        setJobPage(1);
    };

    // ========================================
    // REFRESH
    // ========================================

    const handleRefresh = async () => {
        setSelectedJob(null);
        setActionError("");
        setActionSuccess("");

        await Promise.all([
            loadSummary(),
            loadJobs(jobPage),
            loadRuns(runPage),
        ]);
    };

    // ========================================
    // JOB DETAILS
    // ========================================

    const handleViewDetails = async (jobId) => {
        try {
            setDetailsLoading(true);
            setSelectedJob(null);
            setActionError("");
            setActionSuccess("");

            const result = await getEmailJobDetails(jobId);

            setSelectedJob(result.job || null);
        } catch (error) {
            setActionError(
                error.message || "Unable to load email job details."
            );
        } finally {
            setDetailsLoading(false);
        }
    };

    // ========================================
    // EMAIL JOB ACTIONS
    // ========================================

    const performJobAction = async (action, job) => {
        if (!isSuperAdmin || !job?._id || actionLoading) return;

        const actions = {
            retry: {
                confirm: "Retry this failed email job?",
                success: "Email job queued for retry.",
                request: retryFailedEmailJob,
            },

            cancel: {
                confirm: "Cancel this pending email job?",
                success: "Email job cancelled successfully.",
                request: cancelEmailJob,
            },

            markSent: {
                confirm:
                    "Have you verified that this email was delivered? This action will mark it as sent without sending another email.",
                success: "Email job marked as sent.",
                request: markUncertainEmailAsSent,
            },

            retryUncertain: {
                confirm:
                    "Retry this uncertain email? Investigate its delivery status first because a duplicate email may be sent.",
                success: "Uncertain email queued for retry.",
                request: retryUncertainEmailJob,
            },
        };

        const selectedAction = actions[action];

        if (!selectedAction) return;

        if (!window.confirm(selectedAction.confirm)) return;

        try {
            setActionLoading(true);
            setActionError("");
            setActionSuccess("");

            await selectedAction.request(job._id);

            setActionSuccess(selectedAction.success);
            setSelectedJob(null);

            await Promise.all([
                loadSummary(),
                loadJobs(jobPage),
            ]);
        } catch (error) {
            setActionError(
                error.message || "Unable to complete email action."
            );
        } finally {
            setActionLoading(false);
        }
    };

    // ========================================
    // ACTION BUTTONS
    // ========================================

    const renderJobActions = (job) => {
        if (!isSuperAdmin) return null;

        return (
            <div className="flex flex-wrap items-center gap-2">
                {job.status === "failed" && (
                    <button
                        type="button"
                        onClick={() => performJobAction("retry", job)}
                        disabled={actionLoading}
                        className="inline-flex h-8 items-center gap-1.5 rounded border border-(--primary) px-3 text-[11px] font-medium text-(--primary) hover:bg-(--primary-light) disabled:opacity-50"
                    >
                        <RotateCcw size={13} />
                        Retry
                    </button>
                )}

                {job.status === "pending" && (
                    <button
                        type="button"
                        onClick={() => performJobAction("cancel", job)}
                        disabled={actionLoading}
                        className="inline-flex h-8 items-center gap-1.5 rounded border border-(--danger) px-3 text-[11px] font-medium text-(--danger) hover:bg-(--danger-light) disabled:opacity-50"
                    >
                        <Ban size={13} />
                        Cancel
                    </button>
                )}

                {job.status === "uncertain" && (
                    <>
                        <button
                            type="button"
                            onClick={() => performJobAction("markSent", job)}
                            disabled={actionLoading}
                            className="inline-flex h-8 items-center gap-1.5 rounded border border-(--success) px-3 text-[11px] font-medium text-(--success) hover:bg-(--success-light) disabled:opacity-50"
                        >
                            <CheckCircle2 size={13} />
                            Mark Sent
                        </button>

                        <button
                            type="button"
                            onClick={() => performJobAction("retryUncertain", job)}
                            disabled={actionLoading}
                            className="inline-flex h-8 items-center gap-1.5 rounded border border-(--primary) px-3 text-[11px] font-medium text-(--primary) hover:bg-(--primary-light) disabled:opacity-50"
                        >
                            <RotateCcw size={13} />
                            Retry
                        </button>
                    </>
                )}
            </div>
        );
    };

    // ========================================
    // PAGINATION
    // ========================================

    const renderPagination = (pagination, onChange) => {
        if (!pagination.total) return null;

        return (
            <div className="flex flex-col gap-3 border-t border-(--border) px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] text-(--secondary)">
                    Page {pagination.page} of {pagination.totalPages}
                    {" · "}
                    {pagination.total.toLocaleString()} record(s)
                </p>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        className="inline-flex h-8 items-center gap-1 rounded border border-(--border) px-3 text-xs text-(--primary) hover:bg-(--bg-soft) disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft size={14} />
                        Previous
                    </button>

                    <button
                        type="button"
                        onClick={() => onChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages}
                        className="inline-flex h-8 items-center gap-1 rounded border border-(--border) px-3 text-xs text-(--primary) hover:bg-(--bg-soft) disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        );
    };

    // ========================================
    // EMAIL JOB TABLE
    // ========================================

    const renderJobsTable = () => {
        if (jobsLoading) {
            return (
                <div className="flex items-center justify-center gap-2 py-10 text-xs text-(--secondary)">
                    <RefreshCw size={15} className="animate-spin" />
                    Loading email jobs...
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-4">
                    <div className="rounded border border-(--danger) bg-(--danger-light) p-4">
                        <p className="text-xs text-(--danger)">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => loadJobs(jobPage)}
                            className="mt-2 text-xs font-medium text-(--danger) underline"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            );
        }

        if (!jobs.length) {
            return (
                <div className="py-10 text-center">
                    <Mail
                        size={28}
                        className="mx-auto text-(--text-muted)"
                    />

                    <p className="mt-3 text-sm font-medium text-(--primary)">
                        No email jobs found
                    </p>

                    <p className="mt-1 text-xs text-(--secondary)">
                        There are no email records matching the selected filters.
                    </p>
                </div>
            );
        }

        return (
            <>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[750px] text-left">
                        <thead className="bg-(--bg-soft)">
                            <tr className="text-[11px] text-(--secondary)">
                                <th className="px-4 py-3 font-medium">
                                    Recipient
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Subject
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Category
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Status
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Attempts
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Created
                                </th>

                                <th className="px-4 py-3 text-right font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-(--border)">
                            {jobs.map((job) => (
                                <tr key={job._id}>
                                    <td className="px-4 py-3">
                                        <p className="text-xs font-medium text-(--primary)">
                                            {job.recipientEmail}
                                        </p>

                                        <p className="mt-1 text-[10px] text-(--text-muted)">
                                            {getRecipientName(job.recipientUser)}
                                        </p>
                                    </td>

                                    <td className="max-w-[220px] px-4 py-3">
                                        <p className="truncate text-xs text-(--text-primary)">
                                            {job.subject}
                                        </p>
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className="text-[11px] capitalize text-(--secondary)">
                                            {job.category}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <StatusBadge status={job.status} />
                                    </td>

                                    <td className="px-4 py-3 text-xs text-(--text-primary)">
                                        {job.attempts}/{job.maxAttempts}
                                    </td>

                                    <td className="px-4 py-3 text-[11px] text-(--secondary)">
                                        {formatDate(job.createdAt)}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap items-center justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleViewDetails(job._id)}
                                                className="inline-flex h-8 items-center gap-1.5 rounded border border-(--border) px-2.5 text-[11px] font-medium text-(--primary) hover:bg-(--bg-soft)"
                                            >
                                                <Eye size={13} />
                                                View
                                            </button>

                                            {renderJobActions(job)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {renderPagination(
                    jobPagination,
                    setJobPage
                )}
            </>
        );
    };

    // ========================================
    // SELECTED JOB DETAILS
    // ========================================

    const renderSelectedJob = () => {
        if (detailsLoading) {
            return (
                <div className="flex items-center justify-center gap-2 py-8 text-xs text-(--secondary)">
                    <RefreshCw size={15} className="animate-spin" />
                    Loading email details...
                </div>
            );
        }

        if (!selectedJob) return null;

        return (
            <div className="mt-5 overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="flex flex-col gap-3 border-b border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <FileText
                            size={17}
                            className="text-(--primary)"
                        />

                        <h3 className="text-sm font-semibold text-(--primary)">
                            Email Job Details
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={() => setSelectedJob(null)}
                        className="self-start text-xs font-medium text-(--secondary) hover:text-(--primary)"
                    >
                        Close details
                    </button>
                </div>

                <div className="space-y-4 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <StatusBadge status={selectedJob.status} />

                        <span className="break-all text-[10px] text-(--text-muted)">
                            ID: {selectedJob._id}
                        </span>
                    </div>

                    <div className="rounded border border-(--border) bg-(--bg-soft) p-4">
                        <p className="text-[11px] text-(--secondary)">
                            Email Subject
                        </p>

                        <p className="mt-1 text-xs font-semibold text-(--primary)">
                            {selectedJob.subject}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            ["Recipient Email", selectedJob.recipientEmail],
                            ["Recipient Name", getRecipientName(selectedJob.recipientUser)],
                            ["Category", selectedJob.category],
                            ["Attempts", `${selectedJob.attempts}/${selectedJob.maxAttempts}`],
                            ["Created", formatDateTime(selectedJob.createdAt)],
                            ["Last Attempt", formatDateTime(selectedJob.lastAttemptAt)],
                            ["Next Attempt", selectedJob.status === "pending"
                                ? formatDateTime(selectedJob.nextAttemptAt)
                                : "Not scheduled"],
                            ["Sent At", formatDateTime(selectedJob.sentAt)],
                            ["Provider Message ID", selectedJob.providerMessageId || "Not available"],
                        ].map(([label, value]) => (
                            <div key={label} className="min-w-0">
                                <p className="text-[11px] text-(--secondary)">
                                    {label}
                                </p>

                                <p className="mt-1 break-words text-xs font-medium text-(--primary)">
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {selectedJob.lastError && (
                        <div className="rounded border border-(--danger) bg-(--danger-light) p-4">
                            <p className="text-xs font-semibold text-(--danger)">
                                Last Recorded Message
                            </p>

                            <p className="mt-2 break-words text-xs leading-5 text-(--danger)">
                                {selectedJob.lastError}
                            </p>
                        </div>
                    )}

                    {isSuperAdmin && (
                        <div className="border-t border-(--border) pt-4">
                            <p className="mb-3 text-xs font-semibold text-(--primary)">
                                Available Actions
                            </p>

                            {renderJobActions(selectedJob)}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // ========================================
    // WORKER RUN HISTORY
    // ========================================

    const renderWorkerRuns = () => {
        if (runsLoading) {
            return (
                <div className="flex items-center justify-center gap-2 py-10 text-xs text-(--secondary)">
                    <RefreshCw size={15} className="animate-spin" />
                    Loading worker history...
                </div>
            );
        }

        if (runsError) {
            return (
                <div className="p-4">
                    <div className="rounded border border-(--danger) bg-(--danger-light) p-4">
                        <p className="text-xs text-(--danger)">
                            {runsError}
                        </p>

                        <button
                            type="button"
                            onClick={() => loadRuns(runPage)}
                            className="mt-2 text-xs font-medium text-(--danger) underline"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            );
        }

        if (!runs.length) {
            return (
                <div className="py-10 text-center">
                    <Activity
                        size={28}
                        className="mx-auto text-(--text-muted)"
                    />

                    <p className="mt-3 text-sm font-medium text-(--primary)">
                        No worker runs found
                    </p>

                    <p className="mt-1 text-xs text-(--secondary)">
                        Worker execution history will appear here.
                    </p>
                </div>
            );
        }

        return (
            <>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left">
                        <thead className="bg-(--bg-soft)">
                            <tr className="text-[11px] text-(--secondary)">
                                <th className="px-4 py-3 font-medium">
                                    Worker ID
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Status
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Processed
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Sent
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Failed
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Retrying
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Duration
                                </th>

                                <th className="px-4 py-3 font-medium">
                                    Started
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-(--border)">
                            {runs.map((run) => (
                                <tr key={run._id}>
                                    <td className="px-4 py-3">
                                        <span className="block max-w-[130px] truncate text-[10px] text-(--secondary)">
                                            {run.workerId}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <StatusBadge status={run.status} />
                                    </td>

                                    <td className="px-4 py-3 text-xs text-(--primary)">
                                        {run.processed ?? 0}
                                    </td>

                                    <td className="px-4 py-3 text-xs text-(--success)">
                                        {run.sent ?? 0}
                                    </td>

                                    <td className="px-4 py-3 text-xs text-(--danger)">
                                        {run.failed ?? 0}
                                    </td>

                                    <td className="px-4 py-3 text-xs text-(--secondary)">
                                        {run.retrying ?? 0}
                                    </td>

                                    <td className="px-4 py-3 text-[11px] text-(--secondary)">
                                        {formatDuration(run.duration)}
                                    </td>

                                    <td className="px-4 py-3 text-[11px] text-(--secondary)">
                                        {formatDateTime(run.startedAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {renderPagination(
                    runPagination,
                    setRunPage
                )}
            </>
        );
    };

    // ========================================
    // PAGE
    // ========================================

    return (
        <div className="space-y-6 p-4 sm:p-6">

            {/* Page Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Mail
                            size={22}
                            className="text-(--primary)"
                        />

                        <h1 className="text-xl font-semibold text-(--primary)">
                            Email Queue Management
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-(--secondary)">
                        Monitor outgoing emails, delivery attempts, and worker activity.
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 self-start rounded border border-(--border) bg-(--bg-white) px-3 py-2">
                    <ShieldCheck
                        size={16}
                        className="text-(--primary)"
                    />

                    <span className="text-xs font-medium text-(--primary)">
                        {isSuperAdmin
                            ? "Super Admin Management"
                            : "Admin Monitoring"
                        }
                    </span>
                </div>
            </div>

            {/* Intro */}

            <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                        <Mail size={20} />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Central Email Queue
                        </h2>

                        <p className="mt-1 max-w-2xl text-xs leading-5 text-(--secondary)">
                            Monitor emails generated by NOSA services, including
                            registration, account approvals, payment notifications,
                            and other system messages. Review delivery attempts,
                            investigate failed jobs, and manage uncertain deliveries.
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Feedback */}

            {actionError && (
                <div className="rounded border border-(--danger) bg-(--danger-light) p-3">
                    <p className="text-xs text-(--danger)">
                        {actionError}
                    </p>
                </div>
            )}

            {actionSuccess && (
                <div className="flex items-center justify-between gap-3 rounded border border-(--success) bg-(--success-light) px-4 py-3">
                    <p className="text-xs text-(--success)">
                        {actionSuccess}
                    </p>

                    <button
                        type="button"
                        onClick={() => setActionSuccess("")}
                        className="text-xs font-medium text-(--success)"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* Overview */}

            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="flex flex-col gap-3 border-b border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Email Queue Overview
                        </h2>

                        <p className="mt-1 text-xs text-(--secondary)">
                            Summary of all recorded email jobs.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={loading || jobsLoading || actionLoading}
                        className="inline-flex h-9 items-center justify-center gap-2 self-start rounded border border-(--border) px-3 text-xs font-medium text-(--primary) hover:bg-(--bg-soft) disabled:opacity-50"
                    >
                        <RefreshCw
                            size={14}
                            className={loading ? "animate-spin" : ""}
                        />

                        Refresh Queue
                    </button>
                </div>

                {error && !jobsLoading ? (
                    <div className="p-5">
                        <div className="rounded border border-(--danger) bg-(--danger-light) p-4">
                            <p className="text-xs text-(--danger)">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={loadSummary}
                                className="mt-2 text-xs font-medium text-(--danger) underline"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
                        {overviewStats.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded border border-(--border) bg-(--bg-soft) p-4"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-xs font-medium text-(--secondary)">
                                            {item.title}
                                        </p>

                                        <Icon
                                            size={17}
                                            className="shrink-0 text-(--primary)"
                                        />
                                    </div>

                                    <p className="mt-3 text-xl font-semibold text-(--primary)">
                                        {loading ? "—" : item.value.toLocaleString()}
                                    </p>

                                    <p className="mt-1 text-[11px] text-(--text-muted)">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Additional Queue Information */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded border border-(--border) bg-(--bg-white) p-4">
                    <div className="flex items-center gap-2">
                        <Clock3
                            size={16}
                            className="text-(--primary)"
                        />

                        <p className="text-xs font-medium text-(--primary)">
                            Ready for Processing
                        </p>
                    </div>

                    <p className="mt-3 text-xl font-semibold text-(--primary)">
                        {loading ? "—" : (summary?.duePending || 0).toLocaleString()}
                    </p>

                    <p className="mt-1 text-[11px] text-(--secondary)">
                        Pending emails whose scheduled processing time has arrived.
                    </p>
                </div>

                <div className="rounded border border-(--border) bg-(--bg-white) p-4">
                    <div className="flex items-center gap-2">
                        <RotateCcw
                            size={16}
                            className="text-(--primary)"
                        />

                        <p className="text-xs font-medium text-(--primary)">
                            Scheduled for Retry
                        </p>
                    </div>

                    <p className="mt-3 text-xl font-semibold text-(--primary)">
                        {loading ? "—" : (summary?.scheduledForRetry || 0).toLocaleString()}
                    </p>

                    <p className="mt-1 text-[11px] text-(--secondary)">
                        Pending emails waiting for their next scheduled attempt.
                    </p>
                </div>
            </div>

            {/* Email Job Groups */}

            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="border-b border-(--border) px-5 py-4">
                    <div className="flex items-center gap-2">
                        <Mail
                            size={17}
                            className="text-(--primary)"
                        />

                        <h2 className="text-sm font-semibold text-(--primary)">
                            Email Job Groups
                        </h2>
                    </div>

                    <p className="mt-1 text-xs text-(--secondary)">
                        Select a status group to review its email jobs and available management actions.
                    </p>
                </div>

                <div className="p-4">
                    {loading ? (
                        <div className="flex items-center justify-center gap-2 py-10 text-xs text-(--secondary)">
                            <RefreshCw
                                size={15}
                                className="animate-spin"
                            />

                            Loading email queue...
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {statusGroups.map((item) => {
                                const Icon = item.icon;

                                const isSelected =
                                    selectedStatus === item.id;

                                return (
                                    <button
                                        key={item.id || "all"}
                                        type="button"
                                        onClick={() => handleSelectStatus(item.id)}
                                        className={`w-full rounded border p-4 text-left transition ${
                                            isSelected
                                                ? "border-(--primary) bg-(--bg-soft)"
                                                : "border-(--border) hover:border-(--primary) hover:bg-(--bg-soft)"
                                        }`}
                                    >
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                                                    <Icon size={18} />
                                                </div>

                                                <div>
                                                    <h3 className="text-sm font-semibold text-(--primary)">
                                                        {item.title}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-(--secondary)">
                                                        {item.description}
                                                    </p>

                                                    <p className="mt-2 text-[11px] text-(--text-muted)">
                                                        {item.count.toLocaleString()} email job(s)
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className="rounded bg-(--bg-soft) px-3 py-1.5 text-xs font-semibold text-(--primary)">
                                                    {item.count.toLocaleString()}
                                                </span>

                                                <span className="text-[11px] font-medium text-(--primary)">
                                                    {isSelected ? "Selected" : "View Jobs"}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Selected Email Jobs */}

            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="flex flex-col gap-3 border-b border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <FileText
                                size={17}
                                className="text-(--primary)"
                            />

                            <h2 className="text-sm font-semibold text-(--primary)">
                                {statusGroups.find(
                                    (item) => item.id === selectedStatus
                                )?.title || "Email Jobs"}
                            </h2>
                        </div>

                        <p className="mt-1 text-xs text-(--secondary)">
                            Review email recipients, delivery status, and processing attempts.
                        </p>
                    </div>

                    <span className="self-start text-[11px] text-(--secondary)">
                        {jobPagination.total.toLocaleString()} record(s)
                    </span>
                </div>

                <div className="p-4">
                    {/* Search and Filters */}

                    <form
                        onSubmit={handleSearch}
                        className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_200px_auto]"
                    >
                        <div className="relative">
                            <Search
                                size={14}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                            />

                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search recipient or subject..."
                                className="h-10 w-full rounded border border-(--border) bg-(--bg-white) pl-9 pr-3 text-xs outline-none focus:border-(--primary)"
                            />
                        </div>

                        <input
                            type="text"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            placeholder="Filter by category"
                            className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs outline-none focus:border-(--primary)"
                        />

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded bg-(--primary) px-4 text-xs font-medium text-white hover:opacity-90"
                            >
                                <Search size={14} />
                                Search
                            </button>

                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="inline-flex h-10 items-center justify-center rounded border border-(--border) px-3 text-xs font-medium text-(--primary) hover:bg-(--bg-soft)"
                            >
                                Clear
                            </button>
                        </div>
                    </form>

                    {/* Selected Group Statistics */}

                    <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                            ["Total", summary?.total || 0],
                            ["Pending", summary?.pending || 0],
                            ["Failed", summary?.failed || 0],
                            ["Uncertain", summary?.uncertain || 0],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="rounded border border-(--border) bg-(--bg-soft) p-3"
                            >
                                <p className="text-[11px] text-(--secondary)">
                                    {label}
                                </p>

                                <p className="mt-1 text-lg font-semibold text-(--primary)">
                                    {loading ? "—" : value.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>

                    {renderJobsTable()}

                    {renderSelectedJob()}
                </div>
            </div>

            {/* Worker Run History */}

            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="flex flex-col gap-3 border-b border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Activity
                                size={17}
                                className="text-(--primary)"
                            />

                            <h2 className="text-sm font-semibold text-(--primary)">
                                Email Worker History
                            </h2>
                        </div>

                        <p className="mt-1 text-xs text-(--secondary)">
                            Review previous email queue processing executions.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => loadRuns(runPage)}
                        disabled={runsLoading}
                        className="inline-flex h-9 items-center justify-center gap-2 self-start rounded border border-(--border) px-3 text-xs font-medium text-(--primary) hover:bg-(--bg-soft) disabled:opacity-50"
                    >
                        <RefreshCw
                            size={14}
                            className={runsLoading ? "animate-spin" : ""}
                        />

                        Refresh History
                    </button>
                </div>

                {recentRun && (
                    <div className="grid grid-cols-2 gap-3 border-b border-(--border) p-4 sm:grid-cols-4">
                        <div className="rounded border border-(--border) bg-(--bg-soft) p-3">
                            <p className="text-[11px] text-(--secondary)">
                                Latest Run
                            </p>

                            <div className="mt-2">
                                <StatusBadge status={recentRun.status} />
                            </div>
                        </div>

                        <div className="rounded border border-(--border) bg-(--bg-soft) p-3">
                            <p className="text-[11px] text-(--secondary)">
                                Processed
                            </p>

                            <p className="mt-2 text-lg font-semibold text-(--primary)">
                                {recentRun.processed ?? 0}
                            </p>
                        </div>

                        <div className="rounded border border-(--border) bg-(--bg-soft) p-3">
                            <p className="text-[11px] text-(--secondary)">
                                Successfully Sent
                            </p>

                            <p className="mt-2 text-lg font-semibold text-(--success)">
                                {recentRun.sent ?? 0}
                            </p>
                        </div>

                        <div className="rounded border border-(--border) bg-(--bg-soft) p-3">
                            <p className="text-[11px] text-(--secondary)">
                                Started
                            </p>

                            <p className="mt-2 text-xs font-medium text-(--primary)">
                                {formatDateTime(recentRun.startedAt)}
                            </p>
                        </div>
                    </div>
                )}

                <div className="p-4">
                    {renderWorkerRuns()}
                </div>
            </div>
        </div>
    );
};

export default EmailQueue;
