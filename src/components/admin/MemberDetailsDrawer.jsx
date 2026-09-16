import React from "react";
import {
    X,
    Mail,
    Phone,
    ShieldCheck,
    CalendarDays,
    GraduationCap,
    MapPin,
    Users,
    UserCheck,
    UserX,
} from "lucide-react";

const MemberDetailsDrawer = ({
    member,
    open,
    onClose,
}) => {
    if (!open || !member) return null;

    const fullName = [
        member.firstName,
        member.middleName,
        member.lastName,
    ]
        .filter(Boolean)
        .join(" ");

    const statusStyles = {
        active: "bg-(--success-light) text-(--success)",
        pending: "bg-(--warning-light) text-(--warning)",
        suspended: "bg-(--danger-light) text-(--danger)",
    };

    return (
        <>
            {/* BACKDROP */}
            <div
                className="fixed inset-0 z-40 bg-black/20"
                onClick={onClose}
            />

            {/* DRAWER */}
            <aside
                className="
                    fixed
                    top-0
                    right-0
                    z-50
                    h-full
                    w-full
                    max-w-md
                    bg-(--bg-white)
                    border-l
                    border-(--border)
                    shadow-xl
                    flex
                    flex-col
                    "
                        >
                        {/* HEADER */}
                        <div className="px-5 py-4 border-b border-(--border) flex items-center justify-between">
                            <div>
                                <h2 className="text-sm font-semibold text-(--primary)">
                                    Member Details
                                </h2>

                                <p className="text-xs text-(--secondary) mt-0.5">
                                    View member account information
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="
                                        w-8
                                        h-8
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-center
                                        text-(--secondary)
                                        hover:bg-(--bg-soft)
                                        hover:text-(--primary)
                                        transition-colors
                                        "
                                aria-label="Close"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1 overflow-y-auto">

                            {/* MEMBER SUMMARY */}
                            <div className="px-5 py-6 border-b border-(--border)">
                                <div className="flex items-start gap-3">

                                    {/* INITIALS */}
                                    <div
                                        className="
                                                    w-12
                                                    h-12
                                                    shrink-0
                                                    rounded-full
                                                    bg-(--primary-light)
                                                    text-(--primary)
                                                    flex
                                                    items-center
                                                    justify-center
                                                    font-semibold
                        "
                                    >
                                        {member.firstName?.charAt(0)}
                                        {member.lastName?.charAt(0)}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-base font-semibold text-(--primary)">
                                            {fullName}
                                        </h3>

                                        <p className="text-xs text-(--secondary) mt-0.5 truncate">
                                            {member.email}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-2 mt-2">

                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[member.status] ||
                                                    "bg-(--bg-soft) text-(--secondary)"
                                                    }`}
                                            >
                                                {member.status}
                                            </span>

                                            {member.isEmailVerified && (
                                                <span className="inline-flex items-center gap-1 text-xs text-(--success)">
                                                    <ShieldCheck size={13} />
                                                    Email verified
                                                </span>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                {/* ALUMNI ID */}
                                <div className="mt-5 p-3 rounded-lg bg-(--bg-soft)">
                                    <p className="text-[11px] font-medium uppercase tracking-wide text-(--secondary)">
                                        Alumni ID
                                    </p>

                                    <p className="text-sm font-semibold text-(--primary) mt-1">
                                        {member.alumniId || "Not assigned"}
                                    </p>
                                </div>
                            </div>

                            {/* PERSONAL INFORMATION */}
                            <section className="px-5 py-5 border-b border-(--border)">
                                <h4 className="text-xs font-semibold uppercase tracking-wide text-(--secondary)">
                                    Personal Information
                                </h4>

                                <div className="mt-4 space-y-4">

                                    <InfoRow
                                        icon={Users}
                                        label="Full Name"
                                        value={fullName}
                                    />

                                    <InfoRow
                                        icon={Mail}
                                        label="Email"
                                        value={member.email}
                                    />

                                    <InfoRow
                                        icon={Phone}
                                        label="Phone"
                                        value={member.phone}
                                    />

                                    <InfoRow
                                        icon={CalendarDays}
                                        label="Enrollment Year"
                                        value={member.enrollmentYear}
                                    />

                                    <InfoRow
                                        icon={GraduationCap}
                                        label="Graduation Year"
                                        value={member.graduationYear}
                                    />

                                </div>
                            </section>

                            {/* ASSOCIATION */}
                            <section className="px-5 py-5 border-b border-(--border)">
                                <h4 className="text-xs font-semibold uppercase tracking-wide text-(--secondary)">
                                    Association
                                </h4>

                                <div className="mt-4 space-y-4">

                                    <InfoRow
                                        icon={MapPin}
                                        label="Chapter"
                                        value={member.chapter?.name || "Not assigned"}
                                    />

                                    <InfoRow
                                        icon={GraduationCap}
                                        label="Year Set"
                                        value={member.yearSet?.year || "Not assigned"}
                                    />

                                </div>
                            </section>

                            {/* ACCOUNT */}
                            <section className="px-5 py-5">
                                <h4 className="text-xs font-semibold uppercase tracking-wide text-(--secondary)">
                                    Account
                                </h4>

                                <div className="mt-4 space-y-4">

                                    <InfoRow
                                        icon={CalendarDays}
                                        label="Registered"
                                        value={
                                            member.createdAt
                                                ? new Date(member.createdAt).toLocaleDateString(
                                                    "en-NG",
                                                    {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    }
                                                )
                                                : "—"
                                        }
                                    />

                                    <InfoRow
                                        icon={ShieldCheck}
                                        label="Email Verified"
                                        value={
                                            member.isEmailVerified
                                                ? "Yes"
                                                : "No"
                                        }
                                    />

                                    <InfoRow
                                        icon={UserCheck}
                                        label="Account Status"
                                        value={
                                            member.status
                                                ? member.status
                                                : "—"
                                        }
                                    />

                                </div>
                            </section>
                        </div>

                        {/* ACTIONS */}
                        <div className="px-5 py-4 border-t border-(--border)  bg-(--bg-white)">

                            {member.status === "active" && (
                    <button
                        type="button"
                        className="
                        w-full
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        px-4
                        py-2.5
                        rounded
                        border
                        border-(--danger)
                        text-(--danger)
                        text-sm
                        font-semibold
                        hover:bg-(--danger-light)
                        transition-colors
                    "
                                >
                                    <UserX size={16} />
                                    Suspend Member
                                </button>
                            )}

                            {member.status === "suspended" && (
                                <button
                                    type="button"
                                    className="
                                            w-full
                                            inline-flex
                                            items-center
                                            justify-center
                                            gap-2
                                            px-4
                                            py-2.5
                                            rounded
                                            bg-(--primary)
                                            text-white
                                            text-sm
                                            font-semibold
                                            hover:bg-(--primary-dark)
                                            transition-colors
                                        "
                                >
                                    <UserCheck size={16} />
                                    Reactivate Member
                                </button>
                            )}

                            {member.status === "pending" && (
                                <button
                                    type="button"
                                    className="
                                        w-full
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        px-4
                                        py-2.5
                                        rounded
                                        bg-(--primary)
                                        text-white
                                        text-sm
                                        font-semibold
                                        hover:bg-(--primary-dark)
                                        transition-colors
                                    "
                                >
                                    <UserCheck size={16} />
                                    Approve Member
                                </button>
                            )}

                        </div>
            </aside>
        </>
    );
};

const InfoRow = ({
    icon: Icon,
    label,
    value,
}) => {
    return (
        <div className="flex items-start gap-3">

            <div className="w-8 h-8 shrink-0 rounded-lg bg-(--bg-soft) flex items-center justify-center">
                <Icon
                    size={15}
                    className="text-(--secondary)"
                />
            </div>

            <div className="min-w-0">
                <p className="text-[11px] text-(--secondary)">
                    {label}
                </p>

                <p className="text-sm font-medium text-(--primary) mt-0.5 break-words">
                    {value || "Not provided"}
                </p>
            </div>

        </div>
    );
};

export default MemberDetailsDrawer;