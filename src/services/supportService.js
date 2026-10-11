const API = import.meta.env.VITE_API_URL || "";

const request = async (endpoint, options = {}) => {
    const response = await fetch(`${API}/api/support${endpoint}`, {
        credentials: "include",
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success === false) {
        throw new Error(
            result.message || "Something went wrong. Please try again."
        );
    }

    return result;
};

export const createSupportTicket = ({ category, subject, message }) =>
    request("", {
        method: "POST",
        body: JSON.stringify({ category, subject, message }),
    });

export const getMySupportTickets = () =>
    request("/my");

export const getSupportTicketById = (ticketId) =>
    request(`/${ticketId}`);

export const replyToSupportTicket = (ticketId, message) =>
    request(`/${ticketId}/replies`, {
        method: "POST",
        body: JSON.stringify({ message }),
    });