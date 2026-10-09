import API from "../config/app.js";// Adjust this import to match where your API constant is exported from.

/*
|--------------------------------------------------------------------------
| Get Admin News & Events
|--------------------------------------------------------------------------
*/
export const getAdminNewsEvents = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  const response = await fetch(
    `${API}/api/admin/news-events${query.toString() ? `?${query}` : ""}`,
    { credentials: "include" }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch news and events.");
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Create News & Event
|--------------------------------------------------------------------------
*/
export const createNewsEvent = async (formData) => {
  const response = await fetch(`${API}/api/admin/news-events`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create news/event.");
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Update News & Event
|--------------------------------------------------------------------------
*/
export const updateNewsEvent = async (id, formData) => {
  if (!id) throw new Error("News/event ID is required.");

  const response = await fetch(`${API}/api/admin/news-events/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update news/event.");
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Delete News & Event
|--------------------------------------------------------------------------
*/
export const deleteNewsEvent = async (id) => {
  if (!id) throw new Error("News/event ID is required.");

  const response = await fetch(`${API}/api/admin/news-events/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete news/event.");
  }

  return data;
};