import API from "../config/app.js";

export const getMyPayments = async () => {
    const response = await fetch(`${API}/api/payments`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to load payment history."
        );
    }

    return data;
};


export const verifyPayment = async (reference) => {
    const response = await fetch(
        `${API}/api/payments/verify/${encodeURIComponent(
            reference
        )}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
                "Failed to verify payment."
        );
    }

    return data;
};