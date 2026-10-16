
import API from "../config/app.js";

export const getAdminGallery = async () => {
    const response = await fetch(`${API}/api/admin/gallery`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to load gallery.");
    }

    return data;
};

export const createGalleryImage = async (formData) => {
    const response = await fetch(`${API}/api/admin/gallery`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to upload gallery image.");
    }

    return data;
};

export const updateGalleryImage = async (id, updates) => {
  const isFormData = updates instanceof FormData;

  const response = await fetch(
    `${API}/api/admin/gallery/${id}`,
    {
      method: "PATCH",
      headers: isFormData
        ? undefined
        : { "Content-Type": "application/json" },
      credentials: "include",
      body: isFormData
        ? updates
        : JSON.stringify(updates),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update gallery image."
    );
  }

  return data;
};

export const deleteGalleryImage = async (id) => {
    const response = await fetch(`${API}/api/admin/gallery/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete gallery image.");
    }

    return data;
};
