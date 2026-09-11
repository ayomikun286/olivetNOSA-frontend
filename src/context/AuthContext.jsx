import React, {
  createContext,
  useContext,
  useState,
} from "react";

import API from "../config/app.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const checkAuth = async () => {
    setLoading(true);
    setAuthError(null);

    try {
      const response = await fetch(`${API}/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.status === 401) {
        setUser(null);
        return false;
      }

      if (!response.ok) {
        setUser(null);

        setAuthError({
          status: response.status,
          message:
            data?.message ||
            "Unable to verify your session. Please try again.",
        });

        return false;
      }

      if (data?.success && data?.data) {
        setUser(data.data);
        console.log(data.data)
        return true;
      }

      setUser(null);

      setAuthError({
        status: response.status,
        message: "We couldn't verify your account session.",
      });

      return false;

    } catch (error) {
      console.error("Auth check failed:", error);

      setUser(null);

      setAuthError({
        status: null,
        message:
          "Unable to connect to the server. Please check your internet connection and try again.",
      });

      return false;

    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setAuthError(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        checkAuth,
        authError,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};