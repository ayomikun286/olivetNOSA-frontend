
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackAnalyticsEvent } from "../../services/analytics.service.js";

export default function PublicAnalytics() {
  const location = useLocation();

  useEffect(() => {
    trackAnalyticsEvent({
      eventType: "page_view",
      pagePath: location.pathname,
    });
  }, [location.pathname]);

  return null;
}
