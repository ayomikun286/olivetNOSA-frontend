import React, { useEffect, useMemo, useState } from "react";

import {
  Users,
  MapPin,
  UserCheck,
  UserX,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  UserPlus,
  Loader2,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";
import Alert from "../../components/common/Alert.jsx";

import {
  getAdminChapters,
  getAdminChapterById,
  assignChapterLeader,
} from "../../services/adminService.js";

const Chapters = () => {
  // ========================================
  // DATA
  // ========================================

  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // DETAIL DATA
  // ========================================

  const [selectedChapter, setSelectedChapter] =
    useState(null);

  const [detailLoading, setDetailLoading] =
    useState(false);

  // ========================================
  // FILTERS
  // ========================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // ========================================
  // MODALS
  // ========================================

  const [viewModalOpen, setViewModalOpen] =
    useState(false);

  const [leaderModalOpen, setLeaderModalOpen] =
    useState(false);

  // ========================================
  // LEADER FORM
  // ========================================

  const [leaderUserId, setLeaderUserId] =
    useState("");

  const [leaderSaving, setLeaderSaving] =
    useState(false);

  // ========================================
  // ALERT
  // ========================================

  const [alert, setAlert] = useState(null);

  // ========================================
  // LOAD CHAPTERS
  // ========================================

  const loadChapters = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminChapters();

      setChapters(response?.data || []);
    } catch (error) {
      console.error(
        "Failed to load chapters:",
        error
      );

      setError(
        error.message ||
          "Failed to load chapters."
      );

      setChapters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChapters();
  }, []);

  // ========================================
  // ALERT
  // ========================================

  const showAlert = (type, message) => {
    setAlert({
      type,
      message,
    });
  };

  // ========================================
  // STATISTICS
  // ========================================

  const stats = useMemo(() => {
    const total = chapters.length;

    const active = chapters.filter(
      (chapter) => chapter.isActive === true
    ).length;

    const inactive = chapters.filter(
      (chapter) => chapter.isActive !== true
    ).length;

    const withLeader = chapters.filter(
      (chapter) => Boolean(chapter.leader)
    ).length;

    const withoutLeader = chapters.filter(
      (chapter) => !chapter.leader
    ).length;

    const totalMembers = chapters.reduce(
      (sum, chapter) =>
        sum +
        Number(chapter.memberCount || 0),
      0
    );

    return {
      total,
      active,
      inactive,
      withLeader,
      withoutLeader,
      totalMembers,
    };
  }, [chapters]);

  // ========================================
  // FILTER
  // ========================================

  const filteredChapters = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return chapters.filter((chapter) => {
      const leaderName = [
        chapter.leader?.firstName,
        chapter.leader?.middleName,
        chapter.leader?.lastName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        chapter.name
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        chapter.code
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        chapter.country
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        leaderName.includes(normalizedSearch) ||
        chapter.leader?.alumniId
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        !statusFilter ||
        (statusFilter === "active"
          ? chapter.isActive === true
          : chapter.isActive !== true);

      return (
        matchesSearch && matchesStatus
      );
    });
  }, [
    chapters,
    search,
    statusFilter,
  ]);

  // ========================================
  // PAGINATION
  // ========================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredChapters.length /
        itemsPerPage
    )
  );

  const paginatedChapters =
    filteredChapters.slice(
      (currentPage - 1) *
        itemsPerPage,
      currentPage * itemsPerPage
    );

  const canGoPrevious =
    currentPage > 1;

  const canGoNext =
    currentPage < totalPages;

  const handlePrevious = () => {
    if (!canGoPrevious) return;

    setCurrentPage(
      (page) => page - 1
    );
  };

  const handleNext = () => {
    if (!canGoNext) return;

    setCurrentPage(
      (page) => page + 1
    );
  };

  // ========================================
  // VIEW CHAPTER
  // ========================================

  const openViewModal = async (chapter) => {
    if (!chapter?._id) return;

    setViewModalOpen(true);
    setDetailLoading(true);
    setSelectedChapter(chapter);

    try {
      const result =
        await getAdminChapterById(
          chapter._id
        );

      const detail = result?.data;

      if (detail?.chapter) {
        setSelectedChapter({
          ...detail.chapter,

          memberCount:
            detail.memberCount ?? 0,

          members:
            detail.members || [],

          obligations:
            detail.obligations || [],

          financialSummary:
            detail.financialSummary || {
              totalObligations: 0,
              totalPaid: 0,
              totalOutstanding: 0,
            },
        });
      }
    } catch (error) {
      console.error(
        "Load chapter details error:",
        error
      );

      showAlert(
        "error",
        error.message ||
          "Unable to load chapter details."
      );
    } finally {
      setDetailLoading(false);
    }
  };

  const closeViewModal = () => {
    if (leaderSaving) return;

    setViewModalOpen(false);
    setSelectedChapter(null);
  };

  // ========================================
  // OPEN LEADER MODAL
  // ========================================

  const openLeaderModal = async (
    chapter
  ) => {
    if (!chapter?._id) return;

    setLeaderModalOpen(true);
    setDetailLoading(true);

    setSelectedChapter(chapter);

    setLeaderUserId(
      chapter?.leader?._id || ""
    );

    try {
      const result =
        await getAdminChapterById(
          chapter._id
        );

      const detail = result?.data;

      if (detail?.chapter) {
        setSelectedChapter({
          ...detail.chapter,

          memberCount:
            detail.memberCount ?? 0,

          members:
            detail.members || [],

          obligations:
            detail.obligations || [],

          financialSummary:
            detail.financialSummary || {
              totalObligations: 0,
              totalPaid: 0,
              totalOutstanding: 0,
            },
        });
      }
    } catch (error) {
      console.error(
        "Load chapter members error:",
        error
      );

      showAlert(
        "error",
        error.message ||
          "Unable to load chapter members."
      );

      setLeaderModalOpen(false);
      setSelectedChapter(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeLeaderModal = () => {
    if (leaderSaving) return;

    setLeaderModalOpen(false);
    setLeaderUserId("");
    setSelectedChapter(null);
  };

  // ========================================
  // ASSIGN / REASSIGN LEADER
  // ========================================

  const handleAssignLeader = async (
    event
  ) => {
    event.preventDefault();

    if (!selectedChapter?._id) {
      showAlert(
        "error",
        "Chapter could not be identified."
      );

      return;
    }

    if (!leaderUserId) {
      showAlert(
        "error",
        "Please select a member."
      );

      return;
    }

    try {
      setLeaderSaving(true);

      const result =
        await assignChapterLeader(
          selectedChapter._id,
          leaderUserId
        );

      showAlert(
        "success",
        result?.message ||
          "Chapter leader assigned successfully."
      );

      setLeaderModalOpen(false);
      setLeaderUserId("");
      setSelectedChapter(null);

      await loadChapters();
    } catch (error) {
      console.error(
        "Assign Chapter leader error:",
        error
      );

      showAlert(
        "error",
        error.message ||
          "Failed to assign Chapter leader."
      );
    } finally {
      setLeaderSaving(false);
    }
  };

  // ========================================
  // TABLE COLUMNS
  // ========================================

  const chapterColumns = [
    {
      key: "chapter",

      label: "Chapter",

      render: (chapter) => (
        <div>
          <p className="font-medium text-(--primary)">
            {chapter.name ||
              "Unnamed Chapter"}
          </p>

          <p className="text-xs text-(--text-muted) mt-0.5">
            {chapter.code ||
              "No code"}
            {chapter.country
              ? ` • ${chapter.country}`
              : ""}
          </p>
        </div>
      ),
    },

    {
      key: "leader",

      label: "Leader",

      render: (chapter) => {
        if (!chapter.leader) {
          return (
            <span className="text-xs text-(--text-muted)">
              No leader assigned
            </span>
          );
        }

        const fullName = [
          chapter.leader.firstName,
          chapter.leader.middleName,
          chapter.leader.lastName,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div>
            <p className="text-xs font-medium text-(--primary)">
              {fullName ||
                "Unnamed member"}
            </p>

            {chapter.leader.alumniId && (
              <p className="text-[10px] text-(--text-muted) mt-0.5">
                {chapter.leader.alumniId}
              </p>
            )}
          </div>
        );
      },
    },

    {
      key: "members",

      label: "Members",

      render: (chapter) => (
        <span className="text-xs font-medium text-(--secondary)">
          {Number(
            chapter.memberCount || 0
          ).toLocaleString()}
        </span>
      ),
    },

    {
      key: "leaderStatus",

      label: "Leadership",

      render: (chapter) => (
        <span
          className={`
            inline-flex
            items-center
            px-2.5
            py-1
            rounded
            text-xs
            font-medium
            ${
              chapter.leader
                ? "bg-(--success-light) text-(--success)"
                : "bg-(--warning-light) text-(--warning)"
            }
          `}
        >
          {chapter.leader
            ? "Assigned"
            : "Needs Leader"}
        </span>
      ),
    },

    {
      key: "status",

      label: "Status",

      render: (chapter) => (
        <span
          className={`
            inline-flex
            items-center
            px-2.5
            py-1
            rounded
            text-xs
            font-medium
            ${
              chapter.isActive
                ? "bg-(--success-light) text-(--success)"
                : "bg-(--bg-soft) text-(--secondary)"
            }
          `}
        >
          {chapter.isActive
            ? "Active"
            : "Inactive"}
        </span>
      ),
    },

    {
      key: "actions",

      label: "Action",

      render: (chapter) => (
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
              openViewModal(chapter)
            }
          >
            <Eye size={15} />
            View
          </button>

          {chapter.isActive && (
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
                openLeaderModal(
                  chapter
                )
              }
            >
              <UserPlus size={14} />

              {chapter.leader
                ? "Reassign"
                : "Assign"}
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

        <div>
          <h1 className="text-xl font-semibold text-(--primary)">
            Chapters
          </h1>

          <p className="text-sm text-(--secondary) mt-1">
            Manage GOSA chapters, members and
            chapter leadership.
          </p>
        </div>

        {/* OVERVIEW CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">

          <AdminStatCard
            icon={MapPin}
            iconBg="bg-(--primary-light)"
            iconClass="text-(--primary)"
            badge="Chapters"
            label="Total Chapters"
            value={stats.total}
            description="All registered chapters"
          />

          <AdminStatCard
            icon={UserCheck}
            iconBg="bg-(--success-light)"
            iconClass="text-(--success)"
            badge="Active"
            label="Active Chapters"
            value={stats.active}
            description="Currently active"
          />

          <AdminStatCard
            icon={Users}
            iconBg="bg-(--primary-light)"
            iconClass="text-(--primary)"
            badge="Members"
            label="Total Members"
            value={stats.totalMembers}
            description="Members across chapters"
          />

          <AdminStatCard
            icon={UserCheck}
            iconBg="bg-(--success-light)"
            iconClass="text-(--success)"
            badge="Leadership"
            label="With Leader"
            value={stats.withLeader}
            description="Chapters with leaders"
          />

          <AdminStatCard
            icon={UserX}
            iconBg="bg-(--warning-light)"
            iconClass="text-(--warning)"
            badge="Attention"
            label="Needs Leader"
            value={stats.withoutLeader}
            description="Chapters without leaders"
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
              onClick={loadChapters}
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

        {/* CHAPTER TABLE */}

        <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

          {/* TABLE HEADER */}

          <div className="px-5 py-4 border-b border-(--border)">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <h2 className="text-sm font-semibold text-(--primary)">
                  All Chapters
                </h2>

                <p className="text-xs text-(--secondary) mt-1">
                  View chapter membership and
                  manage leadership assignments.
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
                    placeholder="Search chapters..."
                    value={search}
                    onChange={(e) => {
                      setSearch(
                        e.target.value
                      );

                      setCurrentPage(1);
                    }}
                    className="
                      h-9
                      w-full
                      sm:w-[230px]
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

                {/* STATUS */}

                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(
                      e.target.value
                    );

                    setCurrentPage(1);
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

                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>

              </div>
            </div>
          </div>

          {/* TABLE */}

          <AdminTable
            columns={chapterColumns}
            data={paginatedChapters}
            loading={loading}
            rowKey="_id"
            emptyMessage={
              error
                ? "Unable to load chapters."
                : "No chapters found."
            }
          />

          {/* PAGINATION */}

          {filteredChapters.length > 0 && (
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

                {filteredChapters.length}{" "}
                chapters
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
                  disabled={!canGoNext}
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

      {/* CHAPTER VIEW MODAL */}

      {viewModalOpen &&
        selectedChapter && (
          <ChapterViewModal
            chapter={selectedChapter}
            loading={detailLoading}
            onClose={closeViewModal}
            onAssignLeader={() => {
              setViewModalOpen(false);

              openLeaderModal(
                selectedChapter
              );
            }}
          />
        )}

      {/* LEADER MODAL */}

      {leaderModalOpen &&
        selectedChapter && (
          <ChapterLeaderModal
            chapter={selectedChapter}
            userId={leaderUserId}
            saving={leaderSaving}
            loading={detailLoading}
            onChange={setLeaderUserId}
            onSubmit={handleAssignLeader}
            onClose={closeLeaderModal}
          />
        )}
    </div>
  );
};


// ======================================================
// CHAPTER VIEW MODAL
// ======================================================

const ChapterViewModal = ({
  chapter,
  loading,
  onClose,
  onAssignLeader,
}) => {
  const leaderName = chapter.leader
    ? [
        chapter.leader.firstName,
        chapter.leader.middleName,
        chapter.leader.lastName,
      ]
        .filter(Boolean)
        .join(" ")
    : "No leader assigned";

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
          max-w-3xl
          max-h-[90vh]
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

            <div className="flex items-center gap-2 flex-wrap">

              <h2 className="text-sm font-semibold text-(--primary)">
                {chapter.name ||
                  "Unnamed Chapter"}
              </h2>

              <span
                className="
                  px-2
                  py-0.5
                  rounded
                  text-[10px]
                  font-medium
                  bg-(--primary-light)
                  text-(--primary)
                "
              >
                {chapter.code ||
                  "No code"}
              </span>

              <span
                className={`
                  px-2
                  py-0.5
                  rounded
                  text-[10px]
                  font-medium
                  ${
                    chapter.isActive
                      ? "bg-(--success-light) text-(--success)"
                      : "bg-(--bg-soft) text-(--secondary)"
                  }
                `}
              >
                {chapter.isActive
                  ? "Active"
                  : "Inactive"}
              </span>

            </div>

            <p className="text-xs text-(--secondary) mt-1">
              Chapter members, leadership and
              current financial obligations.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-8
              h-8
              rounded
              flex
              items-center
              justify-center
              text-(--secondary)
              hover:bg-(--bg-soft)
              transition-colors
            "
          >
            <X size={17} />
          </button>

        </div>

        {/* BODY */}

        <div className="p-5 space-y-5">

          {/* SUMMARY */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            <DetailItem
              label="Chapter"
              value={
                chapter.name ||
                "Unnamed Chapter"
              }
            />

            <DetailItem
              label="Country"
              value={
                chapter.country ||
                "Not specified"
              }
            />

            <DetailItem
              label="Members"
              value={Number(
                chapter.memberCount || 0
              ).toLocaleString()}
            />

          </div>

          {/* LEADER */}

          <div
            className="
              rounded
              border
              border-(--border)
              bg-(--bg-light)
              p-4
            "
          >
            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-[11px] text-(--text-muted)">
                  Current Leader
                </p>

                <p className="text-sm font-semibold text-(--primary) mt-1">
                  {leaderName}
                </p>

                {chapter.leader?.alumniId && (
                  <p className="text-xs text-(--secondary) mt-0.5">
                    {chapter.leader.alumniId}
                  </p>
                )}

                {chapter.leader?.email && (
                  <p className="text-xs text-(--secondary) mt-0.5">
                    {chapter.leader.email}
                  </p>
                )}

              </div>

              {chapter.isActive && (
                <button
                  type="button"
                  onClick={onAssignLeader}
                  className="
                    h-8
                    px-3
                    rounded
                    border
                    border-(--border)
                    text-xs
                    font-semibold
                    text-(--primary)
                    hover:bg-(--bg-soft)
                    inline-flex
                    items-center
                    gap-1.5
                    transition-colors
                  "
                >
                  <UserPlus size={14} />

                  {chapter.leader
                    ? "Reassign"
                    : "Assign Leader"}
                </button>
              )}

            </div>
          </div>

          {/* MEMBERS */}

          <div>

            <div className="flex items-center justify-between gap-3 mb-2">

              <div>

                <h3 className="text-xs font-semibold text-(--primary)">
                  Members
                </h3>

                <p className="text-[11px] text-(--secondary) mt-0.5">
                  Members currently assigned to
                  this chapter.
                </p>

              </div>

              <span className="text-[11px] font-medium text-(--secondary)">
                {chapter.members?.length || 0}{" "}
                shown
              </span>

            </div>

            {loading ? (
              <div
                className="
                  rounded
                  border
                  border-(--border)
                  bg-(--bg-light)
                  py-8
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Loader2
                  size={16}
                  className="animate-spin text-(--primary)"
                />

                <span className="text-xs text-(--secondary)">
                  Loading chapter details...
                </span>
              </div>
            ) : chapter.members?.length >
              0 ? (
              <div className="border border-(--border) rounded overflow-hidden">

                <div className="max-h-64 overflow-y-auto">

                  {chapter.members.map(
                    (member) => {
                      const memberName = [
                        member.firstName,
                        member.middleName,
                        member.lastName,
                      ]
                        .filter(Boolean)
                        .join(" ");

                      return (
                        <div
                          key={member._id}
                          className="
                            px-3
                            py-2.5
                            border-b
                            border-(--border)
                            last:border-b-0
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >

                          <div className="min-w-0">

                            <p className="text-xs font-medium text-(--primary) truncate">
                              {memberName ||
                                "Unnamed member"}
                            </p>

                            <p className="text-[10px] text-(--text-muted) mt-0.5">
                              {member.alumniId ||
                                member.email ||
                                "No identifier"}
                            </p>

                          </div>

                          <span
                            className={`
                              shrink-0
                              px-2
                              py-0.5
                              rounded
                              text-[10px]
                              font-medium
                              ${
                                member.status ===
                                "active"
                                  ? "bg-(--success-light) text-(--success)"
                                  : "bg-(--bg-soft) text-(--secondary)"
                              }
                            `}
                          >
                            {member.status ||
                              "Unknown"}
                          </span>

                        </div>
                      );
                    }
                  )}

                </div>
              </div>
            ) : (
              <div
                className="
                  rounded
                  border
                  border-dashed
                  border-(--border)
                  bg-(--bg-light)
                  px-4
                  py-8
                  text-center
                "
              >
                <Users
                  size={20}
                  className="mx-auto text-(--text-muted)"
                />

                <p className="text-xs font-medium text-(--primary) mt-2">
                  No members found
                </p>
              </div>
            )}

          </div>

          {/* FINANCIAL SUMMARY */}

          <div>

            <div className="mb-2">

              <h3 className="text-xs font-semibold text-(--primary)">
                Financial Summary
              </h3>

              <p className="text-[11px] text-(--secondary) mt-0.5">
                Current year financial position for
                this Chapter.
              </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              <DetailItem
                label="Total Obligations"
                value={`₦${Number(
                  chapter
                    .financialSummary
                    ?.totalObligations ||
                    0
                ).toLocaleString()}`}
              />

              <DetailItem
                label="Total Paid"
                value={`₦${Number(
                  chapter
                    .financialSummary
                    ?.totalPaid ||
                    0
                ).toLocaleString()}`}
              />

              <DetailItem
                label="Outstanding"
                value={`₦${Number(
                  chapter
                    .financialSummary
                    ?.totalOutstanding ||
                    0
                ).toLocaleString()}`}
              />

            </div>

          </div>

          {/* OBLIGATIONS */}

          <div>

            <div className="mb-2">

              <h3 className="text-xs font-semibold text-(--primary)">
                Current Year Obligations
              </h3>

              <p className="text-[11px] text-(--secondary) mt-0.5">
                Active Chapter obligations and
                their payment position.
              </p>

            </div>

            {chapter.obligations?.length >
            0 ? (
              <div className="space-y-2">

                {chapter.obligations.map(
                  (obligation) => (
                    <div
                      key={obligation._id}
                      className="
                        rounded
                        border
                        border-(--border)
                        bg-(--bg-light)
                        p-3
                      "
                    >

                      {/* TOP */}

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <div className="flex items-center gap-2 flex-wrap">

                            <p className="text-xs font-semibold text-(--primary)">
                              {obligation.name}
                            </p>

                            {obligation.isOptional ===
                              true && (
                              <span
                                className="
                                  px-1.5
                                  py-0.5
                                  rounded
                                  text-[9px]
                                  font-medium
                                  bg-(--warning-light)
                                  text-(--warning)
                                "
                              >
                                Optional
                              </span>
                            )}

                            <span
                              className={`
                                px-1.5
                                py-0.5
                                rounded
                                text-[9px]
                                font-medium
                                ${
                                  obligation.status ===
                                  "paid"
                                    ? "bg-(--success-light) text-(--success)"
                                    : obligation.status ===
                                      "partial"
                                    ? "bg-(--warning-light) text-(--warning)"
                                    : obligation.status ===
                                      "overdue"
                                    ? "bg-(--danger-light) text-(--danger)"
                                    : "bg-(--bg-soft) text-(--secondary)"
                                }
                              `}
                            >
                              {obligation.status ===
                              "paid"
                                ? "Paid"
                                : obligation.status ===
                                  "partial"
                                ? "Partial"
                                : obligation.status ===
                                  "overdue"
                                ? "Overdue"
                                : "Outstanding"}
                            </span>

                          </div>

                          <p className="text-[10px] text-(--text-muted) mt-1">
                            {obligation.dueDate
                              ? new Date(
                                  obligation.dueDate
                                ).toLocaleDateString(
                                  "en-NG",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "No due date"}
                          </p>

                        </div>

                        <div className="text-right shrink-0">

                          <p className="text-xs font-semibold text-(--primary)">
                            ₦
                            {Number(
                              obligation.amount ||
                                0
                            ).toLocaleString()}
                          </p>

                          <p className="text-[10px] text-(--text-muted) mt-0.5">
                            Obligation
                          </p>

                        </div>

                      </div>

                      {/* FINANCIAL BREAKDOWN */}

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">

                        <FinancialItem
                          label="Amount"
                          value={
                            obligation.amount
                          }
                          valueClass="text-(--primary)"
                        />

                        <FinancialItem
                          label="Paid"
                          value={
                            obligation.paid
                          }
                          valueClass="text-(--success)"
                        />

                        <FinancialItem
                          label="Outstanding"
                          value={
                            obligation.outstanding
                          }
                          valueClass="text-(--warning)"
                        />

                      </div>

                    </div>
                  )
                )}

              </div>
            ) : (
              <div
                className="
                  rounded
                  border
                  border-dashed
                  border-(--border)
                  bg-(--bg-light)
                  px-4
                  py-6
                  text-center
                "
              >
                <p className="text-xs text-(--text-muted)">
                  No active current-year
                  obligations configured.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};


// ======================================================
// CHAPTER LEADER MODAL
// ======================================================

const ChapterLeaderModal = ({
  chapter,
  userId,
  saving,
  loading,
  onChange,
  onSubmit,
  onClose,
}) => {
  const members =
    chapter.members || [];

  const currentLeaderId =
    chapter.leader?._id || "";

  const activeMembers =
    members.filter(
      (member) =>
        member.status === "active"
    );

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
          max-h-[90vh]
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
              {currentLeaderId
                ? "Reassign Chapter Leader"
                : "Assign Chapter Leader"}
            </h2>

            <p className="text-xs text-(--secondary) mt-1">
              Select an active member to lead{" "}
              {chapter.name ||
                "this chapter"}.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="
              w-8
              h-8
              rounded
              flex
              items-center
              justify-center
              text-(--secondary)
              hover:bg-(--bg-soft)
              disabled:opacity-50
            "
          >
            <X size={17} />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={onSubmit}
          className="p-5 space-y-4"
        >

          {/* EXISTING LEADER */}

          {currentLeaderId && (
            <div
              className="
                rounded
                border
                border-(--warning)
                bg-(--warning-light)
                px-3
                py-2.5
              "
            >
              <p className="text-[11px] font-semibold text-(--warning)">
                Existing leader
              </p>

              <p className="text-[11px] text-(--secondary) mt-0.5">
                Selecting another member will
                reassign leadership. The previous
                leader's payment history remains
                preserved.
              </p>
            </div>
          )}

          {/* MEMBER */}

          <div>

            <label className="block text-xs font-medium text-(--primary) mb-1.5">
              Select Member
            </label>

            {loading ? (
              <div
                className="
                  h-10
                  rounded
                  border
                  border-(--border)
                  bg-(--bg-light)
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-xs
                  text-(--secondary)
                "
              >
                <Loader2
                  size={14}
                  className="animate-spin"
                />

                Loading members...
              </div>
            ) : (
              <select
                value={userId}
                onChange={(e) =>
                  onChange(
                    e.target.value
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
                  disabled:opacity-60
                "
              >

                <option value="">
                  Select a member
                </option>

                {activeMembers.map(
                  (member) => {
                    const name = [
                      member.firstName,
                      member.middleName,
                      member.lastName,
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <option
                        key={member._id}
                        value={member._id}
                      >
                        {name ||
                          "Unnamed member"}

                        {member.alumniId
                          ? ` — ${member.alumniId}`
                          : member.email
                          ? ` — ${member.email}`
                          : ""}
                      </option>
                    );
                  }
                )}

              </select>
            )}

            {!loading &&
              activeMembers.length ===
                0 && (
                <p className="text-[11px] text-(--warning) mt-1.5">
                  No active members are
                  available for leadership
                  assignment.
                </p>
              )}

          </div>

          {/* ACTIONS */}

          <div
            className="
              pt-2
              border-t
              border-(--border)
              flex
              items-center
              justify-end
              gap-2
            "
          >

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="
                h-9
                px-3.5
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
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                loading ||
                !userId
              }
              className="
                h-9
                px-3.5
                rounded
                bg-(--primary)
                text-white
                text-xs
                font-semibold
                inline-flex
                items-center
                justify-center
                gap-2
                hover:opacity-90
                disabled:opacity-60
              "
            >

              {saving && (
                <Loader2
                  size={14}
                  className="animate-spin"
                />
              )}

              {saving
                ? "Saving..."
                : currentLeaderId
                ? "Reassign Leader"
                : "Assign Leader"}

            </button>

          </div>

        </form>
      </div>
    </div>
  );
};


// ======================================================
// FINANCIAL ITEM
// ======================================================

const FinancialItem = ({
  label,
  value,
  valueClass,
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
      <p className="text-[10px] text-(--text-muted)">
        {label}
      </p>

      <p
        className={`text-xs font-semibold mt-0.5 ${valueClass}`}
      >
        ₦
        {Number(
          value || 0
        ).toLocaleString()}
      </p>
    </div>
  );
};


// ======================================================
// DETAIL ITEM
// ======================================================

const DetailItem = ({
  label,
  value,
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
      <p className="text-[11px] text-(--text-muted)">
        {label}
      </p>

      <p className="text-xs font-semibold text-(--primary) mt-1">
        {value}
      </p>
    </div>
  );
};

export default Chapters;