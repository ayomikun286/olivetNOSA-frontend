import React, { useEffect, useRef, useState } from "react";


import {
    Bell,
    CheckCheck,
    CreditCard,
    FileText,
    Megaphone,
    ShieldCheck,
    Settings,
    ArrowUpRight,
    Inbox,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    getMyNotifications,
    markAllNotificationsAsRead,
    markNotificationAsRead,
} from "../../services/notificationService.js";

const NotificationDropdown = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [markingAll, setMarkingAll] = useState(false);

    const dropdownRef = useRef(null);

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    const fetchNotifications = async () => {
        try {
            setLoading(true);

            const data = await getMyNotifications();

            setNotifications(data.notifications || []);
        } catch (error) {
            console.error(
                "Notification dropdown error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleOpen = () => {
        setOpen((current) => !current);
    };

    const markOneAsRead = async (notification) => {
    try {
        if (!notification.isRead) {
            await markNotificationAsRead(notification._id);

            setNotifications((current) =>
                current.map((item) =>
                    item._id === notification._id
                        ? {
                              ...item,
                              isRead: true,
                          }
                        : item
                )
            );
        }

        if (notification.link) {
            navigate(notification.link);
            setOpen(false);
        }
    } catch (error) {
        console.error(
            "Mark notification read error:",
            error
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
        } catch (error) {
            console.error(
                "Mark all notifications error:",
                error
            );
        } finally {
            setMarkingAll(false);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case "payment":
                return <CreditCard size={16} />;

            case "obligation":
                return <FileText size={16} />;

            case "announcement":
                return <Megaphone size={16} />;

            case "account":
                return <ShieldCheck size={16} />;

            case "system":
                return <Settings size={16} />;

            default:
                return <Bell size={16} />;
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
            return `${Math.floor(
                difference / 60
            )}m`;
        }

        if (difference < 86400) {
            return `${Math.floor(
                difference / 3600
            )}h`;
        }

        if (difference < 604800) {
            return `${Math.floor(
                difference / 86400
            )}d`;
        }

        return created.toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
        });
    };

    const recentNotifications =
        notifications.slice(0, 5);

    return (
        <div
            ref={dropdownRef}
            className="relative"
        >
            {/* Bell */}
            <button
                type="button"
                onClick={handleOpen}
                aria-label="Notifications"
                className="
                    relative
                    w-9 h-9
                    flex items-center justify-center
                    text-(--text-muted)
                    hover:text-(--primary)
                    hover:bg-(--bg-light)
                    rounded-lg
                    transition
                "
            >
                <Bell size={19} />

                {unreadCount > 0 && (
                    <span
                        className="
                            absolute
                            -top-0.5
                            -right-0.5
                            min-w-[17px]
                            h-[17px]
                            px-1
                            rounded-full
                            bg-(--danger)
                            text-white
                            text-[9px]
                            font-bold
                            flex items-center justify-center
                            border-2
                            border-(--bg-white)
                        "
                    >
                        {unreadCount > 9
                            ? "9+"
                            : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="
                        absolute
                        right-0
                        top-full
                        mt-3
                        w-[360px]
                        max-w-[calc(100vw-2rem)]
                        bg-(--bg-white)
                        border
                        border-(--border)
                        rounded
                        shadow-xl
                        z-50
                        overflow-hidden
                    "
                >
                    {/* Header */}
                    <div className="px-4 py-4 border-b border-(--border)">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-sm font-semibold text-(--primary)">
                                    Notifications
                                </h3>

                                <p className="text-xs text-(--text-muted) mt-1">
                                    {unreadCount > 0
                                        ? `${unreadCount} unread`
                                        : "You're all caught up"}
                                </p>
                            </div>

                            {unreadCount > 0 && (
                                <button
                                    type="button"
                                    onClick={markAllAsRead}
                                    disabled={markingAll}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        text-[11px]
                                        font-semibold
                                        text-(--primary)
                                        hover:text-(--primary-dark)
                                        disabled:opacity-50
                                    "
                                >
                                    <CheckCheck
                                        size={14}
                                    />

                                    {markingAll
                                        ? "..."
                                        : "Mark all"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Notifications */}
                    {loading ? (
                        <div className="py-10 text-center">
                            <div className="w-6 h-6 border-2 border-(--primary)/20 border-t-(--primary) rounded-full animate-spin mx-auto" />

                            <p className="text-xs text-(--text-muted) mt-3">
                                Loading...
                            </p>
                        </div>
                    ) : recentNotifications.length ===
                      0 ? (
                        <div className="py-10 px-5 text-center">
                            <div className="w-10 h-10 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                <Inbox size={18} />
                            </div>

                            <p className="text-sm font-medium text-(--primary) mt-3">
                                No notifications
                            </p>

                            <p className="text-xs text-(--text-muted) mt-1">
                                Important updates will
                                appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="max-h-[390px] overflow-y-auto scrollbar-hide divide-y divide-(--border)">
                            {recentNotifications.map(
                                (notification) => (
                                    <button
                                        key={
                                            notification._id
                                        }
                                        type="button"
                                        onClick={() =>
                                            markOneAsRead(
                                                notification
                                            )
                                        }
                                        className={`
                                            w-full
                                            text-left
                                            px-4
                                            py-3.5
                                            transition
                                            hover:bg-(--bg-light)/60
                                            ${
                                                !notification.isRead
                                                    ? "bg-(--primary-light)/20"
                                                    : ""
                                            }
                                        `}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`
                                                    w-8
                                                    h-8
                                                    shrink-0
                                                    rounded-lg
                                                    flex
                                                    items-center
                                                    justify-center
                                                    ${
                                                        notification.isRead
                                                            ? "bg-(--bg-light) text-(--text-muted)"
                                                            : "bg-(--primary-light) text-(--primary)"
                                                    }
                                                `}
                                            >
                                                {getNotificationIcon(
                                                    notification.type
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex items-center gap-1.5 min-w-0">
                                                        <h4
                                                            className={`
                                                                text-xs
                                                                truncate
                                                                ${
                                                                    notification.isRead
                                                                        ? "font-medium"
                                                                        : "font-semibold"
                                                                }
                                                                text-(--primary)
                                                            `}
                                                        >
                                                            {
                                                                notification.title
                                                            }
                                                        </h4>

                                                        {!notification.isRead && (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-(--secondary) shrink-0" />
                                                        )}
                                                    </div>

                                                    <span className="text-[10px] text-(--text-muted) whitespace-nowrap">
                                                        {getRelativeTime(
                                                            notification.createdAt
                                                        )}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-(--text-muted) mt-1 leading-5 line-clamp-2">
                                                    {
                                                        notification.message
                                                    }
                                                </p>

                                                {notification.link && (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-(--primary) mt-2">
                                                        View details
                                                        <ArrowUpRight
                                                            size={
                                                                11
                                                            }
                                                        />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                )
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="border-t border-(--border)">
                        <button
                            type="button"
                            onClick={() => {
                               navigate("/portal/member/dashboard/notifications");
                                setOpen(false);
                            }}
                            className="
                                w-full
                                px-4
                                py-3
                                text-xs
                                font-semibold
                                text-(--primary)
                                hover:bg-(--bg-light)
                                transition
                                text-center
                            "
                        >
                            View all notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;