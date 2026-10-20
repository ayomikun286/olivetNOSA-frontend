
import React, { useCallback, useEffect, useState } from "react";
import {
  Settings,
  Building2,
  Users,
  Wallet,
  Bell,
  ShieldCheck,
  Save,
  RefreshCw,
  Info,
  CheckCircle2,
  AlertCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  Image,
  RotateCcw,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  getGeneralSettings,
  updateGeneralSettings,
} from "../../services/adminService.js";

const sections = [
  { id: "general", label: "General", icon: Building2 },
  { id: "membership", label: "Membership", icon: Users },
  { id: "finance", label: "Finance", icon: Wallet },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
];

const emptySettings = {
  associationName: "ONW GOSA",
  shortName: "ONW GOSA",
  contactEmail: "",
  phone: "",
  address: "",
  website: "",
  logoUrl: "",
  socialLinks: {
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  },
};

const inputClass =
  "w-full h-9 rounded border border-(--border) bg-(--bg-white) px-3 text-xs text-(--primary) outline-none transition-colors focus:border-(--primary)";

const labelClass =
  "mb-1.5 block text-xs font-medium text-(--primary)";

const normalizeSettings = (data = {}) => ({
  ...emptySettings,
  ...data,
  socialLinks: {
    ...emptySettings.socialLinks,
    ...(data.socialLinks || {}),
  },
});

const Field = ({
  label,
  icon: Icon,
  hint,
  ...props
}) => (
  <div className="min-w-0">
    <label
      htmlFor={props.id || props.name}
      className={labelClass}
    >
      <span className="inline-flex items-center gap-1.5">
        {Icon && (
          <Icon size={13} className="text-(--text-muted)" />
        )}
        {label}
      </span>
    </label>

    <input
      id={props.id || props.name}
      className={inputClass}
      {...props}
    />

    {hint && (
      <p className="mt-1.5 text-[11px] leading-5 text-(--text-muted)">
        {hint}
      </p>
    )}
  </div>
);

