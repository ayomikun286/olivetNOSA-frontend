import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

const PortalRoutes = () => {
  return (
    <Routes>
      {/* Portal Login */}
      <Route path="/login" element={<Login />} />

      {/* Portal Signup */}
      <Route path="/signup" element={<Signup />} />
      
    </Routes>
  );
};

export default PortalRoutes;