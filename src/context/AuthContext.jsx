import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import API from "../config/app.js";

const AuthContext = createContext(null);

const INACTIVITY_LIMIT = 20 * 60 * 1000; // 20 minutes
const ACTIVITY_KEY = "nosa_last_activity";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const activityTimeoutRef = useRef(null);

  // --------------------------------
  // LOGOUT
  // --------------------------------
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
      localStorage.removeItem(ACTIVITY_KEY);

      if (activityTimeoutRef.current) {
        clearInterval(activityTimeoutRef.current);
        activityTimeoutRef.current = null;
      }

      window.history.replaceState(null, "", "/portal/login");
    }
  };

  // --------------------------------
  // CHECK AUTH
  // --------------------------------
  const checkAuth = async (silent = false) => {
  if (!silent) {
    setLoading(true);
  }

    try {
      const lastActivity = Number(
        localStorage.getItem(ACTIVITY_KEY)
      );

      // Expire if inactive for 2 hours
      if (
        lastActivity &&
        Date.now() - lastActivity >= INACTIVITY_LIMIT
      ) {
        await logout();
        return false;
      }

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
        localStorage.removeItem(ACTIVITY_KEY);
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

        // Only create an activity timestamp if one doesn't exist.
        if (!lastActivity) {
          localStorage.setItem(
            ACTIVITY_KEY,
            Date.now().toString()
          );
        }

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

  // --------------------------------
  // TRACK USER ACTIVITY
  // --------------------------------
  useEffect(() => {
    if (!user) return;

    let lastRecordedActivity = Number(
      localStorage.getItem(ACTIVITY_KEY)
    ) || 0;

    const updateActivity = () => {
      const now = Date.now();

      // Only update once every 30 seconds
      if (now - lastRecordedActivity < 30 * 1000) {
        return;
      }

      lastRecordedActivity = now;

      localStorage.setItem(
        ACTIVITY_KEY,
        now.toString()
      );
    };

    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, [user]);

  // --------------------------------
  // CHECK FOR INACTIVITY
  // --------------------------------
  useEffect(() => {
    if (!user) return;

    const checkInactivity = () => {
      const lastActivity = Number(
        localStorage.getItem(ACTIVITY_KEY)
      );

      if (
        lastActivity &&
        Date.now() - lastActivity >= INACTIVITY_LIMIT
      ) {
        logout();
      }
    };

    // Check every minute
    activityTimeoutRef.current = setInterval(
      checkInactivity,
      60 * 1000
    );

    return () => {
      clearInterval(activityTimeoutRef.current);
      activityTimeoutRef.current = null;
    };
  }, [user]);

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