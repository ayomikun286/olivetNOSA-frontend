
import React, { useCallback, useEffect, useState } from "react";
import {
  Bell,
  CheckCheck,
  CreditCard,
  FileText,
  Megaphone,
  ShieldCheck,
  Settings,
  CircleAlert,
  ArrowUpRight,
  Inbox,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getAllMyNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../services/notificationService.js";

const AdminNotifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
    limit: 10,
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markingAll, setMarkingAll] = useState(false);
  const [readingId, setReadingId] = useState(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllMyNotifications({
        status: filter,
        page,
        limit: 10,
      });

      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
      setPagination(
        data.pagination || {
          page,
          total: (data.notifications || []).length,
          totalPages: 1,
          limit: 10,
        }
      );
    } catch (err) {
      console.error("Fetch admin notifications error:", err);
      setError(err.message || "Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  }, [filter, page]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "payment":
      case "payment_success":
      case "payment_failed":
        return <CreditCard size={18} />;

      case "obligation":
        return <FileText size={18} />;

      case "announcement":
        return <Megaphone size={18} />;

      case "account":
        return <ShieldCheck size={18} />;

      case "support":
        return <MessageSquare size={18} />;

      case "system":
        return <Settings size={18} />;

      default:
        return <Bell size={18} />;
    }
  };

  const getRelativeTime = (date) => {
    if (!date) return "Recently";

    const created = new Date(date);
    const difference = Math.floor(
      (Date.now() - created.getTime()) / 1000
    );

    if (Number.isNaN(difference)) return "Recently";
    if (difference < 60) return "Just now";

    if (difference < 3600) {
      const minutes = Math.floor(difference / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    }

    if (difference < 86400) {
      const hours = Math.floor(difference / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }

    if (difference < 604800) {
      const days = Math.floor(difference / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }

    return created.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const markOneAsRead = async (notification) => {
    if (notification.isRead || readingId === notification._id) return;

    try {
      setReadingId(notification._id);
      await markNotificationAsRead(notification._id);

      setNotifications((current) =>
        current.map((item) =>
          item._id === notification._id
            ? { ...item, isRead: true }
            : item
        )
      );

      setUnreadCount((current) => Math.max(0, current - 1));
    } catch (err) {
      console.error("Mark notification read error:", err);
      setError(err.message || "Failed to update notification.");
    } finally {
      setReadingId(null);
    }
  };

  const handleNotificationClick = (notification) => {
    markOneAsRead(notification);
  };

  const handleViewDetails = async (notification) => {
    try {
      if (!notification.isRead) {
        await markOneAsRead(notification);
      }

      if (notification.link) {
        navigate(notification.link);
      }
    } catch (err) {
      console.error("Notification navigation error:", err);
    }
  };

  const markAllAsRead = async () => {
    if (!unreadCount || markingAll) return;

    try {
      setMarkingAll(true);
      setError("");

      await markAllNotificationsAsRead();

      setNotifications((current) =>
        current.map((item) => ({ ...item, isRead: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error("Mark all notifications error:", err);
      setError(err.message || "Failed to update notifications.");
    } finally {
      setMarkingAll(false);
    }
  };

  const changeFilter = (nextFilter) => {
    setFilter(nextFilter);
    setPage(1);
  };

  const formatType = (type) => {
    if (!type) return "General";

    return type
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="p-4 space-y-5">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-(--primary)">
          Notifications
        </h1>
        <p className="mt-1 text-sm text-(--secondary)">
          Review system updates, member activity and important administrative alerts.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-3 rounded border border-(--danger)/20 bg-(--danger)/5 p-4 text-(--danger)">
          <CircleAlert size={18} className="shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* MAIN PANEL */}
      <section className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
        {/* PANEL HEADER */}
        <div className="flex flex-col justify-between gap-4 border-b border-(--border) p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
              <Bell size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-(--primary)">
                All notifications
              </h2>
              <p className="mt-1 text-sm text-(--text-muted)">
                {unreadCount > 0
                  ? `${unreadCount} unread ${
                      unreadCount === 1 ? "notification" : "notifications"
                    }`
                  : "You're all caught up"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            disabled={!unreadCount || markingAll}
            className="inline-flex items-center justify-center gap-2 text-sm font-medium text-(--primary) transition hover:text-(--primary-dark) disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCheck size={16} />
            {markingAll ? "Marking..." : "Mark all as read"}
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex items-center gap-5 border-b border-(--border) px-5 py-3">
          {[
            { value: "all", label: "All" },
            { value: "unread", label: "Unread" },
            { value: "read", label: "Read" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => changeFilter(item.value)}
              className={`border-b-2 pb-1 text-sm font-medium transition ${
                filter === item.value
                  ? "border-(--primary) text-(--primary)"
                  : "border-transparent text-(--text-muted) hover:text-(--primary)"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-(--primary)/20 border-t-(--primary)" />
            <p className="mt-4 text-sm text-(--text-muted)">
              Loading notifications...
            </p>
          </div>
        ) : notifications.length === 0 ? (
          /* EMPTY STATE */
          <div className="p-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-(--primary-light) text-(--primary)">
              <Inbox size={22} />
            </div>

            <h3 className="mt-4 font-semibold text-(--primary)">
              {filter === "unread"
                ? "No unread notifications"
                : filter === "read"
                  ? "No read notifications"
                  : "No notifications yet"}
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-sm text-(--text-muted)">
              {filter === "unread"
                ? "You're all caught up for now."
                : "Important administrative updates will appear here."}
            </p>
          </div>
        ) : (
          /* NOTIFICATION LIST */
          <div className="divide-y divide-(--border)">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-5 transition hover:bg-(--bg-light)/50 sm:p-6 ${
                  !notification.isRead
                    ? "bg-(--primary-light)/30"
                    : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      notification.isRead
                        ? "bg-(--bg-light) text-(--text-muted)"
                        : "bg-(--primary-light) text-(--primary)"
                    }`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 items-center gap-2">
                        <h3
                          className={`truncate text-sm text-(--primary) ${
                            notification.isRead
                              ? "font-medium"
                              : "font-semibold"
                          }`}
                        >
                          {notification.title}
                        </h3>

                        {!notification.isRead && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--secondary)" />
                        )}
                      </div>

                      <span className="shrink-0 text-[11px] text-(--text-muted)">
                        {getRelativeTime(notification.createdAt)}
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-6 text-(--text-muted)">
                      {notification.message}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="rounded border border-(--border) px-2 py-1 text-[10px] text-(--text-muted)">
                        {formatType(notification.type)}
                      </span>

                      {!notification.isRead && (
                        <button
                          type="button"
                          disabled={readingId === notification._id}
                          onClick={() => handleNotificationClick(notification)}
                          className="text-xs font-medium text-(--text-muted) transition hover:text-(--primary) disabled:opacity-50"
                        >
                          {readingId === notification._id
                            ? "Updating..."
                            : "Mark as read"}
                        </button>
                      )}

                      {notification.link && (
                        <button
                          type="button"
                          onClick={() => handleViewDetails(notification)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-(--primary) transition hover:text-(--primary-dark)"
                        >
                          View details
                          <ArrowUpRight size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex flex-col gap-3 border-t border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-(--text-muted)">
              Page {pagination.page} of {pagination.totalPages} ·{" "}
              {pagination.total} notifications
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page <= 1}
                className="inline-flex items-center gap-1 rounded border border-(--border) px-3 py-2 text-xs font-medium text-(--primary) transition hover:bg-(--bg-light) disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={14} />
                Previous
              </button>

              <button
                type="button"
                onClick={() =>
                  setPage((current) =>
                    Math.min(pagination.totalPages, current + 1)
                  )
                }
                disabled={page >= pagination.totalPages}
                className="inline-flex items-center gap-1 rounded border border-(--border) px-3 py-2 text-xs font-medium text-(--primary) transition hover:bg-(--bg-light) disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminNotifications;
