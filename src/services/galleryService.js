
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




export const createGalleryImage = (formData, onProgress) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", `${API}/api/admin/gallery`);
        xhr.withCredentials = true;
        xhr.timeout = 120000; // 2 minutes

        xhr.upload.onprogress = (event) => {
            if (!event.lengthComputable) return;

            onProgress?.({
                percentage: Math.round((event.loaded / event.total) * 100),
                loaded: event.loaded,
                total: event.total,
            });
        };

        // Browser has finished sending the request.
        // Backend may still be processing the images.
        xhr.upload.onload = () => {
            onProgress?.({
                percentage: 100,
                loaded: 0,
                total: 0,
                phase: "processing",
            });
        };

        xhr.onload = () => {
            let data;

            try {
                data = JSON.parse(xhr.responseText);
            } catch {
                reject(new Error("Server returned an invalid response."));
                return;
            }

            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(data);
            } else {
                reject(
                    new Error(data.message || "Failed to upload gallery images.")
                );
            }
        };

        xhr.onerror = () => {
            reject(new Error("Network error. Please check your connection."));
        };

        xhr.ontimeout = () => {
            reject(new Error("Upload timed out. Please try again."));
        };

        xhr.onabort = () => {
            reject(new Error("Upload was cancelled."));
        };

        xhr.send(formData);
    });
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





// ============================================================
// ADMIN ALBUM MANAGEMENT
// ============================================================

// Get all albums
export const getAdminAlbums = async () => {
    const response = await fetch(`${API}/api/admin/albums`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to load albums.");
    }

    return data;
};

// Get one album
export const getAdminAlbumById = async (albumId) => {
    const response = await fetch(`${API}/api/admin/albums/${albumId}`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to load album.");
    }

    return data;
};

// Create album
export const createAdminAlbum = async (albumData) => {
    const response = await fetch(`${API}/api/admin/albums`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(albumData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create album.");
    }

    return data;
};

// Update album
export const updateAdminAlbum = async (albumId, albumData) => {
    const response = await fetch(`${API}/api/admin/albums/${albumId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(albumData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update album.");
    }

    return data;
};

// Delete album
export const deleteAdminAlbum = async (albumId) => {
    const response = await fetch(`${API}/api/admin/albums/${albumId}`, {
        method: "DELETE",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete album.");
    }

    return data;
};