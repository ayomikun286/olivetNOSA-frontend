import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardGateway  from "../routes/DashboardGateway.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx";

const MemberRoutes = () => {
  return (
    <Routes>

      <Route element={<ProtectedRoute />}>

        <Route
          path="/dashboard"
          element={<DashboardGateway />}
        />

      </Route>

    </Routes>
  );
};

export default MemberRoutes;