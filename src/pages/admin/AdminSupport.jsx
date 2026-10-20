import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  MessageSquare,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  X,
  UserRound,
  CalendarDays,
  Filter,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard";
import AdminTable from "../../components/admin/AdminTable";
import Alert from "../../components/common/Alert";

import {
  getAdminSupportTickets,
  getAdminSupportTicketById,
  replyToSupportTicket,
  updateSupportTicketStatus,
} from "../../services/adminService";

const STATUSES = ["open", "in_progress", "resolved", "closed"];

const CATEGORIES = [
  "account",
  "membership",
  "payment",
  "verification",
  "technical",
  "other",
];

const statusLabels = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

const categoryLabels = {
  account: "Account",
  membership: "Membership",
  payment: "Payment",
  verification: "Verification",
  technical: "Technical",
  other: "Other",
};

const unwrap = (response) => response?.data ?? response;

const getTicketList = (response) => {
  const result = unwrap(response);

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.tickets)) return result.tickets;
  if (Array.isArray(result?.results)) return result.results;
  if (Array.isArray(result?.data)) return result.data;

  return [];
};

const getTicketDetails = (response) => {
  const result = unwrap(response);

  if (result?.ticket) return result.ticket;
  if (result?.data?.ticket) return result.data.ticket;

  return result;
};

const getPagination = (response, currentPage, limit, ticketCount) => {
  const result = unwrap(response);
  const pagination = result?.pagination ?? result?.meta ?? {};

  return {
    page: Number(pagination.page ?? pagination.currentPage ?? currentPage),
    totalPages: Math.max(
      1,
      Number(
        pagination.totalPages ??
          pagination.pages ??
          Math.ceil(Number(pagination.total ?? ticketCount) / limit)
      )
    ),
    total: Number(
      pagination.total ?? pagination.totalItems ?? ticketCount
    ),
  };
};

const getMemberName = (user) => {
  if (!user || typeof user !== "object") {
    return "Unknown member";
  }

  const name = [
    user.firstName,
    user.middleName,
    user.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || user.name || user.fullName || user.email || "Unknown member";
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const StatusBadge = ({ status }) => {
  const styles = {
    open: "bg-blue-50 text-blue-700 border-blue-200",
    in_progress: "bg-amber-50 text-amber-700 border-amber-200",
    resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    closed: "bg-(--bg-soft) text-(--secondary) border-(--border)",
  };

  return (
    <span
      className={`inline-flex items-center border rounded px-2 py-1 text-xs font-medium ${
        styles[status] || styles.closed
      }`}
    >
      {statusLabels[status] || status || "Unknown"}
    </span>
  );
};

const FieldLabel = ({ children }) => (
  <label className="mb-2 block text-xs font-semibold text-(--secondary)">
    {children}
  </label>
);

const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [page, setPage] = useState(1);
  const limit = 20;

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  const [reply, setReply] = useState("");
  const [nextStatus, setNextStatus] = useState("open");
  const [assignedTo, setAssignedTo] = useState("");

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAdminSupportTickets({
        page,
        limit,
        search,
        status: statusFilter,
        category: categoryFilter,
      });

      const list = getTicketList(response);

      setTickets(list);
      setPagination(
        getPagination(response, page, limit, list.length)
      );
    } catch (err) {
      setError(err.message || "Unable to load support tickets.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, statusFilter, categoryFilter]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const stats = useMemo(
    () => ({
      open: tickets.filter((ticket) => ticket.status === "open").length,
      inProgress: tickets.filter(
        (ticket) => ticket.status === "in_progress"
      ).length,
      resolved: tickets.filter(
        (ticket) => ticket.status === "resolved"
      ).length,
      closed: tickets.filter((ticket) => ticket.status === "closed").length,
    }),
    [tickets]
  );

  const openTicket = async (ticket) => {
    setSelectedTicket(ticket);
    setReply("");
    setNotice("");
    setError("");
    setDetailLoading(true);

    try {
      const response = await getAdminSupportTicketById(ticket._id);
      const details = getTicketDetails(response);

      setSelectedTicket(details);
      setNextStatus(details.status || "open");
      setAssignedTo(
        typeof details.assignedTo === "object"
          ? details.assignedTo?._id || ""
          : details.assignedTo || ""
      );
    } catch (err) {
      setError(err.message || "Unable to load ticket details.");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleStatusUpdate = async () => {
    if (!selectedTicket?._id || !nextStatus) return;

    setUpdatingStatus(true);
    setError("");
    setNotice("");

    try {
      await updateSupportTicketStatus(
        selectedTicket._id,
        nextStatus,
        assignedTo
      );

      const response = await getAdminSupportTicketById(
        selectedTicket._id
      );

      const details = getTicketDetails(response);

      setSelectedTicket(details);
      setNextStatus(details.status || nextStatus);
      setAssignedTo(
        typeof details.assignedTo === "object"
          ? details.assignedTo?._id || ""
          : details.assignedTo || ""
      );

      setNotice("Ticket status updated successfully.");
      await loadTickets();
    } catch (err) {
      setError(err.message || "Unable to update ticket.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleReply = async (event) => {
    event.preventDefault();

    if (!selectedTicket?._id || !reply.trim()) return;

    setSending(true);
    setError("");
    setNotice("");

    try {
      await replyToSupportTicket(selectedTicket._id, reply);

      const response = await getAdminSupportTicketById(
        selectedTicket._id
      );

      const details = getTicketDetails(response);

      setSelectedTicket(details);
      setNextStatus(details.status || "in_progress");
      setAssignedTo(
        typeof details.assignedTo === "object"
          ? details.assignedTo?._id || ""
          : details.assignedTo || ""
      );

      setReply("");
      setNotice("Reply sent successfully.");
      await loadTickets();
    } catch (err) {
      setError(err.message || "Unable to send reply.");
    } finally {
      setSending(false);
    }
  };

  const closeTicket = () => {
    setSelectedTicket(null);
    setReply("");
    setNotice("");
    setError("");
  };

  const selectedMessages = selectedTicket?.messages || [];

  const selectedUser =
    selectedTicket?.user && typeof selectedTicket.user === "object"
      ? selectedTicket.user
      : null;

  const columns = [
    {
      key: "subject",
      label: "Ticket",
      render: (ticket) => (
        <div className="min-w-[160px]">
          <p className="font-semibold text-(--primary)">
            {ticket.subject || "Untitled ticket"}
          </p>
          <p className="mt-1 text-xs text-(--secondary)">
            {ticket.ticketNumber || ticket._id}
          </p>
        </div>
      ),
    },
    {
      key: "user",
      label: "Member",
      render: (ticket) => (
        <div className="min-w-[140px]">
          <p className="font-medium text-(--primary)">
            {getMemberName(ticket.user)}
          </p>
          <p className="mt-1 text-xs text-(--secondary)">
            {ticket.user?.email || "—"}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (ticket) => (
        <span className="text-(--secondary)">
          {categoryLabels[ticket.category] || ticket.category || "Other"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (ticket) => <StatusBadge status={ticket.status} />,
    },
    {
      key: "lastMessageAt",
      label: "Last Updated",
      render: (ticket) => (
        <span className="whitespace-nowrap text-xs text-(--secondary)">
          {formatDate(ticket.lastMessageAt || ticket.updatedAt)}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Action",
      render: (ticket) => (
        <button
          type="button"
          onClick={() => openTicket(ticket)}
          className="whitespace-nowrap border border-(--border) rounded px-3 py-2 text-xs font-semibold text-(--primary) transition hover:bg-(--bg-soft)"
        >
          View conversation
        </button>
      ),
    },
  ];

  const inputClass =
    "w-full border border-(--border) rounded bg-(--bg-white) px-3 py-2.5 text-sm text-(--primary) outline-none focus:border-(--primary)";

  return (
    <div className="space-y-5 p-4 md:p-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-(--secondary)">
            <MessageSquare size={16} />
            <span>Management / Support</span>
          </div>

          <h1 className="mt-2 text-xl font-semibold text-(--primary)">
            Help & Support
          </h1>

          <p className="mt-1 text-sm text-(--secondary)">
            Review member requests and manage support conversations.
          </p>
        </div>

        <button
          type="button"
          onClick={loadTickets}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 border border-(--border) rounded bg-(--bg-white) px-4 py-2.5 text-sm font-medium text-(--primary) transition hover:bg-(--bg-soft) disabled:opacity-60"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* ALERTS */}
      {error && !selectedTicket && (
        <Alert
          type="error"
          title="Unable to complete request"
          message={error}
          onClose={() => setError("")}
        />
      )}

      {/* SUMMARY */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          icon={MessageSquare}
          label="Open Tickets"
          value={stats.open}
          badge="Awaiting response"
          iconBg="bg-blue-50"
          iconClass="text-blue-700"
        />

        <AdminStatCard
          icon={Clock}
          label="In Progress"
          value={stats.inProgress}
          badge="Being handled"
          iconBg="bg-amber-50"
          iconClass="text-amber-700"
        />

        <AdminStatCard
          icon={CheckCircle2}
          label="Resolved"
          value={stats.resolved}
          badge="Resolved tickets"
          iconBg="bg-emerald-50"
          iconClass="text-emerald-700"
        />

        <AdminStatCard
          icon={X}
          label="Closed"
          value={stats.closed}
          badge="Closed tickets"
          iconBg="bg-(--bg-soft)"
          iconClass="text-(--secondary)"
        />
      </div>

      {/* TICKETS */}
      <section className="overflow-hidden border border-(--border) rounded bg-(--bg-white)">
        <div className="flex flex-col gap-4 border-b border-(--border) p-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-(--primary)">
              Support Tickets
            </h2>
            <p className="mt-1 text-xs text-(--secondary)">
              {pagination.total} ticket(s) found
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:flex"
          >
            <div className="relative min-w-0 xl:w-56">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--secondary)"
              />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search tickets..."
                className={`${inputClass} pl-9`}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => {
                setPage(1);
                setStatusFilter(event.target.value);
              }}
              className={inputClass}
            >
              <option value="">All statuses</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(event) => {
                setPage(1);
                setCategoryFilter(event.target.value);
              }}
              className={inputClass}
            >
              <option value="">All categories</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {categoryLabels[category]}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded bg-(--primary) px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              <Filter size={15} />
              Search
            </button>
          </form>
        </div>

        <AdminTable
          columns={columns}
          data={tickets}
          loading={loading}
          emptyMessage="No support tickets found."
          rowKey="_id"
        />

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 border-t border-(--border) px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-(--secondary)">
            Page {pagination.page} of {pagination.totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="inline-flex items-center gap-1 border border-(--border) rounded px-3 py-2 text-xs font-medium text-(--primary) disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={14} />
              Previous
            </button>

            <button
              type="button"
              disabled={page >= pagination.totalPages || loading}
              onClick={() =>
                setPage((current) =>
                  Math.min(pagination.totalPages, current + 1)
                )
              }
              className="inline-flex items-center gap-1 border border-(--border) rounded px-3 py-2 text-xs font-medium text-(--primary) disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* CONVERSATION MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-6">
          <section className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden border border-(--border) rounded bg-(--bg-white) shadow-xl">
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between gap-4 border-b border-(--border) p-4 sm:p-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-(--secondary)">
                    {selectedTicket.ticketNumber || selectedTicket._id}
                  </span>
                  <StatusBadge status={selectedTicket.status} />
                </div>

                <h2 className="mt-2 break-words text-lg font-semibold text-(--primary)">
                  {selectedTicket.subject || "Support conversation"}
                </h2>

                <p className="mt-1 text-xs text-(--secondary)">
                  {categoryLabels[selectedTicket.category] ||
                    selectedTicket.category ||
                    "Other"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeTicket}
                className="rounded p-2 text-(--secondary) transition hover:bg-(--bg-soft) hover:text-(--primary)"
                aria-label="Close conversation"
              >
                <X size={19} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_270px]">
              {/* CONVERSATION */}
              <div className="flex min-h-[450px] flex-col border-b border-(--border) lg:border-b-0 lg:border-r">
                <div className="flex-1 space-y-4 overflow-y-auto bg-(--bg-soft) p-4 sm:p-5  min-h-[150px]">
                  {detailLoading ? (
                    <div className="py-12 text-center">
                      <LoaderCircle
                        size={22}
                        className="mx-auto animate-spin text-(--primary)"
                      />
                      <p className="mt-2 text-sm text-(--secondary)">
                        Loading conversation...
                      </p>
                    </div>
                  ) : selectedMessages.length === 0 ? (
                    <p className="py-10 text-center text-sm text-(--secondary)">
                      No messages are available for this ticket.
                    </p>
                  ) : (
                    selectedMessages.map((message, index) => {
                      const sender =
                        typeof message.sender === "object"
                          ? message.sender
                          : null;

                      const isStaff = message.senderRole !== "member";

                      return (
                        <div
                          key={message._id || `${message.createdAt}-${index}`}
                          className={`flex ${
                            isStaff ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[92%] border rounded p-3 sm:max-w-[85%] ${
                              isStaff
                                ? "border-(--primary) bg-(--primary) text-white"
                                : "border-(--border) bg-(--bg-white) text-(--primary)"
                            }`}
                          >
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span className="text-xs font-semibold">
                                {sender
                                  ? getMemberName(sender)
                                  : isStaff
                                    ? message.senderRole
                                    : "Member"}
                              </span>

                              <span
                                className={`text-[10px] ${
                                  isStaff
                                    ? "text-white/65"
                                    : "text-(--secondary)"
                                }`}
                              >
                                {formatDate(message.createdAt)}
                              </span>
                            </div>

                            <p className="whitespace-pre-wrap break-words text-sm leading-6">
                              {message.message}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {error && (
                  <div className="px-4 pt-3">
                    <Alert
                      type="error"
                      message={error}
                      onClose={() => setError("")}
                    />
                  </div>
                )}

                {notice && (
                  <div className="px-4 pt-3">
                    <Alert
                      type="success"
                      message={notice}
                      onClose={() => setNotice("")}
                    />
                  </div>
                )}

                <form
                  onSubmit={handleReply}
                  className="border-t border-(--border) bg-(--bg-white) p-4"
                >
                  <FieldLabel>
                    Write a reply
                  </FieldLabel>

                  <textarea
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder="Write a helpful response to the member..."
                    rows={3}
                    maxLength={3000}
                    disabled={
                      detailLoading ||
                      sending ||
                      ["resolved", "closed"].includes(selectedTicket.status)
                    }
                    className={`${inputClass} resize-y disabled:cursor-not-allowed disabled:bg-(--bg-soft)`}
                  />

                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] text-(--secondary)">
                      {reply.length}/3000 characters
                    </p>

                    <button
                      type="submit"
                      disabled={
                        !reply.trim() ||
                        sending ||
                        detailLoading ||
                        ["resolved", "closed"].includes(selectedTicket.status)
                      }
                      className="inline-flex items-center justify-center gap-2 rounded bg-(--primary) px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {sending ? (
                        <LoaderCircle size={15} className="animate-spin" />
                      ) : (
                        <Send size={14} />
                      )}
                      {sending ? "Sending..." : "Send Reply"}
                    </button>
                  </div>

                  {["resolved", "closed"].includes(selectedTicket.status) && (
                    <p className="mt-2 text-xs text-(--secondary)">
                      This ticket cannot receive replies while it is{" "}
                      {selectedTicket.status}.
                    </p>
                  )}
                </form>
              </div>

              {/* TICKET DETAILS */}
              <aside className="space-y-5 p-4 sm:p-5">
                <div>
                  <h3 className="text-sm font-semibold text-(--primary)">
                    Ticket Details
                  </h3>

                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <UserRound
                        size={16}
                        className="mt-0.5 shrink-0 text-(--secondary)"
                      />

                      <div className="min-w-0">
                        <p className="text-[11px] text-(--secondary)">
                          Submitted by
                        </p>

                        <p className="mt-1 break-words text-sm font-medium text-(--primary)">
                          {getMemberName(selectedUser)}
                        </p>

                        {selectedUser?.email && (
                          <p className="mt-1 break-all text-xs text-(--secondary)">
                            {selectedUser.email}
                          </p>
                        )}

                        {selectedUser?.alumniId && (
                          <p className="mt-1 text-xs text-(--secondary)">
                            Alumni ID: {selectedUser.alumniId}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CalendarDays
                        size={16}
                        className="mt-0.5 shrink-0 text-(--secondary)"
                      />

                      <div>
                        <p className="text-[11px] text-(--secondary)">
                          Created
                        </p>
                        <p className="mt-1 text-sm font-medium text-(--primary)">
                          {formatDate(selectedTicket.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-(--border) pt-4">
                      <FieldLabel>
                        Update Status
                      </FieldLabel>

                      <select
                        value={nextStatus}
                        onChange={(event) =>
                          setNextStatus(event.target.value)
                        }
                        className={inputClass}
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {statusLabels[status]}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={handleStatusUpdate}
                        disabled={
                          updatingStatus ||
                          detailLoading ||
                          nextStatus === selectedTicket.status
                        }
                        className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-(--border) rounded px-3 py-2.5 text-sm font-medium text-(--primary) transition hover:bg-(--bg-soft) disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {updatingStatus && (
                          <LoaderCircle
                            size={15}
                            className="animate-spin"
                          />
                        )}
                        Save Status
                      </button>
                    </div>

                    <div className="border-t border-(--border) pt-4">
                      <p className="text-[11px] text-(--secondary)">
                        Assigned to
                      </p>

                      <p className="mt-1 text-sm font-medium text-(--primary)">
                        {selectedTicket.assignedTo &&
                        typeof selectedTicket.assignedTo === "object"
                          ? getMemberName(selectedTicket.assignedTo)
                          : selectedTicket.assignedTo
                            ? "Assigned administrator"
                            : "Unassigned"}
                      </p>
                    </div>

                    <p className="text-xs leading-5 text-(--secondary)">
                      Replying to an open ticket automatically moves it to In
                      Progress and assigns it to the responding administrator.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminSupport;