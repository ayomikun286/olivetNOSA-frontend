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
    Upload,
} from "lucide-react";

import {
    getAdminStewardshipReports,
    getStewardshipPresidents,
    createAdminStewardshipReport,
    archivePresidentStewardshipReports,
    restorePresidentStewardshipReports,
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
    if (!president) return "General Stewardship Reports";

    return [
        president.firstName,
        president.middleName,
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
    const [presidentUsers, setPresidentUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [presidentError, setPresidentError] = useState("");

    const [selectedPresidentId, setSelectedPresidentId] = useState("");

    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState("");
    const [actionSuccess, setActionSuccess] = useState("");

    // Upload form state
    const [uploadForm, setUploadForm] = useState({
        president: "",
        title: "",
        reportingMonth: "",
        reportingYear: new Date().getFullYear(),
        content: "",
        status: "draft",
    });

    const [pdfFile, setPdfFile] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState("");

    // Load all stewardship reports.
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

    // Load all users whose role is President.
    // Former Presidents are included because their role remains "president".
    const loadPresidents = useCallback(async () => {
        try {
            setPresidentError("");

            const result = await getStewardshipPresidents();

            setPresidentUsers(
                Array.isArray(result.data) ? result.data : []
            );
        } catch (error) {
            setPresidentError(
                error.message || "Unable to load Presidents."
            );
        }
    }, []);

    useEffect(() => {
        loadReports();
        loadPresidents();
    }, [loadReports, loadPresidents]);

    // Group reports by their assigned President, not their uploader.
    const presidents = useMemo(() => {
        const groups = new Map();

        // Start with all Presidents, including those with zero reports.
        presidentUsers.forEach((president) => {
            groups.set(String(president._id), {
                _id: String(president._id),
                president,
                reports: [],
            });
        });

        const generalReports = [];

        reports.forEach((report) => {
            const presidentId =
                report.president?._id || report.president;

            // Reports without an assigned President are general reports.
            if (!presidentId) {
                generalReports.push(report);
                return;
            }

            const normalizedId = String(presidentId);

            // Normally the President will already exist in the loaded list.
            // This fallback keeps reports visible if their President is
            // missing from the current President list.
            if (!groups.has(normalizedId)) {
                groups.set(normalizedId, {
                    _id: normalizedId,
                    president:
                        typeof report.president === "object"
                            ? report.president
                            : null,
                    reports: [],
                });
            }

            groups.get(normalizedId).reports.push(report);
        });

        const result = Array.from(groups.values());

        if (generalReports.length > 0) {
            result.push({
                _id: "general",
                president: null,
                reports: generalReports,
            });
        }

        return result.sort((a, b) => {
            if (a._id === "general") return 1;
            if (b._id === "general") return -1;

            return getPresidentName(a.president).localeCompare(
                getPresidentName(b.president)
            );
        });
    }, [presidentUsers, reports]);

    // Keep the selected President valid after reports refresh.
    useEffect(() => {
        if (!presidents.length) {
            setSelectedPresidentId("");
            return;
        }

        setSelectedPresidentId((previousId) => {
            if (
                previousId &&
                presidents.some(
                    (item) => item._id === previousId
                )
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

    const isGeneralGroup = selectedPresidentId === "general";

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

    // Upload a report as Super Admin.
    const handleUploadReport = async (e) => {
        e.preventDefault();

        setUploadError("");
        setUploadSuccess("");

        if (
            !uploadForm.title.trim() ||
            !uploadForm.reportingMonth ||
            !uploadForm.reportingYear ||
            !uploadForm.content.trim() ||
            !pdfFile
        ) {
            setUploadError(
                "Please complete all required fields and select a PDF."
            );
            return;
        }

        if (
            !pdfFile.name.toLowerCase().endsWith(".pdf")
        ) {
            setUploadError("Only PDF documents are allowed.");
            return;
        }

        const reportingYear = Number(uploadForm.reportingYear);
        const reportingMonth = Number(uploadForm.reportingMonth);

        if (
            !Number.isInteger(reportingYear) ||
            reportingYear < 2020
        ) {
            setUploadError("Please enter a valid reporting year.");
            return;
        }

        if (
            !Number.isInteger(reportingMonth) ||
            reportingMonth < 1 ||
            reportingMonth > 12
        ) {
            setUploadError("Please select a valid reporting month.");
            return;
        }

        try {
            setUploadLoading(true);

            const formData = new FormData();

            formData.append("title", uploadForm.title.trim());
            formData.append("reportingMonth", String(reportingMonth));
            formData.append("reportingYear", String(reportingYear));
            formData.append("content", uploadForm.content.trim());
            formData.append("status", uploadForm.status);
            formData.append("pdf", pdfFile);

            // Only append president when a President is selected.
            // Leaving it empty creates a general report.
            if (uploadForm.president) {
                formData.append("president", uploadForm.president);
            }

            const result = await createAdminStewardshipReport(formData);

            setUploadSuccess(
                result.message ||
                "Stewardship report uploaded successfully."
            );

            setUploadForm({
                president: "",
                title: "",
                reportingMonth: "",
                reportingYear: new Date().getFullYear(),
                content: "",
                status: "draft",
            });

            setPdfFile(null);

            const fileInput = document.getElementById(
                "stewardship-pdf-upload"
            );

            if (fileInput) {
                fileInput.value = "";
            }

            await loadReports();
        } catch (error) {
            setUploadError(
                error.message || "Unable to upload stewardship report."
            );
        } finally {
            setUploadLoading(false);
        }
    };

    const handleArchiveReports = async () => {
        if (
            !selectedPresidentId ||
            isGeneralGroup ||
            selectedStats.published === 0
        ) {
            return;
        }

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
        if (
            !selectedPresidentId ||
            isGeneralGroup ||
            selectedStats.archived === 0
        ) {
            return;
        }

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
                            Presidents. You can also upload reports on behalf
                            of any President or submit general reports without
                            assigning them to a President. Archived reports
                            remain available to Super Admin but are hidden
                            from members.
                        </p>
                    </div>
                </div>
            </div>

            {/* Upload Stewardship Report */}
            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="border-b border-(--border) px-5 py-4">
                    <div className="flex items-center gap-2">
                        <Upload
                            size={17}
                            className="text-(--primary)"
                        />

                        <h2 className="text-sm font-semibold text-(--primary)">
                            Upload Stewardship Report
                        </h2>
                    </div>

                    <p className="mt-1 text-xs text-(--secondary)">
                        Upload a report on behalf of a President or submit a general report.
                    </p>
                </div>

                <form
                    onSubmit={handleUploadReport}
                    className="space-y-4 p-5"
                >
                    {uploadError && (
                        <div className="rounded border border-(--danger) bg-(--danger-light) p-3">
                            <p className="text-xs text-(--danger)">
                                {uploadError}
                            </p>
                        </div>
                    )}

                    {uploadSuccess && (
                        <div className="rounded border border-(--success) bg-(--success-light) p-3">
                            <p className="text-xs text-(--success)">
                                {uploadSuccess}
                            </p>
                        </div>
                    )}

                    {presidentError && (
                        <div className="rounded border border-(--danger) bg-(--danger-light) p-3">
                            <p className="text-xs text-(--danger)">
                                {presidentError}
                            </p>

                            <button
                                type="button"
                                onClick={loadPresidents}
                                className="mt-2 text-xs font-medium text-(--danger) underline"
                            >
                                Retry loading Presidents
                            </button>
                        </div>
                    )}

                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                            Report Owner
                        </label>

                        <select
                            value={uploadForm.president}
                            onChange={(e) =>
                                setUploadForm((prev) => ({
                                    ...prev,
                                    president: e.target.value,
                                }))
                            }
                            className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs outline-none focus:border-(--primary)"
                        >
                            <option value="">
                                General Stewardship Report (Unassigned)
                            </option>

                            {presidentUsers.map((president) => (
                                <option
                                    key={president._id}
                                    value={president._id}
                                >
                                    {getPresidentName(president)}
                                </option>
                            ))}
                        </select>

                        <p className="mt-1 text-[11px] text-(--text-muted)">
                            Select a President to assign ownership, or leave it unassigned for a general report.
                        </p>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                            Report Title
                        </label>

                        <input
                            type="text"
                            maxLength={150}
                            required
                            value={uploadForm.title}
                            onChange={(e) =>
                                setUploadForm((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            placeholder="Enter report title"
                            className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs outline-none focus:border-(--primary)"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                Reporting Month
                            </label>

                            <select
                                required
                                value={uploadForm.reportingMonth}
                                onChange={(e) =>
                                    setUploadForm((prev) => ({
                                        ...prev,
                                        reportingMonth: e.target.value,
                                    }))
                                }
                                className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs outline-none focus:border-(--primary)"
                            >
                                <option value="">Select month</option>

                                {Array.from(
                                    { length: 12 },
                                    (_, i) => (
                                        <option
                                            key={i + 1}
                                            value={i + 1}
                                        >
                                            {getMonthName(i + 1)}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                Reporting Year
                            </label>

                            <input
                                type="number"
                                required
                                min="2020"
                                value={uploadForm.reportingYear}
                                onChange={(e) =>
                                    setUploadForm((prev) => ({
                                        ...prev,
                                        reportingYear: e.target.value,
                                    }))
                                }
                                className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs outline-none focus:border-(--primary)"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                            Report Description
                        </label>

                        <textarea
                            required
                            rows={4}
                            value={uploadForm.content}
                            onChange={(e) =>
                                setUploadForm((prev) => ({
                                    ...prev,
                                    content: e.target.value,
                                }))
                            }
                            placeholder="Enter a description of the stewardship report..."
                            className="w-full rounded border border-(--border) bg-(--bg-white) p-3 text-xs outline-none focus:border-(--primary)"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                            Report PDF
                        </label>

                        <input
                            id="stewardship-pdf-upload"
                            type="file"
                            accept=".pdf,application/pdf"
                            required
                            onChange={(e) =>
                                setPdfFile(e.target.files?.[0] || null)
                            }
                            className="block w-full rounded border border-(--border) bg-(--bg-white) p-2 text-xs"
                        />

                        {pdfFile && (
                            <p className="mt-1 text-[11px] text-(--secondary)">
                                Selected: {pdfFile.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                            Publication Status
                        </label>

                        <select
                            value={uploadForm.status}
                            onChange={(e) =>
                                setUploadForm((prev) => ({
                                    ...prev,
                                    status: e.target.value,
                                }))
                            }
                            className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs outline-none focus:border-(--primary)"
                        >
                            <option value="draft">Save as Draft</option>
                            <option value="published">Publish Immediately</option>
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={uploadLoading}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded bg-(--primary) px-5 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {uploadLoading ? (
                                <RefreshCw
                                    size={14}
                                    className="animate-spin"
                                />
                            ) : (
                                <FileCheck size={15} />
                            )}

                            {uploadLoading ? "Uploading..." : "Upload Report"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Overview */}
            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="flex flex-col gap-3 border-b border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Stewardship Overview
                        </h2>

                        <p className="mt-1 text-xs text-(--secondary)">
                            Summary of all stewardship reports.
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
                        Select a President or the general reports group to review stewardship submissions.
                    </p>
                </div>

                <div className="p-4">
                    {loading ? (
                        <div className="flex items-center justify-center gap-2 py-10 text-xs text-(--secondary)">
                            <RefreshCw
                                size={15}
                                className="animate-spin"
                            />

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
                                Reports and President records will appear here.
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
                                        className={`w-full rounded border p-4 text-left transition ${
                                            isSelected
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
                                                        {item.president?.email || (
                                                            item._id === "general"
                                                                ? "Reports without an assigned President"
                                                                : "No email available"
                                                        )}
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
                                    {isGeneralGroup
                                        ? "General reports that are not assigned to a specific President."
                                        : "Stewardship report history and archive controls."
                                    }
                                </p>
                            </div>

                            {!isGeneralGroup && (
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

                                        {actionLoading
                                            ? "Processing..."
                                            : "Archive Published"
                                        }
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

                                        {actionLoading
                                            ? "Processing..."
                                            : "Restore Archived"
                                        }
                                    </button>
                                </div>
                            )}
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
                                    {isGeneralGroup
                                        ? "There are no general stewardship reports."
                                        : "This President has no stewardship reports."
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded border border-(--border)">
                                <table className="w-full min-w-[650px] text-left">
                                    <thead className="bg-(--bg-soft)">
                                        <tr className="text-[11px] text-(--secondary)">
                                            <th className="px-4 py-3 font-medium">
                                                Report
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Reporting Period
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Status
                                            </th>

                                            <th className="px-4 py-3 font-medium">
                                                Last Updated
                                            </th>

                                            <th className="px-4 py-3 text-right font-medium">
                                                Document
                                            </th>
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

                                                        {report.createdBy && (
                                                            <p className="mt-1 text-[11px] text-(--text-muted)">
                                                                Uploaded by: {
                                                                    typeof report.createdBy === "object"
                                                                        ? getPresidentName(report.createdBy)
                                                                        : "User"
                                                                }
                                                            </p>
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-3 text-xs text-(--text-primary)">
                                                        {getMonthName(report.reportingMonth)}{" "}
                                                        {report.reportingYear}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`rounded px-2 py-1 text-[10px] font-medium ${
                                                                statusStyles[report.status] ||
                                                                "bg-(--bg-soft) text-(--secondary)"
                                                            }`}
                                                        >
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