import React, { useCallback, useEffect, useState } from "react";
import {
  MessageSquare,
  MessagesSquare,
  CalendarDays,
  Eye,
  RefreshCw,
  AlertCircle,
  Send,
} from "lucide-react";

import ContentLoading from "../../components/admin/ContentLoading.jsx";
import ExcomDiscussionDetailsModal from "../../components/member/ExcomDiscussionDetailsModal.jsx";
import { getExcomConversations } from "../../services/authService.js";

const MemberExcomPage = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const loadConversations = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await getExcomConversations();

      setConversations(response.conversations || []);
    } catch (error) {
      console.error("EXCOM conversations error:", error);
      setError(
        error.message || "Unable to load executive discussions."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const openDiscussion = (conversationId) => {
    setSelectedConversationId(conversationId);
    setDetailsOpen(true);
  };

  const closeDiscussion = () => {
    setDetailsOpen(false);
    setSelectedConversationId(null);
  };

  const totalReplies = conversations.reduce(
    (total, conversation) =>
      total + (conversation.replyCount || 0),
    0
  );

  const totalMemberReplies = conversations.reduce(
    (total, conversation) =>
      total + (conversation.memberReplyCount || 0),
    0
  );

  if (loading) {
    return <ContentLoading />;
  }

  return (
    <div className="p-4">
      <div className="space-y-5">

        {/* HEADER */}
        <div>
          <h1 className="text-xl font-semibold text-(--primary)">
            EXCOM Discussions
          </h1>

          <p className="text-sm text-(--secondary) mt-1">
            Stay connected with executive discussions, updates,
            and contributions from fellow EXCOM members.
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">

          <div className="bg-(--bg-white) border border-(--border) rounded p-5">
            <div className="w-10 h-10 rounded bg-(--primary-light) text-(--primary) flex items-center justify-center">
              <MessageSquare size={20} />
            </div>

            <p className="text-sm text-(--secondary) mt-5">
              Published Discussions
            </p>

            <h2 className="text-2xl font-bold text-(--primary) mt-1">
              {conversations.length}
            </h2>

            <p className="text-xs text-(--text-muted) mt-2">
              Discussions from the President
            </p>
          </div>

          <div className="bg-(--bg-white) border border-(--border) rounded p-5">
            <div className="w-10 h-10 rounded bg-(--primary-light) text-(--primary) flex items-center justify-center">
              <MessagesSquare size={20} />
            </div>

            <p className="text-sm text-(--secondary) mt-5">
              Total Replies
            </p>

            <h2 className="text-2xl font-bold text-(--primary) mt-1">
              {totalReplies}
            </h2>

            <p className="text-xs text-(--text-muted) mt-2">
              Contributions across all discussions
            </p>
          </div>

          <div className="bg-(--bg-white) border border-(--border) rounded p-5">
            <div className="w-10 h-10 rounded bg-(--primary-light) text-(--primary) flex items-center justify-center">
              <Send size={20} />
            </div>

            <p className="text-sm text-(--secondary) mt-5">
              EXCOM Member Replies
            </p>

            <h2 className="text-2xl font-bold text-(--primary) mt-1">
              {totalMemberReplies}
            </h2>

            <p className="text-xs text-(--text-muted) mt-2">
              Member participation across discussions
            </p>
          </div>

        </div>

        {/* DISCUSSIONS */}
        <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

          <div className="p-5 border-b border-(--border) flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-(--primary)">
                Executive Discussions
              </h2>

              <p className="text-sm text-(--secondary) mt-1">
                Read messages from the President and join
                the conversation.
              </p>
            </div>

            <button
              type="button"
              onClick={() => loadConversations(true)}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded border border-(--border) text-sm font-medium text-(--secondary) hover:bg-(--bg-light) disabled:opacity-60 transition"
            >
              <RefreshCw
                size={15}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {error ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-(--danger-light) text-(--danger) flex items-center justify-center">
                <AlertCircle size={21} />
              </div>

              <h3 className="font-semibold text-(--primary) mt-4">
                Unable to load discussions
              </h3>

              <p className="text-sm text-(--secondary) mt-1">
                {error}
              </p>

              <button
                type="button"
                onClick={() => loadConversations()}
                className="mt-5 px-4 py-2.5 rounded bg-(--primary) text-white text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-10 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                <MessageSquare size={22} />
              </div>

              <h3 className="font-semibold text-(--primary) mt-4">
                No discussions yet
              </h3>

              <p className="text-sm text-(--secondary) mt-1 max-w-sm mx-auto">
                Published discussions from the President
                will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-(--border) max-h-[650px] overflow-y-auto scrollbar-hide">

              {conversations.map((conversation) => (
                <div
                  key={conversation._id}
                  className="p-5 hover:bg-(--bg-light)/50 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-(--primary) break-words">
                        {conversation.subject}
                      </h3>

                      <p className="text-sm text-(--secondary) mt-2 leading-6 line-clamp-3 whitespace-pre-line">
                        {conversation.message}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs text-(--text-muted)">

                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {formatDate(
                            conversation.publishedAt ||
                            conversation.createdAt
                          )}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <MessagesSquare size={14} />
                          {conversation.replyCount || 0}{" "}
                          {(conversation.replyCount || 0) === 1
                            ? "reply"
                            : "replies"}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <Send size={14} />
                          {conversation.memberReplyCount || 0}{" "}
                          member replies
                        </span>

                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openDiscussion(conversation._id)
                      }
                      className="inline-flex shrink-0 items-center justify-center gap-2 px-4 py-2.5 rounded bg-(--primary) text-white text-sm font-medium hover:opacity-90 transition"
                    >
                      <Eye size={15} />
                      View Discussion
                    </button>

                  </div>
                </div>
              ))}

            </div>
          )}
        </div>

      </div>

      {/* DISCUSSION DETAILS MODAL */}
      <ExcomDiscussionDetailsModal
        open={detailsOpen}
        conversationId={selectedConversationId}
        onClose={closeDiscussion}
        onReplySuccess={() => loadConversations(true)}
      />
    </div>
  );
};

export default MemberExcomPage;