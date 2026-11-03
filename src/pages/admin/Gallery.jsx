import React, { useEffect, useMemo, useRef, useState } from "react";
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
    FolderOpen,
    CalendarDays,
    UploadCloud,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";
import Alert from "../../components/common/Alert.jsx";

import {
    getAdminGallery,
    createGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    getAdminAlbums,
    createAdminAlbum,
    updateAdminAlbum,
    deleteAdminAlbum,
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
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_UPLOAD_COUNT = 50;

const EMPTY_ALBUM_FORM = {
    title: "",
    description: "",
    category: "Olivet",
    year: new Date().getFullYear(),
    isPublished: true,
    coverImage: "",
};

const getItems = (response) => {
    if (Array.isArray(response)) return response;

    const data = response?.data;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data?.albums)) return data.albums;
    if (Array.isArray(data?.images)) return data.images;
    if (Array.isArray(response?.items)) return response.items;

    return [];
};

const getAlbumId = (album) =>
    typeof album === "object" ? album?._id : album;

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
    // Main data
    const [items, setItems] = useState([]);
    const [albums, setAlbums] = useState([]);

    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [alert, setAlert] = useState(null);

    const [activeTab, setActiveTab] = useState("albums");

    // Search and filters
    const [search, setSearch] = useState("");
    const [albumFilter, setAlbumFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Album modal
    const [albumModalOpen, setAlbumModalOpen] = useState(false);
    const [editingAlbum, setEditingAlbum] = useState(null);
    const [albumForm, setAlbumForm] = useState({ ...EMPTY_ALBUM_FORM });
    const [albumSaving, setAlbumSaving] = useState(false);
    const [albumFormError, setAlbumFormError] = useState("");

    // Album deletion
    const [deleteAlbumTarget, setDeleteAlbumTarget] = useState(null);
    const [deletingAlbum, setDeletingAlbum] = useState(false);

    // Image modal
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const [selectedAlbumId, setSelectedAlbumId] = useState("");
    const [imageTitle, setImageTitle] = useState("");
    const [imageSize, setImageSize] = useState("normal");
    const [imagePublished, setImagePublished] = useState(true);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreview, setImagePreview] = useState("");

    const [savingImages, setSavingImages] = useState(false);
    const [imageFormError, setImageFormError] = useState("");


    const [uploadProgress, setUploadProgress] = useState({
        percentage: 0,
        loaded: 0,
        total: 0,
        phase: "idle",
    });
    const fileInputRef = useRef(null);
    const selectedFilesRef = useRef([]);

    // Image preview and deletion
    const [previewItem, setPreviewItem] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deletingImage, setDeletingImage] = useState(false);

    const showAlert = (type, message) => {
        setAlert({ type, message });
    };

    // Keep selected file references available for cleanup on unmount.
    selectedFilesRef.current = selectedFiles;

    useEffect(() => {
        return () => {
            selectedFilesRef.current.forEach((file) => {
                URL.revokeObjectURL(file.preview);
            });
        };
    }, []);

    // ============================================================
    // LOAD DATA
    // ============================================================

    const loadData = async () => {
        try {
            setLoading(true);
            setPageError("");

            const [galleryResponse, albumResponse] = await Promise.all([
                getAdminGallery(),
                getAdminAlbums(),
            ]);

            setItems(getItems(galleryResponse));
            setAlbums(getItems(albumResponse));
        } catch (error) {
            console.error("Failed to load gallery management data:", error);
            setPageError(
                error?.message || "Failed to load gallery management data."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // ============================================================
    // DERIVED DATA
    // ============================================================

    const filteredAlbums = useMemo(() => {
        const query = search.trim().toLowerCase();

        return albums.filter((album) => {
            const matchesSearch =
                !query ||
                album.title?.toLowerCase().includes(query) ||
                album.category?.toLowerCase().includes(query) ||
                String(album.year).includes(query);

            const matchesStatus =
                !statusFilter ||
                (statusFilter === "published" && album.isPublished) ||
                (statusFilter === "hidden" && !album.isPublished);

            return matchesSearch && matchesStatus;
        });
    }, [albums, search, statusFilter]);

    const filteredImages = useMemo(() => {
        const query = search.trim().toLowerCase();

        return items.filter((item) => {
            const itemAlbumId = getAlbumId(item.album);
            const albumTitle =
                typeof item.album === "object" ? item.album?.title : "";

            const matchesSearch =
                !query ||
                item.title?.toLowerCase().includes(query) ||
                albumTitle?.toLowerCase().includes(query);

            const matchesAlbum =
                !albumFilter || itemAlbumId === albumFilter;

            const matchesStatus =
                !statusFilter ||
                (statusFilter === "published" && item.isPublished) ||
                (statusFilter === "hidden" && !item.isPublished);

            return matchesSearch && matchesAlbum && matchesStatus;
        });
    }, [items, search, albumFilter, statusFilter]);

    const stats = useMemo(
        () => ({
            totalAlbums: albums.length,
            publishedAlbums: albums.filter((album) => album.isPublished).length,
            totalImages: items.length,
            publishedImages: items.filter((item) => item.isPublished).length,
        }),
        [albums, items]
    );

    const albumImageOptions = useMemo(() => {
        if (!editingAlbum?._id) return [];

        return items.filter(
            (item) => getAlbumId(item.album) === editingAlbum._id
        );
    }, [items, editingAlbum]);

    // ============================================================
    // ALBUM MANAGEMENT
    // ============================================================

    const resetAlbumForm = () => {
        setAlbumForm({ ...EMPTY_ALBUM_FORM });
        setEditingAlbum(null);
        setAlbumFormError("");
    };

    const openCreateAlbumModal = () => {
        resetAlbumForm();
        setAlbumModalOpen(true);
    };

    const openEditAlbumModal = (album) => {
        setEditingAlbum(album);

        setAlbumForm({
            title: album.title || "",
            description: album.description || "",
            category: album.category || "Olivet",
            year: album.year || new Date().getFullYear(),
            isPublished: Boolean(album.isPublished),
            coverImage: getAlbumId(album.coverImage) || "",
        });

        setAlbumFormError("");
        setAlbumModalOpen(true);
    };

    const closeAlbumModal = () => {
        if (albumSaving) return;

        setAlbumModalOpen(false);
        resetAlbumForm();
    };

    const handleAlbumFieldChange = (event) => {
        const { name, value, type, checked } = event.target;

        setAlbumForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleAlbumSubmit = async (event) => {
        event.preventDefault();
        setAlbumFormError("");

        if (!albumForm.title.trim()) {
            setAlbumFormError("Please enter an album title.");
            return;
        }

        const year = Number(albumForm.year);

        if (!Number.isInteger(year) || year < 1900 || year > 2100) {
            setAlbumFormError("Please enter a valid album year.");
            return;
        }

        const payload = {
            title: albumForm.title.trim(),
            description: albumForm.description.trim(),
            category: albumForm.category,
            year,
            isPublished: albumForm.isPublished,
            coverImage: albumForm.coverImage || null,
        };

        try {
            setAlbumSaving(true);

            const response = editingAlbum?._id
                ? await updateAdminAlbum(editingAlbum._id, payload)
                : await createAdminAlbum(payload);

            showAlert(
                "success",
                response?.message ||
                `Album ${editingAlbum ? "updated" : "created"} successfully.`
            );

            setAlbumModalOpen(false);
            resetAlbumForm();

            await loadData();
        } catch (error) {
            console.error("Save album error:", error);
            setAlbumFormError(error?.message || "Unable to save album.");
        } finally {
            setAlbumSaving(false);
        }
    };

    const handleDeleteAlbum = async () => {
        if (!deleteAlbumTarget?._id) return;

        try {
            setDeletingAlbum(true);

            const response = await deleteAdminAlbum(deleteAlbumTarget._id);

            showAlert(
                "success",
                response?.message || "Album deleted successfully."
            );

            setDeleteAlbumTarget(null);

            if (albumFilter === deleteAlbumTarget._id) {
                setAlbumFilter("");
            }

            await loadData();
        } catch (error) {
            console.error("Delete album error:", error);

            showAlert(
                "error",
                error?.message ||
                "Unable to delete album. It may still contain images."
            );
        } finally {
            setDeletingAlbum(false);
        }
    };

    // ============================================================
    // IMAGE MANAGEMENT
    // ============================================================

    const revokeSelectedFiles = () => {
        selectedFilesRef.current.forEach((file) => {
            URL.revokeObjectURL(file.preview);
        });

        selectedFilesRef.current = [];
        setSelectedFiles([]);
    };

    const resetImageForm = () => {
        revokeSelectedFiles();

        setEditingItem(null);
        setSelectedAlbumId("");
        setImageTitle("");
        setImageSize("normal");
        setImagePublished(true);
        setImagePreview("");
        setImageFormError("");
        setUploadProgress({
            percentage: 0,
            loaded: 0,
            total: 0,
            phase: "idle",
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const openCreateImageModal = () => {
        resetImageForm();

        setSelectedAlbumId(albums[0]?._id || "");
        setImageModalOpen(true);
    };

    const openEditImageModal = (item) => {
        resetImageForm();

        setEditingItem(item);
        setImageTitle(item.title || "");
        setImageSize(item.size || "normal");
        setImagePublished(Boolean(item.isPublished));
        setImagePreview(item.image || "");

        setImageModalOpen(true);
    };

    const closeImageModal = () => {
        if (savingImages) return;

        setImageModalOpen(false);
        resetImageForm();
    };

    const handleMultipleImageChange = (event) => {
        const files = Array.from(event.target.files || []);

        if (!files.length) return;

        setImageFormError("");

        const remainingSlots = MAX_UPLOAD_COUNT - selectedFiles.length;

        if (files.length > remainingSlots) {
            setImageFormError(
                `You can upload a maximum of ${MAX_UPLOAD_COUNT} images at once.`
            );
            event.target.value = "";
            return;
        }

        const validFiles = [];

        for (const file of files) {
            if (!file.type.startsWith("image/")) {
                setImageFormError(
                    `${file.name} is not a valid image file.`
                );
                continue;
            }

            if (file.size > MAX_IMAGE_SIZE) {
                setImageFormError(
                    `${file.name} exceeds the 10 MB file size limit.`
                );
                continue;
            }

            validFiles.push({
                file,
                preview: URL.createObjectURL(file),
            });
        }

        if (validFiles.length) {
            setSelectedFiles((current) => [...current, ...validFiles]);
        }

        event.target.value = "";
    };

    const removeSelectedFile = (index) => {
        setSelectedFiles((current) => {
            const selected = current[index];

            if (selected) {
                URL.revokeObjectURL(selected.preview);
            }

            return current.filter((_, i) => i !== index);
        });
    };

    const handleImageSubmit = async (event) => {
        event.preventDefault();
        setImageFormError("");

        if (editingItem) {
            if (!imageTitle.trim()) {
                setImageFormError("Please enter an image title.");
                return;
            }
        } else {
            if (!selectedAlbumId) {
                setImageFormError("Please select an album.");
                return;
            }

            if (!selectedFiles.length) {
                setImageFormError("Please select at least one image.");
                return;
            }
        }

        const uploadCount = selectedFiles.length;

        try {
            setSavingImages(true);

            setUploadProgress({
                percentage: 0,
                loaded: 0,
                total: 0,
                phase: editingItem ? "updating" : "uploading",
            });

            let response;

            if (editingItem?._id) {
                const formData = new FormData();

                formData.append("title", imageTitle.trim());
                formData.append("size", imageSize);
                formData.append("isPublished", String(imagePublished));

                if (selectedFiles.length) {
                    formData.append("image", selectedFiles[0].file);
                }

                response = await updateGalleryImage(
                    editingItem._id,
                    formData
                );
            } else {
                const formData = new FormData();

                formData.append("albumId", selectedAlbumId);
                formData.append("size", imageSize);
                formData.append("isPublished", String(imagePublished));

                selectedFiles.forEach(({ file }) => {
                    formData.append("images", file);
                });

                response = await createGalleryImage(
                    formData,
                    (progress) => {
                        setUploadProgress({
                            ...progress,
                            phase: progress.percentage >= 100
                                ? "processing"
                                : "uploading",
                        });
                    }
                );
            }

            setUploadProgress((current) => ({
                ...current,
                percentage: 100,
                phase: "success",
            }));

            showAlert(
                "success",
                response?.message ||
                (editingItem
                    ? "Gallery image updated successfully."
                    : `${uploadCount} images uploaded successfully.`)
            );

            setImageModalOpen(false);
            resetImageForm();

            await loadData();

        } catch (error) {
            console.error("Save gallery image error:", error);

            setImageFormError(
                error?.message || "Unable to save gallery images."
            );

            setUploadProgress((current) => ({
                ...current,
                phase: "error",
            }));
        } finally {
            setSavingImages(false);
        }
    };

    const handleDeleteImage = async () => {
        if (!deleteTarget?._id) return;

        try {
            setDeletingImage(true);

            const response = await deleteGalleryImage(deleteTarget._id);

            showAlert(
                "success",
                response?.message || "Gallery image deleted successfully."
            );

            setDeleteTarget(null);

            if (previewItem?._id === deleteTarget._id) {
                setPreviewItem(null);
            }

            await loadData();
        } catch (error) {
            console.error("Delete gallery image error:", error);

            showAlert(
                "error",
                error?.message || "Failed to delete gallery image."
            );
        } finally {
            setDeletingImage(false);
        }
    };

    // ============================================================
    // TABLE COLUMNS
    // ============================================================

    const albumColumns = [
        {
            key: "album",
            label: "Album",
            render: (album) => (
                <div className="flex min-w-[200px] items-center gap-3">
                    <div className="h-12 w-14 shrink-0 overflow-hidden rounded border border-(--border) bg-(--bg-light)">
                        {album.coverImage?.image ? (
                            <img
                                src={album.coverImage.image}
                                alt={album.title}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-(--text-muted)">
                                <Images size={20} />
                            </div>
                        )}
                    </div>

                    <div className="min-w-0">
                        <p className="line-clamp-2 text-xs font-semibold text-(--primary)">
                            {album.title}
                        </p>
                        <p className="mt-1 text-[10px] text-(--text-muted)">
                            {album.category}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: "year",
            label: "Year",
            render: (album) => (
                <span className="text-xs text-(--secondary)">
                    {album.year}
                </span>
            ),
        },
        {
            key: "imageCount",
            label: "Images",
            render: (album) => (
                <span className="text-xs font-medium text-(--primary)">
                    {album.imageCount ?? items.filter(
                        (item) => getAlbumId(item.album) === album._id
                    ).length}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (album) => (
                <StatusBadge published={album.isPublished} />
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (album) => (
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            setAlbumFilter(album._id);
                            setActiveTab("images");
                            setSearch("");
                            setStatusFilter("");
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-(--primary) hover:underline"
                    >
                        <Eye size={14} />
                        Images
                    </button>

                    <button
                        type="button"
                        onClick={() => openEditAlbumModal(album)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-(--secondary) hover:text-(--primary)"
                    >
                        <Pencil size={14} />
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => setDeleteAlbumTarget(album)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-(--danger) hover:underline"
                    >
                        <Trash2 size={14} />
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const imageColumns = [
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
                            {typeof item.album === "object"
                                ? item.album?.title
                                : "Album"}
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
                        className="inline-flex items-center gap-1 text-xs font-semibold text-(--primary) hover:underline"
                    >
                        <Eye size={14} />
                        View
                    </button>

                    <button
                        type="button"
                        onClick={() => openEditImageModal(item)}
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

    // ============================================================
    // RENDER
    // ============================================================

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

                {/* Page Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-(--primary)">
                            Gallery
                        </h1>
                        <p className="mt-1 text-sm text-(--secondary)">
                            Manage albums and photos displayed in the public gallery.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={
                            activeTab === "albums"
                                ? openCreateAlbumModal
                                : openCreateImageModal
                        }
                        disabled={activeTab === "images" && albums.length === 0}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded bg-(--primary) px-4 text-xs font-semibold text-white hover:bg-(--primary-dark) disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Plus size={15} />
                        {activeTab === "albums" ? "Create Album" : "Upload Images"}
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <AdminStatCard
                        icon={FolderOpen}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="All albums"
                        label="Total Albums"
                        value={stats.totalAlbums}
                        description="All gallery albums"
                    />

                    <AdminStatCard
                        icon={CheckCircle2}
                        iconBg="bg-(--success-light)"
                        iconClass="text-(--success)"
                        badge="Live"
                        label="Published Albums"
                        value={stats.publishedAlbums}
                        description="Visible on public gallery"
                    />

                    <AdminStatCard
                        icon={Images}
                        iconBg="bg-(--primary-light)"
                        iconClass="text-(--primary)"
                        badge="All images"
                        label="Total Images"
                        value={stats.totalImages}
                        description="Images across all albums"
                    />

                    <AdminStatCard
                        icon={ImageIcon}
                        iconBg="bg-(--success-light)"
                        iconClass="text-(--success)"
                        badge="Live"
                        label="Published Images"
                        value={stats.publishedImages}
                        description="Visible to visitors"
                    />
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-(--border)">
                    <button
                        type="button"
                        onClick={() => {
                            setActiveTab("albums");
                            setSearch("");
                            setStatusFilter("");
                        }}
                        className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold transition ${activeTab === "albums"
                                ? "border-(--primary) text-(--primary)"
                                : "border-transparent text-(--secondary) hover:text-(--primary)"
                            }`}
                    >
                        <FolderOpen size={15} />
                        Albums ({albums.length})
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setActiveTab("images");
                            setSearch("");
                            setStatusFilter("");
                        }}
                        className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold transition ${activeTab === "images"
                                ? "border-(--primary) text-(--primary)"
                                : "border-transparent text-(--secondary) hover:text-(--primary)"
                            }`}
                    >
                        <Images size={15} />
                        Images ({items.length})
                    </button>
                </div>

                {/* Load Error */}
                {pageError && (
                    <div className="flex items-center justify-between gap-3 rounded border border-(--danger) bg-(--danger-light) px-4 py-3">
                        <p className="text-xs text-(--danger)">
                            {pageError}
                        </p>

                        <button
                            type="button"
                            onClick={loadData}
                            disabled={loading}
                            className="text-xs font-semibold text-(--danger) hover:underline disabled:opacity-50"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Main Table */}
                <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                    <div className="border-b border-(--border) px-5 py-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    {activeTab === "albums"
                                        ? "Gallery Albums"
                                        : "Gallery Images"}
                                </h2>

                                <p className="mt-1 text-xs text-(--secondary)">
                                    {activeTab === "albums"
                                        ? "Create and organize your gallery albums."
                                        : "Manage images belonging to your albums."}
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
                                        placeholder={
                                            activeTab === "albums"
                                                ? "Search albums..."
                                                : "Search images..."
                                        }
                                        className="h-9 w-full rounded border border-(--border) bg-(--bg-white) pl-9 pr-3 text-xs text-(--primary) outline-none focus:border-(--primary) sm:w-[180px]"
                                    />
                                </div>

                                {activeTab === "images" && (
                                    <select
                                        value={albumFilter}
                                        onChange={(event) => setAlbumFilter(event.target.value)}
                                        className="h-9 rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary)"
                                    >
                                        <option value="">All Albums</option>

                                        {albums.map((album) => (
                                            <option key={album._id} value={album._id}>
                                                {album.title}
                                            </option>
                                        ))}
                                    </select>
                                )}

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
                                    onClick={loadData}
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
                        columns={
                            activeTab === "albums"
                                ? albumColumns
                                : imageColumns
                        }
                        data={
                            activeTab === "albums"
                                ? filteredAlbums
                                : filteredImages
                        }
                        loading={loading}
                        rowKey="_id"
                        emptyMessage={
                            pageError
                                ? "Unable to load gallery data."
                                : activeTab === "albums"
                                    ? "No albums found. Create your first album."
                                    : "No images found."
                        }
                    />

                    <div className="border-t border-(--border) px-5 py-3">
                        <p className="text-xs text-(--primary)">
                            Showing{" "}
                            <span className="font-medium">
                                {activeTab === "albums"
                                    ? filteredAlbums.length
                                    : filteredImages.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium">
                                {activeTab === "albums"
                                    ? albums.length
                                    : items.length}
                            </span>{" "}
                            {activeTab === "albums" ? "albums" : "images"}
                        </p>
                    </div>
                </div>
            </div>

            {/* ================================================== */}
            {/* ALBUM CREATE / EDIT MODAL */}
            {/* ================================================== */}

            {albumModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded border border-(--border) bg-(--bg-white) shadow-xl">
                        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-(--border) bg-(--bg-white) px-5 py-4">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    {editingAlbum ? "Edit Album" : "Create Album"}
                                </h2>

                                <p className="mt-1 text-xs text-(--secondary)">
                                    Organize gallery images into an album.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeAlbumModal}
                                disabled={albumSaving}
                                aria-label="Close form"
                                className="text-(--text-muted) hover:text-(--primary)"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleAlbumSubmit}
                            className="space-y-4 p-5"
                        >
                            {albumFormError && (
                                <div className="rounded border border-(--danger) bg-(--danger-light) px-3 py-2">
                                    <p className="text-xs text-(--danger)">
                                        {albumFormError}
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                    Album Title *
                                </label>

                                <input
                                    name="title"
                                    value={albumForm.title}
                                    onChange={handleAlbumFieldChange}
                                    required
                                    maxLength={200}
                                    disabled={albumSaving}
                                    placeholder="e.g. Eight Year Anniversary"
                                    className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={albumForm.description}
                                    onChange={handleAlbumFieldChange}
                                    rows={3}
                                    disabled={albumSaving}
                                    placeholder="Describe this album..."
                                    className="w-full resize-none rounded border border-(--border) bg-(--bg-white) px-3 py-2 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Category *
                                    </label>

                                    <select
                                        name="category"
                                        value={albumForm.category}
                                        onChange={handleAlbumFieldChange}
                                        disabled={albumSaving}
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
                                        Album Year *
                                    </label>

                                    <input
                                        type="number"
                                        name="year"
                                        value={albumForm.year}
                                        onChange={handleAlbumFieldChange}
                                        min="1900"
                                        max="2100"
                                        required
                                        disabled={albumSaving}
                                        className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary)"
                                    />
                                </div>
                            </div>

                            {editingAlbum && (
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Album Cover
                                    </label>

                                    <select
                                        name="coverImage"
                                        value={albumForm.coverImage}
                                        onChange={handleAlbumFieldChange}
                                        disabled={albumSaving}
                                        className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary)"
                                    >
                                        <option value="">No cover image</option>

                                        {albumImageOptions.map((item) => (
                                            <option key={item._id} value={item._id}>
                                                {item.title}
                                            </option>
                                        ))}
                                    </select>

                                    <p className="mt-1 text-[10px] text-(--text-muted)">
                                        Only images belonging to this album can be selected.
                                    </p>
                                </div>
                            )}

                            <label className="flex cursor-pointer items-start gap-3 rounded border border-(--border) bg-(--bg-light) px-4 py-3">
                                <input
                                    type="checkbox"
                                    name="isPublished"
                                    checked={albumForm.isPublished}
                                    onChange={handleAlbumFieldChange}
                                    disabled={albumSaving}
                                    className="mt-0.5 accent-(--primary)"
                                />

                                <span>
                                    <span className="block text-xs font-medium text-(--primary)">
                                        Publish album
                                    </span>

                                    <span className="mt-1 block text-[10px] text-(--secondary)">
                                        Published albums can appear on the public gallery page.
                                    </span>
                                </span>
                            </label>

                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={closeAlbumModal}
                                    disabled={albumSaving}
                                    className="h-9 rounded border border-(--border) px-4 text-xs font-semibold text-(--secondary) hover:bg-(--bg-soft)"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={albumSaving}
                                    className="inline-flex h-9 items-center gap-2 rounded bg-(--primary) px-4 text-xs font-semibold text-white hover:bg-(--primary-dark) disabled:opacity-60"
                                >
                                    {albumSaving ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            {editingAlbum ? (
                                                <Pencil size={14} />
                                            ) : (
                                                <Plus size={14} />
                                            )}
                                            {editingAlbum ? "Save Changes" : "Create Album"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ================================================== */}
            {/* IMAGE UPLOAD / EDIT MODAL */}
            {/* ================================================== */}

            {imageModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded border border-(--border) bg-(--bg-white) shadow-xl">
                        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-(--border) bg-(--bg-white) px-5 py-4">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    {editingItem ? "Edit Gallery Image" : "Upload Images"}
                                </h2>

                                <p className="mt-1 text-xs text-(--secondary)">
                                    {editingItem
                                        ? "Update image details or replace the image."
                                        : "Select an album and upload multiple images at once."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeImageModal}
                                disabled={savingImages}
                                aria-label="Close form"
                                className="text-(--text-muted) hover:text-(--primary)"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleImageSubmit}
                            className="space-y-4 p-5"
                        >
                            {imageFormError && (
                                <div className="rounded border border-(--danger) bg-(--danger-light) px-3 py-2">
                                    <p className="text-xs text-(--danger)">
                                        {imageFormError}
                                    </p>
                                </div>
                            )}

                            {!editingItem && (
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Select Album *
                                    </label>

                                    <select
                                        value={selectedAlbumId}
                                        onChange={(event) =>
                                            setSelectedAlbumId(event.target.value)
                                        }
                                        disabled={savingImages}
                                        required
                                        className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary)"
                                    >
                                        <option value="">Choose an album</option>

                                        {albums.map((album) => (
                                            <option
                                                key={album._id}
                                                value={album._id}
                                            >
                                                {album.title} ({album.year})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {editingItem && (
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                        Image Title *
                                    </label>

                                    <input
                                        value={imageTitle}
                                        onChange={(event) =>
                                            setImageTitle(event.target.value)
                                        }
                                        required
                                        maxLength={200}
                                        disabled={savingImages}
                                        className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none focus:border-(--primary)"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                    Display Layout *
                                </label>

                                <select
                                    value={imageSize}
                                    onChange={(event) =>
                                        setImageSize(event.target.value)
                                    }
                                    disabled={savingImages}
                                    className="h-10 w-full rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary)"
                                >
                                    {SIZES.map((size) => (
                                        <option key={size} value={size}>
                                            {size.charAt(0).toUpperCase() + size.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-(--primary)">
                                    {editingItem ? "Replace Image" : "Select Images *"}
                                </label>

                                <div className="rounded border border-(--border) bg-(--bg-light) p-3">
                                    {editingItem && imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Current gallery image"
                                            className="mb-3 max-h-64 w-full rounded border border-(--border) object-contain"
                                        />
                                    )}

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple={!editingItem}
                                        onChange={
                                            editingItem
                                                ? (event) => {
                                                    const file = event.target.files?.[0];

                                                    if (!file) return;

                                                    if (!file.type.startsWith("image/")) {
                                                        setImageFormError("Please select a valid image file.");
                                                        event.target.value = "";
                                                        return;
                                                    }

                                                    if (file.size > MAX_IMAGE_SIZE) {
                                                        setImageFormError("Image size must not exceed 10 MB.");
                                                        event.target.value = "";
                                                        return;
                                                    }

                                                    revokeSelectedFiles();

                                                    setSelectedFiles([{
                                                        file,
                                                        preview: URL.createObjectURL(file),
                                                    }]);

                                                    setImageFormError("");
                                                }
                                                : handleMultipleImageChange
                                        }
                                        disabled={savingImages}
                                        className="block w-full text-xs text-(--secondary) file:mr-3 file:rounded file:border file:border-(--border) file:bg-(--bg-white) file:px-3 file:py-2 file:text-xs file:font-medium file:text-(--primary)"
                                    />

                                    <p className="mt-2 text-[10px] text-(--text-muted)">
                                        Maximum 10 MB per image.{" "}
                                        {!editingItem &&
                                            `You can select up to ${MAX_UPLOAD_COUNT} images per upload.`}
                                    </p>
                                </div>
                            </div>

                            {/* Selected image previews */}
                            {selectedFiles.length > 0 && (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-semibold text-(--primary)">
                                            Selected Images ({selectedFiles.length})
                                        </p>

                                        <button
                                            type="button"
                                            onClick={revokeSelectedFiles}
                                            disabled={savingImages}
                                            className="text-[10px] font-semibold text-(--danger) hover:underline"
                                        >
                                            Clear all
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {selectedFiles.map((selected, index) => (
                                            <div
                                                key={`${selected.file.name}-${index}`}
                                                className="relative overflow-hidden rounded border border-(--border) bg-(--bg-light)"
                                            >
                                                <img
                                                    src={selected.preview}
                                                    alt={selected.file.name}
                                                    className="h-28 w-full object-cover"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => removeSelectedFile(index)}
                                                    disabled={savingImages}
                                                    aria-label={`Remove ${selected.file.name}`}
                                                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
                                                >
                                                    <X size={13} />
                                                </button>

                                                <div className="p-2">
                                                    <p className="truncate text-[10px] font-medium text-(--primary)">
                                                        {selected.file.name}
                                                    </p>
                                                    <p className="text-[10px] text-(--text-muted)">
                                                        {(selected.file.size / (1024 * 1024)).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* UPLOAD PROGRESS */}
                            {savingImages && !editingItem && (
                                <div className="space-y-3 rounded border border-(--border) bg-(--bg-light) p-4">

                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            {uploadProgress.phase === "processing" ? (
                                                <Loader2
                                                    size={16}
                                                    className="animate-spin text-(--primary)"
                                                />
                                            ) : (
                                                <UploadCloud
                                                    size={16}
                                                    className="text-(--primary)"
                                                />
                                            )}

                                            <p className="text-xs font-semibold text-(--primary)">
                                                {uploadProgress.phase === "processing"
                                                    ? "Processing your images..."
                                                    : "Uploading your images..."}
                                            </p>
                                        </div>

                                        <span className="text-xs font-semibold text-(--primary)">
                                            {uploadProgress.percentage}%
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-(--border)">
                                        <div
                                            className="h-full rounded-full bg-(--primary) transition-all duration-300"
                                            style={{
                                                width: `${uploadProgress.percentage}%`,
                                            }}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-[10px] text-(--secondary)">
                                            {uploadProgress.phase === "processing"
                                                ? `${selectedFiles.length} images sent. Waiting for the server to finish saving them.`
                                                : `Sending ${selectedFiles.length} selected images to the server.`}
                                        </p>

                                        <span className="shrink-0 text-[10px] font-medium text-(--primary)">
                                            {uploadProgress.phase === "processing"
                                                ? "Almost done"
                                                : "Please wait"}
                                        </span>
                                    </div>

                                    {uploadProgress.total > 0 && (
                                        <p className="text-[10px] text-(--text-muted)">
                                            {(uploadProgress.loaded / (1024 * 1024)).toFixed(1)} MB
                                            {" / "}
                                            {(uploadProgress.total / (1024 * 1024)).toFixed(1)} MB sent
                                        </p>
                                    )}
                                </div>
                            )}

                            <label className="flex cursor-pointer items-start gap-3 rounded border border-(--border) bg-(--bg-light) px-4 py-3">
                                <input
                                    type="checkbox"
                                    checked={imagePublished}
                                    onChange={(event) =>
                                        setImagePublished(event.target.checked)
                                    }
                                    disabled={savingImages}
                                    className="mt-0.5 accent-(--primary)"
                                />

                                <span>
                                    <span className="block text-xs font-medium text-(--primary)">
                                        Publish image(s)
                                    </span>

                                    <span className="mt-1 block text-[10px] text-(--secondary)">
                                        Published images can appear on the public gallery page.
                                    </span>
                                </span>
                            </label>

                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={closeImageModal}
                                    disabled={savingImages}
                                    className="h-9 rounded border border-(--border) px-4 text-xs font-semibold text-(--secondary) hover:bg-(--bg-soft)"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={savingImages}
                                    className="inline-flex h-9 items-center gap-2 rounded bg-(--primary) px-4 text-xs font-semibold text-white hover:bg-(--primary-dark) disabled:opacity-60"
                                >
                                    {savingImages ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" />
                                            {uploadProgress.phase === "processing"
                                                ? "Saving Images..."
                                                : "Uploading..."}
                                        </>
                                    ) : (
                                        <>
                                            {editingItem ? (
                                                <Pencil size={14} />
                                            ) : (
                                                <UploadCloud size={14} />
                                            )}

                                            {editingItem
                                                ? "Save Changes"
                                                : `Upload ${selectedFiles.length || ""} Images`}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ================================================== */}
            {/* IMAGE PREVIEW */}
            {/* ================================================== */}

            {previewItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setPreviewItem(null);
                        }
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
                                    {typeof previewItem.album === "object"
                                        ? previewItem.album?.title
                                        : "Gallery Image"}
                                    {" · "}
                                    {previewItem.size || "normal"}
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
                                    openEditImageModal(item);
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

            {/* ================================================== */}
            {/* DELETE IMAGE CONFIRMATION */}
            {/* ================================================== */}

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
                                onClick={() => !deletingImage && setDeleteTarget(null)}
                                disabled={deletingImage}
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
                                    disabled={deletingImage}
                                    className="h-9 rounded border border-(--border) px-4 text-xs font-semibold text-(--secondary)"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDeleteImage}
                                    disabled={deletingImage}
                                    className="inline-flex h-9 items-center gap-2 rounded bg-(--danger) px-4 text-xs font-semibold text-white disabled:opacity-60"
                                >
                                    {deletingImage ? (
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

            {/* ================================================== */}
            {/* DELETE ALBUM CONFIRMATION */}
            {/* ================================================== */}

            {deleteAlbumTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded border border-(--border) bg-(--bg-white) shadow-xl">
                        <div className="flex items-start justify-between gap-4 border-b border-(--border) px-5 py-4">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    Delete Album
                                </h2>

                                <p className="mt-1 text-xs text-(--secondary)">
                                    Albums containing images cannot be deleted.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => !deletingAlbum && setDeleteAlbumTarget(null)}
                                disabled={deletingAlbum}
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
                                    {deleteAlbumTarget.title}
                                </span>
                                ?
                            </p>

                            <div className="mt-5 flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setDeleteAlbumTarget(null)}
                                    disabled={deletingAlbum}
                                    className="h-9 rounded border border-(--border) px-4 text-xs font-semibold text-(--secondary)"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDeleteAlbum}
                                    disabled={deletingAlbum}
                                    className="inline-flex h-9 items-center gap-2 rounded bg-(--danger) px-4 text-xs font-semibold text-white disabled:opacity-60"
                                >
                                    {deletingAlbum ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 size={14} />
                                            Delete Album
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