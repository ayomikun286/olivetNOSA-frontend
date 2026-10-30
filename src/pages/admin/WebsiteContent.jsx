import React, { useCallback, useEffect, useState } from "react";
import {
    Globe,
    FileText,
    Save,
    Send,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    Clock3,
    Eye,
    Image as ImageIcon,
    Upload,
} from "lucide-react";

import {
    getAdminWebsiteContent,
    saveWebsiteContentDraft,
    publishWebsiteContent,
    uploadWebsiteContentImage,
} from "../../services/adminService.js";

const WEBSITE_PAGES = {
    home: {
        label: "Home",
        description: "Homepage hero, about, mission, vision and images.",
        fields: [
            "heroTitle",
            "heroSubtitle",
            "heroImage",
            "heroImage2",
            "heroImage3",
            "heroImage4",
            "heroImage5",
            "aboutTitle",
            "aboutText",
            "missionTitle",
            "missionText",
            "visionTitle",
            "visionText",
            "whereItBeganImage",
            "communityImage",
            "newsImage",
            "youtubeImage",
            "instagramImage",
            "archiveImage1",
            "archiveImage2",
            "archiveImage3",
        ],
    },
    "about-school": {
        label: "About the School",
        description: "School history, mission, vision and values.",
        fields: [
            "pageTitle",
            "intro",
            "historyTitle",
            "historyText",
            "mission",
            "vision",
            "values",
            "heroImage",
        ],
    },
    "about-gosa": {
        label: "About ONW NOSA",
        description: "Association history, objectives and introduction.",
        fields: [
            "pageTitle",
            "intro",
            "historyTitle",
            "historyText",
            "mission",
            "vision",
            "objectives",
            "heroImage",
        ],
    },
    contact: {
        label: "Contact",
        description: "Contact details and map link.",
        fields: ["pageTitle", "intro", "address", "email", "phone", "mapUrl"],
    },
    gallery: {
        label: "Gallery",
        description: "Gallery page introduction and hero image.",
        fields: ["pageTitle", "intro", "heroImage"],
    },
    news: {
        label: "News",
        description: "News page title and introduction.",
        fields: ["pageTitle", "intro"],
    },
    events: {
        label: "Events",
        description: "Events page title and introduction.",
        fields: ["pageTitle", "intro"],
    },
    olivetians: {
        label: "Olivetians",
        description: "Olivetians page introduction and hero image.",
        fields: ["pageTitle", "intro", "heroImage"],
    },
    "leaders-chapters": {
        label: "Leaders & Chapters",
        description: "Leadership and chapters page content.",
        fields: ["pageTitle", "intro", "heroImage"],
    },
    "legacy-leadership": {
        label: "Legacy Leadership",
        description: "Legacy leadership introduction and history.",
        fields: ["pageTitle", "intro", "historyText"],
    },
    "privacy-policy": {
        label: "Privacy Policy",
        description: "Privacy policy text and structured sections.",
        fields: ["pageTitle", "intro", "policySections"],
    },
    "terms-and-conditions": {
        label: "Terms & Conditions",
        description: "Terms and conditions text and sections.",
        fields: ["pageTitle", "intro", "termsSections"],
    },
};

const STRUCTURED_FIELDS = new Set(["policySections", "termsSections"]);

const LONG_TEXT_FIELDS = new Set([
    "heroSubtitle",
    "aboutText",
    "missionText",
    "visionText",
    "intro",
    "historyText",
    "mission",
    "vision",
    "values",
    "objectives",
    "address",
]);

const IMAGE_FIELDS = new Set([
    "heroImage",
    "heroImage2",
    "heroImage3",
    "heroImage4",
    "heroImage5",
    "whereItBeganImage",
    "communityImage",
    "newsImage",
    "youtubeImage",
    "instagramImage",
    "archiveImage1",
    "archiveImage2",
    "archiveImage3",
]);

