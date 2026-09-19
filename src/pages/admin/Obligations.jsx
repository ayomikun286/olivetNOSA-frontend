import React, { useMemo, useState } from "react";
import {
  WalletCards,
  CircleDollarSign,
  Users,
  Layers3,
  Plus,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";

const obligationsData = [
  {
    _id: "1",
    name: "Dues & Development Levy",
    description: "Annual individual dues and development levy.",
    category: "individual",
    amount: 24000,
    paymentPlans: [
      {
        frequency: "annual",
        amount: 24000,
      },
    ],
    year: 2026,
    dueDate: "2026-12-31",
    isActive: true,
  },
  {
    _id: "2",
    name: "Insurance",
    description: "Annual insurance contribution.",
    category: "individual",
    amount: 10000,
    paymentPlans: [
      {
        frequency: "annual",
        amount: 10000,
      },
    ],
    year: 2026,
    dueDate: "2026-12-31",
    isActive: true,
  },
  {
    _id: "3",
    name: "Year Set Annual Due",
    description: "Annual financial obligation for Year Sets.",
    category: "yearSet",
    amount: 50000,
    paymentPlans: [
      {
        frequency: "annual",
        amount: 50000,
      },
    ],
    year: 2026,
    dueDate: "2026-12-31",
    isActive: true,
  },
  {
    _id: "4",
    name: "Teachers' Levy",
    description: "NOSA Teachers' Levy.",
    category: "yearSet",
    amount: 70000,
    paymentPlans: [
      {
        frequency: "monthly",
        amount: 70000,
      },
      {
        frequency: "quarterly",
        amount: 210000,
      },
      {
        frequency: "annual",
        amount: 840000,
      },
    ],
    year: 2026,
    dueDate: "2026-12-31",
    isActive: true,
  },
  {
    _id: "5",
    name: "AGM Support Levy",
    description: "Annual AGM support levy.",
    category: "yearSet",
    amount: 200000,
    paymentPlans: [
      {
        frequency: "annual",
        amount: 200000,
      },
    ],
    year: 2026,
    dueDate: "2026-12-31",
    isActive: true,
  },
  {
    _id: "6",
    name: "Chapter Annual Due",
    description: "Annual financial obligation for Chapters.",
    category: "chapter",
    amount: 200000,
    paymentPlans: [
      {
        frequency: "annual",
        amount: 200000,
      },
    ],
    year: 2026,
    dueDate: "2026-12-31",
    isActive: true,
  },
];

const Obligations = () => {
  const [activeCategory, setActiveCategory] =
    useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 10;

  // ========================================
  // STATISTICS
  // ========================================

  const stats = useMemo(() => {
    const total = obligationsData.length;

    const active = obligationsData.filter(
      (item) => item.isActive
    ).length;

    const individual = obligationsData.filter(
      (item) => item.category === "individual"
    ).length;

    const group = obligationsData.filter(
      (item) =>
        item.category === "yearSet" ||
        item.category === "chapter"
    ).length;

    return {
      total,
      active,
      individual,
      group,
    };
  }, []);

  // ========================================
  // FILTER
  // ========================================

  const filteredObligations = useMemo(() => {
    return obligationsData.filter((obligation) => {
      const matchesCategory =
        !activeCategory ||
        obligation.category === activeCategory;

      const matchesSearch =
        obligation.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        obligation.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        !statusFilter ||
        (statusFilter === "active"
          ? obligation.isActive
          : !obligation.isActive);

      return (
        matchesCategory &&
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    activeCategory,
    search,
    statusFilter,
  ]);

  // ========================================
  // PAGINATION
  // ========================================

  const totalPages = Math.ceil(
    filteredObligations.length / itemsPerPage
  );

  const paginatedObligations =
    filteredObligations.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const canGoPrevious = currentPage > 1;

  const canGoNext =
    currentPage < totalPages;

  const handlePrevious = () => {
    if (!canGoPrevious) return;

    setCurrentPage((page) => page - 1);
  };

  const handleNext = () => {
    if (!canGoNext) return;

    setCurrentPage((page) => page + 1);
  };

  // ========================================
  // TABLE COLUMNS
  // ========================================

  const obligationColumns = [
    {
      key: "obligation",
      label: "Obligation",

      render: (obligation) => (
        <div>
          <p className="font-medium text-(--primary)">
            {obligation.name}
          </p>

          <p className="text-xs text-(--text-muted) mt-0.5">
            {obligation.description}
          </p>
        </div>
      ),
    },

    {
      key: "category",
      label: "Category",

      render: (obligation) => {
        const labels = {
          individual: "Individual",
          yearSet: "Year Set",
          chapter: "Chapter",
        };

        return (
          <span className="text-(--secondary)">
            {labels[obligation.category]}
          </span>
        );
      },
    },

    {
      key: "amount",
      label: "Amount",

      render: (obligation) => (
        <span className="font-medium text-(--primary)">
          ₦
          {Number(
            obligation.amount
          ).toLocaleString()}
        </span>
      ),
    },

    {
      key: "paymentPlan",
      label: "Payment Plan",

      render: (obligation) => (
        <span className="capitalize text-(--secondary)">
          {obligation.paymentPlans?.length
            ? obligation.paymentPlans
                .map((plan) => plan.frequency)
                .join(", ")
            : "—"}
        </span>
      ),
    },

    {
      key: "year",
      label: "Year",

      render: (obligation) => (
        <span className="text-(--secondary)">
          {obligation.year}
        </span>
      ),
    },

    {
      key: "status",
      label: "Status",

      render: (obligation) => {
        const statusStyles = obligation.isActive
          ? "bg-(--success-light) text-(--success)"
          : "bg-(--bg-soft) text-(--secondary)";

        return (
          <span
            className={`
              inline-flex
              items-center
              px-2.5
              py-1
              rounded
              text-xs
              font-medium
              ${statusStyles}
            `}
          >
            {obligation.isActive
              ? "Active"
              : "Inactive"}
          </span>
        );
      },
    },

    {
      key: "actions",
      label: "Action",

      render: (obligation) => (
        <button
          type="button"
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
          onClick={() => {
            console.log(
              "View obligation:",
              obligation
            );
          }}
        >
          <Eye size={15} />
          View
        </button>
      ),
    },
  ];

 
  // RETURN
  // ========================================

  return (
    <div className="p-4">
      <div className="space-y-5">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <h1 className="text-xl font-semibold text-(--primary)">
              Obligations
            </h1>

            <p className="text-sm text-(--secondary) mt-1">
              Manage NOSA financial obligations,
              dues and payment plans.
            </p>
          </div>

          <button
            type="button"
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
            <Plus size={15} />
            Create Obligation
          </button>

        </div>

        {/* OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

          <AdminStatCard
            icon={WalletCards}
            iconBg="bg-(--primary-light)"
            iconClass="text-(--primary)"
            badge="Obligations"
            label="Total Obligations"
            value={stats.total}
            description="All financial obligations"
          />

          <AdminStatCard
            icon={CircleDollarSign}
            iconBg="bg-(--success-light)"
            iconClass="text-(--success)"
            badge="Active"
            label="Active Obligations"
            value={stats.active}
            description="Currently active"
          />

          <AdminStatCard
            icon={Users}
            iconBg="bg-(--warning-light)"
            iconClass="text-(--warning)"
            badge="Individual"
            label="Individual"
            value={stats.individual}
            description="Member obligations"
          />

          <AdminStatCard
            icon={Layers3}
            iconBg="bg-(--primary-light)"
            iconClass="text-(--primary)"
            badge="Groups"
            label="Group Obligations"
            value={stats.group}
            description="Year Set & Chapter"
          />

        </div>

        {/* OBLIGATION TABLE */}
        <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">

          {/* TABLE HEADER */}
          <div className="px-5 py-4 border-b border-(--border)">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              <div>
                <h2 className="text-sm font-semibold text-(--primary)">
                  All Obligations
                </h2>

                <p className="text-xs text-(--secondary) mt-1">
                  View and manage registered NOSA
                  financial obligations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">

                {/* SEARCH */}
                <div className="relative">

                  <Search
                    size={15}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-(--text-muted)
                    "
                  />

                  <input
                    type="text"
                    placeholder="Search obligations..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
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

                {/* CATEGORY */}
                <select
                  value={activeCategory}
                  onChange={(e) => {
                    setActiveCategory(e.target.value);
                    setCurrentPage(1);
                  }}
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
                  <option value="">
                    All Categories
                  </option>

                  <option value="individual">
                    Individual
                  </option>

                  <option value="yearSet">
                    Year Set
                  </option>

                  <option value="chapter">
                    Chapter
                  </option>
                </select>

                {/* STATUS */}
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
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
                  <option value="">
                    All Status
                  </option>

                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* TABLE */}
          <AdminTable
            columns={obligationColumns}
            data={paginatedObligations}
            loading={false}
            rowKey="_id"
            emptyMessage="No obligations found."
          />

          {/* PAGINATION */}
          {filteredObligations.length > 0 && (
            <div className="
              px-5
              py-3
              border-t
              border-(--border)
              flex
              items-center
              justify-between
            ">

              <p className="text-xs text-(--primary)">
                Page{" "}
                <span className="font-medium">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {totalPages}
                </span>

                <span className="mx-1">
                  •
                </span>

                {filteredObligations.length} obligations
              </p>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={!canGoPrevious}
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
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition-colors
                  "
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canGoNext}
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
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition-colors
                  "
                >
                  <ChevronRight size={16} />
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Obligations;