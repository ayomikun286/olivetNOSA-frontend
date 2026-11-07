
import API from "../config/app.js";


const TRACKING_URL = `${API.replace(/\/+$/, "")}/api/analytics/track`;


const getVisitorId = () => {
  let visitorId = localStorage.getItem("nosa_visitor_id");

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("nosa_visitor_id", visitorId);
  }

  return visitorId;
};

const getSessionId = () => {
  let sessionId = sessionStorage.getItem("nosa_session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("nosa_session_id", sessionId);
  }

  return sessionId;
};

export const trackAnalyticsEvent = async ({
  eventType,
  pagePath,
  elementLabel = null,
  targetPath = null,
}) => {
  try {
    const response = await fetch(TRACKING_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType,
        visitorId: getVisitorId(),
        sessionId: getSessionId(),
        pagePath,
        elementLabel,
        targetPath,
      }),
    });

    if (!response.ok) {
      console.error("Analytics tracking failed:", response.status);
    }
  } catch (error) {
    // Analytics must never interrupt the website.
    console.error("Analytics tracking error:", error);
  }
};





export const getAnalyticsDashboard = async ({
    startDate,
    endDate,
} = {}) => {
    try {
        const baseURL = String(API).replace(/\/+$/, "");

        const url = new URL(
            `${baseURL}/api/analytics/dashboard`
        );

        if (startDate) {
            url.searchParams.set(
                "startDate",
                startDate
            );
        }

        if (endDate) {
            url.searchParams.set(
                "endDate",
                endDate
            );
        }

        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message ||
                "Failed to retrieve website analytics."
            );
        }

        return result;

    } catch (error) {
        console.error(
            "Get analytics dashboard error:",
            error
        );

        throw error;
    }
};