const FIELD_LABELS = {
    heroTitle: "Hero Title",
    heroSubtitle: "Hero Subtitle",
    heroImage: "Hero Image",
    heroImage2: "Hero Image 2",
    heroImage3: "Hero Image 3",
    heroImage4: "Hero Image 4",
    heroImage5: "Hero Image 5",
    aboutTitle: "About Section Title",
    aboutText: "About Section Text",
    missionTitle: "Mission Title",
    missionText: "Mission Text",
    visionTitle: "Vision Title",
    visionText: "Vision Text",
    whereItBeganImage: "Where It Began Image",
    communityImage: "Community Image",
    newsImage: "News Image",
    youtubeImage: "YouTube Image",
    instagramImage: "Instagram Image",
    archiveImage1: "Archive Image 1",
    archiveImage2: "Archive Image 2",
    archiveImage3: "Archive Image 3",
    pageTitle: "Page Title",
    intro: "Introduction",
    historyTitle: "History Title",
    historyText: "History Text",
    mission: "Mission",
    vision: "Vision",
    values: "Values",
    objectives: "Objectives",
    address: "Address",
    email: "Email Address",
    phone: "Phone Number",
    mapUrl: "Map URL",
    policySections: "Privacy Policy Sections (JSON)",
    termsSections: "Terms & Conditions Sections (JSON)",
};

const getFieldLabel = (field) =>
    FIELD_LABELS[field] ||
    field
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (letter) => letter.toUpperCase());

const getInitialContent = (pageKey, draftContent = {}) => {
    const fields = WEBSITE_PAGES[pageKey]?.fields || [];

    return fields.reduce((result, field) => {
        if (Object.prototype.hasOwnProperty.call(draftContent, field)) {
            result[field] = draftContent[field];
        } else if (STRUCTURED_FIELDS.has(field)) {
            result[field] = [];
        } else {
            result[field] = "";
        }

        return result;
    }, {});
};

const normalizeContent = (content, fields) => {
    const result = {};

    for (const field of fields) {
        const value = content[field];

        if (STRUCTURED_FIELDS.has(field)) {
            if (typeof value === "string") {
                try {
                    result[field] = JSON.parse(value || "[]");
                } catch {
                    throw new Error(`${getFieldLabel(field)} must contain valid JSON.`);
                }
            } else {
                result[field] = value ?? [];
            }
        } else {
            result[field] = value ?? "";
        }
    }

    return result;
};

const formatDate = (date) => {
    if (!date) return "Not published yet";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "Unknown";

    return parsedDate.toLocaleString();
};

