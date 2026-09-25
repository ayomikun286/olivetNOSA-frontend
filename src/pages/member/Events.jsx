import React, { useEffect, useMemo, useState } from "react";
import {
    CalendarDays,
    Newspaper,
    MapPin,
    Clock3,
    ArrowRight,
    ImageOff,
    AlertCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

import ContentLoading from "../../components/admin/ContentLoading.jsx";
import { getPublishedNewsEvents } from "../../services/news-eventsApi.js";

const Events = () => {
    const [newsEvents, setNewsEvents] = useState([]);
    const [activeTab, setActiveTab] = useState("upcoming");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadNewsEvents = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getPublishedNewsEvents();

                setNewsEvents(data.data || []);
            } catch (error) {
                console.error("Member news/events error:", error);

                setError(
                    error.message ||
                        "Failed to load news and events."
                );
            } finally {
                setLoading(false);
            }
        };

        loadNewsEvents();
    }, []);

    const now = new Date();

    const upcomingEvents = useMemo(() => {
        return newsEvents
            .filter(
                (item) =>
                    item.type === "event" &&
                    item.eventDate &&
                    new Date(item.eventDate) >= now
            )
            .sort(
                (a, b) =>
                    new Date(a.eventDate) -
                    new Date(b.eventDate)
            );
    }, [newsEvents]);

    const pastEvents = useMemo(() => {
        return newsEvents
            .filter(
                (item) =>
                    item.type === "event" &&
                    item.eventDate &&
                    new Date(item.eventDate) < now
            )
            .sort(
                (a, b) =>
                    new Date(b.eventDate) -
                    new Date(a.eventDate)
            );
    }, [newsEvents]);

    const news = useMemo(() => {
        return newsEvents
            .filter((item) => item.type === "news")
            .sort(
                (a, b) =>
                    new Date(b.publishedAt || b.createdAt) -
                    new Date(a.publishedAt || a.createdAt)
            );
    }, [newsEvents]);

    const activeItems =
        activeTab === "upcoming"
            ? upcomingEvents
            : activeTab === "past"
            ? pastEvents
            : news;

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString(
            "en-NG",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };

    const formatEventDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString(
            "en-NG",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );
    };

    if (loading) {
        return <ContentLoading />;
    }

    return (
        <div className="p-4">
            <div className="space-y-5">

                {/* PAGE HEADER */}
                <div>
                    <h1 className="text-xl font-semibold text-(--primary)">
                        Events & News
                    </h1>

                    <p className="text-sm text-(--secondary) mt-1">
                        Stay updated with OlivetNOSA events,
                        announcements and community news.
                    </p>
                </div>

                {/* ERROR */}
                {error && (
                    <div className="border border-(--danger)/20 bg-(--danger)/5 rounded p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle
                                size={18}
                                className="text-(--danger) shrink-0 mt-0.5"
                            />

                            <p className="text-sm text-(--danger)">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* TABS */}
                <div className="bg-(--bg-white) border border-(--border) rounded p-2">
                    <div className="flex flex-wrap gap-1">
                        <button
                            type="button"
                            onClick={() =>
                                setActiveTab("upcoming")
                            }
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium transition ${
                                activeTab === "upcoming"
                                    ? "bg-(--primary) text-white"
                                    : "text-(--secondary) hover:bg-(--bg-light)"
                            }`}
                        >
                            <CalendarDays size={16} />
                            Upcoming Events
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setActiveTab("past")
                            }
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium transition ${
                                activeTab === "past"
                                    ? "bg-(--primary) text-white"
                                    : "text-(--secondary) hover:bg-(--bg-light)"
                            }`}
                        >
                            <Clock3 size={16} />
                            Past Events
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setActiveTab("news")
                            }
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium transition ${
                                activeTab === "news"
                                    ? "bg-(--primary) text-white"
                                    : "text-(--secondary) hover:bg-(--bg-light)"
                            }`}
                        >
                            <Newspaper size={16} />
                            News
                        </button>
                    </div>
                </div>

                {/* CONTENT CARD */}
                <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                    {/* HEADER */}
                    <div className="p-5 border-b border-(--border) flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h2 className="font-semibold text-(--primary)">
                                {activeTab === "upcoming"
                                    ? "Upcoming Events"
                                    : activeTab === "past"
                                    ? "Past Events"
                                    : "Latest News"}
                            </h2>

                            <p className="text-sm text-(--secondary) mt-1">
                                {activeTab === "upcoming"
                                    ? "See what is coming up in the Olivetian community."
                                    : activeTab === "past"
                                    ? "Browse previous OlivetNOSA events."
                                    : "Stay informed about the latest OlivetNOSA updates."}
                            </p>
                        </div>

                        <div className="text-xs text-(--secondary)">
                            {activeItems.length}{" "}
                            {activeItems.length === 1
                                ? "item"
                                : "items"}
                        </div>
                    </div>

                    {/* EMPTY STATE */}
                    {activeItems.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-(--primary-light) text-(--primary) flex items-center justify-center">
                                {activeTab === "news" ? (
                                    <Newspaper size={21} />
                                ) : (
                                    <CalendarDays size={21} />
                                )}
                            </div>

                            <h3 className="font-semibold text-(--primary) mt-4">
                                {activeTab === "upcoming"
                                    ? "No upcoming events"
                                    : activeTab === "past"
                                    ? "No past events"
                                    : "No news available"}
                            </h3>

                            <p className="text-sm text-(--secondary) mt-1 max-w-md mx-auto">
                                {activeTab === "upcoming"
                                    ? "New events will appear here when they are published."
                                    : activeTab === "past"
                                    ? "Previous events will appear here."
                                    : "Published news and announcements will appear here."}
                            </p>
                        </div>
                    ) : (
                        /* ITEMS */
                        <div className="divide-y divide-(--border)">
                            {activeItems.map((item) => (
                                <article
                                    key={item._id}
                                    className="p-5 sm:p-6 hover:bg-(--bg-light)/40 transition"
                                >
                                    <div className="flex flex-col lg:flex-row gap-5">

                                        {/* IMAGE */}
                                        <div className="w-full lg:w-48 h-32 shrink-0 rounded-lg overflow-hidden bg-(--bg-light)">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-(--text-muted)">
                                                    <ImageOff size={24} />
                                                </div>
                                            )}
                                        </div>

                                        {/* CONTENT */}
                                        <div className="flex-1 min-w-0">

                                            {/* TYPE / CATEGORY */}
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-(--primary-light) text-(--primary)">
                                                    {item.type === "event" ? (
                                                        <CalendarDays size={12} />
                                                    ) : (
                                                        <Newspaper size={12} />
                                                    )}

                                                    {item.type === "event"
                                                        ? "Event"
                                                        : item.category ||
                                                          "News"}
                                                </span>
                                            </div>

                                            {/* TITLE */}
                                            <h3 className="text-base font-semibold text-(--primary) mt-3">
                                                {item.title}
                                            </h3>

                                            {/* EXCERPT */}
                                            {item.excerpt && (
                                                <p className="text-sm text-(--secondary) mt-2 line-clamp-2">
                                                    {item.excerpt}
                                                </p>
                                            )}

                                            {/* EVENT DETAILS */}
                                            {item.type === "event" && (
                                                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-xs text-(--text-muted)">
                                                    {item.eventDate && (
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <CalendarDays
                                                                size={13}
                                                            />
                                                            {formatEventDate(
                                                                item.eventDate
                                                            )}
                                                        </span>
                                                    )}

                                                    {(item.startTime ||
                                                        item.endTime) && (
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <Clock3
                                                                size={13}
                                                            />

                                                            {item.startTime ||
                                                                ""}

                                                            {item.endTime
                                                                ? ` - ${item.endTime}`
                                                                : ""}
                                                        </span>
                                                    )}

                                                    {item.location && (
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <MapPin
                                                                size={13}
                                                            />
                                                            {item.location}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* NEWS DATE */}
                                            {item.type === "news" && (
                                                <p className="text-xs text-(--text-muted) mt-3">
                                                    {formatDate(
                                                        item.publishedAt ||
                                                            item.createdAt
                                                    )}
                                                </p>
                                            )}

                                            {/* READ MORE */}
                                            <div className="mt-4">
                                                <Link
                                                    to={`/portal/member/dashboard/events/${item.slug}`}
                                                    className="inline-flex items-center gap-2 text-xs font-semibold text-(--primary) hover:gap-3 transition-all"
                                                >
                                                    Read More
                                                    <ArrowRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;