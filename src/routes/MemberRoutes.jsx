import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute.jsx";

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

        </Route>

      </Route>
    </Routes>
  );
};

export default MemberRoutes;