import React from "react";
import { Routes, Route } from "react-router-dom";

import DashboardGateway from "../routes/DashboardGateway.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Main from "../pages/member/Main.jsx";
import Profile from "../pages/member/Profile.jsx";

const MemberRoutes = () => {
  return (
    <Routes>

      <Route element={<ProtectedRoute />}>

        <Route path="dashboard" element={<DashboardGateway />}>

          {/* /portal/member/dashboard */}
          <Route index element={<Main />} />

          {/* /portal/member/dashboard/profile */}
          <Route path="profile" element={<Profile />} />

        </Route>

      </Route>

    </Routes>
  );
};

export default MemberRoutes;