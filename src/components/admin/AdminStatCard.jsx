import React from 'react'

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

        {/* <span
          className={
            dark
              ? "text-xs text-white/60"
              : "text-xs text-(--text-muted)"
          }
        >
          {badge}
        </span> */}
      </div>

      <p
        className={
          dark
            ? "text-sm text-white/70 mt-5"
            : "text-sm text-(--primary) mt-5"
        }
      >
        {label}
      </p>

      <h2
        className={
          dark
            ? "text-5xl font-bold mt-1"
            : "text-5xl font-bold text-(--primary) mt-1"
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

export default AdminStatCard