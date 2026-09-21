import { useEffect, useState } from "react";
import {
  Bell,
  ArrowRight,
  Circle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  getMyNotifications,
  markNotificationAsRead,
} from "../../services/notificationService.js";

const NotificationsCard = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await getMyNotifications();

      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Notifications card error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification) => {
    try {
      // Mark as read only if currently unread
      if (!notification.isRead) {
        await markNotificationAsRead(notification._id);

        setNotifications((current) =>
          current.map((item) =>
            item._id === notification._id
              ? { ...item, isRead: true }
              : item
          )
        );
      }

      // Navigate after marking as read
      if (notification.link) {
        navigate(notification.link);
      } else {
        navigate(
          "/portal/member/dashboard/notifications"
        );
      }
    } catch (error) {
      console.error(
        "Notification click error:",
        error
      );
    }
  };

  const getRelativeTime = (date) => {
    if (!date) return "Recently";

    const now = new Date();
    const created = new Date(date);

    const difference = Math.floor(
      (now.getTime() - created.getTime()) / 1000
    );

    if (difference < 60) {
      return "Just now";
    }

    if (difference < 3600) {
      return `${Math.floor(difference / 60)}m ago`;
    }

    if (difference < 86400) {
      return `${Math.floor(difference / 3600)}h ago`;
    }

    if (difference < 604800) {
      return `${Math.floor(difference / 86400)}d ago`;
    }

    return created.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
    });
  };

  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

      {/* HEADER */}
      <div className="p-4 border-b border-(--border) flex items-center justify-between gap-3">

        <div className="flex items-center gap-2.5">

          <div className="w-9 h-9 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
            <Bell size={17} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-(--primary)">
              Notifications
            </h2>

            <p className="text-xs text-(--secondary) mt-0.5">
              Latest updates
            </p>
          </div>

        </div>

        {notifications.length > 0 && (
          <span className="text-xs font-medium text-(--text-muted)">
            {notifications.length}
          </span>
        )}

      </div>

      {/* CONTENT */}
      {loading ? (

        <div className="p-6 text-center min-h-80 flex flex-col items-center justify-center">

          <div className="w-6 h-6 border-2 border-(--primary)/20 border-t-(--primary) rounded-full animate-spin" />

          <p className="text-xs text-(--text-muted) mt-3">
            Loading notifications...
          </p>

        </div>

      ) : notifications.length === 0 ? (

        <div className="p-6 text-center min-h-80 flex flex-col items-center justify-center">

          <div className="w-10 h-10 mx-auto rounded-full bg-(--bg-light) text-(--text-muted) flex items-center justify-center">
            <Bell size={18} />
          </div>

          <p className="text-xs font-medium text-(--primary) mt-3">
            No notifications
          </p>

          <p className="text-xs text-(--secondary) mt-1">
            You're all caught up.
          </p>

        </div>

      ) : (

        <div className="divide-y divide-(--border)">

          {recentNotifications.map((notification) => (

            <button
              key={notification._id}
              type="button"
              onClick={() =>
                handleNotificationClick(notification)
              }
              className={`
                w-full
                p-3.5
                text-left
                flex
                gap-3
                transition
                hover:bg-(--bg-light)/60
                ${
                  !notification.isRead
                    ? "bg-(--primary-light)/10"
                    : ""
                }
              `}
            >

              {/* READ STATUS */}
              <Circle
                size={7}
                fill="currentColor"
                className={`
                  mt-1.5
                  shrink-0
                  ${
                    notification.isRead
                      ? "text-(--text-muted)"
                      : "text-(--secondary)"
                  }
                `}
              />

              {/* CONTENT */}
              <div className="min-w-0 flex-1">

                <div className="flex items-center gap-2">

                  <p
                    className={`
                      text-xs
                      text-(--primary)
                      truncate
                      ${
                        notification.isRead
                          ? "font-medium"
                          : "font-semibold"
                      }
                    `}
                  >
                    {notification.title}
                  </p>

                  {!notification.isRead && (
                    <span className="w-1.5 h-1.5 rounded-full bg-(--secondary) shrink-0" />
                  )}

                </div>

                <p className="text-xs text-(--secondary) mt-0.5 line-clamp-2">
                  {notification.message}
                </p>

                <p className="text-[11px] text-(--text-muted) mt-1.5">
                  {getRelativeTime(notification.createdAt)}
                </p>

              </div>

            </button>

          ))}

        </div>

      )}

      {/* VIEW ALL */}
      <div className="px-4 py-3 border-t border-(--border)">

        <button
          type="button"
          onClick={() =>
            navigate(
              "/portal/member/dashboard/notifications"
            )
          }
          className="
            w-full
            flex
            items-center
            justify-between
            text-xs
            font-semibold
            text-(--primary)
            hover:text-(--primary-dark)
            transition
          "
        >
          <span>View all notifications</span>
          <ArrowRight size={14} />
        </button>

      </div>

    </div>
  );
};

export default NotificationsCard;