import React from "react";
import { Inbox } from "lucide-react";

const AdminTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found.",
  rowKey = "_id",
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        {/* TABLE HEADER */}
        <thead>
          <tr className="border-b border-(--border)">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-5 py-3.5 text-xs font-semibold text-(--primary)"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-12 text-center text-sm text-(--secondary)"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-12"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 rounded-full bg-(--bg-soft) flex items-center justify-center">
                    <Inbox
                      size={18}
                      className="text-(--secondary)"
                    />
                  </div>

                  <p className="text-sm font-medium text-(--primary) mt-3">
                    {emptyMessage}
                  </p>

                  <p className="text-xs text-(--secondary) mt-1">
                    There are no records to display.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row[rowKey]}
                className="border-b border-(--border) last:border-0 hover:bg-(--bg-soft) transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-5 py-4 text-sm text-(--primary)"
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;