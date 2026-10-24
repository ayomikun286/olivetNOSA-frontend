
import React, { useCallback, useEffect, useState } from "react";
import {
  ClipboardCheck,
  Search,
  RefreshCw,
  Eye,
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Clock3,
  XCircle,
  ArrowLeft,
  UserRound,
  CalendarDays,
  MessageSquare,
  Check,
  Ban,
} from "lucide-react";

import {
  getAdminMemorialSubmissions,
  getAdminMemorialSubmissionById,
  reviewAdminMemorialSubmission,
} from "../../services/adminService.js";

const inputClass =
  "w-full min-w-0 rounded border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm text-(--primary) outline-none transition focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/15";

const mutedText = "text-sm text-(--text-muted)";

const getRecords = (result) =>
  Array.isArray(result)
    ? result
    : result?.data?.submissions ||
      result?.submissions ||
      result?.data ||
      [];

const getRecord = (result) =>
  result?.data?.submission ||
  result?.submission ||
  result?.data ||
  result;

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const TYPE_LABELS = {
  photograph: "Photograph",
  biography: "Biography",
  condolence: "Condolence",
  correction: "Correction",
  new_memorial: "New Memorial",
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString();
};

const getSubmitterName = (submission) => {
  const user = submission?.submittedBy;

  if (!user) return "Unknown member";

  const name = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || user.email || "Unknown member";
};

const MemorialSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("pending");
  const [submissionType, setSubmissionType] = useState("");

  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");

  const loadSubmissions = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getAdminMemorialSubmissions({
        search,
        status,
        submissionType,
      });

      setSubmissions(getRecords(result));
    } catch (err) {
      setError(err.message || "Unable to load memorial submissions.");
    } finally {
      setLoading(false);
    }
  }, [search, status, submissionType]);

  useEffect(() => {
    const timeout = setTimeout(loadSubmissions, 300);
    return () => clearTimeout(timeout);
  }, [loadSubmissions]);

  const openDetails = async (id) => {
    setError("");
    setSuccess("");
    setSelectedSubmission(null);
    setAdminNotes("");
    setReviewStatus("");

    try {
      const result = await getAdminMemorialSubmissionById(id);
      const submission = getRecord(result);

      if (!submission?._id) {
        throw new Error("The submission record could not be found.");
      }

      setSelectedSubmission(submission);
      setAdminNotes(submission.adminNotes || "");
      setDetailsOpen(true);
    } catch (err) {
      setError(err.message || "Unable to load submission details.");
    }
  };

  const closeDetails = () => {
    if (reviewing) return;

    setDetailsOpen(false);
    setSelectedSubmission(null);
    setAdminNotes("");
    setReviewStatus("");
  };

  const handleReview = async (nextStatus) => {
    if (!selectedSubmission?._id || reviewing) return;

    if (selectedSubmission.status !== "pending") {
      setError("This submission has already been reviewed.");
      return;
    }

    const actionLabel = nextStatus === "approved" ? "approve" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${actionLabel} this ${TYPE_LABELS[selectedSubmission.submissionType] || "memorial"} submission?`
    );

    if (!confirmed) return;

    setReviewing(true);
    setError("");
    setSuccess("");

    try {
      const result = await reviewAdminMemorialSubmission(
        selectedSubmission._id,
        {
          status: nextStatus,
          adminNotes,
        }
      );

      const message =
        result?.message ||
        `Submission ${nextStatus} successfully.`;

      setSuccess(message);
      setReviewStatus(nextStatus);

      setSelectedSubmission((previous) => ({
        ...previous,
        status: nextStatus,
        adminNotes: adminNotes.trim(),
        reviewedAt: new Date().toISOString(),
      }));

      await loadSubmissions();
    } catch (err) {
      setError(err.message || `Unable to ${actionLabel} submission.`);
    } finally {
      setReviewing(false);
    }
  };

  const statusBadge = (value) => {
    const config = {
      pending: {
        label: "Pending",
        className: "bg-(--bg-soft) text-(--text-muted)",
        icon: Clock3,
      },
      approved: {
        label: "Approved",
        className: "bg-(--success)/10 text-(--success)",
        icon: CheckCircle2,
      },
      rejected: {
        label: "Rejected",
        className: "bg-(--danger)/10 text-(--danger)",
        icon: XCircle,
      },
    };

    const item = config[value] || config.pending;
    const Icon = item.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium ${item.className}`}
      >
        <Icon size={13} />
        {item.label}
      </span>
    );
  };

  const pendingCount = submissions.filter(
    (item) => item.status === "pending"
  ).length;

  const approvedCount = submissions.filter(
    (item) => item.status === "approved"
  ).length;

  const rejectedCount = submissions.filter(
    (item) => item.status === "rejected"
  ).length;

  return (
    <div className="w-full min-w-0 space-y-5 overflow-hidden p-4">
      <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--secondary)">
            <ClipboardCheck size={22} />
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-(--primary)">
              Memorial Submissions
            </h1>
            <p className={`mt-1 ${mutedText}`}>
              Review member-submitted photographs, biographies, corrections,
              condolences, and new memorial records.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={loadSubmissions}
          disabled={loading || reviewing}
          className="inline-flex items-center justify-center gap-2 rounded border border-(--border) bg-(--bg-white) px-3 py-2 text-sm font-medium text-(--primary) transition hover:bg-(--bg-soft) disabled:opacity-60"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {error && (
        <div className="flex min-w-0 items-start gap-2 rounded border border-(--danger)/20 bg-(--danger)/5 p-3 text-sm text-(--danger)">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span className="min-w-0 break-words">{error}</span>
          <button
            type="button"
            onClick={() => setError("")}
            className="ml-auto shrink-0"
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {success && (
        <div className="flex min-w-0 items-start gap-2 rounded border border-(--success)/20 bg-(--success)/5 p-3 text-sm text-(--success)">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <span className="min-w-0 break-words">{success}</span>
          <button
            type="button"
            onClick={() => setSuccess("")}
            className="ml-auto shrink-0"
            aria-label="Dismiss success"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {!detailsOpen && (
        <>
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                label: "Pending in Results",
                value: pendingCount,
                icon: Clock3,
              },
              {
                label: "Approved in Results",
                value: approvedCount,
                icon: CheckCircle2,
              },
              {
                label: "Rejected in Results",
                value: rejectedCount,
                icon: XCircle,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded border border-(--border) bg-(--bg-white) p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--secondary)">
                    <Icon size={19} />
                  </div>
                  <div>
                    <p className={mutedText}>{item.label}</p>
                    <p className="mt-1 text-xl font-semibold text-(--primary)">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>

          <section className="space-y-4 rounded border border-(--border) bg-(--bg-white) p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_190px_210px]">
              <div className="relative min-w-0">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by suggested name..."
                  className={`${inputClass} pl-9`}
                />
              </div>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className={inputClass}
                aria-label="Filter by review status"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={submissionType}
                onChange={(event) => setSubmissionType(event.target.value)}
                className={inputClass}
                aria-label="Filter by submission type"
              >
                <option value="">All submission types</option>
                {Object.entries(TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-(--primary)">
                Submitted Records
              </h2>
              <span className={mutedText}>
                {submissions.length} submission
                {submissions.length === 1 ? "" : "s"}
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center gap-2 p-12 text-sm text-(--text-muted)">
                <RefreshCw size={17} className="animate-spin" />
                Loading submissions...
              </div>
            ) : submissions.length === 0 ? (
              <div className="rounded border border-dashed border-(--border) p-10 text-center">
                <ClipboardCheck
                  size={28}
                  className="mx-auto text-(--text-muted)"
                />
                <p className="mt-3 font-medium text-(--primary)">
                  No submissions found
                </p>
                <p className={`mt-1 ${mutedText}`}>
                  Try another filter or check back when members submit
                  memorial content.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-(--border) text-(--text-muted)">
                      <th className="px-3 py-3 font-medium">Submission</th>
                      <th className="px-3 py-3 font-medium">Submitted By</th>
                      <th className="px-3 py-3 font-medium">Date</th>
                      <th className="px-3 py-3 font-medium">Status</th>
                      <th className="px-3 py-3 text-right font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {submissions.map((submission) => (
                      <tr
                        key={submission._id}
                        className="border-b border-(--border) last:border-0"
                      >
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            {submission.photographs?.[0]?.url ? (
                              <img
                                src={submission.photographs[0].url}
                                alt=""
                                className="h-10 w-10 shrink-0 rounded object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--bg-soft) text-(--secondary)">
                                <ImageIcon size={18} />
                              </div>
                            )}

                            <div className="min-w-0">
                              <p className="break-words font-medium text-(--primary)">
                                {submission.suggestedFullName ||
                                  submission.memorial?.fullName ||
                                  TYPE_LABELS[submission.submissionType] ||
                                  "Memorial submission"}
                              </p>
                              <p className={`mt-0.5 ${mutedText}`}>
                                {TYPE_LABELS[submission.submissionType] ||
                                  submission.submissionType}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-3 text-(--primary)">
                          <p>{getSubmitterName(submission)}</p>
                          <p className={`mt-1 ${mutedText}`}>
                            {submission.submittedBy?.email || "—"}
                          </p>
                        </td>

                        <td className="px-3 py-3 text-(--primary)">
                          {formatDate(submission.createdAt)}
                        </td>

                        <td className="px-3 py-3">
                          {statusBadge(submission.status)}
                        </td>

                        <td className="px-3 py-3">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => openDetails(submission._id)}
                              title="Review submission"
                              className="inline-flex items-center gap-1.5 rounded border border-(--border) px-3 py-2 text-sm text-(--primary) transition hover:bg-(--bg-soft)"
                            >
                              <Eye size={15} />
                              Review
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      {detailsOpen && selectedSubmission && (
        <section className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
          <div className="flex items-center justify-between gap-3 border-b border-(--border) p-4">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={closeDetails}
                disabled={reviewing}
                className="rounded p-2 text-(--text-muted) hover:bg-(--bg-soft) disabled:opacity-50"
                aria-label="Back to submissions"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="min-w-0">
                <h2 className="font-semibold text-(--primary)">
                  Review Submission
                </h2>
                <p className={`mt-1 ${mutedText}`}>
                  Inspect the submitted information before making a decision.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeDetails}
              disabled={reviewing}
              className="rounded p-2 text-(--text-muted) hover:bg-(--bg-soft) disabled:opacity-50"
              aria-label="Close submission details"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-5 p-4">
            <div className="flex flex-wrap items-center gap-2">
              {statusBadge(selectedSubmission.status)}
              <span className="rounded bg-(--bg-soft) px-2.5 py-1 text-xs font-medium text-(--primary)">
                {TYPE_LABELS[selectedSubmission.submissionType] ||
                  selectedSubmission.submissionType}
              </span>
              <span className={`text-xs ${mutedText}`}>
                Submitted {formatDate(selectedSubmission.createdAt)}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded border border-(--border) p-3">
                <div className="flex items-center gap-2 text-(--text-muted)">
                  <UserRound size={16} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Submitted By
                  </span>
                </div>
                <p className="mt-2 font-medium text-(--primary)">
                  {getSubmitterName(selectedSubmission)}
                </p>
                <p className={`mt-1 break-all ${mutedText}`}>
                  {selectedSubmission.submittedBy?.email || "—"}
                </p>
              </div>

              <div className="rounded border border-(--border) p-3">
                <div className="flex items-center gap-2 text-(--text-muted)">
                  <CalendarDays size={16} />
                  <span className="text-xs font-medium uppercase tracking-wide">
                    Review Details
                  </span>
                </div>
                <p className="mt-2 text-sm text-(--primary)">
                  Reviewed: {formatDate(selectedSubmission.reviewedAt)}
                </p>
                {selectedSubmission.reviewedBy && (
                  <p className={`mt-1 ${mutedText}`}>
                    By {getSubmitterName({
                      submittedBy: selectedSubmission.reviewedBy,
                    })}
                  </p>
                )}
              </div>
            </div>

            {selectedSubmission.memorial && (
              <div className="rounded border border-(--border) p-3">
                <h3 className="text-sm font-medium text-(--primary)">
                  Related Memorial
                </h3>
                <p className={`mt-1 ${mutedText}`}>
                  {selectedSubmission.memorial.fullName}
                  {selectedSubmission.memorial.schoolSet
                    ? ` · ${selectedSubmission.memorial.schoolSet}`
                    : ""}
                </p>
              </div>
            )}

            {(selectedSubmission.suggestedFullName ||
              selectedSubmission.suggestedSchoolSet ||
              selectedSubmission.suggestedYearsAttended ||
              selectedSubmission.suggestedGraduationYear) && (
              <div className="space-y-3 rounded border border-(--border) p-4">
                <h3 className="font-semibold text-(--primary)">
                  Suggested Memorial Details
                </h3>

                {[
                  ["Full Name", selectedSubmission.suggestedFullName],
                  ["School Set", selectedSubmission.suggestedSchoolSet],
                  [
                    "Years Attended",
                    selectedSubmission.suggestedYearsAttended,
                  ],
                  [
                    "Graduation Year",
                    selectedSubmission.suggestedGraduationYear,
                  ],
                ]
                  .filter(([, value]) => value !== undefined && value !== null && value !== "")
                  .map(([label, value]) => (
                    <div key={label}>
                      <p className={`text-xs ${mutedText}`}>{label}</p>
                      <p className="mt-1 break-words text-sm text-(--primary)">
                        {String(value)}
                      </p>
                    </div>
                  ))}
              </div>
            )}

            <div>
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-(--primary)">
                <MessageSquare size={16} />
                Member's Message
              </h3>
              <div className="whitespace-pre-wrap break-words rounded border border-(--border) bg-(--bg-light) p-4 text-sm leading-6 text-(--primary)">
                {selectedSubmission.message || "No message provided."}
              </div>
            </div>

            {selectedSubmission.photographs?.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-(--primary)">
                  Submitted Photographs ({selectedSubmission.photographs.length})
                </h3>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {selectedSubmission.photographs.map((photo, index) => (
                    <a
                      key={photo.publicId || photo.url || index}
                      href={photo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group min-w-0 overflow-hidden rounded border border-(--border)"
                      title="Open photograph in a new tab"
                    >
                      {photo.url ? (
                        <img
                          src={photo.url}
                          alt={`Submitted photograph ${index + 1}`}
                          className="aspect-square w-full object-cover transition group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex aspect-square items-center justify-center text-(--text-muted)">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {selectedSubmission.reviewedBy && (
              <div className="rounded border border-(--border) p-3">
                <h3 className="text-sm font-medium text-(--primary)">
                  Previous Review Notes
                </h3>
                <p className="mt-1 whitespace-pre-wrap break-words text-sm text-(--text-muted)">
                  {selectedSubmission.adminNotes || "No review notes provided."}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="memorial-admin-notes"
                className="block text-sm font-medium text-(--primary)"
              >
                Admin Notes
              </label>
              <textarea
                id="memorial-admin-notes"
                rows={3}
                maxLength={2000}
                value={adminNotes}
                onChange={(event) => setAdminNotes(event.target.value)}
                disabled={reviewing || selectedSubmission.status !== "pending"}
                placeholder="Add a reason for rejection or internal review notes..."
                className={`${inputClass} resize-y disabled:opacity-70`}
              />
              <p className={`text-xs ${mutedText}`}>
                Optional. Notes are stored with the review decision.
              </p>
            </div>

            {selectedSubmission.submissionType === "new_memorial" &&
              selectedSubmission.status === "pending" && (
                <div className="rounded border border-(--secondary)/30 bg-(--bg-light) p-3 text-sm text-(--text-muted)">
                  Approving a new memorial creates an unpublished draft. After
                  approval, open Manage Memorials to review and publish it.
                </div>
              )}

            {selectedSubmission.submissionType === "condolence" &&
              selectedSubmission.status === "pending" && (
                <div className="rounded border border-(--secondary)/30 bg-(--bg-light) p-3 text-sm text-(--text-muted)">
                  Approval records this condolence as reviewed. It will not
                  appear publicly until a condolence display feature is implemented.
                </div>
              )}

            {selectedSubmission.status === "pending" ? (
              <div className="flex flex-col-reverse gap-3 border-t border-(--border) pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className={`text-xs ${mutedText}`}>
                  Review the information carefully before deciding.
                </p>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleReview("rejected")}
                    disabled={reviewing}
                    className="inline-flex items-center justify-center gap-2 rounded border border-(--danger)/30 px-4 py-2.5 text-sm font-medium text-(--danger) transition hover:bg-(--danger)/5 disabled:opacity-60"
                  >
                    {reviewing && reviewStatus === "rejected" ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Ban size={16} />
                    )}
                    Reject
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReview("approved")}
                    disabled={reviewing}
                    className="inline-flex items-center justify-center gap-2 rounded bg-(--primary) px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {reviewing && reviewStatus === "approved" ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Check size={16} />
                    )}
                    Approve
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end border-t border-(--border) pt-4">
                <button
                  type="button"
                  onClick={closeDetails}
                  className="rounded bg-(--primary) px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                >
                  Back to Submissions
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default MemorialSubmissions;
