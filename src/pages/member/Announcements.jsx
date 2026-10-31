
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Megaphone,
  Plus,
  X,
  CalendarDays,
  UserRound,
  Send,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  FileText,
  Pencil,
  Trash2,
  Archive,
  RotateCcw,
  Eye,
  MoreVertical,
  Clock3,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getAnnouncements,
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  publishAnnouncement,
  archiveAnnouncement,
  restoreAnnouncement,
  deleteAnnouncement,
} from "../../services/authService";

import ContentLoading from "../../components/admin/ContentLoading";

// ============================================================
// HELPERS
// ============================================================

const formatDate = (date) => {
  if (!date) return "Not published";

  return new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
// ANNOUNCEMENT CARD
// ============================================================

const AnnouncementCard = ({
  announcement,
  isPresident,
  onEdit,
  onPublish,
  onArchive,
  onRestore,
  onDelete,
  busy,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  return (
    <article className="overflow-visible rounded border border-(--border) bg-(--bg-white) transition hover:border-(--primary)/30">
      <div className="p-5">

        {/* CARD HEADER */}

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
            <Megaphone size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="break-words text-base font-semibold text-(--primary)">
                {announcement.title}
              </h2>

              {isPresident && (
                <StatusBadge status={announcement.status} />
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="flex items-center gap-1.5 text-xs text-(--text-muted)">
                <UserRound size={13} />

                {announcement.createdBy
                  ? `${announcement.createdBy.firstName || ""} ${announcement.createdBy.lastName || ""}`.trim()
                  : "Association"}
              </span>

              <span className="flex items-center gap-1.5 text-xs text-(--text-muted)">
                <CalendarDays size={13} />

                {formatDate(
                  announcement.publishedAt || announcement.createdAt
                )}
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

                    {announcement.status !== "archived" && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowActions(false);
                          onEdit(announcement);
                        }}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs text-(--secondary) transition hover:bg-(--bg-light)"
                      >
                        <Pencil size={14} />
                        Edit announcement
                      </button>
                    )}

                    {announcement.status === "draft" && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowActions(false);
                          onPublish(announcement);
                        }}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs text-(--secondary) transition hover:bg-(--bg-light)"
                      >
                        <Send size={14} />
                        Publish now
                      </button>
                    )}

                    {announcement.status !== "archived" && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowActions(false);
                          onArchive(announcement);
                        }}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs text-(--secondary) transition hover:bg-(--bg-light)"
                      >
                        <Archive size={14} />
                        Archive
                      </button>
                    )}

                    {announcement.status === "archived" && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowActions(false);
                          onRestore(announcement);
                        }}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs text-(--secondary) transition hover:bg-(--bg-light)"
                      >
                        <RotateCcw size={14} />
                        Restore as draft
                      </button>
                    )}

                    <div className="my-1 border-t border-(--border)" />

                    <button
                      type="button"
                      onClick={() => {
                        setShowActions(false);
                        onDelete(announcement);
                      }}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs text-(--danger) transition hover:bg-(--danger)/5"
                    >
                      <Trash2 size={14} />
                      Delete permanently
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* CARD CONTENT */}

        <div className="mt-5 border-t border-(--border) pt-4">
          <p
            className={`whitespace-pre-line break-words text-sm leading-7 text-(--secondary) ${
              expanded ? "" : "line-clamp-4"
            }`}
          >
            {announcement.content}
          </p>

          {announcement.content?.length > 220 && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-xs font-semibold text-(--primary) hover:opacity-75"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

const Announcements = () => {
  const { user } = useAuth();

 const isPresident = user?.role === "president";

  const [announcements, setAnnouncements] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busy, setBusy] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [activeFilter, setActiveFilter] = useState("all");

  const [showDrawer, setShowDrawer] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);

  // ==========================================================
  // LOAD ANNOUNCEMENTS
  // ==========================================================

  const loadAnnouncements = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = isPresident
        ? await getAllAnnouncements()
        : await getAnnouncements();

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to load announcements."
        );
      }

      setAnnouncements(response.announcements || []);
    } catch (error) {
      console.error("Load announcements error:", error);

      setError(error.message || "Unable to load announcements.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isPresident]);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  // ==========================================================
  // FILTER ANNOUNCEMENTS
  // ==========================================================

  const filteredAnnouncements = useMemo(() => {
    if (!isPresident || activeFilter === "all") {
      return announcements;
    }

    return announcements.filter(
      (announcement) => announcement.status === activeFilter
    );
  }, [announcements, activeFilter, isPresident]);

  const counts = useMemo(() => ({
    all: announcements.length,
    published: announcements.filter(
      (item) => item.status === "published"
    ).length,
    draft: announcements.filter(
      (item) => item.status === "draft"
    ).length,
    archived: announcements.filter(
      (item) => item.status === "archived"
    ).length,
  }), [announcements]);

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

  const openCreateDrawer = () => {
    setEditingAnnouncement(null);

    setFormData({
      title: "",
      content: "",
    });

    setFormError("");
    setShowDrawer(true);
  };

  const openEditDrawer = (announcement) => {
    setEditingAnnouncement(announcement);

    setFormData({
      title: announcement.title,
      content: announcement.content,
    });

    setFormError("");
    setShowDrawer(true);
  };

  const closeDrawer = () => {
    if (saving) return;

    setShowDrawer(false);
    setEditingAnnouncement(null);

    setFormData({
      title: "",
      content: "",
    });

    setFormError("");
  };

  // ==========================================================
  // CREATE / UPDATE ANNOUNCEMENT
  // ==========================================================

  const handleSave = async (e, status = "draft") => {
    e.preventDefault();

    if (!isPresident) return;

    if (!formData.title.trim() || !formData.content.trim()) {
      setFormError("Please provide both a title and announcement content.");
      return;
    }

    try {
      setSaving(true);
      setFormError("");

      let response;

      if (editingAnnouncement) {
        response = await updateAnnouncement(editingAnnouncement._id, {
          title: formData.title.trim(),
          content: formData.content.trim(),
        });
      } else {
        response = await createAnnouncement({
          title: formData.title.trim(),
          content: formData.content.trim(),
          status,
        });
      }

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to save announcement."
        );
      }

      closeDrawer();

      setSuccessMessage(
        editingAnnouncement
          ? "Announcement updated successfully."
          : status === "published"
            ? "Announcement published successfully."
            : "Announcement saved as draft."
      );

      await loadAnnouncements(true);
    } catch (error) {
      console.error("Save announcement error:", error);

      setFormError(error.message || "Unable to save announcement.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // PUBLISH ANNOUNCEMENT
  // ==========================================================

  const handlePublish = async (announcement) => {
    if (!window.confirm(`Publish "${announcement.title}" now?`)) return;

    try {
      setBusy(true);

      const response = await publishAnnouncement(announcement._id);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to publish announcement.");
      }

      setSuccessMessage("Announcement published successfully.");

      await loadAnnouncements(true);
    } catch (error) {
      setError(error.message || "Unable to publish announcement.");
    } finally {
      setBusy(false);
    }
  };

  // ==========================================================
  // ARCHIVE ANNOUNCEMENT
  // ==========================================================

  const handleArchive = async (announcement) => {
    if (!window.confirm(`Archive "${announcement.title}"?`)) return;

    try {
      setBusy(true);

      const response = await archiveAnnouncement(announcement._id);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to archive announcement.");
      }

      setSuccessMessage("Announcement archived successfully.");

      await loadAnnouncements(true);
    } catch (error) {
      setError(error.message || "Unable to archive announcement.");
    } finally {
      setBusy(false);
    }
  };

  // ==========================================================
  // RESTORE ANNOUNCEMENT
  // ==========================================================

  const handleRestore = async (announcement) => {
    if (!window.confirm(`Restore "${announcement.title}" as a draft?`)) return;

    try {
      setBusy(true);

      const response = await restoreAnnouncement(announcement._id);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to restore announcement.");
      }

      setSuccessMessage("Announcement restored as draft.");

      await loadAnnouncements(true);
    } catch (error) {
      setError(error.message || "Unable to restore announcement.");
    } finally {
      setBusy(false);
    }
  };

  // ==========================================================
  // DELETE ANNOUNCEMENT
  // ==========================================================

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setBusy(true);

      const response = await deleteAnnouncement(deleteTarget._id);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to delete announcement.");
      }

      setDeleteTarget(null);
      setSuccessMessage("Announcement permanently deleted.");

      await loadAnnouncements(true);
    } catch (error) {
      setError(error.message || "Unable to delete announcement.");
    } finally {
      setBusy(false);
    }
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
              Announcements
            </h1>

            <p className="mt-1 text-sm text-(--secondary)">
              Stay informed with the latest news and important updates
              from the association.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-(--secondary)">
              <Megaphone size={15} />

              <span>
                {isPresident
                  ? `${counts.all} total`
                  : `${announcements.length} ${announcements.length === 1 ? "announcement" : "announcements"}`}
              </span>
            </div>

            {isPresident && (
              <button
                type="button"
                onClick={openCreateDrawer}
                className="inline-flex items-center justify-center gap-2 rounded border border-(--primary) bg-(--primary) px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                <Plus size={16} />
                Create Announcement
              </button>
            )}
          </div>
        </div>

        {/* SUCCESS MESSAGE */}

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
                  onClick={() => loadAnnouncements(true)}
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
              onClick={() => loadAnnouncements(true)}
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
              onClick={() => loadAnnouncements(true)}
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

        {/* ANNOUNCEMENT LIST */}

        {!error && filteredAnnouncements.length > 0 && (
          <div className="space-y-3">
            {filteredAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement._id}
                announcement={announcement}
                isPresident={isPresident}
                onEdit={openEditDrawer}
                onPublish={handlePublish}
                onArchive={handleArchive}
                onRestore={handleRestore}
                onDelete={setDeleteTarget}
                busy={busy}
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}

        {!error && filteredAnnouncements.length === 0 && (
          <div className="rounded border border-(--border) bg-(--bg-white) px-5 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--primary-light) text-(--primary)">
              <FileText size={21} />
            </div>

            <h3 className="mt-4 font-semibold text-(--primary)">
              {isPresident && activeFilter !== "all"
                ? `No ${activeFilter} announcements`
                : "No announcements yet"}
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm text-(--secondary)">
              {isPresident
                ? "There are no announcements in this category yet."
                : "There are currently no published announcements. Please check back later for updates."}
            </p>

            {isPresident && activeFilter === "all" && (
              <button
                type="button"
                onClick={openCreateDrawer}
                className="mt-5 inline-flex items-center gap-2 rounded border border-(--primary) px-4 py-2 text-sm font-medium text-(--primary) transition hover:bg-(--primary) hover:text-white"
              >
                <Plus size={16} />
                Create Announcement
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
            aria-label="Close announcement form"
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/30"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-hidden bg-(--bg-white) shadow-xl">

            {/* DRAWER HEADER */}

            <div className="flex shrink-0 items-center justify-between border-b border-(--border) px-5 py-4">
              <div className="flex items-center gap-2">
                <Megaphone size={18} className="text-(--primary)" />

                <div>
                  <h2 className="text-sm font-semibold text-(--primary)">
                    {editingAnnouncement
                      ? "Edit Announcement"
                      : "Create Announcement"}
                  </h2>

                  <p className="mt-0.5 text-xs text-(--text-muted)">
                    {editingAnnouncement
                      ? "Update your announcement details."
                      : "Prepare an update for association members."}
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
                    htmlFor="announcement-title"
                    className="mb-2 block text-xs font-medium text-(--secondary)"
                  >
                    Announcement Title
                    <span className="ml-1 text-(--danger)">*</span>
                  </label>

                  <input
                    id="announcement-title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter announcement title"
                    maxLength={150}
                    required
                    disabled={saving}
                    className="w-full rounded border border-(--border) bg-transparent px-3 py-3 text-sm text-(--secondary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) disabled:opacity-60"
                  />

                  <p className="mt-1 text-right text-[11px] text-(--text-muted)">
                    {formData.title.length}/150
                  </p>
                </div>

                {/* CONTENT */}

                <div>
                  <label
                    htmlFor="announcement-content"
                    className="mb-2 block text-xs font-medium text-(--secondary)"
                  >
                    Announcement Content
                    <span className="ml-1 text-(--danger)">*</span>
                  </label>

                  <textarea
                    id="announcement-content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your announcement here..."
                    rows={10}
                    required
                    disabled={saving}
                    className="w-full resize-y rounded border border-(--border) bg-transparent px-3 py-3 text-sm leading-7 text-(--secondary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) disabled:opacity-60"
                  />

                  <p className="mt-1 text-xs text-(--text-muted)">
                    {editingAnnouncement
                      ? "Changes will be saved to this announcement."
                      : "You can save this announcement as a draft or publish it immediately."}
                  </p>
                </div>

                {/* NOTICE */}

                <div className="flex items-start gap-3 rounded border border-(--border) bg-(--bg-light) p-3">
                  <Eye
                    size={17}
                    className="mt-0.5 shrink-0 text-(--primary)"
                  />

                  <p className="text-xs leading-5 text-(--secondary)">
                    Published announcements become immediately visible
                    to all authenticated members. Drafts remain visible
                    only in the President's management view.
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

                {!editingAnnouncement && (
                  <button
                    type="button"
                    onClick={(e) => handleSave(e, "draft")}
                    disabled={
                      saving ||
                      !formData.title.trim() ||
                      !formData.content.trim()
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
                    !formData.content.trim()
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
                      {editingAnnouncement ? (
                        <>
                          <CheckCircle2 size={15} />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Send size={15} />
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

      {/* ======================================================
          DELETE CONFIRMATION
      ====================================================== */}

      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded border border-(--border) bg-(--bg-white) p-5 shadow-xl">

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--danger)/10 text-(--danger)">
                <Trash2 size={19} />
              </div>

              <div>
                <h3 className="font-semibold text-(--primary)">
                  Delete Announcement?
                </h3>

                <p className="mt-2 text-sm leading-6 text-(--secondary)">
                  You are about to permanently delete{" "}
                  <strong>{deleteTarget.title}</strong>.
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={busy}
                className="rounded border border-(--border) px-4 py-2 text-sm font-medium text-(--secondary) hover:bg-(--bg-light) disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded bg-(--danger) px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {busy ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    Delete Permanently
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
