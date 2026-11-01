import React from "react";
import {
    X,
    Search,
    LoaderCircle,
    UserRoundPlus,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const AppointmentModal = ({
    open,
    onClose,
    members,
    loading,
    error,
    search,
    onSearchChange,
    selectedMemberId,
    onMemberSelect,
    page,
    totalPages,
    onPageChange,
    position,
    onPositionChange,
    submitting,
    submitError,
    onSubmit,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-xl overflow-hidden rounded border border-(--border) bg-(--bg-white) shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                            <UserRoundPlus size={18} />
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-(--primary)">
                                Appoint EXCOM Member
                            </h2>

                            <p className="text-xs text-(--secondary)">
                                Select an active alumni member and assign a position.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={submitting}
                        className="rounded p-2 text-(--secondary) hover:bg-(--bg-soft)"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-5 p-5">

                    {/* Search */}
                    <div>
                        <label className="mb-2 block text-xs font-medium text-(--primary)">
                            Search Active Members
                        </label>

                        <div className="relative">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder="Search name, email or Alumni ID..."
                                className="h-10 w-full rounded border border-(--border) bg-(--bg-white) pl-9 pr-3 text-xs outline-none focus:border-(--primary)"
                            />
                        </div>
                    </div>

                    {/* Member list */}
                    <div>
                        <p className="mb-2 text-xs font-medium text-(--primary)">
                            Select Member
                        </p>

                        <div className="max-h-56 overflow-y-auto rounded border border-(--border)">
                            {loading ? (
                                <div className="flex items-center justify-center gap-2 py-10 text-xs text-(--secondary)">
                                    <LoaderCircle size={15} className="animate-spin" />
                                    Loading members...
                                </div>
                            ) : error ? (
                                <p className="p-4 text-xs text-(--danger)">
                                    {error}
                                </p>
                            ) : members.length === 0 ? (
                                <p className="p-6 text-center text-xs text-(--secondary)">
                                    No eligible active members found.
                                </p>
                            ) : (
                                members.map((member) => {
                                    const selected = selectedMemberId === member._id;

                                    return (
                                        <button
                                            key={member._id}
                                            type="button"
                                            onClick={() => onMemberSelect(member._id)}
                                            className={`flex w-full items-center justify-between gap-3 border-b border-(--border) px-4 py-3 text-left last:border-b-0 ${
                                                selected
                                                    ? "bg-(--primary-light)"
                                                    : "hover:bg-(--bg-soft)"
                                            }`}
                                        >
                                            <div>
                                                <p className="text-xs font-medium text-(--primary)">
                                                    {member.firstName}{" "}
                                                    {member.middleName || ""}{" "}
                                                    {member.lastName}
                                                </p>

                                                <p className="mt-1 text-[11px] text-(--secondary)">
                                                    {member.email}
                                                </p>

                                                <p className="mt-1 text-[10px] text-(--text-muted)">
                                                    Alumni ID: {member.alumniId || "Not assigned"}
                                                </p>
                                            </div>

                                            <span className={`h-4 w-4 shrink-0 rounded-full border ${
                                                selected
                                                    ? "border-(--primary) bg-(--primary)"
                                                    : "border-(--border)"
                                            }`} />
                                        </button>
                                    );
                                })
                            )}
                        </div>

                        {/* Pagination */}
                        {!loading && !error && totalPages > 1 && (
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-[11px] text-(--secondary)">
                                    Page {page} of {totalPages}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        disabled={page <= 1}
                                        onClick={() => onPageChange(page - 1)}
                                        className="rounded border border-(--border) p-2 text-(--primary) disabled:opacity-40"
                                    >
                                        <ChevronLeft size={15} />
                                    </button>

                                    <button
                                        type="button"
                                        disabled={page >= totalPages}
                                        onClick={() => onPageChange(page + 1)}
                                        className="rounded border border-(--border) p-2 text-(--primary) disabled:opacity-40"
                                    >
                                        <ChevronRight size={15} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Position */}
                    <div>
                        <label className="mb-2 block text-xs font-medium text-(--primary)">
                            EXCOM Position
                        </label>

                        <input
                            type="text"
                            value={position}
                            onChange={(e) => onPositionChange(e.target.value)}
                            placeholder="e.g. General Secretary"
                            maxLength={100}
                            required
                            className="h-10 w-full rounded border border-(--border) px-3 text-xs outline-none focus:border-(--primary)"
                        />
                    </div>

                    {submitError && (
                        <p className="rounded border border-(--danger) bg-(--danger-light) p-3 text-xs text-(--danger)">
                            {submitError}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t border-(--border) pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="h-9 rounded border border-(--border) px-4 text-xs font-medium text-(--secondary) hover:bg-(--bg-soft)"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                submitting ||
                                loading ||
                                !selectedMemberId ||
                                !position.trim()
                            }
                            className="inline-flex h-9 items-center justify-center gap-2 rounded bg-(--primary) px-4 text-xs font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {submitting && (
                                <LoaderCircle size={14} className="animate-spin" />
                            )}

                            Appoint Member
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AppointmentModal;