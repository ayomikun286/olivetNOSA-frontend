import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import NosaLoader from "../components/common/NosaLoader.jsx";
import Alert from "../components/common/Alert.jsx";


import MemberDashboard from "../pages/member/Dashboard.jsx";
import AdminDashboard from "../pages/admin/Dashboard.jsx";

const DashboardGateway = () => {
  const { user, loading, authError } = useAuth();

  if (loading) {
    return <NosaLoader />;
  }

  // Email not verified
  if (authError?.status === 403) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert
          type="warning"
          message={authError.message}
        />
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/portal/login" replace />;
  }

  // Role-based dashboard
  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  return <MemberDashboard />;
};

export default DashboardGateway;