import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Dashboard from "../pages/admin/Dashboard.jsx";
import Main from "../pages/admin/Main.jsx";
import Members from "../pages/admin/Members.jsx";
import Obligations from "../pages/admin/Obligations.jsx"
import Payments from "../pages/admin/Payments.jsx"
const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Main />} />
          <Route path="members" element={<Members />} />
          <Route path="obligations" element={<Obligations />} />
          <Route path="payments" element={<Payments />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;