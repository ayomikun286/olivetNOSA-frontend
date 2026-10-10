
import React, { useCallback, useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  Clock3,
  ExternalLink,
  Mail,
  Search,
  RefreshCw,
  X,
  ArrowUpRight,
  Building2,
  AlertCircle,
} from "lucide-react";
import ContentLoading from "../../components/admin/ContentLoading.jsx";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [employmentFilter, setEmploymentFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobs/available`,
        {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load job opportunities."
        );
      }

      setJobs(Array.isArray(data.jobs) ? data.jobs : []);
    } catch (err) {
      console.error("Fetch available jobs error:", err);
      setError(err.message || "Unable to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "Not specified";

    return parsed.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;

    const end = new Date(deadline);
    if (Number.isNaN(end.getTime())) return null;

    return Math.ceil(
      (end.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      !query ||
      [
        job.title,
        job.company,
        job.location,
        job.description,
        job.employmentType,
      ].some((value) => String(value || "").toLowerCase().includes(query));

    const matchesType =
      employmentFilter === "all" ||
      job.employmentType === employmentFilter;

    return matchesSearch && matchesType;
  });

  const employmentTypes = [
    ...new Set(jobs.map((job) => job.employmentType).filter(Boolean)),
  ];

  const openApplication = (job) => {
    if (job.applicationUrl) {
      window.open(
        job.applicationUrl,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    if (job.applicationEmail) {
      const subject = encodeURIComponent(`Application for ${job.title}`);
      window.location.href = `mailto:${job.applicationEmail}?subject=${subject}`;
    }
  };

  const hasApplicationMethod = (job) =>
    Boolean(job.applicationUrl || job.applicationEmail);

  if (loading) return <ContentLoading />;

  return (
    <div className="p-4 space-y-5">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
              <BriefcaseBusiness size={20} />
            </div>
            <h1 className="text-xl font-semibold text-(--primary)">
              Jobs & Opportunities
            </h1>
          </div>

          <p className="text-sm text-(--secondary) mt-2">
            Discover career opportunities shared with the ONW GOSA community.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchJobs}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-(--border) rounded text-sm font-medium text-(--primary) hover:bg-(--bg-light) transition"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-(--bg-white) border border-(--border) rounded p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-(--secondary)">Available opportunities</p>
            <BriefcaseBusiness size={19} className="text-(--primary)" />
          </div>
          <p className="text-2xl font-bold text-(--primary) mt-3">
            {jobs.length}
          </p>
          <p className="text-xs text-(--text-muted) mt-1">
            Published opportunities currently accepting applications
          </p>
        </div>

        <div className="bg-(--primary) text-white rounded p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/75">Matching your search</p>
            <Search size={19} className="text-white/80" />
          </div>
          <p className="text-2xl font-bold mt-3">{filteredJobs.length}</p>
          <p className="text-xs text-white/60 mt-1">
            Opportunities matching your selected filters
          </p>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-(--bg-white) border border-(--border) rounded p-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-3">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-muted)"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, company, location..."
              className="w-full pl-10 pr-4 py-3 border border-(--border) rounded text-sm outline-none focus:border-(--primary)"
            />
          </div>

          <select
            value={employmentFilter}
            onChange={(event) => setEmploymentFilter(event.target.value)}
            className="w-full px-3 py-3 border border-(--border) rounded text-sm bg-white text-(--primary) outline-none focus:border-(--primary)"
          >
            <option value="all">All employment types</option>
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-5">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h2 className="font-semibold text-red-800">
                Couldn't load opportunities
              </h2>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                type="button"
                onClick={fetchJobs}
                className="mt-3 text-sm font-semibold text-red-800 underline underline-offset-2"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JOB LIST */}
      {!error && filteredJobs.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredJobs.map((job) => {
            const daysRemaining = getDaysRemaining(job.deadline);

            return (
              <article
                key={job._id}
                className="bg-(--bg-white) border border-(--border) rounded p-5 sm:p-6 flex flex-col hover:border-(--primary)/30 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                    <Building2 size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-(--primary) leading-snug">
                      {job.title}
                    </h2>
                    <p className="text-sm text-(--secondary) mt-1">
                      {job.company}
                    </p>
                  </div>

                  <span className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {job.employmentType}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-(--secondary)">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} />
                    {job.location}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    Deadline: {formatDate(job.deadline)}
                  </span>
                </div>

                {daysRemaining !== null && (
                  <p
                    className={`text-xs mt-3 ${
                      daysRemaining <= 3
                        ? "text-amber-700"
                        : "text-(--text-muted)"
                    }`}
                  >
                    <Clock3 size={13} className="inline mr-1" />
                    {daysRemaining <= 0
                      ? "Deadline has passed"
                      : daysRemaining === 1
                      ? "1 day remaining"
                      : `${daysRemaining} days remaining`}
                  </p>
                )}

                <p className="text-sm text-(--secondary) leading-relaxed mt-4 line-clamp-3 whitespace-pre-line">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-(--border)">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="text-sm font-semibold text-(--primary) hover:underline underline-offset-4"
                  >
                    View details
                  </button>

                  <div className="flex-1" />

                  {hasApplicationMethod(job) ? (
                    <button
                      type="button"
                      onClick={() => openApplication(job)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-(--primary) text-white text-sm font-semibold hover:opacity-90 transition"
                    >
                      Apply now
                      <ArrowUpRight size={16} />
                    </button>
                  ) : (
                    <span className="text-xs text-(--text-muted)">
                      Application details unavailable
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* EMPTY STATE */}
      {!error && filteredJobs.length === 0 && (
        <div className="bg-(--bg-white) border border-(--border) rounded-lg p-10 sm:p-14 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
            <BriefcaseBusiness size={24} />
          </div>

          <h2 className="font-semibold text-(--primary) mt-4">
            {jobs.length === 0
              ? "No opportunities available yet"
              : "No matching opportunities"}
          </h2>

          <p className="text-sm text-(--secondary) max-w-md mx-auto mt-2">
            {jobs.length === 0
              ? "New job opportunities will appear here when they are published."
              : "Try another search term or change the employment type filter."}
          </p>

          {(search || employmentFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setEmploymentFilter("all");
              }}
              className="mt-4 text-sm font-semibold text-(--primary) underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* JOB DETAILS MODAL */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 bg-black/50 px-4 py-6 flex items-center justify-center"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedJob(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-details-title"
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded shadow-xl"
          >
            <div className="sticky top-0 bg-white flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-(--border)">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-(--secondary)">
                  Job opportunity
                </p>
                <h2
                  id="job-details-title"
                  className="text-lg sm:text-xl font-bold text-(--primary) mt-2"
                >
                  {selectedJob.title}
                </h2>
                <p className="text-sm text-(--secondary) mt-1">
                  {selectedJob.company}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                aria-label="Close job details"
                className="p-2 rounded-lg hover:bg-(--bg-light) text-(--secondary)"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-(--bg-light) text-(--secondary) text-xs">
                  <MapPin size={14} />
                  {selectedJob.location}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-(--bg-light) text-(--secondary) text-xs">
                  <BriefcaseBusiness size={14} />
                  {selectedJob.employmentType}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-(--bg-light) text-(--secondary) text-xs">
                  <CalendarDays size={14} />
                  Deadline: {formatDate(selectedJob.deadline)}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-(--primary)">
                Job description
              </h3>
              <p className="text-sm text-(--secondary) leading-7 mt-3 whitespace-pre-line break-words">
                {selectedJob.description}
              </p>

              {hasApplicationMethod(selectedJob) && (
                <div className="mt-6 pt-5 border-t border-(--border)">
                  <p className="text-sm font-semibold text-(--primary)">
                    How to apply
                  </p>

                  {selectedJob.applicationEmail && (
                    <p className="flex items-center gap-2 text-sm text-(--secondary) mt-3 break-all">
                      <Mail size={16} className="shrink-0" />
                      {selectedJob.applicationEmail}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => openApplication(selectedJob)}
                    className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-(--primary) text-white text-sm font-semibold hover:opacity-90 transition"
                  >
                    Apply now
                    {selectedJob.applicationUrl ? (
                      <ExternalLink size={16} />
                    ) : (
                      <Mail size={16} />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
