import React, { useEffect, useState } from "react";

import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";
import MemberDetailsDrawer from "../../components/admin/MemberDetailsDrawer.jsx";

import {
  Users,
  UserCheck,
  Clock3,
  AlertCircle,
  ArrowUpRight,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  getAdminDashboard,
  getAdminMembers,
} from "../../services/adminService.js";

const Members = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [membersData, setMembersData] = useState(null);
  const [membersLoading, setMembersLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [membersPagination, setMembersPagination] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberDrawerOpen, setMemberDrawerOpen] = useState(false);
  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getAdminDashboard();

      setData(result);
    } catch (error) {
      console.error("Admin dashboard error:", error);

      setError(
        error.message || "Failed to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };


  const loadMembers = async (page = 1) => {
    try {
      setMembersLoading(true);

      const result = await getAdminMembers(page, 20);

      console.log("Admin members data:", result);

      setMembersData(result);
      setMembersPagination(result.pagination);
      setCurrentPage(result.pagination.page);
    } catch (error) {
      console.error("Admin members error:", error);
    } finally {
      setMembersLoading(false);
    }
  };

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    loadDashboard();
    loadMembers(1);
  }, []);

  const members = data?.members || {};

  // ========================================
  // TABLE COLUMNS
  // ========================================

  const memberColumns = [
    {
      key: "member",
      label: "Member",
      render: (member) => (
        <div>
          <p className="font-medium text-(--primary)">
            {member.firstName}{" "}
            {member.middleName ? `${member.middleName} ` : ""}
            {member.lastName}
          </p>

          <p className="text-xs text-(--secondary) mt-0.5">
            {member.email}
          </p>
        </div>
      ),
    },

    {
      key: "alumniId",
      label: "Alumni ID",
      render: (member) => (
        <span className="font-medium text-(--primary)">
          {member.alumniId || "—"}
        </span>
      ),
    },

    {
      key: "chapter",
      label: "Chapter",
      render: (member) => (
        <span>
          {member.chapter?.name || "Not assigned"}
        </span>
      ),
    },

    {
      key: "yearSet",
      label: "Year Set",
      render: (member) => (
        <span>
          {member.yearSet?.year || "Not assigned"}
        </span>
      ),
    },

    {
      key: "status",
      label: "Status",
      render: (member) => {
        const statusStyles = {
          active:
            "bg-(--success-light) text-(--success)",
          pending:
            "bg-(--warning-light) text-(--warning)",
          suspended:
            "bg-(--danger-light) text-(--danger)",
        };

        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[member.status] ||
              "bg-(--bg-soft) text-(--secondary)"
              }`}
          >
            {member.status}
          </span>
        );
      },
    },

    {
      key: "actions",
      label: "Action",
      render: (member) => (
        <button
          type="button"
          onClick={() => {
            setSelectedMember(member);
            setMemberDrawerOpen(true);
            
          }}
          className="
            inline-flex
            items-center
            gap-1.5
            text-xs
            font-semibold
            text-(--primary)
            hover:text-(--primary-dark)
            transition-colors
          "
        >
          <Eye size={15} />
          View
        </button>
      ),
    },
  ];

  // ========================================
  // ERROR STATE
  // ========================================

  if (error) {
    return (
      <div className="p-4">

       
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
            onClick={loadDashboard}
            className="
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-semibold
              text-(--primary)
              mt-4
              hover:text-(--primary-dark)
            "
          >
            Try again
            <ArrowUpRight size={14} />
          </button>
        </div>

        
      </div>
    );
  }



  const pagination = membersPagination;

  const canGoPrevious =
    pagination && pagination.page > 1;

  const canGoNext =
    pagination &&
    pagination.page < pagination.totalPages;

  const handlePrevious = () => {
    if (!canGoPrevious || membersLoading) return;

    loadMembers(currentPage - 1);
  };

  const handleNext = () => {
    if (!canGoNext || membersLoading) return;

    loadMembers(currentPage + 1);
  };

 

  return (
    <div className="p-4">
      <div className="space-y-5">

        {/* HEADER */}
        <div>
          <h1 className="text-xl font-semibold text-(--primary)">
            Members
          </h1>

          <p className="text-sm text-(--secondary) mt-1">
            Manage and monitor OlivetNOSA members.
          </p>
        </div>

        {/* OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

          <AdminStatCard
            icon={Users}
            iconBg="bg-(--primary-light)"
            iconClass="text-(--primary)"
            badge="Membership"
            label="Total Members"
            value={members.total || 0}
            description="Registered members"
          />

          <AdminStatCard
            icon={UserCheck}
            iconBg="bg-(--success-light)"
            iconClass="text-(--success)"
            badge="Active"
            label="Active Members"
            value={members.active || 0}
            description="Approved members"
          />

          <AdminStatCard
            icon={Clock3}
            iconBg="bg-(--warning-light)"
            iconClass="text-(--warning)"
            badge="Attention"
            label="Pending Approval"
            value={members.pending || 0}
            description="Awaiting approval"
          />

          <AdminStatCard
            icon={UserCheck}
            iconBg="bg-(--danger-light)"
            iconClass="text-(--danger)"
            badge="Suspended"
            label="Suspended"
            value={members.suspended || 0}
            description="Currently suspended"
          />

        </div>

        {/* MEMBERS TABLE */}
        <div className="bg-(--bg-white) border border-(--border) rounded-xl overflow-hidden">

          {/* TABLE HEADER */}
          <div className="px-5 py-4 border-b border-(--border)">
            <div>
              <h2 className="text-sm font-semibold text-(--primary)">
                All Members
              </h2>

              <p className="text-xs text-(--secondary) mt-1">
                View and manage registered OlivetNOSA members.
              </p>
            </div>
          </div>

          {/* TABLE */}
          <AdminTable
            columns={memberColumns}
            data={membersData?.members || []}
            loading={membersLoading}
            rowKey="_id"
            emptyMessage="No members found."
          />

          {/* PAGINATION */}
          {pagination && pagination.total > 0 && (
            <div className="px-5 py-3 border-t border-(--border) flex items-center justify-between">

              {/* RESULTS INFO */}
              <p className="text-xs text-(--secondary)">
                Page{" "}
                <span className="font-medium text-(--primary)">
                  {pagination.page}
                </span>{" "}
                of{" "}
                <span className="font-medium text-(--primary)">
                  {pagination.totalPages}
                </span>

                <span className="mx-1">•</span>

                {pagination.total} members
              </p>

              {/* CONTROLS */}
              <div className="flex items-center gap-2">

                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={!canGoPrevious || membersLoading}
                  className="
                    w-8
                    h-8
                    rounded-lg
                    border
                    border-(--border)
                    flex
                    items-center
                    justify-center
                    text-(--secondary)
                    hover:bg-(--bg-soft)
                    hover:text-(--primary)
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition-colors
                  "
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canGoNext || membersLoading}
                  className="
                    w-8
                    h-8
                    rounded-lg
                    border
                    border-(--border)
                    flex
                    items-center
                    justify-center
                    text-(--secondary)
                    hover:bg-(--bg-soft)
                    hover:text-(--primary)
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition-colors
                  "
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>

              </div>
            </div>
          )}

        </div>

      </div>

      <MemberDetailsDrawer
            member={selectedMember}
            open={memberDrawerOpen}
            onClose={() => {
              setMemberDrawerOpen(false);
              setSelectedMember(null);
            }}
          />
    </div>
  );
};

export default Members;