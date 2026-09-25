import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import PageTitle from "../../components/common/PageTitle.jsx";

import { getPublishedNewsEventBySlug } from "../../services/news-eventsApi.js";

import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Clock,
    MapPin,
} from "lucide-react";

const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

export default function NewsEventDetails() {
    const { slug } = useParams();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);

        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
        });
    }, []);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getPublishedNewsEventBySlug(slug);

                setItem(data.data);
            } catch (err) {
                console.error("Fetch news/event details error:", err);

                setError(
                    err.message || "Unable to load this news or event."
                );
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchItem();
        }
    }, [slug]);

    if (loading) {
        return (
            <main className="min-h-screen bg-white">
                <PageTitle title="Loading | OlivetNOSA" />
                <Navbar />

                <div className="flex min-h-[60vh] items-center justify-center">
                    <p className="text-sm text-[var(--text-muted)]">
                        Loading...
                    </p>
                </div>

                <Footer />
            </main>
        );
    }

    if (error || !item) {
        return (
            <main className="min-h-screen bg-white">
                <PageTitle title="Not Found | OlivetNOSA" />
                <Navbar />

                <section className="flex min-h-[70vh] items-center justify-center px-5">
                    <div className="text-center">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]">
                            News & Events
                        </p>

                        <h1 className="text-4xl font-semibold text-[var(--primary-dark)] sm:text-5xl">
                            Content not found
                        </h1>

                        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[var(--text-muted)]">
                            {error ||
                                "The news or event you are looking for could not be found."}
                        </p>

                        <Link
                            to="/news-events"
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--primary-dark)] px-6 py-3 text-sm font-semibold text-white transition hover:gap-3"
                        >
                            <ArrowLeft size={16} />
                            Back to News & Events
                        </Link>
                    </div>
                </section>

                <Footer />
            </main>
        );
    }

    const isEvent = item.type === "event";

    return (
        <main className="mt-0 bg-white text-[var(--primary-dark)] md:mt-15">
            <PageTitle
                title={`${item.title || "Details"} | OlivetNOSA`}
            />

            <Navbar />

            {/* =====================================================
          HERO
      ====================================================== */}

            <section className="relative overflow-hidden bg-[var(--primary-dark)]">
                <div className="relative h-[55vh] min-h-[420px]">
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-[var(--primary-dark)]" />
                    )}

                    <div className="absolute inset-0 bg-[var(--primary-dark)]/70" />

                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)] via-[var(--primary-dark)]/45 to-transparent" />

                    <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
                        <div
                            data-aos="fade-up"
                            className="max-w-5xl"
                        >
                            <div className="mb-6 flex items-center gap-4">
                                <span className="h-px w-12 bg-[var(--secondary)]" />

                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                                    {isEvent ? "Event" : "News"}
                                </p>
                            </div>

                            <h1 className="max-w-5xl text-4xl font-semibold leading-[1] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                                {item.title}
                            </h1>

                            {item.category && (
                                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                                    {item.category}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
          DETAILS
      ====================================================== */}

            <section className="bg-white py-20 sm:py-28 lg:py-32">
                <div className="mx-auto max-w-5xl px-5 sm:px-8">
                    <div
                        data-aos="fade-up"
                        className="mb-12 flex flex-col gap-6 border-b border-black/10 pb-10"
                    >
                        {isEvent ? (
                            <div className="flex flex-col gap-5 text-sm text-[var(--text-muted)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
                                {item.eventDate && (
                                    <span className="flex items-center gap-2">
                                        <CalendarDays
                                            size={18}
                                            className="text-[var(--secondary)]"
                                        />

                                        {formatDate(item.eventDate)}
                                    </span>
                                )}

                                {item.startTime && (
                                    <span className="flex items-center gap-2">
                                        <Clock
                                            size={18}
                                            className="text-[var(--secondary)]"
                                        />

                                        {item.startTime}

                                        {item.endTime &&
                                            ` - ${item.endTime}`}
                                    </span>
                                )}

                                {item.location && (
                                    <span className="flex items-center gap-2">
                                        <MapPin
                                            size={18}
                                            className="text-[var(--secondary)]"
                                        />

                                        {item.location}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
                                {item.category && (
                                    <span className="text-[var(--secondary)]">
                                        {item.category}
                                    </span>
                                )}

                                {item.category && item.publishedAt && (
                                    <span className="h-px w-8 bg-black/15" />
                                )}

                                {item.publishedAt && (
                                    <span>
                                        {formatDate(item.publishedAt)}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* =================================================
              CONTENT
          ================================================== */}

                    <article
                        data-aos="fade-up"
                        className="max-w-4xl"
                    >
                        {item.excerpt && (
                            <p className="mb-10 text-xl font-medium leading-8 text-[var(--primary-dark)] sm:text-2xl sm:leading-9">
                                {item.excerpt}
                            </p>
                        )}

                        {item.content && (
                            <div className="max-w-4xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                                {item.content}
                            </div>
                        )}
                    </article>

                    {/* =================================================
              BACK
          ================================================== */}

                    <div className="mt-16 border-t border-black/10 pt-8">
                        <Link
                            to="/news"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition hover:gap-3"
                        >
                            <ArrowLeft size={16} />
                            Back to News & Events
                        </Link>
                    </div>
                </div>
            </section>

            {isEvent && item.registrationUrl && (
                <div className="mt-10">
                    <a
                        href={item.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-[var(--primary-dark)] transition hover:gap-3"
                    >
                        Register for this Event
                        <ArrowRight size={17} />
                    </a>
                </div>
            )}

            {/* =====================================================
          CLOSING
      ====================================================== */}

            <section className="bg-[var(--primary-dark)] py-24 text-white sm:py-32">
                <div
                    data-aos="fade-up"
                    className="mx-auto max-w-4xl px-5 text-center sm:px-8"
                >
                    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--secondary)]">
                        OlivetNOSA
                    </p>

                    <h2 className="text-4xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl">
                        Stay connected with the Olivetian community.
                    </h2>

                    <Link
                        to="/news"
                        className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[var(--secondary)] px-7 py-4 text-sm font-semibold text-[var(--primary-dark)] transition hover:gap-3"
                    >
                        More News & Events
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}