
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FileText,
  Plus,
  X,
  CalendarDays,
  UserRound,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Pencil,
  Archive,
  RotateCcw,
  MoreVertical,
  Download,
  Eye,
  Upload,
  File,
  Clock3,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getPublishedStewardshipReports,
  getPresidentStewardshipReports,
  createStewardshipReport,
  updateStewardshipReport,
} from "../../services/authService";

import ContentLoading from "../../components/admin/ContentLoading";

// ============================================================
// HELPERS
// ============================================================

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const formatDate = (date) => {
  if (!date) return "Not published";

  return new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatReportingPeriod = (report) => {
  const month = MONTHS[Number(report.reportingMonth) - 1];

  return `${month || "Unknown month"} ${report.reportingYear}`;
};

const statusStyles = {
  published: "bg-green-500/10 text-green-700 border-green-500/20",
  draft: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  archived: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

const statusLabels = {
  published: "Published",
  draft: "Draft",
  archived: "Archived",
};

// ============================================================
// STATUS BADGE
// ============================================================

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
      statusStyles[status] || statusStyles.draft
    }`}
  >
    {statusLabels[status] || status}
  </span>
);

// ============================================================
// REPORT CARD
// ============================================================

const StewardshipReportCard = ({
  report,
  isPresident,
  onEdit,
  onPublish,
  onArchive,
  onRestore,
  busy,
}) => {
  const [showActions, setShowActions] = useState(false);

  const creator = report.createdBy
    ? `${report.createdBy.firstName || ""} ${report.createdBy.lastName || ""}`.trim()
    : "Association";

  return (
    <article className="overflow-visible rounded border border-(--border) bg-(--bg-white) transition hover:border-(--primary)/30">
      <div className="p-5">

        {/* HEADER */}

        <div className="flex items-start gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
            <FileText size={20} />
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-2">
              <h2 className="break-words text-base font-semibold text-(--primary)">
                {report.title}
              </h2>

              {isPresident && (
                <StatusBadge status={report.status} />
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">

              <span className="flex items-center gap-1.5 text-xs text-(--text-muted)">
                <CalendarDays size={13} />
                {formatReportingPeriod(report)}
              </span>

              <span className="flex items-center gap-1.5 text-xs text-(--text-muted)">
                <UserRound size={13} />
                {creator}
              </span>

              <span className="flex items-center gap-1.5 text-xs text-(--text-muted)">
                <Clock3 size={13} />
                {formatDate(report.publishedAt || report.createdAt)}
              </span>

            </div>
          </div>

          {/* PRESIDENT ACTIONS */}

          {isPresident && (
            <div className="relative shrink-0">

              <button
                type="button"
                onClick={() => setShowActions((prev) => !prev)}
                disabled={busy}
                className="flex h-8 w-8 items-center justify-center rounded text-(--text-muted) transition hover:bg-(--bg-light) hover:text-(--primary)"
              >
                <MoreVertical size={18} />
              </button>

              {showActions && (
                <>
                  <button
                    type="button"
                    aria-label="Close actions"
                    onClick={() => setShowActions(false)}
                    className="fixed inset-0 z-10 cursor-default"
                  />

                  <div className="absolute right-0 top-9 z-20 w-48 overflow-hidden rounded border border-(--border) bg-(--bg-white) py-1 shadow-lg">

                    {report.status !== "archived" && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowActions(false);
                          onEdit(report);
                        }}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs text-(--secondary) transition hover:bg-(--bg-light)"
                      >
                        <Pencil size={14} />
                        Edit report
                      </button>
                    )}

                    {report.status === "draft" && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowActions(false);
                          onPublish(report);
                        }}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs text-(--secondary) transition hover:bg-(--bg-light)"
                      >
                        <CheckCircle2 size={14} />
                        Publish report
                      </button>
                    )}

                    {report.status !== "archived" && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowActions(false);
                          onArchive(report);
                        }}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs text-(--secondary) transition hover:bg-(--bg-light)"
                      >
                        <Archive size={14} />
                        Archive report
                      </button>
                    )}

                    {report.status === "archived" && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowActions(false);
                          onRestore(report);
                        }}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs text-(--secondary) transition hover:bg-(--bg-light)"
                      >
                        <RotateCcw size={14} />
                        Restore as draft
                      </button>
                    )}

                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* CONTENT */}

        <div className="mt-5 border-t border-(--border) pt-4">

          <p className="whitespace-pre-line break-words text-sm leading-7 text-(--secondary)">
            {report.content}
          </p>

          {/* PDF */}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded border border-(--border) bg-(--bg-light) p-3">

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-(--danger)/10 text-(--danger)">
                <File size={17} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-(--secondary)">
                  Monthly Stewardship Report
                </p>

                <p className="mt-0.5 text-[11px] text-(--text-muted)">
                  PDF document
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">

              <a
                href={report.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-(--border) px-3 py-2 text-xs font-medium text-(--secondary) transition hover:border-(--primary) hover:text-(--primary)"
              >
                <Eye size={14} />
                View
              </a>

              <a
                href={report.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-1.5 rounded border border-(--primary) bg-(--primary) px-3 py-2 text-xs font-medium text-white transition hover:opacity-90"
              >
                <Download size={14} />
                Download
              </a>

            </div>
          </div>

        </div>
      </div>
    </article>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

const StewardshipReports = () => {
  const { user } = useAuth();

  const isPresident = user?.role === "president";

  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busy, setBusy] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [activeFilter, setActiveFilter] = useState("all");

  const [showDrawer, setShowDrawer] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    reportingMonth: "",
    reportingYear: new Date().getFullYear().toString(),
    content: "",
    pdf: null,
  });

  const [selectedFileName, setSelectedFileName] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // ==========================================================
  // LOAD REPORTS
  // ==========================================================

  const loadReports = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = isPresident
        ? await getPresidentStewardshipReports()
        : await getPublishedStewardshipReports();

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to load stewardship reports."
        );
      }

      setReports(response.data || []);
      

    } catch (error) {
      console.error("Load stewardship reports error:", error);

      setError(
        error.message || "Unable to load stewardship reports."
      );

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isPresident]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  // ==========================================================
  // FILTER REPORTS
  // ==========================================================

  const filteredReports = useMemo(() => {
    if (!isPresident || activeFilter === "all") {
      return reports;
    }

    return reports.filter(
      (report) => report.status === activeFilter
    );
  }, [reports, activeFilter, isPresident]);

  const counts = useMemo(() => ({
    all: reports.length,

    published: reports.filter(
      (item) => item.status === "published"
    ).length,

    draft: reports.filter(
      (item) => item.status === "draft"
    ).length,

    archived: reports.filter(
      (item) => item.status === "archived"
    ).length,
  }), [reports]);

  // ==========================================================
  // FORM HANDLERS
  // ==========================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setFormError("Only PDF documents are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setFormError("PDF file must not exceed 20MB.");
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      pdf: file,
    }));

    setSelectedFileName(file.name);
    setFormError("");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      reportingMonth: "",
      reportingYear: new Date().getFullYear().toString(),
      content: "",
      pdf: null,
    });

    setSelectedFileName("");
    setFormError("");
  };

  const openCreateDrawer = () => {
    setEditingReport(null);
    resetForm();
    setShowDrawer(true);
  };

  const openEditDrawer = (report) => {
    setEditingReport(report);

    setFormData({
      title: report.title,
      reportingMonth: String(report.reportingMonth),
      reportingYear: String(report.reportingYear),
      content: report.content,
      pdf: null,
    });

    setSelectedFileName("");
    setFormError("");
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    if (saving) return;

    setShowDrawer(false);
    setEditingReport(null);
    resetForm();
  };

  // ==========================================================
  // CREATE / UPDATE REPORT
  // ==========================================================

  const handleSave = async (e, status = "draft") => {
    e.preventDefault();

    if (!isPresident) return;

    if (
      !formData.title.trim() ||
      !formData.reportingMonth ||
      !formData.reportingYear ||
      !formData.content.trim()
    ) {
      setFormError("Please complete all required report details.");
      return;
    }

    if (!editingReport && !formData.pdf) {
      setFormError("Please upload the stewardship report PDF.");
      return;
    }

    if (formData.pdf && formData.pdf.type !== "application/pdf") {
      setFormError("Only PDF documents are allowed.");
      return;
    }

    try {
      setSaving(true);
      setFormError("");

      const payload = new FormData();

      payload.append("title", formData.title.trim());
      payload.append("reportingMonth", formData.reportingMonth);
      payload.append("reportingYear", formData.reportingYear);
      payload.append("content", formData.content.trim());

      if (formData.pdf) {
        payload.append("pdf", formData.pdf);
      }

      let response;

      if (editingReport) {
        response = await updateStewardshipReport(
          editingReport._id,
          payload
        );
      } else {
        payload.append("status", status);

        response = await createStewardshipReport(payload);
      }

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to save stewardship report."
        );
      }

      setShowDrawer(false);
      setEditingReport(null);
      resetForm();

      setSuccessMessage(
        editingReport
          ? "Stewardship report updated successfully."
          : status === "published"
            ? "Stewardship report published successfully."
            : "Stewardship report saved as a draft."
      );

      await loadReports(true);

    } catch (error) {
      console.error("Save stewardship report error:", error);

      setFormError(
        error.message || "Unable to save stewardship report."
      );

    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // UPDATE REPORT STATUS
  // ==========================================================

  const handleStatusChange = async (report, status, confirmation) => {
    if (!window.confirm(confirmation)) return;

    try {
      setBusy(true);
      setError("");

      const payload = new FormData();
      payload.append("status", status);

      const response = await updateStewardshipReport(
        report._id,
        payload
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to update report status."
        );
      }

      const messages = {
        published: "Stewardship report published successfully.",
        archived: "Stewardship report archived successfully.",
        draft: "Stewardship report restored as draft.",
      };

      setSuccessMessage(messages[status]);

      await loadReports(true);

    } catch (error) {
      console.error("Update report status error:", error);

      setError(error.message || "Unable to update report status.");

    } finally {
      setBusy(false);
    }
  };

  const handlePublish = (report) => {
    handleStatusChange(
      report,
      "published",
      `Publish "${report.title}" now?`
    );
  };

  const handleArchive = (report) => {
    handleStatusChange(
      report,
      "archived",
      `Archive "${report.title}"?`
    );
  };

  const handleRestore = (report) => {
    handleStatusChange(
      report,
      "draft",
      `Restore "${report.title}" as a draft?`
    );
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return <ContentLoading />;
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="p-4">
      <div className="space-y-5">

        {/* PAGE HEADER */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-xl font-semibold text-(--primary)">
              Stewardship Reports
            </h1>

            <p className="mt-1 text-sm text-(--secondary)">
              Monthly reports and updates on the association's stewardship and activities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <div className="flex items-center gap-2 text-xs text-(--secondary)">
              <FileText size={15} />

              <span>
                {isPresident
                  ? `${counts.all} total reports`
                  : `${reports.length} ${reports.length === 1 ? "report" : "reports"}`}
              </span>
            </div>

            {isPresident && (
              <button
                type="button"
                onClick={openCreateDrawer}
                className="inline-flex items-center justify-center gap-2 rounded border border-(--primary) bg-(--primary) px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                <Plus size={16} />
                Create Report
              </button>
            )}

          </div>
        </div>

        {/* SUCCESS */}

        {successMessage && (
          <div className="flex items-center justify-between gap-3 rounded border border-(--success)/20 bg-(--success)/5 px-4 py-3">

            <div className="flex items-center gap-2 text-sm text-(--success)">
              <CheckCircle2 size={17} />
              {successMessage}
            </div>

            <button
              type="button"
              onClick={() => setSuccessMessage("")}
              className="text-(--success)"
            >
              <X size={16} />
            </button>

          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="rounded border border-(--danger)/20 bg-(--danger)/5 p-4">

            <div className="flex items-start gap-3">

              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0 text-(--danger)"
              />

              <div className="flex-1">
                <p className="text-sm text-(--danger)">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => loadReports(true)}
                  className="mt-2 text-xs font-semibold text-(--danger) underline"
                >
                  Try again
                </button>
              </div>

              <button
                type="button"
                onClick={() => setError("")}
                className="text-(--danger)"
              >
                <X size={16} />
              </button>

            </div>
          </div>
        )}

        {/* PRESIDENT FILTERS */}

        {isPresident && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--border) pb-3">

            <div className="flex flex-wrap gap-2">

              {[
                { key: "all", label: "All", count: counts.all },
                { key: "published", label: "Published", count: counts.published },
                { key: "draft", label: "Drafts", count: counts.draft },
                { key: "archived", label: "Archived", count: counts.archived },
              ].map((filter) => (

                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`rounded border px-3 py-2 text-xs font-medium transition ${
                    activeFilter === filter.key
                      ? "border-(--primary) bg-(--primary) text-white"
                      : "border-(--border) text-(--secondary) hover:border-(--primary)/40"
                  }`}
                >
                  {filter.label}

                  <span className="ml-1.5 opacity-70">
                    {filter.count}
                  </span>
                </button>

              ))}

            </div>

            <button
              type="button"
              onClick={() => loadReports(true)}
              disabled={refreshing || busy}
              className="inline-flex items-center gap-2 text-xs font-medium text-(--secondary) transition hover:text-(--primary) disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

          </div>
        )}

        {/* MEMBER REFRESH */}

        {!isPresident && (
          <div className="flex justify-end border-b border-(--border) pb-3">

            <button
              type="button"
              onClick={() => loadReports(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 text-xs font-medium text-(--secondary) transition hover:text-(--primary) disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

          </div>
        )}

        {/* REPORT LIST */}

        {!error && filteredReports.length > 0 && (
          <div className="space-y-3">

            {filteredReports.map((report) => (
              <StewardshipReportCard
                key={report._id}
                report={report}
                isPresident={isPresident}
                onEdit={openEditDrawer}
                onPublish={handlePublish}
                onArchive={handleArchive}
                onRestore={handleRestore}
                busy={busy}
              />
            ))}

          </div>
        )}

        {/* EMPTY STATE */}

        {!error && filteredReports.length === 0 && (
          <div className="rounded border border-(--border) bg-(--bg-white) px-5 py-14 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--primary-light) text-(--primary)">
              <FileText size={21} />
            </div>

            <h3 className="mt-4 font-semibold text-(--primary)">
              {isPresident && activeFilter !== "all"
                ? `No ${activeFilter} reports`
                : "No stewardship reports yet"}
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm text-(--secondary)">
              {isPresident
                ? "There are no stewardship reports in this category yet."
                : "There are currently no published stewardship reports. Please check back later."}
            </p>

            {isPresident && activeFilter === "all" && (
              <button
                type="button"
                onClick={openCreateDrawer}
                className="mt-5 inline-flex items-center gap-2 rounded border border-(--primary) px-4 py-2 text-sm font-medium text-(--primary) transition hover:bg-(--primary) hover:text-white"
              >
                <Plus size={16} />
                Create Report
              </button>
            )}

          </div>
        )}

      </div>

      {/* ======================================================
          CREATE / EDIT DRAWER
      ====================================================== */}

      {showDrawer && isPresident && (
        <div className="fixed inset-0 z-50">

          <button
            type="button"
            aria-label="Close report form"
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/30"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-hidden bg-(--bg-white) shadow-xl">

            {/* HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-(--border) px-5 py-4">

              <div className="flex items-center gap-2">

                <FileText size={18} className="text-(--primary)" />

                <div>
                  <h2 className="text-sm font-semibold text-(--primary)">
                    {editingReport ? "Edit Stewardship Report" : "Create Stewardship Report"}
                  </h2>

                  <p className="mt-0.5 text-xs text-(--text-muted)">
                    {editingReport
                      ? "Update report details or replace the PDF."
                      : "Prepare a monthly report for association members."}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={closeDrawer}
                disabled={saving}
                className="flex h-8 w-8 items-center justify-center rounded text-(--text-muted) transition hover:bg-(--bg-light) hover:text-(--primary) disabled:opacity-50"
              >
                <X size={18} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={(e) => handleSave(e, "published")}
              className="flex min-h-0 flex-1 flex-col"
            >

              <div className="flex-1 space-y-5 overflow-y-auto p-5">

                {formError && (
                  <div className="flex items-start gap-2 rounded border border-(--danger)/20 bg-(--danger)/5 p-3">

                    <AlertCircle
                      size={16}
                      className="mt-0.5 shrink-0 text-(--danger)"
                    />

                    <p className="text-sm text-(--danger)">
                      {formError}
                    </p>

                  </div>
                )}

                {/* TITLE */}

                <div>
                  <label
                    htmlFor="report-title"
                    className="mb-2 block text-xs font-medium text-(--secondary)"
                  >
                    Report Title
                    <span className="ml-1 text-(--danger)">*</span>
                  </label>

                  <input
                    id="report-title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. President's Monthly Stewardship Report"
                    maxLength={150}
                    required
                    disabled={saving}
                    className="w-full rounded border border-(--border) bg-transparent px-3 py-3 text-sm text-(--secondary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) disabled:opacity-60"
                  />

                  <p className="mt-1 text-right text-[11px] text-(--text-muted)">
                    {formData.title.length}/150
                  </p>
                </div>

                {/* REPORTING PERIOD */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="report-month"
                      className="mb-2 block text-xs font-medium text-(--secondary)"
                    >
                      Reporting Month
                      <span className="ml-1 text-(--danger)">*</span>
                    </label>

                    <select
                      id="report-month"
                      name="reportingMonth"
                      value={formData.reportingMonth}
                      onChange={handleInputChange}
                      required
                      disabled={saving}
                      className="w-full rounded border border-(--border) bg-(--bg-white) px-3 py-3 text-sm text-(--secondary) outline-none focus:border-(--primary) disabled:opacity-60"
                    >
                      <option value="">Select month</option>

                      {MONTHS.map((month, index) => (
                        <option key={month} value={index + 1}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="report-year"
                      className="mb-2 block text-xs font-medium text-(--secondary)"
                    >
                      Reporting Year
                      <span className="ml-1 text-(--danger)">*</span>
                    </label>

                    <input
                      id="report-year"
                      type="number"
                      name="reportingYear"
                      value={formData.reportingYear}
                      onChange={handleInputChange}
                      min="2020"
                      max="2100"
                      required
                      disabled={saving}
                      className="w-full rounded border border-(--border) bg-transparent px-3 py-3 text-sm text-(--secondary) outline-none focus:border-(--primary) disabled:opacity-60"
                    />
                  </div>

                </div>

                {/* DESCRIPTION */}

                <div>
                  <label
                    htmlFor="report-content"
                    className="mb-2 block text-xs font-medium text-(--secondary)"
                  >
                    Report Description
                    <span className="ml-1 text-(--danger)">*</span>
                  </label>

                  <textarea
                    id="report-content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Provide a brief summary of this month's stewardship activities..."
                    rows={7}
                    required
                    disabled={saving}
                    className="w-full resize-y rounded border border-(--border) bg-transparent px-3 py-3 text-sm leading-7 text-(--secondary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) disabled:opacity-60"
                  />

                </div>

                {/* PDF UPLOAD */}

                <div>
                  <label
                    htmlFor="report-pdf"
                    className="mb-2 block text-xs font-medium text-(--secondary)"
                  >
                    Report PDF
                    {!editingReport && (
                      <span className="ml-1 text-(--danger)">*</span>
                    )}
                  </label>

                  <label
                    htmlFor="report-pdf"
                    className="flex cursor-pointer flex-col items-center justify-center rounded border border-dashed border-(--border) bg-(--bg-light) px-4 py-7 text-center transition hover:border-(--primary)"
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded bg-(--danger)/10 text-(--danger)">
                      <Upload size={20} />
                    </div>

                    <p className="mt-3 text-sm font-medium text-(--secondary)">
                      {selectedFileName || (
                        editingReport
                          ? "Choose a replacement PDF"
                          : "Choose your PDF document"
                      )}
                    </p>

                    <p className="mt-1 text-xs text-(--text-muted)">
                      PDF only · Maximum file size: 20MB
                    </p>

                    <input
                      id="report-pdf"
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={handleFileChange}
                      disabled={saving}
                      className="sr-only"
                    />

                  </label>

                  {editingReport && (
                    <p className="mt-2 text-xs text-(--text-muted)">
                      Leave this empty to keep the existing PDF.
                    </p>
                  )}
                </div>

                {/* NOTICE */}

                <div className="flex items-start gap-3 rounded border border-(--border) bg-(--bg-light) p-3">

                  <Eye
                    size={17}
                    className="mt-0.5 shrink-0 text-(--primary)"
                  />

                  <p className="text-xs leading-5 text-(--secondary)">
                    Published reports become visible to authenticated
                    association members. Drafts remain available only
                    in the President's management section.
                  </p>

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-(--border) bg-(--bg-white) px-5 py-4">

                <button
                  type="button"
                  onClick={closeDrawer}
                  disabled={saving}
                  className="rounded border border-(--border) px-4 py-2.5 text-sm font-medium text-(--secondary) transition hover:bg-(--bg-light) disabled:opacity-50"
                >
                  Cancel
                </button>

                {!editingReport && (
                  <button
                    type="button"
                    onClick={(e) => handleSave(e, "draft")}
                    disabled={
                      saving ||
                      !formData.title.trim() ||
                      !formData.reportingMonth ||
                      !formData.reportingYear ||
                      !formData.content.trim() ||
                      !formData.pdf
                    }
                    className="inline-flex items-center justify-center gap-2 rounded border border-(--border) px-4 py-2.5 text-sm font-medium text-(--secondary) transition hover:bg-(--bg-light) disabled:opacity-50"
                  >
                    <FileText size={15} />
                    Save Draft
                  </button>
                )}

                <button
                  type="submit"
                  disabled={
                    saving ||
                    !formData.title.trim() ||
                    !formData.reportingMonth ||
                    !formData.reportingYear ||
                    !formData.content.trim() ||
                    (!editingReport && !formData.pdf)
                  }
                  className="inline-flex items-center justify-center gap-2 rounded border border-(--primary) bg-(--primary) px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {saving ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {editingReport ? (
                        <>
                          <CheckCircle2 size={15} />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={15} />
                          Publish Now
                        </>
                      )}
                    </>
                  )}

                </button>

              </div>
            </form>

          </aside>
        </div>
      )}

    </div>
  );
};

export default StewardshipReports;
