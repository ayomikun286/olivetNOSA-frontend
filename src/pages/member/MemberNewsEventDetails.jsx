import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Clock3,
    MapPin,
    Newspaper,
    ImageOff,
    AlertCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import ContentLoading from "../../components/admin/ContentLoading.jsx";
import { getPublishedNewsEventBySlug } from "../../services/news-eventsApi.js";

const MemberNewsEventDetails = () => {
    const { slug } = useParams();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadItem = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getPublishedNewsEventBySlug(slug);

                /*
                 * The API may return the item directly or
                 * inside data depending on the controller response.
                 */
                const result = Array.isArray(data.data)
                    ? data.data[0]
                    : data.data;

                if (!result) {
                    throw new Error(
                        "The requested news or event could not be found."
                    );
                }

                setItem(result);
            } catch (error) {
                console.error(
                    "Member news/event details error:",
                    error
                );

                setError(
                    error.message ||
                        "Unable to load this news or event."
                );
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            loadItem();
        }
    }, [slug]);

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString("en-NG", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    if (loading) {
        return <ContentLoading />;
    }

    return (
        <div className="p-4">
            <div className="max-w-5xl mx-auto">

                {/* BACK */}
                <div className="mb-5">
                    <Link
                        to="/portal/member/dashboard/events"
                        className="inline-flex items-center gap-2 text-sm font-medium text-(--secondary) hover:text-(--primary) transition"
                    >
                        <ArrowLeft size={16} />
                        Back to Events & News
                    </Link>
                </div>

                {/* ERROR */}
                {error ? (
                    <div className="bg-(--bg-white) border border-(--border) rounded p-8">
                        <div className="max-w-md mx-auto text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-(--danger-light) text-(--danger) flex items-center justify-center">
                                <AlertCircle size={21} />
                            </div>

                            <h1 className="font-semibold text-(--primary) mt-4">
                                Unable to load content
                            </h1>

                            <p className="text-sm text-(--secondary) mt-1">
                                {error}
                            </p>

                            <Link
                                to="/portal/member/dashboard/events"
                                className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded bg-(--primary) text-white text-sm font-medium"
                            >
                                Back to Events & News
                            </Link>
                        </div>
                    </div>
                ) : (
                    <article className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

                        {/* IMAGE */}
                        <div className="w-full h-64 sm:h-80 lg:h-[420px] bg-(--bg-light)">
                            {item?.image ? (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-(--text-muted)">
                                    <ImageOff size={36} />
                                </div>
                            )}
                        </div>

                        {/* CONTENT */}
                        <div className="p-5 sm:p-7 lg:p-9">

                            {/* TYPE */}
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-(--primary-light) text-(--primary)">
                                    {item.type === "event" ? (
                                        <CalendarDays size={13} />
                                    ) : (
                                        <Newspaper size={13} />
                                    )}

                                    {item.type === "event"
                                        ? "Event"
                                        : item.category || "News"}
                                </span>
                            </div>

                            {/* TITLE */}
                            <h1 className="text-2xl sm:text-3xl font-bold text-(--primary) mt-4 leading-tight">
                                {item.title}
                            </h1>

                            {/* META */}
                            {item.type === "event" ? (
                                <div className="flex flex-wrap gap-x-6 gap-y-3 mt-5 text-sm text-(--secondary)">

                                    {item.eventDate && (
                                        <div className="inline-flex items-center gap-2">
                                            <CalendarDays
                                                size={16}
                                                className="text-(--primary)"
                                            />

                                            <span>
                                                {formatDate(
                                                    item.eventDate
                                                )}
                                            </span>
                                        </div>
                                    )}

                                    {(item.startTime ||
                                        item.endTime) && (
                                        <div className="inline-flex items-center gap-2">
                                            <Clock3
                                                size={16}
                                                className="text-(--primary)"
                                            />

                                            <span>
                                                {item.startTime || ""}
                                                {item.endTime
                                                    ? ` - ${item.endTime}`
                                                    : ""}
                                            </span>
                                        </div>
                                    )}

                                    {item.location && (
                                        <div className="inline-flex items-center gap-2">
                                            <MapPin
                                                size={16}
                                                className="text-(--primary)"
                                            />

                                            <span>
                                                {item.location}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-(--text-muted) mt-4">
                                    {formatDate(
                                        item.publishedAt ||
                                            item.createdAt
                                    )}
                                </p>
                            )}

                            {/* DIVIDER */}
                            <div className="border-t border-(--border) my-7" />

                            {/* EXCERPT */}
                            {item.excerpt && (
                                <p className="text-base sm:text-lg font-medium text-(--primary) leading-7 mb-5">
                                    {item.excerpt}
                                </p>
                            )}

                            {/* CONTENT */}
                            {item.content && (
                                <div className="max-w-4xl">
                                    <p className="text-sm sm:text-base leading-8 text-(--secondary) whitespace-pre-line">
                                        {item.content}
                                    </p>
                                </div>
                            )}

                            {/* REGISTRATION */}
                            {item.type === "event" &&
                                item.registrationUrl && (
                                    <div className="mt-8">
                                        <a
                                            href={
                                                item.registrationUrl
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition hover:gap-3"
                                        >
                                            Register for this Event
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                )}
                        </div>
                    </article>
                )}
            </div>
        </div>
    );
};

export default MemberNewsEventDetails;