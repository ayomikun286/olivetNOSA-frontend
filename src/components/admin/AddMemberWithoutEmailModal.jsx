import React, { useEffect, useState } from "react";
import {
  X,
  UserPlus,
  Phone,
  CalendarDays,
  MapPin,
  Loader2,
  LockKeyhole,
  Copy,
  Check,
  ShieldCheck,
} from "lucide-react";

const initialFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  phone: "",
  enrollmentYear: "",
  graduationYear: "",
  chapter: "",
};

const AddMemberWithoutEmailModal = ({
  open,
  onClose,
  onSubmit,
  chapters = [],
  loading = false,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState(null);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (open) {
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      server: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.enrollmentYear) {
      newErrors.enrollmentYear = "Enrollment year is required.";
    }

    if (!formData.graduationYear) {
      newErrors.graduationYear = "Graduation year is required.";
    }

    const enrollmentYear = Number(formData.enrollmentYear);
    const graduationYear = Number(formData.graduationYear);

    if (
      formData.enrollmentYear &&
      (!Number.isInteger(enrollmentYear) ||
        enrollmentYear < 1900 ||
        enrollmentYear > currentYear)
    ) {
      newErrors.enrollmentYear = "Enter a valid enrollment year.";
    }

    if (
      formData.graduationYear &&
      (!Number.isInteger(graduationYear) ||
        graduationYear < 1900 ||
        graduationYear > currentYear)
    ) {
      newErrors.graduationYear = "Enter a valid graduation year.";
    }

    if (
      formData.enrollmentYear &&
      formData.graduationYear &&
      enrollmentYear > graduationYear
    ) {
      newErrors.enrollmentYear =
        "Enrollment year cannot be after graduation year.";
    }

    if (!formData.chapter) {
      newErrors.chapter = "Please select a chapter.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await onSubmit({
        ...formData,
        enrollmentYear,
        graduationYear,
      });

      if (!result?.credentials?.alumniId ||
          !result?.credentials?.temporaryPassword) {
        throw new Error(
          "Member was created, but login credentials were not returned. Please contact support before closing this window."
        );
      }

      setCredentials(result.credentials);
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      setErrors({
        server: error.message || "Unable to create member.",
      });
    }
  };

  const copyCredential = async (value, field) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(field);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch {
      setErrors({
        server: "Unable to copy. Please select and copy the text manually.",
      });
    }
  };

  const handleClose = () => {
    if (loading) return;

    setFormData(initialFormData);
    setErrors({});
    setCredentials(null);
    setCopied("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={handleClose}
        disabled={loading}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />

      {/* MODAL */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-(--bg-white) rounded border border-(--border) shadow-xl">

        {/* HEADER */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-(--border)">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-(--primary-light) flex items-center justify-center">
              {credentials ? (
                <ShieldCheck
                  size={19}
                  className="text-(--primary)"
                />
              ) : (
                <UserPlus
                  size={19}
                  className="text-(--primary)"
                />
              )}
            </div>

            <div>
              <h2 className="text-base font-semibold text-(--primary)">
                {credentials
                  ? "Member Created Successfully"
                  : "Register Member Without Email"}
              </h2>

              <p className="text-xs text-(--secondary) mt-1">
                {credentials
                  ? "Copy and securely hand over these login credentials."
                  : "Create an active account for an older alumnus without an email address."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-(--text-muted) hover:bg-(--bg-soft) hover:text-(--primary) transition-colors"
          >
            <X size={17} />
          </button>
        </div>

        {credentials ? (
          /* SUCCESS / CREDENTIALS */
          <div className="p-6 space-y-5">
            <div className="rounded border border-(--success-light) bg-(--success-light) px-4 py-3 flex gap-3">
              <ShieldCheck
                size={18}
                className="text-(--success) shrink-0 mt-0.5"
              />

              <div>
                <p className="text-xs font-semibold text-(--success)">
                  Account is active
                </p>

                <p className="text-xs text-(--secondary) mt-1 leading-5">
                  The member can log in immediately using their Alumni ID
                  and temporary password. They will be required to change
                  their password on their first login.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <CredentialField
                label="Alumni ID"
                value={credentials.alumniId}
                copied={copied === "alumniId"}
                onCopy={() =>
                  copyCredential(credentials.alumniId, "alumniId")
                }
              />

              <CredentialField
                label="Temporary Password"
                value={credentials.temporaryPassword}
                copied={copied === "password"}
                onCopy={() =>
                  copyCredential(
                    credentials.temporaryPassword,
                    "password"
                  )
                }
              />
            </div>

            <div className="rounded border border-(--warning) bg-(--warning-light) px-4 py-3">
              <p className="text-xs font-semibold text-(--primary)">
                Important security notice
              </p>

              <p className="text-xs text-(--secondary) mt-1 leading-5">
                Copy these credentials and give them directly to the
                member. This temporary password will not be displayed
                again after you close this window.
              </p>
            </div>

            {errors.server && (
              <p className="text-xs text-(--danger)">
                {errors.server}
              </p>
            )}

            <div className="flex justify-end border-t border-(--border) pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="h-9 px-5 rounded bg-(--primary) text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-5">
              {/* PERSONAL DETAILS */}
              <div>
                <p className="text-xs font-semibold text-(--primary) mb-3">
                  Personal Information
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                  />

                  <Input
                    label="Middle Name"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                  />

                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                  />

                  <Input
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    icon={Phone}
                  />
                </div>
              </div>

              {/* MEMBERSHIP DETAILS */}
              <div>
                <p className="text-xs font-semibold text-(--primary) mb-3">
                  Membership Information
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Enrollment Year"
                    name="enrollmentYear"
                    type="number"
                    value={formData.enrollmentYear}
                    onChange={handleChange}
                    error={errors.enrollmentYear}
                    required
                    icon={CalendarDays}
                  />

                  <Input
                    label="Graduation Year"
                    name="graduationYear"
                    type="number"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    error={errors.graduationYear}
                    required
                    icon={CalendarDays}
                  />

                  <Select
                    label="Chapter"
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleChange}
                    error={errors.chapter}
                    required
                    icon={MapPin}
                  >
                    <option value="">Select chapter</option>

                    {chapters.map((chapter) => (
                      <option
                        key={chapter._id}
                        value={chapter._id}
                      >
                        {chapter.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {errors.server && (
                <div className="rounded border border-(--danger-light) bg-(--danger-light) px-4 py-3">
                  <p className="text-xs text-(--danger)">
                    {errors.server}
                  </p>
                </div>
              )}

              {/* ACCOUNT INFORMATION */}
              <div className="flex gap-3 rounded border border-(--border) bg-(--bg-soft) px-4 py-3">
                <LockKeyhole
                  size={17}
                  className="text-(--primary) mt-0.5 shrink-0"
                />

                <div>
                  <p className="text-xs font-semibold text-(--primary)">
                    Account and password security
                  </p>

                  <p className="text-xs text-(--text-muted) mt-1 leading-5">
                    This account will be activated immediately. A secure
                    temporary password will be generated automatically,
                    and the member must change it on their first login.
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-(--border)">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="h-9 px-4 rounded-lg border border-(--border) text-xs font-medium text-(--primary) hover:bg-(--bg-soft) transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="h-9 px-4 rounded-lg bg-(--primary) text-white text-xs font-semibold inline-flex items-center gap-2 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus size={14} />
                    Create Active Member
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const CredentialField = ({
  label,
  value,
  copied,
  onCopy,
}) => (
  <div>
    <label className="block text-xs font-medium text-(--primary) mb-1.5">
      {label}
    </label>

    <div className="flex gap-2">
      <div className="flex-1 min-w-0 h-10 px-3 rounded border border-(--border) bg-(--bg-soft) flex items-center">
        <span className="text-sm font-semibold text-(--primary) break-all">
          {value}
        </span>
      </div>

      <button
        type="button"
        onClick={onCopy}
        className="h-10 px-3 rounded border border-(--border) text-(--primary) text-xs font-semibold inline-flex items-center gap-2 hover:bg-(--bg-soft) transition-colors shrink-0"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  </div>
);

const Input = ({
  label,
  icon: Icon,
  required,
  error,
  ...props
}) => (
  <div>
    <label className="block text-xs font-medium text-(--primary) mb-1.5">
      {label}
      {required && (
        <span className="text-(--danger) ml-0.5">*</span>
      )}
    </label>

    <div className="relative">
      {Icon && (
        <Icon
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
        />
      )}

      <input
        {...props}
        className={`
          h-9 w-full
          ${Icon ? "pl-9" : "px-3"}
          pr-3 rounded border
          ${error ? "border-(--danger)" : "border-(--border)"}
          bg-(--bg-white) text-xs text-(--primary)
          outline-none focus:border-(--primary)
          transition-colors
        `}
      />
    </div>

    {error && (
      <p className="text-[11px] text-(--danger) mt-1">
        {error}
      </p>
    )}
  </div>
);

const Select = ({
  label,
  icon: Icon,
  required,
  error,
  children,
  ...props
}) => (
  <div>
    <label className="block text-xs font-medium text-(--primary) mb-1.5">
      {label}
      {required && (
        <span className="text-(--danger) ml-0.5">*</span>
      )}
    </label>

    <div className="relative">
      {Icon && (
        <Icon
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) pointer-events-none"
        />
      )}

      <select
        {...props}
        className={`
          h-9 w-full
          ${Icon ? "pl-9" : "px-3"}
          pr-3 rounded border
          ${error ? "border-(--danger)" : "border-(--border)"}
          bg-(--bg-white) text-xs text-(--primary)
          outline-none focus:border-(--primary)
        `}
      >
        {children}
      </select>
    </div>

    {error && (
      <p className="text-[11px] text-(--danger) mt-1">
        {error}
      </p>
    )}
  </div>
);

export default AddMemberWithoutEmailModal;