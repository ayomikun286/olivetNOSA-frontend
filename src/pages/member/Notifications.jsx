import React, { useEffect, useState } from "react";

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
} from "lucide-react";

import {
    getMyNotifications,
    markAllNotificationsAsRead,
    markNotificationAsRead,
} from "../../services/notificationService.js";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [markingAll, setMarkingAll] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getMyNotifications();

                setNotifications(data.notifications || []);
            } catch (err) {
                console.error(
                    "Fetch notifications error:",
                    err
                );

                setError(
                    err.message ||
                        "Failed to load notifications."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    const filteredNotifications =
        filter === "unread"
            ? notifications.filter(
                  (notification) => !notification.isRead
              )
            : notifications;

    const markOneAsRead = async (notificationId) => {
        try {
            await markNotificationAsRead(notificationId);

            setNotifications((current) =>
                current.map((notification) =>
                    notification._id === notificationId
                        ? {
                              ...notification,
                              isRead: true,
                          }
                        : notification
                )
            );
        } catch (err) {
            console.error(
                "Mark notification read error:",
                err
            );
        }
    };

    const markAllAsRead = async () => {
        if (!unreadCount) return;

        try {
            setMarkingAll(true);

            await markAllNotificationsAsRead();

            setNotifications((current) =>
                current.map((notification) => ({
                    ...notification,
                    isRead: true,
                }))
            );
        } catch (err) {
            console.error(
                "Mark all notifications error:",
                err
            );
        } finally {
            setMarkingAll(false);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case "payment":
                return <CreditCard size={18} />;

            case "obligation":
                return <FileText size={18} />;

            case "announcement":
                return <Megaphone size={18} />;

            case "account":
                return <ShieldCheck size={18} />;

            case "system":
                return <Settings size={18} />;

            default:
                return <Bell size={18} />;
        }
    };

    const getRelativeTime = (date) => {
        if (!date) return "";

        const now = new Date();
        const created = new Date(date);

        const difference = Math.floor(
            (now.getTime() - created.getTime()) / 1000
        );

        if (difference < 60) {
            return "Just now";
        }

        if (difference < 3600) {
            const minutes = Math.floor(
                difference / 60
            );

            return `${minutes} ${
                minutes === 1 ? "minute" : "minutes"
            } ago`;
        }

        if (difference < 86400) {
            const hours = Math.floor(
                difference / 3600
            );

            return `${hours} ${
                hours === 1 ? "hour" : "hours"
            } ago`;
        }

        if (difference < 604800) {
            const days = Math.floor(
                difference / 86400
            );

            return `${days} ${
                days === 1 ? "day" : "days"
            } ago`;
        }

        return created.toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="p-4">
            <div className="space-y-5">
                {/* Header */}
                <div>
                    <h1 className="text-xl font-semibold text-(--primary)">
                        Notifications
                    </h1>

                    <p className="text-sm text-(--secondary) mt-1">
                        Stay updated with your account,
                        payments and important NOSA
                        activities.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-3 p-4 border border-(--danger)/20 bg-(--danger)/5 text-(--danger) rounded">
                        <CircleAlert size={18} />

                        <p className="text-sm">
                            {error}
                        </p>
                    </div>
                )}

                {/* Notifications */}
                <section className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
                    {/* Section Header */}
                    <div className="p-5 border-b border-(--border)">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                    <Bell size={19} />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-(--primary)">
                                        Your notifications
                                    </h2>

                                    <p className="text-sm text-(--text-muted) mt-1">
                                        {unreadCount > 0
                                            ? `${unreadCount} unread ${
                                                  unreadCount ===
                                                  1
                                                      ? "notification"
                                                      : "notifications"
                                              }`
                                            : "You're all caught up"}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={markAllAsRead}
                                disabled={
                                    !unreadCount ||
                                    markingAll
                                }
                                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-(--primary) hover:text-(--primary-dark) disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                <CheckCheck size={16} />

                                {markingAll
                                    ? "Marking..."
                                    : "Mark all as read"}
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="px-5 py-3 border-b border-(--border) flex items-center gap-5">
                        <button
                            type="button"
                            onClick={() => setFilter("all")}
                            className={`text-sm font-medium pb-1 border-b-2 transition ${
                                filter === "all"
                                    ? "text-(--primary) border-(--primary)"
                                    : "text-(--text-muted) border-transparent hover:text-(--primary)"
                            }`}
                        >
                            All
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setFilter("unread")
                            }
                            className={`text-sm font-medium pb-1 border-b-2 transition ${
                                filter === "unread"
                                    ? "text-(--primary) border-(--primary)"
                                    : "text-(--text-muted) border-transparent hover:text-(--primary)"
                            }`}
                        >
                            Unread
                        </button>
                    </div>

                    {/* Loading */}
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="w-7 h-7 border-2 border-(--primary)/20 border-t-(--primary) rounded-full animate-spin mx-auto" />

                            <p className="text-sm text-(--text-muted) mt-4">
                                Loading notifications...
                            </p>
                        </div>
                    ) : filteredNotifications.length ===
                      0 ? (
                        /* Empty */
                        <div className="p-14 text-center">
                            <div className="w-12 h-12 mx-auto rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <Inbox size={22} />
                            </div>

                            <h3 className="font-semibold text-(--primary) mt-4">
                                {filter === "unread"
                                    ? "No unread notifications"
                                    : "No notifications yet"}
                            </h3>

                            <p className="text-sm text-(--text-muted) mt-1 max-w-sm mx-auto">
                                {filter === "unread"
                                    ? "You're all caught up for now."
                                    : "Important updates about your account will appear here."}
                            </p>
                        </div>
                    ) : (
                        /* Notification List */
                        <div className="divide-y divide-(--border) max-h-[650px] overflow-y-auto scrollbar-hide">
                            {filteredNotifications.map(
                                (notification) => (
                                    <button
                                        key={
                                            notification._id
                                        }
                                        type="button"
                                        onClick={() => {
                                            if (
                                                !notification.isRead
                                            ) {
                                                markOneAsRead(
                                                    notification._id
                                                );
                                            }
                                        }}
                                        className={`w-full text-left p-5 sm:p-6 transition hover:bg-(--bg-light)/50 ${
                                            !notification.isRead
                                                ? "bg-(--primary-light)/30"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div
                                                className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${
                                                    notification.isRead
                                                        ? "bg-(--bg-light) text-(--text-muted)"
                                                        : "bg-(--primary-light) text-(--primary)"
                                                }`}
                                            >
                                                {getNotificationIcon(
                                                    notification.type
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <h3
                                                            className={`text-sm truncate ${
                                                                notification.isRead
                                                                    ? "font-medium text-(--primary)"
                                                                    : "font-semibold text-(--primary)"
                                                            }`}
                                                        >
                                                            {
                                                                notification.title
                                                            }
                                                        </h3>

                                                        {!notification.isRead && (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-(--secondary) shrink-0" />
                                                        )}
                                                    </div>

                                                    <span className="text-[11px] text-(--text-muted) whitespace-nowrap">
                                                        {getRelativeTime(
                                                            notification.createdAt
                                                        )}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-(--text-muted) mt-1 leading-6">
                                                    {
                                                        notification.message
                                                    }
                                                </p>

                                                {notification.link && (
                                                    <div className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-(--primary)">
                                                        View details
                                                        <ArrowUpRight
                                                            size={
                                                                13
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                )
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Notifications;