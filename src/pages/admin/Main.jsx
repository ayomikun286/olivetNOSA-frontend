import React, { useEffect, useState } from "react";

import {
  Users,
  UserCheck,
  Clock3,
  CreditCard,
  CircleDollarSign,
  AlertCircle,
  ArrowUpRight,
  UserPlus,
  ClipboardList,
  BarChart3,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { getAdminDashboard } from "../../services/adminService.js";

// ========================================
// HELPERS
// ========================================

const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatName = (user) => {
  return [
    user?.firstName,
    user?.middleName,
    user?.lastName,
  ]
    .filter(Boolean)
    .join(" ");
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ========================================
// ADMIN PAGE HEADER
// ========================================

const AdminPageHeader = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-(--primary)">
        Admin Dashboard
      </h1>

      <p className="text-sm text-(--secondary) mt-1">
        Overview of membership, payments and OlivetNOSA activities.
      </p>
    </div>
  );
};

// ========================================
// ADMIN STAT CARD
// ========================================

const AdminStatCard = ({
  icon: Icon,
  iconClass,
  iconBg,
  label,
  value,
  description,
  badge,
  dark = false,
}) => {
  return (
    <div
      className={
        dark
          ? "bg-(--primary) text-white rounded p-5"
          : "bg-(--bg-white) border border-(--border) rounded p-5"
      }
    >
      <div className="flex items-center justify-between">
        <div
          className={
            dark
              ? "w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center"
              : `w-10 h-10 rounded-lg ${iconBg} ${iconClass} flex items-center justify-center`
          }
        >
          <Icon size={19} />
        </div>

        <span
          className={
            dark
              ? "text-xs text-white/60"
              : "text-xs text-(--text-muted)"
          }
        >
          {badge}
        </span>
      </div>

      <p
        className={
          dark
            ? "text-sm text-white/70 mt-5"
            : "text-sm text-(--secondary) mt-5"
        }
      >
        {label}
      </p>

      <h2
        className={
          dark
            ? "text-2xl font-bold mt-1"
            : "text-2xl font-bold text-(--primary) mt-1"
        }
      >
        {value}
      </h2>

      <p
        className={
          dark
            ? "text-xs text-white/50 mt-2"
            : "text-xs text-(--text-muted) mt-2"
        }
      >
        {description}
      </p>
    </div>
  );
};

// ========================================
// ADMIN SECTION
// ========================================

