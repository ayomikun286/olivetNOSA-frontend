
import API from "../config/app.js";

const parseResponse = async (response, fallbackMessage) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
};

// Public news and events
export const getPublishedNewsEvents = async () => {
  const response = await fetch(`${API}/api/news-events`);

  return parseResponse(
    response,
    "Unable to load news and events."
  );
};

// Public news/event details
export const getPublishedNewsEventBySlug = async (slug) => {
  const response = await fetch(
    `${API}/api/news-events/${encodeURIComponent(slug)}`
  );

  return parseResponse(
    response,
    "Unable to load news or event."
  );
};

// Articles available to authenticated members.
// These endpoints must be implemented and protected in the backend.
export const getMemberArticles = async () => {
  const response = await fetch(
    `${API}/member/articles`,
    {
      credentials: "include",
    }
  );

  return parseResponse(
    response,
    "Unable to load articles."
  );
};

// Full article details for authenticated members
export const getMemberArticleBySlug = async (slug) => {
  const response = await fetch(
    `${API}/member/articles/${encodeURIComponent(slug)}`,
    {
      credentials: "include",
    }
  );

  return parseResponse(
    response,
    "Unable to load this article."
  );
};
