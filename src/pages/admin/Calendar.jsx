import { useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Link2,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  Video,
  X,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard";
import AdminTable from "../../components/admin/AdminTable";
import Alert from "../../components/common/Alert";

import {
  getAdminCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "../../services/adminService";


// ============================================================
// HELPERS
// ============================================================

const padNumber = (number) =>
  String(number).padStart(2, "0");

const getDateKey = (date) => {
  if (!date) return "";

  if (typeof date === "string") {
    const dateOnly = date.split("T")[0];

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
      return dateOnly;
    }
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return `${parsed.getUTCFullYear()}-${padNumber(
    parsed.getUTCMonth() + 1
  )}-${padNumber(parsed.getUTCDate())}`;
};

const parseDate = (date) => {
  const key = getDateKey(date);

  if (!key) return null;

  const [year, month, day] = key
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day);
};

const formatDate = (date) => {
  const parsed = parseDate(date);

  if (!parsed) return "—";

  return parsed.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatLongDate = (date) => {
  const parsed = parseDate(date);

  if (!parsed) return "—";

  return parsed.toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const isUpcoming = (date, status) => {
  if (status === "cancelled") return false;

  const eventDate = parseDate(date);

  if (!eventDate) return false;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return eventDate >= today;
};

const emptyForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  host: "",
  participants: "",
  location: "TBD",
  locationDetails: "",
  meetingPlatform: "",
  meetingLink: "",
  category: "Event",
  status: "scheduled",
};


// ============================================================
// BADGES
// ============================================================

const CategoryBadge = ({ category }) => {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-semibold border border-(--border) bg-(--bg-light) text-(--text)">
      {category || "Event"}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    scheduled:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    rescheduled:
      "bg-amber-50 text-amber-700 border-amber-200",
    cancelled:
      "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-semibold border ${
        styles[status] ||
        "bg-(--bg-light) text-(--text) border-(--border)"
      }`}
    >
      {status
        ? status.charAt(0).toUpperCase() +
          status.slice(1)
        : "Unknown"}
    </span>
  );
};


// ============================================================
// MAIN COMPONENT
// ============================================================

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const [modal, setModal] = useState(null);

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  const [form, setForm] = useState(emptyForm);


  // ==========================================================
  // LOAD EVENTS
  // ==========================================================

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getAdminCalendarEvents({
          year: yearFilter,
          category: categoryFilter,
          status: statusFilter,
          search,
        });

      setEvents(response?.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Failed to load calendar events."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadEvents();
  }, [
    yearFilter,
    categoryFilter,
    statusFilter,
  ]);


  // ==========================================================
  // SEARCH DEBOUNCE
  // ==========================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      loadEvents();
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);


  // ==========================================================
  // STATISTICS
  // ==========================================================

  const statistics = useMemo(() => {
    const total = events.length;

    const upcoming = events.filter((event) =>
      isUpcoming(event.date, event.status)
    ).length;

    const virtual = events.filter(
      (event) => event.location === "Virtual"
    ).length;

    const scheduled = events.filter(
      (event) => event.status === "scheduled"
    ).length;

    return {
      total,
      upcoming,
      virtual,
      scheduled,
    };
  }, [events]);


  // ==========================================================
  // PAGINATION
  // ==========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(events.length / itemsPerPage)
  );

  const paginatedEvents = useMemo(() => {
    const start =
      (currentPage - 1) * itemsPerPage;

    return events.slice(
      start,
      start + itemsPerPage
    );
  }, [events, currentPage]);


  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    categoryFilter,
    statusFilter,
    yearFilter,
  ]);


  // ==========================================================
  // FORM HANDLING
  // ==========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const openCreateModal = () => {
    setSelectedEvent(null);
    setForm(emptyForm);
    setError("");
    setModal("create");
  };


  const openEditModal = (event) => {
    setSelectedEvent(event);

    setForm({
      title: event.title || "",
      description: event.description || "",
      date: getDateKey(event.date),
      time: event.time || "",
      host: event.host || "",
      participants: event.participants || "",
      location: event.location || "TBD",
      locationDetails:
        event.locationDetails || "",
      meetingPlatform:
        event.meetingPlatform || "",
      meetingLink:
        event.meetingLink || "",
      category: event.category || "Event",
      status: event.status || "scheduled",
    });

    setError("");
    setModal("edit");
  };


  const openViewModal = (event) => {
    setSelectedEvent(event);
    setModal("view");
  };


  const closeModal = () => {
    if (saving || deleting) return;

    setModal(null);
    setSelectedEvent(null);
    setForm(emptyForm);
  };


  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!form.title.trim()) {
        setError("Event title is required.");
        return;
      }

      if (!form.date) {
        setError("Event date is required.");
        return;
      }

      if (
        form.location === "Virtual" &&
        !form.meetingLink.trim()
      ) {
        setError(
          "Meeting link is required for virtual events."
        );
        return;
      }

      if (
        form.location === "Physical" &&
        !form.locationDetails.trim()
      ) {
        setError(
          "Location details are required for physical events."
        );
        return;
      }

      const payload = {
        title: form.title.trim(),
        description:
          form.description.trim(),
        date: form.date,
        time: form.time.trim(),
        host: form.host.trim(),
        participants:
          form.participants.trim(),
        location: form.location,
        locationDetails:
          form.location === "Physical"
            ? form.locationDetails.trim()
            : "",
        meetingPlatform:
          form.location === "Virtual"
            ? form.meetingPlatform.trim()
            : "",
        meetingLink:
          form.location === "Virtual"
            ? form.meetingLink.trim()
            : "",
        category: form.category,
        status: form.status,
      };

      if (modal === "create") {
        await createCalendarEvent(payload);

        setSuccess(
          "Calendar event created successfully."
        );
      } else {
        await updateCalendarEvent(
          selectedEvent._id,
          payload
        );

        setSuccess(
          "Calendar event updated successfully."
        );
      }

      closeModal();
      await loadEvents();
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Something went wrong while saving the event."
      );
    } finally {
      setSaving(false);
    }
  };


  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = async () => {
    if (!selectedEvent) return;

    const confirmed = window.confirm(
      `Delete "${selectedEvent.title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");
      setSuccess("");

      await deleteCalendarEvent(
        selectedEvent._id
      );

      setSuccess(
        "Calendar event deleted successfully."
      );

      closeModal();
      await loadEvents();
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Failed to delete calendar event."
      );
    } finally {
      setDeleting(false);
    }
  };


  // ==========================================================
  // RENDER
  // ==========================================================

  const calendarColumns = [
  {
    key: "event",
    label: "Event",
    render: (event) => (
      <div className="min-w-0">

        <p className="text-xs font-semibold text-(--primary) truncate max-w-xs">
          {event.title}
        </p>

        {event.host && (
          <p className="text-[10px] text-(--secondary) mt-1">
            Host: {event.host}
          </p>
        )}

      </div>
    ),
  },

  {
    key: "category",
    label: "Category",
    render: (event) => (
      <CategoryBadge
        category={event.category}
      />
    ),
  },

  {
    key: "date",
    label: "Date",
    render: (event) => (
      <div>

        <p className="text-xs font-medium text-(--primary)">
          {formatDate(event.date)}
        </p>

        {event.time && (
          <p className="text-[10px] text-(--secondary) mt-1">
            {event.time}
          </p>
        )}

      </div>
    ),
  },

  {
    key: "location",
    label: "Location",
    render: (event) => {
      if (event.location === "Virtual") {
        return (
          <div>

            <div className="flex items-center gap-1.5">

              <Video
                size={13}
                className="text-(--primary)"
              />

              <span className="text-xs font-medium text-(--primary)">
                Virtual
              </span>

            </div>

            {event.meetingPlatform && (
              <p className="text-[10px] text-(--secondary) mt-1">
                {event.meetingPlatform}
              </p>
            )}

          </div>
        );
      }

      if (event.location === "Physical") {
        return (
          <div>

            <div className="flex items-center gap-1.5">

              <MapPin
                size={13}
                className="text-(--primary)"
              />

              <span className="text-xs font-medium text-(--primary)">
                Physical
              </span>

            </div>

            {event.locationDetails && (
              <p className="text-[10px] text-(--secondary) mt-1 max-w-[180px] truncate">
                {event.locationDetails}
              </p>
            )}

          </div>
        );
      }

      return (
        <span className="text-xs text-(--secondary)">
          TBD
        </span>
      );
    },
  },

  {
    key: "status",
    label: "Status",
    render: (event) => (
      <StatusBadge
        status={event.status}
      />
    ),
  },

  {
    key: "actions",
    label: "Action",
    render: (event) => (
      <div className="flex justify-end gap-1">

        <button
          type="button"
          onClick={() =>
            openViewModal(event)
          }
          title="View event"
          className="
            w-8 h-8 rounded-lg
            inline-flex items-center
            justify-center
            text-(--secondary)
            hover:bg-(--bg-soft)
            hover:text-(--primary)
            transition
          "
        >
          <Eye size={15} />
        </button>

        <button
          type="button"
          onClick={() =>
            openEditModal(event)
          }
          title="Edit event"
          className="
            w-8 h-8 rounded-lg
            inline-flex items-center
            justify-center
            text-(--secondary)
            hover:bg-(--bg-soft)
            hover:text-(--primary)
            transition
          "
        >
          <Pencil size={15} />
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedEvent(event);
            setModal("delete");
          }}
          title="Delete event"
          className="
            w-8 h-8 rounded-lg
            inline-flex items-center
            justify-center
            text-red-500
            hover:bg-red-50
            transition
          "
        >
          <Trash2 size={15} />
        </button>

      </div>
    ),
  },
];
  return (
    <div className="p-4">
      <div className="space-y-5">

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <h1 className="text-lg font-bold text-(--text)">
              Calendar
            </h1>

            <p className="text-xs text-(--text-muted) mt-1">
              Manage GOSA meetings, seminars, NEC
              sessions, AGM and other important events.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="
              h-9 px-3.5 rounded bg-(--primary)
              text-white text-xs font-semibold
              inline-flex items-center justify-center
              gap-2 hover:opacity-90 transition-opacity
            "
          >
            <Plus size={15} />
            Create Event
          </button>

        </div>


        {/* ================================================== */}
        {/* ALERTS */}
        {/* ================================================== */}

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError("")}
          />
        )}

        {success && (
          <Alert
            type="success"
            message={success}
            onClose={() => setSuccess("")}
          />
        )}


        {/* ================================================== */}
        {/* STATS */}
        {/* ================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

  <AdminStatCard
    icon={CalendarDays}
    iconClass="text-(--primary)"
    iconBg="bg-(--bg-soft)"
    label="Total Events"
    value={statistics.total}
    description="All calendar events"
  />

  <AdminStatCard
    icon={Clock3}
    iconClass="text-blue-600"
    iconBg="bg-blue-50"
    label="Upcoming Events"
    value={statistics.upcoming}
    description="Scheduled from today"
  />

  <AdminStatCard
    icon={Video}
    iconClass="text-purple-600"
    iconBg="bg-purple-50"
    label="Virtual Events"
    value={statistics.virtual}
    description="Online meetings"
  />

  <AdminStatCard
    icon={CalendarDays}
    iconClass="text-emerald-600"
    iconBg="bg-emerald-50"
    label="Scheduled Events"
    value={statistics.scheduled}
    description="Currently scheduled"
  />

</div>


        {/* ================================================== */}
        {/* TABLE */}
        {/* ================================================== */}

        <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

  {/* TABLE HEADER */}

  <div className="px-5 py-4 border-b border-(--border)">

    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">

      <div>
        <h2 className="text-sm font-semibold text-(--primary)">
          All Calendar Events
        </h2>

        <p className="text-[11px] text-(--secondary) mt-1">
          Manage meetings, seminars, NEC, AGM and
          other important events.
        </p>
      </div>


      {/* FILTERS */}

      <div className="flex flex-col sm:flex-row gap-2">

        {/* SEARCH */}

        <div className="relative">

          <Search
            size={14}
            className="
              absolute left-3 top-1/2
              -translate-y-1/2
              text-(--secondary)
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search events..."
            className="
              h-9 w-full sm:w-56
              pl-9 pr-3 rounded
              border border-(--border)
              bg-(--bg-white)
              text-xs text-(--primary)
              outline-none
              focus:border-(--primary)
            "
          />

        </div>


        {/* CATEGORY */}

        <select
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(event.target.value)
          }
          className="
            h-9 px-3 rounded
            border border-(--border)
            bg-(--bg-white)
            text-xs text-(--primary)
            outline-none
            focus:border-(--primary)
          "
        >
          <option value="">
            All Categories
          </option>

          <option value="Meeting">
            Meeting
          </option>

          <option value="Seminar">
            Seminar
          </option>

          <option value="NEC">
            NEC
          </option>

          <option value="AGM">
            AGM
          </option>

          <option value="Event">
            Event
          </option>
        </select>


        {/* STATUS */}

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className="
            h-9 px-3 rounded
            border border-(--border)
            bg-(--bg-white)
            text-xs text-(--primary)
            outline-none
            focus:border-(--primary)
          "
        >
          <option value="">
            All Status
          </option>

          <option value="scheduled">
            Scheduled
          </option>

          <option value="rescheduled">
            Rescheduled
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </select>


        {/* YEAR */}

        <select
          value={yearFilter}
          onChange={(event) =>
            setYearFilter(event.target.value)
          }
          className="
            h-9 px-3 rounded
            border border-(--border)
            bg-(--bg-white)
            text-xs text-(--primary)
            outline-none
            focus:border-(--primary)
          "
        >
          <option value="">
            All Years
          </option>

          {Array.from(
            { length: 7 },
            (_, index) =>
              new Date().getFullYear() -
              2 +
              index
          ).map((year) => (
            <option
              key={year}
              value={year}
            >
              {year}
            </option>
          ))}
        </select>

      </div>

    </div>

  </div>


  {/* ADMIN TABLE */}

  <AdminTable
    columns={calendarColumns}
    data={paginatedEvents}
    loading={loading}
    emptyMessage="No calendar events found."
    rowKey="_id"
  />


  {/* PAGINATION */}

  {!loading && events.length > 0 && (
    <div className="
      px-5 py-3
      border-t border-(--border)
      flex items-center justify-between
    ">

      <p className="text-[11px] text-(--secondary)">
        Showing{" "}
        {Math.min(
          (currentPage - 1) * itemsPerPage + 1,
          events.length
        )}{" "}
        to{" "}
        {Math.min(
          currentPage * itemsPerPage,
          events.length
        )}{" "}
        of {events.length} events
      </p>

      <div className="flex items-center gap-1">

        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((page) =>
              Math.max(1, page - 1)
            )
          }
          className="
            w-8 h-8 rounded-lg
            border border-(--border)
            inline-flex items-center
            justify-center
            disabled:opacity-40
            hover:bg-(--bg-soft)
          "
        >
          <ChevronLeft size={15} />
        </button>

        <span className="text-xs px-2 text-(--secondary)">
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage((page) =>
              Math.min(
                totalPages,
                page + 1
              )
            )
          }
          className="
            w-8 h-8 rounded-lg
            border border-(--border)
            inline-flex items-center
            justify-center
            disabled:opacity-40
            hover:bg-(--bg-soft)
          "
        >
          <ChevronRight size={15} />
        </button>

      </div>

    </div>
  )}

