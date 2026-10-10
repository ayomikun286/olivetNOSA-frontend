import API from "../config/app.js";

/**
 * Get all jobs for admin management
 */
export const getAdminJobs = async () => {
  const response = await fetch(`${API}/api/jobs`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch jobs.");
  }

  return data;
};

/**
 * Create a job
 */
export const createJob = async (jobData) => {
  const response = await fetch(`${API}/api/jobs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create job.");
  }

  return data;
};

/**
 * Update a job
 */
export const updateJob = async (id, jobData) => {
  if (!id) throw new Error("Job ID is required.");

  const response = await fetch(`${API}/api/jobs/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update job.");
  }

  return data;
};

/**
 * Delete a job
 */
export const deleteJob = async (id) => {
  if (!id) throw new Error("Job ID is required.");

  const response = await fetch(`${API}/api/jobs/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete job.");
  }

  return data;
};

/**
 * Get published, unexpired jobs for eligible members
 */
export const getAvailableJobs = async () => {
  const response = await fetch(`${API}/api/jobs/available`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch available jobs.");
  }

  return data;
};