import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminDashboard from "../pages/admin/Dashboard.jsx";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>

        <Route path="dashboard" element={<AdminDashboard />} />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;