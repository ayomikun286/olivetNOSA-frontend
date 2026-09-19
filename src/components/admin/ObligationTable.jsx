import React from "react";
import {
  MoreHorizontal,
  Eye,
  Pencil,
} from "lucide-react";

import ObligationStatusBadge from "./ObligationStatusBadge";

const formatAmount = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
};

const categoryLabels = {
  individual: "Individual",
  yearSet: "Year Set",
  chapter: "Chapter",
};

const ObligationTable = ({ obligations = [] }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-[#0B294D]">
            Obligation List
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            {obligations.length} obligation
            {obligations.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Obligation
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Category
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Amount
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Payment Plan
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Year
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Due Date
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {obligations.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-5 py-12 text-center text-sm text-slate-400"
                >
                  No obligations found.
                </td>
              </tr>
            ) : (
              obligations.map((obligation) => (
                <tr
                  key={obligation.id}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50"
                >
                  {/* Obligation */}
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-[#0B294D]">
                        {obligation.name}
                      </p>

                      <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
                        {obligation.description}
                      </p>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600">
                      {categoryLabels[obligation.category]}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-[#0B294D]">
                      {formatAmount(obligation.amount)}
                    </span>
                  </td>

                  {/* Payment Plan */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600">
                      {obligation.paymentPlan}
                    </span>
                  </td>

                  {/* Year */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600">
                      {obligation.year}
                    </span>
                  </td>

                  {/* Due date */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600">
                      {obligation.dueDate}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <ObligationStatusBadge
                      status={obligation.status}
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-[#EAF1F8] hover:text-[#123B6D]"
                        title="View"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-[#EAF1F8] hover:text-[#123B6D]"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        title="More"
                      >
                        <MoreHorizontal size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
        <p className="text-xs text-slate-400">
          Showing {obligations.length} obligations
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            disabled
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-400"
          >
            Previous
          </button>

          <button
            type="button"
            className="rounded-lg border border-[#123B6D] bg-[#123B6D] px-3 py-1.5 text-xs text-white"
          >
            1
          </button>

          <button
            type="button"
            disabled
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ObligationTable;