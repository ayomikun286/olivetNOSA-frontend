import React, { useEffect, useMemo, useState } from "react";
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
  X,
  Pencil,
  Power,
  Loader2,
  CalendarDays,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminTable from "../../components/admin/AdminTable.jsx";
import Alert from "../../components/common/Alert.jsx";

import {
  getObligations,
  createObligation,
  updateObligation,
  toggleObligationStatus,
} from "../../services/adminService.js";

const Obligations = () => {
  // ========================================
  // DATA
  // ========================================

  const [obligations, setObligations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);

  const [statusLoading, setStatusLoading] =
    useState(false);

  // ========================================
  // FILTERS
  // ========================================

  const [activeCategory, setActiveCategory] =
    useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 10;

  // ========================================
  // MODALS
  // ========================================

  const [createModalOpen, setCreateModalOpen] =
    useState(false);

  const [viewModalOpen, setViewModalOpen] =
    useState(false);

  const [editModalOpen, setEditModalOpen] =
    useState(false);

  const [selectedObligation, setSelectedObligation] =
    useState(null);

  // ========================================
  // ALERT
  // ========================================

  const [alert, setAlert] = useState(null);

  // ========================================
  // FORM
  // ========================================

  const emptyForm = {
    name: "",
    description: "",
    category: "individual",
    amount: "",
    year: new Date().getFullYear(),
    dueDate: "",
    paymentPlans: [
      {
        frequency: "annual",
        amount: "",
        isActive: true,
      },
    ],
  };

  const [form, setForm] = useState(emptyForm);

  // ========================================
  // LOAD OBLIGATIONS
  // ========================================

  const loadObligations = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getObligations();

      setObligations(
        Array.isArray(result?.obligations)
          ? result.obligations
          : []
      );
    } catch (error) {
      console.error(
        "Load obligations error:",
        error
      );

      setError(
        error.message ||
          "Unable to load obligations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadObligations();
  }, []);

  // ========================================
  // ALERT HELPER
  // ========================================

  const showAlert = (
    type,
    message
  ) => {
    setAlert({
      type,
      message,
    });
  };

  // ========================================
  // STATISTICS
  // ========================================

  const stats = useMemo(() => {
    const total = obligations.length;

    const active = obligations.filter(
      (item) => item.isActive
    ).length;

    const individual = obligations.filter(
      (item) =>
        item.category === "individual"
    ).length;

    const group = obligations.filter(
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
  }, [obligations]);

  // ========================================
  // FILTER
  // ========================================

  const filteredObligations = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return obligations.filter(
      (obligation) => {
        const matchesCategory =
          !activeCategory ||
          obligation.category ===
            activeCategory;

        const matchesSearch =
          !normalizedSearch ||
          obligation.name
            ?.toLowerCase()
            .includes(normalizedSearch) ||
          obligation.description
            ?.toLowerCase()
            .includes(normalizedSearch);

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
      }
    );
  }, [
    obligations,
    activeCategory,
    search,
    statusFilter,
  ]);

  // ========================================
  // PAGINATION
  // ========================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredObligations.length /
        itemsPerPage
    )
  );

  const paginatedObligations =
    filteredObligations.slice(
      (currentPage - 1) *
        itemsPerPage,
      currentPage * itemsPerPage
    );

  const canGoPrevious =
    currentPage > 1;

  const canGoNext =
    currentPage < totalPages;

  const handlePrevious = () => {
    if (!canGoPrevious) return;

    setCurrentPage(
      (page) => page - 1
    );
  };

  const handleNext = () => {
    if (!canGoNext) return;

    setCurrentPage(
      (page) => page + 1
    );
  };

  // ========================================
  // FORM HELPERS
  // ========================================

  const resetForm = () => {
    setForm({
      ...emptyForm,
      year: new Date().getFullYear(),
      paymentPlans: [
        {
          frequency: "annual",
          amount: "",
          isActive: true,
        },
      ],
    });
  };

  const openCreateModal = () => {
    resetForm();
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    if (saving) return;

    setCreateModalOpen(false);
    resetForm();
  };

  const openViewModal = (
    obligation
  ) => {
    setSelectedObligation(
      obligation
    );
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    if (statusLoading) return;

    setViewModalOpen(false);
    setSelectedObligation(null);
  };

  const openEditModal = (
    obligation
  ) => {
    setSelectedObligation(
      obligation
    );

    setForm({
      name: obligation.name || "",
      description:
        obligation.description || "",
      category:
        obligation.category ||
        "individual",
      amount:
        obligation.amount ?? "",
      year:
        obligation.year ||
        new Date().getFullYear(),
      dueDate: obligation.dueDate
        ? new Date(
            obligation.dueDate
          )
            .toISOString()
            .split("T")[0]
        : "",
      paymentPlans:
        obligation.paymentPlans
          ?.length
          ? obligation.paymentPlans.map(
              (plan) => ({
                frequency:
                  plan.frequency,
                amount:
                  plan.amount ?? "",
                isActive:
                  plan.isActive !== false,
              })
            )
          : [
              {
                frequency: "annual",
                amount: "",
                isActive: true,
              },
            ],
    });

    setViewModalOpen(false);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    if (saving) return;

    setEditModalOpen(false);
    setSelectedObligation(null);
    resetForm();
  };

  // ========================================
  // FORM INPUT
  // ========================================

  const handleFormChange = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handlePaymentPlanChange = (
    index,
    field,
    value
  ) => {
    setForm((previous) => {
      const paymentPlans = [
        ...previous.paymentPlans,
      ];

      paymentPlans[index] = {
        ...paymentPlans[index],
        [field]: value,
      };

      return {
        ...previous,
        paymentPlans,
      };
    });
  };

  const addPaymentPlan = () => {
    setForm((previous) => ({
      ...previous,
      paymentPlans: [
        ...previous.paymentPlans,
        {
          frequency: "annual",
          amount: "",
          isActive: true,
        },
      ],
    }));
  };

  const removePaymentPlan = (
    index
  ) => {
    setForm((previous) => {
      if (
        previous.paymentPlans.length <=
        1
      ) {
        return previous;
      }

      return {
        ...previous,
        paymentPlans:
          previous.paymentPlans.filter(
            (_, planIndex) =>
              planIndex !== index
          ),
      };
    });
  };

  // ========================================
  // VALIDATE FORM
  // ========================================

  const validateForm = () => {
    if (!form.name.trim()) {
      showAlert(
        "error",
        "Obligation name is required."
      );
      return false;
    }

    if (
      form.amount === "" ||
      Number(form.amount) < 0
    ) {
      showAlert(
        "error",
        "Please enter a valid obligation amount."
      );
      return false;
    }

    if (
      !form.year ||
      Number(form.year) < 1900
    ) {
      showAlert(
        "error",
        "Please enter a valid obligation year."
      );
      return false;
    }

    for (
      const plan of form.paymentPlans
    ) {
      if (
        !plan.frequency ||
        plan.amount === "" ||
        Number(plan.amount) < 0
      ) {
        showAlert(
          "error",
          "Please complete all payment plan fields."
        );
        return false;
      }
    }

    return true;
  };

  // ========================================
  // BUILD PAYLOAD
  // ========================================

  const buildPayload = () => {
    return {
      name: form.name.trim(),

      description:
        form.description.trim(),

      category: form.category,

      amount: Number(form.amount),

      year: Number(form.year),

      dueDate:
        form.dueDate || null,

      paymentPlans:
        form.paymentPlans.map(
          (plan) => ({
            frequency:
              plan.frequency,

            amount:
              Number(plan.amount),

            isActive:
              plan.isActive !== false,
          })
        ),
    };
  };

  // ========================================
  // CREATE
  // ========================================

  const handleCreate = async (
    event
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const result =
        await createObligation(
          buildPayload()
        );

      showAlert(
        "success",
        result?.message ||
          "Obligation created successfully."
      );

      setCreateModalOpen(false);
      resetForm();

      await loadObligations();

      setCurrentPage(1);
    } catch (error) {
      console.error(
        "Create obligation error:",
        error
      );

      showAlert(
        "error",
        error.message ||
          "Failed to create obligation."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // UPDATE
  // ========================================

  const handleUpdate = async (
    event
  ) => {
    event.preventDefault();

    if (!selectedObligation?._id) {
      showAlert(
        "error",
        "Obligation could not be identified."
      );
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const result =
        await updateObligation(
          selectedObligation._id,
          buildPayload()
        );

      showAlert(
        "success",
        result?.message ||
          "Obligation updated successfully."
      );

      setEditModalOpen(false);
      setSelectedObligation(null);
      resetForm();

      await loadObligations();
    } catch (error) {
      console.error(
        "Update obligation error:",
        error
      );

      showAlert(
        "error",
        error.message ||
          "Failed to update obligation."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // TOGGLE STATUS
  // ========================================

  const handleToggleStatus =
    async (obligation) => {
      if (!obligation?._id) {
        return;
      }

      try {
        setStatusLoading(true);

        const result =
          await toggleObligationStatus(
            obligation._id
          );

        showAlert(
          "success",
          result?.message ||
            "Obligation status updated successfully."
        );

        const updatedObligation =
          result?.obligation;

        if (
          selectedObligation?._id ===
            obligation._id &&
          updatedObligation
        ) {
          setSelectedObligation(
            updatedObligation
          );
        }

        await loadObligations();
      } catch (error) {
        console.error(
          "Toggle obligation status error:",
          error
        );

        showAlert(
          "error",
          error.message ||
            "Failed to update obligation status."
        );
      } finally {
        setStatusLoading(false);
      }
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
            {obligation.description ||
              "No description provided."}
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
            {labels[
              obligation.category
            ] || obligation.category}
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
            obligation.amount || 0
          ).toLocaleString()}
        </span>
      ),
    },

    {
      key: "paymentPlan",
      label: "Payment Plan",

      render: (obligation) => (
        <span className="capitalize text-(--secondary)">
          {obligation.paymentPlans
            ?.length
            ? obligation.paymentPlans
                .filter(
                  (plan) =>
                    plan.isActive !==
                    false
                )
                .map(
                  (plan) =>
                    plan.frequency
                )
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
        const statusStyles =
          obligation.isActive
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
          onClick={() =>
            openViewModal(
              obligation
            )
          }
        >
          <Eye size={15} />
          View
        </button>
      ),
    },
  ];

  // ========================================
  // RETURN
  // ========================================

  return (
    <div className="p-4">
      <div className="space-y-5">

        {/* ALERT */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() =>
              setAlert(null)
            }
          />
        )}

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
            onClick={
              openCreateModal
            }
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

        {/* ERROR */}
        {error && (
          <div className="
            bg-(--danger-light)
            border
            border-(--danger)
            rounded
            px-4
            py-3
            flex
            items-center
            justify-between
            gap-3
          ">
            <p className="text-xs text-(--danger)">
              {error}
            </p>

            <button
              type="button"
              onClick={
                loadObligations
              }
              className="
                text-xs
                font-semibold
                text-(--danger)
                hover:underline
              "
            >
              Retry
            </button>
          </div>
        )}

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
                      setSearch(
                        e.target.value
                      );
                      setCurrentPage(
                        1
                      );
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
                    setActiveCategory(
                      e.target.value
                    );
                    setCurrentPage(
                      1
                    );
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
                    setStatusFilter(
                      e.target.value
                    );
                    setCurrentPage(
                      1
                    );
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
            columns={
              obligationColumns
            }
            data={
              paginatedObligations
            }
            loading={loading}
            rowKey="_id"
            emptyMessage={
              error
                ? "Unable to load obligations."
                : "No obligations found."
            }
          />

          {/* PAGINATION */}
          {filteredObligations.length >
            0 && (
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

                {
                  filteredObligations.length
                }{" "}
                obligations
              </p>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  onClick={
                    handlePrevious
                  }
                  disabled={
                    !canGoPrevious
                  }
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
                  <ChevronLeft
                    size={16}
                  />
                </button>

                <button
                  type="button"
                  onClick={
                    handleNext
                  }
                  disabled={
                    !canGoNext
                  }
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
                  <ChevronRight
                    size={16}
                  />
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* ==================================================
          CREATE OBLIGATION MODAL
      ================================================== */}

      {createModalOpen && (
        <ObligationFormModal
          title="Create Obligation"
          description="Create a new NOSA financial obligation and payment plan."
          form={form}
          saving={saving}
          onChange={
            handleFormChange
          }
          onPaymentPlanChange={
            handlePaymentPlanChange
          }
          onAddPaymentPlan={
            addPaymentPlan
          }
          onRemovePaymentPlan={
            removePaymentPlan
          }
          onSubmit={
            handleCreate
          }
          onClose={
            closeCreateModal
          }
          submitLabel="Create Obligation"
        />
      )}

      {/* ==================================================
          EDIT OBLIGATION MODAL
      ================================================== */}

      {editModalOpen && (
        <ObligationFormModal
          title="Edit Obligation"
          description="Update the financial obligation and payment plan."
          form={form}
          saving={saving}
          onChange={
            handleFormChange
          }
          onPaymentPlanChange={
            handlePaymentPlanChange
          }
          onAddPaymentPlan={
            addPaymentPlan
          }
          onRemovePaymentPlan={
            removePaymentPlan
          }
          onSubmit={
            handleUpdate
          }
          onClose={
            closeEditModal
          }
          submitLabel="Save Changes"
        />
      )}

      {/* ==================================================
          VIEW OBLIGATION MODAL
      ================================================== */}

      {viewModalOpen &&
        selectedObligation && (
          <ObligationViewModal
            obligation={
              selectedObligation
            }
            statusLoading={
              statusLoading
            }
            onClose={
              closeViewModal
            }
            onEdit={() =>
              openEditModal(
                selectedObligation
              )
            }
            onToggleStatus={() =>
              handleToggleStatus(
                selectedObligation
              )
            }
          />
        )}
    </div>
  );
};


// ======================================================
// OBLIGATION FORM MODAL
// ======================================================

const ObligationFormModal = ({
  title,
  description,
  form,
  saving,
  onChange,
  onPaymentPlanChange,
  onAddPaymentPlan,
  onRemovePaymentPlan,
  onSubmit,
  onClose,
  submitLabel,
}) => {
  return (
    <div className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      p-4
      bg-black/40
    ">
      <div className="
        w-full
        max-w-2xl
        max-h-[90vh]
        overflow-y-auto
        bg-(--bg-white)
        rounded
        border
        border-(--border)
        shadow-xl
      ">

        {/* HEADER */}
        <div className="
          px-5
          py-4
          border-b
          border-(--border)
          flex
          items-center
          justify-between
          gap-4
        ">
          <div>
            <h2 className="text-sm font-semibold text-(--primary)">
              {title}
            </h2>

            <p className="text-xs text-(--secondary) mt-1">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="
              w-8
              h-8
              rounded
              flex
              items-center
              justify-center
              text-(--secondary)
              hover:bg-(--bg-soft)
              transition-colors
              disabled:opacity-50
            "
          >
            <X size={17} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={onSubmit}
          className="p-5 space-y-5"
        >

          {/* BASIC INFORMATION */}
          <div className="space-y-3">

            <h3 className="text-xs font-semibold text-(--primary)">
              Basic Information
            </h3>

            <div>
              <label className="block text-xs font-medium text-(--primary) mb-1.5">
                Obligation Name
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  onChange(
                    "name",
                    e.target.value
                  )
                }
                placeholder="e.g. Dues & Development Levy"
                maxLength={100}
                className="
                  w-full
                  h-9
                  px-3
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

            <div>
              <label className="block text-xs font-medium text-(--primary) mb-1.5">
                Description
              </label>

              <textarea
                value={
                  form.description
                }
                onChange={(e) =>
                  onChange(
                    "description",
                    e.target.value
                  )
                }
                placeholder="Describe this obligation..."
                maxLength={500}
                rows={3}
                className="
                  w-full
                  px-3
                  py-2
                  rounded
                  border
                  border-(--border)
                  bg-(--bg-white)
                  text-xs
                  text-(--primary)
                  outline-none
                  focus:border-(--primary)
                  resize-none
                "
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div>
                <label className="block text-xs font-medium text-(--primary) mb-1.5">
                  Category
                </label>

                <select
                  value={
                    form.category
                  }
                  onChange={(e) =>
                    onChange(
                      "category",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-9
                    px-3
                    rounded
                    border
                    border-(--border)
                    bg-(--bg-white)
                    text-xs
                    text-(--primary)
                    outline-none
                    focus:border-(--primary)
                  "
                >
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
              </div>

              <div>
                <label className="block text-xs font-medium text-(--primary) mb-1.5">
                  Year
                </label>

                <input
                  type="number"
                  min="1900"
                  value={form.year}
                  onChange={(e) =>
                    onChange(
                      "year",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-9
                    px-3
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

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div>
                <label className="block text-xs font-medium text-(--primary) mb-1.5">
                  Total Amount
                </label>

                <div className="relative">
                  <span className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-xs
                    text-(--secondary)
                  ">
                    ₦
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={
                      form.amount
                    }
                    onChange={(e) =>
                      onChange(
                        "amount",
                        e.target.value
                      )
                    }
                    placeholder="0"
                    className="
                      w-full
                      h-9
                      pl-8
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
              </div>

              <div>
                <label className="block text-xs font-medium text-(--primary) mb-1.5">
                  Due Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={14}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-(--text-muted)
                    "
                  />

                  <input
                    type="date"
                    value={
                      form.dueDate
                    }
                    onChange={(e) =>
                      onChange(
                        "dueDate",
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      h-9
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
              </div>

            </div>

          </div>

          {/* PAYMENT PLANS */}
          <div className="space-y-3">

            <div className="flex items-center justify-between gap-3">

              <div>
                <h3 className="text-xs font-semibold text-(--primary)">
                  Payment Plans
                </h3>

                <p className="text-[11px] text-(--secondary) mt-1">
                  Add the available ways members can satisfy this obligation.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  onAddPaymentPlan
                }
                className="
                  h-8
                  px-2.5
                  rounded
                  border
                  border-(--border)
                  text-xs
                  font-semibold
                  text-(--primary)
                  hover:bg-(--bg-soft)
                  inline-flex
                  items-center
                  gap-1.5
                  transition-colors
                "
              >
                <Plus size={14} />
                Add Plan
              </button>

            </div>

            <div className="space-y-2">

              {form.paymentPlans.map(
                (
                  plan,
                  index
                ) => (
                  <div
                    key={index}
                    className="
                      p-3
                      rounded
                      border
                      border-(--border)
                      bg-(--bg-light)
                    "
                  >

                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2">

                      <div>
                        <label className="block text-[11px] font-medium text-(--primary) mb-1">
                          Frequency
                        </label>

                        <select
                          value={
                            plan.frequency
                          }
                          onChange={(
                            e
                          ) =>
                            onPaymentPlanChange(
                              index,
                              "frequency",
                              e.target.value
                            )
                          }
                          className="
                            w-full
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
                          <option value="monthly">
                            Monthly
                          </option>

                          <option value="quarterly">
                            Quarterly
                          </option>

                          <option value="annual">
                            Annual
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-(--primary) mb-1">
                          Amount
                        </label>

                        <div className="relative">
                          <span className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-xs
                            text-(--secondary)
                          ">
                            ₦
                          </span>

                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={
                              plan.amount
                            }
                            onChange={(
                              e
                            ) =>
                              onPaymentPlanChange(
                                index,
                                "amount",
                                e.target.value
                              )
                            }
                            className="
                              w-full
                              h-9
                              pl-8
                              pr-3
                              rounded
                              border
                              border-(--border)
                              bg-(--bg-white)
                              text-xs
                              text-(--primary)
                              outline-none
                            "
                          />
                        </div>
                      </div>

                      <div className="flex items-end">

                        <button
                          type="button"
                          onClick={() =>
                            onRemovePaymentPlan(
                              index
                            )
                          }
                          disabled={
                            form.paymentPlans
                              .length <=
                            1
                          }
                          className="
                            w-9
                            h-9
                            rounded
                            border
                            border-(--border)
                            flex
                            items-center
                            justify-center
                            text-(--danger)
                            hover:bg-(--danger-light)
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            transition-colors
                          "
                          title="Remove payment plan"
                        >
                          <X
                            size={15}
                          />
                        </button>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          {/* ACTIONS */}
          <div className="
            pt-2
            border-t
            border-(--border)
            flex
            items-center
            justify-end
            gap-2
          ">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="
                h-9
                px-3.5
                rounded
                border
                border-(--border)
                text-xs
                font-semibold
                text-(--secondary)
                hover:bg-(--bg-soft)
                disabled:opacity-50
                transition-colors
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
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
                disabled:opacity-60
                disabled:cursor-not-allowed
                transition-opacity
              "
            >
              {saving && (
                <Loader2
                  size={14}
                  className="animate-spin"
                />
              )}

              {saving
                ? "Saving..."
                : submitLabel}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};


// ======================================================
// VIEW OBLIGATION MODAL
// ======================================================

const ObligationViewModal = ({
  obligation,
  statusLoading,
  onClose,
  onEdit,
  onToggleStatus,
}) => {
  const categoryLabels = {
    individual: "Individual",
    yearSet: "Year Set",
    chapter: "Chapter",
  };

  const formattedDueDate =
    obligation.dueDate
      ? new Date(
          obligation.dueDate
        ).toLocaleDateString(
          "en-NG",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : "No due date";

  return (
    <div className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      p-4
      bg-black/40
    ">
      <div className="
        w-full
        max-w-lg
        max-h-[90vh]
        overflow-y-auto
        bg-(--bg-white)
        rounded
        border
        border-(--border)
        shadow-xl
      ">

        {/* HEADER */}
        <div className="
          px-5
          py-4
          border-b
          border-(--border)
          flex
          items-start
          justify-between
          gap-4
        ">

          <div>
            <div className="flex items-center gap-2">

              <h2 className="text-sm font-semibold text-(--primary)">
                {obligation.name}
              </h2>

              <span
                className={`
                  inline-flex
                  items-center
                  px-2
                  py-0.5
                  rounded
                  text-[10px]
                  font-medium
                  ${
                    obligation.isActive
                      ? "bg-(--success-light) text-(--success)"
                      : "bg-(--bg-soft) text-(--secondary)"
                  }
                `}
              >
                {obligation.isActive
                  ? "Active"
                  : "Inactive"}
              </span>

            </div>

            <p className="text-xs text-(--secondary) mt-1">
              {obligation.description ||
                "No description provided."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={
              statusLoading
            }
            className="
              w-8
              h-8
              rounded
              flex
              items-center
              justify-center
              text-(--secondary)
              hover:bg-(--bg-soft)
              disabled:opacity-50
            "
          >
            <X size={17} />
          </button>

        </div>

        {/* DETAILS */}
        <div className="p-5 space-y-4">

          <div className="grid grid-cols-2 gap-3">

            <DetailItem
              label="Category"
              value={
                categoryLabels[
                  obligation.category
                ] ||
                obligation.category
              }
            />

            <DetailItem
              label="Year"
              value={
                obligation.year
              }
            />

            <DetailItem
              label="Total Amount"
              value={`₦${Number(
                obligation.amount ||
                  0
              ).toLocaleString()}`}
            />

            <DetailItem
              label="Due Date"
              value={
                formattedDueDate
              }
            />

          </div>

          {/* PAYMENT PLANS */}
          <div>

            <p className="text-xs font-semibold text-(--primary) mb-2">
              Payment Plans
            </p>

            <div className="space-y-2">

              {obligation.paymentPlans
                ?.length ? (
                obligation.paymentPlans.map(
                  (
                    plan,
                    index
                  ) => (
                    <div
                      key={index}
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        px-3
                        py-2.5
                        rounded
                        border
                        border-(--border)
                        bg-(--bg-light)
                      "
                    >

                      <span className="text-xs capitalize text-(--secondary)">
                        {
                          plan.frequency
                        }
                      </span>

                      <span className="text-xs font-semibold text-(--primary)">
                        ₦
                        {Number(
                          plan.amount ||
                            0
                        ).toLocaleString()}
                      </span>

                    </div>
                  )
                )
              ) : (
                <p className="text-xs text-(--text-muted)">
                  No payment plans configured.
                </p>
              )}

            </div>

          </div>

          {/* CREATED */}
          {obligation.createdBy && (
            <div className="
              pt-3
              border-t
              border-(--border)
            ">
              <p className="text-[11px] text-(--text-muted)">
                Created by
              </p>

              <p className="text-xs font-medium text-(--primary) mt-0.5">
                {obligation.createdBy.firstName ||
                  ""}{" "}
                {obligation.createdBy.lastName ||
                  ""}
              </p>

              {obligation.createdBy.email && (
                <p className="text-[11px] text-(--secondary) mt-0.5">
                  {
                    obligation
                      .createdBy
                      .email
                  }
                </p>
              )}
            </div>
          )}

          {/* ACTIONS */}
          <div className="
            pt-3
            border-t
            border-(--border)
            flex
            items-center
            justify-end
            gap-2
          ">

            <button
              type="button"
              onClick={
                onToggleStatus
              }
              disabled={
                statusLoading
              }
              className={`
                h-9
                px-3
                rounded
                border
                text-xs
                font-semibold
                inline-flex
                items-center
                justify-center
                gap-1.5
                transition-colors
                disabled:opacity-60
                disabled:cursor-not-allowed
                ${
                  obligation.isActive
                    ? "border-(--danger) text-(--danger) hover:bg-(--danger-light)"
                    : "border-(--success) text-(--success) hover:bg-(--success-light)"
                }
              `}
            >
              {statusLoading ? (
                <Loader2
                  size={14}
                  className="animate-spin"
                />
              ) : (
                <Power
                  size={14}
                />
              )}

              {obligation.isActive
                ? "Deactivate"
                : "Activate"}
            </button>

            <button
              type="button"
              onClick={
                onEdit
              }
              disabled={
                statusLoading
              }
              className="
                h-9
                px-3
                rounded
                bg-(--primary)
                text-white
                text-xs
                font-semibold
                inline-flex
                items-center
                justify-center
                gap-1.5
                hover:opacity-90
                disabled:opacity-60
                transition-opacity
              "
            >
              <Pencil
                size={14}
              />
              Edit
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};


// ======================================================
// DETAIL ITEM
// ======================================================

const DetailItem = ({
  label,
  value,
}) => {
  return (
    <div className="
      p-3
      rounded
      border
      border-(--border)
      bg-(--bg-light)
    ">
      <p className="text-[11px] text-(--text-muted)">
        {label}
      </p>

      <p className="text-xs font-semibold text-(--primary) mt-1">
        {value}
      </p>
    </div>
  );
};

export default Obligations;