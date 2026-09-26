import React, { useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Users,
  X,
  Video,
  Building2,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";

import PageTitle from "../../components/common/PageTitle.jsx";

import { getCalendarEvents } from "../../services/authService.js";

// ============================================================
// HELPERS
// ============================================================

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const padNumber = (number) => String(number).padStart(2, "0");

const getDateKey = (year, month, day) =>
  `${year}-${padNumber(month + 1)}-${padNumber(day)}`;

// ============================================================
// DATABASE DATE → YYYY-MM-DD
// ============================================================

const normalizeEventDate = (date) => {
  if (!date) return "";

  // MongoDB normally returns:
  // 2026-09-12T00:00:00.000Z
  //
  // We only need the calendar date.
  if (typeof date === "string") {
    return date.split("T")[0];
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return `${parsedDate.getFullYear()}-${padNumber(
    parsedDate.getMonth() + 1
  )}-${padNumber(parsedDate.getDate())}`;
};

// ============================================================
// FORMAT DATE
// ============================================================

const formatLongDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// ============================================================
// CATEGORY STYLING
// ============================================================

const getCategoryClasses = (category) => {
  switch (category) {
    case "Meeting":
      return "bg-(--primary-light) text-(--primary)";

    case "NEC":
      return "bg-blue-50 text-blue-700";

    case "Seminar":
      return "bg-purple-50 text-purple-700";

    case "AGM":
      return "bg-amber-50 text-amber-700";

    case "Event":
    default:
      return "bg-green-50 text-green-700";
  }
};

// ============================================================
// COMPONENT
// ============================================================

const Calendar = () => {
  // Current project date is 2026, September.
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 8, 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    getDateKey(2026, 8, 26)
  );

  const [selectedEvent, setSelectedEvent] = useState(null);

  // ============================================================
  // API STATE
  // ============================================================

  const [calendarEvents, setCalendarEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const currentYear = currentDate.getFullYear();

  const currentMonth = currentDate.getMonth();

  // ============================================================
  // LOAD CALENDAR EVENTS
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const loadCalendarEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCalendarEvents({
          year: currentYear,
        });

        if (!isMounted) return;

        const events = Array.isArray(response?.data)
          ? response.data
          : [];

        const normalizedEvents = events.map((event) => ({
          ...event,

          // Keep the rest of the UI working with YYYY-MM-DD.
          date: normalizeEventDate(event.date),
        }));

        setCalendarEvents(normalizedEvents);
      } catch (err) {
        if (!isMounted) return;

        console.error("Load calendar events error:", err);

        setCalendarEvents([]);

        setError(
          err.message || "Unable to load calendar events."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCalendarEvents();

    return () => {
      isMounted = false;
    };
  }, [currentYear]);

  // ============================================================
  // MONTH CALENDAR
  // ============================================================

  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      currentYear,
      currentMonth,
      1
    ).getDay();

    const daysInMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    const previousMonthDays = new Date(
      currentYear,
      currentMonth,
      0
    ).getDate();

    const days = [];

    // Previous month filler days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: previousMonthDays - i,
        currentMonth: false,
        dateKey: null,
      });
    }

    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        currentMonth: true,
        dateKey: getDateKey(
          currentYear,
          currentMonth,
          day
        ),
      });
    }

    // Next month filler days
    const remaining = 42 - days.length;

    for (let day = 1; day <= remaining; day++) {
      days.push({
        day,
        currentMonth: false,
        dateKey: null,
      });
    }

    return days;
  }, [currentYear, currentMonth]);

  // ============================================================
  // EVENTS FOR CURRENT MONTH
  // ============================================================

  const monthEvents = useMemo(() => {
    return calendarEvents.filter((event) => {
      if (!event.date) return false;

      const date = new Date(
        `${event.date}T00:00:00`
      );

      return (
        date.getFullYear() === currentYear &&
        date.getMonth() === currentMonth
      );
    });
  }, [
    calendarEvents,
    currentYear,
    currentMonth,
  ]);

  // ============================================================
  // SELECTED DATE EVENTS
  // ============================================================

  const selectedDateEvents = useMemo(() => {
    return calendarEvents.filter(
      (event) => event.date === selectedDate
    );
  }, [calendarEvents, selectedDate]);

  // ============================================================
  // UPCOMING EVENTS
  // ============================================================

  const upcomingEvents = useMemo(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return [...calendarEvents]
      .filter((event) => {
        if (!event.date) return false;

        const eventDate = new Date(
          `${event.date}T00:00:00`
        );

        return eventDate >= today;
      })
      .sort((a, b) => {
        return (
          new Date(`${a.date}T00:00:00`) -
          new Date(`${b.date}T00:00:00`)
        );
      })
      .slice(0, 5);
  }, [calendarEvents]);

  // ============================================================
  // NAVIGATION
  // ============================================================

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(
        currentYear,
        currentMonth - 1,
        1
      )
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(
        currentYear,
        currentMonth + 1,
        1
      )
    );
  };

  const goToToday = () => {
    const today = new Date();

    setCurrentDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

    setSelectedDate(
      getDateKey(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )
    );
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="p-4">
      <PageTitle
        title="Calendar"
        subtitle="Stay updated with important NOSA meetings, seminars and events."
      />

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-1 mb-5">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-(--primary)">
            {currentYear} NOSA Calendar
          </h1>

          <p className="text-sm text-(--secondary) mt-1">
            Official schedule of NOSA activities for
            {currentYear}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-(--primary-light) text-(--primary) flex items-center justify-center">
            <CalendarDays size={20} />
          </div>

          <div>
            <p className="text-xs text-(--text-muted)">
              Scheduled Events
            </p>

            <p className="text-sm font-semibold text-(--primary)">
              {calendarEvents.length} Events
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          NOTICE
      ====================================================== */}

      <div className="mb-5 rounded border border-(--border) bg-(--bg-white) p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-md bg-(--warning-light) text-(--warning) flex items-center justify-center shrink-0">
            <AlertCircle size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold text-(--primary)">
              Calendar Notice
            </p>

            <p className="text-sm text-(--secondary) mt-1">
              Any change in dates shall be duly communicated.
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mb-5 rounded border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-md bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <AlertCircle size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-red-700">
                Unable to load calendar
              </p>

              <p className="text-sm text-red-600 mt-1">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-5">
        {/* ====================================================
            CALENDAR CARD
        ==================================================== */}

        <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
          {/* Calendar Header */}

          <div className="p-5 border-b border-(--border)">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs text-(--text-muted)">
                  Calendar
                </p>

                <h2 className="text-lg font-semibold text-(--primary) mt-1">
                  {MONTHS[currentMonth]} {currentYear}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToToday}
                  className="px-3 py-2 text-sm font-medium border border-(--border) text-(--primary) rounded hover:bg-(--bg-light) transition"
                >
                  Today
                </button>

                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="w-9 h-9 flex items-center justify-center border border-(--border) rounded text-(--primary) hover:bg-(--bg-light) transition"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="w-9 h-9 flex items-center justify-center border border-(--border) rounded text-(--primary) hover:bg-(--bg-light) transition"
                  aria-label="Next month"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* ==================================================
              LOADING
          ================================================== */}

          {loading ? (
            <div className="p-10 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-(--border) border-t-(--primary) rounded-full animate-spin" />

              <p className="text-sm text-(--text-muted) mt-3">
                Loading calendar...
              </p>
            </div>
          ) : (
            <>
              {/* ==================================================
                  WEEKDAY HEADER
              ================================================== */}

              <div className="grid grid-cols-7 border-b border-(--border)">
                {WEEKDAYS.map((day) => (
                  <div
                    key={day}
                    className="py-3 text-center text-xs font-semibold text-(--text-muted)"
                  >
                    <span className="hidden sm:inline">
                      {day}
                    </span>

                    <span className="sm:hidden">
                      {day.charAt(0)}
                    </span>
                  </div>
                ))}
              </div>

              {/* ==================================================
                  CALENDAR DAYS
              ================================================== */}

              <div className="grid grid-cols-7">
                {calendarDays.map((dayInfo, index) => {
                  const dayEvents = dayInfo.dateKey
                    ? monthEvents.filter(
                        (event) =>
                          event.date ===
                          dayInfo.dateKey
                      )
                    : [];

                  const isSelected =
                    dayInfo.dateKey === selectedDate;

                  const today = new Date();

                  const todayKey = getDateKey(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  );

                  const isToday =
                    dayInfo.dateKey === todayKey;

                  return (
                    <button
                      type="button"
                      key={`${
                        dayInfo.dateKey || "empty"
                      }-${index}`}
                      disabled={!dayInfo.currentMonth}
                      onClick={() => {
                        if (dayInfo.currentMonth) {
                          setSelectedDate(
                            dayInfo.dateKey
                          );
                        }
                      }}
                      className={`
                        relative min-h-[85px] sm:min-h-[105px]
                        p-2 sm:p-3
                        text-left
                        border-r border-b border-(--border)
                        transition
                        ${
                          dayInfo.currentMonth
                            ? "bg-(--bg-white) hover:bg-(--bg-light) cursor-pointer"
                            : "bg-(--bg-light)/40 cursor-default"
                        }
                        ${
                          isSelected
                            ? "ring-2 ring-inset ring-(--primary)"
                            : ""
                        }
                      `}
                    >
                      {/* Date number */}

                      <div className="flex items-center justify-between">
                        <span
                          className={`
                            text-sm font-medium
                            ${
                              dayInfo.currentMonth
                                ? "text-(--primary)"
                                : "text-(--text-muted)/50"
                            }
                            ${
                              isToday
                                ? "w-7 h-7 rounded-full bg-(--primary) text-white flex items-center justify-center"
                                : ""
                            }
                          `}
                        >
                          {dayInfo.day}
                        </span>

                        {dayEvents.length > 0 && (
                          <span className="text-[10px] text-(--text-muted)">
                            {dayEvents.length}
                          </span>
                        )}
                      </div>

                      {/* Event indicators */}

                      {dayEvents.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {dayEvents
                            .slice(0, 2)
                            .map((event) => (
                              <div
                                key={event._id || event.id}
                                className={`
                                  hidden sm:block
                                  truncate
                                  rounded px-1.5 py-1
                                  text-[10px]
                                  font-medium
                                  ${getCategoryClasses(
                                    event.category
                                  )}
                                `}
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}

                          {/* Mobile event dot */}

                          <div className="flex sm:hidden gap-1 mt-2">
                            {dayEvents
                              .slice(0, 3)
                              .map((event) => (
                                <span
                                  key={
                                    event._id ||
                                    event.id
                                  }
                                  className="w-1.5 h-1.5 rounded-full bg-(--primary)"
                                />
                              ))}
                          </div>

                          {dayEvents.length > 2 && (
                            <p className="hidden sm:block text-[10px] text-(--text-muted)">
                              +
                              {dayEvents.length - 2}{" "}
                              more
                            </p>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ==================================================
              LEGEND
          ================================================== */}

          <div className="p-4 border-t border-(--border)">
            <div className="flex flex-wrap items-center gap-4">
              {[
                ["Meeting", "bg-(--primary)"],
                ["NEC", "bg-blue-600"],
                ["Seminar", "bg-purple-600"],
                ["AGM", "bg-amber-500"],
                ["Event", "bg-green-600"],
              ].map(([label, color]) => (
                <div
                  key={label}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${color}`}
                  />

                  <span className="text-xs text-(--text-muted)">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ====================================================
            RIGHT SIDEBAR
        ==================================================== */}

        <div className="space-y-5">
          {/* ==================================================
              SELECTED DATE
          ================================================== */}

          <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
            <div className="p-5 border-b border-(--border)">
              <p className="text-xs text-(--text-muted)">
                Selected Date
              </p>

              <h3 className="text-base font-semibold text-(--primary) mt-1">
                {selectedDate
                  ? formatLongDate(selectedDate)
                  : "Select a date"}
              </h3>
            </div>

            <div className="p-5">
              {selectedDateEvents.length === 0 ? (
                <div className="py-6 text-center">
                  <div className="w-11 h-11 mx-auto rounded-md bg-(--bg-light) text-(--text-muted) flex items-center justify-center">
                    <CalendarDays size={20} />
                  </div>

                  <p className="text-sm font-medium text-(--primary) mt-3">
                    No events scheduled
                  </p>

                  <p className="text-xs text-(--text-muted) mt-1">
                    There are no NOSA events scheduled
                    for this date.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <button
                      key={event._id || event.id}
                      type="button"
                      onClick={() =>
                        setSelectedEvent(event)
                      }
                      className="w-full text-left border border-(--border) rounded p-4 hover:bg-(--bg-light) transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span
                            className={`inline-flex px-2 py-1 rounded text-[10px] font-medium ${getCategoryClasses(
                              event.category
                            )}`}
                          >
                            {event.category}
                          </span>

                          <h4 className="text-sm font-semibold text-(--primary) mt-2">
                            {event.title}
                          </h4>
                        </div>

                        <ArrowUpRight
                          size={16}
                          className="text-(--text-muted) shrink-0"
                        />
                      </div>

                      {event.time && (
                        <div className="flex items-center gap-2 mt-3 text-xs text-(--text-muted)">
                          <Clock3 size={14} />
                          {event.time}
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-2 text-xs text-(--text-muted)">
                        {event.location === "Virtual" ? (
                          <Video size={14} />
                        ) : (
                          <Building2 size={14} />
                        )}

                        {event.location}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ==================================================
              UPCOMING EVENTS
          ================================================== */}

          <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
            <div className="p-5 border-b border-(--border)">
              <h3 className="text-base font-semibold text-(--primary)">
                Upcoming Events
              </h3>

              <p className="text-xs text-(--text-muted) mt-1">
                Next scheduled NOSA activities.
              </p>
            </div>

            <div className="p-4">
              {upcomingEvents.length === 0 ? (
                <p className="text-sm text-(--text-muted) text-center py-5">
                  No upcoming events.
                </p>
              ) : (
                <div className="space-y-2">
                  {upcomingEvents.map((event) => {
                    const eventDate = new Date(
                      `${event.date}T00:00:00`
                    );

                    return (
                      <button
                        key={event._id || event.id}
                        type="button"
                        onClick={() => {
                          setSelectedDate(event.date);

                          setCurrentDate(
                            new Date(
                              eventDate.getFullYear(),
                              eventDate.getMonth(),
                              1
                            )
                          );

                          setSelectedEvent(event);
                        }}
                        className="w-full flex items-start gap-3 text-left p-3 rounded hover:bg-(--bg-light) transition"
                      >
                        <div className="w-10 h-10 rounded-md bg-(--primary-light) text-(--primary) flex flex-col items-center justify-center shrink-0">
                          <span className="text-[10px] font-medium">
                            {eventDate.toLocaleDateString(
                              "en-NG",
                              {
                                month: "short",
                              }
                            )}
                          </span>

                          <span className="text-sm font-semibold">
                            {eventDate.getDate()}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-(--primary) truncate">
                            {event.title}
                          </p>

                          <p className="text-xs text-(--text-muted) mt-1">
                            {event.time ||
                              "Time not specified"}
                          </p>
                        </div>

                        <ArrowUpRight
                          size={15}
                          className="text-(--text-muted) shrink-0 mt-1"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          EVENT DETAILS MODAL
      ====================================================== */}

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}

            <div className="p-5 border-b border-(--border) flex items-start justify-between gap-4">
              <div>
                <span
                  className={`inline-flex px-2 py-1 rounded text-[10px] font-medium ${getCategoryClasses(
                    selectedEvent.category
                  )}`}
                >
                  {selectedEvent.category}
                </span>

                <h3 className="text-lg font-semibold text-(--primary) mt-2">
                  {selectedEvent.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-(--text-muted) hover:bg-(--bg-light) hover:text-(--primary) transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}

            <div className="p-6 space-y-5">
              {/* Date */}

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-(--primary-light) text-(--primary) flex items-center justify-center shrink-0">
                  <CalendarDays size={17} />
                </div>

                <div>
                  <p className="text-xs text-(--text-muted)">
                    Date
                  </p>

                  <p className="text-sm font-medium text-(--primary) mt-1">
                    {formatLongDate(
                      selectedEvent.date
                    )}
                  </p>
                </div>
              </div>

              {/* Time */}

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-(--primary-light) text-(--primary) flex items-center justify-center shrink-0">
                  <Clock3 size={17} />
                </div>

                <div>
                  <p className="text-xs text-(--text-muted)">
                    Time
                  </p>

                  <p className="text-sm font-medium text-(--primary) mt-1">
                    {selectedEvent.time ||
                      "Time not specified"}
                  </p>
                </div>
              </div>

              {/* Host */}

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-(--primary-light) text-(--primary) flex items-center justify-center shrink-0">
                  <Users size={17} />
                </div>

                <div>
                  <p className="text-xs text-(--text-muted)">
                    Host
                  </p>

                  <p className="text-sm font-medium text-(--primary) mt-1">
                    {selectedEvent.host || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Participants */}

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-(--primary-light) text-(--primary) flex items-center justify-center shrink-0">
                  <Users size={17} />
                </div>

                <div>
                  <p className="text-xs text-(--text-muted)">
                    Participants
                  </p>

                  <p className="text-sm font-medium text-(--primary) mt-1">
                    {selectedEvent.participants ||
                      "Not specified"}
                  </p>
                </div>
              </div>

              {/* Location */}

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-(--primary-light) text-(--primary) flex items-center justify-center shrink-0">
                  {selectedEvent.location ===
                  "Virtual" ? (
                    <Video size={17} />
                  ) : (
                    <MapPin size={17} />
                  )}
                </div>

                <div>
                  <p className="text-xs text-(--text-muted)">
                    Location
                  </p>

                  <p className="text-sm font-medium text-(--primary) mt-1">
                    {selectedEvent.location ||
                      "Not specified"}
                  </p>
                </div>
              </div>

              {/* Description */}

              {selectedEvent.description && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-(--primary-light) text-(--primary) flex items-center justify-center shrink-0">
                    <AlertCircle size={17} />
                  </div>

                  <div>
                    <p className="text-xs text-(--text-muted)">
                      Details
                    </p>

                    <p className="text-sm font-medium text-(--primary) mt-1">
                      {selectedEvent.description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}

            <div className="px-6 py-4 border-t border-(--border) flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-(--primary) text-white text-sm font-medium rounded hover:bg-(--primary-dark) transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;