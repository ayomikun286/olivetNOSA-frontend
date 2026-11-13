
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    UserRound,
    FileText,
    Eye,
    Download,
    AlertCircle,
    RefreshCw,
    Megaphone
} from "lucide-react";

import { getPublishedAnnouncementById } from "../../services/authService";
import ContentLoading from "../../components/admin/ContentLoading";

const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const AnnouncementDetails = () => {
    const { id } = useParams();

    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const loadAnnouncement = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getPublishedAnnouncementById(id);

                if (!response?.success || !response.announcement) {
                    throw new Error(
                        response?.message || "Unable to load this announcement."
                    );
                }

                if (!cancelled) {
                    setAnnouncement(response.announcement);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.message || "Unable to load this announcement."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadAnnouncement();

        return () => {
            cancelled = true;
        };
    }, [id]);

    if (loading) return <ContentLoading />;

    if (error || !announcement) {
        return (
            <div className="p-4">
                <div className="mx-auto max-w-3xl rounded border border-(--danger)/20 bg-(--bg-white) p-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle
                            size={20}
                            className="mt-0.5 shrink-0 text-(--danger)"
                        />

                        <div>
                            <h2 className="font-semibold text-(--primary)">
                                Announcement unavailable
                            </h2>

                            <p className="mt-2 text-sm text-(--secondary)">
                                {error || "This announcement could not be found."}
                            </p>

                            <Link
                                to="/portal/member/dashboard/announcements"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-(--primary) hover:underline"
                            >
                                <ArrowLeft size={15} />
                                Back to Announcements
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const author = announcement.createdBy
        ? `${announcement.createdBy.firstName || ""} ${announcement.createdBy.lastName || ""
            }`.trim()
        : "Association";

    const attachment = announcement.attachment;

    return (
        <div className="p-4">
            <div className="mx-auto max-w-4xl space-y-5">
                <Link
                    to="/portal/member/dashboard/announcements"
                    className="inline-flex items-center gap-2 text-sm font-medium text-(--primary) transition hover:opacity-70"
                >
                    <ArrowLeft size={17} />
                    Back to Announcements
                </Link>

                <article className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                    <div className="border-b border-(--border) p-5 sm:p-7">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-(--primary)">
                            <Megaphone size={16} />
                            Association Announcement
                        </div>

                        <h1 className="mt-4 break-words text-2xl font-bold leading-tight text-(--primary) sm:text-3xl">
                            {announcement.title}
                        </h1>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                            <span className="flex items-center gap-2 text-xs text-(--text-muted)">
                                <UserRound size={14} />
                                {author || "Association"}
                            </span>

                            <span className="flex items-center gap-2 text-xs text-(--text-muted)">
                                <CalendarDays size={14} />
                                {formatDate(
                                    announcement.publishedAt || announcement.createdAt
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="p-5 sm:p-7">
                        <div className="whitespace-pre-wrap break-words text-sm leading-8 text-black">
                            {announcement.content}
                        </div>

                        {attachment?.url && (
                            <div className="mt-8 rounded border border-(--border) bg-(--bg-light) p-4">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-red-500/10 text-red-600">
                                            <FileText size={21} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-(--primary)">
                                                Attached PDF
                                            </p>

                                            <p className="mt-1 break-all text-xs text-(--text-muted)">
                                                {attachment.fileName ||
                                                    "Announcement attachment.pdf"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <a
                                            href={attachment.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded border border-(--primary) px-4 py-2.5 text-xs font-medium text-(--primary) transition hover:bg-(--primary) hover:text-white"
                                        >
                                            <Eye size={15} />
                                            View PDF
                                        </a>

                                        <a
                                            href={attachment.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={attachment.fileName || true}
                                            className="inline-flex items-center gap-2 rounded border border-(--border) bg-(--bg-white) px-4 py-2.5 text-xs font-medium text-(--secondary) transition hover:bg-(--bg-light)"
                                        >
                                            <Download size={15} />
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default AnnouncementDetails;
