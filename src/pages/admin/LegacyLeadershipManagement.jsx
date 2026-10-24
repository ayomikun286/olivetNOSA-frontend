
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
} from "lucide-react";

import {
    getAdminLegacyLeaders,
    getAdminLegacyLeaderById,
    createAdminLegacyLeader,
    updateAdminLegacyLeader,
    deleteAdminLegacyLeader,
} from "../../services/adminService.js";

const EMPTY_FORM = {
    name: "",
    title: "President",
    startYear: "",
    endYear: "",
    biography: "",
    achievements: "",
    displayOrder: 0,
    isPublished: false,
};

const FIELDS = [
    { name: "name", label: "Leader Name", required: true },
    { name: "title", label: "Leadership Title", required: true },
    { name: "startYear", label: "Start Year", type: "number", required: true },
    { name: "endYear", label: "End Year", type: "number" },
    { name: "displayOrder", label: "Display Order", type: "number" },
    { name: "biography", label: "Biography", long: true },
    {
        name: "achievements",
        label: "Achievements",
        long: true,
        placeholder: "Enter one achievement per line",
    },
];

const inputClass =
    "w-full min-w-0 rounded border border-(--border) bg-(--bg-white) px-3 py-2.5 text-sm text-(--primary) outline-none transition focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/15";

const mutedText = "text-sm text-(--text-muted)";

const getRecords = (result) =>
    Array.isArray(result)
        ? result
        : result?.leaders || result?.data || [];

const getRecord = (result) =>
    result?.leader || result?.data || result;