const WebsiteContent = () => {
    const [selectedPage, setSelectedPage] = useState("home");
    const [pageData, setPageData] = useState(null);
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);
    const [uploadingImage, setUploadingImage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [lastSavedContent, setLastSavedContent] = useState("{}");

    const page = WEBSITE_PAGES[selectedPage];
    const currentContent = JSON.stringify(content);
    const isDirty = currentContent !== lastSavedContent;
    const isBusy = loading || saving || publishing || Boolean(uploadingImage);

    const loadPage = useCallback(async (pageKey) => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const result = await getAdminWebsiteContent(pageKey);
            const initialContent = getInitialContent(
                pageKey,
                result.draftContent || {}
            );

            setPageData(result);
            setContent(initialContent);
            setLastSavedContent(JSON.stringify(initialContent));
        } catch (err) {
            setPageData(null);
            setContent({});
            setLastSavedContent("{}");
            setError(err.message || "Unable to load website content.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPage(selectedPage);
    }, [selectedPage, loadPage]);

    const handleFieldChange = (field, value) => {
        setContent((previous) => ({
            ...previous,
            [field]: value,
        }));

        setSuccess("");
        setError("");
    };

    const handleImageUpload = async (field, file) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError("Image size must not exceed 10 MB.");
            return;
        }

        setUploadingImage(field);
        setError("");
        setSuccess("");

        try {
            const result = await uploadWebsiteContentImage(file);

            if (!result?.success || !result?.imageUrl) {
                throw new Error(
                    result?.message || "The upload did not return an image URL."
                );
            }

            handleFieldChange(field, result.imageUrl);
            setSuccess(
                `${getFieldLabel(field)} uploaded successfully. Save the draft to keep the change.`
            );
        } catch (err) {
            setError(err.message || "Failed to upload image.");
        } finally {
            setUploadingImage("");
        }
    };

    const handlePageChange = (event) => {
        const nextPage = event.target.value;

        if (isDirty) {
            const confirmed = window.confirm(
                "You have unsaved changes. Switch pages and discard those changes?"
            );

            if (!confirmed) return;
        }

        setSelectedPage(nextPage);
    };

    const handleSaveDraft = async () => {
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const normalized = normalizeContent(content, page.fields);
            const result = await saveWebsiteContentDraft(selectedPage, normalized);

            const updatedContent = getInitialContent(
                selectedPage,
                result.draftContent || normalized
            );

            setPageData(result);
            setContent(updatedContent);
            setLastSavedContent(JSON.stringify(updatedContent));
            setSuccess("Draft saved successfully.");
        } catch (err) {
            setError(err.message || "Failed to save draft.");
        } finally {
            setSaving(false);
        }
    };

    const handlePublish = async () => {
        const confirmed = window.confirm(
            `Publish the current ${page.label} content? This will replace the content currently published on the website.`
        );

        if (!confirmed) return;

        setPublishing(true);
        setError("");
        setSuccess("");

        try {
            const normalized = normalizeContent(content, page.fields);

            const savedPage = await saveWebsiteContentDraft(
                selectedPage,
                normalized
            );

            const publishedPage = await publishWebsiteContent(selectedPage);
            const finalPage = publishedPage || savedPage;

            const updatedContent = getInitialContent(
                selectedPage,
                finalPage.draftContent || normalized
            );

            setPageData(finalPage);
            setContent(updatedContent);
            setLastSavedContent(JSON.stringify(updatedContent));
            setSuccess("Website content published successfully.");
        } catch (err) {
            setError(err.message || "Failed to publish website content.");
        } finally {
            setPublishing(false);
        }
    };

    const handleRefresh = () => {
        if (isDirty) {
            const confirmed = window.confirm(
                "Reload this page and discard unsaved changes?"
            );

            if (!confirmed) return;
        }

        loadPage(selectedPage);
    };

    const inputClass =
        "w-full min-w-0 rounded border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm text-(--primary) outline-none transition focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/15";

    const mutedText = "text-sm text-(--text-muted)";

    return (
       <div className="w-full min-w-0 space-y-5 p-4 overflow-hidden">
            <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--secondary)">
                        <Globe size={22} />
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-xl font-semibold text-(--primary)">
                            Website Content
                        </h1>
                        <p className={`mt-1 ${mutedText}`}>
                            Manage public website content, save drafts and publish updates.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={isBusy}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded border border-(--border) bg-(--bg-white) px-3 py-2 text-sm font-medium text-(--primary) transition hover:bg-(--bg-soft) disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            {error && (
                <div className="flex min-w-0 items-start gap-2 rounded border border-(--danger)/20 bg-(--danger)/5 p-3 text-sm text-(--danger)">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <span className="min-w-0 break-words">{error}</span>
                </div>
            )}

            {success && (
                <div className="flex min-w-0 items-start gap-2 rounded border border-(--success)/20 bg-(--success)/5 p-3 text-sm text-(--success)">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                    <span className="min-w-0 break-words">{success}</span>
                </div>
            )}

            <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.65fr)]">
                <section className="min-w-0 rounded border border-(--border) bg-(--bg-white) p-4">
                    <label
                        htmlFor="website-page"
                        className="mb-2 block text-sm font-medium text-(--primary)"
                    >
                        Select website page
                    </label>

                    <select
                        id="website-page"
                        value={selectedPage}
                        onChange={handlePageChange}
                        disabled={isBusy}
                        className={inputClass}
                    >
                        {Object.entries(WEBSITE_PAGES).map(([key, item]) => (
                            <option key={key} value={key}>
                                {item.label}
                            </option>
                        ))}
                    </select>

                    <p className={`mt-2 ${mutedText}`}>{page.description}</p>
                </section>

                <section className="min-w-0 rounded border border-(--border) bg-(--bg-white) p-4">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-(--primary)">
                            Publishing status
                        </span>

                        <span
                            className={`inline-flex shrink-0 items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium ${pageData?.isPublished
                                    ? "bg-(--success)/10 text-(--success)"
                                    : "bg-(--bg-soft) text-(--text-muted)"
                                }`}
                        >
                            {pageData?.isPublished ? (
                                <CheckCircle2 size={13} />
                            ) : (
                                <Clock3 size={13} />
                            )}
                            {pageData?.isPublished ? "Published" : "Not published"}
                        </span>
                    </div>

                    <div className="mt-3 space-y-2">
                        <div className="flex items-start justify-between gap-3 text-sm">
                            <span className={mutedText}>Last published</span>
                            <span className="min-w-0 break-words text-right text-(--primary)">
                                {formatDate(pageData?.publishedAt)}
                            </span>
                        </div>

                        <div className="flex items-start justify-between gap-3 text-sm">
                            <span className={mutedText}>Last updated</span>
                            <span className="min-w-0 break-words text-right text-(--primary)">
                                {formatDate(pageData?.updatedAt)}
                            </span>
                        </div>
                    </div>
                </section>
            </div>
            <div>
                
            <section className="min-w-0 overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="flex min-w-0 flex-col gap-3 border-b border-(--border) p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-2">
                        <FileText size={19} className="shrink-0 text-(--secondary)" />
                        <div className="min-w-0">
                            <h2 className="font-semibold text-(--primary)">
                                Edit {page.label}
                            </h2>
                            <p className={`mt-0.5 ${mutedText}`}>
                                Changes stay in draft until published.
                            </p>
                        </div>
                    </div>

                    {isDirty && (
                        <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-amber-600">
                            <Clock3 size={14} />
                            Unsaved changes
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="flex items-center justify-center gap-2 p-12 text-sm text-(--text-muted)">
                        <RefreshCw size={17} className="animate-spin" />
                        Loading page content...
                    </div>
                ) : (
                    <>
                        <div className="flex min-w-0  flex-col gap-5 p-4">
                            {page.fields.map((field) => {
                                const value = content[field] ?? "";
                                const isStructured = STRUCTURED_FIELDS.has(field);
                                const isImage = IMAGE_FIELDS.has(field);
                                const isLongText = LONG_TEXT_FIELDS.has(field);
                                const isUploading = uploadingImage === field;

                                return (
                                    <div
                                        key={field}
                                        className="w-full min-w-0"
                                    >
                                        <label
                                            htmlFor={`content-${field}`}
                                            className="mb-2 flex items-center gap-2 text-sm font-medium text-(--primary)"
                                        >
                                            {isImage && (
                                                <ImageIcon
                                                    size={15}
                                                    className="shrink-0 text-(--secondary)"
                                                />
                                            )}
                                            {getFieldLabel(field)}
                                        </label>

                                        {isStructured ? (
                                            <>
                                                <textarea
                                                    id={`content-${field}`}
                                                    rows={9}
                                                    value={
                                                        typeof value === "string"
                                                            ? value
                                                            : JSON.stringify(value, null, 2)
                                                    }
                                                    onChange={(event) =>
                                                        handleFieldChange(field, event.target.value)
                                                    }
                                                    spellCheck={false}
                                                    className={`${inputClass} resize-none font-mono text-xs`}
                                                    placeholder={
                                                        '[\n  {\n    "title": "Section title",\n    "content": "Section text"\n  }\n]'
                                                    }
                                                />
                                                <p className={`mt-1.5 ${mutedText}`}>
                                                    Enter valid JSON matching the structure used by your public page.
                                                </p>
                                            </>
                                        ) : isLongText ? (
                                            <textarea
                                                id={`content-${field}`}
                                                rows={field === "heroSubtitle" ? 3 : 5}
                                                maxLength={5000}
                                                value={typeof value === "string" ? value : ""}
                                                onChange={(event) =>
                                                    handleFieldChange(field, event.target.value)
                                                }
                                                className={`${inputClass} resize-none`}
                                                placeholder={`Enter ${getFieldLabel(field).toLowerCase()}...`}
                                            />
                                        ) : (
                                            <input
                                                id={`content-${field}`}
                                                type="text"
                                                maxLength={5000}
                                                value={typeof value === "string" ? value : ""}
                                                onChange={(event) =>
                                                    handleFieldChange(field, event.target.value)
                                                }
                                                className={inputClass}
                                                placeholder={
                                                    isImage
                                                        ? "Paste an image URL or upload an image below"
                                                        : `Enter ${getFieldLabel(field).toLowerCase()}...`
                                                }
                                            />
                                        )}

                                        {isImage && (
                                            <div className="mt-3 min-w-0 space-y-3">
                                                <div className="flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            document.getElementById(`upload-${field}`)?.click()
                                                        }
                                                        disabled={isBusy}
                                                        className="inline-flex max-w-full shrink-0 items-center justify-center gap-2 rounded border border-(--border) bg-(--bg-white) px-3 py-2 text-sm font-medium text-(--primary) transition hover:bg-(--bg-soft) disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {isUploading ? (
                                                            <RefreshCw size={15} className="animate-spin" />
                                                        ) : (
                                                            <Upload size={15} />
                                                        )}
                                                        {isUploading ? "Uploading..." : "Upload image"}
                                                    </button>

                                                    <input
                                                        id={`upload-${field}`}
                                                        type="file"
                                                        accept="image/*"
                                                        className="sr-only"
                                                        disabled={isBusy}
                                                        onChange={(event) => {
                                                            const file = event.target.files?.[0];
                                                            handleImageUpload(field, file);
                                                            event.target.value = "";
                                                        }}
                                                    />

                                                    <span className={`text-xs ${mutedText}`}>
                                                        Images only · Max 10 MB
                                                    </span>
                                                </div>

                                                {typeof value === "string" && value.trim() && (
                                                    <div className="w-full min-w-0 max-w-md overflow-hidden rounded border border-(--border) bg-(--bg-soft)">
                                                        <img
                                                            src={value}
                                                            alt={`${getFieldLabel(field)} preview`}
                                                            className="block h-36 w-full object-cover"
                                                            onError={(event) => {
                                                                event.currentTarget.style.display = "none";
                                                            }}
                                                        />
                                                        <div className="flex items-center gap-1.5 px-3 py-2 text-xs text-(--text-muted)">
                                                            <Eye size={13} />
                                                            Image preview
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex min-w-0 flex-col-reverse gap-3 border-t border-(--border) bg-(--bg-light) p-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className={`text-xs ${mutedText}`}>
                                Saving a draft does not change the live website.
                            </p>

                            <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={handleSaveDraft}
                                    disabled={isBusy}
                                    className="inline-flex items-center justify-center gap-2 rounded border border-(--border) bg-(--bg-white) px-4 py-2.5 text-sm font-medium text-(--primary) transition hover:bg-(--bg-soft) disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save size={16} />
                                    {saving ? "Saving..." : "Save Draft"}
                                </button>

                                <button
                                    type="button"
                                    onClick={handlePublish}
                                    disabled={isBusy}
                                    className="inline-flex items-center justify-center gap-2 rounded bg-(--primary) px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Send size={16} />
                                    {publishing ? "Publishing..." : "Save & Publish"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </section>
            </div>
                
        </div>
    );
};

export default WebsiteContent;