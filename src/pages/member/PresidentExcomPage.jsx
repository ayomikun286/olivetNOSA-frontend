import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
    Eye,
    Archive,
    Trash2,
    Send,
    X,
    Users,
    MessageSquare,
    MessagesSquare,
    FileText,
    Plus,
    RefreshCw,
    ArrowUpRight,
    CalendarDays,
    UserRound,
    Clock3,
    CheckCircle2,
    AlertCircle,
    Crown,
    Search,
    ChevronRight,
    ShieldCheck,
    Megaphone,
} from "lucide-react";
import CreateExcomDiscussionModal from "../../components/member/CreateExcomDiscussionModal.jsx";
import AppointExcomMemberModal from "../../components/member/AppointExcomMemberModal.jsx";
import PageTitle from "../../components/common/PageTitle.jsx";
import Alert from "../../components/common/Alert.jsx";
import {
    getEligibleExcomMembers,
    getExcomMembers,
    getExcomConversations,
    appointExcomMember,
    removeExcomMember,
    createExcomConversation,
    getExcomConversationDetails,
    replyToExcomConversation,
    updateExcomConversationStatus,
    deleteExcomConversation,

} from "../../services/authService.js";

import ExcomDiscussionDetailsModal from "../../components/member/ExcomDiscussionDetailsModal.jsx";
// ========================================
// HELPERS
// ========================================

const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const getMemberName = (member) => {
    const user = member?.user || member;

    return [
        user?.firstName,
        user?.middleName,
        user?.lastName,
    ]
        .filter(Boolean)
        .join(" ") || "Unnamed member";
};

const getInitials = (member) => {
    const user = member?.user || member;

    return [
        user?.firstName?.[0],
        user?.lastName?.[0],
    ]
        .filter(Boolean)
        .join("")
        .toUpperCase() || "EX";
};

// ========================================
// MAIN COMPONENT
// ========================================

const PresidentExcomPage = () => {
    const [activeTab, setActiveTab] = useState("overview");

    const [members, setMembers] = useState([]);
    const [conversations, setConversations] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");


    const [eligibleMembers, setEligibleMembers] = useState([]);

    const [showAppointmentModal, setShowAppointmentModal] = useState(false);



    const [selectedConversationId, setSelectedConversationId] = useState("");
    const [showDiscussionDetails, setShowDiscussionDetails] = useState(false);


    const [submitting, setSubmitting] = useState(false);
    const [actionError, setActionError] = useState("");
    const [actionSuccess, setActionSuccess] = useState("");
    const [removingId, setRemovingId] = useState("");


    const [updatingDiscussionId, setUpdatingDiscussionId] = useState("");
    const [deletingDiscussionId, setDeletingDiscussionId] = useState("");

    const [showDiscussionModal, setShowDiscussionModal] = useState(false);
    const [creatingDiscussion, setCreatingDiscussion] = useState(false);

    // ========================================
    // FETCH PAGE DATA
    // ========================================

    const fetchPageData = useCallback(async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const [membersResponse, conversationsResponse, eligibleResponse] =
                await Promise.all([
                    getExcomMembers(),
                    getExcomConversations(),
                    getEligibleExcomMembers(),
                ]);

            setMembers(
                membersResponse?.members ||
                membersResponse?.data?.members ||
                []
            );

            setConversations(
                conversationsResponse?.conversations ||
                conversationsResponse?.data?.conversations ||
                []
            );

            setEligibleMembers(eligibleResponse?.members || []);
        } catch (err) {
            console.error("Failed to load President EXCOM page:", err);

            setError(
                err.message ||
                "Unable to load EXCOM information. Please try again."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchPageData();
    }, [fetchPageData]);




    const handleAppointMember = async ({ userId, position }) => {
        try {
            setSubmitting(true);
            setActionError("");
            setActionSuccess("");

            await appointExcomMember({ userId, position });

            setActionSuccess("EXCOM member appointed successfully.");
            setShowAppointmentModal(false);

            await fetchPageData(true);
        } catch (err) {
            setActionError(err.message || "Unable to appoint member.");
        } finally {
            setSubmitting(false);
        }
    };
    const handleOpenDiscussion = (conversationId) => {
        setSelectedConversationId(conversationId);
        setShowDiscussionDetails(true);
    };

    const handleUpdateDiscussionStatus = async (conversationId, status) => {
        try {
            setUpdatingDiscussionId(conversationId);
            setActionError("");
            setActionSuccess("");

            await updateExcomConversationStatus(conversationId, status);

            setActionSuccess(
                `Discussion ${status} successfully.`
            );

            await fetchPageData(true);
        } catch (error) {
            setActionError(
                error.message || "Unable to update discussion status."
            );
        } finally {
            setUpdatingDiscussionId("");
        }
    };


    const handleDeleteDiscussion = async (conversationId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this discussion? All its replies will also be permanently deleted."
        );

        if (!confirmed) return;

        try {
            setDeletingDiscussionId(conversationId);
            setActionError("");
            setActionSuccess("");

            await deleteExcomConversation(conversationId);

            if (selectedConversationId === conversationId) {
                setShowDiscussionDetails(false);
                setSelectedConversationId("");
            }

            setActionSuccess(
                "Discussion and its replies deleted successfully."
            );

            await fetchPageData(true);
        } catch (error) {
            setActionError(
                error.message || "Unable to delete discussion."
            );
        } finally {
            setDeletingDiscussionId("");
        }
    };


    const handleCreateDiscussion = async ({ subject, message }) => {
        try {
            setCreatingDiscussion(true);
            setActionError("");
            setActionSuccess("");

            await createExcomConversation({ subject, message });

            setShowDiscussionModal(false);
            setActionSuccess("EXCOM discussion published successfully.");

            await fetchPageData(true);
        } catch (err) {
            setActionError(err.message || "Unable to publish discussion.");
        } finally {
            setCreatingDiscussion(false);
        }
    };


    const handleRemoveMember = async (membershipId) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this member from the EXCOM team?"
        );

        if (!confirmed) return;

        try {
            setRemovingId(membershipId);
            setActionError("");
            setActionSuccess("");

            await removeExcomMember(membershipId);

            setActionSuccess("EXCOM member removed successfully.");

            await fetchPageData(true);
        } catch (err) {
            setActionError(err.message || "Unable to remove EXCOM member.");
        } finally {
            setRemovingId("");
        }
    };



    // ========================================
    // STATISTICS
    // ========================================

    const publishedDiscussions = useMemo(
        () =>
            conversations.filter(
                (item) => item.status === "published"
            ),
        [conversations]
    );

    const draftDiscussions = useMemo(
        () =>
            conversations.filter(
                (item) => item.status === "draft"
            ),
        [conversations]
    );

    const archivedDiscussions = useMemo(
        () =>
            conversations.filter(
                (item) => item.status === "archived"
            ),
        [conversations]
    );

    const totalReplies = useMemo(
        () =>
            conversations.reduce(
                (total, item) =>
                    total +
                    Number(
                        item.replyCount ??
                        item.replies?.length ??
                        0
                    ),
                0
            ),
        [conversations]
    );

    // ========================================
    // NAVIGATION
    // ========================================

    const tabs = [
        {
            id: "overview",
            label: "Overview",
            icon: CalendarDays,
        },
        {
            id: "discussions",
            label: "Discussions",
            icon: MessagesSquare,
        },
        {
            id: "team",
            label: "EXCOM Team",
            icon: Users,
        },
    ];

    // ========================================
    // RENDER
    // ========================================

    return (
        <>
            <PageTitle title="President EXCOM | NOSA" />

            <div className="p-4">
                <div className="space-y-5">

                    {/* ========================================
                        PAGE INTRO
                    ======================================== */}

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

                        <div>
                            <div className="flex items-center gap-2 text-xs text-(--secondary) mb-2">
                                <Crown size={14} />

                                <span>Presidential Administration</span>

                                <ChevronRight size={13} />

                                <span>EXCOM</span>
                            </div>

                            <h1 className="text-xl md:text-2xl font-semibold text-(--primary)">
                                Executive Committee
                            </h1>

                            <p className="text-sm text-(--secondary) mt-1">
                                Manage your executive team and oversee official discussions.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-md bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <ShieldCheck size={20} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-(--primary)">
                                    President's Office
                                </p>

                                <p className="text-xs text-(--text-muted) mt-0.5">
                                    NOSA Executive Administration
                                </p>
                            </div>

                        </div>

                    </div>



                    {/* ========================================
                        ERROR
                    ======================================== */}

                    {error && (
                        <div className="border border-(--danger)/20 bg-(--danger)/5 rounded-md px-4 py-3 flex items-center justify-between gap-3">

                            <div className="flex items-center gap-2">
                                <AlertCircle
                                    size={16}
                                    className="text-(--danger) shrink-0"
                                />

                                <p className="text-sm text-(--danger)">
                                    {error}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => fetchPageData(true)}
                                className="text-xs font-semibold text-(--danger) hover:underline shrink-0"
                            >
                                Retry
                            </button>

                        </div>
                    )}

                    {/* ========================================
                        PAGE NAVIGATION
                    ======================================== */}

                    <div className="flex items-center gap-1 border-b border-(--border) overflow-x-auto scrollbar-hide">

                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        inline-flex items-center gap-2
                                        px-4 py-3
                                        text-sm font-medium
                                        border-b-2 whitespace-nowrap
                                        transition
                                        ${isActive
                                            ? "border-(--primary) text-(--primary)"
                                            : "border-transparent text-(--text-muted) hover:text-(--primary)"
                                        }
                                    `}
                                >
                                    <Icon size={16} />

                                    {tab.label}

                                    {tab.id === "team" && (
                                        <span className="text-[10px] bg-(--primary-light) text-(--primary) px-1.5 py-0.5 rounded-full">
                                            {members.length}
                                        </span>
                                    )}

                                    {tab.id === "discussions" && (
                                        <span className="text-[10px] bg-(--primary-light) text-(--primary) px-1.5 py-0.5 rounded-full">
                                            {conversations.length}
                                        </span>
                                    )}
                                </button>
                            );
                        })}

                        <div className="flex-1" />

                        <button
                            type="button"
                            onClick={() => fetchPageData(true)}
                            disabled={refreshing}
                            className="inline-flex items-center gap-2 px-3 py-2 mb-1 text-xs font-semibold text-(--secondary) hover:text-(--primary) transition disabled:opacity-50 shrink-0"
                        >
                            <RefreshCw
                                size={14}
                                className={refreshing ? "animate-spin" : ""}
                            />

                            Refresh
                        </button>

                    </div>

                    {/* ========================================
                        OVERVIEW
                    ======================================== */}

                    {activeTab === "overview" && (
                        <div className="space-y-5">

                            <div>
                                <h2 className="font-semibold text-(--primary)">
                                    EXCOM Overview
                                </h2>

                                <p className="text-sm text-(--secondary) mt-1">
                                    A summary of your executive committee and its activities.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

                                {/* TEAM */}

                                <div className="rounded bg-(--bg-white) border border-(--border) p-5">

                                    <div className="flex items-center justify-between">
                                        <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                            <Users size={20} />
                                        </div>

                                        <span className="text-xs text-(--text-muted)">
                                            Active
                                        </span>
                                    </div>

                                    <p className="text-sm text-(--secondary) mt-5">
                                        EXCOM Members
                                    </p>

                                    <h3 className="text-2xl font-bold text-(--primary) mt-1">
                                        {loading ? "—" : members.length}
                                    </h3>

                                    <p className="text-xs text-(--text-muted) mt-2">
                                        Appointed executive members
                                    </p>

                                </div>

                                {/* DISCUSSIONS */}

                                <div className="rounded bg-(--bg-white) border border-(--border) p-5">

                                    <div className="flex items-center justify-between">
                                        <div className="w-10 h-10 rounded-lg bg-(--secondary-light) text-(--secondary) flex items-center justify-center">
                                            <MessagesSquare size={20} />
                                        </div>

                                        <span className="text-xs text-(--text-muted)">
                                            All
                                        </span>
                                    </div>

                                    <p className="text-sm text-(--secondary) mt-5">
                                        Total Discussions
                                    </p>

                                    <h3 className="text-2xl font-bold text-(--primary) mt-1">
                                        {loading ? "—" : conversations.length}
                                    </h3>

                                    <p className="text-xs text-(--text-muted) mt-2">
                                        Executive discussions
                                    </p>

                                </div>

                                {/* PUBLISHED */}

                                <div className="rounded bg-(--bg-white) border border-(--border) p-5">

                                    <div className="flex items-center justify-between">
                                        <div className="w-10 h-10 rounded-lg bg-green-50 text-(--success) flex items-center justify-center">
                                            <CheckCircle2 size={20} />
                                        </div>

                                        <span className="text-xs text-(--success)">
                                            Published
                                        </span>
                                    </div>

                                    <p className="text-sm text-(--secondary) mt-5">
                                        Published Discussions
                                    </p>

                                    <h3 className="text-2xl font-bold text-(--primary) mt-1">
                                        {loading ? "—" : publishedDiscussions.length}
                                    </h3>

                                    <p className="text-xs text-(--text-muted) mt-2">
                                        Visible to active EXCOM members
                                    </p>

                                </div>

                                {/* DRAFTS */}

                                <div className="rounded bg-(--bg-white) border border-(--border) p-5">

                                    <div className="flex items-center justify-between">
                                        <div className="w-10 h-10 rounded-lg bg-amber-50 text-(--warning) flex items-center justify-center">
                                            <FileText size={20} />
                                        </div>

                                        <span className="text-xs text-(--warning)">
                                            Drafts
                                        </span>
                                    </div>

                                    <p className="text-sm text-(--secondary) mt-5">
                                        Draft Discussions
                                    </p>

                                    <h3 className="text-2xl font-bold text-(--primary) mt-1">
                                        {loading ? "—" : draftDiscussions.length}
                                    </h3>

                                    <p className="text-xs text-(--text-muted) mt-2">
                                        Not yet published
                                    </p>

                                </div>

                            </div>

                            {/* ========================================
                                OVERVIEW CONTENT
                            ======================================== */}

                            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4">

                                {/* RECENT DISCUSSIONS */}

                                <section className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                                    <div className="p-5 border-b border-(--border) flex items-center justify-between gap-3">

                                        <div>
                                            <h2 className="font-semibold text-(--primary)">
                                                Recent Discussions
                                            </h2>

                                            <p className="text-sm text-(--secondary) mt-1">
                                                Latest activity from your executive committee.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("discussions")}
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-(--primary) hover:text-(--secondary) transition shrink-0"
                                        >
                                            View all

                                            <ArrowUpRight size={14} />
                                        </button>

                                    </div>

                                    {loading ? (
                                        <div className="p-8 text-center text-sm text-(--secondary)">
                                            Loading discussions...
                                        </div>
                                    ) : conversations.length === 0 ? (
                                        <div className="p-10 text-center">

                                            <div className="w-12 h-12 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                                <MessageSquare size={22} />
                                            </div>

                                            <h3 className="font-semibold text-(--primary) mt-4">
                                                No discussions yet
                                            </h3>

                                            <p className="text-sm text-(--secondary) mt-1">
                                                Your executive discussions will appear here.
                                            </p>

                                        </div>
                                    ) : (
                                        <div className="divide-y divide-(--border)">

                                            {conversations.slice(0, 5).map((conversation) => (
                                                <div
                                                    key={conversation._id}
                                                    className="p-5 hover:bg-(--bg-light)/50 transition"
                                                >

                                                    <div className="flex items-start justify-between gap-3">

                                                        <div className="min-w-0">
                                                            <h3 className="text-sm font-semibold text-(--primary) truncate">
                                                                {conversation.subject}
                                                            </h3>

                                                            <p className="text-xs text-(--secondary) mt-1 line-clamp-2">
                                                                {conversation.message}
                                                            </p>
                                                        </div>

                                                        <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-green-50 text-(--success) shrink-0">
                                                            Published
                                                        </span>

                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-(--text-muted)">

                                                        <span className="flex items-center gap-1">
                                                            <CalendarDays size={13} />

                                                            {formatDate(
                                                                conversation.publishedAt ||
                                                                conversation.createdAt
                                                            )}
                                                        </span>

                                                        <span className="flex items-center gap-1">
                                                            <MessageSquare size={13} />

                                                            {conversation.replyCount ??
                                                                conversation.replies?.length ??
                                                                0} replies
                                                        </span>

                                                    </div>

                                                </div>
                                            ))}

                                        </div>
                                    )}

                                </section>

                                {/* TEAM SUMMARY */}

                                <section className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                                    <div className="p-5 border-b border-(--border)">

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                                <Users size={19} />
                                            </div>

                                            <div>
                                                <h2 className="font-semibold text-(--primary)">
                                                    EXCOM Team
                                                </h2>

                                                <p className="text-xs text-(--secondary) mt-1">
                                                    Current appointments
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                    {loading ? (
                                        <div className="p-8 text-center text-sm text-(--secondary)">
                                            Loading team...
                                        </div>
                                    ) : members.length === 0 ? (
                                        <div className="p-8 text-center">

                                            <Users
                                                size={22}
                                                className="mx-auto text-(--text-muted)"
                                            />

                                            <p className="text-sm font-medium text-(--primary) mt-3">
                                                No appointments yet
                                            </p>

                                            <p className="text-xs text-(--secondary) mt-1">
                                                Your appointed members will appear here.
                                            </p>

                                        </div>
                                    ) : (
                                        <div className="divide-y divide-(--border)">

                                            {members.slice(0, 5).map((member) => (
                                                <div
                                                    key={member._id}
                                                    className="p-4 flex items-center gap-3"
                                                >

                                                    <div className="w-9 h-9 rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center text-xs font-bold shrink-0">
                                                        {getInitials(member)}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold text-(--primary) truncate">
                                                            {getMemberName(member)}
                                                        </p>

                                                        <p className="text-xs text-(--secondary) mt-0.5 truncate">
                                                            {member.position || "EXCOM Member"}
                                                        </p>
                                                    </div>

                                                </div>
                                            ))}

                                        </div>
                                    )}

                                    {members.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("team")}
                                            className="w-full border-t border-(--border) p-4 text-center text-xs font-semibold text-(--primary) hover:bg-(--bg-light)/50 transition"
                                        >
                                            View EXCOM Team

                                            <ArrowUpRight
                                                size={13}
                                                className="inline ml-1"
                                            />
                                        </button>
                                    )}

                                </section>

                            </div>

                            {/* DISCUSSION ACTIVITY */}

                            <section className="bg-(--primary) text-white rounded p-5 relative overflow-hidden">

                                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/5" />

                                <div className="absolute -right-3 -bottom-10 w-24 h-24 rounded-full bg-(--secondary)/10" />

                                <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Megaphone size={19} />

                                            <h2 className="font-semibold">
                                                Executive Communication
                                            </h2>
                                        </div>

                                        <p className="text-sm text-white/70 mt-2 max-w-xl">
                                            Keep your executive team informed and engaged through official discussions.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-5">

                                        <div>
                                            <p className="text-xs text-white/60">
                                                Total replies
                                            </p>

                                            <p className="text-xl font-bold mt-1">
                                                {loading ? "—" : totalReplies}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-white/60">
                                                Archived
                                            </p>

                                            <p className="text-xl font-bold mt-1">
                                                {loading ? "—" : archivedDiscussions.length}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </section>

                        </div>
                    )}

                    {/* ========================================
                        DISCUSSIONS
                    ======================================== */}

                    {activeTab === "discussions" && (
                        <section className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                            <div className="p-5 border-b border-(--border) flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                                <div>
                                    <h2 className="font-semibold text-(--primary)">
                                        EXCOM Discussions
                                    </h2>

                                    <p className="text-sm text-(--secondary) mt-1">
                                        Manage official conversations with your executive team.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setActionError("");
                                        setActionSuccess("");
                                        setShowDiscussionModal(true);
                                    }}
                                    className="inline-flex items-center justify-center gap-2 bg-(--primary) text-white px-4 py-2.5 rounded text-xs font-semibold hover:opacity-90 transition"
                                >
                                    <Plus size={15} />
                                    New Discussion
                                </button>

                            </div>

                            <div className="p-5 flex flex-wrap items-center gap-3 border-b border-(--border)">

                                <div className="flex items-center gap-2 text-xs text-(--secondary)">
                                    <MessagesSquare size={15} />

                                    {conversations.length} total discussions
                                </div>

                                <span className="text-(--border)">|</span>

                                <span className="text-xs text-(--success)">
                                    {publishedDiscussions.length} published
                                </span>

                                <span className="text-xs text-(--warning)">
                                    {draftDiscussions.length} drafts
                                </span>

                                <span className="text-xs text-(--text-muted)">
                                    {archivedDiscussions.length} archived
                                </span>

                            </div>

                            {loading ? (
                                <div className="p-10 text-center text-sm text-(--secondary)">
                                    Loading discussions...
                                </div>
                            ) : conversations.length === 0 ? (
                                <div className="p-12 text-center">

                                    <div className="w-14 h-14 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                        <MessagesSquare size={24} />
                                    </div>

                                    <h3 className="font-semibold text-(--primary) mt-4">
                                        No discussions created
                                    </h3>

                                    <p className="text-sm text-(--secondary) mt-1 max-w-md mx-auto">
                                        Official discussions you create for your EXCOM team will appear here.
                                    </p>

                                </div>
                            ) : (
                                <div className="divide-y divide-(--border)">

                                    {conversations.map((conversation) => (
                                        <div
                                            key={conversation._id}
                                            className="p-5 sm:p-6 hover:bg-(--bg-light)/40 transition"
                                        >

                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                                                <div className="flex items-start gap-3.5 min-w-0">

                                                    <div className="w-10 h-10 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                                        <MessageSquare size={18} />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h3 className="text-sm font-semibold text-(--primary)">
                                                            {conversation.subject}
                                                        </h3>

                                                        <p className="text-xs text-(--secondary) mt-1 leading-relaxed line-clamp-3">
                                                            {conversation.message}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs text-(--text-muted)">

                                                            <span className="flex items-center gap-1">
                                                                <CalendarDays size={13} />

                                                                {formatDate(
                                                                    conversation.createdAt
                                                                )}
                                                            </span>

                                                            <span className="flex items-center gap-1">
                                                                <MessageSquare size={13} />

                                                                {conversation.replyCount ??
                                                                    conversation.replies?.length ??
                                                                    0} replies
                                                            </span>

                                                        </div>
                                                    </div>

                                                </div>

                                                <span
                                                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full shrink-0 self-start ${conversation.status === "published"
                                                            ? "text-green-700 bg-green-100"
                                                            : conversation.status === "draft"
                                                                ? "text-amber-700 bg-amber-100"
                                                                : "text-gray-600 bg-gray-100"
                                                        }`}
                                                >
                                                    {conversation.status === "published" ? (
                                                        <CheckCircle2 size={13} />
                                                    ) : conversation.status === "draft" ? (
                                                        <FileText size={13} />
                                                    ) : (
                                                        <Archive size={13} />
                                                    )}

                                                    {conversation.status
                                                        ? conversation.status.charAt(0).toUpperCase() +
                                                        conversation.status.slice(1)
                                                        : "Unknown"}
                                                </span>

                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">

                                                {/* DISCUSSION MANAGEMENT ACTIONS */}

                                                <div className="flex flex-wrap items-center gap-2">

                                                    {/* PUBLISH */}

                                                    {conversation.status !== "published" && (
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                updatingDiscussionId === conversation._id ||
                                                                deletingDiscussionId === conversation._id
                                                            }
                                                            onClick={() =>
                                                                handleUpdateDiscussionStatus(
                                                                    conversation._id,
                                                                    "published"
                                                                )
                                                            }
                                                            className="px-3 py-2 rounded-lg text-xs font-semibold bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50"
                                                        >
                                                            {updatingDiscussionId === conversation._id
                                                                ? "Updating..."
                                                                : "Publish"}
                                                        </button>
                                                    )}

                                                    {/* MOVE TO DRAFT */}

                                                    {conversation.status !== "draft" && (
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                updatingDiscussionId === conversation._id ||
                                                                deletingDiscussionId === conversation._id
                                                            }
                                                            onClick={() =>
                                                                handleUpdateDiscussionStatus(
                                                                    conversation._id,
                                                                    "draft"
                                                                )
                                                            }
                                                            className="px-3 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                                                        >
                                                            Move to Draft
                                                        </button>
                                                    )}

                                                    {/* ARCHIVE */}

                                                    {conversation.status !== "archived" && (
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                updatingDiscussionId === conversation._id ||
                                                                deletingDiscussionId === conversation._id
                                                            }
                                                            onClick={() =>
                                                                handleUpdateDiscussionStatus(
                                                                    conversation._id,
                                                                    "archived"
                                                                )
                                                            }
                                                            className="px-3 py-2 rounded-lg text-xs font-semibold bg-amber-100 text-amber-700 hover:bg-amber-200 disabled:opacity-50"
                                                        >
                                                            Archive
                                                        </button>
                                                    )}

                                                    {/* DELETE */}

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            deletingDiscussionId === conversation._id ||
                                                            updatingDiscussionId === conversation._id
                                                        }
                                                        onClick={() =>
                                                            handleDeleteDiscussion(conversation._id)
                                                        }
                                                        className="px-3 py-2 rounded-lg text-xs font-semibold bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
                                                    >
                                                        {deletingDiscussionId === conversation._id
                                                            ? "Deleting..."
                                                            : "Delete"}
                                                    </button>

                                                </div>

                                                {/* VIEW DISCUSSION */}

                                                <button
                                                    type="button"
                                                    onClick={() => handleOpenDiscussion(conversation._id)}
                                                    className="inline-flex items-center gap-2 text-xs font-semibold text-(--primary) hover:underline self-start sm:self-auto"
                                                >
                                                    <Eye size={14} />
                                                    View discussion and replies
                                                </button>

                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )}

                        </section>
                    )}

                    {/* ========================================
                        EXCOM TEAM
                    ======================================== */}

                    {activeTab === "team" && (
                        <section className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                            <div className="p-5 border-b border-(--border) flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                                <div>
                                    <h2 className="font-semibold text-(--primary)">
                                        EXCOM Team
                                    </h2>

                                    <p className="text-sm text-(--secondary) mt-1">
                                        Manage members appointed to your presidential tenure.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setActionError("");
                                        setActionSuccess("");
                                        setShowAppointmentModal(true);
                                    }}
                                    className="inline-flex items-center justify-center gap-2 bg-(--primary) text-white px-4 py-2.5 rounded text-xs font-semibold hover:opacity-90 transition"
                                >
                                    <Plus size={15} />
                                    Appoint Member
                                </button>

                            </div>

                            <div className="p-5 border-b border-(--border) flex flex-wrap items-center gap-4">

                                <div className="flex items-center gap-2 text-xs text-(--secondary)">
                                    <Users size={15} />

                                    {members.length} appointed member
                                    {members.length !== 1 ? "s" : ""}
                                </div>

                                <div className="flex items-center gap-2 text-xs text-(--success)">
                                    <CheckCircle2 size={14} />

                                    Active appointments
                                </div>

                            </div>

                            {loading ? (
                                <div className="p-10 text-center text-sm text-(--secondary)">
                                    Loading EXCOM members...
                                </div>
                            ) : members.length === 0 ? (
                                <div className="p-12 text-center">

                                    <div className="w-14 h-14 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                        <Users size={24} />
                                    </div>

                                    <h3 className="font-semibold text-(--primary) mt-4">
                                        No EXCOM members yet
                                    </h3>

                                    <p className="text-sm text-(--secondary) mt-1 max-w-md mx-auto">
                                        Appointed members will appear here with their assigned executive positions.
                                    </p>

                                </div>
                            ) : (
                                <div className="divide-y divide-(--border)">

                                    {members.map((member) => {
                                        const appointedUser = member.user || {};

                                        return (
                                            <div
                                                key={member._id}
                                                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                            >

                                                <div className="flex items-center gap-3.5 min-w-0">

                                                    <div className="w-11 h-11 shrink-0 rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center text-sm font-bold">
                                                        {getInitials(member)}
                                                    </div>

                                                    <div className="min-w-0">

                                                        <h3 className="text-sm font-semibold text-(--primary) truncate">
                                                            {getMemberName(member)}
                                                        </h3>

                                                        <p className="text-xs text-(--secondary) mt-1 truncate">
                                                            {appointedUser.email || "Email unavailable"}
                                                        </p>

                                                        <p className="text-xs text-(--text-muted) mt-1">
                                                            Appointed {formatDate(member.appointedAt)}
                                                        </p>

                                                    </div>

                                                </div>

                                                <div className="flex items-center justify-between sm:justify-end gap-4">

                                                    <div className="sm:text-right">
                                                        <p className="text-xs text-(--text-muted)">
                                                            Executive Position
                                                        </p>

                                                        <p className="text-sm font-semibold text-(--primary) mt-1">
                                                            {member.position || "EXCOM Member"}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-(--success) bg-(--success-light) px-2.5 py-1.5 rounded-full">
                                                            <CheckCircle2 size={13} />
                                                            Active
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveMember(member._id)}
                                                            disabled={removingId === member._id}
                                                            className="text-xs font-semibold text-(--danger) hover:underline disabled:opacity-50"
                                                        >
                                                            {removingId === member._id ? "Removing..." : "Remove"}
                                                        </button>
                                                    </div>

                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>
                            )}

                        </section>
                    )}

                </div>

                <AppointExcomMemberModal
                    open={showAppointmentModal}
                    members={eligibleMembers}
                    submitting={submitting}
                    onClose={() => {
                        setActionError("");
                        setShowAppointmentModal(false);
                    }}
                    onSubmit={handleAppointMember}
                />

                <CreateExcomDiscussionModal
                    open={showDiscussionModal}
                    submitting={creatingDiscussion}
                    onClose={() => setShowDiscussionModal(false)}
                    onSubmit={handleCreateDiscussion}
                />

                <ExcomDiscussionDetailsModal
                    open={showDiscussionDetails}
                    conversationId={selectedConversationId}
                    onClose={() => {
                        setShowDiscussionDetails(false);
                        setSelectedConversationId("");
                    }}
                    onReplySuccess={() => fetchPageData(true)}
                />

                {(actionSuccess || actionError) && (
                    <div className="fixed top-5 right-5 z-[100] w-[calc(100%-2.5rem)] max-w-sm">
                        {actionSuccess && (
                            <Alert
                                type="success"
                                title="Success"
                                message={actionSuccess}
                                onClose={() => setActionSuccess("")}
                            />
                        )}

                        {actionError && (
                            <Alert
                                type="error"
                                title="Something went wrong"
                                message={actionError}
                                onClose={() => setActionError("")}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default PresidentExcomPage;