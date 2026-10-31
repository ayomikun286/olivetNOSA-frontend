import React, { useEffect, useState } from "react";
import {
    X,
    MessageSquare,
    Send,
    CalendarDays,
    UserRound,
    LoaderCircle,
} from "lucide-react";

import {
    getExcomConversationDetails,
    replyToExcomConversation,
} from "../../services/authService.js";

const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};

const ExcomDiscussionDetailsModal = ({
    open,
    conversationId,
    onClose,
    onReplySuccess,
}) => {
    const [conversation, setConversation] = useState(null);
    const [replies, setReplies] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    const fetchDetails = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getExcomConversationDetails(
                conversationId
            );

            setConversation(response.conversation);
            setReplies(response.replies || []);
        } catch (err) {
            setError(err.message || "Unable to load discussion.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open && conversationId) {
            fetchDetails();
        }

        if (!open) {
            setConversation(null);
            setReplies([]);
            setMessage("");
            setError("");
        }
    }, [open, conversationId]);

    const handleReply = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        try {
            setSending(true);
            setError("");

            await replyToExcomConversation(
                conversationId,
                message.trim()
            );

            setMessage("");

            await fetchDetails();

            onReplySuccess?.();
        } catch (err) {
            setError(err.message || "Unable to send reply.");
        } finally {
            setSending(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-3 sm:p-5">
            <div className="bg-(--bg-white) w-full max-w-3xl max-h-[90vh] rounded-lg shadow-xl flex flex-col overflow-hidden">

                <div className="p-5 border-b border-(--border) flex items-center justify-between gap-3">
                    <div>
                        <h2 className="font-semibold text-(--primary)">
                            Discussion Details
                        </h2>

                        <p className="text-xs text-(--secondary) mt-1">
                            Executive communication
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded hover:bg-(--bg-light) text-(--secondary)"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-5">

                    {loading ? (
                        <div className="py-12 flex justify-center">
                            <LoaderCircle
                                className="animate-spin text-(--primary)"
                                size={25}
                            />
                        </div>
                    ) : error && !conversation ? (
                        <p className="text-sm text-(--danger)">
                            {error}
                        </p>
                    ) : conversation ? (
                        <>
                            <div>
                                <h3 className="text-lg font-semibold text-(--primary)">
                                    {conversation.subject}
                                </h3>

                                <div className="flex flex-wrap gap-4 text-xs text-(--text-muted) mt-2">
                                    <span className="flex items-center gap-1">
                                        <CalendarDays size={13} />
                                        {formatDate(conversation.createdAt)}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <MessageSquare size={13} />
                                        {conversation.replyCount || 0} replies
                                    </span>
                                </div>

                                <div className="mt-4 rounded-lg bg-(--bg-light) p-4">
                                    <p className="text-sm text-(--text-primary) whitespace-pre-wrap leading-relaxed">
                                        {conversation.message}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="border border-(--border) rounded p-3">
                                    <p className="text-xs text-(--secondary)">
                                        Total replies
                                    </p>

                                    <p className="text-xl font-bold text-(--primary) mt-1">
                                        {conversation.replyCount || 0}
                                    </p>
                                </div>

                                <div className="border border-(--border) rounded p-3">
                                    <p className="text-xs text-(--secondary)">
                                        EXCOM members replied
                                    </p>

                                    <p className="text-xl font-bold text-(--primary) mt-1">
                                        {conversation.memberReplyCount || 0}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-(--primary) mb-4">
                                    Replies ({replies.length})
                                </h3>

                                {replies.length === 0 ? (
                                    <div className="text-center py-8 border border-dashed border-(--border) rounded">
                                        <MessageSquare
                                            size={22}
                                            className="mx-auto text-(--text-muted)"
                                        />

                                        <p className="text-sm text-(--secondary) mt-2">
                                            No replies yet.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {replies.map((reply) => (
                                            <div
                                                key={reply._id}
                                                className="flex gap-3"
                                            >
                                                <div className="w-9 h-9 shrink-0 rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                                    <UserRound size={17} />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <p className="text-sm font-semibold text-(--primary)">
                                                            {[
                                                                reply.sender?.firstName,
                                                                reply.sender?.lastName,
                                                            ].filter(Boolean).join(" ") || "Unknown member"}
                                                        </p>

                                                        <span className="text-[10px] text-(--text-muted)">
                                                            {reply.sender?.role === "president"
                                                                ? "President"
                                                                : "EXCOM Member"}
                                                        </span>
                                                    </div>

                                                    <p className="text-xs text-(--text-muted) mt-1">
                                                        {formatDate(reply.createdAt)}
                                                    </p>

                                                    <p className="text-sm text-(--text-primary) mt-2 whitespace-pre-wrap leading-relaxed">
                                                        {reply.message}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : null}

                    {error && conversation && (
                        <p className="text-sm text-(--danger)">
                            {error}
                        </p>
                    )}
                </div>

                {conversation?.status === "published" && (
                    <form
                        onSubmit={handleReply}
                        className="p-4 border-t border-(--border) flex gap-2"
                    >
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a reply..."
                            rows={2}
                            className="flex-1 resize-none rounded border border-(--border) bg-(--bg-white) px-3 py-2 text-sm outline-none focus:border-(--primary)"
                        />

                        <button
                            type="submit"
                            disabled={sending || !message.trim()}
                            className="self-end inline-flex items-center gap-2 bg-(--primary) text-white px-4 py-2.5 rounded text-xs font-semibold disabled:opacity-50"
                        >
                            {sending ? "Sending..." : "Reply"}
                            <Send size={14} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ExcomDiscussionDetailsModal;