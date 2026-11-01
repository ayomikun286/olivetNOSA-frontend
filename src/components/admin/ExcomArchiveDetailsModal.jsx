import React from "react";
import {
    X,
    MessageSquareText,
    UserRound,
    Clock3,
    Reply,
} from "lucide-react";

const formatDateTime = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};

const ExcomArchiveDetailsModal = ({
    open,
    onClose,
    discussion,
    members = [],
    president,
}) => {
    if (!open || !discussion) return null;

    const replies = Array.isArray(discussion.replies)
        ? discussion.replies
        : [];

    const authorName = [
        discussion.createdBy?.firstName,
        discussion.createdBy?.lastName,
    ].filter(Boolean).join(" ");

    // Resolve the participant's actual position during this tenure.
    const getParticipantPosition = (user) => {
        if (!user?._id) return "Participant";

        if (
            president?._id &&
            String(user._id) === String(president._id)
        ) {
            return "President";
        }

        const appointment = members.find(
            (member) =>
                String(member.user?._id) === String(user._id)
        );

        return appointment?.position || "Member";
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded border border-(--border) bg-(--bg-white) shadow-xl">

                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-(--border) px-5 py-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                            <MessageSquareText size={19} />
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-(--primary)">
                                Discussion Details
                            </h2>

                            <p className="mt-1 text-xs text-(--secondary)">
                                Complete discussion and reply history.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded p-1.5 text-(--secondary) hover:bg-(--bg-soft)"
                        aria-label="Close discussion details"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-5 overflow-y-auto p-5">

                    {/* Original Discussion */}
                    <div>
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <span className="rounded bg-(--primary-light) px-2.5 py-1 text-[10px] font-semibold text-(--primary)">
                                ORIGINAL DISCUSSION
                            </span>

                            <span className="rounded bg-(--bg-soft) px-2.5 py-1 text-[10px] font-medium capitalize text-(--secondary)">
                                {discussion.status}
                            </span>
                        </div>

                        <h3 className="text-base font-semibold text-(--primary)">
                            {discussion.subject}
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-(--secondary)">
                            <span className="inline-flex items-center gap-1.5">
                                <UserRound size={13} />

                                <span>
                                    <span className="block">
                                        {authorName || "Unknown author"}
                                    </span>

                                    <span className="mt-1 block text-[10px] font-medium text-(--primary)">
                                        {getParticipantPosition(discussion.createdBy)}
                                    </span>
                                </span>
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                                <Clock3 size={13} />
                                {formatDateTime(discussion.createdAt)}
                            </span>
                        </div>

                        <div className="mt-4 rounded border border-(--border) bg-(--bg-soft) p-4">
                            <p className="whitespace-pre-wrap text-xs leading-6 text-(--text-primary)">
                                {discussion.message}
                            </p>
                        </div>
                    </div>

                    {/* Replies */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="flex items-center gap-2 text-sm font-semibold text-(--primary)">
                                <Reply size={16} />
                                Replies
                            </h3>

                            <span className="rounded bg-(--bg-soft) px-2.5 py-1 text-[11px] font-medium text-(--secondary)">
                                {replies.length} Replies
                            </span>
                        </div>

                        {replies.length === 0 ? (
                            <div className="rounded border border-dashed border-(--border) py-8 text-center">
                                <p className="text-xs text-(--secondary)">
                                    No replies were recorded for this discussion.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {replies.map((reply) => {
                                    const senderName = [
                                        reply.sender?.firstName,
                                        reply.sender?.lastName,
                                    ].filter(Boolean).join(" ");

                                    return (
                                        <div
                                            key={reply._id}
                                            className="rounded border border-(--border) p-4"
                                        >
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-xs font-semibold text-(--primary)">
                                                        {senderName || "Unknown participant"}
                                                    </p>

                                                    <p className="mt-1 text-[10px] font-medium text-(--primary)">
                                                        {getParticipantPosition(reply.sender)}
                                                    </p>
                                                </div>

                                                <span className="text-[10px] text-(--text-muted)">
                                                    {formatDateTime(reply.createdAt)}
                                                </span>
                                            </div>

                                            <p className="mt-3 whitespace-pre-wrap text-xs leading-5 text-(--text-primary)">
                                                {reply.message}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-(--border) px-5 py-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded bg-(--primary) px-4 py-2 text-xs font-medium text-white hover:opacity-90"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExcomArchiveDetailsModal;