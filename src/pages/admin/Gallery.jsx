
import React, { useEffect, useMemo, useState } from "react";
import {
    Image as ImageIcon,
    Plus,
    Search,
    Pencil,
    Trash2,
    X,
    RefreshCw,
    Loader2,
    Eye,
    Images,
    CheckCircle2,
    EyeOff,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";
import Alert from "../../components/common/Alert.jsx";

import {
    getAdminGallery,
    createGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
} from "../../services/galleryService.js";

const CATEGORIES = [
    "Heritage",
    "Olivet",
    "Community",
    "People",
    "Students",
    "Campus",
];

const SIZES = ["normal", "large", "tall"];

const EMPTY_FORM = {
    title: "",
    category: "Olivet",
    size: "normal",
    isPublished: true,
};

const getItems = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.data?.items)) return response.data.items;
    if (Array.isArray(response?.items)) return response.items;
    return [];
};

const StatusBadge = ({ published }) => (
    <span
        className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium ${published
                ? "bg-(--success-light) text-(--success)"
                : "bg-(--warning-light) text-(--warning)"
            }`}
    >
        {published ? <CheckCircle2 size={12} /> : <EyeOff size={12} />}
        {published ? "Published" : "Hidden"}
    </span>
);

const Gallery = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [alert, setAlert] = useState(null);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState({ ...EMPTY_FORM });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState("");
    const [previewItem, setPreviewItem] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const showAlert = (type, message) => setAlert({ type, message });

    useEffect(() => {
        if (!imagePreview.startsWith("blob:")) return undefined;

        return () => URL.revokeObjectURL(imagePreview);
    }, [imagePreview]);

    const loadItems = async () => {
        try {
            setLoading(true);
            setPageError("");

            const response = await getAdminGallery();
            setItems(getItems(response));
        } catch (error) {
            console.error("Failed to load gallery:", error);
            setPageError(error?.message || "Failed to load gallery.");
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
                item.category?.toLowerCase().includes(query);

            const matchesCategory =
                !categoryFilter || item.category === categoryFilter;

            const matchesStatus =
                !statusFilter ||
                (statusFilter === "published" && item.isPublished) ||
                (statusFilter === "hidden" && !item.isPublished);

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [items, search, categoryFilter, statusFilter]);

    const stats = useMemo(
        () => ({
            total: items.length,
            published: items.filter((item) => item.isPublished).length,
            hidden: items.filter((item) => !item.isPublished).length,
            categories: new Set(items.map((item) => item.category)).size,
        }),
        [items]
    );

    const resetForm = () => {
        setForm({ ...EMPTY_FORM });
        setImage(null);
        setImagePreview("");
        setEditingItem(null);
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
            category: item.category || "Olivet",
            size: item.size || "normal",
            isPublished: Boolean(item.isPublished),
        });
        setImage(null);
        setImagePreview(item.image || "");
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

        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
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

        if (file.size > 10 * 1024 * 1024) {
            setFormError("Image size must not exceed 10 MB.");
            event.target.value = "";
            return;
        }

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setFormError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError("");

        if (!form.title.trim()) {
            setFormError("Please enter an image title.");
            return;
        }

        if (!editingItem && !image) {
            setFormError("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("title", form.title.trim());
        formData.append("category", form.category);
        formData.append("size", form.size);
        formData.append("isPublished", String(form.isPublished));

        if (image) {
            formData.append("image", image);
        }

        try {
            setSaving(true);

            let response;

            if (editingItem?._id) {
                // Supports metadata-only edits and image replacement.
                response = await updateGalleryImage(
                    editingItem._id,
                    formData
                );
            } else {
                response = await createGalleryImage(formData);
            }

            showAlert(
                "success",
                response?.message ||
                `Gallery image ${editingItem ? "updated" : "uploaded"} successfully.`
            );

            setModalOpen(false);
            resetForm();
            await loadItems();
        } catch (error) {
            console.error("Save gallery image error:", error);
            setFormError(error?.message || "Unable to save this image.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget?._id) return;

        try {
            setDeleting(true);

            const response = await deleteGalleryImage(deleteTarget._id);

            showAlert(
                "success",
                response?.message || "Gallery image deleted successfully."
            );

            setDeleteTarget(null);
            if (previewItem?._id === deleteTarget._id) {
                setPreviewItem(null);
            }
            await loadItems();
        } catch (error) {
            console.error("Delete gallery image error:", error);
            showAlert(
                "error",
                error?.message || "Failed to delete gallery image."
            );
        } finally {
            setDeleting(false);
        }
    };

    const columns = [
        {
            key: "image",
            label: "Image",
            render: (item) => (
                <div className="flex min-w-[190px] items-center gap-3">
                    <div className="h-12 w-14 shrink-0 overflow-hidden rounded border border-(--border) bg-(--bg-light)">
                        <img
                            src={item.image}
                            alt={item.title || ""}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="min-w-0">
                        <p className="line-clamp-2 text-xs font-semibold text-(--primary)">
                            {item.title}
                        </p>
                        <p className="mt-1 text-[10px] text-(--text-muted)">
                            {item.category}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: "size",
            label: "Layout",
            render: (item) => (
                <span className="text-xs capitalize text-(--secondary)">
                    {item.size || "normal"}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (item) => <StatusBadge published={item.isPublished} />,
        },
        {
            key: "actions",
            label: "Actions",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setPreviewItem(item)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-(--primary) hover:underline"
                    >
                        <Eye size={14} />
                        View
                    </button>
                    <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-(--secondary) hover:text-(--primary)"
                    >
                        <Pencil size={14} />
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-(--danger) hover:underline"
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

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-(--primary)">
                            Gallery
                        </h1>
                        <p className="mt-1 text-sm text-(--secondary)">
                            Manage photos displayed in the public gallery.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded bg-(--primary) px-4 text-xs font-semibold text-white hover:bg-(--primary-dark)"
                    >
                        <Plus size={15} />
                        Upload Image
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <AdminStatCard
                        icon={Images}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="All images"
                        label="Total Images"
                        value={stats.total}
                        description="All gallery records"
                    />
                    <AdminStatCard
                        icon={CheckCircle2}
                        iconBg="bg-(--success-light)"
                        iconClass="text-(--success)"
                        badge="Live"
                        label="Published"
                        value={stats.published}
                        description="Visible in public gallery"
                    />
                    <AdminStatCard
                        icon={EyeOff}
                        iconBg="bg-(--warning-light)"
                        iconClass="text-(--warning)"
                        badge="Hidden"
                        label="Unpublished"
                        value={stats.hidden}
                        description="Not shown publicly"
                    />
                    <AdminStatCard
                        icon={ImageIcon}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="Categories"
                        label="Categories"
                        value={stats.categories}
                        description="Categories in use"
                    />
                </div>

                {pageError && (
                    <div className="flex items-center justify-between gap-3 rounded border border-(--danger) bg-(--danger-light) px-4 py-3">
                        <p className="text-xs text-(--danger)">{pageError}</p>
                        <button
                            type="button"
                            onClick={loadItems}
                            disabled={loading}
                            className="text-xs font-semibold text-(--danger) hover:underline disabled:opacity-50"
                        >
                            Retry
                        </button>
                    </div>
                )}

                <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                    <div className="border-b border-(--border) px-5 py-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    Gallery Images
                                </h2>
                                <p className="mt-1 text-xs text-(--secondary)">
                                    Search, filter and manage your images.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                                <div className="relative">
                                    <Search
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                                    />
                                    <input
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search images..."
                                        className="h-9 w-full rounded border border-(--border) bg-(--bg-white) pl-9 pr-3 text-xs text-(--primary) outline-none focus:border-(--primary) sm:w-[180px]"
                                    />
                                </div>

                                <select
                                    value={categoryFilter}
                                    onChange={(event) => setCategoryFilter(event.target.value)}
                                    className="h-9 rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary)"
                                >
                                    <option value="">All Categories</option>
                                    {CATEGORIES.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={statusFilter}
                                    onChange={(event) => setStatusFilter(event.target.value)}
                                    className="h-9 rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary)"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="published">Published</option>
                                    <option value="hidden">Unpublished</option>
                                </select>

                                <button
                                    type="button"
                                    onClick={loadItems}
                                    disabled={loading}
                                    title="Refresh gallery"
                                    className="flex h-9 w-9 items-center justify-center rounded border border-(--border) text-(--primary) hover:bg-(--bg-soft) disabled:opacity-50"
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
                        emptyMessage={pageError ? "Unable to load gallery." : "No images found."}
                    />

                    <div className="border-t border-(--border) px-5 py-3">
                        <p className="text-xs text-(--primary)">
                            Showing <span className="font-medium">{filteredItems.length}</span>
                            {" "}of <span className="font-medium">{items.length}</span> images
                        </p>
                    </div>
                </div>
            </div>

            {/* Create / Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded border border-(--border) bg-(--bg-white) shadow-xl">
                        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-(--border) bg-(--bg-white) px-5 py-4">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    {editingItem ? "Edit Gallery Image" : "Upload Gallery Image"}
                                </h2>
                                <p className="mt-1 text-xs text-(--secondary)">
                                    Add an image and choose how it appears in the gallery.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={saving}
                                aria-label="Close form"
                                className="text-(--text-muted) hover:text-(--primary)"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 p-5">
                            {formError && (
                                <div className="rounded border border-(--danger) bg-(--danger-light) px-3 py-2">
                                    <p className="text-xs text-(--danger)">{formError}</p>
                                </div>
                            )}

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                    Image Title *
                                </label>
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleFieldChange}
                                    required
                                    maxLength={200}
                                    disabled={saving}
                                    placeholder="Enter image title"
                                    className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleFieldChange}
                                        disabled={saving}
                                        required
                                        className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary)"
                                    >
                                        {CATEGORIES.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Display Layout *
                                    </label>
                                    <select
                                        name="size"
                                        value={form.size}
                                        onChange={handleFieldChange}
                                        disabled={saving}
                                        required
                                        className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary)"
                                    >
                                        {SIZES.map((size) => (
                                            <option key={size} value={size}>
                                                {size.charAt(0).toUpperCase() + size.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                    Image File {!editingItem && "*"}
                                </label>

                                <div className="rounded border border-(--border) bg-(--bg-light) p-3">
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Gallery preview"
                                            className="mb-3 max-h-64 w-full rounded border border-(--border) object-contain"
                                        />
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        disabled={saving}
                                        required={!editingItem}
                                        className="block w-full text-xs text-(--secondary) file:mr-3 file:rounded file:border file:border-(--border) file:bg-(--bg-white) file:px-3 file:py-2 file:text-xs file:font-medium file:text-(--primary)"
                                    />

                                    <p className="mt-2 text-[10px] text-(--text-muted)">
                                        Maximum file size: 10 MB.
                                    </p>
                                </div>
                            </div>

                            <label className="flex cursor-pointer items-start gap-3 rounded border border-(--border) bg-(--bg-light) px-4 py-3">
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
                                        Publish image
                                    </span>
                                    <span className="mt-1 block text-[10px] text-(--secondary)">
                                        Published images can appear on the public gallery page.
                                    </span>
                                </span>
                            </label>

                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="h-9 rounded border border-(--border) px-4 text-xs font-semibold text-(--secondary) hover:bg-(--bg-soft)"
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
                                            <Loader2 size={14} className="animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            {editingItem ? <Pencil size={14} /> : <Plus size={14} />}
                                            {editingItem ? "Save Changes" : "Upload Image"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Image Preview */}
            {previewItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setPreviewItem(null);
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded border border-(--border) bg-(--bg-white) shadow-xl"
                    >
                        <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    Image Preview
                                </h2>
                                <p className="mt-1 text-xs text-(--secondary)">
                                    {previewItem.category} · {previewItem.size || "normal"}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setPreviewItem(null)}
                                aria-label="Close preview"
                                className="text-(--text-muted) hover:text-(--primary)"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4 p-5">
                            <img
                                src={previewItem.image}
                                alt={previewItem.title}
                                className="max-h-[60vh] w-full rounded border border-(--border) object-contain"
                            />
                            <h3 className="text-lg font-semibold text-(--primary)">
                                {previewItem.title}
                            </h3>
                            <StatusBadge published={previewItem.isPublished} />
                        </div>

                        <div className="flex justify-end gap-2 border-t border-(--border) px-5 py-4">
                            <button
                                type="button"
                                onClick={() => setPreviewItem(null)}
                                className="h-9 rounded border border-(--border) px-4 text-xs font-semibold text-(--secondary)"
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
                                className="inline-flex h-9 items-center gap-2 rounded bg-(--primary) px-4 text-xs font-semibold text-white hover:bg-(--primary-dark)"
                            >
                                <Pencil size={14} />
                                Edit Image
                            </button>
                        </div>
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
                                    Delete Gallery Image
                                </h2>
                                <p className="mt-1 text-xs text-(--secondary)">
                                    This action cannot be undone.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => !deleting && setDeleteTarget(null)}
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
                                ?
                            </p>

                            <div className="mt-5 flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setDeleteTarget(null)}
                                    disabled={deleting}
                                    className="h-9 rounded border border-(--border) px-4 text-xs font-semibold text-(--secondary)"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="inline-flex h-9 items-center gap-2 rounded bg-(--danger) px-4 text-xs font-semibold text-white disabled:opacity-60"
                                >
                                    {deleting ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 size={14} />
                                            Delete Image
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
