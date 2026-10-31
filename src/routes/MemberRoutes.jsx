import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute.jsx";





import { useAuth } from "../context/AuthContext.jsx";

import PresidentExcomPage from "../pages/member/PresidentExcomPage.jsx";
import MemberExcomPage from "../pages/member/MemberExcomPage.jsx";


import StewardshipReports from "../pages/member/StewardshipReports.jsx";
import Announcements from "../pages/member/Announcements.jsx";
import Dashboard from "../pages/member/Dashboard.jsx";
import Main from "../pages/member/Main.jsx";
import Profile from "../pages/member/Profile.jsx";
import MyYearSet from "../pages/member/MyYearSet.jsx";
import MyChapter from "../pages/member/MyChapter.jsx";
import Obligations from "../pages/member/MyObligations.jsx";
import Notifications from "../pages/member/Notifications.jsx";
import PaymentHistory from "../pages/member/PaymentHistory.jsx";
import HelpSupport from "../pages/member/HelpSupport.jsx";
import Directory from "../pages/member/Directory.jsx";
import Events from "../pages/member/Events.jsx";
import Memorials from "../pages/member/Memorials.jsx";
import MemberNewsEventDetails from "../pages/member/MemberNewsEventDetails.jsx";
import MemorialSubmission from "../pages/member/MemorialSubmission.jsx";
import FinancialReports from "../pages/member/FinancialReports.jsx";
import Calendar from "../pages/member/Calendar.jsx";
import Jobs from "../pages/member/Jobs.jsx";
import Articles from "../pages/member/Articles.jsx";
import MemberArticleDetails from "../pages/member/MemberArticleDetails.jsx";

const ExcomRoutePage = () => {
  const { user } = useAuth();

  if (user?.role === "president") {
    return <PresidentExcomPage />;
  }

  return <MemberExcomPage />;
};



const MemberRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>

        <Route path="dashboard" element={<Dashboard />}>

          <Route index element={<Main />} />

          <Route path="profile" element={<Profile />} />

          <Route path="year-set" element={<MyYearSet />} />

          <Route path="chapter" element={<MyChapter />} />

          <Route path="my-obligation" element={<Obligations />} />

          <Route path="notifications" element={<Notifications />} />

          <Route path="payment-history" element={<PaymentHistory />} />

          <Route path="help-support" element={<HelpSupport />} />

          <Route path="directory" element={<Directory />} />

          <Route path="events" element={<Events />} />

          <Route
            path="financial-reports"
            element={<FinancialReports />}
          />

          <Route path="events/:slug" element={<MemberNewsEventDetails />} />
          <Route path="memorials" element={<Memorials />} />
          <Route path="memorials/:id" element={<Memorials />} />
          <Route
            path="memorials/submit"
            element={<MemorialSubmission />}
          />

          <Route path="articles" element={<Articles />} />
          <Route path="announcements" element={<Announcements />} />
          <Route
            path="articles/:slug"
            element={<MemberArticleDetails />}
          />
          <Route path="calendar" element={<Calendar />} />

          <Route
            path="stewardship-reports"
            element={<StewardshipReports />}
          />
          <Route path="jobs" element={<Jobs />} />
          <Route path="excom" element={<ExcomRoutePage />} />

        </Route>

      </Route>
    </Routes>
  );
};

export default MemberRoutes;