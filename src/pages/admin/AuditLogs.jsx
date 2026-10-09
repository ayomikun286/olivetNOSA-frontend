
import React, { useCallback, useEffect, useState } from "react";
import {
    ShieldCheck,
    Search,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Clock3,
    UserRound,
    Activity,
    X,
} from "lucide-react";

import { getAdminAuditLogs } from "../../services/adminService.js";
import ContentLoading from "../../components/admin/ContentLoading.jsx";

const PAGE_SIZE = 20;

const getUserName = (user) => {
    if (!user) return "System";

    const name = [
        user.firstName,
        user.middleName,
        user.lastName,
    ]
        .filter(Boolean)
        .join(" ");

    return name || user.email || "Unknown user";
};

const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleString("en-NG", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatAction = (action = "") =>
    action
        .replace(/[._]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (character) => character.toUpperCase()) ||
    "Unknown action";

// Avoid exposing credentials or tokens if they ever appear in details.
const sanitizeDetails = (value) => {
    if (Array.isArray(value)) {
        return value.map(sanitizeDetails);
    }

    if (value && typeof value === "object") {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [
                key,
                /password|token|secret|authorization|cookie|credential/i.test(
                    key
                )
                    ? "[REDACTED]"
                    : sanitizeDetails(item),
            ])
        );
    }

    return value;
};

