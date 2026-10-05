import React, { useEffect, useMemo, useState } from "react";

import {
    Users,
    Layers3,
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
    getAdminYearSets,
    getAdminYearSetById,
    assignYearSetLeader,
} from "../../services/adminService.js";

const YearSets = () => {
    // ========================================
    // DATA
    // ========================================

    const [yearSets, setYearSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ========================================
    // DETAIL DATA
    // ========================================

    const [selectedYearSet, setSelectedYearSet] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);

    // ========================================
    // FILTERS
    // ========================================

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    // ========================================
    // MODALS
    // ========================================

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [leaderModalOpen, setLeaderModalOpen] = useState(false);

    // ========================================
    // LEADER FORM
    // ========================================

    const [leaderUserId, setLeaderUserId] = useState("");
    const [leaderSaving, setLeaderSaving] = useState(false);

    // ========================================
    // ALERT
    // ========================================

    const [alert, setAlert] = useState(null);

    // ========================================
    // LOAD YEAR SETS
    // ========================================

    const loadYearSets = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getAdminYearSets({
                status: statusFilter,
                search,
            });

            setYearSets(response?.data || []);
        } catch (error) {
            console.error("Failed to load year sets:", error);

            setError(
                error.message || "Failed to load year sets."
            );

            setYearSets([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadYearSets();
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
        const total = yearSets.length;

        const active = yearSets.filter(
            (yearSet) => yearSet.isActive === true
        ).length;

        const inactive = yearSets.filter(
            (yearSet) => yearSet.isActive !== true
        ).length;

        const withLeader = yearSets.filter(
            (yearSet) => Boolean(yearSet.leader)
        ).length;

        const withoutLeader = yearSets.filter(
            (yearSet) => !yearSet.leader
        ).length;

        const totalMembers = yearSets.reduce(
            (sum, yearSet) =>
                sum + Number(yearSet.memberCount || 0),
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
    }, [yearSets]);

    // ========================================
    // FILTER
    // ========================================

    const filteredYearSets = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        return yearSets.filter((yearSet) => {
            const matchesSearch =
                !normalizedSearch ||
                String(yearSet.year).includes(
                    normalizedSearch
                ) ||
                yearSet.name
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                yearSet.leader?.firstName
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                yearSet.leader?.lastName
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                yearSet.leader?.alumniId
                    ?.toLowerCase()
                    .includes(normalizedSearch);

            const matchesStatus =
                !statusFilter ||
                (statusFilter === "active"
                    ? yearSet.isActive === true
                    : yearSet.isActive !== true);

            return matchesSearch && matchesStatus;
        });
    }, [
        yearSets,
        search,
        statusFilter,
    ]);

    // ========================================
    // PAGINATION
    // ========================================

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredYearSets.length / itemsPerPage
        )
    );

    const paginatedYearSets =
        filteredYearSets.slice(
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
    // VIEW YEAR SET
    // ========================================

    const openViewModal = async (yearSet) => {
        if (!yearSet?._id) return;

        setViewModalOpen(true);
        setDetailLoading(true);
        setSelectedYearSet(yearSet);

        try {
            const result = await getAdminYearSetById(yearSet._id);
            const detail = result?.data;

            if (detail?.yearSet) {
                setSelectedYearSet({
                    ...detail.yearSet,
                    memberCount: detail.memberCount ?? 0,
                    members: detail.members || [],
                    obligations: detail.obligations || [],
                    financialSummary: detail.financialSummary || {
                        totalObligations: 0,
                        totalPaid: 0,
                        totalOutstanding: 0,
                    },
                });
            }
        } catch (error) {
            console.error(
                "Load year set details error:",
                error
            );

            showAlert(
                "error",
                error.message ||
                "Unable to load year set details."
            );
        } finally {
            setDetailLoading(false);
        }
    };

    const closeViewModal = () => {
        if (leaderSaving) return;

        setViewModalOpen(false);
        setSelectedYearSet(null);
    };

    // ========================================
    // OPEN LEADER MODAL
    // ========================================

    const openLeaderModal = async (yearSet) => {
        if (!yearSet?._id) return;

        setLeaderModalOpen(true);
        setDetailLoading(true);

        // Start with existing table data
        setSelectedYearSet(yearSet);

        setLeaderUserId(
            yearSet?.leader?._id || ""
        );

        try {
            const result = await getAdminYearSetById(
                yearSet._id
            );

            const detail = result?.data;

            if (detail?.yearSet) {
                setSelectedYearSet({
                    ...detail.yearSet,
                    memberCount: detail.memberCount ?? 0,
                    members: detail.members || [],
                    obligations: detail.obligations || [],
                });
            }
        } catch (error) {
            console.error(
                "Load year set members error:",
                error
            );

            showAlert(
                "error",
                error.message ||
                "Unable to load year set members."
            );

            setLeaderModalOpen(false);
            setSelectedYearSet(null);
        } finally {
            setDetailLoading(false);
        }
    };

    const closeLeaderModal = () => {
        if (leaderSaving) return;

        setLeaderModalOpen(false);
        setLeaderUserId("");
        setSelectedYearSet(null);
    };

    // ========================================
    // ASSIGN / REASSIGN LEADER
    // ========================================

    const handleAssignLeader = async (event) => {
        event.preventDefault();

        if (!selectedYearSet?._id) {
            showAlert(
                "error",
                "Year Set could not be identified."
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
                await assignYearSetLeader(
                    selectedYearSet._id,
                    leaderUserId
                );

            showAlert(
                "success",
                result?.message ||
                "Year Set leader assigned successfully."
            );

            setLeaderModalOpen(false);
            setLeaderUserId("");
            setSelectedYearSet(null);

            await loadYearSets();
        } catch (error) {
            console.error(
                "Assign Year Set leader error:",
                error
            );

            showAlert(
                "error",
                error.message ||
                "Failed to assign Year Set leader."
            );
        } finally {
            setLeaderSaving(false);
        }
    };

    // ========================================
    // TABLE COLUMNS
    // ========================================

    const yearSetColumns = [
        {
            key: "yearSet",
            label: "Year Set",

            render: (yearSet) => (
                <div>
                    <p className="font-medium text-(--primary)">
                        {yearSet.name ||
                            `Class of ${yearSet.year}`}
                    </p>

                    <p className="text-xs text-(--text-muted) mt-0.5">
                        {yearSet.year}
                    </p>
                </div>
            ),
        },

        {
            key: "leader",
            label: "Leader",

            render: (yearSet) => {
                if (!yearSet.leader) {
                    return (
                        <span className="text-xs text-(--text-muted)">
                            No leader assigned
                        </span>
                    );
                }

                const fullName = [
                    yearSet.leader.firstName,
                    yearSet.leader.middleName,
                    yearSet.leader.lastName,
                ]
                    .filter(Boolean)
                    .join(" ");

                return (
                    <div>
                        <p className="text-xs font-medium text-(--primary)">
                            {fullName || "Unnamed member"}
                        </p>

                        {yearSet.leader.alumniId && (
                            <p className="text-[10px] text-(--text-muted) mt-0.5">
                                {yearSet.leader.alumniId}
                            </p>
                        )}
                    </div>
                );
            },
        },

        {
            key: "members",
            label: "Members",

            render: (yearSet) => (
                <span className="text-xs font-medium text-(--secondary)">
                    {Number(
                        yearSet.memberCount || 0
                    ).toLocaleString()}
                </span>
            ),
        },

        {
            key: "leaderStatus",
            label: "Leadership",

            render: (yearSet) => (
                <span
                    className={`
            inline-flex
            items-center
            px-2.5
            py-1
            rounded
            text-xs
            font-medium
            ${yearSet.leader
                            ? "bg-(--success-light) text-(--success)"
                            : "bg-(--warning-light) text-(--warning)"
                        }
          `}
                >
                    {yearSet.leader
                        ? "Assigned"
                        : "Needs Leader"}
                </span>
            ),
        },

        {
            key: "status",
            label: "Status",

            render: (yearSet) => (
                <span
                    className={`
            inline-flex
            items-center
            px-2.5
            py-1
            rounded
            text-xs
            font-medium
            ${yearSet.isActive
                            ? "bg-(--success-light) text-(--success)"
                            : "bg-(--bg-soft) text-(--secondary)"
                        }
          `}
                >
                    {yearSet.isActive
                        ? "Active"
                        : "Inactive"}
                </span>
            ),
        },

        {
            key: "actions",
            label: "Action",

            render: (yearSet) => (
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
                            openViewModal(yearSet)
                        }
                    >
                        <Eye size={15} />
                        View
                    </button>

                    {yearSet.isActive && (
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
                                openLeaderModal(yearSet)
                            }
                        >
                            <UserPlus size={14} />

                            {yearSet.leader
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
                        onClose={() => setAlert(null)}
                    />
                )}

                {/* HEADER */}

                <div>
                    <h1 className="text-xl font-semibold text-(--primary)">
                        Year Sets
                    </h1>

                    <p className="text-sm text-(--secondary) mt-1">
                        Manage GOSA year sets, members and
                        year set leadership.
                    </p>
                </div>

                {/* OVERVIEW CARDS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">

                    <AdminStatCard
                        icon={Layers3}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="Year Sets"
                        label="Total Year Sets"
                        value={stats.total}
                        description="All registered year sets"
                    />

                    <AdminStatCard
                        icon={UserCheck}
                        iconBg="bg-(--success-light)"
                        iconClass="text-(--success)"
                        badge="Active"
                        label="Active Year Sets"
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
                        description="Members across year sets"
                    />

                    <AdminStatCard
                        icon={UserCheck}
                        iconBg="bg-(--success-light)"
                        iconClass="text-(--success)"
                        badge="Leadership"
                        label="With Leader"
                        value={stats.withLeader}
                        description="Year sets with leaders"
                    />

                    <AdminStatCard
                        icon={UserX}
                        iconBg="bg-(--warning-light)"
                        iconClass="text-(--warning)"
                        badge="Attention"
                        label="Needs Leader"
                        value={stats.withoutLeader}
                        description="Year sets without leaders"
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
                            onClick={loadYearSets}
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

                {/* YEAR SET TABLE */}

                <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                    {/* TABLE HEADER */}

                    <div className="px-5 py-4 border-b border-(--border)">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    All Year Sets
                                </h2>

                                <p className="text-xs text-(--secondary) mt-1">
                                    View year set membership and
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
                                        placeholder="Search year sets..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
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
                        columns={yearSetColumns}
                        data={paginatedYearSets}
                        loading={loading}
                        rowKey="_id"
                        emptyMessage={
                            error
                                ? "Unable to load year sets."
                                : "No year sets found."
                        }
                    />

                    {/* PAGINATION */}

                    {filteredYearSets.length > 0 && (
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

                                {filteredYearSets.length}{" "}
                                year sets
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    disabled={!canGoPrevious}
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
                                    <ChevronLeft size={16} />
                                </button>

                                <button
                                    type="button"
                                    onClick={handleNext}
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
                                    <ChevronRight size={16} />
                                </button>

                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* YEAR SET VIEW MODAL */}

            {viewModalOpen && selectedYearSet && (
                <YearSetViewModal
                    yearSet={selectedYearSet}
                    loading={detailLoading}
                    onClose={closeViewModal}
                    onAssignLeader={() => {
                        setViewModalOpen(false);
                        openLeaderModal(selectedYearSet);
                    }}
                />
            )}

            {/* LEADER MODAL */}

            {leaderModalOpen && selectedYearSet && (
                <YearSetLeaderModal
                    yearSet={selectedYearSet}
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
// YEAR SET VIEW MODAL
// ======================================================

const YearSetViewModal = ({
    yearSet,
    loading,
    onClose,
    onAssignLeader,
}) => {
    const leaderName = yearSet.leader
        ? [
            yearSet.leader.firstName,
            yearSet.leader.middleName,
            yearSet.leader.lastName,
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
                                {yearSet.name ||
                                    `Class of ${yearSet.year}`}
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
                                {yearSet.year}
                            </span>

                            <span
                                className={`
                  px-2
                  py-0.5
                  rounded
                  text-[10px]
                  font-medium
                  ${yearSet.isActive
                                        ? "bg-(--success-light) text-(--success)"
                                        : "bg-(--bg-soft) text-(--secondary)"
                                    }
                `}
                            >
                                {yearSet.isActive
                                    ? "Active"
                                    : "Inactive"}
                            </span>

                        </div>

                        <p className="text-xs text-(--secondary) mt-1">
                            Year Set members, leadership and
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
                            label="Year"
                            value={yearSet.year}
                        />

                        <DetailItem
                            label="Members"
                            value={Number(
                                yearSet.memberCount || 0
                            ).toLocaleString()}
                        />

                        <DetailItem
                            label="Leadership"
                            value={
                                yearSet.leader
                                    ? "Assigned"
                                    : "Needs Leader"
                            }
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

                                {yearSet.leader?.alumniId && (
                                    <p className="text-xs text-(--secondary) mt-0.5">
                                        {yearSet.leader.alumniId}
                                    </p>
                                )}

                                {yearSet.leader?.email && (
                                    <p className="text-xs text-(--secondary) mt-0.5">
                                        {yearSet.leader.email}
                                    </p>
                                )}
                            </div>

                            {yearSet.isActive && (
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

                                    {yearSet.leader
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
                                    this year set.
                                </p>
                            </div>

                            <span className="text-[11px] font-medium text-(--secondary)">
                                {yearSet.members?.length || 0}{" "}
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
                                    Loading year set details...
                                </span>
                            </div>
                        ) : yearSet.members?.length > 0 ? (
                            <div className="border border-(--border) rounded overflow-hidden">

                                <div className="max-h-64 overflow-y-auto">

                                    {yearSet.members.map(
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
                              ${member.status ===
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
                                Current year financial position for this
                                Year Set.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <DetailItem
                                label="Total Obligations"
                                value={`₦${Number(
                                    yearSet.financialSummary?.totalObligations || 0
                                ).toLocaleString()}`}
                            />

                            <DetailItem
                                label="Total Paid"
                                value={`₦${Number(
                                    yearSet.financialSummary?.totalPaid || 0
                                ).toLocaleString()}`}
                            />

                            <DetailItem
                                label="Outstanding"
                                value={`₦${Number(
                                    yearSet.financialSummary?.totalOutstanding || 0
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
                                Active Year Set obligations and their
                                payment position.
                            </p>
                        </div>

                        {yearSet.obligations?.length > 0 ? (
                            <div className="space-y-2">
                                {yearSet.obligations.map((obligation) => (
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

                                                    {obligation.isOptional === true && (
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
                    ${obligation.status === "paid"
                                                                ? "bg-(--success-light) text-(--success)"
                                                                : obligation.status === "partial"
                                                                    ? "bg-(--warning-light) text-(--warning)"
                                                                    : obligation.status === "overdue"
                                                                        ? "bg-(--danger-light) text-(--danger)"
                                                                        : "bg-(--bg-soft) text-(--secondary)"
                                                            }
                  `}
                                                    >
                                                        {obligation.status === "paid"
                                                            ? "Paid"
                                                            : obligation.status === "partial"
                                                                ? "Partial"
                                                                : obligation.status === "overdue"
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
                                                        obligation.amount || 0
                                                    ).toLocaleString()}
                                                </p>

                                                <p className="text-[10px] text-(--text-muted) mt-0.5">
                                                    Obligation
                                                </p>
                                            </div>
                                        </div>

                                        {/* FINANCIAL BREAKDOWN */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
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
                                                    Amount
                                                </p>

                                                <p className="text-xs font-semibold text-(--primary) mt-0.5">
                                                    ₦
                                                    {Number(
                                                        obligation.amount || 0
                                                    ).toLocaleString()}
                                                </p>
                                            </div>

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
                                                    Paid
                                                </p>

                                                <p className="text-xs font-semibold text-(--success) mt-0.5">
                                                    ₦
                                                    {Number(
                                                        obligation.paid || 0
                                                    ).toLocaleString()}
                                                </p>
                                            </div>

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
                                                    Outstanding
                                                </p>

                                                <p className="text-xs font-semibold text-(--warning) mt-0.5">
                                                    ₦
                                                    {Number(
                                                        obligation.outstanding || 0
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
// YEAR SET LEADER MODAL
// ======================================================

const YearSetLeaderModal = ({
    yearSet,
    userId,
    saving,
    loading,
    onChange,
    onSubmit,
    onClose,
}) => {
    const members = yearSet.members || [];

    const currentLeaderId =
        yearSet.leader?._id || "";

    const activeMembers = members.filter(
        (member) => member.status === "active"
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
                                ? "Reassign Year Set Leader"
                                : "Assign Year Set Leader"}
                        </h2>

                        <p className="text-xs text-(--secondary) mt-1">
                            Select an active member to lead{" "}
                            {yearSet.name ||
                                `Class of ${yearSet.year}`}.
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
                                    onChange(e.target.value)
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

                                {activeMembers.map((member) => {
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
                                            {name || "Unnamed member"}

                                            {member.alumniId
                                                ? ` — ${member.alumniId}`
                                                : member.email
                                                    ? ` — ${member.email}`
                                                    : ""}
                                        </option>
                                    );
                                })}
                            </select>
                        )}

                        {!loading &&
                            activeMembers.length === 0 && (
                                <p className="text-[11px] text-(--warning) mt-1.5">
                                    No active members are available
                                    for leadership assignment.
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

export default YearSets;