import React from "react";
import { Routes, Route } from "react-router-dom";

import DashboardGateway from "../routes/DashboardGateway.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Main from "../pages/member/Main.jsx";
import Profile from "../pages/member/Profile.jsx";
import MyYearSet from "../pages/member/MyYearSet.jsx";
import MyChapter from "../pages/member/MyChapter.jsx";
import Obligations from "../pages/member/MyObligations.jsx";
import Notifications from "../pages/member/Notifications.jsx";
import PaymentHistory from "../pages/member/PaymentHistory.jsx";
import HelpSupport from "../pages/member/HelpSupport.jsx";
import Directory from "../pages/member/Directory.jsx";
const MemberRoutes = () => {
  return (
    <Routes>

      <Route element={<ProtectedRoute />}>

        <Route path="dashboard" element={<DashboardGateway />}>

          {/* /portal/member/dashboard */}
          <Route index element={<Main />} />

          {/* /portal/member/dashboard/profile */}
          <Route path="profile" element={<Profile />} />


          {/* /portal/member/dashboard/My-Year-Set */}
          <Route path="year-set" element={<MyYearSet />} />

          {/* /portal/member/dashboard/Chapter */}
          <Route path="chapter" element={<MyChapter />} />


          {/* /portal/member/dashboard/my-obligation */}
          <Route path="my-obligation" element={<Obligations />} />


          {/* /portal/member/dashboard/notifications */}
          <Route path="notifications" element={<Notifications />} />

          {/* /portal/member/dashboard/payment-history */}
          <Route path="payment-history" element={<PaymentHistory />} />

          {/* /portal/member/dashboard/help-support*/}
          <Route path="help-support" element={<HelpSupport />} />

           {/* /portal/member/dashboard/help-support*/}
          <Route path="directory" element={<Directory />} />

        </Route>

      </Route>

    </Routes>
  );
};

export default MemberRoutes;