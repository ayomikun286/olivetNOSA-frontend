import { Routes, Route } from "react-router-dom";

import "./app.css";

import PublicRoutes from "./routes/PublicRoutes.jsx";
import AuthRoutes from "./routes/authRoutes.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import MemberRoutes from "./routes/MemberRoutes.jsx";

function App() {
  return (
    <Routes>

      {/* ========================================
          PUBLIC WEBSITE
      ======================================== */}

      <Route
        path="/*"
        element={<PublicRoutes />}
      />


      {/* ========================================
          AUTHENTICATION
      ======================================== */}

      <Route
        path="/portal/*"
        element={<AuthRoutes />}
      />


      {/* ========================================
          MEMBER PORTAL
      ======================================== */}

      <Route
        path="/portal/member/*"
        element={<MemberRoutes />}
      />


      {/* ========================================
          ADMIN DASHBOARD
      ======================================== */}

      <Route
        path="/admin/*"
        element={<AdminRoutes />}
      />

    </Routes>
  );
}

export default App;