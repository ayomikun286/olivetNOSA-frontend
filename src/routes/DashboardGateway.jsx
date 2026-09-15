import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import NosaLoader from "../components/common/NosaLoader.jsx";
import Alert from "../components/common/Alert.jsx";

const DashboardGateway = () => {
  const { user, loading, authError } = useAuth();

  if (loading) {
    return <NosaLoader />;
  }

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

  if (!user) {
    return <Navigate to="/portal/login" replace />;
  }

  if (user.role === "admin" || user.role === "superAdmin") {
    return <Navigate to="/portal/admin/dashboard" replace />;
  }

  if (user.role === "member") {
    return <Navigate to="/portal/member/dashboard" replace />;
  }

  return <Navigate to="/portal/login" replace />;
};

export default DashboardGateway;