import React, { useEffect, useState } from "react";


import ContentLoading from "../../components/admin/ContentLoading.jsx";

import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";
import MemberDetailsDrawer from "../../components/admin/MemberDetailsDrawer.jsx";
import AddMemberModal from "../../components/admin/AddMemberModal.jsx";
import {ApproveMember} from "../../services/adminService.js";
import {
  Users,
  UserCheck,
  Clock3,
  AlertCircle,
  ArrowUpRight,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  UserPlus,
} from "lucide-react";

import Alert from "../../components/common/Alert.jsx";
import { getChapters } from "../../services/chapterService.js";
import {
  getAdminDashboard,
  getAdminMembers,
  createAdminMember,
} from "../../services/adminService.js";

const Members = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [membersData, setMembersData] = useState(null);
  const [membersLoading, setMembersLoading] = useState(false);




  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPagination, setMembersPagination] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberDrawerOpen, setMemberDrawerOpen] = useState(false);

  const [addMemberOpen, setAddMemberOpen] = useState(false);

  const [addingMember, setAddingMember] = useState(false);
  const [loadMemberPage, setLoadMemberPage] = useState(true)

  const [chapters, setChapters] = useState([]);

  const [alert, setAlert] = useState(null);





  const loadChapters = async () => {
    try {
      const result = await getChapters();

      setChapters(result?.chapters || []);
    } catch (error) {
      console.error(
        "Failed to load chapters:",
        error
      );
    }
  };




  const loadDashboard = async () => {
    try {
      setLoading(true);
      setLoadMemberPage(true)
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
      setLoadMemberPage(false)
    }
  };


  const loadMembers = async (page = 1) => {
    try {
      setMembersLoading(true);

      const result = await getAdminMembers(
        page,
        20,
        search,
        statusFilter
      );

     

      setMembersData(result);
      setMembersPagination(result.pagination);
      setCurrentPage(result.pagination.page);
    } catch (error) {
      console.error("Admin members error:", error);
    } finally {
      setMembersLoading(false);
    }
  };


  const handleCreateMember = async (formData) => {
    try {
      setAddingMember(true);

      const result =
        await createAdminMember(formData);
      await loadDashboard();
      await loadMembers(1);
      setAlert({
        type: result.emailSent
          ? "success"
          : "warning",

        title: result.emailSent
          ? "Member Added Successfully"
          : "Member Created",

        message: result.message,
      });

      if(result.success === true){
        setAddMemberOpen(false);
      }

    } catch (error) {
      console.error(
        "Create member error:",
        error
      );
      throw error;

    } finally {
      setAddingMember(false);
    }
  };

  const handleApproveMember = async (userId) => {
  setLoading(true);

  try {
    const result = await ApproveMember(userId);

    setAlert({
      type: result.success ? "success" : "warning",
      title: result.success
        ? "Member Approved"
        : "Member Approval Failed",
      message: result.message,
    });

    if (result.success) {
      await loadDashboard();
      await loadMembers(currentPage);
      setMemberDrawerOpen(false)
    }
  } catch (err) {
    console.error("Approve member error:", err);

    setAlert({
      type: "error",
      title: "Approval Failed",
      message: err.message || "Failed to approve member.",
    });
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    loadDashboard();
    loadMembers(1);
    loadChapters();
  }, []);

  // Search + status filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      loadMembers(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, statusFilter]);


  const members = data?.members || {};

  
  // TABLE COLUMNS
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

          <p className="text-xs text-(--text-muted) mt-0.5">
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
            className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium capitalize ${statusStyles[member.status] ||
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
      {loadMemberPage && < ContentLoading /> }
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
         <div>
           <h1 className="text-xl font-semibold text-(--primary)">
            Members
          </h1>

          <p className="text-sm text-(--secondary) mt-1">
            Manage and monitor OlivetNOSA members.
          </p>
         </div>

           <button
                type="button"
                onClick={() => setAddMemberOpen(true)}
                className="
                          h-9
                          px-3.5
                          rounded
                          bg-(--primary)
                          text-white
                          text-xs
                          font-semibold
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          hover:opacity-90
                          transition-opacity
                        "
              >
                <UserPlus size={15} />
                Add Member
              </button>

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
        <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

          {/* TABLE HEADER */}
          <div className="px-5 py-4 border-b border-(--border)">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <h2 className="text-sm font-semibold text-(--primary)">
                  All Members
                </h2>

                <p className="text-xs text-(--secondary) mt-1">
                  View and manage registered OlivetNOSA members.
                </p>
              </div>

             
              <div className="flex flex-col sm:flex-row gap-2">

                {/* SEARCH */}
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)"
                  />

                  <input
                    type="text"
                    placeholder="Search members..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
                          h-9
                          w-full
                          sm:w-[230px]
                          pl-9
                          pr-3
                          rounded
                          border
                          border-(--border)
                          bg-(--bg-white)
                          text-xs
                          text-(--primary)
                          outline-none
                          focus:border-(--primary)
                        "
                  />
                </div>

                {/* STATUS FILTER */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="
                          h-9
                          px-3
                          rounded
                          border
                          border-(--border)
                          bg-(--bg-white)
                          text-xs
                          text-(--primary)
                          outline-none
                        "
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>

              </div>
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
              <p className="text-xs text-(--primary)">
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
                    text-(--primary)
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
                    text-(--primary)
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
        ApproveMember={handleApproveMember}
        loading={loading}
        
        onClose={() => {
          setMemberDrawerOpen(false);
          setSelectedMember(null);
        }}
      />

      <AddMemberModal
        open={addMemberOpen}
        onClose={() => {
          if (!addingMember) {
            setAddMemberOpen(false);
          }
        }}
        onSubmit={handleCreateMember}
        chapters={chapters}
        loading={addingMember}
      />


    </div>
  );
};

export default Members;