import React from "react";

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
                    ? "bg-(--primary) text-white rounded p-4"
                    : "bg-(--bg-white) border border-(--border) rounded p-4"
            }
        >
            <div className="flex items-start justify-between gap-3">
                <div
                    className={
                        dark
                            ? "w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0"
                            : `w-9 h-9 rounded-lg ${iconBg} ${iconClass} flex items-center justify-center shrink-0`
                    }
                >
                    <Icon size={18} />
                </div>

                {badge && (
                    <span
                        className={
                            dark
                                ? "text-[11px] text-white/60"
                                : "text-[11px] text-(--text-muted)"
                        }
                    >
                        {badge}
                    </span>
                )}
            </div>

            <div className="mt-4">
                <p
                    className={
                        dark
                            ? "text-xs text-white/70"
                            : "text-xs text-(--secondary)"
                    }
                >
                    {label}
                </p>

                <h2
                    className={
                        dark
                            ? "text-2xl font-semibold text-white mt-1"
                            : "text-2xl font-semibold text-(--primary) mt-1"
                    }
                >
                    {value}
                </h2>

                {description && (
                    <p
                        className={
                            dark
                                ? "text-[11px] text-white/50 mt-1"
                                : "text-[11px] text-(--text-muted) mt-1"
                        }
                    >
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminStatCard;