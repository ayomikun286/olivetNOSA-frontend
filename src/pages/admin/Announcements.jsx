
import React, { useEffect, useMemo, useState } from "react";
import {
  Megaphone,
  Plus,
  Search,
  Pencil,
  Trash2,
  Send,
  Archive,
  RotateCcw,
  X,
  CalendarDays,
  UserRound,
  RefreshCw,
  FileText,
  Upload,
  Copy,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard";
import AdminTable from "../../components/admin/AdminTable";
import Alert from "../../components/common/Alert";

import {
  createAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
  publishAnnouncement,
  archiveAnnouncement,
  restoreAnnouncement,
  deleteAnnouncement,
} from "../../services/authService";

const initialForm = {
  title: "",
  content: "",
};

const MAX_PDF_SIZE = 50 * 1024 * 1024;

const statusStyles = {
  draft: "bg-gray-100 text-gray-700",
  published: "bg-green-100 text-green-700",
  archived: "bg-amber-100 text-amber-700",
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getAnnouncementsFromResponse = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.announcements)) return response.announcements;
  if (Array.isArray(response?.data?.announcements)) {
    return response.data.announcements;
  }
  if (Array.isArray(response?.data)) return response.data;

  return [];
};

const getCreatorName = (announcement) => {
  const creator = announcement.createdBy;

  if (!creator) return "Unknown";

  if (typeof creator === "string") return "Unknown";

  return [creator.firstName, creator.lastName]
    .filter(Boolean)
    .join(" ") || "Unknown";
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [form, setForm] = useState(initialForm);

  // PDF attachment state
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [removeExistingPdf, setRemoveExistingPdf] = useState(false);

  const [alert, setAlert] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Adjust this lookup if your authentication system stores the user elsewhere.
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const isSuperAdmin = storedUser?.role === "superAdmin";

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const handleCopyAnnouncementLink = async (announcement) => {
    try {
      const link = `${window.location.origin}/portal/member/dashboard/announcements/${announcement._id}`;

      await navigator.clipboard.writeText(link);

      showAlert(
        "success",
        "Announcement link copied successfully. You can now share it."
      );
    } catch (error) {
      showAlert(
        "error",
        "Unable to copy the announcement link. Please try again."
      );
    }
  };

  const loadAnnouncements = async () => {
    try {
      setLoading(true);

      const response = await getAllAnnouncements();

      setAnnouncements(getAnnouncementsFromResponse(response));
    } catch (error) {
      showAlert(
        "error",
        error.message || "Failed to load announcements."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const stats = useMemo(() => ({
    total: announcements.length,
    published: announcements.filter(
      (item) => item.status === "published"
    ).length,
    drafts: announcements.filter(
      (item) => item.status === "draft"
    ).length,
    archived: announcements.filter(
      (item) => item.status === "archived"
    ).length,
  }), [announcements]);

  const filteredAnnouncements = useMemo(() => {
    const query = search.trim().toLowerCase();

    return announcements.filter((item) => {
      const matchesSearch =
        !query ||
        [item.title, item.content, getCreatorName(item)].some((value) =>
          String(value || "").toLowerCase().includes(query)
        );

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [announcements, search, statusFilter]);

  const resetAttachmentState = () => {
    setSelectedPdf(null);
    setRemoveExistingPdf(false);
  };

  const openCreateModal = () => {
    setEditingAnnouncement(null);
    setForm(initialForm);
    resetAttachmentState();
    setModalOpen(true);
  };

  const openEditModal = (announcement) => {
    setEditingAnnouncement(announcement);

    setForm({
      title: announcement.title || "",
      content: announcement.content || "",
    });

    resetAttachmentState();
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingAnnouncement(null);
    setForm(initialForm);
    resetAttachmentState();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handlePdfChange = (event) => {
    const file = event.target.files?.[0];

    // Allow selecting the same file again after clearing it.
    event.target.value = "";

    if (!file) return;

    const isPdf =
      file.type === "application/pdf" &&
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      showAlert("error", "Only PDF files are allowed.");
      return;
    }

    if (file.size > MAX_PDF_SIZE) {
      showAlert("error", "PDF file must not exceed 20 MB.");
      return;
    }

    setSelectedPdf(file);
    setRemoveExistingPdf(false);
  };

  const handleRemoveSelectedPdf = () => {
    setSelectedPdf(null);
  };

  const handleRemoveExistingPdf = () => {
    setRemoveExistingPdf(true);
    setSelectedPdf(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      showAlert("error", "Title and content are required.");
      return;
    }

    try {
      setSaving(true);

      const payload = new FormData();

      payload.append("title", form.title.trim());
      payload.append("content", form.content.trim());

      if (selectedPdf) {
        payload.append("attachment", selectedPdf);
      } else if (editingAnnouncement && removeExistingPdf) {
        payload.append("removeAttachment", "true");
      }

      if (editingAnnouncement) {
        await updateAnnouncement(editingAnnouncement._id, payload);
        showAlert("success", "Announcement updated successfully.");
      } else {
        await createAnnouncement(payload);
        showAlert("success", "Announcement saved as draft successfully.");
      }

      setModalOpen(false);
      setEditingAnnouncement(null);
      setForm(initialForm);
      resetAttachmentState();

      await loadAnnouncements();
    } catch (error) {
      showAlert(
        "error",
        error.message || "Unable to save announcement."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleStatusAction = async (announcement, action) => {
    const actionKey = `${announcement._id}-${action}`;

    try {
      setActionLoading(actionKey);

      if (action === "publish") {
        await publishAnnouncement(announcement._id);

        try {
          const link = `${window.location.origin}/portal/member/dashboard/announcements/${announcement._id}`;
          await navigator.clipboard.writeText(link);

          showAlert(
            "success",
            "Announcement published successfully. Its link has been copied!"
          );
        } catch {
          showAlert(
            "success",
            "Announcement published successfully. Use Copy Link to share it."
          );
        }
      }

      if (action === "archive") {
        await archiveAnnouncement(announcement._id);
        showAlert("success", "Announcement archived successfully.");
      }

      if (action === "restore") {
        await restoreAnnouncement(announcement._id);
        showAlert(
          "success",
          "Announcement restored as draft successfully."
        );
      }

      await loadAnnouncements();
    } catch (error) {
      showAlert(
        "error",
        error.message || "Unable to update announcement."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || !isSuperAdmin) return;

    try {
      setActionLoading(deleteTarget._id);

      await deleteAnnouncement(deleteTarget._id);

      setAnnouncements((current) =>
        current.filter((item) => item._id !== deleteTarget._id)
      );

      setDeleteTarget(null);
      showAlert("success", "Announcement deleted successfully.");
    } catch (error) {
      showAlert(
        "error",
        error.message || "Unable to delete announcement."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const columns = [
    {
      key: "title",
      label: "ANNOUNCEMENT",
      render: (item) => (
        <div className="min-w-[200px] max-w-[320px]">
          <p className="font-semibold text-(--primary) line-clamp-1">
            {item.title}
          </p>

          <p className="mt-1 text-xs text-(--secondary) line-clamp-2">
            {item.content}
          </p>

          {item.attachment?.url && (
            <span className="mt-1 inline-flex items-center gap-1 text-xs text-blue-600">
              <FileText size={13} />
              PDF attached
            </span>
          )}
        </div>
      ),
    },
    {
      key: "createdBy",
      label: "CREATED BY",
      render: (item) => (
        <div className="flex items-center gap-2 min-w-[130px]">
          <UserRound
            size={15}
            className="shrink-0 text-(--secondary)"
          />
          <span className="whitespace-nowrap">
            {getCreatorName(item)}
          </span>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "DATE CREATED",
      render: (item) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <CalendarDays size={14} className="text-(--secondary)" />
          {formatDate(item.createdAt)}
        </div>
      ),
    },
    {
      key: "status",
      label: "STATUS",
      render: (item) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[item.status] || statusStyles.draft
            }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: "publishedAt",
      label: "PUBLISHED",
      render: (item) => (
        <span className="whitespace-nowrap">
          {item.status === "published"
            ? formatDate(item.publishedAt)
            : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "ACTIONS",
      render: (item) => {
        const busy = actionLoading?.startsWith(`${item._id}-`);

        return (
          <div className="flex items-center gap-1.5">
            {item.status !== "archived" && (
              <button
                type="button"
                title="Edit announcement"
                onClick={() => openEditModal(item)}
                disabled={Boolean(actionLoading)}
                className="rounded-lg p-2 text-(--primary) hover:bg-(--bg-soft) disabled:opacity-50"
              >
                <Pencil size={16} />
              </button>
            )}

            {item.status === "draft" && (
              <button
                type="button"
                title="Publish announcement"
                onClick={() => handleStatusAction(item, "publish")}
                disabled={Boolean(actionLoading)}
                className="rounded-lg p-2 text-green-700 hover:bg-green-50 disabled:opacity-50"
              >
                {busy ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            )}
            {item.status === "published" && (
              <button
                type="button"
                title="Copy announcement link"
                onClick={() => handleCopyAnnouncementLink(item)}
                disabled={Boolean(actionLoading)}
                className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
              >
                <Copy size={16} />
              </button>
            )}

            {item.status === "published" && (
              <button
                type="button"
                title="Archive announcement"
                onClick={() => handleStatusAction(item, "archive")}
                disabled={Boolean(actionLoading)}
                className="rounded-lg p-2 text-amber-700 hover:bg-amber-50 disabled:opacity-50"
              >
                {busy ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Archive size={16} />
                )}
              </button>
            )}

            {item.status === "archived" && (
              <button
                type="button"
                title="Restore as draft"
                onClick={() => handleStatusAction(item, "restore")}
                disabled={Boolean(actionLoading)}
                className="rounded-lg p-2 text-blue-700 hover:bg-blue-50 disabled:opacity-50"
              >
                {busy ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <RotateCcw size={16} />
                )}
              </button>
            )}

            {isSuperAdmin && (
              <button
                type="button"
                title="Delete announcement"
                onClick={() => setDeleteTarget(item)}
                disabled={Boolean(actionLoading)}
                className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const inputClass =
    "w-full rounded border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm text-(--primary) outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500";

  const existingAttachment = editingAnnouncement?.attachment;

  return (
    <div className="space-y-6 p-4">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-(--primary)">
            Announcements
          </h1>

          <p className="mt-1 text-sm text-(--secondary)">
            Create and manage important updates for alumni members.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadAnnouncements}
            disabled={loading}
            title="Refresh announcements"
            className="inline-flex items-center justify-center gap-2 rounded border border-(--border) px-3 py-2.5 text-sm font-medium text-(--primary) hover:bg-(--bg-soft) disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded bg-(--primary) px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            <Plus size={18} />
            Create Announcement
          </button>
        </div>
      </div>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          icon={Megaphone}
          iconClass="text-blue-600"
          iconBg="bg-blue-50"
          label="Total Announcements"
          value={stats.total}
          description="All announcements created"
        />

        <AdminStatCard
          icon={Send}
          iconClass="text-green-600"
          iconBg="bg-green-50"
          label="Published"
          value={stats.published}
          description="Visible to approved members"
        />

        <AdminStatCard
          icon={Pencil}
          iconClass="text-amber-600"
          iconBg="bg-amber-50"
          label="Drafts"
          value={stats.drafts}
          description="Saved but not published"
        />

        <AdminStatCard
          icon={Archive}
          iconClass="text-gray-600"
          iconBg="bg-gray-100"
          label="Archived"
          value={stats.archived}
          description="Previously archived announcements"
        />
      </div>

      {/* Announcement table */}
      <div className="rounded border border-(--border) bg-(--bg-white)">
        <div className="flex flex-col gap-3 border-b border-(--border) p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-(--secondary)"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search announcements..."
              className={`${inputClass} pl-9`}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              ["all", "All"],
              ["published", "Published"],
              ["draft", "Drafts"],
              ["archived", "Archived"],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`rounded px-3 py-2 text-xs font-medium transition-colors ${statusFilter === value
                  ? "bg-(--primary) text-white"
                  : "bg-(--bg-soft) text-(--secondary) hover:text-(--primary)"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <AdminTable
          columns={columns}
          data={filteredAnnouncements}
          loading={loading}
          emptyMessage={
            search || statusFilter !== "all"
              ? "No announcements match your filters."
              : "No announcements have been created yet."
          }
        />

        <div className="border-t border-(--border) px-5 py-3 text-xs text-(--secondary)">
          Showing {filteredAnnouncements.length} of {announcements.length} announcements
        </div>
      </div>

      {/* Create / Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded bg-(--bg-white) shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-(--border) bg-(--bg-white) px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-(--primary)">
                  {editingAnnouncement
                    ? "Edit Announcement"
                    : "Create Announcement"}
                </h2>

                <p className="mt-1 text-xs text-(--secondary)">
                  {editingAnnouncement
                    ? "Update the announcement details."
                    : "Write an announcement for your alumni community."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-(--secondary) hover:bg-(--bg-soft)"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5">
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-(--primary)">
                  Announcement Title *
                </span>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  maxLength={150}
                  className={inputClass}
                  placeholder="Enter announcement title"
                />

                <span className="block text-right text-xs text-(--secondary)">
                  {form.title.length}/150
                </span>
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-(--primary)">
                  Announcement Content *
                </span>

                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  required
                  rows={10}
                  className={`${inputClass} resize-y`}
                  placeholder="Write your announcement here..."
                />
              </label>

              {/* PDF attachment */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-(--primary)">
                    PDF Attachment <span className="font-normal text-(--secondary)">(Optional)</span>
                  </p>

                  <p className="mt-1 text-xs text-(--secondary)">
                    Attach one PDF document. Maximum file size: 20 MB.
                  </p>
                </div>

                {/* Existing attachment */}
                {existingAttachment?.url && !removeExistingPdf && !selectedPdf && (
                  <div className="flex flex-col gap-3 rounded border border-(--border) bg-(--bg-soft) p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-red-50 text-red-600">
                        <FileText size={20} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-(--primary)">
                          {existingAttachment.fileName || "Attached PDF"}
                        </p>
                        <p className="text-xs text-(--secondary)">
                          Current attachment
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <a
                        href={existingAttachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-blue-600 hover:underline"
                      >
                        View PDF
                      </a>

                      <button
                        type="button"
                        onClick={handleRemoveExistingPdf}
                        className="text-xs font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                {/* Existing attachment marked for removal */}
                {existingAttachment?.url && removeExistingPdf && !selectedPdf && (
                  <div className="flex items-center justify-between gap-3 rounded border border-amber-200 bg-amber-50 p-3">
                    <div className="flex items-center gap-2 text-sm text-amber-800">
                      <FileText size={18} />
                      <span>Existing PDF will be removed when you save.</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setRemoveExistingPdf(false)}
                      className="shrink-0 text-xs font-semibold text-amber-800 hover:underline"
                    >
                      Undo
                    </button>
                  </div>
                )}

                {/* Newly selected PDF */}
                {selectedPdf && (
                  <div className="flex flex-col gap-3 rounded border border-blue-200 bg-blue-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white text-blue-600">
                        <FileText size={20} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-blue-900">
                          {selectedPdf.name}
                        </p>
                        <p className="text-xs text-blue-700">
                          {(selectedPdf.size / (1024 * 1024)).toFixed(2)} MB
                          {" · "}Ready to upload
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveSelectedPdf}
                      className="flex shrink-0 items-center gap-1 text-xs font-medium text-red-600 hover:underline"
                    >
                      <X size={14} />
                      Remove file
                    </button>
                  </div>
                )}

                {/* File picker */}
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded border border-dashed border-(--border) bg-(--bg-soft) px-4 py-5 text-center transition hover:border-blue-400 hover:bg-blue-50">
                  <Upload size={22} className="text-(--secondary)" />

                  <span className="text-sm font-medium text-(--primary)">
                    {selectedPdf || (existingAttachment?.url && !removeExistingPdf)
                      ? "Choose a different PDF"
                      : "Choose PDF file"}
                  </span>

                  <span className="text-xs text-(--secondary)">
                    PDF only · Maximum 20 MB
                  </span>

                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handlePdfChange}
                    disabled={saving}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="rounded border border-blue-100 bg-blue-50 p-3">
                <p className="text-xs leading-relaxed text-blue-800">
                  {editingAnnouncement
                    ? "Changes will be saved immediately. The current publication status will remain unchanged."
                    : "This announcement will be saved as a draft. You can review it and publish it when you're ready."}
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-(--border) pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded border border-(--border) px-4 py-2.5 text-sm font-medium text-(--primary) hover:bg-(--bg-soft)"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded bg-(--primary) px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingAnnouncement
                      ? "Save Changes"
                      : "Save as Draft"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded bg-(--bg-white) p-6 shadow-xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={21} />
            </div>

            <h2 className="text-lg font-semibold text-(--primary)">
              Delete announcement?
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-(--secondary)">
              Are you sure you want to permanently delete "
              {deleteTarget.title}"? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={Boolean(actionLoading)}
                className="rounded border border-(--border) px-4 py-2 text-sm text-(--primary) hover:bg-(--bg-soft)"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={Boolean(actionLoading)}
                className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                {actionLoading ? "Deleting..." : "Delete Announcement"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
