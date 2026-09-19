import React from "react";

const ObligationStatusBadge = ({ status }) => {
  const styles = {
    active: "bg-emerald-50 text-emerald-700",
    inactive: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || styles.inactive
      }`}
    >
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );
};

export default ObligationStatusBadge;