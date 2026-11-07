
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackAnalyticsEvent } from "../../services/analytics.service.js";

export default function PublicAnalytics() {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    trackAnalyticsEvent({
      eventType: "page_view",
      pagePath: location.pathname,
    });
  }, [location.pathname]);

  // Track public button and link clicks
  useEffect(() => {
    const handleClick = (event) => {
      const element = event.target.closest(
        "button, a, [role='button']"
      );

      if (!element) return;

      // Ignore elements outside the public website
      if (
        element.closest(
          "[data-no-analytics], .admin-layout, .portal-layout"
        )
      ) {
        return;
      }

      const isLink = element.tagName === "A";
      const eventType = isLink ? "link_click" : "button_click";

      const elementLabel =
        element.innerText?.trim().slice(0, 150) ||
        element.getAttribute("aria-label") ||
        element.getAttribute("title") ||
        "Unnamed element";

      const targetPath = isLink
        ? element.getAttribute("href")
        : null;

      trackAnalyticsEvent({
        eventType,
        pagePath: location.pathname,
        elementLabel,
        targetPath,
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [location.pathname]);

  return null;
}
