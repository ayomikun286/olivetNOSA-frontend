import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import VerifyEmailLink from "../pages/auth/VerifyEmailLink.jsx";
import VerifyEmail from "../pages/auth/VerifyEmail.jsx";
import Resetpassword from "../pages/auth/Resetpassword.jsx";

import ForgotPassword from "../pages/auth/ForgetPassword.jsx";

const AuthRoutes = () => {
  return (
    <Routes>
      {/* Portal Login */}
      <Route path="/login" element={<Login />} />

      {/* Portal Signup */}
      <Route path="/signup" element={<Signup />} />

      {/* Email Verification */}
      <Route path="/verify-email" element={<VerifyEmailLink />} />  
      
      {/* <Route path="/verify-email/:token" element={<VerifyEmailLink />} />   */}
      <Route path="/VerifyEmail" element={<VerifyEmail />} />;


      {/* password Verification */}
      <Route path="/reset-password" element ={<Resetpassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      
    </Routes>
  );
};

export default AuthRoutes;