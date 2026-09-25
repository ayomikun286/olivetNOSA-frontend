import API from "../config/app.js";

export const getPublishedNewsEvents = async () => {
  const response = await fetch(`${API}/api/news-events`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to load news and events."
    );
  }

  return data;
};

export const getPublishedNewsEventBySlug = async (slug) => {
  const response = await fetch(`${API}/api/news-events/${slug}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to load news or event."
    );
  }

  return data;
};