const LegacyLeadershipManagement = () => {
    const [leaders, setLeaders] = useState([]);
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
    const [portrait, setPortrait] = useState(null);
    const [portraitPreview, setPortraitPreview] = useState("");
    const [existingLeader, setExistingLeader] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    useEffect(() => {
        if (!portrait) {
            setPortraitPreview("");
            return undefined;
        }

        const objectUrl = URL.createObjectURL(portrait);
        setPortraitPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [portrait]);

    const loadLeaders = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const result = await getAdminLegacyLeaders({ search, status });
            setLeaders(getRecords(result));
        } catch (err) {
            setError(err.message || "Unable to load legacy leaders.");
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
        setPortrait(null);
        setExistingLeader(null);
    };

    const openCreate = () => {
        setError("");
        setSuccess("");
        setEditingId("");
        setForm(EMPTY_FORM);
        setPortrait(null);
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
        setLoading(true);

        try {
            const result = await getAdminLegacyLeaderById(id);
            const leader = getRecord(result);

            if (!leader?._id) {
                throw new Error("The legacy leader record could not be found.");
            }

            setEditingId(id);
            setExistingLeader(leader);
            setForm({
                ...EMPTY_FORM,
                ...leader,
                startYear: leader.startYear ?? "",
                endYear: leader.endYear ?? "",
                achievements: Array.isArray(leader.achievements)
                    ? leader.achievements.join("\n")
                    : "",
                displayOrder: leader.displayOrder ?? 0,
                isPublished: Boolean(leader.isPublished),
            });
            setPortrait(null);
            setDetailsOpen(false);
            setEditorOpen(true);
        } catch (err) {
            setError(err.message || "Unable to load legacy leader details.");
        } finally {
            setLoading(false);
        }
    };

    const openDetails = async (id) => {
        setError("");
        setLoading(true);

        try {
            const result = await getAdminLegacyLeaderById(id);
            const leader = getRecord(result);

            if (!leader?._id) {
                throw new Error("The legacy leader record could not be found.");
            }

            setExistingLeader(leader);
            setDetailsOpen(true);
        } catch (err) {
            setError(err.message || "Unable to load legacy leader details.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.name.trim()) {
            setError("Leader name is required.");
            return;
        }

        if (!form.title.trim()) {
            setError("Leadership title is required.");
            return;
        }

        const startYear = Number(form.startYear);
        const endYear = form.endYear === "" ? null : Number(form.endYear);
        const currentYear = new Date().getFullYear();

        if (
            !Number.isInteger(startYear) ||
            startYear < 1900 ||
            startYear > currentYear + 1
        ) {
            setError("Enter a valid leadership start year.");
            return;
        }

        if (
            endYear !== null &&
            (!Number.isInteger(endYear) ||
                endYear < startYear ||
                endYear > currentYear + 1)
        ) {
            setError(
                "End year must be valid and cannot be earlier than start year."
            );
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

        if (portrait && !portrait.type.startsWith("image/")) {
            setError("Please select a valid image for the portrait.");
            return;
        }

        if (portrait && portrait.size > 10 * 1024 * 1024) {
            setError("The portrait must not exceed 10 MB.");
            return;
        }

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const formData = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });

            if (portrait) {
                formData.append("portrait", portrait);
            }

            if (editingId) {
                await updateAdminLegacyLeader(editingId, formData);
                setSuccess("Legacy leader updated successfully.");
            } else {
                await createAdminLegacyLeader(formData);
                setSuccess("Legacy leader created successfully.");
            }

            resetEditor();
            await loadLeaders();
        } catch (err) {
            setError(err.message || "Unable to save legacy leader.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (leader) => {
        const confirmed = window.confirm(
            `Delete the record for ${leader.name}? This action cannot be undone.`
        );

        if (!confirmed) return;

        setDeletingId(leader._id);
        setError("");
        setSuccess("");

        try {
            await deleteAdminLegacyLeader(leader._id);

            setSuccess("Legacy leader deleted successfully.");

            setLeaders((previous) =>
                previous.filter((item) => item._id !== leader._id)
            );

            if (existingLeader?._id === leader._id) {
                setExistingLeader(null);
                setDetailsOpen(false);
            }
        } catch (err) {
            setError(err.message || "Unable to delete legacy leader.");
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
            {published ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}
            {published ? "Published" : "Draft"}
        </span>
    );

    return (
        <div className="w-full min-w-0 space-y-5 overflow-hidden p-4">
            <div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--secondary)">
                        <Crown size={22} />
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-xl font-semibold text-(--primary)">
                            Legacy Leadership
                        </h1>
                        <p className={`mt-1 ${mutedText}`}>
                            Manage past leaders, portraits, achievements and publication status.
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
                                <Crown size={28} className="mx-auto text-(--text-muted)" />
                                <p className="mt-3 font-medium text-(--primary)">
                                    No leadership records found
                                </p>
                                <p className={`mt-1 ${mutedText}`}>
                                    Try another search or add a leadership record.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[720px] text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-(--border) text-(--text-muted)">
                                            <th className="px-3 py-3 font-medium">Leader</th>
                                            <th className="px-3 py-3 font-medium">Title</th>
                                            <th className="px-3 py-3 font-medium">Leadership Years</th>
                                            <th className="px-3 py-3 font-medium">Status</th>
                                            <th className="px-3 py-3 text-right font-medium">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {leaders.map((leader) => (
                                            <tr
                                                key={leader._id}
                                                className="border-b border-(--border) last:border-0"
                                            >
                                                <td className="px-3 py-3">
                                                    <div className="flex items-center gap-3">
                                                        {leader.portrait ? (
                                                            <img
                                                                src={leader.portrait}
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
                                                                {leader.name}
                                                            </p>
                                                            <p className={`mt-0.5 ${mutedText}`}>
                                                                Order: {leader.displayOrder ?? 0}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-3 py-3 text-(--primary)">
                                                    {leader.title || "—"}
                                                </td>

                                                <td className="px-3 py-3 text-(--primary)">
                                                    {leader.startYear || "—"} – {leader.endYear || "Present"}
                                                </td>

                                                <td className="px-3 py-3">
                                                    {statusBadge(leader.isPublished)}
                                                </td>

                                                <td className="px-3 py-3">
                                                    <div className="flex justify-end gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => openDetails(leader._id)}
                                                            title="View leader"
                                                            className="rounded p-2 text-(--text-muted) transition hover:bg-(--bg-soft) hover:text-(--secondary)"
                                                        >
                                                            <Eye size={16} />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => openEdit(leader._id)}
                                                            title="Edit leader"
                                                            className="rounded p-2 text-(--text-muted) transition hover:bg-(--bg-soft) hover:text-(--secondary)"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(leader)}
                                                            disabled={deletingId === leader._id}
                                                            title="Delete leader"
                                                            className="rounded p-2 text-(--danger) transition hover:bg-(--danger)/5 disabled:opacity-50"
                                                        >
                                                            {deletingId === leader._id ? (
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
                            aria-label="Back to leadership records"
                        >
                            <ArrowLeft size={18} />
                        </button>

                        <div className="min-w-0">
                            <h2 className="font-semibold text-(--primary)">
                                {editingId ? "Edit Leader" : "Create Leadership Record"}
                            </h2>
                            <p className={`mt-1 ${mutedText}`}>
                                Add leadership details, achievements and a portrait.
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
                                        {field.required && (
                                            <span className="ml-1 text-(--danger)">*</span>
                                        )}
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
                                            placeholder={
                                                field.placeholder ||
                                                `Enter ${field.label.toLowerCase()}...`
                                            }
                                        />
                                    ) : (
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type || "text"}
                                            min={
                                                field.name === "displayOrder"
                                                    ? 0
                                                    : field.type === "number"
                                                        ? 1900
                                                        : undefined
                                            }
                                            max={
                                                field.name === "displayOrder"
                                                    ? 10000
                                                    : field.type === "number"
                                                        ? new Date().getFullYear() + 1
                                                        : undefined
                                            }
                                            step={field.type === "number" ? 1 : undefined}
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
                                    Leader Portrait
                                </label>

                                {portraitPreview ? (
                                    <img
                                        src={portraitPreview}
                                        alt="Selected portrait preview"
                                        className="h-40 w-40 rounded border border-(--border) object-cover"
                                    />
                                ) : existingLeader?.portrait ? (
                                    <img
                                        src={existingLeader.portrait}
                                        alt="Current leader portrait"
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
                                    onChange={(event) =>
                                        setPortrait(event.target.files?.[0] || null)
                                    }
                                    className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-(--bg-soft) file:px-3 file:py-1.5`}
                                />

                                {portrait && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPortrait(null);
                                        }}
                                        className="text-sm text-(--danger)"
                                    >
                                        Remove selected image
                                    </button>
                                )}

                                <p className={`text-xs ${mutedText}`}>
                                    Optional. Images only, maximum 10 MB. Leave empty to keep the current portrait when editing.
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
                                        Publish leadership record
                                    </span>
                                    <span className={`mt-1 block ${mutedText}`}>
                                        Published leaders appear on the public Legacy Leadership page. Leave unchecked to save as a draft.
                                    </span>
                                </span>
                            </label>
                        </div>

                        <div className="flex flex-col-reverse gap-3 border-t border-(--border) bg-(--bg-light) p-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className={`text-xs ${mutedText}`}>
                                Verify the leader's details and years before publishing.
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

            {detailsOpen && existingLeader && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <section className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded border border-(--border) bg-(--bg-white) shadow-xl">
                        <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-(--border) bg-(--bg-white) p-4">
                            <h2 className="font-semibold text-(--primary)">
                                Leadership Details
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
                            {existingLeader.portrait ? (
                                <img
                                    src={existingLeader.portrait}
                                    alt={existingLeader.name}
                                    className="h-56 w-full rounded object-cover"
                                />
                            ) : (
                                <div className="flex h-40 items-center justify-center rounded bg-(--bg-soft) text-(--text-muted)">
                                    <ImageIcon size={36} />
                                </div>
                            )}

                            <div>
                                <h3 className="text-lg font-semibold text-(--primary)">
                                    {existingLeader.name}
                                </h3>

                                <p className="mt-1 text-sm text-(--text-muted)">
                                    {existingLeader.title || "Leader"}
                                </p>

                                <p className="mt-1 text-sm text-(--text-muted)">
                                    {existingLeader.startYear || "—"} – {existingLeader.endYear || "Present"}
                                </p>

                                <div className="mt-3">
                                    {statusBadge(existingLeader.isPublished)}
                                </div>
                            </div>

                            {existingLeader.biography && (
                                <div>
                                    <h4 className="text-sm font-medium text-(--primary)">
                                        Biography
                                    </h4>
                                    <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-(--text-muted)">
                                        {existingLeader.biography}
                                    </p>
                                </div>
                            )}

                            {existingLeader.achievements?.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium text-(--primary)">
                                        Achievements
                                    </h4>

                                    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-(--text-muted)">
                                        {existingLeader.achievements.map((achievement, index) => (
                                            <li key={`${index}-${achievement}`}>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex justify-end border-t border-(--border) pt-4">
                                <button
                                    type="button"
                                    onClick={() => openEdit(existingLeader._id)}
                                    className="inline-flex items-center gap-2 rounded bg-(--primary) px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
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

export default LegacyLeadershipManagement;
