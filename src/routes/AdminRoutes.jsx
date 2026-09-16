import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Dashboard from "../pages/admin/Dashboard.jsx";
import Main from "../pages/admin/Main.jsx";
import Members from "../pages/admin/Members.jsx";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Main />} />
          <Route path="members" element={<Members />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;