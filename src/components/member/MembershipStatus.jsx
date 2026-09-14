import {
  ShieldCheck,
  CheckCircle2,
  MailCheck,
  UserCheck,
  Clock3,
  XCircle,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";

const MembershipStatus = () => {
  const { user } = useAuth();

  const isEmailVerified = user?.isEmailVerified;
  const memberStatus = user?.memberStatus;

  const statusConfig = {
    active: {
      label: "Active",
      description: "Your membership is active",
      icon: CheckCircle2,
      className: "text-(--success)",
      bg: "bg-green-50",
    },

    pending: {
      label: "Pending",
      description: "Your membership is awaiting approval",
      icon: Clock3,
      className: "text-(--warning)",
      bg: "bg-(--secondary-light)",
    },

    suspended: {
      label: "Suspended",
      description: "Your membership is currently suspended",
      icon: XCircle,
      className: "text-(--danger)",
      bg: "bg-red-50",
    },
  };

  const currentStatus =
    statusConfig[memberStatus] || statusConfig.pending;

  const StatusRow = ({
    icon: Icon,
    label,
    verified,
    pending = false,
  }) => {
    const state = verified
      ? {
          text: "Verified",
          icon: CheckCircle2,
          className: "text-(--success)",
          bg: "bg-green-50",
        }
      : pending
      ? {
          text: "Pending",
          icon: Clock3,
          className: "text-(--warning)",
          bg: "bg-(--secondary-light)",
        }
      : {
          text: "Not verified",
          icon: XCircle,
          className: "text-(--danger)",
          bg: "bg-red-50",
        };

    const StateIcon = state.icon;

    return (
      <div className="flex items-center justify-between border border-(--border) rounded px-3.5 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center ${state.bg} ${state.className}`}
          >
            <Icon size={17} strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-(--text-primary)">
              {label}
            </p>

            <p className="text-xs text-(--text-muted) mt-0.5">
              {state.text}
            </p>
          </div>
        </div>

        <StateIcon
          size={17}
          className={`${state.className} shrink-0`}
        />
      </div>
    );
  };

  return (
    <div className="bg-(--bg-white) border border-(--border) rounded p-5">

      {/* HEADER */}
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
          <ShieldCheck size={21} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-semibold text-(--text-primary)">
              Membership Status
            </h2>

            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded ${
                currentStatus.bg
              } ${currentStatus.className}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  memberStatus === "active"
                    ? "bg-(--success)"
                    : memberStatus === "suspended"
                    ? "bg-(--danger)"
                    : "bg-(--warning)"
                }`}
              />

              {currentStatus.label}
            </span>
          </div>

          <p className="text-xs text-(--text-secondary) mt-1">
            {currentStatus.description}
          </p>
        </div>
      </div>

      {/* STATUS ITEMS */}
      <div className="space-y-2.5">

        <StatusRow
          icon={UserCheck}
          label="Account"
          verified={true}
        />

        <StatusRow
          icon={MailCheck}
          label="Email Address"
          verified={isEmailVerified}
        />

        <StatusRow
          icon={ShieldCheck}
          label="Membership"
          verified={memberStatus === "active"}
          pending={memberStatus === "pending"}
        />

      </div>
    </div>
  );
};

export default MembershipStatus;