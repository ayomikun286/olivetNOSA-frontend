
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    History,
    ShieldCheck,
    FileText,
    FileCheck,
    Archive,
    RefreshCw,
    UserRound,
    Eye,
    ExternalLink,
} from "lucide-react";

import {
    getAdminStewardshipReports,
    archivePresidentStewardshipReports,
    restorePresidentStewardshipReports,
    getAdminPresidentialTenures
} from "../../services/adminService.js";

const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const getMonthName = (month) => {
    return new Date(2000, month - 1).toLocaleString("en-US", {
        month: "long",
    });
};

const getPresidentName = (president) => {
    if (!president) return "Unknown President";

    return [
        president.firstName,
        president.lastName,
    ].filter(Boolean).join(" ") || "Unknown President";
};

const statusStyles = {
    published: "bg-(--success-light) text-(--success)",
    draft: "bg-(--bg-soft) text-(--secondary)",
    archived: "bg-(--danger-light) text-(--danger)",
};

const StewardshipManagement = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const [currentPresidentId, setCurrentPresidentId] = useState("");
    const [selectedPresidentId, setSelectedPresidentId] = useState("");

    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState("");
    const [actionSuccess, setActionSuccess] = useState("");

    const loadReports = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getAdminStewardshipReports();

            setReports(
                Array.isArray(result.data) ? result.data : []
            );
        } catch (error) {
            setError(
                error.message || "Unable to load stewardship reports."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadReports();
    }, [loadReports]);


    useEffect(() => {
        const loadCurrentPresident = async () => {
            try {
                const result = await getAdminPresidentialTenures();

                const activeTenure = result.tenures?.find(
                    (tenure) => tenure.status === "active"
                );

                setCurrentPresidentId(
                    activeTenure?.president?._id || ""
                );
            } catch (error) {
                console.error("Unable to identify current President:", error);
            }
        };

        loadCurrentPresident();
    }, []);

    // Group reports by the President who created them.
    const presidents = useMemo(() => {
        const grouped = new Map();

        reports.forEach((report) => {
            const president = report.createdBy;

            if (!president?._id) return;

            const presidentId = president._id;

            if (!grouped.has(presidentId)) {
                grouped.set(presidentId, {
                    _id: presidentId,
                    president,
                    reports: [],
                });
            }

            grouped.get(presidentId).reports.push(report);
        });

        return Array.from(grouped.values()).sort((a, b) => {
            if (a._id === currentPresidentId) return -1;
            if (b._id === currentPresidentId) return 1;

            return getPresidentName(a.president).localeCompare(
                getPresidentName(b.president)
            );
        });
    }, [reports,currentPresidentId]);

    useEffect(() => {
        if (!presidents.length) {
            setSelectedPresidentId("");
            return;
        }

        setSelectedPresidentId((previousId) => {
            if (
                previousId &&
                presidents.some((item) => item._id === previousId)
            ) {
                return previousId;
            }

            return presidents[0]._id;
        });
    }, [presidents]);

    const selectedPresident = presidents.find(
        (item) => item._id === selectedPresidentId
    );

    const selectedReports = selectedPresident?.reports || [];

    const selectedStats = useMemo(() => {
        return {
            total: selectedReports.length,
            published: selectedReports.filter(
                (report) => report.status === "published"
            ).length,
            draft: selectedReports.filter(
                (report) => report.status === "draft"
            ).length,
            archived: selectedReports.filter(
                (report) => report.status === "archived"
            ).length,
        };
    }, [selectedReports]);

    const overviewStats = useMemo(() => ({
        total: reports.length,
        published: reports.filter(
            (report) => report.status === "published"
        ).length,
        draft: reports.filter(
            (report) => report.status === "draft"
        ).length,
        archived: reports.filter(
            (report) => report.status === "archived"
        ).length,
    }), [reports]);

    const handleArchiveReports = async () => {
        if (!selectedPresidentId || selectedStats.published === 0) return;

        const presidentName = getPresidentName(
            selectedPresident?.president
        );

        const confirmed = window.confirm(
            `Archive all ${selectedStats.published} published stewardship report(s) belonging to ${presidentName}? These reports will no longer appear on the members' page.`
        );

        if (!confirmed) return;

        try {
            setActionLoading(true);
            setActionError("");
            setActionSuccess("");

            const result = await archivePresidentStewardshipReports(
                selectedPresidentId
            );

            setActionSuccess(
                result.message ||
                `${result.archivedCount || 0} report(s) archived successfully.`
            );

            await loadReports();
        } catch (error) {
            setActionError(
                error.message || "Unable to archive stewardship reports."
            );
        } finally {
            setActionLoading(false);
        }
    };

    const handleRestoreReports = async () => {
        if (!selectedPresidentId || selectedStats.archived === 0) return;

        const presidentName = getPresidentName(
            selectedPresident?.president
        );

        const confirmed = window.confirm(
            `Restore all ${selectedStats.archived} archived stewardship report(s) belonging to ${presidentName}? These reports will become visible to members again.`
        );

        if (!confirmed) return;

        try {
            setActionLoading(true);
            setActionError("");
            setActionSuccess("");

            const result = await restorePresidentStewardshipReports(
                selectedPresidentId
            );

            setActionSuccess(
                result.message ||
                `${result.restoredCount || 0} report(s) restored successfully.`
            );

            await loadReports();
        } catch (error) {
            setActionError(
                error.message || "Unable to restore stewardship reports."
            );
        } finally {
            setActionLoading(false);
        }
    };

    const overviewItems = [
        {
            title: "Total Reports",
            value: overviewStats.total,
            description: "All stewardship submissions",
            icon: FileText,
        },
        {
            title: "Published Reports",
            value: overviewStats.published,
            description: "Currently visible to members",
            icon: FileCheck,
        },
        {
            title: "Draft Reports",
            value: overviewStats.draft,
            description: "Unpublished submissions",
            icon: History,
        },
        {
            title: "Archived Reports",
            value: overviewStats.archived,
            description: "Hidden from members",
            icon: Archive,
        },
    ];

    return (
        <div className="space-y-6 p-4 sm:p-6">

            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <History
                            size={22}
                            className="text-(--primary)"
                        />

                        <h1 className="text-xl font-semibold text-(--primary)">
                            Stewardship Management
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-(--secondary)">
                        Manage presidential stewardship reports and historical archives.
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 self-start rounded border border-(--border) bg-(--bg-white) px-3 py-2">
                    <ShieldCheck
                        size={16}
                        className="text-(--primary)"
                    />

                    <span className="text-xs font-medium text-(--primary)">
                        Super Admin Management
                    </span>
                </div>
            </div>

            {/* Intro */}
            <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                        <Archive size={20} />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Presidential Stewardship Archive
                        </h2>

                        <p className="mt-1 max-w-2xl text-xs leading-5 text-(--secondary)">
                            Review reports submitted by current and previous
                            Presidents. Archive completed presidential reports
                            when necessary or restore archived reports to make
                            them visible to members again.
                        </p>
                    </div>
                </div>
            </div>

            {/* Overview */}
            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="flex flex-col gap-3 border-b border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Stewardship Overview
                        </h2>

                        <p className="mt-1 text-xs text-(--secondary)">
                            Summary of all presidential stewardship reports.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={loadReports}
                        disabled={loading || actionLoading}
                        className="inline-flex h-9 items-center justify-center gap-2 self-start rounded border border-(--border) px-3 text-xs font-medium text-(--primary) hover:bg-(--bg-soft) disabled:opacity-50"
                    >
                        <RefreshCw
                            size={14}
                            className={loading ? "animate-spin" : ""}
                        />
                        Refresh reports
                    </button>
                </div>

                {error ? (
                    <div className="p-5">
                        <div className="flex flex-col gap-3 rounded border border-(--danger) bg-(--danger-light) p-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-(--danger)">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={loadReports}
                                disabled={loading}
                                className="inline-flex h-8 items-center gap-2 self-start rounded border border-(--danger) px-3 text-xs font-medium text-(--danger) hover:bg-(--bg-white) disabled:opacity-50"
                            >
                                <RefreshCw size={13} />
                                Try again
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
                        {overviewItems.map((item) => {
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
                                        {loading ? "—" : item.value}
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

            {/* Presidential Reports */}
            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="border-b border-(--border) px-5 py-4">
                    <div className="flex items-center gap-2">
                        <UserRound
                            size={17}
                            className="text-(--primary)"
                        />

                        <h2 className="text-sm font-semibold text-(--primary)">
                            Presidential Reports
                        </h2>
                    </div>

                    <p className="mt-1 text-xs text-(--secondary)">
                        Select a President to review and manage their stewardship reports.
                    </p>
                </div>

                <div className="p-4">
                    {loading ? (
                        <div className="flex items-center justify-center gap-2 py-10 text-xs text-(--secondary)">
                            <RefreshCw size={15} className="animate-spin" />
                            Loading stewardship reports...
                        </div>
                    ) : presidents.length === 0 ? (
                        <div className="py-10 text-center">
                            <FileText
                                size={28}
                                className="mx-auto text-(--text-muted)"
                            />

                            <p className="mt-3 text-sm font-medium text-(--primary)">
                                No stewardship reports found
                            </p>

                            <p className="mt-1 text-xs text-(--secondary)">
                                Reports submitted by Presidents will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {presidents.map((item) => {
                                const isSelected =
                                    selectedPresidentId === item._id;

                                const published = item.reports.filter(
                                    (report) => report.status === "published"
                                ).length;

                                const archived = item.reports.filter(
                                    (report) => report.status === "archived"
                                ).length;

                                return (
                                    <button
                                        key={item._id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedPresidentId(item._id);
                                            setActionError("");
                                            setActionSuccess("");
                                        }}
                                        className={`w-full rounded border p-4 text-left transition ${isSelected
                                                ? "border-(--primary) bg-(--bg-soft)"
                                                : "border-(--border) hover:border-(--primary) hover:bg-(--bg-soft)"
                                            }`}
                                    >
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                                                    <UserRound size={18} />
                                                </div>

                                                <div>
                                                    <h3 className="text-sm font-semibold text-(--primary)">
                                                        {getPresidentName(item.president)}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-(--secondary)">
                                                        {item.president.email || "No email available"}
                                                    </p>

                                                    <p className="mt-2 text-[11px] text-(--text-muted)">
                                                        {item.reports.length} total report(s)
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="rounded bg-(--success-light) px-2.5 py-1 text-[10px] font-medium text-(--success)">
                                                    {published} Published
                                                </span>

                                                <span className="rounded bg-(--danger-light) px-2.5 py-1 text-[10px] font-medium text-(--danger)">
                                                    {archived} Archived
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

            {/* Selected President's Reports */}
            {selectedPresident && (
                <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                    <div className="flex flex-col gap-3 border-b border-(--border) px-5 py-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <History
                                        size={17}
                                        className="text-(--primary)"
                                    />

                                    <h2 className="text-sm font-semibold text-(--primary)">
                                        {getPresidentName(selectedPresident.president)}
                                    </h2>
                                </div>

                                <p className="mt-1 text-xs text-(--secondary)">
                                    Stewardship report history and archive controls.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={handleArchiveReports}
                                    disabled={
                                        actionLoading ||
                                        selectedStats.published === 0
                                    }
                                    className="inline-flex h-9 items-center justify-center gap-2 rounded border border-(--danger) px-3 text-xs font-medium text-(--danger) hover:bg-(--danger-light) disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Archive size={14} />
                                    {actionLoading ? "Processing..." : "Archive Published"}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleRestoreReports}
                                    disabled={
                                        actionLoading ||
                                        selectedStats.archived === 0
                                    }
                                    className="inline-flex h-9 items-center justify-center gap-2 rounded border border-(--success) px-3 text-xs font-medium text-(--success) hover:bg-(--success-light) disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <RefreshCw size={14} />
                                    {actionLoading ? "Processing..." : "Restore Archived"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        {actionError && (
                            <div className="mb-4 rounded border border-(--danger) bg-(--danger-light) p-3">
                                <p className="text-xs text-(--danger)">
                                    {actionError}
                                </p>
                            </div>
                        )}

                        {actionSuccess && (
                            <div className="mb-4 flex items-center justify-between gap-3 rounded border border-(--success) bg-(--success-light) px-4 py-3">
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

                        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {[
                                ["Total", selectedStats.total],
                                ["Published", selectedStats.published],
                                ["Drafts", selectedStats.draft],
                                ["Archived", selectedStats.archived],
                            ].map(([label, value]) => (
                                <div
                                    key={label}
                                    className="rounded border border-(--border) bg-(--bg-soft) p-3"
                                >
                                    <p className="text-[11px] text-(--secondary)">
                                        {label}
                                    </p>

                                    <p className="mt-1 text-lg font-semibold text-(--primary)">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {selectedReports.length === 0 ? (
                            <div className="rounded border border-dashed border-(--border) py-8 text-center">
                                <p className="text-xs text-(--secondary)">
                                    This President has no stewardship reports.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded border border-(--border)">
                                <table className="w-full min-w-[650px] text-left">
                                    <thead className="bg-(--bg-soft)">
                                        <tr className="text-[11px] text-(--secondary)">
                                            <th className="px-4 py-3 font-medium">Report</th>
                                            <th className="px-4 py-3 font-medium">Reporting Period</th>
                                            <th className="px-4 py-3 font-medium">Status</th>
                                            <th className="px-4 py-3 font-medium">Last Updated</th>
                                            <th className="px-4 py-3 text-right font-medium">Document</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-(--border)">
                                        {selectedReports
                                            .slice()
                                            .sort((a, b) =>
                                                (b.reportingYear - a.reportingYear) ||
                                                (b.reportingMonth - a.reportingMonth)
                                            )
                                            .map((report) => (
                                                <tr key={report._id}>
                                                    <td className="px-4 py-3">
                                                        <p className="text-xs font-medium text-(--primary)">
                                                            {report.title}
                                                        </p>

                                                        <p className="mt-1 text-[11px] text-(--text-muted)">
                                                            Created {formatDate(report.createdAt)}
                                                        </p>
                                                    </td>

                                                    <td className="px-4 py-3 text-xs text-(--text-primary)">
                                                        {getMonthName(report.reportingMonth)} {report.reportingYear}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <span className={`rounded px-2 py-1 text-[10px] font-medium ${statusStyles[report.status] ||
                                                            "bg-(--bg-soft) text-(--secondary)"
                                                            }`}>
                                                            {report.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-3 text-xs text-(--secondary)">
                                                        {formatDate(report.updatedAt)}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <div className="flex justify-end">
                                                            {report.pdfUrl ? (
                                                                <a
                                                                    href={report.pdfUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1.5 rounded border border-(--border) px-3 py-1.5 text-[11px] font-medium text-(--primary) hover:bg-(--bg-soft)"
                                                                >
                                                                    <Eye size={13} />
                                                                    View PDF
                                                                    <ExternalLink size={11} />
                                                                </a>
                                                            ) : (
                                                                <span className="text-[11px] text-(--text-muted)">
                                                                    No document
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StewardshipManagement;
