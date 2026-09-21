import {
  ReceiptText,
  UserRound,
  Users,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const QuickActions = ({ hasOutstanding }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const actions = [
    {
      label: "View Obligations",
      description: "See your assigned contributions",
      icon: ReceiptText,
      path: "my-obligation",
    },
    {
      label: "Update Profile",
      description: "Keep your information up to date",
      icon: UserRound,
      path: "profile",
    },
    {
      label: "Alumni Directory",
      description: "Connect with fellow Olivetians",
      icon: Users,
      path: "directory",
    },
    {
      label: "Events & News",
      description: "Stay updated with OlivetNOSA",
      icon: CalendarDays,
      path: "events",
    },
  ];

  // Add leadership only when the member actually has a leadership role.
  if (["leader", "secretary", "treasurer", "admin"].includes(user?.role)) {
    actions.push({
      label: "My Leadership",
      description: "Manage your leadership responsibilities",
      icon: Users,
      path: "year-set",
    });
  }

  return (
    <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden">
      <div className="p-5 border-b border-(--border)">
        <h2 className="font-semibold text-(--primary)">
          Quick Actions
        </h2>

        <p className="text-sm text-(--secondary) mt-1">
          Quickly access important areas of your membership.
        </p>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={() => navigate(action.path)}
              className="group flex items-center gap-3 p-3 text-left rounded-lg border border-transparent hover:border-(--border) hover:bg-(--bg-light) transition"
            >
              <div className="w-9 h-9 shrink-0 rounded-lg bg-(--primary-light) text-(--primary) flex items-center justify-center">
                <Icon size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-(--primary)">
                  {action.label}
                </p>

                <p className="text-xs text-(--secondary) mt-0.5 truncate">
                  {action.description}
                </p>
              </div>

              <ArrowUpRight
                size={15}
                className="text-(--text-muted) group-hover:text-(--primary) transition"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;