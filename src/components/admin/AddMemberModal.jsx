import React, { useEffect, useState } from "react";
import {
  X,
  UserPlus,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  Loader2,
  LockKeyhole,
} from "lucide-react";

const AddMemberModal = ({
  open,
  onClose,
  onSubmit,
  chapters = [],
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    enrollmentYear: "",
    graduationYear: "",
    chapter: "",
  });

  const [errors, setErrors] = useState({});

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

    // FRONTEND VALIDATION
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    }

    if (!formData.graduationYear) {
      newErrors.graduationYear = "Graduation year is required.";
    }

    if (!formData.chapter) {
      newErrors.chapter = "Please select a chapter.";
    }

      if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }


    if (!formData.enrollmentYear) {
      newErrors.enrollmentYear = "Enrollment year is required.";
    } else {
      const enrollmentYear = Number(formData.enrollmentYear);

      if (enrollmentYear < 1945 || enrollmentYear > 2026) {
        newErrors.enrollmentYear =
          "Please enter a valid enrollment year.";
      }
    }


    if (!formData.graduationYear) {
      newErrors.graduationYear = "Graduation year is required.";
    } else {
      const graduationYear = Number(formData.graduationYear);

      if (graduationYear < 1945 || graduationYear > 2026) {
        newErrors.graduationYear =
          "Please enter a valid graduation year.";
      }
    }



    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit(formData);

      // Reset form after successful submission
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        enrollmentYear: "",
        graduationYear: "",
        chapter: "",
      });

      setErrors({});
    } catch (error) {
      // Backend error
      setErrors({
        server: error.message || "Unable to create member.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* BACKDROP */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        disabled={loading}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />

      {/* MODAL */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-(--bg-white) rounded border border-(--border) shadow-xl">

        {/* HEADER */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-(--border)">

          <div className="flex items-start gap-3">

            <div className="w-10 h-10 rounded-xl bg-(--primary-light) flex items-center justify-center">
              <UserPlus
                size={19}
                className="text-(--primary)"
              />
            </div>

            <div>
              <h2 className="text-base font-semibold text-(--primary)">
                Add New Member
              </h2>

              <p className="text-xs text-(--secondary) mt-1">
                Create a member account and send an activation email.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              w-8 h-8
              rounded-lg
              flex items-center justify-center
              text-(--text-muted)
              hover:bg-(--bg-soft)
              hover:text-(--primary)
              transition-colors
            "
          >
            <X size={17} />
          </button>

        </div>

        {/* FORM */}
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
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  icon={Mail}
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
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
                  <option value="">
                    Select chapter
                  </option>

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
              <div className="rounded  border border-(--danger-light) bg-(--danger-light) px-4 py-3">
                <p className="text-xs text-(--danger)">
                  {errors.server}
                </p>
              </div>
            )}

            {/* ACTIVATION INFO */}
            <div className="flex gap-3 rounded border border-(--border) bg-(--bg-soft) px-4 py-3">

              <LockKeyhole
                size={17}
                className="text-(--primary) mt-0.5 shrink-0"
              />

              <div>

                <p className="text-xs font-semibold text-(--primary)">
                  Account activation
                </p>

                <p className="text-xs text-(--text-muted) mt-1 leading-5">
                  The member will receive an email with a secure
                  activation link to create their password.
                </p>

              </div>

            </div>

          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-(--border)">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                h-9 px-4
                rounded-lg
                border border-(--border)
                text-xs font-medium
                text-(--primary)
                hover:bg-(--bg-soft)
                transition-colors
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                h-9 px-4
                rounded-lg
                bg-(--primary)
                text-white
                text-xs font-semibold
                inline-flex items-center gap-2
                hover:opacity-90
                disabled:opacity-60
                disabled:cursor-not-allowed
                transition-opacity
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus size={14} />
                  Add Member
                </>
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

const Input = ({
  label,
  icon: Icon,
  required,
  error,
  ...props
}) => {
  return (
    <div>

      <label className="block text-xs font-medium text-(--primary) mb-1.5">
        {label}

        {required && (
          <span className="text-(--danger) ml-0.5">
            *
          </span>
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
            pr-3
            rounded
            border
            ${error
              ? "border-(--danger)"
              : "border-(--border)"
            }
            bg-(--bg-white)
            text-xs
            text-(--primary)
            outline-none
            focus:border-(--primary)
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
};

const Select = ({
  label,
  icon: Icon,
  required,
  error,
  children,
  ...props
}) => {
  return (
    <div>

      <label className="block text-xs font-medium text-(--primary) mb-1.5">
        {label}

        {required && (
          <span className="text-(--danger) ml-0.5">
            *
          </span>
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
            pr-3
            rounded
            border
            ${error
              ? "border-(--danger)"
              : "border-(--border)"
            }
            bg-(--bg-white)
            text-xs
            text-(--primary)
            outline-none
            focus:border-(--primary)
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
};

export default AddMemberModal;