const AdminSection = ({
  title,
  description,
  icon: Icon,
  children,
}) => {
  return (
    <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
      <div className="p-5 border-b border-(--border)">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-(--primary)">
              {title}
            </h2>

            {description && (
              <p className="text-sm text-(--secondary) mt-1">
                {description}
              </p>
            )}
          </div>

          {Icon && (
            <Icon
              size={20}
              className="text-(--secondary)"
            />
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

// ========================================
// QUICK ACTION
// ========================================

const QuickAction = ({
  icon: Icon,
  title,
  description,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        p-5
        text-left
        hover:bg-(--bg-light)/50
        transition
      "
    >
      <Icon
        size={19}
        className="text-(--primary)"
      />

      <p className="text-sm font-semibold text-(--primary) mt-4">
        {title}
      </p>

      <p className="text-xs text-(--text-muted) mt-1">
        {description}
      </p>
    </button>
  );
};

// ========================================
// EMPTY STATE
// ========================================

const AdminEmptyState = ({
  icon: Icon,
  message,
}) => {
  return (
    <div className="p-8 text-center">
      <Icon
        size={22}
        className="mx-auto text-(--text-muted)"
      />

      <p className="text-sm text-(--secondary) mt-3">
        {message}
      </p>
    </div>
  );
};

// ========================================
// RECENT MEMBER
// ========================================

const RecentMember = ({ member }) => {
  return (
    <div className="flex items-center justify-between gap-4 p-5 border-b border-(--border) last:border-b-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-(--primary) truncate">
          {formatName(member)}
        </p>

        <p className="text-xs text-(--text-muted) mt-1 truncate">
          {member.email}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="text-xs text-(--secondary)">
          {member.yearSet?.year
            ? `Set ${member.yearSet.year}`
            : "—"}
        </p>

        <p className="text-[11px] text-(--text-muted) mt-1">
          {formatDate(member.createdAt)}
        </p>
      </div>
    </div>
  );
};

// ========================================
// COLLECTION TREND CHART
// ========================================

const CollectionTrendChart = ({ data = [] }) => {
  const formatAmount = (value) => {
    return `₦${Number(value || 0).toLocaleString()}`;
  };

  return (
    <AdminSection
      title="Monthly Collection"
      description="Successful payments received this year."
      icon={BarChart3}
    >
      <div className="h-[300px] w-full p-4 sm:p-5">
        {data.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <BarChart3
              size={22}
              className="text-(--text-muted)"
            />

            <p className="text-sm text-(--secondary) mt-3">
              No collection data available yet.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 15,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11,
                  fill: "var(--text-muted)",
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11,
                  fill: "var(--text-muted)",
                }}
                tickFormatter={(value) => {
                  if (value >= 1000000) {
                    return `₦${(value / 1000000).toFixed(1)}M`;
                  }

                  if (value >= 1000) {
                    return `₦${(value / 1000).toFixed(0)}k`;
                  }

                  return `₦${value}`;
                }}
                width={65}
              />

              <Tooltip
                formatter={(value) => [
                  formatAmount(value),
                  "Collected",
                ]}
                contentStyle={{
                  background: "var(--bg-white)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{
                  r: 3,
                }}
                activeDot={{
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </AdminSection>
  );
};

// ========================================
// RECENT PAYMENT
// ========================================

const RecentPayment = ({ payment }) => {
  const memberName =
    formatName(payment.user) ||
    payment.user?.email ||
    "Unknown member";

  return (
    <div className="flex items-center justify-between gap-4 p-5 border-b border-(--border) last:border-b-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-(--primary) truncate">
          {memberName}
        </p>

        <p className="text-xs text-(--text-muted) mt-1 truncate">
          {payment.obligationAssignment?.obligation?.name ||
            "Payment"}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-(--success)">
          {formatCurrency(payment.amount)}
        </p>

        <p className="text-[11px] text-(--text-muted) mt-1">
          {formatDate(
            payment.paidAt || payment.createdAt
          )}
        </p>
      </div>
    </div>
  );
};

// ========================================
// MAIN DASHBOARD
// ========================================

const Main = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // LOAD DASHBOARD
  // ========================================

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getAdminDashboard();

      console.log("Admin dashboard data:", result);

      setData(result);
    } catch (error) {
      console.error(
        "Admin dashboard error:",
        error
      );

      setError(
        error.message ||
          "Failed to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="p-4">
        <div className="space-y-5 animate-pulse">
          <div>
            <div className="h-5 w-40 bg-(--bg-light) rounded" />

            <div className="h-4 w-72 bg-(--bg-light) rounded mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-40 bg-(--bg-white) border border-(--border) rounded"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-(--bg-white) border border-(--border) rounded p-8 text-center">
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

  // ========================================
  // DATA
  // ========================================

  const members = data?.members || {};

  const finance = data?.finance || {};

  const recentMembers =
    data?.recentMembers || [];

  const recentPayments =
    data?.recentPayments || [];

  const collectionTrend =
    data?.charts?.collectionTrend || [];

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="p-4">
      <div className="space-y-5">

        {/* ========================================
            HEADER
        ======================================== */}

        <AdminPageHeader />

        {/* ========================================
            OVERVIEW CARDS
        ======================================== */}

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
            description="Members awaiting approval"
          />

          <AdminStatCard
            icon={CircleDollarSign}
            dark
            badge="This year"
            label="Total Collected"
            value={formatCurrency(
              finance.yearlyCollected || 0
            )}
            description="Successful payments"
          />
        </div>

        {/* ========================================
            FINANCIAL OVERVIEW
        ======================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            <AdminSection
              title="Financial Overview"
              description="Current payment and obligation summary."
              icon={BarChart3}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5">
                <div>
                  <p className="text-xs text-(--text-muted)">
                    Total Obligations
                  </p>

                  <p className="text-lg font-semibold text-(--primary) mt-1">
                    {formatCurrency(
                      finance.totalObligations || 0
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-(--text-muted)">
                    Amount Collected
                  </p>

                  <p className="text-lg font-semibold text-(--success) mt-1">
                    {formatCurrency(
                      finance.totalCollected || 0
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-(--text-muted)">
                    Outstanding
                  </p>

                  <p className="text-lg font-semibold text-(--warning) mt-1">
                    {formatCurrency(
                      finance.totalOutstanding || 0
                    )}
                  </p>
                </div>
              </div>
            </AdminSection>
          </div>

          {/* ========================================
              PENDING PAYMENTS
          ======================================== */}

          <div className="bg-(--bg-white) border border-(--border) rounded p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-(--warning-light) text-(--warning) flex items-center justify-center">
                <AlertCircle size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-(--primary)">
                  Pending Payments
                </h2>

                <p className="text-xs text-(--text-muted) mt-0.5">
                  Require attention
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-(--primary) mt-6">
              {finance.pendingPayments || 0}
            </h3>

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-1.5
                text-xs
                font-semibold
                text-(--primary)
                mt-3
                hover:text-(--primary-dark)
              "
            >
              View payments

              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* ========================================
            MONTHLY COLLECTION GRAPH
        ======================================== */}

        <CollectionTrendChart
          data={collectionTrend}
        />

        {/* ========================================
            QUICK ACTIONS
        ======================================== */}

        <AdminSection
          title="Quick Actions"
          description="Common administrative tasks."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-(--border)">
            <QuickAction
              icon={UserPlus}
              title="Manage Members"
              description="Review and manage member accounts."
            />

            <QuickAction
              icon={ClipboardList}
              title="Manage Obligations"
              description="Create and assign obligations."
            />

            <QuickAction
              icon={CreditCard}
              title="View Payments"
              description="Review recent transactions."
            />

            <QuickAction
              icon={BarChart3}
              title="Financial Reports"
              description="View financial summaries and reports."
            />
          </div>
        </AdminSection>

        {/* ========================================
            RECENT ACTIVITY
        ======================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

          {/* RECENT REGISTRATIONS */}

          <AdminSection
            title="Recent Registrations"
            description="Latest members who joined the portal."
          >
            {recentMembers.length === 0 ? (
              <AdminEmptyState
                icon={Users}
                message="No recent registrations."
              />
            ) : (
              <div>
                {recentMembers.map((member) => (
                  <RecentMember
                    key={member._id}
                    member={member}
                  />
                ))}
              </div>
            )}
          </AdminSection>

          {/* RECENT PAYMENTS */}

          <AdminSection
            title="Recent Payments"
            description="Latest payment activity."
          >
            {recentPayments.length === 0 ? (
              <AdminEmptyState
                icon={CreditCard}
                message="No recent payments."
              />
            ) : (
              <div>
                {recentPayments.map((payment) => (
                  <RecentPayment
                    key={payment._id}
                    payment={payment}
                  />
                ))}
              </div>
            )}
          </AdminSection>

        </div>
      </div>
    </div>
  );
};

export default Main;