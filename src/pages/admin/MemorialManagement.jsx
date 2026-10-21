
import React, { useCallback, useEffect, useState } from "react";
import {
    Heart,
    Plus,
    Search,
    RefreshCw,
    Eye,
    Pencil,
    Trash2,
    X,
    Image as ImageIcon,
    CheckCircle2,
    AlertCircle,
    Clock3,
    Save,
    ArrowLeft,
} from "lucide-react";

import {
    getAdminMemorials,
    getAdminMemorialById,
    createAdminMemorial,
    updateAdminMemorial,
    deleteAdminMemorial,
} from "../../services/adminService.js";

const EMPTY_FORM = {
    fullName: "",
    schoolSet: "",
    yearsAttended: "",
    graduationYear: "",
    shortRemembrance: "",
    biography: "",
    contributions: "",
    memories: "",
    memorialService: "",
    isPublished: false,
};

const FIELDS = [
    { name: "fullName", label: "Full Name", required: true },
    { name: "schoolSet", label: "School Set" },
    { name: "yearsAttended", label: "Years Attended" },
    { name: "graduationYear", label: "Graduation Year", type: "number" },
    { name: "shortRemembrance", label: "Short Remembrance", long: true },
    { name: "biography", label: "Biography", long: true },
    { name: "contributions", label: "Contributions", long: true },
    { name: "memories", label: "Memories", long: true },
    { name: "memorialService", label: "Memorial Service Details", long: true },
];

const inputClass =
    "w-full min-w-0 rounded border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm text-(--primary) outline-none transition focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/15";

const mutedText = "text-sm text-(--text-muted)";

const getRecords = (result) =>
    Array.isArray(result) ? result : result?.memorials || result?.data || [];

const getRecord = (result) =>
    result?.memorial || result?.data || result;

