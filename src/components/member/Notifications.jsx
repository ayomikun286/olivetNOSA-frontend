import {
  Bell,
  ArrowRight,
  Circle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Notifications = ({ notifications = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
      {/* HEADER */}
      <div className="p-4 border-b border-(--border) flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
            <Bell size={17} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-(--text-primary)">
              Notifications
            </h2>

            <p className="text-xs text-(--text-secondary) mt-0.5">
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

      {/* NOTIFICATIONS */}
      {notifications.length === 0 ? (
                <div className="p-6 text-center min-h-80">
                <div className="w-10 h-10 mx-auto rounded-full bg-(--bg-light) text-(--text-muted) flex items-center justify-center">
                    <Bell size={18} />
                </div>

                <p className="text-xs font-medium text-(--text-primary) mt-3">
                    No notifications
                </p>

                <p className="text-xs text-(--text-secondary) mt-1">
                    You're all caught up.
                </p>
                </div>
            ) : (
                <div className="divide-y divide-(--border)">
                {notifications.slice(0, 3).map((notification) => (
                    <button
                    key={notification._id}
                    type="button"
                    onClick={() =>
                        notification.link
                        ? navigate(notification.link)
                        : navigate("/dashboard/notifications")
                    }
                    className="w-full p-3.5 text-left flex gap-3 hover:bg-(--bg-light)/60 transition"
                    >
                    <Circle
                        size={7}
                        fill="currentColor"
                        className={`mt-1.5 shrink-0 ${
                        notification.isRead
                            ? "text-(--text-muted)"
                            : "text-(--secondary)"
                        }`}
                    />

                    <div className="min-w-0">
                        <p className="text-xs font-semibold text-(--text-primary) truncate">
                        {notification.title}
                        </p>

                        <p className="text-xs text-(--text-secondary) mt-0.5 line-clamp-2">
                        {notification.message}
                        </p>

                        <p className="text-[11px] text-(--text-muted) mt-1.5">
                        {notification.date || "Recently"}
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
          onClick={() => navigate("/dashboard/notifications")}
          className="w-full flex items-center justify-between text-xs font-semibold text-(--primary) hover:text-(--primary-dark) transition"
        >
          <span>View all notifications</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Notifications;