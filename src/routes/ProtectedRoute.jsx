import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import NosaLoader from "../components/common/NosaLoader.jsx";

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    loading,
    authError,
    checkAuth,
  } = useAuth();

  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <NosaLoader />;
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="mb-3 text-xl font-bold text-red-600">
            Unable to verify your session
          </h1>

          <p className="mb-6 text-gray-600">
            {authError?.message ||
              "Unable to verify your session."}
          </p>

          <button
            onClick={checkAuth}
            className="rounded bg-[var(--primary)] px-5 py-3 font-semibold text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/portal/login"
        replace
        state={{
          from: location,
          state: {
            alert: {
              type: "error",
              title: "Network error",
              message: "Please log in to access your account.",
            },
          },

        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;