import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import VerifyEmailLink from "../pages/auth/VerifyEmailLink.jsx";
import VerifyEmail from "../pages/auth/VerifyEmail.jsx";
// import Dashboard from "../pages/member/Dashboard.jsx";

const AuthRoutes = () => {
  return (
    <Routes>
      {/* Portal Login */}
      <Route path="/login" element={<Login />} />

      {/* Portal Signup */}
      <Route path="/signup" element={<Signup />} />

      {/* Email Verification */}
      <Route path="/verify-email" element={<VerifyEmailLink />} />  
      <Route path="/verify-email/:token" element={<VerifyEmailLink />} />  
      <Route path="/VerifyEmail" element={<VerifyEmail />} />
      {/* <Route path="/check-email" element={<VerifyEmail />} /> */}

      
    </Routes>
  );
};

export default AuthRoutes;