import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Dashboard from "../pages/admin/Dashboard.jsx";
import Main from "../pages/admin/Main.jsx";
import Members from "../pages/admin/Members.jsx";
import Obligations from "../pages/admin/Obligations.jsx"
import Payments from "../pages/admin/Payments.jsx";
import Calendar from "../pages/admin/Calendar.jsx";
import AdminYearSet from "../pages/admin/AdminYearSet.jsx";
import AdminChapter from "../pages/admin/AdminChapter.jsx";
import FinancialReports from "../pages/admin/FinancialReports.jsx";
import AuditLogs from "../pages/admin/AuditLogs.jsx";
import NewsEvents from "../pages/admin/NewsEvents.jsx";
import Jobs from "../pages/admin/Jobs.jsx";
import AdminNotifications from "../pages/admin/AdminNotifications.jsx";
import AdminSupport from "../pages/admin/AdminSupport.jsx";

import WebsiteContent from "../pages/admin/WebsiteContent.jsx";
import AdminSettings from "../pages/admin/AdminSettings.jsx";
import Team from "../pages/admin/Team.jsx";
import Gallery from "../pages/admin/Gallery.jsx";

import MemorialManagement from "../pages/admin/MemorialManagement.jsx";




const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Main />} />
          <Route path="members" element={<Members />} />
          <Route path="obligations" element={<Obligations />} />
          <Route path="payments" element={<Payments />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="year-sets" element={<AdminYearSet />} />
          <Route path="chapters" element={<AdminChapter />} />
          <Route path="financial-reports" element={<FinancialReports />} />
          <Route path="news-events" element={<NewsEvents />} />

          <Route path="support" element={<AdminSupport />} />
          <Route
            path="notifications"
            element={<AdminNotifications />}
          />

          <Route
            path="website-content"
            element={<WebsiteContent />}
          />

          <Route path="settings" element={<AdminSettings />} />
          <Route path="team" element={<Team />} />

          <Route path="gallery" element={<Gallery />} />
          <Route path="memorials" element={<MemorialManagement />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="audit-logs" element={<AuditLogs />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;