const formatFieldName = (key) =>
    key
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[._]+/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [pagination, setPagination] = useState(null);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [action, setAction] = useState("");
    const [resource, setResource] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [expandedLog, setExpandedLog] = useState(null);

    const loadLogs = useCallback(
        async (page = 1, showRefresh = false) => {
            try {
                setError("");

                if (showRefresh) {
                    setRefreshing(true);
                } else {
                    setLoading(true);
                }

                const result = await getAdminAuditLogs({
                    page,
                    limit: PAGE_SIZE,
                    search,
                    action,
                    resource,
                    from,
                    to,
                });

                setLogs(result.logs || []);
                setPagination(result.pagination || null);
                setCurrentPage(result.pagination?.page || page);
                setExpandedLog(null);
            } catch (err) {
                console.error("Audit logs error:", err);
                setError(err.message || "Failed to load audit logs.");
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        [search, action, resource, from, to]
    );

    // Debounce filter changes so each keystroke does not trigger a request.
    useEffect(() => {
        const timer = setTimeout(() => {
            loadLogs(1);
        }, 350);

        return () => clearTimeout(timer);
    }, [loadLogs]);

    const clearFilters = () => {
        setSearch("");
        setAction("");
        setResource("");
        setFrom("");
        setTo("");
        setCurrentPage(1);
    };

    const hasFilters = Boolean(
        search || action || resource || from || to
    );

    const canGoPrevious =
        pagination && pagination.page > 1;

    const canGoNext =
        pagination &&
        pagination.page < pagination.totalPages;

    const handlePrevious = () => {
        if (!canGoPrevious || loading || refreshing) return;
        loadLogs(currentPage - 1);
    };

    const handleNext = () => {
        if (!canGoNext || loading || refreshing) return;
        loadLogs(currentPage + 1);
    };

    const renderDetails = (details) => {
        if (
            !details ||
            typeof details !== "object" ||
            Object.keys(details).length === 0
        ) {
            return (
                <p className="text-xs text-(--text-muted)">
                    No additional details recorded.
                </p>
            );
        }

        const safeDetails = sanitizeDetails(details);

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {Object.entries(safeDetails).map(([key, value]) => (
                    <div
                        key={key}
                        className="min-w-0 rounded border border-(--border) bg-(--bg-white) p-3"
                    >
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-(--text-muted)">
                            {formatFieldName(key)}
                        </p>

                        <p className="mt-1 text-xs text-(--primary) break-words whitespace-pre-wrap">
                            {value === null || value === undefined
                                ? "—"
                                : typeof value === "object"
                                    ? JSON.stringify(value, null, 2)
                                    : String(value)}
                        </p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="p-4">
            <div className="space-y-5">
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck
                                size={21}
                                className="text-(--primary)"
                            />

                            <h1 className="text-xl font-semibold text-(--primary)">
                                Audit Logs
                            </h1>
                        </div>

                        <p className="text-sm text-(--secondary) mt-1">
                            Review administrative activities and recorded system events.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => loadLogs(currentPage, true)}
                        disabled={loading || refreshing}
                        className="h-9 px-3.5 rounded border border-(--border) bg-(--bg-white) text-(--primary) text-xs font-semibold inline-flex items-center justify-center gap-2 hover:bg-(--bg-soft) disabled:opacity-50 transition-colors"
                    >
                        <RefreshCw
                            size={14}
                            className={refreshing ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>
                </div>

                {/* SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-(--bg-white) border border-(--border) rounded p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs text-(--secondary)">
                                    Matching Records
                                </p>

                                <p className="text-2xl font-semibold text-(--primary) mt-2 tabular-nums">
                                    {pagination?.total ?? "—"}
                                </p>

                                <p className="text-xs text-(--text-muted) mt-1">
                                    {hasFilters
                                        ? "Records matching your filters"
                                        : "Recorded audit events"}
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <Activity size={19} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-(--bg-white) border border-(--border) rounded p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs text-(--secondary)">
                                    Current Page
                                </p>

                                <p className="text-2xl font-semibold text-(--primary) mt-2 tabular-nums">
                                    {pagination
                                        ? `${pagination.page} / ${Math.max(
                                            pagination.totalPages,
                                            1
                                        )}`
                                        : "—"}
                                </p>

                                <p className="text-xs text-(--text-muted) mt-1">
                                    Up to {PAGE_SIZE} records per page
                                </p>
                            </div>

                            <div className="h-10 w-10 rounded bg-(--bg-soft) text-(--primary) flex items-center justify-center">
                                <Clock3 size={19} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FILTERS */}
                <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                    <div className="px-5 py-4 border-b border-(--border)">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    Activity History
                                </h2>

                                <p className="text-xs text-(--secondary) mt-1">
                                    Search and filter recorded events.
                                </p>
                            </div>

                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-(--primary) hover:opacity-70"
                                >
                                    <X size={14} />
                                    Clear filters
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
                            {/* SEARCH */}
                            <div className="sm:col-span-2 xl:col-span-3">
                                <label
                                    htmlFor="audit-search"
                                    className="block text-xs font-medium text-(--secondary) mb-1.5"
                                >
                                    Search
                                </label>

                                <div className="relative">
                                    <Search
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                                    />

                                    <input
                                        id="audit-search"
                                        type="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search actions, resources, IP addresses..."
                                        className="h-9 w-full pl-9 pr-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                    />
                                </div>
                            </div>

                            {/* ACTION */}
                            <div>
                                <label
                                    htmlFor="audit-action"
                                    className="block text-xs font-medium text-(--secondary) mb-1.5"
                                >
                                    Action
                                </label>

                                <input
                                    id="audit-action"
                                    type="text"
                                    value={action}
                                    onChange={(e) => setAction(e.target.value)}
                                    placeholder="e.g. member.approved"
                                    className="h-9 w-full px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                />
                            </div>

                            {/* RESOURCE */}
                            <div>
                                <label
                                    htmlFor="audit-resource"
                                    className="block text-xs font-medium text-(--secondary) mb-1.5"
                                >
                                    Resource
                                </label>

                                <input
                                    id="audit-resource"
                                    type="text"
                                    value={resource}
                                    onChange={(e) => setResource(e.target.value)}
                                    placeholder="e.g. User, Chapter"
                                    className="h-9 w-full px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                />
                            </div>

                            {/* DATE FROM */}
                            <div>
                                <label
                                    htmlFor="audit-from"
                                    className="block text-xs font-medium text-(--secondary) mb-1.5"
                                >
                                    From date
                                </label>

                                <input
                                    id="audit-from"
                                    type="date"
                                    value={from}
                                    max={to || undefined}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="h-9 w-full px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                />
                            </div>

                            {/* DATE TO */}
                            <div>
                                <label
                                    htmlFor="audit-to"
                                    className="block text-xs font-medium text-(--secondary) mb-1.5"
                                >
                                    To date
                                </label>

                                <input
                                    id="audit-to"
                                    type="date"
                                    value={to}
                                    min={from || undefined}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="h-9 w-full px-3 rounded border border-(--border) bg-(--bg-white) text-xs text-(--primary) outline-none focus:border-(--primary)"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="m-4 rounded border border-(--danger) bg-(--danger-light) p-4">
                            <p className="text-sm font-medium text-(--danger)">
                                Unable to load audit logs
                            </p>

                            <p className="text-xs text-(--secondary) mt-1">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() => loadLogs(currentPage)}
                                className="mt-3 text-xs font-semibold text-(--primary) hover:opacity-70"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left">
                            <thead>
                                <tr className="bg-(--bg-soft) border-b border-(--border)">
                                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--secondary)">
                                        Activity
                                    </th>

                                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--secondary)">
                                        Performed By
                                    </th>

                                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--secondary)">
                                        Target
                                    </th>

                                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--secondary)">
                                        Resource
                                    </th>

                                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--secondary)">
                                        Date & Time
                                    </th>

                                    <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--secondary)">
                                        Details
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-(--border)">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="p-8">
                                            <ContentLoading />
                                        </td>
                                    </tr>
                                ) : logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-5 py-12 text-center">
                                            <ShieldCheck
                                                size={28}
                                                className="mx-auto text-(--text-muted)"
                                            />

                                            <p className="text-sm font-medium text-(--primary) mt-3">
                                                No audit logs found
                                            </p>

                                            <p className="text-xs text-(--secondary) mt-1">
                                                Try changing your search or filters.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map((log) => {
                                        const isExpanded = expandedLog === log._id;

                                        return (
                                            <React.Fragment key={log._id}>
                                                <tr className="hover:bg-(--bg-soft)/60 transition-colors">
                                                    <td className="px-5 py-4 align-top">
                                                        <p className="text-xs font-semibold text-(--primary)">
                                                            {formatAction(log.action)}
                                                        </p>

                                                        <p className="text-[10px] text-(--text-muted) mt-1 break-all">
                                                            {log.action}
                                                        </p>
                                                    </td>

                                                    <td className="px-4 py-4 align-top">
                                                        <div className="flex items-start gap-2">
                                                            <UserRound
                                                                size={15}
                                                                className="mt-0.5 shrink-0 text-(--text-muted)"
                                                            />

                                                            <div className="min-w-0">
                                                                <p className="text-xs font-medium text-(--primary)">
                                                                    {getUserName(log.actor)}
                                                                </p>

                                                                {log.actor?.email && (
                                                                    <p className="text-[10px] text-(--secondary) mt-1 break-all">
                                                                        {log.actor.email}
                                                                    </p>
                                                                )}

                                                                {log.actor?.role && (
                                                                    <p className="text-[10px] text-(--text-muted) mt-1 capitalize">
                                                                        {log.actor.role}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4 align-top">
                                                        {log.targetUser ? (
                                                            <div>
                                                                <p className="text-xs font-medium text-(--primary)">
                                                                    {getUserName(log.targetUser)}
                                                                </p>

                                                                {log.targetUser.alumniId && (
                                                                    <p className="text-[10px] text-(--secondary) mt-1">
                                                                        {log.targetUser.alumniId}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-(--text-muted)">
                                                                —
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-4 align-top">
                                                        <p className="text-xs font-medium text-(--primary)">
                                                            {log.details?.chapterName ||
                                                                log.details?.yearSetName ||
                                                                log.details?.reportName ||
                                                                log.resource ||
                                                                "—"}
                                                        </p>

                                                        <p className="text-[10px] text-(--text-muted) mt-1">
                                                            {log.resource || "Unknown resource"}
                                                        </p>

                                                        {log.resourceId && (
                                                            <p
                                                                title={log.resourceId}
                                                                className="text-[10px] text-(--text-muted) mt-1 max-w-[130px] truncate"
                                                            >
                                                                ID: {log.resourceId}
                                                            </p>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-4 align-top whitespace-nowrap">
                                                        <p className="text-xs text-(--primary)">
                                                            {formatDate(log.createdAt)}
                                                        </p>

                                                        <p className="text-[10px] text-(--text-muted) mt-1">
                                                            {log.ipAddress || "IP unavailable"}
                                                        </p>
                                                    </td>

                                                    <td className="px-4 py-4 align-top">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setExpandedLog(
                                                                    isExpanded ? null : log._id
                                                                )
                                                            }
                                                            aria-expanded={isExpanded}
                                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--primary) hover:opacity-70"
                                                        >
                                                            {isExpanded ? "Hide" : "View"}

                                                            {isExpanded ? (
                                                                <ChevronUp size={14} />
                                                            ) : (
                                                                <ChevronDown size={14} />
                                                            )}
                                                        </button>
                                                    </td>
                                                </tr>

                                                {isExpanded && (
                                                    <tr className="bg-(--bg-soft)/50">
                                                        <td colSpan={6} className="px-5 py-5">
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <h3 className="text-xs font-semibold text-(--primary) mb-3">
                                                                        Recorded Details
                                                                    </h3>

                                                                    {renderDetails(log.details)}
                                                                </div>

                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                    <div className="rounded border border-(--border) bg-(--bg-white) p-3">
                                                                        <p className="text-[10px] font-semibold uppercase tracking-wide text-(--text-muted)">
                                                                            IP Address
                                                                        </p>

                                                                        <p className="text-xs text-(--primary) mt-1 break-all">
                                                                            {log.ipAddress || "Unavailable"}
                                                                        </p>
                                                                    </div>

                                                                    <div className="rounded border border-(--border) bg-(--bg-white) p-3">
                                                                        <p className="text-[10px] font-semibold uppercase tracking-wide text-(--text-muted)">
                                                                            User Agent
                                                                        </p>

                                                                        <p className="text-xs text-(--primary) mt-1 break-all">
                                                                            {log.userAgent || "Unavailable"}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <p className="text-[10px] text-(--text-muted) break-all">
                                                                    Audit record ID: {log._id}
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    {pagination && pagination.total > 0 && (
                        <div className="px-5 py-3 border-t border-(--border) flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <p className="text-xs text-(--primary)">
                                Page{" "}
                                <span className="font-semibold">
                                    {pagination.page}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold">
                                    {pagination.totalPages}
                                </span>

                                <span className="mx-1">•</span>

                                {pagination.total} records
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    disabled={!canGoPrevious || loading || refreshing}
                                    aria-label="Previous page"
                                    className="w-8 h-8 rounded border border-(--border) flex items-center justify-center text-(--primary) hover:bg-(--bg-soft) disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={!canGoNext || loading || refreshing}
                                    aria-label="Next page"
                                    className="w-8 h-8 rounded border border-(--border) flex items-center justify-center text-(--primary) hover:bg-(--bg-soft) disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;