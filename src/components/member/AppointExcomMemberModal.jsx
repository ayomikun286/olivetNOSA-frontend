import React, { useState } from "react";
import { X, Users, BriefcaseBusiness, LoaderCircle } from "lucide-react";

const AppointExcomMemberModal = ({
    open,
    members = [],
    submitting = false,
    onClose,
    onSubmit,
}) => {
    const [selectedUserId, setSelectedUserId] = useState("");
    const [position, setPosition] = useState("");

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedUserId || !position.trim()) return;

        onSubmit({
            userId: selectedUserId,
            position: position.trim(),
        });
    };

    const handleClose = () => {
        setSelectedUserId("");
        setPosition("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-(--bg-white) rounded-lg shadow-xl overflow-hidden">

                <div className="p-5 border-b border-(--border) flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-(--primary)">
                            Appoint EXCOM Member
                        </h2>

                        <p className="text-xs text-(--secondary) mt-1">
                            Add a member to your executive committee.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        className="text-(--text-muted) hover:text-(--primary)"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-5">

                    <div>
                        <label className="text-xs font-semibold text-(--primary) block mb-2">
                            Select Member
                        </label>

                        <div className="relative">
                            <Users
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                            />

                            <select
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                required
                                className="w-full border border-(--border) rounded-md pl-10 pr-3 py-3 text-sm bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                            >
                                <option value="">Choose an eligible member</option>

                                {members.map((member) => (
                                    <option key={member._id} value={member._id}>
                                        {member.firstName} {member.lastName}
                                        {member.alumniId ? ` (${member.alumniId})` : ""}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {members.length === 0 && (
                            <p className="text-xs text-(--text-muted) mt-2">
                                No eligible members available for appointment.
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-(--primary) block mb-2">
                            Executive Position
                        </label>

                        <div className="relative">
                            <BriefcaseBusiness
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                            />

                            <input
                                type="text"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder="e.g. General Secretary"
                                required
                                className="w-full border border-(--border) rounded-md pl-10 pr-3 py-3 text-sm bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={submitting}
                            className="px-4 py-2.5 rounded-md border border-(--border) text-xs font-semibold text-(--secondary)"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={submitting || members.length === 0}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-(--primary) text-white text-xs font-semibold disabled:opacity-50"
                        >
                            {submitting && (
                                <LoaderCircle size={14} className="animate-spin" />
                            )}

                            {submitting ? "Appointing..." : "Appoint Member"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default AppointExcomMemberModal;