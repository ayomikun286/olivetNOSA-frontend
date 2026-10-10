
import React, { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  MapPin,
  CalendarDays,
  ExternalLink,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard";
import AdminTable from "../../components/admin/AdminTable";
import Alert from "../../components/common/Alert";

import {
  getAdminJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../../services/jobService";

const initialForm = {
  title: "",
  company: "",
  location: "",
  employmentType: "Full-time",
  description: "",
  applicationUrl: "",
  applicationEmail: "",
  deadline: "",
  status: "draft",
};

const employmentTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Remote",
  "Other",
];

const statusStyles = {
  draft: "bg-gray-100 text-gray-700",
  published: "bg-green-100 text-green-700",
  closed: "bg-red-100 text-red-700",
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getJobsFromResponse = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.jobs)) return response.jobs;
  if (Array.isArray(response?.data?.jobs)) return response.data.jobs;
  if (Array.isArray(response?.data)) return response.data;

  return [];
};

const getDateInputValue = (date) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form, setForm] = useState(initialForm);

  const [alert, setAlert] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const loadJobs = async () => {
    try {
      setLoading(true);

      const response = await getAdminJobs();
      setJobs(getJobsFromResponse(response));
    } catch (error) {
      showAlert("error", error.message || "Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const stats = useMemo(() => {
    const now = new Date();

    return {
      total: jobs.length,
      published: jobs.filter(
        (job) =>
          job.status === "published" &&
          new Date(job.deadline) >= now
      ).length,
      drafts: jobs.filter((job) => job.status === "draft").length,
      closed: jobs.filter(
        (job) =>
          job.status === "closed" ||
          new Date(job.deadline) < now
      ).length,
    };
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        [
          job.title,
          job.company,
          job.location,
          job.employmentType,
        ].some((value) =>
          String(value || "").toLowerCase().includes(query)
        );

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "expired"
          ? new Date(job.deadline) < new Date()
          : job.status === statusFilter);

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  const openCreateModal = () => {
    setEditingJob(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);

    setForm({
      title: job.title || "",
      company: job.company || "",
      location: job.location || "",
      employmentType: job.employmentType || "Full-time",
      description: job.description || "",
      applicationUrl: job.applicationUrl || "",
      applicationEmail: job.applicationEmail || "",
      deadline: getDateInputValue(job.deadline),
      status: job.status || "draft",
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingJob(null);
    setForm(initialForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.applicationUrl.trim() && !form.applicationEmail.trim()) {
      showAlert(
        "error",
        "Provide an application link or application email."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,
        title: form.title.trim(),
        company: form.company.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        applicationUrl: form.applicationUrl.trim(),
        applicationEmail: form.applicationEmail.trim(),
        deadline: form.deadline,
      };

      if (editingJob) {
        await updateJob(editingJob._id, payload);
        showAlert("success", "Job updated successfully.");
      } else {
        await createJob(payload);
        showAlert("success", "Job created successfully.");
      }

      setModalOpen(false);
      setEditingJob(null);
      setForm(initialForm);

      await loadJobs();
    } catch (error) {
      showAlert("error", error.message || "Unable to save job.");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (job, status) => {
    try {
      await updateJob(job._id, { status });

      showAlert(
        "success",
        status === "published"
          ? "Job published successfully."
          : status === "closed"
            ? "Job closed successfully."
            : "Job moved to draft."
      );

      await loadJobs();
    } catch (error) {
      showAlert("error", error.message || "Unable to update job status.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteJob(deleteTarget._id);

      setJobs((current) =>
        current.filter((job) => job._id !== deleteTarget._id)
      );

      setDeleteTarget(null);
      showAlert("success", "Job deleted successfully.");
    } catch (error) {
      showAlert("error", error.message || "Unable to delete job.");
    }
  };

  const columns = [
    {
      key: "title",
      label: "JOB",
      render: (job) => (
        <div className="min-w-[180px]">
          <p className="font-semibold">{job.title}</p>
          <p className="text-xs text-(--secondary) mt-1">
            {job.company}
          </p>
        </div>
      ),
    },
    {
      key: "location",
      label: "LOCATION",
      render: (job) => (
        <div className="flex items-center gap-1.5 min-w-[120px]">
          <MapPin size={14} className="text-(--secondary) shrink-0" />
          <span>{job.location}</span>
        </div>
      ),
    },
    {
      key: "employmentType",
      label: "TYPE",
      render: (job) => (
        <span className="whitespace-nowrap">{job.employmentType}</span>
      ),
    },
    {
      key: "deadline",
      label: "DEADLINE",
      render: (job) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <CalendarDays size={14} className="text-(--secondary)" />
          {formatDate(job.deadline)}
        </div>
      ),
    },
    {
      key: "status",
      label: "STATUS",
      render: (job) => {
        const expired = new Date(job.deadline) < new Date();
        const label = expired ? "Expired" : job.status;

        return (
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
              expired ? statusStyles.closed : statusStyles[job.status]
            }`}
          >
            {label}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "ACTIONS",
      render: (job) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Edit job"
            onClick={() => openEditModal(job)}
            className="p-2 rounded-lg hover:bg-(--bg-soft) text-(--primary)"
          >
            <Pencil size={16} />
          </button>

          {job.status === "published" ? (
            <button
              type="button"
              title="Close job"
              onClick={() => handleStatusChange(job, "closed")}
              className="p-2 rounded-lg hover:bg-amber-50 text-amber-700"
            >
              <Eye size={16} />
            </button>
          ) : (
            <button
              type="button"
              title="Publish job"
              onClick={() => handleStatusChange(job, "published")}
              className="p-2 rounded-lg hover:bg-green-50 text-green-700"
              disabled={new Date(job.deadline) < new Date()}
            >
              <ExternalLink size={16} />
            </button>
          )}

          <button
            type="button"
            title="Delete job"
            onClick={() => setDeleteTarget(job)}
            className="p-2 rounded-lg hover:bg-red-50 text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const inputClass =
    "w-full rounded border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm text-(--primary) outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500";

  return (
    <div className="space-y-6 p-4 ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-(--primary)">
            Jobs & Vacancies
          </h1>
          <p className="text-sm text-(--secondary) mt-1">
            Manage job opportunities available to eligible alumni members.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded bg-(--primary) px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus size={18} />
          Add Job
        </button>
      </div>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
  <AdminStatCard
    icon={BriefcaseBusiness}
    iconClass="text-blue-600"
    iconBg="bg-blue-50"
    label="Total Jobs"
    value={stats.total}
    description="All job vacancies created"
  />

  <AdminStatCard
    icon={ExternalLink}
    iconClass="text-green-600"
    iconBg="bg-green-50"
    label="Published Jobs"
    value={stats.published}
    description="Currently published and active"
  />

  <AdminStatCard
    icon={Pencil}
    iconClass="text-amber-600"
    iconBg="bg-amber-50"
    label="Draft Jobs"
    value={stats.drafts}
    description="Saved but not published"
  />

  <AdminStatCard
    icon={Eye}
    iconClass="text-red-600"
    iconBg="bg-red-50"
    label="Closed / Expired"
    value={stats.closed}
    description="No longer accepting applications"
  />
</div>

      <div className="rounded border border-(--border) bg-(--bg-white)">
        <div className="p-4 sm:p-5 border-b border-(--border) flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-(--secondary)"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs, companies, locations..."
              className={`${inputClass} pl-9`}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              ["all", "All Jobs"],
              ["published", "Published"],
              ["draft", "Drafts"],
              ["closed", "Closed"],
              ["expired", "Expired"],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`rounded px-3 py-2 text-xs font-medium transition-colors ${
                  statusFilter === value
                    ? "bg-(--primary) text-white"
                    : "bg-(--bg-soft) text-(--secondary) hover:text-(--primary)"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <AdminTable
          columns={columns}
          data={filteredJobs}
          loading={loading}
          emptyMessage={
            search || statusFilter !== "all"
              ? "No jobs match your filters."
              : "No jobs have been added yet."
          }
        />

        <div className="px-5 py-3 border-t border-(--border) text-xs text-(--secondary)">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded bg-(--bg-white) shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-(--border) bg-(--bg-white) px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-(--primary)">
                  {editingJob ? "Edit Job" : "Add Job Vacancy"}
                </h2>
                <p className="text-xs text-(--secondary) mt-1">
                  Enter the opportunity details below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 hover:bg-(--bg-soft) text-(--secondary)"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-(--primary)">
                    Job Title *
                  </span>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    className={inputClass}
                    placeholder="e.g. Frontend Developer"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-(--primary)">
                    Company *
                  </span>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    className={inputClass}
                    placeholder="Company name"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-(--primary)">
                    Location *
                  </span>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    className={inputClass}
                    placeholder="e.g. Lagos / Remote"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-(--primary)">
                    Employment Type *
                  </span>
                  <select
                    name="employmentType"
                    value={form.employmentType}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    {employmentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-(--primary)">
                    Application Deadline *
                  </span>
                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    min={getDateInputValue(new Date())}
                    required
                    className={inputClass}
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-(--primary)">
                    Status
                  </span>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="closed">Closed</option>
                  </select>
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-(--primary)">
                  Job Description *
                </span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  maxLength={10000}
                  rows={6}
                  className={`${inputClass} resize-y`}
                  placeholder="Describe the role, responsibilities, and requirements..."
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-(--primary)">
                    Application URL
                  </span>
                  <input
                    type="url"
                    name="applicationUrl"
                    value={form.applicationUrl}
                    onChange={handleChange}
                    maxLength={2048}
                    className={inputClass}
                    placeholder="https://..."
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-(--primary)">
                    Application Email
                  </span>
                  <input
                    type="email"
                    name="applicationEmail"
                    value={form.applicationEmail}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="careers@example.com"
                  />
                </label>
              </div>

              <p className="text-xs text-(--secondary)">
                Provide at least one application method: a URL or email.
              </p>

              {form.status === "published" && (
                <p className="rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
                  Published jobs become visible to eligible financial members
                  while their application deadline remains active.
                </p>
              )}

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-(--border) pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded border border-(--border) px-4 py-2.5 text-sm font-medium text-(--primary) hover:bg-(--bg-soft)"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded bg-(--primary) px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingJob
                      ? "Save Changes"
                      : "Create Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-(--bg-white) p-6 shadow-xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={21} />
            </div>

            <h2 className="text-lg font-semibold text-(--primary)">
              Delete this job?
            </h2>

            <p className="mt-2 text-sm text-(--secondary)">
              Are you sure you want to delete "{deleteTarget.title}"? This
              action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-(--border) px-4 py-2 text-sm text-(--primary)"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;