import API from "../config/app.js";

/**
 * Get current user's notifications
 */
export const getMyNotifications = async () => {
    const response = await fetch(`${API}/api/notifications`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to load notifications."
        );
    }

    return data;
};

/**
 * Get unread notification count
 */
export const getUnreadNotificationCount = async () => {
    const response = await fetch(
        `${API}/api/notifications/unread-count`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
                "Failed to get unread notification count."
        );
    }

    return data;
};

/**
 * Mark one notification as read
 */
export const markNotificationAsRead = async (
    notificationId
) => {
    const response = await fetch(
        `${API}/api/notifications/${notificationId}/read`,
        {
            method: "PATCH",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
                "Failed to update notification."
        );
    }

    return data;
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = async () => {
    const response = await fetch(
        `${API}/api/notifications/read-all`,
        {
            method: "PATCH",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
                "Failed to update notifications."
        );
    }

    return data;
};