</div>

      </div>


      {/* ==================================================== */}
      {/* CREATE / EDIT MODAL */}
      {/* ==================================================== */}

      {(modal === "create" ||
        modal === "edit") && (
        <div className="
          fixed inset-0 z-50
          flex items-center justify-center
          p-4 bg-black/40
        ">

          <div className="
            w-full max-w-2xl
            max-h-[90vh]
            overflow-y-auto
            bg-(--bg-white)
            rounded
            border border-(--border)
            shadow-xl
          ">

            {/* MODAL HEADER */}

            <div className="
              px-5 py-4
              border-b border-(--border)
              flex items-center justify-between
            ">

              <div>

                <h2 className="text-sm font-semibold text-(--text)">
                  {modal === "create"
                    ? "Create Calendar Event"
                    : "Edit Calendar Event"}
                </h2>

                <p className="text-[11px] text-(--text-muted) mt-1">
                  {modal === "create"
                    ? "Add a new GOSA calendar event."
                    : "Update the details of this calendar event."}
                </p>

              </div>

              <button
                type="button"
                onClick={closeModal}
                className="
                  w-8 h-8 rounded-lg
                  inline-flex items-center
                  justify-center
                  text-(--text-muted)
                  hover:bg-(--bg-light)
                "
              >
                <X size={17} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-5 space-y-5"
            >

              {/* BASIC INFORMATION */}

              <div>

                <h3 className="text-xs font-semibold text-(--primary) mb-3">
                  Basic Information
                </h3>

                <div className="space-y-3">

                  <div>

                    <label className="block text-[11px] font-medium text-(--text) mb-1">
                      Event Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g. 2027 Annual General Meeting"
                      className="
                        w-full h-9 px-3
                        rounded border border-(--border)
                        bg-(--bg-white)
                        text-xs text-(--text)
                        outline-none
                        focus:border-(--primary)
                      "
                    />

                  </div>


                  <div>

                    <label className="block text-[11px] font-medium text-(--text) mb-1">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Brief description of the event..."
                      className="
                        w-full px-3 py-2
                        rounded border border-(--border)
                        bg-(--bg-white)
                        text-xs text-(--text)
                        outline-none resize-none
                        focus:border-(--primary)
                      "
                    />

                  </div>


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    <div>

                      <label className="block text-[11px] font-medium text-(--text) mb-1">
                        Category
                      </label>

                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="
                          w-full h-9 px-3
                          rounded border border-(--border)
                          bg-(--bg-white)
                          text-xs text-(--text)
                          outline-none
                          focus:border-(--primary)
                        "
                      >
                        <option value="Meeting">
                          Meeting
                        </option>

                        <option value="Seminar">
                          Seminar
                        </option>

                        <option value="NEC">
                          NEC
                        </option>

                        <option value="AGM">
                          AGM
                        </option>

                        <option value="Event">
                          Event
                        </option>
                      </select>

                    </div>


                    <div>

                      <label className="block text-[11px] font-medium text-(--text) mb-1">
                        Status
                      </label>

                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="
                          w-full h-9 px-3
                          rounded border border-(--border)
                          bg-(--bg-white)
                          text-xs text-(--text)
                          outline-none
                          focus:border-(--primary)
                        "
                      >
                        <option value="scheduled">
                          Scheduled
                        </option>

                        <option value="rescheduled">
                          Rescheduled
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>
                      </select>

                    </div>

                  </div>

                </div>

              </div>


              {/* DATE & TIME */}

              <div>

                <h3 className="text-xs font-semibold text-(--primary) mb-3">
                  Date & Time
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  <div>

                    <label className="block text-[11px] font-medium text-(--text) mb-1">
                      Date
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="
                        w-full h-9 px-3
                        rounded border border-(--border)
                        bg-(--bg-white)
                        text-xs text-(--text)
                        outline-none
                        focus:border-(--primary)
                      "
                    />

                  </div>


                  <div>

                    <label className="block text-[11px] font-medium text-(--text) mb-1">
                      Time
                    </label>

                    <input
                      type="text"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      placeholder="e.g. 10:00 AM"
                      className="
                        w-full h-9 px-3
                        rounded border border-(--border)
                        bg-(--bg-white)
                        text-xs text-(--text)
                        outline-none
                        focus:border-(--primary)
                      "
                    />

                  </div>

                </div>

              </div>


              {/* EVENT DETAILS */}

              <div>

                <h3 className="text-xs font-semibold text-(--primary) mb-3">
                  Event Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  <div>

                    <label className="block text-[11px] font-medium text-(--text) mb-1">
                      Host
                    </label>

                    <input
                      type="text"
                      name="host"
                      value={form.host}
                      onChange={handleChange}
                      placeholder="e.g. National Executive Committee"
                      className="
                        w-full h-9 px-3
                        rounded border border-(--border)
                        bg-(--bg-white)
                        text-xs text-(--text)
                        outline-none
                        focus:border-(--primary)
                      "
                    />

                  </div>


                  <div>

                    <label className="block text-[11px] font-medium text-(--text) mb-1">
                      Participants
                    </label>

                    <input
                      type="text"
                      name="participants"
                      value={form.participants}
                      onChange={handleChange}
                      placeholder="e.g. All GOSA members"
                      className="
                        w-full h-9 px-3
                        rounded border border-(--border)
                        bg-(--bg-white)
                        text-xs text-(--text)
                        outline-none
                        focus:border-(--primary)
                      "
                    />

                  </div>

                </div>

              </div>


              {/* LOCATION */}

              <div>

                <h3 className="text-xs font-semibold text-(--primary) mb-3">
                  Location
                </h3>

                <div className="space-y-3">

                  <div>

                    <label className="block text-[11px] font-medium text-(--text) mb-1">
                      Location Type
                    </label>

                    <select
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className="
                        w-full h-9 px-3
                        rounded border border-(--border)
                        bg-(--bg-white)
                        text-xs text-(--text)
                        outline-none
                        focus:border-(--primary)
                      "
                    >
                      <option value="Virtual">
                        Virtual
                      </option>

                      <option value="Physical">
                        Physical
                      </option>

                      <option value="TBD">
                        TBD
                      </option>
                    </select>

                  </div>


                  {/* VIRTUAL */}

                  {form.location === "Virtual" && (
                    <div className="
                      p-3 rounded border
                      border-(--border)
                      bg-(--bg-light)
                      space-y-3
                    ">

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        <div>

                          <label className="block text-[11px] font-medium text-(--text) mb-1">
                            Meeting Platform
                          </label>

                          <select
                            name="meetingPlatform"
                            value={
                              form.meetingPlatform
                            }
                            onChange={handleChange}
                            className="
                              w-full h-9 px-3
                              rounded border border-(--border)
                              bg-(--bg-white)
                              text-xs text-(--text)
                              outline-none
                              focus:border-(--primary)
                            "
                          >
                            <option value="">
                              Select platform
                            </option>

                            <option value="Zoom">
                              Zoom
                            </option>

                            <option value="Google Meet">
                              Google Meet
                            </option>

                            <option value="Microsoft Teams">
                              Microsoft Teams
                            </option>

                            <option value="Other">
                              Other
                            </option>
                          </select>

                        </div>


                        <div>

                          <label className="block text-[11px] font-medium text-(--text) mb-1">
                            Meeting Link
                          </label>

                          <input
                            type="url"
                            name="meetingLink"
                            value={
                              form.meetingLink
                            }
                            onChange={handleChange}
                            placeholder="https://..."
                            className="
                              w-full h-9 px-3
                              rounded border border-(--border)
                              bg-(--bg-white)
                              text-xs text-(--text)
                              outline-none
                              focus:border-(--primary)
                            "
                          />

                        </div>

                      </div>

                    </div>
                  )}


                  {/* PHYSICAL */}

                  {form.location === "Physical" && (
                    <div>

                      <label className="block text-[11px] font-medium text-(--text) mb-1">
                        Venue / Location
                      </label>

                      <input
                        type="text"
                        name="locationDetails"
                        value={
                          form.locationDetails
                        }
                        onChange={handleChange}
                        placeholder="e.g. Lagos, Nigeria"
                        className="
                          w-full h-9 px-3
                          rounded border border-(--border)
                          bg-(--bg-white)
                          text-xs text-(--text)
                          outline-none
                          focus:border-(--primary)
                        "
                      />

                    </div>
                  )}

                </div>

              </div>


              {/* RESCHEDULE NOTICE */}

              {modal === "edit" &&
                selectedEvent?.originalDate &&
                selectedEvent?.status ===
                  "rescheduled" && (
                  <div className="
                    p-3 rounded border
                    border-amber-200
                    bg-amber-50
                  ">

                    <p className="text-[11px] font-semibold text-amber-800">
                      Rescheduled Event
                    </p>

                    <p className="text-[11px] text-amber-700 mt-1">
                      Original date:{" "}
                      {formatLongDate(
                        selectedEvent.originalDate
                      )}
                    </p>

                  </div>
                )}


              {/* FORM ACTIONS */}

              <div className="
                pt-2 border-t border-(--border)
                flex items-center justify-end
                gap-2
              ">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="
                    h-9 px-3.5 rounded
                    border border-(--border)
                    text-xs font-medium
                    text-(--text)
                    hover:bg-(--bg-light)
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    h-9 px-3.5 rounded
                    bg-(--primary)
                    text-white
                    text-xs font-semibold
                    inline-flex items-center
                    gap-2
                    hover:opacity-90
                    disabled:opacity-60
                  "
                >

                  {saving && (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  )}

                  {modal === "create"
                    ? "Create Event"
                    : "Save Changes"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}


      {/* ==================================================== */}
      {/* VIEW MODAL */}
      {/* ==================================================== */}

      {modal === "view" &&
        selectedEvent && (
          <div className="
            fixed inset-0 z-50
            flex items-center justify-center
            p-4 bg-black/40
          ">

            <div className="
              w-full max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              bg-(--bg-white)
              rounded
              border border-(--border)
              shadow-xl
            ">

              <div className="
                px-5 py-4
                border-b border-(--border)
                flex items-center justify-between
              ">

                <div>

                  <div className="flex items-center gap-2">

                    <h2 className="text-sm font-semibold text-(--text)">
                      Event Details
                    </h2>

                    <StatusBadge
                      status={
                        selectedEvent.status
                      }
                    />

                  </div>

                  <p className="text-[11px] text-(--text-muted) mt-1">
                    Calendar event information
                  </p>

                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="
                    w-8 h-8 rounded-lg
                    inline-flex items-center
                    justify-center
                    text-(--text-muted)
                    hover:bg-(--bg-light)
                  "
                >
                  <X size={17} />
                </button>

              </div>


              <div className="p-5 space-y-5">

                {/* TITLE */}

                <div>

                  <div className="flex items-center gap-2 mb-2">

                    <CalendarDays
                      size={16}
                      className="text-(--primary)"
                    />

                    <h3 className="text-sm font-semibold text-(--text)">
                      {selectedEvent.title}
                    </h3>

                  </div>

                  <CategoryBadge
                    category={
                      selectedEvent.category
                    }
                  />

                  {selectedEvent.description && (
                    <p className="text-xs text-(--text-muted) leading-5 mt-3">
                      {selectedEvent.description}
                    </p>
                  )}

                </div>


                {/* DATE / TIME */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  <div className="
                    p-3 rounded border
                    border-(--border)
                    bg-(--bg-light)
                  ">

                    <p className="text-[10px] text-(--text-muted)">
                      Date
                    </p>

                    <p className="text-xs font-semibold text-(--text) mt-1">
                      {formatLongDate(
                        selectedEvent.date
                      )}
                    </p>

                  </div>


                  <div className="
                    p-3 rounded border
                    border-(--border)
                    bg-(--bg-light)
                  ">

                    <p className="text-[10px] text-(--text-muted)">
                      Time
                    </p>

                    <p className="text-xs font-semibold text-(--text) mt-1">
                      {selectedEvent.time ||
                        "Not specified"}
                    </p>

                  </div>

                </div>


                {/* RESCHEDULE */}

                {selectedEvent.originalDate &&
                  selectedEvent.status ===
                    "rescheduled" && (
                    <div className="
                      p-3 rounded border
                      border-amber-200
                      bg-amber-50
                    ">

                      <p className="text-[11px] font-semibold text-amber-800">
                        Rescheduled
                      </p>

                      <p className="text-[11px] text-amber-700 mt-1">
                        Original date:{" "}
                        {formatLongDate(
                          selectedEvent.originalDate
                        )}
                      </p>

                      <p className="text-[11px] text-amber-700">
                        New date:{" "}
                        {formatLongDate(
                          selectedEvent.date
                        )}
                      </p>

                    </div>
                  )}


                {/* DETAILS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  {selectedEvent.host && (
                    <div className="
                      p-3 rounded border
                      border-(--border)
                      bg-(--bg-light)
                    ">

                      <div className="flex items-center gap-2">

                        <Users
                          size={14}
                          className="text-(--primary)"
                        />

                        <p className="text-[10px] text-(--text-muted)">
                          Host
                        </p>

                      </div>

                      <p className="text-xs font-semibold text-(--text) mt-1">
                        {selectedEvent.host}
                      </p>

                    </div>
                  )}


                  {selectedEvent.participants && (
                    <div className="
                      p-3 rounded border
                      border-(--border)
                      bg-(--bg-light)
                    ">

                      <div className="flex items-center gap-2">

                        <Users
                          size={14}
                          className="text-(--primary)"
                        />

                        <p className="text-[10px] text-(--text-muted)">
                          Participants
                        </p>

                      </div>

                      <p className="text-xs font-semibold text-(--text) mt-1">
                        {selectedEvent.participants}
                      </p>

                    </div>
                  )}

                </div>


                {/* LOCATION */}

                <div>

                  <h3 className="text-xs font-semibold text-(--primary) mb-3">
                    Location
                  </h3>

                  <div className="
                    p-3 rounded border
                    border-(--border)
                    bg-(--bg-light)
                  ">

                    {selectedEvent.location ===
                    "Virtual" ? (
                      <>

                        <div className="flex items-center gap-2">

                          <Video
                            size={15}
                            className="text-(--primary)"
                          />

                          <div>

                            <p className="text-xs font-semibold text-(--text)">
                              Virtual Meeting
                            </p>

                            {selectedEvent.meetingPlatform && (
                              <p className="text-[10px] text-(--text-muted) mt-1">
                                {
                                  selectedEvent.meetingPlatform
                                }
                              </p>
                            )}

                          </div>

                        </div>

                        {selectedEvent.meetingLink && (
                          <a
                            href={
                              selectedEvent.meetingLink
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              mt-3 h-9 px-3
                              rounded
                              bg-(--primary)
                              text-white
                              text-xs font-semibold
                              inline-flex items-center
                              gap-2
                              hover:opacity-90
                            "
                          >
                            <Link2 size={14} />
                            Open Meeting Link
                          </a>
                        )}

                      </>
                    ) : selectedEvent.location ===
                      "Physical" ? (
                      <div className="flex items-center gap-2">

                        <MapPin
                          size={15}
                          className="text-(--primary)"
                        />

                        <div>

                          <p className="text-xs font-semibold text-(--text)">
                            Physical Location
                          </p>

                          <p className="text-[11px] text-(--text-muted) mt-1">
                            {selectedEvent.locationDetails ||
                              "Location not specified"}
                          </p>

                        </div>

                      </div>
                    ) : (
                      <p className="text-xs text-(--text-muted)">
                        Location to be announced.
                      </p>
                    )}

                  </div>

                </div>


                {/* CREATED / UPDATED */}

                <div className="
                  pt-3 border-t border-(--border)
                  grid grid-cols-1 sm:grid-cols-2
                  gap-3
                ">

                  {selectedEvent.createdBy && (
                    <div>

                      <p className="text-[10px] text-(--text-muted)">
                        Created By
                      </p>

                      <p className="text-xs font-medium text-(--text) mt-1">
                        {
                          selectedEvent.createdBy
                            .firstName
                        }{" "}
                        {
                          selectedEvent.createdBy
                            .lastName
                        }
                      </p>

                    </div>
                  )}


                  {selectedEvent.updatedBy && (
                    <div>

                      <p className="text-[10px] text-(--text-muted)">
                        Last Updated By
                      </p>

                      <p className="text-xs font-medium text-(--text) mt-1">
                        {
                          selectedEvent.updatedBy
                            .firstName
                        }{" "}
                        {
                          selectedEvent.updatedBy
                            .lastName
                        }
                      </p>

                    </div>
                  )}

                </div>


                {/* ACTIONS */}

                <div className="
                  pt-3 border-t border-(--border)
                  flex items-center justify-end
                  gap-2
                ">

                  <button
                    type="button"
                    onClick={() =>
                      openEditModal(
                        selectedEvent
                      )
                    }
                    className="
                      h-9 px-3.5 rounded
                      border border-(--border)
                      text-xs font-semibold
                      inline-flex items-center
                      gap-2
                      hover:bg-(--bg-light)
                    "
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setModal("delete")
                    }
                    className="
                      h-9 px-3.5 rounded
                      bg-red-500
                      text-white
                      text-xs font-semibold
                      inline-flex items-center
                      gap-2
                      hover:opacity-90
                    "
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}


      {/* ==================================================== */}
      {/* DELETE MODAL */}
      {/* ==================================================== */}

      {modal === "delete" &&
        selectedEvent && (
          <div className="
            fixed inset-0 z-50
            flex items-center justify-center
            p-4 bg-black/40
          ">

            <div className="
              w-full max-w-md
              bg-(--bg-white)
              rounded
              border border-(--border)
              shadow-xl
            ">

              <div className="p-5">

                <div className="
                  w-10 h-10 rounded-full
                  bg-red-50
                  flex items-center
                  justify-center
                  text-red-500
                  mb-4
                ">
                  <Trash2 size={18} />
                </div>

                <h2 className="text-sm font-semibold text-(--text)">
                  Delete Calendar Event?
                </h2>

                <p className="text-xs text-(--text-muted) mt-2 leading-5">
                  You are about to permanently delete:
                </p>

                <p className="text-xs font-semibold text-(--text) mt-1">
                  {selectedEvent.title}
                </p>

                <p className="text-[11px] text-red-500 mt-3">
                  This action cannot be undone.
                </p>

              </div>


              <div className="
                px-5 py-3
                border-t border-(--border)
                flex items-center
                justify-end gap-2
              ">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={deleting}
                  className="
                    h-9 px-3.5 rounded
                    border border-(--border)
                    text-xs font-medium
                    hover:bg-(--bg-light)
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="
                    h-9 px-3.5 rounded
                    bg-red-500
                    text-white
                    text-xs font-semibold
                    inline-flex items-center
                    gap-2
                    hover:opacity-90
                    disabled:opacity-60
                  "
                >

                  {deleting && (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  )}

                  Delete Event

                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
};

export default Calendar;