const SettingsNotice = ({ children }) => (
  <div className="flex items-start gap-2.5 rounded border border-(--border) bg-(--bg-light) px-4 py-3">
    <Info
      size={16}
      className="mt-0.5 shrink-0 text-(--primary)"
    />
    <p className="text-xs leading-5 text-(--secondary)">
      {children}
    </p>
  </div>
);

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [settings, setSettings] = useState(emptySettings);
  const [savedSettings, setSavedSettings] = useState(emptySettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadSettings = useCallback(async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await getGeneralSettings();
      const normalized = normalizeSettings(data);

      setSettings(normalized);
      setSavedSettings(normalized);
    } catch (err) {
      setError(err.message || "Unable to load settings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSocialChange = (event) => {
    const { name, value } = event.target;

    setSettings((current) => ({
      ...current,
      socialLinks: {
        ...current.socialLinks,
        [name]: value,
      },
    }));

    setError("");
    setSuccess("");
  };

  const handleReset = () => {
    setSettings(normalizeSettings(savedSettings));
    setError("");
    setSuccess("");
  };

  const handleSave = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updated = await updateGeneralSettings(settings);
      const normalized = normalizeSettings(updated);

      setSettings(normalized);
      setSavedSettings(normalized);
      setSuccess("General settings saved successfully.");
    } catch (err) {
      setError(err.message || "Unable to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(savedSettings);

  const activeLabel =
    sections.find((section) => section.id === activeSection)?.label ||
    "General";

  const filledSocialLinks = Object.values(
    settings.socialLinks
  ).filter((value) => value.trim()).length;

  const completedContactFields = [
    settings.contactEmail,
    settings.phone,
    settings.address,
    settings.website,
  ].filter((value) => value.trim()).length;

  return (
    <div className="space-y-5 p-4">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Settings
              size={21}
              className="text-(--primary)"
            />
            <h1 className="text-xl font-semibold text-(--primary)">
              Admin Settings
            </h1>
          </div>

          <p className="mt-1 text-sm text-(--secondary)">
            Manage association information and portal configuration.
          </p>
        </div>

        <button
          type="button"
          onClick={loadSettings}
          disabled={loading || saving}
          className="inline-flex h-9 items-center justify-center gap-2 rounded border border-(--border) px-3.5 text-xs font-semibold text-(--primary) transition-colors hover:bg-(--bg-soft) disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={14}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* STATUS MESSAGES */}
      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded border border-(--danger) bg-(--danger-light) px-4 py-3"
        >
          <div className="flex items-start gap-2">
            <AlertCircle
              size={16}
              className="mt-0.5 shrink-0 text-(--danger)"
            />
            <p className="text-xs text-(--danger)">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            className="text-(--danger)"
            aria-label="Dismiss error"
          >
            <span className="text-sm">×</span>
          </button>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="flex items-start gap-2 rounded border border-(--success) bg-(--success-light) px-4 py-3"
        >
          <CheckCircle2
            size={16}
            className="mt-0.5 shrink-0 text-(--success)"
          />
          <p className="text-xs text-(--success)">
            {success}
          </p>
        </div>
      )}

      {/* OVERVIEW CARDS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          icon={Building2}
          label="Association"
          value={settings.shortName || "ONW GOSA"}
          description="Organisation identity"
          iconBg="bg-(--primary-light)"
          iconClass="text-(--primary)"
        />

        <OverviewCard
          icon={Mail}
          label="Contact Details"
          value={`${completedContactFields}/4`}
          description="Contact fields completed"
          iconBg="bg-(--success-light)"
          iconClass="text-(--success)"
        />

        <OverviewCard
          icon={Globe}
          label="Social Accounts"
          value={`${filledSocialLinks}/4`}
          description="Official links configured"
          iconBg="bg-(--primary-light)"
          iconClass="text-(--primary)"
        />

        <OverviewCard
          icon={Settings}
          label="Configuration"
          value={`${sections.length} sections`}
          description="Settings categories"
          iconBg="bg-(--warning-light)"
          iconClass="text-(--warning)"
        />
      </div>

      {/* MAIN SETTINGS LAYOUT */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* SIDEBAR */}
        <aside className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
          <div className="border-b border-(--border) px-4 py-3">
            <h2 className="text-xs font-semibold text-(--primary)">
              Configuration
            </h2>
            <p className="mt-1 text-[11px] text-(--secondary)">
              Manage portal settings
            </p>
          </div>

          <nav className="space-y-1 p-2">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setActiveSection(id);
                  setError("");
                  setSuccess("");
                }}
                className={`flex w-full items-center gap-2.5 rounded px-3 py-2.5 text-left text-xs font-medium transition-colors ${
                  activeSection === id
                    ? "bg-(--primary-light) text-(--primary)"
                    : "text-(--secondary) hover:bg-(--bg-soft) hover:text-(--primary)"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>

                {activeSection === id && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-(--primary)" />
                )}
              </button>
            ))}
          </nav>

          <div className="border-t border-(--border) p-3">
            <p className="text-[10px] leading-5 text-(--text-muted)">
              Changes should be tested before they are used to control
              important portal features.
            </p>
          </div>
        </aside>

        {/* CONTENT PANEL */}
        <section className="min-w-0 overflow-hidden rounded border border-(--border) bg-(--bg-white)">
          <div className="flex flex-col gap-3 border-b border-(--border) px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-sm font-semibold text-(--primary)">
                {activeLabel} Settings
              </h2>

              <p className="mt-1 text-xs text-(--secondary)">
                {activeSection === "general"
                  ? "Manage the association's official identity and contact details."
                  : `Configuration options for ${activeLabel.toLowerCase()} will be connected in a later phase.`}
              </p>
            </div>

            {activeSection === "general" && (
              <span className="inline-flex w-fit items-center gap-1.5 rounded bg-(--success-light) px-2.5 py-1 text-[10px] font-semibold text-(--success)">
                <CheckCircle2 size={12} />
                Database connected
              </span>
            )}
          </div>

          {loading ? (
            <div className="flex min-h-64 items-center justify-center gap-2 text-xs text-(--secondary)">
              <RefreshCw size={16} className="animate-spin" />
              Loading settings...
            </div>
          ) : activeSection === "general" ? (
            <form onSubmit={handleSave} className="p-4 sm:p-5">
              <div className="space-y-6">
                {/* IDENTITY */}
                <SettingsSection
                  title="Association Identity"
                  description="The official name and branding details for the association."
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Association Name"
                      name="associationName"
                      value={settings.associationName}
                      onChange={handleChange}
                      required
                      maxLength={150}
                      placeholder="ONW GOSA"
                    />

                    <Field
                      label="Short Name"
                      name="shortName"
                      value={settings.shortName}
                      onChange={handleChange}
                      required
                      maxLength={50}
                      placeholder="ONW GOSA"
                    />

                    <Field
                      label="Logo URL"
                      icon={Image}
                      name="logoUrl"
                      type="url"
                      value={settings.logoUrl}
                      onChange={handleChange}
                      maxLength={1000}
                      placeholder="https://example.com/logo.png"
                      hint="Use a public image URL. File uploads are not included yet."
                    />

                    <Field
                      label="Website URL"
                      icon={Globe}
                      name="website"
                      type="url"
                      value={settings.website}
                      onChange={handleChange}
                      maxLength={300}
                      placeholder="https://example.com"
                    />
                  </div>
                </SettingsSection>

                {/* CONTACT */}
                <SettingsSection
                  title="Contact Information"
                  description="Official contact information displayed to members and visitors."
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Contact Email"
                      icon={Mail}
                      name="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={handleChange}
                      maxLength={254}
                      placeholder="contact@example.com"
                    />

                    <Field
                      label="Contact Phone"
                      icon={Phone}
                      name="phone"
                      type="tel"
                      value={settings.phone}
                      onChange={handleChange}
                      maxLength={30}
                      placeholder="+234..."
                    />

                    <div className="sm:col-span-2">
                      <Field
                        label="Association Address"
                        icon={MapPin}
                        name="address"
                        value={settings.address}
                        onChange={handleChange}
                        maxLength={300}
                        placeholder="Association office address"
                      />
                    </div>
                  </div>
                </SettingsSection>

                {/* SOCIAL LINKS */}
                <SettingsSection
                  title="Social Media"
                  description="Add the official association social media profiles."
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Facebook"
                      icon={FaFacebookF}
                      name="facebook"
                      type="url"
                      value={settings.socialLinks.facebook}
                      onChange={handleSocialChange}
                      placeholder="https://facebook.com/..."
                    />

                    <Field
                      label="Instagram"
                      icon={FaInstagram}
                      name="instagram"
                      type="url"
                      value={settings.socialLinks.instagram}
                      onChange={handleSocialChange}
                      placeholder="https://instagram.com/..."
                    />

                    <Field
                      label="YouTube"
                      icon={FaYoutube}
                      name="youtube"
                      type="url"
                      value={settings.socialLinks.youtube}
                      onChange={handleSocialChange}
                      placeholder="https://youtube.com/..."
                    />

                    <Field
                      label="LinkedIn"
                      icon={FaLinkedinIn}
                      name="linkedin"
                      type="url"
                      value={settings.socialLinks.linkedin}
                      onChange={handleSocialChange}
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                </SettingsSection>

                {/* SAVE ACTIONS */}
                <div className="flex flex-col-reverse gap-2 border-t border-(--border) pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[11px] text-(--text-muted)">
                    {hasChanges
                      ? "You have unsaved changes."
                      : "All changes are saved."}
                  </p>

                  <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={!hasChanges || saving}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded border border-(--border) px-3.5 text-xs font-semibold text-(--secondary) transition-colors hover:bg-(--bg-soft) disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <RotateCcw size={13} />
                      Reset
                    </button>

                    <button
                      type="submit"
                      disabled={!hasChanges || saving}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded bg-(--primary) px-4 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {saving ? (
                        <RefreshCw
                          size={14}
                          className="animate-spin"
                        />
                      ) : (
                        <Save size={14} />
                      )}

                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="p-4 sm:p-5">
              <div className="rounded border border-dashed border-(--border) bg-(--bg-light) px-5 py-10 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded bg-(--primary-light)">
                  {React.createElement(
                    sections.find((section) => section.id === activeSection)?.icon ||
                      Settings,
                    {
                      size: 21,
                      className: "text-(--primary)",
                    }
                  )}
                </div>

                <h3 className="mt-4 text-sm font-semibold text-(--primary)">
                  {activeLabel} Settings
                </h3>

                <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-(--secondary)">
                  This section has not been connected yet. We'll implement
                  the backend, validation, audit logging, and actual
                  application behavior before enabling its controls.
                </p>

                <span className="mt-4 inline-flex rounded bg-(--bg-soft) px-2.5 py-1 text-[10px] font-medium text-(--text-muted)">
                  Not configured
                </span>
              </div>
            </div>
          )}
        </section>
      </div>

      <SettingsNotice>
        General settings are stored in the database. Updating these values
        does not automatically change the public website's branding or
        contact details unless those pages also read these settings.
      </SettingsNotice>
    </div>
  );
};

/* OVERVIEW CARD */
const OverviewCard = ({
  icon: Icon,
  label,
  value,
  description,
  iconBg,
  iconClass,
}) => (
  <div className="rounded border border-(--border) bg-(--bg-white) p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs text-(--secondary)">
          {label}
        </p>

        <p className="mt-1.5 truncate text-lg font-semibold text-(--primary)">
          {value}
        </p>

        <p className="mt-1 text-[10px] text-(--text-muted)">
          {description}
        </p>
      </div>

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded ${iconBg}`}
      >
        <Icon size={17} className={iconClass} />
      </div>
    </div>
  </div>
);

/* SECTION HEADING */
const SettingsSection = ({ title, description, children }) => (
  <section>
    <div className="mb-4 border-b border-(--border) pb-3">
      <h3 className="text-xs font-semibold text-(--primary)">
        {title}
      </h3>

      <p className="mt-1 text-[11px] text-(--secondary)">
        {description}
      </p>
    </div>

    {children}
  </section>
);

export default AdminSettings;
