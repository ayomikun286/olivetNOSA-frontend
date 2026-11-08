
import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Clock3,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import Alert from "../../components/common/Alert.jsx";
import MemberDetailsDrawer from "../../components/admin/MemberDetailsDrawer.jsx";
import {
  getAdminMembers,
  ApproveMember,
} from "../../services/adminService.js";

const PresidentMemberApprovals = () => {
  const [members, setMembers] = useState([]);
  const [pagination, setPagination] = useState(null);


  const [selectedMember, setSelectedMember] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);

  const [error, setError] = useState("");
  const [alert, setAlert] = useState(null);

  const loadMembers = async (page = currentPage) => {
    try {
      setLoading(true);
      setError("");

      const result = await getAdminMembers(
        page,
        20,
        search,
        "pending"
      );

      setMembers(result?.members || []);
      setPagination(result?.pagination || null);
      setCurrentPage(result?.pagination?.page || page);
    } catch (err) {
      console.error("President member approvals error:", err);
      setError(err.message || "Failed to load pending applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadMembers(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadMembers(currentPage);
  }, [currentPage]);


  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setIsDetailsOpen(true);
  };

  const handleApprove = async (member) => {
    const confirmed = window.confirm(
      `Are you sure you want to approve ${member.firstName} ${member.lastName}?`
    );

    if (!confirmed) return;

    try {
      setApprovingId(member._id);
      setAlert(null);

      const result = await ApproveMember(member._id);

      setAlert({
        type: "success",
        title: "Member Approved",
        message: result.message || "Member approved successfully.",
      });

      setIsDetailsOpen(false);
      setSelectedMember(null);

      await loadMembers(currentPage);
    } catch (err) {
      console.error("President approval error:", err);

      setAlert({
        type: "error",
        title: "Approval Failed",
        message: err.message || "Failed to approve member.",
      });
    } finally {
      setApprovingId(null);
    }
  };

  const canGoPrevious =
    pagination && pagination.page > 1;

  const canGoNext =
    pagination &&
    pagination.page < pagination.totalPages;

  return (
    <div className="p-4 space-y-5">

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
        <h1 className="text-xl font-semibold text-(--primary)">
          Member Approvals
        </h1>

        <p className="text-sm text-(--secondary) mt-1">
          Review pending membership applications and approve eligible members.
        </p>
      </div>

      {/* SUMMARY */}
      <div className="bg-(--bg-white) border border-(--border) rounded p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-(--warning-light) flex items-center justify-center">
          <Clock3 size={19} className="text-(--warning)" />
        </div>

        <div>
          <p className="text-xs text-(--secondary)">
            Pending applications
          </p>

          <p className="text-lg font-semibold text-(--primary)">
            {pagination?.total ?? members.length}
          </p>
        </div>
      </div>

      {/* APPLICATIONS */}
      <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

        <div className="p-4 border-b border-(--border) flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-(--primary)">
              Pending Applications
            </h2>

            <p className="text-xs text-(--secondary) mt-1">
              Only eligible pending applicants can be approved.
            </p>
          </div>

          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applicants..."
              className="
                h-9 w-full sm:w-[230px]
                pl-9 pr-3 rounded
                border border-(--border)
                bg-(--bg-white)
                text-xs text-(--primary)
                outline-none focus:border-(--primary)
              "
            />
          </div>
        </div>

        {error ? (
          <div className="p-8 text-center">
            <AlertCircle
              size={23}
              className="mx-auto text-(--danger)"
            />

            <p className="text-sm text-(--secondary) mt-3">
              {error}
            </p>

            <button
              type="button"
              onClick={() => loadMembers(currentPage)}
              className="mt-4 text-xs font-semibold text-(--primary)"
            >
              Try again
            </button>
          </div>
        ) : loading ? (
          <div className="py-14 flex items-center justify-center gap-2 text-(--secondary)">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading applications...</span>
          </div>
        ) : members.length === 0 ? (
          <div className="py-14 text-center">
            <CheckCircle2
              size={28}
              className="mx-auto text-(--success)"
            />

            <p className="text-sm font-medium text-(--primary) mt-3">
              No pending applications
            </p>

            <p className="text-xs text-(--secondary) mt-1">
              There are currently no members awaiting approval.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-(--border)">
            {members.map((member) => {
              const hasDuplicate =
                member.possibleDuplicate?.isDuplicate;

              const canApprove =
                member.isEmailVerified && !hasDuplicate;

              return (
                <div
                  key={member._id}
                  className="p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-(--primary)">
                      {member.firstName}{" "}
                      {member.middleName
                        ? `${member.middleName} `
                        : ""}
                      {member.lastName}
                    </h3>

                    <p className="text-xs text-(--secondary) mt-1">
                      {member.email}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-(--secondary)">
                      <span>
                        Chapter: {member.chapter?.name || "Not assigned"}
                      </span>

                      <span>
                        Year Set: {member.yearSet?.year || "Not assigned"}
                      </span>

                      <span>
                        Graduation: {member.graduationYear || "—"}
                      </span>
                    </div>

                    {!member.isEmailVerified && (
                      <p className="text-xs text-(--warning) mt-2 flex items-center gap-1.5">
                        <AlertCircle size={13} />
                        Email verification required before approval.
                      </p>
                    )}

                    {hasDuplicate && (
                      <p className="text-xs text-(--danger) mt-2 flex items-center gap-1.5">
                        <AlertCircle size={13} />
                        Identity conflict requires Super Admin review.
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleViewDetails(member)}
                      className="
      h-9 px-4 rounded
      border border-(--border)
      text-(--primary)
      text-xs font-semibold
      hover:bg-(--bg-soft)
      transition-colors
    "
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      disabled={!canApprove || approvingId === member._id}
                      onClick={() => handleApprove(member)}
                      className="
      h-9 px-4 rounded
      bg-(--primary) text-white
      text-xs font-semibold
      inline-flex items-center justify-center gap-2
      hover:opacity-90
      disabled:opacity-40 disabled:cursor-not-allowed
    "
                    >
                      {approvingId === member._id ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Approving...
                        </>
                      ) : (
                        <>
                          <UserCheck size={15} />
                          Approve Member
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PAGINATION */}
        {!loading && pagination && pagination.total > 0 && (
          <div className="px-4 py-3 border-t border-(--border) flex items-center justify-between">
            <p className="text-xs text-(--secondary)">
              Page {pagination.page} of {pagination.totalPages}
              <span className="mx-1">•</span>
              {pagination.total} applicants
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!canGoPrevious}
                onClick={() => setCurrentPage((page) => page - 1)}
                className="w-8 h-8 rounded border border-(--border) flex items-center justify-center text-(--primary) disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                disabled={!canGoNext}
                onClick={() => setCurrentPage((page) => page + 1)}
                className="w-8 h-8 rounded border border-(--border) flex items-center justify-center text-(--primary) disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <MemberDetailsDrawer
        member={selectedMember}
        open={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedMember(null);
        }}
        loading={approvingId === selectedMember?._id}
        ApproveMember={() => handleApprove(selectedMember)}
        presidentMode={true}
      />
    </div>
  );
};

export default PresidentMemberApprovals;