const MemorialManagement = () => {
    const [memorials, setMemorials] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [editorOpen, setEditorOpen] = useState(false);
    const [editingId, setEditingId] = useState("");
    const [form, setForm] = useState(EMPTY_FORM);
    const [photograph, setPhotograph] = useState(null);
    const [additionalPhotos, setAdditionalPhotos] = useState([]);
    const [existingMemorial, setExistingMemorial] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [removedAdditionalPhotoIds, setRemovedAdditionalPhotoIds] = useState([]);


    const loadMemorials = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const result = await getAdminMemorials({ search, status });
            setMemorials(getRecords(result));

        } catch (err) {
            setError(err.message || "Unable to load memorials.");
        } finally {
            setLoading(false);
        }
    }, [search, status]);


    const removeExistingPhoto = (publicId) => {
        if (!publicId) {
            setError("Unable to remove this photo because its public ID is missing.");
            return;
        }

        setRemovedAdditionalPhotoIds((prev) =>
            prev.includes(publicId) ? prev : [...prev, publicId]
        );

        setError("");
    };

    useEffect(() => {
        const timeout = setTimeout(loadMemorials, 300);
        return () => clearTimeout(timeout);
    }, [loadMemorials]);

    const resetEditor = () => {
        setRemovedAdditionalPhotoIds([]);
        setEditorOpen(false);
        setEditingId("");
        setForm(EMPTY_FORM);
        setPhotograph(null);
        setAdditionalPhotos([]);
        setExistingMemorial(null);
    };

    const openCreate = () => {
        setRemovedAdditionalPhotoIds([]);
        setError("");
        setSuccess("");
        setEditingId("");
        setForm(EMPTY_FORM);
        setPhotograph(null);
        setAdditionalPhotos([]);
        setExistingMemorial(null);
        setEditorOpen(true);
    };

    const openEdit = async (id) => {
        setError("");
        setSuccess("");
        setLoading(true);
        setRemovedAdditionalPhotoIds([]);

        try {
            const result = await getAdminMemorialById(id);
            const memorial = getRecord(result);

            if (!memorial?._id) {
                throw new Error("The memorial record could not be found.");
            }

            setEditingId(id);
            setExistingMemorial(memorial);
            setForm({
                ...EMPTY_FORM,
                ...memorial,
                isPublished: Boolean(memorial.isPublished),
            });
            setPhotograph(null);
            setAdditionalPhotos([]);
            setEditorOpen(true);
        } catch (err) {
            setError(err.message || "Unable to load memorial details.");
        } finally {
            setLoading(false);
        }
    };

    const openDetails = async (id) => {
        setError("");
        setLoading(true);

        try {
            const result = await getAdminMemorialById(id);
            setExistingMemorial(getRecord(result));
            setDetailsOpen(true);
        } catch (err) {
            setError(err.message || "Unable to load memorial details.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.fullName.trim()) {
            setError("Full Name is required.");
            return;
        }

        if (photograph && !photograph.type.startsWith("image/")) {
            setError("Please select a valid main photograph.");
            return;
        }

        if (photograph && photograph.size > 10 * 1024 * 1024) {
            setError("The main photograph must not exceed 10 MB.");
            return;
        }

        const existingPhotos = existingMemorial?.additionalPhotos || [];

        const remainingExistingCount = existingPhotos.filter(
            (photo) => !removedAdditionalPhotoIds.includes(photo.publicId)
        ).length;

        const finalPhotoCount =
            remainingExistingCount + additionalPhotos.length;

        if (finalPhotoCount > 10) {
            setError("You can keep a maximum of 10 additional photographs.");
            return;
        }


        const invalidPhoto = additionalPhotos.find(
            (file) => !file.type.startsWith("image/") ||
                file.size > 10 * 1024 * 1024
        );

        if (invalidPhoto) {
            setError("Additional photographs must be images no larger than 10 MB each.");
            return;
        }

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const formData = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(
                        key,
                        typeof value === "boolean" ? String(value) : String(value)
                    );
                }
            });

            if (photograph) {
                formData.append("photograph", photograph);
            }

            additionalPhotos.forEach((file) => {
                formData.append("additionalPhotos", file);
            });

            if (editingId && removedAdditionalPhotoIds.length > 0) {
                formData.append(
                    "removeAdditionalPhotoIds",
                    JSON.stringify(removedAdditionalPhotoIds)
                );
            }

            if (editingId) {
                await updateAdminMemorial(editingId, formData);
                setSuccess("Memorial updated successfully.");
            } else {
                await createAdminMemorial(formData);
                setSuccess("Memorial created successfully.");
            }

            resetEditor();
            await loadMemorials();
        } catch (err) {
            setError(err.message || "Unable to save memorial.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (memorial) => {
        const confirmed = window.confirm(
            `Delete the memorial for ${memorial.fullName}? This action cannot be undone.`
        );

        if (!confirmed) return;

        setDeletingId(memorial._id);
        setError("");
        setSuccess("");

        try {
            await deleteAdminMemorial(memorial._id);
            setSuccess("Memorial deleted successfully.");
            setMemorials((previous) =>
                previous.filter((item) => item._id !== memorial._id)
            );
        } catch (err) {
            setError(err.message || "Unable to delete memorial.");
        } finally {
            setDeletingId("");
        }
    };
    const selectPhotos = (event) => {
        const files = Array.from(event.target.files || []);
        event.target.value = "";

        if (files.length === 0) return;

        const existingCount = existingMemorial?.additionalPhotos?.length || 0;

        const remainingExistingCount =
            existingCount -
            removedAdditionalPhotoIds.filter((id) =>
                existingMemorial?.additionalPhotos?.some(
                    (photo) => photo.publicId === id
                )
            ).length;

        if (remainingExistingCount + additionalPhotos.length + files.length > 10) {
            setError(
                "You can keep a maximum of 10 additional photographs. Remove existing photos before adding more."
            );
            return;
        }

        const invalidPhoto = files.find(
            (file) =>
                !file.type.startsWith("image/") ||
                file.size > 10 * 1024 * 1024
        );

        if (invalidPhoto) {
            setError(
                "Additional photographs must be images no larger than 10 MB each."
            );
            return;
        }

        setAdditionalPhotos((previous) => [...previous, ...files]);
        setError("");
    };

    const statusBadge = (published) => (
        <span
            className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium ${published
                ? "bg-(--success)/10 text-(--success)"
                : "bg-(--bg-soft) text-(--text-muted)"
                }`}
        >
            {published ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}
            {published ? "Published" : "Draft"}
        </span>
    );

    return (
        <div className="w-full min-w-0 space-y-5 overflow-hidden p-4">
            <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--secondary)">
                        <Heart size={22} />
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-xl font-semibold text-(--primary)">
                            Memorials
                        </h1>
                        <p className={`mt-1 ${mutedText}`}>
                            Manage memorial records, photographs and publication status.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={loadMemorials}
                        disabled={loading || saving}
                        className="inline-flex items-center justify-center gap-2 rounded border border-(--border) bg-(--bg-white) px-3 py-2 text-sm font-medium text-(--primary) transition hover:bg-(--bg-soft) disabled:opacity-60"
                    >
                        <RefreshCw
                            size={15}
                            className={loading ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>

                    <button
                        type="button"
                        onClick={openCreate}
                        disabled={editorOpen}
                        className="inline-flex items-center justify-center gap-2 rounded bg-(--primary) px-3 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
                    >
                        <Plus size={16} />
                        Add Memorial
                    </button>
                </div>
            </div>

            {error && (
                <div className="flex min-w-0 items-start gap-2 rounded border border-(--danger)/20 bg-(--danger)/5 p-3 text-sm text-(--danger)">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <span className="min-w-0 break-words">{error}</span>
                    <button
                        type="button"
                        onClick={() => setError("")}
                        className="ml-auto shrink-0"
                        aria-label="Dismiss error"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {success && (
                <div className="flex min-w-0 items-start gap-2 rounded border border-(--success)/20 bg-(--success)/5 p-3 text-sm text-(--success)">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                    <span className="min-w-0 break-words">{success}</span>
                    <button
                        type="button"
                        onClick={() => setSuccess("")}
                        className="ml-auto shrink-0"
                        aria-label="Dismiss success"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {!editorOpen && (
                <>
                    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {[
                            {
                                label: "Total Memorials",
                                value: memorials.length,
                                icon: Heart,
                            },
                            {
                                label: "Published",
                                value: memorials.filter((item) => item.isPublished).length,
                                icon: CheckCircle2,
                            },
                            {
                                label: "Drafts",
                                value: memorials.filter((item) => !item.isPublished).length,
                                icon: Clock3,
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-3 rounded border border-(--border) bg-(--bg-white) p-4"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--secondary)">
                                        <Icon size={19} />
                                    </div>
                                    <div>
                                        <p className={mutedText}>{item.label}</p>
                                        <p className="mt-1 text-xl font-semibold text-(--primary)">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </section>

                    <section className="space-y-4 rounded border border-(--border) bg-(--bg-white) p-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
                            <div className="relative min-w-0">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                                />
                                <input
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search by name..."
                                    className={`${inputClass} pl-9`}
                                />
                            </div>

                            <select
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                                className={inputClass}
                                aria-label="Filter by publication status"
                            >
                                <option value="">All statuses</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                            <h2 className="font-semibold text-(--primary)">
                                Memorial Records
                            </h2>
                            <span className={mutedText}>
                                {memorials.length} record{memorials.length === 1 ? "" : "s"}
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center gap-2 p-12 text-sm text-(--text-muted)">
                                <RefreshCw size={17} className="animate-spin" />
                                Loading memorials...
                            </div>
                        ) : memorials.length === 0 ? (
                            <div className="rounded border border-dashed border-(--border) p-10 text-center">
                                <Heart
                                    size={28}
                                    className="mx-auto text-(--text-muted)"
                                />
                                <p className="mt-3 font-medium text-(--primary)">
                                    No memorials found
                                </p>
                                <p className={`mt-1 ${mutedText}`}>
                                    Try another search or create a memorial record.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[720px] text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-(--border) text-(--text-muted)">
                                            <th className="px-3 py-3 font-medium">Memorial</th>
                                            <th className="px-3 py-3 font-medium">School Set</th>
                                            <th className="px-3 py-3 font-medium">Graduation</th>
                                            <th className="px-3 py-3 font-medium">Status</th>
                                            <th className="px-3 py-3 text-right font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {memorials.map((memorial) => (
                                            <tr
                                                key={memorial._id}
                                                className="border-b border-(--border) last:border-0"
                                            >
                                                <td className="px-3 py-3">
                                                    <div className="flex items-center gap-3">
                                                        {memorial.photograph ? (
                                                            <img
                                                                src={memorial.photograph}
                                                                alt=""
                                                                className="h-10 w-10 shrink-0 rounded object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--bg-soft) text-(--secondary)">
                                                                <ImageIcon size={18} />
                                                            </div>
                                                        )}
                                                        <div className="min-w-0">
                                                            <p className="break-words font-medium text-(--primary)">
                                                                {memorial.fullName}
                                                            </p>
                                                            <p className={`mt-0.5 ${mutedText}`}>
                                                                {memorial.yearsAttended || "Years not provided"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3 text-(--primary)">
                                                    {memorial.schoolSet || "—"}
                                                </td>
                                                <td className="px-3 py-3 text-(--primary)">
                                                    {memorial.graduationYear || "—"}
                                                </td>
                                                <td className="px-3 py-3">
                                                    {statusBadge(memorial.isPublished)}
                                                </td>
                                                <td className="px-3 py-3">
                                                    <div className="flex justify-end gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => openDetails(memorial._id)}
                                                            title="View memorial"
                                                            className="rounded p-2 text-(--text-muted) transition hover:bg-(--bg-soft) hover:text-(--secondary)"
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => openEdit(memorial._id)}
                                                            title="Edit memorial"
                                                            className="rounded p-2 text-(--text-muted) transition hover:bg-(--bg-soft) hover:text-(--secondary)"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(memorial)}
                                                            disabled={deletingId === memorial._id}
                                                            title="Delete memorial"
                                                            className="rounded p-2 text-(--danger) transition hover:bg-(--danger)/5 disabled:opacity-50"
                                                        >
                                                            {deletingId === memorial._id ? (
                                                                <RefreshCw size={16} className="animate-spin" />
                                                            ) : (
                                                                <Trash2 size={16} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </>
            )}

            {editorOpen && (
                <section className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                    <div className="flex items-center gap-3 border-b border-(--border) p-4">
                        <button
                            type="button"
                            onClick={resetEditor}
                            disabled={saving}
                            className="rounded p-2 text-(--text-muted) hover:bg-(--bg-soft)"
                            aria-label="Back to memorial records"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <div className="min-w-0">
                            <h2 className="font-semibold text-(--primary)">
                                {editingId ? "Edit Memorial" : "Create Memorial"}
                            </h2>
                            <p className={`mt-1 ${mutedText}`}>
                                Add the record details and save it as a draft or publish it.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-5 p-4 lg:grid-cols-2">
                            {FIELDS.map((field) => (
                                <div
                                    key={field.name}
                                    className={`min-w-0 ${field.long ? "lg:col-span-2" : ""}`}
                                >
                                    <label
                                        htmlFor={field.name}
                                        className="mb-2 block text-sm font-medium text-(--primary)"
                                    >
                                        {field.label}
                                        {field.required && <span className="ml-1 text-(--danger)">*</span>}
                                    </label>

                                    {field.long ? (
                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            rows={4}
                                            maxLength={10000}
                                            value={form[field.name] ?? ""}
                                            onChange={handleChange}
                                            className={`${inputClass} resize-y`}
                                            placeholder={`Enter ${field.label.toLowerCase()}...`}
                                        />
                                    ) : (
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type || "text"}
                                            min={field.type === "number" ? 1900 : undefined}
                                            max={field.type === "number" ? 2100 : undefined}
                                            value={form[field.name] ?? ""}
                                            onChange={handleChange}
                                            required={field.required}
                                            className={inputClass}
                                            placeholder={`Enter ${field.label.toLowerCase()}...`}
                                        />
                                    )}
                                </div>
                            ))}

                            <div className="space-y-3 lg:col-span-2">
                                <label className="block text-sm font-medium text-(--primary)">
                                    Main Photograph
                                </label>

                                {existingMemorial?.photograph && (
                                    <img
                                        src={existingMemorial.photograph}
                                        alt="Current memorial"
                                        className="h-40 w-40 rounded border border-(--border) object-cover"
                                    />
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => setPhotograph(event.target.files?.[0] || null)}
                                    className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-(--bg-soft) file:px-3 file:py-1.5`}
                                />
                                <p className={`text-xs ${mutedText}`}>
                                    Optional when editing. Images only, maximum 10 MB.
                                </p>
                            </div>

                            <div className="space-y-3 lg:col-span-2">
                                <label className="block text-sm font-medium text-(--primary)">
                                    Additional Photographs
                                </label>

                                {existingMemorial?.additionalPhotos?.length > 0 && (
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                                        {existingMemorial.additionalPhotos.map((photo, index) => {
                                            const isRemoved = removedAdditionalPhotoIds.includes(
                                                photo.publicId
                                            );

                                            if (isRemoved) return null;

                                            return (
                                                <div
                                                    key={photo.publicId || photo.url || index}
                                                    className="relative min-w-0 overflow-hidden rounded border border-(--border)"
                                                >
                                                    <img
                                                        src={photo.url}
                                                        alt={`Additional photograph ${index + 1}`}
                                                        className="aspect-square w-full object-cover"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => removeExistingPhoto(photo.publicId)}
                                                        disabled={saving}
                                                        title="Remove photograph"
                                                        aria-label={`Remove additional photograph ${index + 1}`}
                                                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/75 text-white transition hover:bg-(--danger) disabled:opacity-50"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {existingMemorial?.additionalPhotos?.some(
                                    (photo) => removedAdditionalPhotoIds.includes(photo.publicId)
                                ) && (
                                        <p className="text-xs text-(--danger)">
                                            Removed photos will be deleted when you save your changes.
                                        </p>
                                    )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={selectPhotos}
                                    className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-(--bg-soft) file:px-3 file:py-1.5`}
                                />

                                {additionalPhotos.length > 0 && (
                                    <ul className="space-y-2">
                                        {additionalPhotos.map((file, index) => (
                                            <li
                                                key={`${file.name}-${file.lastModified}`}
                                                className="flex items-center justify-between gap-3 rounded border border-(--border) px-3 py-2 text-sm"
                                            >
                                                <span className="min-w-0 truncate text-(--primary)">
                                                    {file.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setAdditionalPhotos((previous) =>
                                                        previous.filter((_, i) => i !== index)
                                                    )}
                                                    className="shrink-0 text-(--danger)"
                                                    aria-label={`Remove ${file.name}`}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <p className={`text-xs ${mutedText}`}>
                                    You can keep up to 10 additional photographs, maximum 10 MB each.
                                    Click the X on an existing photo to remove it, then save your changes.
                                </p>
                            </div>

                            <label className="flex items-start gap-3 rounded border border-(--border) p-3 lg:col-span-2">
                                <input
                                    type="checkbox"
                                    name="isPublished"
                                    checked={Boolean(form.isPublished)}
                                    onChange={handleChange}
                                    className="mt-1 accent-(--secondary)"
                                />
                                <span>
                                    <span className="block text-sm font-medium text-(--primary)">
                                        Publish memorial
                                    </span>
                                    <span className={`mt-1 block ${mutedText}`}>
                                        Published memorials are visible to members. Leave unchecked to save as a draft.
                                    </span>
                                </span>
                            </label>
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-(--border) bg-(--bg-light) p-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className={`text-xs ${mutedText}`}>
                                Check the details before publishing.
                            </p>

                            <div className="flex flex-col gap-2 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={resetEditor}
                                    disabled={saving}
                                    className="rounded border border-(--border) bg-(--bg-white) px-4 py-2.5 text-sm font-medium text-(--primary) hover:bg-(--bg-soft) disabled:opacity-60"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex items-center justify-center gap-2 rounded bg-(--primary) px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
                                >
                                    {saving ? (
                                        <RefreshCw size={16} className="animate-spin" />
                                    ) : (
                                        <Save size={16} />
                                    )}
                                    {saving ? "Saving..." : editingId ? "Save Changes" : "Create Memorial"}
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            )}

            {detailsOpen && existingMemorial && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <section className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded border border-(--border) bg-(--bg-white) shadow-xl">
                        <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-(--border) bg-(--bg-white) p-4">
                            <h2 className="font-semibold text-(--primary)">
                                Memorial Details
                            </h2>
                            <button
                                type="button"
                                onClick={() => setDetailsOpen(false)}
                                className="rounded p-2 text-(--text-muted) hover:bg-(--bg-soft)"
                                aria-label="Close details"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4 p-4">
                            {existingMemorial.photograph && (
                                <img
                                    src={existingMemorial.photograph}
                                    alt={existingMemorial.fullName}
                                    className="h-56 w-full rounded object-cover"
                                />
                            )}

                            <div>
                                <h3 className="text-lg font-semibold text-(--primary)">
                                    {existingMemorial.fullName}
                                </h3>
                                <div className="mt-2">
                                    {statusBadge(existingMemorial.isPublished)}
                                </div>
                            </div>

                            {FIELDS.filter((field) => field.name !== "fullName").map((field) => {
                                const value = existingMemorial[field.name];

                                if (value === undefined || value === null || value === "") {
                                    return null;
                                }

                                return (
                                    <div key={field.name}>
                                        <h4 className="text-sm font-medium text-(--primary)">
                                            {field.label}
                                        </h4>
                                        <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-(--text-muted)">
                                            {String(value)}
                                        </p>
                                    </div>
                                );
                            })}

                            {existingMemorial.additionalPhotos?.length > 0 && (
                                <div>
                                    <h4 className="mb-2 text-sm font-medium text-(--primary)">
                                        Additional Photographs
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {existingMemorial.additionalPhotos.map((photo, index) => (
                                            <img
                                                key={photo.publicId || photo.url || index}
                                                src={photo.url}
                                                alt={`Additional photograph ${index + 1}`}
                                                className="h-24 w-24 rounded object-cover"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end border-t border-(--border) pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDetailsOpen(false);
                                        openEdit(existingMemorial._id);
                                    }}
                                    className="inline-flex items-center gap-2 rounded bg-(--primary) px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                                >
                                    <Pencil size={15} />
                                    Edit Memorial
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default MemorialManagement;
