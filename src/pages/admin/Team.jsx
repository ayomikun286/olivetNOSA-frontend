
import React, { useCallback, useEffect, useState } from "react";
import {
    Users,
    ShieldCheck,
    UserPlus,
    Mail,
    ChevronDown,
    CheckCircle2,
    AlertCircle,
    LoaderCircle,
    RefreshCw,
    UserRoundX,
} from "lucide-react";

import {
    assignTeamRole,
    getTeamMembers,
    suspendTeamRole,
} from "../../services/adminService.js";

const TEAM_ROLES = [
    {
        value: "admin",
        label: "Administrator",
        description: "Manage authorized administrative operations.",
    },
    {
        value: "treasurer",
        label: "Treasurer",
        description: "Handle assigned financial responsibilities.",
    },
    {
        value: "secretary",
        label: "Secretary",
        description: "Handle assigned records and secretarial duties.",
    },
];

const Team = () => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("secretary");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const [teamMembers, setTeamMembers] = useState([]);
    const [membersLoading, setMembersLoading] = useState(true);
    const [membersError, setMembersError] = useState("");
    const [suspendingId, setSuspendingId] = useState(null);

    const selectedRole = TEAM_ROLES.find(
        (item) => item.value === role
    );

    // Load assigned team members.
    const loadTeamMembers = useCallback(async () => {
        setMembersLoading(true);
        setMembersError("");

        try {
            const members = await getTeamMembers();

            setTeamMembers(
                Array.isArray(members) ? members : []
            );
        } catch (error) {
            setMembersError(
                error.message || "Failed to load team members."
            );
        } finally {
            setMembersLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTeamMembers();
    }, [loadTeamMembers]);

    // Assign a team role.
    const handleSubmit = async (event) => {
        event.preventDefault();
        setFeedback(null);

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            setFeedback({
                type: "error",
                message: "Please enter the member's email address.",
            });
            return;
        }

        try {
            setLoading(true);

            const result = await assignTeamRole({
                email: normalizedEmail,
                role,
            });

            setFeedback({
                type: "success",
                message:
                    result.message ||
                    "Team role assigned successfully.",
            });

            setEmail("");
            setRole("secretary");

            await loadTeamMembers();
        } catch (error) {
            setFeedback({
                type: "error",
                message:
                    error.message || "Unable to assign this role.",
            });
        } finally {
            setLoading(false);
        }
    };

    // Suspend a member's team role without suspending their account.
    const handleSuspend = async (member) => {
        if (loading || suspendingId) return;

        const fullName = [
            member.firstName,
            member.lastName,
        ]
            .filter(Boolean)
            .join(" ") || member.email;

        const confirmed = window.confirm(
            `Suspend ${fullName}'s ${member.role} role?\n\n` +
            "Their account, alumni ID, payment history and other " +
            "membership records will remain intact."
        );

        if (!confirmed) return;

        setSuspendingId(member._id);
        setFeedback(null);

        try {
            const result = await suspendTeamRole(member._id);

            setFeedback({
                type: "success",
                message:
                    result.message ||
                    "Team role suspended successfully.",
            });

            await loadTeamMembers();
        } catch (error) {
            setFeedback({
                type: "error",
                message:
                    error.message || "Failed to suspend team role.",
            });
        } finally {
            setSuspendingId(null);
        }
    };

    return (
        <div className="space-y-6 p-4 sm:p-6">
            {/* Page header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Users
                            size={22}
                            className="text-(--primary)"
                        />

                        <h1 className="text-xl font-semibold text-(--primary)">
                            Team Management
                        </h1>
                    </div>

                    <p className="mt-1 text-sm text-(--secondary)">
                        Assign and manage administrative responsibilities.
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 self-start rounded border border-(--border) bg-(--bg-white) px-3 py-2">
                    <ShieldCheck
                        size={16}
                        className="text-(--primary)"
                    />
                    <span className="text-xs font-medium text-(--primary)">
                        Role Management
                    </span>
                </div>
            </div>

            {/* Intro */}
            <div className="rounded border border-(--border) bg-(--bg-white) p-5">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-(--primary-light) text-(--primary)">
                        <UserPlus size={20} />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Assign a Team Role
                        </h2>

                        <p className="mt-1 max-w-2xl text-xs leading-5 text-(--secondary)">
                            Enter the email address of an existing
                            member and select the responsibility to
                            assign. The member must already have an
                            account.
                        </p>
                    </div>
                </div>
            </div>

            {/* Assignment form */}
            <div className="max-w-2xl overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="border-b border-(--border) px-5 py-4">
                    <h2 className="text-sm font-semibold text-(--primary)">
                        Member Details
                    </h2>

                    <p className="mt-1 text-xs text-(--secondary)">
                        Complete the fields below to continue.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-5"
                >
                    <div>
                        <label
                            htmlFor="team-email"
                            className="mb-2 block text-xs font-medium text-(--primary)"
                        >
                            Member email address
                        </label>

                        <div className="relative">
                            <Mail
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                            />

                            <input
                                id="team-email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="member@example.com"
                                disabled={loading || suspendingId !== null}
                                className="h-11 w-full rounded border border-(--border) bg-(--bg-white) pl-10 pr-3 text-sm text-(--primary) outline-none transition-colors focus:border-(--primary) disabled:opacity-60"
                            />
                        </div>

                        <p className="mt-1.5 text-[11px] text-(--text-muted)">
                            Use the email address associated with
                            their account.
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="team-role"
                            className="mb-2 block text-xs font-medium text-(--primary)"
                        >
                            Assign role
                        </label>

                        <div className="relative">
                            <select
                                id="team-role"
                                value={role}
                                onChange={(event) =>
                                    setRole(event.target.value)
                                }
                                disabled={loading || suspendingId !== null}
                                className="h-11 w-full appearance-none rounded border border-(--border) bg-(--bg-white) px-3 pr-10 text-sm text-(--primary) outline-none focus:border-(--primary) disabled:opacity-60"
                            >
                                {TEAM_ROLES.map((item) => (
                                    <option
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={16}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                            />
                        </div>

                        {selectedRole && (
                            <div className="mt-3 flex items-start gap-2 rounded border border-(--border) bg-(--bg-soft) p-3">
                                <ShieldCheck
                                    size={16}
                                    className="mt-0.5 shrink-0 text-(--primary)"
                                />

                                <div>
                                    <p className="text-xs font-semibold text-(--primary)">
                                        {selectedRole.label}
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-(--secondary)">
                                        {selectedRole.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Shared feedback */}
                    {feedback && (
                        <div
                            role="status"
                            aria-live="polite"
                            className={`flex items-start gap-2 rounded border p-3 ${
                                feedback.type === "success"
                                    ? "border-(--success) bg-(--success-light)"
                                    : "border-(--danger) bg-(--danger-light)"
                            }`}
                        >
                            {feedback.type === "success" ? (
                                <CheckCircle2
                                    size={17}
                                    className="mt-0.5 shrink-0 text-(--success)"
                                />
                            ) : (
                                <AlertCircle
                                    size={17}
                                    className="mt-0.5 shrink-0 text-(--danger)"
                                />
                            )}

                            <p
                                className={`text-xs leading-5 ${
                                    feedback.type === "success"
                                        ? "text-(--success)"
                                        : "text-(--danger)"
                                }`}
                            >
                                {feedback.message}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-3 border-t border-(--border) pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            disabled={loading || suspendingId !== null}
                            onClick={() => {
                                setEmail("");
                                setRole("secretary");
                                setFeedback(null);
                            }}
                            className="h-10 rounded border border-(--border) px-4 text-xs font-semibold text-(--primary) transition-colors hover:bg-(--bg-soft) disabled:opacity-50"
                        >
                            Clear
                        </button>

                        <button
                            type="submit"
                            disabled={loading || suspendingId !== null}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded bg-(--primary) px-5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle
                                        size={15}
                                        className="animate-spin"
                                    />
                                    Assigning role...
                                </>
                            ) : (
                                <>
                                    <UserPlus size={15} />
                                    Assign Team Role
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Assigned team members */}
            <div className="overflow-hidden rounded border border-(--border) bg-(--bg-white)">
                <div className="flex flex-col gap-3 border-b border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-(--primary)">
                            Assigned Team Members
                        </h2>

                        <p className="mt-1 text-xs text-(--secondary)">
                            View and manage members with administrative responsibilities.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={loadTeamMembers}
                        disabled={membersLoading || suspendingId !== null}
                        className="inline-flex h-9 items-center justify-center gap-2 self-start rounded border border-(--border) px-3 text-xs font-medium text-(--primary) hover:bg-(--bg-soft) disabled:opacity-50"
                    >
                        <RefreshCw
                            size={14}
                            className={
                                membersLoading ? "animate-spin" : ""
                            }
                        />
                        Refresh list
                    </button>
                </div>

                {/* Role counts */}
                <div className="grid grid-cols-1 gap-3 border-b border-(--border) p-4 sm:grid-cols-3">
                    {TEAM_ROLES.map((item) => {
                        const count = teamMembers.filter(
                            (member) => member.role === item.value
                        ).length;

                        return (
                            <div
                                key={item.value}
                                className="rounded border border-(--border) bg-(--bg-soft) p-3"
                            >
                                <p className="text-xs text-(--secondary)">
                                    {item.label}
                                </p>

                                <p className="mt-1 text-xl font-semibold text-(--primary)">
                                    {count}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Loading state */}
                {membersLoading && teamMembers.length === 0 && (
                    <div className="flex items-center justify-center gap-2 p-10 text-sm text-(--secondary)">
                        <LoaderCircle
                            size={18}
                            className="animate-spin"
                        />
                        Loading team members...
                    </div>
                )}

                {/* Error state */}
                {membersError && (
                    <div className="m-4 rounded border border-(--danger) bg-(--danger-light) p-3">
                        <p className="text-xs text-(--danger)">
                            {membersError}
                        </p>

                        <button
                            type="button"
                            onClick={loadTeamMembers}
                            disabled={membersLoading}
                            className="mt-2 text-xs font-semibold text-(--danger) underline disabled:opacity-50"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!membersLoading &&
                    !membersError &&
                    teamMembers.length === 0 && (
                        <div className="px-5 py-12 text-center">
                            <Users
                                size={28}
                                className="mx-auto text-(--text-muted)"
                            />

                            <p className="mt-3 text-sm font-medium text-(--primary)">
                                No team members found
                            </p>

                            <p className="mt-1 text-xs text-(--secondary)">
                                Assigned administrators, treasurers
                                and secretaries will appear here.
                            </p>
                        </div>
                    )}

                {/* Members table */}
                {teamMembers.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] text-left">
                            <thead className="bg-(--bg-soft)">
                                <tr className="border-b border-(--border)">
                                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--secondary)">
                                        Member
                                    </th>

                                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--secondary)">
                                        Role
                                    </th>

                                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--secondary)">
                                        Account status
                                    </th>

                                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-(--secondary)">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-(--border)">
                                {teamMembers.map((member) => {
                                    const memberRole = TEAM_ROLES.find(
                                        (item) =>
                                            item.value === member.role
                                    );

                                    const active =
                                        member.status === "active";

                                    const fullName = [
                                        member.firstName,
                                        member.lastName,
                                    ]
                                        .filter(Boolean)
                                        .join(" ") || "Unnamed member";

                                    const isSuspending =
                                        suspendingId === member._id;

                                    return (
                                        <tr
                                            key={member._id}
                                            className="transition-colors hover:bg-(--bg-soft)"
                                        >
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-medium text-(--primary)">
                                                    {fullName}
                                                </p>

                                                <p className="mt-1 text-xs text-(--secondary)">
                                                    {member.email}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="inline-flex items-center gap-1.5 rounded border border-(--border) px-2.5 py-1 text-xs font-medium text-(--primary)">
                                                    <ShieldCheck size={13} />
                                                    {memberRole?.label ||
                                                        member.role}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium ${
                                                        active
                                                            ? "bg-(--success-light) text-(--success)"
                                                            : "bg-(--bg-soft) text-(--secondary)"
                                                    }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${
                                                            active
                                                                ? "bg-(--success)"
                                                                : "bg-(--text-muted)"
                                                        }`}
                                                    />

                                                    {member.status ||
                                                        "Unknown"}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleSuspend(member)
                                                    }
                                                    disabled={
                                                        loading ||
                                                        suspendingId !== null
                                                    }
                                                    className="inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded border border-(--danger) px-3 text-xs font-medium text-(--danger) transition-colors hover:bg-(--danger-light) disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {isSuspending ? (
                                                        <>
                                                            <LoaderCircle
                                                                size={13}
                                                                className="animate-spin"
                                                            />
                                                            Suspending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserRoundX
                                                                size={13}
                                                            />
                                                            Suspend role
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Footer */}
                <div className="border-t border-(--border) px-5 py-3">
                    <p className="text-xs text-(--secondary)">
                        {teamMembers.length} assigned{" "}
                        {teamMembers.length === 1
                            ? "member"
                            : "members"}
                    </p>
                </div>
            </div>

            <p className="max-w-2xl text-xs leading-5 text-(--text-muted)">
                Assign roles carefully. Suspending a role removes
                team permissions without suspending the member's
                alumni account.
            </p>
        </div>
    );
};

export default Team;
