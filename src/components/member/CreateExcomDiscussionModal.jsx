import React, { useEffect, useState } from "react";
import {
    X,
    MessageSquare,
    FileText,
    LoaderCircle,
} from "lucide-react";

const CreateExcomDiscussionModal = ({
    open,
    submitting = false,
    onClose,
    onSubmit,
}) => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (open) {
            setSubject("");
            setMessage("");
        }
    }, [open]);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!subject.trim() || !message.trim()) return;

        onSubmit({
            subject: subject.trim(),
            message: message.trim(),
        });
    };

    const handleClose = () => {
        if (submitting) return;

        setSubject("");
        setMessage("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-(--bg-white) rounded-lg shadow-xl overflow-hidden">

                <div className="p-5 border-b border-(--border) flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-(--primary)">
                            New EXCOM Discussion
                        </h2>

                        <p className="text-xs text-(--secondary) mt-1">
                            Start an official discussion with your executive team.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={submitting}
                        className="text-(--text-muted) hover:text-(--primary) disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-5">

                    <div>
                        <label className="text-xs font-semibold text-(--primary) block mb-2">
                            Discussion Subject
                        </label>

                        <div className="relative">
                            <FileText
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                            />

                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter discussion subject"
                                maxLength={200}
                                required
                                className="w-full border border-(--border) rounded-md pl-10 pr-3 py-3 text-sm bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary)"
                            />
                        </div>

                        <p className="text-[11px] text-(--text-muted) text-right mt-1">
                            {subject.length}/200 characters
                        </p>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-(--primary) block mb-2">
                            Discussion Message
                        </label>

                        <div className="relative">
                            <MessageSquare
                                size={16}
                                className="absolute left-3 top-3 text-(--text-muted)"
                            />

                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your discussion message..."
                                rows={6}
                                required
                                className="w-full border border-(--border) rounded-md pl-10 pr-3 py-3 text-sm bg-(--bg-white) text-(--primary) outline-none focus:border-(--primary) resize-y"
                            />
                        </div>
                    </div>

                    <div className="rounded-md bg-(--primary-light) p-3">
                        <p className="text-xs text-(--primary)">
                            Your discussion will be published immediately and made
                            available to active EXCOM members.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={submitting}
                            className="px-4 py-2.5 rounded-md border border-(--border) text-xs font-semibold text-(--secondary) disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                submitting ||
                                !subject.trim() ||
                                !message.trim()
                            }
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-(--primary) text-white text-xs font-semibold disabled:opacity-50"
                        >
                            {submitting && (
                                <LoaderCircle
                                    size={14}
                                    className="animate-spin"
                                />
                            )}

                            {submitting ? "Publishing..." : "Publish Discussion"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateExcomDiscussionModal;