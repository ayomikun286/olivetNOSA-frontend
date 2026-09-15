import API from "../config/app.js";

export const getAdminDashboard = async () => {
  const response = await fetch(
    `${API}/api/admin/dashboard`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to load admin dashboard."
    );
  }

  return data;
};