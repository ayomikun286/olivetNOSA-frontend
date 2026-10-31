
import React, { useCallback, useEffect, useState } from "react";
import {
    Crown,
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
    UserRound,
} from "lucide-react";

import {
    getAdminNOSALeaders,
    getAdminNOSALeaderById,
    createAdminNOSALeader,
    updateAdminNOSALeader,
    deleteAdminNOSALeader,
} from "../../services/adminService.js";

const EMPTY_FORM = {
    name: "",
    position: "",
    isPresident: false,
    displayOrder: 0,
    isPublished: false,
    removeImage: false,
};

const inputClass =
    "w-full min-w-0 rounded border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm text-(--primary) outline-none transition focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/15";

const mutedText = "text-sm text-(--text-muted)";

const getRecords = (result) =>
    Array.isArray(result)
        ? result
        : result?.leaders || result?.data || [];

const getRecord = (result) =>
    result?.leader || result?.data || result;

const getId = (leader) => leader?._id || leader?.id;

const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const NOSALeadershipManagement = () => {
    const [leaders, setLeaders] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState("");
    const [recordLoading, setRecordLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [editorOpen, setEditorOpen] = useState(false);
    const [editingId, setEditingId] = useState("");
    const [form, setForm] = useState(EMPTY_FORM);

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [existingLeader, setExistingLeader] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    useEffect(() => {
        if (!imageFile) {
            return undefined;
        }

        const objectUrl = URL.createObjectURL(imageFile);
        setImagePreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    const loadLeaders = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const result = await getAdminNOSALeaders({
                search,
                status,
            });

            setLeaders(getRecords(result));
        } catch (err) {
            setError(err.message || "Unable to load NOSA leaders.");
        } finally {
            setLoading(false);
        }
    }, [search, status]);

    useEffect(() => {
        const timeout = setTimeout(loadLeaders, 300);
        return () => clearTimeout(timeout);
    }, [loadLeaders]);

    const resetEditor = () => {
        setEditorOpen(false);
        setEditingId("");
        setForm(EMPTY_FORM);
        setImageFile(null);
        setImagePreview("");
        setExistingLeader(null);
    };

    const openCreate = () => {
        setError("");
        setSuccess("");
        setEditingId("");
        setForm(EMPTY_FORM);
        setImageFile(null);
        setImagePreview("");
        setExistingLeader(null);
        setEditorOpen(true);
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

    const openEdit = async (id) => {
        setError("");
        setSuccess("");
        setRecordLoading(true);

        try {
            const result = await getAdminNOSALeaderById(id);
            const leader = getRecord(result);

            if (!getId(leader)) {
                throw new Error("The NOSA leader record could not be found.");
            }

            setEditingId(id);
            setExistingLeader(leader);

            setForm({
                ...EMPTY_FORM,
                name: leader.name || "",
                position: leader.position || "",
                isPresident: Boolean(leader.isPresident),
                displayOrder: leader.displayOrder ?? 0,
                isPublished: Boolean(leader.isPublished),
                removeImage: false,
            });

            setImageFile(null);
            setImagePreview(leader.image || "");
            setDetailsOpen(false);
            setEditorOpen(true);
        } catch (err) {
            setError(err.message || "Unable to load NOSA leader details.");
        } finally {
            setRecordLoading(false);
        }
    };

    const openDetails = async (id) => {
        setError("");
        setRecordLoading(true);

        try {
            const result = await getAdminNOSALeaderById(id);
            const leader = getRecord(result);

            if (!getId(leader)) {
                throw new Error("The NOSA leader record could not be found.");
            }

            setExistingLeader(leader);
            setDetailsOpen(true);
        } catch (err) {
            setError(err.message || "Unable to load NOSA leader details.");
        } finally {
            setRecordLoading(false);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image.");
            event.target.value = "";
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError("The image must not exceed 10 MB.");
            event.target.value = "";
            return;
        }

        setError("");
        setSuccess("");
        setImageFile(file);

        setForm((previous) => ({
            ...previous,
            removeImage: false,
        }));
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview("");

        setForm((previous) => ({
            ...previous,
            removeImage: true,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.name.trim()) {
            setError("Leader name is required.");
            return;
        }

        if (!form.position.trim()) {
            setError("Leader position is required.");
            return;
        }

        const displayOrder = Number(form.displayOrder);

        if (
            !Number.isInteger(displayOrder) ||
            displayOrder < 0 ||
            displayOrder > 10000
        ) {
            setError("Display order must be a whole number between 0 and 10000.");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const formData = new FormData();

            formData.append("name", form.name.trim());
            formData.append("position", form.position.trim());
            formData.append("isPresident", String(form.isPresident));
            formData.append("displayOrder", String(displayOrder));
            formData.append("isPublished", String(form.isPublished));
            formData.append("removeImage", String(form.removeImage));

            if (imageFile) {
                formData.append("image", imageFile);
            }

            if (editingId) {
                await updateAdminNOSALeader(editingId, formData);
                setSuccess("NOSA leader updated successfully.");
            } else {
                await createAdminNOSALeader(formData);
                setSuccess("NOSA leader created successfully.");
            }

            resetEditor();
            await loadLeaders();
        } catch (err) {
            setError(err.message || "Unable to save NOSA leader.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (leader) => {
        const id = getId(leader);

        if (!id) {
            setError("Leader ID is missing.");
            return;
        }

        const confirmed = window.confirm(
            `Delete the record for ${leader.name}? This action cannot be undone.`
        );

        if (!confirmed) return;

        setDeletingId(id);
        setError("");
        setSuccess("");

        try {
            await deleteAdminNOSALeader(id);

            setSuccess("NOSA leader deleted successfully.");

            setLeaders((previous) =>
                previous.filter((item) => getId(item) !== id)
            );

            if (existingLeader && getId(existingLeader) === id) {
                setExistingLeader(null);
                setDetailsOpen(false);
            }
        } catch (err) {
            setError(err.message || "Unable to delete NOSA leader.");
        } finally {
            setDeletingId("");
        }
    };

    const statusBadge = (published) => (
        <span
            className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium ${
                published
                    ? "bg-(--success)/10 text-(--success)"
                    : "bg-(--bg-soft) text-(--text-muted)"
            }`}
        >
            {published ? (
                <CheckCircle2 size={13} />
            ) : (
                <Clock3 size={13} />
            )}
            {published ? "Published" : "Draft"}
        </span>
    );

    return (
        <div className="w-full min-w-0 space-y-5 overflow-hidden p-4">
            {/* HEADER */}
            <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--secondary)">
                        <Crown size={22} />
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-xl font-semibold text-(--primary)">
                            NOSA Leadership
                        </h1>

                        <p className={`mt-1 ${mutedText}`}>
                            Manage current leaders, photographs, positions and publication status.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={loadLeaders}
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
                        Add Leader
                    </button>
                </div>
            </div>

            {/* ALERTS */}
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

            {success && !editorOpen && (
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

            {/* LIST VIEW */}
            {!editorOpen && (
                <>
                    {/* SUMMARY CARDS */}
                    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {[
                            {
                                label: "Total Leaders",
                                value: leaders.length,
                                icon: Crown,
                            },
                            {
                                label: "Published",
                                value: leaders.filter((item) => item.isPublished).length,
                                icon: CheckCircle2,
                            },
                            {
                                label: "Drafts",
                                value: leaders.filter((item) => !item.isPublished).length,
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

                    {/* FILTERS AND TABLE */}
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
                                    placeholder="Search by leader name..."
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
                                Leadership Records
                            </h2>

                            <span className={mutedText}>
                                {leaders.length} record{leaders.length === 1 ? "" : "s"}
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center gap-2 p-12 text-sm text-(--text-muted)">
                                <RefreshCw size={17} className="animate-spin" />
                                Loading leaders...
                            </div>
                        ) : leaders.length === 0 ? (
                            <div className="rounded border border-dashed border-(--border) p-10 text-center">
                                <Crown
                                    size={28}
                                    className="mx-auto text-(--text-muted)"
                                />

                                <p className="mt-3 font-medium text-(--primary)">
                                    No leadership records found
                                </p>

                                <p className={`mt-1 ${mutedText}`}>
                                    Try another search or add a NOSA leadership record.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[720px] text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-(--border) text-(--text-muted)">
                                            <th className="px-3 py-3 font-medium">Leader</th>
                                            <th className="px-3 py-3 font-medium">Position</th>
                                            <th className="px-3 py-3 font-medium">Display Order</th>
                                            <th className="px-3 py-3 font-medium">Status</th>
                                            <th className="px-3 py-3 text-right font-medium">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {leaders.map((leader) => (
                                            <tr
                                                key={getId(leader)}
                                                className="border-b border-(--border) last:border-0"
                                            >
                                                <td className="px-3 py-3">
                                                    <div className="flex items-center gap-3">
                                                        {leader.image ? (
                                                            <img
                                                                src={leader.image}
                                                                alt=""
                                                                className="h-10 w-10 shrink-0 rounded object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--bg-soft) text-(--secondary)">
                                                                <UserRound size={18} />
                                                            </div>
                                                        )}

                                                        <div className="min-w-0">
                                                            <p className="break-words font-medium text-(--primary)">
                                                                {leader.name}
                                                            </p>

                                                            {leader.isPresident && (
                                                                <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-(--secondary)">
                                                                    <Crown size={12} />
                                                                    President
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-3 py-3 text-(--primary)">
                                                    {leader.position || "—"}
                                                </td>

                                                <td className="px-3 py-3 text-(--primary)">
                                                    {leader.displayOrder ?? 0}
                                                </td>

                                                <td className="px-3 py-3">
                                                    {statusBadge(leader.isPublished)}
                                                </td>

                                                <td className="px-3 py-3">
                                                    <div className="flex justify-end gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => openDetails(getId(leader))}
                                                            disabled={recordLoading}
                                                            title="View leader"
                                                            className="rounded p-2 text-(--text-muted) transition hover:bg-(--bg-soft) hover:text-(--secondary) disabled:opacity-50"
                                                        >
                                                            <Eye size={16} />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => openEdit(getId(leader))}
                                                            disabled={recordLoading}
                                                            title="Edit leader"
                                                            className="rounded p-2 text-(--text-muted) transition hover:bg-(--bg-soft) hover:text-(--secondary) disabled:opacity-50"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(leader)}
                                                            disabled={deletingId === getId(leader)}
                                                            title="Delete leader"
                                                            className="rounded p-2 text-(--danger) transition hover:bg-(--danger)/5 disabled:opacity-50"
                                                        >
                                                            {deletingId === getId(leader) ? (
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

            {/* EDITOR */}
            {editorOpen && (
                <section className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                    <div className="flex items-center gap-3 border-b border-(--border) p-4">
                        <button
                            type="button"
                            onClick={resetEditor}
                            disabled={saving}
                            className="rounded p-2 text-(--text-muted) hover:bg-(--bg-soft) disabled:opacity-60"
                            aria-label="Back to leadership records"
                        >
                            <ArrowLeft size={18} />
                        </button>

                        <div className="min-w-0">
                            <h2 className="font-semibold text-(--primary)">
                                {editingId ? "Edit NOSA Leader" : "Create NOSA Leadership Record"}
                            </h2>

                            <p className={`mt-1 ${mutedText}`}>
                                Add leadership details and configure the public profile.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-5 p-4 lg:grid-cols-2">
                            {/* NAME */}
                            <div className="min-w-0">
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-(--primary)"
                                >
                                    Leader Name <span className="text-(--danger)">*</span>
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter leader's full name"
                                    className={inputClass}
                                />
                            </div>

                            {/* POSITION */}
                            <div className="min-w-0">
                                <label
                                    htmlFor="position"
                                    className="mb-2 block text-sm font-medium text-(--primary)"
                                >
                                    Leadership Position <span className="text-(--danger)">*</span>
                                </label>

                                <input
                                    id="position"
                                    name="position"
                                    type="text"
                                    required
                                    value={form.position}
                                    onChange={handleChange}
                                    placeholder="e.g. President, Secretary"
                                    className={inputClass}
                                />
                            </div>

                            {/* DISPLAY ORDER */}
                            <div className="min-w-0">
                                <label
                                    htmlFor="displayOrder"
                                    className="mb-2 block text-sm font-medium text-(--primary)"
                                >
                                    Display Order
                                </label>

                                <input
                                    id="displayOrder"
                                    name="displayOrder"
                                    type="number"
                                    min="0"
                                    max="10000"
                                    step="1"
                                    value={form.displayOrder}
                                    onChange={handleChange}
                                    className={inputClass}
                                />

                                <p className={`mt-1 text-xs ${mutedText}`}>
                                    Lower numbers appear earlier in the leadership list.
                                </p>
                            </div>

                            {/* IMAGE */}
                            <div className="min-w-0 space-y-3 lg:col-span-2">
                                <label className="block text-sm font-medium text-(--primary)">
                                    Leader Photograph
                                </label>

                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Leader photograph preview"
                                        className="h-40 w-40 rounded border border-(--border) object-cover"
                                    />
                                ) : (
                                    <div className="flex h-40 w-40 items-center justify-center rounded border border-dashed border-(--border) bg-(--bg-soft) text-(--text-muted)">
                                        <ImageIcon size={32} />
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-(--bg-soft) file:px-3 file:py-1.5`}
                                />

                                {imagePreview && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="text-sm text-(--danger)"
                                    >
                                        Remove photograph
                                    </button>
                                )}

                                <p className={`text-xs ${mutedText}`}>
                                    Optional. Images only, maximum 10 MB.
                                    Leave empty to keep the current photograph when editing.
                                </p>
                            </div>

                            {/* PRESIDENT */}
                            <label className="flex items-start gap-3 rounded border border-(--border) p-3">
                                <input
                                    type="checkbox"
                                    name="isPresident"
                                    checked={Boolean(form.isPresident)}
                                    onChange={handleChange}
                                    className="mt-1 accent-(--secondary)"
                                />

                                <span>
                                    <span className="block text-sm font-medium text-(--primary)">
                                        Designate as President
                                    </span>

                                    <span className={`mt-1 block ${mutedText}`}>
                                        The backend automatically removes this designation from other leaders.
                                    </span>
                                </span>
                            </label>

                            {/* PUBLISH */}
                            <label className="flex items-start gap-3 rounded border border-(--border) p-3">
                                <input
                                    type="checkbox"
                                    name="isPublished"
                                    checked={Boolean(form.isPublished)}
                                    onChange={handleChange}
                                    className="mt-1 accent-(--secondary)"
                                />

                                <span>
                                    <span className="block text-sm font-medium text-(--primary)">
                                        Publish leadership record
                                    </span>

                                    <span className={`mt-1 block ${mutedText}`}>
                                        Published leaders appear on the public NOSA Leadership page.
                                    </span>
                                </span>
                            </label>
                        </div>

                        {/* FORM ACTIONS */}
                        <div className="flex flex-col-reverse gap-3 border-t border-(--border) bg-(--bg-light) p-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className={`text-xs ${mutedText}`}>
                                Verify the leader's details before publishing.
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

                                    {saving
                                        ? "Saving..."
                                        : editingId
                                            ? "Save Changes"
                                            : "Create Leader"}
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            )}

            {/* DETAILS MODAL */}
            {detailsOpen && existingLeader && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <section className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded border border-(--border) bg-(--bg-white) shadow-xl">
                        <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-(--border) bg-(--bg-white) p-4">
                            <h2 className="font-semibold text-(--primary)">
                                NOSA Leadership Details
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

                        <div className="space-y-5 p-4">
                            <div className="flex flex-col items-center text-center">
                                {existingLeader.image ? (
                                    <img
                                        src={existingLeader.image}
                                        alt={existingLeader.name}
                                        className="h-40 w-40 rounded border border-(--border) object-cover"
                                    />
                                ) : (
                                    <div className="flex h-40 w-40 items-center justify-center rounded bg-(--bg-soft) text-(--text-muted)">
                                        <UserRound size={36} />
                                    </div>
                                )}

                                <h3 className="mt-4 text-lg font-semibold text-(--primary)">
                                    {existingLeader.name}
                                </h3>

                                <p className="mt-1 text-sm text-(--text-muted)">
                                    {existingLeader.position || "—"}
                                </p>

                                {existingLeader.isPresident && (
                                    <span className="mt-3 inline-flex items-center gap-1.5 rounded bg-(--secondary)/10 px-3 py-1 text-xs font-medium text-(--secondary)">
                                        <Crown size={13} />
                                        President
                                    </span>
                                )}
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-(--primary)">
                                    Leadership Information
                                </h4>

                                <div className="mt-3 space-y-3 rounded border border-(--border) p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className={mutedText}>Publication Status</span>
                                        {statusBadge(existingLeader.isPublished)}
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <span className={mutedText}>Display Order</span>
                                        <span className="text-sm font-medium text-(--primary)">
                                            {existingLeader.displayOrder ?? 0}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <span className={mutedText}>Created</span>
                                        <span className="text-sm font-medium text-(--primary)">
                                            {formatDate(existingLeader.createdAt)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3">
                                        <span className={mutedText}>Last Updated</span>
                                        <span className="text-sm font-medium text-(--primary)">
                                            {formatDate(existingLeader.updatedAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end border-t border-(--border) pt-4">
                                <button
                                    type="button"
                                    onClick={() => openEdit(getId(existingLeader))}
                                    disabled={recordLoading}
                                    className="inline-flex items-center gap-2 rounded bg-(--primary) px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
                                >
                                    <Pencil size={15} />
                                    Edit Leader
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default NOSALeadershipManagement;
