
import React, { useState } from "react";
import { Plus, X, Loader2, Layers3 } from "lucide-react";
import { createAdminYearSet } from "../../services/adminService.js";

const CreateYearSetButton = ({ onCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const closeModal = () => {
    if (saving) return;

    setIsOpen(false);
    setYear("");
    setName("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const graduationYear = Number(year);

    if (
      !year.trim() ||
      !Number.isInteger(graduationYear) ||
      graduationYear < 1900
    ) {
      setError("Please enter a valid graduation year.");
      return;
    }

    if (name.trim().length > 100) {
      setError("Year Set name cannot exceed 100 characters.");
      return;
    }

    try {
      setSaving(true);

      const result = await createAdminYearSet({
        year: graduationYear,
        ...(name.trim() ? { name: name.trim() } : {}),
      });

      setIsOpen(false);
      setYear("");
      setName("");
      setError("");

      await onCreated?.(
        result?.message || "Year Set created successfully."
      );
    } catch (err) {
      setError(
        err.message || "Failed to create Year Set."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          inline-flex items-center justify-center gap-2
          h-10 px-4 rounded
          bg-(--primary) text-white
          text-xs font-semibold
          hover:opacity-90 transition
        "
      >
        <Plus size={16} />
        Create Year Set
      </button>

      {isOpen && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50 p-4
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-year-set-title"
            className="
              w-full max-w-md
              rounded border border-(--border)
              bg-(--bg-white) shadow-xl
            "
          >
            <div className="
              flex items-start justify-between gap-4
              border-b border-(--border) p-5
            ">
              <div className="flex items-start gap-3">
                <div className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded bg-(--primary-light) text-(--primary)
                ">
                  <Layers3 size={19} />
                </div>

                <div>
                  <h2
                    id="create-year-set-title"
                    className="text-sm font-semibold text-(--primary)"
                  >
                    Create Year Set
                  </h2>

                  <p className="mt-1 text-xs text-(--secondary)">
                    Register a graduation year for alumni membership.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                aria-label="Close modal"
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded text-(--secondary)
                  hover:bg-(--bg-soft) disabled:opacity-50
                "
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              <div>
                <label
                  htmlFor="graduation-year"
                  className="
                    mb-1.5 block text-xs font-medium
                    text-(--primary)
                  "
                >
                  Graduation Year *
                </label>

                <input
                  id="graduation-year"
                  type="number"
                  min="1900"
                  step="1"
                  required
                  autoFocus
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  placeholder="e.g. 2020"
                  disabled={saving}
                  className="
                    h-10 w-full rounded border border-(--border)
                    bg-(--bg-white) px-3 text-sm text-(--primary)
                    outline-none focus:border-(--primary)
                    disabled:opacity-60
                  "
                />

                <p className="mt-1.5 text-[11px] text-(--text-muted)">
                  Each graduation year can have only one Year Set.
                </p>
              </div>

              <div>
                <label
                  htmlFor="year-set-name"
                  className="
                    mb-1.5 block text-xs font-medium
                    text-(--primary)
                  "
                >
                  Year Set Name <span className="font-normal">(optional)</span>
                </label>

                <input
                  id="year-set-name"
                  type="text"
                  maxLength={100}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Class of 2020"
                  disabled={saving}
                  className="
                    h-10 w-full rounded border border-(--border)
                    bg-(--bg-white) px-3 text-sm text-(--primary)
                    outline-none focus:border-(--primary)
                    disabled:opacity-60
                  "
                />

                <p className="mt-1.5 text-[11px] text-(--text-muted)">
                  Leave blank to use the default Year Set name.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="
                    rounded border border-(--danger)
                    bg-(--danger-light) px-3 py-2.5
                    text-xs text-(--danger)
                  "
                >
                  {error}
                </div>
              )}

              <div className="
                flex justify-end gap-2
                border-t border-(--border) pt-4
              ">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="
                    h-9 rounded border border-(--border)
                    px-4 text-xs font-medium text-(--secondary)
                    hover:bg-(--bg-soft) disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    inline-flex h-9 items-center justify-center gap-2
                    rounded bg-(--primary) px-4
                    text-xs font-semibold text-white
                    hover:opacity-90 disabled:opacity-60
                  "
                >
                  {saving && (
                    <Loader2 size={14} className="animate-spin" />
                  )}
                  {saving ? "Creating..." : "Create Year Set"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateYearSetButton;
