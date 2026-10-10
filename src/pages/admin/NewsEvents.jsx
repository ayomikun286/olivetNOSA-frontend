
import React, { useEffect, useMemo, useState } from "react";
import {
    Newspaper,
    CalendarDays,
    Plus,
    Search,
    Eye,
    Pencil,
    Trash2,
    X,
    RefreshCw,
    Loader2,
    Image as ImageIcon,
    MapPin,
    Star,
    FileText,
    Globe,
    Users,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";
import Alert from "../../components/common/Alert.jsx";

import {
    getAdminNewsEvents,
    createNewsEvent,
    updateNewsEvent,
    deleteNewsEvent,
} from "../../services/newsEventService.js";

const EMPTY_FORM = {
    title: "",
    slug: "",
    type: "news",
    category: "",
    excerpt: "",
    content: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    location: "",
    registrationUrl: "",
    visibility: "public",
    isPublished: false,
    isFeatured: false,
};

const CONTENT_TYPES = ["news", "event", "article"];

const getItems = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.newsEvents)) return response.newsEvents;
    if (Array.isArray(response?.data?.newsEvents)) {
        return response.data.newsEvents;
    }
    if (Array.isArray(response?.data?.items)) {
        return response.data.items;
    }
    if (Array.isArray(response?.items)) return response.items;

    return [];
};

const slugify = (value) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const getTypeLabel = (type) => {
    if (type === "event") return "Event";
    if (type === "article") return "Article";
    return "News";
};

const StatusBadge = ({ published }) => (
    <span
        className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-medium ${
            published
                ? "bg-(--success-light) text-(--success)"
                : "bg-(--warning-light) text-(--warning)"
        }`}
    >
        {published ? "Published" : "Draft"}
    </span>
);

const VisibilityBadge = ({ visibility }) => {
    const membersOnly = visibility === "members";

    return (
        <span
            className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium ${
                membersOnly
                    ? "bg-(--primary-light) text-(--primary)"
                    : "bg-(--bg-light) text-(--secondary)"
            }`}
        >
            {membersOnly ? <Users size={12} /> : <Globe size={12} />}
            {membersOnly ? "Members only" : "Public"}
        </span>
    );
};

const NewsEvents = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [alert, setAlert] = useState(null);

    const [previewItem, setPreviewItem] = useState(null);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [visibilityFilter, setVisibilityFilter] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState({ ...EMPTY_FORM });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [autoSlug, setAutoSlug] = useState(true);

    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState("");
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const showAlert = (type, message) => setAlert({ type, message });

    // Release temporary image preview URLs when they are replaced or removed.
    useEffect(() => {
        if (!imagePreview.startsWith("blob:")) return undefined;

        return () => URL.revokeObjectURL(imagePreview);
    }, [imagePreview]);

    const loadItems = async () => {
        try {
            setLoading(true);
            setPageError("");

            const response = await getAdminNewsEvents();
            setItems(getItems(response));
        } catch (error) {
            console.error("Failed to load news and events:", error);
            setPageError(
                error?.message || "Failed to load news and events."
            );
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const filteredItems = useMemo(() => {
        const query = search.trim().toLowerCase();

        return items.filter((item) => {
            const matchesSearch =
                !query ||
                item.title?.toLowerCase().includes(query) ||
                item.slug?.toLowerCase().includes(query) ||
                item.category?.toLowerCase().includes(query);

            const matchesType =
                !typeFilter || item.type === typeFilter;

            const published = Boolean(item.isPublished);

            const matchesStatus =
                !statusFilter ||
                (statusFilter === "published" && published) ||
                (statusFilter === "draft" && !published);

            const visibility = item.visibility || "public";

            const matchesVisibility =
                !visibilityFilter || visibility === visibilityFilter;

            return (
                matchesSearch &&
                matchesType &&
                matchesStatus &&
                matchesVisibility
            );
        });
    }, [
        items,
        search,
        typeFilter,
        statusFilter,
        visibilityFilter,
    ]);

    const stats = useMemo(
        () => ({
            total: items.length,
            news: items.filter((item) => item.type === "news").length,
            events: items.filter((item) => item.type === "event").length,
            articles: items.filter((item) => item.type === "article").length,
            published: items.filter((item) => item.isPublished).length,
            drafts: items.filter((item) => !item.isPublished).length,
        }),
        [items]
    );

    const resetForm = () => {
        setForm({ ...EMPTY_FORM });
        setImage(null);
        setImagePreview("");
        setEditingItem(null);
        setAutoSlug(true);
        setFormError("");
    };

    const openCreateModal = () => {
        resetForm();
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);

        setForm({
            title: item.title || "",
            slug: item.slug || "",
            type: CONTENT_TYPES.includes(item.type)
                ? item.type
                : "news",
            category: item.category || "",
            excerpt: item.excerpt || "",
            content: item.content || "",
            eventDate: item.eventDate
                ? new Date(item.eventDate).toISOString().slice(0, 10)
                : "",
            startTime: item.startTime || "",
            endTime: item.endTime || "",
            location: item.location || "",
            registrationUrl: item.registrationUrl || "",
            visibility:
                item.visibility === "members" ? "members" : "public",
            isPublished: Boolean(item.isPublished),
            isFeatured: Boolean(item.isFeatured),
        });

        setImage(null);
        setImagePreview(item.image || "");
        setAutoSlug(false);
        setFormError("");
        setModalOpen(true);
    };

    const closeModal = () => {
        if (saving) return;

        setModalOpen(false);
        resetForm();
    };

    const handleFieldChange = (event) => {
        const { name, value, type, checked } = event.target;
        const nextValue = type === "checkbox" ? checked : value;

        setForm((current) => {
            const updated = {
                ...current,
                [name]: nextValue,
            };

            if (name === "title" && autoSlug) {
                updated.slug = slugify(value);
            }

            // Event-only fields should not remain attached to news/articles.
            if (name === "type" && value !== "event") {
                updated.eventDate = "";
                updated.startTime = "";
                updated.endTime = "";
                updated.location = "";
                updated.registrationUrl = "";
            }

            return updated;
        });
    };

    const handleSlugChange = (event) => {
        setAutoSlug(false);

        setForm((current) => ({
            ...current,
            slug: slugify(event.target.value),
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setFormError("Please select a valid image file.");
            event.target.value = "";
            return;
        }

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setFormError("");
    };

    const validateForm = () => {
        if (!form.title.trim()) {
            return "Please enter a title.";
        }

        if (!form.slug.trim()) {
            return "Please enter a URL slug.";
        }

        if (!CONTENT_TYPES.includes(form.type)) {
            return "Please select a valid content type.";
        }

        if (!["public", "members"].includes(form.visibility)) {
            return "Please select a valid visibility option.";
        }

        if (form.type === "event" && !form.eventDate) {
            return "Please select an event date.";
        }

        if (form.type === "event" && form.registrationUrl.trim()) {
            try {
                const url = new URL(form.registrationUrl);

                if (!["http:", "https:"].includes(url.protocol)) {
                    return "Registration URL must start with http:// or https://.";
                }
            } catch {
                return "Please enter a valid registration URL.";
            }
        }

        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError("");

        const validationError = validateForm();

        if (validationError) {
            setFormError(validationError);
            return;
        }

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        if (image) {
            formData.append("image", image);
        }

        try {
            setSaving(true);

            let response;

            if (editingItem?._id) {
                response = await updateNewsEvent(
                    editingItem._id,
                    formData
                );
            } else {
                response = await createNewsEvent(formData);
            }

            showAlert(
                "success",
                response?.message ||
                    `${getTypeLabel(form.type)} ${
                        editingItem ? "updated" : "created"
                    } successfully.`
            );

            setModalOpen(false);
            resetForm();

            await loadItems();
        } catch (error) {
            console.error("Save news/event error:", error);

            setFormError(
                error?.message || "Unable to save this content."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget?._id) return;

        try {
            setDeleting(true);

            const response = await deleteNewsEvent(deleteTarget._id);

            showAlert(
                "success",
                response?.message || "Content deleted successfully."
            );

            setDeleteTarget(null);
            await loadItems();
        } catch (error) {
            console.error("Delete news/event error:", error);

            showAlert(
                "error",
                error?.message || "Failed to delete this content."
            );
        } finally {
            setDeleting(false);
        }
    };

    const columns = [
        {
            key: "item",
            label: "Content",
            render: (item) => (
                <div className="flex min-w-[190px] items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded border border-(--border) bg-(--bg-light)">
                        {item.image ? (
                            <img
                                src={item.image}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <ImageIcon
                                size={17}
                                className="text-(--text-muted)"
                            />
                        )}
                    </div>

                    <div className="min-w-0">
                        <p className="line-clamp-2 text-xs font-semibold text-(--primary)">
                            {item.title}
                        </p>
                        <p className="mt-1 text-[10px] text-(--text-muted)">
                            {item.category || "Uncategorized"}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: "type",
            label: "Type",
            render: (item) => (
                <span className="text-xs font-medium text-(--secondary)">
                    {getTypeLabel(item.type)}
                </span>
            ),
        },
        {
            key: "visibility",
            label: "Visibility",
            render: (item) => (
                <VisibilityBadge visibility={item.visibility} />
            ),
        },
        {
            key: "date",
            label: "Date",
            render: (item) => (
                <span className="text-xs text-(--secondary)">
                    {item.type === "event"
                        ? formatDate(item.eventDate)
                        : formatDate(item.createdAt)}
                </span>
            ),
        },
        {
            key: "featured",
            label: "Featured",
            render: (item) =>
                item.isFeatured ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-(--warning)">
                        <Star size={13} />
                        Featured
                    </span>
                ) : (
                    <span className="text-xs text-(--text-muted)">—</span>
                ),
        },
        {
            key: "status",
            label: "Status",
            render: (item) => (
                <StatusBadge published={item.isPublished} />
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setPreviewItem(item)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--primary) hover:underline"
                    >
                        <Eye size={14} />
                        View
                    </button>

                    <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--secondary) hover:text-(--primary)"
                    >
                        <Pencil size={14} />
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--danger) hover:underline"
                    >
                        <Trash2 size={14} />
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-4">
            <div className="space-y-5">
                {alert && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )}

                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-(--primary)">
                            News & Events
                        </h1>
                        <p className="mt-1 text-sm text-(--secondary)">
                            Manage news, events, articles and member-only content.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded bg-(--primary) px-4 text-xs font-semibold text-white transition-colors hover:bg-(--primary-dark)"
                    >
                        <Plus size={15} />
                        Create Content
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <AdminStatCard
                        icon={Newspaper}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="All content"
                        label="Total Items"
                        value={stats.total}
                        description="All content records"
                    />

                    <AdminStatCard
                        icon={Newspaper}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="News"
                        label="News"
                        value={stats.news}
                        description="News items created"
                    />

                    <AdminStatCard
                        icon={CalendarDays}
                        iconBg="bg-(--success-light)"
                        iconClass="text-(--success)"
                        badge="Events"
                        label="Events"
                        value={stats.events}
                        description="Events created"
                    />

                    <AdminStatCard
                        icon={FileText}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="Articles"
                        label="Articles"
                        value={stats.articles}
                        description="Long-form content"
                    />

                    <AdminStatCard
                        icon={Eye}
                        iconBg="bg-(--success-light)"
                        iconClass="text-(--success)"
                        badge="Live"
                        label="Published"
                        value={stats.published}
                        description="Published content records"
                    />

                    <AdminStatCard
                        icon={RefreshCw}
                        iconBg="bg-(--warning-light)"
                        iconClass="text-(--warning)"
                        badge="Unpublished"
                        label="Drafts"
                        value={stats.drafts}
                        description="Unpublished content records"
                    />
                </div>

                {/* Page error */}
                {pageError && (
                    <div className="flex items-center justify-between gap-3 rounded border border-(--danger) bg-(--danger-light) px-4 py-3">
                        <p className="text-xs text-(--danger)">
                            {pageError}
                        </p>

                        <button
                            type="button"
                            onClick={loadItems}
                            disabled={loading}
                            className="shrink-0 text-xs font-semibold text-(--danger) hover:underline disabled:opacity-50"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Content table */}
                <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                    <div className="border-b border-(--border) px-5 py-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    Website Content
                                </h2>
                                <p className="mt-1 text-xs text-(--secondary)">
                                    Filter and manage published content and drafts.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                                <div className="relative">
                                    <Search
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                                    />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) =>
                                            setSearch(event.target.value)
                                        }
                                        placeholder="Search content..."
                                        className="h-9 w-full rounded border border-(--border) bg-(--bg-white) pl-9 pr-3 text-xs text-(--primary) outline-none focus:border-(--primary) sm:w-[190px]"
                                    />
                                </div>

                                <select
                                    value={typeFilter}
                                    onChange={(event) =>
                                        setTypeFilter(event.target.value)
                                    }
                                    className="h-9 rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none"
                                >
                                    <option value="">All Types</option>
                                    <option value="news">News</option>
                                    <option value="event">Events</option>
                                    <option value="article">Articles</option>
                                </select>

                                <select
                                    value={visibilityFilter}
                                    onChange={(event) =>
                                        setVisibilityFilter(event.target.value)
                                    }
                                    className="h-9 rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none"
                                >
                                    <option value="">All Visibility</option>
                                    <option value="public">Public</option>
                                    <option value="members">Members Only</option>
                                </select>

                                <select
                                    value={statusFilter}
                                    onChange={(event) =>
                                        setStatusFilter(event.target.value)
                                    }
                                    className="h-9 rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none"
                                >
                                    <option value="">All Status</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>

                                <button
                                    type="button"
                                    onClick={loadItems}
                                    disabled={loading}
                                    title="Refresh"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-(--border) text-(--primary) hover:bg-(--bg-soft) disabled:opacity-50"
                                >
                                    <RefreshCw
                                        size={15}
                                        className={loading ? "animate-spin" : ""}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <AdminTable
                        columns={columns}
                        data={filteredItems}
                        loading={loading}
                        rowKey="_id"
                        emptyMessage={
                            pageError
                                ? "Unable to load content."
                                : "No content found."
                        }
                    />

                    <div className="border-t border-(--border) px-5 py-3">
                        <p className="text-xs text-(--primary)">
                            Showing{" "}
                            <span className="font-medium">
                                {filteredItems.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium">{items.length}</span>{" "}
                            items
                        </p>
                    </div>
                </div>
            </div>

            {/* Create / Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded border border-(--border) bg-(--bg-white) shadow-xl">
                        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-(--border) bg-(--bg-white) px-5 py-4">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    {editingItem ? "Edit Content" : "Create Content"}
                                </h2>
                                <p className="mt-1 text-xs text-(--secondary)">
                                    Set the content type, visibility and publication status.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={saving}
                                aria-label="Close form"
                                className="text-(--text-muted) hover:text-(--primary) disabled:opacity-40"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 p-5"
                        >
                            {formError && (
                                <div className="rounded border border-(--danger) bg-(--danger-light) px-3 py-2">
                                    <p className="text-xs text-(--danger)">
                                        {formError}
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Title */}
                                <div className="sm:col-span-2">
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Title *
                                    </label>
                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleFieldChange}
                                        required
                                        maxLength={250}
                                        disabled={saving}
                                        placeholder="Enter a title"
                                        className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                    />
                                </div>

                                {/* Type */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Content Type *
                                    </label>
                                    <select
                                        name="type"
                                        value={form.type}
                                        onChange={handleFieldChange}
                                        disabled={saving}
                                        required
                                        className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                    >
                                        <option value="news">News</option>
                                        <option value="event">Event</option>
                                        <option value="article">Article</option>
                                    </select>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Category
                                    </label>
                                    <input
                                        name="category"
                                        value={form.category}
                                        onChange={handleFieldChange}
                                        maxLength={100}
                                        disabled={saving}
                                        placeholder="e.g. Announcement"
                                        className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                    />
                                </div>

                                {/* Visibility */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Visibility *
                                    </label>
                                    <select
                                        name="visibility"
                                        value={form.visibility}
                                        onChange={handleFieldChange}
                                        disabled={saving}
                                        required
                                        className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                    >
                                        <option value="public">Public Website</option>
                                        <option value="members">Members Only</option>
                                    </select>
                                    <p className="mt-1 text-[10px] text-(--text-muted)">
                                        Members-only content must also be protected by backend authorization.
                                    </p>
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        URL Slug *
                                    </label>
                                    <input
                                        name="slug"
                                        value={form.slug}
                                        onChange={handleSlugChange}
                                        required
                                        maxLength={250}
                                        disabled={saving}
                                        placeholder="content-title"
                                        className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                    />
                                    <p className="mt-1 text-[10px] text-(--text-muted)">
                                        Generated from the title until manually edited.
                                    </p>
                                </div>

                                {/* Excerpt */}
                                <div className="sm:col-span-2">
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Excerpt
                                    </label>
                                    <textarea
                                        name="excerpt"
                                        value={form.excerpt}
                                        onChange={handleFieldChange}
                                        maxLength={500}
                                        rows={3}
                                        disabled={saving}
                                        placeholder="Short summary shown in content previews"
                                        className="w-full resize-y rounded border border-(--border) bg-(--bg-white) px-3 py-2.5 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                    />
                                    <p className="mt-1 text-[10px] text-(--text-muted)">
                                        {form.excerpt.length}/500 characters
                                    </p>
                                </div>

                                {/* Full Content */}
                                <div className="sm:col-span-2">
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Full Content
                                    </label>
                                    <textarea
                                        name="content"
                                        value={form.content}
                                        onChange={handleFieldChange}
                                        rows={7}
                                        disabled={saving}
                                        placeholder="Write the full article, news story or event details"
                                        className="w-full resize-y rounded border border-(--border) bg-(--bg-white) px-3 py-2.5 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                    />
                                </div>

                                {/* Event-specific fields */}
                                {form.type === "event" && (
                                    <>
                                        <div>
                                            <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                                Event Date *
                                            </label>
                                            <input
                                                type="date"
                                                name="eventDate"
                                                value={form.eventDate}
                                                onChange={handleFieldChange}
                                                required
                                                disabled={saving}
                                                className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                                Location
                                            </label>
                                            <input
                                                name="location"
                                                value={form.location}
                                                onChange={handleFieldChange}
                                                maxLength={250}
                                                disabled={saving}
                                                placeholder="Event venue"
                                                className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                                Start Time
                                            </label>
                                            <input
                                                name="startTime"
                                                value={form.startTime}
                                                onChange={handleFieldChange}
                                                maxLength={30}
                                                disabled={saving}
                                                placeholder="e.g. 10:00 AM"
                                                className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                                End Time
                                            </label>
                                            <input
                                                name="endTime"
                                                value={form.endTime}
                                                onChange={handleFieldChange}
                                                maxLength={30}
                                                disabled={saving}
                                                placeholder="e.g. 2:00 PM"
                                                className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                                Registration URL
                                            </label>
                                            <input
                                                type="url"
                                                name="registrationUrl"
                                                value={form.registrationUrl}
                                                onChange={handleFieldChange}
                                                disabled={saving}
                                                placeholder="https://..."
                                                className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Image */}
                                <div className="sm:col-span-2">
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Featured Image
                                    </label>

                                    <div className="rounded border border-(--border) bg-(--bg-light) p-3">
                                        {imagePreview && (
                                            <div className="mb-3">
                                                <img
                                                    src={imagePreview}
                                                    alt="Content preview"
                                                    className="max-h-48 w-full rounded border border-(--border) object-cover"
                                                />
                                            </div>
                                        )}

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            disabled={saving}
                                            className="block w-full text-xs text-(--secondary) file:mr-3 file:rounded file:border file:border-(--border) file:bg-(--bg-white) file:px-3 file:py-2 file:text-xs file:font-medium file:text-(--primary)"
                                        />

                                        <p className="mt-2 text-[10px] text-(--text-muted)">
                                            {editingItem?.image && !image
                                                ? "Choose a new image only if you want to replace the current one."
                                                : "Choose an image for this content."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Publication options */}
                            <div className="space-y-3 rounded border border-(--border) bg-(--bg-light) px-4 py-3">
                                <label className="flex cursor-pointer items-start gap-3">
                                    <input
                                        type="checkbox"
                                        name="isPublished"
                                        checked={form.isPublished}
                                        onChange={handleFieldChange}
                                        disabled={saving}
                                        className="mt-0.5 accent-(--primary)"
                                    />
                                    <span>
                                        <span className="block text-xs font-medium text-(--primary)">
                                            Publish content
                                        </span>
                                        <span className="mt-1 block text-[10px] text-(--secondary)">
                                            Publishing does not override the selected visibility setting.
                                        </span>
                                    </span>
                                </label>

                                <label className="flex cursor-pointer items-start gap-3">
                                    <input
                                        type="checkbox"
                                        name="isFeatured"
                                        checked={form.isFeatured}
                                        onChange={handleFieldChange}
                                        disabled={saving}
                                        className="mt-0.5 accent-(--primary)"
                                    />
                                    <span>
                                        <span className="block text-xs font-medium text-(--primary)">
                                            Feature this item
                                        </span>
                                        <span className="mt-1 block text-[10px] text-(--secondary)">
                                            Marks this content as featured in supported layouts.
                                        </span>
                                    </span>
                                </label>
                            </div>

                            {/* Form actions */}
                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="h-9 rounded border border-(--border) px-4 text-xs font-semibold text-(--secondary) hover:bg-(--bg-soft) disabled:opacity-40"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex h-9 items-center gap-2 rounded bg-(--primary) px-4 text-xs font-semibold text-white hover:bg-(--primary-dark) disabled:opacity-60"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2
                                                size={14}
                                                className="animate-spin"
                                            />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            {editingItem ? (
                                                <Pencil size={14} />
                                            ) : (
                                                <Plus size={14} />
                                            )}
                                            {editingItem
                                                ? "Save Changes"
                                                : "Create Content"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded border border-(--border) bg-(--bg-white) shadow-xl">
                        <div className="flex items-start justify-between gap-4 border-b border-(--border) px-5 py-4">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    Delete Content
                                </h2>
                                <p className="mt-1 text-xs text-(--secondary)">
                                    This action cannot be undone.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    !deleting && setDeleteTarget(null)
                                }
                                disabled={deleting}
                                aria-label="Close delete confirmation"
                                className="text-(--text-muted) hover:text-(--primary)"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-5">
                            <p className="text-xs leading-5 text-(--secondary)">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold text-(--primary)">
                                    {deleteTarget.title}
                                </span>
                                ? It will be removed from the website.
                            </p>

                            <div className="mt-5 flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setDeleteTarget(null)}
                                    disabled={deleting}
                                    className="h-9 rounded border border-(--border) px-4 text-xs font-semibold text-(--secondary) hover:bg-(--bg-soft) disabled:opacity-40"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="inline-flex h-9 items-center gap-2 rounded bg-(--danger) px-4 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-60"
                                >
                                    {deleting ? (
                                        <>
                                            <Loader2
                                                size={14}
                                                className="animate-spin"
                                            />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 size={14} />
                                            Delete Content
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Content Preview */}
            {previewItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setPreviewItem(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="news-event-preview-title"
                        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-(--border) bg-(--bg-white) shadow-xl"
                    >
                        <div className="flex items-center justify-between gap-4 border-b border-(--border) px-4 py-4 sm:px-6">
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-(--text-muted)">
                                    Admin Preview
                                </p>

                                <h2
                                    id="news-event-preview-title"
                                    className="mt-1 text-lg font-semibold text-(--primary)"
                                >
                                    {getTypeLabel(previewItem.type)} Preview
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setPreviewItem(null)}
                                aria-label="Close preview"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-(--border) text-(--text-muted) transition hover:bg-(--bg-light)"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
                            {previewItem.image && (
                                <div className="overflow-hidden rounded-lg border border-(--border)">
                                    <img
                                        src={previewItem.image}
                                        alt={previewItem.title || "Content cover"}
                                        className="max-h-[360px] w-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-(--bg-light) px-3 py-1 text-xs font-medium text-(--primary)">
                                    {getTypeLabel(previewItem.type)}
                                </span>

                                <StatusBadge
                                    published={previewItem.isPublished}
                                />

                                <VisibilityBadge
                                    visibility={previewItem.visibility}
                                />

                                {previewItem.isFeatured && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-(--warning-light) px-3 py-1 text-xs font-medium text-(--warning)">
                                        <Star size={12} />
                                        Featured
                                    </span>
                                )}

                                {previewItem.category && (
                                    <span className="text-xs text-(--text-muted)">
                                        {previewItem.category}
                                    </span>
                                )}
                            </div>

                            <div>
                                <h3 className="break-words text-2xl font-bold leading-tight text-(--primary) sm:text-3xl">
                                    {previewItem.title || "Untitled"}
                                </h3>

                                {previewItem.slug && (
                                    <p className="mt-2 break-all text-xs text-(--text-muted)">
                                        Slug: {previewItem.slug}
                                    </p>
                                )}
                            </div>

                            {previewItem.type === "event" && (
                                <div className="grid gap-3 rounded-lg border border-(--border) bg-(--bg-light) p-4 sm:grid-cols-2">
                                    {previewItem.eventDate && (
                                        <div className="flex items-start gap-3">
                                            <CalendarDays
                                                size={18}
                                                className="mt-0.5 shrink-0 text-(--primary)"
                                            />
                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Event Date
                                                </p>
                                                <p className="mt-1 text-sm font-medium text-(--primary)">
                                                    {formatDate(
                                                        previewItem.eventDate
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {(previewItem.startTime ||
                                        previewItem.endTime) && (
                                        <div className="flex items-start gap-3">
                                            <CalendarDays
                                                size={18}
                                                className="mt-0.5 shrink-0 text-(--primary)"
                                            />
                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Event Time
                                                </p>
                                                <p className="mt-1 text-sm font-medium text-(--primary)">
                                                    {[
                                                        previewItem.startTime,
                                                        previewItem.endTime,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" – ")}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {previewItem.location && (
                                        <div className="flex items-start gap-3 sm:col-span-2">
                                            <MapPin
                                                size={18}
                                                className="mt-0.5 shrink-0 text-(--primary)"
                                            />
                                            <div>
                                                <p className="text-xs text-(--text-muted)">
                                                    Location
                                                </p>
                                                <p className="mt-1 text-sm font-medium text-(--primary)">
                                                    {previewItem.location}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {previewItem.excerpt && (
                                <div>
                                    <h4 className="mb-2 text-sm font-semibold text-(--primary)">
                                        Summary
                                    </h4>
                                    <p className="whitespace-pre-wrap text-sm leading-7 text-(--text-muted)">
                                        {previewItem.excerpt}
                                    </p>
                                </div>
                            )}

                            <div>
                                <h4 className="mb-3 text-sm font-semibold text-(--primary)">
                                    Full Content
                                </h4>

                                {previewItem.content ? (
                                    <div className="break-words whitespace-pre-wrap text-sm leading-7 text-(--text-muted)">
                                        {previewItem.content}
                                    </div>
                                ) : (
                                    <p className="text-sm italic text-(--text-muted)">
                                        No content has been added.
                                    </p>
                                )}
                            </div>

                            {previewItem.registrationUrl && (
                                <div className="rounded-lg border border-(--border) p-4">
                                    <p className="mb-2 text-xs font-medium text-(--text-muted)">
                                        Registration Link
                                    </p>
                                    <a
                                        href={previewItem.registrationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="break-all text-sm font-medium text-(--primary) underline"
                                    >
                                        {previewItem.registrationUrl}
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col-reverse gap-2 border-t border-(--border) px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
                            <button
                                type="button"
                                onClick={() => setPreviewItem(null)}
                                className="h-10 rounded-lg border border-(--border) px-4 text-sm font-medium text-(--primary) transition hover:bg-(--bg-light)"
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    const item = previewItem;
                                    setPreviewItem(null);
                                    openEditModal(item);
                                }}
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-(--primary) px-4 text-sm font-medium text-white transition hover:opacity-90"
                            >
                                <Pencil size={15} />
                                Edit Content
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsEvents;
