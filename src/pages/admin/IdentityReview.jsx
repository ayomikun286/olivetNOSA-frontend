
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  ShieldAlert,
  UserRound,
  XCircle,
} from "lucide-react";

import ContentLoading from "../../components/admin/ContentLoading.jsx";
import Alert from "../../components/common/Alert.jsx";

import { useAuth } from "../../context/AuthContext.jsx";

import {
  getPendingDuplicateMembers,
  resolveDuplicateMember,
} from "../../services/adminService.js";

const IdentityReview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(null);

  // Frontend role restriction.
  if (user?.role !== "superAdmin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const loadMembers = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getPendingDuplicateMembers();

      setMembers(result.members || []);
    } catch (err) {
      console.error("Identity review error:", err);
      setError(err.message || "Failed to load identity conflicts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleResolve = async (member, decision) => {
    const isClearing = decision === "cleared";

    const confirmed = window.confirm(
      isClearing
        ? "Are you sure this applicant is a different person from the matched member(s)? This will allow the account to proceed for approval."
        : "Are you sure this applicant is a confirmed duplicate? Their account will remain blocked from approval."
    );

    if (!confirmed) return;

    try {
      setActionLoading(member._id);

      const result = await resolveDuplicateMember(
        member._id,
        decision
      );

      setMembers((previous) =>
        previous.filter((item) => item._id !== member._id)
      );

      setAlert({
        type: "success",
        title: isClearing
          ? "Identity Conflict Cleared"
          : "Duplicate Confirmed",
        message: result.message,
      });
      navigate("/portal/admin/dashboard/members");
    } catch (err) {
      console.error("Identity resolution error:", err);

      setAlert({
        type: "error",
        title: "Review Failed",
        message: err.message || "Unable to resolve this identity conflict.",
      });
    } finally {
      setActionLoading("");
    }
  };

  const formatName = (member) =>
    [
      member?.firstName,
      member?.middleName,
      member?.lastName,
    ]
      .filter(Boolean)
      .join(" ");

  const MemberInformation = ({ member, label }) => (
    <div className="bg-(--bg-white) border border-(--border) rounded p-4">
      <div className="flex items-center gap-2 mb-4">
        <UserRound size={16} className="text-(--primary)" />
        <h3 className="text-sm font-semibold text-(--primary)">
          {label}
        </h3>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-(--text-muted)">Full Name</p>
          <p className="text-sm font-medium text-(--primary) mt-1">
            {formatName(member) || "—"}
          </p>
        </div>

        <div>
          <p className="text-xs text-(--text-muted)">Email Address</p>
          <p className="text-sm text-(--primary) mt-1 break-all">
            {member?.email || "—"}
          </p>
        </div>

        <div>
          <p className="text-xs text-(--text-muted)">Phone Number</p>
          <p className="text-sm text-(--primary) mt-1">
            {member?.phone || "—"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-(--text-muted)">Enrollment Year</p>
            <p className="text-sm text-(--primary) mt-1">
              {member?.enrollmentYear || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs text-(--text-muted)">Graduation Year</p>
            <p className="text-sm text-(--primary) mt-1">
              {member?.graduationYear || "—"}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-(--text-muted)">Alumni ID</p>
          <p className="text-sm font-medium text-(--primary) mt-1">
            {member?.alumniId || "Not assigned"}
          </p>
        </div>

        <div>
          <p className="text-xs text-(--text-muted)">Account Status</p>
          <p className="text-sm text-(--primary) mt-1 capitalize">
            {member?.status || "—"}
          </p>
        </div>

        <div>
          <p className="text-xs text-(--text-muted)">Chapter / Year Set</p>
          <p className="text-sm text-(--primary) mt-1">
            {member?.chapter?.name || "Not assigned"}
            {" / "}
            {member?.yearSet?.year || "Not assigned"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {loading && <ContentLoading />}

      <div className="space-y-5">

        {alert && (
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* HEADER */}
        <div>
          <button
            type="button"
            onClick={() => navigate("/portal/admin/dashboard/members")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--secondary) hover:text-(--primary) mb-3"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <h1 className="text-xl font-semibold text-(--primary)">
            Identity Review
          </h1>

          <p className="text-sm text-(--secondary) mt-1">
            Investigate and resolve possible duplicate member accounts.
          </p>
        </div>

        {/* SUMMARY */}
        <div className="bg-(--bg-white) border border-(--border) rounded p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-(--warning-light) flex items-center justify-center shrink-0">
            <ShieldAlert size={20} className="text-(--warning)" />
          </div>

          <div>
            <p className="text-sm font-semibold text-(--primary)">
              {members.length} Pending Identity {members.length === 1 ? "Review" : "Reviews"}
            </p>

            <p className="text-xs text-(--secondary) mt-1">
              These accounts require investigation before they can be approved.
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-(--bg-white) border border-(--border) rounded-xl p-8 text-center">
            <AlertCircle
              size={24}
              className="mx-auto text-(--danger)"
            />

            <p className="text-sm text-(--secondary) mt-3">
              {error}
            </p>

            <button
              type="button"
              onClick={loadMembers}
              className="text-xs font-semibold text-(--primary) mt-4 hover:text-(--primary-dark)"
            >
              Try again
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && members.length === 0 && (
          <div className="bg-(--bg-white) border border-(--border) rounded-xl p-10 text-center">
            <CheckCircle2
              size={28}
              className="mx-auto text-(--success)"
            />

            <h2 className="text-sm font-semibold text-(--primary) mt-3">
              All Clear
            </h2>

            <p className="text-xs text-(--secondary) mt-1">
              There are currently no accounts awaiting identity review.
            </p>
          </div>
        )}

        {/* REVIEW ACCOUNTS */}
        {!error && members.map((member) => {
          const isProcessing = actionLoading === member._id;

          return (
            <div
              key={member._id}
              className="bg-(--bg-white) border border-(--border) rounded overflow-hidden"
            >
              {/* CARD HEADER */}
              <div className="px-5 py-4 border-b border-(--border) flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-(--primary)">
                    Applicant: {formatName(member)}
                  </h2>

                  <p className="text-xs text-(--secondary) mt-1">
                    Submitted{" "}
                    {member.createdAt
                      ? new Date(member.createdAt).toLocaleDateString()
                      : "—"}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded text-xs font-medium bg-(--warning-light) text-(--warning)">
                  <Clock3 size={13} />
                  Awaiting Review
                </span>
              </div>

              {/* COMPARISON */}
              <div className="p-4 space-y-4">
                <MemberInformation
                  member={member}
                  label="New Applicant"
                />

                <div className="flex items-center gap-2">
                  <div className="flex-1 border-t border-(--border)" />
                  <span className="text-xs font-semibold text-(--secondary)">
                    POSSIBLE MATCHES
                  </span>
                  <div className="flex-1 border-t border-(--border)" />
                </div>

                {member.possibleDuplicate?.matchedUserIds?.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {member.possibleDuplicate.matchedUserIds.map(
                      (matchedMember) => (
                        <MemberInformation
                          key={matchedMember._id}
                          member={matchedMember}
                          label="Existing Member"
                        />
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-(--secondary)">
                    No matched member details were returned.
                  </p>
                )}

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-3 border-t border-(--border)">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleResolve(member, "confirmed")}
                    className="h-9 px-3.5 rounded border border-(--danger) text-(--danger) text-xs font-semibold inline-flex items-center justify-center gap-2 hover:bg-(--danger-light) disabled:opacity-50"
                  >
                    <XCircle size={15} />
                    Confirm Duplicate
                  </button>

                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleResolve(member, "cleared")}
                    className="h-9 px-3.5 rounded bg-(--primary) text-white text-xs font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
                  >
                    <CheckCircle2 size={15} />
                    Clear Conflict
                  </button>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default IdentityReview;
