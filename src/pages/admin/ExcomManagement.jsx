
import React, { useCallback, useEffect, useState } from "react";
import {
    Users,
    ShieldCheck,
    Crown,
    MessageSquareText,
    History,
    RefreshCw,
    UserRoundPlus,
    Download
} from "lucide-react";

import AppointmentModal from "../../components/admin/AppointmentModal.jsx";
import ExcomArchiveDetailsModal from "../../components/admin/ExcomArchiveDetailsModal.jsx";
import {
    getAdminPresidentialTenures,
    getAdminExcomMembers,
    getAdminMembers,
    assignAdminExcomMember,
    updateAdminExcomMember,
    removeAdminExcomMember,
    getAdminPresidentialTenureDetails,
    exportAdminPresidentialTenurePDF,
} from "../../services/adminService.js";


const formatDate = (date) => {
    if (!date) return "Not set";

    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const ExcomManagement = () => {
    const [tenures, setTenures] = useState([]);
    const [tenuresLoading, setTenuresLoading] = useState(true);
    const [tenuresError, setTenuresError] = useState("");


    const [selectedTenureId, setSelectedTenureId] = useState("");

    const [activeMembers, setActiveMembers] = useState([]);
    const [formerMembers, setFormerMembers] = useState([]);

    const [membersLoading, setMembersLoading] = useState(false);
    const [membersError, setMembersError] = useState("");

    const [exportLoading, setExportLoading] = useState(false);
    const [exportError, setExportError] = useState("");
    const [tenureMembers, setTenureMembers] = useState([]);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [editedPosition, setEditedPosition] = useState("");
    const [appointmentActionLoading, setAppointmentActionLoading] = useState(false);
    const [appointmentActionError, setAppointmentActionError] = useState("");

    const [selectedDiscussion, setSelectedDiscussion] = useState(null);

    const [showAppointmentModal, setShowAppointmentModal] = useState(false);

    const [availableMembers, setAvailableMembers] = useState([]);
    const [memberSearch, setMemberSearch] = useState("");
    const [membersPage, setMembersPage] = useState(1);
    const [membersTotalPages, setMembersTotalPages] = useState(1);
    const [memberOptionsLoading, setMemberOptionsLoading] = useState(false);
    const [memberOptionsError, setMemberOptionsError] = useState("");

    const [selectedMemberId, setSelectedMemberId] = useState("");
    const [appointmentPosition, setAppointmentPosition] = useState("");
    const [appointmentSubmitting, setAppointmentSubmitting] = useState(false);
    const [appointmentError, setAppointmentError] = useState("");
    const [appointmentSuccess, setAppointmentSuccess] = useState("");

    const [discussions, setDiscussions] = useState([]);
    const [discussionsLoading, setDiscussionsLoading] = useState(false);
    const [discussionsError, setDiscussionsError] = useState("");


    const [overviewStats, setOverviewStats] = useState({
        totalTenures: 0,
        activeTenures: 0,
        totalAppointments: 0,
        totalDiscussions: 0,
        totalReplies: 0,
    });

    const openAppointmentModal = () => {
        setSelectedMemberId("");
        setAppointmentPosition("");
        setAppointmentError("");
        setMemberSearch("");
        setMembersPage(1);
        setShowAppointmentModal(true);
    };


    const closeAppointmentModal = () => {
        if (appointmentSubmitting) return;

        setShowAppointmentModal(false);
        setAppointmentError("");
    };


    const handleAppointMember = async (e) => {
        e.preventDefault();

        if (!activeTenure) {
            setAppointmentError(
                "There is no active presidential tenure."
            );
            return;
        }

        if (!selectedMemberId || !appointmentPosition.trim()) {
            setAppointmentError(
                "Select a member and enter an EXCOM position."
            );
            return;
        }

        try {
            setAppointmentSubmitting(true);
            setAppointmentError("");

            const result = await assignAdminExcomMember({
                userId: selectedMemberId,
                position: appointmentPosition.trim(),
            });

            await loadTenureMembers();

            setAppointmentSuccess(
                result.message || "EXCOM member appointed successfully."
            );

            setShowAppointmentModal(false);
            setSelectedMemberId("");
            setAppointmentPosition("");
            setMemberSearch("");
            setMembersPage(1);
        } catch (error) {
            setAppointmentError(
                error.message || "Unable to appoint EXCOM member."
            );
        } finally {
            setAppointmentSubmitting(false);
        }
    };


    const openEditAppointment = (appointment) => {
        setEditingAppointment(appointment);
        setEditedPosition(appointment.position || "");
        setAppointmentActionError("");
    };

    const closeEditAppointment = () => {
        if (appointmentActionLoading) return;

        setEditingAppointment(null);
        setEditedPosition("");
        setAppointmentActionError("");
    };

    const handleUpdateAppointment = async (e) => {
        e.preventDefault();

        if (!editingAppointment?._id || !editedPosition.trim()) {
            setAppointmentActionError("Enter a valid EXCOM position.");
            return;
        }

        try {
            setAppointmentActionLoading(true);
            setAppointmentActionError("");

            await updateAdminExcomMember(
                editingAppointment._id,
                { position: editedPosition.trim() }
            );

            setEditingAppointment(null);
            setEditedPosition("");

            await loadTenureMembers();
        } catch (error) {
            setAppointmentActionError(
                error.message || "Unable to update EXCOM position."
            );
        } finally {
            setAppointmentActionLoading(false);
        }
    };

    const handleRemoveAppointment = async (appointment) => {
        const memberName = [
            appointment.user?.firstName,
            appointment.user?.lastName,
        ].filter(Boolean).join(" ");

        const confirmed = window.confirm(
            `Remove ${memberName || "this member"} from the EXCOM?`
        );

        if (!confirmed) return;

        try {
            setAppointmentActionLoading(true);
            setAppointmentActionError("");

            await removeAdminExcomMember(appointment._id);

            await loadTenureMembers();
        } catch (error) {
            setAppointmentActionError(
                error.message || "Unable to remove EXCOM member."
            );
        } finally {
            setAppointmentActionLoading(false);
        }
    };


    // Load presidential tenures and overview statistics
    const loadTenures = useCallback(async () => {
        setTenuresLoading(true);
        setTenuresError("");

        try {
            const result = await getAdminPresidentialTenures();

            const fetchedTenures = Array.isArray(result.tenures)
                ? result.tenures
                : [];

            setTenures(fetchedTenures);

            setSelectedTenureId((previousId) => {
                if (
                    previousId &&
                    fetchedTenures.some((tenure) => tenure._id === previousId)
                ) {
                    return previousId;
                }

                return (
                    fetchedTenures.find((tenure) => tenure.status === "active")?._id ||
                    fetchedTenures[0]?._id ||
                    ""
                );
            });

            setOverviewStats({
                totalTenures: result.stats?.totalTenures ?? 0,
                activeTenures: result.stats?.activeTenures ?? 0,
                totalAppointments: result.stats?.totalAppointments ?? 0,
                totalDiscussions: result.stats?.totalDiscussions ?? 0,
                totalReplies: result.stats?.totalReplies ?? 0,
            });

        } catch (error) {
            setTenuresError(
                error.message || "Failed to load presidential tenures."
            );
        } finally {
            setTenuresLoading(false);
        }
    }, []);


    const loadTenureMembers = useCallback(async () => {
        if (!selectedTenureId) {
            setActiveMembers([]);
            setFormerMembers([]);
            return;
        }

        try {
            setMembersLoading(true);
            setMembersError("");

            const result = await getAdminExcomMembers(selectedTenureId);

            setActiveMembers(
                Array.isArray(result.activeMembers) ? result.activeMembers : []
            );

            setFormerMembers(
                Array.isArray(result.formerMembers) ? result.formerMembers : []
            );

        } catch (error) {
            setMembersError(
                error.message || "Unable to load EXCOM members."
            );
        } finally {
            setMembersLoading(false);
        }
    }, [selectedTenureId]);


    const loadTenureDiscussions = useCallback(async () => {
        if (!selectedTenureId) {
            setDiscussions([]);
            setTenureMembers([]);
            return;
        }

        try {
            setDiscussionsLoading(true);
            setDiscussionsError("");

            const result = await getAdminPresidentialTenureDetails(
                selectedTenureId
            );

            setDiscussions(
                Array.isArray(result.discussions) ? result.discussions : []
            );
            setTenureMembers(
                Array.isArray(result.members) ? result.members : []
            );
        } catch (error) {
            setDiscussionsError(
                error.message || "Unable to load EXCOM discussions."
            );
        } finally {
            setDiscussionsLoading(false);
        }
    }, [selectedTenureId]);

    const handleExportDiscussions = async () => {
        if (!selectedTenureId) return;

        try {
            setExportLoading(true);
            setExportError("");

            const blob = await exportAdminPresidentialTenurePDF(
                selectedTenureId
            );

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "EXCOM-Discussion-Archive.pdf";

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            setExportError(
                error.message || "Unable to export discussion archive."
            );
        } finally {
            setExportLoading(false);
        }
    };


    const loadAvailableMembers = useCallback(async () => {
        try {
            setMemberOptionsLoading(true);
            setMemberOptionsError("");

            const result = await getAdminMembers(
                membersPage,
                20,
                memberSearch,
                "active"
            );

            setAvailableMembers(
                Array.isArray(result.members) ? result.members : []
            );

            setMembersTotalPages(
                result.pagination?.totalPages || 1
            );
        } catch (error) {
            setMemberOptionsError(
                error.message || "Unable to load eligible members."
            );
        } finally {
            setMemberOptionsLoading(false);
        }
    }, [membersPage, memberSearch]);


    useEffect(() => {
        setMembersPage(1);
    }, [memberSearch]);


    useEffect(() => {
        if (showAppointmentModal) {
            loadAvailableMembers();
        }
    }, [showAppointmentModal, loadAvailableMembers]);

    useEffect(() => {
        loadTenures();
    }, [loadTenures]);

    useEffect(() => {
        loadTenureMembers();
    }, [loadTenureMembers]);

    useEffect(() => {
        loadTenureDiscussions();
    }, [loadTenureDiscussions]);


    const activeTenure = tenures.find(
        (tenure) => tenure.status === "active"
    );

    const overviewItems = [
        {
            title: "Presidential Tenures",
            value: overviewStats.totalTenures,
            description: "Total presidential tenures",
            icon: Crown,
        },
        {
            title: "Active Tenure",
            value: overviewStats.activeTenures,
            description: activeTenure
                ? `${activeTenure.president?.firstName || ""} ${activeTenure.president?.lastName || ""}`.trim()
                : "No active presidential tenure",
            icon: ShieldCheck,
        },
        {
            title: "EXCOM Appointments",
            value: overviewStats.totalAppointments,
            description: "Active and former appointments",
            icon: Users,
        },
        {
            title: "Discussions & Replies",
            value: overviewStats.totalDiscussions + overviewStats.totalReplies,
            description: `${overviewStats.totalDiscussions} discussions · ${overviewStats.totalReplies} replies`,
            icon: MessageSquareText,
        },
    ];

    return (
        <div className="space-y-6 p-4 sm:p-6">

            {/* Page header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Users
                            size={22}
                            className="text-(--primary)"
                        />

                        <h1 className="text-xl font-semibold text-(--primary)">
                            EXCOM Management
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-(--secondary)">
                        Manage presidential tenures, EXCOM appointments,
                        and executive discussions.
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
                        <Crown size={20} />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Executive Committee Administration
                        </h2>

                        <p className="mt-1 max-w-2xl text-xs leading-5 text-(--secondary)">
                            Manage presidential leadership periods,
                            appoint and maintain EXCOM members, and
                            access the discussion history of previous
                            and current executive committees.
                        </p>
                    </div>
                </div>
            </div>

            {/* EXCOM Overview */}
            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">

                <div className="flex flex-col gap-3 border-b border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-(--primary)">
                            EXCOM Overview
                        </h2>

                        <p className="mt-1 text-xs text-(--secondary)">
                            Summary of presidential tenures and
                            executive committee activities.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={loadTenures}
                        disabled={tenuresLoading}
                        className="inline-flex h-9 items-center justify-center gap-2 self-start rounded border border-(--border) px-3 text-xs font-medium text-(--primary) hover:bg-(--bg-soft) disabled:opacity-50"
                    >
                        <RefreshCw
                            size={14}
                            className={tenuresLoading ? "animate-spin" : ""}
                        />

                        Refresh overview
                    </button>
                </div>

                {tenuresError ? (
                    <div className="p-5">
                        <div className="flex flex-col gap-3 rounded border border-(--danger) bg-(--danger-light) p-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-(--danger)">
                                {tenuresError}
                            </p>

                            <button
                                type="button"
                                onClick={loadTenures}
                                disabled={tenuresLoading}
                                className="inline-flex h-8 items-center justify-center gap-2 self-start rounded border border-(--danger) px-3 text-xs font-medium text-(--danger) hover:bg-(--bg-white) disabled:opacity-50"
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
                                        {tenuresLoading ? "—" : item.value}
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

            {/* Presidential Tenures */}
            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">

                <div className="border-b border-(--border) px-5 py-4">
                    <div className="flex items-center gap-2">
                        <History
                            size={17}
                            className="text-(--primary)"
                        />

                        <h2 className="text-sm font-semibold text-(--primary)">
                            Presidential Tenures
                        </h2>
                    </div>

                    <p className="mt-1 text-xs text-(--secondary)">
                        View current and previous presidential leadership periods.
                    </p>
                </div>

                <div className="p-4">
                    {tenuresLoading ? (
                        <div className="flex items-center justify-center gap-2 py-10 text-xs text-(--secondary)">
                            <RefreshCw
                                size={15}
                                className="animate-spin"
                            />
                            Loading presidential tenures...
                        </div>
                    ) : tenures.length === 0 ? (
                        <div className="py-10 text-center">
                            <Crown
                                size={28}
                                className="mx-auto text-(--text-muted)"
                            />

                            <p className="mt-3 text-sm font-medium text-(--primary)">
                                No presidential tenures yet
                            </p>

                            <p className="mt-1 text-xs text-(--secondary)">
                                Presidential tenures will appear here once created.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {tenures.map((tenure) => {
                                const isActive = tenure.status === "active";

                                return (
                                    <div
                                        key={tenure._id}
                                        className="flex flex-col gap-4 rounded border border-(--border) p-4 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                                                <Crown size={18} />
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-semibold text-(--primary)">
                                                    {tenure.president?.firstName}{" "}
                                                    {tenure.president?.lastName}
                                                </h3>

                                                <p className="mt-1 text-xs text-(--secondary)">
                                                    {tenure.president?.email || "No email available"}
                                                </p>

                                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-(--text-muted)">
                                                    <span>
                                                        Started: {formatDate(tenure.startDate)}
                                                    </span>

                                                    <span>
                                                        Ended: {formatDate(tenure.endDate)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <span
                                            className={`inline-flex w-fit items-center rounded px-3 py-1 text-[11px] font-medium ${isActive
                                                ? "bg-(--success-light) text-(--success)"
                                                : "bg-(--bg-soft) text-(--secondary)"
                                                }`}
                                        >
                                            {isActive ? "Active Tenure" : "Completed"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {appointmentSuccess && (
                    <div className="mb-4 flex items-center justify-between gap-3 rounded border border-(--success) bg-(--success-light) px-4 py-3">
                        <p className="text-xs text-(--success)">
                            {appointmentSuccess}
                        </p>

                        <button
                            type="button"
                            onClick={() => setAppointmentSuccess("")}
                            className="text-xs font-medium text-(--success)"
                        >
                            Dismiss
                        </button>
                    </div>
                )}
            </div>

            {/* EXCOM Membership Management */}
            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">

                <div className="border-b border-(--border) px-5 py-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Users
                                    size={17}
                                    className="text-(--primary)"
                                />

                                <h2 className="text-sm font-semibold text-(--primary)">
                                    EXCOM Membership
                                </h2>
                            </div>

                            <p className="mt-1 text-xs text-(--secondary)">
                                View active and former appointments within each presidential tenure.
                            </p>
                        </div>

                        {activeTenure && (
                            <button
                                type="button"
                                onClick={openAppointmentModal}
                                disabled={tenuresLoading}
                                className="inline-flex h-9 items-center justify-center gap-2 rounded bg-(--primary) px-3 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <UserRoundPlus size={15} />
                                Appoint Member
                            </button>
                        )}

                        <select
                            value={selectedTenureId}
                            onChange={(e) => setSelectedTenureId(e.target.value)}
                            disabled={tenures.length === 0 || tenuresLoading}
                            className="h-9 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--text-primary) outline-none focus:border-(--primary) sm:w-64"
                        >
                            {tenures.length === 0 ? (
                                <option value="">No tenures available</option>
                            ) : (
                                tenures.map((tenure) => (
                                    <option key={tenure._id} value={tenure._id}>
                                        {tenure.president?.firstName}{" "}
                                        {tenure.president?.lastName}
                                        {" — "}
                                        {tenure.status === "active" ? "Active" : "Completed"}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                </div>

                <div className="p-4">

                    {membersError && (
                        <div className="mb-4 rounded border border-(--danger) bg-(--danger-light) p-3">
                            <p className="text-xs text-(--danger)">
                                {membersError}
                            </p>
                        </div>
                    )}

                    {appointmentActionError && (
                        <div className="mb-4 rounded border border-(--danger) bg-(--danger-light) p-3">
                            <p className="text-xs text-(--danger)">
                                {appointmentActionError}
                            </p>
                        </div>
                    )}

                    {membersLoading ? (
                        <div className="flex items-center justify-center gap-2 py-10 text-xs text-(--secondary)">
                            <RefreshCw size={15} className="animate-spin" />
                            Loading EXCOM members...
                        </div>
                    ) : !selectedTenureId ? (
                        <div className="py-10 text-center">
                            <Users size={26} className="mx-auto text-(--text-muted)" />

                            <p className="mt-3 text-sm font-medium text-(--primary)">
                                No presidential tenure selected
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">

                            {/* Active Members */}
                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-(--primary)">
                                        Active Members
                                    </h3>

                                    <span className="rounded bg-(--success-light) px-2.5 py-1 text-[11px] font-medium text-(--success)">
                                        {activeMembers.length} Members
                                    </span>
                                </div>

                                {activeMembers.length === 0 ? (
                                    <div className="rounded border border-dashed border-(--border) py-8 text-center">
                                        <p className="text-xs text-(--secondary)">
                                            No EXCOM members appointed to this tenure yet.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto rounded border border-(--border)">
                                        <table className="w-full min-w-[550px] text-left">
                                            <thead className="bg-(--bg-soft)">
                                                <tr className="text-[11px] text-(--secondary)">
                                                    <th className="px-4 py-3 font-medium">Member</th>
                                                    <th className="px-4 py-3 font-medium">Position</th>
                                                    <th className="px-4 py-3 font-medium">Appointed</th>
                                                    <th className="px-4 py-3 font-medium">Status</th>
                                                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-(--border)">
                                                {activeMembers.map((appointment) => (
                                                    <tr key={appointment._id}>
                                                        <td className="px-4 py-3">
                                                            <p className="text-xs font-medium text-(--primary)">
                                                                {appointment.user?.firstName}{" "}
                                                                {appointment.user?.lastName}
                                                            </p>

                                                            <p className="mt-1 text-[11px] text-(--text-muted)">
                                                                {appointment.user?.email}
                                                            </p>
                                                        </td>

                                                        <td className="px-4 py-3 text-xs text-(--text-primary)">
                                                            {appointment.position}
                                                        </td>

                                                        <td className="px-4 py-3 text-xs text-(--secondary)">
                                                            {formatDate(appointment.appointedAt)}
                                                        </td>

                                                        <td className="px-4 py-3">
                                                            <span className="rounded bg-(--success-light) px-2 py-1 text-[10px] font-medium text-(--success)">
                                                                Active
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => openEditAppointment(appointment)}
                                                                    disabled={
                                                                        appointmentActionLoading ||
                                                                        selectedTenureId !== activeTenure?._id
                                                                    }
                                                                    className="rounded border border-(--border) px-3 py-1.5 text-[11px] font-medium text-(--primary) hover:bg-(--bg-soft) disabled:cursor-not-allowed disabled:opacity-50"
                                                                >
                                                                    Edit
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveAppointment(appointment)}
                                                                    disabled={
                                                                        appointmentActionLoading ||
                                                                        selectedTenureId !== activeTenure?._id
                                                                    }
                                                                    className="rounded border border-(--danger) px-3 py-1.5 text-[11px] font-medium text-(--danger) hover:bg-(--danger-light) disabled:cursor-not-allowed disabled:opacity-50"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Former Members */}
                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-(--primary)">
                                        Former Members
                                    </h3>

                                    <span className="rounded bg-(--bg-soft) px-2.5 py-1 text-[11px] font-medium text-(--secondary)">
                                        {formerMembers.length} Members
                                    </span>
                                </div>

                                {formerMembers.length === 0 ? (
                                    <div className="rounded border border-dashed border-(--border) py-8 text-center">
                                        <p className="text-xs text-(--secondary)">
                                            No former EXCOM appointments found.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto rounded border border-(--border)">
                                        <table className="w-full min-w-[550px] text-left">
                                            <thead className="bg-(--bg-soft)">
                                                <tr className="text-[11px] text-(--secondary)">
                                                    <th className="px-4 py-3 font-medium">Member</th>
                                                    <th className="px-4 py-3 font-medium">Position</th>
                                                    <th className="px-4 py-3 font-medium">Appointed</th>
                                                    <th className="px-4 py-3 font-medium">Removed</th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-(--border)">
                                                {formerMembers.map((appointment) => (
                                                    <tr key={appointment._id}>
                                                        <td className="px-4 py-3">
                                                            <p className="text-xs font-medium text-(--primary)">
                                                                {appointment.user?.firstName}{" "}
                                                                {appointment.user?.lastName}
                                                            </p>

                                                            <p className="mt-1 text-[11px] text-(--text-muted)">
                                                                {appointment.user?.email}
                                                            </p>
                                                        </td>

                                                        <td className="px-4 py-3 text-xs text-(--text-primary)">
                                                            {appointment.position}
                                                        </td>

                                                        <td className="px-4 py-3 text-xs text-(--secondary)">
                                                            {formatDate(appointment.appointedAt)}
                                                        </td>

                                                        <td className="px-4 py-3 text-xs text-(--secondary)">
                                                            {formatDate(appointment.removedAt)}
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
            </div>


            {/* EXCOM Discussion Archive */}
            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="flex flex-col gap-3 border-b border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <MessageSquareText size={18} className="text-(--primary)" />

                            <h2 className="text-sm font-semibold text-(--primary)">
                                EXCOM Discussion Archive
                            </h2>
                        </div>

                        <p className="mt-1 text-xs text-(--secondary)">
                            Review discussions and replies recorded during this presidential tenure.
                        </p>
                    </div>

                    {exportError && (
                        <div className="mx-4 mt-3 rounded border border-(--danger) bg-(--danger-light) p-3 text-xs text-(--danger)">
                            {exportError}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleExportDiscussions}
                        disabled={!selectedTenureId || exportLoading || discussionsLoading}
                        className="inline-flex items-center justify-center gap-2 rounded border border-(--border) px-3 py-2 text-xs font-medium text-(--primary) transition hover:bg-(--bg-soft) disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Download size={15} />

                        {exportLoading ? "Exporting..." : "Export PDF"}
                    </button>
                </div>

                <div className="p-4">
                    {discussionsError ? (
                        <div className="rounded border border-(--danger) bg-(--danger-light) p-3">
                            <p className="text-xs text-(--danger)">
                                {discussionsError}
                            </p>
                        </div>
                    ) : discussionsLoading ? (
                        <div className="flex items-center justify-center gap-2 py-10 text-xs text-(--secondary)">
                            <RefreshCw size={15} className="animate-spin" />
                            Loading discussions...
                        </div>
                    ) : discussions.length === 0 ? (
                        <div className="py-10 text-center">
                            <MessageSquareText
                                size={28}
                                className="mx-auto text-(--text-muted)"
                            />

                            <p className="mt-3 text-sm font-medium text-(--primary)">
                                No discussions found
                            </p>

                            <p className="mt-1 text-xs text-(--secondary)">
                                Discussions from this presidential tenure will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {discussions.map((discussion) => (
                                <button
                                    key={discussion._id}
                                    type="button"
                                    onClick={() => setSelectedDiscussion(discussion)}
                                    className="w-full rounded border border-(--border) p-4 text-left transition hover:border-(--primary) hover:bg-(--bg-soft)"
                                >
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <h3 className="text-sm font-semibold text-(--primary)">
                                                {discussion.subject}
                                            </h3>

                                            <p className="mt-1 text-xs text-(--secondary)">
                                                {discussion.createdBy?.firstName}{" "}
                                                {discussion.createdBy?.lastName}
                                            </p>
                                        </div>

                                        <span className="w-fit rounded bg-(--bg-soft) px-2.5 py-1 text-[10px] font-medium text-(--secondary)">
                                            {discussion.status}
                                        </span>
                                    </div>

                                    <p className="mt-3 text-xs leading-5 text-(--text-primary)">
                                        {discussion.message}
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-(--text-muted)">
                                        <span>
                                            {discussion.replies?.length || 0} replies
                                        </span>

                                        <span>
                                            Last activity: {formatDate(discussion.lastActivityAt)}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <AppointmentModal
                open={showAppointmentModal}
                onClose={closeAppointmentModal}
                members={availableMembers}
                loading={memberOptionsLoading}
                error={memberOptionsError}
                search={memberSearch}
                onSearchChange={setMemberSearch}
                selectedMemberId={selectedMemberId}
                onMemberSelect={setSelectedMemberId}
                page={membersPage}
                totalPages={membersTotalPages}
                onPageChange={setMembersPage}
                position={appointmentPosition}
                onPositionChange={setAppointmentPosition}
                submitting={appointmentSubmitting}
                submitError={appointmentError}
                onSubmit={handleAppointMember}
            />


            {editingAppointment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded border border-(--border) bg-(--bg-white) p-5 shadow-xl">
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-(--primary)">
                                Edit EXCOM Position
                            </h2>

                            <p className="mt-1 text-xs text-(--secondary)">
                                Update the position assigned to{" "}
                                <span className="font-medium text-(--text-primary)">
                                    {editingAppointment.user?.firstName}{" "}
                                    {editingAppointment.user?.lastName}
                                </span>.
                            </p>
                        </div>

                        <form onSubmit={handleUpdateAppointment}>
                            <label className="mb-2 block text-sm font-medium text-(--text-primary)">
                                Position
                            </label>

                            <input
                                type="text"
                                value={editedPosition}
                                onChange={(e) => setEditedPosition(e.target.value)}
                                placeholder="e.g. General Secretary"
                                maxLength={100}
                                required
                                disabled={appointmentActionLoading}
                                className="w-full rounded border border-(--border) bg-(--bg-white) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--primary)"
                            />

                            {appointmentActionError && (
                                <p className="mt-3 text-xs text-(--danger)">
                                    {appointmentActionError}
                                </p>
                            )}

                            <div className="mt-5 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeEditAppointment}
                                    disabled={appointmentActionLoading}
                                    className="rounded border border-(--border) px-4 py-2 text-sm text-(--text-primary) disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        appointmentActionLoading ||
                                        !editedPosition.trim()
                                    }
                                    className="rounded bg-(--primary) px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {appointmentActionLoading
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ExcomArchiveDetailsModal
                open={Boolean(selectedDiscussion)}
                onClose={() => setSelectedDiscussion(null)}
                discussion={selectedDiscussion}
                members={tenureMembers}
                president={tenures.find(
                    (tenure) => tenure._id === selectedTenureId
                )?.president}
            />

        </div>
    );
};

export default ExcomManagement;
