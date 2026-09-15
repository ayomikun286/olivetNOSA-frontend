import { Routes, Route } from "react-router-dom";

import "./App.css";

import PublicRoutes from "./routes/PublicRoutes.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import VerifyEmailLink from "./pages/auth/VerifyEmailLink.jsx";
import VerifyEmail from "./pages/auth/VerifyEmail.jsx";
import Resetpassword from "./pages/auth/Resetpassword.jsx";
import ForgotPassword from "./pages/auth/ForgetPassword.jsx";

import DashboardGateway from "./routes/DashboardGateway.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import MemberRoutes from "./routes/MemberRoutes.jsx";

function App() {
  return (
    <Routes>

      {/* ========================================
          PUBLIC WEBSITE
      ======================================== */}
      <Route path="/*" element={<PublicRoutes />} />


      {/* ========================================
          AUTHENTICATION
      ======================================== */}
      <Route path="/portal/login" element={<Login />} />
      <Route path="/portal/signup" element={<Signup />} />
      <Route path="/portal/verify-email" element={<VerifyEmailLink />} />
      <Route path="/portal/VerifyEmail" element={<VerifyEmail />} />
      <Route path="/portal/reset-password" element={<Resetpassword />} />
      <Route path="/portal/forgot-password" element={<ForgotPassword />} />


      {/* ========================================
          ROLE GATEWAY
      ======================================== */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/portal/dashboard"
          element={<DashboardGateway />}
        />
      </Route>


      {/* ========================================
          MEMBER PORTAL
      ======================================== */}
      <Route
        path="/portal/member/*"
        element={<MemberRoutes />}
      />


      {/* ========================================
          ADMIN PORTAL
      ======================================== */}
      <Route
        path="/portal/admin/*"
        element={<AdminRoutes />}
      />

    </Routes>
  );
}

export default App;