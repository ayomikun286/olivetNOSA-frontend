import API from "../config/app.js";

// ============================================================
// SIGN UP
// ============================================================

export const Sign_up = async (formData) => {
  try {
    const res = await fetch(`${API}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const contentType = res.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      data = {
        message:
          text || "Server returned an invalid response.",
      };
    }

    return {
      ok: res.ok,
      data,
    };
  } catch (err) {
    console.error("Signup request error:", err);

    return {
      ok: false,
      data: {
        message:
          err.message ||
          "Unable to connect to the server.",
      },
    };
  }
};

// ============================================================
// LOGIN
// ============================================================

export const LoginUser = async (formData) => {
  try {
    const res = await fetch(`${API}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const contentType = res.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      data = {
        message:
          text || "Server returned an invalid response.",
      };
    }

    return {
      ok: res.ok,
      data,
    };
  } catch (err) {
    console.error("Login request error:", err);

    return {
      ok: false,
      data: {
        message:
          err.message ||
          "Unable to connect to the server.",
      },
    };
  }
};

// ============================================================
// VERIFY EMAIL
// ============================================================

export const VerifyEmail = async (token) => {
  try {
    const res = await fetch(
      `${API}/user/verify-email?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const contentType = res.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      data = {
        success: false,
        message: text || "Server returned an invalid response.",
      };
    }

    return {
      ok: res.ok,
      ...data,
    };
  } catch (error) {
    console.error("Email verification error:", error);

    return {
      ok: false,
      success: false,
      message:
        error.message || "Unable to connect to the server.",
    };
  }
};

// ============================================================
// CHECK VERIFICATION STATUS
// ============================================================

export const checkVerificationStatus = async (email) => {
  try {
    const res = await fetch(
      `${API}/user/verification-status?email=${encodeURIComponent(
        email
      )}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const contentType =
      res.headers.get("content-type") || "";

    let data;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      data = {
        message:
          text || "Server returned an invalid response.",
      };
    }

    return {
      ok: res.ok,
      data,
    };
  } catch (err) {
    console.error(
      "Check verification status error:",
      err
    );

    return {
      ok: false,
      data: {
        message:
          err.message ||
          "Unable to check verification status.",
      },
    };
  }
};