import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import API from "../config/app.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes
const ACTIVITY_KEY = "nosa_last_activity";
const INACTIVITY_CHECK_INTERVAL = 5 * 1000; // Check every 5 seconds

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const navigate = useNavigate();
  const activityTimeoutRef = useRef(null);
  const lastActivityRef = useRef(0);
  const logoutInProgressRef = useRef(false);
  const lastHeartbeatRef = useRef(0);
const heartbeatInFlightRef = useRef(false);

  // --------------------------------
  // LOGOUT
  // --------------------------------
  const logout = async () => {
    if (logoutInProgressRef.current) return;

    logoutInProgressRef.current = true;

    try {
      await fetch(`${API}/user/logout`, {
        method: "GET",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setAuthError(null);

      localStorage.removeItem(ACTIVITY_KEY);
      lastActivityRef.current = 0;

      if (activityTimeoutRef.current) {
        clearInterval(activityTimeoutRef.current);
        activityTimeoutRef.current = null;
      }

      navigate("/portal/login", { replace: true });
      window.history.replaceState(null, "", "/portal/login");

      logoutInProgressRef.current = false;
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

      // Expire after 5 minutes of inactivity.
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
        lastActivityRef.current = 0;
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

        if (!lastActivity) {
          const now = Date.now();
          localStorage.setItem(ACTIVITY_KEY, String(now));
          lastActivityRef.current = now;
        } else {
          lastActivityRef.current = lastActivity;
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

  const recordActivity = async () => {
    if (logoutInProgressRef.current) return;

    const now = Date.now();

    // Update local activity timestamp.
    localStorage.setItem(ACTIVITY_KEY, String(now));
    lastActivityRef.current = now;

    // Avoid frequent or overlapping heartbeat requests.
    if (
      now - lastHeartbeatRef.current < 30 * 1000 ||
      heartbeatInFlightRef.current
    ) {
      return;
    }

    lastHeartbeatRef.current = now;
    heartbeatInFlightRef.current = true;

    try {
      const response = await fetch(`${API}/auth/activity`, {
        method: "POST",
        credentials: "include",
      });

      if (response.status === 401) {
        await logout();
      }
    } catch (error) {
      console.error("Activity heartbeat failed:", error);
    } finally {
      heartbeatInFlightRef.current = false;
    }
  };

  const events = [
    "mousemove",
    "keydown",
    "click",
    "scroll",
    "touchstart",
  ];

  events.forEach((event) => {
    window.addEventListener(event, recordActivity, {
      passive: true,
    });
  });

  return () => {
    events.forEach((event) => {
      window.removeEventListener(event, recordActivity);
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

    checkInactivity();

    activityTimeoutRef.current = setInterval(
      checkInactivity,
      INACTIVITY_CHECK_INTERVAL
    );

    return () => {
      if (activityTimeoutRef.current) {
        clearInterval(activityTimeoutRef.current);
        activityTimeoutRef.current = null;
      }
    };
  }, [user]);

  // --------------------------------
  // SYNC LOGOUT ACROSS TABS
  // --------------------------------
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === ACTIVITY_KEY && event.newValue === null) {
        setUser(null);
        navigate("/portal/login", { replace: true });
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [navigate]);

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